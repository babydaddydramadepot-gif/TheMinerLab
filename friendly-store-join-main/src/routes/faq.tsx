import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — The Miner Lab" },
      { name: "description", content: "Mining basics, ASIC setup, firmware, shipping, warranty, power requirements, wholesale and tuning options." },
      { property: "og:title", content: "FAQ — The Miner Lab" },
      { property: "og:description", content: "Answers from the warehouse: setup, firmware, freight, warranty and wholesale." },
    ],
  }),
  component: FaqPage,
});

const SECTIONS: { title: string; items: { q: string; a: string }[] }[] = [
  {
    title: "Mining basics",
    items: [
      { q: "What is an ASIC miner?", a: "An Application-Specific Integrated Circuit purpose-built to compute mining algorithms (typically SHA-256 for Bitcoin) at maximum efficiency vs general hardware." },
      { q: "Can beginners mine Bitcoin?", a: "Yes — but profitability depends heavily on power costs. We recommend talking to our team about expected hashrate, electricity rates and break-even." },
    ],
  },
  {
    title: "ASIC setup",
    items: [
      { q: "How do I deploy a miner?", a: "Connect to APW12 PSU, plug into ethernet, find IP via your router, log in to the web UI and configure your pool." },
      { q: "What temperature range is safe?", a: "Intake under 30°C and chip temps under 75°C is ideal. Hotter environments require additional ventilation or immersion." },
    ],
  },
  {
    title: "Firmware & tuning",
    items: [
      { q: "What firmware options are available?", a: "Stock Antminer firmware ships by default. Braiins OS+ and Vnish are supported with pre-loaded tuned profiles on request." },
      { q: "Are tuned hashrates verified?", a: "Yes — every tuned unit is benchmarked at the target profile before fulfillment." },
    ],
  },
  {
    title: "Shipping & warranty",
    items: [
      { q: "Where do you ship?", a: "Insured domestic freight from US warehouses by default. International freight is available for wholesale orders." },
      { q: "How long is shipping?", a: "Typically 2–5 business days domestic. Pallet shipments scheduled separately." },
      { q: "What warranty is included?", a: "30-day functional warranty on every unit. Wholesale orders may include extended terms — discuss with sales." },
    ],
  },
  {
    title: "Power & infrastructure",
    items: [
      { q: "What power supplies are needed?", a: "APW12 PSU is recommended for S19 Pro / XP / j Pro. We carry official units and cables." },
      { q: "What voltage is required?", a: "208–240V is recommended for stable operation and full PSU efficiency." },
    ],
  },
  {
    title: "Wholesale orders",
    items: [
      { q: "Do you offer bulk pricing?", a: "Yes — pallet quantities of S19 Pro, XP, j Pro and S17 Pro available with operator-tier pricing." },
      { q: "What's the minimum wholesale order?", a: "Typically one pallet (~30–60 units depending on model). Smaller bulk orders considered case-by-case." },
    ],
  },
];

function FaqPage() {
  return (
    <div className="px-6 lg:px-10 pt-12 pb-24">
      <div className="mx-auto max-w-4xl">
        <p className="font-mono text-xs tracking-widest uppercase text-primary">Knowledge base</p>
        <h1 className="mt-3 font-display text-4xl sm:text-5xl font-semibold">Frequently asked questions</h1>
        <p className="mt-3 text-muted-foreground">Answers from the warehouse.</p>

        <div className="mt-12 space-y-12">
          {SECTIONS.map((s) => (
            <div key={s.title}>
              <h2 className="font-display text-xl font-semibold mb-4">{s.title}</h2>
              <div className="space-y-3">
                {s.items.map((it) => (
                  <details key={it.q} className="group rounded-xl border border-border bg-surface px-6 py-5 open:bg-surface-elevated">
                    <summary className="cursor-pointer list-none flex items-center justify-between gap-4 font-display font-semibold">
                      {it.q}
                      <span className="text-primary transition group-open:rotate-45">+</span>
                    </summary>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{it.a}</p>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-2xl border border-border bg-surface/60 p-8 text-center">
          <h3 className="font-display text-xl font-semibold">Didn't find your answer?</h3>
          <p className="mt-2 text-sm text-muted-foreground">Talk directly to our engineers.</p>
          <Link to="/contact" className="inline-flex mt-5 items-center px-6 py-3 rounded-md bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-wider hover:opacity-90">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
