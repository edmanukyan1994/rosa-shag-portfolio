import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FluffyTitle } from "@/components/ui/FluffyTitle";
import { MetricsSection } from "./MetricsSection";
import { Testimonials } from "./Testimonials";

export function SocialProofSection() {
  return (
    <section id="proof" className="relative py-24 sm:py-28 [content-visibility:auto] [contain-intrinsic-size:auto_900px]">
      <Container>
        <SectionHeading
          eyebrow="Результаты"
          title="Цифры, которые важны брендам"
          description="Каждое видео строится вокруг гипотезы, тестируется на удержание и оптимизируется под реальную метрику."
          align="center"
        />

        <div className="mt-10">
          <MetricsSection />
        </div>

        <div className="mt-20">
          <SectionHeading
            titleNode={<FluffyTitle src="/images/fluffy-otzyvy.png" alt="Отзывы" />}
            description="Что говорят клиенты"
            align="center"
          />
          <div className="mt-10">
            <Testimonials />
          </div>
        </div>
      </Container>
    </section>
  );
}
