"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, animate, motion, useMotionValue, useTransform } from "framer-motion";
import { jobs } from "@/lib/content";
import { Arrow, ChevronLeft, ChevronRight, Pause, Play } from "./icons";
import { Reveal, Section, SectionHeader } from "./ui";

const last = jobs.length - 1;

export function Experience() {
  const [index, setIndex] = useState(last);
  const [dir, setDir] = useState(1);
  const [playing, setPlaying] = useState(false);
  const pos = useMotionValue(1); // 0..1 along the track
  const pct = useTransform(pos, (v) => `${v * 100}%`);
  const track = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const go = (next: number) => {
    const n = (next + jobs.length) % jobs.length;
    setDir(n > index ? 1 : -1);
    setIndex(n);
    animate(pos, n / last, { type: "spring", stiffness: 260, damping: 24 });
  };

  // Play cycles through the timeline like the media controls on the board
  useEffect(() => {
    if (!playing) return;
    const t = setTimeout(() => go(index + 1), 3800);
    return () => clearTimeout(t);
  });

  const fromPointer = (clientX: number) => {
    const r = track.current!.getBoundingClientRect();
    const v = Math.min(1, Math.max(0, (clientX - r.left) / r.width));
    pos.set(v);
    const n = Math.round(v * last);
    if (n !== index) {
      setDir(n > index ? 1 : -1);
      setIndex(n);
    }
  };

  const job = jobs[index];

  return (
    <Section id="work">
      <SectionHeader
        eyebrow="02 · Work"
        title={
          <>
            Six years, <span className="text-accent">one through-line.</span>
          </>
        }
        lede="From fintech flows to wallet-less NFTs to market infrastructure for AI compute. Drag the slider or press play."
      />

      <div className="grid gap-9">
        <Reveal className="clay rounded-clay-xl px-[clamp(20px,4vw,40px)] pt-7 pb-5">
          <div
            ref={track}
            role="slider"
            tabIndex={0}
            aria-label="Career timeline"
            aria-valuemin={0}
            aria-valuemax={last}
            aria-valuenow={index}
            aria-valuetext={`${job.company}, ${job.period}`}
            className="relative flex h-11 cursor-pointer touch-none items-center"
            onPointerDown={(e) => {
              dragging.current = true;
              setPlaying(false);
              e.currentTarget.setPointerCapture(e.pointerId);
              fromPointer(e.clientX);
            }}
            onPointerMove={(e) => dragging.current && fromPointer(e.clientX)}
            onPointerUp={() => {
              dragging.current = false;
              go(index);
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight" && index < last) go(index + 1);
              if (e.key === "ArrowLeft" && index > 0) go(index - 1);
            }}
          >
            <div className="absolute inset-x-0 h-4 rounded-full bg-surface-2 shadow-pressed-sm" />
            <motion.div className="clay-accent absolute left-0 h-4 rounded-full !shadow-[inset_2px_2px_4px_rgba(255,255,255,.4),inset_-2px_-2px_4px_rgba(0,0,0,.1)]" style={{ width: pct }} />
            <motion.div
              className="knob absolute top-1/2 -mt-5 -ml-5 grid size-10 cursor-grab place-items-center rounded-full bg-surface shadow-raised active:cursor-grabbing"
              style={{ left: pct }}
              whileTap={{ scale: 1.15 }}
            />
          </div>

          <div className="relative mt-1.5 h-[54px]">
            {jobs.map((j, i) => (
              <button
                key={j.company}
                onClick={() => {
                  setPlaying(false);
                  go(i);
                }}
                aria-current={i === index}
                className="absolute top-0 grid gap-0.5 text-sm font-extrabold whitespace-nowrap text-ink-faint transition-colors first:justify-items-start last:justify-items-end hover:text-ink-soft aria-[current=true]:text-accent"
                style={{ left: `${(i / last) * 100}%`, translate: i === 0 ? "0" : i === last ? "-100%" : "-50%" }}
              >
                {j.year}
                <small className="text-xs font-bold max-md:hidden">{j.company}</small>
              </button>
            ))}
          </div>

          <div className="mt-2.5 flex justify-center gap-[18px]">
            {[
              { label: "Previous", icon: <ChevronLeft />, onClick: () => (setPlaying(false), go(index - 1)) },
              { label: playing ? "Pause" : "Play", icon: playing ? <Pause /> : <Play />, onClick: () => setPlaying((p) => !p), pressed: playing },
              { label: "Next", icon: <ChevronRight />, onClick: () => (setPlaying(false), go(index + 1)) },
            ].map((b) => (
              <motion.button
                key={b.label === "Pause" ? "Play" : b.label}
                aria-label={b.label}
                aria-pressed={b.pressed}
                onClick={b.onClick}
                className="btn w-[72px] !p-0 text-accent [--h:52px] [&_svg]:!size-5"
                whileTap={{ scale: 0.9 }}
              >
                {b.icon}
              </motion.button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="clay relative min-h-[340px] overflow-hidden rounded-clay-xl">
            <AnimatePresence mode="popLayout" initial={false} custom={dir}>
              <motion.article
                key={job.company}
                custom={dir}
                variants={{
                  enter: (d: number) => ({ x: d * 120, opacity: 0, rotate: d * 2, scale: 0.94 }),
                  center: { x: 0, opacity: 1, rotate: 0, scale: 1 },
                  exit: (d: number) => ({ x: d * -120, opacity: 0, rotate: d * -2, scale: 0.94 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 220, damping: 26 }}
                className="grid gap-[clamp(20px,4vw,50px)] p-[clamp(26px,4vw,46px)] lg:grid-cols-[0.9fr_1.1fr]"
              >
                <div>
                  <span className="font-mono text-[13px] tracking-wide text-accent">{job.period}</span>
                  <h3 className="mt-2.5 mb-1.5 font-display text-[clamp(32px,4vw,46px)] leading-[1.05] font-semibold">{job.company}</h3>
                  <div className="mb-4 font-extrabold text-ink-soft">{job.role}</div>
                  <p className="mb-5 text-ink-soft">{job.summary}</p>
                  <div className="flex flex-wrap gap-2.5">
                    {job.tags.map((t) => (
                      <span key={t} className="chip chip-in">
                        {t}
                      </span>
                    ))}
                  </div>
                  {job.link && (
                    <a href={job.link} target="_blank" rel="noreferrer" className="btn btn-sm btn-accent mt-6">
                      anera.markets <Arrow />
                    </a>
                  )}
                </div>
                <ul className="grid content-start gap-3.5">
                  {job.bullets.map((b, i) => (
                    <motion.li
                      key={b}
                      className="bullet flex gap-3.5 text-ink-soft"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + i * 0.08 }}
                    >
                      {b}
                    </motion.li>
                  ))}
                </ul>
              </motion.article>
            </AnimatePresence>
            {playing && (
              <motion.div
                key={`bar-${index}`}
                className="clay-accent absolute bottom-0 left-0 h-1.5 origin-left !shadow-none"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 3.8, ease: "linear" }}
                style={{ width: "100%" }}
              />
            )}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
