import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { exportToCSV } from "@/lib/export-csv";
import type { ActivityEntry } from "@/lib/demo-data/dashboard-data";

interface ActivityTableProps {
  data: ActivityEntry[];
}

const categoryColors: Record<string, string> = {
  Treatment: "bg-sproxil-green/10 text-sproxil-green",
  Diagnosis: "bg-primary/10 text-primary",
  Prevention: "bg-sproxil-gold/20 text-foreground",
  Surveillance: "bg-accent/10 text-accent-foreground",
  Authentication: "bg-secondary/10 text-secondary",
  Incentive: "bg-sproxil-gold/10 text-foreground",
  "Supply Chain": "bg-muted text-muted-foreground",
};

const ActivityTable = ({ data }: ActivityTableProps) => {
  const handleExport = () => {
    exportToCSV(data as unknown as Record<string, unknown>[], "activity-log");
  };

  return (
    <Card>
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-base">Recent Activity Log</CardTitle>
        <Button variant="outline" size="sm" onClick={handleExport} className="gap-1.5">
          <Download className="w-3.5 h-3.5" />
          Export CSV
        </Button>
      </CardHeader>
      <CardContent>
        <div className="max-h-96 overflow-auto rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs">Date</TableHead>
                <TableHead className="text-xs">State</TableHead>
                <TableHead className="text-xs">LGA</TableHead>
                <TableHead className="text-xs">Event</TableHead>
                <TableHead className="text-xs">Category</TableHead>
                <TableHead className="text-xs text-right">Qty</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell className="text-xs font-mono">{entry.date}</TableCell>
                  <TableCell className="text-xs">{entry.state}</TableCell>
                  <TableCell className="text-xs">{entry.lga}</TableCell>
                  <TableCell className="text-xs">{entry.event}</TableCell>
                  <TableCell>
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${categoryColors[entry.category] || ""}`}>
                      {entry.category}
                    </span>
                  </TableCell>
                  <TableCell className="text-xs text-right font-medium">{entry.quantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityTable;
