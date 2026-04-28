import { useState } from "react";

const exams = [
  { id:"jee-main", name:"JEE Main", full:"Joint Entrance Examination Main", category:"Engineering", color:"#f97316", icon:"⚙️", difficulty:"High", frequency:"Twice a year",
    syllabus:["Physics: Mechanics, Thermodynamics, Electrostatics, Optics, Modern Physics","Chemistry: Physical, Organic & Inorganic Chemistry","Mathematics: Algebra, Calculus, Coordinate Geometry, Trigonometry"],
    pattern:{duration:"3 hours",questions:"90 MCQs",total:"300 marks",negative:"Yes (-1 per wrong)"},
    cutoff:[{year:2024,general:90.7,obc:75.3,sc:54.0,st:44.1},{year:2023,general:88.4,obc:72.1,sc:51.9,st:42.0}],
    books:["HC Verma – Concepts of Physics","NCERT Chemistry XI & XII","RD Sharma / Arihant Maths","DC Pandey – Electricity & Magnetism"],
    eligibility:"Class 12 with PCM. Min 75% marks (65% SC/ST).",
    tips:["Master NCERT before advanced books","Solve 10+ years previous papers","Focus on weak chapters","Attempt mocks under exam conditions"] },
  { id:"jee-adv", name:"JEE Advanced", full:"Joint Entrance Examination Advanced", category:"Engineering", color:"#ea580c", icon:"🏆", difficulty:"Extremely High", frequency:"Once a year",
    syllabus:["Physics: Full JEE syllabus at deeper level","Chemistry: Full JEE syllabus at deeper level","Mathematics: Full JEE syllabus at deeper level"],
    pattern:{duration:"6 hours (2 papers)",questions:"54 per paper",total:"360 marks",negative:"Yes (varies)"},
    cutoff:[{year:2024,general:109,obc:98,sc:54,st:54},{year:2023,general:91,obc:82,sc:45,st:45}],
    books:["IIT JEE previous year papers","Irodov – Problems in Physics","Morrison Boyd – Organic Chemistry","Hall & Knight – Higher Algebra"],
    eligibility:"Top 2.5 lakh JEE Main qualifiers. Max 2 attempts.",
    tips:["Concept clarity over quantity","Practice IIT previous papers extensively","Time management is critical","Don't ignore any topic"] },
  { id:"bitsat", name:"BITSAT", full:"Birla Institute of Technology & Science Admission Test", category:"Engineering", color:"#fb923c", icon:"🔭", difficulty:"High", frequency:"Once a year",
    syllabus:["Physics: Class 11 & 12","Chemistry: Class 11 & 12","Mathematics: Class 11 & 12","English Proficiency & Logical Reasoning"],
    pattern:{duration:"3 hours",questions:"130 MCQs",total:"390 marks",negative:"Yes (-1 per wrong)"},
    cutoff:[{year:2024,general:310,obc:290,sc:270,st:260},{year:2023,general:300,obc:280,sc:260,st:250}],
    books:["NCERT XI & XII all subjects","Arihant BITSAT guide","Previous year BITSAT papers"],
    eligibility:"Class 12 with PCM. Min 75% aggregate.",
    tips:["Speed is key — 130 questions in 180 min","English & LR are easy scoring","Practice online mock tests","No sectional time limit"] },
  { id:"gate", name:"GATE", full:"Graduate Aptitude Test in Engineering", category:"Engineering", color:"#f59e0b", icon:"🔬", difficulty:"High", frequency:"Once a year",
    syllabus:["Core Engineering Subject (branch-specific)","Engineering Mathematics","General Aptitude (Verbal + Numerical)"],
    pattern:{duration:"3 hours",questions:"65 questions",total:"100 marks",negative:"Yes (MCQs only)"},
    cutoff:[{year:2024,general:31.7,obc:28.5,sc:21.1,st:21.1},{year:2023,general:30.0,obc:27.0,sc:20.0,st:20.0}],
    books:["Made Easy / ACE Academy notes","Standard textbooks by subject","Previous 15 years GATE papers","RS Aggarwal – Aptitude"],
    eligibility:"B.E/B.Tech/B.Sc(Research) 3rd year or passed.",
    tips:["Analyze syllabus weightage first","Engineering Maths is high scoring","Practice numerical answer type questions","Solve subject-wise previous year questions"] },
  { id:"viteee", name:"VITEEE", full:"VIT Engineering Entrance Examination", category:"Engineering", color:"#fbbf24", icon:"🏫", difficulty:"Moderate", frequency:"Once a year",
    syllabus:["Physics: Class 11 & 12","Chemistry: Class 11 & 12","Mathematics/Biology","English & Aptitude"],
    pattern:{duration:"2.5 hours",questions:"125 MCQs",total:"125 marks",negative:"No"},
    cutoff:[{year:2024,general:80,obc:70,sc:60,st:55},{year:2023,general:75,obc:65,sc:55,st:50}],
    books:["NCERT XI & XII","VIT previous year papers","Arihant VITEEE guide"],
    eligibility:"Class 12 with PCM/PCB. Min 60% marks.",
    tips:["No negative marking — attempt all","NCERT sufficient for most topics","Speed matters","English section is easy — don't skip"] },
  { id:"neet-ug", name:"NEET UG", full:"National Eligibility cum Entrance Test UG", category:"Medical", color:"#10b981", icon:"🩺", difficulty:"Very High", frequency:"Once a year",
    syllabus:["Physics: Class 11 & 12 NCERT","Chemistry: Physical, Organic, Inorganic (NCERT)","Biology: Botany & Zoology (NCERT XI & XII)"],
    pattern:{duration:"3 hours 20 min",questions:"200 (attempt 180)",total:"720 marks",negative:"Yes (-1 per wrong)"},
    cutoff:[{year:2024,general:720,obc:137,sc:107,st:107},{year:2023,general:720,obc:129,sc:100,st:100}],
    books:["NCERT Biology XI & XII","DC Pandey – Physics for NEET","OP Tandon – Physical Chemistry","MTG Objective NCERT at Your Fingertips"],
    eligibility:"Class 12 with PCB. Min age 17.",
    tips:["NCERT is the bible","Biology carries 360/720 marks","Revise with spaced repetition","Attempt full mocks weekly"] },
  { id:"neet-pg", name:"NEET PG", full:"National Eligibility cum Entrance Test Postgraduate", category:"Medical", color:"#059669", icon:"👨‍⚕️", difficulty:"Very High", frequency:"Once a year",
    syllabus:["All 19 MBBS subjects","Pre-clinical, Para-clinical, Clinical subjects"],
    pattern:{duration:"3.5 hours",questions:"200 MCQs",total:"800 marks",negative:"Yes (-25% per wrong)"},
    cutoff:[{year:2024,general:376,obc:338,sc:319,st:319},{year:2023,general:360,obc:324,sc:306,st:306}],
    books:["Robbins – Pathology","Harrison – Medicine","Dams/PrepLadder notes","Previous year NEET PG papers"],
    eligibility:"MBBS degree with 1 year internship completed.",
    tips:["Subject-wise revision is key","High-yield: Medicine, Surgery, OBG","Use question banks daily","Revise 3-4 times before exam"] },
  { id:"upsc-cse", name:"UPSC CSE", full:"Civil Services Examination", category:"Government", color:"#6366f1", icon:"🏛️", difficulty:"Extremely High", frequency:"Once a year",
    syllabus:["Prelims: GS Paper I, CSAT (Paper II)","Mains: Essay, GS I–IV, Optional (2 papers)","Interview: Personality Test (275 marks)"],
    pattern:{duration:"Prelims: 4hr | Mains: 9 papers",questions:"Prelims 200 MCQs | Mains descriptive",total:"2025 marks (Mains + Interview)",negative:"Prelims: -0.33 per wrong"},
    cutoff:[{year:2024,general:104,obc:98,sc:88,st:84},{year:2023,general:101,obc:95,sc:85,st:81}],
    books:["NCERT VI–XII – Foundation","Laxmikanth – Indian Polity","Spectrum – Modern Indian History","Economic Survey + India Yearbook"],
    eligibility:"Graduate from recognised university. Age: 21–32 (Gen).",
    tips:["Start with NCERTs","Make concise notes from Day 1","Read The Hindu daily","Choose optional wisely"] },
  { id:"ssc-cgl", name:"SSC CGL", full:"Staff Selection Commission Combined Graduate Level", category:"Government", color:"#14b8a6", icon:"📋", difficulty:"Moderate", frequency:"Once a year",
    syllabus:["General Intelligence & Reasoning","General Awareness","Quantitative Aptitude","English Comprehension"],
    pattern:{duration:"Tier I: 60 min | Tier II: 2.5 hr",questions:"Tier I: 100 | Tier II: varies",total:"Tier I: 200 | Tier II: 800",negative:"Yes"},
    cutoff:[{year:2024,general:145,obc:138,sc:128,st:120},{year:2023,general:142,obc:135,sc:125,st:117}],
    books:["Lucent GK","RS Aggarwal – Maths & Reasoning","SP Bakshi – English","Kiran SSC CGL Previous Papers"],
    eligibility:"Graduate from recognised university. Age: 18–32.",
    tips:["Current affairs from last 6 months","Speed & accuracy in Quant","English grammar rules","Daily 2 hours practice tests"] },
  { id:"ssc-chsl", name:"SSC CHSL", full:"SSC Combined Higher Secondary Level", category:"Government", color:"#0d9488", icon:"📄", difficulty:"Moderate", frequency:"Once a year",
    syllabus:["General Intelligence","General Awareness","Quantitative Aptitude","English Language"],
    pattern:{duration:"60 minutes",questions:"100 MCQs",total:"200 marks",negative:"Yes (-0.5)"},
    cutoff:[{year:2024,general:165,obc:158,sc:145,st:138},{year:2023,general:160,obc:152,sc:140,st:133}],
    books:["Lucent GK","Arihant SSC CHSL","Kiran Previous Papers"],
    eligibility:"Class 12 passed. Age: 18–27.",
    tips:["Similar to CGL but 12th level","Focus on speed","Typing test for final selection","GK is very important"] },
  { id:"ibps-po", name:"IBPS PO", full:"IBPS Probationary Officer", category:"Government", color:"#3b82f6", icon:"🏦", difficulty:"High", frequency:"Once a year",
    syllabus:["Reasoning Ability","Quantitative Aptitude","English Language","General Awareness (Banking)","Computer Knowledge"],
    pattern:{duration:"Prelims: 1hr | Mains: 3hr",questions:"Prelims: 100 | Mains: 155",total:"Prelims: 100 | Mains: 225",negative:"Yes (-0.25)"},
    cutoff:[{year:2024,general:47,obc:44,sc:38,st:35},{year:2023,general:45,obc:42,sc:36,st:33}],
    books:["RS Aggarwal – Quantitative Aptitude","Arihant Reasoning","Manorama Yearbook","Kiran IBPS PO Papers"],
    eligibility:"Graduate from recognised university. Age: 20–30.",
    tips:["Banking GK is very important","High accuracy in Prelims","Mains has descriptive English","Practice data interpretation daily"] },
  { id:"sbi-po", name:"SBI PO", full:"State Bank of India Probationary Officer", category:"Government", color:"#2563eb", icon:"🏧", difficulty:"High", frequency:"Once a year",
    syllabus:["Reasoning & Computer Aptitude","Data Analysis & Interpretation","General/Economy/Banking Awareness","English Language"],
    pattern:{duration:"Prelims: 1hr | Mains: 3hr",questions:"Prelims: 100 | Mains: 155+descriptive",total:"Prelims: 100 | Mains: 250",negative:"Yes (-0.25)"},
    cutoff:[{year:2024,general:52,obc:49,sc:43,st:40},{year:2023,general:50,obc:47,sc:41,st:38}],
    books:["SBI PO previous papers","The Hindu for banking news","Arihant SBI PO guide"],
    eligibility:"Graduate. Age: 21–30.",
    tips:["Toughest bank exam","Economy awareness very important","Descriptive writing needs practice","Group discussion + interview are crucial"] },
  { id:"rrb-ntpc", name:"RRB NTPC", full:"Railway Recruitment Board NTPC", category:"Government", color:"#7c3aed", icon:"🚂", difficulty:"Moderate", frequency:"Every 2-3 years",
    syllabus:["Mathematics","General Intelligence & Reasoning","General Awareness"],
    pattern:{duration:"90 minutes",questions:"100 MCQs",total:"100 marks",negative:"Yes (-1/3)"},
    cutoff:[{year:2024,general:65,obc:61,sc:55,st:52},{year:2023,general:63,obc:59,sc:53,st:50}],
    books:["Arihant RRB NTPC","Lucent GK","RS Aggarwal Maths","RRB Previous Papers"],
    eligibility:"Class 12 or Graduate (varies by post). Age: 18–33.",
    tips:["GK is most important section","Railway-specific GK is frequently asked","Maths up to Class 10 level","Speed matters"] },
  { id:"nda", name:"NDA", full:"National Defence Academy Examination", category:"Government", color:"#047857", icon:"⚔️", difficulty:"High", frequency:"Twice a year",
    syllabus:["Mathematics: Algebra, Calculus, Trigonometry, Statistics","General Ability: English, GK, Physics, Chemistry, History, Geography"],
    pattern:{duration:"5 hours (2 papers)",questions:"Paper I: 120, Paper II: 150",total:"900 marks",negative:"Yes (-0.33 per wrong)"},
    cutoff:[{year:2024,general:360,obc:340,sc:300,st:290},{year:2023,general:350,obc:330,sc:290,st:280}],
    books:["Pathfinder NDA/NA by Arihant","RS Aggarwal – Maths","Lucent GK","Previous Year NDA Papers"],
    eligibility:"Class 12 passed/appearing. Age: 16.5–19.5. Only unmarried males.",
    tips:["Maths paper needs strong basics","GK from last 6 months current affairs","Physical fitness equally important","SSB interview is the toughest part"] },
  { id:"cat", name:"CAT", full:"Common Admission Test", category:"Management", color:"#ec4899", icon:"📊", difficulty:"High", frequency:"Once a year",
    syllabus:["VARC: Reading Comprehension, Para Summary, Para Jumbles","DILR: Data Interpretation, Logical Reasoning","QA: Arithmetic, Algebra, Geometry, Number System"],
    pattern:{duration:"2 hours",questions:"66 questions",total:"198 marks",negative:"Yes (-1 per wrong MCQ)"},
    cutoff:[{year:2024,general:99,obc:97,sc:90,st:85},{year:2023,general:99,obc:96,sc:88,st:83}],
    books:["Arun Sharma – QA & DI","Verbal Ability by Arun Sharma","TIME/CL study material","Previous year CAT papers"],
    eligibility:"Graduate with min 50% marks (45% SC/ST). Final year students eligible.",
    tips:["Accuracy > Speed","VARC: Read editorials daily","DILR: Practice set-based questions","Attempt 3-4 mocks per week from August"] },
  { id:"xat", name:"XAT", full:"Xavier Aptitude Test", category:"Management", color:"#db2777", icon:"📈", difficulty:"High", frequency:"Once a year",
    syllabus:["Verbal & Logical Ability","Decision Making","Quantitative Ability & Data Interpretation","General Knowledge"],
    pattern:{duration:"3.5 hours",questions:"75 + 25 GK",total:"75 marks + GK",negative:"Yes (-0.25)"},
    cutoff:[{year:2024,general:95,obc:90,sc:80,st:75},{year:2023,general:93,obc:88,sc:78,st:73}],
    books:["XAT Decision Making by Arihant","CAT/XAT previous papers","TIME XAT material"],
    eligibility:"Graduate from recognised university.",
    tips:["Decision Making is unique to XAT","Essay writing for XLRI selection","GK section has no negative marking","XAT is harder than CAT"] },
  { id:"clat", name:"CLAT", full:"Common Law Admission Test", category:"Law", color:"#b45309", icon:"⚖️", difficulty:"High", frequency:"Once a year",
    syllabus:["English Language","Current Affairs & GK","Legal Reasoning","Logical Reasoning","Quantitative Techniques"],
    pattern:{duration:"2 hours",questions:"120 MCQs",total:"120 marks",negative:"Yes (-0.25)"},
    cutoff:[{year:2024,general:95,obc:82,sc:65,st:57},{year:2023,general:93,obc:80,sc:63,st:55}],
    books:["Arihant CLAT guide","AP Bhardwaj – Legal Aptitude","Previous year CLAT papers","The Hindu for Current Affairs"],
    eligibility:"Class 12 with min 45% marks (40% SC/ST).",
    tips:["Legal reasoning needs regular practice","Current affairs from last 12 months","Reading comprehension is key","No maths beyond Class 10"] },
  { id:"nid", name:"NID DAT", full:"National Institute of Design Design Aptitude Test", category:"Design", color:"#7c3aed", icon:"🎨", difficulty:"High", frequency:"Once a year",
    syllabus:["Drawing & Sketching","Design Thinking","Creativity & Observation","Communication Skills"],
    pattern:{duration:"Prelims: 3hr | Mains: Studio test",questions:"Subjective + Studio test",total:"Based on jury",negative:"No"},
    cutoff:[{year:2024,general:55,obc:48,sc:38,st:35},{year:2023,general:53,obc:46,sc:36,st:33}],
    books:["NID previous year papers","Design sketching books","Draw every day — no book substitute"],
    eligibility:"Class 12 from any stream. No age bar.",
    tips:["Practice drawing daily — non-negotiable","Observe design around you","Originality valued over perfection","Study products, packaging, environments"] },
  { id:"nift", name:"NIFT", full:"National Institute of Fashion Technology Entrance Test", category:"Design", color:"#6d28d9", icon:"👗", difficulty:"High", frequency:"Once a year",
    syllabus:["Creative Ability Test: Drawing, Design","General Ability Test: English, Maths, GK, Case Study"],
    pattern:{duration:"CAT: 3hr | GAT: 2hr",questions:"CAT: subjective | GAT: 100 MCQs",total:"CAT + GAT combined",negative:"No for CAT, Yes for GAT"},
    cutoff:[{year:2024,general:72,obc:65,sc:55,st:50},{year:2023,general:70,obc:63,sc:53,st:48}],
    books:["NIFT previous year papers","Fashion history books","Basic drawing & sketching guides"],
    eligibility:"Class 12 passed. Age: Max 23 years.",
    tips:["Creative ability test needs daily practice","GAT needs GK and English skills","Fashion awareness is important","Portfolio quality matters"] },
  { id:"iit-jam", name:"IIT JAM", full:"Joint Admission Test for MSc", category:"Science", color:"#0891b2", icon:"🧪", difficulty:"High", frequency:"Once a year",
    syllabus:["Subject-specific (Physics/Chemistry/Maths/Biology/Geology/Economics)","Varies by paper chosen"],
    pattern:{duration:"3 hours",questions:"60 questions (MCQ + NAT + MSQ)",total:"100 marks",negative:"Yes for MCQ only"},
    cutoff:[{year:2024,general:20,obc:18,sc:10,st:10},{year:2023,general:19,obc:17,sc:9,st:9}],
    books:["BSc textbooks of chosen subject","Previous year JAM papers","GateForum/Made Easy material"],
    eligibility:"Bachelor's degree with relevant subject. Final year eligible.",
    tips:["Subject mastery is key","Previous years are most important","NAT questions need calculation speed","Choose paper wisely"] },
  { id:"ctet", name:"CTET", full:"Central Teacher Eligibility Test", category:"Teaching", color:"#16a34a", icon:"📚", difficulty:"Moderate", frequency:"Twice a year",
    syllabus:["Child Development & Pedagogy","Language I (compulsory)","Language II (compulsory)","Mathematics / Science / Social Studies"],
    pattern:{duration:"2.5 hours",questions:"150 MCQs",total:"150 marks",negative:"No"},
    cutoff:[{year:2024,general:90,obc:82,sc:75,st:75},{year:2023,general:88,obc:80,sc:73,st:73}],
    books:["Child Development by Arihant","NCERT textbooks Class 1–8","Previous year CTET papers","Disha CTET guide"],
    eligibility:"Class 12 with 50% + 2 year D.El.Ed OR Graduation + B.Ed.",
    tips:["No negative marking — attempt all","Child Development has highest weightage","Pedagogy questions need conceptual clarity","Language sections test teaching methods"] },
  { id:"ugc-net", name:"UGC NET", full:"UGC National Eligibility Test", category:"Teaching", color:"#15803d", icon:"🎓", difficulty:"High", frequency:"Twice a year",
    syllabus:["Paper I: Teaching Aptitude, Research, Communication, Reasoning, GK","Paper II: Subject-specific (from 81 subjects)"],
    pattern:{duration:"3 hours",questions:"Paper I: 50 | Paper II: 100",total:"300 marks",negative:"No"},
    cutoff:[{year:2024,general:40,obc:35,sc:35,st:35},{year:2023,general:38,obc:33,sc:33,st:33}],
    books:["Trueman's UGC NET Paper I","Subject-specific books","Previous year UGC NET papers"],
    eligibility:"Masters degree with 55% marks (50% SC/ST/PWD).",
    tips:["Paper I is same for all subjects","Teaching & Research aptitude needs practice","Paper II needs thorough subject knowledge","No negative marking — attempt all"] },
  { id:"nata", name:"NATA", full:"National Aptitude Test in Architecture", category:"Architecture", color:"#0369a1", icon:"🏗️", difficulty:"High", frequency:"Twice a year",
    syllabus:["Drawing & Composition","Visual Perception & Cognition","Mathematics (Class 11 & 12)","General Aptitude"],
    pattern:{duration:"3 hours",questions:"Part A: Drawing | Part B: MCQ",total:"200 marks",negative:"No"},
    cutoff:[{year:2024,general:110,obc:98,sc:82,st:75},{year:2023,general:105,obc:94,sc:78,st:71}],
    books:["NATA previous year papers","Drawing & sketching practice books","B.Arch entrance guide by Arihant"],
    eligibility:"Class 12 with Maths. Min 50% marks.",
    tips:["Drawing is the most important component","Practice perspective drawing","Maths up to Class 12 level","Observe architecture around you"] },
];

const categories = ["All","Engineering","Medical","Government","Management","Law","Design","Science","Teaching","Architecture"];
const catIcons = {"All":"🇮🇳","Engineering":"⚙️","Medical":"🩺","Government":"🏛️","Management":"📊","Law":"⚖️","Design":"🎨","Science":"🧪","Teaching":"📚","Architecture":"🏗️"};

const diffColor = {"Easy":"#22c55e","Moderate":"#f59e0b","High":"#f97316","Very High":"#ef4444","Extremely High":"#7c3aed"};

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600&display=swap');
  *{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent;}
  html,body{font-family:'DM Sans',sans-serif;background:#f8f7f4;color:#1a1a2e;overscroll-behavior:none;}
  :root{--dark:#1a1a2e;--gold:#c9a84c;--gold-light:#e8c97e;--border:rgba(0,0,0,0.08);--muted:#888;}
  @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
  @keyframes slideIn{from{opacity:0;transform:translateX(20px)}to{opacity:1;transform:translateX(0)}}
  @keyframes pop{0%{transform:scale(0.97)}50%{transform:scale(1.02)}100%{transform:scale(1)}}
  .card{transition:transform 0.15s ease,box-shadow 0.15s ease;}
  .card:active{transform:scale(0.97);}
  input:focus{outline:none;}
  ::-webkit-scrollbar{display:none;}
`;

export default function App() {
  const [page, setPage] = useState("home");
  const [selected, setSelected] = useState(null);
  const [tab, setTab] = useState("syllabus");
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [navTab, setNavTab] = useState("home");

  const filtered = exams.filter(e =>
    (category === "All" || e.category === category) &&
    (e.name.toLowerCase().includes(search.toLowerCase()) ||
     e.full.toLowerCase().includes(search.toLowerCase()) ||
     e.category.toLowerCase().includes(search.toLowerCase()))
  );

  const openExam = (exam) => {
    setSelected(exam); setPage("detail"); setTab("syllabus");
    window.scrollTo(0,0);
  };
  const goHome = () => {
    setPage("home"); setSelected(null);
    setNavTab("home");
  };
  const goSearch = () => {
    setPage("home"); setNavTab("search");
    setTimeout(()=>document.getElementById("searchInput")?.focus(),100);
  };

  return (
    <>
      <style>{globalStyles}</style>
      <div style={{minHeight:"100vh",background:"#f8f7f4",paddingBottom:72}}>

        {/* ── DETAIL PAGE ── */}
        {page === "detail" && selected ? (
          <DetailPage exam={selected} goHome={goHome} tab={tab} setTab={setTab} />
        ) : (

        /* ── HOME PAGE ── */
        <>
          {/* Top bar */}
          <div style={{background:"var(--dark)",padding:"16px 20px 0",position:"sticky",top:0,zIndex:50}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <div style={{width:32,height:32,background:"rgba(255,255,255,0.1)",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>📚</div>
                <div>
                  <div style={{fontFamily:"'Playfair Display',serif",fontSize:17,fontWeight:700,color:"#fff",lineHeight:1}}>ExamNest</div>
                  <div style={{fontSize:9,color:"var(--gold)",letterSpacing:"0.12em",textTransform:"uppercase"}}>India's Exam Guide</div>
                </div>
              </div>
              <div style={{background:"rgba(255,255,255,0.1)",borderRadius:20,padding:"4px 12px",fontSize:11,color:"rgba(255,255,255,0.7)"}}>
                {exams.length}+ Exams
              </div>
            </div>

            {/* Search bar */}
            <div style={{position:"relative",marginBottom:14}}>
              <span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",fontSize:15,color:"rgba(255,255,255,0.4)"}}>🔍</span>
              <input id="searchInput" value={search} onChange={e=>setSearch(e.target.value)}
                placeholder="Search JEE, NEET, UPSC, CAT..."
                style={{width:"100%",padding:"11px 14px 11px 38px",background:"rgba(255,255,255,0.1)",border:"1px solid rgba(255,255,255,0.15)",borderRadius:12,color:"#fff",fontSize:14,fontFamily:"inherit"}} />
              {search && <span onClick={()=>setSearch("")} style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",fontSize:16,color:"rgba(255,255,255,0.5)",cursor:"pointer"}}>✕</span>}
            </div>

            {/* Category pills */}
            <div style={{display:"flex",gap:8,overflowX:"auto",paddingBottom:14,scrollbarWidth:"none"}}>
              {categories.map(c=>(
                <button key={c} onClick={()=>setCategory(c)} style={{
                  flexShrink:0,padding:"6px 14px",borderRadius:20,border:"none",cursor:"pointer",
                  fontSize:12,fontFamily:"inherit",fontWeight:500,transition:"all 0.2s",
                  background:category===c?"var(--gold)":"rgba(255,255,255,0.1)",
                  color:category===c?"#1a1a2e":"rgba(255,255,255,0.7)",
                }}>{catIcons[c]} {c}</button>
              ))}
            </div>
          </div>

          {/* Results count */}
          {search || category !== "All" ? (
            <div style={{padding:"12px 20px 4px",fontSize:12,color:"var(--muted)"}}>
              {filtered.length} exam{filtered.length !== 1 ? "s" : ""} found
              {category !== "All" ? ` in ${category}` : ""}
              {search ? ` for "${search}"` : ""}
            </div>
          ) : (
            <div style={{padding:"16px 20px 4px"}}>
              <div style={{fontSize:20,fontWeight:700,fontFamily:"'Playfair Display',serif",color:"var(--dark)"}}>All Exams 🇮🇳</div>
              <div style={{fontSize:12,color:"var(--muted)",marginTop:2}}>Tap any exam to see details</div>
            </div>
          )}

          {/* Exam cards */}
          <div style={{padding:"12px 16px",display:"flex",flexDirection:"column",gap:12}}>
            {filtered.map((exam,i)=>(
              <div key={exam.id} className="card" onClick={()=>openExam(exam)} style={{
                background:"#fff",borderRadius:16,overflow:"hidden",cursor:"pointer",
                boxShadow:"0 2px 12px rgba(0,0,0,0.07)",
                animation:`fadeUp 0.4s ease forwards ${Math.min(i*0.04,0.3)}s`,opacity:0,
              }}>
                <div style={{height:3,background:exam.color}} />
                <div style={{padding:"14px 16px",display:"flex",alignItems:"center",gap:14}}>
                  <div style={{width:52,height:52,background:exam.color+"15",borderRadius:14,display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,flexShrink:0}}>
                    {exam.icon}
                  </div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:3}}>
                      <div style={{fontFamily:"'Playfair Display',serif",fontSize:16,fontWeight:700,color:"var(--dark)"}}>{exam.name}</div>
                      <div style={{fontSize:18,color:"#ccc",flexShrink:0}}>›</div>
                    </div>
                    <div style={{fontSize:11,color:"var(--muted)",marginBottom:8,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{exam.full}</div>
                    <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                      <span style={{background:exam.color+"18",color:exam.color,fontSize:10,fontWeight:600,padding:"3px 8px",borderRadius:8}}>{exam.category}</span>
                      <span style={{background:diffColor[exam.difficulty]+"18",color:diffColor[exam.difficulty],fontSize:10,fontWeight:600,padding:"3px 8px",borderRadius:8}}>{exam.difficulty}</span>
                      <span style={{background:"#f1f5f9",color:"#64748b",fontSize:10,padding:"3px 8px",borderRadius:8}}>{exam.frequency}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {filtered.length===0&&(
              <div style={{textAlign:"center",padding:"60px 0",color:"var(--muted)"}}>
                <div style={{fontSize:48,marginBottom:12}}>🔍</div>
                <div style={{fontSize:16,fontWeight:600}}>No exams found</div>
                <div style={{fontSize:13,marginTop:6}}>Try "JEE", "NEET", "UPSC", "CAT"...</div>
                <button onClick={()=>{setSearch("");setCategory("All");}} style={{marginTop:16,padding:"10px 24px",background:"var(--dark)",color:"#fff",border:"none",borderRadius:12,fontSize:14,cursor:"pointer",fontFamily:"inherit"}}>Clear Filter</button>
              </div>
            )}
          </div>
        </>
        )}

        {/* ── BOTTOM NAV ── */}
        {page !== "detail" && (
          <div style={{position:"fixed",bottom:0,left:0,right:0,background:"#fff",borderTop:"1px solid var(--border)",display:"flex",zIndex:100,paddingBottom:"env(safe-area-inset-bottom)"}}>
            {[
              {id:"home",icon:"🏠",label:"Home"},
              {id:"search",icon:"🔍",label:"Search"},
              {id:"about",icon:"ℹ️",label:"About"},
            ].map(item=>(
              <button key={item.id} onClick={()=>{
                if(item.id==="search") goSearch();
                else if(item.id==="about") setNavTab("about");
                else goHome();
              }} style={{
                flex:1,padding:"10px 0 8px",background:"none",border:"none",cursor:"pointer",
                display:"flex",flexDirection:"column",alignItems:"center",gap:3,
              }}>
                <div style={{fontSize:20}}>{item.icon}</div>
                <div style={{fontSize:10,fontFamily:"inherit",fontWeight:navTab===item.id?600:400,color:navTab===item.id?"var(--dark)":"var(--muted)"}}>{item.label}</div>
                {navTab===item.id&&<div style={{width:4,height:4,borderRadius:"50%",background:"var(--gold)",marginTop:1}} />}
              </button>
            ))}
          </div>
        )}

        {/* About overlay */}
        {navTab==="about" && page!=="detail" && (
          <div style={{position:"fixed",inset:0,background:"#f8f7f4",zIndex:80,overflowY:"auto",paddingBottom:80}}>
            <div style={{background:"var(--dark)",padding:"20px",display:"flex",alignItems:"center",gap:12}}>
              <button onClick={()=>setNavTab("home")} style={{background:"rgba(255,255,255,0.1)",border:"none",borderRadius:10,padding:"8px 14px",color:"#fff",cursor:"pointer",fontSize:14,fontFamily:"inherit"}}>← Back</button>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:18,fontWeight:700,color:"#fff"}}>About ExamNest</div>
            </div>
            <div style={{padding:"24px 20px"}}>
              {[
                {icon:"📚",title:"Who We Are",text:"ExamNest is an educational platform for students preparing for competitive exams across India. We cover Engineering, Medical, Government, Management, Law, Design and more."},
                {icon:"🎯",title:"Our Mission",text:"To make exam-related information easily accessible to every Indian student — clear, accurate, and completely free."},
                {icon:"✅",title:"What We Offer",text:"Detailed syllabus, exam pattern, cutoff marks, eligibility criteria, recommended books and preparation tips for all major Indian exams."},
                {icon:"💡",title:"Why ExamNest?",text:"One platform. All exams. Free forever. No ads, no confusion — just clean exam guidance for every student."},
              ].map((item,i)=>(
                <div key={i} style={{background:"#fff",borderRadius:16,padding:"18px",marginBottom:12,boxShadow:"0 2px 8px rgba(0,0,0,0.05)"}}>
                  <div style={{fontSize:28,marginBottom:8}}>{item.icon}</div>
                  <div style={{fontFamily:"'Playfair Display',serif",fontSize:17,fontWeight:700,marginBottom:6,color:"var(--dark)"}}>{item.title}</div>
                  <div style={{fontSize:14,color:"#555",lineHeight:1.7}}>{item.text}</div>
                </div>
              ))}
              <div style={{textAlign:"center",marginTop:24,fontSize:12,color:"var(--muted)"}}>
                © 2026 ExamNest · {exams.length}+ Exams Covered<br/>Made with ❤️ for Indian Students
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

function DetailPage({exam,goHome,tab,setTab}){
  const tabs=[
    {id:"syllabus",label:"Syllabus",icon:"📖"},
    {id:"pattern",label:"Pattern",icon:"📋"},
    {id:"cutoff",label:"Cutoff",icon:"📊"},
    {id:"books",label:"Books",icon:"📚"},
    {id:"tips",label:"Tips",icon:"💡"},
  ];

  return(
    <div style={{minHeight:"100vh",background:"#f8f7f4",fontFamily:"'DM Sans',sans-serif"}}>
      {/* Header */}
      <div style={{background:exam.color,padding:"16px 20px 0",position:"sticky",top:0,zIndex:50}}>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
          <button onClick={goHome} style={{background:"rgba(255,255,255,0.2)",border:"none",borderRadius:10,padding:"8px 14px",color:"#fff",cursor:"pointer",fontSize:14,fontFamily:"inherit",fontWeight:500}}>← Back</button>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:16,fontWeight:700,color:"#fff",opacity:0.9}}>ExamNest</div>
        </div>

        {/* Exam hero */}
        <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:16}}>
          <div style={{width:60,height:60,background:"rgba(255,255,255,0.2)",borderRadius:16,display:"flex",alignItems:"center",justifyContent:"center",fontSize:30,flexShrink:0}}>
            {exam.icon}
          </div>
          <div>
            <div style={{fontSize:10,color:"rgba(255,255,255,0.75)",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:3}}>{exam.category}</div>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:900,color:"#fff",lineHeight:1.1}}>{exam.name}</div>
            <div style={{fontSize:12,color:"rgba(255,255,255,0.8)",marginTop:3}}>{exam.full}</div>
          </div>
        </div>

        {/* Quick stats */}
        <div style={{display:"flex",gap:0,background:"rgba(0,0,0,0.15)",borderRadius:12,overflow:"hidden",marginBottom:16}}>
          {[["Marks",exam.pattern.total],["Duration",exam.pattern.duration],["Frequency",exam.frequency]].map(([l,v],i)=>(
            <div key={l} style={{flex:1,padding:"10px 8px",textAlign:"center",borderRight:i<2?"1px solid rgba(255,255,255,0.1)":"none"}}>
              <div style={{fontSize:9,color:"rgba(255,255,255,0.6)",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:3}}>{l}</div>
              <div style={{fontSize:11,fontWeight:600,color:"#fff",lineHeight:1.3}}>{v}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{display:"flex",gap:0,overflowX:"auto",scrollbarWidth:"none"}}>
          {tabs.map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)} style={{
              flexShrink:0,padding:"10px 14px",background:"none",border:"none",cursor:"pointer",
              fontSize:12,fontFamily:"inherit",fontWeight:tab===t.id?600:400,
              color:tab===t.id?"#fff":"rgba(255,255,255,0.6)",
              borderBottom:`2px solid ${tab===t.id?"#fff":"transparent"}`,
              transition:"all 0.2s",whiteSpace:"nowrap",
            }}>{t.icon} {t.label}</button>
          ))}
        </div>
      </div>

      {/* Eligibility strip */}
      <div style={{background:"#fff",padding:"12px 20px",borderBottom:"1px solid rgba(0,0,0,0.06)",display:"flex",gap:8,alignItems:"flex-start"}}>
        <span style={{fontSize:14,flexShrink:0}}>✅</span>
        <div style={{fontSize:12,color:"#444",lineHeight:1.6}}><strong>Eligibility:</strong> {exam.eligibility}</div>
      </div>

      {/* Tab content */}
      <div style={{padding:"16px"}}>

        {tab==="syllabus"&&(
          <div style={{animation:"fadeUp 0.3s ease forwards"}}>
            <div style={{fontSize:16,fontFamily:"'Playfair Display',serif",fontWeight:700,marginBottom:12,color:"var(--dark)"}}>Syllabus</div>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {exam.syllabus.map((s,i)=>{
                const[subject,...topics]=s.split(": ");
                return(
                  <div key={i} style={{background:"#fff",borderRadius:14,padding:"14px 16px",borderLeft:`4px solid ${exam.color}`,boxShadow:"0 1px 8px rgba(0,0,0,0.05)"}}>
                    <div style={{fontWeight:700,fontSize:14,marginBottom:6,color:"var(--dark)"}}>{subject}</div>
                    <div style={{fontSize:12,color:"#666",lineHeight:1.6}}>{topics.join(": ")}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {tab==="pattern"&&(
          <div style={{animation:"fadeUp 0.3s ease forwards"}}>
            <div style={{fontSize:16,fontFamily:"'Playfair Display',serif",fontWeight:700,marginBottom:12,color:"var(--dark)"}}>Exam Pattern</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              {Object.entries(exam.pattern).map(([k,v])=>(
                <div key={k} style={{background:"#fff",borderRadius:14,padding:"14px",boxShadow:"0 1px 8px rgba(0,0,0,0.05)",textAlign:"center"}}>
                  <div style={{fontSize:9,color:"#888",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:8}}>{k.replace(/([A-Z])/g," $1").trim()}</div>
                  <div style={{fontFamily:"'Playfair Display',serif",fontSize:16,fontWeight:700,color:exam.color,lineHeight:1.3}}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab==="cutoff"&&(
          <div style={{animation:"fadeUp 0.3s ease forwards"}}>
            <div style={{fontSize:16,fontFamily:"'Playfair Display',serif",fontWeight:700,marginBottom:12,color:"var(--dark)"}}>Cutoff Marks</div>
            <div style={{background:"#fff",borderRadius:14,overflow:"hidden",boxShadow:"0 1px 8px rgba(0,0,0,0.05)"}}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr 1fr",background:exam.color+"20",padding:"10px 12px"}}>
                {["Year","Gen","OBC","SC","ST"].map(h=>(
                  <div key={h} style={{fontSize:11,fontWeight:700,color:"var(--dark)",textAlign:"center"}}>{h}</div>
                ))}
              </div>
              {exam.cutoff.map((row,i)=>(
                <div key={i} style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr 1fr",padding:"12px",borderTop:"1px solid rgba(0,0,0,0.06)"}}>
                  <div style={{fontSize:13,fontWeight:700,color:exam.color,textAlign:"center"}}>{row.year}</div>
                  <div style={{fontSize:13,textAlign:"center"}}>{row.general}</div>
                  <div style={{fontSize:13,textAlign:"center"}}>{row.obc}</div>
                  <div style={{fontSize:13,textAlign:"center"}}>{row.sc}</div>
                  <div style={{fontSize:13,textAlign:"center"}}>{row.st}</div>
                </div>
              ))}
            </div>
            <div style={{fontSize:11,color:"#888",marginTop:10,textAlign:"center"}}>* Indicative figures. Verify from official sources.</div>
          </div>
        )}

        {tab==="books"&&(
          <div style={{animation:"fadeUp 0.3s ease forwards"}}>
            <div style={{fontSize:16,fontFamily:"'Playfair Display',serif",fontWeight:700,marginBottom:12,color:"var(--dark)"}}>Recommended Books</div>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {exam.books.map((book,i)=>(
                <div key={i} style={{background:"#fff",borderRadius:14,padding:"14px 16px",display:"flex",alignItems:"center",gap:12,boxShadow:"0 1px 8px rgba(0,0,0,0.05)"}}>
                  <div style={{width:36,height:36,background:exam.color+"18",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>📖</div>
                  <div style={{fontSize:13,fontWeight:500,color:"#333",lineHeight:1.4}}>{book}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab==="tips"&&(
          <div style={{animation:"fadeUp 0.3s ease forwards"}}>
            <div style={{fontSize:16,fontFamily:"'Playfair Display',serif",fontWeight:700,marginBottom:12,color:"var(--dark)"}}>Preparation Tips</div>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {exam.tips.map((tip,i)=>(
                <div key={i} style={{background:"#fff",borderRadius:14,padding:"14px 16px",display:"flex",gap:12,alignItems:"flex-start",boxShadow:"0 1px 8px rgba(0,0,0,0.05)"}}>
                  <div style={{width:28,height:28,background:exam.color,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:700,fontSize:13,flexShrink:0}}>{i+1}</div>
                  <div style={{fontSize:13,color:"#333",lineHeight:1.7,paddingTop:4}}>{tip}</div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
