"use client";

import { Clock, Sun, Sunset, Moon, Pill, Syringe, AlertCircle } from "lucide-react";
import { motion, type Variants, type Easing } from "framer-motion";

const schedule = [
  {
    time: "เช้า (07:00)",
    icon: Sun,
    color: "bg-warning/20 text-warning",
    iconColor: "text-warning",
    meds: [
      { name: "Metformin 500mg", instruction: "กินพร้อมอาหารเช้า", type: "pill" },
      { name: "Glipizide 5mg", instruction: "กิน 30 นาทีก่อนอาหาร", type: "pill" },
    ],
  },
  {
    time: "กลางวัน (12:00)",
    icon: Sun,
    color: "bg-primary/20 text-primary",
    iconColor: "text-primary",
    meds: [
      { name: "Metformin 500mg", instruction: "กินพร้อมอาหารกลางวัน", type: "pill" },
    ],
  },
  {
    time: "เย็น (18:00)",
    icon: Sunset,
    color: "bg-accent/20 text-accent",
    iconColor: "text-accent",
    meds: [
      { name: "Metformin 500mg", instruction: "กินพร้อมอาหารเย็น", type: "pill" },
      { name: "Glipizide 5mg", instruction: "กิน 30 นาทีก่อนอาหาร", type: "pill" },
    ],
  },
  {
    time: "ก่อนนอน (22:00)",
    icon: Moon,
    color: "bg-slate-700/20 text-slate-700",
    iconColor: "text-slate-700",
    meds: [
      { name: "Insulin (Long-acting)", instruction: "ฉีดตามแพทย์สั่ง สลับตำแหน่ง", type: "injection" },
    ],
  },
];

const easeOut: Easing = [0.22, 1, 0.36, 1];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -40, filter: "blur(10px)" },
  visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: easeOut } },
};

const MedicationSchedule = () => {
  return (
    <section className="py-24 overflow-hidden">
      <div className="section-container">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
            <Clock className="w-4 h-4" />
            <span className="text-xs font-black tracking-tight uppercase">ตารางเวลามาตรฐาน</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-foreground mb-6">
            ตารางการกินยาประจำวัน
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            ตัวอย่างตารางการใช้ยาส่วนใหญ่สำหรับผู้ป่วยเบาหวานชนิดที่ 2 <br className="hidden sm:block"/>
            <span className="text-accent italic font-medium">* โปรดปฏิบัติตามคำสั่งแพทย์อย่างเคร่งครัด</span>
          </p>
        </motion.div>

        <motion.div
          className="relative max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="absolute left-[2.45rem] top-0 bottom-0 w-1 bg-linear-to-b from-primary/40 via-border to-transparent hidden sm:block rounded-full" />

          <div className="space-y-12">
            {schedule.map((slot, i) => (
              <motion.div
                key={slot.time}
                className="relative flex flex-col sm:flex-row gap-6 sm:gap-10"
                variants={itemVariants}
              >
                <motion.div
                  className={`relative z-10 w-20 h-20 rounded-3xl ${slot.color} flex items-center justify-center shrink-0 shadow-2xl border-4 border-white`}
                  whileHover={{ scale: 1.15, rotate: 10, borderRadius: "50%" }}
                >
                  <slot.icon className={`w-10 h-10 ${slot.iconColor}`} />
                </motion.div>

                <div className="flex-1 group">
                  <div className="glass-card p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full translate-x-12 -translate-y-12 group-hover:translate-x-8 group-hover:-translate-y-8 transition-transform duration-500" />
                    
                    <h3 className="text-2xl font-black text-foreground mb-6 flex items-center gap-3">
                      <span className="w-3 h-3 rounded-full bg-primary" />
                      {slot.time}
                    </h3>
                    
                    <div className="grid gap-4 sm:grid-cols-2">
                      {slot.meds.map((med, j) => (
                        <motion.div
                          key={`${slot.time}-${j}`}
                          className="flex items-start gap-4 p-4 rounded-2xl bg-white/60 border border-white shadow-xs group/item"
                          whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.9)" }}
                        >
                          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                            {med.type === "pill" ? (
                              <Pill className="w-5 h-5 text-primary group-hover/item:rotate-45 transition-transform" />
                            ) : (
                              <Syringe className="w-5 h-5 text-primary group-hover/item:-translate-y-1 transition-transform" />
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-foreground">{med.name}</p>
                            <p className="text-sm text-muted-foreground">{med.instruction}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="max-w-2xl mx-auto mt-16 p-6 rounded-3xl bg-warning/10 border-2 border-warning/20 flex items-start gap-4 shadow-xl shadow-warning/5"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <div className="w-12 h-12 rounded-2xl bg-warning/20 flex items-center justify-center shrink-0">
            <AlertCircle className="w-7 h-7 text-warning" />
          </div>
          <p className="text-base text-foreground/90 leading-relaxed font-semibold">
            หมายเหตุสำคัญ: <span className="font-normal text-muted-foreground">ตารางนี้เป็นเพียงตัวอย่างประกอบความเข้าใจ ปริมาณยาและเวลาที่เหมาะสมขึ้นอยู่กับสภาวะร่างกายของแต่ละบุคคลและดุลยพินิจของแพทย์ ห้ามปรับขนาดยาด้วยตนเอง และควรพกบัตรประจำตัวผู้ป่วยเบาหวานติดตัวเสมอ</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default MedicationSchedule;
