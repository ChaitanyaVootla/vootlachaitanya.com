import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin", "latin-ext"],
  axes: ["opsz", "wdth"],
  variable: "--font-display",
  display: "swap",
});
const sans = Geist({ subsets: ["latin", "latin-ext"], variable: "--font-sans", display: "swap" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  keywords: [...site.keywords],
  category: "technology",
  alternates: {
    canonical: "/",
    types: {
      "text/plain": [{ url: "/llms.txt", title: "llms.txt" }],
      "text/markdown": [{ url: "/index.md", title: "This page as markdown" }],
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: site.name,
    title: site.title,
    description: site.description,
    firstName: site.givenName,
    lastName: site.familyName,
    username: "ChaitanyaVootla",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f0e8" },
    { media: "(prefers-color-scheme: dark)", color: "#0d0d0b" },
  ],
};

// Runs before first paint so the saved (or system) theme never flashes.
const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.dataset.theme=t}catch(e){}})()`;

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${site.url}/#person`,
    name: site.name,
    givenName: site.givenName,
    familyName: site.familyName,
    url: site.url,
    image: `${site.url}${site.portrait.src}`,
    jobTitle: site.role,
    description: site.description,
    email: `mailto:${site.email}`,
    worksFor: { "@type": "Organization", name: site.company.name, url: site.company.url },
    alumniOf: [
      { "@type": "Organization", name: "JFrog", url: "https://jfrog.com" },
      { "@type": "Organization", name: "Shippable" },
      { "@type": "CollegeOrUniversity", name: "National Institute of Technology, Agartala" },
    ],
    knowsAbout: [
      "AI agents",
      "Agent harnesses",
      "LangGraph",
      "LLM evaluation",
      "Clinical trial software",
      "Full-stack engineering",
      "TypeScript",
      "Next.js",
      "Node.js",
      "PostgreSQL",
      "MongoDB",
      "Kubernetes",
      "AWS",
    ],
    sameAs: [site.github, site.linkedin],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    description: site.description,
    inLanguage: "en",
    publisher: { "@id": `${site.url}/#person` },
  },
  {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${site.url}/#profilepage`,
    url: site.url,
    name: site.title,
    description: site.description,
    inLanguage: "en",
    isPartOf: { "@id": `${site.url}/#website` },
    mainEntity: { "@id": `${site.url}/#person` },
  },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
