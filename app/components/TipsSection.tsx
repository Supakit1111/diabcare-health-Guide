"use client";

import { Activity, Droplets, Moon, Footprints, Stethoscope, Apple } from "lucide-react";
import { motion } from "framer-motion";

const tips = [
  { icon: Activity, title: "ตรวจน้ำตาลสม่ำเสมอ", desc: "เช็คระดับน้ำตาลเป็นประจำ เพื่อปรับอาหารและยาให้เหมาะสมกับสภาวะร่างกายปัจจุบัน", color: "bg-blue-500" },
  { icon: Droplets, title: "ดื่มน้ำเปล่าเพียงพอ", desc: "อย่างน้อย 8 แก้ว/วัน ช่วยไตทำงานได้ดีขึ้น และช่วยลดความเข้มข้นของน้ำตาลในเลือด", color: "bg-cyan-500" },
  { icon: Footprints, title: "ออกกำลังกายเบาๆ", desc: "เดินเร็ว 30 นาที/วัน ช่วยเพิ่มประสิทธิภาพการทำงานของอินซูลินและหัวใจ", color: "bg-emerald-500" },
  { icon: Moon, title: "นอนหลับให้คุณภาพ", desc: "7-8 ชั่วโมง/คืน การนอนน้อยหรือเครียดทำให้ฮอร์โมนแปรปรวนและน้ำตาลสูงขึ้น", color: "bg-indigo-500" },
  { icon: Apple, title: "กินอาหารมัดระวัง", desc: "แบ่งอาหารเป็น 4-5 มื้อเล็กๆ ช่วยควบคุมระดับน้ำตาลไม่ให้สูงพุ่งหลังมื้ออาหาร", color: "bg-rose-500" },
  { icon: Stethoscope, title: "พบแพทย์ตามนัด", desc: "ตรวจ HbA1c ทุก 3-6 เดือน พร้อมตรวจสุขภาพตา ไต และเท้าเป็นประจำทุกปี", color: "bg-teal-500" },
];

const TipsSection = () => {
  return (
    <section className="py-24 bg-linear-to-b from-muted/30 to-background overflow-hidden">
      <div className="section-container">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block px-4 py-1.5 rounded-full bg-secondary/50 text-secondary-foreground text-xs font-black uppercase tracking-widest mb-6">
            Daily Habits
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-foreground mb-6">ความลับของสุขภาพที่ดี</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            เบาหวานไม่ใช่จุดจบของความสุข <br className="hidden sm:block"/> 
            แต่คือการเริ่มต้นใส่ใจตัวเอง <span className="text-primary font-bold italic">อย่างถูกวิธี</span>
          </p>
        </motion.div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {tips.map((tip, i) => (
            <motion.div
              key={tip.title}
              className="glass-card p-10 relative group border-white/50"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              whileHover={{ 
                y: -15, 
                rotateX: 10,
                rotateY: -5,
                transition: { duration: 0.4, ease: "easeOut" } 
              }}
              style={{ perspective: 1000 }}
            >
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <tip.icon className="w-32 h-32 -mr-10 -mt-10" />
              </div>
              
              <motion.div
                className={`w-16 h-16 rounded-2xl ${tip.color} text-white flex items-center justify-center mb-8 shadow-2xl transition-transform group-hover:rotate-12`}
              >
                <tip.icon className="w-8 h-8" />
              </motion.div>
              <h3 className="text-2xl font-black text-foreground mb-4">{tip.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{tip.desc}</p>
              
              <div className="mt-8 pt-6 border-t border-muted-foreground/10 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs font-black text-primary uppercase tracking-widest">Learn More +</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TipsSection;
