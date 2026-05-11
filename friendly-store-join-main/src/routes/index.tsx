import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, Truck, Settings2, Boxes, MessageSquare, BadgeCheck, Cpu, Zap, Wrench, Package } from "lucide-react";
import heroImg from "@/assets/hero-mining.jpg";
import { ProductGrid } from "@/components/ProductGrid";
import { Reviews } from "@/components/Reviews";
import { Reveal } from "@/components/Reveal";
import { StatCounter } from "@/components/StatCounter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Miner Lab — Premium Crypto Mining Hardware" },
      { name: "description", content: "Tested surplus ASIC miners, farm pull units, power supplies, Loki kits and wholesale mining inventory. Antminer S19 Pro, S19 XP, S19j Pro, S17 Pro." },
      { property: "og:title", content: "The Miner Lab — Premium Crypto Mining Hardware" },
      { property: "og:description", content: "Tested surplus mining hardware. Verified, tuned, ready to deploy. USA-based shipping. Wholesale pricing available." },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: HomePage,
});

const CATEGORIES = [
  { label: "ASIC Miners", icon: Cpu, href: "/products?cat=asic", desc: "S19 Pro · XP · j Pro · S17" },
  { label: "Power Supplies", icon: Zap, href: "/products?cat=psu", desc: "APW12 + cables" },
  { label: "Loki Kits", icon: Wrench, href: "/products?cat=loki", desc: "Tuning hardware" },
  { label: "Accessories", icon: Settings2, href: "/products?cat=accessories", desc: "Fans · boards · cables" },
  { label: "Wholesale", icon: Package, href: "/wholesale", desc: "Pallet quantities" },
];

const REASONS = [
  { icon: BadgeCheck, title: "Verified Surplus Hardware", desc: "Every unit is inspected, tested, and clearly listed so buyers know exactly what they're getting." },
  { icon: ShieldCheck, title: "Tested & Benchmarked", desc: "Hashboards, PSUs, fans and thermals stress-tested and serial-logged before they leave the lab." },
  { icon: Truck, title: "USA-Based Shipping", desc: "Insured domestic freight from US warehouses. International freight on request." },
  { icon: Settings2, title: "Tuned & Ready To Deploy", desc: "Firmware flashed, hashrate verified, profiles ready for your facility." },
  { icon: Boxes, title: "Wholesale Surplus Inventory", desc: "Pallet quantities and farm-pull units of S19 Pro, XP, j Pro and S17 Pro available for operators." },
  { icon: MessageSquare, title: "Direct Engineer Support", desc: "Talk to the people who tested your hardware — not a ticket queue." },
];

const FAQS = [
  { q: "What is an ASIC miner?", a: "Application-Specific Integrated Circuit hardware purpose-built to compute SHA-256 (or other) mining algorithms with maximum efficiency." },
  { q: "Are miners tested before shipping?", a: "Yes — every unit goes through a multi-hour benchmark, thermal soak and hashboard verification." },
  { q: "What firmware options are available?", a: "Stock Antminer firmware, Braiins OS+ and Vnish are supported. Tuned profiles are pre-loaded on request." },
  { q: "Do you offer bulk pricing?", a: "Yes. Pallet quantities of S19 Pro, XP, j Pro and S17 Pro are available with operator-tier pricing." },
];

function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <img
            src={heroImg}
            alt="Premium ASIC miner racks with cinematic cyan illumination"
            className="absolute inset-0 h-full w-full object-cover object-center opacity-70 animate-drift"
            width={1920}
            height={1280}
          />
          {/* dark overlay for legibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
          {/* left fade for headline contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
          {/* top falloff to anchor nav */}
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background to-transparent" />
          {/* architectural grid */}
          <div className="absolute inset-0 grid-bg opacity-30 animate-pulse-soft" />
          {/* breathing cyan glow */}
          <div
            aria-hidden
            className="absolute top-1/3 right-[10%] h-[500px] w-[500px] rounded-full blur-3xl animate-breathe"
            style={{ background: "radial-gradient(closest-side, color-mix(in oklab, var(--glow) 25%, transparent), transparent)" }}
          />
          {/* secondary ambient glow */}
          <div
            aria-hidden
            className="absolute -bottom-20 left-[20%] h-[400px] w-[400px] rounded-full blur-3xl animate-breathe"
            style={{ background: "radial-gradient(closest-side, color-mix(in oklab, var(--glow) 12%, transparent), transparent)", animationDelay: "2s" }}
          />
        </div>

        <div className="mx-auto max-w-7xl px-6 lg:px-10 pt-28 lg:pt-40 pb-32 lg:pb-48">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-mono tracking-wider uppercase text-primary animate-rise" style={{ animationDelay: "0ms" }}>
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              Surplus Inventory · Tested · Ready to Deploy
            </div>
            <h1 className="mt-6 font-display text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[1.05] tracking-tight animate-rise" style={{ animationDelay: "120ms" }}>
              Premium <span className="text-gradient glow-text">Crypto Mining</span><br />Hardware
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed animate-rise" style={{ animationDelay: "260ms" }}>
              Tested surplus ASIC miners, tuned systems, and mining infrastructure built for serious miners.
            </p>
            <div className="mt-9 flex flex-wrap gap-3 animate-rise" style={{ animationDelay: "400ms" }}>
              <Link
                to="/products"
                className="group btn-premium light-sweep inline-flex items-center gap-2 px-6 py-3.5 rounded-md bg-primary text-primary-foreground text-sm font-semibold uppercase tracking-wider"
              >
                Shop Miners <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5" />
              </Link>
              <Link
                to="/wholesale"
                className="btn-premium inline-flex items-center gap-2 px-6 py-3.5 rounded-md border border-border bg-surface-elevated/60 backdrop-blur text-sm font-semibold uppercase tracking-wider hover:border-primary/50"
              >
                Get Wholesale Pricing
              </Link>
            </div>
          </div>
        </div>

        {/* stats strip */}
        <div className="border-y border-border bg-surface/60 backdrop-blur-md">
          <div className="mx-auto max-w-7xl px-6 lg:px-10 py-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              ["1.2K+", "Miners deployed"],
              ["100%", "Tested before ship"],
              ["48hr", "Average freight"],
              ["24/7", "Engineer support"],
            ].map(([k, v], i) => (
              <Reveal key={v} delay={i * 90}>
                <p className="font-display text-2xl font-semibold text-primary">
                  <StatCounter value={k} />
                </p>
                <p className="mt-1 text-[11px] uppercase tracking-widest text-muted-foreground">{v}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <Section
        eyebrow="Catalog"
        title="Built for every operator"
        desc="From single-rig hobbyists to multi-megawatt facilities."
      >
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {CATEGORIES.map((c, i) => (
            <Reveal key={c.label} delay={i * 80}>
              <Link
                to={c.href}
                className="group relative gradient-border rounded-xl bg-surface p-6 block transition-all duration-500 ease-out hover:bg-surface-elevated hover:-translate-y-0.5"
              >
                <c.icon className="h-6 w-6 text-primary transition-transform duration-500 group-hover:scale-110" />
                <h3 className="mt-5 font-display font-semibold">{c.label}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{c.desc}</p>
                <ArrowRight className="absolute top-5 right-5 h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition duration-500" />
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* WHY */}
      <Section
        eyebrow="Why The Miner Lab"
        title="Engineered trust, end to end"
        desc="Six pillars that separate professional infrastructure from grey-market resellers."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {REASONS.map((r, i) => (
            <Reveal key={r.title} delay={i * 80}>
              <div className="group h-full rounded-xl border border-border bg-surface p-7 transition-all duration-500 ease-out hover:border-primary/40 hover:-translate-y-0.5 hover:bg-surface-elevated">
                <div className="h-11 w-11 rounded-md bg-primary/10 border border-primary/30 inline-flex items-center justify-center text-primary transition-all duration-500 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-[0_0_30px_-6px_var(--primary)]">
                  <r.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold">{r.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* FEATURED PRODUCTS */}
      <Section
        eyebrow="Featured"
        title="In-stock miners"
        desc="Tuned, benchmarked and ready to ship."
        action={<Link to="/products" className="text-sm text-primary hover:underline inline-flex items-center gap-1">View all <ArrowRight className="h-3.5 w-3.5" /></Link>}
      >
        <ProductGrid limit={8} />
      </Section>

      {/* TESTIMONIALS — empty state per fake-review policy */}
      <Reviews />

      {/* WHOLESALE CTA */}
      <section className="px-6 lg:px-10 mt-32">
        <div className="mx-auto max-w-7xl relative overflow-hidden rounded-2xl border border-border">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/15 via-surface to-surface" />
          <div className="absolute inset-0 -z-10 grid-bg opacity-30" />
          <div className="px-8 sm:px-14 py-16 lg:py-20 max-w-3xl">
            <p className="font-mono text-xs tracking-widest uppercase text-primary">Wholesale</p>
            <h2 className="mt-3 font-display text-3xl sm:text-5xl font-semibold leading-tight">
              Need pallet quantities or wholesale pricing?
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl">
              Bulk surplus miners, pallet quantities, farm pull units, and wholesale ASIC inventory available by request — every unit tested and serial-logged.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/wholesale" className="btn-premium light-sweep px-6 py-3.5 rounded-md bg-primary text-primary-foreground text-sm font-semibold uppercase tracking-wider">
                Request Wholesale Quote
              </Link>
              <Link to="/contact" className="btn-premium px-6 py-3.5 rounded-md border border-border bg-surface-elevated text-sm font-semibold uppercase tracking-wider hover:border-primary/50">
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ PREVIEW */}
      <Section
        eyebrow="FAQ"
        title="Common questions"
        action={<Link to="/faq" className="text-sm text-primary hover:underline inline-flex items-center gap-1">All FAQs <ArrowRight className="h-3.5 w-3.5" /></Link>}
      >
        <div className="grid md:grid-cols-2 gap-4">
          {FAQS.map((f) => (
            <details key={f.q} className="group rounded-xl border border-border bg-surface p-6 open:bg-surface-elevated">
              <summary className="cursor-pointer list-none flex items-start justify-between gap-4 font-display font-semibold">
                {f.q}
                <span className="text-primary transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </Section>
    </>
  );
}

function Section({
  eyebrow,
  title,
  desc,
  action,
  children,
}: {
  eyebrow?: string;
  title: string;
  desc?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="px-6 lg:px-10 mt-28">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="flex items-end justify-between gap-6 mb-10">
            <div className="max-w-2xl">
              {eyebrow && <p className="font-mono text-xs tracking-widest uppercase text-primary">{eyebrow}</p>}
              <h2 className="mt-2 font-display text-3xl sm:text-4xl font-semibold leading-tight">{title}</h2>
              {desc && <p className="mt-3 text-muted-foreground">{desc}</p>}
            </div>
            {action}
          </div>
        </Reveal>
        {children}
      </div>
    </section>
  );
}
