// Single source of truth for everything the site says. The page, the
// metadata, the JSON-LD and the llms.txt files are all rendered from here.

export const site = {
  url: "https://vootlachaitanya.com",
  name: "Chaitanya Vootla",
  givenName: "Chaitanya",
  familyName: "Vootla",
  role: "Staff Engineer",
  company: { name: "Faeth Therapeutics", url: "https://www.faeththerapeutics.com" },
  title: "Chaitanya Vootla — Staff Engineer · AI Agents · Clinical Trials",
  description:
    "Staff engineer building agent harnesses, clinical-trial software at Faeth Therapeutics, and full-stack product platforms. Ten years of shipping production systems.",
  tagline: "Staff engineer. Mostly working on agents right now.",
  summary:
    "Staff engineer working on agent harnesses and clinical-trial software. Ten years of full-stack product engineering before that. Day job at Faeth Therapeutics.",
  intro:
    "Most of my time goes into agent harnesses these days — the scaffolding around agents is where the interesting work is. Day job is clinical-trial software at Faeth Therapeutics, which keeps me honest about reliability. About ten years of full-stack before all this.",
  email: "chaitanyavootla42@gmail.com",
  phone: { display: "+91 78990 57199", href: "tel:+917899057199" },
  github: "https://github.com/ChaitanyaVootla",
  linkedin: "https://www.linkedin.com/in/vootlachaitanya",
  resume: "/Resume.pdf",
  portrait: { src: "/images/vootla.jpeg", caption: "Sikkim · 2022" },
  keywords: [
    "Chaitanya Vootla",
    "staff engineer",
    "AI engineer",
    "AI agents",
    "agent harnesses",
    "LangGraph",
    "LLM evals",
    "clinical trial software",
    "Faeth Therapeutics",
    "full-stack engineer",
    "TypeScript",
    "Next.js",
    "Node.js",
    "portfolio",
  ],
} as const;

export const facts = [
  { value: "10+", label: "Years writing software" },
  { value: "Agents", label: "Where my time goes" },
  { value: "Clinical trials", label: "Day job" },
  { value: "Product systems", label: "Where I’m strongest" },
] as const;

export const focus = {
  eyebrow: "What I work on",
  heading: "Three things, in this order.",
  lede: "Agent harnesses are where I spend my evenings and a lot of my Faeth time. Clinical-trial apps are the day job. Underneath both, ten years of normal full-stack product work.",
  items: [
    {
      title: "Agent harnesses",
      body: "Where I spend most of my time. Task contracts, tool boundaries, traces, evals — the scaffolding that turns a demo into something you can actually rely on. LangGraph is where I work.",
    },
    {
      title: "Clinical trials",
      body: "Day job at Faeth. Trial-related apps where getting it wrong has real consequences, so the work skews toward correctness, audit trails, and not breaking things in prod.",
    },
    {
      title: "Full-stack",
      body: "Ten years of product work before this — frontends, services, the cloud bits, the database underneath. Useful baseline for the agent stuff.",
    },
  ],
} as const;

// `from`/`to` are fractional years and only position the bars on the trace;
// `period` is the text that is shown. Listed oldest first, like spans in a run.
export const career = {
  eyebrow: "Timeline",
  heading: "The run so far.",
  axis: { start: 2012, end: 2027 },
  spans: [
    {
      org: "NIT Agartala",
      role: "B.Tech, CSE",
      period: "2012 — 2016",
      from: 2012.5,
      to: 2016.4,
      kind: "education",
      body: "Where I picked up the fundamentals before going full-time on product work.",
    },
    {
      org: "Shippable",
      role: "Software Engineer",
      period: "Jun 2016 — Mar 2019",
      from: 2016.45,
      to: 2019.25,
      kind: "work",
      body: "Built parts of a CI/CD product at startup speed. Got acquired by JFrog mid-way through, which is how I ended up there.",
    },
    {
      org: "JFrog",
      role: "Senior Software Engineer",
      period: "Apr 2019 — Feb 2025",
      from: 2019.25,
      to: 2025.17,
      kind: "work",
      body: "Artifactory and the CI/CD product line. Big Vue apps on the front, services and cloud orchestration on the back.",
    },
    {
      org: "Faeth Therapeutics",
      role: "Staff Engineer",
      period: "Mar 2025 — Now",
      from: 2025.17,
      to: null,
      kind: "current",
      body: "Clinical-trial related applications and the internal tools around them. Healthcare-grade reliability, so a lot of the work is making sure the boring parts are actually boring.",
    },
  ],
} as const;

export const agents = {
  eyebrow: "Agents · what I’m on now",
  heading: "This is where most of my time goes.",
  lede: "Building the scaffolding around agents — task contracts, tool boundaries, traces, evals, the feedback loop. LangGraph is the framework I work in. It feels a lot like picking up React in 2017 — the obvious choice that just hasn’t been obvious for very long yet.",
  loop: ["Prompt", "Tools", "Trace", "Eval", "Patch", "Ship"],
  beliefs: [
    {
      title: "The work is the scaffolding",
      body: "The interesting bit isn’t the model call. It’s the contracts, the tools, the traces, and the evals around it.",
    },
    {
      title: "Read the runs, not the demo",
      body: "Looks-good-once doesn’t ship. If I can’t see the runs over time, I can’t tell you anything.",
    },
    {
      title: "Domain first",
      body: "Agents work best when they sit on top of a real model of the domain. The LLM is the thin layer.",
    },
    {
      title: "Same boring discipline",
      body: "Observability, rollbacks, audit trails. The stuff that turns “cool demo” into “in production”.",
    },
  ],
} as const;

export const project = {
  eyebrow: "What I’m building on the side",
  heading: "TheMovieBrowser — the one I actually use every week.",
  lede: "Started as something to scratch my own itch around finding things to watch. Now it has a real backend, real recs, and a Chrome extension. Below is the live site.",
  name: "TheMovieBrowser.com",
  status: "Still adding things",
  body: "My evenings project. Movie and TV discovery with ratings from multiple sources, watch links, watchlists, custom filters, and recs backed by embeddings + vector search.",
  capabilities: [
    "Ratings and watch links",
    "Custom discovery filters",
    "Watchlist and episode tracking",
    "Embeddings + pgvector recommendations",
  ],
  stack: ["Next.js", "TypeScript", "PostgreSQL", "pgvector", "LangGraph", "AWS Bedrock"],
  url: "https://themoviebrowser.com",
  host: "themoviebrowser.com",
  source: "https://github.com/ChaitanyaVootla/movie-browser",
} as const;

export const stack = {
  eyebrow: "The stack",
  heading: "What I reach for, by area.",
  groups: [
    {
      title: "Agent stack",
      items: [
        "LangGraph",
        "OpenAI · Anthropic APIs",
        "Tool contracts",
        "Eval harnesses",
        "Embeddings · vector search",
        "Observability & traces",
      ],
    },
    {
      title: "Product platforms",
      items: ["React · Next", "TypeScript", "Design systems", "Data-heavy UI", "Clinical workflow UI"],
    },
    {
      title: "Systems",
      items: ["Node.js", "PostgreSQL · MongoDB", "Kubernetes · Docker", "AWS Lambda", "CI/CD orchestration"],
    },
    {
      title: "Reliability",
      items: ["Observability", "Audit trails", "Workflow safety", "Operational tooling", "Release discipline"],
    },
  ],
} as const;

export const contact = {
  eyebrow: "Get in touch",
  heading: "If you’re building agent stuff, I’d like to talk.",
} as const;

export const machine = {
  eyebrow: "For AI agents",
  heading: "Reading this with an AI? Skip the HTML.",
  lede: "The whole site is also published as plain markdown, built from the same source as this page. Hand the prompt to any assistant, or point it at one of the files.",
  files: [
    { href: "/llms.txt", note: "Index of the machine-readable pages" },
    { href: "/llms-full.txt", note: "The whole site as one markdown document" },
    { href: "/index.md", note: "The same document, served as text/markdown" },
    { href: "/robots.txt", note: "Crawlers and agents are all welcome" },
    { href: "/sitemap.xml", note: "Sitemap" },
  ],
} as const;

export const nav = [
  { href: "#work", label: "Work" },
  { href: "#timeline", label: "Timeline" },
  { href: "#agents", label: "Agents" },
  { href: "#project", label: "Project" },
  { href: "#stack", label: "Stack" },
] as const;
