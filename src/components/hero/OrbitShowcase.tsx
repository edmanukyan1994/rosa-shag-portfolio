"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { Play } from "lucide-react";
import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState, type RefObject } from "react";
import { VideoItem } from "@/types";
import { useUI } from "@/lib/ui-context";
import { Badge } from "@/components/ui/Badge";

const CARD_W = 150;
const CARD_H = 256;
const RADIUS_X = 420;
const RADIUS_Y = 170;
const TILT_DEG = -13;
const SPEED = 0.01;
const DESIGN_WIDTH = 1040;

const Z_BACK: [number, number] = [40, 90];
const Z_PORTRAIT = 170;
const Z_FRONT: [number, number] = [250, 300];

type OrbitDims = {
  scale: number;
  radiusX: number;
  radiusY: number;
};

function useOrbitDims(containerRef: RefObject<HTMLDivElement | null>) {
  const [dims, setDims] = useState<OrbitDims>({
    scale: 1,
    radiusX: RADIUS_X,
    radiusY: RADIUS_Y,
  });

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = () => {
      const width = el.getBoundingClientRect().width;
      const isMobile = width < 640;

      if (isMobile) {
        const mobileRadiusX = RADIUS_X * 0.78;
        const mobileRadiusY = RADIUS_Y * 0.78;
        const fitScale = Math.min(1, (width - 24) / (mobileRadiusX * 2 + CARD_W * 0.5));
        setDims({
          scale: Math.max(0.58, fitScale),
          radiusX: mobileRadiusX,
          radiusY: mobileRadiusY,
        });
        return;
      }

      setDims({
        scale: Math.min(1, width / DESIGN_WIDTH),
        radiusX: RADIUS_X,
        radiusY: RADIUS_Y,
      });
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [containerRef]);

  return dims;
}

export function OrbitShowcase({
  items,
  portraitSrc,
}: {
  items: VideoItem[];
  portraitSrc: string;
}) {
  const angle = useMotionValue(0);
  const [mounted, setMounted] = useState(false);
  const [reduceEffects, setReduceEffects] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dims = useOrbitDims(containerRef);

  useLayoutEffect(() => setMounted(true), []);

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const lowPower = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduceEffects(coarse || lowPower);
  }, []);

  useAnimationFrame((_, delta) => {
    angle.set(angle.get() + delta * SPEED);
  });

  return (
    <div
      ref={containerRef}
      className="relative mx-auto h-[min(92vw,520px)] w-full max-w-[1040px] select-none sm:h-[560px] lg:h-[700px]"
    >
      <div
        className="absolute inset-0 [transform-style:preserve-3d] will-change-transform"
        style={{
          transform: `scale(${dims.scale}) translate3d(0, -6%, 0)`,
          transformOrigin: "50% 38%",
        }}
      >
        <OrbitRing radiusX={dims.radiusX} radiusY={dims.radiusY} />
        <FocalPortrait src={portraitSrc} />

        {mounted &&
          items.map((item, i) => (
            <OrbitCard
              key={item.id}
              item={item}
              index={i}
              total={items.length}
              angle={angle}
              radiusX={dims.radiusX}
              radiusY={dims.radiusY}
              reduceEffects={reduceEffects}
            />
          ))}
      </div>
    </div>
  );
}

function OrbitRing({
  radiusX,
  radiusY,
}: {
  radiusX: number;
  radiusY: number;
}) {
  return (
    <div
      className="pointer-events-none absolute left-1/2 top-1/2 z-0 rounded-[50%] border border-accent/15"
      style={{
        width: radiusX * 2,
        height: radiusY * 2,
        marginLeft: -radiusX,
        marginTop: -radiusY,
        transform: `rotate(${TILT_DEG}deg) translateZ(0)`,
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
            alt="Манукян Роза — UGC-креатор"
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
  radiusX,
  radiusY,
  reduceEffects,
}: {
  item: VideoItem;
  index: number;
  total: number;
  angle: ReturnType<typeof useMotionValue<number>>;
  radiusX: number;
  radiusY: number;
  reduceEffects: boolean;
}) {
  const { openVideo } = useUI();
  const offset = (360 / total) * index;
  const tiltRad = (TILT_DEG * Math.PI) / 180;
  const cosT = Math.cos(tiltRad);
  const sinT = Math.sin(tiltRad);
  const yAmplitude = Math.sqrt((radiusX * sinT) ** 2 + (radiusY * cosT) ** 2);

  const x = useTransform(angle, (a) => {
    const rad = ((a + offset) * Math.PI) / 180;
    const ex = radiusX * Math.cos(rad);
    const ey = radiusY * Math.sin(rad);
    return ex * cosT - ey * sinT;
  });

  const y = useTransform(angle, (a) => {
    const rad = ((a + offset) * Math.PI) / 180;
    const ex = radiusX * Math.cos(rad);
    const ey = radiusY * Math.sin(rad);
    return ex * sinT + ey * cosT;
  });

  const depth = useTransform(y, (val) => val / yAmplitude);
  const scale = useTransform(depth, [-1, 1], [0.6, 1.1]);
  const opacity = useTransform(depth, [-1, 1], [0.45, 1]);

  const zIndex = useTransform(depth, (d) =>
    Math.round(
      d >= 0
        ? Z_FRONT[0] + d * (Z_FRONT[1] - Z_FRONT[0])
        : Z_BACK[0] + (d + 1) * (Z_BACK[1] - Z_BACK[0])
    )
  );

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduceEffects) return;
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
      className="absolute left-1/2 top-1/2 cursor-pointer"
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
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
      onClick={() => openVideo(item)}
    >
      <motion.div
        className="group relative h-full w-full overflow-hidden rounded-[22px] border border-border-subtle bg-bg-card shadow-[0_20px_50px_-20px_rgba(58,36,41,0.45)]"
        style={{ rotateX, rotateY }}
        animate={{
          boxShadow: hovered
            ? "0 0 0 1.5px rgba(231,84,128,0.5)"
            : "0 0 0 0px rgba(231,84,128,0)",
        }}
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
