"use client";

import Image from "next/image";
import { Heart, Leaf, Pill } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const HeroSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[90vh] flex items-center overflow-hidden"
    >
      <motion.div className="absolute inset-0" style={{ y, opacity }}>
        <motion.div
          className="w-full h-full relative"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src="/images/hero-healthy-food.jpg"
            alt="อาหารสุขภาพสำหรับผู้ป่วยเบาหวาน"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
        <div className="absolute inset-0 bg-linear-to-r from-foreground/90 via-foreground/40 to-transparent" />
      </motion.div>
      <div className="section-container relative z-10 py-20">
        <div className="max-w-2xl space-y-6">
          <motion.div
            className="flex items-center gap-2 text-primary-foreground/80"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Leaf className="w-5 h-5" />
            <span className="text-sm font-medium tracking-wider uppercase">คู่มือสุขภาพเบาหวาน</span>
          </motion.div>
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            กินอย่างไร
            <br />
            <motion.span
              className="text-sage inline-block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              ให้ห่างไกลเบาหวาน
            </motion.span>
          </motion.h1>
          <motion.p
            className="text-lg text-primary-foreground/80 leading-relaxed max-w-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            รวมข้อมูลครบจบในที่เดียว ทั้งการรับประทานยา อาหารที่ควรกินและควรเลี่ยง 
            ผลไม้ที่มีน้ำตาลสูง พร้อมเคล็ดลับดูแลสุขภาพสำหรับผู้ป่วยเบาหวาน
          </motion.p>
          <motion.div
            className="flex flex-wrap gap-4 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
          >
            {[
              { icon: Pill, label: "คู่มือกินยา" },
              { icon: Leaf, label: "อาหารแนะนำ" },
              { icon: Heart, label: "ผลไม้ควรเลี่ยง" },
            ].map((item, i) => (
              <motion.a
                key={item.label}
                href={`#${item.label}`}
                className="flex items-center gap-2 px-5 py-3 rounded-full bg-primary/90 text-primary-foreground font-medium hover:bg-primary transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 + i * 0.15 }}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Floating decorative elements */}
      <motion.div
        className="absolute top-1/4 right-[10%] w-64 h-64 rounded-full bg-primary/20 blur-[100px]"
        animate={{ 
          y: [0, -40, 0],
          x: [0, 20, 0],
          scale: [1, 1.2, 1] 
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 left-[5%] w-48 h-48 rounded-full bg-accent/20 blur-[80px]"
        animate={{ 
          y: [0, 30, 0],
          x: [0, -20, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-1 h-12 bg-linear-to-b from-primary/50 to-transparent rounded-full"
        />
      </div>
    </section>
  );
};

export default HeroSection;
