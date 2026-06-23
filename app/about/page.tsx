"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

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
    image: "https://avatars.githubusercontent.com/u/108920197?v=4",
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

const DEPT_COLOR: Record<string, string> = {
  Leadership: "bg-tram/10 text-tram",
  Engineering: "bg-terracotta/10 text-terracotta",
  Design: "bg-stone/15 text-stone",
  Operations: "bg-charcoal/8 text-charcoal/60",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-cream dot-grid overflow-hidden pt-32 pb-20">
        <div className="shell">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          >
            <span className="eyebrow">
              <span className="w-1.5 h-1.5 rounded-full bg-terracotta" />
              About Us
            </span>
            <h1
              className="font-display text-charcoal mt-6 leading-[0.92] tracking-[-0.02em]"
              style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)" }}
            >
              WHO WE<br />
              <span className="text-terracotta">ARE.</span>
            </h1>
            <p className="text-stone text-xl mt-6 max-w-2xl leading-relaxed">
              A teen-led code club dedicated to empowering high-agency individuals to
              ship production-grade technology through real-world product launches.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tram divider */}
      <div className="tram" />

      {/* Origin story */}
      <section className="shell py-24 sm:py-32">
        <FadeSection>
          <motion.div variants={fadeUp} className="mb-12">
            <span className="eyebrow">
              <span className="w-1.5 h-1.5 rounded-full bg-terracotta" />
              The Story
            </span>
            <h2
              className="font-display text-charcoal mt-5 leading-[0.93] tracking-[-0.02em]"
              style={{ fontSize: "clamp(2.25rem, 4vw, 3rem)" }}
            >
              Built from the ground up
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-5">
            {STORY.map((s, i) => (
              <motion.div
                key={s.title}
                variants={fadeUp}
                transition={{ delay: i * 0.08 }}
                className="rounded-[var(--radius-card)] border border-charcoal/8 bg-white p-7"
              >
                <h3 className="font-display text-xl text-charcoal leading-tight mb-3">{s.title}</h3>
                <p className="text-stone text-sm leading-relaxed">{s.body}</p>
              </motion.div>
            ))}
          </div>
        </FadeSection>
      </section>

      {/* Tram divider */}
      <div className="tram" />

      {/* Core team */}
      <section className="shell py-24 sm:py-32">
        <FadeSection>
          <motion.div variants={fadeUp} className="mb-12">
            <span className="eyebrow">
              <span className="w-1.5 h-1.5 rounded-full bg-terracotta" />
              The Team
            </span>
            <h2
              className="font-display text-charcoal mt-5 leading-[0.93] tracking-[-0.02em]"
              style={{ fontSize: "clamp(2.25rem, 4vw, 3rem)" }}
            >
              The people building this
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CORE_TEAM.map((member, i) => (
              <motion.div
                key={member.name}
                variants={fadeUp}
                transition={{ delay: i * 0.07 }}
                className="group rounded-[var(--radius-card)] border border-charcoal/8 bg-white overflow-hidden hover:border-terracotta/25 hover:shadow-[0_8px_40px_rgba(197,49,46,0.07)] transition-all duration-300"
              >
                {/* Photo */}
                <div className="relative aspect-square bg-cream-dim overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>

                {/* Info */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-display text-xl text-charcoal leading-tight">{member.name}</h3>
                      <p className="text-stone text-xs mt-1 leading-snug">{member.role}</p>
                    </div>
                    <span className={`shrink-0 text-[0.58rem] font-mono font-bold uppercase tracking-[0.2em] px-2.5 py-1 rounded-full ${DEPT_COLOR[member.dept]}`}>
                      {member.dept}
                    </span>
                  </div>
                  <p className="text-stone/70 text-xs mt-3 leading-relaxed">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </FadeSection>
      </section>

      {/* Dark band */}
      <section className="bg-charcoal w-full">
        <div className="tram" />
        <div className="shell py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          >
            <p className="font-display text-white/90 leading-[0.92]" style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}>
              Want to be part of this?
            </p>
            <p className="text-stone mt-4 max-w-md mx-auto">
              We&apos;re always looking for builders, designers, and community leaders who want to make something real.
            </p>
            <a
              href="https://gusty-servant-a11.notion.site/352d1148777a808ebd28f77a7875a0e6?pvs=105"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 bg-terracotta text-white font-bold px-7 py-4 rounded-full hover:bg-terracotta-deep transition-colors text-sm"
            >
              Apply to join
            </a>
          </motion.div>
        </div>
        <div className="tram" />
      </section>
    </>
  );
}
