import { useEffect, useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { StateCases } from "@/lib/demo-data/dashboard-data";
import "leaflet/dist/leaflet.css";

interface NigeriaMapProps {
  data: StateCases[];
}

const getColor = (cases: number) => {
  if (cases > 250000) return "#7f1d1d";
  if (cases > 180000) return "#b91c1c";
  if (cases > 120000) return "#ef4444";
  if (cases > 80000) return "#f97316";
  if (cases > 50000) return "#facc15";
  return "#86efac";
};

// Map GeoJSON names to our data names
const nameMap: Record<string, string> = {
  "Nassarawa": "Nasarawa",
  "Federal Capital Territory": "FCT",
};

const NigeriaMap = ({ data }: NigeriaMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapInstance, setMapInstance] = useState<any>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    let cancelled = false;

    const initMap = async () => {
      const L = await import("leaflet");

      if (cancelled || !mapRef.current) return;

      // Clean up previous
      if (mapInstance) {
        mapInstance.remove();
      }

      const map = L.map(mapRef.current, {
        center: [9.0, 8.0],
        zoom: 6,
        scrollWheelZoom: false,
        attributionControl: false,
        zoomControl: true,
      });

      // Light tile layer
      L.tileLayer("https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png", {
        maxZoom: 10,
      }).addTo(map);

      // Fetch GeoJSON
      const res = await fetch("/nigeria-states.geojson");
      const geojson = await res.json();

      if (cancelled) return;

      const casesMap = new Map(data.map((d) => [d.state, d]));

      L.geoJSON(geojson, {
        style: (feature: any) => {
          const rawName = feature?.properties?.name || "";
          const stateName = nameMap[rawName] || rawName;
          const stateData = casesMap.get(stateName);
          const cases = stateData?.cases || 0;
          return {
            fillColor: getColor(cases),
            weight: 1,
            opacity: 1,
            color: "#fff",
            fillOpacity: 0.8,
          };
        },
        onEachFeature: (feature: any, layer: any) => {
          const rawName = feature?.properties?.name || "";
          const stateName = nameMap[rawName] || rawName;
          const stateData = casesMap.get(stateName);
          layer.bindTooltip(
            `<div style="font-size:12px;font-weight:600">${stateName}</div>
             <div style="font-size:11px">Cases: ${stateData ? stateData.cases.toLocaleString() : "N/A"}</div>
             <div style="font-size:11px">TPR: ${stateData ? stateData.tpr + "%" : "N/A"}</div>`,
            { sticky: true }
          );
          layer.on({
            mouseover: (e: any) => {
              e.target.setStyle({ weight: 2, color: "#000", fillOpacity: 0.95 });
            },
            mouseout: (e: any) => {
              e.target.setStyle({ weight: 1, color: "#fff", fillOpacity: 0.8 });
            },
          });
        },
      }).addTo(map);

      setMapInstance(map);
    };

    initMap();

    return () => {
      cancelled = true;
    };
  }, [data]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (mapInstance) mapInstance.remove();
    };
  }, [mapInstance]);

  const legend = [
    { color: "#7f1d1d", label: "> 250k" },
    { color: "#b91c1c", label: "180–250k" },
    { color: "#ef4444", label: "120–180k" },
    { color: "#f97316", label: "80–120k" },
    { color: "#facc15", label: "50–80k" },
    { color: "#86efac", label: "< 50k" },
  ];

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Malaria Case Density by State</CardTitle>
      </CardHeader>
      <CardContent>
        <div ref={mapRef} className="h-96 rounded-lg overflow-hidden" />
        <div className="flex flex-wrap gap-3 mt-3">
          {legend.map((l) => (
            <div key={l.label} className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: l.color }} />
              <span className="text-[10px] text-muted-foreground font-body">{l.label}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default NigeriaMap;
