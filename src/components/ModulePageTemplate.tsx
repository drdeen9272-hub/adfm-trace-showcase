import { useState, useMemo } from "react";
import { Download, Search, Filter } from "lucide-react";
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { exportToCSV } from "@/lib/export-csv";
import type { ModuleConfig } from "@/lib/demo-data/module-data";
import sproxilLogo from "@/assets/sproxil-logo-red.jpg";

interface ModulePageTemplateProps {
  config: ModuleConfig;
}

const tooltipStyle = {
  borderRadius: "8px",
  border: "1px solid hsl(var(--border))",
  background: "hsl(var(--card))",
  fontSize: "12px",
};

const ModulePageTemplate = ({ config }: ModulePageTemplateProps) => {
  const [search, setSearch] = useState("");
  const [stateFilter, setStateFilter] = useState("all");

  const states = useMemo(() => {
    const s = new Set<string>();
    config.tableData.forEach((row) => {
      if (row.State) s.add(String(row.State));
    });
    return Array.from(s).sort();
  }, [config.tableData]);

  const filteredData = useMemo(() => {
    return config.tableData.filter((row) => {
      const matchesSearch = search === "" || Object.values(row).some((v) =>
        String(v).toLowerCase().includes(search.toLowerCase())
      );
      const matchesState = stateFilter === "all" || row.State === stateFilter;
      return matchesSearch && matchesState;
    });
  }, [config.tableData, search, stateFilter]);

  const handleExport = () => {
    exportToCSV(filteredData as Record<string, unknown>[], config.id);
  };

  const renderChart = () => {
    const common = {
      data: config.chartData,
      margin: { top: 5, right: 20, left: 0, bottom: 5 },
    };

    const xAxis = <XAxis dataKey="name" tick={{ fontSize: 11 }} />;
    const yAxis = <YAxis tick={{ fontSize: 11 }} />;
    const grid = <CartesianGrid strokeDasharray="3 3" className="stroke-border" />;
    const tip = <Tooltip contentStyle={tooltipStyle} />;
    const leg = <Legend wrapperStyle={{ fontSize: "12px" }} />;

    if (config.chartType === "bar") {
      return (
        <BarChart {...common}>
          {grid}{xAxis}{yAxis}{tip}{leg}
          <Bar dataKey="value" name="Value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          {config.chartData[0]?.value2 !== undefined && (
            <Bar dataKey="value2" name="Comparison" fill="hsl(var(--sproxil-gold))" radius={[4, 4, 0, 0]} />
          )}
        </BarChart>
      );
    }
    if (config.chartType === "area") {
      return (
        <AreaChart {...common}>
          {grid}{xAxis}{yAxis}{tip}{leg}
          <Area type="monotone" dataKey="value" name="Value" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.2} />
        </AreaChart>
      );
    }
    return (
      <LineChart {...common}>
        {grid}{xAxis}{yAxis}{tip}{leg}
        <Line type="monotone" dataKey="value" name="Value" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
        {config.chartData[0]?.value2 !== undefined && (
          <Line type="monotone" dataKey="value2" name="Comparison" stroke="hsl(var(--sproxil-gold))" strokeWidth={2} dot={false} />
        )}
      </LineChart>
    );
  };

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div className="relative h-48 md:h-56 overflow-hidden">
        <img src={config.heroImage} alt={config.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/60" />
        <div className="absolute inset-0 flex items-center p-6 lg:p-8">
          <div>
            <img src={sproxilLogo} alt="Sproxil" className="h-6 mb-3 brightness-[10]" />
            <h1 className="text-2xl md:text-3xl font-bold text-primary-foreground">{config.title}</h1>
            <p className="text-sm text-primary-foreground/80 mt-1 max-w-2xl font-body">{config.subtitle}</p>
          </div>
        </div>
      </div>

      <div className="px-4 lg:px-6 space-y-6 pb-8">
        {/* Description */}
        <p className="text-sm text-muted-foreground font-body max-w-4xl">{config.description}</p>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {config.kpis.map((kpi) => (
            <Card key={kpi.label}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs text-muted-foreground font-body">{kpi.label}</p>
                  <span className={cn(
                    "text-[10px] font-semibold px-1.5 py-0.5 rounded-full",
                    kpi.change > 0 ? "bg-sproxil-green/10 text-sproxil-green" : "bg-destructive/10 text-destructive"
                  )}>
                    {kpi.change > 0 ? "+" : ""}{kpi.change}%
                  </span>
                </div>
                <p className="text-xl font-bold">{kpi.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Chart */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">{config.chartTitle}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                {renderChart()}
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Data Table */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <CardTitle className="text-base">Data Table</CardTitle>
              <div className="flex items-center gap-2 flex-wrap">
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                  <Input
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-8 h-8 text-xs w-44"
                  />
                </div>
                {states.length > 0 && (
                  <Select value={stateFilter} onValueChange={setStateFilter}>
                    <SelectTrigger className="w-32 h-8 text-xs">
                      <Filter className="w-3 h-3 mr-1" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All States</SelectItem>
                      {states.map((s) => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
                <Button variant="outline" size="sm" onClick={handleExport} className="gap-1.5 h-8 text-xs">
                  <Download className="w-3.5 h-3.5" />
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="max-h-96 overflow-auto rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs">#</TableHead>
                    {config.tableColumns.map((col) => (
                      <TableHead key={col} className="text-xs">{col}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((row, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="text-xs text-muted-foreground">{row.ID as number}</TableCell>
                      {config.tableColumns.map((col) => (
                        <TableCell key={col} className="text-xs">
                          {col === "Status" ? (
                            <span className={cn(
                              "px-1.5 py-0.5 rounded-full text-[10px] font-medium",
                              row[col] === "Active" || row[col] === "Completed" ? "bg-sproxil-green/10 text-sproxil-green"
                                : row[col] === "Pending" ? "bg-sproxil-gold/10 text-foreground"
                                : "bg-primary/10 text-primary"
                            )}>
                              {String(row[col])}
                            </span>
                          ) : (
                            typeof row[col] === "number" ? Number(row[col]).toLocaleString() : String(row[col])
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                  {filteredData.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={config.tableColumns.length + 1} className="text-center text-sm text-muted-foreground py-8">
                        No results found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            <p className="text-[10px] text-muted-foreground mt-2 font-body">
              Showing {filteredData.length} of {config.tableData.length} records
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ModulePageTemplate;
