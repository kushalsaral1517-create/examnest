import { useState, useRef, useEffect } from "react";

const exams = [
  { id:"jee-main", name:"JEE Main", full:"Joint Entrance Examination Main", category:"Engineering", color:"#f97316", icon:"⚙️", difficulty:"High", diffScore:3, frequency:"Twice a year", seats:"~11 lakh", salary:"₹8-25 LPA", duration:"4 years",
    syllabus:["Physics: Mechanics, Thermodynamics, Electrostatics, Optics, Modern Physics","Chemistry: Physical, Organic & Inorganic Chemistry","Mathematics: Algebra, Calculus, Coordinate Geometry, Trigonometry"],
    topics:{"Physics":["Mechanics","Thermodynamics","Electrostatics","Optics","Modern Physics","Waves","Current Electricity"],"Chemistry":["Physical Chemistry","Organic Chemistry","Inorganic Chemistry","Chemical Bonding","Equilibrium"],"Mathematics":["Algebra","Calculus","Coordinate Geometry","Trigonometry","Statistics","Vectors"]},
    pattern:{duration:"3 hours",questions:"90 MCQs",total:"300 marks",negative:"Yes (-1 per wrong)"},
    cutoff:[{year:2024,general:90.7,obc:75.3,sc:54.0,st:44.1},{year:2023,general:88.4,obc:72.1,sc:51.9,st:42.0}],
    books:["HC Verma – Concepts of Physics","NCERT Chemistry XI & XII","RD Sharma / Arihant Maths","DC Pandey – Electricity & Magnetism"],
    eligibility:"Class 12 with PCM. Min 75% marks (65% SC/ST).",
    tips:["Master NCERT before advanced books","Solve 10+ years previous papers","Focus on weak chapters","Attempt mocks under exam conditions"] },
  { id:"jee-adv", name:"JEE Advanced", full:"Joint Entrance Examination Advanced", category:"Engineering", color:"#ea580c", icon:"🏆", difficulty:"Extremely High", diffScore:5, frequency:"Once a year", seats:"~17,000", salary:"₹15-50 LPA", duration:"4 years",
    syllabus:["Physics: Full JEE syllabus at deeper level","Chemistry: Full JEE syllabus at deeper level","Mathematics: Full JEE syllabus at deeper level"],
    topics:{"Physics":["Mechanics (Advanced)","Thermodynamics (Advanced)","Electrostatics (Advanced)","Optics (Advanced)","Modern Physics"],"Chemistry":["Physical Chemistry (Advanced)","Organic Chemistry (Advanced)","Inorganic Chemistry (Advanced)"],"Mathematics":["Algebra (Advanced)","Calculus (Advanced)","Coordinate Geometry (Advanced)","Complex Numbers"]},
    pattern:{duration:"6 hours (2 papers)",questions:"54 per paper",total:"360 marks",negative:"Yes (varies)"},
    cutoff:[{year:2024,general:109,obc:98,sc:54,st:54},{year:2023,general:91,obc:82,sc:45,st:45}],
    books:["IIT JEE previous year papers","Irodov – Problems in Physics","Morrison Boyd – Organic Chemistry","Hall & Knight – Higher Algebra"],
    eligibility:"Top 2.5 lakh JEE Main qualifiers. Max 2 attempts.",
    tips:["Concept clarity over quantity","Practice IIT previous papers extensively","Time management is critical","Don't ignore any topic"] },
  { id:"neet-ug", name:"NEET UG", full:"National Eligibility cum Entrance Test UG", category:"Medical", color:"#10b981", icon:"🩺", difficulty:"Very High", diffScore:4, frequency:"Once a year", seats:"~1.08 lakh", salary:"₹6-20 LPA", duration:"5.5 years",
    syllabus:["Physics: Class 11 & 12 NCERT","Chemistry: Physical, Organic, Inorganic (NCERT)","Biology: Botany & Zoology (NCERT XI & XII)"],
    topics:{"Biology":["Cell Biology","Genetics","Ecology","Human Physiology","Plant Physiology","Reproduction","Evolution","Biotechnology"],"Chemistry":["Physical Chemistry","Organic Chemistry","Inorganic Chemistry","Biomolecules","Polymers"],"Physics":["Mechanics","Thermodynamics","Optics","Modern Physics","Electrostatics","Current Electricity"]},
    pattern:{duration:"3 hours 20 min",questions:"200 (attempt 180)",total:"720 marks",negative:"Yes (-1 per wrong)"},
    cutoff:[{year:2024,general:720,obc:137,sc:107,st:107},{year:2023,general:720,obc:129,sc:100,st:100}],
    books:["NCERT Biology XI & XII","DC Pandey – Physics for NEET","OP Tandon – Physical Chemistry","MTG Objective NCERT at Your Fingertips"],
    eligibility:"Class 12 with PCB. Min age 17.",
    tips:["NCERT is the bible","Biology carries 360/720 marks","Revise with spaced repetition","Attempt full mocks weekly"] },
  { id:"upsc-cse", name:"UPSC CSE", full:"Civil Services Examination", category:"Government", color:"#6366f1", icon:"🏛️", difficulty:"Extremely High", diffScore:5, frequency:"Once a year", seats:"~1000", salary:"₹56,100-₹2.5 LPA", duration:"1-2 years prep",
    syllabus:["Prelims: GS Paper I, CSAT (Paper II)","Mains: Essay, GS I–IV, Optional (2 papers)","Interview: Personality Test (275 marks)"],
    topics:{"History":["Ancient India","Medieval India","Modern India","World History","Art & Culture"],"Geography":["Physical Geography","Indian Geography","World Geography","Environment"],"Polity":["Constitution","Parliament","Judiciary","Federalism","Governance"],"Economy":["Indian Economy","Budget","Planning","Agriculture","Industry"],"Current Affairs":["National","International","Science & Tech","Environment","Social Issues"]},
    pattern:{duration:"Prelims: 4hr | Mains: 9 papers",questions:"Prelims 200 MCQs | Mains descriptive",total:"2025 marks (Mains + Interview)",negative:"Prelims: -0.33 per wrong"},
    cutoff:[{year:2024,general:104,obc:98,sc:88,st:84},{year:2023,general:101,obc:95,sc:85,st:81}],
    books:["NCERT VI–XII – Foundation","Laxmikanth – Indian Polity","Spectrum – Modern Indian History","Economic Survey + India Yearbook"],
    eligibility:"Graduate from recognised university. Age: 21–32 (Gen).",
    tips:["Start with NCERTs","Make concise notes from Day 1","Read The Hindu daily","Choose optional wisely"] },
  { id:"ssc-cgl", name:"SSC CGL", full:"Staff Selection Commission Combined Graduate Level", category:"Government", color:"#14b8a6", icon:"📋", difficulty:"Moderate", diffScore:2, frequency:"Once a year", seats:"~10,000+", salary:"₹25,000-₹1.5 LPA", duration:"6 months prep",
    syllabus:["General Intelligence & Reasoning","General Awareness","Quantitative Aptitude","English Comprehension"],
    topics:{"Reasoning":["Analogy","Series","Coding-Decoding","Puzzles","Blood Relations","Direction","Syllogism"],"Quantitative Aptitude":["Number System","Percentage","Profit & Loss","Ratio","Time & Work","Geometry","Trigonometry"],"General Awareness":["Current Affairs","History","Geography","Polity","Economy","Science"],"English":["Grammar","Vocabulary","Comprehension","Error Detection","Fill in Blanks"]},
    pattern:{duration:"Tier I: 60 min | Tier II: 2.5 hr",questions:"Tier I: 100 | Tier II: varies",total:"Tier I: 200 | Tier II: 800",negative:"Yes"},
    cutoff:[{year:2024,general:145,obc:138,sc:128,st:120},{year:2023,general:142,obc:135,sc:125,st:117}],
    books:["Lucent GK","RS Aggarwal – Maths & Reasoning","SP Bakshi – English","Kiran SSC CGL Previous Papers"],
    eligibility:"Graduate from recognised university. Age: 18–32.",
    tips:["Current affairs from last 6 months","Speed & accuracy in Quant","English grammar rules","Daily 2 hours practice tests"] },
  { id:"cat", name:"CAT", full:"Common Admission Test", category:"Management", color:"#ec4899", icon:"📊", difficulty:"High", diffScore:3, frequency:"Once a year", seats:"~5,000 (IIMs)", salary:"₹15-50 LPA", duration:"2 years (MBA)",
    syllabus:["VARC: Reading Comprehension, Para Summary, Para Jumbles","DILR: Data Interpretation, Logical Reasoning","QA: Arithmetic, Algebra, Geometry, Number System"],
    topics:{"VARC":["Reading Comprehension","Para Summary","Para Jumbles","Odd Sentence Out","Critical Reasoning"],"DILR":["Data Interpretation","Logical Reasoning","Puzzles","Arrangements","Games & Tournaments"],"QA":["Arithmetic","Algebra","Geometry","Number System","Modern Maths"]},
    pattern:{duration:"2 hours",questions:"66 questions",total:"198 marks",negative:"Yes (-1 per wrong MCQ)"},
    cutoff:[{year:2024,general:99,obc:97,sc:90,st:85},{year:2023,general:99,obc:96,sc:88,st:83}],
    books:["Arun Sharma – QA & DI","Verbal Ability by Arun Sharma","TIME/CL study material","Previous year CAT papers"],
    eligibility:"Graduate with min 50% marks (45% SC/ST).",
    tips:["Accuracy > Speed","VARC: Read editorials daily","DILR: Practice set-based questions","Attempt 3-4 mocks per week from August"] },
  { id:"gate", name:"GATE", full:"Graduate Aptitude Test in Engineering", category:"Engineering", color:"#f59e0b", icon:"🔬", difficulty:"High", diffScore:3, frequency:"Once a year", seats:"Varies by PSU", salary:"₹6-12 LPA", duration:"2 years (M.Tech)",
    syllabus:["Core Engineering Subject (branch-specific)","Engineering Mathematics","General Aptitude (Verbal + Numerical)"],
    topics:{"Engineering Mathematics":["Linear Algebra","Calculus","Differential Equations","Probability","Numerical Methods"],"General Aptitude":["Verbal Ability","Numerical Ability","Reasoning"],"Core Subject":["Data Structures","Algorithms","Operating Systems","Computer Networks","Database"]},
    pattern:{duration:"3 hours",questions:"65 questions",total:"100 marks",negative:"Yes (MCQs only)"},
    cutoff:[{year:2024,general:31.7,obc:28.5,sc:21.1,st:21.1},{year:2023,general:30.0,obc:27.0,sc:20.0,st:20.0}],
    books:["Made Easy / ACE Academy notes","Standard textbooks by subject","Previous 15 years GATE papers","RS Aggarwal – Aptitude"],
    eligibility:"B.E/B.Tech/B.Sc(Research) 3rd year or passed.",
    tips:["Analyze syllabus weightage first","Engineering Maths is high scoring","Practice numerical answer type questions","Solve subject-wise previous year questions"] },
  { id:"clat", name:"CLAT", full:"Common Law Admission Test", category:"Law", color:"#b45309", icon:"⚖️", difficulty:"High", diffScore:3, frequency:"Once a year", seats:"~2,500", salary:"₹6-20 LPA", duration:"5 years (LLB)",
    syllabus:["English Language","Current Affairs & GK","Legal Reasoning","Logical Reasoning","Quantitative Techniques"],
    topics:{"English":["Reading Comprehension","Vocabulary","Grammar","Critical Reasoning"],"Legal Reasoning":["Legal Principles","Legal Maxims","Constitutional Law","Torts","Contracts"],"Current Affairs":["National","International","Legal Affairs","Important Judgements"],"Logical Reasoning":["Analogy","Syllogism","Assumptions","Conclusions"]},
    pattern:{duration:"2 hours",questions:"120 MCQs",total:"120 marks",negative:"Yes (-0.25)"},
    cutoff:[{year:2024,general:95,obc:82,sc:65,st:57},{year:2023,general:93,obc:80,sc:63,st:55}],
    books:["Arihant CLAT guide","AP Bhardwaj – Legal Aptitude","Previous year CLAT papers","The Hindu for Current Affairs"],
    eligibility:"Class 12 with min 45% marks (40% SC/ST).",
    tips:["Legal reasoning needs regular practice","Current affairs from last 12 months","Reading comprehension is key","No maths beyond Class 10"] },
  { id:"ctet", name:"CTET", full:"Central Teacher Eligibility Test", category:"Teaching", color:"#16a34a", icon:"📚", difficulty:"Moderate", diffScore:2, frequency:"Twice a year", seats:"No limit", salary:"₹35,000-₹1.1 LPA", duration:"3 months prep",
    syllabus:["Child Development & Pedagogy","Language I & II","Mathematics / Science / Social Studies"],
    topics:{"Child Development":["Growth & Development","Learning Theories","Inclusive Education","Assessment","Motivation"],"Language":["Reading","Writing","Grammar","Comprehension","Language Acquisition"],"Mathematics":["Number System","Geometry","Measurement","Data Handling","Pedagogy"],"EVS/Science":["Environment","Living World","Matter","Pedagogy"]},
    pattern:{duration:"2.5 hours",questions:"150 MCQs",total:"150 marks",negative:"No"},
    cutoff:[{year:2024,general:90,obc:82,sc:75,st:75},{year:2023,general:88,obc:80,sc:73,st:73}],
    books:["Child Development by Arihant","NCERT textbooks Class 1–8","Previous year CTET papers"],
    eligibility:"Class 12 with 50% + D.El.Ed OR Graduation + B.Ed.",
    tips:["No negative marking — attempt all","Child Development has highest weightage","Pedagogy questions need conceptual clarity","Language sections test teaching methods"] },
  { id:"ibps-po", name:"IBPS PO", full:"IBPS Probationary Officer", category:"Government", color:"#3b82f6", icon:"🏦", difficulty:"High", diffScore:3, frequency:"Once a year", seats:"~4,000+", salary:"₹40,000-₹1.5 LPA", duration:"6 months prep",
    syllabus:["Reasoning Ability","Quantitative Aptitude","English Language","General Awareness (Banking)","Computer Knowledge"],
    topics:{"Reasoning":["Puzzles","Seating Arrangement","Syllogism","Coding-Decoding","Blood Relations","Inequalities"],"Quantitative Aptitude":["Data Interpretation","Number Series","Quadratic Equations","Arithmetic","Data Sufficiency"],"English":["Reading Comprehension","Error Detection","Fill in Blanks","Para Jumbles","Cloze Test"],"Banking GK":["Banking Awareness","Financial Awareness","Current Affairs","Static GK"]},
    pattern:{duration:"Prelims: 1hr | Mains: 3hr",questions:"Prelims: 100 | Mains: 155",total:"Prelims: 100 | Mains: 225",negative:"Yes (-0.25)"},
    cutoff:[{year:2024,general:47,obc:44,sc:38,st:35},{year:2023,general:45,obc:42,sc:36,st:33}],
    books:["RS Aggarwal – Quantitative Aptitude","Arihant Reasoning","Manorama Yearbook","Kiran IBPS PO Papers"],
    eligibility:"Graduate from recognised university. Age: 20–30.",
    tips:["Banking GK is very important","High accuracy in Prelims","Mains has descriptive English","Practice data interpretation daily"] },
];

function getBotReply(question) {
  const q = question.toLowerCase();
  for (const exam of exams) {
    if (q.includes(exam.name.toLowerCase()) || q.includes(exam.id.toLowerCase())) {
      if (q.includes("cutoff")||q.includes("score")) { const c=exam.cutoff[0]; return `📊 **${exam.name} Cutoff ${c.year}:**\n\n• General: ${c.general}\n• OBC: ${c.obc}\n• SC: ${c.sc}\n• ST: ${c.st}\n\n⚠️ Verify from official website.`; }
      if (q.includes("syllabus")||q.includes("topics")) return `📖 **${exam.name} Syllabus:**\n\n${exam.syllabus.map(s=>`• ${s}`).join("\n")}`;
      if (q.includes("book")||q.includes("material")) return `📚 **Books for ${exam.name}:**\n\n${exam.books.map(b=>`• ${b}`).join("\n")}`;
      if (q.includes("eligib")||q.includes("age")||q.includes("qualify")) return `✅ **${exam.name} Eligibility:**\n\n${exam.eligibility}`;
      if (q.includes("pattern")||q.includes("marks")||q.includes("duration")) { const p=exam.pattern; return `📋 **${exam.name} Pattern:**\n\n• Duration: ${p.duration}\n• Questions: ${p.questions}\n• Total: ${p.total}\n• Negative: ${p.negative}`; }
      if (q.includes("tip")||q.includes("prepare")||q.includes("how")) return `💡 **${exam.name} Tips:**\n\n${exam.tips.map((t,i)=>`${i+1}. ${t}`).join("\n")}`;
      return `📌 **${exam.name}:**\n\n• Category: ${exam.category}\n• Difficulty: ${exam.difficulty}\n• Frequency: ${exam.frequency}\n• Marks: ${exam.pattern.total}\n• Seats: ${exam.seats}\n• Eligibility: ${exam.eligibility}`;
    }
  }
  if (q.includes("hello")||q.includes("hi")||q.includes("hey")) return "👋 **Hello! I'm ExamBot!**\n\nAsk me about:\n• 📖 Syllabus\n• 📊 Cutoffs\n• 📚 Books\n• 💡 Tips\n• ✅ Eligibility\n\nFor any Indian exam! 😊";
  if (q.includes("planner")||q.includes("study plan")) return "📅 **Study Planner** is available!\n\nTap the **📅 Planner** tab in bottom navigation.\n\n1. Select your exam\n2. Set your exam date\n3. Get a personalized daily study plan! 🎯";
  if (q.includes("progress")||q.includes("tracker")) return "✅ **Progress Tracker** is in the Planner!\n\nAfter selecting your exam, tap any topic to mark it as:\n• ⬜ Not Started\n• 🟡 In Progress\n• ✅ Completed\n\nYour progress % updates automatically!";
  if (q.includes("easy")||q.includes("easiest")) return "✅ **Easiest Exams:**\n\n1. CTET – No negative marking\n2. SSC MTS – Class 10 level\n3. RRB NTPC – Basic syllabus\n4. IBPS Clerk – Moderate level";
  if (q.includes("tough")||q.includes("hard")) return "🔥 **Toughest Exams:**\n\n1. UPSC CSE – 2-3% selection\n2. JEE Advanced – IIT gateway\n3. NEET PG – Medical PG\n4. CAT – IIM MBA";
  if (q.includes("thank")) return "😊 You're welcome! Best of luck! 💪\n\nConsistency beats intensity. Study daily! 🎯";
  return "🤔 Try asking:\n\n• \"JEE Main syllabus\"\n• \"NEET cutoff 2024\"\n• \"Best books for UPSC\"\n• \"CAT eligibility\"\n\nOr use **Planner tab** for your study plan! 😊";
}

const categories = ["All","Engineering","Medical","Government","Management","Law","Teaching"];
const catIcons = {"All":"🇮🇳","Engineering":"⚙️","Medical":"🩺","Government":"🏛️","Management":"📊","Law":"⚖️","Teaching":"📚"};
const diffColor = {"Easy":"#22c55e","Moderate":"#f59e0b","High":"#f97316","Very High":"#ef4444","Extremely High":"#7c3aed"};
const quickQs = ["Hello! What can you do?","JEE Main cutoff 2024","Best books for UPSC","NEET eligibility","Toughest exam in India"];

const getTheme = (dark) => ({
  bg: dark?"#0f172a":"#f8f7f4", card: dark?"#1e293b":"#ffffff",
  card2: dark?"#273548":"#f1f5f9", text: dark?"#f1f5f9":"#1a1a2e",
  subtext: dark?"#94a3b8":"#64748b", border: dark?"rgba(255,255,255,0.07)":"rgba(0,0,0,0.07)",
  navBg: dark?"#0f172a":"#ffffff", topBg: dark?"#0f172a":"#1a1a2e",
  muted: dark?"#475569":"#888888",
});

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600&display=swap');
  *{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent;}
  html,body{font-family:'DM Sans',sans-serif;}
  @keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
  @keyframes fadeIn{from{opacity:0}to{opacity:1}}
  @keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
  @keyframes progress{from{width:0}to{width:var(--w)}}
  .card:active{transform:scale(0.97);}
  input:focus,textarea:focus,select:focus{outline:none;}
  ::-webkit-scrollbar{display:none;}
  *{transition:background-color 0.3s ease,color 0.2s ease;}
`;

export default function App() {
  const [dark, setDark] = useState(false);
  const [selected, setSelected] = useState(null);
  const [tab, setTab] = useState("syllabus");
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [navTab, setNavTab] = useState("home");
  const T = getTheme(dark);

  const filtered = exams.filter(e =>
    (category==="All"||e.category===category) &&
    (e.name.toLowerCase().includes(search.toLowerCase())||
     e.full.toLowerCase().includes(search.toLowerCase())||
     e.category.toLowerCase().includes(search.toLowerCase()))
  );

  const openExam = (exam) => { setSelected(exam); setTab("syllabus"); window.scrollTo(0,0); };
  const goHome = () => { setSelected(null); setNavTab("home"); };

  if (selected) return <DetailPage exam={selected} goHome={goHome} tab={tab} setTab={setTab} T={T} dark={dark}/>;

  return (
    <>
      <style>{globalStyles}</style>
      <div style={{minHeight:"100vh",background:T.bg,paddingBottom:72,color:T.text}}>
        {navTab==="chat" ? <ChatPage setNavTab={setNavTab} T={T} dark={dark}/> :
         navTab==="compare" ? <ComparePage setNavTab={setNavTab} T={T} dark={dark}/> :
         navTab==="planner" ? <PlannerPage setNavTab={setNavTab} T={T} dark={dark}/> :
         navTab==="about" ? <AboutPage goHome={()=>setNavTab("home")} count={exams.length} T={T} dark={dark}/> : (
          <>
            {/* Top bar */}
            <div style={{background:T.topBg,padding:"16px 16px 0",position:"sticky",top:0,zIndex:50}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <div style={{width:32,height:32,background:"rgba(255,255,255,0.1)",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>📚</div>
                  <div>
                    <div style={{fontFamily:"'Playfair Display',serif",fontSize:17,fontWeight:700,color:"#fff",lineHeight:1}}>ExamNest</div>
                    <div style={{fontSize:9,color:"#c9a84c",letterSpacing:"0.12em",textTransform:"uppercase"}}>India's Exam Guide</div>
                  </div>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:10}}>
                  <div onClick={()=>setDark(!dark)} style={{cursor:"pointer",display:"flex",alignItems:"center",gap:5}}>
                    <span style={{fontSize:16}}>{dark?"☀️":"🌙"}</span>
                    <div style={{width:40,height:22,background:dark?"#6366f1":"rgba(255,255,255,0.2)",borderRadius:11,position:"relative"}}>
                      <div style={{position:"absolute",top:3,left:dark?18:3,width:16,height:16,background:"#fff",borderRadius:"50%",transition:"left 0.3s ease",boxShadow:"0 1px 4px rgba(0,0,0,0.3)"}}/>
                    </div>
                  </div>
                  <button onClick={()=>setNavTab("chat")} style={{background:"linear-gradient(135deg,#6366f1,#ec4899)",border:"none",borderRadius:20,padding:"6px 12px",fontSize:11,color:"#fff",fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>🤖 AI</button>
                </div>
              </div>
              <div style={{position:"relative",marginBottom:12}}>
                <span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",fontSize:14,color:"rgba(255,255,255,0.4)"}}>🔍</span>
                <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search any exam..."
                  style={{width:"100%",padding:"11px 36px 11px 36px",background:"rgba(255,255,255,0.1)",border:"1px solid rgba(255,255,255,0.15)",borderRadius:12,color:"#fff",fontSize:14,fontFamily:"inherit"}}/>
                {search&&<span onClick={()=>setSearch("")} style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",fontSize:14,color:"rgba(255,255,255,0.5)",cursor:"pointer"}}>✕</span>}
              </div>
              <div style={{display:"flex",gap:7,overflowX:"auto",paddingBottom:12}}>
                {categories.map(c=>(
                  <button key={c} onClick={()=>setCategory(c)} style={{flexShrink:0,padding:"5px 12px",borderRadius:20,border:"none",cursor:"pointer",fontSize:11,fontFamily:"inherit",fontWeight:500,background:category===c?"#c9a84c":"rgba(255,255,255,0.1)",color:category===c?"#1a1a2e":"rgba(255,255,255,0.7)"}}>
                    {catIcons[c]} {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Feature banners */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,padding:"12px 16px 0"}}>
              {[
                {tab:"compare",icon:"⚖️",label:"Compare",sub:"2 exams",bg:"linear-gradient(135deg,#0f172a,#1e3a5f)"},
                {tab:"planner",icon:"📅",label:"Planner",sub:"Study plan",bg:"linear-gradient(135deg,#14532d,#166534)"},
                {tab:"chat",icon:"🤖",label:"Ask AI",sub:"Instant help",bg:"linear-gradient(135deg,#1e1b4b,#312e81)"},
              ].map(item=>(
                <div key={item.tab} onClick={()=>setNavTab(item.tab)} style={{background:dark?"#1e293b":item.bg,borderRadius:13,padding:"11px 10px",cursor:"pointer",textAlign:"center",boxShadow:"0 3px 12px rgba(0,0,0,0.15)"}}>
                  <div style={{fontSize:20,marginBottom:3}}>{item.icon}</div>
                  <div style={{fontSize:12,fontWeight:700,color:"#fff"}}>{item.label}</div>
                  <div style={{fontSize:10,color:"rgba(255,255,255,0.5)",marginTop:1}}>{item.sub}</div>
                </div>
              ))}
            </div>

            <div style={{padding:"12px 16px 4px"}}>
              {search||category!=="All"?(
                <div style={{fontSize:12,color:T.muted}}>{filtered.length} exam{filtered.length!==1?"s":""} found</div>
              ):(
                <>
                  <div style={{fontSize:19,fontWeight:700,fontFamily:"'Playfair Display',serif",color:T.text}}>All Exams 🇮🇳</div>
                  <div style={{fontSize:12,color:T.muted,marginTop:2}}>Tap any exam for full details</div>
                </>
              )}
            </div>

            <div style={{padding:"8px 16px",display:"flex",flexDirection:"column",gap:10}}>
              {filtered.map((exam,i)=>(
                <div key={exam.id} className="card" onClick={()=>openExam(exam)} style={{background:T.card,borderRadius:16,overflow:"hidden",cursor:"pointer",boxShadow:dark?"0 2px 10px rgba(0,0,0,0.3)":"0 2px 10px rgba(0,0,0,0.06)",animation:`fadeUp 0.4s ease forwards ${Math.min(i*0.04,0.3)}s`,opacity:0,transition:"transform 0.15s,background 0.3s"}}>
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
              ))}
              {filtered.length===0&&(
                <div style={{textAlign:"center",padding:"60px 0",color:T.muted}}>
                  <div style={{fontSize:40,marginBottom:12}}>🔍</div>
                  <div style={{fontSize:15,fontWeight:600,color:T.text}}>No exams found</div>
                  <button onClick={()=>{setSearch("");setCategory("All");}} style={{marginTop:14,padding:"9px 22px",background:"#6366f1",color:"#fff",border:"none",borderRadius:12,fontSize:13,cursor:"pointer",fontFamily:"inherit"}}>Clear Filter</button>
                </div>
              )}
            </div>
          </>
        )}

        {/* Bottom Nav */}
        <div style={{position:"fixed",bottom:0,left:0,right:0,background:T.navBg,borderTop:`1px solid ${T.border}`,display:"flex",zIndex:100}}>
          {[{id:"home",icon:"🏠",label:"Home"},{id:"planner",icon:"📅",label:"Planner"},{id:"compare",icon:"⚖️",label:"Compare"},{id:"chat",icon:"🤖",label:"AI Chat"},{id:"about",icon:"ℹ️",label:"About"}].map(item=>(
            <button key={item.id} onClick={()=>setNavTab(item.id)} style={{flex:1,padding:"8px 0 6px",background:"none",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:2}}>
              <div style={{fontSize:17}}>{item.icon}</div>
              <div style={{fontSize:8,fontFamily:"inherit",fontWeight:navTab===item.id?600:400,color:navTab===item.id?"#6366f1":T.muted}}>{item.label}</div>
              {navTab===item.id&&<div style={{width:4,height:4,borderRadius:"50%",background:"#6366f1"}}/>}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

// ── STUDY PLANNER + PROGRESS TRACKER ──
function PlannerPage({ setNavTab, T, dark }) {
  const [step, setStep] = useState(1); // 1=select exam, 2=set date, 3=view plan
  const [planExam, setPlanExam] = useState(null);
  const [examDate, setExamDate] = useState("");
  const [progress, setProgress] = useState({}); // {topicKey: 0|1|2} 0=not started, 1=in progress, 2=done

  const today = new Date();
  const daysLeft = examDate ? Math.max(0, Math.ceil((new Date(examDate)-today)/(1000*60*60*24))) : 0;

  const allTopics = planExam ? Object.entries(planExam.topics).flatMap(([sub,topics])=>topics.map(t=>({sub,t,key:`${sub}::${t}`}))) : [];
  const totalTopics = allTopics.length;
  const doneCount = allTopics.filter(({key})=>progress[key]===2).length;
  const inProgressCount = allTopics.filter(({key})=>progress[key]===1).length;
  const pct = totalTopics>0 ? Math.round((doneCount/totalTopics)*100) : 0;

  const dailyTopics = daysLeft>0 && totalTopics>0 ? Math.ceil((totalTopics-doneCount)/daysLeft) : 0;

  const toggleTopic = (key) => {
    setProgress(prev=>({...prev,[key]:((prev[key]||0)+1)%3}));
  };

  const statusIcon = (key) => {
    const s = progress[key]||0;
    if(s===0) return {icon:"⬜",label:"Not Started",color:"#94a3b8"};
    if(s===1) return {icon:"🟡",label:"In Progress",color:"#f59e0b"};
    return {icon:"✅",label:"Completed",color:"#22c55e"};
  };

  const generateWeekPlan = () => {
    if(!planExam||!examDate) return [];
    const days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
    const subjects = Object.keys(planExam.topics);
    return days.map((day,i)=>{
      const sub = subjects[i%subjects.length];
      const dayTopics = planExam.topics[sub].slice(0,3);
      return {day, sub, topics:dayTopics};
    });
  };

  return (
    <div style={{minHeight:"100vh",background:T.bg,paddingBottom:80,color:T.text}}>
      {/* Header */}
      <div style={{background:"linear-gradient(135deg,#14532d,#166534)",padding:"14px 16px",display:"flex",alignItems:"center",gap:12}}>
        <button onClick={()=>setNavTab("home")} style={{background:"rgba(255,255,255,0.15)",border:"none",borderRadius:10,padding:"7px 12px",color:"#fff",cursor:"pointer",fontSize:13,fontFamily:"inherit"}}>← Back</button>
        <div>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:16,fontWeight:700,color:"#fff"}}>📅 Study Planner</div>
          <div style={{fontSize:11,color:"rgba(255,255,255,0.6)"}}>Plan your prep + track progress</div>
        </div>
      </div>

      <div style={{padding:"16px"}}>

        {/* STEP 1 — SELECT EXAM */}
        {step===1&&(
          <div style={{animation:"fadeUp 0.4s ease forwards"}}>
            <div style={{fontSize:15,fontWeight:700,color:T.text,marginBottom:4}}>Step 1: Choose your exam</div>
            <div style={{fontSize:12,color:T.muted,marginBottom:14}}>Select the exam you are preparing for</div>
            <div style={{display:"flex",flexDirection:"column",gap:9}}>
              {exams.map(exam=>(
                <div key={exam.id} onClick={()=>{setPlanExam(exam);setStep(2);}} className="card" style={{background:T.card,borderRadius:14,padding:"13px 14px",cursor:"pointer",display:"flex",alignItems:"center",gap:12,boxShadow:dark?"0 2px 8px rgba(0,0,0,0.3)":"0 1px 6px rgba(0,0,0,0.07)",border:planExam?.id===exam.id?`2px solid ${exam.color}`:`2px solid transparent`,transition:"transform 0.15s"}}>
                  <div style={{width:42,height:42,background:exam.color+"20",borderRadius:11,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{exam.icon}</div>
                  <div>
                    <div style={{fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:700,color:T.text}}>{exam.name}</div>
                    <div style={{fontSize:11,color:T.muted,marginTop:2}}>{exam.category} • {exam.difficulty}</div>
                  </div>
                  <div style={{marginLeft:"auto",fontSize:16,color:T.muted}}>›</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2 — SET DATE */}
        {step===2&&planExam&&(
          <div style={{animation:"fadeUp 0.4s ease forwards"}}>
            <button onClick={()=>setStep(1)} style={{background:"none",border:"none",color:T.muted,cursor:"pointer",fontSize:13,fontFamily:"inherit",marginBottom:14,display:"flex",alignItems:"center",gap:5}}>← Change Exam</button>

            {/* Selected exam card */}
            <div style={{background:planExam.color,borderRadius:14,padding:"14px",marginBottom:16,display:"flex",alignItems:"center",gap:12}}>
              <div style={{fontSize:32}}>{planExam.icon}</div>
              <div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:18,fontWeight:700,color:"#fff"}}>{planExam.name}</div>
                <div style={{fontSize:12,color:"rgba(255,255,255,0.8)"}}>{planExam.full}</div>
              </div>
            </div>

            <div style={{fontSize:15,fontWeight:700,color:T.text,marginBottom:4}}>Step 2: Set your exam date</div>
            <div style={{fontSize:12,color:T.muted,marginBottom:14}}>When is your exam? We'll plan your preparation accordingly.</div>

            <div style={{background:T.card,borderRadius:14,padding:"16px",marginBottom:14,boxShadow:dark?"0 2px 8px rgba(0,0,0,0.2)":"0 1px 6px rgba(0,0,0,0.07)"}}>
              <div style={{fontSize:12,fontWeight:600,color:T.muted,marginBottom:8}}>📅 EXAM DATE</div>
              <input type="date" value={examDate} onChange={e=>setExamDate(e.target.value)} min={new Date().toISOString().split("T")[0]}
                style={{width:"100%",padding:"12px",background:T.card2,border:`1px solid ${T.border}`,borderRadius:10,fontSize:14,fontFamily:"inherit",color:T.text,cursor:"pointer"}}/>
            </div>

            {examDate&&(
              <div style={{background:dark?"#1e293b":"#f0fdf4",borderRadius:14,padding:"14px",marginBottom:14,border:"1px solid #22c55e40"}}>
                <div style={{fontSize:13,color:"#22c55e",fontWeight:600,marginBottom:4}}>🎯 {daysLeft} days left for {planExam.name}!</div>
                <div style={{fontSize:12,color:T.subtext}}>
                  {daysLeft>=90?"Great! You have plenty of time. Let's plan smartly! 💪":
                   daysLeft>=30?"Good time. Focus and be consistent! 📚":
                   daysLeft>=7?"Time is short! Revise high-priority topics fast! ⚡":
                   "Very few days! Focus only on most important topics! 🔥"}
                </div>
              </div>
            )}

            <button onClick={()=>{if(examDate)setStep(3);}} disabled={!examDate}
              style={{width:"100%",padding:"14px",background:examDate?"linear-gradient(135deg,#16a34a,#22c55e)":"#334155",border:"none",borderRadius:14,color:"#fff",fontSize:15,fontWeight:600,cursor:examDate?"pointer":"not-allowed",fontFamily:"inherit"}}>
              Generate My Study Plan →
            </button>
          </div>
        )}

        {/* STEP 3 — PLAN + PROGRESS */}
        {step===3&&planExam&&examDate&&(
          <div style={{animation:"fadeUp 0.4s ease forwards"}}>
            <button onClick={()=>setStep(2)} style={{background:"none",border:"none",color:T.muted,cursor:"pointer",fontSize:13,fontFamily:"inherit",marginBottom:14,display:"flex",alignItems:"center",gap:5}}>← Change Date</button>

            {/* Progress overview card */}
            <div style={{background:planExam.color,borderRadius:16,padding:"16px",marginBottom:14}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
                <div>
                  <div style={{fontFamily:"'Playfair Display',serif",fontSize:18,fontWeight:700,color:"#fff"}}>{planExam.name}</div>
                  <div style={{fontSize:12,color:"rgba(255,255,255,0.75)",marginTop:2}}>🗓️ {daysLeft} days remaining</div>
                </div>
                <div style={{textAlign:"right"}}>
                  <div style={{fontFamily:"'Playfair Display',serif",fontSize:32,fontWeight:900,color:"#fff"}}>{pct}%</div>
                  <div style={{fontSize:10,color:"rgba(255,255,255,0.7)"}}>completed</div>
                </div>
              </div>
              {/* Progress bar */}
              <div style={{background:"rgba(0,0,0,0.2)",borderRadius:10,height:10,overflow:"hidden",marginBottom:10}}>
                <div style={{height:"100%",borderRadius:10,background:"rgba(255,255,255,0.9)",width:`${pct}%`,transition:"width 0.5s ease"}}/>
              </div>
              <div style={{display:"flex",gap:16}}>
                <div style={{textAlign:"center"}}>
                  <div style={{fontSize:18,fontWeight:700,color:"#fff"}}>{doneCount}</div>
                  <div style={{fontSize:10,color:"rgba(255,255,255,0.7)"}}>✅ Done</div>
                </div>
                <div style={{textAlign:"center"}}>
                  <div style={{fontSize:18,fontWeight:700,color:"#fff"}}>{inProgressCount}</div>
                  <div style={{fontSize:10,color:"rgba(255,255,255,0.7)"}}>🟡 In Progress</div>
                </div>
                <div style={{textAlign:"center"}}>
                  <div style={{fontSize:18,fontWeight:700,color:"#fff"}}>{totalTopics-doneCount-inProgressCount}</div>
                  <div style={{fontSize:10,color:"rgba(255,255,255,0.7)"}}>⬜ Pending</div>
                </div>
                {dailyTopics>0&&(
                  <div style={{textAlign:"center",marginLeft:"auto"}}>
                    <div style={{fontSize:18,fontWeight:700,color:"#fff"}}>{dailyTopics}</div>
                    <div style={{fontSize:10,color:"rgba(255,255,255,0.7)"}}>📅/day</div>
                  </div>
                )}
              </div>
            </div>

            {/* Weekly plan */}
            <div style={{background:T.card,borderRadius:14,padding:"14px",marginBottom:14,boxShadow:dark?"0 2px 8px rgba(0,0,0,0.2)":"0 1px 6px rgba(0,0,0,0.07)"}}>
              <div style={{fontSize:13,fontWeight:700,color:T.text,marginBottom:10}}>📋 Weekly Study Plan</div>
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                {generateWeekPlan().map(({day,sub,topics},i)=>(
                  <div key={i} style={{display:"flex",alignItems:"flex-start",gap:10,padding:"8px 0",borderBottom:i<6?`1px solid ${T.border}`:"none"}}>
                    <div style={{width:70,flexShrink:0}}>
                      <div style={{fontSize:11,fontWeight:700,color:planExam.color}}>{day}</div>
                    </div>
                    <div style={{flex:1}}>
                      <div style={{fontSize:11,fontWeight:600,color:T.subtext,marginBottom:3}}>{sub}</div>
                      <div style={{fontSize:11,color:T.muted}}>{topics.join(", ")}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Topic progress tracker */}
            <div style={{fontSize:14,fontWeight:700,color:T.text,marginBottom:10}}>📊 Topic Progress Tracker</div>
            <div style={{fontSize:11,color:T.muted,marginBottom:12}}>Tap any topic to update your progress</div>
            <div style={{display:"flex",gap:10,marginBottom:12,flexWrap:"wrap"}}>
              {[{icon:"⬜",label:"Not Started",color:"#94a3b8"},{icon:"🟡",label:"In Progress",color:"#f59e0b"},{icon:"✅",label:"Completed",color:"#22c55e"}].map(s=>(
                <div key={s.label} style={{display:"flex",alignItems:"center",gap:4,fontSize:11,color:T.muted}}>
                  <span>{s.icon}</span><span>{s.label}</span>
                </div>
              ))}
            </div>

            {Object.entries(planExam.topics).map(([subject,topics])=>(
              <div key={subject} style={{marginBottom:14}}>
                <div style={{background:planExam.color,borderRadius:"10px 10px 0 0",padding:"8px 14px"}}>
                  <div style={{fontSize:13,fontWeight:700,color:"#fff"}}>{subject}</div>
                  <div style={{fontSize:10,color:"rgba(255,255,255,0.7)"}}>
                    {topics.filter(t=>progress[`${subject}::${t}`]===2).length}/{topics.length} completed
                  </div>
                </div>
                <div style={{background:T.card,borderRadius:"0 0 10px 10px",overflow:"hidden",boxShadow:dark?"0 2px 8px rgba(0,0,0,0.2)":"0 1px 6px rgba(0,0,0,0.07)"}}>
                  {topics.map((topic,i)=>{
                    const key=`${subject}::${topic}`;
                    const st=statusIcon(key);
                    return(
                      <div key={i} onClick={()=>toggleTopic(key)} style={{display:"flex",alignItems:"center",gap:12,padding:"11px 14px",borderBottom:i<topics.length-1?`1px solid ${T.border}`:"none",cursor:"pointer",transition:"background 0.15s"}}
                        onMouseEnter={e=>e.currentTarget.style.background=dark?"rgba(255,255,255,0.05)":"rgba(0,0,0,0.02)"}
                        onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                        <span style={{fontSize:18,flexShrink:0}}>{st.icon}</span>
                        <div style={{flex:1}}>
                          <div style={{fontSize:13,color:T.text,fontWeight:500}}>{topic}</div>
                          <div style={{fontSize:10,color:st.color,marginTop:1}}>{st.label}</div>
                        </div>
                        <div style={{fontSize:11,color:T.muted}}>tap to update</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            {pct===100&&(
              <div style={{background:"linear-gradient(135deg,#14532d,#166534)",borderRadius:14,padding:"16px",textAlign:"center",marginTop:8}}>
                <div style={{fontSize:36,marginBottom:8}}>🎉</div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:18,fontWeight:700,color:"#fff",marginBottom:4}}>All Topics Completed!</div>
                <div style={{fontSize:13,color:"rgba(255,255,255,0.8)"}}>Amazing work! Now focus on revision and mock tests. You've got this! 💪</div>
              </div>
            )}

            <button onClick={()=>{setStep(1);setPlanExam(null);setExamDate("");setProgress({});}} style={{width:"100%",marginTop:16,padding:"12px",background:"none",border:`1px solid ${T.border}`,borderRadius:12,color:T.muted,fontSize:13,cursor:"pointer",fontFamily:"inherit"}}>
              🔄 Start Over with Different Exam
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── COMPARE PAGE ──
function ComparePage({ setNavTab, T, dark }) {
  const [exam1,setExam1]=useState(exams[0]);
  const [exam2,setExam2]=useState(exams[2]);
  const rows=[
    {label:"Category",icon:"🏷️",fn:e=>e.category},{label:"Difficulty",icon:"🔥",fn:e=>e.difficulty},
    {label:"Frequency",icon:"📅",fn:e=>e.frequency},{label:"Total Marks",icon:"📊",fn:e=>e.pattern.total},
    {label:"Duration",icon:"⏱️",fn:e=>e.pattern.duration},{label:"Negative Marking",icon:"⚠️",fn:e=>e.pattern.negative},
    {label:"Available Seats",icon:"🪑",fn:e=>e.seats},{label:"Avg Salary",icon:"💰",fn:e=>e.salary},
    {label:"Course Duration",icon:"🗓️",fn:e=>e.duration},{label:"Eligibility",icon:"✅",fn:e=>e.eligibility},
  ];
  return(
    <div style={{minHeight:"100vh",background:T.bg,paddingBottom:80,color:T.text}}>
      <div style={{background:"linear-gradient(135deg,#0f172a,#1e3a5f)",padding:"14px 16px",display:"flex",alignItems:"center",gap:12}}>
        <button onClick={()=>setNavTab("home")} style={{background:"rgba(255,255,255,0.15)",border:"none",borderRadius:10,padding:"7px 12px",color:"#fff",cursor:"pointer",fontSize:13,fontFamily:"inherit"}}>← Back</button>
        <div>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:16,fontWeight:700,color:"#fff"}}>⚖️ Compare Exams</div>
          <div style={{fontSize:11,color:"rgba(255,255,255,0.6)"}}>Pick any 2 exams to compare</div>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,padding:"14px 14px 0"}}>
        {[{val:exam1,set:setExam1,label:"Exam 1"},{val:exam2,set:setExam2,label:"Exam 2"}].map(({val,set,label},idx)=>(
          <div key={idx}>
            <div style={{fontSize:11,color:T.muted,marginBottom:6,fontWeight:600}}>{label}</div>
            <div style={{background:T.card,borderRadius:12,border:`2px solid ${val.color}`,overflow:"hidden"}}>
              <div style={{background:val.color,padding:"8px 10px",display:"flex",alignItems:"center",gap:7}}>
                <span style={{fontSize:18}}>{val.icon}</span>
                <span style={{fontSize:12,fontWeight:700,color:"#fff"}}>{val.name}</span>
              </div>
              <select value={val.id} onChange={e=>set(exams.find(x=>x.id===e.target.value))}
                style={{width:"100%",padding:"8px 10px",border:"none",background:T.card,fontSize:12,fontFamily:"inherit",color:T.text,cursor:"pointer"}}>
                {exams.map(e=>(<option key={e.id} value={e.id}>{e.name}</option>))}
              </select>
            </div>
          </div>
        ))}
      </div>
      <div style={{textAlign:"center",padding:"10px 0 6px"}}>
        <span style={{background:"#1a1a2e",color:"#fff",borderRadius:20,padding:"4px 14px",fontSize:12,fontWeight:700}}>VS</span>
      </div>
      <div style={{padding:"0 14px"}}>
        {rows.map((row,i)=>(
          <div key={i} style={{background:T.card,borderRadius:13,marginBottom:9,overflow:"hidden",boxShadow:dark?"0 2px 8px rgba(0,0,0,0.3)":"0 1px 6px rgba(0,0,0,0.05)"}}>
            <div style={{background:dark?"rgba(255,255,255,0.05)":"#f8f7f4",padding:"6px 12px",fontSize:11,fontWeight:600,color:T.muted,borderBottom:`1px solid ${T.border}`}}>{row.icon} {row.label}</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 4px 1fr"}}>
              <div style={{padding:"10px 12px",fontSize:12,color:T.text,lineHeight:1.5}}>{row.fn(exam1)}</div>
              <div style={{background:T.border}}/>
              <div style={{padding:"10px 12px",fontSize:12,color:T.text,lineHeight:1.5}}>{row.fn(exam2)}</div>
            </div>
          </div>
        ))}
        <div style={{background:T.card,borderRadius:13,padding:"14px",marginBottom:9}}>
          <div style={{fontSize:12,fontWeight:600,color:T.muted,marginBottom:12}}>🔥 DIFFICULTY METER</div>
          {[exam1,exam2].map((e,i)=>(
            <div key={i} style={{marginBottom:i===0?12:0}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
                <span style={{fontSize:12,fontWeight:600,color:T.text}}>{e.name}</span>
                <span style={{fontSize:11,color:diffColor[e.difficulty],fontWeight:600}}>{e.difficulty}</span>
              </div>
              <div style={{background:dark?"rgba(255,255,255,0.08)":"#f1f5f9",borderRadius:10,height:10,overflow:"hidden"}}>
                <div style={{height:"100%",borderRadius:10,background:diffColor[e.difficulty],width:`${e.diffScore*20}%`,transition:"width 0.5s ease"}}/>
              </div>
            </div>
          ))}
        </div>
        <div style={{background:"linear-gradient(135deg,#1a1a2e,#2d1b69)",borderRadius:13,padding:"14px"}}>
          <div style={{fontSize:12,fontWeight:600,color:"rgba(255,255,255,0.6)",marginBottom:8}}>💡 QUICK VERDICT</div>
          <div style={{fontSize:13,color:"#fff",lineHeight:1.7}}>
            {exam1.diffScore<exam2.diffScore?`✅ ${exam1.name} is easier than ${exam2.name}.`:exam1.diffScore>exam2.diffScore?`✅ ${exam2.name} is easier than ${exam1.name}.`:`🤝 Both have similar difficulty.`}
            {" "}Choose based on your stream and career goals!
          </div>
        </div>
      </div>
    </div>
  );
}

// ── CHAT PAGE ──
function ChatPage({ setNavTab, T, dark }) {
  const [messages,setMessages]=useState([{role:"bot",text:"👋 Hi! I'm **ExamBot**!\n\nAsk me about syllabus, cutoffs, books, tips for any Indian exam.\n\nOr check the **📅 Planner tab** for your personalized study plan! 😊"}]);
  const [input,setInput]=useState("");
  const [loading,setLoading]=useState(false);
  const bottomRef=useRef(null);
  useEffect(()=>{bottomRef.current?.scrollIntoView({behavior:"smooth"});},[messages,loading]);
  const send=(text)=>{
    const q=(text||input).trim();
    if(!q||loading) return;
    setInput("");
    setMessages(prev=>[...prev,{role:"user",text:q}]);
    setLoading(true);
    setTimeout(()=>{setMessages(prev=>[...prev,{role:"bot",text:getBotReply(q)}]);setLoading(false);},700);
  };
  const fmt=(t)=>t.replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>").replace(/\n/g,"<br/>");
  return(
    <div style={{height:"100vh",display:"flex",flexDirection:"column",background:T.bg}}>
      <div style={{background:"linear-gradient(135deg,#1e1b4b,#312e81)",padding:"14px 16px",display:"flex",alignItems:"center",gap:12,flexShrink:0}}>
        <button onClick={()=>setNavTab("home")} style={{background:"rgba(255,255,255,0.15)",border:"none",borderRadius:10,padding:"7px 12px",color:"#fff",cursor:"pointer",fontSize:13,fontFamily:"inherit"}}>← Back</button>
        <div style={{width:34,height:34,background:"linear-gradient(135deg,#6366f1,#ec4899)",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontSize:17}}>🤖</div>
        <div>
          <div style={{fontSize:14,fontWeight:700,color:"#fff"}}>ExamBot AI</div>
          <div style={{fontSize:11,color:"rgba(255,255,255,0.6)"}}>Ask anything about Indian exams</div>
        </div>
        <div style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:5}}>
          <div style={{width:7,height:7,borderRadius:"50%",background:"#22c55e"}}/>
          <span style={{fontSize:10,color:"rgba(255,255,255,0.5)"}}>Online</span>
        </div>
      </div>
      {messages.length===1&&(
        <div style={{padding:"10px 14px",flexShrink:0}}>
          <div style={{fontSize:11,color:T.muted,marginBottom:7}}>💡 Try asking:</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
            {quickQs.map((q,i)=>(<button key={i} onClick={()=>send(q)} style={{background:T.card,border:"1px solid rgba(99,102,241,0.25)",borderRadius:20,padding:"5px 10px",fontSize:11,color:"#6366f1",cursor:"pointer",fontFamily:"inherit",fontWeight:500}}>{q}</button>))}
          </div>
        </div>
      )}
      <div style={{flex:1,overflowY:"auto",padding:"10px 14px",display:"flex",flexDirection:"column",gap:10}}>
        {messages.map((msg,i)=>(
          <div key={i} style={{display:"flex",justifyContent:msg.role==="user"?"flex-end":"flex-start",animation:"fadeIn 0.3s ease forwards"}}>
            {msg.role==="bot"&&<div style={{width:28,height:28,background:"linear-gradient(135deg,#6366f1,#ec4899)",borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,flexShrink:0,marginRight:7,alignSelf:"flex-end"}}>🤖</div>}
            <div style={{maxWidth:"82%",padding:"10px 13px",borderRadius:msg.role==="user"?"16px 16px 4px 16px":"16px 16px 16px 4px",background:msg.role==="user"?"linear-gradient(135deg,#6366f1,#818cf8)":T.card,color:msg.role==="user"?"#fff":T.text,fontSize:13,lineHeight:1.7,boxShadow:"0 2px 8px rgba(0,0,0,0.1)"}} dangerouslySetInnerHTML={{__html:fmt(msg.text)}}/>
          </div>
        ))}
        {loading&&(
          <div style={{display:"flex",gap:7,alignItems:"flex-end"}}>
            <div style={{width:28,height:28,background:"linear-gradient(135deg,#6366f1,#ec4899)",borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13}}>🤖</div>
            <div style={{background:T.card,borderRadius:"16px 16px 16px 4px",padding:"13px 16px",display:"flex",gap:5,alignItems:"center"}}>
              {[0,1,2].map(j=><div key={j} style={{width:7,height:7,borderRadius:"50%",background:"#6366f1",animation:"bounce 0.8s ease infinite",animationDelay:`${j*0.15}s`}}/>)}
            </div>
          </div>
        )}
        <div ref={bottomRef}/>
      </div>
      <div style={{padding:"10px 14px",background:T.navBg,borderTop:`1px solid ${T.border}`,display:"flex",gap:9,alignItems:"flex-end",flexShrink:0}}>
        <textarea value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send();}}} placeholder="Ask about any exam..." rows={1} style={{flex:1,padding:"10px 13px",background:T.card2,border:`1px solid ${T.border}`,borderRadius:13,fontSize:13,fontFamily:"inherit",resize:"none",color:T.text,maxHeight:90}}/>
        <button onClick={()=>send()} disabled={loading||!input.trim()} style={{width:42,height:42,borderRadius:13,border:"none",cursor:loading||!input.trim()?"not-allowed":"pointer",background:loading||!input.trim()?"#334155":"linear-gradient(135deg,#6366f1,#818cf8)",color:"#fff",fontSize:17,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>➤</button>
      </div>
    </div>
  );
}

// ── DETAIL PAGE ──
function DetailPage({exam,goHome,tab,setTab,T,dark}){
  const tabs=[{id:"syllabus",label:"Syllabus",icon:"📖"},{id:"pattern",label:"Pattern",icon:"📋"},{id:"cutoff",label:"Cutoff",icon:"📊"},{id:"books",label:"Books",icon:"📚"},{id:"tips",label:"Tips",icon:"💡"}];
  return(
    <div style={{minHeight:"100vh",background:T.bg,paddingBottom:30,color:T.text}}>
      <div style={{background:exam.color,padding:"14px 16px 0",position:"sticky",top:0,zIndex:50}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
          <button onClick={goHome} style={{background:"rgba(255,255,255,0.22)",border:"none",borderRadius:10,padding:"7px 13px",color:"#fff",cursor:"pointer",fontSize:13,fontFamily:"inherit",fontWeight:500}}>← Back</button>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:700,color:"rgba(255,255,255,0.85)"}}>ExamNest</div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:13,marginBottom:14}}>
          <div style={{width:54,height:54,background:"rgba(255,255,255,0.2)",borderRadius:14,display:"flex",alignItems:"center",justifyContent:"center",fontSize:27,flexShrink:0}}>{exam.icon}</div>
          <div>
            <div style={{fontSize:10,color:"rgba(255,255,255,0.7)",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:2}}>{exam.category}</div>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:21,fontWeight:900,color:"#fff",lineHeight:1.1}}>{exam.name}</div>
            <div style={{fontSize:11,color:"rgba(255,255,255,0.75)",marginTop:2}}>{exam.full}</div>
          </div>
        </div>
        <div style={{display:"flex",background:"rgba(0,0,0,0.15)",borderRadius:11,overflow:"hidden",marginBottom:14}}>
          {[["Marks",exam.pattern.total],["Duration",exam.pattern.duration],["Seats",exam.seats]].map(([l,v],i)=>(
            <div key={l} style={{flex:1,padding:"9px 6px",textAlign:"center",borderRight:i<2?"1px solid rgba(255,255,255,0.1)":"none"}}>
              <div style={{fontSize:9,color:"rgba(255,255,255,0.6)",textTransform:"uppercase",marginBottom:2}}>{l}</div>
              <div style={{fontSize:10,fontWeight:600,color:"#fff",lineHeight:1.3}}>{v}</div>
            </div>
          ))}
        </div>
        <div style={{display:"flex",overflowX:"auto"}}>
          {tabs.map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)} style={{flexShrink:0,padding:"9px 13px",background:"none",border:"none",cursor:"pointer",fontSize:11,fontFamily:"inherit",fontWeight:tab===t.id?600:400,color:tab===t.id?"#fff":"rgba(255,255,255,0.55)",borderBottom:`2px solid ${tab===t.id?"#fff":"transparent"}`,whiteSpace:"nowrap"}}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>
      </div>
      <div style={{background:T.card,padding:"10px 16px",borderBottom:`1px solid ${T.border}`,display:"flex",gap:7}}>
        <span>✅</span><div style={{fontSize:12,color:T.subtext,lineHeight:1.6}}><strong style={{color:T.text}}>Eligibility:</strong> {exam.eligibility}</div>
      </div>
      <div style={{padding:"12px 14px"}}>
        {tab==="syllabus"&&exam.syllabus.map((s,i)=>{const[sub,...rest]=s.split(": ");return(<div key={i} style={{background:T.card,borderRadius:12,padding:"12px 14px",marginBottom:9,borderLeft:`4px solid ${exam.color}`,boxShadow:dark?"0 2px 8px rgba(0,0,0,0.2)":"0 1px 5px rgba(0,0,0,0.05)"}}><div style={{fontWeight:700,fontSize:13,marginBottom:4,color:T.text}}>{sub}</div><div style={{fontSize:12,color:T.subtext,lineHeight:1.6}}>{rest.join(": ")}</div></div>);})}
        {tab==="pattern"&&<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9}}>{Object.entries(exam.pattern).map(([k,v])=>(<div key={k} style={{background:T.card,borderRadius:12,padding:"12px",boxShadow:dark?"0 2px 8px rgba(0,0,0,0.2)":"0 1px 5px rgba(0,0,0,0.05)",textAlign:"center"}}><div style={{fontSize:9,color:T.muted,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:7}}>{k.replace(/([A-Z])/g," $1").trim()}</div><div style={{fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:700,color:exam.color,lineHeight:1.3}}>{v}</div></div>))}</div>}
        {tab==="cutoff"&&<><div style={{background:T.card,borderRadius:12,overflow:"hidden",boxShadow:dark?"0 2px 8px rgba(0,0,0,0.2)":"0 1px 5px rgba(0,0,0,0.05)"}}><div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr 1fr",background:exam.color+"25",padding:"9px 8px"}}>{["Year","Gen","OBC","SC","ST"].map(h=>(<div key={h} style={{fontSize:10,fontWeight:700,textAlign:"center",color:T.text}}>{h}</div>))}</div>{exam.cutoff.map((row,i)=>(<div key={i} style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr 1fr",padding:"10px 8px",borderTop:`1px solid ${T.border}`}}><div style={{fontSize:12,fontWeight:700,color:exam.color,textAlign:"center"}}>{row.year}</div>{[row.general,row.obc,row.sc,row.st].map((v,j)=>(<div key={j} style={{fontSize:12,textAlign:"center",color:T.text}}>{v}</div>))}</div>))}</div><div style={{fontSize:11,color:T.muted,marginTop:8,textAlign:"center"}}>* Indicative. Verify from official sources.</div></>}
        {tab==="books"&&exam.books.map((book,i)=>(<div key={i} style={{background:T.card,borderRadius:12,padding:"12px 14px",marginBottom:9,display:"flex",alignItems:"center",gap:11,boxShadow:dark?"0 2px 8px rgba(0,0,0,0.2)":"0 1px 5px rgba(0,0,0,0.05)"}}><div style={{width:32,height:32,background:exam.color+"22",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,flexShrink:0}}>📖</div><div style={{fontSize:13,fontWeight:500,color:T.text}}>{book}</div></div>))}
        {tab==="tips"&&exam.tips.map((tip,i)=>(<div key={i} style={{background:T.card,borderRadius:12,padding:"12px 14px",marginBottom:9,display:"flex",gap:11,boxShadow:dark?"0 2px 8px rgba(0,0,0,0.2)":"0 1px 5px rgba(0,0,0,0.05)"}}><div style={{width:25,height:25,background:exam.color,borderRadius:7,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:700,fontSize:12,flexShrink:0}}>{i+1}</div><div style={{fontSize:13,color:T.text,lineHeight:1.7,paddingTop:2}}>{tip}</div></div>))}
      </div>
    </div>
  );
}

function AboutPage({goHome,count,T,dark}){
  return(
    <div style={{minHeight:"100vh",background:T.bg,paddingBottom:80,color:T.text}}>
      <div style={{background:"#1a1a2e",padding:"14px 16px",display:"flex",alignItems:"center",gap:10}}>
        <button onClick={goHome} style={{background:"rgba(255,255,255,0.1)",border:"none",borderRadius:10,padding:"7px 12px",color:"#fff",cursor:"pointer",fontSize:13,fontFamily:"inherit"}}>← Back</button>
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:16,fontWeight:700,color:"#fff"}}>About ExamNest</div>
      </div>
      <div style={{padding:"16px"}}>
        {[
          {icon:"📚",title:"Who We Are",text:"ExamNest is a free educational platform for students preparing for competitive exams across India.",color:"#f97316"},
          {icon:"🤖",title:"AI Chatbot",text:"ExamBot answers exam questions instantly — syllabus, cutoffs, books, tips — works offline!",color:"#6366f1"},
          {icon:"⚖️",title:"Exam Comparison",text:"Compare any 2 exams side by side — difficulty, salary, seats, duration and more!",color:"#0ea5e9"},
          {icon:"📅",title:"Study Planner",text:"Set your exam date, get a personalised weekly study plan and track topic-wise progress!",color:"#16a34a"},
          {icon:"🌙",title:"Dark Mode",text:"Easy on eyes for night studying! Tap the moon icon in the top bar.",color:"#7c3aed"},
          {icon:"✅",title:"What We Cover",text:`${count}+ major Indian exams across Engineering, Medical, Government, Management, Law & more.`,color:"#10b981"},
        ].map((item,i)=>(
          <div key={i} style={{background:T.card,borderRadius:14,padding:"16px",marginBottom:11,boxShadow:dark?"0 2px 8px rgba(0,0,0,0.3)":"0 2px 8px rgba(0,0,0,0.05)",display:"flex",gap:13,alignItems:"flex-start"}}>
            <div style={{width:42,height:42,background:item.color+"20",borderRadius:11,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{item.icon}</div>
            <div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:15,fontWeight:700,marginBottom:5,color:T.text}}>{item.title}</div>
              <div style={{fontSize:13,color:T.subtext,lineHeight:1.7}}>{item.text}</div>
            </div>
          </div>
        ))}
        <div style={{textAlign:"center",marginTop:16,fontSize:12,color:T.muted}}>© 2026 ExamNest · Made with ❤️ for Indian Students</div>
      </div>
    </div>
  );
}
