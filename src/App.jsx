import { useState, useEffect, useRef } from "react";
import { exams } from "./examsData";
import CareerGuidePage from "./CareerGuide";
import { askGemini } from "./geminiAI"; // 🚀 ADDED: Importing the Gemini AI Engine

// ═══════════════════════════════════════════════════
// EXAMNEST — ULTRA CINEMATIC INTRO + FULL APP
// ═══════════════════════════════════════════════════

const STORAGE_KEY = "examnest_v5";
function saveData(d) { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(d)); } catch(e) {} }
function loadData() { try { var d = localStorage.getItem(STORAGE_KEY);
return d ? JSON.parse(d) : null; } catch(e) { return null;
} }

const categories = [
  "All", "Engineering", "Medical", "UPSC", "SSC", 
  "Banking", "Defence", "Management", "Law", "Teaching", 
  "Commerce", "Architecture", "Railway", "State PSC", 
  "Insurance", "PSUs & Technical"
];

const catIcons = {
  "All": "🇮🇳",
  "Engineering": "⚙️",
  "Medical": "🩺",
  "UPSC": "🏛️",
  "SSC": "📋",
  "Banking": "🏦",
  "Defence": "⚔️",
  "Management": "📊",
  "Law": "⚖️",
  "Teaching": "📚",
  "Commerce": "💰",
  "Architecture": "🏗️",
  "Railway": "🚆",
  "State PSC": "🗺️",
  "Insurance": "🛡️",
  "PSUs & Technical": "🚀"
};
const diffColor = {"Easy":"#22c55e","Moderate":"#f59e0b","High":"#f97316","Very High":"#ef4444","Extremely High":"#7c3aed"};

function getBotReply(question) {
  var q = question.toLowerCase();
  for (var i = 0; i < exams.length; i++) {
    var exam = exams[i];
    if (q.includes(exam.name.toLowerCase()) || q.includes(exam.id.replace(/-/g," "))) {
      if (q.includes("cutoff")||q.includes("score")) { var c=exam.cutoff[0]; return "📊 **"+exam.name+" Cutoff "+c.year+":**\n\n• General: "+c.general+"\n• OBC: "+c.obc+"\n• SC: "+c.sc+"\n• ST: "+c.st+"\n\n⚠️ Verify from official website."; }
      if (q.includes("syllabus")||q.includes("topics")) return "📖 **"+exam.name+" Syllabus:**\n\n"+exam.syllabus.map(function(s){return "• "+s;}).join("\n");
      if (q.includes("book")||q.includes("material")) return "📚 **Books for "+exam.name+":**\n\n"+exam.books.map(function(b){return "• "+b;}).join("\n");
      if (q.includes("eligib")||q.includes("age")) return "✅ **"+exam.name+" Eligibility:**\n\n"+exam.eligibility;
      if (q.includes("pattern")||q.includes("marks")) return "📋 **"+exam.name+" Pattern:**\n\n• Duration: "+exam.pattern.duration+"\n• Questions: "+exam.pattern.questions+"\n• Total: "+exam.pattern.total+"\n• Negative: "+exam.pattern.negative;
      if (q.includes("tip")||q.includes("prepare")) return "💡 **"+exam.name+" Tips:**\n\n"+exam.tips.map(function(t,i){return (i+1)+". "+t;}).join("\n");
      return "📌 **"+exam.name+":**\n\n• Category: "+exam.category+"\n• Difficulty: "+exam.difficulty+"\n• Marks: "+exam.pattern.total+"\n• Seats: "+exam.seats+"\n• Eligibility: "+exam.eligibility;
    }
  }
  if (q.includes("hello")||q.includes("hi")) return "👋 **Hello! I'm ExamBot!**\n\nAsk me about any Indian exam — syllabus, cutoffs, books, tips, eligibility! 😊";
  if (q.includes("tough")||q.includes("hard")) return "🔥 **Toughest Exams:**\n\n1. UPSC CSE\n2. JEE Advanced\n3. RBI Grade B\n4. CAT\n5. GATE";
  if (q.includes("easy")) return "✅ **Easier Exams:**\n\n1. SSC MTS\n2. CTET\n3. RRB Group D\n4. IBPS Clerk";
  if (q.includes("thank")) return "😊 You're welcome! Best of luck! 💪\n\nConsistency beats intensity. Study daily! 🎯";
  return "🤔 Try asking:\n\n• \"JEE Main syllabus\"\n• \"NEET cutoff 2024\"\n• \"Best books for UPSC\"\n• \"CAT eligibility\"\n\nOr use Compare tab! 😊";
}

const getTheme = function(dark) {
  return {bg:dark?"#0f172a":"#f8f7f4",card:dark?"#1e293b":"#ffffff",card2:dark?"#273548":"#f1f5f9",text:dark?"#f1f5f9":"#1a1a2e",subtext:dark?"#94a3b8":"#64748b",border:dark?"rgba(255,255,255,0.07)":"rgba(0,0,0,0.07)",navBg:dark?"#0f172a":"#ffffff",topBg:dark?"#0f172a":"#1a1a2e",muted:dark?"#475569":"#888888"};
};

// ─── CINEMATIC STYLES ─────────────────────────────────
const allStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:wght@700;900&display=swap');
  *{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent;}

  /* ── CINEMATIC ANIMATIONS ── */
  @keyframes fadeIn       {from{opacity:0}to{opacity:1}}
  @keyframes fadeOut      {from{opacity:1}to{opacity:0}}
  @keyframes slideUp      {from{opacity:0;transform:translateY(50px)}to{opacity:1;transform:translateY(0)}}
  @keyframes slideDown    {from{opacity:0;transform:translateY(-40px)}to{opacity:1;transform:translateY(0)}}
  @keyframes scaleIn      {from{opacity:0;transform:scale(0.7)}to{opacity:1;transform:scale(1)}}
  @keyframes scaleOut     {from{opacity:1;transform:scale(1)}to{opacity:0;transform:scale(1.3)}}
  @keyframes glowPulse    {0%,100%{filter:drop-shadow(0 0 20px rgba(201,168,76,0.5))}50%{filter:drop-shadow(0 0 60px rgba(201,168,76,1)) drop-shadow(0 0 100px rgba(201,168,76,0.4))}}
  @keyframes textGlow     {0%,100%{text-shadow:0 0 30px rgba(201,168,76,0.4)}50%{text-shadow:0 0 80px rgba(201,168,76,1),0 0 140px rgba(201,168,76,0.5)}}
  @keyframes scanline     {0%{top:-5%}100%{top:105%}}
  @keyframes particle     {0%{transform:translateY(0) rotate(0deg);opacity:0}15%{opacity:1}85%{opacity:0.6}100%{transform:translateY(-110vh) translateX(var(--x)) rotate(var(--r));opacity:0}}
  @keyframes logoLetters  {0%{letter-spacing:1.5em;opacity:0;filter:blur(12px)}100%{letter-spacing:0.25em;opacity:1;filter:blur(0)}}
  @keyframes lineExpand   {from{transform:scaleX(0)}to{transform:scaleX(1)}}
  @keyframes tagReveal    {0%{opacity:0;transform:translateY(20px);filter:blur(6px)}100%{opacity:1;transform:translateY(0);filter:blur(0)}}
  @keyframes orbPulse     {0%,100%{transform:translate(-50%,-50%) scale(1);opacity:0.15}50%{transform:translate(-50%,-50%) scale(1.2);opacity:0.25}}
  @keyframes ringExpand   {0%{transform:translate(-50%,-50%) scale(0);opacity:0.6}100%{transform:translate(-50%,-50%) scale(5);opacity:0}}
  @keyframes bootLine     {from{opacity:0;transform:translateX(-10px)}to{opacity:1;transform:translateX(0)}}
  @keyframes cursor       {0%,100%{opacity:1}50%{opacity:0}}
  @keyframes progress     {from{width:0%}to{width:100%}}
  @keyframes wipeRight    {from{clip-path:inset(0 100% 0 0)}to{clip-path:inset(0 0% 0 0)}}
  @keyframes flashWhite   {0%{opacity:0}20%{opacity:0.8}100%{opacity:0}}
  @keyframes portalOpen   {0%{transform:scale(0);border-radius:50%}100%{transform:scale(50);border-radius:50%}}
  @keyframes countNum     {from{opacity:0;transform:scale(0.3) rotate(-10deg)}to{opacity:1;transform:scale(1) rotate(0deg)}}
  @keyframes shimmerMove  {0%{background-position:-200% center}100%{background-position:200% center}}
  @keyframes fadeAppear   {0%{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
  @keyframes bounce       {0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
  @keyframes rotateCW     {from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
  @keyframes textFlicker  {0%,89%,91%,96%,100%{opacity:1}90%,95%{opacity:0.3}}
  @keyframes bgKenBurns   {from{transform:scale(1) translate(0,0)}to{transform:scale(1.06) translate(-1%,-1%)}}

  /* ── APP ANIMATIONS ── */
  .card:active{transform:scale(0.97);}
  input:focus,textarea:focus,select:focus{outline:none;}
  ::-webkit-scrollbar{display:none;}
`;

// ─── PARTICLE ─────────────────────────────────────────
function Particle(props) {
  var i = props.index;
  var x = ((Math.random()-0.5)*250)+"px";
  var r = (Math.random()*720-360)+"deg";
  var delay = Math.random()*5;
  var dur = 5+Math.random()*7;
  var size = 1.5+Math.random()*4;
  var left = Math.random()*100;
  var colors = ["#c9a84c","#e8c97e","#fff","#6366f1","#10b981","#f97316","#ec4899"];
  var color = colors[Math.floor(Math.random()*colors.length)];
  return (
    <div style={{
      position:"absolute", left:left+"%", bottom:"-10px",
      width:size+"px", height:size+"px",
      borderRadius:"50%", background:color,
      pointerEvents:"none",
      "--x":x, "--r":r,
      animation:"particle "+dur+"s ease-in infinite "+delay+"s",
      boxShadow:"0 0 "+(size*2)+"px "+color,
    }}/>
  );
}

// ─── PHASE 1: BOOT SCREEN ─────────────────────────────
var BOOT_LINES = [
  {text:"EXAMNEST SYSTEM v5.0.0 — INITIALIZING",color:"#22c55e",bold:true,delay:0},
  {text:"████████████████████ Loading core modules...",color:"#475569",delay:200},
  {text:"[OK] Exam database loaded — 80+ exams indexed",color:"#64748b",delay:400},
  {text:"[OK] AI ExamBot neural module — ONLINE",color:"#6366f1",delay:600},
  {text:"[OK] Study Planner — INITIALIZED",color:"#f97316",delay:800},
  {text:"[OK] Compare Engine — ACTIVE",color:"#ec4899",delay:1000},
  {text:"[OK] Dark Mode — READY",color:"#7c3aed",delay:1200},
  {text:"[OK] localStorage — CONNECTED",color:"#14b8a6",delay:1400},
  {text:"━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",color:"#1e293b",delay:1600},
  {text:"▶  BOOT SEQUENCE COMPLETE — LAUNCHING",color:"#c9a84c",bold:true,delay:1800},
];

function BootScreen(props) {
  var onComplete = props.onComplete;
  var [visible, setVisible] = useState([]);
  var [showBar, setShowBar] = useState(false);

  useEffect(function() {
    var timers = [];
    BOOT_LINES.forEach(function(line,i) {
      timers.push(setTimeout(function(){
        setVisible(function(p){return p.concat([i]);});
        if (i===BOOT_LINES.length-1) {
          setShowBar(true);
          timers.push(setTimeout(onComplete, 200));
        }
      }, line.delay));
    });
    return function(){timers.forEach(clearTimeout);};
  }, []);

  return (
    <div style={{
      position:"fixed",inset:0,
      background:"#000",
      display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"flex-start",
      padding:"10% 8%",
      animation:"fadeIn 0.4s ease forwards",
    }}>
      {/* grid */}
      <div style={{position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(34,197,94,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(34,197,94,0.04) 1px,transparent 1px)",backgroundSize:"28px 28px",animation:"fadeIn 1s ease forwards"}}/>

      {/* top bar */}
      <div style={{position:"absolute",top:24,left:"8%",right:"8%",display:"flex",justifyContent:"space-between",fontSize:10,color:"rgba(34,197,94,0.35)",letterSpacing:"0.25em",fontFamily:"'Courier New',monospace"}}>
        <span>EXAMNEST OS</span><span>INDIA EXAM PLATFORM</span><span>{new Date().toLocaleTimeString()}</span>
      </div>

      {/* corner decorations */}
      {[{top:24,left:"8%",borderTop:"1px solid",borderLeft:"1px solid"},{top:24,right:"8%",borderTop:"1px solid",borderRight:"1px solid"},{bottom:24,left:"8%",borderBottom:"1px solid",borderLeft:"1px solid"},{bottom:24,right:"8%",borderBottom:"1px solid",borderRight:"1px solid"}].map(function(s,i){
        return <div key={i} style={{position:"absolute",width:20,height:20,borderColor:"rgba(34,197,94,0.25)",...s}}/>;
      })}

      {/* lines */}
      <div style={{width:"100%",maxWidth:580,fontFamily:"'Courier New',monospace"}}>
        {BOOT_LINES.map(function(line,i) {
          return (
            <div key={i} style={{
              fontSize:12,lineHeight:"1.9",
              color:visible.includes(i)?line.color:"transparent",
              fontWeight:line.bold?"700":"400",
              animation:visible.includes(i)?"bootLine 0.5s ease forwards":"none",
              display:"flex",alignItems:"center",gap:6,
            }}>
              {visible.includes(i)&&<span style={{color:"rgba(34,197,94,0.3)"}}>›</span>}
              {visible.includes(i)?line.text:""}
              {visible.includes(i)&&i===visible[visible.length-1]&&(
                <span style={{display:"inline-block",width:6,height:13,background:"#22c55e",animation:"cursor 0.7s infinite",marginLeft:4}}/>
              )}
            </div>
          );
        })}
      </div>

      {/* progress */}
      {showBar&&(
        <div style={{position:"absolute",bottom:40,left:"8%",right:"8%"}}>
          <div style={{fontSize:10,color:"rgba(201,168,76,0.6)",letterSpacing:"0.25em",marginBottom:8,fontFamily:"'Courier New',monospace"}}>LAUNCHING EXAMNEST...</div>
          <div style={{height:2,background:"rgba(201,168,76,0.15)",borderRadius:2}}>
            <div style={{height:"100%",background:"linear-gradient(90deg,#c9a84c,#e8c97e)",borderRadius:2,animation:"progress 0.9s linear forwards",boxShadow:"0 0 12px #c9a84c"}}/>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── PHASE 2: CINEMATIC LOGO ──────────────────────────
function LogoScreen(props) {
  var onComplete = props.onComplete;
  var [step, setStep] = useState(0);

  useEffect(function() {
    var timers = [
      setTimeout(function(){setStep(1);},800),
      setTimeout(function(){setStep(2);},2000),
      setTimeout(function(){setStep(3);},3500),
      setTimeout(function(){setStep(4);},5000),
      setTimeout(function(){setStep(5);},6500),
      setTimeout(onComplete,8000),
    ];
    return function(){timers.forEach(clearTimeout);};
  }, []);

  return (
    <div style={{
      position:"fixed",inset:0,
      background:"radial-gradient(ellipse at 30% 40%,#0d0d2b 0%,#000 60%)",
      display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
      overflow:"hidden",
    }}>
      {/* Animated background gradient */}
      <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at 70% 60%,rgba(99,102,241,0.08) 0%,transparent 60%)",animation:"bgKenBurns 4s ease-in-out infinite alternate"}}/>

      {/* Particles */}
      {Array.from({length:60}).map(function(_,i){return <Particle key={i} index={i}/>;}) }

      {/* Scanline sweep */}
      <div style={{position:"absolute",left:0,right:0,height:"1px",background:"linear-gradient(90deg,transparent 0%,rgba(201,168,76,0.4) 40%,rgba(255,255,255,0.2) 50%,rgba(201,168,76,0.4) 60%,transparent 100%)",animation:"scanline 2.5s linear infinite",pointerEvents:"none",zIndex:5}}/>

      {/* Orbital rings */}
      {step>=2&&[180,280,380].map(function(size,i){
        return (
          <div key={i} style={{
            position:"absolute",top:"50%",left:"50%",
            width:size,height:size,
            border:"1px solid rgba(201,168,76,"+(0.12-i*0.03)+")",
            borderRadius:"50%",
            transform:"translate(-50%,-50%)",
            animation:"rotateCW "+(20+i*8)+"s linear infinite",
          }}/>
        );
      })}

      {/* Glow orb */}
      {step>=1&&(
        <div style={{position:"absolute",top:"50%",left:"50%",width:500,height:500,background:"radial-gradient(circle,rgba(201,168,76,0.12) 0%,transparent 65%)",animation:"orbPulse 3s ease-in-out infinite",pointerEvents:"none"}}/>
      )}

      {/* Ripple rings on reveal */}
      {step>=2&&[0,1,2].map(function(i){
        return (
          <div key={i} style={{position:"absolute",top:"50%",left:"50%",width:120,height:120,border:"2px solid rgba(201,168,76,0.5)",borderRadius:"50%",animation:"ringExpand 2.5s ease-out infinite",animationDelay:(i*0.7)+"s"}}/>
        );
      })}

      {/* Main content */}
      <div style={{textAlign:"center",position:"relative",zIndex:10}}>

        {/* Icon */}
        {step>=1&&(
          <div style={{
            fontSize:72,marginBottom:28,
            animation:"scaleIn 0.9s cubic-bezier(0.34,1.56,0.64,1) forwards",
            filter:"drop-shadow(0 0 40px rgba(201,168,76,0.7))",
            display:"inline-block",
          }}>📚</div>
        )}

        {/* EXAMNEST */}
        {step>=2&&(
          <div style={{
            fontFamily:"'Cormorant Garamond',serif",
            fontSize:"clamp(48px,9vw,96px)",
            fontWeight:600,
            letterSpacing:"0.25em",
            animation:"logoLetters 1.2s cubic-bezier(0.16,1,0.3,1) forwards",
            background:"linear-gradient(135deg,#e8c97e 0%,#fff 35%,#c9a84c 65%,#fff 80%,#e8c97e 100%)",
            backgroundSize:"300%",
            WebkitBackgroundClip:"text",
            WebkitTextFillColor:"transparent",
            backgroundClip:"text",
            animation2:"shimmerMove 3s linear infinite",
          }}>
            EXAMNEST
          </div>
        )}

        {/* Decorative line */}
        {step>=3&&(
          <div style={{position:"relative",width:"min(400px,85vw)",margin:"18px auto",height:1,overflow:"hidden"}}>
            <div style={{position:"absolute",inset:0,background:"linear-gradient(90deg,transparent,#c9a84c,#fff,#c9a84c,transparent)",transformOrigin:"left",animation:"lineExpand 0.8s ease forwards"}}/>
          </div>
        )}

        {/* Tagline */}
        {step>=3&&(
          <div style={{
            fontFamily:"'Cormorant Garamond',serif",
            fontSize:"clamp(13px,2.5vw,18px)",
            fontStyle:"italic",
            color:"rgba(201,168,76,0.85)",
            letterSpacing:"0.2em",
            animation:"tagReveal 1s ease forwards",
            marginBottom:8,
          }}>
            India's Most Complete Exam Platform
          </div>
        )}

        {step>=3&&(
          <div style={{
            fontFamily:"'DM Sans',sans-serif",
            fontSize:11,
            color:"rgba(255,255,255,0.3)",
            letterSpacing:"0.4em",
            textTransform:"uppercase",
            animation:"tagReveal 1s ease forwards 0.2s",opacity:0,
          }}>
            UPSC · JEE · NEET · CAT · SSC · BANKING · LAW
          </div>
        )}

        {/* Stats */}
        {step>=4&&(
          <div style={{display:"flex",gap:"clamp(24px,6vw,56px)",marginTop:40,justifyContent:"center",animation:"slideUp 0.9s ease forwards"}}>
            {[["80+","Exams"],["5","Features"],["100%","Free"],["∞","Updated"]].map(function(arr){
              return (
                <div key={arr[1]} style={{textAlign:"center"}}>
                  <div style={{
                    fontFamily:"'Cormorant Garamond',serif",
                    fontSize:"clamp(24px,5vw,40px)",
                    fontWeight:700,
                    color:"#c9a84c",
                    animation:"textGlow 2s ease-in-out infinite",
                    lineHeight:1,
                  }}>{arr[0]}</div>
                  <div style={{fontSize:9,color:"rgba(255,255,255,0.35)",letterSpacing:"0.25em",textTransform:"uppercase",marginTop:6}}>{arr[1]}</div>
                </div>
              );
            })}
          </div>
        )}

        {/* Enter button */}
        {step>=5&&(
          <div style={{marginTop:40,animation:"slideUp 0.8s ease forwards"}}>
            <div style={{fontSize:11,color:"rgba(255,255,255,0.3)",letterSpacing:"0.3em",animation:"textFlicker 3s infinite"}}>
              ▼ ENTERING NOW ▼
            </div>
          </div>
        )}
      </div>

      {/* Corner marks */}
      {[
        {top:20,left:20,borderTop:"1px solid",borderLeft:"1px solid"},
        {top:20,right:20,borderTop:"1px solid",borderRight:"1px solid"},
        {bottom:20,left:20,borderBottom:"1px solid",borderLeft:"1px solid"},
        {bottom:20,right:20,borderBottom:"1px solid",borderRight:"1px solid"},
      ].map(function(s,i){
        return <div key={i} style={{position:"absolute",width:28,height:28,borderColor:"rgba(201,168,76,0.25)",animation:"fadeIn 1.5s ease forwards",...s}}/>;
      })}

      {/* Film grain overlay */}
      <div style={{position:"absolute",inset:0,backgroundImage:"url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E\")",opacity:0.4,pointerEvents:"none"}}/>
    </div>
  );
}

// ─── PHASE 3: PORTAL TRANSITION ───────────────────────
function PortalTransition(props) {
  var onComplete = props.onComplete;
  var [step, setStep] = useState(0);

  useEffect(function() {
    var t1 = setTimeout(function(){setStep(1);},100);
    var t2 = setTimeout(function(){setStep(2);},500);
    var t3 = setTimeout(onComplete, 1200);
    return function(){clearTimeout(t1);clearTimeout(t2);clearTimeout(t3);};
  }, []);

  return (
    <div style={{position:"fixed",inset:0,display:"flex",alignItems:"center",justifyContent:"center",background:"#000",overflow:"hidden"}}>
      {/* Flash */}
      {step>=2&&<div style={{position:"absolute",inset:0,background:"rgba(255,255,255,0.7)",animation:"flashWhite 0.5s ease forwards",pointerEvents:"none"}}/>}
      {/* Expanding portal circle */}
      {step>=1&&(
        <div style={{
          position:"absolute",top:"50%",left:"50%",
          width:100,height:100,
          borderRadius:"50%",
          background:"radial-gradient(circle,#1a1a2e 0%,#0a0a1a 100%)",
          transform:"translate(-50%,-50%)",
          animation:step>=2?"portalOpen 0.8s cubic-bezier(0.4,0,0.2,1) forwards":"scaleIn 0.3s ease forwards",
        }}/>
      )}
    </div>
  );
}

// ─── CINEMATIC WRAPPER ────────────────────────────────
function CinematicIntro(props) {
  var onDone = props.onDone;
  var [phase, setPhase] = useState("boot");

  // Check if already seen this session
  useEffect(function() {
    try {
      if (sessionStorage.getItem("examnest_intro_seen")) {
        onDone();
      }
    } catch(e) {}
  }, []);

  function handleDone() {
    try { sessionStorage.setItem("examnest_intro_seen","1"); } catch(e) {}
    onDone();
  }

  return (
    <div style={{position:"fixed",inset:0,zIndex:9999}}>
      <style>{allStyles}</style>
      {phase==="boot"      && <BootScreen       onComplete={function(){setPhase("logo");}}   />}
      {phase==="logo"      && <LogoScreen       onComplete={function(){setPhase("portal");}} />}
      {phase==="portal"    && <PortalTransition onComplete={handleDone}                      />}

      {/* Skip */}
      <button onClick={handleDone} style={{
        position:"fixed",bottom:28,right:28,
        background:"rgba(255,255,255,0.04)",
        border:"1px solid rgba(255,255,255,0.12)",
        borderRadius:20,padding:"7px 18px",
        color:"rgba(255,255,255,0.35)",fontSize:11,
        fontFamily:"'DM Sans',sans-serif",
        letterSpacing:"0.12em",cursor:"pointer",zIndex:10001,
        transition:"all 0.2s",
      }}
      onMouseEnter={function(e){e.currentTarget.style.color="rgba(255,255,255,0.7)";e.currentTarget.style.borderColor="rgba(201,168,76,0.4)";}}
      onMouseLeave={function(e){e.currentTarget.style.color="rgba(255,255,255,0.35)";e.currentTarget.style.borderColor="rgba(255,255,255,0.12)";}}
      >
        SKIP INTRO ›
      </button>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────
export default function App() {
  var darkInit = false;
  try { darkInit = localStorage.getItem("examnest_dark")==="true"; } catch(e) {}
  var [showIntro, setShowIntro] = useState(true);
  var [appReady, setAppReady]   = useState(false);
  var [dark, setDark]           = useState(darkInit);
  var [selected, setSelected]   = useState(null);
  var [tab, setTab]             = useState("syllabus");
  var [category, setCategory]   = useState("All");
  var [search, setSearch]       = useState("");
  var [navTab, setNavTab]       = useState("home");
  var T = getTheme(dark);

  useEffect(function(){ try{localStorage.setItem("examnest_dark",String(dark));}catch(e){} },[dark]);

  function introDone() {
    setShowIntro(false);
    setTimeout(function(){setAppReady(true);},100);
  }

  var filtered = exams.filter(function(e) {
    var matchCat = category==="All"||e.category===category;
    var s = search.toLowerCase();
    var matchSearch = e.name.toLowerCase().includes(s)||e.full.toLowerCase().includes(s)||e.category.toLowerCase().includes(s);
    return matchCat&&matchSearch;
  });

  function openExam(exam){setSelected(exam);setTab("syllabus");window.scrollTo(0,0);}
  function goHome(){setSelected(null);setNavTab("home");}

  if (selected) return <DetailPage exam={selected} goHome={goHome} tab={tab} setTab={setTab} T={T} dark={dark}/>;

  return (
    <>
      <style>{allStyles}</style>

      {/* Cinematic Intro */}
      {showIntro && <CinematicIntro onDone={introDone}/>}

      {/* Main App — fades in after intro */}
      <div style={{
        minHeight:"100vh",background:T.bg,paddingBottom:72,color:T.text,
        opacity:appReady?1:0,
        /* FIX: Use "none" instead of "translateY(0)" to prevent breaking position:fixed */
        transform:appReady?"none":"translateY(20px)", 
        transition:"opacity 0.8s ease, transform 0.8s ease",
      }}>
        {navTab==="chat"    ?<ChatPage    setNavTab={setNavTab} T={T} dark={dark}/>:
         navTab==="compare" ?<ComparePage setNavTab={setNavTab} T={T} dark={dark}/>:
         navTab==="career"  ?<CareerGuidePage setNavTab={setNavTab} T={T} dark={dark}/>:
         navTab==="planner" ?<PlannerPage setNavTab={setNavTab} T={T} dark={dark}/>:
         navTab==="about"   ?<AboutPage   setNavTab={setNavTab} count={exams.length} T={T} dark={dark}/>:(
          <div>
            {/* Top bar */}
            <div style={{background:T.topBg,padding:"16px 16px 0",position:"sticky",top:0,zIndex:50}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <div style={{width:32,height:32,background:"rgba(255,255,255,0.1)",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>📚</div>
                  <div>
                    <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:18,fontWeight:600,color:"#fff",lineHeight:1,letterSpacing:"0.05em"}}>ExamNest</div>
                    <div style={{fontSize:9,color:"#c9a84c",letterSpacing:"0.15em",textTransform:"uppercase"}}>{exams.length}+ Exams · India</div>
                  </div>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:10}}>
                  <div onClick={function(){setDark(!dark);}} style={{cursor:"pointer",display:"flex",alignItems:"center",gap:5}}>
                    <span style={{fontSize:16}}>{dark?"☀️":"🌙"}</span>
                    <div style={{width:40,height:22,background:dark?"#6366f1":"rgba(255,255,255,0.2)",borderRadius:11,position:"relative"}}>
                      <div style={{position:"absolute",top:3,left:dark?18:3,width:16,height:16,background:"#fff",borderRadius:"50%",transition:"left 0.3s ease",boxShadow:"0 1px 4px rgba(0,0,0,0.3)"}}/>
                    </div>
                  </div>
                  <button onClick={function(){setNavTab("chat");}} style={{background:"linear-gradient(135deg,#6366f1,#ec4899)",border:"none",borderRadius:20,padding:"6px 12px",fontSize:11,color:"#fff",fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>🤖 AI</button>
                </div>
              </div>
              <div style={{position:"relative",marginBottom:12}}>
                <span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",fontSize:14,color:"rgba(255,255,255,0.4)"}}>🔍</span>
                <input value={search} onChange={function(e){setSearch(e.target.value);}} placeholder={"Search "+exams.length+"+ Indian exams..."} style={{width:"100%",padding:"11px 36px 11px 36px",background:"rgba(255,255,255,0.1)",border:"1px solid rgba(255,255,255,0.15)",borderRadius:12,color:"#fff",fontSize:14,fontFamily:"inherit"}}/>
                {search&&<span onClick={function(){setSearch("");}} style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",fontSize:14,color:"rgba(255,255,255,0.5)",cursor:"pointer"}}>✕</span>}
              </div>
              <div style={{display:"flex",gap:7,overflowX:"auto",paddingBottom:12}}>
                {categories.map(function(c){
                  return (
                    <button key={c} onClick={function(){setCategory(c);}} style={{flexShrink:0,padding:"5px 11px",borderRadius:20,border:"none",cursor:"pointer",fontSize:11,fontFamily:"inherit",fontWeight:500,background:category===c?"#c9a84c":"rgba(255,255,255,0.1)",color:category===c?"#1a1a2e":"rgba(255,255,255,0.7)"}}>
                      {catIcons[c]} {c}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Feature banners */}
            {/* Changed gridTemplateColumns to '1fr 1fr' for a 2x2 layout */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,padding:"12px 16px 0"}}>
              {[
                {tab:"compare",icon:"⚖️",label:"Compare",sub:"2 exams",bg:"linear-gradient(135deg,#0f172a,#1e3a5f)"},
                {tab:"planner",icon:"📅",label:"Planner",sub:"Saved ✓",bg:"linear-gradient(135deg,#14532d,#166534)"},
                {tab:"chat",icon:"🤖",label:"Ask AI",sub:"Instant help",bg:"linear-gradient(135deg,#1e1b4b,#312e81)"},
                // Added the Career button below:
                {tab:"career",icon:"🎯",label:"Career",sub:"Pathways",bg:"linear-gradient(135deg,#7f1d1d,#b91c1c)"} 
              ].map(function(item){
                return (
       
            <div key={item.tab} onClick={function(){setNavTab(item.tab);}} style={{background:dark?"#1e293b":item.bg,borderRadius:13,padding:"11px 10px",cursor:"pointer",textAlign:"center",boxShadow:"0 3px 12px rgba(0,0,0,0.15)"}}>
                    <div style={{fontSize:20,marginBottom:3}}>{item.icon}</div>
                    <div style={{fontSize:12,fontWeight:700,color:"#fff"}}>{item.label}</div>
                    <div style={{fontSize:10,color:"rgba(255,255,255,0.5)",marginTop:1}}>{item.sub}</div>
                  </div>
                );
              })}
            </div>

            <div style={{padding:"12px 16px 4px"}}>
              {search||category!=="All"?(
                <div style={{fontSize:12,color:T.muted}}>{filtered.length} exam{filtered.length!==1?"s":""} found</div>
              ):(
                <div>
                  <div style={{fontSize:19,fontWeight:700,fontFamily:"'Playfair Display',serif",color:T.text}}>All Exams 🇮🇳</div>
                  <div style={{fontSize:12,color:T.muted,marginTop:2}}>{exams.length}+ exams · Tap for full details</div>
                </div>
              )}
            </div>

            <div style={{padding:"8px 16px",display:"flex",flexDirection:"column",gap:10}}>
              {filtered.map(function(exam,i){
                return (
                  <div key={exam.id} className="card" onClick={function(){openExam(exam);}} style={{background:T.card,borderRadius:16,overflow:"hidden",cursor:"pointer",boxShadow:dark?"0 2px 10px rgba(0,0,0,0.3)":"0 2px 10px rgba(0,0,0,0.06)",animation:"fadeAppear 0.4s ease forwards "+Math.min(i*0.04,0.4)+"s",opacity:0,transition:"transform 0.15s"}}>
                    <div style={{height:3,background:exam.color}}/>
                    <div style={{padding:"13px 14px",display:"flex",alignItems:"center",gap:12}}>
                      <div style={{width:48,height:48,background:exam.color+"22",borderRadius:13,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>{exam.icon}</div>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:2}}>
                          <div style={{fontFamily:"'Playfair Display',serif",fontSize:15,fontWeight:700,color:T.text}}>{exam.name}</div>
                          <div style={{fontSize:16,color:T.muted,flexShrink:0}}>›</div>
                        </div>
                        <div style={{fontSize:11,color:T.muted,marginBottom:6,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{exam.full}</div>
                        <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                          <span style={{background:exam.color+"25",color:exam.color,fontSize:10,fontWeight:600,padding:"2px 7px",borderRadius:6}}>{exam.category}</span>
                          <span style={{background:diffColor[exam.difficulty]+"25",color:diffColor[exam.difficulty],fontSize:10,fontWeight:600,padding:"2px 7px",borderRadius:6}}>{exam.difficulty}</span>
                          <span style={{background:dark?"rgba(255,255,255,0.08)":"#f1f5f9",color:T.subtext,fontSize:10,padding:"2px 7px",borderRadius:6}}>{exam.frequency}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              {filtered.length===0&&(
                <div style={{textAlign:"center",padding:"60px 0",color:T.muted}}>
                  <div style={{fontSize:40,marginBottom:12}}>🔍</div>
                  <div style={{fontSize:15,fontWeight:600,color:T.text}}>No exams found</div>
                  <button onClick={function(){setSearch("");setCategory("All");}} style={{marginTop:14,padding:"9px 22px",background:"#6366f1",color:"#fff",border:"none",borderRadius:12,fontSize:13,cursor:"pointer",fontFamily:"inherit"}}>Clear Filter</button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Bottom Nav */}
        <div style={{position:"fixed",bottom:0,left:0,right:0,background:T.navBg,borderTop:"1px solid "+T.border,display:"flex",zIndex:100}}>
          {[{id:"home",icon:"🏠",label:"Home"},{id:"planner",icon:"📅",label:"Planner"},{id:"compare",icon:"⚖️",label:"Compare"},{id:"career",icon:"🎯",label:"Career"},{id:"chat",icon:"🤖",label:"AI Chat"}].map(function(item){
            return (
              <button key={item.id} onClick={function(){setNavTab(item.id);}} style={{flex:1,padding:"8px 0 6px",background:"none",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:2}}>
                <div style={{fontSize:17}}>{item.icon}</div>
                <div style={{fontSize:8,fontFamily:"inherit",fontWeight:navTab===item.id?600:400,color:navTab===item.id?"#6366f1":T.muted}}>{item.label}</div>
                {navTab===item.id&&<div style={{width:4,height:4,borderRadius:"50%",background:"#6366f1"}}/>}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}

// ─── PLANNER ──────────────────────────────────────────
function PlannerPage(props) {
  var setNavTab=props.setNavTab,T=props.T,dark=props.dark;
  var [data,setData]=useState(function(){return loadData()||{examId:null,examDate:"",progress:{},step:1};});
  var planExam=exams.find(function(e){return e.id===data.examId;})||null;
  function upd(patch){var nd=Object.assign({},data,patch);setData(nd);saveData(nd);}
  var today=new Date();
  var daysLeft=data.examDate?Math.max(0,Math.ceil((new Date(data.examDate)-today)/(1000*60*60*24))):0;
  var allTopics=planExam?Object.entries(planExam.topics).reduce(function(acc,e){return acc.concat(e[1].map(function(t){return{sub:e[0],t:t,key:e[0]+"::"+t};}));},[]):[];
  var total=allTopics.length,done=allTopics.filter(function(x){return data.progress[x.key]===2;}).length,inp=allTopics.filter(function(x){return data.progress[x.key]===1;}).length;
  var pct=total>0?Math.round((done/total)*100):0;
  var daily=daysLeft>0&&total>done?Math.ceil((total-done)/daysLeft):0;
  function tog(key){var np=Object.assign({},data.progress);np[key]=((data.progress[key]||0)+1)%3;upd({progress:np});}
  function si(key){var s=data.progress[key]||0;if(s===0)return{icon:"⬜",label:"Not Started",color:"#94a3b8"};if(s===1)return{icon:"🟡",label:"In Progress",color:"#f59e0b"};return{icon:"✅",label:"Completed",color:"#22c55e"};}
  function reset(){var f={examId:null,examDate:"",progress:{},step:1};setData(f);saveData(f);}
  var wk=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
  function weekPlan(){if(!planExam)return[];var subs=Object.keys(planExam.topics);return wk.map(function(day,i){var s=subs[i%subs.length];return{day:day,sub:s,topics:planExam.topics[s].slice(0,3)};});}
  return(
    <div style={{minHeight:"100vh",background:T.bg,paddingBottom:80,color:T.text}}>
      <div style={{background:"linear-gradient(135deg,#14532d,#166534)",padding:"14px 16px",display:"flex",alignItems:"center",gap:12}}>
        <button onClick={function(){setNavTab("home");}} style={{background:"rgba(255,255,255,0.15)",border:"none",borderRadius:10,padding:"7px 12px",color:"#fff",cursor:"pointer",fontSize:13,fontFamily:"inherit"}}>← Back</button>
        <div style={{flex:1}}><div style={{fontFamily:"'Playfair Display',serif",fontSize:16,fontWeight:700,color:"#fff"}}>📅 Study Planner</div><div style={{fontSize:11,color:"rgba(255,255,255,0.6)"}}>Auto-saved 🔒</div></div>
        {planExam&&data.step===3&&<div style={{background:"rgba(255,255,255,0.2)",borderRadius:20,padding:"4px 10px",fontSize:11,color:"#fff",fontWeight:600}}>{pct}%</div>}
      </div>
      {planExam&&<div style={{background:dark?"#1e293b":"#f0fdf4",padding:"8px 16px",borderBottom:"1px solid "+T.border,display:"flex",gap:7}}><span>🔒</span><span style={{fontSize:12,color:"#16a34a",fontWeight:500}}>Progress saved — never resets!</span></div>}
      <div style={{padding:"16px"}}>
        {data.step===1&&(
          <div>
            <div style={{fontSize:15,fontWeight:700,color:T.text,marginBottom:4}}>Choose your exam</div>
            <div style={{fontSize:12,color:T.muted,marginBottom:14}}>Select the exam you are preparing for</div>
            {exams.filter(function(e){return e.topics;}).map(function(exam){return(
              <div key={exam.id} onClick={function(){upd({examId:exam.id,step:2});}} className="card" style={{background:T.card,borderRadius:14,padding:"13px 14px",cursor:"pointer",display:"flex",alignItems:"center",gap:12,marginBottom:9,boxShadow:dark?"0 2px 8px rgba(0,0,0,0.3)":"0 1px 6px rgba(0,0,0,0.07)",transition:"transform 0.15s"}}>
                <div style={{width:42,height:42,background:exam.color+"20",borderRadius:11,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{exam.icon}</div>
                <div style={{flex:1}}><div style={{fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:700,color:T.text}}>{exam.name}</div><div style={{fontSize:11,color:T.muted,marginTop:2}}>{exam.category} • {exam.difficulty} • {Object.values(exam.topics).reduce(function(a,b){return a+b.length;},0)} topics</div></div>
                <div style={{fontSize:16,color:T.muted}}>›</div>
              </div>
            );})}
          </div>
        )}
        {data.step===2&&planExam&&(
          <div>
            <button onClick={function(){upd({step:1});}} style={{background:"none",border:"none",color:T.muted,cursor:"pointer",fontSize:13,fontFamily:"inherit",marginBottom:14,display:"flex",alignItems:"center",gap:5}}>← Change Exam</button>
            <div style={{background:planExam.color,borderRadius:14,padding:"14px",marginBottom:16,display:"flex",alignItems:"center",gap:12}}><div style={{fontSize:32}}>{planExam.icon}</div><div><div style={{fontFamily:"'Playfair Display',serif",fontSize:18,fontWeight:700,color:"#fff"}}>{planExam.name}</div><div style={{fontSize:12,color:"rgba(255,255,255,0.8)"}}>{planExam.full}</div></div></div>
            <div style={{background:T.card,borderRadius:14,padding:"16px",marginBottom:14}}><input type="date" value={data.examDate} onChange={function(e){upd({examDate:e.target.value});}} min={new Date().toISOString().split("T")[0]} style={{width:"100%",padding:"12px",background:T.card2,border:"1px solid "+T.border,borderRadius:10,fontSize:14,fontFamily:"inherit",color:T.text,cursor:"pointer"}}/></div>
            {data.examDate&&<div style={{background:dark?"#1e293b":"#f0fdf4",borderRadius:14,padding:"14px",marginBottom:14,border:"1px solid #22c55e40"}}><div style={{fontSize:13,color:"#22c55e",fontWeight:600,marginBottom:4}}>🎯 {daysLeft} days left!</div><div style={{fontSize:12,color:T.subtext}}>{daysLeft>=90?"Great! Plenty of time 💪":daysLeft>=30?"Good time. Stay consistent! 📚":daysLeft>=7?"Time is short! Focus! ⚡":"Very few days! High-priority only! 🔥"}</div></div>}
            <button onClick={function(){if(data.examDate)upd({step:3});}} disabled={!data.examDate} style={{width:"100%",padding:"14px",background:data.examDate?"linear-gradient(135deg,#16a34a,#22c55e)":"#334155",border:"none",borderRadius:14,color:"#fff",fontSize:15,fontWeight:600,cursor:data.examDate?"pointer":"not-allowed",fontFamily:"inherit"}}>Generate My Study Plan →</button>
          </div>
        )}
        {data.step===3&&planExam&&data.examDate&&(
          <div>
            <button onClick={function(){upd({step:2});}} style={{background:"none",border:"none",color:T.muted,cursor:"pointer",fontSize:13,fontFamily:"inherit",marginBottom:14}}>← Change Date</button>
            <div style={{background:planExam.color,borderRadius:16,padding:"16px",marginBottom:14}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
                <div><div style={{fontFamily:"'Playfair Display',serif",fontSize:17,fontWeight:700,color:"#fff"}}>{planExam.name}</div><div style={{fontSize:12,color:"rgba(255,255,255,0.75)",marginTop:2}}>🗓️ {daysLeft} days remaining</div></div>
                <div style={{textAlign:"right"}}><div style={{fontFamily:"'Playfair Display',serif",fontSize:32,fontWeight:900,color:"#fff"}}>{pct}%</div><div style={{fontSize:10,color:"rgba(255,255,255,0.7)"}}>completed</div></div>
              </div>
              <div style={{background:"rgba(0,0,0,0.2)",borderRadius:10,height:10,overflow:"hidden",marginBottom:10}}><div style={{height:"100%",borderRadius:10,background:"rgba(255,255,255,0.9)",width:pct+"%",transition:"width 0.5s ease"}}/></div>
              <div style={{display:"flex",gap:16}}>{[["✅",done,"Done"],["🟡",inp,"In Progress"],["⬜",total-done-inp,"Pending"]].map(function(a){return <div key={a[2]} style={{textAlign:"center"}}><div style={{fontSize:16,fontWeight:700,color:"#fff"}}>{a[1]}</div><div style={{fontSize:9,color:"rgba(255,255,255,0.7)"}}>{a[0]} {a[2]}</div></div>;})}{daily>0&&<div style={{textAlign:"center",marginLeft:"auto"}}><div style={{fontSize:16,fontWeight:700,color:"#fff"}}>{daily}</div><div style={{fontSize:9,color:"rgba(255,255,255,0.7)"}}>📅/day</div></div>}</div>
            </div>
            <div style={{background:T.card,borderRadius:14,padding:"14px",marginBottom:14}}>
              <div style={{fontSize:13,fontWeight:700,color:T.text,marginBottom:10}}>📋 Weekly Schedule</div>
              {weekPlan().map(function(item,i){return(<div key={i} style={{display:"flex",gap:10,padding:"7px 0",borderBottom:i<6?"1px solid "+T.border:"none"}}><div style={{width:65,fontSize:11,fontWeight:700,color:planExam.color,flexShrink:0}}>{item.day}</div><div style={{fontSize:11,color:T.muted}}><span style={{fontWeight:600,color:T.subtext}}>{item.sub}:</span> {item.topics.join(", ")}</div></div>);})}
            </div>
            <div style={{fontSize:14,fontWeight:700,color:T.text,marginBottom:6}}>📊 Topic Tracker</div>
            <div style={{fontSize:11,color:T.muted,marginBottom:10}}>Tap any topic to update • Auto-saved 🔒</div>
            {Object.entries(planExam.topics).map(function(entry){
              var subject=entry[0],topics=entry[1];
              var subDone=topics.filter(function(t){return data.progress[subject+"::"+t]===2;}).length;
              return(
                <div key={subject} style={{marginBottom:14}}>
                  <div style={{background:planExam.color,borderRadius:"10px 10px 0 0",padding:"8px 14px",display:"flex",justifyContent:"space-between"}}><div style={{fontSize:13,fontWeight:700,color:"#fff"}}>{subject}</div><div style={{fontSize:10,color:"rgba(255,255,255,0.75)"}}>{subDone}/{topics.length} done</div></div>
                  <div style={{background:T.card,borderRadius:"0 0 10px 10px",overflow:"hidden"}}>
                    {topics.map(function(topic,i){var key=subject+"::"+topic,st=si(key);return(
                      <div key={i} onClick={function(){tog(key);}} style={{display:"flex",alignItems:"center",gap:12,padding:"11px 14px",borderBottom:i<topics.length-1?"1px solid "+T.border:"none",cursor:"pointer"}}>
                        <span style={{fontSize:18,flexShrink:0}}>{st.icon}</span>
                        <div style={{flex:1}}><div style={{fontSize:13,color:T.text,fontWeight:500}}>{topic}</div><div style={{fontSize:10,color:st.color,marginTop:1}}>{st.label}</div></div>
                        <span style={{fontSize:10,color:T.muted}}>tap</span>
                      </div>
                    );})}
                  </div>
                </div>
              );
            })}
            {pct===100&&<div style={{background:"linear-gradient(135deg,#14532d,#166534)",borderRadius:14,padding:"16px",textAlign:"center",marginTop:8}}><div style={{fontSize:36,marginBottom:8}}>🎉</div><div style={{fontFamily:"'Playfair Display',serif",fontSize:18,fontWeight:700,color:"#fff",marginBottom:4}}>All Topics Completed!</div><div style={{fontSize:13,color:"rgba(255,255,255,0.8)"}}>Now focus on revision and mock tests! 💪</div></div>}
            <button onClick={reset} style={{width:"100%",marginTop:16,padding:"12px",background:"none",border:"1px solid "+T.border,borderRadius:12,color:T.muted,fontSize:13,cursor:"pointer",fontFamily:"inherit"}}>🔄 Reset & Start Different Exam</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── COMPARE ──────────────────────────────────────────
function ComparePage(props) {
  var setNavTab=props.setNavTab,T=props.T,dark=props.dark;
  var [e1,setE1]=useState(exams[0]);
  var [e2,setE2]=useState(exams[2]);
  var rows=[{label:"Category",icon:"🏷️",fn:function(e){return e.category;}},{label:"Difficulty",icon:"🔥",fn:function(e){return e.difficulty;}},{label:"Frequency",icon:"📅",fn:function(e){return e.frequency;}},{label:"Total Marks",icon:"📊",fn:function(e){return e.pattern.total;}},{label:"Duration",icon:"⏱️",fn:function(e){return e.pattern.duration;}},{label:"Negative Marking",icon:"⚠️",fn:function(e){return e.pattern.negative;}},{label:"Available Seats",icon:"🪑",fn:function(e){return e.seats;}},{label:"Avg Salary",icon:"💰",fn:function(e){return e.salary;}},{label:"Course Duration",icon:"🗓️",fn:function(e){return e.duration;}},{label:"Eligibility",icon:"✅",fn:function(e){return e.eligibility;}}];
  return(
    <div style={{minHeight:"100vh",background:T.bg,paddingBottom:80,color:T.text}}>
      <div style={{background:"linear-gradient(135deg,#0f172a,#1e3a5f)",padding:"14px 16px",display:"flex",alignItems:"center",gap:12}}>
        <button onClick={function(){setNavTab("home");}} style={{background:"rgba(255,255,255,0.15)",border:"none",borderRadius:10,padding:"7px 12px",color:"#fff",cursor:"pointer",fontSize:13,fontFamily:"inherit"}}>← Back</button>
        <div><div style={{fontFamily:"'Playfair Display',serif",fontSize:16,fontWeight:700,color:"#fff"}}>⚖️ Compare Exams</div><div style={{fontSize:11,color:"rgba(255,255,255,0.6)"}}>Pick any 2 from {exams.length}+ exams</div></div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,padding:"14px 14px 0"}}>
        {[{val:e1,set:setE1,label:"Exam 1"},{val:e2,set:setE2,label:"Exam 2"}].map(function(item,idx){return(
          <div key={idx}>
            <div style={{fontSize:11,color:T.muted,marginBottom:6,fontWeight:600}}>{item.label}</div>
            <div style={{background:T.card,borderRadius:12,border:"2px solid "+item.val.color,overflow:"hidden"}}>
              <div style={{background:item.val.color,padding:"8px 10px",display:"flex",alignItems:"center",gap:7}}><span style={{fontSize:18}}>{item.val.icon}</span><span style={{fontSize:12,fontWeight:700,color:"#fff"}}>{item.val.name}</span></div>
              <select value={item.val.id} onChange={function(ev){item.set(exams.find(function(x){return x.id===ev.target.value;}));}} style={{width:"100%",padding:"8px 10px",border:"none",background:T.card,fontSize:12,fontFamily:"inherit",color:T.text,cursor:"pointer"}}>
                {exams.map(function(ex){return <option key={ex.id} value={ex.id}>{ex.name} ({ex.category})</option>;})}
              </select>
            </div>
          </div>
        );})}
      </div>
      <div style={{textAlign:"center",padding:"10px 0 6px"}}><span style={{background:"#1a1a2e",color:"#fff",borderRadius:20,padding:"4px 14px",fontSize:12,fontWeight:700}}>VS</span></div>
      <div style={{padding:"0 14px"}}>
        {rows.map(function(row,i){return(
          <div key={i} style={{background:T.card,borderRadius:13,marginBottom:9,overflow:"hidden",boxShadow:dark?"0 2px 8px rgba(0,0,0,0.3)":"0 1px 6px rgba(0,0,0,0.05)"}}>
            <div style={{background:dark?"rgba(255,255,255,0.05)":"#f8f7f4",padding:"6px 12px",fontSize:11,fontWeight:600,color:T.muted,borderBottom:"1px solid "+T.border}}>{row.icon} {row.label}</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 4px 1fr"}}><div style={{padding:"10px 12px",fontSize:12,color:T.text,lineHeight:1.5}}>{row.fn(e1)}</div><div style={{background:T.border}}/><div style={{padding:"10px 12px",fontSize:12,color:T.text,lineHeight:1.5}}>{row.fn(e2)}</div></div>
          </div>
        );})}
        <div style={{background:T.card,borderRadius:13,padding:"14px",marginBottom:9}}>
          <div style={{fontSize:12,fontWeight:600,color:T.muted,marginBottom:12}}>🔥 DIFFICULTY METER</div>
          {[e1,e2].map(function(e,i){return(
            <div key={i} style={{marginBottom:i===0?12:0}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}><span style={{fontSize:12,fontWeight:600,color:T.text}}>{e.name}</span><span style={{fontSize:11,color:diffColor[e.difficulty],fontWeight:600}}>{e.difficulty}</span></div>
              <div style={{background:dark?"rgba(255,255,255,0.08)":"#f1f5f9",borderRadius:10,height:10,overflow:"hidden"}}><div style={{height:"100%",borderRadius:10,background:diffColor[e.difficulty],width:(e.diffScore*20)+"%",transition:"width 0.5s ease"}}/></div>
            </div>
          );})}
        </div>
        <div style={{background:"linear-gradient(135deg,#1a1a2e,#2d1b69)",borderRadius:13,padding:"14px"}}>
          <div style={{fontSize:12,fontWeight:600,color:"rgba(255,255,255,0.6)",marginBottom:8}}>💡 QUICK VERDICT</div>
          <div style={{fontSize:13,color:"#fff",lineHeight:1.7}}>{e1.diffScore<e2.diffScore?"✅ "+e1.name+" is easier than "+e2.name+".":e1.diffScore>e2.diffScore?"✅ "+e2.name+" is easier than "+e1.name+".":"🤝 Both have similar difficulty."} Choose based on your stream and career goals!</div>
        </div>
      </div>
    </div>
  );
}

// ─── CHAT (⚡ UPGRADED WITH GEMINI AI) ─────────────────────────────────────────────
function ChatPage(props) {
  var setNavTab=props.setNavTab,T=props.T;
  var [messages,setMessages]=useState([{role:"bot",text:"👋 Hi! I am **ExamBot**!\n\nI am now powered by **Google Gemini AI** and I know about "+exams.length+"+ Indian exams!\n\nAsk me about syllabus, cutoffs, books, tips or eligibility for any exam! 😊"}]);
  var [input,setInput]=useState("");
  var [loading,setLoading]=useState(false);
  var bottomRef=useRef(null);
  
  useEffect(function(){if(bottomRef.current)bottomRef.current.scrollIntoView({behavior:"smooth"});},[messages,loading]);
  
  // 🚀 ADDED: The new Async send function to talk to Gemini
  async function send(text){
    var q=(text||input).trim();
    if(!q||loading)return;
    setInput("");
    setMessages(function(p){return p.concat([{role:"user",text:q}]);});
    setLoading(true);
    
    try {
      var aiReply = await askGemini(q, { type: "general" });
      setMessages(function(p){return p.concat([{role:"bot",text:aiReply}]);});
    } catch (e) {
      setMessages(function(p){return p.concat([{role:"bot",text:"❌ Connection Error. Please try again."}]);});
    }
    setLoading(false);
  }
  
  function fmt(t){return t.replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>").replace(/\n/g,"<br/>");}
  var quickQs=["Hello! What can you do?","JEE Main cutoff 2024","Best books for UPSC","NEET eligibility","Toughest exam in India"];
  
  return(
    <div style={{height:"100vh",display:"flex",flexDirection:"column",background:T.bg}}>
      <div style={{background:"linear-gradient(135deg,#1e1b4b,#312e81)",padding:"14px 16px",display:"flex",alignItems:"center",gap:12,flexShrink:0}}>
        <button onClick={function(){setNavTab("home");}} style={{background:"rgba(255,255,255,0.15)",border:"none",borderRadius:10,padding:"7px 12px",color:"#fff",cursor:"pointer",fontSize:13,fontFamily:"inherit"}}>← Back</button>
        <div style={{width:34,height:34,background:"linear-gradient(135deg,#6366f1,#ec4899)",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontSize:17}}>🤖</div>
        <div><div style={{fontSize:14,fontWeight:700,color:"#fff"}}>ExamBot AI</div><div style={{fontSize:11,color:"rgba(255,255,255,0.6)"}}>{exams.length}+ exams · Ask anything</div></div>
        <div style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:5}}><div style={{width:7,height:7,borderRadius:"50%",background:"#22c55e"}}/><span style={{fontSize:10,color:"rgba(255,255,255,0.5)"}}>Online</span></div>
      </div>
      {messages.length===1&&<div style={{padding:"10px 14px",flexShrink:0}}><div style={{fontSize:11,color:T.muted,marginBottom:7}}>💡 Try asking:</div><div style={{display:"flex",flexWrap:"wrap",gap:6}}>{quickQs.map(function(q,i){return <button key={i} onClick={function(){send(q);}} style={{background:T.card,border:"1px solid rgba(99,102,241,0.25)",borderRadius:20,padding:"5px 10px",fontSize:11,color:"#6366f1",cursor:"pointer",fontFamily:"inherit",fontWeight:500}}>{q}</button>;})}</div></div>}
      <div style={{flex:1,overflowY:"auto",padding:"10px 14px",display:"flex",flexDirection:"column",gap:10}}>
        {messages.map(function(msg,i){return(
          <div key={i} style={{display:"flex",justifyContent:msg.role==="user"?"flex-end":"flex-start",animation:"fadeIn 0.3s ease forwards"}}>
            {msg.role==="bot"&&<div style={{width:28,height:28,background:"linear-gradient(135deg,#6366f1,#ec4899)",borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,flexShrink:0,marginRight:7,alignSelf:"flex-end"}}>🤖</div>}
            <div style={{maxWidth:"82%",padding:"10px 13px",borderRadius:msg.role==="user"?"16px 16px 4px 16px":"16px 16px 16px 4px",background:msg.role==="user"?"linear-gradient(135deg,#6366f1,#818cf8)":T.card,color:msg.role==="user"?"#fff":T.text,fontSize:13,lineHeight:1.7,boxShadow:"0 2px 8px rgba(0,0,0,0.1)"}} dangerouslySetInnerHTML={{__html:fmt(msg.text)}}/>
          </div>
        );})}
        {loading&&<div style={{display:"flex",gap:7,alignItems:"flex-end"}}><div style={{width:28,height:28,background:"linear-gradient(135deg,#6366f1,#ec4899)",borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13}}>🤖</div><div style={{background:T.card,borderRadius:"16px 16px 16px 4px",padding:"13px 16px",display:"flex",gap:5,alignItems:"center"}}>{[0,1,2].map(function(j){return <div key={j} style={{width:7,height:7,borderRadius:"50%",background:"#6366f1",animation:"bounce 0.8s ease infinite",animationDelay:(j*0.15)+"s"}}/>;})}</div></div>}
        <div ref={bottomRef}/>
      </div>
      <div style={{padding:"10px 14px",background:T.navBg,borderTop:"1px solid "+T.border,display:"flex",gap:9,alignItems:"flex-end",flexShrink:0}}>
        <textarea value={input} onChange={function(e){setInput(e.target.value);}} onKeyDown={function(e){if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send();}}} placeholder="Ask about any exam..." rows={1} style={{flex:1,padding:"10px 13px",background:T.card2,border:"1px solid "+T.border,borderRadius:13,fontSize:13,fontFamily:"inherit",resize:"none",color:T.text,maxHeight:90}}/>
        <button onClick={function(){send();}} disabled={loading||!input.trim()} style={{width:42,height:42,borderRadius:13,border:"none",cursor:loading||!input.trim()?"not-allowed":"pointer",background:loading||!input.trim()?"#334155":"linear-gradient(135deg,#6366f1,#818cf8)",color:"#fff",fontSize:17,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>➤</button>
      </div>
    </div>
  );
}

// ─── DETAIL ───────────────────────────────────────────
function DetailPage(props) {
  var exam=props.exam,goHome=props.goHome,tab=props.tab,setTab=props.setTab,T=props.T,dark=props.dark;
  var tabs=[{id:"syllabus",label:"Syllabus",icon:"📖"},{id:"pattern",label:"Pattern",icon:"📋"},{id:"cutoff",label:"Cutoff",icon:"📊"},{id:"books",label:"Books",icon:"📚"},{id:"tips",label:"Tips",icon:"💡"}];
  return(
    <div style={{minHeight:"100vh",background:T.bg,paddingBottom:30,color:T.text}}>
      <div style={{background:exam.color,padding:"14px 16px 0",position:"sticky",top:0,zIndex:50}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
          <button onClick={goHome} style={{background:"rgba(255,255,255,0.22)",border:"none",borderRadius:10,padding:"7px 13px",color:"#fff",cursor:"pointer",fontSize:13,fontFamily:"inherit",fontWeight:500}}>← Back</button>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:14,fontWeight:600,color:"rgba(255,255,255,0.85)",letterSpacing:"0.05em"}}>ExamNest</div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:13,marginBottom:14}}>
          <div style={{width:54,height:54,background:"rgba(255,255,255,0.2)",borderRadius:14,display:"flex",alignItems:"center",justifyContent:"center",fontSize:27,flexShrink:0}}>{exam.icon}</div>
          <div>
            <div style={{fontSize:10,color:"rgba(255,255,255,0.7)",textTransform:"uppercase",marginBottom:2}}>{exam.category}</div>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:21,fontWeight:900,color:"#fff",lineHeight:1.1}}>{exam.name}</div>
            <div style={{fontSize:11,color:"rgba(255,255,255,0.75)",marginTop:2}}>{exam.full}</div>
          </div>
        </div>
        <div style={{display:"flex",background:"rgba(0,0,0,0.15)",borderRadius:11,overflow:"hidden",marginBottom:14}}>
          {[["Marks",exam.pattern.total],["Duration",exam.pattern.duration],["Seats",exam.seats]].map(function(arr,i){return(<div key={arr[0]} style={{flex:1,padding:"9px 6px",textAlign:"center",borderRight:i<2?"1px solid rgba(255,255,255,0.1)":"none"}}><div style={{fontSize:9,color:"rgba(255,255,255,0.6)",textTransform:"uppercase",marginBottom:2}}>{arr[0]}</div><div style={{fontSize:10,fontWeight:600,color:"#fff",lineHeight:1.3}}>{arr[1]}</div></div>);})}
        </div>
        <div style={{display:"flex",overflowX:"auto"}}>{tabs.map(function(t){return(<button key={t.id} onClick={function(){setTab(t.id);}} style={{flexShrink:0,padding:"9px 13px",background:"none",border:"none",cursor:"pointer",fontSize:11,fontFamily:"inherit",fontWeight:tab===t.id?600:400,color:tab===t.id?"#fff":"rgba(255,255,255,0.55)",borderBottom:"2px solid "+(tab===t.id?"#fff":"transparent"),whiteSpace:"nowrap"}}>{t.icon} {t.label}</button>);})}</div>
      </div>
      <div style={{background:T.card,padding:"10px 16px",borderBottom:"1px solid "+T.border,display:"flex",gap:7}}><span>✅</span><div style={{fontSize:12,color:T.subtext,lineHeight:1.6}}><strong style={{color:T.text}}>Eligibility:</strong> {exam.eligibility}</div></div>
      <div style={{padding:"12px 14px"}}>
        {tab==="syllabus"&&exam.syllabus.map(function(s,i){var p=s.split(": ");return(<div key={i} style={{background:T.card,borderRadius:12,padding:"12px 14px",marginBottom:9,borderLeft:"4px solid "+exam.color,boxShadow:dark?"0 2px 8px rgba(0,0,0,0.2)":"0 1px 5px rgba(0,0,0,0.05)"}}><div style={{fontWeight:700,fontSize:13,marginBottom:4,color:T.text}}>{p[0]}</div>{p[1]&&<div style={{fontSize:12,color:T.subtext,lineHeight:1.6}}>{p.slice(1).join(": ")}</div>}</div>);})}
        {tab==="pattern"&&<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9}}>{Object.entries(exam.pattern).map(function(e){return(<div key={e[0]} style={{background:T.card,borderRadius:12,padding:"12px",boxShadow:dark?"0 2px 8px rgba(0,0,0,0.2)":"0 1px 5px rgba(0,0,0,0.05)",textAlign:"center"}}><div style={{fontSize:9,color:T.muted,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:7}}>{e[0].replace(/([A-Z])/g," $1").trim()}</div><div style={{fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:700,color:exam.color,lineHeight:1.3}}>{e[1]}</div></div>);})}</div>}
        {tab==="cutoff"&&<div><div style={{background:T.card,borderRadius:12,overflow:"hidden"}}><div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr 1fr",background:exam.color+"25",padding:"9px 8px"}}>{["Year","Gen","OBC","SC","ST"].map(function(h){return <div key={h} style={{fontSize:10,fontWeight:700,textAlign:"center",color:T.text}}>{h}</div>;})}</div>{exam.cutoff.map(function(row,i){return(<div key={i} style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr 1fr",padding:"10px 8px",borderTop:"1px solid "+T.border}}><div style={{fontSize:12,fontWeight:700,color:exam.color,textAlign:"center"}}>{row.year}</div>{[row.general,row.obc,row.sc,row.st].map(function(v,j){return <div key={j} style={{fontSize:12,textAlign:"center",color:T.text}}>{v}</div>;})}</div>);})}</div><div style={{fontSize:11,color:T.muted,marginTop:8,textAlign:"center"}}>* Indicative. Verify from official sources.</div></div>}
        {tab==="books"&&exam.books.map(function(book,i){return(<div key={i} style={{background:T.card,borderRadius:12,padding:"12px 14px",marginBottom:9,display:"flex",alignItems:"center",gap:11,boxShadow:dark?"0 2px 8px rgba(0,0,0,0.2)":"0 1px 5px rgba(0,0,0,0.05)"}}><div style={{width:32,height:32,background:exam.color+"22",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,flexShrink:0}}>📖</div><div style={{fontSize:13,fontWeight:500,color:T.text}}>{book}</div></div>);})}
        {tab==="tips"&&exam.tips.map(function(tip,i){return(<div key={i} style={{background:T.card,borderRadius:12,padding:"12px 14px",marginBottom:9,display:"flex",gap:11,boxShadow:dark?"0 2px 8px rgba(0,0,0,0.2)":"0 1px 5px rgba(0,0,0,0.05)"}}><div style={{width:25,height:25,background:exam.color,borderRadius:7,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:700,fontSize:12,flexShrink:0}}>{i+1}</div><div style={{fontSize:13,color:T.text,lineHeight:1.7,paddingTop:2}}>{tip}</div></div>);})}
      </div>
    </div>
  );
}

// ─── ABOUT ────────────────────────────────────────────
function AboutPage(props) {
  var setNavTab=props.setNavTab,count=props.count,T=props.T,dark=props.dark;
  return(
    <div style={{minHeight:"100vh",background:T.bg,paddingBottom:80,color:T.text}}>
      <div style={{background:"#1a1a2e",padding:"14px 16px",display:"flex",alignItems:"center",gap:10}}>
        <button onClick={function(){setNavTab("home");}} style={{background:"rgba(255,255,255,0.1)",border:"none",borderRadius:10,padding:"7px 12px",color:"#fff",cursor:"pointer",fontSize:13,fontFamily:"inherit"}}>← Back</button>
        <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:17,fontWeight:600,color:"#fff",letterSpacing:"0.05em"}}>About ExamNest</div>
      </div>
      <div style={{padding:"16px"}}>
        {[
          {icon:"📚",title:"Who We Are",text:"ExamNest is India's most complete free exam platform — covering "+count+"+ exams across Engineering, Medical, UPSC, SSC, Banking, Railway, Defence, Management, Law, Commerce & more!",color:"#f97316"},
          {icon:"🎬",title:"Cinematic Experience",text:"ExamNest features a stunning cinematic intro every time you open the app — because your exam journey deserves a grand entrance!",color:"#c9a84c"},
          {icon:"🤖",title:"AI Chatbot",text:"ExamBot knows all Indian exams — ask about syllabus, cutoffs, books, tips, eligibility instantly. Works offline!",color:"#6366f1"},
          {icon:"⚖️",title:"Exam Comparison",text:"Compare any 2 exams side by side — difficulty, salary, seats, duration, eligibility and more!",color:"#0ea5e9"},
          {icon:"📅",title:"Study Planner",text:"Personalised weekly plan + topic tracker. Progress saved permanently — never resets even if you close the app! 🔒",color:"#16a34a"},
          {icon:"🌙",title:"Dark Mode",text:"Easy on eyes for night studying! Tap the moon icon in the top bar to switch between light and dark mode.",color:"#7c3aed"},
        ].map(function(item,i){return(
          <div key={i} style={{background:T.card,borderRadius:14,padding:"16px",marginBottom:11,boxShadow:dark?"0 2px 8px rgba(0,0,0,0.3)":"0 2px 8px rgba(0,0,0,0.05)",display:"flex",gap:13,alignItems:"flex-start"}}>
            <div style={{width:42,height:42,background:item.color+"20",borderRadius:11,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{item.icon}</div>
            <div><div style={{fontFamily:"'Playfair Display',serif",fontSize:15,fontWeight:700,marginBottom:5,color:T.text}}>{item.title}</div><div style={{fontSize:13,color:T.subtext,lineHeight:1.7}}>{item.text}</div></div>
          </div>
        );})}
        <div style={{textAlign:"center",marginTop:16,fontSize:12,color:T.muted}}>© 2026 ExamNest · {count}+ Exams · Made with ❤️ for Indian Students</div>
      </div>
    </div>
  );
}
