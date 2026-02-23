import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, MessageSquare, Pill, AlertTriangle, Clock, CheckCircle, Stethoscope, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import PhoneMockup from "@/components/PhoneMockup";
import GlossaryTerm from "@/components/GlossaryTerm";

const features = [
  { icon: Stethoscope, title: "Point of Care Diagnosis", desc: "AI-assisted interpretation of mRDT results from photos" },
  { icon: Pill, title: "Dosage Guidance", desc: "Weight & age-appropriate ACT dosing recommendations" },
  { icon: AlertTriangle, title: "Drug Interactions", desc: "Alerts for contraindications and dangerous combinations" },
  { icon: Clock, title: "Treatment Reminders", desc: "Automated SMS reminders for full treatment adherence" },
  { icon: CheckCircle, title: "Adherence Tracking", desc: "Follow-up surveys to confirm treatment completion" },
  { icon: MessageSquare, title: "Symptom Assessment", desc: "Guided symptom triage with referral when needed" },
];

const campaignStats = [
  { value: "78.8%", label: "Survey Completion Rate" },
  { value: "51M+", label: "WhatsApp Users Reachable" },
  { value: "24/7", label: "Always Available" },
  { value: "4", label: "Languages Supported" },
];

interface ChatMessage {
  id: number;
  text: string;
  sender: "user" | "aisha";
  time: string;
}

const presetQuestions = [
  "What is the correct ACT dosage for a 25kg child?",
  "Can I take Coartem with paracetamol?",
  "My patient has a fever — what should I check?",
];

const aiResponses: Record<string, string> = {
  "What is the correct ACT dosage for a 25kg child?":
    "💊 For a child weighing 25kg:\n\n**Artemether-Lumefantrine (Coartem)**\n• 2 tablets per dose\n• 6 doses over 3 days\n• Day 1: doses at 0h and 8h\n• Day 2-3: twice daily\n\nAdminister with fatty food for better absorption. Complete the full course even if symptoms improve.",
  "Can I take Coartem with paracetamol?":
    "✅ Yes, Coartem (Artemether-Lumefantrine) can be safely taken with Paracetamol.\n\nParacetamol helps manage fever and pain during malaria treatment.\n\n⚠️ Avoid: Erythromycin, Ketoconazole, and grapefruit juice with Coartem.",
  "My patient has a fever — what should I check?":
    "🌡️ Fever Assessment Protocol:\n\n1. **Perform mRDT** — Rule out malaria first\n2. Check temperature (>38°C = significant)\n3. Ask about: headache, body aches, vomiting, diarrhea\n4. Check for danger signs: convulsions, inability to drink, severe vomiting\n\n🚨 If danger signs present → Refer to hospital immediately\n\nSend mRDT photo for AI interpretation.",
};

const AishaPage = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 0, text: "Hello! I'm AISHA, your AI health assistant. I can help with dosage guidance, drug interactions, and symptom assessment. How can I help you today?", sender: "aisha", time: "9:00 AM" },
  ]);

  const handleQuestion = (q: string) => {
    const userMsg: ChatMessage = { id: messages.length, text: q, sender: "user", time: "9:01 AM" };
    const response = aiResponses[q] || "I'm processing your question. In the full system, I'd provide evidence-based guidance here.";
    const botMsg: ChatMessage = { id: messages.length + 1, text: response, sender: "aisha", time: "9:01 AM" };
    setMessages((prev) => [...prev, userMsg, botMsg]);
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
  };

  return (
    <main>
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary via-primary to-sproxil-teal">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
              <div className="flex items-center gap-2 mb-4">
                <Bot className="w-8 h-8 text-sproxil-gold" />
                <span className="text-sproxil-gold font-bold text-lg">AISHA</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold text-primary-foreground leading-tight mb-4">
                AI Health Agent for Community Healthcare
              </h1>
              <p className="text-primary-foreground/80 text-lg mb-6 font-body max-w-lg">
                AISHA works over WhatsApp to assist <GlossaryTerm term="PPMV">PPMVs</GlossaryTerm> with point-of-care
                decisions — from <GlossaryTerm term="mRDT">mRDT</GlossaryTerm> interpretation to dosage guidance, drug
                interaction checks, and patient follow-up.
              </p>
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary-foreground/10 text-primary-foreground text-sm">
                  <Globe className="w-4 h-4" /> English · Hausa · Yoruba · Igbo
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="flex justify-center">
              <PhoneMockup>
                <div className="flex flex-col h-full">
                  <div className="bg-sproxil-teal text-secondary-foreground px-4 py-3 pt-8 flex items-center gap-3">
                    <Bot className="w-6 h-6" />
                    <div>
                      <p className="text-sm font-semibold">AISHA Health Agent</p>
                      <p className="text-xs opacity-70">AI-powered</p>
                    </div>
                  </div>

                  <div className="flex-1 bg-[#e5ddd5] p-3 space-y-2 overflow-y-auto min-h-0">
                    <AnimatePresence>
                      {messages.map((msg) => (
                        <motion.div
                          key={msg.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div className={`max-w-[85%] rounded-lg px-3 py-2 text-xs shadow-sm ${msg.sender === "user" ? "bg-[#dcf8c6]" : "bg-white"} text-gray-800`}>
                            <p className="whitespace-pre-line">{msg.text}</p>
                            <span className="text-[9px] text-gray-500 float-right mt-1">{msg.time}</span>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  <div className="bg-[#f0f0f0] p-2 space-y-1">
                    {presetQuestions.map((q) => (
                      <button
                        key={q}
                        onClick={() => handleQuestion(q)}
                        className="w-full text-left bg-white rounded-lg px-3 py-2 text-[10px] text-gray-700 hover:bg-gray-50 transition-colors border border-gray-200"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              </PhoneMockup>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature cards */}
      <section className="py-16 bg-background">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-10">AISHA Capabilities</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div key={f.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <f.icon className="w-8 h-8 text-secondary mb-3" />
                    <h3 className="font-bold mb-1">{f.title}</h3>
                    <p className="text-sm text-muted-foreground font-body">{f.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Campaign stats */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-10">Health Campaign Reach</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {campaignStats.map((s, i) => (
              <motion.div key={s.label} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="text-center">
                <p className="text-4xl font-extrabold text-secondary">{s.value}</p>
                <p className="text-sm text-muted-foreground mt-1 font-body">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default AishaPage;
