import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, MessageSquare, Pill, AlertTriangle, Clock, CheckCircle, Stethoscope, Globe, ClipboardList, HeartPulse } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import PhoneMockup from "@/components/PhoneMockup";
import GlossaryTerm from "@/components/GlossaryTerm";
import aishaPhoneImg from "@/assets/aisha-phone-demo.jpg";
import sproxilLogo from "@/assets/sproxil-logo-red.jpg";

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
      <section className="py-16 lg:py-24 bg-primary">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
              <div className="flex items-center gap-2 mb-4">
                <Bot className="w-8 h-8 text-sproxil-gold" />
                <span className="text-sproxil-gold font-bold text-lg">AISHA</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold text-primary-foreground leading-tight mb-4">
                AI-Powered Support Health Agent
              </h1>
              <p className="text-primary-foreground/80 text-lg mb-6 font-body max-w-lg">
                Instant health guidance through the world's most popular messaging platform. AISHA assists <GlossaryTerm term="PPMV">PPMVs</GlossaryTerm> with point-of-care
                decisions — from <GlossaryTerm term="mRDT">mRDT</GlossaryTerm> interpretation to dosage guidance and patient follow-up.
              </p>
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary-foreground/10 text-primary-foreground text-sm">
                  <Globe className="w-4 h-4" /> English · Hausa · Yoruba · Igbo
                </div>
              </div>

              <img src={sproxilLogo} alt="Sproxil" className="h-10 mt-6" />

              {/* AISHA phone number */}
              <div className="mt-6 p-4 rounded-xl bg-primary-foreground/10 border border-primary-foreground/20">
                <p className="text-primary-foreground text-sm font-bold">AISHA No: +17812409690</p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="flex justify-center">
              <PhoneMockup>
                <div className="flex flex-col h-full">
                  <div className="bg-primary text-primary-foreground px-4 py-3 pt-8 flex items-center gap-3">
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

      {/* How patients access AISHA — with real image */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-8">How Patients Access AISHA</h2>
              <div className="space-y-6">
                {[
                  { step: 1, title: "Patient verifies medicine / Directly chat AISHA", desc: "SMS/USSD code to 38353" },
                  { step: 2, title: "Receives confirmation + link", desc: "OK Original + AISHA Chat invite" },
                  { step: 3, title: "Opens WhatsApp chat", desc: "No app download needed" },
                  { step: 4, title: "Asks health questions", desc: "Local language support" },
                ].map((item) => (
                  <motion.div key={item.step} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={item.step} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <p className="font-bold">{item.title}</p>
                      <p className="text-sm text-muted-foreground font-body">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex justify-center">
              <img src={aishaPhoneImg} alt="AISHA WhatsApp demo" className="max-w-sm w-full rounded-2xl shadow-xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Capability Grid — matching slide layout */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-10">AISHA Capabilities</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card className="border-primary/30 border-2">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-primary mb-3">Point of Care Diagnosis</h3>
                <ul className="space-y-1 text-sm text-muted-foreground font-body">
                  <li>• Dosage guidance</li>
                  <li>• Drug interactions check</li>
                  <li>• Symptom assessment</li>
                  <li>• Referral recommendations</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-primary/30 border-2">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-primary mb-3">Case Management</h3>
                <ul className="space-y-1 text-sm text-muted-foreground font-body">
                  <li>• Treatment reminders</li>
                  <li>• Adherence tracking</li>
                  <li>• Follow-up scheduling</li>
                  <li>• Outcome monitoring</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-primary/30 border-2">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-primary mb-3">Health Campaigns</h3>
                <ul className="space-y-1 text-sm text-muted-foreground font-body">
                  <li>• ITN distribution support</li>
                  <li>• Vaccination reminders</li>
                  <li>• Health education content</li>
                  <li>• Campaign enrollment</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-primary/30 border-2">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-primary mb-3">Surveys & Data Collection</h3>
                <ul className="space-y-1 text-sm text-muted-foreground font-body">
                  <li>• Real-time survey delivery</li>
                  <li>• GPS-verified responses</li>
                  <li>• Automated data analysis</li>
                  <li>• 78.8% completion rate</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Campaign stats */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { value: "51M+", label: "WhatsApp Users in Nigeria" },
              { value: "24/7", label: "Availability" },
              { value: "4", label: "Languages: Hausa, Yoruba, Igbo, English" },
              { value: "Zero", label: "App Download" },
              { value: "Instant", label: "Response" },
            ].map((s, i) => (
              <motion.div key={s.label} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="text-center">
                <p className="text-3xl font-extrabold text-primary">{s.value}</p>
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
