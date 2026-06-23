"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Calendar, MapPin, ExternalLink, ArrowUpRight } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

const EVENTS = [
  {
    id: "india-innovates",
    title: "India Innovates 2026",
    subtitle: "National Youth Innovation Summit",
    date: "Mar 28, 2026",
    location: "New Delhi",
    status: "Archived",
    type: "Summit",
    cover: "/event_pictures/HEe923uagAATqvy.jpg",
    gallery: [
      "/event_pictures/HEe923uagAATqvy.jpg",
      "/event_pictures/HEe923ub0AE-92F.jpg",
      "/event_pictures/HEe93oOakAAi2Mi.jpg",
    ],
    description:
      "We represented Kolkata at India Innovates 2026 — a national stage where student innovators from across the country pitched products, competed in hackathon formats, and engaged with policymakers. Our team ranked in the top tier and gained national press coverage.",
    links: [
      { label: "indiainnovates.org", href: "https://indiainnovates.org" },
      { label: "New Delhi Times", href: "https://www.newdelhitimes.com/delhi-cm-rekha-gupta-attends-india-innovates-2026-hackathon-highlights-youth-driven-innovation/" },
      { label: "Tribune India", href: "https://www.tribuneindia.com/news/j-k/ju-team-among-top-15-at-india-innovates-2026/" },
      { label: "Daily Excelsior", href: "https://www.dailyexcelsior.com/ju-students-outshine-at-india-innovates-2026/" },
    ],
  },
  {
    id: "lucknow-build",
    title: "Lucknow Build Guild",
    subtitle: "Free Hardware Workshop & Meetup",
    date: "Apr 19, 2026",
    location: "SureStay Best Western, Lucknow",
    status: "Archived",
    type: "Workshop",
    cover: "/event_pictures/devday.jpeg",
    gallery: [
      "/event_pictures/devday.jpeg",
      "/event_pictures/devday2.jpeg",
      "/event_pictures/devday3.jpeg",
      "/event_pictures/devday4.jpeg",
      "/event_pictures/founder-s.jpeg",
    ],
    description:
      "A free hardware workshop and builder meetup in Lucknow. Participants explored hands-on hardware projects, connected with local tech enthusiasts, and spent a day doing peer-led open building sessions.",
    links: [],
  },
  {
    id: "copilot",
    title: "GitHub Copilot Dev Day",
    subtitle: "AI-Assisted Coding Event",
    date: "2025",
    location: "Kolkata",
    status: "Archived",
    type: "Developer Event",
    cover: "/images/copilot-dev-day.png",
    gallery: ["/images/copilot-dev-day.png", "/images/copilot-dev-day-big.png"],
    description:
      "We organized and hosted the GitHub Copilot Dev Day for Kolkata — bringing together student developers to explore AI-assisted coding workflows. Maryam's campaign generated 10k+ impressions for the event.",
    links: [],
  },
  {
    id: "execron",
    title: "Execron 1.0",
    subtitle: "AI Hackathon · IIT Kanpur",
    date: "2025",
    location: "IIT Kanpur",
    status: "Archived",
    type: "Hackathon",
    cover: "/images/github-copilot-hero-desktop.png",
    gallery: ["/images/github-copilot-hero-desktop.png"],
    description:
      "Our members participated in Execron 1.0, an AI-focused hackathon at IIT Kanpur. The event challenged teams to build working AI products under time pressure — real engineering, real stakes.",
    links: [],
  },
  {
    id: "byteforge",
    title: "ByteForge",
    subtitle: "Build Night · Kolkata",
    date: "2025",
    location: "Kolkata",
    status: "Archived",
    type: "Build Night",
    cover: "/event_pictures/byteforge1.webp",
    gallery: [
      "/event_pictures/byteforge1.webp",
      "/event_pictures/byteforge2.webp",
      "/event_pictures/byteforge3.webp",
      "/event_pictures/byteforge4.webp",
      "/event_pictures/byteforge5.webp",
    ],
    description:
      "ByteForge was our flagship build night — an intense multi-day session where teams shipped real projects from scratch. Every team that walked in walked out with something deployed.",
    links: [{ label: "byteforge.paxus.in", href: "https://byteforge.paxus.in/" }],
  },
];

const ALL_TYPES = ["All", "Summit", "Workshop", "Developer Event", "Hackathon", "Build Night"];

function Gallery({ images }: { images: string[] }) {
  const [active, setActive] = useState(0);
  if (images.length === 0) return null;
  return (
    <div className="space-y-3">
      <div className="relative aspect-video rounded-xl overflow-hidden bg-cream-dim">
        <Image
          src={images[active]}
          alt="Event photo"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 60vw"
        />
      </div>
      {images.length > 1 && (
        <div className="flex gap-2 flex-wrap">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`relative w-14 h-10 rounded-lg overflow-hidden border-2 transition-all ${
                i === active ? "border-terracotta" : "border-transparent opacity-50 hover:opacity-80"
              }`}
            >
              <Image src={img} alt="" fill className="object-cover" sizes="56px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function EventCard({ event, expanded, onToggle }: {
  event: typeof EVENTS[0];
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div className={`rounded-[var(--radius-card)] border transition-all duration-300 overflow-hidden bg-white ${
      expanded ? "border-terracotta/30 shadow-[0_12px_48px_rgba(197,49,46,0.1)]" : "border-charcoal/8 hover:border-charcoal/15"
    }`}>
      {/* Header row — always visible */}
      <button
        className="w-full flex items-start gap-5 p-6 sm:p-7 text-left"
        onClick={onToggle}
        aria-expanded={expanded}
      >
        {/* Thumbnail */}
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden flex-shrink-0 bg-cream-dim">
          <Image src={event.cover} alt={event.title} fill className="object-cover" sizes="80px" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-[0.6rem] font-mono font-bold uppercase tracking-[0.25em] text-terracotta border border-terracotta/25 rounded-full px-2.5 py-0.5">
              {event.type}
            </span>
            <span className="text-[0.6rem] font-mono uppercase tracking-[0.2em] text-stone/60 border border-charcoal/10 rounded-full px-2.5 py-0.5">
              {event.status}
            </span>
          </div>
          <h3 className="font-display text-xl sm:text-2xl text-charcoal leading-tight">{event.title}</h3>
          <p className="text-stone text-sm mt-1">{event.subtitle}</p>
          <div className="flex flex-wrap gap-4 mt-3">
            <span className="flex items-center gap-1.5 text-xs text-stone/70">
              <Calendar className="w-3.5 h-3.5 text-terracotta" />{event.date}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-stone/70">
              <MapPin className="w-3.5 h-3.5 text-terracotta" />{event.location}
            </span>
          </div>
        </div>

        <div className={`flex-shrink-0 w-8 h-8 rounded-full border border-charcoal/12 flex items-center justify-center text-stone transition-transform duration-300 ${expanded ? "rotate-45 border-terracotta/30 text-terracotta" : ""}`}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 2V12M2 7H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
      </button>

      {/* Expanded detail */}
      <motion.div
        initial={false}
        animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        className="overflow-hidden"
      >
        <div className="border-t border-charcoal/8 px-6 sm:px-7 py-7 grid md:grid-cols-[1fr_340px] gap-8">
          <div className="space-y-5">
            <p className="text-stone leading-relaxed">{event.description}</p>
            {event.links.length > 0 && (
              <div className="space-y-2">
                <p className="text-[0.62rem] font-mono font-bold uppercase tracking-[0.25em] text-stone/50">Links</p>
                <div className="flex flex-wrap gap-2">
                  {event.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-charcoal/70 border border-charcoal/12 rounded-full px-3 py-1.5 hover:border-terracotta/40 hover:text-terracotta transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
          <Gallery images={event.gallery} />
        </div>
      </motion.div>
    </div>
  );
}

export default function EventsPage() {
  const [filter, setFilter] = useState("All");
  const [expanded, setExpanded] = useState<string | null>(EVENTS[0].id);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  const filtered = filter === "All" ? EVENTS : EVENTS.filter((e) => e.type === filter);

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
              <span className="w-1.5 h-1.5 rounded-full bg-terracotta animate-pulse" />
              Events
            </span>
            <h1
              className="font-display text-charcoal mt-6 leading-[0.92] tracking-[-0.02em]"
              style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)" }}
            >
              WHERE CODE MEETS<br />
              <span className="text-terracotta">EVERY BOUNDARY.</span>
            </h1>
            <p className="text-stone text-xl mt-6 max-w-2xl leading-relaxed">
              Hackathons, summits, workshops, and build nights — the events that shaped
              Kolkata&apos;s next generation of builders.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="tram" />

      {/* Events list */}
      <section className="shell py-16 sm:py-24" ref={ref}>
        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap gap-2 mb-10"
          role="tablist"
        >
          {ALL_TYPES.map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              role="tab"
              aria-selected={filter === type}
              className={`text-xs font-mono font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full border transition-all duration-200 ${
                filter === type
                  ? "bg-terracotta text-white border-terracotta"
                  : "border-charcoal/12 text-stone hover:border-charcoal/25 hover:text-charcoal"
              }`}
            >
              {type}
            </button>
          ))}
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="space-y-4"
        >
          {filtered.map((event) => (
            <motion.div key={event.id} variants={fadeUp}>
              <EventCard
                event={event}
                expanded={expanded === event.id}
                onToggle={() => setExpanded(expanded === event.id ? null : event.id)}
              />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA */}
      <div className="tram" />
      <section className="shell py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-display text-charcoal" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)" }}>
            Want to run the next event?
          </p>
          <p className="text-stone mt-3 max-w-sm mx-auto text-sm">
            We&apos;re always looking for hosts, organizers, and mentors who want to build with us.
          </p>
          <a
            href="mailto:kolkata@gobitsnbytes.org"
            className="mt-6 inline-flex items-center gap-2 bg-charcoal text-white font-bold text-sm px-7 py-4 rounded-full hover:bg-ink transition-colors"
          >
            Get in touch <ArrowUpRight className="w-4 h-4" />
          </a>
        </motion.div>
      </section>
    </>
  );
}
