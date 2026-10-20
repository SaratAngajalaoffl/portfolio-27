"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { contributions, stack } from "@/lib/content";
import { Reveal, Section, SectionHeader } from "./ui";

function Key({ label, hot, delay }: { label: string; hot: boolean; delay: number }) {
  return (
    <motion.div
      className={`key grid h-16 min-w-16 cursor-grab touch-none place-items-center rounded-[20px] px-5 font-display text-[17px] font-medium select-none active:cursor-grabbing max-md:h-[52px] max-md:min-w-[52px] max-md:rounded-2xl max-md:px-3.5 max-md:text-[15px] ${
        hot ? "clay-accent" : "clay text-ink-soft"
      }`}
      initial={{ opacity: 0, y: 30, scale: 0.6 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 260, damping: 15, delay }}
      animate={
        hot
          ? { scaleY: [1, 0.82, 1.06, 1], scaleX: [1, 1.08, 0.97, 1], y: [0, 4, -3, 0], transition: { duration: 0.5, ease: "easeOut" } }
          : undefined
      }
      whileHover={{ y: -4 }}
      whileTap={{ scaleY: 0.82, scaleX: 1.1, y: 3 }}
      drag
      dragSnapToOrigin
      dragElastic={0.55}
      dragTransition={{ bounceStiffness: 400, bounceDamping: 12 }}
      whileDrag={{ scale: 1.12, rotate: -4, zIndex: 10 }}
    >
      {label}
    </motion.div>
  );
}

export function Stack() {
  const [hot, setHot] = useState<string | null>(null);

  // Type a letter and every key starting with it gets pressed
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey || e.key.length !== 1 || !/[a-z]/i.test(e.key)) return;
      if ((e.target as HTMLElement).closest("input, textarea")) return;
      setHot(e.key.toLowerCase());
      clearTimeout(t);
      t = setTimeout(() => setHot(null), 650);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <Section id="stack">
      <SectionHeader
        eyebrow="04 · Stack"
        title={
          <>
            My <span className="text-accent">toolbox</span>, in clay.
          </>
        }
        lede="The languages, chains and infrastructure I reach for. Go ahead: drag them, squish them, or type a letter."
      />

      <Reveal className="clay grid gap-[26px] rounded-clay-xl p-[clamp(22px,4vw,40px)]">
        {stack.map((row, r) => (
          <div key={row.group} className="grid items-center gap-3 md:grid-cols-[130px_1fr] md:gap-[18px]">
            <span className="font-mono text-[12.5px] tracking-widest text-ink-faint uppercase">{row.group}</span>
            <div className="flex flex-wrap gap-3.5">
              {row.items.map((item, i) => (
                <Key key={item} label={item} hot={!!hot && item.toLowerCase().startsWith(hot)} delay={r * 0.08 + i * 0.04} />
              ))}
            </div>
          </div>
        ))}
        <div className="flex items-center gap-2.5 text-sm font-bold text-ink-faint">
          <kbd className="chip chip-in font-mono">R</kbd> try pressing a key on your keyboard
        </div>
      </Reveal>

      <div className="mt-8 grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-5">
        {contributions.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.08} className="clay rounded-clay p-[22px]" whileHover={{ y: -6 }}>
            <b className="block font-display text-[19px] font-medium">{c.title}</b>
            <span className="text-[15px] text-ink-soft">{c.text}</span>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
