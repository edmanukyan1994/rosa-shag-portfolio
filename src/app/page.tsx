import { Navbar } from "@/components/layout/Navbar";
import { SiteBackdrop } from "@/components/layout/SiteBackdrop";
import { Hero } from "@/components/hero/Hero";
import { AboutSection } from "@/components/about/AboutSection";
import { BrandsSection } from "@/components/brands/BrandsSection";
import { PortfolioSection } from "@/components/portfolio/PortfolioSection";
import { SocialProofSection } from "@/components/social-proof/SocialProofSection";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <SiteBackdrop />

      <div className="site-content">
        <Navbar />
        <Hero />
        <AboutSection />
        <BrandsSection />
        <PortfolioSection />
        <SocialProofSection />
        <Footer />
      </div>
    </main>
  );
}
