import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Factory, Truck, Building, Store, User, QrCode, Package, Scan, ArrowRight, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import PhoneMockup from "@/components/PhoneMockup";
import GlossaryTerm from "@/components/GlossaryTerm";

const nodes = [
  {
    icon: Factory,
    label: "Manufacturer",
    detail: "Each product is assigned a unique serial number, GS1-compliant GTIN, and DataMatrix barcode. Batch/lot info, manufacturing date, and expiry are encoded.",
    actions: ["Serialization", "Encoding", "QR/DataMatrix printing"],
  },
  {
    icon: Truck,
    label: "Distributor",
    detail: "Products are scanned and aggregated into shipment containers. Parent-child relationships link individual items to cases and pallets.",
    actions: ["Scanning", "Aggregation", "Shipping"],
  },
  {
    icon: Building,
    label: "Wholesaler",
    detail: "Incoming shipments are verified by scanning. Any discrepancies trigger alerts. Chain of custody is recorded with timestamps and GPS.",
    actions: ["Receiving", "Verification", "Storage"],
  },
  {
    icon: Store,
    label: "Retailer (PPMV)",
    detail: "Community pharmacists scan products at point of sale. The system confirms authenticity and logs the dispensing event with location data.",
    actions: ["Dispensing", "PIN verification", "GPS capture"],
  },
  {
    icon: User,
    label: "Consumer",
    detail: "Patients verify their medicine by scratching the security label and texting the PIN, or scanning the QR code via WhatsApp. They receive instant authentication.",
    actions: ["Scratch & verify", "QR scan", "SMS confirmation"],
  },
];

const traceEvents = [
  { status: "Encoded", location: "Emzor Factory, Lagos", time: "Jan 15, 2025 08:30", icon: Package },
  { status: "Commissioned", location: "Emzor QA Lab", time: "Jan 15, 2025 14:00", icon: CheckCircle },
  { status: "Packed", location: "Emzor Warehouse", time: "Jan 16, 2025 09:00", icon: Package },
  { status: "Shipped", location: "Lagos → Kano", time: "Jan 17, 2025 06:00", icon: Truck },
  { status: "Received", location: "Kano Central Warehouse", time: "Jan 19, 2025 11:30", icon: Building },
  { status: "Dispensed", location: "Sabon Gari PPMV, Kano", time: "Jan 22, 2025 15:45", icon: Store },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const SupplyChainPage = () => {
  const [activeNode, setActiveNode] = useState(0);

  return (
    <main>
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary to-sproxil-teal">
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0} className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-extrabold text-primary-foreground mb-4">
              Supply Chain Traceability
            </h1>
            <p className="text-primary-foreground/80 text-lg font-body max-w-2xl mx-auto">
              End-to-end <GlossaryTerm term="GS1">GS1</GlossaryTerm>-compliant tracking from manufacturing to patient — every product serialized, every movement logged.
            </p>
          </motion.div>

          {/* Interactive Flow */}
          <div className="flex flex-wrap justify-center items-center gap-2 mb-8">
            {nodes.map((node, i) => (
              <div key={node.label} className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveNode(i)}
                  className={`flex flex-col items-center p-4 rounded-xl transition-all ${
                    activeNode === i
                      ? "bg-sproxil-gold text-primary shadow-lg"
                      : "bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20"
                  }`}
                >
                  <node.icon className="w-8 h-8 mb-1" />
                  <span className="text-xs font-semibold">{node.label}</span>
                </motion.button>
                {i < nodes.length - 1 && <ArrowRight className="w-5 h-5 text-primary-foreground/40 hidden md:block" />}
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeNode}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl mx-auto"
            >
              <Card className="bg-primary-foreground/10 border-primary-foreground/20 backdrop-blur">
                <CardContent className="p-6 text-primary-foreground">
                  <h3 className="text-xl font-bold mb-2">{nodes[activeNode].label}</h3>
                  <p className="text-sm opacity-80 mb-4 font-body">{nodes[activeNode].detail}</p>
                  <div className="flex flex-wrap gap-2">
                    {nodes[activeNode].actions.map((a) => (
                      <span key={a} className="px-3 py-1 rounded-full bg-sproxil-gold/20 text-sproxil-gold text-xs font-medium">{a}</span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Trace Map + Consumer Verification */}
      <section className="py-16 bg-background">
        <div className="container grid lg:grid-cols-2 gap-12 items-start">
          {/* Trace Timeline */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Product Trace Record</h2>
            <p className="text-sm text-muted-foreground font-body mb-6">
              Example: <GlossaryTerm term="ACT">ACT</GlossaryTerm> Batch EMZ-ACT-2025-0042 — full journey from factory to patient
            </p>
            <div className="space-y-0">
              {traceEvents.map((ev, i) => (
                <motion.div key={ev.status} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                      <ev.icon className="w-5 h-5 text-secondary" />
                    </div>
                    {i < traceEvents.length - 1 && <div className="w-0.5 h-12 bg-border" />}
                  </div>
                  <div className="pb-8">
                    <p className="font-semibold text-sm">{ev.status}</p>
                    <p className="text-xs text-muted-foreground font-body">{ev.location}</p>
                    <p className="text-xs text-muted-foreground/60 font-body">{ev.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Consumer Verification Phone */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Consumer Verification</h2>
            <p className="text-sm text-muted-foreground font-body mb-6">
              Patient scans QR code or texts PIN — receives full product authentication
            </p>
            <PhoneMockup>
              <div className="p-4 pt-10 space-y-3">
                <div className="bg-sproxil-teal text-secondary-foreground rounded-xl p-4 text-center">
                  <QrCode className="w-12 h-12 mx-auto mb-2" />
                  <p className="text-sm font-bold">Scan to Verify</p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="font-bold text-green-800 text-sm">GENUINE ✓</span>
                  </div>
                  <div className="space-y-1.5 text-xs text-gray-700 font-body">
                    <p><strong>Product:</strong> Artemether-Lumefantrine 20/120mg</p>
                    <p><strong>Manufacturer:</strong> Emzor Pharmaceutical</p>
                    <p><strong><GlossaryTerm term="NAFDAC">NAFDAC</GlossaryTerm> No:</strong> A4-0123</p>
                    <p><strong>Batch:</strong> EMZ-ACT-2025-0042</p>
                    <p><strong>Manufactured:</strong> Jan 2025</p>
                    <p><strong>Expiry:</strong> Dec 2026</p>
                    <p><strong>Serial:</strong> SRX-9847362510</p>
                  </div>
                </div>
                <p className="text-[10px] text-center text-gray-400 font-body">Verified by Sproxil Defender™ Platform</p>
              </div>
            </PhoneMockup>
          </div>
        </div>
      </section>

      {/* GS1 Compliance */}
      <section className="py-16 bg-muted/50">
        <div className="container text-center">
          <h2 className="text-2xl font-bold mb-8">GS1 Compliance Standards</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "GTIN", desc: "Global Trade Item Number — unique product identifier" },
              { label: "Batch/Lot", desc: "Production batch tracking for recalls" },
              { label: "Serial Numbers", desc: "Unit-level unique identification" },
              { label: "DataMatrix", desc: "2D barcode encoding all product data" },
            ].map((item, i) => (
              <motion.div key={item.label} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                <Card>
                  <CardContent className="p-6">
                    <Scan className="w-8 h-8 text-secondary mx-auto mb-3" />
                    <h3 className="font-bold">{item.label}</h3>
                    <p className="text-xs text-muted-foreground mt-1 font-body">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default SupplyChainPage;
