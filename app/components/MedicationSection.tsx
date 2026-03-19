"use client";

import Image from "next/image";
import { Clock, AlertTriangle, CheckCircle, Pill } from "lucide-react";
import { motion, type Variants, type Easing } from "framer-motion";

const medications = [
  {
    name: "Metformin (เมทฟอร์มิน)",
    desc: "ยาลดน้ำตาลในเลือดที่ใช้บ่อยที่สุด ช่วยลดการผลิตกลูโคสจากตับ",
    timing: "กินพร้อมอาหารหรือหลังอาหารทันที",
    warning: "อาจทำให้ท้องไส้ปั่นป่วนในช่วงแรก",
    icon: "💊",
  },
  {
    name: "Glipizide (กลิพิไซด์)",
    desc: "ยากลุ่ม Sulfonylurea กระตุ้นตับอ่อนให้ผลิตอินซูลินเพิ่ม",
    timing: "กิน 30 นาทีก่อนอาหาร",
    warning: "ระวังภาวะน้ำตาลต่ำ ห้ามข้ามมื้ออาหาร",
    icon: "💉",
  },
  {
    name: "Insulin (อินซูลิน)",
    desc: "ฮอร์โมนที่ช่วยนำน้ำตาลเข้าสู่เซลล์ ใช้ในกรณียากินไม่เพียงพอ",
    timing: "ฉีดตามแพทย์สั่ง ก่อนหรือพร้อมอาหาร",
    warning: "เก็บในตู้เย็น ห้ามแช่แข็ง สลับตำแหน่งฉีด",
    icon: "🩺",
  },
];

const easeOut: Easing = [0.25, 0.46, 0.45, 0.94];

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.15, ease: easeOut },
  }),
};

const MedicationSection = () => {
  return (
    <section id="คู่มือกินยา" className="py-24 bg-linear-to-b from-background to-muted/30">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3 text-primary mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Pill className="w-6 h-6" />
              </div>
              <span className="text-sm font-bold tracking-widest uppercase">คู่มือการใช้ยา</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-foreground mb-6 leading-tight">
              กินยาอย่างถูกวิธี <br/><span className="text-primary">เพื่อสุขภาพที่ยั่งยืน</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
              การรับประทานยาตามเวลาและวิธีที่ถูกต้องช่วยควบคุมระดับน้ำตาลได้ดีขึ้น 
              ลดความเสี่ยงจากโรคแทรกซ้อนในระยะยาว
            </p>
            <motion.div
              className="relative rounded-3xl shadow-2xl w-full h-80 overflow-hidden border-8 border-white"
              whileHover={{ scale: 1.05, rotate: -2 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src="/images/medication-guide.jpg"
                alt="อุปกรณ์ทางการแพทย์สำหรับเบาหวาน"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-primary/40 to-transparent" />
            </motion.div>
          </motion.div>
          <div className="space-y-6">
            {medications.map((med, i) => (
              <motion.div
                key={med.name}
                className="glass-card p-6"
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                custom={i}
              >
                <div className="flex items-start gap-5">
                  <motion.div
                    className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-3xl"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                  >
                    {med.icon}
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-foreground mb-2">{med.name}</h3>
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{med.desc}</p>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center gap-2 text-sm font-medium text-primary bg-primary/5 px-3 py-1 rounded-full">
                        <Clock className="w-4 h-4" />
                        <span>{med.timing}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm font-medium text-accent bg-accent/5 px-3 py-1 rounded-full">
                        <AlertTriangle className="w-4 h-4" />
                        <span>{med.warning}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            <motion.div
              className="flex items-start gap-4 p-5 rounded-2xl bg-primary/10 border border-primary/20 shadow-sm"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <CheckCircle className="w-6 h-6 text-primary shrink-0 mt-0.5" />
              <p className="text-sm font-medium text-foreground leading-relaxed">
                <strong className="text-primary">สำคัญ:</strong> ห้ามปรับยาเองโดยไม่ปรึกษาแพทย์ ตรวจน้ำตาลสม่ำเสมอ และพกยาติดตัวเสมอในกรณีที่เกิดภาวะน้ำตาลต่ำ
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MedicationSection;
