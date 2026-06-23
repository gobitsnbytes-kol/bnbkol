"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/events", label: "Events" },
  { href: "/join", label: "Join" },
];

const JOIN_URL = "https://gusty-servant-a11.notion.site/357d1148777a8007af72ee9b4a54546a?pvs=105";

export function Nav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [pathname]);

  return (
    <header
      className={cn(
        "fixed z-50 top-5",
        "left-4 right-4 md:left-1/2 md:right-auto md:w-auto md:-translate-x-1/2",
        "transition-all duration-300 ease-out",
        isOpen ? "rounded-2xl" : "rounded-full",
        "border border-charcoal/10 bg-white/92 backdrop-blur-xl",
        scrolled ? "shadow-lg shadow-charcoal/8" : "shadow-md shadow-charcoal/5"
      )}
      style={{ WebkitBackdropFilter: "blur(20px)" }}
    >
      <div className="flex items-center gap-5 px-3 py-2 md:px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0" aria-label="Bits&Bytes Kolkata">
          <div className="w-7 h-7 rounded-md overflow-hidden bg-white flex items-center justify-center border border-charcoal/10">
            <Image src="/logo-kolkata.png" alt="" width={22} height={22} className="object-contain" />
          </div>
          <span className="hidden sm:block font-mono text-[0.62rem] font-bold tracking-[0.18em] uppercase text-charcoal/60">
            Bits&Bytes Kolkata
          </span>
        </Link>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-3 py-1.5 text-sm font-medium rounded-full transition-colors duration-200",
                  active
                    ? "text-charcoal bg-charcoal/6"
                    : "text-stone hover:text-charcoal hover:bg-charcoal/4"
                )}
              >
                {link.label}
                {active && (
                  <motion.span
                    layoutId="nav-dot"
                    className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-tram"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <a
          href={JOIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-1.5 bg-terracotta text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-terracotta-deep active:scale-95 transition-all duration-200"
        >
          Join Now
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden w-8 h-8 flex items-center justify-center text-stone hover:text-charcoal rounded-full hover:bg-charcoal/5 transition-colors ml-auto"
          onClick={() => setIsOpen((v) => !v)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X className="w-4.5 h-4.5" /> : <Menu className="w-4.5 h-4.5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden"
          >
            <nav className="flex flex-col px-3 pb-4 gap-1" aria-label="Mobile navigation">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-4 py-2.5 rounded-xl text-base font-medium transition-colors",
                    pathname === link.href
                      ? "text-charcoal bg-charcoal/6"
                      : "text-stone hover:text-charcoal hover:bg-charcoal/4"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={JOIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex items-center justify-center gap-2 bg-terracotta text-white font-bold py-3 rounded-xl text-sm"
              >
                Join Now <ArrowUpRight className="w-4 h-4" />
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
