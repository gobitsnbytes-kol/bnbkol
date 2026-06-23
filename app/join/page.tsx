"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Users, Rocket, Zap, Heart, CheckCircle2 } from "lucide-react";

const JOIN_FORM = "https://gusty-servant-a11.notion.site/352d1148777a808ebd28f77a7875a0e6?pvs=105";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
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

const BENEFITS = [
  { icon: Users, title: "Join a tight-knit crew", body: "Connect with 1500+ ambitious teen builders across India who share your passion for tech." },
  { icon: Rocket, title: "Ship real projects", body: "Work on portfolio-ready projects with mentorship at every stage — from idea to deployment." },
  { icon: Zap, title: "Attend exclusive events", body: "Get priority access to hackathons, workshops, and build nights with industry pros." },
  { icon: Heart, title: "Grow together", body: "Pair programming, code reviews, and study groups help everyone level up faster." },
];

const EXPECTATIONS = [
  "Be a student (ages 13–19) passionate about tech",
  "Commit 2–4 hours per week for activities",
  "Join our Discord and stay active in discussions",
  "Participate in at least one project or event per quarter",
  "Support fellow members and maintain a positive attitude",
];

const FAQS = [
  {
    q: "Do I need coding experience to join?",
    a: "Not at all! We welcome beginners and pair them with experienced mentors. What matters most is your enthusiasm to learn and build.",
  },
  {
    q: "How much time do I need to commit?",
    a: "We recommend 2–4 hours per week, but it's flexible. Some weeks you might attend a workshop, others you might work on a project async.",
  },
  {
    q: "Is there a membership fee?",
    a: "Bits&Bytes Kolkata is completely free to join. We believe tech education should be accessible to all students.",
  },
  {
    q: "I'm not from Kolkata. Can I still join?",
    a: "Absolutely! While we started in Kolkata, we now have members across India. Most activities happen online via Discord.",
  },
];

export default function JoinPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-cream dot-grid pt-32 pb-20 overflow-hidden">
        <div className="shell text-center">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          >
            <span className="eyebrow">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-terracotta opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-terracotta" />
              </span>
              Applications Open
            </span>
            <h1
              className="font-display text-charcoal mt-6 leading-[0.92] tracking-[-0.02em]"
              style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)" }}
            >
              JOIN THE<br />
              <span className="text-terracotta">CREW.</span>
            </h1>
            <p className="text-stone text-xl mt-6 max-w-xl mx-auto leading-relaxed">
              Tell us how you want to build with Bits&Bytes Kolkata. We&apos;ll connect you
              with squads, mentors, and live projects.
            </p>

            {/* Main CTA */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={JOIN_FORM}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-terracotta text-white font-bold text-base px-9 py-5 rounded-full hover:bg-terracotta-deep active:scale-[0.98] transition-all duration-200 shadow-[0_4px_32px_rgba(197,49,46,0.4)]"
              >
                Apply to join <ArrowRight className="w-5 h-5" />
              </a>
              <p className="text-stone/60 text-sm">Takes less than 2 minutes · Free forever</p>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="tram" />

      {/* Benefits */}
      <section className="shell py-24 sm:py-32">
        <FadeIn>
          <motion.div variants={fadeUp} className="mb-12">
            <span className="eyebrow">
              <span className="w-1.5 h-1.5 rounded-full bg-terracotta" />
              Why Join
            </span>
            <h2
              className="font-display text-charcoal mt-5 leading-[0.93] tracking-[-0.02em]"
              style={{ fontSize: "clamp(2.25rem, 4vw, 3rem)" }}
            >
              What you&apos;ll get as a member
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-5">
            {BENEFITS.map((b, i) => (
              <motion.div
                key={b.title}
                variants={fadeUp}
                transition={{ delay: i * 0.08 }}
                className="rounded-[var(--radius-card)] border border-charcoal/8 bg-white p-7 flex gap-5"
              >
                <div className="w-11 h-11 rounded-xl bg-terracotta/8 flex items-center justify-center shrink-0">
                  <b.icon className="w-5 h-5 text-terracotta" />
                </div>
                <div>
                  <h3 className="font-display text-xl text-charcoal leading-tight">{b.title}</h3>
                  <p className="text-stone text-sm mt-2 leading-relaxed">{b.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </FadeIn>
      </section>

      <div className="tram" />

      {/* Expectations */}
      <section className="bg-cream-dim">
        <div className="tram" />
        <div className="shell py-20 sm:py-28">
          <FadeIn>
            <motion.div variants={fadeUp} className="mb-10">
              <span className="eyebrow">
                <span className="w-1.5 h-1.5 rounded-full bg-terracotta" />
                Expectations
              </span>
              <h2
                className="font-display text-charcoal mt-5 leading-[0.93] tracking-[-0.02em]"
                style={{ fontSize: "clamp(2.25rem, 4vw, 3rem)" }}
              >
                What we look for
              </h2>
            </motion.div>

            <div className="max-w-2xl rounded-[var(--radius-card)] border border-charcoal/8 bg-white p-8 sm:p-10">
              <ul className="space-y-5">
                {EXPECTATIONS.map((e, i) => (
                  <motion.li key={i} variants={fadeUp} transition={{ delay: i * 0.07 }} className="flex items-start gap-4">
                    <CheckCircle2 className="w-5 h-5 text-terracotta shrink-0 mt-0.5" />
                    <span className="text-charcoal/80 leading-relaxed">{e}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
        <div className="tram" />
      </section>

      {/* FAQ */}
      <section className="shell py-24 sm:py-32">
        <FadeIn>
          <motion.div variants={fadeUp} className="mb-12">
            <span className="eyebrow">
              <span className="w-1.5 h-1.5 rounded-full bg-terracotta" />
              FAQ
            </span>
            <h2
              className="font-display text-charcoal mt-5 leading-[0.93] tracking-[-0.02em]"
              style={{ fontSize: "clamp(2.25rem, 4vw, 3rem)" }}
            >
              Common questions
            </h2>
          </motion.div>

          <div className="max-w-3xl space-y-4">
            {FAQS.map((faq, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                transition={{ delay: i * 0.08 }}
                className="rounded-[var(--radius-card)] border border-charcoal/8 bg-white p-7"
              >
                <h3 className="font-display text-xl text-charcoal leading-tight">{faq.q}</h3>
                <p className="text-stone text-sm mt-3 leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* Final CTA */}
      <div className="tram" />
      <section className="bg-terracotta">
        <div className="h-px bg-white/20 w-full" />
        <div className="shell py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="font-display text-white leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
              Ready to start building?
            </p>
            <p className="text-white/70 mt-4 max-w-sm mx-auto">
              Join 1500+ teen builders who are shipping real projects and growing together.
            </p>
            <a
              href={JOIN_FORM}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 bg-white text-terracotta font-bold text-sm px-8 py-4 rounded-full hover:bg-cream transition-colors"
            >
              Apply Now <ArrowRight className="w-4 h-4" />
            </a>
            <p className="text-white/50 text-xs mt-4">
              Questions? Email us at{" "}
              <a href="mailto:kolkata@gobitsnbytes.org" className="underline hover:text-white transition-colors">
                kolkata@gobitsnbytes.org
              </a>
            </p>
          </motion.div>
        </div>
        <div className="h-px bg-white/20 w-full" />
      </section>
    </>
  );
}
