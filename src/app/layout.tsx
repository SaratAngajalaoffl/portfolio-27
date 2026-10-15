import type { Metadata, Viewport } from "next";
import { Fredoka, Nunito, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const fredoka = Fredoka({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-fredoka" });
const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-jetbrains" });

const title = "Sarat Angajala · mugiwaraa.eth";
const description =
  "Sarat Angajala (mugiwaraa.eth): blockchain and AI financial infrastructure builder. Leading anera.markets at Anera Labs.";

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
    description: "Blockchain + AI financial infrastructure builder. Designing markets where the incentives actually hold.",
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

// Runs before paint so the saved theme/accent never flashes
const themeScript = `try{var d=document.documentElement;d.dataset.theme=localStorage.getItem("theme")||(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");d.dataset.accent=localStorage.getItem("accent")||"coral"}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="light"
      data-accent="coral"
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
