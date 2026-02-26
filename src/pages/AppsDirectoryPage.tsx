import { useState, useMemo } from "react";
import { Search, Download, Filter, ExternalLink, Grid3X3, List } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { exportToCSV } from "@/lib/export-csv";
import { malariaApps, appCategories } from "@/lib/demo-data/apps-directory-data";
import sproxilLogo from "@/assets/sproxil-logo-red.jpg";

const categoryColors: Record<string, string> = {
  "AI Diagnostics": "bg-destructive/10 text-destructive",
  "Analytics & Visualization": "bg-primary/10 text-primary",
  "Climate & Environment": "bg-sproxil-green/10 text-sproxil-green",
  "Communication & Messaging": "bg-sproxil-gold/15 text-foreground",
  "Community Health": "bg-secondary/10 text-secondary",
  "Entomology": "bg-muted text-muted-foreground",
  "Genomics & Research": "bg-accent/10 text-accent-foreground",
  "Geospatial & Mapping": "bg-sproxil-green/10 text-sproxil-green",
  "Health Information System": "bg-primary/10 text-primary",
  "Mobile Data Collection": "bg-sproxil-gold/15 text-foreground",
  "Modelling & Simulation": "bg-secondary/10 text-secondary",
  "Product Authentication": "bg-destructive/10 text-destructive",
  "Supply Chain": "bg-muted text-muted-foreground",
  "Surveillance": "bg-primary/10 text-primary",
};

const AppsDirectoryPage = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [view, setView] = useState<"grid" | "table">("grid");

  const filtered = useMemo(() => {
    return malariaApps.filter((app) => {
      const matchesSearch = search === "" || [app.name, app.developer, app.description, app.countries]
        .some((f) => f.toLowerCase().includes(search.toLowerCase()));
      const matchesCat = category === "all" || app.category === category;
      return matchesSearch && matchesCat;
    });
  }, [search, category]);

  const handleExport = () => {
    exportToCSV(filtered as unknown as Record<string, unknown>[], "malaria-apps-directory");
  };

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="relative overflow-hidden bg-primary py-10 lg:py-14 px-4 lg:px-6">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-72 h-72 rounded-full bg-sproxil-gold blur-3xl" />
        </div>
        <div className="relative z-10">
          <img src={sproxilLogo} alt="Sproxil" className="h-6 mb-3 brightness-[10]" />
          <h1 className="text-2xl md:text-3xl font-extrabold text-primary-foreground mb-2">
            Malaria Applications Directory
          </h1>
          <p className="text-sm text-primary-foreground/80 font-body max-w-2xl">
            A searchable catalogue of {malariaApps.length}+ global malaria software tools, platforms, and digital health technologies — from DHIS2 to AI diagnostics.
          </p>
        </div>
      </div>

      <div className="px-4 lg:px-6 space-y-4 pb-8">
        {/* Filters bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap flex-1">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search tools, developers, countries..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 h-9"
              />
            </div>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-52 h-9 text-xs">
                <Filter className="w-3.5 h-3.5 mr-1.5" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover z-[100]">
                <SelectItem value="all">All Categories ({malariaApps.length})</SelectItem>
                {appCategories.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c} ({malariaApps.filter((a) => a.category === c).length})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex border rounded-md overflow-hidden">
              <button onClick={() => setView("grid")} className={`p-1.5 ${view === "grid" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button onClick={() => setView("table")} className={`p-1.5 ${view === "table" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                <List className="w-4 h-4" />
              </button>
            </div>
            <Button variant="outline" size="sm" onClick={handleExport} className="gap-1.5 h-9">
              <Download className="w-3.5 h-3.5" />
              Export CSV
            </Button>
          </div>
        </div>

        <p className="text-xs text-muted-foreground font-body">
          Showing {filtered.length} of {malariaApps.length} tools
        </p>

        {/* Grid View */}
        {view === "grid" && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((app) => (
              <Card key={app.name} className="hover:shadow-md transition-shadow flex flex-col">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-sm">{app.name}</CardTitle>
                    {app.url !== "#" && (
                      <a href={app.url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary shrink-0">
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                  <Badge variant="secondary" className={`w-fit text-[10px] ${categoryColors[app.category] || ""}`}>
                    {app.category}
                  </Badge>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <p className="text-xs text-muted-foreground font-body flex-1">{app.description}</p>
                  <div className="mt-3 pt-3 border-t space-y-1">
                    <p className="text-[10px] text-muted-foreground font-body">
                      <span className="font-semibold text-foreground">Developer:</span> {app.developer}
                    </p>
                    <p className="text-[10px] text-muted-foreground font-body">
                      <span className="font-semibold text-foreground">Countries:</span> {app.countries}
                    </p>
                    <p className="text-[10px] text-muted-foreground font-body">
                      <span className="font-semibold text-foreground">Funders:</span> {app.funders}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Table View */}
        {view === "table" && (
          <Card>
            <CardContent className="p-0">
              <div className="max-h-[600px] overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs">Name</TableHead>
                      <TableHead className="text-xs">Category</TableHead>
                      <TableHead className="text-xs">Developer</TableHead>
                      <TableHead className="text-xs max-w-xs">Description</TableHead>
                      <TableHead className="text-xs">Countries</TableHead>
                      <TableHead className="text-xs">Funders</TableHead>
                      <TableHead className="text-xs">Link</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.map((app) => (
                      <TableRow key={app.name}>
                        <TableCell className="text-xs font-medium">{app.name}</TableCell>
                        <TableCell>
                          <Badge variant="secondary" className={`text-[10px] whitespace-nowrap ${categoryColors[app.category] || ""}`}>
                            {app.category}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-xs">{app.developer}</TableCell>
                        <TableCell className="text-xs text-muted-foreground max-w-xs truncate">{app.description}</TableCell>
                        <TableCell className="text-xs">{app.countries}</TableCell>
                        <TableCell className="text-xs text-muted-foreground">{app.funders}</TableCell>
                        <TableCell>
                          {app.url !== "#" && (
                            <a href={app.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground font-body">No tools match your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppsDirectoryPage;
