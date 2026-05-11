import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Menu, X, Cpu } from "lucide-react";
import { CartDrawer } from "./CartDrawer";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Shop" },
  { to: "/wholesale", label: "Wholesale" },
  { to: "/about", label: "About" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ease-out ${
        scrolled
          ? "backdrop-blur-xl bg-background/70 border-b border-border/60 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.4)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <span className="relative flex h-9 w-9 items-center justify-center rounded-md bg-surface-elevated border border-border transition-all duration-500 group-hover:border-primary/50">
            <Cpu className="h-4.5 w-4.5 text-primary transition-transform duration-500 group-hover:scale-110" />
            <span className="absolute inset-0 rounded-md ring-1 ring-primary/30 group-hover:ring-primary/60 transition-all duration-500" />
          </span>
          <span className="font-display font-semibold tracking-tight text-[15px]">
            THE MINER <span className="text-primary">LAB</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="relative px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 after:content-[''] after:absolute after:left-3 after:right-3 after:bottom-1 after:h-px after:bg-primary after:scale-x-0 after:origin-left after:transition-transform after:duration-500 hover:after:scale-x-100"
              activeProps={{ className: "relative px-3 py-2 text-sm text-foreground after:content-[''] after:absolute after:left-3 after:right-3 after:bottom-1 after:h-px after:bg-primary after:scale-x-100" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/wholesale"
            className="hidden md:inline-flex items-center px-4 py-2 text-xs font-medium tracking-wide uppercase text-primary border border-primary/40 rounded-md hover:bg-primary/10 transition-all duration-500"
          >
            Wholesale
          </Link>
          <CartDrawer />
          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden p-2 rounded-md hover:bg-surface-elevated"
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden glass border-t border-border">
          <nav className="px-6 py-4 flex flex-col gap-1">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="py-2.5 text-sm text-muted-foreground hover:text-foreground"
                activeProps={{ className: "py-2.5 text-sm text-primary" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
