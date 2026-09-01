import { Navbar } from "@/components/layout/Navbar";
import { SiteBackdrop } from "@/components/layout/SiteBackdrop";
import { SiteStickers } from "@/components/decorative/SiteStickers";
import { Hero } from "@/components/hero/Hero";
import { AboutSection } from "@/components/about/AboutSection";
import { BrandsSection } from "@/components/brands/BrandsSection";
import { PortfolioSection } from "@/components/portfolio/PortfolioSection";
import { SocialProofSection } from "@/components/social-proof/SocialProofSection";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="relative isolate min-h-screen overflow-x-hidden">
      <SiteBackdrop />
      <div className="site-content relative z-10">
        <Navbar />
        <Hero />
        <AboutSection />
        <BrandsSection />
        <PortfolioSection />
        <SocialProofSection />
        <Footer />
      </div>

      <SiteStickers />
    </main>
  );
}
