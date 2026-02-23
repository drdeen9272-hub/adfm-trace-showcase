import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Check, CheckCheck, Camera } from "lucide-react";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  time: string;
  image?: boolean;
}

const demoFlow: Message[] = [
  { id: 1, text: "📸 mRDT Test Photo", sender: "user", time: "9:01 AM", image: true },
  { id: 2, text: "✅ Test received! Result: POSITIVE for Plasmodium falciparum. Please dispense ACT to the patient.", sender: "bot", time: "9:01 AM" },
  { id: 3, text: "ACT dispensed. PIN: 4829-7361", sender: "user", time: "9:03 AM" },
  { id: 4, text: "✅ Product VERIFIED — Genuine\n🏭 Manufacturer: Emzor Pharma\n📅 Expiry: Dec 2026\n🔢 Batch: EMZ-ACT-2025-0042\n\nPatient will receive ₦850 airtime reward after completing outcome survey.", sender: "bot", time: "9:03 AM" },
  { id: 5, text: "₦150 incentive credited to your wallet. Thank you! 🎉", sender: "bot", time: "9:04 AM" },
];

const WhatsAppDemo = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [step, setStep] = useState(0);

  const handleNext = () => {
    if (step >= demoFlow.length) return;
    // Add messages up to next user message or all remaining bot messages
    const newMsgs: Message[] = [];
    let i = step;
    newMsgs.push(demoFlow[i]);
    i++;
    // Add consecutive bot messages
    while (i < demoFlow.length && demoFlow[i].sender === "bot") {
      newMsgs.push(demoFlow[i]);
      i++;
    }
    setMessages((prev) => [...prev, ...newMsgs]);
    setStep(i);
  };

  const handleReset = () => {
    setMessages([]);
    setStep(0);
  };

  return (
    <div className="flex flex-col h-full">
      {/* WhatsApp header */}
      <div className="bg-sproxil-teal text-secondary-foreground px-4 py-3 pt-8 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-secondary-foreground/20 flex items-center justify-center text-xs font-bold">S</div>
        <div>
          <p className="text-sm font-semibold">Sproxil ADMFm</p>
          <p className="text-xs opacity-70">Online</p>
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 bg-[#e5ddd5] p-3 space-y-2 overflow-y-auto min-h-0" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c5bfb0' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}>
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3 }}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-lg px-3 py-2 text-xs shadow-sm ${
                  msg.sender === "user"
                    ? "bg-[#dcf8c6] text-gray-800"
                    : "bg-white text-gray-800"
                }`}
              >
                {msg.image && (
                  <div className="bg-gray-200 rounded mb-1 p-4 flex items-center justify-center">
                    <Camera className="w-6 h-6 text-gray-500" />
                    <span className="text-[10px] ml-1 text-gray-500">Photo</span>
                  </div>
                )}
                <p className="whitespace-pre-line">{msg.text}</p>
                <div className="flex items-center justify-end gap-1 mt-1">
                  <span className="text-[9px] text-gray-500">{msg.time}</span>
                  {msg.sender === "user" && <CheckCheck className="w-3 h-3 text-blue-500" />}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {messages.length === 0 && (
          <p className="text-center text-xs text-gray-500 mt-8">Tap below to start the demo</p>
        )}
      </div>

      {/* Input bar */}
      <div className="bg-[#f0f0f0] px-3 py-2 flex items-center gap-2">
        {step < demoFlow.length ? (
          <button
            onClick={handleNext}
            className="flex-1 bg-white rounded-full px-4 py-2 text-xs text-left text-gray-500 hover:bg-gray-50 transition-colors"
          >
            Tap to continue demo...
          </button>
        ) : (
          <button
            onClick={handleReset}
            className="flex-1 bg-white rounded-full px-4 py-2 text-xs text-center text-sproxil-teal font-semibold hover:bg-gray-50 transition-colors"
          >
            🔄 Restart Demo
          </button>
        )}
        <div className="w-8 h-8 rounded-full bg-sproxil-teal flex items-center justify-center">
          <Send className="w-4 h-4 text-white" />
        </div>
      </div>
    </div>
  );
};

export default WhatsAppDemo;
