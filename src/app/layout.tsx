import type { Metadata, Viewport } from "next";
import { Fredoka, Nunito, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const fredoka = Fredoka({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-fredoka" });
const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-jetbrains" });

const title = "Sarat Angajala · mugiwaraa.eth";
const description =
  "Sarat Angajala (mugiwaraa.eth): AI inference economics and AI development pipelines. Core Dev & Founders Office at Anera Labs.";

export const metadata: Metadata = {
  metadataBase: new URL("https://smugiwara.com"),
  title,
  description,
  alternates: { canonical: "/" },
  icons: { icon: "/favicon.svg" },
  openGraph: {
    type: "website",
    url: "/",
    title,
    description: "Researching the economics of AI inference and the pipelines that build software with AI. Previously cross-chain solvers and MEV.",
    images: ["/og.jpg"],
  },
  twitter: { card: "summary_large_image", site: "@mugiwaraa_eth", creator: "@mugiwaraa_eth" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#e9e9ef" },
    { media: "(prefers-color-scheme: dark)", color: "#2b2d35" },
  ],
};

// Accent is fixed at build time: NEXT_PUBLIC_ACCENT=orchid|coral|graphite|pacific
const accents = ["orchid", "coral", "graphite", "pacific"];
const accent = accents.includes(process.env.NEXT_PUBLIC_ACCENT ?? "") ? process.env.NEXT_PUBLIC_ACCENT : "orchid";

// Runs before paint so the saved theme never flashes
const themeScript = `try{document.documentElement.dataset.theme=localStorage.getItem("theme")||(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light")}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="light"
      data-accent={accent}
      suppressHydrationWarning
      className={`${fredoka.variable} ${nunito.variable} ${jetbrains.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
