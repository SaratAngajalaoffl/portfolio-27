"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// A small clay ball that trails the pointer and swells over anything clickable
export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 35, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 500, damping: 35, mass: 0.6 });
  const [hover, setHover] = useState(false);
  const [down, setDown] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    setEnabled(true);
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setHover(!!(e.target as Element)?.closest?.("a, button, [role=slider], .key"));
    };
    const press = () => setDown(true);
    const release = () => setDown(false);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerdown", press);
    window.addEventListener("pointerup", release);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", press);
      window.removeEventListener("pointerup", release);
    };
  }, [x, y]);

  if (!enabled) return null;
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[90] -mt-3 -ml-3 size-6 rounded-full"
      style={{
        x: sx,
        y: sy,
        background: "radial-gradient(circle at 32% 28%, var(--accent-2), var(--accent))",
        boxShadow: "3px 4px 10px var(--accent-glow), inset 2px 2px 3px rgba(255,255,255,.4)",
      }}
      animate={{ scale: down ? 0.7 : hover ? 2.2 : 1, opacity: hover ? 0.35 : 0.85 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
    />
  );
}
