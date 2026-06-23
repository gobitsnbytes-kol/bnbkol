"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Instagram, MapPin, ArrowUpRight } from "lucide-react";

const SOCIALS = [
  {
    icon: Github,
    label: "GitHub",
    handle: "@gobitsnbytes-kol",
    href: "https://github.com/gobitsnbytes-kol",
    desc: "Open source projects and code",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    handle: "Bits&Bytes Kolkata",
    href: "https://www.linkedin.com/company/gobitsbytes",
    desc: "Professional updates and news",
  },
  {
    icon: Instagram,
    label: "Instagram",
    handle: "@gobitsnbytes.kolkata",
    href: "https://www.instagram.com/gobitsnbytes.kolkata",
    desc: "Events, behind the scenes, community moments",
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-cream dot-grid pt-32 pb-20 overflow-hidden">
        <div className="shell">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          >
            <span className="eyebrow">
              <span className="w-1.5 h-1.5 rounded-full bg-terracotta" />
              Get in Touch
            </span>
            <h1
              className="font-display text-charcoal mt-6 leading-[0.92] tracking-[-0.02em]"
              style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)" }}
            >
              SAY<br />
              <span className="text-terracotta">HELLO.</span>
            </h1>
            <p className="text-stone text-xl mt-6 max-w-lg leading-relaxed">
              We&apos;re a small, focused team. Reach out directly and we&apos;ll get back to you.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="tram" />

      {/* Email */}
      <section className="shell py-20 sm:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Email CTA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
          >
            <span className="eyebrow">
              <span className="w-1.5 h-1.5 rounded-full bg-terracotta" />
              Email
            </span>
            <h2
              className="font-display text-charcoal mt-5 leading-[0.93]"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              Drop us a line
            </h2>
            <p className="text-stone mt-4 leading-relaxed">
              For partnerships, sponsorships, collaboration ideas, or just to say hi —
              our inbox is open.
            </p>

            <a
              href="mailto:kolkata@gobitsnbytes.org"
              className="mt-8 group inline-flex items-center gap-4 rounded-[var(--radius-card)] border border-charcoal/8 bg-white px-8 py-6 hover:border-terracotta/30 hover:shadow-[0_8px_32px_rgba(197,49,46,0.08)] transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-terracotta/8 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-terracotta" />
              </div>
              <div>
                <p className="text-[0.62rem] font-mono font-bold uppercase tracking-[0.25em] text-stone/50">Email us at</p>
                <p className="text-charcoal font-semibold group-hover:text-terracotta transition-colors mt-0.5">
                  kolkata@gobitsnbytes.org
                </p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-stone/30 group-hover:text-terracotta transition-colors ml-auto" />
            </a>

            <div className="mt-8 flex items-center gap-2 text-stone/60 text-sm">
              <MapPin className="w-4 h-4 text-terracotta/60 shrink-0" />
              Kolkata, West Bengal, India
            </div>
          </motion.div>

          {/* Socials */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.1 }}
          >
            <span className="eyebrow">
              <span className="w-1.5 h-1.5 rounded-full bg-terracotta" />
              Follow Us
            </span>
            <h2
              className="font-display text-charcoal mt-5 leading-[0.93]"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              Find us online
            </h2>
            <p className="text-stone mt-4 leading-relaxed">
              Stay up to date with events, projects, and community highlights.
            </p>

            <div className="mt-8 space-y-4">
              {SOCIALS.map((s, i) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="group flex items-center gap-5 rounded-[var(--radius-card)] border border-charcoal/8 bg-white px-6 py-5 hover:border-terracotta/30 hover:shadow-[0_4px_24px_rgba(197,49,46,0.07)] transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-charcoal/5 flex items-center justify-center shrink-0 group-hover:bg-terracotta/8 transition-colors">
                    <s.icon className="w-5 h-5 text-charcoal/50 group-hover:text-terracotta transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-charcoal text-sm">{s.label}</p>
                      <span className="text-xs text-stone/50 font-mono">{s.handle}</span>
                    </div>
                    <p className="text-stone/60 text-xs mt-0.5">{s.desc}</p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-stone/25 group-hover:text-terracotta transition-colors shrink-0" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Dark strip */}
      <div className="tram" />
      <section className="bg-charcoal">
        <div className="tram" />
        <div className="shell py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-display text-white" style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}>
              Want to collaborate on an event?
            </p>
            <p className="text-stone mt-3 text-sm">
              We&apos;re always open to partnerships, sponsorships, and co-organization.
            </p>
            <a
              href="mailto:kolkata@gobitsnbytes.org"
              className="mt-6 inline-flex items-center gap-2 bg-terracotta text-white font-bold text-sm px-7 py-3.5 rounded-full hover:bg-terracotta-deep transition-colors"
            >
              Partner with us <ArrowUpRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
        <div className="tram" />
      </section>
    </>
  );
}
