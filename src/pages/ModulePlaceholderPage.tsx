import { useParams } from "react-router-dom";
import { Construction } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import ModulePageTemplate from "@/components/ModulePageTemplate";
import { moduleConfigs } from "@/lib/demo-data/module-data";

const ModulePlaceholderPage = () => {
  const { moduleId } = useParams();
  const config = moduleConfigs[moduleId || ""];

  if (!config) {
    return (
      <div className="container py-12">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-8 text-center">
            <Construction className="w-12 h-12 text-primary mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Module Not Found</h1>
            <p className="text-muted-foreground font-body">This module does not exist.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <ModulePageTemplate config={config} />;
};

export default ModulePlaceholderPage;
