import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck, Brain, BarChart3, Gift, ChevronDown, CheckCircle, Smartphone,
  QrCode, Camera, MessageSquare, MapPin, Users, DollarSign, TrendingUp,
} from "lucide-react";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import PhoneMockup from "@/components/PhoneMockup";
import WhatsAppDemo from "@/components/WhatsAppDemo";
import sproxilLogo from "@/assets/sproxil-logo-red.jpg";

const tooltipStyle = {
  borderRadius: "8px",
  border: "1px solid hsl(var(--border))",
  background: "hsl(var(--card))",
  fontSize: "12px",
};

const COLORS = ["hsl(var(--primary))", "hsl(var(--sproxil-gold))", "hsl(var(--sproxil-green))", "#94a3b8"];

interface AishaModule {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  color: string;
  kpis: { label: string; value: string; icon: React.ElementType }[];
  features: string[];
  chart: React.ReactNode;
}

// Chart data
const authMonthly = [
  { m: "Jan", verified: 380000, failed: 4200 }, { m: "Feb", verified: 365000, failed: 3800 },
  { m: "Mar", verified: 412000, failed: 4500 }, { m: "Apr", verified: 395000, failed: 3900 },
  { m: "May", verified: 428000, failed: 4100 }, { m: "Jun", verified: 445000, failed: 3600 },
  { m: "Jul", verified: 462000, failed: 3200 }, { m: "Aug", verified: 478000, failed: 2900 },
  { m: "Sep", verified: 451000, failed: 3100 }, { m: "Oct", verified: 438000, failed: 3400 },
  { m: "Nov", verified: 420000, failed: 3700 }, { m: "Dec", verified: 405000, failed: 4000 },
];

const rdtResults = [
  { m: "Jan", positive: 8200, negative: 14800 }, { m: "Feb", positive: 7400, negative: 13600 },
  { m: "Mar", positive: 9100, negative: 15900 }, { m: "Apr", positive: 10200, negative: 16800 },
  { m: "May", positive: 12400, negative: 17600 }, { m: "Jun", positive: 14800, negative: 18200 },
  { m: "Jul", positive: 16200, negative: 17800 }, { m: "Aug", positive: 15400, negative: 18600 },
  { m: "Sep", positive: 13200, negative: 17400 }, { m: "Oct", positive: 11600, negative: 16200 },
  { m: "Nov", positive: 9800, negative: 15400 }, { m: "Dec", positive: 8600, negative: 14200 },
];

const surveyPie = [
  { name: "Completed", value: 78.8 }, { name: "Partial", value: 12.4 },
  { name: "Declined", value: 5.2 }, { name: "Pending", value: 3.6 },
];

const incentiveMonthly = [
  { m: "Jan", ppmv: 1230, patient: 8420 }, { m: "Feb", ppmv: 1180, patient: 8100 },
  { m: "Mar", ppmv: 1340, patient: 9200 }, { m: "Apr", ppmv: 1420, patient: 9800 },
  { m: "May", ppmv: 1580, patient: 10600 }, { m: "Jun", ppmv: 1720, patient: 11400 },
  { m: "Jul", ppmv: 1840, patient: 12200 }, { m: "Aug", ppmv: 1960, patient: 12800 },
  { m: "Sep", ppmv: 1780, patient: 11600 }, { m: "Oct", ppmv: 1620, patient: 10400 },
  { m: "Nov", ppmv: 1480, patient: 9600 }, { m: "Dec", ppmv: 1360, patient: 8800 },
];

const modules: AishaModule[] = [
  {
    id: "auth",
    title: "Product Authentication",
    subtitle: "4.5B codes authenticated via SMS 38353 and WhatsApp with GS1 traceability",
    icon: ShieldCheck,
    color: "bg-primary",
    kpis: [
      { label: "Codes Authenticated", value: "4.5B+", icon: QrCode },
      { label: "Genuine Rate", value: "96.4%", icon: CheckCircle },
      { label: "Brand Partners", value: "145+", icon: ShieldCheck },
      { label: "Daily Verifications", value: "42,000", icon: Smartphone },
    ],
    features: [
      "Scratch-and-verify PIN labels on ACT packs",
      "SMS shortcode 38353 for instant verification",
      "WhatsApp-based verification with photo evidence",
      "GS1 GTIN and serialization for batch traceability",
      "Real-time counterfeit alert system",
    ],
    chart: (
      <div className="h-56">
        <p className="text-xs text-muted-foreground mb-2 font-body">Monthly Verifications</p>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={authMonthly}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis dataKey="m" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
            <Tooltip contentStyle={tooltipStyle} />
            <Bar dataKey="verified" name="Verified" fill="hsl(var(--sproxil-green))" radius={[3, 3, 0, 0]} />
            <Bar dataKey="failed" name="Failed" fill="hsl(var(--destructive))" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    ),
  },
  {
    id: "diagnostics",
    title: "AI Diagnostics",
    subtitle: "Audere-powered mRDT reader with 96.8% accuracy, deployed via WhatsApp",
    icon: Brain,
    color: "bg-sproxil-gold",
    kpis: [
      { label: "mRDTs Read by AI", value: "22,400+", icon: Camera },
      { label: "AI Accuracy", value: "96.8%", icon: Brain },
      { label: "Avg Response Time", value: "< 8 sec", icon: Smartphone },
      { label: "WhatsApp Sessions", value: "18,200", icon: MessageSquare },
    ],
    features: [
      "Photo-based mRDT interpretation via WhatsApp",
      "Audere AI engine with 96.8% concordance",
      "Automatic Plasmodium falciparum species detection",
      "GPS-tagged results for geospatial surveillance",
      "Quality control flagging for invalid tests",
    ],
    chart: (
      <div className="h-56">
        <p className="text-xs text-muted-foreground mb-2 font-body">Monthly mRDT Results</p>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={rdtResults}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis dataKey="m" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
            <Tooltip contentStyle={tooltipStyle} />
            <Line type="monotone" dataKey="positive" name="Positive" stroke="hsl(var(--destructive))" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="negative" name="Negative" stroke="hsl(var(--sproxil-green))" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    ),
  },
  {
    id: "surveillance",
    title: "Health Surveillance",
    subtitle: "78.8% survey completion rate with GPS-tagged, real-time data collection",
    icon: BarChart3,
    color: "bg-sproxil-green",
    kpis: [
      { label: "Surveys Completed", value: "134,221", icon: BarChart3 },
      { label: "Completion Rate", value: "78.8%", icon: CheckCircle },
      { label: "GPS-Tagged", value: "100%", icon: MapPin },
      { label: "States Covered", value: "36 + FCT", icon: Users },
    ],
    features: [
      "Patient outcome surveys via SMS and WhatsApp",
      "Automated GPS capture at point of care",
      "Real-time dashboard with demographic breakdown",
      "Follow-up surveys at Day 3 and Day 7 post-treatment",
      "Integration with NMEP (National Malaria Elimination Programme) DHIS2",
    ],
    chart: (
      <div className="h-56">
        <p className="text-xs text-muted-foreground mb-2 font-body">Survey Completion Breakdown</p>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={surveyPie} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value" label={({ name, value }) => `${name}: ${value}%`}>
              {surveyPie.map((_, idx) => (
                <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={tooltipStyle} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    ),
  },
  {
    id: "incentives",
    title: "Conditional Incentives",
    subtitle: "₦850 patient airtime + ₦150 PPMV payment per verified test-and-treat cycle",
    icon: Gift,
    color: "bg-secondary",
    kpis: [
      { label: "Patient Rewards Paid", value: "₦114M", icon: DollarSign },
      { label: "PPMV Payments", value: "₦22.4M", icon: DollarSign },
      { label: "Avg Turnaround", value: "< 2 hrs", icon: TrendingUp },
      { label: "PPMVs Enrolled", value: "8,420", icon: Users },
    ],
    features: [
      "₦850 airtime reward after patient completes outcome survey",
      "₦150 per verified test-and-treat cycle to PPMV (Patent & Proprietary Medicine Vendor)",
      "Automated mobile money / airtime disbursement",
      "Anti-fraud duplicate detection system",
      "Real-time payment reconciliation dashboard",
    ],
    chart: (
      <div className="h-56">
        <p className="text-xs text-muted-foreground mb-2 font-body">Monthly Incentive Payments</p>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={incentiveMonthly}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis dataKey="m" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} />
            <Tooltip contentStyle={tooltipStyle} />
            <Bar dataKey="ppmv" name="PPMV Payments" fill="hsl(var(--primary))" radius={[3, 3, 0, 0]} />
            <Bar dataKey="patient" name="Patient Rewards" fill="hsl(var(--sproxil-gold))" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    ),
  },
];

const ExpandableCard = ({ mod }: { mod: AishaModule }) => {
  const [open, setOpen] = useState(false);
  const Icon = mod.icon;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left"
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center text-primary-foreground", mod.color)}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <CardTitle className="text-base">{mod.title}</CardTitle>
                <p className="text-xs text-muted-foreground font-body mt-0.5">{mod.subtitle}</p>
              </div>
            </div>
            <ChevronDown className={cn("w-5 h-5 text-muted-foreground transition-transform duration-300 mt-1", open && "rotate-180")} />
          </div>
        </CardHeader>

        {/* KPI summary always visible */}
        <CardContent className="pt-0 pb-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {mod.kpis.map((kpi) => (
              <div key={kpi.label} className="bg-muted/50 rounded-lg p-3">
                <div className="flex items-center gap-1.5 mb-1">
                  <kpi.icon className="w-3.5 h-3.5 text-primary" />
                  <span className="text-[10px] text-muted-foreground font-body">{kpi.label}</span>
                </div>
                <p className="text-lg font-bold">{kpi.value}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <CardContent className="pt-0 pb-6 border-t">
              <div className="grid lg:grid-cols-2 gap-6 mt-4">
                {/* Features */}
                <div>
                  <h4 className="text-sm font-semibold mb-3">Key Features</h4>
                  <ul className="space-y-2">
                    {mod.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs font-body text-muted-foreground">
                        <CheckCircle className="w-3.5 h-3.5 text-sproxil-green mt-0.5 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Mini chart */}
                <div>{mod.chart}</div>
              </div>
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};

const AishaPlatformPage = () => (
  <div className="space-y-6">
    {/* Hero */}
    <div className="relative overflow-hidden bg-primary py-12 lg:py-16 px-4 lg:px-6">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-sproxil-gold blur-3xl" />
        <div className="absolute bottom-10 right-20 w-96 h-96 rounded-full bg-primary-foreground blur-3xl" />
      </div>
      <div className="relative z-10 max-w-4xl">
        <img src={sproxilLogo} alt="Sproxil" className="h-7 mb-4 brightness-[10]" />
        <h1 className="text-3xl md:text-4xl font-extrabold text-primary-foreground mb-3">
          AISHA Platform
        </h1>
        <p className="text-primary-foreground/80 text-sm md:text-base font-body max-w-2xl">
          <strong>A</strong>uthentication, <strong>I</strong>ntelligent diagnostics,{" "}
          <strong>S</strong>urveillance, <strong>H</strong>ealth incentives, and{" "}
          <strong>A</strong>nalytics — Sproxil's integrated malaria control platform powering the ADMFm programme across Nigeria.
        </p>
      </div>
    </div>

    <div className="px-4 lg:px-6 space-y-6 pb-8">
      {/* Stats banner */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {[
          { v: "4.5B+", l: "Codes Authenticated" },
          { v: "35M+", l: "Consumers Reached" },
          { v: "134K+", l: "Surveys Completed" },
          { v: "8,420", l: "PPMVs Enrolled" },
          { v: "96.8%", l: "AI Accuracy" },
        ].map((s) => (
          <div key={s.l} className="text-center p-3 rounded-lg bg-muted/50 border border-border/50">
            <p className="text-xl font-extrabold text-primary">{s.v}</p>
            <p className="text-[10px] text-muted-foreground font-body mt-0.5">{s.l}</p>
          </div>
        ))}
      </div>

      {/* 4 Expandable Module Cards */}
      <div className="space-y-4">
        {modules.map((mod) => (
          <ExpandableCard key={mod.id} mod={mod} />
        ))}
      </div>

      {/* Phone Demo */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Interactive WhatsApp Demo</CardTitle>
          <p className="text-xs text-muted-foreground font-body">
            See how AISHA works in practice — from mRDT photo submission to product verification and incentive payment.
          </p>
        </CardHeader>
        <CardContent className="flex justify-center pb-8">
          <PhoneMockup>
            <WhatsAppDemo />
          </PhoneMockup>
        </CardContent>
      </Card>
    </div>
  </div>
);

export default AishaPlatformPage;
