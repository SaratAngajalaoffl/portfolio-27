"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { profile } from "@/lib/content";
import { Arrow, Check, Copy, GitHub, LinkedIn, Mail, Search, StrawHat, XLogo } from "./icons";
import { Reveal, Section, spring } from "./ui";

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.alias);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  const links = [
    { href: profile.links.x, label: "@mugiwaraa_eth", icon: <XLogo /> },
    { href: profile.links.github, label: "GitHub", icon: <GitHub /> },
    { href: profile.links.linkedin, label: "LinkedIn", icon: <LinkedIn /> },
    ...(profile.email ? [{ href: `mailto:${profile.email}`, label: "Email", icon: <Mail /> }] : []),
  ];

  return (
    <Section id="contact">
      <Reveal className="clay relative overflow-hidden rounded-[56px] p-[clamp(30px,6vw,70px)] text-center shadow-raised-lg">
        {/* Decorative clay crumbs */}
        <motion.div
          aria-hidden
          className="blob-sphere absolute -top-8 -left-8 size-32"
          animate={{ y: [0, 14, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="blob-ring absolute -right-10 -bottom-10 size-44"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />

        <span className="eyebrow">05 · Contact</span>
        <h2 className="mx-auto mt-3.5 mb-4 max-w-[760px] font-display text-[clamp(36px,5.4vw,64px)] leading-[1.05] font-semibold tracking-tight">
          Let&apos;s build markets <span className="text-accent">that hold.</span>
        </h2>
        <p className="mx-auto mb-10 max-w-[560px] text-lg text-ink-soft">
          Working on something at the edge of DeFi and AI? Want to argue about mechanism design? My DMs are open.
        </p>

        <div className="mx-auto mb-9 flex max-w-[560px] gap-3.5 max-sm:flex-col">
          <div className="clay-in flex h-[58px] flex-1 items-center gap-3 overflow-hidden rounded-[18px] px-5 text-left font-mono text-base whitespace-nowrap text-ink-soft">
            <Search className="w-5 flex-none text-ink-faint" />
            <span>{profile.alias}</span>
          </div>
          <motion.button onClick={copy} className="btn btn-accent min-w-[120px] [--h:58px]" whileTap={{ scale: 0.92 }}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={copied ? "y" : "n"}
                className="flex items-center gap-2"
                initial={{ y: 14, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -14, opacity: 0 }}
                transition={spring}
              >
                {copied ? <Check /> : <Copy />} {copied ? "Copied" : "Copy"}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </div>

        <div className="relative flex flex-wrap justify-center gap-4">
          {links.map((l, i) => (
            <motion.a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="btn"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...spring, delay: 0.2 + i * 0.07 }}
            >
              {l.icon} {l.label}
            </motion.a>
          ))}
        </div>
      </Reveal>

      <footer className="flex flex-wrap items-center justify-between gap-5 pt-16 pb-10 text-sm font-bold text-ink-faint max-md:justify-center max-md:pb-[110px] max-md:text-center">
        <span className="flex items-center gap-2.5">
          <StrawHat className="w-7" /> © {new Date().getFullYear()} Sarat Angajala · smugiwara.com
        </span>
        <a href="#home" className="btn btn-sm">
          Back to top <Arrow className="-rotate-45" />
        </a>
      </footer>
    </Section>
  );
}
