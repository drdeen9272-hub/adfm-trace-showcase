import { motion } from "framer-motion";
import { FlaskConical, Pill, MapPin, Gift, ShieldCheck, Users, TrendingUp, Building2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PhoneMockup from "@/components/PhoneMockup";
import WhatsAppDemo from "@/components/WhatsAppDemo";
import GlossaryTerm from "@/components/GlossaryTerm";

const stats = [
  { value: "4.5B+", label: "Products Protected" },
  { value: "35M+", label: "Consumers Reached" },
  { value: "22K+", label: "mRDTs Piloted" },
  { value: "300+", label: "Brand Partners" },
  { value: "8,000+", label: "PPMVs Enrolled" },
];

const steps = [
  {
    icon: FlaskConical,
    title: "TEST",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    desc: "Pharmacist administers an mRDT (rapid malaria test), sends a photo to Sproxil via WhatsApp. AI instantly interprets the result — positive or negative.",
  },
  {
    icon: Pill,
    title: "TREAT",
    color: "text-green-500",
    bg: "bg-green-500/10",
    desc: "Patient purchases a verified ACT (malaria medicine). They scratch the security label, text the PIN to confirm it's genuine, and receive a confirmation SMS.",
  },
  {
    icon: MapPin,
    title: "TRACK",
    color: "text-orange-500",
    bg: "bg-orange-500/10",
    desc: "GPS location is captured automatically. GS1-standard batch traceability is logged, photo evidence is securely stored — full accountability from factory to patient.",
  },
  {
    icon: Gift,
    title: "INCENTIVIZE",
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    desc: "Pharmacist earns ₦150 per verified test-and-treat cycle. Patient receives ₦850 airtime after completing an outcome survey — everyone is rewarded for doing the right thing.",
  },
];

const challenges = [
  {
    icon: TrendingUp,
    title: "Nigeria's Malaria Burden",
    desc: "Nigeria accounts for 27% of all malaria cases worldwide — the highest of any country. Over 190 million people are at risk.",
  },
  {
    icon: Users,
    title: "Last-Mile Access Gap",
    desc: "~70% of Nigerians seek first-contact healthcare from PPMVs (community pharmacies). These outlets span all 774 LGAs but often lack diagnostic tools and quality-assured medicines.",
  },
  {
    icon: Building2,
    title: "Commodity Diversion Risk",
    desc: "Subsidized medicines and test kits can be diverted from their intended recipients. Without end-to-end traceability, programs lose accountability and donor confidence.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const },
  }),
};

const Index = () => {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-sproxil-teal py-16 lg:py-24">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-secondary blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 rounded-full bg-sproxil-gold blur-3xl" />
        </div>

        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left — Text */}
            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
              <span className="inline-block px-4 py-1.5 mb-4 rounded-full bg-secondary/20 text-secondary-foreground text-sm font-medium border border-secondary/30">
                🦟 ADMFm Program — Interactive Demo
              </span>
              <h1 className="text-3xl md:text-5xl font-extrabold text-primary-foreground leading-tight mb-4">
                Test. Treat. Track.{" "}
                <span className="text-sproxil-gold">Incentivize.</span>
              </h1>
              <p className="text-primary-foreground/80 text-lg mb-6 max-w-lg font-body">
                Sproxil's end-to-end traceability platform for Nigeria's{" "}
                <span className="font-semibold text-primary-foreground">
                  Affordable Diagnostics & Medicine for Malaria
                </span>{" "}
                program — ensuring every test kit and medicine reaches the right patient, verified and tracked.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button size="lg" className="bg-sproxil-gold text-primary hover:bg-sproxil-gold/90 font-semibold" asChild>
                  <a href="#how-it-works">
                    Explore the Solution <ArrowRight className="ml-1 w-4 h-4" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
                  <Link to="/tpr-dashboard">See the Dashboard</Link>
                </Button>
              </div>
            </motion.div>

            {/* Right — Phone Demo */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex justify-center"
            >
              <PhoneMockup>
                <WhatsAppDemo />
              </PhoneMockup>
            </motion.div>
          </div>

          {/* Stats Banner */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={2}
            className="mt-16 grid grid-cols-2 md:grid-cols-5 gap-4"
          >
            {stats.map((s) => (
              <div key={s.label} className="text-center p-4 rounded-xl bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/10">
                <p className="text-2xl md:text-3xl font-extrabold text-sproxil-gold">{s.value}</p>
                <p className="text-xs text-primary-foreground/70 mt-1 font-body">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Challenge Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">The Challenge</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto font-body">
              Why Nigeria needs a smarter approach to malaria control at the community level
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {challenges.map((c, i) => (
              <motion.div key={c.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                <Card className="h-full hover:shadow-lg transition-shadow border-border/50">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
                      <c.icon className="w-6 h-6 text-secondary" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">{c.title}</h3>
                    <p className="text-sm text-muted-foreground font-body">{c.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 lg:py-24 bg-muted/50">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto font-body">
              A four-step accountability loop — from diagnosis to reward
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <motion.div key={s.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                <Card className="h-full hover:shadow-lg transition-all hover:-translate-y-1 border-border/50 group">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-10 h-10 rounded-lg ${s.bg} flex items-center justify-center`}>
                        <s.icon className={`w-5 h-5 ${s.color}`} />
                      </div>
                      <span className="text-xs font-bold text-muted-foreground">STEP {i + 1}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                    <p className="text-sm text-muted-foreground font-body">{s.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-primary to-sproxil-teal text-primary-foreground">
        <div className="container text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <h2 className="text-3xl font-bold mb-4">Explore the Full Platform</h2>
            <p className="text-primary-foreground/80 mb-8 font-body max-w-xl mx-auto">
              See how AISHA, supply chain traceability, real-time TPR dashboards, and patient incentives work together.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-sproxil-gold text-primary hover:bg-sproxil-gold/90 font-semibold" asChild>
                <Link to="/aisha">Meet AISHA</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
                <Link to="/supply-chain">Supply Chain</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-primary text-primary-foreground/60 text-center text-sm font-body">
        <div className="container">
          <img src="/sproxil-logo.png" alt="Sproxil" className="h-8 mx-auto mb-3 brightness-200" />
          <p>© {new Date().getFullYear()} Sproxil Inc. — ADMFm Interactive Demo Platform</p>
          <p className="mt-1 text-xs">4.5 billion products protected across 12 countries</p>
        </div>
      </footer>
    </main>
  );
};

export default Index;
