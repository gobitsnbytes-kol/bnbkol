"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

// TODO: Add events here as they happen. Each event follows this shape:
//
// {
//   id: "event-slug",
//   title: "Event Name",
//   subtitle: "One-line descriptor",
//   date: "MMM DD, YYYY",
//   location: "Venue, City",
//   status: "Upcoming" | "Archived",
//   type: "Hackathon" | "Workshop" | "Build Night" | "Developer Event" | "Summit",
//   cover: "/event_pictures/cover.jpg",
//   gallery: ["/event_pictures/1.jpg", "/event_pictures/2.jpg"],
//   description: "What happened, who was there, why it mattered.",
//   links: [{ label: "site.com", href: "https://..." }],
// },
//
// Then render with <EventCard /> (see git history for the full component)
// and re-enable the filter tabs + list below.
const EVENTS: typeof SAMPLE_EVENTS = [];

const SAMPLE_EVENTS = [
  // {
  //   id: "sample-event",
  //   title: "Sample Event",
  //   subtitle: "Example card — uncomment to use",
  //   date: "TBD",
  //   location: "Kolkata",
  //   status: "Upcoming",
  //   type: "Build Night",
  //   cover: "/event_pictures/cover.jpg",
  //   gallery: [],
  //   description: "Description goes here.",
  //   links: [],
  // },
] as const;

export default function EventsPage() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <>
      {/* Hero */}
      <section className="relative bg-cream overflow-hidden pt-32 pb-20">
        <div className="shell">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          >
            <p className="text-[0.58rem] font-mono font-bold tracking-[0.42em] uppercase text-stone/50 mb-5">
              Events
            </p>
            <h1
              className="font-display text-charcoal leading-[0.88] tracking-[-0.02em]"
              style={{ fontSize: "clamp(4rem, 9vw, 7.5rem)" }}
            >
              WHERE CODE MEETS<br />
              <span className="text-terracotta">EVERY BOUNDARY.</span>
            </h1>
            <p className="text-stone text-xl mt-7 max-w-2xl leading-relaxed">
              Hackathons, summits, workshops, and build nights — the events that shape
              Kolkata&apos;s next generation of builders.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="tram" />

      {/* Events list / empty state */}
      <section className="shell py-16 sm:py-24" ref={ref}>
        {EVENTS.length > 0 ? (
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="space-y-4"
          >
            {/* TODO: Re-enable EventCard rendering when events exist.
                See SAMPLE_EVENTS above and git history for the EventCard component. */}
            {/*
            {EVENTS.map((event) => (
              <motion.div key={event.id} variants={fadeUp}>
                <EventCard event={event} />
              </motion.div>
            ))}
            */}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="flex flex-col items-center justify-center text-center py-24 sm:py-32"
          >
            <span
              className="font-display text-charcoal/[0.06] leading-none select-none pointer-events-none mb-8"
              style={{ fontSize: "clamp(8rem, 22vw, 18rem)" }}
              aria-hidden
            >
              01
            </span>
            <p className="text-[0.58rem] font-mono font-bold tracking-[0.42em] uppercase text-stone/50 mb-5">
              No events yet
            </p>
            <h2
              className="font-display text-charcoal leading-[0.9] mb-5"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
            >
              WE&apos;RE COOKING<br />
              <span className="text-terracotta">SOMETHING HERE.</span>
            </h2>
            <p className="text-stone text-base mt-2 max-w-md leading-relaxed">
              No events lined up right now. We&apos;re heads-down planning the next one —
              check back soon, or get notified by joining the community.
            </p>
            <a
              href="https://gusty-servant-a11.notion.site/357d1148777a8007af72ee9b4a54546a?pvs=105"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 bg-terracotta text-white font-bold text-sm px-7 py-4 rounded-full hover:bg-terracotta-deep active:scale-[0.98] transition-all duration-200"
            >
              Join the community <ArrowUpRight className="w-4 h-4" />
            </a>
          </motion.div>
        )}
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
