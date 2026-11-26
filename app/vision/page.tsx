import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Vision — Setthi",
  description: "Building a Tree of Value — The philosophy and vision behind Setthi.",
};

export default function VisionPage() {
  return (
    <main className="min-h-screen bg-[#000000] text-[#EDEDED] py-16 md:py-24 px-6 md:px-12 flex justify-center">
      <article className="max-w-2xl w-full space-y-12">
        <Link
          href="/"
          className="inline-flex items-center text-xs text-zinc-400 hover:text-white transition-colors"
        >
          ← Back to Setthi
        </Link>

        {/* Header */}
        <header className="space-y-3 border-b border-white/[0.08] pb-8">
          <p className="text-xs uppercase tracking-widest text-emerald-400 font-medium">
            Our Vision
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold text-white tracking-tight">
            Building a Tree of Value
          </h1>
        </header>

        {/* Section 1 */}
        <section className="space-y-4 text-sm md:text-base leading-relaxed text-zinc-300">
          <h2 className="text-xl md:text-2xl font-semibold text-white tracking-tight">
            How money changed, and how it changed us
          </h2>
          <p>
            For thousands of years, human civilisation has grown through the exchange of value.
          </p>
          <p>
            A farmer could exchange grain for clothes. A fisherman could exchange fish for tools. Through barter, people exchanged what they had for what they needed.
          </p>
          <p>
            But direct exchange had its limitations. Money made it possible to exchange value without having to find someone who needed exactly what you had to offer.
          </p>
          <p>
            Coins, paper currency, banks and eventually credit cards changed how we exchanged value. Each innovation made transactions more convenient and opened new economic possibilities.
          </p>
          <p>Then came the internet and smartphones.</p>
          <p>
            In 2016, India introduced UPI, fundamentally changing how millions of people interact with money.
          </p>
          <p>
            Today, we can buy groceries, order food, pay bills and transfer money within seconds. Something that once required physical effort now requires little more than scanning a QR code.
          </p>
          <p>This is an extraordinary achievement.</p>
          <p>
            But somewhere along the way, something changed in our relationship with money.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-4 text-sm md:text-base leading-relaxed text-zinc-300">
          <h2 className="text-xl md:text-2xl font-semibold text-white tracking-tight">
            Spending became easier. Understanding it didn&apos;t.
          </h2>
          <p>
            When we paid with cash, we could physically see money leaving our hands. Counting the remaining notes gave us an immediate sense of how much we had left.
          </p>
          <p>
            Today, ₹100 here, ₹250 there and another ₹500 somewhere else can disappear from our accounts without us giving it much thought.
          </p>
          <p>
            Individually, these payments may seem insignificant. Together, they shape our financial lives.
          </p>
          <p>
            At the end of the month, many of us find ourselves asking the same question:
          </p>
          <p className="italic text-zinc-200 pl-4 border-l-2 border-emerald-500/40">
            Where did all my money go?
          </p>
          <p>
            Technology has made spending almost effortless, but managing money still requires switching between apps, reading statements, checking balances and remembering upcoming payments.
          </p>
          <p>
            We believe financial understanding deserves the same technological progress that payments have experienced.
          </p>
          <p className="font-bold text-white text-base md:text-lg">
            Managing money should be as simple as spending it.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-4 text-sm md:text-base leading-relaxed text-zinc-300">
          <h2 className="text-xl md:text-2xl font-semibold text-white tracking-tight">
            This is where Setthi begins.
          </h2>
          <p>
            Our first goal is simple: help people understand and manage their money.
          </p>
          <p>
            We want people to be able to ask questions about their finances as naturally as they would ask a friend.
          </p>
          <div className="space-y-2 pl-4 border-l-2 border-emerald-500/40 text-zinc-200 italic">
            <p>Where did I spend the most this month?</p>
            <p>What payments are coming up?</p>
            <p>How much have I spent on food?</p>
          </div>
          <p>
            Managing money should not require financial expertise, complicated spreadsheets or hours of effort.
          </p>
          <p>
            We are not building Setthi to tell people how to live or what they should spend their money on. We are building it to give them a clearer understanding of their financial lives.
          </p>
          <p>
            Because before we can make better decisions with our money, we must first understand it.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-4 text-sm md:text-base leading-relaxed text-zinc-300">
          <h2 className="text-xl md:text-2xl font-semibold text-white tracking-tight">
            From understanding to deciding
          </h2>
          <p>
            Once we make managing money simple, we want to take the next step.
          </p>
          <p>
            Imagine wanting to plan a holiday, buy something new or explore an experience without having to spend hours figuring out what fits your budget.
          </p>
          <p>
            Imagine having technology that understands your financial circumstances, helps you explore your options and allows you to make informed decisions.
          </p>
          <p>
            Not by making decisions for you, but by giving you the understanding needed to make them yourself.
          </p>
          <p>First, help people manage their money.</p>
          <p>Then, help them make better decisions with it.</p>
          <p>
            Eventually, help them discover opportunities that genuinely fit their lives.
          </p>
          <p className="font-bold text-white text-base md:text-lg">
            Each step builds on the one before it.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-4 text-sm md:text-base leading-relaxed text-zinc-300">
          <h2 className="text-xl md:text-2xl font-semibold text-white tracking-tight">
            A better way to exchange value
          </h2>
          <p>
            Just as people look for products and experiences that add value to their lives, businesses look for people who would genuinely benefit from what they offer.
          </p>
          <p>
            But much of today&apos;s advertising is built around capturing attention rather than understanding what people actually need.
          </p>
          <p>We believe there can be a better way.</p>
          <p>
            As we build trusted relationships with people and develop a deeper understanding of their needs, we see an opportunity to make the connection between people and businesses more meaningful.
          </p>
          <p>
            A small business could reach people who genuinely appreciate its products. A travel company could reach people interested in exploring new places.
          </p>
          <p>
            People could find greater value in what they discover, while businesses could find greater value in whom they reach.
          </p>
          <p>
            Our ambition is to make this possible without compromising individual privacy or independence.
          </p>
          <p>
            Businesses would pay for meaningful reach, not access to people&apos;s private financial lives. Commercial interests should never take priority over the interests of the people who trust us.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-4 text-sm md:text-base leading-relaxed text-zinc-300">
          <h2 className="text-xl md:text-2xl font-semibold text-white tracking-tight">
            Building a Tree of Value
          </h2>
          <p>
            We often think about the kind of company we want to become through the example of a tree.
          </p>
          <p>
            A tree grows while contributing something valuable to the ecosystem around it. Its existence supports the existence and growth of others.
          </p>
          <p>
            We want to build a company with a similar relationship to the world.
          </p>
          <p className="font-bold text-white text-base md:text-lg">
            Our products are how we create relationships. Our understanding of people&apos;s needs helps us create value through those relationships.
          </p>
          <p>
            The more useful our products become, the more trust we can earn. The more trust we earn, the better we can understand the needs of those we serve. And the better we understand those needs, the more useful our products can become.
          </p>
          <p>
            Over time, we want this cycle to create an ecosystem where the growth of individuals, businesses and our company reinforces one another.
          </p>
        </section>

        {/* Section 7 */}
        <section className="space-y-4 text-sm md:text-base leading-relaxed text-zinc-300">
          <h2 className="text-xl md:text-2xl font-semibold text-white tracking-tight">
            The economics behind our vision
          </h2>
          <p>
            At its core, every economy still operates on the exchange of value.
          </p>
          <p>
            When something becomes increasingly useful, difficult to replace and important to the growth of others, its economic value can grow.
          </p>
          <p>Our ambition is to build something of that nature.</p>
          <p>
            Not by making people dependent through restrictions, but by becoming genuinely useful to them.
          </p>
          <p>
            Not by controlling their choices, but by helping them make better ones.
          </p>
          <p>
            Not by competing for every opportunity ourselves, but by creating opportunities for others to grow.
          </p>
          <p>Setthi is where we begin, but it is not where our ambition ends.</p>
          <p className="font-bold text-white text-base md:text-lg">
            We want to build the foundation that makes many other products, people and businesses more valuable.
          </p>
        </section>

        {/* Section 8 */}
        <section className="space-y-4 text-sm md:text-base leading-relaxed text-zinc-300 border-t border-white/[0.08] pt-8">
          <h2 className="text-xl md:text-2xl font-semibold text-white tracking-tight">
            Who we aspire to be
          </h2>
          <p>
            We believe the success of a company does not have to come at the expense of those it serves. Instead, its success can become increasingly connected to theirs.
          </p>
          <p>
            We want to build a company that earns its importance through its contribution to the world around it.
          </p>
          <p className="font-bold text-white text-base md:text-lg">
            The more value we create for others, the more valuable we become.
          </p>
          <p>That is our philosophy.</p>
          <p>That is the tree we want to grow.</p>
        </section>

        {/* Bottom Navigation */}
        <div className="pt-8 border-t border-white/[0.08] flex justify-between items-center text-xs text-zinc-400">
          <Link href="/" className="hover:text-white transition-colors">
            ← Return to Home
          </Link>
          <Link href="/plan" className="hover:text-emerald-400 transition-colors">
            View Pitch Deck →
          </Link>
        </div>
      </article>
    </main>
  );
}
