"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };

function FadeIn({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  return (
    <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"} className={className}>
      {children}
    </motion.div>
  );
}

const VALUES = [
  {
    num: "01",
    title: "Be Warm\n& Welcoming",
    body: "Make people feel at home. New members shouldn't feel like they walked into the wrong classroom.",
    bg: "bg-cream",
  },
  {
    num: "02",
    title: "Be Patient\n& Chill",
    body: "Everyone learns differently. Everyone speaks differently. Take a breath before replying.",
    bg: "bg-[#F5EFE2]",
  },
  {
    num: "03",
    title: "Respect is\nNon-Negotiable",
    body: "We'll disagree sometimes, and that's fine. Just don't make it personal. The goal isn't to \"win\" — it's to learn.",
    bg: "bg-cream",
  },
  {
    num: "04",
    title: "Build\nTogether",
    body: "Instead of \"this sucks,\" try \"here's how we can make this cooler.\" No unnecessary sniping or derailing.",
    bg: "bg-[#F5EFE2]",
  },
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
  { n: "01", title: "First Strike",  body: "Formal warning. May include an apology request.", bar: "bg-yellow-400", label: "text-yellow-700" },
  { n: "02", title: "Second Strike", body: "Temporary ban from events and community spaces.",  bar: "bg-orange-400", label: "text-orange-700" },
  { n: "03", title: "Third Strike",  body: "Permanent removal from Bits&Bytes Kolkata.",        bar: "bg-red-500",    label: "text-red-700"    },
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
      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="relative bg-charcoal overflow-hidden pt-36 pb-28">
        <span
          className="absolute right-[-0.05em] bottom-[-0.12em] font-display text-white/[0.03] leading-none select-none pointer-events-none"
          style={{ fontSize: "clamp(10rem, 30vw, 26rem)" }}
          aria-hidden
        >
          CoC
        </span>

        <div className="shell relative">
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: EASE }}
          >
            <p className="text-[0.56rem] font-mono font-bold tracking-[0.44em] uppercase text-white/28 mb-7">
              Community Guidelines
            </p>
            <h1
              className="font-display text-white leading-[0.88] tracking-[-0.02em]"
              style={{ fontSize: "clamp(3.5rem, 9vw, 8rem)" }}
            >
              CODE OF<br />
              <span className="text-terracotta">CONDUCT.</span>
            </h1>
            <div className="mt-10 inline-flex items-center gap-3 bg-white/7 border border-white/12 text-white/60 font-mono text-xs font-bold px-5 py-3 rounded-full tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-terracotta shrink-0" />
              TL;DR — Be nice. Be cool. Don&apos;t cause chaos.
            </div>
          </motion.div>
        </div>
      </section>

      <div className="flex flex-col gap-[5px]">
        <div className="h-[2.5px] bg-terracotta/60 w-full" />
        <div className="h-px bg-terracotta/20 w-full" />
      </div>

      {/* ── Promise — editorial pull quote ─────────────────────────────── */}
      <section className="bg-cream py-20 sm:py-28">
        <div className="shell">
          <FadeIn>
            <motion.div variants={fadeUp}>
              <p className="text-[0.56rem] font-mono font-bold tracking-[0.44em] uppercase text-stone/45 mb-7">
                Our Promise
              </p>
              <p
                className="font-display text-charcoal leading-[0.92] max-w-4xl"
                style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
              >
                We want this place to feel{" "}
                <span className="text-terracotta">friendly, safe,<br />and welcoming</span>{" "}
                for everyone —<br className="hidden sm:block" />no matter who they are or where they come from.
              </p>
            </motion.div>
          </FadeIn>
        </div>
      </section>

      {/* ── Values — 2×2 editorial grid (like Story section) ──────────── */}
      <section>
        <div className="flex flex-col gap-[3px]">
          <div className="h-px bg-charcoal/18 w-full" />
          <div className="h-px bg-charcoal/8 w-full" />
        </div>

        <FadeIn>
          <div className="shell py-10 sm:py-14">
            <motion.div variants={fadeUp}>
              <p className="text-[0.56rem] font-mono font-bold tracking-[0.44em] uppercase text-stone/45 mb-3">
                Values
              </p>
              <h2
                className="font-display text-charcoal leading-[0.9]"
                style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
              >
                THE ENERGY<br />WE EXPECT.
              </h2>
            </motion.div>
          </div>

          <div className="grid sm:grid-cols-2 gap-px bg-charcoal/10">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.num}
                variants={fadeUp}
                transition={{ delay: i * 0.07 }}
                className={`relative overflow-hidden p-10 sm:p-14 ${v.bg}`}
              >
                <span
                  className="absolute right-4 top-2 font-display leading-none text-charcoal/5 select-none pointer-events-none"
                  style={{ fontSize: "clamp(5rem, 12vw, 9rem)" }}
                  aria-hidden
                >
                  {v.num}
                </span>
                <div className="relative">
                  <p className="font-mono text-[0.5rem] font-bold uppercase tracking-[0.32em] text-tram mb-5">
                    Rule {v.num}
                  </p>
                  <h3
                    className="font-display text-charcoal leading-[0.9] mb-5 whitespace-pre-line"
                    style={{ fontSize: "clamp(1.6rem, 2.8vw, 2.25rem)" }}
                  >
                    {v.title}
                  </h3>
                  <p className="text-stone text-sm leading-relaxed max-w-sm">{v.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </FadeIn>

        <div className="flex flex-col gap-[3px]">
          <div className="h-px bg-charcoal/18 w-full" />
          <div className="h-px bg-charcoal/8 w-full" />
        </div>
      </section>

      {/* ── Not Allowed — dark full-width ──────────────────────────────── */}
      <section className="bg-charcoal py-20 sm:py-28 overflow-hidden relative">
        <span
          className="absolute left-[-0.08em] top-[-0.08em] font-display text-white/[0.025] leading-none select-none pointer-events-none"
          style={{ fontSize: "clamp(10rem, 28vw, 22rem)" }}
          aria-hidden
        >
          ✕
        </span>

        <div className="shell relative">
          <FadeIn>
            <motion.div variants={fadeUp} className="mb-12">
              <p className="text-[0.56rem] font-mono font-bold tracking-[0.44em] uppercase text-white/25 mb-3">
                Boundaries
              </p>
              <h2
                className="font-display text-white leading-[0.9]"
                style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
              >
                THINGS WE<br />
                <span className="text-terracotta">DON&apos;T ALLOW.</span>
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-x-16 max-w-3xl">
              {NOT_ALLOWED.map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-start gap-4 py-4 border-b border-white/8"
                >
                  <span className="font-mono text-terracotta font-bold text-xs shrink-0 mt-0.5 tracking-widest">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-white/70 text-sm leading-relaxed">{item}</span>
                </motion.div>
              ))}
            </div>

            <motion.div variants={fadeUp} className="mt-10 inline-flex items-center gap-3 border border-red-500/30 bg-red-500/8 text-red-400 font-mono text-xs font-bold px-5 py-3 rounded-full tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
              Zero Tolerance — serious violations skip straight to removal
            </motion.div>
          </FadeIn>
        </div>
      </section>

      <div className="flex flex-col gap-[5px]">
        <div className="h-[2.5px] bg-terracotta/60 w-full" />
        <div className="h-px bg-terracotta/20 w-full" />
      </div>

      {/* ── Strikes — three cards with colored top bars ─────────────────── */}
      <section className="bg-cream py-20 sm:py-28">
        <div className="shell">
          <FadeIn>
            <motion.div variants={fadeUp} className="mb-12">
              <p className="text-[0.56rem] font-mono font-bold tracking-[0.44em] uppercase text-stone/45 mb-3">
                Accountability
              </p>
              <h2
                className="font-display text-charcoal leading-[0.9]"
                style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
              >
                WHAT HAPPENS<br />IF YOU BREAK IT.
              </h2>
              <p className="text-stone text-sm mt-4">A simple three-strike system. Fair and consistent.</p>
            </motion.div>

            <div className="grid sm:grid-cols-3 gap-4 max-w-3xl">
              {STRIKES.map((s, i) => (
                <motion.div
                  key={s.n}
                  variants={fadeUp}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-2xl bg-white border border-charcoal/8 overflow-hidden"
                >
                  <div className={`h-1.5 w-full ${s.bar}`} />
                  <div className="p-7">
                    <p className={`font-display text-6xl leading-none mb-5 ${s.label}`}>{s.n}</p>
                    <h3 className={`font-bold text-sm mb-2 ${s.label}`}>{s.title}</h3>
                    <p className="text-stone text-sm leading-relaxed">{s.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div variants={fadeUp} className="mt-5 max-w-3xl rounded-xl border border-charcoal/8 bg-white/70 p-5">
              <p className="text-stone text-xs leading-relaxed">
                <strong className="text-charcoal">Important: </strong>
                For serious violations, the team may take immediate action without going through strikes.
                Bits&Bytes Kolkata staff has sole discretion. Decisions are made to protect the community.
              </p>
            </motion.div>
          </FadeIn>
        </div>
      </section>

      {/* ── Where it applies ───────────────────────────────────────────── */}
      <section className="bg-cream-dim">
        <div className="flex flex-col gap-[3px]">
          <div className="h-px bg-charcoal/14 w-full" />
          <div className="h-px bg-charcoal/6 w-full" />
        </div>
        <div className="shell py-16 sm:py-20">
          <FadeIn>
            <motion.div variants={fadeUp} className="mb-8">
              <p className="text-[0.56rem] font-mono font-bold tracking-[0.44em] uppercase text-stone/45 mb-3">
                Scope
              </p>
              <h2
                className="font-display text-charcoal leading-[0.9]"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)" }}
              >
                WHERE THIS APPLIES.
              </h2>
              <p className="text-stone text-sm mt-3">If it has our name on it, this code covers it.</p>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-3 max-w-2xl">
              {APPLIES_TO.map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  transition={{ delay: i * 0.07 }}
                  className="flex items-start gap-3 rounded-xl border border-charcoal/8 bg-white p-5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-tram shrink-0 mt-1.5" />
                  <span className="text-charcoal/75 text-sm leading-relaxed">{item}</span>
                </motion.div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Reporting ──────────────────────────────────────────────────── */}
      <section className="bg-charcoal">
        <div className="flex flex-col gap-[5px]">
          <div className="h-[2.5px] bg-terracotta/60 w-full" />
          <div className="h-px bg-terracotta/20 w-full" />
        </div>
        <div className="shell py-20 sm:py-28">
          <FadeIn>
            <motion.div variants={fadeUp} className="mb-10">
              <p className="text-[0.56rem] font-mono font-bold tracking-[0.44em] uppercase text-white/25 mb-3">
                Speak Up
              </p>
              <h2
                className="font-display text-white leading-[0.9]"
                style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
              >
                SOMETHING WRONG?<br />
                <span className="text-terracotta">TELL US.</span>
              </h2>
              <p className="text-stone/55 text-sm mt-4 max-w-sm leading-relaxed">
                Don&apos;t ignore it. Your report stays 100% confidential. We&apos;ll handle it calmly and fairly.
              </p>
            </motion.div>

            <motion.div variants={fadeUp}>
              <a
                href="mailto:kolkata@gobitsnbytes.org"
                className="group inline-flex items-center gap-5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/9 hover:border-terracotta/30 transition-all duration-300 px-8 py-6"
              >
                <div className="w-12 h-12 rounded-xl bg-terracotta/18 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-terracotta" />
                </div>
                <div>
                  <p className="text-white/32 text-[0.6rem] font-mono uppercase tracking-[0.25em] mb-0.5">Email us at</p>
                  <p className="text-white font-semibold group-hover:text-terracotta transition-colors">
                    kolkata@gobitsnbytes.org
                  </p>
                </div>
              </a>
              <p className="text-white/28 text-xs mt-5 font-mono">
                Or reach out to any team member directly — we&apos;re all accessible.
              </p>
            </motion.div>
          </FadeIn>
        </div>
        <div className="flex flex-col gap-[5px]">
          <div className="h-[2.5px] bg-terracotta/60 w-full" />
          <div className="h-px bg-terracotta/20 w-full" />
        </div>
      </section>

      {/* ── Final CTA ──────────────────────────────────────────────────── */}
      <section className="bg-cream py-24 sm:py-32">
        <div className="shell text-center">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <p
              className="font-display text-charcoal leading-[0.9] max-w-3xl mx-auto"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
            >
              Bits&Bytes Kolkata exists to be a positive, creative, exciting space.{" "}
              <span className="text-terracotta">Help us keep it that way.</span>
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/join"
                className="inline-flex items-center gap-2 bg-terracotta text-white font-bold text-sm px-8 py-4 rounded-full hover:bg-[#A02320] transition-colors"
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
        </div>
      </section>
    </>
  );
}
