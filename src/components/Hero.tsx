"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { profile, stats } from "@/lib/content";
import { useReady } from "@/lib/ready";
import { ArrowDown, GitHub, LinkedIn, Pulse, XLogo } from "./icons";
import { softSpring, spring } from "./ui";

/* ───────── Name: each letter is a squishy clay ball ───────── */
function ClayWord({ word, start, accent }: { word: string; start: number; accent?: boolean }) {
  const ready = useReady();
  return (
    <span className="block whitespace-nowrap" aria-hidden>
      {word.split("").map((ch, i) => (
        <motion.span
          key={i}
          className={`text-clay inline-block cursor-default ${accent ? "text-accent" : ""}`}
          initial={{ y: 90, scale: 0.4, opacity: 0, rotate: -12 }}
          animate={ready ? { y: 0, scale: 1, opacity: 1, rotate: 0 } : undefined}
          transition={{ type: "spring", stiffness: 300, damping: 14, delay: start + i * 0.045 }}
          whileHover={{
            scaleY: [1, 0.72, 1.12, 0.95, 1],
            scaleX: [1, 1.2, 0.92, 1.03, 1],
            y: [0, 6, -14, 0],
            transition: { duration: 0.6 },
          }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

function RoleRotator() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % profile.roles.length), 2600);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="relative inline-flex h-11 overflow-hidden font-medium text-ink">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={i}
          className="block leading-[44px] whitespace-nowrap"
          initial={{ y: 44, opacity: 0, filter: "blur(4px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: -44, opacity: 0, filter: "blur(4px)" }}
          transition={spring}
        >
          {profile.roles[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/* ───────── Avatar with 3D tilt and a talking bubble ───────── */
const greetings = ["Hello!", "gm ☀️", "wagmi", "ser, hi"];

function Avatar({ mx, my }: { mx: MotionValue<number>; my: MotionValue<number> }) {
  const ready = useReady();
  const rx = useSpring(useTransform(my, [-1, 1], [10, -10]), softSpring);
  const ry = useSpring(useTransform(mx, [-1, 1], [-12, 12]), softSpring);
  const [g, setG] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setG((n) => (n + 1) % greetings.length), 3200);
    return () => clearInterval(t);
  }, []);

  return (
    <motion.div
      className="relative aspect-square w-[min(100%,440px)] justify-self-center [perspective:900px] max-lg:order-first max-lg:w-[min(78%,360px)]"
      initial={{ scale: 0.6, opacity: 0, rotate: 8 }}
      animate={ready ? { scale: 1, opacity: 1, rotate: 0 } : undefined}
      transition={{ type: "spring", stiffness: 140, damping: 14, delay: 0.25 }}
    >
      <motion.div className="clay absolute inset-[8%] rounded-[34%] p-[18px] shadow-raised-lg [transform-style:preserve-3d]" style={{ rotateX: rx, rotateY: ry }}>
        <div className="clay-in size-full rounded-[30%] p-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/sarat.webp" alt="Portrait of Sarat Angajala" width={480} height={480} className="size-full rounded-[27%] object-cover" />
        </div>

        <motion.div
          className="bubble clay absolute -top-[2%] -right-[2%] rounded-[20px] px-5 py-3 font-display text-xl font-medium text-ink-soft max-md:-right-[6%]"
          style={{ translateZ: 60 }}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <AnimatePresence mode="wait">
            <motion.span key={g} className="block" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} transition={spring}>
              {greetings[g]}
            </motion.span>
          </AnimatePresence>
        </motion.div>

        <motion.a
          href={profile.links.aneraLabs}
          target="_blank"
          rel="noreferrer"
          className="clay absolute bottom-0 -left-[4%] flex items-center gap-3 rounded-[22px] py-3 pr-[18px] pl-3 max-md:-left-[8%]"
          style={{ translateZ: 80 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="clay-accent grid size-10 place-items-center rounded-[13px]">
            <Pulse className="w-5" />
          </span>
          <span>
            <small className="block text-xs leading-tight font-bold text-ink-faint">Currently at</small>
            <b className="font-display text-base font-medium">Anera Labs</b>
          </span>
        </motion.a>
      </motion.div>
    </motion.div>
  );
}

/* ───────── Floating clay shapes with mouse parallax ───────── */
const blobs = [
  { cls: "blob-sphere", size: 90, top: "14%", left: "4%", depth: 40, float: 14 },
  { cls: "blob-ghost", size: 140, top: "62%", left: "-3%", depth: 20, float: 18 },
  { cls: "blob-ring", size: 120, top: "10%", left: "84%", depth: 30, float: 12 },
  { cls: "blob-sphere", size: 44, top: "78%", left: "48%", depth: 60, float: 10 },
  { cls: "blob-ghost", size: 70, top: "30%", left: "46%", depth: 50, float: 16 },
  { cls: "clay-accent rounded-[28%]", size: 54, top: "82%", left: "90%", depth: 35, float: 20 },
  { cls: "clay rounded-full", size: 34, top: "6%", left: "60%", depth: 70, float: 8, w: 100 },
];

function Blob({ b, mx, my }: { b: (typeof blobs)[number]; mx: MotionValue<number>; my: MotionValue<number> }) {
  const reduce = useReducedMotion();
  const x = useSpring(useTransform(mx, (v) => v * -b.depth), softSpring);
  const y = useSpring(useTransform(my, (v) => v * -b.depth), softSpring);
  return (
    <motion.div className="absolute" style={{ top: b.top, left: b.left, x, y }}>
      <motion.div
        className={b.cls}
        style={{ width: b.w ?? b.size, height: b.size }}
        initial={{ scale: 0 }}
        animate={reduce ? { scale: 1 } : { scale: 1, y: [0, -b.float, 0], rotate: [0, b.float / 2, 0] }}
        transition={{
          scale: { type: "spring", stiffness: 160, damping: 12, delay: 0.6 + b.depth / 200 },
          default: { duration: 4 + b.size / 40, repeat: Infinity, ease: "easeInOut" },
        }}
      />
    </motion.div>
  );
}

/* ───────── Stat ring (the radial progress from the board) ───────── */
function Stat({ value, suffix, label, ring, delay }: (typeof stats)[number] & { delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, margin: "-60px" });
  const ready = useReady();
  const inView = seen && ready;
  const [n, setN] = useState(0);
  const gid = useId();

  useEffect(() => {
    if (!inView) return;
    const c = animate(0, value, { duration: 1.6, delay, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, value, delay]);

  return (
    <motion.div
      ref={ref}
      className="clay flex items-center gap-5 rounded-clay p-[22px]"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ ...softSpring, delay }}
      whileHover={{ y: -6 }}
    >
      <div className="relative grid size-[86px] flex-none place-items-center rounded-full bg-surface shadow-raised-sm">
        <svg viewBox="0 0 86 86" className="absolute inset-0 -rotate-90">
          <defs>
            <linearGradient id={gid}>
              <stop offset="0" stopColor="var(--accent-2)" />
              <stop offset="1" stopColor="var(--accent)" />
            </linearGradient>
          </defs>
          <circle cx="43" cy="43" r="34" fill="none" strokeWidth="9" stroke="var(--surface-2)" />
          <motion.circle
            cx="43"
            cy="43"
            r="34"
            fill="none"
            strokeWidth="9"
            strokeLinecap="round"
            stroke={`url(#${gid})`}
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: ring } : undefined}
            transition={{ duration: 1.6, delay, ease: [0.22, 1, 0.36, 1] }}
          />
        </svg>
        <div className="size-[50px] rounded-full bg-surface shadow-raised-sm" />
      </div>
      <div>
        <div className="font-display text-[40px] leading-none font-semibold">
          {n}
          <span className="text-accent">{suffix}</span>
        </div>
        <div className="text-[14.5px] font-bold text-ink-soft">{label}</div>
      </div>
    </motion.div>
  );
}

export function Hero() {
  const ready = useReady();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      mx.set((e.clientX / innerWidth) * 2 - 1);
      my.set((e.clientY / innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [mx, my]);

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: ready ? { opacity: 1, y: 0 } : undefined,
    transition: { ...softSpring, delay },
  });

  return (
    <section id="home" className="relative isolate grid min-h-svh items-center overflow-hidden pt-[140px] pb-16 max-md:pt-10">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        {blobs.map((b, i) => (
          <Blob key={i} b={b} mx={mx} my={my} />
        ))}
      </div>

      <div className="mx-auto w-[min(1180px,100%-32px)]">
        <div className="grid items-center gap-[clamp(30px,6vw,80px)] lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <motion.a
              href={profile.links.aneraLabs}
              target="_blank"
              rel="noreferrer"
              className="clay inline-flex items-center gap-2.5 rounded-full py-2 pr-4 pl-3 text-sm font-bold text-ink-soft"
              {...fade(0.05)}
            >
              <span className="pulse" />
              Core Dev &amp; Founders Office at <b className="text-ink">Anera Labs</b>
            </motion.a>

            <h1 className="mt-7 mb-3 font-display text-[clamp(54px,9.4vw,124px)] leading-[0.95] font-semibold tracking-tight">
              <span className="sr-only">{profile.name}</span>
              <ClayWord word="Sarat" start={0.1} />
              <ClayWord word="Angajala" start={0.35} accent />
            </h1>

            <motion.div className="mb-5 flex h-11 items-center gap-3 font-display text-[clamp(20px,2.4vw,28px)] text-ink-soft" {...fade(0.7)}>
              <span className="font-mono text-[0.7em] text-accent">{profile.alias}</span>
              <span className="text-ink-faint">/</span>
              <RoleRotator />
            </motion.div>

            <motion.p className="mb-9 max-w-[540px] text-[18.5px] text-ink-soft" {...fade(0.8)}>
              {profile.tagline}
            </motion.p>

            <motion.div className="flex flex-wrap items-center gap-4" {...fade(0.9)}>
              <a href="#projects" className="btn btn-accent">
                See my work <ArrowDown />
              </a>
              <a href="#contact" className="btn">
                Say hello
              </a>
              <div className="flex gap-3">
                <a className="btn btn-icon" href={profile.links.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                  <GitHub />
                </a>
                <a className="btn btn-icon" href={profile.links.x} target="_blank" rel="noreferrer" aria-label="X (Twitter)">
                  <XLogo />
                </a>
                <a className="btn btn-icon" href={profile.links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                  <LinkedIn />
                </a>
              </div>
            </motion.div>
          </div>

          <Avatar mx={mx} my={my} />
        </div>

        <div className="mt-[clamp(50px,8vw,90px)] grid gap-6 md:grid-cols-3">
          {stats.map((s, i) => (
            <Stat key={s.label} {...s} delay={i * 0.12} />
          ))}
        </div>
      </div>
    </section>
  );
}
