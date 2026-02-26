import { Construction } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const DashboardPage = () => (
  <div className="container py-12">
    <Card className="max-w-2xl mx-auto">
      <CardContent className="p-8 text-center">
        <Construction className="w-12 h-12 text-primary mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Main Dashboard</h1>
        <p className="text-muted-foreground font-body">
          Coming in Phase 2: KPI cards, trend charts, Nigeria choropleth map, and activity log with CSV export.
        </p>
      </CardContent>
    </Card>
  </div>
);

export default DashboardPage;
