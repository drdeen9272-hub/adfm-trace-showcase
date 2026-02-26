import { useState } from "react";
import { Calendar, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import KpiCards from "@/components/dashboard/KpiCards";
import TrendChart from "@/components/dashboard/TrendChart";
import StateCasesChart from "@/components/dashboard/StateCasesChart";
import NigeriaMap from "@/components/dashboard/NigeriaMap";
import ActivityTable from "@/components/dashboard/ActivityTable";
import { kpiData, monthlyTrends, stateCases, activityLog } from "@/lib/demo-data/dashboard-data";
import sproxilLogo from "@/assets/sproxil-logo-red.jpg";

const DashboardPage = () => {
  const [dateRange, setDateRange] = useState("last-12");
  const [stateFilter, setStateFilter] = useState("all");

  return (
    <div className="space-y-6 p-4 lg:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <img src={sproxilLogo} alt="Sproxil" className="h-7" />
            <h1 className="text-2xl font-bold">Dashboard</h1>
          </div>
          <p className="text-sm text-muted-foreground font-body">
            ADMFm Malaria Programme Analytics — Nigeria (36 states + FCT, 774 LGAs)
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-40 h-9 text-xs">
              <Calendar className="w-3.5 h-3.5 mr-1.5" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last-3">Last 3 months</SelectItem>
              <SelectItem value="last-6">Last 6 months</SelectItem>
              <SelectItem value="last-12">Last 12 months</SelectItem>
              <SelectItem value="last-24">Last 24 months</SelectItem>
            </SelectContent>
          </Select>

          <Select value={stateFilter} onValueChange={setStateFilter}>
            <SelectTrigger className="w-36 h-9 text-xs">
              <Filter className="w-3.5 h-3.5 mr-1.5" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All States</SelectItem>
              {stateCases.sort((a, b) => a.state.localeCompare(b.state)).map((s) => (
                <SelectItem key={s.state} value={s.state}>{s.state}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* KPI Cards */}
      <KpiCards data={kpiData} />

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        <TrendChart data={monthlyTrends} />
        <StateCasesChart data={stateCases} />
      </div>

      {/* Map */}
      <NigeriaMap data={stateCases} />

      {/* Activity Log */}
      <ActivityTable data={activityLog} />
    </div>
  );
};

export default DashboardPage;
