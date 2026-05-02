import { useState, useEffect, useRef } from "react";

// ══════════════════════════════════════════════════════
// EXAMNEST — ULTRA SMOOTH CINEMATIC INTRO
// File: src/CinematicIntro.jsx
// ══════════════════════════════════════════════════════

export const cinematicCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=DM+Sans:wght@300;400;500&display=swap');

  /* ── SMOOTH CINEMATIC KEYFRAMES ── */

  @keyframes ci-fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes ci-fadeOut {
    from { opacity: 1; }
    to   { opacity: 0; }
  }
  @keyframes ci-slideUpFade {
    from { opacity: 0; transform: translateY(32px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes ci-scaleUpFade {
    from { opacity: 0; transform: scale(0.75); filter: blur(8px); }
    to   { opacity: 1; transform: scale(1);    filter: blur(0);   }
  }
  @keyframes ci-letterSpread {
    from { opacity: 0; letter-spacing: 1.2em; filter: blur(10px); }
    to   { opacity: 1; letter-spacing: 0.22em; filter: blur(0);   }
  }
  @keyframes ci-lineGrow {
    from { transform: scaleX(0); opacity: 0; }
    to   { transform: scaleX(1); opacity: 1; }
  }
  @keyframes ci-glowBreath {
    0%,100% { filter: drop-shadow(0 0 18px rgba(201,168,76,0.35)); }
    50%      { filter: drop-shadow(0 0 55px rgba(201,168,76,0.85)) drop-shadow(0 0 90px rgba(201,168,76,0.25)); }
  }
  @keyframes ci-goldShimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  @keyframes ci-orbPulse {
    0%,100% { transform: translate(-50%,-50%) scale(1);   opacity: 0.13; }
    50%      { transform: translate(-50%,-50%) scale(1.18); opacity: 0.22; }
  }
  @keyframes ci-ringExpand {
    0%   { transform: translate(-50%,-50%) scale(0.2); opacity: 0.7; }
    100% { transform: translate(-50%,-50%) scale(6);   opacity: 0;   }
  }
  @keyframes ci-particle {
    0%   { opacity: 0;   transform: translateY(0)      translateX(0)          rotate(0deg);   }
    12%  { opacity: 0.9; }
    85%  { opacity: 0.4; }
    100% { opacity: 0;   transform: translateY(-105vh) translateX(var(--px))  rotate(var(--pr)); }
  }
  @keyframes ci-scanline {
    0%   { top: -3%; }
    100% { top: 103%; }
  }
  @keyframes ci-bootLine {
    from { opacity: 0; transform: translateX(-8px); }
    to   { opacity: 1; transform: translateX(0);    }
  }
  @keyframes ci-blink {
    0%,100% { opacity: 1; }
    50%      { opacity: 0; }
  }
  @keyframes ci-progressBar {
    from { width: 0%; }
    to   { width: 100%; }
  }
  @keyframes ci-portalExpand {
    from { transform: translate(-50%,-50%) scale(0); border-radius: 50%; opacity: 1; }
    to   { transform: translate(-50%,-50%) scale(60); border-radius: 50%; opacity: 1; }
  }
  @keyframes ci-flash {
    0%   { opacity: 0;   }
    25%  { opacity: 0.55; }
    100% { opacity: 0;   }
  }
  @keyframes ci-rotateSlow {
    from { transform: translate(-50%,-50%) rotate(0deg);   }
    to   { transform: translate(-50%,-50%) rotate(360deg); }
  }
  @keyframes ci-tagReveal {
    from { opacity: 0; transform: translateY(14px); filter: blur(5px); }
    to   { opacity: 1; transform: translateY(0);    filter: blur(0);   }
  }
  @keyframes ci-statPop {
    0%   { opacity: 0; transform: scale(0.5) rotate(-6deg); }
    70%  { transform: scale(1.08) rotate(1deg); }
    100% { opacity: 1; transform: scale(1) rotate(0deg); }
  }
  @keyframes ci-appFadeIn {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0);    }
  }
  @keyframes ci-flicker {
    0%,88%,92%,100% { opacity: 1;   }
    89%,91%          { opacity: 0.2; }
  }
`;

// ── Particle ──────────────────────────────────────────
function Particle({ index }) {
  const px = ((Math.random() - 0.5) * 280) + "px";
  const pr = (Math.random() * 540 - 270) + "deg";
  const delay = Math.random() * 6;
  const dur   = 6 + Math.random() * 8;
  const size  = 1.5 + Math.random() * 3.5;
  const left  = Math.random() * 100;
  const palette = ["#c9a84c","#e8c97e","#fff","rgba(201,168,76,0.6)","rgba(99,102,241,0.7)","rgba(16,185,129,0.6)"];
  const color = palette[Math.floor(Math.random() * palette.length)];
  return (
    <div style={{
      position: "absolute", left: left + "%", bottom: "-8px",
      width: size + "px", height: size + "px",
      borderRadius: "50%", background: color,
      "--px": px, "--pr": pr,
      animation: `ci-particle ${dur}s ease-in infinite ${delay}s`,
      boxShadow: `0 0 ${size * 2}px ${color}`,
      pointerEvents: "none",
    }} />
  );
}

// ── Phase 1: Boot Screen ──────────────────────────────
const BOOT_LINES = [
  { text: "EXAMNEST SYSTEM v5.0  —  BOOT SEQUENCE", color: "#22c55e", bold: true,  delay: 0    },
  { text: "[ ██████████████████ ] Core modules loaded",    color: "#475569",           delay: 280  },
  { text: "[ OK ] Exam database — 80+ exams indexed",     color: "#64748b",           delay: 620  },
  { text: "[ OK ] AI ExamBot — neural engine ONLINE",     color: "#6366f1",           delay: 940  },
  { text: "[ OK ] Study Planner — INITIALIZED",           color: "#f97316",           delay: 1180 },
  { text: "[ OK ] Compare Engine — ACTIVE",               color: "#ec4899",           delay: 1380 },
  { text: "[ OK ] Dark Mode — READY",                     color: "#7c3aed",           delay: 1560 },
  { text: "[ OK ] localStorage sync — CONNECTED",         color: "#14b8a6",           delay: 1720 },
  { text: "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",     color: "#1e293b",           delay: 1920 },
  { text: "▶  ALL SYSTEMS GO — LAUNCHING EXAMNEST",       color: "#c9a84c", bold: true, delay: 2150 },
];

function BootScreen({ onComplete }) {
  const [visible, setVisible] = useState([]);
  const [showBar, setShowBar] = useState(false);

  useEffect(() => {
    const timers = [];
    BOOT_LINES.forEach((line, i) => {
      timers.push(setTimeout(() => {
        setVisible(p => [...p, i]);
        if (i === BOOT_LINES.length - 1) {
          setShowBar(true);
          timers.push(setTimeout(onComplete, 1050));
        }
      }, line.delay));
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div style={{
      position: "fixed", inset: 0, background: "#000",
      display: "flex", flexDirection: "column",
      justifyContent: "center", alignItems: "flex-start",
      padding: "0 9%",
      animation: "ci-fadeIn 0.4s ease forwards",
    }}>
      {/* subtle grid */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(rgba(34,197,94,0.035) 1px,transparent 1px),linear-gradient(90deg,rgba(34,197,94,0.035) 1px,transparent 1px)",
        backgroundSize: "28px 28px",
        animation: "ci-fadeIn 1.2s ease forwards",
      }} />

      {/* header bar */}
      <div style={{
        position: "absolute", top: 22, left: "9%", right: "9%",
        display: "flex", justifyContent: "space-between",
        fontSize: 10, color: "rgba(34,197,94,0.32)",
        letterSpacing: "0.22em", fontFamily: "'Courier New',monospace",
      }}>
        <span>EXAMNEST OS</span>
        <span>INDIA EXAM PLATFORM</span>
        <span>{new Date().toLocaleTimeString()}</span>
      </div>

      {/* corner marks */}
      {[
        { top: 20, left: "9%",  borderTop: "1px solid", borderLeft:  "1px solid" },
        { top: 20, right: "9%", borderTop: "1px solid", borderRight: "1px solid" },
        { bottom: 20, left: "9%",  borderBottom: "1px solid", borderLeft:  "1px solid" },
        { bottom: 20, right: "9%", borderBottom: "1px solid", borderRight: "1px solid" },
      ].map((s, i) => (
        <div key={i} style={{ position: "absolute", width: 18, height: 18, borderColor: "rgba(34,197,94,0.2)", ...s }} />
      ))}

      {/* boot lines */}
      <div style={{ width: "100%", maxWidth: 620, fontFamily: "'Courier New',monospace" }}>
        {BOOT_LINES.map((line, i) => (
          <div key={i} style={{
            fontSize: 12, lineHeight: "1.95",
            color: visible.includes(i) ? line.color : "transparent",
            fontWeight: line.bold ? 700 : 400,
            animation: visible.includes(i) ? "ci-bootLine 0.18s ease forwards" : "none",
            display: "flex", alignItems: "center", gap: 7,
          }}>
            {visible.includes(i) && <span style={{ color: "rgba(34,197,94,0.28)", fontSize: 10 }}>›</span>}
            {visible.includes(i) ? line.text : ""}
            {visible.includes(i) && i === visible[visible.length - 1] && (
              <span style={{ display: "inline-block", width: 7, height: 13, background: "#22c55e", marginLeft: 3, animation: "ci-blink 0.65s infinite" }} />
            )}
          </div>
        ))}
      </div>

      {/* progress bar */}
      {showBar && (
        <div style={{ position: "absolute", bottom: 38, left: "9%", right: "9%" }}>
          <div style={{ fontSize: 10, color: "rgba(201,168,76,0.55)", letterSpacing: "0.22em", marginBottom: 8, fontFamily: "'Courier New',monospace" }}>
            LAUNCHING EXAMNEST...
          </div>
          <div style={{ height: 2, background: "rgba(201,168,76,0.14)", borderRadius: 2 }}>
            <div style={{ height: "100%", background: "linear-gradient(90deg,#c9a84c,#e8c97e,#c9a84c)", borderRadius: 2, animation: "ci-progressBar 0.95s linear forwards", boxShadow: "0 0 10px rgba(201,168,76,0.6)" }} />
          </div>
        </div>
      )}
    </div>
  );
}

// ── Phase 2: Logo Screen ──────────────────────────────
function LogoScreen({ onComplete }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t = [
      setTimeout(() => setStep(1), 250),
      setTimeout(() => setStep(2), 750),
      setTimeout(() => setStep(3), 1300),
      setTimeout(() => setStep(4), 1900),
      setTimeout(() => setStep(5), 2550),
      setTimeout(onComplete,       3750),
    ];
    return () => t.forEach(clearTimeout);
  }, []);

  return (
    <div style={{
      position: "fixed", inset: 0,
      background: "radial-gradient(ellipse at 35% 42%, #0c0c24 0%, #000 65%)",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      overflow: "hidden",
    }}>

      {/* Particles */}
      {Array.from({ length: 55 }).map((_, i) => <Particle key={i} index={i} />)}

      {/* Scanline sweep — very subtle */}
      <div style={{
        position: "absolute", left: 0, right: 0, height: 1,
        background: "linear-gradient(90deg,transparent 0%,rgba(201,168,76,0.28) 35%,rgba(255,255,255,0.12) 50%,rgba(201,168,76,0.28) 65%,transparent 100%)",
        animation: "ci-scanline 3s linear infinite",
        pointerEvents: "none", zIndex: 4,
      }} />

      {/* Glow orb */}
      {step >= 1 && (
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          width: 480, height: 480,
          background: "radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 68%)",
          animation: "ci-orbPulse 3.5s ease-in-out infinite",
          pointerEvents: "none",
        }} />
      )}

      {/* Rotating ring */}
      {step >= 2 && (
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          width: 320, height: 320,
          border: "1px solid rgba(201,168,76,0.1)",
          borderRadius: "50%",
          animation: "ci-rotateSlow 22s linear infinite",
        }} />
      )}

      {/* Ripple rings */}
      {step >= 2 && [0, 1, 2].map(i => (
        <div key={i} style={{
          position: "absolute", top: "50%", left: "50%",
          width: 110, height: 110,
          border: "1.5px solid rgba(201,168,76,0.45)",
          borderRadius: "50%",
          animation: `ci-ringExpand 2.8s ease-out infinite ${i * 0.75}s`,
        }} />
      ))}

      {/* Main content */}
      <div style={{ textAlign: "center", position: "relative", zIndex: 10 }}>

        {/* Book icon */}
        {step >= 1 && (
          <div style={{
            fontSize: 68, marginBottom: 26,
            animation: "ci-scaleUpFade 0.9s cubic-bezier(0.34,1.4,0.64,1) forwards",
            display: "inline-block",
          }}>
            <span style={{ animation: "ci-glowBreath 2.5s ease-in-out infinite", display: "inline-block" }}>📚</span>
          </div>
        )}

        {/* EXAMNEST text */}
        {step >= 2 && (
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(44px, 9vw, 92px)",
            fontWeight: 600,
            animation: "ci-letterSpread 1.1s cubic-bezier(0.16,1,0.3,1) forwards",
            background: "linear-gradient(135deg, #e8c97e 0%, #fff 30%, #c9a84c 55%, #fff 78%, #e8c97e 100%)",
            backgroundSize: "300% 100%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation2: "ci-goldShimmer 4s linear infinite",
          }}>
            EXAMNEST
          </div>
        )}

        {/* Gold divider line */}
        {step >= 3 && (
          <div style={{
            width: "min(360px, 84vw)", height: 1,
            margin: "18px auto",
            background: "linear-gradient(90deg, transparent, #c9a84c, #fff, #c9a84c, transparent)",
            transformOrigin: "center",
            animation: "ci-lineGrow 0.9s cubic-bezier(0.16,1,0.3,1) forwards",
          }} />
        )}

        {/* Italic tagline */}
        {step >= 3 && (
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(14px, 2.6vw, 19px)",
            fontStyle: "italic",
            fontWeight: 300,
            color: "rgba(201,168,76,0.82)",
            letterSpacing: "0.18em",
            marginBottom: 6,
            animation: "ci-tagReveal 1s ease forwards",
          }}>
            India's Most Complete Exam Platform
          </div>
        )}

        {/* Categories strip */}
        {step >= 3 && (
          <div style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 10,
            color: "rgba(255,255,255,0.28)",
            letterSpacing: "0.38em",
            textTransform: "uppercase",
            animation: "ci-tagReveal 1s ease forwards 0.25s",
            opacity: 0,
          }}>
            UPSC · JEE · NEET · CAT · SSC · BANKING · LAW · GATE
          </div>
        )}

        {/* Stats row */}
        {step >= 4 && (
          <div style={{
            display: "flex", gap: "clamp(22px, 5.5vw, 52px)",
            marginTop: 38, justifyContent: "center",
            animation: "ci-slideUpFade 0.9s ease forwards",
          }}>
            {[["80+","Exams"],["5","Features"],["100%","Free"],["∞","Updated"]].map((arr, i) => (
              <div key={arr[1]} style={{ textAlign: "center", animation: `ci-statPop 0.7s cubic-bezier(0.34,1.4,0.64,1) forwards ${i * 0.12}s`, opacity: 0 }}>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(26px, 5vw, 42px)",
                  fontWeight: 700, color: "#c9a84c", lineHeight: 1,
                }}>
                  {arr[0]}
                </div>
                <div style={{ fontSize: 9, color: "rgba(255,255,255,0.32)", letterSpacing: "0.26em", textTransform: "uppercase", marginTop: 6 }}>
                  {arr[1]}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Entering label */}
        {step >= 5 && (
          <div style={{
            marginTop: 42, fontSize: 11,
            color: "rgba(255,255,255,0.28)",
            letterSpacing: "0.32em",
            fontFamily: "'DM Sans', sans-serif",
            animation: "ci-flicker 2s ease-in-out infinite",
          }}>
            ▼ &nbsp; ENTERING NOW &nbsp; ▼
          </div>
        )}
      </div>

      {/* Corner decorations */}
      {[
        { top: 22, left: 22,   borderTop: "1px solid", borderLeft:  "1px solid" },
        { top: 22, right: 22,  borderTop: "1px solid", borderRight: "1px solid" },
        { bottom: 22, left: 22,  borderBottom: "1px solid", borderLeft:  "1px solid" },
        { bottom: 22, right: 22, borderBottom: "1px solid", borderRight: "1px solid" },
      ].map((s, i) => (
        <div key={i} style={{ position: "absolute", width: 26, height: 26, borderColor: "rgba(201,168,76,0.22)", animation: "ci-fadeIn 1.8s ease forwards", opacity: 0, ...s }} />
      ))}

      {/* Film-grain noise overlay */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.3,
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
        pointerEvents: "none",
      }} />
    </div>
  );
}

// ── Phase 3: Portal Transition ────────────────────────
function PortalTransition({ onComplete }) {
  const [go, setGo] = useState(false);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setGo(true),   80);
    const t2 = setTimeout(() => setFlash(true), 480);
    const t3 = setTimeout(onComplete,           1150);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, []);

  return (
    <div style={{ position: "fixed", inset: 0, background: "#000", overflow: "hidden" }}>
      {/* Expanding portal */}
      {go && (
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          width: 140, height: 140,
          background: "radial-gradient(circle, #1a1a2e 30%, #0a0a1a 100%)",
          animation: "ci-portalExpand 0.85s cubic-bezier(0.4,0,0.2,1) forwards",
        }} />
      )}
      {/* Flash */}
      {flash && (
        <div style={{
          position: "absolute", inset: 0,
          background: "rgba(255,255,255,0.5)",
          animation: "ci-flash 0.55s ease forwards",
          pointerEvents: "none",
        }} />
      )}
    </div>
  );
}

// ── Main Cinematic Intro Orchestrator ─────────────────
export function CinematicIntro({ onDone }) {
  const [phase, setPhase] = useState("boot");

  // Skip if already seen this browser session
  useEffect(() => {
    try {
      if (sessionStorage.getItem("examnest_seen")) { onDone(); return; }
    } catch(e) {}
  }, []);

  function finish() {
    try { sessionStorage.setItem("examnest_seen", "1"); } catch(e) {}
    onDone();
  }

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9999 }}>
      <style>{cinematicCSS}</style>

      {phase === "boot"   && <BootScreen        onComplete={() => setPhase("logo")}   />}
      {phase === "logo"   && <LogoScreen        onComplete={() => setPhase("portal")} />}
      {phase === "portal" && <PortalTransition  onComplete={finish}                   />}

      {/* Skip button */}
      <button
        onClick={finish}
        style={{
          position: "fixed", bottom: 26, right: 26,
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 20, padding: "7px 17px",
          color: "rgba(255,255,255,0.32)", fontSize: 11,
          fontFamily: "'DM Sans',sans-serif",
          letterSpacing: "0.12em", cursor: "pointer", zIndex: 10001,
          transition: "all 0.25s ease",
        }}
        onMouseEnter={e => { e.currentTarget.style.color = "rgba(255,255,255,0.75)"; e.currentTarget.style.borderColor = "rgba(201,168,76,0.5)"; }}
        onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.32)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
      >
        SKIP INTRO ›
      </button>
    </div>
  );
}
