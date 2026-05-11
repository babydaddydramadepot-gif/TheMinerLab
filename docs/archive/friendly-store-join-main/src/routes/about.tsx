import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, Cpu, Truck, Boxes } from "lucide-react";
import aboutImg from "@/assets/about-rack.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — The Miner Lab" },
      { name: "description", content: "USA-based mining hardware operation supplying tested ASIC miners and infrastructure to serious operators and wholesale buyers." },
      { property: "og:title", content: "About — The Miner Lab" },
      { property: "og:description", content: "Quality-tested mining hardware. USA-based operations. Built for operators." },
      { property: "og:image", content: aboutImg },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="px-6 lg:px-10 pt-12 pb-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="font-mono text-xs tracking-widest uppercase text-primary">About</p>
            <h1 className="mt-3 font-display text-4xl sm:text-5xl font-semibold leading-tight">
              Mining hardware,<br /><span className="text-gradient">engineered to deploy.</span>
            </h1>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              The Miner Lab is a USA-based mining hardware operation supplying tested, tuned and verified ASIC miners to serious operators. We sit between the manufacturer and your facility — benchmarking, flashing and quality-controlling every unit before it leaves the warehouse.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              From single-rig hobbyists to multi-megawatt farm builds, we ship hardware that works on day one.
            </p>
          </div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border">
            <img src={aboutImg} alt="ASIC miner close-up" loading="lazy" className="h-full w-full object-cover" width={1600} height={1200} />
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
          </div>
        </div>

        <div className="mt-24 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: ShieldCheck, k: "100%", v: "Hardware tested" },
            { icon: Cpu, k: "1.2K+", v: "Miners deployed" },
            { icon: Truck, k: "USA", v: "Domestic shipping" },
            { icon: Boxes, k: "Pallets", v: "Wholesale stock" },
          ].map((s) => (
            <div key={s.v} className="rounded-xl border border-border bg-surface p-6">
              <s.icon className="h-5 w-5 text-primary" />
              <p className="mt-4 font-display text-3xl font-semibold">{s.k}</p>
              <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{s.v}</p>
            </div>
          ))}
        </div>

        <div className="mt-24 grid lg:grid-cols-2 gap-6">
          {[
            { t: "Quality-tested hardware", d: "Every unit benchmarked, thermal-soaked and serial-logged before fulfillment." },
            { t: "Serious infrastructure", d: "Wholesale-grade inventory, freight scheduling and operator-tier pricing." },
            { t: "Helping miners scale", d: "Pallet quantities of S19 Pro, XP, j Pro and S17 Pro available for facility builds." },
            { t: "USA-based operations", d: "Domestic warehousing, insured freight, direct engineer support." },
          ].map((b) => (
            <div key={b.t} className="rounded-xl border border-border bg-surface p-7">
              <h3 className="font-display text-lg font-semibold">{b.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{b.d}</p>
            </div>
          ))}
        </div>

        <div className="mt-24 text-center rounded-2xl border border-border bg-surface/60 px-8 py-16">
          <h2 className="font-display text-3xl font-semibold">Ready to scale?</h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">Talk to our team about pallet quantities, custom firmware profiles or facility builds.</p>
          <div className="mt-6 flex justify-center gap-3 flex-wrap">
            <Link to="/wholesale" className="px-6 py-3.5 rounded-md bg-primary text-primary-foreground text-sm font-semibold uppercase tracking-wider hover:opacity-90 glow-border">
              Wholesale
            </Link>
            <Link to="/contact" className="px-6 py-3.5 rounded-md border border-border bg-surface-elevated text-sm font-semibold uppercase tracking-wider hover:border-primary/50">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
