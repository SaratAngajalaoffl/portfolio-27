"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ChevronDown, Moon, StrawHat, Sun } from "./icons";
import { useReady } from "@/lib/ready";
import { spring } from "./ui";

const sections = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "projects", label: "Projects" },
  { id: "stack", label: "Stack" },
  { id: "contact", label: "Contact" },
];

const accents = [
  { id: "coral", label: "Coral", color: "#f47c7c" },
  { id: "graphite", label: "Graphite", color: "#6e7385" },
  { id: "pacific", label: "Pacific Blue", color: "#4f8fd6" },
];

function useRootAttr(name: "theme" | "accent", fallback: string) {
  const [value, setValue] = useState(fallback);
  useEffect(() => setValue(document.documentElement.dataset[name] ?? fallback), [name, fallback]);
  const update = (v: string) => {
    setValue(v);
    document.documentElement.dataset[name] = v;
    try {
      localStorage.setItem(name, v);
    } catch {}
  };
  return [value, update] as const;
}

function useActiveSection() {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id === "home" ? null : e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ["home", ...sections.map((s) => s.id)].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return active;
}

function ThemeSwitch() {
  const [theme, setTheme] = useRootAttr("theme", "light");
  const dark = theme === "dark";
  return (
    <button
      role="switch"
      aria-checked={dark}
      aria-label="Dark mode"
      className="switch max-md:!w-16"
      onClick={() => setTheme(dark ? "light" : "dark")}
    >
      <motion.span layout transition={spring} className="switch-knob">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={theme}
            initial={{ rotate: -90, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            exit={{ rotate: 90, scale: 0 }}
            transition={{ duration: 0.2 }}
          >
            {dark ? <Moon className="size-4" /> : <Sun className="size-4" />}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </button>
  );
}

function AccentSelect() {
  const [accent, setAccent] = useRootAttr("accent", "coral");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = accents.find((a) => a.id === accent) ?? accents[0];

  useEffect(() => {
    if (!open) return;
    const close = (e: Event) => {
      if (e instanceof KeyboardEvent ? e.key === "Escape" : !ref.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("pointerdown", close);
    window.addEventListener("keydown", close);
    return () => {
      window.removeEventListener("pointerdown", close);
      window.removeEventListener("keydown", close);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Accent colour"
        onClick={() => setOpen((o) => !o)}
        className="flex h-10 items-center gap-2 rounded-[14px] bg-surface px-3 text-sm font-bold text-ink-soft shadow-raised-sm transition-shadow active:shadow-pressed-sm"
      >
        <span className="swatch" style={{ background: current.color }} />
        <span className="max-md:hidden">{current.label}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} className="max-md:hidden">
          <ChevronDown className="size-4" />
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: -10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            transition={spring}
            className="clay absolute top-[calc(100%+14px)] right-0 grid min-w-[190px] origin-top-right gap-2.5 rounded-[22px] p-2.5 max-md:top-auto max-md:bottom-[calc(100%+14px)] max-md:origin-bottom-right"
          >
            {accents.map((a) => (
              <button
                key={a.id}
                role="menuitemradio"
                aria-checked={a.id === accent}
                onClick={() => {
                  setAccent(a.id);
                  setOpen(false);
                }}
                className="flex h-[46px] items-center gap-3 rounded-[14px] bg-surface px-3.5 font-bold text-ink-soft shadow-raised-sm transition-shadow aria-checked:text-ink aria-checked:shadow-pressed-sm"
              >
                <span className="swatch" style={{ background: a.color }} />
                {a.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Nav() {
  const active = useActiveSection();
  const ready = useReady();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 26 });

  return (
    <>
      <motion.div
        aria-hidden
        className="clay-accent fixed inset-x-0 top-0 z-[60] h-[5px] origin-left rounded-r-full !shadow-none"
        style={{ scaleX: progress }}
      />
      <motion.nav
        aria-label="Primary"
        initial={{ y: -24, x: "-50%", opacity: 0, scale: 0.92 }}
        animate={ready ? { y: 0, x: "-50%", opacity: 1, scale: 1 } : undefined}
        transition={{ ...spring, delay: 0.5 }}
        className="fixed top-[18px] left-1/2 z-50 flex w-[min(1180px,100%-24px)] items-center justify-between gap-3 rounded-[26px] bg-surface/80 p-2.5 shadow-raised backdrop-blur-md max-md:top-auto max-md:bottom-3.5"
      >
        <a href="#home" className="flex items-center gap-2.5 py-1 pr-2.5 pl-1 font-display text-lg font-semibold max-[420px]:hidden" aria-label="Back to top">
          <motion.span
            className="grid size-[42px] place-items-center rounded-[14px] bg-surface shadow-raised-sm"
            whileHover={{ rotate: [-6, 6, -4, 0], transition: { duration: 0.5 } }}
          >
            <StrawHat className="w-[30px]" />
          </motion.span>
          <span className="max-lg:hidden">
            mugiwaraa<span className="text-accent">.eth</span>
          </span>
        </a>

        <div className="segmented">
          {sections.map((s, i) => (
            <a key={s.id} href={`#${s.id}`} aria-current={active === s.id} aria-label={s.label} className="max-md:!min-w-8 max-md:!px-2">
              {active === s.id && (
                <motion.span layoutId="nav-thumb" transition={spring} className="absolute inset-0 rounded-[13px] bg-surface shadow-raised-sm" />
              )}
              <span className="relative max-lg:hidden">{s.label}</span>
              <span className="relative lg:hidden">{i + 1}</span>
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2.5">
          <AccentSelect />
          <ThemeSwitch />
        </div>
      </motion.nav>
    </>
  );
}
