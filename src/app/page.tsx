import AppNavbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/home/HeroSection";
import LogoBar from "@/components/home/LogoBar";
import PlatformFeaturesSection from "@/components/home/PlatformFeaturesSection";
import AudienceSection from "@/components/home/AudienceSection";
import ComplianceSection from "@/components/home/ComplianceSection";
import CTASection from "@/components/home/CTASection";

export default function Home() {
  return (
    <main className="min-h-screen">
      <AppNavbar />
      <HeroSection />
      <LogoBar />
      <PlatformFeaturesSection />
      <AudienceSection />
      <ComplianceSection />
      <CTASection />
      <Footer />
    </main>
  );
}
