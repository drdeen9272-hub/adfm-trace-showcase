import { Activity, Thermometer, Pill, Shield, ClipboardList, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { KpiData } from "@/lib/demo-data/dashboard-data";

const iconMap: Record<string, React.ElementType> = {
  activity: Activity,
  thermometer: Thermometer,
  pill: Pill,
  shield: Shield,
  clipboard: ClipboardList,
  "check-circle": CheckCircle,
};

interface KpiCardsProps {
  data: KpiData[];
}

const KpiCards = ({ data }: KpiCardsProps) => (
  <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
    {data.map((kpi) => {
      const Icon = iconMap[kpi.icon] || Activity;
      const isPositive = kpi.change > 0;
      return (
        <Card key={kpi.label} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon className="w-4 h-4 text-primary" />
              </div>
              <span
                className={cn(
                  "text-xs font-semibold px-2 py-0.5 rounded-full",
                  kpi.label === "Test Positivity Rate"
                    ? isPositive ? "bg-destructive/10 text-destructive" : "bg-sproxil-green/10 text-sproxil-green"
                    : isPositive ? "bg-sproxil-green/10 text-sproxil-green" : "bg-destructive/10 text-destructive"
                )}
              >
                {isPositive ? "+" : ""}{kpi.change}%
              </span>
            </div>
            <p className="text-2xl font-bold">{kpi.value}</p>
            <p className="text-xs text-muted-foreground font-body mt-1">{kpi.label}</p>
          </CardContent>
        </Card>
      );
    })}
  </div>
);

export default KpiCards;
