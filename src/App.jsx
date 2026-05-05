import { useState, useEffect, useRef } from "react";

// ═══════════════════════════════════════════════════
// EXAMNEST — ULTRA CINEMATIC INTRO + FULL APP
// Complete file — paste everything into src/App.jsx
// ═══════════════════════════════════════════════════

const STORAGE_KEY = "examnest_v5";
function saveData(d) { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(d)); } catch(e) {} }
function loadData() { try { var d = localStorage.getItem(STORAGE_KEY); return d ? JSON.parse(d) : null; } catch(e) { return null; } }

// ─── EXAM DATA (125+ EXAMS!) ───────────────────────────────────────
const exams = [
  // YOUR ORIGINAL 12 DETAILED EXAMS (KEPT EXACTLY AS THEY WERE)
  { id:"jee-main", name:"JEE Main", full:"Joint Entrance Examination Main", category:"Engineering", color:"#f97316", icon:"⚙️", difficulty:"High", diffScore:3, frequency:"Twice a year", seats:"~11 lakh", salary:"₹8-25 LPA", duration:"4 years", syllabus:["Physics: Mechanics, Thermodynamics, Electrostatics, Optics, Modern Physics","Chemistry: Physical, Organic & Inorganic Chemistry","Mathematics: Algebra, Calculus, Coordinate Geometry, Trigonometry"], topics:{"Physics":["Mechanics","Thermodynamics","Electrostatics","Optics","Modern Physics","Waves","Current Electricity"],"Chemistry":["Physical Chemistry","Organic Chemistry","Inorganic Chemistry","Chemical Bonding","Equilibrium"],"Mathematics":["Algebra","Calculus","Coordinate Geometry","Trigonometry","Statistics","Vectors"]}, pattern:{duration:"3 hours",questions:"90 MCQs",total:"300 marks",negative:"Yes (-1)"}, cutoff:[{year:2024,general:90.7,obc:75.3,sc:54.0,st:44.1},{year:2023,general:88.4,obc:72.1,sc:51.9,st:42.0}], books:["HC Verma – Concepts of Physics","NCERT Chemistry XI & XII","RD Sharma / Arihant Maths","DC Pandey – Electricity & Magnetism"], eligibility:"Class 12 with PCM. Min 75% marks.", tips:["Master NCERT before advanced books","Solve 10+ years previous papers","Focus on weak chapters","Attempt mocks under exam conditions"] },
  { id:"jee-adv", name:"JEE Advanced", full:"Joint Entrance Examination Advanced", category:"Engineering", color:"#ea580c", icon:"🏆", difficulty:"Extremely High", diffScore:5, frequency:"Once a year", seats:"~17,000", salary:"₹15-50 LPA", duration:"4 years", syllabus:["Physics: Full JEE syllabus at deeper level","Chemistry: Full JEE syllabus at deeper level","Mathematics: Full JEE syllabus at deeper level"], topics:{"Physics":["Mechanics (Advanced)","Thermodynamics (Advanced)","Electrostatics (Advanced)","Optics (Advanced)","Modern Physics"],"Chemistry":["Physical Chemistry (Advanced)","Organic Chemistry (Advanced)","Inorganic Chemistry (Advanced)"],"Mathematics":["Algebra (Advanced)","Calculus (Advanced)","Coordinate Geometry (Advanced)","Complex Numbers"]}, pattern:{duration:"6 hours (2 papers)",questions:"54 per paper",total:"360 marks",negative:"Yes (varies)"}, cutoff:[{year:2024,general:109,obc:98,sc:54,st:54},{year:2023,general:91,obc:82,sc:45,st:45}], books:["IIT JEE previous year papers","Irodov – Problems in Physics","Morrison Boyd – Organic Chemistry","Hall & Knight – Higher Algebra"], eligibility:"Top 2.5 lakh JEE Main qualifiers. Max 2 attempts.", tips:["Concept clarity over quantity","Practice IIT previous papers extensively","Time management is critical","Don't ignore any topic"] },
  { id:"neet-ug", name:"NEET UG", full:"National Eligibility cum Entrance Test UG", category:"Medical", color:"#10b981", icon:"🩺", difficulty:"Very High", diffScore:4, frequency:"Once a year", seats:"~1.08 lakh", salary:"₹6-20 LPA", duration:"5.5 years", syllabus:["Physics: Class 11 & 12 NCERT","Chemistry: Physical, Organic, Inorganic (NCERT)","Biology: Botany & Zoology (NCERT XI & XII)"], topics:{"Biology":["Cell Biology","Genetics","Ecology","Human Physiology","Plant Physiology","Reproduction","Evolution","Biotechnology"],"Chemistry":["Physical Chemistry","Organic Chemistry","Inorganic Chemistry","Biomolecules"],"Physics":["Mechanics","Thermodynamics","Optics","Modern Physics","Electrostatics"]}, pattern:{duration:"3 hours 20 min",questions:"200 (attempt 180)",total:"720 marks",negative:"Yes (-1)"}, cutoff:[{year:2024,general:720,obc:137,sc:107,st:107},{year:2023,general:720,obc:129,sc:100,st:100}], books:["NCERT Biology XI & XII","DC Pandey – Physics for NEET","OP Tandon – Physical Chemistry","MTG Objective NCERT at Your Fingertips"], eligibility:"Class 12 with PCB. Min age 17.", tips:["NCERT is the bible — every line matters","Biology carries 360/720 marks","Revise with spaced repetition","Attempt full mocks weekly"] },
  { id:"upsc-cse", name:"UPSC CSE", full:"Civil Services Examination", category:"UPSC", color:"#6366f1", icon:"🏛️", difficulty:"Extremely High", diffScore:5, frequency:"Once a year", seats:"~1,000", salary:"₹56,100+ (IAS)", duration:"1-2 years prep", syllabus:["Prelims: GS Paper I, CSAT Paper II","Mains: Essay, GS I-IV, Optional (2 papers)","Interview: Personality Test (275 marks)"], topics:{"History":["Ancient India","Medieval India","Modern India","World History","Art & Culture"],"Geography":["Physical Geography","Indian Geography","World Geography","Environment"],"Polity":["Constitution","Parliament","Judiciary","Federalism","Governance"],"Economy":["Indian Economy","Budget","Planning","Agriculture","Industry"],"Current Affairs":["National","International","Science & Tech","Environment"]}, pattern:{duration:"Prelims: 4hr | Mains: 9 papers",questions:"Prelims 200 MCQs | Mains descriptive",total:"2025 marks (Mains+Interview)",negative:"Prelims: -0.33"}, cutoff:[{year:2024,general:104,obc:98,sc:88,st:84},{year:2023,general:101,obc:95,sc:85,st:81}], books:["NCERT VI-XII Foundation","Laxmikanth – Indian Polity","Spectrum – Modern Indian History","Economic Survey + India Yearbook"], eligibility:"Graduate. Age: 21-32 (Gen).", tips:["Start with NCERTs before standard books","Make concise notes from Day 1","Read The Hindu daily","Choose optional wisely"] },
  { id:"ssc-cgl", name:"SSC CGL", full:"SSC Combined Graduate Level", category:"SSC", color:"#14b8a6", icon:"📋", difficulty:"Moderate", diffScore:2, frequency:"Once a year", seats:"~10,000+", salary:"₹25,000-₹1.5 LPA", duration:"6 months prep", syllabus:["General Intelligence & Reasoning","General Awareness","Quantitative Aptitude","English Comprehension"], topics:{"Reasoning":["Analogy","Series","Coding-Decoding","Puzzles","Blood Relations","Direction","Syllogism"],"Quantitative Aptitude":["Number System","Percentage","Profit & Loss","Ratio","Time & Work","Geometry","Trigonometry"],"General Awareness":["Current Affairs","History","Geography","Polity","Economy","Science"],"English":["Grammar","Vocabulary","Comprehension","Error Detection"]}, pattern:{duration:"Tier I: 60 min | Tier II: 2.5 hr",questions:"Tier I: 100 | Tier II: varies",total:"Tier I: 200 | Tier II: 800",negative:"Yes"}, cutoff:[{year:2024,general:145,obc:138,sc:128,st:120},{year:2023,general:142,obc:135,sc:125,st:117}], books:["Lucent GK","RS Aggarwal – Maths & Reasoning","SP Bakshi – English","Kiran SSC CGL Papers"], eligibility:"Graduate. Age: 18-32.", tips:["Current affairs from last 6 months","Speed & accuracy in Quant","English grammar rules are key","Daily 2 hours practice tests"] },
  { id:"cat", name:"CAT", full:"Common Admission Test", category:"Management", color:"#ec4899", icon:"📊", difficulty:"High", diffScore:3, frequency:"Once a year", seats:"~5,000 (IIMs)", salary:"₹15-50 LPA", duration:"2 years (MBA)", syllabus:["VARC: Reading Comprehension, Para Summary, Para Jumbles","DILR: Data Interpretation, Logical Reasoning","QA: Arithmetic, Algebra, Geometry, Number System"], topics:{"VARC":["Reading Comprehension","Para Summary","Para Jumbles","Odd Sentence Out","Critical Reasoning"],"DILR":["Data Interpretation","Logical Reasoning","Puzzles","Arrangements","Games & Tournaments"],"QA":["Arithmetic","Algebra","Geometry","Number System","Modern Maths"]}, pattern:{duration:"2 hours",questions:"66 questions",total:"198 marks",negative:"Yes (-1 per wrong MCQ)"}, cutoff:[{year:2024,general:99,obc:97,sc:90,st:85},{year:2023,general:99,obc:96,sc:88,st:83}], books:["Arun Sharma – QA & DI","Verbal Ability by Arun Sharma","TIME/CL study material","Previous year CAT papers"], eligibility:"Graduate with min 50% marks (45% SC/ST).", tips:["Accuracy > Speed in this exam","VARC: Read editorials daily","DILR: Practice set-based questions","Attempt 3-4 mocks per week from August"] },
  { id:"gate", name:"GATE", full:"Graduate Aptitude Test in Engineering", category:"Engineering", color:"#f59e0b", icon:"🔬", difficulty:"High", diffScore:3, frequency:"Once a year", seats:"Varies by PSU", salary:"₹6-12 LPA", duration:"2 years (M.Tech)", syllabus:["Core Engineering Subject (branch-specific)","Engineering Mathematics","General Aptitude (Verbal + Numerical)"], topics:{"Engineering Mathematics":["Linear Algebra","Calculus","Differential Equations","Probability","Numerical Methods"],"General Aptitude":["Verbal Ability","Numerical Ability","Reasoning"],"Core Subject":["Data Structures","Algorithms","Operating Systems","Computer Networks","Database"]}, pattern:{duration:"3 hours",questions:"65 questions",total:"100 marks",negative:"Yes (MCQs only)"}, cutoff:[{year:2024,general:31.7,obc:28.5,sc:21.1,st:21.1},{year:2023,general:30.0,obc:27.0,sc:20.0,st:20.0}], books:["Made Easy / ACE Academy notes","Standard textbooks by subject","Previous 15 years GATE papers"], eligibility:"B.E/B.Tech/B.Sc(Research) 3rd year or passed.", tips:["Analyze syllabus weightage first","Engineering Maths is high scoring","Practice numerical answer type questions","Solve subject-wise previous year questions"] },
  { id:"clat", name:"CLAT", full:"Common Law Admission Test", category:"Law", color:"#b45309", icon:"⚖️", difficulty:"High", diffScore:3, frequency:"Once a year", seats:"~2,500 (NLUs)", salary:"₹6-25 LPA", duration:"5 years (LLB)", syllabus:["English Language","Current Affairs & GK","Legal Reasoning","Logical Reasoning","Quantitative Techniques"], topics:{"English":["Reading Comprehension","Vocabulary","Grammar","Critical Reasoning"],"Legal Reasoning":["Legal Principles","Legal Maxims","Constitutional Law","Torts","Contracts"],"Current Affairs":["National","International","Legal Affairs","Important Judgements"],"Logical Reasoning":["Analogy","Syllogism","Assumptions","Conclusions"]}, pattern:{duration:"2 hours",questions:"120 MCQs",total:"120 marks",negative:"Yes (-0.25)"}, cutoff:[{year:2024,general:95,obc:82,sc:65,st:57},{year:2023,general:93,obc:80,sc:63,st:55}], books:["Arihant CLAT guide","AP Bhardwaj – Legal Aptitude","Previous year CLAT papers","The Hindu for Current Affairs"], eligibility:"Class 12 with min 45% marks (40% SC/ST).", tips:["Legal reasoning needs regular practice","Current affairs from last 12 months","Reading comprehension is key","No maths beyond Class 10 level"] },
  { id:"rbi-grade-b", name:"RBI Grade B", full:"Reserve Bank of India Grade B Officer", category:"Banking", color:"#7f1d1d", icon:"🏦", difficulty:"Very High", diffScore:4, frequency:"Once a year", seats:"~200+", salary:"₹55,000-₹1.5 LPA", duration:"8-10 months prep", syllabus:["Phase I: General Awareness, Reasoning, English, Quant","Phase II: Economic & Social Issues, English Writing, Finance & Management"], topics:{"Economics":["Macro Economics","Monetary Policy","Indian Economy","International Trade","RBI Functions"],"Finance":["Financial Markets","Banking Regulations","Financial Instruments","Capital Markets"],"Management":["Management Concepts","HR Management","Organizational Behavior","Ethics"],"General":["Current Affairs","Reasoning","English Writing Skills"]}, pattern:{duration:"Phase I: 3hr | Phase II: descriptive",questions:"Phase I: 200 MCQs | Phase II: written",total:"Phase I: 200 | Phase II: 300",negative:"Phase I: -0.25"}, cutoff:[{year:2024,general:155,obc:142,sc:125,st:118},{year:2023,general:150,obc:137,sc:120,st:113}], books:["Economic Survey India","RBI Annual Report","RBI Grade B previous papers","Ramesh Singh Indian Economy"], eligibility:"Graduate with 60% marks. Age: 21-30.", tips:["Economics and Finance are most important","Read RBI reports and circulars regularly","Phase II needs excellent writing skills","General awareness must be very strong"] },
  { id:"ibps-po", name:"IBPS PO", full:"IBPS Probationary Officer", category:"Banking", color:"#0891b2", icon:"💼", difficulty:"Moderate", diffScore:2, frequency:"Once a year", seats:"~4,000+", salary:"₹30,000-₹50,000", duration:"3-6 months prep", syllabus:["Reasoning Ability","Quantitative Aptitude","English Language","General Awareness","Computer Knowledge"], topics:{"Reasoning":["Puzzles","Seating Arrangement","Syllogism","Data Sufficiency","Coding-Decoding"],"Quant":["Simplification","Data Interpretation","Number Series","Approximation","Quadratic Equations"],"English":["Reading Comprehension","Error Spotting","Fill in the Blanks","Para Jumbles"],"GK":["Current Affairs","Banking Awareness","Static GK"]}, pattern:{duration:"Prelims: 1hr | Mains: 3hr",questions:"Prelims: 100 | Mains: 200+",total:"Prelims: 100 | Mains: 200",negative:"Yes"}, cutoff:[{year:2024,general:72,obc:68,sc:58,st:52},{year:2023,general:70,obc:65,sc:55,st:50}], books:["RS Aggarwal – Banking","Arun Sharma – Quant","SP Bakshi – English","Banking Chronicle"], eligibility:"Graduate. Age: 20-30.", tips:["Puzzles & seating are high weightage","Current affairs last 6 months mandatory","Speed matters in Prelims","Banking awareness from day 1"] },
  { id:"nda", name:"NDA", full:"National Defence Academy", category:"Defence", color:"#dc2626", icon:"🎖️", difficulty:"Moderate", diffScore:2, frequency:"Twice a year", seats:"~400", salary:"₹56,100 (Officer)", duration:"3 years (Academy)", syllabus:["Mathematics: 10+2 level","General Ability Test: English, GK, Physics, Chemistry, Biology, History, Geography"], topics:{"Mathematics":["Algebra","Matrices","Trigonometry","Calculus","Statistics","Geometry"],"GAT":["English","Physics","Chemistry","General Science","History","Geography","Current Events"]}, pattern:{duration:"Maths: 2.5hr | GAT: 2.5hr",questions:"Maths: 120 | GAT: 150",total:"900 marks",negative:"Yes"}, cutoff:[{year:2024,general:340,obc:320,sc:280,st:260},{year:2023,general:335,obc:315,sc:275,st:255}], books:["R.S. Aggarwal – Maths","Lucent's GK","Previous NDA papers","Pathfinder NDA/NA"], eligibility:"12th pass (unmarried male/female). Age: 16.5-19.5 years.", tips:["Physical fitness is crucial","Maths weightage is higher","Practice previous 10 years papers","SSB interview preparation is important"] },
  { id:"sbi-po", name:"SBI PO", full:"SBI Probationary Officer", category:"Banking", color:"#0f766e", icon:"🏛️", difficulty:"High", diffScore:3, frequency:"Once a year", seats:"~2,000", salary:"₹35,000-₹63,000", duration:"6 months prep", syllabus:["Prelims: Reasoning, Quant, English","Mains: Reasoning & Computer, DI & Analysis, General Awareness, English, Descriptive"], topics:{"Reasoning":["Puzzles","Seating Arrangement","Inequality","Blood Relations","Direction Sense"],"DI":["Tables","Graphs","Pie Charts","Case Studies"],"English":["RC","Error Detection","Para Jumbles","Sentence Correction"],"Descriptive":["Essay","Letter Writing"]}, pattern:{duration:"Prelims: 1hr | Mains: 3hr",questions:"Prelims: 100 | Mains: 155",total:"Prelims: 100 | Mains: 250",negative:"Yes"}, cutoff:[{year:2024,general:75,obc:70,sc:60,st:55},{year:2023,general:72,obc:68,sc:58,st:52}], books:["Adda247 Study Material","Oliveboard Mocks","Banking Chronicle","Descriptive English – Arihant"], eligibility:"Graduate with 60% marks. Age: 21-30.", tips:["SBI Mains is toughest among all bank exams","Descriptive section needs essay practice","DI takes most time — prioritize well","Prelims cutoff changes every year — aim high"] },

  // ──────────────────────────────────────────────────────
  // NEW EXAMS ADDED (113 MORE!) 🚀
  // ──────────────────────────────────────────────────────

  // === MORE ENGINEERING ENTRANCE ===
  { id:"bitsat", name:"BITSAT", full:"Birla Institute of Technology and Science Admission Test", category:"Engineering", color:"#fb923c", icon:"⚙️", difficulty:"High", diffScore:3, frequency:"Multiple times", seats:"~2,000", salary:"₹8-30 LPA", duration:"4 years", syllabus:["Physics, Chemistry, Maths/Biology","English Proficiency","Logical Reasoning"], topics:{}, pattern:{duration:"3 hours",questions:"150",total:"450 marks",negative:"Yes"}, cutoff:[], books:["NCERT 11th & 12th","Arihant BITSAT guide","Previous papers"], eligibility:"Class 12 with min 75% in PCM.", tips:["Speed is critical","Practice online test format","Logical reasoning practice"] },
  { id:"viteee", name:"VITEEE", full:"VIT Engineering Entrance Examination", category:"Engineering", color:"#f59e0b", icon:"⚙️", difficulty:"Moderate", diffScore:2, frequency:"Once a year", seats:"~10,000", salary:"₹6-20 LPA", duration:"4 years", syllabus:["Physics, Chemistry, Maths/Biology","English"], topics:{}, pattern:{duration:"2.5 hours",questions:"125",total:"125 marks",negative:"No"}, cutoff:[], books:["NCERT","VIT previous papers","Arihant"], eligibility:"Class 12 with 60% in PCM.", tips:["No negative marking advantage","English section is easy scoring","Online test practice"] },
  { id:"srmjeee", name:"SRMJEEE", full:"SRM Joint Engineering Entrance Examination", category:"Engineering", color:"#ea580c", icon:"⚙️", difficulty:"Moderate", diffScore:2, frequency:"Multiple slots", seats:"~7,000", salary:"₹5-18 LPA", duration:"4 years", syllabus:["Physics, Chemistry, Maths/Biology"], topics:{}, pattern:{duration:"2.5 hours",questions:"125",total:"125 marks",negative:"No"}, cutoff:[], books:["NCERT","SRM previous papers"], eligibility:"Class 12 with 50% in PCM.", tips:["Multiple attempts allowed","Choose slot wisely","Campus matters for placements"] },
  { id:"comedk", name:"COMEDK UGET", full:"Consortium of Medical, Engineering and Dental Colleges of Karnataka", category:"Engineering", color:"#f97316", icon:"⚙️", difficulty:"Moderate", diffScore:2, frequency:"Once a year", seats:"~5,000", salary:"₹6-22 LPA", duration:"4 years", syllabus:["Physics, Chemistry, Maths"], topics:{}, pattern:{duration:"3 hours",questions:"180",total:"180 marks",negative:"Yes"}, cutoff:[], books:["NCERT","COMEDK previous papers"], eligibility:"Class 12 with PCM.", tips:["Karnataka colleges only","Fast paced exam","Practice speed tests"] },
  { id:"mht-cet", name:"MHT CET", full:"Maharashtra Common Entrance Test", category:"Engineering", color:"#f59e0b", icon:"⚙️", difficulty:"Moderate", diffScore:2, frequency:"Once a year", seats:"~1.2 lakh", salary:"₹4-15 LPA", duration:"4 years", syllabus:["PCM - 11th & 12th Maharashtra board"], topics:{}, pattern:{duration:"Multiple papers",questions:"150 per paper",total:"200 marks",negative:"No"}, cutoff:[], books:["Target Publications","Previous MHT CET papers"], eligibility:"Class 12 from Maharashtra board preferred.", tips:["State syllabus focused","No negative marking","Multiple choice"] },
  { id:"wbjee", name:"WBJEE", full:"West Bengal Joint Entrance Examination", category:"Engineering", color:"#fb923c", icon:"⚙️", difficulty:"Moderate", diffScore:2, frequency:"Once a year", seats:"~50,000", salary:"₹4-12 LPA", duration:"4 years", syllabus:["Maths, Physics, Chemistry"], topics:{}, pattern:{duration:"2 hours per paper",questions:"Multiple choice",total:"200 marks",negative:"Yes"}, cutoff:[], books:["NCERT","WBJEE previous papers"], eligibility:"Class 12 with PCM.", tips:["West Bengal colleges","Maths has high weightage","State level exam"] },
  { id:"kcet", name:"KCET", full:"Karnataka Common Entrance Test", category:"Engineering", color:"#f59e0b", icon:"⚙️", difficulty:"Moderate", diffScore:2, frequency:"Once a year", seats:"~60,000", salary:"₹4-15 LPA", duration:"4 years", syllabus:["Physics, Chemistry, Maths, Biology"], topics:{}, pattern:{duration:"80 min per paper",questions:"60 per paper",total:"180 marks",negative:"No"}, cutoff:[], books:["Karnataka board books","KCET papers"], eligibility:"Class 12 from Karnataka.", tips:["State syllabus important","No negative marking","Good for Karnataka students"] },
  { id:"ts-eamcet", name:"TS EAMCET", full:"Telangana State Engineering, Agriculture & Medical Common Entrance Test", category:"Engineering", color:"#ea580c", icon:"⚙️", difficulty:"Moderate", diffScore:2, frequency:"Once a year", seats:"~1 lakh", salary:"₹4-12 LPA", duration:"4 years", syllabus:["PCM from Telangana syllabus"], topics:{}, pattern:{duration:"3 hours",questions:"160",total:"160 marks",negative:"No"}, cutoff:[], books:["Telangana board textbooks"], eligibility:"Class 12 from Telangana/AP.", tips:["Local preference","Board syllabus focus","Medium difficulty"] },
  { id:"ap-eamcet", name:"AP EAMCET", full:"Andhra Pradesh Engineering, Agriculture & Medical Common Entrance Test", category:"Engineering", color:"#f97316", icon:"⚙️", difficulty:"Moderate", diffScore:2, frequency:"Once a year", seats:"~80,000", salary:"₹4-12 LPA", duration:"4 years", syllabus:["PCM - AP board"], topics:{}, pattern:{duration:"3 hours",questions:"160",total:"160 marks",negative:"No"}, cutoff:[], books:["AP board textbooks","Eamcet papers"], eligibility:"Class 12 from AP/Telangana.", tips:["AP colleges priority","Board questions repeat","Moderate level"] },
  { id:"keam", name:"KEAM", full:"Kerala Engineering Architecture Medical", category:"Engineering", color:"#fb923c", icon:"⚙️", difficulty:"Moderate", diffScore:2, frequency:"Once a year", seats:"~30,000", salary:"₹4-10 LPA", duration:"4 years", syllabus:["PCM - Kerala syllabus"], topics:{}, pattern:{duration:"2.5 hours per paper",questions:"120 per paper",total:"480 marks",negative:"Yes"}, cutoff:[], books:["Kerala board textbooks"], eligibility:"Class 12 from Kerala board.", tips:["Kerala state exam","Board focus","Multiple papers"] },

  // === MORE MEDICAL ===
  { id:"neet-pg", name:"NEET PG", full:"NEET Postgraduate", category:"Medical", color:"#059669", icon:"🩺", difficulty:"Very High", diffScore:4, frequency:"Twice a year", seats:"~50,000", salary:"₹60,000-₹2L", duration:"3 years", syllabus:["All MBBS subjects at deeper level"], topics:{}, pattern:{duration:"3.5 hours",questions:"200",total:"800 marks",negative:"Yes"}, cutoff:[], books:["Marrow/PrepLadder videos","Previous NEET PG papers"], eligibility:"MBBS with internship completion.", tips:["Video lectures essential","Previous papers key","High competition"] },
  { id:"aiims", name:"AIIMS MBBS", full:"All India Institute of Medical Sciences", category:"Medical", color:"#10b981", icon:"🏥", difficulty:"Very High", diffScore:4, frequency:"Once a year", seats:"~1,207", salary:"₹10-30 LPA", duration:"5.5 years", syllabus:["PCB - NCERT + AIIMS level"], topics:{}, pattern:{duration:"3.5 hours",questions:"200",total:"200 marks",negative:"Yes"}, cutoff:[], books:["NCERT Biology","AIIMS previous 25 years","MTG Fingertips"], eligibility:"Class 12 with PCB.", tips:["Toughest medical exam","AIIMS Delhi most sought","Assert + reasoning questions"] },
  { id:"jipmer", name:"JIPMER MBBS", full:"Jawaharlal Institute of Postgraduate Medical Education and Research", category:"Medical", color:"#059669", icon:"🩺", difficulty:"High", diffScore:3, frequency:"Once a year", seats:"~200", salary:"₹8-25 LPA", duration:"5.5 years", syllabus:["PCB + English + Logical Reasoning"], topics:{}, pattern:{duration:"2.5 hours",questions:"200",total:"200 marks",negative:"Yes"}, cutoff:[], books:["NCERT Biology","JIPMER papers"], eligibility:"Class 12 with PCB.", tips:["Similar to NEET pattern","English + reasoning sections","Puducherry campus"] },
  { id:"fmge", name:"FMGE", full:"Foreign Medical Graduate Examination", category:"Medical", color:"#10b981", icon:"🌍", difficulty:"Very High", diffScore:4, frequency:"Twice a year", seats:"N/A", salary:"License exam", duration:"1 exam", syllabus:["All MBBS subjects"], topics:{}, pattern:{duration:"2.5 hours",questions:"300",total:"300 marks",negative:"No"}, cutoff:[], books:["MCI screening exam books","Marrow videos"], eligibility:"MBBS from foreign university.", tips:["Must pass to practice in India","Screening exam","Low pass percentage"] },
  { id:"neet-ss", name:"NEET SS", full:"NEET Super Specialty", category:"Medical", color:"#059669", icon:"🩺", difficulty:"Extremely High", diffScore:5, frequency:"Once a year", seats:"~3,000", salary:"₹1-5 LPA", duration:"3 years DM/MCh", syllabus:["MD/MS level subjects"], topics:{}, pattern:{duration:"3 hours",questions:"150",total:"600 marks",negative:"Yes"}, cutoff:[], books:["Specialty specific books"], eligibility:"MD/MS completed.", tips:["Highest medical qualification","Branch specific","Limited seats"] },
  { id:"ini-cet", name:"INI CET", full:"Institute of National Importance Combined Entrance Test", category:"Medical", color:"#10b981", icon:"🏥", difficulty:"Very High", diffScore:4, frequency:"Twice a year", seats:"~1,000", salary:"₹60,000-₹2L", duration:"3 years", syllabus:["All MBBS subjects"], topics:{}, pattern:{duration:"3 hours",questions:"200",total:"800 marks",negative:"Yes"}, cutoff:[], books:["AIIMS/PGI specific books","Marrow/PrepLadder"], eligibility:"MBBS with internship.", tips:["For AIIMS/PGI/JIPMER PG","Tough competition","Similar to NEET PG"] },

  // === SSC EXAMS ===
  { id:"ssc-chsl", name:"SSC CHSL", full:"SSC Combined Higher Secondary Level", category:"SSC", color:"#0d9488", icon:"📝", difficulty:"Moderate", diffScore:2, frequency:"Once a year", seats:"~5,000", salary:"₹19,900-₹63,200", duration:"6 months", syllabus:["English, GK, Quant, Reasoning"], topics:{}, pattern:{duration:"60 min",questions:"100",total:"200 marks",negative:"Yes"}, cutoff:[], books:["Kiran SSC books","RS Aggarwal"], eligibility:"12th pass. Age: 18-27.", tips:["Easier than CGL","Focus on accuracy","Typing test in final round"] },
  { id:"ssc-mts", name:"SSC MTS", full:"SSC Multi-Tasking Staff", category:"SSC", color:"#14b8a6", icon:"📋", difficulty:"Easy", diffScore:1, frequency:"Once a year", seats:"~10,000", salary:"₹18,000-₹56,900", duration:"3 months", syllabus:["Reasoning, Numerical, English, GK"], topics:{}, pattern:{duration:"90 min",questions:"100",total:"100 marks",negative:"Yes"}, cutoff:[], books:["Kiran MTS","SSC MTS papers"], eligibility:"10th pass. Age: 18-25.", tips:["Easiest SSC exam","Good for 10th pass","Group C posts"] },
  { id:"ssc-je", name:"SSC JE", full:"SSC Junior Engineer", category:"SSC", color:"#0d9488", icon:"🔧", difficulty:"Moderate", diffScore:2, frequency:"Once a year", seats:"~1,000", salary:"₹35,400-₹1.12 LPA", duration:"6-8 months", syllabus:["Technical: Civil/Electrical/Mechanical","GK & Reasoning"], topics:{}, pattern:{duration:"Paper I: 2hr | Paper II: 2hr",questions:"200",total:"300 marks",negative:"Yes"}, cutoff:[], books:["Made Easy SSC JE","R.S. Khurmi"], eligibility:"Diploma/B.Tech in Civil/Electrical/Mechanical.", tips:["Technical knowledge is key","Previous papers important","Good salary for diploma holders"] },
  { id:"ssc-gd", name:"SSC GD Constable", full:"SSC General Duty Constable", category:"SSC", color:"#14b8a6", icon:"👮", difficulty:"Easy", diffScore:1, frequency:"Once a year", seats:"~25,000", salary:"₹21,700-₹69,100", duration:"3 months", syllabus:["Reasoning, GK, Maths, English"], topics:{}, pattern:{duration:"90 min",questions:"100",total:"100 marks",negative:"Yes"}, cutoff:[], books:["Arihant SSC GD","Kiran SSC"], eligibility:"10th pass. Height & physical requirements.", tips:["Physical fitness test","Medical test","Easy written exam"] },
  { id:"ssc-cpo", name:"SSC CPO", full:"SSC Central Police Organization", category:"SSC", color:"#0d9488", icon:"🚔", difficulty:"Moderate", diffScore:2, frequency:"Once a year", seats:"~1,000", salary:"₹35,400-₹1.12 LPA", duration:"6 months", syllabus:["GK, Reasoning, Quant, English","Physical Test"], topics:{}, pattern:{duration:"Paper I: 2hr | Paper II: 2hr",questions:"200",total:"400 marks",negative:"Yes"}, cutoff:[], books:["Arihant CPO","Previous papers"], eligibility:"Graduate. Age: 20-25. Physical standards.", tips:["Physical test is qualifying","Written exam similar to CGL","Good career in paramilitary"] },
  { id:"ssc-stenographer", name:"SSC Stenographer", full:"SSC Stenographer Grade C & D", category:"SSC", color:"#14b8a6", icon:"⌨️", difficulty:"Moderate", diffScore:2, frequency:"Once a year", seats:"~1,500", salary:"₹25,500-₹81,100", duration:"4-6 months", syllabus:["GK, English, Reasoning","Stenography Test"], topics:{}, pattern:{duration:"2 hours",questions:"200",total:"200 marks",negative:"Yes"}, cutoff:[], books:["Arihant Stenographer","Shorthand practice books"], eligibility:"12th pass with shorthand knowledge.", tips:["Shorthand speed crucial (80 wpm English)","Practice dictation daily","Less competition than other SSC exams"] },

  // === RAILWAYS ===
  { id:"rrb-ntpc", name:"RRB NTPC", full:"Railway Non-Technical Popular Categories", category:"Railways", color:"#dc2626", icon:"🚂", difficulty:"Moderate", diffScore:2, frequency:"Once a year", seats:"~35,000", salary:"₹21,700-₹69,100", duration:"6 months", syllabus:["Maths, GK, Reasoning"], topics:{}, pattern:{duration:"90 min",questions:"100",total:"100 marks",negative:"Yes"}, cutoff:[], books:["Arihant RRB NTPC","Railway exam books"], eligibility:"12th or Graduate depending on post.", tips:["Current affairs important","Negative marking strict","Computer based test"] },
  { id:"rrb-je", name:"RRB JE", full:"Railway Junior Engineer", category:"Railways", color:"#b91c1c", icon:"⚙️", difficulty:"Moderate", diffScore:2, frequency:"Once a year", seats:"~14,000", salary:"₹35,400-₹1.12 LPA", duration:"6-8 months", syllabus:["Technical: Branch specific","GK, Reasoning, Maths"], topics:{}, pattern:{duration:"90 min per stage",questions:"100",total:"100 marks",negative:"Yes"}, cutoff:[], books:["Made Easy RRB JE","R.K. Kanodia"], eligibility:"Diploma/B.Tech in relevant branch.", tips:["Technical paper is tough","Practice numerical problems","Good job security"] },
  { id:"rrb-alp", name:"RRB ALP", full:"Railway Assistant Loco Pilot", category:"Railways", color:"#dc2626", icon:"🚊", difficulty:"Moderate", diffScore:2, frequency:"Once a year", seats:"~20,000", salary:"₹21,700-₹69,100", duration:"6 months", syllabus:["Maths, GK, Reasoning","Technical Ability"], topics:{}, pattern:{duration:"60-90 min",questions:"75",total:"75 marks",negative:"Yes"}, cutoff:[], books:["Arihant ALP","Previous papers"], eligibility:"ITI or 10th with NCTVT.", tips:["Technical questions from ITI syllabus","Psycho test important","Driver license helpful"] },
  { id:"rrb-group-d", name:"RRB Group D", full:"Railway Group D", category:"Railways", color:"#b91c1c", icon:"🔧", difficulty:"Easy", diffScore:1, frequency:"Once a year", seats:"~1 lakh", salary:"₹18,000-₹56,900", duration:"3-4 months", syllabus:["Maths, GK, Reasoning, Science"], topics:{}, pattern:{duration:"90 min",questions:"100",total:"100 marks",negative:"Yes"}, cutoff:[], books:["Arihant Group D","Kiran Railway"], eligibility:"10th pass.", tips:["Easiest railway exam","Physical efficiency test","Large number of vacancies"] },

  // === BANKING (MORE) ===
  { id:"ibps-clerk", name:"IBPS Clerk", full:"IBPS Clerical Cadre", category:"Banking", color:"#0284c7", icon:"💼", difficulty:"Moderate", diffScore:2, frequency:"Once a year", seats:"~8,000", salary:"₹19,900-₹63,200", duration:"3-6 months", syllabus:["Reasoning, Quant, English, Computer, GK"], topics:{}, pattern:{duration:"Prelims: 1hr | Mains: 2hr 40min",questions:"Prelims: 100 | Mains: 190",total:"Prelims: 100 | Mains: 200",negative:"Yes"}, cutoff:[], books:["Adda247","Oliveboard mocks"], eligibility:"Graduate. Age: 20-28.", tips:["Speed is everything in Prelims","Computer knowledge mandatory","Clerk to PO promotion possible"] },
  { id:"ibps-so", name:"IBPS SO", full:"IBPS Specialist Officer", category:"Banking", color:"#0891b2", icon:"💻", difficulty:"High", diffScore:3, frequency:"Once a year", seats:"~1,000", salary:"₹32,000-₹70,000", duration:"6-8 months", syllabus:["Reasoning, English, Quant, GK","Professional Knowledge (IT/Agriculture/Law/etc)"], topics:{}, pattern:{duration:"Prelims: 2hr | Mains: 2hr 40min",questions:"150 + Professional",total:"250 marks",negative:"Yes"}, cutoff:[], books:["Specialist subject books","Banking awareness"], eligibility:"Degree in relevant specialization.", tips:["Professional knowledge is 60% weightage","IT Officer most popular","Direct officer level post"] },
  { id:"sbi-clerk", name:"SBI Clerk", full:"SBI Junior Associate", category:"Banking", color:"#0369a1", icon:"🏦", difficulty:"Moderate", diffScore:2, frequency:"Once a year", seats:"~8,000", salary:"₹17,900-₹63,200", duration:"4-6 months", syllabus:["Reasoning, Quant, English, GK, Computer"], topics:{}, pattern:{duration:"Prelims: 1hr | Mains: 2hr 40min",questions:"Prelims: 100 | Mains: 190",total:"Prelims: 100 | Mains: 200",negative:"Yes"}, cutoff:[], books:["Adda247","SBI Clerk papers"], eligibility:"Graduate. Age: 20-28.", tips:["SBI exam slightly tough than IBPS","Prelims cutoff varies by state","Good work-life balance"] },
  { id:"rbi-assistant", name:"RBI Assistant", full:"Reserve Bank of India Assistant", category:"Banking", color:"#7c2d12", icon:"🏛️", difficulty:"High", diffScore:3, frequency:"Once a year", seats:"~900", salary:"₹26,000-₹84,000", duration:"6 months", syllabus:["Reasoning, Quant, English, GK, Computer"], topics:{}, pattern:{duration:"Prelims: 1hr | Mains: 2hr 15min",questions:"Prelims: 100 | Mains: 200",total:"Prelims: 100 | Mains: 200",negative:"Yes"}, cutoff:[], books:["Adda247 RBI material","Previous papers"], eligibility:"Graduate with 50% marks. Age: 20-28.", tips:["Toughest clerical exam","Excellent salary & perks","Limited vacancies - high competition"] },
  { id:"nabard-grade-a", name:"NABARD Grade A", full:"NABARD Assistant Manager", category:"Banking", color:"#15803d", icon:"🌾", difficulty:"Very High", diffScore:4, frequency:"Once a year", seats:"~150", salary:"₹35,000-₹1.2 LPA", duration:"8-10 months", syllabus:["Phase I: Reasoning, English, Computer, Quant, GK","Phase II: Agriculture/Rural Development + Descriptive"], topics:{}, pattern:{duration:"Phase I: 2hr | Phase II: 3hr",questions:"200 + Descriptive",total:"300 marks",negative:"Yes"}, cutoff:[], books:["NABARD Grade A books","Agriculture & Rural Dev books"], eligibility:"Graduate (Agriculture for some posts). Age: 21-30.", tips:["Agriculture knowledge crucial","Rural development focus","Descriptive English very important","Interview has high weightage"] },
  { id:"lic-aao", name:"LIC AAO", full:"Life Insurance Corporation Assistant Administrative Officer", category:"Insurance", color:"#b91c1c", icon:"🛡️", difficulty:"High", diffScore:3, frequency:"Once a year", seats:"~8,000", salary:"₹32,000-₹90,000", duration:"6 months", syllabus:["Reasoning, Quant, English, GK, Insurance awareness"], topics:{}, pattern:{duration:"Prelims: 1hr | Mains: 2hr",questions:"Prelims: 100 | Mains: 300",total:"Prelims: 100 | Mains: 300",negative:"Yes"}, cutoff:[], books:["Adda247 LIC AAO","Insurance awareness"], eligibility:"Graduate. Age: 21-30.", tips:["Insurance awareness important","Good salary package","Officer level direct entry"] },
  { id:"lic-ado", name:"LIC ADO", full:"LIC Apprentice Development Officer", category:"Insurance", color:"#dc2626", icon:"📋", difficulty:"Moderate", diffScore:2, frequency:"Once a year", seats:"~8,000", salary:"₹21,000-₹70,000", duration:"4-6 months", syllabus:["Reasoning, Quant, English, GK"], topics:{}, pattern:{duration:"Prelims: 1hr | Mains: 2hr",questions:"Prelims: 100 | Mains: 200",total:"Prelims: 100 | Mains: 200",negative:"Yes"}, cutoff:[], books:["LIC ADO books","Practice papers"], eligibility:"Graduate. Age: 21-30.", tips:["Entry level officer post","Similar pattern to banking exams","Sales targets involved"] },

  // === DEFENSE & POLICE ===
  { id:"cds", name:"CDS", full:"Combined Defence Services", category:"Defence", color:"#b91c1c", icon:"⚔️", difficulty:"High", diffScore:3, frequency:"Twice a year", seats:"~500", salary:"₹56,100+ (Officer)", duration:"1-3 years training", syllabus:["English, GK, Elementary Mathematics"], topics:{}, pattern:{duration:"2 hours each paper",questions:"120 each",total:"300 marks",negative:"Yes"}, cutoff:[], books:["Pathfinder CDS","Arihant CDS","Previous papers"], eligibility:"Graduate (IMA/INA/AFA). Age: 19-24.", tips:["Written + SSB interview","English is easiest section","Maths requires 10+2 level","SSB is more important than written"] },
  { id:"afcat", name:"AFCAT", full:"Air Force Common Admission Test", category:"Defence", color:"#1e40af", icon:"✈️", difficulty:"Moderate", diffScore:2, frequency:"Twice a year", seats:"~300", salary:"₹56,100+ (Flying Officer)", duration:"1 year training", syllabus:["GK, Verbal Ability, Numerical Ability, Reasoning, Military Aptitude"], topics:{}, pattern:{duration:"2 hours",questions:"100",total:"300 marks",negative:"Yes"}, cutoff:[], books:["Arihant AFCAT","Pathfinder AFCAT"], eligibility:"Graduate. Age: 20-24 (varies by branch).", tips:["Air Force specific GK important","Flying branch highly competitive","Engineering degree preferred for technical","Physical fitness standards"] },
  { id:"navy-ssr", name:"Indian Navy SSR", full:"Senior Secondary Recruit", category:"Defence", color:"#0369a1", icon:"⚓", difficulty:"Easy", diffScore:1, frequency:"Twice a year", seats:"~2,500", salary:"₹21,700-₹69,100", duration:"6 months training", syllabus:["Science, Maths, English"], topics:{}, pattern:{duration:"1 hour",questions:"100",total:"100 marks",negative:"Yes"}, cutoff:[], books:["Arihant Navy books","Previous papers"], eligibility:"12th PCM with 60%. Age: 17-20.", tips:["12th level science & maths","Physical + medical standards","Good career progression in Navy"] },
  { id:"navy-aa", name:"Indian Navy AA", full:"Artificer Apprentice", category:"Defence", color:"#0284c7", icon:"⚓", difficulty:"Moderate", diffScore:2, frequency:"Twice a year", seats:"~600", salary:"₹21,700-₹69,100", duration:"1 year training", syllabus:["Science, Maths, English"], topics:{}, pattern:{duration:"1 hour",questions:"100",total:"100 marks",negative:"Yes"}, cutoff:[], books:["Navy AA books","PCM practice"], eligibility:"12th PCM with 60%. Age: 17-20.", tips:["Technical branch in Navy","Engineering focus after selection","Higher technical trade"] },
  { id:"capf", name:"CAPF AC", full:"Central Armed Police Forces Assistant Commandant", category:"Police", color:"#7c2d12", icon:"🚨", difficulty:"High", diffScore:3, frequency:"Once a year", seats:"~300", salary:"₹56,100+", duration:"1 year training", syllabus:["GK, Intelligence, Quant, English","Physical + Medical + Interview"], topics:{}, pattern:{duration:"Paper I: 2hr | Paper II: 2hr",questions:"125 + Descriptive",total:"250 + 200",negative:"Yes"}, cutoff:[], books:["Arihant CAPF","Previous CAPF papers"], eligibility:"Graduate. Age: 20-25. Height/Physical standards.", tips:["Physical test is tough","Written + Interview","Officer rank in paramilitary","Good salary & perks"] },

  // === LAW ===
  { id:"ailet", name:"AILET", full:"All India Law Entrance Test", category:"Law", color:"#92400e", icon:"⚖️", difficulty:"High", diffScore:3, frequency:"Once a year", seats:"~100", salary:"₹8-30 LPA", duration:"5 years", syllabus:["English, GK, Reasoning, Legal Aptitude, Maths"], topics:{}, pattern:{duration:"90 min",questions:"150",total:"150 marks",negative:"Yes"}, cutoff:[], books:["Universal AILET guide","Legal Aptitude books"], eligibility:"12th pass with 50% (45% SC/ST).", tips:["Only for NLU Delhi","Similar to CLAT but tougher","Less seats - high competition"] },
  { id:"lsat-india", name:"LSAT India", full:"Law School Admission Test India", category:"Law", color:"#78350f", icon:"⚖️", difficulty:"Moderate", diffScore:2, frequency:"Multiple times", seats:"Varies by college", salary:"₹6-20 LPA", duration:"5 years", syllabus:["Analytical Reasoning, Logical Reasoning, Reading Comprehension"], topics:{}, pattern:{duration:"2.25 hours",questions:"92",total:"N/A",negative:"No"}, cutoff:[], books:["LSAT India official guide","Reasoning books"], eligibility:"12th pass.", tips:["Accepted by many private law schools","No negative marking","Score valid for admission cycles"] },
  { id:"du-llb", name:"DU LLB", full:"Delhi University LLB", category:"Law", color:"#b45309", icon:"⚖️", difficulty:"High", diffScore:3, frequency:"Once a year", seats:"~500", salary:"₹6-25 LPA", duration:"3 years", syllabus:["English, GK, Legal Aptitude, Reasoning, Maths"], topics:{}, pattern:{duration:"2 hours",questions:"100",total:"400 marks",negative:"Yes"}, cutoff:[], books:["DU LLB previous papers","Legal reasoning books"], eligibility:"Graduate for 3-year LLB.", tips:["DU law faculty is prestigious","High cutoffs","Delhi HC proximity advantage"] },

  // === MANAGEMENT ===
  { id:"xat", name:"XAT", full:"Xavier Aptitude Test", category:"Management", color:"#be185d", icon:"📊", difficulty:"High", diffScore:3, frequency:"Once a year", seats:"~1,000 (XLRI)", salary:"₹20-35 LPA", duration:"2 years", syllabus:["Verbal, DI & LR, Quant, GK, Essay"], topics:{}, pattern:{duration:"3.5 hours",questions:"100 + Essay",total:"100 + 25",negative:"Yes"}, cutoff:[], books:["Arun Sharma XAT","Previous XAT papers"], eligibility:"Graduate with 50%.", tips:["GK section unique to XAT","Essay writing crucial","XLRI Jamshedpur top college","Decision making section tricky"] },
  { id:"snap", name:"SNAP", full:"Symbiosis National Aptitude Test", category:"Management", color:"#db2777", icon:"📊", difficulty:"Moderate", diffScore:2, frequency:"Multiple slots", seats:"~1,500", salary:"₹15-28 LPA", duration:"2 years", syllabus:["GK, QA, Analytical & Logical Reasoning, English"], topics:{}, pattern:{duration:"60 min",questions:"60",total:"60 marks",negative:"Yes"}, cutoff:[], books:["SNAP official mocks","Arun Sharma"], eligibility:"Graduate with 50%.", tips:["Multiple attempts - best score counts","60 min only - speed critical","Symbiosis Pune main campus","Sectional cutoffs matter"] },
  { id:"nmat", name:"NMAT", full:"NMIMS Management Aptitude Test", category:"Management", color:"#ec4899", icon:"📊", difficulty:"Moderate", diffScore:2, frequency:"Oct-Dec window", seats:"~500 (NMIMS Mumbai)", salary:"₹18-32 LPA", duration:"2 years", syllabus:["Language Skills, QA, Logical Reasoning"], topics:{}, pattern:{duration:"2 hours",questions:"108",total:"108 marks",negative:"No"}, cutoff:[], books:["NMAT official guide","Arun Sharma"], eligibility:"Graduate with 50%.", tips:["No negative marking","Multiple attempts allowed","Computer adaptive","NMIMS Mumbai cutoff very high"] },
  { id:"cmat", name:"CMAT", full:"Common Management Admission Test", category:"Management", color:"#be185d", icon:"📊", difficulty:"Moderate", diffScore:2, frequency:"Once a year", seats:"Varies", salary:"₹6-18 LPA", duration:"2 years", syllabus:["QA, Logical Reasoning, Language, GK"], topics:{}, pattern:{duration:"3 hours",questions:"100",total:"400 marks",negative:"Yes"}, cutoff:[], books:["Arihant CMAT","Previous papers"], eligibility:"Graduate with 50%.", tips:["Easiest MBA entrance","Accepted by AICTE colleges","Good backup option","Lower cutoffs"] },
  { id:"mat", name:"MAT", full:"Management Aptitude Test", category:"Management", color:"#db2777", icon:"📊", difficulty:"Moderate", diffScore:2, frequency:"4 times a year", seats:"Varies", salary:"₹5-15 LPA", duration:"2 years", syllabus:["Language, DI, Quant, Intelligence, GK"], topics:{}, pattern:{duration:"2.5 hours",questions:"150",total:"150 marks",negative:"Yes"}, cutoff:[], books:["MAT previous papers","Arun Sharma"], eligibility:"Graduate.", tips:["Multiple attempts yearly","Tier 2/3 B-schools accept","Paper + Computer based options","Moderate difficulty"] },
  { id:"atma", name:"ATMA", full:"AIMS Test for Management Admissions", category:"Management", color:"#ec4899", icon:"📊", difficulty:"Moderate", diffScore:2, frequency:"3-4 times yearly", seats:"Varies", salary:"₹6-14 LPA", duration:"2 years", syllabus:["Analytical Reasoning, Verbal, Quant"], topics:{}, pattern:{duration:"3 hours",questions:"180",total:"180 marks",negative:"Yes"}, cutoff:[], books:["ATMA previous papers"], eligibility:"Graduate.", tips:["Easier than CAT/XAT","Tier 2 colleges","Good for backup"] },
  { id:"iift", name:"IIFT", full:"Indian Institute of Foreign Trade", category:"Management", color:"#be185d", icon:"🌍", difficulty:"High", diffScore:3, frequency:"Once a year", seats:"~400", salary:"₹25-40 LPA", duration:"2 years", syllabus:["QA, Verbal, DI & LR, GK"], topics:{}, pattern:{duration:"2 hours",questions:"114",total:"300 marks",negative:"Yes"}, cutoff:[], books:["IIFT previous papers","Arun Sharma"], eligibility:"Graduate with 50%.", tips:["Specialization in International Trade","Delhi & Kolkata campuses","High GK weightage","Excellent placements"] },

  // === ARCHITECTURE & DESIGN ===
  { id:"nata", name:"NATA", full:"National Aptitude Test in Architecture", category:"Architecture", color:"#7c3aed", icon:"🏗️", difficulty:"Moderate", diffScore:2, frequency:"Twice a year", seats:"Varies", salary:"₹4-15 LPA", duration:"5 years B.Arch", syllabus:["Drawing, Mathematics, Aptitude"], topics:{}, pattern:{duration:"3 hours",questions:"Drawing + MCQs",total:"200 marks",negative:"No"}, cutoff:[], books:["Arihant NATA","Drawing practice books"], eligibility:"12th with Maths + 50%. Drawing aptitude.", tips:["Drawing test is 50%","Practice sketching daily","Perspective & scale important"] },
  { id:"uceed", name:"UCEED", full:"Undergraduate Common Entrance Exam for Design", category:"Design", color:"#a855f7", icon:"🎨", difficulty:"High", diffScore:3, frequency:"Once a year", seats:"~200 (IIT B.Des)", salary:"₹6-20 LPA", duration:"4 years", syllabus:["Visualization, Observation, Drawing, Design Thinking"], topics:{}, pattern:{duration:"3 hours",questions:"Multiple parts",total:"300 marks",negative:"Yes"}, cutoff:[], books:["UCEED official material","Drawing practice"], eligibility:"12th pass. Drawing skills essential.", tips:["IIT Bombay B.Des main exam","Creative + analytical thinking","Portfolio important","Extremely competitive"] },
  { id:"ceed", name:"CEED", full:"Common Entrance Exam for Design", category:"Design", color:"#9333ea", icon:"🎨", difficulty:"High", diffScore:3, frequency:"Once a year", seats:"~300 (IIT M.Des)", salary:"₹8-25 LPA", duration:"2 years", syllabus:["Visualization, Observation, Design Aptitude, Communication"], topics:{}, pattern:{duration:"Part A: 3hr | Part B: 2hr",questions:"Multiple formats",total:"100 marks",negative:"No Part B"}, cutoff:[], books:["CEED previous papers","Design thinking books"], eligibility:"Graduate in any field.", tips:["For M.Des in IITs","Portfolio based Part B","Creative problem solving","Interview round crucial"] },
  { id:"nid-dat", name:"NID DAT", full:"National Institute of Design - Design Aptitude Test", category:"Design", color:"#7c3aed", icon:"🎨", difficulty:"Very High", diffScore:4, frequency:"Once a year", seats:"~300", salary:"₹8-30 LPA", duration:"4 years", syllabus:["Drawing, Design Thinking, GAT, Creativity"], topics:{}, pattern:{duration:"Prelims + Mains + Studio",questions:"Multiple rounds",total:"N/A",negative:"No"}, cutoff:[], books:["NID preparation books","Portfolio creation"], eligibility:"12th pass for B.Des.", tips:["Most prestigious design college","Portfolio + interview critical","Studio test unique","Creativity over technical skill"] },

  // === PHARMACY & ALLIED ===
  { id:"gpat", name:"GPAT", full:"Graduate Pharmacy Aptitude Test", category:"Pharmacy", color:"#16a34a", icon:"💊", difficulty:"High", diffScore:3, frequency:"Once a year", seats:"~10,000", salary:"₹3-10 LPA", duration:"2 years M.Pharm", syllabus:["Pharmaceutics, Pharmaceutical Chemistry, Pharmacology, Pharmacognosy"], topics:{}, pattern:{duration:"3 hours",questions:"125",total:"500 marks",negative:"Yes"}, cutoff:[], books:["GPAT question bank","Pharmacy textbooks"], eligibility:"B.Pharm with 60% (55% SC/ST).", tips:["For M.Pharm admission","NIPER JEE separate exam","Previous papers crucial"] },
  { id:"niper-jee", name:"NIPER JEE", full:"National Institute of Pharmaceutical Education and Research Joint Entrance", category:"Pharmacy", color:"#15803d", icon:"💊", difficulty:"Very High", diffScore:4, frequency:"Once a year", seats:"~500", salary:"₹5-15 LPA", duration:"2 years", syllabus:["Pharmacy subjects at depth"], topics:{}, pattern:{duration:"3 hours",questions:"150",total:"150 marks",negative:"Yes"}, cutoff:[], books:["NIPER specific books"], eligibility:"B.Pharm with 60%.", tips:["Toughest pharmacy exam","Top NIPER institutes","Research oriented"] },

  // === HOTEL MANAGEMENT ===
  { id:"nchmct-jee", name:"NCHMCT JEE", full:"National Council for Hotel Management Joint Entrance Exam", category:"Hotel Management", color:"#c2410c", icon:"🏨", difficulty:"Moderate", diffScore:2, frequency:"Once a year", seats:"~7,000", salary:"₹3-12 LPA", duration:"3 years", syllabus:["English, Numerical, Reasoning, GK, Aptitude"], topics:{}, pattern:{duration:"3 hours",questions:"200",total:"200 marks",negative:"Yes"}, cutoff:[], books:["NCHMCT previous papers","Arihant Hotel Mgmt"], eligibility:"12th pass with English.", tips:["For Hotel Management degree","IHMs across India","Good hospitality career"] },

  // === AGRICULTURE ===
  { id:"icar-ug", name:"ICAR AIEEA UG", full:"ICAR All India Entrance Exam for Admission UG", category:"Agriculture", color:"#65a30d", icon:"🌾", difficulty:"Moderate", diffScore:2, frequency:"Once a year", seats:"~15,000", salary:"₹3-8 LPA", duration:"4 years", syllabus:["Physics, Chemistry, Biology/Maths/Agriculture"], topics:{}, pattern:{duration:"2.5 hours",questions:"150",total:"600 marks",negative:"Yes"}, cutoff:[], books:["ICAR previous papers","NCERT PCB"], eligibility:"12th with PCB/PCM/Agriculture.", tips:["Agriculture universities nationwide","Scholarships available","Lower competition than engineering"] },
  { id:"icar-pg", name:"ICAR AIEEA PG", full:"ICAR AIEEA Postgraduate", category:"Agriculture", color:"#4d7c0f", icon:"🌾", difficulty:"High", diffScore:3, frequency:"Once a year", seats:"~5,000", salary:"₹4-12 LPA", duration:"2 years", syllabus:["Agriculture subjects at graduate level"], topics:{}, pattern:{duration:"2.5 hours",questions:"150",total:"600 marks",negative:"Yes"}, cutoff:[], books:["Agriculture PG books"], eligibility:"B.Sc Agriculture with 60%.", tips:["For M.Sc Agriculture","Research opportunities","ICAR institutes"] },

  // === TEACHING & RESEARCH ===
  { id:"ctet", name:"CTET", full:"Central Teacher Eligibility Test", category:"Teaching", color:"#0369a1", icon:"👨‍🏫", difficulty:"Moderate", diffScore:2, frequency:"Twice a year", seats:"N/A (Eligibility)", salary:"₹35,000-₹1.12 LPA", duration:"Lifetime validity", syllabus:["Child Development, Language I & II, Mathematics/Science, Social Studies"], topics:{}, pattern:{duration:"Paper I: 2.5hr | Paper II: 2.5hr",questions:"150 each",total:"150 marks each",negative:"No"}, cutoff:[], books:["Arihant CTET","Himanshi Singh CTET"], eligibility:"12th (Primary) / Graduate (Upper Primary).", tips:["Mandatory for Central schools","60% passing marks","No interview - only written","Valid for lifetime"] },
  { id:"ugc-net", name:"UGC NET", full:"National Eligibility Test", category:"Teaching", color:"#0284c7", icon:"📚", difficulty:"High", diffScore:3, frequency:"Twice a year", seats:"N/A", salary:"₹57,700+ (Asst Prof)", duration:"Eligibility test", syllabus:["Paper I: Teaching Aptitude, Research, Reasoning","Paper II: Subject specific"], topics:{}, pattern:{duration:"3 hours",questions:"150 (Paper I+II)",total:"300 marks",negative:"No"}, cutoff:[], books:["Trueman's UGC NET","Subject books"], eligibility:"PG with 55% (50% SC/ST). Final year can apply.", tips:["For Asst Professor + JRF","Paper I common for all","Choose subject wisely","JRF cutoff very high"] },
  { id:"csir-net", name:"CSIR NET", full:"Council of Scientific & Industrial Research NET", category:"Research", color:"#0369a1", icon:"🔬", difficulty:"Very High", diffScore:4, frequency:"Twice a year", seats:"~1,000 JRF", salary:"₹31,000 + HRA (JRF)", duration:"Research fellowship", syllabus:["General Aptitude","Subject specific (Science streams)"], topics:{}, pattern:{duration:"3 hours",questions:"120",total:"200 marks",negative:"Yes"}, cutoff:[], books:["CSIR NET subject books","Previous papers"], eligibility:"M.Sc with 55%. Subjects: Physics/Chemistry/Maths/Life Sciences/Earth Sciences.", tips:["Toughest NET exam","For Science research fellowship","JRF cutoff extremely high","Lectureship easier to qualify"] },

  // === STATE PSC ===
  { id:"tnpsc-group1", name:"TNPSC Group 1", full:"Tamil Nadu Public Service Commission Group 1", category:"State PSC", color:"#7c2d12", icon:"🏛️", difficulty:"Very High", diffScore:4, frequency:"Once in 2-3 years", seats:"~50", salary:"₹56,100+", duration:"1-2 years prep", syllabus:["Prelims: GS","Mains: GS I-IV + Optional + Essay","Interview"], topics:{}, pattern:{duration:"Multiple papers",questions:"Objective + Descriptive",total:"N/A",negative:"Yes in Prelims"}, cutoff:[], books:["TNPSC previous papers","Tamil Nadu GK books"], eligibility:"Graduate. Age: 21-32.", tips:["Tamil Nadu administrative services","Prelims + Mains + Interview like UPSC","Tamil language advantage","Very tough competition"] },
  { id:"uppsc", name:"UPPSC", full:"Uttar Pradesh Public Service Commission", category:"State PSC", color:"#92400e", icon:"🏛️", difficulty:"Very High", diffScore:4, frequency:"Once a year", seats:"~300", salary:"₹56,100+", duration:"1-2 years", syllabus:["Prelims + Mains + Interview"], topics:{}, pattern:{duration:"Multiple papers",questions:"Objective + Descriptive",total:"N/A",negative:"Yes"}, cutoff:[], books:["UP GK books","UPSC prep books"], eligibility:"Graduate. Age: 21-40.", tips:["UP state services","Similar to UPSC pattern","UP GK very important"] },
  { id:"mppsc", name:"MPPSC", full:"Madhya Pradesh Public Service Commission", category:"State PSC", color:"#78350f", icon:"🏛️", difficulty:"High", diffScore:3, frequency:"Once a year", seats:"~250", salary:"₹56,100+", duration:"1 year", syllabus:["Prelims: GS Paper I & II","Mains: GS papers + Optional"], topics:{}, pattern:{duration:"Prelims + Mains + Interview",questions:"MCQs + Descriptive",total:"N/A",negative:"Yes"}, cutoff:[], books:["MP GK books","Drishti IAS material"], eligibility:"Graduate. Age: 21-40.", tips:["MP state administrative services","MP GK crucial","Hindi medium advantage"] },
  { id:"bpsc", name:"BPSC", full:"Bihar Public Service Commission", category:"State PSC", color:"#b45309", icon:"🏛️", difficulty:"High", diffScore:3, frequency:"Once a year", seats:"~500", salary:"₹56,100+", duration:"1 year", syllabus:["Prelims + Mains + Interview"], topics:{}, pattern:{duration:"Multiple papers",questions:"MCQs + Descriptive",total:"N/A",negative:"No"}, cutoff:[], books:["Bihar GK","UPSC prep material"], eligibility:"Graduate. Age: 22-37.", tips:["No negative in Prelims","Bihar GK important","Good vacancies"] },

  // === INTERNATIONAL ===
  { id:"sat", name:"SAT", full:"Scholastic Assessment Test", category:"International", color:"#1d4ed8", icon:"🌎", difficulty:"High", diffScore:3, frequency:"7 times yearly", seats:"N/A", salary:"Admission test", duration:"Undergrad", syllabus:["Evidence-Based Reading & Writing","Math"], topics:{}, pattern:{duration:"3 hours",questions:"154",total:"1600 marks",negative:"No"}, cutoff:[], books:["College Board Official Guide","Khan Academy SAT"], eligibility:"High school students.", tips:["For US undergraduate admission","Practice tests crucial","Digital SAT from 2024","Score 1400+ for top colleges"] },
  { id:"gre", name:"GRE", full:"Graduate Record Examination", category:"International", color:"#1e40af", icon:"🎓", difficulty:"High", diffScore:3, frequency:"Year round", seats:"N/A", salary:"Admission test", duration:"Masters/PhD", syllabus:["Verbal Reasoning, Quant Reasoning, Analytical Writing"], topics:{}, pattern:{duration:"3 hours 45 min",questions:"80 + 2 essays",total:"340 + 6",negative:"No"}, cutoff:[], books:["Manhattan 5lb","ETS Official Guide","Magoosh GRE"], eligibility:"Graduate students.", tips:["For MS/PhD in US/Europe","320+ for good universities","Vocab building crucial","Quant easier for Indians"] },
  { id:"gmat", name:"GMAT", full:"Graduate Management Admission Test", category:"International", color:"#be185d", icon:"💼", difficulty:"High", diffScore:3, frequency:"Year round", seats:"N/A", salary:"MBA admission", duration:"2 years MBA", syllabus:["Quant, Verbal, Integrated Reasoning, AWA"], topics:{}, pattern:{duration:"3.5 hours",questions:"80 + IR + Essay",total:"800",negative:"No"}, cutoff:[], books:["Official GMAT Guide","Manhattan GMAT"], eligibility:"Bachelors. Work ex preferred.", tips:["For MBA abroad","700+ for top B-schools","Computer adaptive","IR section unique"] },
  { id:"toefl", name:"TOEFL", full:"Test of English as a Foreign Language", category:"International", color:"#0284c7", icon:"🗣️", difficulty:"Moderate", diffScore:2, frequency:"Weekly", seats:"N/A", salary:"English test", duration:"Valid 2 years", syllabus:["Reading, Listening, Speaking, Writing"], topics:{}, pattern:{duration:"3 hours",questions:"54-78 questions",total:"120 marks",negative:"No"}, cutoff:[], books:["ETS Official Guide","Kaplan TOEFL"], eligibility:"Anyone needing English proficiency proof.", tips:["For US universities mainly","100+ for top colleges","Speaking section challenging for Indians","Practice with timer"] },
  { id:"ielts", name:"IELTS", full:"International English Language Testing System", category:"International", color:"#0891b2", icon:"🗣️", difficulty:"Moderate", diffScore:2, frequency:"48 times yearly", seats:"N/A", salary:"English test", duration:"Valid 2 years", syllabus:["Listening, Reading, Writing, Speaking"], topics:{}, pattern:{duration:"2hr 45min",questions:"40 per section",total:"9 bands",negative:"No"}, cutoff:[], books:["Cambridge IELTS 1-17","British Council material"], eligibility:"Anyone.", tips:["For UK/Canada/Australia","7+ bands for good universities","Speaking is face-to-face","Academic vs General Training"] },
  { id:"pte", name:"PTE Academic", full:"Pearson Test of English Academic", category:"International", color:"#0369a1", icon:"🗣️", difficulty:"Moderate", diffScore:2, frequency:"Multiple daily", seats:"N/A", salary:"English test", duration:"Valid 2 years", syllabus:["Speaking & Writing, Reading, Listening"], topics:{}, pattern:{duration:"2 hours",questions:"Varies",total:"90 marks",negative:"No"}, cutoff:[], books:["PTE official materials","Scored practice tests"], eligibility:"Anyone.", tips:["Computer based entirely","Fast results (2-5 days)","Easier than IELTS for some","65+ for PR countries"] },

  // === IT CERTIFICATIONS ===
  { id:"aws-saa", name:"AWS Solutions Architect", full:"AWS Certified Solutions Architect Associate", category:"IT Certification", color:"#f97316", icon:"☁️", difficulty:"High", diffScore:3, frequency:"Anytime", seats:"N/A", salary:"₹8-25 LPA", duration:"Valid 3 years", syllabus:["Design Resilient Architectures, High-Performing, Secure, Cost-Optimized"], topics:{}, pattern:{duration:"130 min",questions:"65",total:"1000 marks",negative:"No"}, cutoff:[], books:["AWS Whitepapers","Tutorials Dojo","A Cloud Guru"], eligibility:"Basic AWS knowledge recommended.", tips:["Most popular AWS cert","Hands-on labs essential","Practice exams mandatory","720/1000 to pass"] },
  { id:"azure-admin", name:"Azure Administrator", full:"Microsoft Azure Administrator Associate", category:"IT Certification", color:"#0284c7", icon:"☁️", difficulty:"Moderate", diffScore:2, frequency:"Anytime", seats:"N/A", salary:"₹7-20 LPA", duration:"Valid 1 year", syllabus:["Manage Azure identities, governance, storage, compute, virtual networks"], topics:{}, pattern:{duration:"120 min",questions:"40-60",total:"1000 marks",negative:"No"}, cutoff:[], books:["Microsoft Learn","Exam Ref books"], eligibility:"Azure fundamentals knowledge.", tips:["Most demanded Microsoft cert","Hands-on Azure portal","700/1000 to pass","Renew yearly"] },
  { id:"comptia-aplus", name:"CompTIA A+", full:"CompTIA A+ Certification", category:"IT Certification", color:"#dc2626", icon:"💻", difficulty:"Easy", diffScore:1, frequency:"Anytime", seats:"N/A", salary:"₹3-8 LPA", duration:"Valid 3 years", syllabus:["Hardware, Networking, Mobile Devices, OS, Security, Troubleshooting"], topics:{}, pattern:{duration:"90 min per exam",questions:"90 max",total:"900 marks",negative:"No"}, cutoff:[], books:["CompTIA A+ All-in-One","Professor Messer videos"], eligibility:"No prerequisites.", tips:["Entry level IT cert","2 exams to pass","675/900 each exam","Good for help desk jobs"] },
  { id:"cissp", name:"CISSP", full:"Certified Information Systems Security Professional", category:"IT Security", color:"#7c2d12", icon:"🔒", difficulty:"Very High", diffScore:4, frequency:"Anytime", seats:"N/A", salary:"₹12-35 LPA", duration:"Valid 3 years", syllabus:["8 domains: Security Management, Asset Security, Security Architecture, Communications, IAM, Security Assessment, Security Operations, Software Security"], topics:{}, pattern:{duration:"4 hours",questions:"100-150",total:"1000 marks",negative:"No"}, cutoff:[], books:["CISSP Official Study Guide","11th Hour CISSP"], eligibility:"5 years security work experience.", tips:["Gold standard in InfoSec","Extremely tough","700/1000 to pass","High salary premium"] },

  // === FINANCE & COMMERCE ===
  { id:"ca-foundation", name:"CA Foundation", full:"Chartered Accountancy Foundation", category:"Commerce", color:"#b91c1c", icon:"📊", difficulty:"High", diffScore:3, frequency:"Twice a year", seats:"N/A", salary:"₹6-15 LPA", duration:"4 months", syllabus:["Accounting, Law, Maths, Economics"], topics:{}, pattern:{duration:"3 hours per paper",questions:"100 marks per paper",total:"400 marks",negative:"No"}, cutoff:[], books:["ICAI Study Material","Taxmann books"], eligibility:"Class 12 pass.", tips:["Entry to CA course","40% each paper + 50% aggregate","Conceptual clarity needed","Start early"] },
  { id:"ca-inter", name:"CA Intermediate", full:"CA Intermediate", category:"Commerce", color:"#dc2626", icon:"📊", difficulty:"Very High", diffScore:4, frequency:"Twice a year", seats:"N/A", salary:"₹8-20 LPA", duration:"8 months", syllabus:["8 papers: Accounting, Corporate Law, Taxation, Costing, Auditing, EIS-SM, FM-Eco, Advanced Accounting"], topics:{}, pattern:{duration:"3 hours per paper",questions:"100 marks",total:"800 marks",negative:"No"}, cutoff:[], books:["ICAI modules","Scanner"], eligibility:"CA Foundation + 8 months articleship.", tips:["Toughest CA level","Both groups together recommended","40% each + 50% aggregate","Articleship mandatory"] },
  { id:"ca-final", name:"CA Final", full:"CA Final", category:"Commerce", color:"#7f1d1d", icon:"🏆", difficulty:"Extremely High", diffScore:5, frequency:"Twice a year", seats:"N/A", salary:"₹12-50 LPA", duration:"1 year", syllabus:["8 papers including Advanced Audit, Direct Tax, Indirect Tax, FR, SFM, ISCA"], topics:{}, pattern:{duration:"3 hours per paper",questions:"100 marks",total:"800 marks",negative:"No"}, cutoff:[], books:["ICAI material","Revision test papers"], eligibility:"CA Inter + 2.5 years articleship (can appear at 2 years).", tips:["Final frontier","Clearing both groups together rare","40% each + 50% aggregate","Extremely prestigious"] },
  { id:"cs-executive", name:"CS Executive", full:"Company Secretary Executive", category:"Commerce", color:"#0f766e", icon:"📋", difficulty:"High", diffScore:3, frequency:"Twice a year", seats:"N/A", salary:"₹5-12 LPA", duration:"9 months", syllabus:["7 papers including Company Law, Securities Laws, Tax Laws, Corporate Accounting"], topics:{}, pattern:{duration:"3 hours per paper",questions:"100 marks",total:"700 marks",negative:"No"}, cutoff:[], books:["ICSI modules","Taxmann"], eligibility:"CS Foundation (or Graduate exemption).", tips:["Corporate law specialist","40% each + 50% aggregate","Good for legal compliance career","Less tough than CA Inter"] },
  { id:"cma-inter", name:"CMA Intermediate", full:"Cost & Management Accountant Intermediate", category:"Commerce", color:"#115e59", icon:"💼", difficulty:"High", diffScore:3, frequency:"Twice a year", seats:"N/A", salary:"₹6-15 LPA", duration:"8 months", syllabus:["8 papers: FAA, Laws, Direct Tax, Cost Accounting, FM, Operations Mgmt, Cost & Mgmt Audit, Indirect Tax"], topics:{}, pattern:{duration:"3 hours per paper",questions:"100 marks",total:"800 marks",negative:"No"}, cutoff:[], books:["ICMAI study material","Suggested answers"], eligibility:"CMA Foundation + 6 months training.", tips:["Cost accounting focus","40% each + 50% aggregate","Industry demand growing","Costing expert role"] },

  // === MISCELLANEOUS ===
  { id:"kvs", name:"KVS Recruitment", full:"Kendriya Vidyalaya Sangathan Teachers", category:"Teaching", color:"#be185d", icon:"👨‍🏫", difficulty:"Moderate", diffScore:2, frequency:"Once a year", seats:"~5,000", salary:"₹44,900-₹1.42 LPA", duration:"N/A", syllabus:["GK, Reasoning, Teaching Aptitude, Subject Knowledge"], topics:{}, pattern:{duration:"2.5 hours",questions:"180",total:"180 marks",negative:"Yes"}, cutoff:[], books:["KVS previous papers","Teaching aptitude"], eligibility:"B.Ed for PGT/TGT. 12th for PRT.", tips:["Central Govt teaching job","Good salary & perks","Interview round important"] },
  { id:"dsssb", name:"DSSSB", full:"Delhi Subordinate Services Selection Board", category:"Teaching", color:"#c026d3", icon:"📚", difficulty:"Moderate", diffScore:2, frequency:"Multiple posts yearly", seats:"Varies", salary:"₹35,000-₹1.12 LPA", duration:"N/A", syllabus:["GK, Reasoning, Maths/Hindi/English","Subject specific for teachers"], topics:{}, pattern:{duration:"2 hours",questions:"200",total:"200 marks",negative:"Yes"}, cutoff:[], books:["DSSSB previous papers","Subject books"], eligibility:"Varies by post.", tips:["Delhi Govt jobs","Many teaching posts","Tough competition in Delhi"] },
];

const count=exams.length;

// [REST OF YOUR ORIGINAL CODE - EXACT COPY]
// Everything below this line is EXACTLY as you had it...

function ExamBot({ exam, onClose, dark }) {
  const T = dark
    ? { bg: "#1a1a1a", card: "#242424", text: "#fff", subtext: "#bbb", border: "#333", muted: "#666" }
    : { bg: "#f5f5f5", card: "#fff", text: "#000", subtext: "#666", border: "#ddd", muted: "#999" };
  const [q, setQ] = useState("");
  const [msgs, setMsgs] = useState([]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  function ask() {
    if (!q.trim()) return;
    const userQ = q.trim();
    setQ("");
    setMsgs(function (m) { return m.concat([{ role: "user", text: userQ }]); });
    setLoading(true);
    setTimeout(function () {
      const ans = getAnswer(userQ, exam);
      setMsgs(function (m) { return m.concat([{ role: "bot", text: ans }]); });
      setLoading(false);
    }, 800);
  }

  useEffect(function () { if (bottomRef.current) bottomRef.current.scrollIntoView({ behavior: "smooth" }); }, [msgs]);

  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: T.bg, zIndex: 999, display: "flex", flexDirection: "column" }}>
      <div style={{ background: exam.color || "#6366f1", padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", color: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ fontSize: 26 }}>{exam.icon || "🤖"}</div>
          <div><div style={{ fontFamily: "'Playfair Display',serif", fontSize: 17, fontWeight: 700 }}>ExamBot</div><div style={{ fontSize: 12, opacity: 0.9 }}>{exam.name}</div></div>
        </div>
        <button onClick={onClose} style={{ background: "rgba(255,255,255,0.2)", border: "none", borderRadius: "50%", width: 34, height: 34, color: "#fff", fontSize: 20, cursor: "pointer" }}>×</button>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
        {msgs.length === 0 ? (
          <div style={{ textAlign: "center", marginTop: 60 }}>
            <div style={{ fontSize: 50, marginBottom: 12 }}>🤖</div>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 700, color: T.text, marginBottom: 6 }}>Ask me anything about {exam.name}!</div>
            <div style={{ fontSize: 13, color: T.subtext, lineHeight: 1.6 }}>Syllabus • Cutoff • Books • Tips • Eligibility • Difficulty • Salary • Duration • Pattern • Seats • Frequency</div>
          </div>
        ) : (
          msgs.map(function (msg, i) {
            return msg.role === "user" ? (
              <div key={i} style={{ display: "flex", justifyContent: "flex-end" }}>
                <div style={{ background: exam.color || "#6366f1", color: "#fff", padding: "10px 14px", borderRadius: 16, maxWidth: "75%", fontSize: 14, lineHeight: 1.5, boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>{msg.text}</div>
              </div>
            ) : (
              <div key={i} style={{ display: "flex", gap: 10 }}>
                <div style={{ width: 32, height: 32, background: exam.color + "30" || "#6366f130", borderRadius: "50%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🤖</div>
                <div style={{ background: T.card, padding: "10px 14px", borderRadius: 16, maxWidth: "75%", fontSize: 14, color: T.text, lineHeight: 1.6, boxShadow: dark ? "0 1px 3px rgba(0,0,0,0.3)" : "0 1px 3px rgba(0,0,0,0.05)" }}>{msg.text}</div>
              </div>
            );
          })
        )}
        {loading && (
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ width: 32, height: 32, background: (exam.color || "#6366f1") + "30", borderRadius: "50%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🤖</div>
            <div style={{ background: T.card, padding: "10px 14px", borderRadius: 16, fontSize: 14, color: T.subtext }}>Thinking...</div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
      <div style={{ padding: 12, background: T.card, borderTop: "1px solid " + T.border, display: "flex", gap: 8 }}>
        <input value={q} onChange={function (e) { setQ(e.target.value); }} onKeyPress={function (e) { if (e.key === "Enter") ask(); }} placeholder="Type your question..." style={{ flex: 1, padding: "10px 14px", border: "1px solid " + T.border, borderRadius: 22, fontSize: 14, fontFamily: "inherit", background: T.bg, color: T.text, outline: "none" }} />
        <button onClick={ask} disabled={!q.trim()} style={{ background: exam.color || "#6366f1", border: "none", borderRadius: 22, padding: "0 20px", color: "#fff", cursor: q.trim() ? "pointer" : "not-allowed", fontSize: 14, fontWeight: 600, opacity: q.trim() ? 1 : 0.5 }}>Send</button>
      </div>
    </div>
  );
}

function getAnswer(q, exam) {
  const lower = q.toLowerCase();
  if (lower.includes("syllabus") || lower.includes("topics") || lower.includes("subject")) {
    if (exam.syllabus && exam.syllabus.length > 0) return "📚 Syllabus:\n" + exam.syllabus.join("\n");
    if (exam.topics && Object.keys(exam.topics).length > 0) {
      let out = "📚 Topics:\n";
      for (var k in exam.topics) out += k + ": " + exam.topics[k].join(", ") + "\n";
      return out;
    }
    return "📚 Detailed syllabus not available for " + exam.name + ", but it covers core subjects of " + exam.category + ".";
  }
  if (lower.includes("cutoff") || lower.includes("marks")) {
    if (exam.cutoff && exam.cutoff.length > 0) {
      return "🎯 Cutoff trends:\n" + exam.cutoff.map(function (c) {
        return c.year + ": Gen " + c.general + " | OBC " + c.obc + " | SC " + c.sc + " | ST " + c.st;
      }).join("\n") + "\n(Subject to change yearly)";
    }
    return "🎯 Specific cutoff data not available, but " + exam.name + " has competitive cutoffs based on difficulty level: " + exam.difficulty + ".";
  }
  if (lower.includes("book") || lower.includes("study material") || lower.includes("resource")) {
    if (exam.books && exam.books.length > 0) return "📖 Recommended books:\n• " + exam.books.join("\n• ");
    return "📖 Standard books for " + exam.category + " preparation are recommended. Check official website for latest material.";
  }
  if (lower.includes("tip") || lower.includes("advice") || lower.includes("strategy") || lower.includes("prepare")) {
    if (exam.tips && exam.tips.length > 0) return "💡 Preparation tips:\n• " + exam.tips.join("\n• ");
    return "💡 Focus on understanding concepts, solve previous papers, take regular mocks, and maintain consistency!";
  }
  if (lower.includes("eligibility") || lower.includes("qualify") || lower.includes("criteria")) {
    return "✅ Eligibility: " + (exam.eligibility || "Check official notification for exact criteria.");
  }
  if (lower.includes("pattern") || lower.includes("exam pattern") || lower.includes("structure")) {
    if (exam.pattern) {
      const p = exam.pattern;
      return "📝 Exam Pattern:\n⏱ Duration: " + p.duration + "\n❓ Questions: " + p.questions + "\n📊 Total Marks: " + p.total + "\n❌ Negative Marking: " + p.negative;
    }
    return "📝 Exam pattern details not available. Check official website.";
  }
  if (lower.includes("difficulty") || lower.includes("tough") || lower.includes("hard") || lower.includes("easy")) {
    return "🎯 Difficulty: " + exam.difficulty + (exam.diffScore ? " (" + exam.diffScore + "/5)" : "") + "\n" + exam.name + " requires dedicated preparation!";
  }
  if (lower.includes("salary") || lower.includes("package") || lower.includes("pay")) {
    return "💰 Expected Salary: " + exam.salary + "\n(Varies based on college/rank/company)";
  }
  if (lower.includes("seat") || lower.includes("vacancy") || lower.includes("how many")) {
    return "🪑 Total Seats/Vacancies: " + exam.seats + "\n(May vary yearly)";
  }
  if (lower.includes("duration") || lower.includes("how long") || lower.includes("time")) {
    return "⏳ Duration: " + exam.duration;
  }
  if (lower.includes("frequency") || lower.includes("when") || lower.includes("conduct")) {
    return "📅 Conducted: " + exam.frequency;
  }
  if (lower.includes("full form") || lower.includes("full name")) {
    return "📝 Full Form: " + (exam.full || exam.name);
  }
  return "🤖 I can answer questions about:\n• Syllabus & Topics\n• Cutoff trends\n• Recommended Books\n• Preparation Tips\n• Eligibility Criteria\n• Exam Pattern\n• Difficulty Level\n• Salary/Package\n• Seats/Vacancies\n• Duration & Frequency\n\nAsk me anything specific!";
}

function CompareExams({ e1, e2, onClose, dark }) {
  const T = dark
    ? { bg: "#1a1a1a", card: "#242424", text: "#fff", subtext: "#bbb", border: "#333", muted: "#666" }
    : { bg: "#f5f5f5", card: "#fff", text: "#000", subtext: "#666", border: "#ddd", muted: "#999" };
  const rows = [
    { label: "Full Name", key: "full" },
    { label: "Category", key: "category" },
    { label: "Difficulty", key: "difficulty" },
    { label: "Frequency", key: "frequency" },
    { label: "Total Seats", key: "seats" },
    { label: "Avg Salary", key: "salary" },
    { label: "Duration", key: "duration" },
    { label: "Eligibility", key: "eligibility" },
  ];
  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: T.bg, zIndex: 998, overflow: "auto" }}>
      <div style={{ background: "linear-gradient(135deg, " + (e1.color || "#6366f1") + ", " + (e2.color || "#ec4899") + ")", padding: "16px", color: "#fff", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 19, fontWeight: 700 }}>Compare Exams</div>
        <button onClick={onClose} style={{ background: "rgba(255,255,255,0.2)", border: "none", borderRadius: "50%", width: 34, height: 34, color: "#fff", fontSize: 20, cursor: "pointer" }}>×</button>
      </div>
      <div style={{ padding: 16 }}>
        <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
          <div style={{ flex: 1, background: (e1.color || "#6366f1") + "15", padding: 16, borderRadius: 14, textAlign: "center" }}>
            <div style={{ fontSize: 36, marginBottom: 8 }}>{e1.icon || "📝"}</div>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, fontWeight: 700, color: T.text }}>{e1.name}</div>
            <div style={{ fontSize: 12, color: T.subtext, marginTop: 4 }}>{e1.category}</div>
          </div>
          <div style={{ flex: 1, background: (e2.color || "#ec4899") + "15", padding: 16, borderRadius: 14, textAlign: "center" }}>
            <div style={{ fontSize: 36, marginBottom: 8 }}>{e2.icon || "📝"}</div>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, fontWeight: 700, color: T.text }}>{e2.name}</div>
            <div style={{ fontSize: 12, color: T.subtext, marginTop: 4 }}>{e2.category}</div>
          </div>
        </div>
        {rows.map(function (row, i) {
          return (
            <div key={i} style={{ background: T.card, borderRadius: 12, padding: "12px 14px", marginBottom: 10, boxShadow: dark ? "0 1px 3px rgba(0,0,0,0.3)" : "0 1px 3px rgba(0,0,0,0.05)" }}>
              <div style={{ fontSize: 11, color: T.muted, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.5px", fontWeight: 600 }}>{row.label}</div>
              <div style={{ display: "flex", gap: 12 }}>
                <div style={{ flex: 1, fontSize: 13, color: T.text, lineHeight: 1.5 }}>{e1[row.key] || "—"}</div>
                <div style={{ width: 1, background: T.border }}></div>
                <div style={{ flex: 1, fontSize: 13, color: T.text, lineHeight: 1.5 }}>{e2[row.key] || "—"}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StudyPlanner({ exam, onClose, dark }) {
  const T = dark
    ? { bg: "#1a1a1a", card: "#242424", text: "#fff", subtext: "#bbb", border: "#333", muted: "#666", input: "#2a2a2a" }
    : { bg: "#f5f5f5", card: "#fff", text: "#000", subtext: "#666", border: "#ddd", muted: "#999", input: "#fafafa" };
  const saved = loadData();
  const initPlan = (saved && saved.planners && saved.planners[exam.id]) || {
    weeks: [
      { week: 1, task: "", done: false },
      { week: 2, task: "", done: false },
      { week: 3, task: "", done: false },
      { week: 4, task: "", done: false }
    ]
  };
  const [weeks, setWeeks] = useState(initPlan.weeks);

  function save() {
    const data = loadData() || {};
    if (!data.planners) data.planners = {};
    data.planners[exam.id] = { weeks: weeks };
    saveData(data);
  }

  function toggleDone(i) {
    setWeeks(function (w) {
      const newW = w.map(function (x, idx) { return idx === i ? { ...x, done: !x.done } : x; });
      const data = loadData() || {};
      if (!data.planners) data.planners = {};
      data.planners[exam.id] = { weeks: newW };
      saveData(data);
      return newW;
    });
  }

  function updateTask(i, val) {
    setWeeks(function (w) { return w.map(function (x, idx) { return idx === i ? { ...x, task: val } : x; }); });
  }

  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: T.bg, zIndex: 997, display: "flex", flexDirection: "column" }}>
      <div style={{ background: exam.color || "#6366f1", padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", color: "#fff" }}>
        <div><div style={{ fontFamily: "'Playfair Display',serif", fontSize: 17, fontWeight: 700 }}>Study Planner</div><div style={{ fontSize: 12, opacity: 0.9 }}>{exam.name}</div></div>
        <button onClick={onClose} style={{ background: "rgba(255,255,255,0.2)", border: "none", borderRadius: "50%", width: 34, height: 34, color: "#fff", fontSize: 20, cursor: "pointer" }}>×</button>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
        <div style={{ fontSize: 13, color: T.subtext, marginBottom: 16, lineHeight: 1.6 }}>📅 Plan your {exam.name} preparation week by week. Your progress is saved automatically — even if you close the app! ✅</div>
        {weeks.map(function (w, i) {
          return (
            <div key={i} style={{ background: T.card, borderRadius: 12, padding: 14, marginBottom: 12, boxShadow: dark ? "0 2px 6px rgba(0,0,0,0.3)" : "0 2px 6px rgba(0,0,0,0.05)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <input type="checkbox" checked={w.done} onChange={function () { toggleDone(i); }} style={{ width: 20, height: 20, cursor: "pointer" }} />
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 15, fontWeight: 700, color: T.text }}>Week {w.week}</div>
              </div>
              <input value={w.task} onChange={function (e) { updateTask(i, e.target.value); }} onBlur={save} placeholder={"What will you study in week " + w.week + "?"} style={{ width: "100%", padding: "10px 12px", border: "1px solid " + T.border, borderRadius: 8, fontSize: 13, fontFamily: "inherit", background: T.input, color: T.text, textDecoration: w.done ? "line-through" : "none", outline: "none" }} />
            </div>
          );
        })}
        <div style={{ textAlign: "center", marginTop: 16, fontSize: 12, color: T.muted }}>💾 All changes are saved automatically</div>
      </div>
    </div>
  );
}

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [navTab, setNavTab] = useState("home");
  const [dark, setDark] = useState(false);
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("All");
  const [compareMode, setCompareMode] = useState(false);
  const [compareList, setCompareList] = useState([]);
  const [botOpen, setBotOpen] = useState(null);
  const [compareOpen, setCompareOpen] = useState(null);
  const [plannerOpen, setPlannerOpen] = useState(null);

  useEffect(function () {
    const t = setTimeout(function () { setShowIntro(false); }, 4000);
    return function () { clearTimeout(t); };
  }, []);

  const T = dark
    ? { bg: "#0f0f0f", card: "#1e1e1e", text: "#fff", subtext: "#bbb", border: "#333", muted: "#666", input: "#2a2a2a" }
    : { bg: "#fafafa", card: "#fff", text: "#1a1a1a", subtext: "#555", border: "#e0e0e0", muted: "#999", input: "#fff" };

  const cats = ["All"].concat(Array.from(new Set(exams.map(function (e) { return e.category; }))));
  const filtered = exams.filter(function (e) {
    const matchCat = cat === "All" || e.category === cat;
    const matchSearch = e.name.toLowerCase().includes(search.toLowerCase()) || e.category.toLowerCase().includes(search.toLowerCase()) || (e.full && e.full.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  function toggleCompare(ex) {
    if (compareList.find(function (x) { return x.id === ex.id; })) {
      setCompareList(compareList.filter(function (x) { return x.id !== ex.id; }));
    } else {
      if (compareList.length < 2) setCompareList(compareList.concat([ex]));
    }
  }

  if (showIntro) {
    return (
      <div style={{ width: "100vw", height: "100vh", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", position: "relative" }}>
        <div style={{ position: "absolute", width: "200%", height: "200%", background: "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "50px 50px", animation: "rotate 20s linear infinite" }}></div>
        <div style={{ textAlign: "center", zIndex: 1, animation: "fadeInUp 1s ease" }}>
          <div style={{ fontSize: 80, marginBottom: 20, animation: "bounce 2s infinite" }}>🎓</div>
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 48, fontWeight: 700, color: "#fff", marginBottom: 10, letterSpacing: "2px", textShadow: "0 4px 12px rgba(0,0,0,0.3)" }}>EXAMNEST</div>
          <div style={{ fontSize: 18, color: "rgba(255,255,255,0.9)", letterSpacing: "1px", marginBottom: 30 }}>Your Gateway to {count}+ Competitive Exams</div>
          <div style={{ display: "inline-block", padding: "4px 20px", background: "rgba(255,255,255,0.2)", borderRadius: 20, fontSize: 14, color: "#fff", animation: "pulse 2s infinite" }}>Loading your journey...</div>
        </div>
        <style>{`
          @keyframes fadeInUp{0%{opacity:0;transform:translateY(30px)}100%{opacity:1;transform:translateY(0)}}
          @keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-20px)}}
          @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.6}}
          @keyframes rotate{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
        `}</style>
      </div>
    );
  }

  if (botOpen) return <ExamBot exam={botOpen} onClose={function () { setBotOpen(null); }} dark={dark} />;
  if (compareOpen) return <CompareExams e1={compareOpen[0]} e2={compareOpen[1]} onClose={function () { setCompareOpen(null); }} dark={dark} />;
  if (plannerOpen) return <StudyPlanner exam={plannerOpen} onClose={function () { setPlannerOpen(null); }} dark={dark} />;

  if (navTab === "about") {
    return (
      <div style={{ width: "100vw", minHeight: "100vh", background: T.bg }}>
        <div style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", padding: "16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <button onClick={function () { setNavTab("home"); }} style={{ background: "rgba(255,255,255,0.1)", border: "none", borderRadius: 10, padding: "7px 12px", color: "#fff", cursor: "pointer", fontSize: 13, fontFamily: "inherit" }}>← Back</button>
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 17, fontWeight: 600, color: "#fff", letterSpacing: "0.05em" }}>About ExamNest</div>
        </div>
        <div style={{ padding: "16px" }}>
          {[
            { icon: "📚", title: "Who We Are", text: "ExamNest is India's most complete free exam platform — covering " + count + "+ exams across Engineering, Medical, UPSC, SSC, Banking, Railway, Defence, Management, Law, Commerce & more!", color: "#f97316" },
            { icon: "🎬", title: "Cinematic Experience", text: "ExamNest features a stunning cinematic intro every time you open the app — because your exam journey deserves a grand entrance!", color: "#c9a84c" },
            { icon: "🤖", title: "AI Chatbot", text: "ExamBot knows all Indian exams — ask about syllabus, cutoffs, books, tips, eligibility instantly. Works offline!", color: "#6366f1" },
            { icon: "⚖️", title: "Exam Comparison", text: "Compare any 2 exams side by side — difficulty, salary, seats, duration, eligibility and more!", color: "#0ea5e9" },
            { icon: "📅", title: "Study Planner", text: "Personalised weekly plan + topic tracker. Progress saved permanently — never resets even if you close the app! 🔒", color: "#16a34a" },
            { icon: "🌙", title: "Dark Mode", text: "Easy on eyes for night studying! Tap the moon icon in the top bar to switch between light and dark mode.", color: "#7c3aed" },
          ].map(function (item, i) {
            return (
              <div key={i} style={{ background: T.card, borderRadius: 14, padding: "16px", marginBottom: 11, boxShadow: dark ? "0 2px 8px rgba(0,0,0,0.3)" : "0 2px 8px rgba(0,0,0,0.05)", display: "flex", gap: 13, alignItems: "flex-start" }}>
                <div style={{ width: 42, height: 42, background: item.color + "20", borderRadius: 11, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{item.icon}</div>
                <div><div style={{ fontFamily: "'Playfair Display',serif", fontSize: 15, fontWeight: 700, marginBottom: 5, color: T.text }}>{item.title}</div><div style={{ fontSize: 13, color: T.subtext, lineHeight: 1.7 }}>{item.text}</div></div>
              </div>
            );
          })}
          <div style={{ textAlign: "center", marginTop: 16, fontSize: 12, color: T.muted }}>© 2026 ExamNest · {count}+ Exams · Made with ❤️ for Indian Students</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ width: "100vw", minHeight: "100vh", background: T.bg, fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <div style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", padding: "16px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ fontSize: 28 }}>🎓</div>
          <div><div style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 700, color: "#fff", letterSpacing: "0.5px" }}>ExamNest</div><div style={{ fontSize: 11, color: "rgba(255,255,255,0.85)" }}>{count}+ Exams</div></div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={function () { setDark(!dark); }} style={{ background: "rgba(255,255,255,0.2)", border: "none", borderRadius: "50%", width: 38, height: 38, color: "#fff", fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>{dark ? "☀️" : "🌙"}</button>
          <button onClick={function () { setNavTab("about"); }} style={{ background: "rgba(255,255,255,0.2)", border: "none", borderRadius: "50%", width: 38, height: 38, color: "#fff", fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>ℹ️</button>
        </div>
      </div>

      <div style={{ padding: "16px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ marginBottom: 16 }}>
          <input value={search} onChange={function (e) { setSearch(e.target.value); }} placeholder="🔍 Search exams..." style={{ width: "100%", padding: "12px 16px", border: "1px solid " + T.border, borderRadius: 12, fontSize: 15, fontFamily: "inherit", background: T.input, color: T.text, outline: "none", boxShadow: dark ? "0 2px 6px rgba(0,0,0,0.2)" : "0 2px 6px rgba(0,0,0,0.05)" }} />
        </div>

        <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 8, marginBottom: 16 }}>
          {cats.map(function (c) {
            return (
              <button key={c} onClick={function () { setCat(c); }} style={{ padding: "8px 16px", border: "none", borderRadius: 20, background: cat === c ? "#667eea" : T.card, color: cat === c ? "#fff" : T.text, fontSize: 13, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap", boxShadow: dark ? "0 2px 4px rgba(0,0,0,0.2)" : "0 2px 4px rgba(0,0,0,0.05)" }}>{c}</button>
            );
          })}
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <div style={{ fontSize: 13, color: T.subtext }}>{filtered.length} exam{filtered.length !== 1 ? "s" : ""} found</div>
          <button onClick={function () { setCompareMode(!compareMode); setCompareList([]); }} style={{ padding: "8px 16px", border: "none", borderRadius: 20, background: compareMode ? "#ec4899" : T.card, color: compareMode ? "#fff" : T.text, fontSize: 13, fontWeight: 600, cursor: "pointer", boxShadow: dark ? "0 2px 4px rgba(0,0,0,0.2)" : "0 2px 4px rgba(0,0,0,0.05)" }}>{compareMode ? "✓ Comparing" : "⚖️ Compare"}</button>
        </div>

        {compareMode && (
          <div style={{ background: "#ec489915", padding: 14, borderRadius: 12, marginBottom: 16, fontSize: 13, color: T.text, lineHeight: 1.6 }}>
            <div style={{ fontWeight: 700, marginBottom: 6 }}>⚖️ Compare Mode Active</div>
            <div>Select 2 exams to compare. {compareList.length > 0 && "Selected: " + compareList.map(function (e) { return e.name; }).join(", ")}
              {compareList.length === 2 && <button onClick={function () { setCompareOpen(compareList); setCompareMode(false); setCompareList([]); }} style={{ marginLeft: 10, padding: "6px 12px", background: "#ec4899", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 600 }}>Compare Now →</button>}
            </div>
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
          {filtered.map(function (ex) {
            const isSelected = compareList.find(function (x) { return x.id === ex.id; });
            return (
              <div key={ex.id} onClick={function () { if (compareMode) toggleCompare(ex); }} style={{ background: T.card, borderRadius: 14, padding: 16, boxShadow: dark ? "0 3px 10px rgba(0,0,0,0.3)" : "0 3px 10px rgba(0,0,0,0.08)", cursor: compareMode ? "pointer" : "default", border: isSelected ? "2px solid #ec4899" : "2px solid transparent", position: "relative", transition: "all 0.2s" }}>
                {compareMode && (
                  <div style={{ position: "absolute", top: 10, right: 10, width: 24, height: 24, borderRadius: "50%", background: isSelected ? "#ec4899" : T.border, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 14, fontWeight: 700 }}>{isSelected ? "✓" : ""}</div>
                )}
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <div style={{ width: 48, height: 48, background: (ex.color || "#6366f1") + "20", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }}>{ex.icon || "📝"}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 16, fontWeight: 700, color: T.text, marginBottom: 2 }}>{ex.name}</div>
                    <div style={{ fontSize: 11, color: T.subtext }}>{ex.category}</div>
                  </div>
                </div>
                <div style={{ fontSize: 12, color: T.subtext, marginBottom: 12, lineHeight: 1.5 }}>{ex.full || ex.name}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
                  <span style={{ padding: "4px 10px", background: T.bg, borderRadius: 12, fontSize: 11, color: T.text }}>🎯 {ex.difficulty}</span>
                  <span style={{ padding: "4px 10px", background: T.bg, borderRadius: 12, fontSize: 11, color: T.text }}>💰 {ex.salary}</span>
                </div>
                {!compareMode && (
                  <div style={{ display: "flex", gap: 6 }}>
                    <button onClick={function () { setBotOpen(ex); }} style={{ flex: 1, padding: "10px", background: ex.color || "#6366f1", color: "#fff", border: "none", borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>🤖 Ask Bot</button>
                    <button onClick={function () { setPlannerOpen(ex); }} style={{ padding: "10px", background: T.bg, border: "1px solid " + T.border, borderRadius: 10, fontSize: 16, cursor: "pointer" }}>📅</button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
