# Project Notes — Bits&Bytes Kolkata Website

> Everything the user gave, decided, or confirmed. What was asked, what came back, what was inferred.
> Does NOT document implementation — only information flow.

---

## Who the user is

- **Shoryavardhaan Gupta** (goes by Shorya)
- **Email:** shoryavardhaans2@gmail.com
- The user IS the fork lead of Bits&Bytes Kolkata — this is their own organization's website
- Teen builder, high-agency, direct communication style

---

## Organization identity

- **Official full name:** Bits&Bytes Kolkata (always use this in full — user explicitly asked for "Bits&Bytes" wherever possible, never abbreviate to B&B or similar)
- **Type:** Teen-led code club; a fork of the parent Bits&Bytes organization
- **Location:** Kolkata, West Bengal, India
- **Tagline (user confirmed):** "City of Joy. City of Builders."
- **Email:** kolkata@gobitsnbytes.org
- **GitHub:** https://github.com/gobitsnbytes-kol
- **LinkedIn:** https://www.linkedin.com/company/gobitsbytes
- **Instagram:** https://www.instagram.com/gobitsnbytes.kolkata

---

## What the user told me about the existing codebase

- The existing site was a fork of a large parent Bits&Bytes org site that had backend features (Supabase, Radix, Shadcn, etc.) built for a full platform
- For the Kolkata fork, it's only needed as a **landing page** — all forms are off-site (Notion), no backend is used at all
- The heavy dependencies (Supabase, Radix, Shadcn, Three.js, WebGL) are plugged in but unused — purely inherited from the parent fork
- The existing site CSS was broken internally (wrong color tokens referenced in components)
- User explicitly said the codebase was overcomplicated for a landing page and wanted it simplified

---

## Decisions the user made

### Architecture
- **Build fresh** in a `new-site/` subdirectory inside the existing repo (not modify existing site)
- Reason given: easier to reference/copy assets, keep things clean, can run separately
- **Stack approved:** Next.js + Tailwind CSS + Framer Motion only — no heavy deps
- No backend, no Supabase, no Radix, no Shadcn, no Three.js, no WebGL

### Pages & scope
- **Pages to include:** Home, About, Events, Join, CoC, Contact
- **Redirect routes:** /fork and /join-cohort (pointing to Notion)
- **Impact section:** merged into the homepage (not a separate page)
- **Contact page:** email + socials only — NO contact form

### Design direction
- User initially asked for a wireframe first, approved it, then said go ahead and oneshot
- After seeing the first result: *"looks like a template based website all this design features that u mentioned not even all are visible... genuinely make a new website design concept with the kolkata based color palette"*
- User wanted Kolkata-specific design — not generic SaaS template feel
- Wanted real Kolkata motifs: tram lines, terracotta palette, editorial typography, animations

### Team / leadership order (explicitly specified)
1. Shoryavardhaan Gupta (Shorya) — Kolkata Fork Lead
2. Akshat Kushwaha — Co-Founder & Technical Lead
3. Yash Singh — Co-Founder & Organisation Lead
4. Aadrika Maurya — Co-Founder & Chief Creative Strategist
5. Devaansh Pathak — Founding Member & Backend Lead
6. Maryam Fatima — Social Media & Promotions Head
7. Sristhi Singh — Operations & Communications Head

---

## URLs and links given by the user (or confirmed from existing code)

| Purpose | URL |
|---|---|
| Apply to join form | https://gusty-servant-a11.notion.site/352d1148777a808ebd28f77a7875a0e6?pvs=105 |
| Join community | https://gusty-servant-a11.notion.site/357d1148777a8007af72ee9b4a54546a?pvs=105 |
| /fork redirect | https://perfect-dinghy-781.notion.site/33b49ed2fc3380f89ce2e43855c982db |
| /join-cohort redirect | https://perfect-dinghy-781.notion.site/33a49ed2fc33800984e7c28ca3d7cd2a?pvs=105 |
| GitHub | https://github.com/gobitsnbytes-kol |
| LinkedIn | https://www.linkedin.com/company/gobitsbytes |
| Instagram | https://www.instagram.com/gobitsnbytes.kolkata |
| ByteForge site | https://byteforge.paxus.in/ |

---

## Events info (given via existing codebase / confirmed)

| Event | Date | Location | Type |
|---|---|---|---|
| India Innovates 2026 | Mar 28, 2026 | New Delhi | Summit |
| Lucknow Build Guild | Apr 19, 2026 | SureStay Best Western, Lucknow | Workshop |
| GitHub Copilot Dev Day | 2025 | Kolkata | Developer Event |
| Execron 1.0 | 2025 | IIT Kanpur | Hackathon |
| ByteForge | 2025 | Kolkata | Build Night |

- India Innovates coverage: New Delhi Times, Tribune India, Daily Excelsior
- Copilot Dev Day: Maryam's campaign got 10k+ impressions

---

## Partners (from existing codebase)

| Partner | Role | URL |
|---|---|---|
| osmAPI | API Partner | https://www.osmapi.com/ |
| YRI Fellowship | Knowledge Partner | https://www.yriscience.com/ |
| z.ai | AI Partner | https://chat.z.ai/ |

---

## Stats given (user confirmed from existing site)

- **1500+** active members across India
- **130+** projects shipped
- **100+** partner schools

---

## Design palette (confirmed by user)

| Token | Hex | Notes |
|---|---|---|
| Cream | #FAF7EF | Primary background |
| Terracotta | #C5312E | Primary accent, CTAs |
| Tram Blue | #1A4B8C | Secondary accent |
| Charcoal | #2C2926 | Dark sections, text |
| Stone | #5C554F | Body text (darkened from original #8A8178 which failed WCAG AA) |
| Cream Dim | #F0E8D5 | Muted background sections |

---

## What was asked and what came back

**Q: Would it be great to make a new site from scratch?**
A (user): "i think so sounds good but won't it be great if u made ur own site from scratch?"
→ Confirmed yes, build fresh

**Q: Use a better stack?**
A (user): "u could use a better stack like node then shadcn, bro we honestly don't even need those... mostly a frontend site all forms are either off site... why we don't even have to overcomplicate this design man"
→ Confirmed: lean stack, no heavy deps

**Q: Impact page + contact scope**
A (user): "i would say let's make impact page in the homepage only and let's go with b just show socials and emails"

**Q: Where to build?**
A (user): "i think u can go on and oneshot i would say make a dir a new-site in here only build in that run everything there this way it will be easier for u to move copy files reference stuff etc"

**Q: After seeing first build?**
A (user): "looks like a template based website all this design features that u mentioned not even all are visible check for those and any issues etc color contrast and stuff and genuinely make a new website design concept with the kolkata based color palette"

**Q: Brand name convention?**
A (user): "prefer using full Bits&Bytes wherever possible as that's the official brand specially in footer and other similar places"

**Q: Team order in leadership?**
A (user): "in leadership section keep shorya then akshat then yash then everyone else"

---

## What was inferred (not explicitly stated)

- User IS Shoryavardhaan Gupta based on context (they asked to put "shorya" first and the GitHub avatar URL used in the team array points to their account)
- "Kolkata design" meant editorial/print-inspired with tram track motifs, not just applying the color palette to the same template layout
- The `dot-grid` and tram lines in the original concept were too subtle to read as intentional design — the user's "not visible" comment confirmed this
- Color contrast failure on `stone` (#8A8178) was discovered via calculation, not user-reported — but user's "color contrast" mention suggests they noticed readability issues
- The parent Bits&Bytes org site is at gobitsnbytes.org; the Kolkata fork is a city fork
- "Everyone else" in team order means Aadrika, Devaansh, Maryam, Sristhi (no further ordering preference was given, left as-was)
