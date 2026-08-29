import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function BrandsSection() {
  return (
    <section id="brands" className="relative py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Бренды"
          title="С кем я работала"
          description="Раздел в разработке — скоро добавим логотипы партнёров."
          align="center"
        />
      </Container>
    </section>
  );
}
