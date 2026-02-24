import { useState } from "react";
import { motion } from "framer-motion";
import { Gift, CheckCircle, MessageSquare, BarChart3, MapPin, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import PhoneMockup from "@/components/PhoneMockup";
import { Button } from "@/components/ui/button";
import sproxilLogo from "@/assets/sproxil-logo-red.jpg";

const surveyQuestions = [
  { q: "Were you tested for malaria before buying this medicine?", options: ["Yes", "No"] },
  { q: "Which test was used?", options: ["Rapid test (mRDT)", "Microscopy", "Not sure"] },
  { q: "How much did you pay for the medicine?", options: ["₦500–₦1,000", "₦1,000–₦2,000", "More than ₦2,000", "Free"] },
  { q: "Are you feeling better after taking the medicine?", options: ["Yes, much better", "Somewhat", "No improvement", "Got worse"] },
];

const surveyStats = [
  { icon: MessageSquare, value: "78.8%", label: "Completion Rate" },
  { icon: MapPin, value: "774", label: "LGAs Covered" },
  { icon: BarChart3, value: "42K+", label: "Surveys Completed" },
  { icon: Gift, value: "₦42M+", label: "Airtime Distributed" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const SurveyPage = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [completed, setCompleted] = useState(false);

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    if (currentQ < surveyQuestions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setCompleted(true);
    }
  };

  const reset = () => {
    setCurrentQ(0);
    setAnswers([]);
    setCompleted(false);
  };

  return (
    <main>
      <section className="py-16 lg:py-24 bg-primary">
        <div className="container grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
            <img src={sproxilLogo} alt="Sproxil" className="h-10 mb-6" />
            <Gift className="w-10 h-10 text-sproxil-gold mb-4" />
            <h1 className="text-3xl md:text-5xl font-extrabold text-primary-foreground mb-4">
              Patient Survey & Incentives
            </h1>
            <p className="text-primary-foreground/80 text-lg font-body max-w-lg mb-6">
              After verifying their medicine, patients are invited to complete a short outcome survey.
              Upon completion, they receive instant airtime as a reward — ensuring accountability and encouraging proper healthcare behavior.
            </p>
            <div className="space-y-3 text-primary-foreground/90 text-sm font-body">
              <p className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-sproxil-gold" /> Verify medicine → get survey invite</p>
              <p className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-sproxil-gold" /> Answer 4 quick questions via SMS/WhatsApp</p>
              <p className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-sproxil-gold" /> Receive instant ₦1,000 airtime reward</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="flex justify-center">
            <PhoneMockup>
              <div className="flex flex-col h-full">
                <div className="bg-primary text-primary-foreground px-4 py-3 pt-8">
                  <p className="text-sm font-semibold">Sproxil Patient Survey</p>
                  <p className="text-xs opacity-70">Complete to earn ₦1,000 airtime</p>
                </div>

                <div className="flex-1 p-4 overflow-y-auto">
                  {!completed ? (
                    <motion.div key={currentQ} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                      <p className="text-xs text-muted-foreground font-body mb-1">Question {currentQ + 1} of {surveyQuestions.length}</p>
                      <div className="w-full h-1.5 bg-muted rounded-full mb-4">
                        <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${((currentQ + 1) / surveyQuestions.length) * 100}%` }} />
                      </div>
                      <p className="text-sm font-semibold mb-4">{surveyQuestions[currentQ].q}</p>
                      <div className="space-y-2">
                        {surveyQuestions[currentQ].options.map((opt) => (
                          <button
                            key={opt}
                            onClick={() => handleAnswer(opt)}
                            className="w-full text-left px-4 py-3 rounded-xl border text-sm hover:bg-primary/10 hover:border-primary transition-colors font-body"
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
                      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                      </div>
                      <h3 className="font-bold text-lg mb-2">Thank You! 🎉</h3>
                      <p className="text-sm text-muted-foreground font-body mb-4">
                        Your survey is complete. ₦1,000 airtime has been sent to your phone number.
                      </p>
                      <div className="flex items-center justify-center gap-2 p-3 bg-green-50 rounded-xl border border-green-200 mb-4">
                        <Phone className="w-5 h-5 text-green-600" />
                        <span className="text-sm font-bold text-green-800">+234 *** **** 7890</span>
                        <span className="text-sm text-green-600">→ ₦1,000</span>
                      </div>
                      <Button size="sm" variant="outline" onClick={reset}>Take Survey Again</Button>
                    </motion.div>
                  )}
                </div>
              </div>
            </PhoneMockup>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-background">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-10">Survey Analytics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {surveyStats.map((s, i) => (
              <motion.div key={s.label} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="text-center">
                <s.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-3xl font-extrabold text-foreground">{s.value}</p>
                <p className="text-sm text-muted-foreground font-body">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default SurveyPage;
