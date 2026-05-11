import { Link } from "@tanstack/react-router";
import { Cpu, Mail, Twitter, Youtube, Send } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-border bg-surface/50">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 grid grid-cols-2 md:grid-cols-5 gap-10">
        <div className="col-span-2">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-surface-elevated border border-border">
              <Cpu className="h-4.5 w-4.5 text-primary" />
            </span>
            <span className="font-display font-semibold">
              THE MINER <span className="text-primary">LAB</span>
            </span>
          </Link>
          <p className="mt-4 text-sm text-muted-foreground max-w-sm leading-relaxed">
            Tested ASIC miners, tuned systems and mining infrastructure built for serious operators. USA-based shipping, quality guaranteed.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-6 flex max-w-sm rounded-md border border-border bg-surface-elevated overflow-hidden focus-within:ring-1 focus-within:ring-primary/60"
          >
            <input
              type="email"
              required
              placeholder="your@email.com"
              className="flex-1 bg-transparent px-3.5 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none"
            />
            <button className="px-4 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition" aria-label="Subscribe">
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>

        <FooterCol title="Shop" links={[
          { to: "/products", label: "All Products" },
          { to: "/products?cat=asic", label: "ASIC Miners" },
          { to: "/products?cat=psu", label: "Power Supplies" },
          { to: "/products?cat=loki", label: "Loki Kits" },
          { to: "/products?cat=accessories", label: "Accessories" },
        ]} />
        <FooterCol title="Company" links={[
          { to: "/about", label: "About" },
          { to: "/wholesale", label: "Wholesale" },
          { to: "/contact", label: "Contact" },
          { to: "/faq", label: "FAQ" },
        ]} />
        <FooterCol title="Contact" links={[]}>
          <a href="mailto:sales@theminerlab.com" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <Mail className="h-4 w-4" />
            <span>sales@theminerlab.com</span>
          </a>
          <div className="flex gap-2 mt-4">
            <SocialIcon><Twitter className="h-4 w-4" /></SocialIcon>
            <SocialIcon><Youtube className="h-4 w-4" /></SocialIcon>
          </div>
        </FooterCol>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} The Miner Lab. All rights reserved.</p>
          <p className="font-mono tracking-wide">USA-BASED · TESTED · TUNED · DEPLOYED</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
  children,
}: {
  title: string;
  links: { to: string; label: string }[];
  children?: React.ReactNode;
}) {
  return (
    <div>
      <h4 className="text-xs font-semibold tracking-widest uppercase text-foreground/90 mb-4">{title}</h4>
      <ul className="space-y-2.5">
        {links.map((l) => (
          <li key={l.label}>
            <Link to={l.to} className="text-sm text-muted-foreground hover:text-foreground">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
      {children}
    </div>
  );
}

function SocialIcon({ children }: { children: React.ReactNode }) {
  return (
    <button className="h-9 w-9 inline-flex items-center justify-center rounded-md border border-border bg-surface-elevated text-muted-foreground hover:text-primary hover:border-primary/50 transition">
      {children}
    </button>
  );
}
