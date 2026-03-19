"use client";

import Image from "next/image";
import { AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

const highSugarFruits = [
  { name: "ทุเรียน", sugar: "27g / 100g", gi: "สูงมาก", risk: "🔴", detail: "น้ำตาลและไขมันสูงมาก ควรหลีกเลี่ยง" },
  { name: "มะม่วงสุก", sugar: "14g / 100g", gi: "สูง", risk: "🔴", detail: "น้ำตาลสูง โดยเฉพาะมะม่วงน้ำดอกไม้" },
  { name: "ลำไย", sugar: "15g / 100g", gi: "สูง", risk: "🔴", detail: "กินง่ายหยุดยาก น้ำตาลพุ่งเร็ว" },
  { name: "ลิ้นจี่", sugar: "15g / 100g", gi: "สูง", risk: "🔴", detail: "น้ำตาลฟรุกโตสสูง ดูดซึมเร็ว" },
  { name: "องุ่น", sugar: "16g / 100g", gi: "ปานกลาง-สูง", risk: "🟠", detail: "กินทีละไม่เกิน 10-12 ลูก" },
  { name: "สับปะรด", sugar: "10g / 100g", gi: "ปานกลาง-สูง", risk: "🟠", detail: "ค่า GI สูง ทำน้ำตาลพุ่งเร็ว" },
  { name: "แตงโม", sugar: "6g / 100g", gi: "สูง", risk: "🟠", detail: "น้ำตาลน้อยแต่ค่า GI สูง" },
  { name: "กล้วยหอม", sugar: "12g / 100g", gi: "ปานกลาง", risk: "🟡", detail: "เลือกกล้วยที่ยังไม่สุกมากจะดีกว่า" },
];

const safeFruits = [
  { name: "ฝรั่ง", emoji: "🍐", detail: "ค่า GI ต่ำ ใยอาหารสูง วิตามินซีเยอะ" },
  { name: "แอปเปิ้ลเขียว", emoji: "🍏", detail: "ค่า GI ต่ำ เพกตินช่วยชะลอน้ำตาล" },
  { name: "ส้มส่วนสด", emoji: "🍊", detail: "กินทั้งผล (ไม่คั้นน้ำ) ใยอาหารสูง" },
  { name: "แก้วมังกร", emoji: "🐉", detail: "แคลอรี่ต่ำ กากใยสูงมาก" },
];

const FruitsSection = () => {
  return (
    <section id="ผลไม้ควรเลี่ยง" className="py-24 bg-muted/40 overflow-hidden">
      <div className="section-container">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-5xl font-black text-foreground mb-6">ความลับของผลไม้ไทย</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            แม้ผลไม้จะมีประโยชน์ แต่ในผู้ป่วยเบาหวาน <span className="text-accent font-bold">"น้ำตาลฟรุกโตส"</span> <br className="hidden sm:block"/>
            อาจทำให้ระดับน้ำตาลสะสม (HbA1c) สูงขึ้นอย่างไม่รู้ตัว
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-10 items-start mb-24">
          <motion.div
            className="lg:col-span-5 relative group"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="absolute inset-0 bg-accent/20 rounded-3xl blur-3xl group-hover:bg-accent/30 transition-colors" />
            <div className="relative rounded-3xl shadow-2xl overflow-hidden aspect-square lg:aspect-auto lg:h-[600px] border-8 border-white">
              <Image
                src="/images/high-sugar-fruits.jpg"
                alt="ผลไม้ที่มีน้ำตาลสูง"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <p className="text-sm font-bold uppercase tracking-widest mb-2 text-accent-foreground">คำเตือนพิเศษ</p>
                <h3 className="text-2xl font-black italic">จำกัดปริมาณ เพื่อระดับน้ำตาลที่คงที่</h3>
              </div>
            </div>
          </motion.div>
          
          <div className="lg:col-span-7">
            <motion.div
              className="flex items-center gap-4 mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="w-14 h-14 rounded-3xl bg-accent/20 flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-accent" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-foreground">ผลไม้น้ำตาลสูง — ควรจำกัด</h3>
                <p className="text-sm text-muted-foreground">ปริมาณน้ำตาลต่อ 100 กรัม (โดยประมาณ)</p>
              </div>
            </motion.div>
            
            <div className="grid sm:grid-cols-2 gap-4">
              {highSugarFruits.map((fruit, i) => (
                <motion.div
                  key={fruit.name}
                  className="glass-card p-6 border-white/40"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-lg font-black text-foreground flex items-center gap-2">
                      <span className="scale-125">{fruit.risk}</span> {fruit.name}
                    </h4>
                    <span className="text-xs font-black text-white bg-accent px-3 py-1 rounded-full shadow-xs">
                      {fruit.sugar}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">{fruit.detail}</p>
                  <div className="flex items-center gap-2 text-xs font-black uppercase text-accent">
                    <span className="w-2 h-2 rounded-full bg-accent" />
                    ค่า GI (ดัชนีน้ำตาล): {fruit.gi}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <motion.div
          className="mt-12 bg-white/40 rounded-3xl p-10 border border-white shadow-xs"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col items-center mb-10">
            <div className="w-16 h-1 bg-primary mb-4 rounded-full" />
            <h3 className="text-3xl font-black text-primary text-center">
              ผลไม้ที่ทานได้อย่างปลอดภัย ✨
            </h3>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {safeFruits.map((fruit, i) => (
              <motion.div
                key={fruit.name}
                className="glass-card p-8 text-center bg-white/60 border-primary/5"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -12, backgroundColor: "rgba(255,255,255,1)" }}
              >
                <div className="relative mb-6">
                  <motion.div 
                    className="absolute inset-0 bg-primary/20 blur-2xl rounded-full"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
                  />
                  <motion.span
                    className="text-6xl block relative z-10"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
                  >
                    {fruit.emoji}
                  </motion.span>
                </div>
                <h4 className="text-xl font-black text-foreground mb-2">{fruit.name}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{fruit.detail}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FruitsSection;
