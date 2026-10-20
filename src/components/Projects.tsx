"use client";

import { useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { projects, type Project } from "@/lib/content";
import { Arrow, Candles, GitHub, Heart, Server, Star, Terminal, Tree, Wallet } from "./icons";
import { Reveal, Section, SectionHeader, softSpring, spring } from "./ui";

const icons = { jeeva: Candles, ygg: Tree, lab: Server, dots: Terminal, fin: Wallet };

const filters = [
  { id: "all", label: "All" },
  { id: "trading", label: "Trading" },
  { id: "ai", label: "AI" },
  { id: "infra", label: "Infra" },
] as const;

/* Heart toggle that bursts clay crumbs */
function HeartButton({ name }: { name: string }) {
  const [on, setOn] = useState(false);
  return (
    <motion.button
      aria-label={`Like ${name}`}
      aria-pressed={on}
      onClick={() => setOn((v) => !v)}
      className="btn btn-sm btn-icon relative overflow-visible"
      whileTap={{ scale: 0.8 }}
    >
      <motion.span
        animate={on ? { scale: [1, 1.5, 1] } : { scale: 1 }}
        transition={on ? { duration: 0.4, times: [0, 0.35, 1], ease: "easeOut" } : spring}
      >
        <Heart className="!size-[18px]" fill={on ? "currentColor" : "none"} />
      </motion.span>
      <AnimatePresence>
        {on &&
          Array.from({ length: 8 }, (_, i) => {
            const a = (i / 8) * Math.PI * 2;
            return (
              <motion.span
                key={i}
                className="clay-accent pointer-events-none absolute size-2 rounded-full"
                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                animate={{ x: Math.cos(a) * 34, y: Math.sin(a) * 34, opacity: 0, scale: 0.3 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            );
          })}
      </AnimatePresence>
    </motion.button>
  );
}

function ProjectCard({ p }: { p: Project }) {
  const Icon = icons[p.icon];
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [7, -7]), softSpring);
  const ry = useSpring(useTransform(mx, [0, 1], [-7, 7]), softSpring);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.85, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={softSpring}
      className="[perspective:1000px]"
    >
      <motion.div
        className="clay flex h-full flex-col gap-4 rounded-clay-xl p-[26px] [transform-style:preserve-3d] hover:shadow-raised-lg"
        style={{ rotateX: rx, rotateY: ry }}
        onPointerMove={(e) => {
          if (e.pointerType !== "mouse") return;
          const r = e.currentTarget.getBoundingClientRect();
          mx.set((e.clientX - r.left) / r.width);
          my.set((e.clientY - r.top) / r.height);
        }}
        onPointerLeave={() => {
          mx.set(0.5);
          my.set(0.5);
        }}
      >
        <div className="flex items-center justify-between">
          <motion.div
            className="grid size-16 place-items-center rounded-[22px] text-white"
            style={{
              translateZ: 40,
              background: `linear-gradient(145deg, color-mix(in srgb, ${p.hue} 65%, white), ${p.hue})`,
              boxShadow: `6px 8px 18px color-mix(in srgb, ${p.hue} 40%, transparent), inset 3px 3px 6px rgba(255,255,255,.45), inset -4px -4px 8px rgba(0,0,0,.1)`,
            }}
            whileHover={{ rotate: [0, -10, 10, 0], scale: 1.08 }}
          >
            <Icon className="size-[30px]" />
          </motion.div>
          {p.stars ? (
            <span className="chip">
              <Star className="size-3.5 text-[#e8b54d]" /> {p.stars}
            </span>
          ) : null}
        </div>
        <h3 className="font-display text-[28px] leading-[1.1] font-semibold">{p.name}</h3>
        <p className="text-ink-soft">{p.blurb}</p>
        <ul className="clay-in grid gap-2 rounded-[22px] px-4 py-3.5 text-[14.5px] font-semibold text-ink-soft">
          {p.details.map((d) => (
            <li key={d} className="flex gap-2.5 before:font-black before:text-accent before:content-['›']">
              {d}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-2">
          {p.tags.map((t) => (
            <span key={t} className="chip">
              {t}
            </span>
          ))}
        </div>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-2.5 pt-1">
          <div className="flex gap-2.5">
            <a href={p.repo} target="_blank" rel="noreferrer" className="btn btn-sm">
              <GitHub /> Code
            </a>
            {p.live && (
              <a href={p.live} target="_blank" rel="noreferrer" className="btn btn-sm btn-accent">
                {p.liveLabel ?? "Live"} <Arrow />
              </a>
            )}
          </div>
          <HeartButton name={p.name} />
        </div>
      </motion.div>
    </motion.article>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<(typeof filters)[number]["id"]>("all");
  const shown = projects.filter((p) => filter === "all" || p.kind.includes(filter));

  return (
    <Section id="projects">
      <div className="flex flex-wrap items-end justify-between gap-x-5">
        <SectionHeader
          eyebrow="03 · Projects"
          title={
            <>
              Things I&apos;ve <span className="text-accent">shaped.</span>
            </>
          }
          lede="Jeeva, Yggdrasil and Fintrack are how I learn AI development pipelines: by building real things with them. The homelab and the rice are just for fun."
        />
        <Reveal className="mb-12">
          <div className="segmented" role="group" aria-label="Filter projects">
            {filters.map((f) => (
              <button key={f.id} aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}>
                {filter === f.id && <motion.span layoutId="filter-thumb" transition={spring} className="absolute inset-0 rounded-[13px] bg-surface shadow-raised-sm" />}
                <span className="relative">{f.label}</span>
              </button>
            ))}
          </div>
        </Reveal>
      </div>


      <motion.div layout className="grid grid-cols-[repeat(auto-fill,minmax(min(320px,100%),1fr))] gap-7">
        <AnimatePresence mode="popLayout">
          {shown.map((p) => (
            <ProjectCard key={p.name} p={p} />
          ))}
        </AnimatePresence>
      </motion.div>
    </Section>
  );
}
