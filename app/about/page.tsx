"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

function FadeSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.12 });
  return (
    <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"} className={className}>
      {children}
    </motion.div>
  );
}

const STORY = [
  {
    title: "The Origin Story",
    body: "After competing in a national-level competition and discovering the Bits&Bytes fork program, our lead realized Kolkata lacked a real platform for student builders. He decided to fork Bits&Bytes to fill this gap — bringing world-class tech events and a high-agency culture to the City of Joy.",
  },
  {
    title: "High Agency Only",
    body: "We move away from beginner-friendly formats that treat participants like they need hand-holding. We build for exceptionally talented individuals who want to ship real products, not attend lectures.",
  },
  {
    title: "Ship Real Products",
    body: "Workshops and hack nights must convert into tangible outcomes. We focus on premium hackathons, dev squads, and real-world launches — fully student-led.",
  },
  {
    title: "Production Grade",
    body: "We prioritize performance and stability. Our technical infrastructure is built with professional standards, removing barriers for the next generation of builders.",
  },
];

const CORE_TEAM = [
  {
    name: "Shoryavardhaan Gupta",
    role: "Kolkata Fork Lead",
    dept: "Leadership",
    image: "/team/shorya.png",
    bio: "Founded Bits&Bytes Kolkata. Driving the city's identity as a hub for high-agency teen builders.",
  },
  {
    name: "Akshat Kushwaha",
    role: "Co-Founder & Technical Lead",
    dept: "Engineering",
    image: "/team/akshat.jpg",
    bio: "AI-native systems engineer and lead architect for the Bits&Bytes Kolkata production-grade tech infrastructure. LLMOps & RAG specialist.",
  },
  {
    name: "Yash Singh",
    role: "Co-Founder & Organisation Lead",
    dept: "Leadership",
    image: "/team/yash.jpeg",
    bio: "Founder of Bits&Bytes Kolkata, creator of Codiva (5-star VS Code extension), national IOQM qualifier, lead organizer for Scrapyard Kolkata.",
  },
  {
    name: "Aadrika Maurya",
    role: "Co-Founder & Chief Creative Strategist",
    dept: "Design",
    image: "/team/aadrika.png",
    bio: "RSI India alumni. Neuroscience researcher, creative director, and the force behind the Bits&Bytes visual identity and brand.",
  },
  {
    name: "Devaansh Pathak",
    role: "Founding Member & Backend Lead",
    dept: "Engineering",
    image: "/team/devansh.jpeg",
    bio: "Co-architected the high-performance backend systems. Executes partnerships that deliver genuine ROI for sponsors across multiple cities.",
  },
  {
    name: "Maryam Fatima",
    role: "Social Media & Promotions Head",
    dept: "Design",
    image: "/team/maryam.jpeg",
    bio: "Generating 10k+ impressions for club events. Maintains the premium brand identity across all social channels.",
  },
  {
    name: "Sristhi Singh",
    role: "Operations & Communications Head",
    dept: "Operations",
    image: "/team/srishti.jpeg",
    bio: "Engineered the internal communication workflows for 100+ active members. Coordinated logistics for NASA Space Apps and multiple city-wide events.",
  },
];

const CONTRIBUTORS = [
  {
    name: "Vaibhav Thakkar",
    role: "Ops & Creative Contributor",
    initials: "VT",
    color: "#5B9AE8",
    bg: "rgba(91,154,232,0.07)",
    border: "rgba(91,154,232,0.18)",
    bio: "Drives operational and creative initiatives for Bits&Bytes Kolkata — keeping events tight, brand consistent, and the community energy high.",
  },
  {
    name: "Atharva Upadhyay",
    role: "Ops Lead, Kolkata Fork",
    initials: "AU",
    color: "#C5312E",
    bg: "rgba(197,49,46,0.06)",
    border: "rgba(197,49,46,0.18)",
    bio: "Heads on-the-ground operations for the Kolkata fork — coordinating logistics, community workflows, and cross-team execution.",
  },
];

const DEPT_COLOR: Record<string, string> = {
  Leadership: "text-tram",
  Engineering: "text-terracotta",
  Design: "text-stone",
  Operations: "text-charcoal/50",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero — clean cream, no dot-grid */}
      <section className="relative bg-cream overflow-hidden pt-32 pb-20">
        <div className="shell">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <p className="text-[0.58rem] font-mono font-bold tracking-[0.42em] uppercase text-stone/50 mb-5">
              About Us
            </p>
            <h1
              className="font-display text-charcoal leading-[0.88] tracking-[-0.02em]"
              style={{ fontSize: "clamp(4rem, 9vw, 7.5rem)" }}
            >
              WHO WE<br />
              <span className="text-terracotta">ARE.</span>
            </h1>
            <p className="text-stone text-xl mt-7 max-w-xl leading-relaxed">
              A teen-led code club dedicated to empowering high-agency individuals to
              ship production-grade technology through real-world product launches.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tram divider */}
      <div className="flex flex-col gap-[4px] w-full">
        <div className="h-px w-full bg-charcoal/20" />
        <div className="h-px w-full bg-charcoal/10" />
      </div>

      {/* Story — 2×2 card grid */}
      <section className="py-24 sm:py-32">
        <div className="shell mb-14">
          <FadeSection>
            <motion.div variants={fadeUp}>
              <p className="text-[0.58rem] font-mono font-bold tracking-[0.42em] uppercase text-stone/50 mb-4">
                The Story
              </p>
              <h2
                className="font-display text-charcoal leading-[0.9]"
                style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)" }}
              >
                BUILT FROM<br />THE GROUND UP.
              </h2>
            </motion.div>
          </FadeSection>
        </div>

        <FadeSection className="grid sm:grid-cols-2 gap-px bg-charcoal/10">
          {STORY.map((s, i) => {
            const bg = i % 2 === 0 ? "bg-cream" : "bg-[#F5EFE2]";
            return (
              <motion.div
                key={s.title}
                variants={fadeUp}
                transition={{ delay: i * 0.08 }}
                className={`relative overflow-hidden p-10 sm:p-14 ${bg}`}
              >
                <span
                  className="absolute right-5 top-3 font-display leading-none text-charcoal/5 select-none pointer-events-none"
                  style={{ fontSize: "clamp(6rem, 14vw, 11rem)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="relative">
                  <p className="font-mono text-[0.52rem] font-bold uppercase tracking-[0.32em] text-tram mb-5">
                    Chapter {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3
                    className="font-display text-charcoal leading-tight mb-5"
                    style={{ fontSize: "clamp(1.5rem, 2.8vw, 2rem)" }}
                  >
                    {s.title}
                  </h3>
                  <p className="text-stone text-sm leading-relaxed max-w-md">{s.body}</p>
                </div>
              </motion.div>
            );
          })}
        </FadeSection>
      </section>

      {/* Tram divider */}
      <div className="flex flex-col gap-[4px] w-full">
        <div className="h-px w-full bg-charcoal/20" />
        <div className="h-px w-full bg-charcoal/10" />
      </div>

      {/* Team */}
      <section className="shell py-24 sm:py-32">
        <FadeSection>
          <motion.div variants={fadeUp} className="mb-14">
            <p className="text-[0.58rem] font-mono font-bold tracking-[0.42em] uppercase text-stone/50 mb-4">
              The Team
            </p>
            <h2
              className="font-display text-charcoal leading-[0.9]"
              style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)" }}
            >
              THE PEOPLE<br />BUILDING THIS.
            </h2>
          </motion.div>

          {/* All team members — equal grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CORE_TEAM.map((member, i) => (
              <motion.div
                key={member.name}
                variants={fadeUp}
                transition={{ delay: i * 0.07 }}
                className="group rounded-2xl border border-charcoal/8 bg-white overflow-hidden hover:border-terracotta/22 hover:shadow-[0_8px_40px_rgba(197,49,46,0.07)] transition-all duration-300"
              >
                <div className="relative aspect-square bg-cream-dim overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <p className={`text-[0.52rem] font-mono font-bold uppercase tracking-[0.28em] mb-1.5 ${DEPT_COLOR[member.dept]}`}>
                    {member.dept}
                  </p>
                  <h3 className="font-display text-xl text-charcoal leading-tight">{member.name}</h3>
                  <p className="text-stone text-xs mt-1 leading-snug">{member.role}</p>
                  <p className="text-stone/60 text-xs mt-3 leading-relaxed">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </FadeSection>
      </section>

      {/* Contributors */}
      <section className="py-16 sm:py-24 bg-cream-dim">
        <div className="shell">
          <FadeSection>
            <motion.div variants={fadeUp} className="mb-10">
              <p className="text-[0.58rem] font-mono font-bold tracking-[0.42em] uppercase text-stone/50 mb-3">
                Contributors
              </p>
              <h2
                className="font-display text-charcoal leading-[0.9]"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)" }}
              >
                ALSO BUILDING THIS.
              </h2>
              <p className="text-stone text-sm mt-4 max-w-md leading-relaxed">
                Key contributors who make the Kolkata chapter what it is.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-5 max-w-2xl">
              {CONTRIBUTORS.map((c, i) => (
                <motion.div
                  key={c.name}
                  variants={fadeUp}
                  transition={{ delay: i * 0.1 }}
                  className="group rounded-2xl border p-7 hover:shadow-[0_8px_40px_rgba(0,0,0,0.06)] transition-all duration-300"
                  style={{ background: c.bg, borderColor: c.border }}
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold text-white select-none mb-5 shadow-sm"
                    style={{ background: c.color }}
                  >
                    {c.initials}
                  </div>
                  <p className="font-mono text-[0.52rem] font-bold uppercase tracking-[0.28em] mb-2" style={{ color: c.color }}>
                    {c.role}
                  </p>
                  <h3 className="font-display text-charcoal text-2xl leading-tight mb-3">{c.name}</h3>
                  <p className="text-stone text-sm leading-relaxed">{c.bio}</p>
                </motion.div>
              ))}
            </div>
          </FadeSection>
        </div>
      </section>

      {/* Tram divider */}
      <div className="flex flex-col gap-[4px] w-full">
        <div className="h-px w-full bg-charcoal/20" />
        <div className="h-px w-full bg-charcoal/10" />
      </div>

      {/* Dark CTA band */}
      <section className="bg-charcoal w-full">
        <div className="flex flex-col gap-[4px] w-full">
          <div className="h-px w-full bg-white/18" />
          <div className="h-px w-full bg-white/8" />
        </div>
        <div className="shell py-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <p
              className="font-display text-white leading-[0.9]"
              style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
            >
              Want to be part<br />
              <span className="text-terracotta">of this?</span>
            </p>
            <p className="text-stone/70 mt-5 max-w-sm text-sm leading-relaxed">
              We&apos;re always looking for builders, designers, and community leaders
              who want to make something real.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 items-start">
              <a
                href="https://gusty-servant-a11.notion.site/352d1148777a808ebd28f77a7875a0e6?pvs=105"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-terracotta text-white font-bold px-7 py-4 rounded-full hover:bg-[#A02320] transition-colors text-sm"
              >
                Apply to join
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border border-white/18 text-white/70 font-semibold text-sm px-7 py-4 rounded-full hover:border-white/35 hover:text-white transition-colors"
              >
                Get in touch
              </Link>
            </div>
          </motion.div>
        </div>
        <div className="flex flex-col gap-[4px] w-full">
          <div className="h-px w-full bg-white/18" />
          <div className="h-px w-full bg-white/8" />
        </div>
      </section>
    </>
  );
}
