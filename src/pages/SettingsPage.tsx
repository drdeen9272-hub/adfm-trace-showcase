import { Construction } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const SettingsPage = () => (
  <div className="container py-12">
    <Card className="max-w-2xl mx-auto">
      <CardContent className="p-8 text-center">
        <Construction className="w-12 h-12 text-primary mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground font-body">
          Coming soon: User profile, data management, and platform configuration.
        </p>
      </CardContent>
    </Card>
  </div>
);

export default SettingsPage;
