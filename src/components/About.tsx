"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { beliefs, profile } from "@/lib/content";
import { Arrow, Pin } from "./icons";
import { Reveal, Section, SectionHeader, spring } from "./ui";

// Clay checkbox that ticks itself when scrolled into view
function Belief({ text, i }: { text: string; i: number }) {
  const [on, setOn] = useState(false);
  return (
    <motion.li
      className="flex items-center gap-3.5 font-bold text-ink-soft"
      onViewportEnter={() => setTimeout(() => setOn(true), 300 + i * 250)}
      viewport={{ once: true, margin: "-40px" }}
    >
      <motion.span
        className={`grid size-[30px] flex-none place-items-center rounded-[10px] ${on ? "clay-accent" : "clay-in"}`}
        animate={on ? { scale: [1, 0.75, 1.18, 1] } : undefined}
        transition={{ duration: 0.45 }}
      >
        <svg viewBox="0 0 24 24" className="w-4" fill="none" stroke="currentColor" strokeWidth={3.4} strokeLinecap="round" strokeLinejoin="round">
          <motion.path d="M20 6 9 17l-5-5" initial={{ pathLength: 0 }} animate={{ pathLength: on ? 1 : 0 }} transition={{ delay: 0.1, duration: 0.3 }} />
        </svg>
      </motion.span>
      {text}
    </motion.li>
  );
}

export function About() {
  return (
    <Section id="about">
      <SectionHeader eyebrow="01 · About" title={<>Markets where the incentives <span className="text-accent">actually hold.</span></>} />

      <div className="grid gap-7 lg:grid-cols-[1.3fr_1fr]">
        <Reveal className="clay rounded-clay-xl p-[clamp(26px,4vw,44px)] text-lg text-ink-soft [&_strong]:text-ink">
          <p className="mb-[18px]">
            I&apos;m <strong>Sarat</strong>, better known on-chain as <strong className="font-mono text-accent">{profile.alias}</strong>. I build
            blockchain and AI financial infrastructure, at the intersection where <strong>onchain DeFi meets AI-inference token economies</strong>.
          </p>
          <p className="mb-[18px]">
            I write <strong>Solidity, Rust, TypeScript and Python</strong> and work on DeFi, MEV and financial primitives. I care less about the
            latest chain and more about whether the mechanism survives contact with real users and real money. That&apos;s why I design markets
            instead of just hopping on them.
          </p>
          <p>
            Before this I shipped wallet-less NFT minting for a FIFA World Cup sale, cross-chain relayers, tick-level market data engines and a
            fintech app. Off the clock I&apos;m usually tuning my Hyprland rice or adding another service to the homelab.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <span className="chip">
              <Pin className="size-4 text-accent" /> {profile.hometown}
            </span>
            <motion.span
              className="text-ink-faint"
              animate={{ x: [0, 6, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            >
              →
            </motion.span>
            <span className="chip">
              <Pin className="size-4 text-accent" /> {profile.location}
            </span>
          </div>
        </Reveal>

        <div className="grid gap-7">
          <Reveal delay={0.1} className="clay relative flex flex-col gap-3.5 overflow-hidden rounded-clay-xl p-[30px]">
            <span className="eyebrow">Right now</span>
            <h3 className="font-display text-[30px] leading-[1.1] font-semibold">Leading anera.markets at Anera Labs</h3>
            <p className="text-ink-soft">
              Data, indices and an API for the open-source AI inference economy, built so that tokenized compute can be traded, hedged and priced
              like any other commodity.
            </p>
            <motion.a
              href={profile.links.anera}
              target="_blank"
              rel="noreferrer"
              className="btn btn-sm self-start"
              whileHover={{ scale: 1.04 }}
              transition={spring}
            >
              Visit anera.markets <Arrow />
            </motion.a>
          </Reveal>

          <Reveal delay={0.2} className="clay rounded-clay-xl p-[30px]">
            <span className="eyebrow">Ground rules</span>
            <ul className="mt-5 grid gap-3.5">
              {beliefs.map((b, i) => (
                <Belief key={b} text={b} i={i} />
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

