"use client";

import { Check, X } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import type { Easing } from "framer-motion";

const goodFoods = [
  { name: "ผักใบเขียว", detail: "คะน้า ผักบุ้ง ผักกาด — ใยอาหารสูง น้ำตาลต่ำ", emoji: "🥬" },
  { name: "ปลา", detail: "ปลาแซลมอน ปลาทู — โอเมก้า 3 ดีต่อหัวใจ", emoji: "🐟" },
  { name: "ธัญพืชไม่ขัดสี", detail: "ข้าวกล้อง ขนมปังโฮลวีต — ย่อยช้า น้ำตาลไม่พุ่ง", emoji: "🌾" },
  { name: "ถั่วและเมล็ดพืช", detail: "อัลมอนด์ วอลนัท เมล็ดเจีย — ไขมันดี โปรตีนสูง", emoji: "🥜" },
  { name: "อะโวคาโด", detail: "ไขมันดีสูง ช่วยชะลอการดูดซึมน้ำตาล", emoji: "🥑" },
  { name: "ไข่", detail: "โปรตีนคุณภาพสูง ไม่เพิ่มน้ำตาลในเลือด", emoji: "🥚" },
];

const badFoods = [
  { name: "ข้าวขาว/ขนมปังขาว", detail: "แป้งขัดสี ทำให้น้ำตาลพุ่งเร็ว", emoji: "🍚" },
  { name: "น้ำหวาน/น้ำอัดลม", detail: "น้ำตาลสูงมาก ดูดซึมเร็ว", emoji: "🥤" },
  { name: "ขนมหวาน/เค้ก", detail: "น้ำตาลและไขมันทรานส์สูง", emoji: "🍰" },
  { name: "อาหารทอด", detail: "ไขมันสูง เพิ่มความเสี่ยงโรคหัวใจ", emoji: "🍟" },
  { name: "อาหารแปรรูป", detail: "โซเดียมสูง สารกันเสีย", emoji: "🌭" },
  { name: "แอลกอฮอล์", detail: "รบกวนระดับน้ำตาลและยา", emoji: "🍺" },
];

const easeOut: Easing = [0.22, 1, 0.36, 1];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.9, filter: "blur(10px)" },
  visible: (i: number) => ({
    opacity: 1, y: 0, scale: 1, filter: "blur(0px)",
    transition: { duration: 0.6, delay: i * 0.1, ease: easeOut },
  }),
};

const DietSection = () => {
  return (
    <section id="อาหารแนะนำ" className="py-24 bg-white/40">
      <div className="section-container">
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-5xl font-black text-foreground mb-6">โภชนาการสำหรับเบาหวาน</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            กุญแจสำคัญคือการเลือก <span className="text-primary font-bold underline decoration-primary/30">"คาร์โบไฮเดรตเชิงซ้อน"</span> <br className="hidden sm:block"/> 
            และหลีกเลี่ยงน้ำตาลแฝงที่ทำให้น้ำตาลในเลือดแกว่ง
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-5 mb-10">
              <motion.div
                className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center shadow-xl shadow-primary/10"
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Check className="w-8 h-8 text-primary" />
              </motion.div>
              <h3 className="text-3xl font-black text-primary">อาหารที่ควรเลือก ✨</h3>
            </div>
            <div className="grid gap-4">
              {goodFoods.map((food, i) => (
                <motion.div
                  key={food.name}
                  className="glass-card p-6 flex items-start gap-5 border-l-4 border-l-primary"
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                >
                  <motion.span
                    className="text-4xl p-2 bg-white rounded-xl shadow-xs"
                    whileHover={{ scale: 1.3, rotate: 15 }}
                  >
                    {food.emoji}
                  </motion.span>
                  <div>
                    <h4 className="text-xl font-bold text-foreground mb-1">{food.name}</h4>
                    <p className="text-muted-foreground leading-relaxed">{food.detail}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-5 mb-10">
              <motion.div
                className="w-16 h-16 rounded-2xl bg-destructive/20 flex items-center justify-center shadow-xl shadow-destructive/10"
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, -5, 5, 0]
                }}
                transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
              >
                <X className="w-8 h-8 text-destructive" />
              </motion.div>
              <h3 className="text-3xl font-black text-destructive">อาหารที่ควรลด ⚠️</h3>
            </div>
            <div className="grid gap-4">
              {badFoods.map((food, i) => (
                <motion.div
                  key={food.name}
                  className="glass-card p-6 flex items-start gap-5 border-l-4 border-l-destructive"
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                >
                  <motion.span
                    className="text-4xl p-2 bg-white rounded-xl shadow-xs"
                    whileHover={{ scale: 1.3, rotate: -15 }}
                  >
                    {food.emoji}
                  </motion.span>
                  <div>
                    <h4 className="text-xl font-bold text-foreground mb-1">{food.name}</h4>
                    <p className="text-muted-foreground leading-relaxed">{food.detail}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DietSection;
