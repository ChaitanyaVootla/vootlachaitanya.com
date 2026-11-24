// Single source of truth for everything the site says. The page, the
// metadata, the JSON-LD and the llms.txt files are all rendered from here.

export const site = {
  url: "https://vootlachaitanya.com",
  name: "Chaitanya Vootla",
  givenName: "Chaitanya",
  familyName: "Vootla",
  role: "Staff Engineer",
  company: { name: "Faeth Therapeutics", url: "https://www.faeththerapeutics.com" },
  title: "Chaitanya Vootla — Staff Engineer building AI agents for clinical trials",
  description:
    "Staff engineer at Faeth Therapeutics, building AI agents and the harnesses around them for clinical trials. Ten years of full-stack product engineering behind it.",
  tagline: "Staff engineer. I build AI agents for clinical trials.",
  summary:
    "Staff engineer at Faeth Therapeutics, building AI agents and the harnesses around them for clinical trials. Ten years of full-stack product engineering before that.",
  intro:
    "I build AI agents for clinical trials at Faeth Therapeutics. Most of that work is the harness, the scaffolding around the model, and the domain keeps me honest about reliability. Evenings go to side projects built the same way. About ten years of full-stack before all this.",
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
  // Subscribe block under every post. With an empty username only the RSS
  // link is shown, so there is never a form that posts nowhere.
  newsletter: { provider: "buttondown", username: "" as string },
  // Umami. The script is added to production builds only, and only once a
  // website ID is set. Clicks are counted through data-umami-event attributes.
  analytics: { provider: "umami", websiteId: "" as string, src: "https://cloud.umami.is/script.js" },
} as const;

export const facts = [
  { value: "10+", label: "Years writing software" },
  { value: "Agents", label: "What I build" },
  { value: "Clinical trials", label: "Where they run" },
  { value: "Product systems", label: "Where I’m strongest" },
] as const;

export const focus = {
  eyebrow: "What I work on",
  heading: "One job, three layers.",
  lede: "At Faeth I build agents for clinical trials. The harness is the engineering, the trial is the domain, and ten years of ordinary full-stack product work is what both stand on.",
  items: [
    {
      title: "Agent harnesses",
      body: "What I build. Task contracts, tool boundaries, traces, evals — the scaffolding that turns a demo into something you can actually rely on. LangGraph is where I work.",
    },
    {
      title: "Clinical trials",
      body: "Where the agents run. At Faeth they pull structure out of trial protocols and help monitor trials in near real time. Getting it wrong has real consequences, so the work skews toward correctness, audit trails, and not breaking things in prod.",
    },
    {
      title: "Full-stack",
      body: "What it all stands on. Ten years of product work before this — frontends, services, the cloud bits, the database underneath. An agent is only as good as the system around it.",
    },
  ],
} as const;

export const writing = {
  eyebrow: "Writing",
  heading: "Notes from the harness.",
  lede: "Long-form write-ups on building agents: the contracts, tools, traces and evals around the model, and what breaks once it runs for real.",
  latest: "Latest writing",
  latestHeading: "Recent write-ups.",
  empty: "The first write-up is coming soon.",
  subscribe: {
    heading: "Get the next write-up, and hear when Cue opens up.",
    withForm: "One email when something new goes up. Unsubscribe any time.",
    withoutForm: "There is no mailing list yet. The RSS feed has every post in full.",
  },
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
      body: "AI agents for clinical trials: pulling structured metadata out of trial protocols and monitoring trials in near real time. Healthcare-grade reliability, so a lot of the work is making sure the boring parts are actually boring.",
    },
  ],
} as const;

export const agents = {
  eyebrow: "How I build agents",
  heading: "The model call is the easy part.",
  lede: "At work and on my own projects it is the same loop: task contracts, tool boundaries, traces, evals, and the feedback that ties them together. LangGraph is the framework I work in. It feels a lot like picking up React in 2017 — the obvious choice that just hasn’t been obvious for very long yet.",
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

export const projects = {
  eyebrow: "Projects",
  heading: "One at work, three after hours.",
  lede: "Cue is what I build at Faeth, and the largest thing here. The rest are evenings: TheMovieBrowser is the one I use every week, and the two newer ones were designed for agents from the start. In Kosh an agent can read my portfolio but never trade, and in Pramāṇa every edit it makes is a proposal that gets reviewed and logged before anything changes.",
  // Built at Faeth as part of the day job. Draft copy: keep it free of numbers,
  // dates and security specifics, and don't call it open source until it is.
  lead: {
    name: "Cue",
    tagline: "An autonomous work system for the whole team",
    // Cue's public landing page, captured in its dark theme.
    shot: {
      src: "/images/shots/cue",
      alt: "Cue landing page: the headline “Cue does the work. You set the direction.” beside a chat where Cue takes a request to monitor competitor pricing, runs two researcher agents and returns a pricing table, with the tools it connects to listed below",
      caption: "Cue’s landing page",
    },
    status: "Internal at Faeth · open source planned",
    body: "I designed and built Cue at Faeth, and I still maintain it. It plugs into the tools a team already lives in, keeps a living memory of the people, projects and repos it works with, and runs agent work on a schedule or the moment someone asks. Faeth uses it internally today, and the plan is to open-source it.",
    capabilities: [
      "Connects to GitHub, Slack, Jira, Google Workspace and more",
      "A living memory of people, projects and repos",
      "Agent work on a schedule or on demand",
      "Runs inside the organisation’s own AWS account",
    ],
    stack: ["TypeScript", "React", "AWS Bedrock", "DuckDB", "OpenFGA", "MCP"],
    link: { href: "https://cue.faethtx.io", label: "cue.faethtx.io", note: "public docs, sign-in for the app" },
    source: null as string | null,
  },
  featured: {
    name: "TheMovieBrowser.com",
    status: "Still adding things",
    body: "Started as something to scratch my own itch around finding things to watch. Now it is movie and TV discovery with ratings from multiple sources, watch links, watchlists, custom filters, and recs backed by embeddings + vector search.",
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
  },
  others: [
    {
      name: "Kosh",
      tagline: "A long-term portfolio companion for Indian markets",
      // Captured from the app running on its seeded demo fixtures, never real holdings.
      shot: {
        src: "/images/shots/kosh",
        alt: "Kosh holdings table: each stock with its weight, value, one-year sparkline, profit, XIRR, drawdown, distance from the 52-week high, 200-day average signal and a watch status",
        caption: "The holdings view, running on demo data",
      },
      status: "Live, for my own portfolio",
      body: "Reads my Zerodha holdings and shows what a long-term investor actually needs to see — XIRR, drawdown, the 200-day average, concentration — in a fast, mobile-first dashboard. It tracks. It never places a trade.",
      capabilities: [
        "Long-term signals instead of a ticker tape",
        "MCP server, so an agent can query the portfolio and build dashboards",
        "Read-only by design: no order ever leaves it",
        "Runs fully offline on seeded mock data",
      ],
      stack: ["Next.js", "NestJS", "TypeScript", "SQLite", "Drizzle", "ECharts", "MCP"],
      link: { href: "https://stocks.vootlachaitanya.com", label: "stocks.vootlachaitanya.com", note: "sign-in only" },
      // Private repo. Set to the GitHub URL if it is ever made public.
      source: null as string | null,
    },
    {
      name: "Pramāṇa",
      tagline: "Indian history, with the evidence attached",
      shot: {
        src: "/images/shots/pramana",
        alt: "Pramāṇa page on the Maurya Empire: a plain-language summary beside a photo of the Lion Capital of Aśoka, with a map of the empire in 252 BCE and a timeline of its rulers",
        caption: "The page on the Maurya Empire",
      },
      status: "Live: open to read, sign in to keep notes and cards",
      body: "A learning platform where every statement points to the exact words it rests on, in a source you can open. Where scholars disagree, you see each reading and what supports it.",
      capabilities: [
        "Claims tied to verbatim quotes with page, verse or edict locators",
        "Each quote checked against an immutable snapshot of its source",
        "Agents work over MCP; every edit is a reviewed, logged proposal",
        "Spaced repetition over claims, with confidence calibration",
      ],
      stack: ["Next.js", "TypeScript", "PostgreSQL", "Drizzle", "MCP", "FSRS", "MapLibre"],
      link: { href: "https://pramana.vootlachaitanya.com", label: "pramana.vootlachaitanya.com", note: "open to read" },
      source: "https://github.com/ChaitanyaVootla/pramana" as string | null,
    },
  ],
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
        "MCP servers",
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
    { href: "/blog/rss.xml", note: "Writing, every post in full, as RSS" },
    { href: "/robots.txt", note: "Crawlers and agents are all welcome" },
    { href: "/sitemap.xml", note: "Sitemap" },
  ],
} as const;

export const nav = [
  { href: "#work", label: "Work" },
  { href: "#timeline", label: "Timeline" },
  { href: "#agents", label: "Agents" },
  { href: "#projects", label: "Projects" },
  { href: "#stack", label: "Stack" },
] as const;
