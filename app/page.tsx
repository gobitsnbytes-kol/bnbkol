"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence, animate } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const JOIN_FORM      = "https://gusty-servant-a11.notion.site/352d1148777a808ebd28f77a7875a0e6?pvs=105";
const JOIN_COMMUNITY = "https://gusty-servant-a11.notion.site/357d1148777a8007af72ee9b4a54546a?pvs=105";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0,  transition: { duration: 0.65, ease: EASE } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };

// ─── Data ─────────────────────────────────────────────────────────────────────

const SLIDES = [
  { img: "/event_pictures/HEe923uagAATqvy.jpg",  label: "India Innovates 2026",   meta: "New Delhi · Summit"        },
  { img: "/images/copilot-dev-day.png",           label: "GitHub Copilot Dev Day", meta: "Kolkata · Developer Event" },
  { img: "/event_pictures/byteforge1.webp",       label: "ByteForge",              meta: "Kolkata · Build Night"     },
];

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

const PARTNERS = [
  {
    name: "osmAPI",
    logo: "/partners/OSM-API-Light-BBO_4Eff.png",
    url: "https://www.osmapi.com/",
    role: "API Partner",
    desc: "One Awesome API for everything AI — route to OpenAI, Anthropic, Google & 14+ LLM providers.",
  },
  {
    name: "YRI Fellowship",
    logo: "/partners/yri.png",
    url: "https://www.yriscience.com/",
    role: "Knowledge Partner",
    desc: "Advancing scientific research and building the next generation of innovators through fellowships.",
  },
  {
    name: "z.ai",
    logo: "/partners/zai.svg",
    url: "https://chat.z.ai/",
    role: "AI Partner",
    desc: "Intelligent chat experiences and frontier language model integrations for the modern developer.",
  },
];

const VOICES = [
  { quote: "Leading this community has shown me that there's no limit to what ambitious teens can achieve when they have the right ecosystem to build in.",   author: "Yash Singh",      role: "Co-Founder & Organisation Lead"        },
  { quote: "We're crafting a brand that represents the future of Indian tech — bold, creative, and unapologetically teen-led.",                                author: "Aadrika Maurya",  role: "Co-Founder & Chief Creative Strategist" },
  { quote: "The systems we're building here are the backbone that lets every member ship their wildest ideas with confidence.",                                 author: "Akshat Kushwaha", role: "Co-Founder & Technical Lead"            },
  { quote: "Running the technical side of a 48-hour hackathon at 17 is not something most people get to do. Bits&Bytes gave me that shot.",                    author: "Aditya Bera",     role: "Technical Lead"                         },
  { quote: "Telling our story isn't just about social media — it's about inspiring every teen in India to stop consuming and start building their own future.", author: "Maryam Fatima",   role: "Social Media & Promotions Head"         },
];

// ─── Shared primitives ────────────────────────────────────────────────────────

/** Two tram lines that draw in left→right on scroll */
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

/** Count from 0 to `to` on scroll-enter */
function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const ctrl = animate(0, to, {
      duration: 2,
      ease: EASE,
      onUpdate(v) {
        if (ref.current) ref.current.textContent = Math.round(v) + suffix;
      },
    });
    return () => ctrl.stop();
  }, [inView, to, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

const HEADLINE = [
  { text: "KOLKATA’S", color: "text-charcoal" },
  { text: "BOLDEST",        color: "text-charcoal" },
  { text: "BUILDERS.",      color: "text-terracotta" },
];

function Hero() {
  const [slide, setSlide] = useState(0);
  const [dir, setDir]     = useState(1);

  useEffect(() => {
    const t = setInterval(() => { setDir(1); setSlide((s) => (s + 1) % SLIDES.length); }, 4800);
    return () => clearInterval(t);
  }, []);

  function goTo(i: number) { setDir(i > slide ? 1 : -1); setSlide(i); }

  const slideV = {
    enter:  (d: number) => ({ x: d * 52, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:   (d: number) => ({ x: d * -52, opacity: 0 }),
  };

  return (
    <section className="relative hero-bg overflow-hidden min-h-screen flex items-center">
      {/* Tram spine — two thin vertical tracks */}
      <div className="absolute left-5 sm:left-8 lg:left-12 top-0 bottom-0 flex gap-[3px] pointer-events-none">
        <div className="w-px h-full bg-terracotta/45" />
        <div className="w-px h-full bg-terracotta/20" />
      </div>

      <div className="shell relative w-full py-28 lg:py-0 lg:min-h-screen lg:flex lg:items-center">
        <div className="grid lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_460px] gap-12 xl:gap-20 w-full">

          {/* Left: headline + CTAs */}
          <div className="flex flex-col gap-8 lg:py-28 pl-6 lg:pl-10">

            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
            >
              <span className="eyebrow">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-terracotta opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-terracotta" />
                </span>
                Kolkata&apos;s Teen Builder Community
              </span>
            </motion.div>

            {/* Headline — each line rises through overflow-hidden clip */}
            <div className="flex flex-col" style={{ fontSize: "clamp(4.5rem, 11vw, 9rem)" }}>
              {HEADLINE.map((line, i) => (
                <div key={line.text} className="overflow-hidden leading-[0.88]">
                  <motion.span
                    className={`block font-display tracking-[-0.01em] ${line.color}`}
                    initial={{ y: "108%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.8, delay: 0.25 + i * 0.11, ease: EASE }}
                  >
                    {line.text}
                  </motion.span>
                </div>
              ))}
            </div>

            {/* Body */}
            <motion.p
              className="text-stone text-lg leading-relaxed max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.6, ease: EASE }}
            >
              Bits&Bytes Kolkata is a crew of teens who don&apos;t wait to be ready.
              We run hackathons, ship products, and build the next generation of
              Indian tech talent — right here in the City of Joy.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.72, ease: EASE }}
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
            </motion.div>

            {/* Stats strip — labels in tram blue */}
            <motion.div
              className="flex flex-wrap gap-8 pt-6 border-t border-charcoal/8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.88 }}
            >
              {STATS.map((s) => (
                <div key={s.label}>
                  <p className="font-display text-charcoal text-3xl leading-none">{s.value}</p>
                  <p className="font-mono text-[0.58rem] font-bold uppercase tracking-[0.22em] text-tram mt-1.5">
                    {s.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: event slideshow */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.85, delay: 0.3, ease: EASE }}
            className="relative self-center"
          >
            {/* Tram accent at card top */}
            <div className="absolute -top-3 left-6 right-6 flex flex-col gap-[3px]">
              <div className="h-px w-full bg-terracotta/50" />
              <div className="h-px w-full bg-terracotta/25" />
            </div>

            <div className="relative rounded-2xl overflow-hidden bg-charcoal aspect-[4/5] shadow-[0_32px_80px_rgba(44,41,38,0.3)]">
              <AnimatePresence initial={false} custom={dir} mode="popLayout">
                <motion.div
                  key={slide}
                  custom={dir}
                  variants={slideV}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.55, ease: EASE }}
                  className="absolute inset-0"
                >
                  <Image
                    src={SLIDES[slide].img}
                    alt={SLIDES[slide].label}
                    fill
                    className="object-cover opacity-75"
                    sizes="460px"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/15 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="font-mono text-[0.58rem] font-bold uppercase tracking-[0.3em] text-white/45 mb-1.5">
                      {SLIDES[slide].meta}
                    </p>
                    <p className="font-display text-white text-xl leading-tight">
                      {SLIDES[slide].label}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-center gap-2 mt-4">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`rounded-full transition-all duration-300 ${
                    i === slide ? "w-6 h-1.5 bg-terracotta" : "w-1.5 h-1.5 bg-charcoal/20 hover:bg-charcoal/40"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Manifesto ────────────────────────────────────────────────────────────────

function Manifesto() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  return (
    <div ref={ref} className="bg-charcoal w-full overflow-hidden">
      <TramLines color="white" />
      <motion.div
        className="shell py-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <p
          className="font-display text-white leading-[0.9]"
          style={{ fontSize: "clamp(2rem, 5.5vw, 4.5rem)" }}
        >
          City of Joy.{" "}
          <span className="text-terracotta">City of Builders.</span>
        </p>
        <p className="text-stone mt-5 max-w-xl mx-auto text-base leading-relaxed">
          We didn&apos;t wait for someone else to build a tech community here. We just built it.
        </p>
      </motion.div>
      <TramLines color="white" />
    </div>
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

// ─── Focus Areas — numbered editorial rows ────────────────────────────────────

function FocusAreas() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.08 });

  return (
    <section ref={ref} className="bg-cream py-24 sm:py-32">
      <div className="shell">
        <motion.div initial="hidden" animate={inView ? "show" : "hidden"} variants={stagger}>
          <motion.div variants={fadeUp} className="mb-14">
            <span className="eyebrow">
              <span className="w-1.5 h-1.5 rounded-full bg-tram" />
              What We Do
            </span>
            <h2
              className="font-display text-charcoal mt-5 leading-[0.9]"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
            >
              FIVE WAYS WE BUILD.
            </h2>
          </motion.div>

          <div>
            {FOCUS.map((item, i) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                className="group grid grid-cols-[3.5rem_1fr] md:grid-cols-[5.5rem_16rem_1fr] items-start gap-x-8 gap-y-2 py-8 border-t border-charcoal/8 -mx-5 px-5 sm:-mx-8 sm:px-8 hover:bg-charcoal/[0.018] transition-colors duration-200"
              >
                {/* Number — tram blue on hover */}
                <span
                  className="font-display text-charcoal/10 group-hover:text-tram/20 select-none leading-none pt-1 transition-colors duration-300"
                  style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Title — terracotta on hover */}
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

// ─── Impact — enormous count-up numbers on charcoal ───────────────────────────

function Impact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });

  return (
    <section ref={ref} className="bg-charcoal">
      <TramLines color="white" />
      <div className="shell py-20 sm:py-28">
        <motion.div initial="hidden" animate={inView ? "show" : "hidden"} variants={stagger} className="space-y-14">
          <motion.div variants={fadeUp}>
            <span
              className="eyebrow"
              style={{ borderColor: "rgba(255,255,255,0.12)", backgroundColor: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.35)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-tram" />
              By the numbers
            </span>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/8">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                variants={fadeUp}
                transition={{ delay: i * 0.1 }}
                className="text-center sm:px-8 py-10 sm:py-0 first:pt-0 last:pb-0"
              >
                <p
                  className="font-display text-white leading-none"
                  style={{ fontSize: "clamp(4.5rem, 10vw, 9rem)" }}
                >
                  <CountUp to={s.num} suffix={s.suffix} />
                </p>
                <p className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.32em] text-tram/60 mt-5">
                  {s.label}
                </p>
                <p className="text-stone/45 text-sm mt-1">{s.sub}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      <TramLines color="white" />
    </section>
  );
}

// ─── Partners ─────────────────────────────────────────────────────────────────

function Partners() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section ref={ref} className="dim-grid py-24 sm:py-32">
      <div className="shell">
        <motion.div initial="hidden" animate={inView ? "show" : "hidden"} variants={stagger}>
          <motion.div variants={fadeUp} className="mb-12">
            <span className="eyebrow">
              <span className="w-1.5 h-1.5 rounded-full bg-terracotta" />
              Ecosystem
            </span>
            <h2
              className="font-display text-charcoal mt-5 leading-[0.9]"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
            >
              WHO BACKS US.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {PARTNERS.map((p, i) => (
              <motion.a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                variants={fadeUp}
                transition={{ delay: i * 0.08 }}
                className="group rounded-2xl border border-charcoal/10 bg-cream/80 p-7 flex flex-col gap-6 hover:border-charcoal/20 hover:bg-cream transition-all duration-300"
              >
                <div className="relative h-8 w-full">
                  <Image
                    src={p.logo}
                    alt={p.name}
                    fill
                    className="object-contain object-left grayscale group-hover:grayscale-0 transition-all duration-400"
                    sizes="280px"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-display text-xl text-charcoal leading-tight">{p.name}</p>
                    <span className="text-[0.58rem] font-mono font-bold uppercase tracking-[0.22em] text-terracotta border border-terracotta/25 rounded-full px-2 py-0.5 shrink-0 mt-0.5">
                      {p.role}
                    </span>
                  </div>
                  <p className="text-stone text-sm mt-2 leading-relaxed">{p.desc}</p>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-charcoal/35 group-hover:text-terracotta transition-colors">
                  Visit <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Voices — on terracotta ───────────────────────────────────────────────────

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

          <motion.div variants={fadeUp}>
            <span
              className="eyebrow"
              style={{ borderColor: "rgba(255,255,255,0.25)", backgroundColor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.65)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              Voices from the crew
            </span>
          </motion.div>

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
                className="font-display text-white leading-[1.08]"
                style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.75rem)" }}
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
            <span className="font-mono text-[0.62rem] font-bold text-white/35 tracking-[0.2em]">
              {String(active + 1).padStart(2, "0")} / {String(VOICES.length).padStart(2, "0")}
            </span>
            <button onClick={next} className="w-10 h-10 rounded-full border border-white/25 text-white flex items-center justify-center hover:bg-white/10 transition-colors" aria-label="Next">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 2L10 7L5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <div className="flex gap-1.5 ml-1">
              {VOICES.map((_, i) => (
                <button key={i} onClick={() => setActive(i)} aria-label={`Quote ${i + 1}`}
                  className={`rounded-full transition-all duration-300 ${i === active ? "w-5 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/30 hover:bg-white/50"}`}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
      <TramLines color="white" />
    </section>
  );
}

// ─── Join CTA — charcoal ──────────────────────────────────────────────────────

function JoinCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="bg-charcoal">
      <div className="shell py-24 sm:py-32 text-center">
        <motion.div initial="hidden" animate={inView ? "show" : "hidden"} variants={stagger} className="max-w-3xl mx-auto">

          <motion.div variants={fadeUp}>
            <span
              className="eyebrow"
              style={{ borderColor: "rgba(255,255,255,0.1)", backgroundColor: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.3)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-terracotta" />
              What are you waiting for
            </span>
          </motion.div>

          {/* CTA headline — same per-line rise as hero */}
          <div className="mt-8 flex flex-col" style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}>
            {[
              { text: "READY TO",         color: "text-white" },
              { text: "SHIP SOMETHING?",  color: "text-terracotta" },
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

          <motion.p variants={fadeUp} className="text-stone mt-8 text-lg max-w-md mx-auto leading-relaxed">
            Join the crew. We take ambitious teens with something to prove —
            background not required.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
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
          </motion.div>
        </motion.div>
      </div>
      <TramLines color="white" />
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
    </>
  );
}
