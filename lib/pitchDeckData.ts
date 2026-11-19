export interface SlideMetric {
  value: string;
  label: string;
}

export interface SlideData {
  id: number;
  image: string;
  category: string;
  title: string;
  subtitle: string;
  highlight?: string;
  bullets: string[];
  metrics?: SlideMetric[];
  badge?: string;
  keyTakeaway?: string;
  sourceCitation?: string;
  columns?: { title: string; desc: string; tag?: string }[];
}

export interface DeckConfig {
  id: "plan" | "full-plan";
  title: string;
  subtitle: string;
  badge: string;
  slideCount: number;
  pdfUrl: string;
  keynoteUrl: string;
  pptxUrl: string;
  alternateUrl: string;
  alternateLabel: string;
  slides: SlideData[];
}

// =====================================================================
// 1. NINE (9) SLIDES DECK — Mapped to /plan
// Source: Setthi_Problem_Updated_Matched_Slides.key / pptx / pdf
// =====================================================================
export const EXACT_9_SLIDES: SlideData[] = [
  {
    id: 1,
    image: "/decks/slides-plan/slide-1.png",
    category: "SETTHI / PITCH DECK",
    title: "Your money. Finally, answers.",
    subtitle: "The personal finance assistant that speaks plain English.",
    badge: "01 / 09",
    highlight: "WEB VALIDATED   ·   MOBILE NEXT",
    bullets: [
      "User asks: “How much did I spend on groceries?”",
      "Setthi AI: “You spent ₹2,646 on groceries across 36 transactions.”",
      "A smart conversational companion that replaces stressful spreadsheets."
    ],
    metrics: [
      { value: "Plain English", label: "No banking jargon or spreadsheet stress" },
      { value: "Conversational", label: "Instant answers to direct money questions" },
      { value: "Mobile Next", label: "Validated on web, scaling to everyday mobile" }
    ],
    keyTakeaway: "Illustrative product view based on setthi.in"
  },
  {
    id: 2,
    image: "/decks/slides-plan/slide-2.png",
    category: "THE PROBLEM",
    title: "Too many apps. Too many statements. No clear picture.",
    subtitle: "Bank accounts, credit cards and UPI apps each show a piece of the story. Understanding your money means switching platforms and reading lengthy statements.",
    badge: "02 / 09",
    bullets: [
      "01 • Accounts across multiple apps",
      "02 • Long, boring bank statements",
      "03 • No quick answer to where money went"
    ],
    columns: [
      { title: "01. Fragmented Accounts", desc: "Siloed across 3+ banking and UPI apps" },
      { title: "02. Long Bank Statements", desc: "Cryptic codes with zero context" },
      { title: "03. The Black Hole", desc: "No quick answer to where money went" }
    ],
    keyTakeaway: "Finances feel fragmented, stressful, and impossible to track with existing tools."
  },
  {
    id: 3,
    image: "/decks/slides-plan/slide-3.png",
    category: "OUR SOLUTION",
    title: "Ask your money. Get a clear answer.",
    subtitle: "Setthi makes financial information useful through a simple conversation.",
    badge: "03 / 09",
    highlight: "A CONVERSATION, NOT A DASHBOARD",
    bullets: [
      "“How much on groceries?”",
      "SETTHI: ₹2,646 spent on groceries across 36 transactions.",
      "The 3 Core Steps: Ask → Understand → Decide"
    ],
    metrics: [
      { value: "Ask", label: "Natural language questions" },
      { value: "Understand", label: "Immediate categorical breakdown" },
      { value: "Decide", label: "Confidently choose what comes next" }
    ],
    keyTakeaway: "Replacing complex dashboards with an honest, conversational guide."
  },
  {
    id: 4,
    image: "/decks/slides-plan/slide-4.png",
    category: "THE PRODUCT & FEATURES",
    title: "Clear answers today. Better choices tomorrow.",
    subtitle: "From day-to-day spending clarity to knowing what fits the budget and lifestyle planning.",
    badge: "04 / 09",
    bullets: [
      "01 • Understand spending: “Where did my money go?”",
      "02 • Stay ahead of bills: “What payments are coming up?”",
      "03 • Know what fits the budget: “Can I afford this?”",
      "NEXT & BEYOND: Plan around your budget — Explore financial choices, trips, entertainment and experiences. Setthi explains the options. The final decision is always yours."
    ],
    columns: [
      { title: "01. Understand Spending", desc: "Instant answers for food, shopping, utilities" },
      { title: "02. Stay Ahead of Bills", desc: "Track upcoming subscriptions & recurring dues" },
      { title: "03. Safe-to-Spend", desc: "Confidence check before making discretionary purchases" }
    ],
    keyTakeaway: "Clear answers today. Better choices tomorrow."
  },
  {
    id: 5,
    image: "/decks/slides-plan/slide-5.png",
    category: "EARLY TRACTION",
    title: "Users didn’t just try Setthi. They kept coming back.",
    subtitle: "Early web version validated strong retention and high daily query depth.",
    badge: "05 / 09",
    bullets: [
      "972 total web users in early pilot",
      "≈496 daily active users (51% DAU)",
      "~3 questions asked per active user / day"
    ],
    metrics: [
      { value: "972", label: "Total Web Pilot Users" },
      { value: "≈496", label: "Daily Active Users (51% DAU)" },
      { value: "~3", label: "Questions / Active User / Day" }
    ],
    sourceCitation: "51% of 972 web users are daily active (≈496). Calculated as 972 × 51%, rounded."
  },
  {
    id: 6,
    image: "/decks/slides-plan/slide-6.png",
    category: "WHAT IS NEXT",
    title: "Validated on web. Built for everyday use.",
    subtitle: "From web validation to a faster mobile experience and budget-aware planning.",
    badge: "06 / 09",
    bullets: [
      "01 • WEB: Proved the need. 972 people explored Setthi on web.",
      "02 • MOBILE: Make it a habit. A faster mobile experience, then budget-aware planning."
    ],
    columns: [
      { title: "01. Web Validation", desc: "972 people explored Setthi on web" },
      { title: "02. Mobile Native", desc: "Faster mobile experience and budget-aware planning" }
    ],
    keyTakeaway: "From web validation to a faster mobile experience and budget-aware planning."
  },
  {
    id: 7,
    image: "/decks/slides-plan/slide-7.png",
    category: "COMPETITION & OUR ADVANTAGE",
    title: "Fold starts with a dashboard. Setthi starts with a question.",
    subtitle: "Contrasting dashboard-heavy tracking against conversational clarity.",
    badge: "07 / 09",
    bullets: [
      "FOLD (Dashboard-first): Track balances, activity and financial health. (1L+ Google Play downloads)",
      "SETTHI (Assistant-first): Understand spending, explore choices and plan within a budget.",
      "UNDERSTAND → EXPLORE → PLAN",
      "OUR EDGE: Personal guidance across decisions — with the user always in control."
    ],
    columns: [
      { title: "Fold: Dashboard-First", desc: "1L+ downloads · Screen full of balances & charts" },
      { title: "Setthi: Assistant-First", desc: "Starts with what is on your mind · Instant plain answers" },
      { title: "Our Edge", desc: "Personal guidance across decisions — user always in control" }
    ],
    sourceCitation: "Fold also offers AI chat. 1L+ refers to Google Play downloads, not verified users. Source: Google Play, Nov 2026.",
    keyTakeaway: "Fold starts with a dashboard. Setthi starts with a question."
  },
  {
    id: 8,
    image: "/decks/slides-plan/slide-8.png",
    category: "BUSINESS MODEL · PLANNED",
    title: "We turn users’ spending patterns into a private distribution engine for businesses.",
    subtitle: "A privacy-first flywheel aligning consumer savings with high-intent commerce.",
    badge: "08 / 09",
    highlight: "PRIVACY FIRST: Businesses never see individual transactions or identities.",
    bullets: [
      "WHAT WE LEARN: With permission: the categories people spend in and their purchasing habits.",
      "HOW IT WORKS: Setthi helps businesses reach people already interested in what they sell.",
      "HOW WE EARN: Businesses pay Setthi to reach interested buyers.",
      "ONE ENGINE. MANY CATEGORIES: Shopping (product launches), Entertainment (tickets & experiences), Travel (stays & bookings)."
    ],
    metrics: [
      { value: "Shopping", label: "Product launches" },
      { value: "Entertainment", label: "Tickets & experiences" },
      { value: "Travel", label: "Stays & bookings" }
    ],
    keyTakeaway: "Businesses pay Setthi for relevant reach without compromising user privacy."
  },
  {
    id: 9,
    image: "/decks/slides-plan/slide-9.png",
    category: "VISION & SUMMARY",
    title: "Spending patterns are the advantage. Distribution is the power.",
    subtitle: "Setthi begins by helping people understand money. Next, it helps them weigh choices and plan within their budget. For businesses, that becomes a privacy-first way to reach interested buyers across categories.",
    badge: "09 / 09",
    highlight: "setthi.in   ·   WEB VALIDATED   ·   MOBILE NEXT",
    bullets: [
      "Understand: Transform cryptic statements into plain English conversational answers.",
      "Plan: Weigh financial choices, trips, entertainment, and lifestyle within actual budgets.",
      "Distribution: A privacy-preserving bridge connecting consumers with relevant businesses."
    ],
    metrics: [
      { value: "setthi.in", label: "Web Companion" },
      { value: "Mobile Next", label: "iOS & Android" },
      { value: "Privacy-First", label: "Zero Compromise on User Data" }
    ],
    keyTakeaway: "Spending patterns are the advantage. Distribution is the power."
  }
];

// =====================================================================
// 2. ELEVEN (11) SLIDES DECK — Mapped to /full-plan
// Source: Setthi_Pitch_Deck_11_Slides_Business_Simplified.pdf / pptx / key
// =====================================================================
export const EXACT_11_SLIDES: SlideData[] = [
  {
    id: 1,
    image: "/decks/slides-full/slide-1.png",
    category: "SETTHI / PITCH DECK",
    title: "Your money. Finally, answers.",
    subtitle: "The personal finance assistant that speaks plain English.",
    badge: "01 / 11",
    highlight: "WEB VALIDATED  ·  MOBILE NEXT",
    bullets: [
      "User asks: 'How much did I spend on groceries?'",
      "Setthi AI replies: 'You spent ₹2,646 on groceries across 36 transactions.'",
      "A smart conversational finance companion, not an intimidating spreadsheet."
    ],
    metrics: [
      { value: "Plain English", label: "No banking jargon or spreadsheet stress" },
      { value: "Conversational", label: "Instant answers to direct money questions" },
      { value: "Mobile Next", label: "Validated on web, scaling to everyday mobile" }
    ],
    keyTakeaway: "Illustrative product view based on setthi.in"
  },
  {
    id: 2,
    image: "/decks/slides-full/slide-2.png",
    category: "THE PROBLEM",
    title: "Too many apps. Too many statements. No clear picture.",
    subtitle: "Bank accounts, credit cards and UPI apps each show a piece of the story. Understanding your money means switching platforms and reading lengthy statements.",
    badge: "02 / 11",
    bullets: [
      "01 • Accounts across multiple apps: Bank accounts, credit cards, and UPI apps each show only fragmented data.",
      "02 • Long, boring bank statements: Cryptic reference codes and dense PDF pages make auditing exhausting.",
      "03 • No quick answer to where money went: Users finish every month feeling anxious and in the dark."
    ],
    columns: [
      { title: "01. Fragmented Accounts", desc: "Siloed across 3+ banking and UPI apps" },
      { title: "02. Inscrutable Statements", desc: "Dense transaction codes with zero context" },
      { title: "03. The Black Hole", desc: "No quick answer to where money actually went" }
    ],
    keyTakeaway: "Finances feel fragmented, stressful, and impossible to track with existing tools."
  },
  {
    id: 3,
    image: "/decks/slides-full/slide-3.png",
    category: "OUR SOLUTION",
    title: "Ask your money. Get a clear answer.",
    subtitle: "Setthi makes financial information useful through a simple conversation.",
    badge: "03 / 11",
    highlight: "A CONVERSATION, NOT A DASHBOARD",
    bullets: [
      "User asks: “How much on groceries?”",
      "Setthi answers: ₹2,646 spent on groceries across 36 transactions.",
      "3-Step Core Loop: ASK → UNDERSTAND → DECIDE.",
      "Transforms raw statements into immediate, compassionate clarity."
    ],
    metrics: [
      { value: "Ask", label: "Natural language questions" },
      { value: "Understand", label: "Immediate categorical breakdown" },
      { value: "Decide", label: "Confidently choose what comes next" }
    ],
    keyTakeaway: "Replacing complex dashboards with an honest, conversational guide."
  },
  {
    id: 4,
    image: "/decks/slides-full/slide-4.png",
    category: "THE PRODUCT & FEATURES",
    title: "Clear answers today. Better choices tomorrow.",
    subtitle: "From day-to-day transaction clarity to budget-aware life planning.",
    badge: "04 / 11",
    bullets: [
      "01 • Understand spending: 'Where did my money go?'",
      "02 • Stay ahead of bills: 'What payments are coming up?'",
      "03 • Know what fits the budget: 'Can I afford this?'",
      "NEXT & BEYOND: Plan around your budget — Explore financial choices, trips, entertainment, and experiences. Setthi explains the options. The final decision is always yours."
    ],
    columns: [
      { title: "01. Spending Clarity", desc: "Instant categorization of all transactions" },
      { title: "02. Upcoming Bills", desc: "Never get surprised by recurring deductions" },
      { title: "03. Safe-To-Spend", desc: "Instant confirmation on whether a purchase fits" }
    ],
    keyTakeaway: "Start with understanding daily cash flow; expand into budget-aware lifestyle planning."
  },
  {
    id: 5,
    image: "/decks/slides-full/slide-5.png",
    category: "MARKET SIZE",
    title: "India already moves money digitally. Now it needs money guidance.",
    subtitle: "UPI revolutionized how India pays. Setthi revolutionizes how India understands.",
    badge: "05 / 11",
    highlight: "55.49 Crore UPI Users Onboarded in India (June 2026)",
    bullets: [
      "PAY: UPI made payments effortless and ubiquitous across India.",
      "UNDERSTAND: Setthi explains money in plain, conversational English.",
      "DECIDE: People confidently choose what comes next.",
      "Audience Indicator: 55.49 Cr users moving money daily with zero built-in financial guidance."
    ],
    metrics: [
      { value: "55.49 Cr", label: "UPI Users Onboarded in India" },
      { value: "14.8B+", label: "Monthly Digital Transactions" },
      { value: "Massive", label: "Untapped Market for Money Guidance" }
    ],
    sourceCitation: "Source: Ministry of Finance / NPCI, Lok Sabha reply, 20 Jul 2026 · pib.gov.in/PressReleasePage.aspx?PRID=2286608"
  },
  {
    id: 6,
    image: "/decks/slides-full/slide-6.png",
    category: "TRACTION & MOBILE NEXT",
    title: "Validated on web. Built for everyday use.",
    subtitle: "Early web pilot confirms high engagement and sticky daily habits.",
    badge: "06 / 11",
    bullets: [
      "01 • Proved the need: 972 people explored Setthi on web during the initial pilot.",
      "02 • High Daily Retention: 51% of web users are daily active (≈496 DAUs).",
      "03 • High Conversation Depth: ~3 AI financial questions asked per active user every day.",
      "WEB → MOBILE: Transitioning from web exploration to a lightning-fast daily mobile habit."
    ],
    metrics: [
      { value: "972", label: "Total Web Pilot Users" },
      { value: "≈496", label: "Daily Active Users (51% DAU)" },
      { value: "~3", label: "Questions / Active User / Day" }
    ],
    keyTakeaway: "51% DAU/MAU ratio confirms organic utility and frequent return visits."
  },
  {
    id: 7,
    image: "/decks/slides-full/slide-7.png",
    category: "COMPETITION & OUR ADVANTAGE",
    title: "Fold starts with a dashboard. Setthi starts with a question.",
    subtitle: "Contrasting traditional dashboard tracking against conversational intelligence.",
    badge: "07 / 11",
    bullets: [
      "FOLD (Dashboard-First): Tracks balances, activity, and financial health. Pushes charts and numbers.",
      "SETTHI (Assistant-First): Understand spending, explore choices, and plan within a budget.",
      "THE PARADIGM SHIFT: Fold starts with a screen full of numbers. Setthi starts with what is on your mind.",
      "OUR EDGE: Personal guidance across decisions — with the user always in control (UNDERSTAND → EXPLORE → PLAN)."
    ],
    columns: [
      { title: "Fold: Dashboard-First", desc: "1L+ downloads. Tracks balances & charts." },
      { title: "Setthi: Assistant-First", desc: "Conversational guidance across financial choices." },
      { title: "Our Edge", desc: "User remains in complete control with zero overwhelm." }
    ],
    keyTakeaway: "People don't want to manage another dashboard; they want a friend who knows their numbers."
  },
  {
    id: 8,
    image: "/decks/slides-full/slide-8.png",
    category: "BUSINESS MODEL · PLANNED",
    title: "We turn users’ spending patterns into a private distribution engine for businesses.",
    subtitle: "A privacy-first flywheel aligning consumer savings with high-intent commerce.",
    badge: "08 / 11",
    highlight: "PRIVACY FIRST: Businesses never see individual transactions or identities.",
    bullets: [
      "WHAT WE LEARN: With user permission, the categories people spend in and their purchasing habits.",
      "HOW IT WORKS: Setthi helps businesses reach people already interested in what they sell.",
      "HOW WE EARN: Businesses pay Setthi for relevant reach and verified purchase distribution.",
      "ONE ENGINE. MANY CATEGORIES: Shopping (product launches), Entertainment (tickets & experiences), Travel (stays & bookings)."
    ],
    metrics: [
      { value: "Shopping", label: "Relevant product launches" },
      { value: "Entertainment", label: "Curated experiences & tickets" },
      { value: "Travel", label: "Budget-aware bookings & stays" }
    ],
    keyTakeaway: "Businesses pay Setthi for relevant reach without compromising user privacy."
  },
  {
    id: 9,
    image: "/decks/slides-full/slide-9.png",
    category: "CUSTOMER ACQUISITION",
    title: "Build something people want to talk about.",
    subtitle: "The product earns attention. A simple reward helps it spread.",
    badge: "09 / 11",
    bullets: [
      "01 • FREEMIUM: Start completely free, with clear and generous AI usage limits.",
      "02 • REFERRALS: Invite a friend and earn 7 days of bonus AI credits within limits.",
      "03 • SPENDING ARCHETYPES: A viral, shareable 'money personality' card engineered for Instagram Stories.",
      "CONCEPT: 'Weekend Explorer (Fun · Travel)' archetype card — shared only by choice, never showing balances or private transactions."
    ],
    columns: [
      { title: "01. Freemium", desc: "Effortless sign-up with generous free usage" },
      { title: "02. Referral Loops", desc: "Earn AI credits by onboarding friends" },
      { title: "03. Story Archetypes", desc: "Viral social proof without exposing private data" }
    ],
    keyTakeaway: "Organic referral loops and social shareability keep CAC near zero."
  },
  {
    id: 10,
    image: "/decks/slides-full/slide-10.png",
    category: "MVP COSTS & LAUNCH TARGET",
    title: "₹8 per active day. 10,000 users: launch target.",
    subtitle: "Highly capital-efficient unit economics built for rapid consumer scale.",
    badge: "10 / 11",
    highlight: "MVP Cost: ₹8 per active user/day (₹5 AI reasoning + ₹3 server & database)",
    bullets: [
      "Assumes around 3 AI questions per active user each day.",
      "Mobile Launch Target: 10,000 sign-ups in 40 days.",
      "30-Day Cost Scenarios: 10% active (1k users) = ₹2.4 Lakh | 30% active (3k users) = ₹7.2 Lakh.",
      "Cost Optimization: Infrastructure costs drop significantly with scale through optimized smaller models and caching."
    ],
    metrics: [
      { value: "₹8", label: "MVP Cost per Active User/Day" },
      { value: "10,000", label: "Sign-up Target in 40 Days" },
      { value: "₹2.4L - ₹7.2L", label: "30-Day Launch Cost Range" }
    ],
    sourceCitation: "Assumes around 3 AI questions per active user each day. Target is not achieved traction; pricing tests follow launch."
  },
  {
    id: 11,
    image: "/decks/slides-full/slide-11.png",
    category: "VISION & SUMMARY",
    title: "Spending patterns are the advantage. Distribution is the power.",
    subtitle: "Setthi begins by helping people understand money. Next, it helps them weigh choices and plan within their budget. For businesses, that becomes a privacy-first way to reach interested buyers across categories.",
    badge: "11 / 11",
    highlight: "setthi.in  ·  WEB VALIDATED  ·  MOBILE NEXT",
    bullets: [
      "Understand: Transform cryptic statements into plain English conversational answers.",
      "Plan: Weigh financial choices, trips, entertainment, and lifestyle within actual budgets.",
      "Distribution: A privacy-preserving bridge connecting consumers with relevant businesses.",
      "Join us in building the financial companion for India's digital generation."
    ],
    metrics: [
      { value: "setthi.in", label: "Live Web Companion" },
      { value: "Mobile Next", label: "Production iOS & Android" },
      { value: "Privacy-First", label: "Zero Compromise on User Data" }
    ],
    keyTakeaway: "Spending patterns are the advantage. Distribution is the power."
  }
];

// =====================================================================
// DECK CONFIGURATIONS
// =====================================================================

// Mapped to /plan (The updated 9-slide deck)
export const PLAN_DECK_CONFIG: DeckConfig = {
  id: "plan",
  title: "Setthi — Pitch Deck (9 Slides)",
  subtitle: "Your money. Finally, answers. The personal finance assistant that speaks plain English.",
  badge: "9 Slides • Problem & Solution",
  slideCount: 9,
  pdfUrl: "/decks/Setthi_Problem_Updated_Matched_Slides.pdf",
  keynoteUrl: "/decks/Setthi_Problem_Updated_Matched_Slides.key",
  pptxUrl: "/decks/Setthi_Problem_Updated_Matched_Slides.pptx",
  alternateUrl: "/full-plan",
  alternateLabel: "11-Slide Full Plan →",
  slides: EXACT_9_SLIDES
};

// Mapped to /full-plan (The comprehensive 11-slide deck)
export const FULL_DECK_CONFIG: DeckConfig = {
  id: "full-plan",
  title: "Setthi — Full Pitch Deck (11 Slides)",
  subtitle: "Comprehensive 11-Slide Pitch Deck: Problem, Solution, Market Size, Traction, Fold Comparison & Business Model",
  badge: "11 Slides • Business Simplified",
  slideCount: 11,
  pdfUrl: "/decks/Setthi_Pitch_Deck_11_Slides_Business_Simplified.pdf",
  keynoteUrl: "/decks/Setthi_Pitch_Deck_11_Slides_Business_Simplified.key",
  pptxUrl: "/decks/Setthi_Pitch_Deck_11_Slides_Business_Simplified.pptx",
  alternateUrl: "/plan",
  alternateLabel: "← 9-Slide Plan View",
  slides: EXACT_11_SLIDES
};

// Backward-compatible alias
export const EXACT_DECK_CONFIG = PLAN_DECK_CONFIG;
