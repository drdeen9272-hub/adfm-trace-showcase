import { Construction } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const AishaPlatformPage = () => (
  <div className="container py-12">
    <Card className="max-w-2xl mx-auto">
      <CardContent className="p-8 text-center">
        <Construction className="w-12 h-12 text-primary mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">AISHA Platform</h1>
        <p className="text-muted-foreground font-body">
          Coming soon: Product Authentication, AI Diagnostics, Health Surveillance, and Conditional Incentives modules with detailed metrics.
        </p>
      </CardContent>
    </Card>
  </div>
);

export default AishaPlatformPage;
