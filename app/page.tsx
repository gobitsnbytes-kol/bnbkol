"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence, animate, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const JOIN_FORM      = "https://gusty-servant-a11.notion.site/352d1148777a808ebd28f77a7875a0e6?pvs=105";
const JOIN_COMMUNITY = "https://gusty-servant-a11.notion.site/357d1148777a8007af72ee9b4a54546a?pvs=105";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };

// ─── Data ─────────────────────────────────────────────────────────────────────

const TICKER_WORDS = [
  "HACKATHONS", "BUILD NIGHTS", "KOLKATA", "AI & ENGINEERING",
  "WE SHIP", "COMMUNITY", "OPEN SOURCE", "REAL STAKES",
];

const FOCUS = [
  { title: "HACKATHONS",       body: "High-stakes, teen-run competitions where you compete, present, and get noticed nationally. Real prizes, real judges, real consequences." },
  { title: "BUILD NIGHTS",     body: "48-hour sprints to ship something deployed. No decks. No fluff. You walk in with an idea and walk out with a URL."                     },
  { title: "WORKSHOPS",        body: "Technical sessions led by engineers working in the field — not academics. Hands on keyboard from minute one."                           },
  { title: "AI & ENGINEERING", body: "Deep dives into ML, LLMs, and production toolchains. We don't just talk about AI — we build with it."                                  },
  { title: "COMMUNITY",        body: "1500+ builders across India who collaborate year-round. Discord, meetups, code reviews, and peer accountability."                       },
];

const STATS = [
  { value: "1500+", num: 1500, suffix: "+", label: "Active Members",   sub: "across India"    },
  { value: "130+",  num: 130,  suffix: "+", label: "Projects Shipped", sub: "from apps to AI" },
  { value: "100+",  num: 100,  suffix: "+", label: "Partner Schools",  sub: "and growing"     },
];


const VOICES = [
  { quote: "Leading this community has shown me that there's no limit to what ambitious teens can achieve when they have the right ecosystem to build in.",   author: "Yash Singh",      role: "Co-Founder & Organisation Lead"        },
  { quote: "We're crafting a brand that represents the future of Indian tech — bold, creative, and unapologetically teen-led.",                                author: "Aadrika Maurya",  role: "Co-Founder & Chief Creative Strategist" },
  { quote: "The systems we're building here are the backbone that lets every member ship their wildest ideas with confidence.",                                 author: "Akshat Kushwaha", role: "Co-Founder & Technical Lead"            },
  { quote: "Running the technical side of a 48-hour hackathon at 17 is not something most people get to do. Bits&Bytes gave me that shot.",                    author: "Aditya Bera",     role: "Technical Lead"                         },
  { quote: "Telling our story isn't just about social media — it's about inspiring every teen in India to stop consuming and start building their own future.", author: "Maryam Fatima",   role: "Social Media & Promotions Head"         },
];

// ─── Hero atmosphere config ───────────────────────────────────────────────────


// ─── Shared primitives ────────────────────────────────────────────────────────

function TramLines({ color = "charcoal" }: { color?: "white" | "terracotta" | "charcoal" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });
  const cls = color === "white" ? "bg-white/40" : color === "terracotta" ? "bg-terracotta/40" : "bg-charcoal/30";
  return (
    <div ref={ref} className="flex flex-col gap-[4px] w-full overflow-hidden">
      {[0, 1].map((i) => (
        <motion.div
          key={i}
          className={`h-px origin-left ${cls}`}
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.9, delay: i * 0.1, ease: EASE }}
        />
      ))}
    </div>
  );
}

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  useEffect(() => {
    if (!inView || !ref.current) return;
    const ctrl = animate(0, to, {
      duration: 2,
      ease: EASE,
      onUpdate(v) { if (ref.current) ref.current.textContent = Math.round(v) + suffix; },
    });
    return () => ctrl.stop();
  }, [inView, to, suffix]);
  return <span ref={ref}>0{suffix}</span>;
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

const HEADLINE = [
  { text: "KOLKATA'S", color: "text-charcoal" },
  { text: "BOLDEST",   color: "text-charcoal" },
  { text: "BUILDERS.", color: "text-terracotta" },
];

const PARTICLES = [
  { size: 5, top: "18%", left: "58%", color: "rgba(197,49,46,0.28)", anim: "drift-a", dur: "8s",  delay: "0s"   },
  { size: 3, top: "32%", left: "72%", color: "rgba(91,154,232,0.38)", anim: "drift-b", dur: "11s", delay: "1.8s" },
  { size: 6, top: "58%", left: "64%", color: "rgba(197,49,46,0.18)", anim: "drift-c", dur: "9s",  delay: "0.6s" },
  { size: 4, top: "12%", left: "84%", color: "rgba(91,154,232,0.28)", anim: "drift-a", dur: "13s", delay: "2.5s" },
  { size: 3, top: "72%", left: "79%", color: "rgba(197,49,46,0.22)", anim: "drift-b", dur: "7s",  delay: "4s"   },
  { size: 5, top: "42%", left: "90%", color: "rgba(91,154,232,0.22)", anim: "drift-c", dur: "10s", delay: "1.2s" },
];

function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  const bx = useMotionValue(0);
  const by = useMotionValue(0);
  const sbx = useSpring(bx, { stiffness: 55, damping: 22 });
  const sby = useSpring(by, { stiffness: 55, damping: 22 });

  const birdX = useMotionValue(0);
  const birdY = useMotionValue(0);
  const sBirdX = useSpring(birdX, { stiffness: 36, damping: 16 });
  const sBirdY = useSpring(birdY, { stiffness: 36, damping: 16 });

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = (e.clientX - rect.left) / rect.width - 0.5;
    const cy = (e.clientY - rect.top) / rect.height - 0.5;
    bx.set(cx * 14);
    by.set(cy * 8);
    birdX.set(cx * 26);
    birdY.set(cy * 16);
  };

  return (
    <section
      ref={heroRef}
      onMouseMove={onMouseMove}
      className="relative overflow-hidden min-h-screen flex items-center"
      style={{ background: "radial-gradient(ellipse 65% 75% at 92% 88%, rgba(234,122,40,0.72) 0%, transparent 62%), radial-gradient(ellipse 48% 52% at 88% 8%, rgba(91,154,232,0.52) 0%, transparent 54%), linear-gradient(165deg, #FAF7EF 0%, #F2E4C8 42%, #D9BA84 100%)" }}
    >
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none" style={{ animation: "hero-fade 2s 0.5s both" }}>
        {PARTICLES.map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: p.size,
              height: p.size,
              top: p.top,
              left: p.left,
              background: p.color,
              animation: `${p.anim} ${p.dur} ease-in-out ${p.delay} infinite`,
            }}
          />
        ))}
      </div>

      {/* Bridge — parallax outer, entrance inner */}
      <motion.div
        className="absolute bottom-0 right-0 w-full lg:w-[72%] pointer-events-none select-none"
        style={{ x: sbx, y: sby }}
      >
        <div style={{ animation: "hero-slide-in 1.1s cubic-bezier(0.22,1,0.36,1) 0.2s both" }}>
          <Image
            src="/hero/howrah-bridge.png"
            alt=""
            width={1200}
            height={500}
            className="w-full h-auto object-contain object-bottom"
            style={{ mixBlendMode: "multiply", opacity: 0.88 }}
            priority
          />
        </div>
      </motion.div>

      {/* Birds — more parallax, float inner */}
      <motion.div
        className="absolute top-[8%] right-[8%] w-[22%] max-w-[260px] pointer-events-none select-none"
        style={{ x: sBirdX, y: sBirdY, opacity: 0.55 }}
      >
        <div className="animate-float">
          <Image
            src="/hero/birds.png"
            alt=""
            width={400}
            height={300}
            className="w-full h-auto"
            style={{ mixBlendMode: "multiply" }}
          />
        </div>
      </motion.div>

      {/* Tram — foreground, CSS slide (unchanged) */}
      <div
        className="absolute pointer-events-none select-none animate-tram"
        style={{ bottom: "4%", width: "clamp(220px, 22vw, 360px)" }}
      >
        <Image
          src="/hero/tram.png"
          alt="Kolkata tram"
          width={600}
          height={260}
          className="w-full h-auto drop-shadow-lg"
          style={{ mixBlendMode: "multiply" }}
        />
      </div>

      {/* Cream fade on left so text stays readable */}
      <div
        className="absolute inset-y-0 left-0 w-[52%] lg:w-[45%] pointer-events-none"
        style={{ background: "linear-gradient(to right, rgba(250,247,239,0.98) 40%, rgba(242,228,200,0.7) 70%, transparent)" }}
      />

      {/* Text */}
      <div className="shell relative z-10 w-full min-h-screen flex items-center">
        <div className="w-full max-w-2xl py-32 lg:py-0 pl-2 lg:pl-6">

          {/* Eyebrow */}
          <div
            className="flex items-center gap-2.5 mb-8"
            style={{ animation: "hero-fade-up 0.5s cubic-bezier(0.22,1,0.36,1) 0.1s both" }}
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-terracotta opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-terracotta" />
            </span>
            <span className="text-[0.58rem] font-mono font-bold tracking-[0.38em] uppercase text-stone/55">
              Kolkata&apos;s Teen Builder Community
            </span>
          </div>

          {/* Headline — per-line rise */}
          <div className="flex flex-col mb-8" style={{ fontSize: "clamp(4.5rem, 11vw, 9.5rem)" }}>
            {HEADLINE.map((line, i) => (
              <div key={line.text} className="overflow-hidden leading-[0.88]">
                <span
                  className={`block font-display tracking-[-0.01em] ${line.color}`}
                  style={{ animation: `hero-rise 0.8s cubic-bezier(0.22,1,0.36,1) ${0.25 + i * 0.11}s both` }}
                >
                  {line.text}
                </span>
              </div>
            ))}
          </div>

          {/* Body */}
          <p
            className="text-stone text-lg leading-relaxed max-w-md mb-8"
            style={{ animation: "hero-fade-up 0.65s cubic-bezier(0.22,1,0.36,1) 0.6s both", ["--from-y" as string]: "20px" }}
          >
            Bits&Bytes Kolkata is a crew of teens who don&apos;t wait to be ready.
            We run hackathons, ship products, and build the next generation of
            Indian tech talent — right here in the City of Joy.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row gap-4 mb-12"
            style={{ animation: "hero-fade-up 0.6s cubic-bezier(0.22,1,0.36,1) 0.72s both", ["--from-y" as string]: "18px" }}
          >
            <a
              href={JOIN_FORM}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-terracotta text-white font-bold text-sm px-8 py-4 rounded-full hover:bg-terracotta-deep active:scale-[0.98] transition-all duration-200 shadow-[0_6px_32px_rgba(197,49,46,0.35)]"
            >
              Apply to join <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/events"
              className="inline-flex items-center justify-center gap-2 border-2 border-charcoal/18 text-charcoal font-semibold text-sm px-8 py-4 rounded-full hover:border-charcoal/35 transition-colors"
            >
              See our events
            </Link>
          </div>

          {/* Stats strip */}
          <div
            className="flex flex-wrap gap-8 pt-6 border-t border-charcoal/8"
            style={{ animation: "hero-fade 0.6s ease 0.88s both" }}
          >
            {STATS.map((s) => (
              <div key={s.label}>
                <p className="font-display text-charcoal text-3xl leading-none">{s.value}</p>
                <p className="font-mono text-[0.58rem] font-bold uppercase tracking-[0.22em] text-tram mt-1.5">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Manifesto ────────────────────────────────────────────────────────────────

function Manifesto() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  return (
    <section ref={ref} className="bg-charcoal w-full overflow-hidden">
      <TramLines color="white" />
      <div className="shell py-20 sm:py-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <p className="text-[0.58rem] font-mono font-bold tracking-[0.42em] uppercase text-white/22 mb-8">
            Our Claim
          </p>
          <div className="overflow-hidden leading-[0.88]">
            <motion.p
              className="font-display text-white leading-[0.88]"
              style={{ fontSize: "clamp(3.5rem, 8.5vw, 7.5rem)" }}
              initial={{ y: "105%" }}
              animate={inView ? { y: "0%" } : {}}
              transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
            >
              City of Joy.
            </motion.p>
          </div>
          <div className="overflow-hidden leading-[0.88]">
            <motion.p
              className="font-display text-terracotta leading-[0.88]"
              style={{ fontSize: "clamp(3.5rem, 8.5vw, 7.5rem)" }}
              initial={{ y: "105%" }}
              animate={inView ? { y: "0%" } : {}}
              transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
            >
              City of Builders.
            </motion.p>
          </div>
          <motion.p
            className="text-stone/55 mt-8 max-w-sm text-sm leading-relaxed border-l-2 border-terracotta/50 pl-4"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
          >
            We didn&apos;t wait for someone else to build a tech community here.
            We just built it.
          </motion.p>
        </motion.div>
      </div>
      <TramLines color="white" />
    </section>
  );
}

// ─── Ticker ───────────────────────────────────────────────────────────────────

function Ticker() {
  const items = [...TICKER_WORDS, ...TICKER_WORDS, ...TICKER_WORDS, ...TICKER_WORDS];
  return (
    <div className="overflow-hidden bg-ink border-y border-white/5 py-3.5 select-none">
      <div className="animate-marquee">
        {items.map((word, i) => (
          <span key={i} className="inline-flex items-center">
            <span className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.32em] text-white/35 whitespace-nowrap px-5">
              {word}
            </span>
            <span className="text-terracotta/50 text-xs font-bold leading-none">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Focus Areas ──────────────────────────────────────────────────────────────

function FocusAreas() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.08 });

  return (
    <section ref={ref} className="bg-cream py-24 sm:py-32">
      <div className="shell">
        <motion.div initial="hidden" animate={inView ? "show" : "hidden"} variants={stagger}>
          <motion.div variants={fadeUp} className="mb-14">
            <p className="text-[0.58rem] font-mono font-bold tracking-[0.42em] uppercase text-stone/50 mb-4">
              What We Do
            </p>
            <h2
              className="font-display text-charcoal leading-[0.9]"
              style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)" }}
            >
              FIVE WAYS WE BUILD.
            </h2>
          </motion.div>

          <div>
            {FOCUS.map((item, i) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                className="group grid grid-cols-[3.5rem_1fr] md:grid-cols-[5.5rem_16rem_1fr] items-start gap-x-8 gap-y-2 py-9 border-t border-charcoal/8 -mx-5 px-5 sm:-mx-8 sm:px-8 hover:bg-charcoal/[0.022] transition-colors duration-200"
              >
                <span
                  className="font-display text-charcoal/8 group-hover:text-tram/20 select-none leading-none pt-1 transition-colors duration-300"
                  style={{ fontSize: "clamp(3rem, 6.5vw, 5.5rem)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3
                  className="font-display text-charcoal leading-tight group-hover:text-terracotta transition-colors duration-200"
                  style={{ fontSize: "clamp(1.2rem, 2.2vw, 1.6rem)" }}
                >
                  {item.title}
                </h3>
                <p className="text-stone text-sm leading-relaxed col-start-2 md:col-start-3 mt-1 md:mt-0">
                  {item.body}
                </p>
              </motion.div>
            ))}
            <div className="border-t border-charcoal/8" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Impact — 3-column stat grid ──────────────────────────────────────────────

function Impact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  const accent = ["text-white", "text-tram", "text-terracotta"] as const;

  return (
    <section ref={ref} className="bg-ink overflow-hidden">
      <TramLines color="white" />
      <div className="shell py-20 sm:py-28">
        <motion.div initial="hidden" animate={inView ? "show" : "hidden"} variants={stagger}>
          <motion.p
            variants={fadeUp}
            className="text-[0.58rem] font-mono font-bold tracking-[0.42em] uppercase text-white/22 mb-16"
          >
            The Numbers
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-3">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                variants={fadeUp}
                transition={{ delay: i * 0.1 }}
                className={`py-10 ${i > 0 ? "border-t border-white/8 sm:border-t-0 sm:border-l sm:pl-12 sm:ml-0" : ""}`}
              >
                <p className="font-mono text-[0.52rem] font-bold uppercase tracking-[0.3em] text-white/25 mb-4">
                  {s.sub}
                </p>
                <div
                  className={`font-display leading-[0.85] ${accent[i]}`}
                  style={{ fontSize: "clamp(4.5rem, 10vw, 8rem)" }}
                >
                  <CountUp to={s.num} suffix={s.suffix} />
                </div>
                <p className="font-mono text-[0.58rem] font-bold uppercase tracking-[0.28em] text-white/40 mt-5">
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      <TramLines color="white" />
    </section>
  );
}

// ─── Partners — sponsor placeholder grid ──────────────────────────────────────

const SPONSOR_SLOTS = [
  { type: "Title Sponsor",     bg: "bg-charcoal", text: "text-white",    sub: "text-white/30",  span: true,  phrases: ["Your brand here.", "Back the builders.", "Be the leading face.", "Shape what's next."] },
  { type: "Knowledge Partner", bg: "bg-cream-dim", text: "text-charcoal", sub: "text-stone/45",  span: false, phrases: ["Reach teen founders.", "Put your logo here.", "Kolkata's next wave.", "Invest in builders."] },
  { type: "Community Partner", bg: "bg-tram/10",   text: "text-charcoal", sub: "text-tram/55",   span: false, phrases: ["Be part of this.", "Every event. Your name.", "High-agency audience.", "Partner with us."] },
];

function SpinningSlot({ phrases, textClass, subClass }: { phrases: string[]; textClass: string; subClass: string }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % phrases.length), 2600);
    return () => clearInterval(t);
  }, [phrases.length]);
  return (
    <div className="overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.h3
          key={idx}
          className={`font-display ${textClass} leading-tight`}
          style={{ fontSize: "clamp(1.6rem, 2.8vw, 2.2rem)" }}
          initial={{ opacity: 0, y: "60%" }}
          animate={{ opacity: 1, y: "0%" }}
          exit={{ opacity: 0, y: "-60%" }}
          transition={{ duration: 0.38, ease: EASE }}
        >
          {phrases[idx]}
        </motion.h3>
      </AnimatePresence>
      <p className={`${subClass} text-[0.52rem] font-mono tracking-[0.18em] uppercase mt-5`}>
        Slot open — kolkata@gobitsnbytes.org
      </p>
    </div>
  );
}

function Partners() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section ref={ref} className="bg-ink">
      <div className="shell pt-20 sm:pt-28 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <p className="text-[0.58rem] font-mono font-bold tracking-[0.42em] uppercase text-white/22 mb-4">
            Ecosystem
          </p>
          <h2
            className="font-display text-white leading-[0.9]"
            style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)" }}
          >
            WHO BACKS US.
          </h2>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: EASE }}
        className="grid sm:grid-cols-2 gap-[3px] bg-ink"
      >
        {SPONSOR_SLOTS.map((s) => (
          <div
            key={s.type}
            className={`${s.bg} ${s.span ? "sm:row-span-2" : ""} p-10 sm:p-12 lg:p-16 flex flex-col justify-between min-h-[220px]`}
          >
            <p className={`text-[0.52rem] font-mono font-bold uppercase tracking-[0.3em] ${s.sub} mb-10`}>
              {s.type}
            </p>
            <SpinningSlot phrases={s.phrases} textClass={s.text} subClass={s.sub} />
          </div>
        ))}
      </motion.div>

      <div className="h-20 sm:h-28" />
    </section>
  );
}

// ─── Voices ───────────────────────────────────────────────────────────────────

function Voices() {
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  function prev() { setActive((a) => (a - 1 + VOICES.length) % VOICES.length); }
  function next() { setActive((a) => (a + 1) % VOICES.length); }

  useEffect(() => {
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section ref={ref} className="bg-terracotta overflow-hidden">
      <TramLines color="white" />
      <div className="shell py-20 sm:py-28">
        <motion.div initial="hidden" animate={inView ? "show" : "hidden"} variants={stagger} className="space-y-12">

          <motion.p variants={fadeUp} className="text-[0.58rem] font-mono font-bold tracking-[0.42em] uppercase text-white/28">
            Voices from the crew
          </motion.p>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 32 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="max-w-3xl"
            >
              <p
                className="font-display text-white leading-[1.05]"
                style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
              >
                &ldquo;{VOICES[active].quote}&rdquo;
              </p>
              <div className="mt-8 flex items-center gap-4">
                <div className="w-7 h-px bg-white/40 shrink-0" />
                <div>
                  <p className="text-white font-bold text-sm">{VOICES[active].author}</p>
                  <p className="text-white/55 text-xs font-mono uppercase tracking-[0.18em] mt-0.5">
                    {VOICES[active].role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <motion.div variants={fadeUp} className="flex items-center gap-5">
            <button onClick={prev} className="w-10 h-10 rounded-full border border-white/25 text-white flex items-center justify-center hover:bg-white/10 transition-colors" aria-label="Previous">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <span className="font-mono text-[0.62rem] font-bold text-white/32 tracking-[0.2em]">
              {String(active + 1).padStart(2, "0")} / {String(VOICES.length).padStart(2, "0")}
            </span>
            <button onClick={next} className="w-10 h-10 rounded-full border border-white/25 text-white flex items-center justify-center hover:bg-white/10 transition-colors" aria-label="Next">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 2L10 7L5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </motion.div>
        </motion.div>
      </div>
      <TramLines color="white" />
    </section>
  );
}

// ─── Join CTA — left-aligned ──────────────────────────────────────────────────

function JoinCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });

  return (
    <section ref={ref} className="bg-charcoal">
      <div className="shell py-24 sm:py-32">
        <motion.div initial="hidden" animate={inView ? "show" : "hidden"} variants={stagger}>

          <motion.p variants={fadeUp} className="text-[0.58rem] font-mono font-bold tracking-[0.42em] uppercase text-white/18 mb-8">
            What are you waiting for
          </motion.p>

          <div className="flex flex-col" style={{ fontSize: "clamp(3.5rem, 9vw, 8rem)" }}>
            {[
              { text: "READY TO",        color: "text-white" },
              { text: "SHIP SOMETHING?", color: "text-terracotta" },
            ].map((line, i) => (
              <div key={line.text} className="overflow-hidden leading-[0.88]">
                <motion.span
                  className={`block font-display ${line.color}`}
                  variants={{
                    hidden: { y: "108%" },
                    show:   { y: "0%", transition: { duration: 0.75, delay: i * 0.1, ease: EASE } },
                  }}
                >
                  {line.text}
                </motion.span>
              </div>
            ))}
          </div>

          <motion.p variants={fadeUp} className="text-stone mt-8 text-lg max-w-md leading-relaxed">
            Join the crew. We take ambitious teens with something to prove —
            background not required.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-col sm:flex-row gap-4">
            <a
              href={JOIN_FORM}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-terracotta text-white font-bold text-sm px-9 py-5 rounded-full hover:bg-terracotta-deep active:scale-[0.98] transition-all duration-200 shadow-[0_8px_40px_rgba(197,49,46,0.4)]"
            >
              Apply to join <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href={JOIN_COMMUNITY}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-white/15 text-white font-semibold text-sm px-9 py-5 rounded-full hover:border-white/30 transition-colors"
            >
              Join community <ArrowUpRight className="w-4 h-4" />
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border border-white/10 text-white/55 font-semibold text-sm px-9 py-5 rounded-full hover:border-white/25 hover:text-white/80 transition-colors"
            >
              Contact us
            </Link>
          </motion.div>
        </motion.div>
      </div>
      <TramLines color="white" />
    </section>
  );
}

// ─── Sponsor CTA ─────────────────────────────────────────────────────────────

const SPONSOR_PERKS = [
  { num: "01", title: "Event presence",    body: "Logo on banners, stage backdrops, and all printed materials at every hackathon and build night." },
  { num: "02", title: "Digital reach",     body: "Brand mentions across our socials, Discord announcements, and event recap posts — 1500+ active builders." },
  { num: "03", title: "Talent pipeline",   body: "First access to our top builders. Ideal for early recruiting, internships, or product beta testers." },
  { num: "04", title: "Named sponsorship", body: "Title and knowledge partner slots available for flagship events, with co-branding on all event collateral." },
];

function SponsorCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section ref={ref} className="bg-cream-dim overflow-hidden">
      <TramLines color="charcoal" />
      <div className="shell py-20 sm:py-28">
        <motion.div initial="hidden" animate={inView ? "show" : "hidden"} variants={stagger}>
          <motion.p
            variants={fadeUp}
            className="text-[0.58rem] font-mono font-bold tracking-[0.42em] uppercase text-stone/45 mb-6"
          >
            Sponsor Us
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="font-display text-charcoal leading-[0.9] mb-6"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            BACK KOLKATA&apos;S<br />
            <span className="text-terracotta">BUILDERS.</span>
          </motion.h2>

          <motion.p variants={fadeUp} className="text-stone text-base leading-relaxed max-w-xl mb-14">
            We run hackathons, build nights, and workshops for high-agency teen
            builders across Kolkata. Your brand directly in front of India&apos;s
            next generation of engineers, designers, and founders.
          </motion.p>

          <div className="grid sm:grid-cols-2 gap-px bg-charcoal/8 mb-14">
            {SPONSOR_PERKS.map((p, i) => (
              <motion.div
                key={p.num}
                variants={fadeUp}
                transition={{ delay: i * 0.07 }}
                className="bg-cream-dim px-8 py-8 group"
              >
                <p className="font-mono text-[0.52rem] font-bold text-tram/55 tracking-[0.28em] uppercase mb-3">
                  {p.num}
                </p>
                <h3 className="font-display text-charcoal text-xl leading-tight mb-2 group-hover:text-terracotta transition-colors duration-200">
                  {p.title}
                </h3>
                <p className="text-stone/70 text-sm leading-relaxed">{p.body}</p>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 items-start">
            <a
              href="mailto:kolkata@gobitsnbytes.org?subject=Sponsorship Enquiry"
              className="inline-flex items-center gap-2 bg-charcoal text-white font-bold text-sm px-8 py-4 rounded-full hover:bg-ink active:scale-[0.98] transition-all duration-200"
            >
              Get in touch <ArrowUpRight className="w-4 h-4" />
            </a>
            <span className="text-stone/40 text-xs self-center font-mono tracking-[0.12em]">
              kolkata@gobitsnbytes.org
            </span>
          </motion.div>
        </motion.div>
      </div>
      <TramLines color="charcoal" />
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      <Hero />
      <Manifesto />
      <Ticker />
      <FocusAreas />
      <Impact />
      <Partners />
      <Voices />
      <JoinCTA />
      <SponsorCTA />
    </>
  );
}
