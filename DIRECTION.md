# Bits&Bytes Kolkata — redesign direction

## Story (three passes)
- **About:** Kolkata had no real platform for teen builders, so a crew of teens forked one. Old city, new code.
- **Tension:** heritage city vs. teens who ship at 2am. Journey: provocation → proof → invitation → backing.
- **Climax:** the pivot *City of Joy → City of Builders* — the page goes from day to night, and the city's
  painted signage turns into LED dot-light (Chandannagar). The page's biggest visual event.
- **Numbers that must move:** 1500+ builders · 48-hour build nights · 5 ways · 3+ flagship events · ₹0 to join · 2 tracks.

## Visual world — "Signboard City"
- **Dominant metaphor:** Kolkata's street objects become the builder's interface.
  Hand-painted signboard = section header · tram/bus livery band = marquee rail · departure board = events ·
  tram ticket = join pass · taxi meter = stat counter · enamel street plate = footer address · Howrah truss = line geometry.
- **Palette story:** DAY (paper cream, sindoor, taxi yellow) for the hook → NIGHT (ink + LED violet/magenta/yellow)
  for what we do & events → back to paper for joining and backing. Day/night = the build night.
- **Motion personality:** weighty & physical — things are *painted on*, *flipped*, *stamped*, *punched*.
  `expo.out` arrivals, `back.out` for stickers/stamps, hard offset shadows that press on hover. No float-y fades.
- **Recurring motif:** the **route line** — a sindoor tram route with stops that runs the whole page
  (fixed rail on desktop), lighting each stop as you pass; it forks into two tracks at Join.

## Reference DNA used
AYA (framed page, flyer slabs) · Readymag London (city-name hero, rotated sticker stack) · OFFF (colour-block nav) ·
neobrutalism (ink borders, hard shadows) · Junction (mono stat ticker) · ETHIndia (bilingual script mix, graph paper) ·
Calcutta signboards (shaded caps, Bangla+Latin tiers) · bus/tram liveries (band rail) · Chandannagar (dot-light) ·
React Bits scroll-velocity & scroll-stack · Aceternity tracing beam (route line).

## System
- Type: **Big Shoulders Display** (signage caps) · **Fraunces** italic (Ray-ish editorial moments) ·
  **Instrument Sans** (body) · **Space Mono** (tickets/meters/labels) · **Galada** (painted Bangla) · **Hind Siliguri** (small Bangla).
- Colour: paper `#F3EAD3` · rice `#FBF7EE` · ink `#141414` · sindoor `#D7261E` · taxi `#F2B705` · tram `#3E8EDE` ·
  ganga `#1F6F6B` · marigold `#F28C28` · night `#0B0B12` · led-violet `#7B2CFF` · led-magenta `#FF2E88`.
- Stack: vanilla HTML/CSS/JS · GSAP + ScrollTrigger + SplitText · Lenis · Canvas (dot-light) · SVG (truss, route) ·
  split-flap board reused from `2d-assets-anim/split-flap.html`.
- Logo: the club's own mark (`assets/logo-mark.png`, cropped from their `logo-kolkata.png`) — nav, favicon, loader, About seal, footer.

## Structure (mirrors the live site's routes)
- `/` home (hero → livery → claim pivot → five ways → voice → sponsor → CTA) · `/about` (story + crew) ·
  `/events` (departures board) · `/join` (two tickets + FAQ) · `/contact` (LED "say hello" + channels) · 404.
- `index.html` is the shell (nav, rail, next-stop bar, footer); pages are fragments in `pages/`,
  swapped by `js/router.js` (History API, clean URLs). Transition = tram destination blind.
- Clean URLs need a rewrite to `index.html`: `serve.json` locally (`npx serve -l 5190 .`), `vercel.json` on Vercel.
- Bangla used (tumi form): কলকাতা, আনন্দের শহর, কারিগর, বানাও, চলো, আড্ডা, হাতে-কলমে.
