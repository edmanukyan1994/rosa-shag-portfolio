import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { brands } from "@/data/brands";

export function BrandsSection() {
  const loop = [...brands, ...brands];

  return (
    <section id="brands" className="relative py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Бренды"
          title="С кем я работала"
          description="Коммерческие интеграции с beauty, fashion и lifestyle брендами."
          align="center"
        />
      </Container>

      <div className="brand-marquee mt-12 sm:mt-14">
        <div className="brand-marquee__track">
          {loop.map((brand, index) => (
            <div
              key={`${brand.id}-${index}`}
              className="flex w-[7.5rem] shrink-0 flex-col items-center gap-3 px-2 sm:w-36"
            >
              <div className="relative h-[5.5rem] w-[5.5rem] overflow-hidden rounded-full bg-white shadow-[0_12px_28px_-12px_rgba(58,36,41,0.45)] ring-1 ring-black/8 sm:h-28 sm:w-28">
                <Image
                  src={brand.logoSrc}
                  alt={brand.name || "Бренд"}
                  fill
                  sizes="112px"
                  className="object-cover"
                />
              </div>
              {brand.name ? (
                <span className="max-w-[7.5rem] truncate text-center text-xs font-medium tracking-wide text-text-secondary sm:text-sm">
                  {brand.name}
                </span>
              ) : (
                <span className="h-4 sm:h-5" aria-hidden />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
