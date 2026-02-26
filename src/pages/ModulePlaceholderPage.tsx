import { useParams } from "react-router-dom";
import { Construction } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const moduleNames: Record<string, string> = {
  "case-management": "Case Management & Diagnosis",
  "treatment": "Treatment & Drug Quality",
  "vector-control": "Vector Control (ITNs, IRS, Larviciding)",
  "chemoprevention": "Chemoprevention (IPTp, SMC, PMC, MDA)",
  "surveillance": "Surveillance & Epidemiology",
  "entomology": "Entomology & Insecticide Resistance",
  "supply-chain-commodities": "Supply Chain & Commodities",
  "financing": "Financing & Programme Costs",
  "sbcc": "Social & Behaviour Change Communication",
  "research": "Research & Innovation",
  "malaria-pregnancy": "Malaria in Pregnancy",
  "community-health": "Community Health Workers",
  "data-quality": "Data Quality & HMIS",
  "climate": "Climate & Environmental Factors",
  "vaccines": "Malaria Vaccines",
  "cross-border": "Cross-Border & Migration",
  "gender-equity": "Gender & Equity",
  "private-sector": "Private Sector & PPMV Engagement",
};

const ModulePlaceholderPage = () => {
  const { moduleId } = useParams();
  const title = moduleNames[moduleId || ""] || "Module";

  return (
    <div className="container py-12">
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-8 text-center">
          <Construction className="w-12 h-12 text-primary mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">{title}</h1>
          <p className="text-muted-foreground font-body">
            This module is coming soon. It will include KPI cards, data tables with CSV export,
            charts, and geographic filters for Nigeria's 36 states and 774 LGAs.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ModulePlaceholderPage;
