import { useState } from "react";
import { format } from "date-fns";
import {
  FileText, Download, Calendar as CalendarIcon, Filter, BarChart3,
  ClipboardList, DollarSign, Users, ChevronDown, FileSpreadsheet,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { exportToCSV } from "@/lib/export-csv";
import { stateCases } from "@/lib/demo-data/dashboard-data";
import sproxilLogo from "@/assets/sproxil-logo-red.jpg";

interface ReportTemplate {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  frequency: string;
  sections: string[];
  sampleData: Record<string, unknown>[];
  columns: string[];
}

const states = stateCases.map((s) => s.state).sort();

const reportTemplates: ReportTemplate[] = [
  {
    id: "monthly-surveillance",
    title: "Monthly Surveillance Summary",
    description: "Comprehensive overview of malaria cases, testing rates, positivity trends, and geographic distribution across reporting facilities.",
    icon: BarChart3,
    frequency: "Monthly",
    sections: ["Case Summary", "Testing Volume", "Positivity Rate by State", "Outbreak Alerts", "Reporting Completeness"],
    columns: ["State", "Cases", "Tests", "TPR (%)", "Facilities Reporting", "Completeness (%)"],
    sampleData: states.slice(0, 15).map((s, i) => ({
      State: s,
      Cases: Math.floor(Math.random() * 50000) + 5000,
      Tests: Math.floor(Math.random() * 100000) + 20000,
      "TPR (%)": +(Math.random() * 30 + 25).toFixed(1),
      "Facilities Reporting": Math.floor(Math.random() * 800) + 200,
      "Completeness (%)": +(Math.random() * 15 + 80).toFixed(1),
    })),
  },
  {
    id: "quarterly-review",
    title: "Quarterly Programme Review",
    description: "Strategic review of programme performance against targets, intervention coverage, and key performance indicators for donor reporting.",
    icon: ClipboardList,
    frequency: "Quarterly",
    sections: ["Executive Summary", "KPI Dashboard", "Intervention Coverage", "Financial Summary", "Recommendations"],
    columns: ["Indicator", "Target", "Achieved", "Achievement (%)", "Trend", "Status"],
    sampleData: [
      { Indicator: "mRDT Testing Rate", Target: "85%", Achieved: "82.4%", "Achievement (%)": 96.9, Trend: "↑", Status: "On Track" },
      { Indicator: "ACT Dispensing (verified)", Target: "500,000", Achieved: "480,861", "Achievement (%)": 96.2, Trend: "↑", Status: "On Track" },
      { Indicator: "ITN Distribution", Target: "1,200,000", Achieved: "1,053,950", "Achievement (%)": 87.8, Trend: "↑", Status: "On Track" },
      { Indicator: "PPMV Enrollment", Target: "10,000", Achieved: "8,420", "Achievement (%)": 84.2, Trend: "↑", Status: "At Risk" },
      { Indicator: "Survey Completion", Target: "80%", Achieved: "78.8%", "Achievement (%)": 98.5, Trend: "↑", Status: "On Track" },
      { Indicator: "Product Authentication", Target: "95%", Achieved: "96.4%", "Achievement (%)": 101.5, Trend: "↑", Status: "Exceeded" },
      { Indicator: "IPTp3+ Coverage", Target: "60%", Achieved: "42.8%", "Achievement (%)": 71.3, Trend: "↑", Status: "Behind" },
      { Indicator: "CHW Cases Managed", Target: "250,000", Achieved: "223,100", "Achievement (%)": 89.2, Trend: "↑", Status: "On Track" },
      { Indicator: "Stock-out Rate", Target: "<5%", Achieved: "8.2%", "Achievement (%)": 61.0, Trend: "↓", Status: "Behind" },
      { Indicator: "Data Completeness", Target: "95%", Achieved: "91.2%", "Achievement (%)": 96.0, Trend: "↑", Status: "On Track" },
    ],
  },
  {
    id: "admfm-copayment",
    title: "ADMFm Co-Payment Tracker",
    description: "Tracks co-payment mechanism performance under the Affordable Diagnostics and Medicine for Malaria (ADMFm) programme including subsidy utilization and patient costs.",
    icon: DollarSign,
    frequency: "Monthly",
    sections: ["Subsidy Utilization", "Patient Co-Payment Analysis", "Outlet Coverage", "Price Monitoring", "Commodity Flow"],
    columns: ["State", "ACTs Subsidized", "Avg Co-Pay (₦)", "Outlets Active", "Subsidy (₦M)", "Savings (%)"],
    sampleData: states.slice(0, 12).map((s) => ({
      State: s,
      "ACTs Subsidized": Math.floor(Math.random() * 80000) + 10000,
      "Avg Co-Pay (₦)": Math.floor(Math.random() * 300) + 200,
      "Outlets Active": Math.floor(Math.random() * 400) + 50,
      "Subsidy (₦M)": +(Math.random() * 50 + 10).toFixed(1),
      "Savings (%)": +(Math.random() * 30 + 50).toFixed(1),
    })),
  },
  {
    id: "ppmv-performance",
    title: "PPMV Performance Report",
    description: "Performance assessment of enrolled PPMVs (Patent & Proprietary Medicine Vendors — licensed community drug shops) including testing compliance, treatment quality, and incentive payouts.",
    icon: Users,
    frequency: "Monthly",
    sections: ["Enrollment Summary", "Testing Compliance", "Treatment Quality", "Incentive Payments", "Top Performers"],
    columns: ["State", "PPMVs Enrolled", "Active (%)", "Tests Done", "Compliance (%)", "Incentives Paid (₦)"],
    sampleData: states.slice(0, 12).map((s) => ({
      State: s,
      "PPMVs Enrolled": Math.floor(Math.random() * 600) + 50,
      "Active (%)": +(Math.random() * 20 + 75).toFixed(1),
      "Tests Done": Math.floor(Math.random() * 5000) + 500,
      "Compliance (%)": +(Math.random() * 15 + 80).toFixed(1),
      "Incentives Paid (₦)": (Math.floor(Math.random() * 5000) + 500) + "K",
    })),
  },
];

const statusColors: Record<string, string> = {
  "On Track": "bg-sproxil-green/10 text-sproxil-green",
  "Exceeded": "bg-primary/10 text-primary",
  "At Risk": "bg-sproxil-gold/15 text-foreground",
  "Behind": "bg-destructive/10 text-destructive",
};

const ReportsPage = () => {
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [stateFilter, setStateFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState<Date | undefined>(new Date(2025, 0, 1));
  const [dateTo, setDateTo] = useState<Date | undefined>(new Date(2025, 11, 31));

  const active = reportTemplates.find((r) => r.id === selectedReport);

  const handleExport = (report: ReportTemplate) => {
    exportToCSV(report.sampleData, report.id);
  };

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="relative overflow-hidden bg-primary py-10 lg:py-14 px-4 lg:px-6">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute bottom-10 left-20 w-96 h-96 rounded-full bg-primary-foreground blur-3xl" />
        </div>
        <div className="relative z-10">
          <img src={sproxilLogo} alt="Sproxil" className="h-6 mb-3 brightness-[10]" />
          <h1 className="text-2xl md:text-3xl font-extrabold text-primary-foreground mb-2">
            Reports & Exports
          </h1>
          <p className="text-sm text-primary-foreground/80 font-body max-w-2xl">
            Generate and download standardized programme reports with date range and geographic filters. All reports support CSV/Excel export.
          </p>
        </div>
      </div>

      <div className="px-4 lg:px-6 space-y-6 pb-8">
        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row md:items-center gap-3">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Filter className="w-4 h-4 text-primary" />
                Filters
              </div>
              <div className="flex items-center gap-2 flex-wrap flex-1">
                {/* Date From */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="h-9 gap-1.5 text-xs w-40 justify-start">
                      <CalendarIcon className="w-3.5 h-3.5" />
                      {dateFrom ? format(dateFrom, "MMM d, yyyy") : "From"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-popover z-[100]" align="start">
                    <Calendar mode="single" selected={dateFrom} onSelect={setDateFrom} initialFocus />
                  </PopoverContent>
                </Popover>

                <span className="text-xs text-muted-foreground">to</span>

                {/* Date To */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="h-9 gap-1.5 text-xs w-40 justify-start">
                      <CalendarIcon className="w-3.5 h-3.5" />
                      {dateTo ? format(dateTo, "MMM d, yyyy") : "To"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-popover z-[100]" align="start">
                    <Calendar mode="single" selected={dateTo} onSelect={setDateTo} initialFocus />
                  </PopoverContent>
                </Popover>

                {/* State Filter */}
                <Select value={stateFilter} onValueChange={setStateFilter}>
                  <SelectTrigger className="w-40 h-9 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-[100]">
                    <SelectItem value="all">All States</SelectItem>
                    {states.map((s) => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Report Templates Grid */}
        <div className="grid sm:grid-cols-2 gap-4">
          {reportTemplates.map((report) => {
            const Icon = report.icon;
            const isSelected = selectedReport === report.id;
            return (
              <Card
                key={report.id}
                className={cn(
                  "cursor-pointer transition-all hover:shadow-md",
                  isSelected && "ring-2 ring-primary shadow-md"
                )}
                onClick={() => setSelectedReport(isSelected ? null : report.id)}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-sm">{report.title}</CardTitle>
                        <Badge variant="secondary" className="text-[10px] mt-1">{report.frequency}</Badge>
                      </div>
                    </div>
                    <ChevronDown className={cn("w-4 h-4 text-muted-foreground transition-transform", isSelected && "rotate-180")} />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground font-body mb-3">{report.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {report.sections.map((s) => (
                      <span key={s} className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{s}</span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Expanded Report Preview */}
        {active && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-base flex items-center gap-2">
                  <FileText className="w-4 h-4 text-primary" />
                  {active.title}
                </CardTitle>
                <p className="text-xs text-muted-foreground font-body mt-1">
                  {dateFrom && dateTo
                    ? `${format(dateFrom, "MMM d, yyyy")} — ${format(dateTo, "MMM d, yyyy")}`
                    : "Select date range above"}
                  {stateFilter !== "all" && ` • ${stateFilter}`}
                </p>
              </div>
              <Button variant="outline" size="sm" onClick={() => handleExport(active)} className="gap-1.5">
                <FileSpreadsheet className="w-3.5 h-3.5" />
                Export to Excel
              </Button>
            </CardHeader>
            <CardContent>
              <div className="max-h-[400px] overflow-auto rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      {active.columns.map((col) => (
                        <TableHead key={col} className="text-xs">{col}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {active.sampleData.map((row, idx) => (
                      <TableRow key={idx}>
                        {active.columns.map((col) => (
                          <TableCell key={col} className="text-xs">
                            {col === "Status" && statusColors[String(row[col])] ? (
                              <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-medium ${statusColors[String(row[col])]}`}>
                                {String(row[col])}
                              </span>
                            ) : (
                              typeof row[col] === "number" ? Number(row[col]).toLocaleString() : String(row[col])
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <p className="text-[10px] text-muted-foreground mt-2 font-body">
                {active.sampleData.length} records • Demo data for illustration
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ReportsPage;
