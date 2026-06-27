import Link from "next/link";
import Image from "next/image";
import { Github, Linkedin, Instagram, Mail, ArrowUpRight } from "lucide-react";

const NAV = [
  { href: "/about",   label: "About"           },
  { href: "/events",  label: "Events"          },
  { href: "/join",    label: "Join"            },
  { href: "/contact", label: "Contact"         },
];

const COC_URL = "https://gobitsnbytes.org/coc";

const SOCIALS = [
  { href: "https://github.com/gobitsnbytes-kol",            label: "GitHub",    icon: Github    },
  { href: "https://www.linkedin.com/company/gobitsbytes",   label: "LinkedIn",  icon: Linkedin  },
  { href: "https://www.instagram.com/gobitsnbytes.kolkata", label: "Instagram", icon: Instagram },
];

export function Footer() {
  return (
    <footer className="bg-ink text-white/70">
      {/* Tram rails */}
      <div className="h-[2.5px] bg-terracotta/65 w-full" />
      <div className="h-px bg-terracotta/22 w-full mt-[5px]" />

      {/* Big brand name */}
      <div className="shell pt-14 pb-10 border-b border-white/6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <p
            className="font-display text-white leading-[0.85]"
            style={{ fontSize: "clamp(3rem, 10vw, 8.5rem)" }}
          >
            Bits<span className="text-terracotta">&</span>Bytes<br />
            <span className="text-white/38">Kolkata.</span>
          </p>
          <div className="flex flex-col items-start sm:items-end gap-3 sm:pb-2">
            <div className="relative w-[clamp(120px,18vw,220px)] opacity-[0.22] select-none pointer-events-none">
              <Image
                src="/taxi.png"
                alt="Kolkata yellow taxi"
                width={440}
                height={200}
                className="w-full h-auto"
                style={{ mixBlendMode: "screen" }}
              />
            </div>
            <p className="text-stone/40 text-[0.58rem] font-mono uppercase tracking-[0.32em] sm:text-right leading-relaxed">
              City of Joy.<br />City of Builders.
            </p>
          </div>
        </div>
      </div>

      {/* Links + contact */}
      <div className="shell py-10 grid grid-cols-2 sm:grid-cols-3 gap-10">
        <nav className="space-y-3" aria-label="Footer navigation">
          <p className="text-[0.55rem] font-mono font-bold uppercase tracking-[0.38em] text-stone/38 mb-5">
            Navigate
          </p>
          {NAV.map((link) => (
            <div key={link.href}>
              <Link
                href={link.href}
                className="text-sm text-white/48 hover:text-white transition-colors duration-200"
              >
                {link.label}
              </Link>
            </div>
          ))}
          <div>
            <a
              href={COC_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-white/48 hover:text-white transition-colors duration-200"
            >
              Code of Conduct <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </nav>

        <div className="space-y-3">
          <p className="text-[0.55rem] font-mono font-bold uppercase tracking-[0.38em] text-stone/38 mb-5">
            Get in touch
          </p>
          <a
            href="mailto:kolkata@gobitsnbytes.org"
            className="flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors duration-200"
          >
            <Mail className="w-3.5 h-3.5 text-terracotta shrink-0" />
            kolkata@gobitsnbytes.org
          </a>
          <div className="flex items-center gap-2 pt-2">
            {SOCIALS.map(({ href, label, icon: Icon }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-8 h-8 rounded-md bg-white/5 border border-white/8 flex items-center justify-center text-white/38 hover:text-white hover:bg-white/10 transition-all duration-200"
              >
                <Icon className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>
        </div>

        <div className="col-span-2 sm:col-span-1 sm:flex sm:flex-col sm:justify-end sm:items-end">
          <p className="text-[0.52rem] font-mono uppercase tracking-[0.2em] text-stone/22 leading-relaxed">
            A fork of the<br />Bits&amp;Bytes organization
          </p>
        </div>
      </div>

      {/* Org clarification */}
      <div className="shell pb-8">
        <div className="rounded-xl border border-white/6 bg-white/[0.02] px-6 py-5 max-w-3xl">
          <p className="text-[0.52rem] font-mono font-bold uppercase tracking-[0.3em] text-stone/32 mb-2">
            Organization
          </p>
          <p className="text-white/40 text-xs leading-relaxed">
            <span className="text-white/65 font-semibold">bits&amp;bytes™</span> is a
            national network of students and builders. It is operated by{" "}
            <a
              href="https://gobitsnbytes.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/55 hover:text-terracotta underline decoration-white/15 underline-offset-2 transition-colors"
            >
              GOBITSNBYTES FOUNDATION
            </a>
            , a Section 8 non-profit company registered in India that serves as the
            parent organization supporting this network. Bits&amp;Bytes Kolkata is a
            recognized fork of the bits&amp;bytes™ network.
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="shell py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-stone/32 font-mono">
            © 2026 GOBITSNBYTES FOUNDATION · All rights reserved · gobitsnbytes.org
          </p>
          <div className="flex items-center gap-5">
            <a
              href={COC_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-stone/28 hover:text-stone/60 transition-colors inline-flex items-center gap-1"
            >
              Code of Conduct <ArrowUpRight className="w-3 h-3" />
            </a>
            <a
              href="https://github.com/gobitsnbytes-kol"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-stone/28 hover:text-stone/60 transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
