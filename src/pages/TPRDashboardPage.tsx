import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, TrendingUp, Activity, Thermometer, ChevronRight, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import GlossaryTerm from "@/components/GlossaryTerm";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

type DrillLevel = "national" | "state" | "lga";

const stateData = [
  { name: "Kano", tpr: 72, tests: 12400, color: "#ef4444" },
  { name: "Lagos", tpr: 34, tests: 18200, color: "#f59e0b" },
  { name: "Rivers", tpr: 45, tests: 8900, color: "#f59e0b" },
  { name: "Borno", tpr: 81, tests: 6300, color: "#ef4444" },
  { name: "Oyo", tpr: 28, tests: 11700, color: "#22c55e" },
  { name: "Kaduna", tpr: 65, tests: 9800, color: "#ef4444" },
  { name: "Enugu", tpr: 38, tests: 7100, color: "#f59e0b" },
  { name: "Abuja FCT", tpr: 22, tests: 14500, color: "#22c55e" },
];

const lgaData: Record<string, Array<{ name: string; tpr: number; tests: number }>> = {
  Kano: [
    { name: "Nassarawa", tpr: 78, tests: 2100 },
    { name: "Dala", tpr: 69, tests: 1800 },
    { name: "Kano Municipal", tpr: 65, tests: 3200 },
    { name: "Gwale", tpr: 74, tests: 1500 },
    { name: "Fagge", tpr: 71, tests: 1400 },
  ],
  Lagos: [
    { name: "Ikeja", tpr: 28, tests: 4100 },
    { name: "Surulere", tpr: 32, tests: 3600 },
    { name: "Alimosho", tpr: 41, tests: 5200 },
    { name: "Eti-Osa", tpr: 25, tests: 2800 },
  ],
};

const monthlyData = [
  { month: "Jan", tpr: 45 }, { month: "Feb", tpr: 42 }, { month: "Mar", tpr: 48 },
  { month: "Apr", tpr: 52 }, { month: "May", tpr: 58 }, { month: "Jun", tpr: 65 },
  { month: "Jul", tpr: 71 }, { month: "Aug", tpr: 68 }, { month: "Sep", tpr: 62 },
  { month: "Oct", tpr: 55 }, { month: "Nov", tpr: 48 }, { month: "Dec", tpr: 43 },
];

const getTprColor = (tpr: number) => {
  if (tpr <= 33) return "text-green-600 bg-green-100";
  if (tpr <= 66) return "text-amber-600 bg-amber-100";
  return "text-red-600 bg-red-100";
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const TPRDashboardPage = () => {
  const [level, setLevel] = useState<DrillLevel>("national");
  const [selectedState, setSelectedState] = useState("");

  const currentLgas = lgaData[selectedState] || [];

  return (
    <main>
      <section className="py-12 bg-primary">
        <div className="container">
          <img src="/sproxil-logo.png" alt="Sproxil" className="h-10 mb-4 brightness-200" />
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
            <h1 className="text-3xl md:text-4xl font-extrabold text-primary-foreground mb-2">
              <GlossaryTerm term="TPR">Test Positivity Rate</GlossaryTerm> Dashboard
            </h1>
            <p className="text-primary-foreground/80 font-body">
              Nigeria's first real-time diagnostic-based malaria surveillance map — powered by Sproxil
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-8 bg-background">
        <div className="container">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-6 text-sm font-body">
            <button onClick={() => { setLevel("national"); setSelectedState(""); }} className={level === "national" ? "font-bold text-primary" : "text-muted-foreground hover:text-foreground"}>
              Nigeria (National)
            </button>
            {selectedState && (
              <>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
                <button onClick={() => setLevel("state")} className={level === "state" || level === "lga" ? "font-bold text-primary" : "text-muted-foreground"}>
                  {selectedState} State
                </button>
              </>
            )}
            {level === "lga" && (
              <>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
                <span className="font-bold text-primary">LGA Level</span>
              </>
            )}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    {level === "national" ? "State-Level TPR Data" : level === "state" ? `${selectedState} — LGA Breakdown` : "Pharmacy Detail"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {level === "national" && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {stateData.map((s) => (
                        <motion.button
                          key={s.name}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => { setSelectedState(s.name); setLevel("state"); }}
                          className="p-4 rounded-xl border hover:shadow-md transition-all text-left"
                        >
                          <p className="font-bold text-sm">{s.name}</p>
                          <p className={`text-2xl font-extrabold mt-1 ${s.tpr <= 33 ? "text-green-600" : s.tpr <= 66 ? "text-amber-600" : "text-red-600"}`}>
                            {s.tpr}%
                          </p>
                          <p className="text-xs text-muted-foreground font-body">{s.tests.toLocaleString()} tests</p>
                        </motion.button>
                      ))}
                    </div>
                  )}

                  {level === "state" && (
                    <div>
                      <Button variant="ghost" size="sm" onClick={() => { setLevel("national"); setSelectedState(""); }} className="mb-4">
                        <ArrowLeft className="w-4 h-4 mr-1" /> Back to National
                      </Button>
                      {currentLgas.length > 0 ? (
                        <div className="space-y-3">
                          {currentLgas.map((lga) => (
                            <motion.button
                              key={lga.name}
                              whileHover={{ x: 4 }}
                              onClick={() => setLevel("lga")}
                              className="w-full flex items-center justify-between p-4 rounded-xl border hover:shadow-md transition-all"
                            >
                              <div className="text-left">
                                <p className="font-bold text-sm">{lga.name} <span className="text-xs text-muted-foreground font-body">(<GlossaryTerm term="LGA">LGA</GlossaryTerm>)</span></p>
                                <p className="text-xs text-muted-foreground font-body">{lga.tests.toLocaleString()} tests</p>
                              </div>
                              <span className={`px-3 py-1 rounded-full text-sm font-bold ${getTprColor(lga.tpr)}`}>
                                {lga.tpr}%
                              </span>
                            </motion.button>
                          ))}
                        </div>
                      ) : (
                        <p className="text-muted-foreground font-body text-sm">Detailed LGA data available for Kano and Lagos in this demo.</p>
                      )}
                    </div>
                  )}

                  {level === "lga" && (
                    <div>
                      <Button variant="ghost" size="sm" onClick={() => setLevel("state")} className="mb-4">
                        <ArrowLeft className="w-4 h-4 mr-1" /> Back to {selectedState}
                      </Button>
                      <Card className="bg-muted/50">
                        <CardContent className="p-6">
                          <h3 className="font-bold mb-4">Pharmacy: Sabon Gari Health Store</h3>
                          <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                              <p className="text-3xl font-extrabold text-red-600">74%</p>
                              <p className="text-xs text-muted-foreground font-body">TPR</p>
                            </div>
                            <div>
                              <p className="text-3xl font-extrabold text-foreground">23</p>
                              <p className="text-xs text-muted-foreground font-body">Tests Today</p>
                            </div>
                            <div>
                              <p className="text-3xl font-extrabold text-foreground">147</p>
                              <p className="text-xs text-muted-foreground font-body">Tests (7 days)</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Activity className="w-4 h-4 text-primary" /> TPR Color Legend
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-green-500" /><span className="text-sm font-body">0–33% (Low)</span></div>
                  <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-amber-500" /><span className="text-sm font-body">34–66% (Medium)</span></div>
                  <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-red-500" /><span className="text-sm font-body">67–100% (High)</span></div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-primary" /> Seasonal TPR Trend
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={180}>
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                      <YAxis tick={{ fontSize: 10 }} domain={[0, 100]} />
                      <Tooltip />
                      <Line type="monotone" dataKey="tpr" stroke="hsl(0, 72%, 42%)" strokeWidth={2} dot={{ r: 3 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default TPRDashboardPage;
