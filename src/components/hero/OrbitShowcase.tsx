"use client";

import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { Play } from "lucide-react";
import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { VideoItem } from "@/types";
import { useUI } from "@/lib/ui-context";
import { Badge } from "@/components/ui/Badge";

const CARD_W = 150;
const CARD_H = 256;
const RADIUS_X = 420;
const RADIUS_Y = 170;
const TILT_DEG = -13;
const SPEED = 0.01; // degrees per millisecond
const DESIGN_WIDTH = 1040; // container width at which the orbit renders at 100% scale

// Three explicit depth layers so the creator always reads as the "middle
// ground": cards behind her sit in the back layer, cards in front of her sit
// in the front layer, and the two ranges never overlap the portrait's z-index.
const Z_BACK: [number, number] = [40, 90];
const Z_PORTRAIT = 170;
const Z_FRONT: [number, number] = [250, 300];

export function OrbitShowcase({
  items,
  portraitSrc,
}: {
  items: VideoItem[];
  portraitSrc: string;
}) {
  const angle = useMotionValue(0);
  const [mounted, setMounted] = useState(false);
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  // Orbit positions are derived from a continuously running clock, so they're
  // only rendered client-side to avoid a server/client markup mismatch.
  useEffect(() => setMounted(true), []);

  // The orbit's radius is tuned for a ~660px-wide container. On narrower
  // desktop widths (e.g. a tight lg breakpoint) we scale the whole visual
  // down proportionally so it never collides with the text column.
  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width ?? DESIGN_WIDTH;
      // On narrow screens use a smaller design baseline so the orbit
      // doesn't shrink to an unreadable size.
      const baseline = width < 640 ? 640 : DESIGN_WIDTH;
      setScale(Math.min(1, width / baseline));
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useAnimationFrame((_, delta) => {
    angle.set(angle.get() + delta * SPEED);
  });

  return (
    <div
      ref={containerRef}
      className="relative mx-auto h-[480px] w-full max-w-[1040px] select-none sm:h-[560px] lg:h-[700px]"
    >
      <div
        className="absolute inset-0"
        style={{
          transform: `scale(${scale}) translateY(-6%)`,
          transformOrigin: "50% 38%",
        }}
      >
        <OrbitRing />
        <FocalPortrait src={portraitSrc} />

        {mounted &&
          items.map((item, i) => (
            <OrbitCard
              key={item.id}
              item={item}
              index={i}
              total={items.length}
              angle={angle}
            />
          ))}
      </div>
    </div>
  );
}

function OrbitRing() {
  return (
    <div
      className="pointer-events-none absolute left-1/2 top-1/2 z-0 rounded-[50%] border border-accent/15"
      style={{
        width: RADIUS_X * 2,
        height: RADIUS_Y * 2,
        marginLeft: -RADIUS_X,
        marginTop: -RADIUS_Y,
        transform: `rotate(${TILT_DEG}deg)`,
        background:
          "radial-gradient(ellipse at center, rgba(231,84,128,0.08), transparent 70%)",
      }}
    />
  );
}

function FocalPortrait({ src }: { src: string }) {
  return (
    <div
      className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{ zIndex: Z_PORTRAIT }}
    >
      <div className="relative flex h-[340px] w-[220px] items-end justify-center sm:h-[420px] sm:w-[272px] lg:h-[500px] lg:w-[322px]">
        {/* ground-level energy ring, tilted to match the orbit path she's standing inside */}
        <motion.span
          className="absolute bottom-3 h-14 w-52 rounded-[50%] border border-accent/30"
          style={{ transform: `rotate(${TILT_DEG}deg)` }}
          animate={{ scale: [1, 1.6], opacity: [0.55, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
        />
        <motion.span
          className="absolute bottom-3 h-14 w-52 rounded-[50%] border border-accent/30"
          style={{ transform: `rotate(${TILT_DEG}deg)` }}
          animate={{ scale: [1, 1.6], opacity: [0.55, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut", delay: 1.2 }}
        />

        <div className="absolute inset-x-2 bottom-4 -z-10 h-48 rounded-full bg-accent/20 blur-[60px]" />

        <div className="relative h-[330px] w-[215px] sm:h-[408px] sm:w-[266px] lg:h-[486px] lg:w-[316px]">
          <Image
            src={src}
            alt="Манукян Роза — UGC-криейтор"
            fill
            sizes="(max-width: 640px) 215px, (max-width: 1024px) 266px, 316px"
            priority
            className="object-contain object-bottom"
          />
        </div>
      </div>
    </div>
  );
}

function OrbitCard({
  item,
  index,
  total,
  angle,
}: {
  item: VideoItem;
  index: number;
  total: number;
  angle: ReturnType<typeof useMotionValue<number>>;
}) {
  const { openVideo } = useUI();
  const offset = (360 / total) * index;
  const tiltRad = (TILT_DEG * Math.PI) / 180;
  const cosT = Math.cos(tiltRad);
  const sinT = Math.sin(tiltRad);
  // y(t) = RADIUS_X*cos(t)*sinT + RADIUS_Y*sin(t)*cosT is a sinusoid of the
  // form A*cos(t)+B*sin(t); its amplitude lets us normalize the *final,
  // on-screen* vertical position to a clean -1..1 depth value.
  const yAmplitude = Math.sqrt(
    (RADIUS_X * sinT) ** 2 + (RADIUS_Y * cosT) ** 2
  );

  const x = useTransform(angle, (a) => {
    const rad = ((a + offset) * Math.PI) / 180;
    const ex = RADIUS_X * Math.cos(rad);
    const ey = RADIUS_Y * Math.sin(rad);
    return ex * cosT - ey * sinT;
  });

  const y = useTransform(angle, (a) => {
    const rad = ((a + offset) * Math.PI) / 180;
    const ex = RADIUS_X * Math.cos(rad);
    const ey = RADIUS_Y * Math.sin(rad);
    return ex * sinT + ey * cosT;
  });

  // Depth is derived from the card's actual on-screen position along the
  // tilted ellipse (not the angle before tilt was applied): the lower part
  // of the tilted ellipse is the foreground, the upper part is the
  // background — exactly matching how the ellipse visually reads.
  const depth = useTransform(y, (val) => val / yAmplitude);

  const scale = useTransform(depth, [-1, 1], [0.6, 1.1]);
  const opacity = useTransform(depth, [-1, 1], [0.45, 1]);
  const blurPx = useTransform(depth, [-1, 1], [2, 0]);
  const filter = useMotionTemplate`blur(${blurPx}px)`;

  // Discrete layering: cards behind the creator (depth < 0) always render in
  // the back layer, cards in front of her (depth >= 0) always render in the
  // front layer — she consistently reads as the middle ground, never mixed
  // in with either layer.
  const zIndex = useTransform(depth, (d) =>
    d >= 0
      ? Z_FRONT[0] + d * (Z_FRONT[1] - Z_FRONT[0])
      : Z_BACK[0] + (d + 1) * (Z_BACK[1] - Z_BACK[0])
  );

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 18);
    rotateX.set(-py * 18);
  };

  const resetTilt = () => {
    rotateX.set(0);
    rotateY.set(0);
    setHovered(false);
  };

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 cursor-pointer [perspective:600px]"
      style={{
        marginLeft: -CARD_W / 2,
        marginTop: -CARD_H / 2,
        width: CARD_W,
        height: CARD_H,
        x,
        y,
        scale,
        opacity,
        zIndex,
        filter,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
      onClick={() => openVideo(item)}
    >
      <motion.div
        className="group relative h-full w-full overflow-hidden rounded-[22px] border border-border-subtle bg-bg-card shadow-[0_20px_50px_-20px_rgba(58,36,41,0.45)] [transform-style:preserve-3d]"
        style={{ rotateX, rotateY }}
        animate={{ boxShadow: hovered ? "0 0 0 1.5px rgba(231,84,128,0.5)" : "0 0 0 0px rgba(231,84,128,0)" }}
      >
        <Image
          src={item.thumbnail}
          alt={item.title}
          fill
          sizes="150px"
          className="object-cover"
          draggable={false}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/5 to-transparent" />

        <div className="absolute left-2 top-2">
          <Badge variant="accent" className="px-2 py-0.5 text-[10px]">
            {item.formatTag}
          </Badge>
        </div>

        <div
          className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          style={{ opacity: hovered ? 1 : 0 }}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 backdrop-blur-md">
            <Play className="h-3.5 w-3.5 translate-x-0.5 fill-white text-white" />
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 p-2.5">
          <p className="line-clamp-2 text-[11px] font-medium leading-snug text-white">
            {item.title}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
