import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Vision — Setthi",
  description: "Our Philosophy: Building a Tree of Value",
};

export default function VisionPage() {
  return (
    <main className="min-h-screen bg-[#000000] text-[#EDEDED] flex items-center justify-center p-6 md:p-12">
      <div className="max-w-2xl w-full my-auto space-y-8">
        <Link
          href="/"
          className="inline-flex items-center text-xs text-zinc-400 hover:text-white transition-colors"
        >
          ← Back to Setthi
        </Link>

        <section className="space-y-4 text-sm md:text-base leading-relaxed text-zinc-300">
          <h2 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">
            Our Philosophy: Building a Tree of Value
          </h2>
          <p>Our vision is to build a company that works like a tree.</p>
          <p>
            A tree absorbs carbon dioxide and transforms it into oxygen, something essential for life. Similarly, our products serve as a medium through which we collect data (carbon dioxide), understand it, and transform it into valuable intelligence (oxygen) that helps them survive and grow in the market.
          </p>
          <p className="font-bold text-white">
            Our products are how we create relationships. The intelligence we generate is the value we provide.
          </p>
        </section>

        <section className="space-y-4 text-sm md:text-base leading-relaxed text-zinc-300">
          <h3 className="text-xl font-semibold text-white tracking-tight">
            The Economics Behind Our Vision
          </h3>
          <p>At its core, every economy runs on the exchange of value.</p>
          <p>
            Economics teaches us that when a resource becomes increasingly valuable to society, while remaining scarce and difficult to replace, its economic value and the bargaining power of those who provide it can grow.
          </p>
          <p>Our ambition is to build that resource.</p>
          <p>
            We want to create something that individuals and businesses increasingly depend on, something that becomes more useful as our ecosystem grows, and something that is difficult to replicate because of the intelligence, trust, and relationships we build over time.
          </p>
          <p className="font-bold text-white">
            We don&apos;t want to build just another product. We want to build the foundation that makes many other products, people, and businesses more valuable.
          </p>
        </section>

        <section className="space-y-4 text-sm md:text-base leading-relaxed text-zinc-300">
          <h3 className="text-xl font-semibold text-white tracking-tight">
            Who We Aspire to Be
          </h3>
          <p>
            A tree doesn&apos;t grow by taking oxygen from its surroundings. It grows by producing value for the ecosystem around it.
          </p>
          <p>That is the kind of company we aspire to build.</p>
          <p className="font-bold text-white">
            The more value we create for others, the more valuable we become.
          </p>
        </section>
      </div>
    </main>
  );
}
