import { Construction } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const AppsDirectoryPage = () => (
  <div className="container py-12">
    <Card className="max-w-2xl mx-auto">
      <CardContent className="p-8 text-center">
        <Construction className="w-12 h-12 text-primary mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Malaria Applications Directory</h1>
        <p className="text-muted-foreground font-body">
          Coming soon: Searchable grid of 40+ global malaria software tools (DHIS2, CommCare, Audere, etc.) with category filters and CSV export.
        </p>
      </CardContent>
    </Card>
  </div>
);

export default AppsDirectoryPage;
