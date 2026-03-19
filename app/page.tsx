import HeroSection from "@/app/components/HeroSection";
import MedicationSection from "@/app/components/MedicationSection";
import MedicationSchedule from "@/app/components/MedicationSchedule";
import DietSection from "@/app/components/DietSection";
import FruitsSection from "@/app/components/FruitsSection";
import TipsSection from "@/app/components/TipsSection";
import Footer from "@/app/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <MedicationSection />
      <MedicationSchedule />
      <DietSection />
      <FruitsSection />
      <TipsSection />
      <Footer />
    </div>
  );
}
