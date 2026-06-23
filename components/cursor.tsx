"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// Rotation: heavy spring = inertia + slight overshoot (bounce) when settling
const ROT_SPRING   = { stiffness: 48, damping: 16, mass: 1.1 };
// Scale: snappy spring for squish/stretch response
const SCALE_SPRING = { stiffness: 320, damping: 28 };

export function Cursor() {
  const [mounted,  setMounted]  = useState(false);
  const [visible,  setVisible]  = useState(false);
  const [hovered,  setHovered]  = useState(false);
  const [clicking, setClicking] = useState(false);

  // Position — exact follow (no spring), cursor stays sharp and responsive
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);

  // Rotation — spring so it lags and overshoots direction changes
  // 90° = tip points down = gravity resting state
  const rot = useSpring(90 as number, ROT_SPRING);

  // Squish/stretch — applied in local rotated space (stretches along travel direction)
  const scX = useSpring(1, SCALE_SPRING);
  const scY = useSpring(1, SCALE_SPRING);

  const prev  = useRef({ x: -400, y: -400 });
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    setMounted(true);
    document.documentElement.classList.add("custom-cursor");

    const settle = () => {
      rot.set(90);   // gravity: droop down
      scX.set(1);
      scY.set(1);
    };

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);

      const dx = e.clientX - prev.current.x;
      const dy = e.clientY - prev.current.y;
      const speed = Math.sqrt(dx * dx + dy * dy);

      if (speed > 1.5) {
        // Point in direction of travel
        rot.set(Math.atan2(dy, dx) * (180 / Math.PI));

        // Stretch forward, squish sideways — like a water drop accelerating
        const stretch = Math.min(1 + speed * 0.028, 1.55);
        scX.set(stretch);
        scY.set(Math.max(0.6, 1 / stretch));

        clearTimeout(timer.current);
        // After movement stops, gravity pulls it back down
        timer.current = setTimeout(settle, 480);
      }

      prev.current = { x: e.clientX, y: e.clientY };
    };

    const onOver = (e: MouseEvent) => {
      if ((e.target as Element).closest("a, button, [role='button'], input, textarea, select, label")) {
        setHovered(true);
      }
    };
    const onOut = (e: MouseEvent) => {
      if ((e.target as Element).closest("a, button, [role='button'], input, textarea, select, label")) {
        setHovered(false);
      }
    };
    const onDown = () => {
      setClicking(true);
      scX.set(0.68);
      scY.set(0.68);
    };
    const onUp = () => {
      setClicking(false);
      scX.set(1);
      scY.set(1);
    };
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove",  onMove);
    document.addEventListener("mouseover",   onOver);
    document.addEventListener("mouseout",    onOut);
    document.addEventListener("mousedown",   onDown);
    document.addEventListener("mouseup",     onUp);
    document.addEventListener("mouseleave",  onLeave);
    document.addEventListener("mouseenter",  onEnter);

    return () => {
      document.documentElement.classList.remove("custom-cursor");
      window.removeEventListener("mousemove",  onMove);
      document.removeEventListener("mouseover",   onOver);
      document.removeEventListener("mouseout",    onOut);
      document.removeEventListener("mousedown",   onDown);
      document.removeEventListener("mouseup",     onUp);
      document.removeEventListener("mouseleave",  onLeave);
      document.removeEventListener("mouseenter",  onEnter);
    };
  }, [x, y, rot, scX, scY]);

  if (!mounted) return null;

  return (
    // Outer div: position + rotation (rotation axis = center of shape)
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none"
      style={{
        x,
        y,
        translateX: "-50%",
        translateY: "-50%",
        rotate: rot,
        opacity: visible ? 1 : 0,
        transition: "opacity 0.2s",
      }}
    >
      {/*
        Inner div: squish/stretch in local (already-rotated) space.
        scaleX here stretches ALONG the direction the cursor is pointing.
      */}
      <motion.div style={{ scaleX: scX, scaleY: scY }}>
        <svg
          width="30"
          height="24"
          viewBox="0 0 30 24"
          fill="none"
          style={{ display: "block", filter: "drop-shadow(0 0 2px rgba(44,41,38,0.18)) blur(0.5px)" }}
        >
          {/*
            Rounded triangle pointing RIGHT at 0°.
            Tip curves at (24,12), left corners rounded with Q beziers.
            Symmetric about y=12 so rotation looks natural in every direction.
            White fill + stroke outline = visible on both cream and charcoal sections.
          */}
          <path
            d="M8 5 L21 10.5 C25.5 11,25.5 13,21 13.5 L8 19 Q5 19,5 16 L5 8 Q5 5,8 5Z"
            fill={clicking ? "rgba(255,240,240,0.92)" : "rgba(255,255,255,0.96)"}
            stroke={hovered ? "#C5312E" : "#2C2926"}
            strokeWidth="1.4"
            strokeLinejoin="round"
            style={{ transition: "fill 0.18s, stroke 0.18s" }}
          />
        </svg>
      </motion.div>
    </motion.div>
  );
}
