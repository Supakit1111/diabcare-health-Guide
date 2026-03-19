import { Heart } from "lucide-react";

const Footer = () => (
  <footer className="py-10 bg-foreground text-primary-foreground/70">
    <div className="section-container text-center space-y-3">
      <div className="flex items-center justify-center gap-2 text-primary-foreground">
        <Heart className="w-4 h-4 text-sage" />
        <span className="font-semibold">DiabCare — คู่มือสุขภาพเบาหวาน</span>
      </div>
      <p className="text-sm max-w-lg mx-auto">
        ข้อมูลนี้ใช้เพื่อการศึกษาเท่านั้น ไม่ใช่คำแนะนำทางการแพทย์ 
        กรุณาปรึกษาแพทย์ก่อนปรับเปลี่ยนการรักษา
      </p>
      <p className="text-xs text-primary-foreground/40">© 2026 DiabCare. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
