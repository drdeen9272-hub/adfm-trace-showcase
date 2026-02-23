import { motion } from "framer-motion";
import { DollarSign, Target, BarChart3, Users, Building, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import GlossaryTerm from "@/components/GlossaryTerm";

const objectives = [
  {
    title: "Track Test-to-Treat Compliance",
    detail: "Monitor that every positive mRDT result leads to verified ACT dispensing. GPS + photo evidence ensures accountability from diagnosis to treatment.",
  },
  {
    title: "Reduce Commodity Diversion",
    detail: "End-to-end serialization with GS1 standards prevents subsidized medicines from being diverted. Every unit is tracked from factory to patient.",
  },
  {
    title: "Measure Real-Time TPR",
    detail: "Build Nigeria's first diagnostic-based malaria surveillance network. Data flows from 8,000+ PPMVs across 774 LGAs for instant trend detection.",
  },
  {
    title: "Verify Last-Mile Delivery",
    detail: "Consumer verification (scratch/text PIN or QR scan) confirms products reached intended patients, not diverted to parallel markets.",
  },
  {
    title: "Incentivize Correct Behavior",
    detail: "Financial incentives (₦150 for pharmacists, ₦850 airtime for patients) reward proper testing-before-treating and treatment adherence.",
  },
  {
    title: "Generate Program Intelligence",
    detail: "Patient outcome surveys, seasonal trends, and geographic data enable evidence-based decision-making for program scale-up.",
  },
];

const quantification = [
  { label: "RDTs (3 years)", value: "~170M", icon: Target },
  { label: "ACTs (3 years)", value: "~230M", icon: BarChart3 },
  { label: "Total Program Cost", value: "$220M", icon: DollarSign },
  { label: "PPMVs Enrolled", value: "8,000+", icon: Users },
];

const partners = [
  "NMEP (National Malaria Elimination Programme)",
  "PVAC (Presidential Initiative for Unlocking the Value Chain)",
  "Codix Pharma",
  "Emzor Pharmaceutical",
  "Fidson Healthcare",
  "NASENI Troment",
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const MEFrameworkPage = () => {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <main>
      <section className="py-16 lg:py-24 bg-primary">
        <div className="container text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
            <h1 className="text-3xl md:text-5xl font-extrabold text-primary-foreground mb-4">
              M&E Framework & Co-Payment Model
            </h1>
            <p className="text-primary-foreground/80 text-lg font-body max-w-2xl mx-auto">
              How Nigeria's <GlossaryTerm term="ADMFm">ADMFm</GlossaryTerm> program shares costs between government and manufacturers
              to make quality malaria diagnostics and treatment affordable at community pharmacies (<GlossaryTerm term="PPMV">PPMVs</GlossaryTerm>).
            </p>
          </motion.div>
        </div>
      </section>

      {/* Co-Payment Visual */}
      <section className="py-16 bg-background">
        <div className="container">
          <h2 className="text-2xl font-bold text-center mb-10">Co-Payment Mechanism</h2>
          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-3 gap-4 text-center mb-8">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
                <Card className="bg-primary text-primary-foreground">
                  <CardContent className="p-6">
                    <Building className="w-8 h-8 mx-auto mb-2" />
                    <p className="font-bold">Government</p>
                    <p className="text-sm opacity-80 font-body">Subsidizes mRDTs & ACTs</p>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1} className="flex items-center justify-center">
                <div className="text-4xl font-extrabold text-primary">+</div>
              </motion.div>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={2}>
                <Card className="bg-secondary text-secondary-foreground">
                  <CardContent className="p-6">
                    <Building className="w-8 h-8 mx-auto mb-2" />
                    <p className="font-bold">Manufacturers</p>
                    <p className="text-sm opacity-80 font-body">Share production costs</p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
            <div className="text-center mb-4">
              <div className="text-3xl text-muted-foreground">↓</div>
            </div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={3}>
              <Card className="bg-sproxil-gold/10 border-sproxil-gold/30">
                <CardContent className="p-6 text-center">
                  <p className="text-lg font-bold">Affordable mRDTs & ACTs</p>
                  <p className="text-sm text-muted-foreground font-body mt-1">
                    Available at 8,000+ community pharmacies (<GlossaryTerm term="PPMV">PPMVs</GlossaryTerm>) across all 774 <GlossaryTerm term="LGA">LGAs</GlossaryTerm> in Nigeria
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* M&E Objectives */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <h2 className="text-2xl font-bold text-center mb-10">Monitoring & Evaluation Objectives</h2>
          <div className="max-w-2xl mx-auto space-y-3">
            {objectives.map((obj, i) => (
              <motion.div key={obj.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                <button
                  onClick={() => setExpanded(expanded === i ? null : i)}
                  className="w-full text-left"
                >
                  <Card className={`transition-all ${expanded === i ? "ring-2 ring-primary" : ""}`}>
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                          {i + 1}
                        </div>
                        <p className="font-semibold text-sm">{obj.title}</p>
                      </div>
                      {expanded === i ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </CardContent>
                  </Card>
                </button>
                {expanded === i && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="px-4 pb-2">
                    <p className="text-sm text-muted-foreground font-body p-4 bg-muted rounded-b-xl">{obj.detail}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quantification */}
      <section className="py-16 bg-background">
        <div className="container">
          <h2 className="text-2xl font-bold text-center mb-10">Program Quantification</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {quantification.map((q, i) => (
              <motion.div key={q.label} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="text-center">
                <q.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-3xl font-extrabold">{q.value}</p>
                <p className="text-sm text-muted-foreground font-body">{q.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16 bg-muted/50">
        <div className="container text-center">
          <h2 className="text-2xl font-bold mb-8">Program Partners</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {partners.map((p) => (
              <span key={p} className="px-4 py-2 bg-card rounded-full border text-sm font-body">{p}</span>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default MEFrameworkPage;
