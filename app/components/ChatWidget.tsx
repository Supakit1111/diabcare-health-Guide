"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, User, Bot, Loader2, AlertCircle } from "lucide-react";
import Image from "next/image";
import { cn } from "@/app/lib/utils";

interface Message {
  role: "user" | "bot";
  content: string;
}

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", content: "สวัสดีค่ะ! หมอหม่อนนะคะ ยินดีให้คำปรึกษาเรื่องเบาหวานค่ะ วันนี้มีอะไรให้หมอหม่อนช่วยแนะนำไหมคะ?" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg = input.trim();
    setInput("");
    setError(null);
    
    const newMessages = [...messages, { role: "user" as const, content: userMsg }];
    setMessages(newMessages);
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) throw new Error("Failed to connect to หมอหม่อน");

      const data = await response.json();
      setMessages((prev) => [...prev, { role: "bot", content: data.content }]);
    } catch (err) {
      console.error("Chat Error:", err);
      setError("ขออภัยค่ะ หมอหม่อนไม่สามารถเชื่อมต่อระบบได้ในขณะนี้");
      // Optional: Add a system message about the error
      setMessages((prev) => [...prev, { role: "bot", content: "ขออภัยค่ะ ระบบขัดข้องชั่วคราว รบกวนลองใหม่อีกครั้งนะคะ" }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-[350px] sm:w-[400px] h-[580px] glass-card flex flex-col shadow-2xl border-primary/20 bg-white/95"
          >
            {/* Header */}
            <div className="p-4 bg-primary text-white rounded-t-2xl flex items-center justify-between shadow-lg">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white/50 bg-white">
                  <Image src="/images/ai-avatar.png" alt="หมอหม่อน AI" fill className="object-cover" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">หมอหม่อน (Gen AI Assistant)</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] opacity-80 uppercase tracking-wider font-bold">Gemini 1.5 Powered</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="hover:bg-white/20 p-2 rounded-full transition-all active:scale-90"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth bg-slate-50/30">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={cn("flex items-start gap-2.5", msg.role === "user" ? "flex-row-reverse" : "flex-row")}
                >
                  <div className={cn("w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm", 
                    msg.role === "bot" ? "bg-primary/10 text-primary border border-primary/20" : "bg-accent/10 text-accent border border-accent/20")}>
                    {msg.role === "bot" ? <Bot size={16} /> : <User size={16} />}
                  </div>
                  <div className={cn("max-w-[80%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-xs", 
                    msg.role === "bot" ? "bg-white border text-slate-700 rounded-tl-none" : "bg-primary text-white rounded-tr-none")}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex items-center gap-2 text-primary text-xs font-bold ml-10 animate-pulse">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>หมอหม่อนกำลังวิเคราะห์...</span>
                </div>
              )}
              {error && (
                <div className="flex items-center gap-2 text-destructive text-xs font-medium ml-10 bg-destructive/10 p-2 rounded-lg">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{error}</span>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t bg-white rounded-b-2xl">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="ปรึกษาเรื่องเบาหวานกับหมอหม่อน..."
                  className="w-full bg-slate-50 pl-4 pr-12 py-3.5 rounded-xl border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all text-sm"
                  disabled={isTyping}
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="absolute right-1.5 top-1.5 w-11 h-11 bg-primary text-white rounded-lg flex items-center justify-center hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 transition-all shadow-lg shadow-primary/20"
                >
                  {isTyping ? <Loader2 size={18} className="animate-spin" /> : <Send size={20} />}
                </button>
              </div>
              <p className="text-[10px] text-center text-muted-foreground mt-3 uppercase tracking-wider font-medium opacity-60">
                AI can provide helpful info but consult your doctor for medical advice.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1, rotate: -2 }}
        whileTap={{ scale: 0.9 }}
        className="w-16 h-16 bg-primary text-white rounded-2xl flex items-center justify-center shadow-2xl relative overflow-hidden group border-4 border-white"
      >
        <div className="absolute inset-0 bg-linear-to-tr from-white/30 to-transparent pointer-events-none" />
        <motion.div
          animate={isOpen ? { rotate: 90, scale: 0 } : { rotate: 0, scale: 1 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <MessageCircle size={32} />
        </motion.div>
        <motion.div
          animate={isOpen ? { rotate: 0, scale: 1 } : { rotate: -90, scale: 0 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <X size={32} />
        </motion.div>
        
        {/* Helper Badge */}
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute -left-36 top-1/2 -translate-y-1/2 bg-white text-primary px-4 py-2 rounded-xl text-xs font-black shadow-2xl border border-primary/10 whitespace-nowrap pointer-events-none sm:block hidden"
          >
            คุยกับหมอหม่อน (Gemini) 👋
          </motion.div>
        )}
      </motion.button>
    </div>
  );
};

export default ChatWidget;
