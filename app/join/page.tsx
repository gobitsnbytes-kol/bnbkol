"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const JOIN_COMMUNITY = "https://gusty-servant-a11.notion.site/357d1148777a8007af72ee9b4a54546a?pvs=105";
const JOIN_TEAM      = "https://gusty-servant-a11.notion.site/352d1148777a808ebd28f77a7875a0e6?pvs=105";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

function FadeIn({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  return (
    <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"} className={className}>
      {children}
    </motion.div>
  );
}

const COMMUNITY_PERKS = [
  "Access to every hackathon, build night, and workshop we run",
  "Active Discord with 1500+ builders across India",
  "Peer collaboration and async project feedback",
  "First to know about Bits&Bytes events nationally",
];

const TEAM_PERKS = [
  "Help organize and run Kolkata's flagship tech events",
  "Lead real initiatives — from workshops to hackathons",
  "Work with the founding team on chapter strategy",
  "Build something that outlasts you as a student",
];

const TEAM_EXPECTATIONS = [
  "You're already building something — shipped or actively shipping",
  "You can commit consistently, not just show up once",
  "You take ownership. No hand-holding.",
  "You're based in or can operate in Kolkata",
];

const FAQS = [
  {
    q: "What's the difference between a community member and a working team member?",
    a: "Community members join the Discord, attend events, and collaborate with other builders — no application needed, open to any teen. The working team is the core crew that actually organizes and runs the chapter. That's selective and requires an application.",
  },
  {
    q: "Do I need coding experience to join the community?",
    a: "No. The community is open to any teen interested in tech, at any skill level. Show up, contribute, build things.",
  },
  {
    q: "What does the working team application involve?",
    a: "A short form about what you've built, what role you want to play, and why Kolkata. We review every submission and follow up directly.",
  },
  {
    q: "Is there a cost?",
    a: "Nothing. Both tracks are free.",
  },
  {
    q: "I'm not based in Kolkata. Can I still join?",
    a: "Community — yes, fully. Working team — we need people who can be present on the ground in Kolkata for events.",
  },
];

export default function JoinPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-terracotta overflow-hidden pt-32 pb-20">
        <div className="absolute left-5 sm:left-8 lg:left-12 top-0 bottom-0 flex gap-[4px] pointer-events-none">
          <div className="w-[2px] h-full bg-white/22" />
          <div className="w-[1px] h-full bg-white/10" />
        </div>
        <div className="shell">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <div className="flex items-center gap-2.5 mb-6">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-65" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
              </span>
              <span className="text-[0.58rem] font-mono font-bold tracking-[0.38em] uppercase text-white/50">
                Open Now
              </span>
            </div>
            <h1
              className="font-display text-white leading-[0.88]"
              style={{ fontSize: "clamp(4rem, 10vw, 8.5rem)" }}
            >
              JOIN THE<br />
              <span className="text-charcoal">CREW.</span>
            </h1>
            <p className="text-white/72 text-lg mt-7 max-w-xl leading-relaxed">
              Two ways in. Pick the one that fits where you are right now.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tram divider */}
      <div className="flex flex-col gap-[4px] w-full">
        <div className="h-px w-full bg-charcoal/20" />
        <div className="h-px w-full bg-charcoal/10" />
      </div>

      {/* Two tracks */}
      <section className="shell py-20 sm:py-28">
        <FadeIn>
          <motion.p
            variants={fadeUp}
            className="text-[0.58rem] font-mono font-bold tracking-[0.42em] uppercase text-stone/50 mb-14"
          >
            Choose your path
          </motion.p>

          <div className="grid md:grid-cols-2 gap-5">
            {/* Track 1 — Community */}
            <motion.div
              variants={fadeUp}
              className="rounded-2xl border border-tram/20 bg-white overflow-hidden flex flex-col"
            >
              <div className="bg-tram/8 border-b border-tram/12 px-8 py-7">
                <p className="font-mono text-[0.52rem] font-bold uppercase tracking-[0.3em] text-tram mb-3">
                  Track 01 — Open
                </p>
                <h2
                  className="font-display text-charcoal leading-tight"
                  style={{ fontSize: "clamp(1.8rem, 3.2vw, 2.5rem)" }}
                >
                  Community Member
                </h2>
                <p className="text-stone text-sm mt-3 leading-relaxed">
                  Join the Bits&Bytes Kolkata network. No application, no gatekeeping — just show up and build.
                </p>
              </div>
              <div className="px-8 py-7 flex flex-col flex-1">
                <ul className="space-y-3.5 mb-8 flex-1">
                  {COMMUNITY_PERKS.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-sm text-stone/80 leading-snug">
                      <span className="w-1.5 h-1.5 rounded-full bg-tram mt-1.5 shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
                <a
                  href={JOIN_COMMUNITY}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-tram text-white font-bold text-sm px-7 py-4 rounded-full hover:bg-[#4A87D4] active:scale-[0.98] transition-all duration-200"
                >
                  Join the community <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>

            {/* Track 2 — Working team */}
            <motion.div
              variants={fadeUp}
              transition={{ delay: 0.1 }}
              className="rounded-2xl border border-terracotta/22 bg-white overflow-hidden flex flex-col"
            >
              <div className="bg-terracotta/6 border-b border-terracotta/12 px-8 py-7">
                <p className="font-mono text-[0.52rem] font-bold uppercase tracking-[0.3em] text-terracotta mb-3">
                  Track 02 — Selective
                </p>
                <h2
                  className="font-display text-charcoal leading-tight"
                  style={{ fontSize: "clamp(1.8rem, 3.2vw, 2.5rem)" }}
                >
                  Working Team
                </h2>
                <p className="text-stone text-sm mt-3 leading-relaxed">
                  Help run the chapter. Organize events, lead initiatives, build the org itself. We review every application.
                </p>
              </div>
              <div className="px-8 py-7 flex flex-col flex-1">
                <ul className="space-y-3.5 mb-8 flex-1">
                  {TEAM_PERKS.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-sm text-stone/80 leading-snug">
                      <span className="w-1.5 h-1.5 rounded-full bg-terracotta mt-1.5 shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
                <a
                  href={JOIN_TEAM}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-terracotta text-white font-bold text-sm px-7 py-4 rounded-full hover:bg-terracotta-deep active:scale-[0.98] transition-all duration-200"
                >
                  Apply to the team <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </div>
        </FadeIn>
      </section>

      {/* Tram divider */}
      <div className="flex flex-col gap-[4px] w-full">
        <div className="h-px w-full bg-charcoal/20" />
        <div className="h-px w-full bg-charcoal/10" />
      </div>

      {/* Team expectations */}
      <section className="bg-cream-dim py-20 sm:py-24">
        <div className="shell">
          <FadeIn>
            <motion.div variants={fadeUp} className="mb-10">
              <p className="text-[0.58rem] font-mono font-bold tracking-[0.42em] uppercase text-stone/50 mb-4">
                Working Team Only
              </p>
              <h2
                className="font-display text-charcoal leading-[0.9]"
                style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)" }}
              >
                WHAT WE<br />LOOK FOR.
              </h2>
            </motion.div>

            <div className="max-w-2xl">
              {TEAM_EXPECTATIONS.map((e, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  transition={{ delay: i * 0.07 }}
                  className="flex items-start gap-5 py-5 border-t border-charcoal/8"
                >
                  <span className="font-mono text-[0.6rem] font-bold text-terracotta/60 shrink-0 mt-0.5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-charcoal/80 leading-relaxed text-sm">{e}</span>
                </motion.div>
              ))}
              <div className="border-t border-charcoal/8" />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FAQ */}
      <section className="shell py-24 sm:py-32">
        <FadeIn>
          <motion.div variants={fadeUp} className="mb-14">
            <p className="text-[0.58rem] font-mono font-bold tracking-[0.42em] uppercase text-stone/50 mb-4">
              FAQ
            </p>
            <h2
              className="font-display text-charcoal leading-[0.9]"
              style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)" }}
            >
              COMMON<br />QUESTIONS.
            </h2>
          </motion.div>

          <div className="max-w-3xl">
            {FAQS.map((faq, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                transition={{ delay: i * 0.08 }}
                className="flex items-start gap-6 py-8 border-t border-charcoal/8"
              >
                <span className="font-mono text-[0.58rem] font-bold text-tram/55 shrink-0 mt-1.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3
                    className="font-display text-charcoal leading-tight"
                    style={{ fontSize: "clamp(1.1rem, 2.2vw, 1.5rem)" }}
                  >
                    {faq.q}
                  </h3>
                  <p className="text-stone text-sm mt-3 leading-relaxed">{faq.a}</p>
                </div>
              </motion.div>
            ))}
            <div className="border-t border-charcoal/8" />
          </div>
        </FadeIn>
      </section>

      {/* Final CTA — both paths */}
      <section className="bg-charcoal">
        <div className="h-[2px] bg-white/18 w-full" />
        <div className="shell py-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <p
              className="font-display text-white leading-[0.88] mb-10"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
            >
              Ready to start<br />
              <span className="text-terracotta">building?</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={JOIN_COMMUNITY}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-tram text-white font-bold text-sm px-8 py-4 rounded-full hover:bg-[#4A87D4] transition-colors"
              >
                Join the community <ArrowUpRight className="w-4 h-4" />
              </a>
              <a
                href={JOIN_TEAM}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-white/20 text-white/80 font-bold text-sm px-8 py-4 rounded-full hover:border-white/40 hover:text-white transition-colors"
              >
                Apply to the team <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            <p className="text-white/30 text-xs mt-8">
              Questions?{" "}
              <a href="mailto:kolkata@gobitsnbytes.org" className="underline hover:text-white/55 transition-colors">
                kolkata@gobitsnbytes.org
              </a>
            </p>
          </motion.div>
        </div>
        <div className="h-px bg-white/12 w-full" />
      </section>
    </>
  );
}
