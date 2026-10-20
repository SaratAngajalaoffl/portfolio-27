export const profile = {
  name: "Sarat Angajala",
  alias: "mugiwaraa.eth",
  location: "Bangalore, India",
  hometown: "Visakhapatnam",
  roles: ["Compute economics analyst", "Agentic workflow nerd", "Ex-MEV & solver dev", "Homelab tinkerer", "Arch ricer"],
  tagline:
    "I'm obsessed with agentic workflows: building the tooling that lets agents plan, code and ship real software, then pushing it until it breaks. Before that, I spent years building cross-chain solvers and MEV infrastructure.",
  links: {
    github: "https://github.com/SaratAngajalaoffl",
    x: "https://x.com/mugiwaraa_eth",
    linkedin: "https://www.linkedin.com/in/saratangajala",
    aneraLabs: "https://aneralabs.xyz",
  },
  // Leave this empty to hide the email button
  email: "",
};

export const stats = [
  { value: 6, suffix: "+", label: "years shipping", ring: 0.75 },
  { value: 7, suffix: "", label: "chains deployed on", ring: 0.6 },
  { value: 110, suffix: "+", label: "public repos", ring: 0.9 },
];

export const beliefs = [
  "Follow the data, not the hype",
  "Build it to understand it",
  "Self-host what you can",
  "Ship it, then measure it",
];

export type Job = {
  company: string;
  role: string;
  period: string;
  year: string;
  site?: string;
  link?: string;
  summary: string;
  // Supports inline [text](url) links
  bullets: string[];
  tags: string[];
};

export const jobs: Job[] = [
  {
    company: "Haasyl",
    role: "Fullstack Developer",
    period: "May 2020 – Jan 2022",
    year: "2020",
    summary: "Where it started: a mobile-first fintech product, end to end.",
    bullets: [
      "Built a mobile-first fintech app covering loan disbursal, KYC and repayment flows.",
      "Owned the stack from the UI down to the database.",
    ],
    tags: ["React", "Node", "Fintech"],
  },
  {
    company: "Sensho DAO",
    role: "Blockchain / Fullstack Engineer",
    period: "Jan 2022 – Jan 2023",
    year: "2022",
    summary: "NFT infrastructure for people who had never touched a wallet.",
    bullets: [
      "Built Augmint, which mints NFTs with a credit card and no wallet UX.",
      "Supported NFT sales for the Qatar Museums Authority during FIFA World Cup 2022.",
    ],
    tags: ["Solidity", "NFTs", "Polygon"],
  },
  {
    company: "clanX",
    role: "Freelance Developer",
    period: "Jan 2023 – Dec 2023",
    year: "2023",
    summary: "Freelancing through clanX, building applications for the companies they partnered with.",
    bullets: [
      "Built [lowsoot.com](https://lowsoot.com), a carbon dashboard product.",
      "Built a management portal for Somaiya Education Institute in Mumbai.",
      "Built an NFT wall product for displaying NFTs on Polygon.",
    ],
    tags: ["Polygon", "Dashboards", "Fullstack"],
  },
  {
    company: "Anera Labs",
    role: "Core Dev & Founders Office",
    period: "Jan 2023 – Present",
    year: "Now",
    site: "https://aneralabs.xyz",
    link: "https://anera.markets",
    summary:
      "My day job. Since 2025 it's been AI inference economics and AI-assisted engineering; before that, cross-chain solvers and MEV.",
    bullets: [
      "Since 2025: collecting, processing and analysing data on what AI inference costs, which feeds anera.markets indices like AI-TDI, token-factory and model intelligence.",
      "Researching AI development pipelines and bringing AI into how the lab builds and ships software.",
      "Until 2025: led engineering on cross-chain solvers and MEV infra, including Icarus (Rust cross-chain relayer for Nitro, Synapse and Li.Fi), Cerebrum (tick-level CEX + DEX data engine) and Intent Markets.",
      "Designed infra for real-time orderflow execution, RPC ingestion and MEV-aware relayers, deployed across multiple EVM L2s.",
    ],
    tags: ["Python", "Data pipelines", "AI inference", "Rust", "MEV"],
  },
];

export type Project = {
  name: string;
  blurb: string;
  details: string[];
  tags: string[];
  kind: ("trading" | "infra" | "ai")[];
  repo: string;
  live?: string;
  liveLabel?: string;
  stars?: number;
  icon: "jeeva" | "ygg" | "dots" | "lab" | "fin";
  hue: string;
};

export const projects: Project[] = [
  {
    name: "Jeeva",
    blurb: "AI-assisted, mid-frequency trading for Hyperliquid perps.",
    details: [
      "Rust engine with a decision supervisor per market",
      "Pluggable decision makers, mock-first execution",
      "Next.js dashboard with live P&L on TimescaleDB",
    ],
    tags: ["Rust", "TypeScript", "Hyperliquid"],
    kind: ["trading", "ai"],
    repo: "https://github.com/SaratAngajalaoffl/jeeva",
    live: "https://jeeva.trade",
    stars: 16,
    icon: "jeeva",
    hue: "#f47c7c",
  },
  {
    name: "Yggdrasil",
    blurb: "AI-orchestrated software development. Describe it and agents build it.",
    details: [
      "Agents branch, code and open PRs autonomously",
      "Isolated Docker runs streamed back in real time",
      "Works with any GitHub-hosted codebase",
    ],
    tags: ["Agents", "Docker", "Next.js"],
    kind: ["ai", "infra"],
    repo: "https://github.com/yggdrasil-hq/yggdrasil-core",
    live: "https://yggdrasil.cfd",
    icon: "ygg",
    hue: "#7cc49a",
  },
  {
    name: "Homelab",
    blurb: "My own little cloud: a single-node k3s cluster, GitOps all the way down.",
    details: [
      "ArgoCD app-of-apps, git push is the deploy",
      "Sealed Secrets + Velero backups to S3",
      "Runs Immich, Nextcloud, Ollama, Jeeva, Yggdrasil…",
    ],
    tags: ["k3s", "ArgoCD", "Helm"],
    kind: ["infra"],
    repo: "https://github.com/SaratAngajalaoffl/homelab",
    icon: "lab",
    hue: "#6f9fe0",
  },
  {
    name: "dotfiles-arch",
    blurb: "Arch + Hyprland with a Quickshell island that morphs into any widget.",
    details: [
      "One repo per app, wired together as submodules",
      "Secrets live in the keyring, never in git",
      "Single install.sh bootstraps the whole machine",
    ],
    tags: ["Arch", "Hyprland", "Quickshell"],
    kind: ["infra"],
    repo: "https://github.com/SaratAngajalaoffl/dotfiles-arch",
    live: "https://www.reddit.com/r/unixporn/s/hldsDp8vaB",
    liveLabel: "Reddit",
    stars: 5,
    icon: "dots",
    hue: "#b28be0",
  },
  {
    name: "Fintrack",
    blurb: "Open-source, self-hosted personal finance. Your money data stays yours.",
    details: [
      "Next.js App Router frontend",
      "Go HTTP API with Postgres migrations",
      "Docker Compose stacks for dev → prod",
    ],
    tags: ["Go", "Next.js", "Postgres"],
    kind: ["infra"],
    repo: "https://github.com/SaratAngajalaoffl/fintrack",
    icon: "fin",
    hue: "#e8b54d",
  },
];

export const stack: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["Solidity", "Rust", "TypeScript", "Python", "Go"] },
  { group: "Chains", items: ["Ethereum", "Optimism", "Arbitrum", "Base", "Polygon", "Scroll", "Solana"] },
  { group: "Tooling", items: ["Foundry", "Hardhat", "React", "Next.js", "Docker", "Grafana"] },
  { group: "Infra", items: ["AWS", "RETH nodes", "RPC ingestion", "MEV / PBS", "k3s", "ArgoCD"] },
];

export const contributions = [
  { title: "Backpack wallet", text: "Contributed EVM support" },
  { title: "Ethereum Foundation", text: "Docs contributions" },
  { title: "Audits & deploys", text: "WNWA NFT, Icarus yield vaults" },
  { title: "Custom testnets", text: "RETH nodes and solver infra" },
];
