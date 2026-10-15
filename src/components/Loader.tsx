"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, animate, motion, useMotionValue, useTransform } from "framer-motion";
import { markReady } from "@/lib/ready";

const DOTS = 12;

// The dotted spinner + progress ring from the clay board, as an intro
export function Loader() {
  const [show, setShow] = useState(true);
  const count = useMotionValue(0);
  const pct = useTransform(count, (v) => `${Math.round(v)}`);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("intro") === "1";
      sessionStorage.setItem("intro", "1");
    } catch {}
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = seen || reduce ? 0.25 : 1.5;

    const controls = animate(count, 100, { duration, ease: [0.65, 0, 0.35, 1] });
    const t = setTimeout(() => setShow(false), duration * 1000 + 150);
    return () => {
      controls.stop();
      clearTimeout(t);
    };
  }, [count]);

  useEffect(() => {
    document.documentElement.style.overflow = show ? "hidden" : "";
  }, [show]);

  return (
    <AnimatePresence onExitComplete={markReady}>
      {show && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[100] grid place-items-center bg-bg"
          exit={{ clipPath: "circle(0% at 50% 50%)" }}
          initial={{ clipPath: "circle(150% at 50% 50%)" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div
            className="clay relative grid size-[180px] place-items-center rounded-full"
            exit={{ scale: 0.6, opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {Array.from({ length: DOTS }, (_, i) => {
              const a = (i / DOTS) * Math.PI * 2;
              return (
                <motion.span
                  key={i}
                  className="clay-accent absolute size-3.5 rounded-full"
                  style={{ left: `calc(50% + ${Math.cos(a) * 64}px - 7px)`, top: `calc(50% + ${Math.sin(a) * 64}px - 7px)` }}
                  animate={{ opacity: [0.2, 1, 0.2], scale: [0.6, 1.15, 0.6] }}
                  transition={{ duration: 1.1, repeat: Infinity, delay: (i / DOTS) * 1.1, ease: "easeInOut" }}
                />
              );
            })}
            <div className="clay-in grid size-[88px] place-items-center rounded-full">
              <motion.span className="font-display text-3xl font-semibold text-ink-soft">{pct}</motion.span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
