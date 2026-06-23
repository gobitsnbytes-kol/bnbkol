import Link from "next/link";
import { Github, Linkedin, Instagram, Mail } from "lucide-react";

const NAV = [
  { href: "/about", label: "About" },
  { href: "/events", label: "Events" },
  { href: "/join", label: "Join" },
  { href: "/coc", label: "Code of Conduct" },
  { href: "/contact", label: "Contact" },
];

const SOCIALS = [
  { href: "https://github.com/gobitsnbytes-kol", label: "GitHub", icon: Github },
  { href: "https://www.linkedin.com/company/gobitsbytes", label: "LinkedIn", icon: Linkedin },
  { href: "https://www.instagram.com/gobitsnbytes.kolkata", label: "Instagram", icon: Instagram },
];

export function Footer() {
  return (
    <footer className="bg-charcoal text-white/70">
      {/* Tram lines */}
      <div className="h-px bg-terracotta/50 w-full" />
      <div className="h-px bg-terracotta/25 w-full mt-[5px]" />

      <div className="shell py-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
        {/* Brand */}
        <div className="space-y-4">
          <p className="font-display text-white leading-none" style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)" }}>
            Bits<span className="text-terracotta">&</span>Bytes<br />
            <span className="text-white/50">Kolkata</span>
          </p>
          <p className="text-stone text-sm leading-relaxed max-w-xs">
            Kolkata&apos;s boldest teen-led builders club. We run hackathons, workshops,
            and build sessions — entirely student driven.
          </p>
          <p className="text-stone/60 text-xs font-mono uppercase tracking-[0.2em]">
            City of Joy. City of Builders.
          </p>
        </div>

        {/* Links */}
        <nav className="space-y-3" aria-label="Footer navigation">
          <p className="text-[0.65rem] font-mono font-bold uppercase tracking-[0.3em] text-stone/60 mb-4">
            Navigate
          </p>
          {NAV.map((link) => (
            <div key={link.href}>
              <Link
                href={link.href}
                className="text-sm text-white/60 hover:text-white transition-colors duration-200"
              >
                {link.label}
              </Link>
            </div>
          ))}
        </nav>

        {/* Contact */}
        <div className="space-y-4">
          <p className="text-[0.65rem] font-mono font-bold uppercase tracking-[0.3em] text-stone/60">
            Get in touch
          </p>
          <a
            href="mailto:kolkata@gobitsnbytes.org"
            className="flex items-center gap-2 text-white/80 hover:text-white text-sm transition-colors duration-200 group"
          >
            <Mail className="w-4 h-4 text-terracotta shrink-0" />
            kolkata@gobitsnbytes.org
          </a>

          <div className="flex items-center gap-3 pt-2">
            {SOCIALS.map(({ href, label, icon: Icon }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-full bg-white/6 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/12 hover:border-white/20 transition-all duration-200"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/6">
        <div className="shell py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-stone/50 font-mono">
            © 2026 Bits&Bytes Kolkata · gobitsnbytes.org
          </p>
          <div className="flex items-center gap-4">
            <Link href="/coc" className="text-xs text-stone/40 hover:text-stone/70 transition-colors">
              Code of Conduct
            </Link>
            <a
              href="https://github.com/gobitsnbytes-kol"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-stone/40 hover:text-stone/70 transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
