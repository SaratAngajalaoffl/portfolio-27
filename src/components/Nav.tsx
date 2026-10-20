"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Moon, StrawHat, Sun } from "./icons";
import { useReady } from "@/lib/ready";
import { spring } from "./ui";

const sections = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "projects", label: "Projects" },
  { id: "stack", label: "Stack" },
  { id: "contact", label: "Contact" },
];

function useRootAttr(name: "theme", fallback: string) {
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

        <ThemeSwitch />
      </motion.nav>
    </>
  );
}
