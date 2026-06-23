"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Heart, Users, MessageCircle, Sparkles, AlertTriangle, Mail, Shield, ArrowRight } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

function FadeIn({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.12 });
  return (
    <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"} className={className}>
      {children}
    </motion.div>
  );
}

const VALUES = [
  { icon: Heart, title: "Be Warm & Welcoming", body: "Make people feel at home. New members shouldn't feel like they walked into the wrong classroom." },
  { icon: Users, title: "Be Patient & Chill", body: "Everyone learns differently. Everyone speaks differently. Take a breath before replying." },
  { icon: MessageCircle, title: "Respect is Non-Negotiable", body: "We'll disagree sometimes, and that's fine. Just don't make it personal. The goal isn't to \"win\" — it's to learn." },
  { icon: Sparkles, title: "Build Together", body: "Instead of \"this sucks,\" try \"here's how we can make this cooler.\" No unnecessary sniping or derailing." },
];

const NOT_ALLOWED = [
  "Harassment or discrimination of any kind",
  "Bullying or intentionally isolating someone",
  "Unwanted romantic or sexual advances",
  "Sharing explicit or inappropriate content",
  "Spamming, trolling, or derailing discussions",
  "Misusing club funds or resources",
  "Doxxing or sharing private information",
];

const STRIKES = [
  { n: "01", title: "First Strike", body: "Formal warning. May include an apology request.", color: "text-yellow-600 bg-yellow-50 border-yellow-200" },
  { n: "02", title: "Second Strike", body: "Temporary ban from events and community spaces.", color: "text-orange-600 bg-orange-50 border-orange-200" },
  { n: "03", title: "Third Strike", body: "Permanent removal from Bits&Bytes Kolkata community.", color: "text-red-600 bg-red-50 border-red-200" },
];

const APPLIES_TO = [
  "All offline meetups, workshops, and events",
  "Discord, WhatsApp, and all official online spaces",
  "Any club-affiliated projects or collaborations",
  "Social media interactions under the Bits&Bytes Kolkata name",
];

export default function CoCPage() {
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
              <Shield className="w-3 h-3" />
              Community Guidelines
            </span>
            <h1
              className="font-display text-charcoal mt-6 leading-[0.92] tracking-[-0.02em]"
              style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)" }}
            >
              CODE OF<br />
              <span className="text-terracotta">CONDUCT.</span>
            </h1>
            <div className="mt-6 inline-block bg-charcoal text-cream font-mono text-sm font-bold px-6 py-3 rounded-full">
              TL;DR: Be nice. Be cool. Don&apos;t cause chaos.
            </div>
          </motion.div>
        </div>
      </section>

      <div className="tram" />

      {/* Promise */}
      <section className="shell py-20">
        <FadeIn>
          <motion.div variants={fadeUp} className="max-w-3xl">
            <span className="eyebrow">
              <span className="w-1.5 h-1.5 rounded-full bg-terracotta" />
              Our Promise
            </span>
            <h2 className="font-display text-charcoal mt-5 text-3xl leading-tight">What we stand for</h2>
            <div className="mt-6 rounded-[var(--radius-card)] border border-charcoal/8 bg-white p-8">
              <p className="text-charcoal/80 text-lg leading-relaxed">
                We want this place to feel <strong>friendly, safe, and welcoming</strong> for everyone,
                no matter who they are or where they come from. This document ensures that the vibe stays
                positive and everyone feels secure, respected, and free to create the next big thing.
              </p>
            </div>
          </motion.div>
        </FadeIn>
      </section>

      {/* Values */}
      <section className="bg-cream-dim">
        <div className="tram" />
        <div className="shell py-20 sm:py-28">
          <FadeIn>
            <motion.div variants={fadeUp} className="mb-10">
              <span className="eyebrow">
                <span className="w-1.5 h-1.5 rounded-full bg-terracotta" />
                Values
              </span>
              <h2 className="font-display text-charcoal mt-5 text-3xl leading-tight">The energy we expect</h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-5">
              {VALUES.map((v, i) => (
                <motion.div key={v.title} variants={fadeUp} transition={{ delay: i * 0.08 }}
                  className="rounded-[var(--radius-card)] border border-charcoal/8 bg-white p-7 flex gap-5">
                  <div className="w-11 h-11 rounded-xl bg-terracotta/8 flex items-center justify-center shrink-0">
                    <v.icon className="w-5 h-5 text-terracotta" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl text-charcoal leading-tight">{v.title}</h3>
                    <p className="text-stone text-sm mt-2 leading-relaxed">{v.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </FadeIn>
        </div>
        <div className="tram" />
      </section>

      {/* Where applies */}
      <section className="shell py-20">
        <FadeIn>
          <motion.div variants={fadeUp} className="mb-8">
            <span className="eyebrow">
              <span className="w-1.5 h-1.5 rounded-full bg-terracotta" />
              Scope
            </span>
            <h2 className="font-display text-charcoal mt-5 text-3xl leading-tight">Where this applies</h2>
            <p className="text-stone mt-3">If it has Bits&Bytes Kolkata name on it, this code covers it.</p>
          </motion.div>
          <motion.div variants={fadeUp} className="max-w-2xl rounded-[var(--radius-card)] border border-charcoal/8 bg-white p-8">
            <ul className="space-y-4">
              {APPLIES_TO.map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-terracotta shrink-0 mt-2" />
                  <span className="text-charcoal/80">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </FadeIn>
      </section>

      {/* Not allowed */}
      <section className="bg-cream-dim">
        <div className="tram" />
        <div className="shell py-20">
          <FadeIn>
            <motion.div variants={fadeUp} className="mb-8">
              <span className="eyebrow">
                <span className="w-1.5 h-1.5 rounded-full bg-terracotta" />
                Boundaries
              </span>
              <h2 className="font-display text-charcoal mt-5 text-3xl leading-tight">Things we don&apos;t allow</h2>
            </motion.div>
            <motion.div variants={fadeUp} className="max-w-2xl rounded-[var(--radius-card)] border border-red-200 bg-white p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-full bg-red-50 border border-red-200 flex items-center justify-center">
                  <AlertTriangle className="w-4.5 h-4.5 text-red-500" />
                </div>
                <span className="text-sm font-mono font-bold uppercase tracking-[0.2em] text-red-500">Zero Tolerance</span>
              </div>
              <ul className="space-y-3">
                {NOT_ALLOWED.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-charcoal/80">
                    <span className="text-red-500 font-bold shrink-0 mt-0.5">✕</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </FadeIn>
        </div>
        <div className="tram" />
      </section>

      {/* Strikes */}
      <section className="shell py-20 sm:py-28">
        <FadeIn>
          <motion.div variants={fadeUp} className="mb-10">
            <span className="eyebrow">
              <span className="w-1.5 h-1.5 rounded-full bg-terracotta" />
              Accountability
            </span>
            <h2 className="font-display text-charcoal mt-5 text-3xl leading-tight">
              What happens if you break the rules
            </h2>
            <p className="text-stone mt-2">We follow a simple three-strike system to keep things fair.</p>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-5 max-w-3xl">
            {STRIKES.map((s, i) => (
              <motion.div
                key={s.n}
                variants={fadeUp}
                transition={{ delay: i * 0.1 }}
                className={`rounded-[var(--radius-card)] border p-7 text-center ${s.color}`}
              >
                <p className="font-display text-5xl leading-none mb-4">{s.n}</p>
                <h3 className="font-bold text-base">{s.title}</h3>
                <p className="text-sm mt-2 opacity-80 leading-relaxed">{s.body}</p>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeUp} className="mt-6 max-w-3xl rounded-[var(--radius-card)] border border-charcoal/8 bg-white p-6">
            <p className="text-stone text-sm leading-relaxed">
              <strong className="text-charcoal font-bold">Important: </strong>
              For serious violations, the team may take immediate action without warning.
              Bits&Bytes Kolkata staff has sole discretion in determining violations.
              Decisions are made to maintain a safe, welcoming community.
            </p>
          </motion.div>
        </FadeIn>
      </section>

      {/* Reporting */}
      <div className="tram" />
      <section className="bg-charcoal">
        <div className="tram" />
        <div className="shell py-20">
          <FadeIn>
            <motion.div variants={fadeUp} className="mb-8">
              <span className="eyebrow" style={{ borderColor: "rgba(255,255,255,0.15)", backgroundColor: "rgba(255,255,255,0.06)", color: "rgba(138,129,120,0.8)" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-terracotta" />
                Speak Up
              </span>
              <h2 className="font-display text-white mt-5 text-3xl leading-tight">Reporting problems</h2>
              <p className="text-stone mt-2">If something&apos;s wrong, don&apos;t ignore it. Tell us.</p>
            </motion.div>

            <motion.div variants={fadeUp} className="max-w-lg">
              <div className="rounded-[var(--radius-card)] border border-white/10 bg-white/6 p-8 space-y-6">
                <a
                  href="mailto:kolkata@gobitsnbytes.org"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-terracotta/20 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-terracotta" />
                  </div>
                  <div>
                    <p className="text-stone/60 text-xs font-mono uppercase tracking-[0.2em]">Email us at</p>
                    <p className="text-white font-medium group-hover:text-terracotta transition-colors">kolkata@gobitsnbytes.org</p>
                  </div>
                </a>
                <p className="text-stone/70 text-sm leading-relaxed">
                  Or message any team member privately. Share context or screenshots if possible.
                  Your report stays <strong className="text-stone">100% confidential</strong>.
                  We&apos;ll handle things calmly and fairly.
                </p>
              </div>
            </motion.div>
          </FadeIn>
        </div>
        <div className="tram" />
      </section>

      {/* Final */}
      <section className="shell py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="font-display text-charcoal leading-tight max-w-3xl mx-auto" style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}>
            &ldquo;Bits&Bytes Kolkata exists to be a positive, creative, exciting space.{" "}
            <span className="text-terracotta">Help us keep it that way.</span>&rdquo;
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/join"
              className="inline-flex items-center gap-2 bg-terracotta text-white font-bold text-sm px-8 py-4 rounded-full hover:bg-terracotta-deep transition-colors"
            >
              Join the Community <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border border-charcoal/15 text-charcoal font-semibold text-sm px-8 py-4 rounded-full hover:border-charcoal/30 transition-colors"
            >
              Contact the Team
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  );
}
