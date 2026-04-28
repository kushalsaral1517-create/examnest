import { useState } from "react";

const exams = [
  // ─── ENGINEERING ───
  { id:"jee-main", name:"JEE Main", full:"Joint Entrance Examination Main", category:"Engineering", color:"#f97316", icon:"⚙️", difficulty:"High", frequency:"Twice a year",
    syllabus:["Physics: Mechanics, Thermodynamics, Electrostatics, Optics, Modern Physics","Chemistry: Physical, Organic & Inorganic Chemistry","Mathematics: Algebra, Calculus, Coordinate Geometry, Trigonometry"],
    pattern:{duration:"3 hours",questions:"90 MCQs",total:"300 marks",negative:"Yes (-1 per wrong)"},
    cutoff:[{year:2024,general:90.7,obc:75.3,sc:54.0,st:44.1},{year:2023,general:88.4,obc:72.1,sc:51.9,st:42.0}],
    books:["HC Verma – Concepts of Physics","NCERT Chemistry XI & XII","RD Sharma / Arihant Maths","DC Pandey – Electricity & Magnetism"],
    eligibility:"Class 12 with PCM. Min 75% marks (65% SC/ST).",
    tips:["Master NCERT before advanced books","Solve 10+ years previous papers","Focus on weak chapters","Attempt mocks under exam conditions"] },

  { id:"jee-adv", name:"JEE Advanced", full:"Joint Entrance Examination Advanced", category:"Engineering", color:"#ea580c", icon:"🏆", difficulty:"Extremely High", frequency:"Once a year",
    syllabus:["Physics: Full JEE syllabus at deeper level","Chemistry: Full JEE syllabus at deeper level","Mathematics: Full JEE syllabus at deeper level"],
    pattern:{duration:"6 hours (2 papers)",questions:"54 per paper",total:"360 marks",negative:"Yes (varies by question)"},
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

  { id:"srmjee", name:"SRMJEEE", full:"SRM Joint Engineering Entrance Examination", category:"Engineering", color:"#f97316", icon:"🎓", difficulty:"Moderate", frequency:"Once a year",
    syllabus:["Physics","Chemistry","Mathematics/Biology","English & Aptitude"],
    pattern:{duration:"2.5 hours",questions:"125 MCQs",total:"125 marks",negative:"No"},
    cutoff:[{year:2024,general:70,obc:60,sc:50,st:45},{year:2023,general:65,obc:55,sc:45,st:40}],
    books:["NCERT XI & XII","SRM previous year papers","Arihant SRM guide"],
    eligibility:"Class 12 with PCM/PCB. Min 60% marks.",
    tips:["No negative marking","Focus on NCERT basics","Aptitude section needs daily practice","Apply early for better seat allotment"] },

  { id:"comedk", name:"COMEDK UGET", full:"Consortium of Medical Engineering and Dental Colleges of Karnataka", category:"Engineering", color:"#d97706", icon:"🏗️", difficulty:"Moderate", frequency:"Once a year",
    syllabus:["Physics: Class 11 & 12","Chemistry: Class 11 & 12","Mathematics: Class 11 & 12"],
    pattern:{duration:"3 hours",questions:"180 MCQs",total:"180 marks",negative:"No"},
    cutoff:[{year:2024,general:120,obc:105,sc:90,st:85},{year:2023,general:115,obc:100,sc:85,st:80}],
    books:["NCERT XI & XII","Previous COMEDK papers","Arihant guide"],
    eligibility:"Class 12 with PCM. Min 45% marks.",
    tips:["No negative marking — attempt all","Karnataka engineering colleges admission","Similar to JEE Main pattern","NCERT is sufficient"] },

  // ─── MEDICAL ───
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

  { id:"aiims-pg", name:"AIIMS PG", full:"All India Institute of Medical Sciences PG Entrance", category:"Medical", color:"#34d399", icon:"🏥", difficulty:"Extremely High", frequency:"Twice a year",
    syllabus:["All MBBS subjects","Research methodology","Biostatistics"],
    pattern:{duration:"1.5 hours",questions:"100 MCQs",total:"100 marks",negative:"Yes (-1/3)"},
    cutoff:[{year:2024,general:75,obc:67,sc:60,st:60},{year:2023,general:72,obc:65,sc:58,st:58}],
    books:["AIIMS previous year papers","Dams study material","Across – for AIIMS specific MCQs"],
    eligibility:"MBBS from recognised institution.",
    tips:["Image-based questions are common","Focus on recent advances","AIIMS has unique question style","Practice previous 10 years papers"] },

  { id:"jipmer", name:"JIPMER", full:"Jawaharlal Institute of Postgraduate Medical Education & Research", category:"Medical", color:"#6ee7b7", icon:"💊", difficulty:"High", frequency:"Once a year",
    syllabus:["Physics","Chemistry","Biology","English & Comprehension","Logical & Quantitative Reasoning"],
    pattern:{duration:"2.5 hours",questions:"200 MCQs",total:"200 marks",negative:"No"},
    cutoff:[{year:2024,general:60,obc:55,sc:45,st:42},{year:2023,general:58,obc:53,sc:43,st:40}],
    books:["NCERT XI & XII","Previous JIPMER papers","MTG guide"],
    eligibility:"Class 12 with PCB. Min 60% marks.",
    tips:["No negative marking","English & Reasoning are unique sections","NCERT based mostly","Speed is crucial"] },

  // ─── GOVERNMENT / CIVIL SERVICES ───
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

  { id:"ssc-mts", name:"SSC MTS", full:"SSC Multi Tasking Staff", category:"Government", color:"#2dd4bf", icon:"🗂️", difficulty:"Easy", frequency:"Once a year",
    syllabus:["Numerical & Mathematical Ability","Reasoning Ability","General Awareness","English Language"],
    pattern:{duration:"90 minutes",questions:"90 MCQs",total:"270 marks",negative:"Yes (-1)"},
    cutoff:[{year:2024,general:110,obc:100,sc:90,st:85},{year:2023,general:105,obc:95,sc:85,st:80}],
    books:["Arihant SSC MTS","Lucent GK","RS Aggarwal Basic Maths"],
    eligibility:"Class 10 passed. Age: 18–25.",
    tips:["Easiest SSC exam","Focus on Class 10 level maths","GK from last 3 months","English basics are sufficient"] },

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

  { id:"ibps-clerk", name:"IBPS Clerk", full:"IBPS Clerical Cadre", category:"Government", color:"#1d4ed8", icon:"💼", difficulty:"Moderate", frequency:"Once a year",
    syllabus:["Reasoning Ability","Numerical Ability","English Language","General/Financial Awareness","Computer Aptitude"],
    pattern:{duration:"Prelims: 1hr | Mains: 2.5hr",questions:"Prelims: 100 | Mains: 190",total:"Prelims: 100 | Mains: 200",negative:"Yes (-0.25)"},
    cutoff:[{year:2024,general:69,obc:65,sc:58,st:54},{year:2023,general:67,obc:63,sc:56,st:52}],
    books:["RS Aggarwal Maths","Arihant Reasoning","Kiran IBPS Clerk Papers"],
    eligibility:"Graduate. Age: 20–28.",
    tips:["Speed is crucial in Prelims","Mains has sectional cutoffs","Computer awareness is easy scoring","Practice puzzles and syllogisms daily"] },

  { id:"rrb-ntpc", name:"RRB NTPC", full:"Railway Recruitment Board Non-Technical Popular Categories", category:"Government", color:"#7c3aed", icon:"🚂", difficulty:"Moderate", frequency:"Every 2-3 years",
    syllabus:["Mathematics","General Intelligence & Reasoning","General Awareness"],
    pattern:{duration:"90 minutes",questions:"100 MCQs",total:"100 marks",negative:"Yes (-1/3)"},
    cutoff:[{year:2024,general:65,obc:61,sc:55,st:52},{year:2023,general:63,obc:59,sc:53,st:50}],
    books:["Arihant RRB NTPC","Lucent GK","RS Aggarwal Maths","RRB Previous Papers"],
    eligibility:"Class 12 or Graduate (varies by post). Age: 18–33.",
    tips:["GK is most important section","Railway-specific GK is frequently asked","Maths up to Class 10 level","Speed matters"] },

  { id:"rrb-je", name:"RRB JE", full:"Railway Recruitment Board Junior Engineer", category:"Government", color:"#6d28d9", icon:"🚃", difficulty:"Moderate", frequency:"Every 2-3 years",
    syllabus:["Mathematics","General Intelligence","General Awareness","General Science","Technical Subjects (branch-specific)"],
    pattern:{duration:"90 minutes",questions:"100 MCQs",total:"100 marks",negative:"Yes (-1/3)"},
    cutoff:[{year:2024,general:55,obc:52,sc:46,st:43},{year:2023,general:53,obc:50,sc:44,st:41}],
    books:["Arihant RRB JE Technical","RRB previous year papers","Lucent GK"],
    eligibility:"Diploma/B.Tech in relevant engineering. Age: 18–33.",
    tips:["Technical section has highest weightage","General Science basics are important","Previous papers are most important","Practice online mock tests"] },

  { id:"nda", name:"NDA", full:"National Defence Academy Examination", category:"Government", color:"#047857", icon:"⚔️", difficulty:"High", frequency:"Twice a year",
    syllabus:["Mathematics: Algebra, Calculus, Trigonometry, Statistics","General Ability: English, GK, Physics, Chemistry, History, Geography"],
    pattern:{duration:"5 hours (2 papers)",questions:"Paper I: 120, Paper II: 150",total:"900 marks",negative:"Yes (-0.33 per wrong)"},
    cutoff:[{year:2024,general:360,obc:340,sc:300,st:290},{year:2023,general:350,obc:330,sc:290,st:280}],
    books:["Pathfinder NDA/NA by Arihant","RS Aggarwal – Maths","Lucent GK","Previous Year NDA Papers"],
    eligibility:"Class 12 passed/appearing. Age: 16.5–19.5. Only unmarried males.",
    tips:["Maths paper needs strong basics","GK from last 6 months current affairs","Physical fitness equally important","SSB interview is the toughest part"] },

  { id:"capf", name:"UPSC CAPF", full:"Central Armed Police Forces Assistant Commandant", category:"Government", color:"#065f46", icon:"🛡️", difficulty:"High", frequency:"Once a year",
    syllabus:["General Ability & Intelligence","General Studies, Essay & Comprehension","Physical Standards + Medical"],
    pattern:{duration:"Paper I: 2hr | Paper II: 3hr",questions:"Paper I: 125 MCQs | Paper II: descriptive",total:"450 marks",negative:"Paper I: -0.33"},
    cutoff:[{year:2024,general:235,obc:220,sc:200,st:190},{year:2023,general:228,obc:214,sc:195,st:184}],
    books:["Arihant CAPF guide","Laxmikanth – Polity","Lucent GK","The Hindu newspaper"],
    eligibility:"Graduate. Age: 20–25.",
    tips:["Essay writing needs daily practice","Current affairs very important","Physical test is elimination round","Structured answers for descriptive paper"] },

  { id:"cds", name:"CDS", full:"Combined Defence Services Examination", category:"Government", color:"#166534", icon:"🎖️", difficulty:"High", frequency:"Twice a year",
    syllabus:["English","General Knowledge","Elementary Mathematics (for IMA/INA/AFA)"],
    pattern:{duration:"2 hours per paper",questions:"120 per paper",total:"300 marks",negative:"Yes (-0.33)"},
    cutoff:[{year:2024,general:120,obc:110,sc:95,st:90},{year:2023,general:115,obc:105,sc:90,st:85}],
    books:["Pathfinder CDS by Arihant","Lucent GK","RS Aggarwal Maths","Previous CDS papers"],
    eligibility:"Graduate (varies by service). Age: 19–24.",
    tips:["GK section is most important","English is moderate level","Maths only for IMA/INA/AFA","SSB interview needs personality development"] },

  { id:"upsc-ies", name:"UPSC IES", full:"Indian Engineering Services Examination", category:"Government", color:"#4f46e5", icon:"🔧", difficulty:"Very High", frequency:"Once a year",
    syllabus:["General Studies & Engineering Aptitude","Engineering Discipline Paper I & II (branch-specific)"],
    pattern:{duration:"Prelims: 4hr | Mains: descriptive",questions:"Prelims: 200 MCQs | Mains: 4 papers",total:"1000 marks",negative:"Prelims: -0.33"},
    cutoff:[{year:2024,general:450,obc:420,sc:380,st:365},{year:2023,general:440,obc:410,sc:370,st:355}],
    books:["Made Easy GATE/IES material","Standard engineering textbooks","Previous IES papers"],
    eligibility:"B.E/B.Tech in relevant discipline. Age: 21–30.",
    tips:["GATE preparation overlaps significantly","Technical knowledge must be very deep","General Studies paper needs separate prep","Interview carries significant weight"] },

  // ─── MANAGEMENT ───
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

  { id:"snap", name:"SNAP", full:"Symbiosis National Aptitude Test", category:"Management", color:"#be185d", icon:"📉", difficulty:"Moderate", frequency:"Once a year",
    syllabus:["General English","Analytical & Logical Reasoning","Quantitative, Data Interpretation & Data Sufficiency"],
    pattern:{duration:"60 minutes",questions:"60 MCQs",total:"60 marks",negative:"Yes (-25%)"},
    cutoff:[{year:2024,general:98,obc:95,sc:85,st:80},{year:2023,general:96,obc:93,sc:83,st:78}],
    books:["Arihant SNAP guide","Previous year SNAP papers","TIME/CL material"],
    eligibility:"Graduate with 50% marks.",
    tips:["Shorter exam — speed is key","Can attempt up to 3 times in a year","Accuracy very important","Logical reasoning has high weightage"] },

  { id:"mat", name:"MAT", full:"Management Aptitude Test", category:"Management", color:"#9d174d", icon:"💹", difficulty:"Moderate", frequency:"4 times a year",
    syllabus:["Language Comprehension","Mathematical Skills","Data Analysis & Sufficiency","Intelligence & Critical Reasoning","Indian & Global Environment"],
    pattern:{duration:"2.5 hours",questions:"200 MCQs",total:"200 marks",negative:"Yes (-0.25)"},
    cutoff:[{year:2024,general:80,obc:75,sc:65,st:60},{year:2023,general:78,obc:73,sc:63,st:58}],
    books:["Arihant MAT guide","RS Aggarwal Maths","Previous MAT papers"],
    eligibility:"Graduate from any discipline.",
    tips:["Easier than CAT/XAT","GK section needs current awareness","Can take multiple times","Good for Tier-2 MBA colleges"] },

  { id:"cmat", name:"CMAT", full:"Common Management Admission Test", category:"Management", color:"#831843", icon:"📋", difficulty:"Moderate", frequency:"Once a year",
    syllabus:["Quantitative Techniques & Data Interpretation","Logical Reasoning","Language Comprehension","General Awareness","Innovation & Entrepreneurship"],
    pattern:{duration:"3 hours",questions:"100 MCQs",total:"400 marks",negative:"Yes (-1)"},
    cutoff:[{year:2024,general:280,obc:260,sc:230,st:220},{year:2023,general:270,obc:250,sc:220,st:210}],
    books:["Arihant CMAT guide","Previous CMAT papers","Pearson CMAT"],
    eligibility:"Graduate with 50% marks.",
    tips:["NTA conducts this exam","Innovation section is unique","GK from last 12 months","Good for AICTE-approved colleges"] },

  // ─── LAW ───
  { id:"clat", name:"CLAT", full:"Common Law Admission Test", category:"Law", color:"#b45309", icon:"⚖️", difficulty:"High", frequency:"Once a year",
    syllabus:["English Language","Current Affairs & GK","Legal Reasoning","Logical Reasoning","Quantitative Techniques"],
    pattern:{duration:"2 hours",questions:"120 MCQs",total:"120 marks",negative:"Yes (-0.25)"},
    cutoff:[{year:2024,general:95,obc:82,sc:65,st:57},{year:2023,general:93,obc:80,sc:63,st:55}],
    books:["Arihant CLAT guide","AP Bhardwaj – Legal Aptitude","Previous year CLAT papers","The Hindu for Current Affairs"],
    eligibility:"Class 12 with min 45% marks (40% SC/ST).",
    tips:["Legal reasoning needs regular practice","Current affairs from last 12 months","Reading comprehension is key","No maths beyond Class 10"] },

  { id:"ailet", name:"AILET", full:"All India Law Entrance Test", category:"Law", color:"#92400e", icon:"🔨", difficulty:"High", frequency:"Once a year",
    syllabus:["English","General Knowledge & Current Affairs","Legal Aptitude","Reasoning","Elementary Mathematics"],
    pattern:{duration:"1.5 hours",questions:"150 MCQs",total:"150 marks",negative:"Yes (-0.25)"},
    cutoff:[{year:2024,general:105,obc:95,sc:80,st:72},{year:2023,general:102,obc:92,sc:77,st:69}],
    books:["Arihant AILET guide","Legal GK book","Previous AILET papers"],
    eligibility:"Class 12 with 50% marks. Age: Max 20 years.",
    tips:["Only for NLU Delhi admission","Tougher than CLAT","Legal GK needs dedicated study","Reading speed is very important"] },

  { id:"lsat", name:"LSAT India", full:"Law School Admission Test India", category:"Law", color:"#78350f", icon:"📜", difficulty:"High", frequency:"Once a year",
    syllabus:["Analytical Reasoning","Logical Reasoning (2 sections)","Reading Comprehension"],
    pattern:{duration:"2.5 hours",questions:"92 MCQs",total:"92 marks",negative:"No"},
    cutoff:[{year:2024,general:70,obc:63,sc:55,st:52},{year:2023,general:68,obc:61,sc:53,st:50}],
    books:["Official LSAT PrepTest books","Arihant LSAT India","Manhattan Prep LSAT"],
    eligibility:"Class 12 passed. No age limit.",
    tips:["No negative marking — attempt all","Analytical reasoning needs lots of practice","Reading speed is critical","No GK or current affairs"] },

  // ─── DESIGN ───
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

  { id:"uceed", name:"UCEED", full:"Undergraduate Common Entrance Examination for Design", category:"Design", color:"#5b21b6", icon:"✏️", difficulty:"High", frequency:"Once a year",
    syllabus:["Visualization & Spatial Ability","Observation & Design Sensitivity","Environmental & Social Awareness","Analytical & Logical Reasoning","Language & Creativity"],
    pattern:{duration:"3 hours",questions:"Part A: MCQ + NAT | Part B: Drawing",total:"300 marks",negative:"Yes for Part A MCQ"},
    cutoff:[{year:2024,general:160,obc:140,sc:110,st:105},{year:2023,general:155,obc:135,sc:105,st:100}],
    books:["UCEED previous year papers","Design drawing books","Spatial reasoning practice sets"],
    eligibility:"Class 12 passed. Age: Max 20 years (25 for SC/ST).",
    tips:["Drawing section is very important","Spatial visualization needs regular practice","Observe design in everyday life","No specific textbook — practice is key"] },

  // ─── SCIENCE / RESEARCH ───
  { id:"iit-jam", name:"IIT JAM", full:"Joint Admission Test for MSc", category:"Science", color:"#0891b2", icon:"🧪", difficulty:"High", frequency:"Once a year",
    syllabus:["Subject-specific (Physics/Chemistry/Maths/Biology/Geology/Economics)","Varies by paper chosen"],
    pattern:{duration:"3 hours",questions:"60 questions (MCQ + NAT + MSQ)",total:"100 marks",negative:"Yes for MCQ only"},
    cutoff:[{year:2024,general:20,obc:18,sc:10,st:10},{year:2023,general:19,obc:17,sc:9,st:9}],
    books:["BSc textbooks of chosen subject","Previous year JAM papers","GateForum/Made Easy material"],
    eligibility:"Bachelor's degree with relevant subject. Final year eligible.",
    tips:["Subject mastery is key","Previous years are most important","NAT questions need calculation speed","Choose paper wisely"] },

  { id:"csir-net", name:"CSIR NET", full:"CSIR National Eligibility Test", category:"Science", color:"#0e7490", icon:"🔭", difficulty:"Very High", frequency:"Twice a year",
    syllabus:["Life Sciences / Physical Sciences / Chemical Sciences / Mathematical Sciences / Earth Sciences"],
    pattern:{duration:"3 hours",questions:"Part A: 20, Part B+C: varies",total:"200 marks",negative:"Yes (varies by part)"},
    cutoff:[{year:2024,general:55,obc:49,sc:36,st:36},{year:2023,general:53,obc:47,sc:34,st:34}],
    books:["Standard BSc/MSc textbooks","CSIR NET previous papers","Trueman's Biology for Life Sciences"],
    eligibility:"MSc or equivalent with 55% marks.",
    tips:["Part A (General Aptitude) is same for all","Part C needs deep conceptual knowledge","Previous papers are the best resource","Focus on high-weightage topics"] },

  // ─── TEACHING ───
  { id:"ctet", name:"CTET", full:"Central Teacher Eligibility Test", category:"Teaching", color:"#16a34a", icon:"📚", difficulty:"Moderate", frequency:"Twice a year",
    syllabus:["Child Development & Pedagogy","Language I (compulsory)","Language II (compulsory)","Mathematics (Paper I) / Science (Paper II)","Environmental Studies (Paper I) / Social Studies (Paper II)"],
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

  { id:"tet", name:"State TET", full:"State Teacher Eligibility Test", category:"Teaching", color:"#14532d", icon:"🏫", difficulty:"Easy", frequency:"Once a year (varies by state)",
    syllabus:["Child Development & Pedagogy","Language I & II","Mathematics","Environmental Studies / Science / Social Studies"],
    pattern:{duration:"2.5 hours",questions:"150 MCQs",total:"150 marks",negative:"No"},
    cutoff:[{year:2024,general:90,obc:82,sc:75,st:75},{year:2023,general:88,obc:80,sc:73,st:73}],
    books:["State-specific TET books","Child Development guides","NCERT Class 1-8 books"],
    eligibility:"D.El.Ed or B.Ed with Class 12/Graduation.",
    tips:["Similar to CTET but state-specific","Qualify to teach in state government schools","No negative marking","NCERT books are the base"] },

  // ─── HOTEL MANAGEMENT ───
  { id:"nchmct", name:"NCHMCT JEE", full:"National Council for Hotel Management Joint Entrance Examination", category:"Hospitality", color:"#c2410c", icon:"🏨", difficulty:"Moderate", frequency:"Once a year",
    syllabus:["Numerical Ability & Analytical Aptitude","Reasoning & Logical Deduction","General Knowledge & Current Affairs","English Language","Aptitude for Service Sector"],
    pattern:{duration:"3 hours",questions:"200 MCQs",total:"200 marks",negative:"Yes (-0.25)"},
    cutoff:[{year:2024,general:130,obc:115,sc:95,st:88},{year:2023,general:125,obc:110,sc:90,st:83}],
    books:["Arihant NCHMCT JEE guide","Previous year papers","GK capsule"],
    eligibility:"Class 12 passed. Age: Max 22 years (25 for SC/ST).",
    tips:["Aptitude for service sector is unique section","GK from hospitality industry","English is very important","Practice previous papers"] },

  // ─── ARCHITECTURE ───
  { id:"nata", name:"NATA", full:"National Aptitude Test in Architecture", category:"Architecture", color:"#0369a1", icon:"🏛️", difficulty:"High", frequency:"Twice a year",
    syllabus:["Drawing & Composition","Visual Perception & Cognition","Mathematics (Class 11 & 12)","General Aptitude"],
    pattern:{duration:"3 hours",questions:"Part A: Drawing | Part B: MCQ",total:"200 marks",negative:"No"},
    cutoff:[{year:2024,general:110,obc:98,sc:82,st:75},{year:2023,general:105,obc:94,sc:78,st:71}],
    books:["NATA previous year papers","Drawing & sketching practice books","B.Arch entrance guide by Arihant"],
    eligibility:"Class 12 with Maths. Min 50% marks.",
    tips:["Drawing is the most important component","Practice perspective drawing","Maths up to Class 12 level","Observe architecture around you"] },
];

const categories = ["All","Engineering","Medical","Government","Management","Law","Design","Science","Teaching","Hospitality","Architecture"];

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap');
  * { margin:0; padding:0; box-sizing:border-box; }
  :root { --cream:#fafaf8; --dark:#1a1a2e; --gold:#c9a84c; --gold-light:#e8c97e; --ink:#2c2c3e; --muted:#8b8b9a; --border:rgba(44,44,62,0.1); }
  @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
  @keyframes slideDown { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }
  .card-hover{transition:all 0.3s cubic-bezier(0.34,1.56,0.64,1)}
  .card-hover:hover{transform:translateY(-4px);box-shadow:0 20px 60px rgba(44,44,62,0.12)!important}
  ::-webkit-scrollbar{width:6px} ::-webkit-scrollbar-track{background:#f0ede8} ::-webkit-scrollbar-thumb{background:#c9a84c;border-radius:3px}
`;

export default function Examnest() {
  const [page, setPage] = useState("home");
  const [selected, setSelected] = useState(null);
  const [tab, setTab] = useState("syllabus");
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [aboutPage, setAboutPage] = useState(false);

  const filtered = exams.filter(e =>
    (category === "All" || e.category === category) &&
    (e.name.toLowerCase().includes(search.toLowerCase()) || e.full.toLowerCase().includes(search.toLowerCase()))
  );

  const openExam = (exam) => { setSelected(exam); setPage("detail"); setTab("syllabus"); window.scrollTo(0,0); };
  const goHome = () => { setPage("home"); setSelected(null); setAboutPage(false); };

  if (aboutPage) return <AboutPage goHome={goHome} />;
  if (page === "detail" && selected) return <DetailPage exam={selected} goHome={goHome} tab={tab} setTab={setTab} />;

  return (
    <>
      <style>{globalStyles}</style>
      <div style={{minHeight:"100vh",background:"var(--cream)",fontFamily:"'DM Sans',sans-serif",color:"var(--ink)"}}>
        <nav style={{position:"sticky",top:0,zIndex:100,background:"rgba(250,250,248,0.92)",backdropFilter:"blur(12px)",borderBottom:"1px solid var(--border)",padding:"0 24px"}}>
          <div style={{maxWidth:1100,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",height:64}}>
            <div onClick={goHome} style={{cursor:"pointer",display:"flex",alignItems:"center",gap:10}}>
              <div style={{width:36,height:36,background:"var(--dark)",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>📚</div>
              <div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:20,fontWeight:700,color:"var(--dark)",lineHeight:1}}>ExamNest</div>
                <div style={{fontSize:10,color:"var(--gold)",letterSpacing:"0.15em",textTransform:"uppercase"}}>Exam Guidance</div>
              </div>
            </div>
            <div style={{display:"flex",gap:8}}>
              <button onClick={goHome} style={{padding:"8px 16px",background:"none",border:"none",cursor:"pointer",color:"var(--muted)",fontSize:14,fontFamily:"inherit",fontWeight:500}}>Exams</button>
              <button onClick={()=>setAboutPage(true)} style={{padding:"8px 16px",background:"none",border:"none",cursor:"pointer",color:"var(--muted)",fontSize:14,fontFamily:"inherit",fontWeight:500}}>About</button>
            </div>
          </div>
        </nav>

        <div style={{background:"var(--dark)",color:"#fff",padding:"72px 24px 64px",textAlign:"center",position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at 30% 50%,rgba(201,168,76,0.15) 0%,transparent 60%),radial-gradient(ellipse at 70% 50%,rgba(99,102,241,0.1) 0%,transparent 60%)"}} />
          <div style={{maxWidth:700,margin:"0 auto",position:"relative",animation:"fadeUp 0.7s ease forwards"}}>
            <div style={{display:"inline-block",background:"rgba(201,168,76,0.15)",border:"1px solid rgba(201,168,76,0.3)",borderRadius:20,padding:"6px 16px",fontSize:12,color:"var(--gold-light)",letterSpacing:"0.12em",textTransform:"uppercase",marginBottom:24}}>
              ✦ {exams.length}+ Exams · All Categories Covered
            </div>
            <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(36px,6vw,64px)",fontWeight:900,lineHeight:1.1,marginBottom:20}}>
              Every Exam.<br/>
              <span style={{background:"linear-gradient(135deg,var(--gold),var(--gold-light))",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>One Place.</span>
            </h1>
            <p style={{fontSize:18,color:"rgba(255,255,255,0.65)",lineHeight:1.7,marginBottom:40,maxWidth:520,margin:"0 auto 40px"}}>
              JEE, NEET, UPSC, CAT, CLAT, GATE & more — syllabus, cutoffs, books & strategy for every Indian exam.
            </p>
            <div style={{position:"relative",maxWidth:480,margin:"0 auto"}}>
              <span style={{position:"absolute",left:16,top:"50%",transform:"translateY(-50%)",fontSize:18,color:"rgba(255,255,255,0.4)"}}>🔍</span>
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search any exam..."
                style={{width:"100%",padding:"16px 20px 16px 48px",background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.15)",borderRadius:14,color:"#fff",fontSize:16,fontFamily:"inherit",outline:"none"}} />
            </div>
          </div>
          <div style={{display:"flex",justifyContent:"center",gap:"clamp(24px,5vw,80px)",marginTop:56,position:"relative"}}>
            {[[`${exams.length}+`,"Exams Covered"],["11","Categories"],["100%","Free Access"]].map(([n,l])=>(
              <div key={l} style={{textAlign:"center"}}>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:32,fontWeight:700,color:"var(--gold-light)"}}>{n}</div>
                <div style={{fontSize:12,color:"rgba(255,255,255,0.5)",letterSpacing:"0.1em",textTransform:"uppercase"}}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{maxWidth:1100,margin:"0 auto",padding:"48px 24px"}}>
          <div style={{display:"flex",gap:8,marginBottom:40,flexWrap:"wrap",alignItems:"center"}}>
            <span style={{fontSize:13,color:"var(--muted)",marginRight:4,fontWeight:500}}>Filter:</span>
            {categories.map(c=>(
              <button key={c} onClick={()=>setCategory(c)} style={{
                padding:"7px 14px",borderRadius:20,border:"1px solid",cursor:"pointer",fontSize:12,fontFamily:"inherit",fontWeight:500,transition:"all 0.2s",
                background:category===c?"var(--dark)":"transparent",
                color:category===c?"#fff":"var(--muted)",
                borderColor:category===c?"var(--dark)":"var(--border)",
              }}>{c} ({c==="All"?exams.length:exams.filter(e=>e.category===c).length})</button>
            ))}
          </div>

          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(270px,1fr))",gap:18}}>
            {filtered.map((exam,i)=>(
              <div key={exam.id} onClick={()=>openExam(exam)} className="card-hover" style={{
                background:"#fff",borderRadius:18,overflow:"hidden",cursor:"pointer",
                border:"1px solid var(--border)",boxShadow:"0 2px 20px rgba(44,44,62,0.06)",
                animation:`fadeUp 0.5s ease forwards ${Math.min(i*0.04,0.4)}s`,opacity:0,
              }}>
                <div style={{height:4,background:exam.color}} />
                <div style={{padding:20}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
                    <div style={{fontSize:32}}>{exam.icon}</div>
                    <span style={{background:exam.color+"18",color:exam.color,fontSize:10,fontWeight:600,padding:"3px 9px",borderRadius:10}}>{exam.category}</span>
                  </div>
                  <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:18,fontWeight:700,color:"var(--dark)",marginBottom:4}}>{exam.name}</h2>
                  <p style={{fontSize:11,color:"var(--muted)",marginBottom:12,lineHeight:1.4}}>{exam.full}</p>
                  <div style={{display:"flex",gap:14,marginBottom:12}}>
                    <div>
                      <div style={{fontSize:9,color:"var(--muted)",textTransform:"uppercase",letterSpacing:"0.1em"}}>Difficulty</div>
                      <div style={{fontSize:12,fontWeight:600,color:"var(--ink)",marginTop:2}}>{exam.difficulty}</div>
                    </div>
                    <div>
                      <div style={{fontSize:9,color:"var(--muted)",textTransform:"uppercase",letterSpacing:"0.1em"}}>Frequency</div>
                      <div style={{fontSize:12,fontWeight:600,color:"var(--ink)",marginTop:2}}>{exam.frequency}</div>
                    </div>
                  </div>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                    <div style={{fontSize:11,color:"var(--muted)"}}>{exam.pattern.total}</div>
                    <div style={{color:exam.color,fontWeight:600,fontSize:12}}>Explore →</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length===0&&(
            <div style={{textAlign:"center",padding:"80px 0",color:"var(--muted)"}}>
              <div style={{fontSize:48,marginBottom:16}}>🔍</div>
              <div style={{fontSize:18,fontWeight:500}}>No exams found for "{search}"</div>
              <div style={{fontSize:14,marginTop:8}}>Try searching JEE, NEET, UPSC, CAT, CLAT, GATE...</div>
            </div>
          )}
        </div>
        <Footer setAboutPage={setAboutPage} />
      </div>
    </>
  );
}

function DetailPage({exam,goHome,tab,setTab}){
  const tabs=["syllabus","pattern","cutoff","books","tips"];
  return(
    <>
      <style>{globalStyles}</style>
      <div style={{minHeight:"100vh",background:"var(--cream)",fontFamily:"'DM Sans',sans-serif",color:"var(--ink)"}}>
        <nav style={{position:"sticky",top:0,zIndex:100,background:"rgba(250,250,248,0.92)",backdropFilter:"blur(12px)",borderBottom:"1px solid var(--border)",padding:"0 24px"}}>
          <div style={{maxWidth:1100,margin:"0 auto",display:"flex",alignItems:"center",gap:16,height:64}}>
            <button onClick={goHome} style={{background:"none",border:"1px solid var(--border)",borderRadius:8,padding:"6px 12px",cursor:"pointer",fontSize:13,color:"var(--muted)",fontFamily:"inherit"}}>← Back</button>
            <div onClick={goHome} style={{cursor:"pointer",fontFamily:"'Playfair Display',serif",fontSize:18,fontWeight:700,color:"var(--dark)"}}>ExamNest</div>
          </div>
        </nav>
        <div style={{background:exam.color,color:"#fff",padding:"48px 24px 56px"}}>
          <div style={{maxWidth:1100,margin:"0 auto",animation:"fadeUp 0.5s ease forwards"}}>
            <div style={{fontSize:14,opacity:0.8,marginBottom:8}}>{exam.category}</div>
            <div style={{display:"flex",alignItems:"center",gap:20,flexWrap:"wrap"}}>
              <div style={{fontSize:56}}>{exam.icon}</div>
              <div>
                <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(26px,5vw,46px)",fontWeight:900,lineHeight:1.1}}>{exam.name}</h1>
                <p style={{opacity:0.85,fontSize:14,marginTop:6}}>{exam.full}</p>
              </div>
            </div>
            <div style={{display:"flex",gap:24,marginTop:24,flexWrap:"wrap"}}>
              {[["Difficulty",exam.difficulty],["Frequency",exam.frequency],["Total Marks",exam.pattern.total],["Negative Marking",exam.pattern.negative]].map(([l,v])=>(
                <div key={l}>
                  <div style={{fontSize:10,opacity:0.7,textTransform:"uppercase",letterSpacing:"0.1em"}}>{l}</div>
                  <div style={{fontSize:14,fontWeight:600,marginTop:4}}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{background:"#fff",borderBottom:"1px solid var(--border)"}}>
          <div style={{maxWidth:1100,margin:"0 auto",padding:"12px 24px",display:"flex",alignItems:"center",gap:10}}>
            <span style={{fontSize:16}}>✅</span>
            <span style={{fontSize:13,color:"var(--ink)"}}><strong>Eligibility:</strong> {exam.eligibility}</span>
          </div>
        </div>
        <div style={{background:"#fff",borderBottom:"1px solid var(--border)",position:"sticky",top:64,zIndex:50}}>
          <div style={{maxWidth:1100,margin:"0 auto",padding:"0 24px",display:"flex",gap:0,overflowX:"auto"}}>
            {tabs.map(t=>(
              <button key={t} onClick={()=>setTab(t)} style={{
                padding:"13px 16px",background:"none",border:"none",cursor:"pointer",
                fontSize:13,fontFamily:"inherit",fontWeight:tab===t?600:400,
                color:tab===t?exam.color:"var(--muted)",
                borderBottom:`2px solid ${tab===t?exam.color:"transparent"}`,
                textTransform:"capitalize",whiteSpace:"nowrap",transition:"all 0.2s",
              }}>{t==="pattern"?"Exam Pattern":t==="cutoff"?"Cutoff":t.charAt(0).toUpperCase()+t.slice(1)}</button>
            ))}
          </div>
        </div>
        <div style={{maxWidth:1100,margin:"0 auto",padding:"32px 24px 80px",animation:"slideDown 0.3s ease forwards"}}>
          {tab==="syllabus"&&(
            <div>
              <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:24,fontWeight:700,marginBottom:18}}>Syllabus Overview</h2>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(250px,1fr))",gap:14}}>
                {exam.syllabus.map((s,i)=>{
                  const[subject,...topics]=s.split(": ");
                  return(
                    <div key={i} style={{background:"#fff",borderRadius:14,padding:18,border:"1px solid var(--border)",borderLeft:`4px solid ${exam.color}`}}>
                      <h3 style={{fontWeight:700,fontSize:14,marginBottom:8,color:"var(--dark)"}}>{subject}</h3>
                      <p style={{fontSize:12,color:"var(--muted)",lineHeight:1.6}}>{topics.join(": ")}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {tab==="pattern"&&(
            <div>
              <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:24,fontWeight:700,marginBottom:18}}>Exam Pattern</h2>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(170px,1fr))",gap:14}}>
                {Object.entries(exam.pattern).map(([k,v])=>(
                  <div key={k} style={{background:"#fff",borderRadius:14,padding:18,border:"1px solid var(--border)",textAlign:"center"}}>
                    <div style={{fontSize:10,color:"var(--muted)",textTransform:"uppercase",letterSpacing:"0.12em",marginBottom:10}}>{k.replace(/([A-Z])/g," $1").trim()}</div>
                    <div style={{fontFamily:"'Playfair Display',serif",fontSize:18,fontWeight:700,color:exam.color}}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {tab==="cutoff"&&(
            <div>
              <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:24,fontWeight:700,marginBottom:18}}>Previous Year Cutoffs</h2>
              <div style={{background:"#fff",borderRadius:14,border:"1px solid var(--border)",overflow:"hidden"}}>
                <table style={{width:"100%",borderCollapse:"collapse",fontSize:14}}>
                  <thead>
                    <tr style={{background:exam.color+"15"}}>
                      {["Year","General","OBC","SC","ST"].map(h=>(
                        <th key={h} style={{padding:"12px 16px",textAlign:"left",fontWeight:600,color:"var(--dark)",fontSize:12}}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {exam.cutoff.map((row,i)=>(
                      <tr key={i} style={{borderTop:"1px solid var(--border)"}}>
                        <td style={{padding:"12px 16px",fontWeight:700,color:exam.color}}>{row.year}</td>
                        <td style={{padding:"12px 16px"}}>{row.general}</td>
                        <td style={{padding:"12px 16px"}}>{row.obc}</td>
                        <td style={{padding:"12px 16px"}}>{row.sc}</td>
                        <td style={{padding:"12px 16px"}}>{row.st}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p style={{fontSize:11,color:"var(--muted)",marginTop:10}}>* Figures are indicative. Always verify from official sources.</p>
            </div>
          )}
          {tab==="books"&&(
            <div>
              <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:24,fontWeight:700,marginBottom:18}}>Recommended Books</h2>
              <div style={{display:"grid",gap:10}}>
                {exam.books.map((book,i)=>(
                  <div key={i} style={{background:"#fff",borderRadius:12,padding:"14px 18px",border:"1px solid var(--border)",display:"flex",alignItems:"center",gap:12}}>
                    <div style={{width:30,height:30,background:exam.color+"18",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,flexShrink:0}}>📖</div>
                    <div style={{fontSize:14,fontWeight:500,color:"var(--ink)"}}>{book}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {tab==="tips"&&(
            <div>
              <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:24,fontWeight:700,marginBottom:18}}>Preparation Tips</h2>
              <div style={{display:"grid",gap:10}}>
                {exam.tips.map((tip,i)=>(
                  <div key={i} style={{background:"#fff",borderRadius:12,padding:"16px 18px",border:"1px solid var(--border)",display:"flex",gap:12,alignItems:"flex-start"}}>
                    <div style={{width:28,height:28,background:exam.color,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:700,fontSize:13,flexShrink:0}}>{i+1}</div>
                    <p style={{fontSize:14,color:"var(--ink)",lineHeight:1.7,paddingTop:3}}>{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <Footer setAboutPage={()=>{}} />
      </div>
    </>
  );
}

function AboutPage({goHome}){
  return(
    <>
      <style>{globalStyles}</style>
      <div style={{minHeight:"100vh",background:"var(--cream)",fontFamily:"'DM Sans',sans-serif"}}>
        <nav style={{position:"sticky",top:0,zIndex:100,background:"rgba(250,250,248,0.92)",backdropFilter:"blur(12px)",borderBottom:"1px solid var(--border)",padding:"0 24px"}}>
          <div style={{maxWidth:1100,margin:"0 auto",display:"flex",alignItems:"center",gap:16,height:64}}>
            <button onClick={goHome} style={{background:"none",border:"1px solid var(--border)",borderRadius:8,padding:"6px 12px",cursor:"pointer",fontSize:13,color:"var(--muted)",fontFamily:"inherit"}}>← Back</button>
            <div onClick={goHome} style={{cursor:"pointer",fontFamily:"'Playfair Display',serif",fontSize:18,fontWeight:700,color:"var(--dark)"}}>ExamNest</div>
          </div>
        </nav>
        <div style={{maxWidth:720,margin:"0 auto",padding:"72px 24px"}}>
          <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:48,fontWeight:900,color:"var(--dark)",marginBottom:24}}>About ExamNest</h1>
          {[
            ["Who We Are","ExamNest is an educational platform created to help students find accurate, clear information about all competitive exams across India — from JEE to UPSC to CLAT and beyond."],
            ["What We Do","We provide detailed syllabus, exam pattern, cutoff marks, eligibility criteria, preparation strategies, and recommended books for all major Indian exams — all in one place."],
            ["Our Mission","To make exam-related information easily accessible to every student in India, so they can prepare with confidence and clarity without wasting time across multiple websites."],
            ["Why ExamNest?","One platform. All exams. Free forever. No ads, no confusion — just clean, reliable exam guidance for every Indian student regardless of their background."],
          ].map(([title,text],i)=>(
            <div key={title} style={{marginBottom:36,animation:`fadeUp 0.6s ease forwards ${i*0.1+0.2}s`,opacity:0}}>
              <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:700,color:"var(--dark)",marginBottom:10}}>{title}</h2>
              <p style={{fontSize:15,color:"var(--muted)",lineHeight:1.8}}>{text}</p>
            </div>
          ))}
        </div>
        <Footer setAboutPage={()=>{}} />
      </div>
    </>
  );
}

function Footer({setAboutPage}){
  return(
    <footer style={{background:"var(--dark)",color:"rgba(255,255,255,0.5)",padding:"36px 24px",textAlign:"center"}}>
      <div style={{fontFamily:"'Playfair Display',serif",fontSize:20,color:"#fff",marginBottom:14}}>ExamNest</div>
      <div style={{display:"flex",justifyContent:"center",gap:20,flexWrap:"wrap",marginBottom:16,fontSize:13}}>
        {["About Us","Privacy Policy","Disclaimer","Contact"].map(link=>(
          <span key={link} onClick={()=>link==="About Us"&&setAboutPage(true)}
            style={{cursor:"pointer",transition:"color 0.2s"}}
            onMouseEnter={e=>e.target.style.color="#e8c97e"}
            onMouseLeave={e=>e.target.style.color="rgba(255,255,255,0.5)"}
          >{link}</span>
        ))}
      </div>
      <div style={{fontSize:12}}>© 2026 ExamNest · {exams.length}+ Exams · Complete Exam Guidance for All Indian Students</div>
    </footer>
  );
}
