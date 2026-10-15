"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

export const spring = { type: "spring", stiffness: 380, damping: 22 } as const;
export const softSpring = { type: "spring", stiffness: 120, damping: 18 } as const;

export function Reveal({ delay = 0, y = 40, ...props }: HTMLMotionProps<"div"> & { delay?: number; y?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ ...softSpring, delay }}
      {...props}
    />
  );
}

export function SectionHeader({ eyebrow, title, lede }: { eyebrow: string; title: React.ReactNode; lede?: string }) {
  return (
    <Reveal>
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="font-display mt-3.5 mb-4 text-[clamp(36px,5.4vw,64px)] leading-[1.05] font-semibold tracking-tight">
        {title}
      </h2>
      {lede && <p className="mb-12 max-w-[620px] text-lg text-ink-soft">{lede}</p>}
    </Reveal>
  );
}

export function Section({ id, children, className = "" }: { id: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`relative pt-[clamp(80px,12vw,150px)] pb-5 ${className}`}>
      <div className="mx-auto w-[min(1180px,100%-32px)]">{children}</div>
    </section>
  );
}
