import { useState, useRef, useEffect } from "react";

const STORAGE_KEY = "examnest_planner_v2";
function saveToStorage(data) { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch(e) {} }
function loadFromStorage() { try { const d = localStorage.getItem(STORAGE_KEY); return d ? JSON.parse(d) : null; } catch(e) { return null; } }

const exams = [
  // ═══ ENGINEERING ═══
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

  { id:"bitsat", name:"BITSAT", full:"Birla Institute of Technology & Science Admission Test", category:"Engineering", color:"#fb923c", icon:"🔭", difficulty:"High", diffScore:3, frequency:"Once a year", seats:"~2,000", salary:"₹8-20 LPA", duration:"4 years",
    syllabus:["Physics: Class 11 & 12","Chemistry: Class 11 & 12","Mathematics: Class 11 & 12","English Proficiency & Logical Reasoning"],
    topics:{"Physics":["Mechanics","Electrostatics","Magnetism","Optics","Modern Physics"],"Chemistry":["Physical Chemistry","Organic Chemistry","Inorganic Chemistry"],"Mathematics":["Algebra","Calculus","Trigonometry","Probability"],"English & LR":["Grammar","Vocabulary","Logical Reasoning","Analogies"]},
    pattern:{duration:"3 hours",questions:"130 MCQs",total:"390 marks",negative:"Yes (-1 per wrong)"},
    cutoff:[{year:2024,general:310,obc:290,sc:270,st:260},{year:2023,general:300,obc:280,sc:260,st:250}],
    books:["NCERT XI & XII all subjects","Arihant BITSAT guide","Previous year BITSAT papers"],
    eligibility:"Class 12 with PCM. Min 75% aggregate.",
    tips:["Speed is key — 130 questions in 180 min","English & LR are easy scoring sections","Practice online mock tests","No sectional time limit"] },

  { id:"gate", name:"GATE", full:"Graduate Aptitude Test in Engineering", category:"Engineering", color:"#f59e0b", icon:"🔬", difficulty:"High", diffScore:3, frequency:"Once a year", seats:"Varies by PSU", salary:"₹6-12 LPA", duration:"2 years (M.Tech)",
    syllabus:["Core Engineering Subject (branch-specific)","Engineering Mathematics","General Aptitude (Verbal + Numerical)"],
    topics:{"Engineering Mathematics":["Linear Algebra","Calculus","Differential Equations","Probability","Numerical Methods"],"General Aptitude":["Verbal Ability","Numerical Ability","Reasoning"],"Core Subject":["Data Structures","Algorithms","Operating Systems","Computer Networks","Database"]},
    pattern:{duration:"3 hours",questions:"65 questions",total:"100 marks",negative:"Yes (MCQs only)"},
    cutoff:[{year:2024,general:31.7,obc:28.5,sc:21.1,st:21.1},{year:2023,general:30.0,obc:27.0,sc:20.0,st:20.0}],
    books:["Made Easy / ACE Academy notes","Standard textbooks by subject","Previous 15 years GATE papers","RS Aggarwal – Aptitude"],
    eligibility:"B.E/B.Tech/B.Sc(Research) 3rd year or passed.",
    tips:["Analyze syllabus weightage first","Engineering Maths is high scoring","Practice numerical answer type questions","Solve subject-wise previous year questions"] },

  { id:"viteee", name:"VITEEE", full:"VIT Engineering Entrance Examination", category:"Engineering", color:"#fbbf24", icon:"🏫", difficulty:"Moderate", diffScore:2, frequency:"Once a year", seats:"~15,000", salary:"₹5-15 LPA", duration:"4 years",
    syllabus:["Physics: Class 11 & 12","Chemistry: Class 11 & 12","Mathematics/Biology","English & Aptitude"],
    topics:{"Physics":["Mechanics","Electrostatics","Optics","Modern Physics"],"Chemistry":["Physical Chemistry","Organic Chemistry","Inorganic Chemistry"],"Mathematics":["Algebra","Calculus","Geometry"]},
    pattern:{duration:"2.5 hours",questions:"125 MCQs",total:"125 marks",negative:"No"},
    cutoff:[{year:2024,general:80,obc:70,sc:60,st:55},{year:2023,general:75,obc:65,sc:55,st:50}],
    books:["NCERT XI & XII","VIT previous year papers","Arihant VITEEE guide"],
    eligibility:"Class 12 with PCM/PCB. Min 60% marks.",
    tips:["No negative marking — attempt all","NCERT sufficient for most topics","Speed matters in this exam","English section is easy — don't skip"] },

  { id:"srmjeee", name:"SRMJEEE", full:"SRM Joint Engineering Entrance Examination", category:"Engineering", color:"#e879f9", icon:"🎓", difficulty:"Moderate", diffScore:2, frequency:"Once a year", seats:"~10,000", salary:"₹5-12 LPA", duration:"4 years",
    syllabus:["Physics","Chemistry","Mathematics/Biology","English & Aptitude"],
    topics:{"Physics":["Mechanics","Thermodynamics","Optics"],"Chemistry":["Physical Chemistry","Organic Chemistry"],"Mathematics":["Algebra","Calculus","Trigonometry"]},
    pattern:{duration:"2.5 hours",questions:"125 MCQs",total:"125 marks",negative:"No"},
    cutoff:[{year:2024,general:70,obc:60,sc:50,st:45},{year:2023,general:65,obc:55,sc:45,st:40}],
    books:["NCERT XI & XII","SRM previous year papers"],
    eligibility:"Class 12 with PCM/PCB. Min 60% marks.",
    tips:["No negative marking — attempt all","Focus on NCERT basics","Good college option for engineering"] },

  { id:"comedk", name:"COMEDK UGET", full:"Consortium of Medical Engineering & Dental Colleges Karnataka", category:"Engineering", color:"#a78bfa", icon:"🏗️", difficulty:"Moderate", diffScore:2, frequency:"Once a year", seats:"~20,000", salary:"₹4-12 LPA", duration:"4 years",
    syllabus:["Physics: Class 11 & 12","Chemistry: Class 11 & 12","Mathematics: Class 11 & 12"],
    topics:{"Physics":["Mechanics","Thermodynamics","Optics","Electrostatics"],"Chemistry":["Physical Chemistry","Organic Chemistry","Inorganic Chemistry"],"Mathematics":["Algebra","Calculus","Coordinate Geometry"]},
    pattern:{duration:"3 hours",questions:"180 MCQs",total:"180 marks",negative:"No"},
    cutoff:[{year:2024,general:120,obc:105,sc:90,st:85},{year:2023,general:115,obc:100,sc:85,st:80}],
    books:["NCERT XI & XII","Previous COMEDK papers","Arihant guide"],
    eligibility:"Class 12 with PCM. Min 45% marks.",
    tips:["No negative marking — attempt all","For Karnataka engineering colleges","NCERT is sufficient","Practice timed mocks"] },

  { id:"mhtcet", name:"MHT CET", full:"Maharashtra Common Entrance Test", category:"Engineering", color:"#f97316", icon:"🦁", difficulty:"Moderate", diffScore:2, frequency:"Once a year", seats:"~1 lakh+", salary:"₹4-10 LPA", duration:"4 years",
    syllabus:["Physics: Maharashtra State Board Syllabus","Chemistry: Maharashtra State Board Syllabus","Mathematics: Maharashtra State Board Syllabus"],
    topics:{"Physics":["Mechanics","Thermodynamics","Optics","Electrostatics","Modern Physics"],"Chemistry":["Physical Chemistry","Organic Chemistry","Inorganic Chemistry"],"Mathematics":["Algebra","Calculus","Coordinate Geometry","Trigonometry"]},
    pattern:{duration:"3 hours",questions:"150 MCQs",total:"200 marks",negative:"No"},
    cutoff:[{year:2024,general:93,obc:88,sc:76,st:71},{year:2023,general:91,obc:86,sc:74,st:69}],
    books:["Maharashtra State Board Books XI & XII","MHT CET previous papers","Target MHT CET by Std. Maths"],
    eligibility:"Class 12 with PCM/PCB from Maharashtra board or CBSE. Min 50% marks.",
    tips:["Maharashtra board syllabus is key","No negative marking","State board books are most important","Solve last 5 years papers"] },

  { id:"kcet", name:"KCET", full:"Karnataka Common Entrance Test", category:"Engineering", color:"#dc2626", icon:"🌴", difficulty:"Moderate", diffScore:2, frequency:"Once a year", seats:"~60,000+", salary:"₹4-10 LPA", duration:"4 years",
    syllabus:["Physics: Karnataka PU Board Syllabus","Chemistry: Karnataka PU Board Syllabus","Mathematics: Karnataka PU Board Syllabus","Biology: Karnataka PU Board Syllabus"],
    topics:{"Physics":["Mechanics","Thermodynamics","Optics","Electrostatics"],"Chemistry":["Physical Chemistry","Organic Chemistry","Inorganic Chemistry"],"Mathematics":["Algebra","Calculus","Coordinate Geometry"]},
    pattern:{duration:"80 min per subject",questions:"60 per subject",total:"180 marks",negative:"No"},
    cutoff:[{year:2024,general:150,obc:135,sc:105,st:98},{year:2023,general:145,obc:130,sc:100,st:93}],
    books:["Karnataka PU Board Books","KCET previous papers","Arihant KCET guide"],
    eligibility:"Class 12 from Karnataka board or equivalent. Must be Karnataka domicile.",
    tips:["Karnataka PU board books are primary resource","No negative marking","Biology needed for medical stream","Register for CET cell early"] },

  { id:"wbjee", name:"WBJEE", full:"West Bengal Joint Entrance Examination", category:"Engineering", color:"#0ea5e9", icon:"🐯", difficulty:"Moderate", diffScore:2, frequency:"Once a year", seats:"~40,000+", salary:"₹4-10 LPA", duration:"4 years",
    syllabus:["Physics: West Bengal HS Syllabus","Chemistry: West Bengal HS Syllabus","Mathematics: West Bengal HS Syllabus"],
    topics:{"Physics":["Mechanics","Electrostatics","Optics","Modern Physics"],"Chemistry":["Physical Chemistry","Organic Chemistry","Inorganic Chemistry"],"Mathematics":["Algebra","Calculus","Coordinate Geometry","Trigonometry"]},
    pattern:{duration:"4 hours (2 papers)",questions:"155 MCQs",total:"200 marks",negative:"Yes (-0.25 for Category 1)"},
    cutoff:[{year:2024,general:155,obc:140,sc:120,st:112},{year:2023,general:150,obc:135,sc:115,st:107}],
    books:["WB HS Board Books","WBJEE previous papers","Arihant WBJEE guide"],
    eligibility:"Class 12 with PCM from WB board. Min 45% marks.",
    tips:["WB board books are most important","Has negative marking — be careful","Maths paper is the differentiator","Practice previous 10 years papers"] },

  { id:"gujcet", name:"GUJCET", full:"Gujarat Common Entrance Test", category:"Engineering", color:"#16a34a", icon:"🦁", difficulty:"Easy", diffScore:1, frequency:"Once a year", seats:"~50,000+", salary:"₹4-10 LPA", duration:"4 years",
    syllabus:["Physics: Gujarat Board Syllabus","Chemistry: Gujarat Board Syllabus","Mathematics/Biology: Gujarat Board Syllabus"],
    topics:{"Physics":["Mechanics","Electrostatics","Optics","Modern Physics"],"Chemistry":["Physical Chemistry","Organic Chemistry","Inorganic Chemistry"],"Mathematics":["Algebra","Calculus","Geometry"]},
    pattern:{duration:"3 hours",questions:"120 MCQs",total:"120 marks",negative:"Yes (-0.25)"},
    cutoff:[{year:2024,general:90,obc:82,sc:68,st:62},{year:2023,general:87,obc:79,sc:65,st:59}],
    books:["Gujarat Board Books XI & XII","GUJCET previous papers"],
    eligibility:"Class 12 with PCM/PCB from Gujarat board.",
    tips:["Gujarat board books are sufficient","Focus on Class 12 syllabus mostly","Previous papers are very helpful","State engineering colleges admission"] },

  // ═══ MEDICAL ═══
  { id:"neet-ug", name:"NEET UG", full:"National Eligibility cum Entrance Test UG", category:"Medical", color:"#10b981", icon:"🩺", difficulty:"Very High", diffScore:4, frequency:"Once a year", seats:"~1.08 lakh", salary:"₹6-20 LPA", duration:"5.5 years",
    syllabus:["Physics: Class 11 & 12 NCERT","Chemistry: Physical, Organic, Inorganic (NCERT)","Biology: Botany & Zoology (NCERT XI & XII)"],
    topics:{"Biology":["Cell Biology","Genetics","Ecology","Human Physiology","Plant Physiology","Reproduction","Evolution","Biotechnology"],"Chemistry":["Physical Chemistry","Organic Chemistry","Inorganic Chemistry","Biomolecules"],"Physics":["Mechanics","Thermodynamics","Optics","Modern Physics","Electrostatics"]},
    pattern:{duration:"3 hours 20 min",questions:"200 (attempt 180)",total:"720 marks",negative:"Yes (-1 per wrong)"},
    cutoff:[{year:2024,general:720,obc:137,sc:107,st:107},{year:2023,general:720,obc:129,sc:100,st:100}],
    books:["NCERT Biology XI & XII","DC Pandey – Physics for NEET","OP Tandon – Physical Chemistry","MTG Objective NCERT at Your Fingertips"],
    eligibility:"Class 12 with PCB. Min age 17.",
    tips:["NCERT is the bible — every line matters","Biology carries 360/720 marks","Revise with spaced repetition","Attempt full mocks weekly"] },

  { id:"neet-pg", name:"NEET PG", full:"National Eligibility cum Entrance Test Postgraduate", category:"Medical", color:"#059669", icon:"👨‍⚕️", difficulty:"Very High", diffScore:4, frequency:"Once a year", seats:"~50,000", salary:"₹12-40 LPA", duration:"3 years (MD/MS)",
    syllabus:["All 19 MBBS subjects","Pre-clinical: Anatomy, Physiology, Biochemistry","Para-clinical: Pathology, Pharmacology, Microbiology","Clinical: Medicine, Surgery, OBG, Pediatrics, Psychiatry"],
    topics:{"Medicine":["Cardiology","Gastroenterology","Neurology","Nephrology","Endocrinology"],"Surgery":["General Surgery","Orthopedics","ENT","Ophthalmology"],"OBG":["Obstetrics","Gynecology","Family Planning"],"Pathology":["General Pathology","Systemic Pathology","Hematology"]},
    pattern:{duration:"3.5 hours",questions:"200 MCQs",total:"800 marks",negative:"Yes (-25% per wrong)"},
    cutoff:[{year:2024,general:376,obc:338,sc:319,st:319},{year:2023,general:360,obc:324,sc:306,st:306}],
    books:["Robbins – Pathology","Harrison – Medicine","Dams/PrepLadder notes","Previous year NEET PG papers"],
    eligibility:"MBBS degree with 1 year internship completed.",
    tips:["Subject-wise revision is key","High-yield: Medicine, Surgery, OBG","Use question banks daily","Revise 3-4 times before exam"] },

  { id:"aiims-pg", name:"AIIMS PG", full:"All India Institute of Medical Sciences PG Entrance", category:"Medical", color:"#34d399", icon:"🏥", difficulty:"Extremely High", diffScore:5, frequency:"Twice a year", seats:"~700", salary:"₹15-50 LPA", duration:"3 years",
    syllabus:["All MBBS subjects at advanced level","Research methodology","Biostatistics","Recent advances in medicine"],
    topics:{"Clinical":["Medicine","Surgery","OBG","Pediatrics","Psychiatry"],"Basic Sciences":["Anatomy","Physiology","Biochemistry","Pathology","Pharmacology"],"Research":["Biostatistics","Research Methodology","Recent Advances"]},
    pattern:{duration:"1.5 hours",questions:"100 MCQs",total:"100 marks",negative:"Yes (-1/3)"},
    cutoff:[{year:2024,general:75,obc:67,sc:60,st:60},{year:2023,general:72,obc:65,sc:58,st:58}],
    books:["AIIMS previous year papers","Dams study material","Across – AIIMS specific MCQs"],
    eligibility:"MBBS from recognised institution.",
    tips:["Image-based questions are very common","Focus on recent advances","AIIMS has unique question style","Practice previous 10 years papers"] },

  { id:"jipmer", name:"JIPMER PG", full:"Jawaharlal Institute Postgraduate Medical Education & Research", category:"Medical", color:"#6ee7b7", icon:"💊", difficulty:"High", diffScore:3, frequency:"Twice a year", seats:"~200", salary:"₹12-35 LPA", duration:"3 years",
    syllabus:["All MBBS subjects","Clinical Sciences","Basic Sciences"],
    topics:{"Clinical":["Medicine","Surgery","OBG","Pediatrics"],"Basic Sciences":["Anatomy","Physiology","Pathology","Pharmacology"]},
    pattern:{duration:"2.5 hours",questions:"250 MCQs",total:"250 marks",negative:"No"},
    cutoff:[{year:2024,general:180,obc:165,sc:145,st:138},{year:2023,general:175,obc:160,sc:140,st:133}],
    books:["JIPMER previous year papers","Standard MBBS textbooks","PrepLadder JIPMER notes"],
    eligibility:"MBBS from recognised institution.",
    tips:["No negative marking — attempt all","Pondicherry domicile gets extra seats","Tougher than NEET PG for some subjects","Basic sciences are very important"] },

  { id:"fmge", name:"FMGE", full:"Foreign Medical Graduate Examination", category:"Medical", color:"#86efac", icon:"🌍", difficulty:"High", diffScore:3, frequency:"Twice a year", seats:"All eligible FMGs", salary:"₹6-20 LPA", duration:"N/A",
    syllabus:["All 19 MBBS subjects","Same as NEET PG syllabus broadly"],
    topics:{"Clinical":["Medicine","Surgery","OBG","Pediatrics","Psychiatry","Dermatology"],"Basic Sciences":["Anatomy","Physiology","Biochemistry","Pathology","Pharmacology","Microbiology"]},
    pattern:{duration:"3.5 hours",questions:"300 MCQs",total:"300 marks",negative:"No"},
    cutoff:[{year:2024,general:150,obc:150,sc:150,st:150},{year:2023,general:150,obc:150,sc:150,st:150}],
    books:["FMGE previous year papers","Across FMGE book","Dams FMGE material"],
    eligibility:"MBBS from foreign medical college. Must pass to practice in India.",
    tips:["No negative marking — attempt all","Minimum 50% required to pass","Basic sciences are most important","Practice question banks daily"] },

  // ═══ GOVERNMENT / CIVIL SERVICES ═══
  { id:"upsc-cse", name:"UPSC CSE", full:"Civil Services Examination", category:"Government", color:"#6366f1", icon:"🏛️", difficulty:"Extremely High", diffScore:5, frequency:"Once a year", seats:"~1,000", salary:"₹56,100+ (IAS)", duration:"1-2 years prep",
    syllabus:["Prelims: GS Paper I, CSAT (Paper II)","Mains: Essay, GS I–IV, Optional (2 papers)","Interview: Personality Test (275 marks)"],
    topics:{"History":["Ancient India","Medieval India","Modern India","World History","Art & Culture"],"Geography":["Physical Geography","Indian Geography","World Geography","Environment"],"Polity":["Constitution","Parliament","Judiciary","Federalism","Governance"],"Economy":["Indian Economy","Budget","Planning","Agriculture","Industry"],"Current Affairs":["National","International","Science & Tech","Environment","Social Issues"]},
    pattern:{duration:"Prelims: 4hr | Mains: 9 papers",questions:"Prelims 200 MCQs | Mains descriptive",total:"2025 marks (Mains + Interview)",negative:"Prelims: -0.33 per wrong"},
    cutoff:[{year:2024,general:104,obc:98,sc:88,st:84},{year:2023,general:101,obc:95,sc:85,st:81}],
    books:["NCERT VI–XII – Foundation","Laxmikanth – Indian Polity","Spectrum – Modern Indian History","Economic Survey + India Yearbook"],
    eligibility:"Graduate from recognised university. Age: 21–32 (Gen).",
    tips:["Start with NCERTs before standard books","Make concise notes from Day 1","Read The Hindu / Indian Express daily","Choose optional subject wisely"] },

  { id:"upsc-ies", name:"UPSC IES/ESE", full:"Indian Engineering Services Examination", category:"Government", color:"#4f46e5", icon:"🔧", difficulty:"Very High", diffScore:4, frequency:"Once a year", seats:"~500", salary:"₹56,100+ (Group A)", duration:"6 months-1 year prep",
    syllabus:["General Studies & Engineering Aptitude","Engineering Discipline Paper I & II (branch-specific)","Objective + Subjective papers"],
    topics:{"General Studies":["Current Affairs","Engineering Mathematics","General Principles of Design","Disaster Management"],"Technical":["Core Engineering subjects based on discipline","Design & Manufacturing","Materials"]},
    pattern:{duration:"Prelims: 4hr | Mains: descriptive",questions:"Prelims: 200 MCQs | Mains: 4 papers",total:"1000 marks",negative:"Prelims: -0.33"},
    cutoff:[{year:2024,general:450,obc:420,sc:380,st:365},{year:2023,general:440,obc:410,sc:370,st:355}],
    books:["Made Easy GATE/IES material","Standard engineering textbooks","Previous IES papers"],
    eligibility:"B.E/B.Tech in relevant discipline. Age: 21–30.",
    tips:["GATE preparation overlaps significantly","Technical knowledge must be very deep","General Studies needs separate preparation","Interview carries significant weight"] },

  { id:"upsc-nda", name:"NDA", full:"National Defence Academy Examination", category:"Government", color:"#047857", icon:"⚔️", difficulty:"High", diffScore:3, frequency:"Twice a year", seats:"~400", salary:"₹56,100+ (Lieutenant)", duration:"3 years (NDA) + 1 year (IMA)",
    syllabus:["Mathematics: Algebra, Calculus, Trigonometry, Statistics, Matrices","General Ability: English, General Knowledge, Physics, Chemistry, History, Geography, Current Events"],
    topics:{"Mathematics":["Algebra","Trigonometry","Calculus","Statistics","Matrices","Analytical Geometry"],"General Ability":["English Grammar","Physics","Chemistry","History","Geography","Current Affairs"]},
    pattern:{duration:"5 hours (2 papers)",questions:"Paper I: 120, Paper II: 150",total:"900 marks",negative:"Yes (-0.33 per wrong)"},
    cutoff:[{year:2024,general:360,obc:340,sc:300,st:290},{year:2023,general:350,obc:330,sc:290,st:280}],
    books:["Pathfinder NDA/NA by Arihant","RS Aggarwal – Maths","Lucent GK","Previous Year NDA Papers"],
    eligibility:"Class 12 passed/appearing. Age: 16.5–19.5. Only unmarried males.",
    tips:["Maths paper needs strong basics","GK from last 6 months current affairs","Physical fitness test is also important","SSB interview is the toughest part"] },

  { id:"upsc-capf", name:"UPSC CAPF", full:"Central Armed Police Forces Assistant Commandant", category:"Government", color:"#065f46", icon:"🛡️", difficulty:"High", diffScore:3, frequency:"Once a year", seats:"~350", salary:"₹56,100+ (Gr. A)", duration:"6-9 months prep",
    syllabus:["General Ability & Intelligence","General Studies, Essay & Comprehension","Physical Standards + Medical Test"],
    topics:{"General Ability":["Reasoning","Data Interpretation","Spatial Ability","Current Affairs"],"General Studies":["History","Geography","Polity","Economy","Science & Tech"],"Essay & Comprehension":["Essay Writing","Précis Writing","Comprehension"]},
    pattern:{duration:"Paper I: 2hr | Paper II: 3hr",questions:"Paper I: 125 MCQs | Paper II: descriptive",total:"450 marks",negative:"Paper I: -0.33"},
    cutoff:[{year:2024,general:235,obc:220,sc:200,st:190},{year:2023,general:228,obc:214,sc:195,st:184}],
    books:["Arihant CAPF guide","Laxmikanth – Polity","Lucent GK","The Hindu newspaper"],
    eligibility:"Graduate. Age: 20–25.",
    tips:["Essay writing needs daily practice","Current affairs very important","Physical test is elimination round","Descriptive paper needs structured answers"] },

  { id:"upsc-cds", name:"CDS", full:"Combined Defence Services Examination", category:"Government", color:"#166534", icon:"🎖️", difficulty:"High", diffScore:3, frequency:"Twice a year", seats:"~400+", salary:"₹56,100+ (Lieutenant)", duration:"6 months prep",
    syllabus:["English: Comprehension, Grammar","General Knowledge: History, Geography, Polity, Economy, Science, Current Affairs","Elementary Mathematics: (for IMA/INA/AFA only)"],
    topics:{"English":["Reading Comprehension","Grammar","Vocabulary","Sentence Correction"],"General Knowledge":["History","Geography","Polity","Economy","Science","Current Affairs"],"Mathematics":["Number System","Algebra","Geometry","Trigonometry","Statistics"]},
    pattern:{duration:"2 hours per paper",questions:"120 per paper",total:"300 marks",negative:"Yes (-0.33)"},
    cutoff:[{year:2024,general:120,obc:110,sc:95,st:90},{year:2023,general:115,obc:105,sc:90,st:85}],
    books:["Pathfinder CDS by Arihant","Lucent GK","RS Aggarwal Maths","Previous CDS papers"],
    eligibility:"Graduate (varies by service). Age: 19–24.",
    tips:["GK section is most important","English is moderate level","Maths only for IMA/INA/AFA","SSB interview needs personality development"] },

  { id:"ssc-cgl", name:"SSC CGL", full:"Staff Selection Commission Combined Graduate Level", category:"Government", color:"#14b8a6", icon:"📋", difficulty:"Moderate", diffScore:2, frequency:"Once a year", seats:"~10,000+", salary:"₹25,000-₹1.5 LPA", duration:"6 months prep",
    syllabus:["General Intelligence & Reasoning","General Awareness","Quantitative Aptitude","English Comprehension"],
    topics:{"Reasoning":["Analogy","Series","Coding-Decoding","Puzzles","Blood Relations","Direction","Syllogism"],"Quantitative Aptitude":["Number System","Percentage","Profit & Loss","Ratio","Time & Work","Geometry","Trigonometry"],"General Awareness":["Current Affairs","History","Geography","Polity","Economy","Science"],"English":["Grammar","Vocabulary","Comprehension","Error Detection"]},
    pattern:{duration:"Tier I: 60 min | Tier II: 2.5 hr",questions:"Tier I: 100 | Tier II: varies",total:"Tier I: 200 | Tier II: 800",negative:"Yes"},
    cutoff:[{year:2024,general:145,obc:138,sc:128,st:120},{year:2023,general:142,obc:135,sc:125,st:117}],
    books:["Lucent GK","RS Aggarwal – Maths & Reasoning","SP Bakshi – English","Kiran SSC CGL Previous Papers"],
    eligibility:"Graduate from recognised university. Age: 18–32.",
    tips:["Current affairs from last 6 months","Speed & accuracy in Quant","English grammar rules are key","Daily 2 hours practice tests"] },

  { id:"ssc-chsl", name:"SSC CHSL", full:"SSC Combined Higher Secondary Level", category:"Government", color:"#0d9488", icon:"📄", difficulty:"Moderate", diffScore:2, frequency:"Once a year", seats:"~5,000+", salary:"₹19,900-₹92,300", duration:"4-5 months prep",
    syllabus:["General Intelligence","General Awareness","Quantitative Aptitude","English Language"],
    topics:{"Reasoning":["Analogy","Puzzles","Series","Coding-Decoding","Matrix"],"Quantitative":["Arithmetic","Algebra","Geometry","Statistics"],"GK":["History","Geography","Science","Current Affairs"],"English":["Grammar","Vocabulary","Comprehension"]},
    pattern:{duration:"60 minutes",questions:"100 MCQs",total:"200 marks",negative:"Yes (-0.5)"},
    cutoff:[{year:2024,general:165,obc:158,sc:145,st:138},{year:2023,general:160,obc:152,sc:140,st:133}],
    books:["Lucent GK","Arihant SSC CHSL","Kiran Previous Papers"],
    eligibility:"Class 12 passed. Age: 18–27.",
    tips:["Similar to CGL but 12th level","Focus on speed","Typing test for final selection","GK is very important"] },

  { id:"ssc-mts", name:"SSC MTS", full:"SSC Multi Tasking Staff", category:"Government", color:"#2dd4bf", icon:"🗂️", difficulty:"Easy", diffScore:1, frequency:"Once a year", seats:"~8,000+", salary:"₹18,000-₹56,900", duration:"3 months prep",
    syllabus:["Numerical & Mathematical Ability","Reasoning Ability & Problem Solving","General Awareness","English Language & Comprehension"],
    topics:{"Mathematics":["Number System","Arithmetic","Basic Algebra","Geometry"],"Reasoning":["Analogies","Series","Coding-Decoding","Spatial Ability"],"GK":["History","Geography","Science","Current Affairs"],"English":["Grammar","Vocabulary","Comprehension"]},
    pattern:{duration:"90 minutes",questions:"90 MCQs",total:"270 marks",negative:"Yes (-1)"},
    cutoff:[{year:2024,general:110,obc:100,sc:90,st:85},{year:2023,general:105,obc:95,sc:85,st:80}],
    books:["Arihant SSC MTS","Lucent GK","RS Aggarwal Basic Maths"],
    eligibility:"Class 10 passed. Age: 18–25.",
    tips:["Easiest SSC exam","Focus on Class 10 level maths","GK from last 3 months","English basics are sufficient"] },

  { id:"ssc-je", name:"SSC JE", full:"SSC Junior Engineer", category:"Government", color:"#0891b2", icon:"🔩", difficulty:"Moderate", diffScore:2, frequency:"Once a year", seats:"~2,000+", salary:"₹35,400-₹1.12 LPA", duration:"4-6 months prep",
    syllabus:["General Intelligence & Reasoning","General Awareness","Technical Paper (Civil/Electrical/Mechanical)"],
    topics:{"Technical Civil":["Strength of Materials","Fluid Mechanics","Soil Mechanics","Structural Analysis","Construction Materials"],"Technical Electrical":["Electrical Machines","Power Systems","Control Systems","Circuit Theory"],"General":["Reasoning","GK","Current Affairs"]},
    pattern:{duration:"Paper I: 2hr | Paper II: 2hr",questions:"Paper I: 200 MCQs | Paper II: 300 marks",total:"500 marks",negative:"Paper I: -0.25"},
    cutoff:[{year:2024,general:155,obc:145,sc:128,st:120},{year:2023,general:150,obc:140,sc:124,st:116}],
    books:["Arihant SSC JE Technical","Made Easy SSC JE","SSC JE previous papers"],
    eligibility:"Diploma or B.E/B.Tech in relevant discipline. Age: 18–32.",
    tips:["Technical paper carries most marks","Paper II is descriptive — practice writing","Previous papers are most useful","Focus on core technical subjects"] },

  { id:"ibps-po", name:"IBPS PO", full:"IBPS Probationary Officer", category:"Government", color:"#3b82f6", icon:"🏦", difficulty:"High", diffScore:3, frequency:"Once a year", seats:"~4,000+", salary:"₹40,000-₹1.5 LPA", duration:"6 months prep",
    syllabus:["Reasoning Ability","Quantitative Aptitude","English Language","General Awareness (Banking)","Computer Knowledge"],
    topics:{"Reasoning":["Puzzles","Seating Arrangement","Syllogism","Coding-Decoding","Blood Relations","Inequalities"],"Quantitative Aptitude":["Data Interpretation","Number Series","Quadratic Equations","Arithmetic","Data Sufficiency"],"English":["Reading Comprehension","Error Detection","Fill in Blanks","Para Jumbles","Cloze Test"],"Banking GK":["Banking Awareness","Financial Awareness","Current Affairs","Static GK"]},
    pattern:{duration:"Prelims: 1hr | Mains: 3hr",questions:"Prelims: 100 | Mains: 155",total:"Prelims: 100 | Mains: 225",negative:"Yes (-0.25)"},
    cutoff:[{year:2024,general:47,obc:44,sc:38,st:35},{year:2023,general:45,obc:42,sc:36,st:33}],
    books:["RS Aggarwal – Quantitative Aptitude","Arihant Reasoning","Manorama Yearbook","Kiran IBPS PO Papers"],
    eligibility:"Graduate from recognised university. Age: 20–30.",
    tips:["Banking GK is very important","High accuracy in Prelims","Mains has descriptive English","Practice data interpretation daily"] },

  { id:"sbi-po", name:"SBI PO", full:"State Bank of India Probationary Officer", category:"Government", color:"#2563eb", icon:"🏧", difficulty:"High", diffScore:3, frequency:"Once a year", seats:"~2,000+", salary:"₹41,960-₹1.5 LPA", duration:"6 months prep",
    syllabus:["Reasoning & Computer Aptitude","Data Analysis & Interpretation","General/Economy/Banking Awareness","English Language"],
    topics:{"Reasoning":["Puzzles","Directions","Syllogism","Input-Output","Blood Relations"],"Data Analysis":["Data Interpretation","Data Sufficiency","Missing Number","Approximation"],"Banking GK":["Banking Awareness","Economy","Financial Market","Current Affairs"],"English":["Reading Comprehension","Vocabulary","Grammar","Para Jumbles"]},
    pattern:{duration:"Prelims: 1hr | Mains: 3hr",questions:"Prelims: 100 | Mains: 155+descriptive",total:"Prelims: 100 | Mains: 250",negative:"Yes (-0.25)"},
    cutoff:[{year:2024,general:52,obc:49,sc:43,st:40},{year:2023,general:50,obc:47,sc:41,st:38}],
    books:["SBI PO previous papers","The Hindu for banking news","Arihant SBI PO guide"],
    eligibility:"Graduate. Age: 21–30.",
    tips:["Toughest bank exam in India","Economy awareness very important","Descriptive writing needs daily practice","Group discussion + interview are crucial"] },

  { id:"ibps-clerk", name:"IBPS Clerk", full:"IBPS Clerical Cadre", category:"Government", color:"#1d4ed8", icon:"💼", difficulty:"Moderate", diffScore:2, frequency:"Once a year", seats:"~6,000+", salary:"₹19,900-₹47,920", duration:"4-5 months prep",
    syllabus:["Reasoning Ability","Numerical Ability","English Language","General/Financial Awareness","Computer Aptitude"],
    topics:{"Reasoning":["Puzzles","Seating Arrangement","Syllogism","Coding-Decoding"],"Numerical":["Data Interpretation","Number Series","Arithmetic","Simplification"],"English":["Reading Comprehension","Error Detection","Cloze Test"],"GK":["Banking Awareness","Current Affairs","Static GK"]},
    pattern:{duration:"Prelims: 1hr | Mains: 2.5hr",questions:"Prelims: 100 | Mains: 190",total:"Prelims: 100 | Mains: 200",negative:"Yes (-0.25)"},
    cutoff:[{year:2024,general:69,obc:65,sc:58,st:54},{year:2023,general:67,obc:63,sc:56,st:52}],
    books:["RS Aggarwal Maths","Arihant Reasoning","Kiran IBPS Clerk Papers"],
    eligibility:"Graduate. Age: 20–28.",
    tips:["Speed is crucial in Prelims","Mains has sectional cutoffs","Computer awareness is easy scoring","Practice puzzles and syllogisms daily"] },

  { id:"sbi-clerk", name:"SBI Clerk", full:"State Bank of India Junior Associate", category:"Government", color:"#1e40af", icon:"🏪", difficulty:"Moderate", diffScore:2, frequency:"Once a year", seats:"~8,000+", salary:"₹20,928-₹47,920", duration:"4-5 months prep",
    syllabus:["Reasoning Ability & Computer Aptitude","General/Financial Awareness","Quantitative Aptitude","English Language"],
    topics:{"Reasoning":["Puzzles","Syllogism","Coding-Decoding","Directions"],"Quantitative":["Data Interpretation","Arithmetic","Simplification"],"English":["Reading Comprehension","Grammar","Vocabulary"],"GK":["Banking Awareness","Current Affairs","Static GK"]},
    pattern:{duration:"Prelims: 1hr | Mains: 2.5hr",questions:"Prelims: 100 | Mains: 190",total:"Prelims: 100 | Mains: 200",negative:"Yes (-0.25)"},
    cutoff:[{year:2024,general:72,obc:68,sc:60,st:56},{year:2023,general:70,obc:66,sc:58,st:54}],
    books:["SBI Clerk previous papers","RS Aggarwal Maths","Arihant English"],
    eligibility:"Graduate. Age: 20–28.",
    tips:["SBI clerk has more vacancies than IBPS","Focus on speed and accuracy","Banking GK is very important","State-wise cutoffs vary significantly"] },

  { id:"rrb-ntpc", name:"RRB NTPC", full:"Railway Recruitment Board Non-Technical Popular Categories", category:"Government", color:"#7c3aed", icon:"🚂", difficulty:"Moderate", diffScore:2, frequency:"Every 2-3 years", seats:"~35,000+", salary:"₹19,900-₹35,400", duration:"4-5 months prep",
    syllabus:["Mathematics","General Intelligence & Reasoning","General Awareness"],
    topics:{"Mathematics":["Number System","Decimals","Fractions","Algebra","Geometry","Trigonometry","Statistics"],"Reasoning":["Analogies","Completion of Number","Coding-Decoding","Mathematical Operations","Syllogism"],"GK":["Current Events","Indian Geography","Indian History","Indian Polity","Railways"]},
    pattern:{duration:"90 minutes",questions:"100 MCQs",total:"100 marks",negative:"Yes (-1/3)"},
    cutoff:[{year:2024,general:65,obc:61,sc:55,st:52},{year:2023,general:63,obc:59,sc:53,st:50}],
    books:["Arihant RRB NTPC","Lucent GK","RS Aggarwal Maths","RRB Previous Papers"],
    eligibility:"Class 12 or Graduate (varies by post). Age: 18–33.",
    tips:["GK is most important section","Railway-specific GK is frequently asked","Maths up to Class 10 level","Speed matters — practice timed tests"] },

  { id:"rrb-je", name:"RRB JE", full:"Railway Recruitment Board Junior Engineer", category:"Government", color:"#6d28d9", icon:"🚃", difficulty:"Moderate", diffScore:2, frequency:"Every 2-3 years", seats:"~14,000+", salary:"₹35,400-₹1.12 LPA", duration:"5-6 months prep",
    syllabus:["Mathematics","General Intelligence","General Awareness","General Science","Technical Subjects (branch-specific)"],
    topics:{"Mathematics":["Number System","Algebra","Geometry","Trigonometry"],"General Science":["Physics","Chemistry","Life Sciences"],"Technical":["Core engineering subjects based on discipline"],"GK":["Current Affairs","Indian History","Geography"]},
    pattern:{duration:"90 minutes",questions:"100 MCQs",total:"100 marks",negative:"Yes (-1/3)"},
    cutoff:[{year:2024,general:55,obc:52,sc:46,st:43},{year:2023,general:53,obc:50,sc:44,st:41}],
    books:["Arihant RRB JE Technical","RRB previous year papers","Lucent GK"],
    eligibility:"Diploma/B.Tech in relevant engineering. Age: 18–33.",
    tips:["Technical section has highest weightage","General Science basics are important","Previous papers are most important resource","Practice online mock tests"] },

  { id:"rrb-group-d", name:"RRB Group D", full:"Railway Recruitment Board Group D", category:"Government", color:"#5b21b6", icon:"🚆", difficulty:"Easy", diffScore:1, frequency:"Every 2-3 years", seats:"~1 lakh+", salary:"₹18,000-₹56,900", duration:"3-4 months prep",
    syllabus:["Mathematics","General Intelligence & Reasoning","General Science","General Awareness & Current Affairs"],
    topics:{"Mathematics":["Number System","Arithmetic","Algebra","Basic Geometry"],"Reasoning":["Analogies","Series","Coding-Decoding","Syllogism"],"Science":["Physics","Chemistry","Biology"],"GK":["Current Affairs","History","Geography","Polity"]},
    pattern:{duration:"90 minutes",questions:"100 MCQs",total:"100 marks",negative:"Yes (-1/3)"},
    cutoff:[{year:2024,general:52,obc:48,sc:42,st:39},{year:2023,general:49,obc:45,sc:39,st:36}],
    books:["Arihant RRB Group D","Lucent GK","Kiran Railway Group D"],
    eligibility:"Class 10 passed. Age: 18–33.",
    tips:["Largest recruitment in Railways","Class 10 level is sufficient","Physical test (PET) is elimination round","Science section needs good preparation"] },

  // ═══ MANAGEMENT ═══
  { id:"cat", name:"CAT", full:"Common Admission Test", category:"Management", color:"#ec4899", icon:"📊", difficulty:"High", diffScore:3, frequency:"Once a year", seats:"~5,000 (IIMs)", salary:"₹15-50 LPA", duration:"2 years (MBA)",
    syllabus:["VARC: Reading Comprehension, Para Summary, Para Jumbles","DILR: Data Interpretation, Logical Reasoning","QA: Arithmetic, Algebra, Geometry, Number System"],
    topics:{"VARC":["Reading Comprehension","Para Summary","Para Jumbles","Odd Sentence Out","Critical Reasoning"],"DILR":["Data Interpretation","Logical Reasoning","Puzzles","Arrangements","Games & Tournaments"],"QA":["Arithmetic","Algebra","Geometry","Number System","Modern Maths"]},
    pattern:{duration:"2 hours",questions:"66 questions",total:"198 marks",negative:"Yes (-1 per wrong MCQ)"},
    cutoff:[{year:2024,general:99,obc:97,sc:90,st:85},{year:2023,general:99,obc:96,sc:88,st:83}],
    books:["Arun Sharma – QA & DI","Verbal Ability by Arun Sharma","TIME/CL study material","Previous year CAT papers"],
    eligibility:"Graduate with min 50% marks (45% SC/ST). Final year students eligible.",
    tips:["Accuracy > Speed in this exam","VARC: Read editorials daily","DILR: Practice set-based questions","Attempt 3-4 mocks per week from August"] },

  { id:"xat", name:"XAT", full:"Xavier Aptitude Test", category:"Management", color:"#db2777", icon:"📈", difficulty:"High", diffScore:3, frequency:"Once a year", seats:"~1,000 (XLRI)", salary:"₹20-50 LPA", duration:"2 years (MBA)",
    syllabus:["Verbal & Logical Ability","Decision Making","Quantitative Ability & Data Interpretation","General Knowledge"],
    topics:{"VARC":["Reading Comprehension","Vocabulary","Critical Reasoning","Logical Ability"],"Decision Making":["Business Decisions","Ethical Dilemmas","Analytical Reasoning","Situational Analysis"],"QA & DI":["Arithmetic","Algebra","Data Interpretation","Data Sufficiency"],"GK":["Current Affairs","Business GK","Economics"]},
    pattern:{duration:"3.5 hours",questions:"75 + 25 GK",total:"75 marks + GK",negative:"Yes (-0.25)"},
    cutoff:[{year:2024,general:95,obc:90,sc:80,st:75},{year:2023,general:93,obc:88,sc:78,st:73}],
    books:["XAT Decision Making by Arihant","CAT/XAT previous papers","TIME XAT material"],
    eligibility:"Graduate from recognised university.",
    tips:["Decision Making is unique to XAT","Essay writing is part of XLRI selection","GK section has no negative marking","XAT is harder than CAT in reasoning"] },

  { id:"snap", name:"SNAP", full:"Symbiosis National Aptitude Test", category:"Management", color:"#be185d", icon:"📉", difficulty:"Moderate", diffScore:2, frequency:"Once a year (3 attempts)", seats:"~3,000 (Symbiosis)", salary:"₹8-25 LPA", duration:"2 years (MBA)",
    syllabus:["General English","Analytical & Logical Reasoning","Quantitative, Data Interpretation & Data Sufficiency"],
    topics:{"English":["Reading Comprehension","Grammar","Vocabulary","Para Jumbles"],"Reasoning":["Logical Reasoning","Analytical Ability","Data Sufficiency"],"QA & DI":["Arithmetic","Algebra","Data Interpretation","Number Series"]},
    pattern:{duration:"60 minutes",questions:"60 MCQs",total:"60 marks",negative:"Yes (-25%)"},
    cutoff:[{year:2024,general:98,obc:95,sc:85,st:80},{year:2023,general:96,obc:93,sc:83,st:78}],
    books:["Arihant SNAP guide","Previous year SNAP papers","TIME/CL material"],
    eligibility:"Graduate with 50% marks.",
    tips:["Shorter exam — speed is key","Can attempt up to 3 times in a year","Accuracy very important due to negative marking","Logical reasoning has high weightage"] },

  { id:"mat", name:"MAT", full:"Management Aptitude Test", category:"Management", color:"#9d174d", icon:"💹", difficulty:"Moderate", diffScore:2, frequency:"4 times a year", seats:"Varies by college", salary:"₹6-20 LPA", duration:"2 years (MBA)",
    syllabus:["Language Comprehension","Mathematical Skills","Data Analysis & Sufficiency","Intelligence & Critical Reasoning","Indian & Global Environment"],
    topics:{"Language Comprehension":["Reading Comprehension","Grammar","Vocabulary","Verbal Ability"],"Mathematical Skills":["Arithmetic","Algebra","Geometry","Data Interpretation"],"Reasoning":["Critical Reasoning","Logical Deduction","Visual Reasoning"],"GK":["Indian Economy","Business GK","Current Affairs"]},
    pattern:{duration:"2.5 hours",questions:"200 MCQs",total:"200 marks",negative:"Yes (-0.25)"},
    cutoff:[{year:2024,general:80,obc:75,sc:65,st:60},{year:2023,general:78,obc:73,sc:63,st:58}],
    books:["Arihant MAT guide","RS Aggarwal Maths","Previous MAT papers"],
    eligibility:"Graduate from any discipline.",
    tips:["Easier than CAT/XAT","Indian & Global Environment needs GK","Can take multiple times in a year","Good option for Tier-2 MBA colleges"] },

  { id:"cmat", name:"CMAT", full:"Common Management Admission Test", category:"Management", color:"#831843", icon:"📋", difficulty:"Moderate", diffScore:2, frequency:"Once a year", seats:"Varies by AICTE colleges", salary:"₹6-18 LPA", duration:"2 years (MBA)",
    syllabus:["Quantitative Techniques & Data Interpretation","Logical Reasoning","Language Comprehension","General Awareness","Innovation & Entrepreneurship"],
    topics:{"Quantitative":["Arithmetic","Algebra","Data Interpretation","Statistics"],"Reasoning":["Logical Reasoning","Analytical Ability","Critical Thinking"],"Language":["Reading Comprehension","Grammar","Vocabulary"],"GK & Innovation":["Current Affairs","Business GK","Entrepreneurship"]},
    pattern:{duration:"3 hours",questions:"100 MCQs",total:"400 marks",negative:"Yes (-1)"},
    cutoff:[{year:2024,general:280,obc:260,sc:230,st:220},{year:2023,general:270,obc:250,sc:220,st:210}],
    books:["Arihant CMAT guide","Previous CMAT papers","Pearson CMAT"],
    eligibility:"Graduate with 50% marks.",
    tips:["NTA conducts this exam","Innovation section is unique","GK from last 12 months","Good for AICTE-approved colleges"] },

  { id:"nmat", name:"NMAT", full:"NMIMS Management Aptitude Test", category:"Management", color:"#c026d3", icon:"📐", difficulty:"Moderate", diffScore:2, frequency:"Once a year (3 attempts)", seats:"~600 (NMIMS)", salary:"₹12-30 LPA", duration:"2 years (MBA)",
    syllabus:["Language Skills","Quantitative Skills","Logical Reasoning"],
    topics:{"Language Skills":["Reading Comprehension","Grammar","Vocabulary","Para Completion"],"Quantitative":["Arithmetic","Algebra","Geometry","Data Interpretation"],"Logical Reasoning":["Deductive Reasoning","Critical Reasoning","Analytical Ability"]},
    pattern:{duration:"2 hours",questions:"108 MCQs",total:"108 marks",negative:"No"},
    cutoff:[{year:2024,general:218,obc:210,sc:195,st:190},{year:2023,general:215,obc:207,sc:192,st:187}],
    books:["Arihant NMAT guide","Official NMAT practice tests","Previous NMAT papers"],
    eligibility:"Graduate with 50% marks.",
    tips:["No negative marking — attempt all","Can retake up to 3 times","Best score considered for admission","Adaptive test — each question matters"] },

  // ═══ LAW ═══
  { id:"clat", name:"CLAT", full:"Common Law Admission Test", category:"Law", color:"#b45309", icon:"⚖️", difficulty:"High", diffScore:3, frequency:"Once a year", seats:"~2,500 (NLUs)", salary:"₹6-25 LPA", duration:"5 years (LLB)",
    syllabus:["English Language","Current Affairs & GK","Legal Reasoning","Logical Reasoning","Quantitative Techniques"],
    topics:{"English":["Reading Comprehension","Vocabulary","Grammar","Critical Reasoning"],"Legal Reasoning":["Legal Principles","Legal Maxims","Constitutional Law","Torts","Contracts"],"Current Affairs":["National","International","Legal Affairs","Important Judgements"],"Logical Reasoning":["Analogy","Syllogism","Assumptions","Conclusions"]},
    pattern:{duration:"2 hours",questions:"120 MCQs",total:"120 marks",negative:"Yes (-0.25)"},
    cutoff:[{year:2024,general:95,obc:82,sc:65,st:57},{year:2023,general:93,obc:80,sc:63,st:55}],
    books:["Arihant CLAT guide","AP Bhardwaj – Legal Aptitude","Previous year CLAT papers","The Hindu for Current Affairs"],
    eligibility:"Class 12 with min 45% marks (40% SC/ST). No age limit for UG.",
    tips:["Legal reasoning needs regular practice","Current affairs from last 12 months","Reading comprehension is key","No maths beyond Class 10 level"] },

  { id:"ailet", name:"AILET", full:"All India Law Entrance Test", category:"Law", color:"#92400e", icon:"🔨", difficulty:"High", diffScore:3, frequency:"Once a year", seats:"~100 (NLU Delhi)", salary:"₹8-25 LPA", duration:"5 years (LLB)",
    syllabus:["English","General Knowledge & Current Affairs","Legal Aptitude","Reasoning","Elementary Mathematics"],
    topics:{"English":["Reading Comprehension","Grammar","Vocabulary","Para Jumbles"],"Legal Aptitude":["Legal Principles","Legal GK","Constitutional Law","Legal Reasoning"],"GK":["Current Affairs","Static GK","Science & Tech"],"Reasoning":["Logical Reasoning","Analytical Reasoning"]},
    pattern:{duration:"1.5 hours",questions:"150 MCQs",total:"150 marks",negative:"Yes (-0.25)"},
    cutoff:[{year:2024,general:105,obc:95,sc:80,st:72},{year:2023,general:102,obc:92,sc:77,st:69}],
    books:["Arihant AILET guide","Legal GK book","Previous AILET papers"],
    eligibility:"Class 12 with 50% marks. Age: Max 20 years.",
    tips:["Only for NLU Delhi admission","Tougher than CLAT generally","Legal GK needs dedicated study","Reading speed is very important"] },

  { id:"lsat", name:"LSAT India", full:"Law School Admission Test India", category:"Law", color:"#78350f", icon:"📜", difficulty:"High", diffScore:3, frequency:"Once a year", seats:"Various law schools", salary:"₹5-20 LPA", duration:"3-5 years",
    syllabus:["Analytical Reasoning","Logical Reasoning (2 sections)","Reading Comprehension"],
    topics:{"Analytical Reasoning":["Games & Puzzles","Grouping","Ordering","Matching"],"Logical Reasoning":["Strengthen/Weaken","Assumption","Inference","Parallel Reasoning"],"Reading Comprehension":["Law Passages","Science Passages","Humanities Passages"]},
    pattern:{duration:"2.5 hours",questions:"92 MCQs",total:"92 marks",negative:"No"},
    cutoff:[{year:2024,general:70,obc:63,sc:55,st:52},{year:2023,general:68,obc:61,sc:53,st:50}],
    books:["Official LSAT PrepTest books","Arihant LSAT India","Manhattan Prep LSAT"],
    eligibility:"Class 12 passed. No age limit.",
    tips:["No negative marking — attempt all","Analytical reasoning needs lots of practice","Reading speed is critical","No GK or current affairs required"] },

  // ═══ DESIGN & ARCHITECTURE ═══
  { id:"nid-dat", name:"NID DAT", full:"National Institute of Design Design Aptitude Test", category:"Design", color:"#7c3aed", icon:"🎨", difficulty:"High", diffScore:3, frequency:"Once a year", seats:"~150", salary:"₹6-25 LPA", duration:"4 years",
    syllabus:["Drawing & Sketching","Design Thinking","Creativity & Observation","Communication Skills"],
    topics:{"Drawing":["Perspective Drawing","Sketching","Shading","Color Theory"],"Design Thinking":["Problem Solving","Observation","Creativity","Innovation"],"Communication":["Visual Communication","Presentation","Design Communication"]},
    pattern:{duration:"Prelims: 3hr | Mains: Studio test",questions:"Subjective + Studio test",total:"Based on jury",negative:"No"},
    cutoff:[{year:2024,general:55,obc:48,sc:38,st:35},{year:2023,general:53,obc:46,sc:36,st:33}],
    books:["NID previous year papers","Design sketching books","Draw every day — no substitute"],
    eligibility:"Class 12 from any stream. No age bar.",
    tips:["Practice drawing daily — non-negotiable","Observe design around you","Originality valued over perfection","Study products, packaging, environments"] },

  { id:"nift", name:"NIFT", full:"National Institute of Fashion Technology Entrance Test", category:"Design", color:"#6d28d9", icon:"👗", difficulty:"High", diffScore:3, frequency:"Once a year", seats:"~2,000+", salary:"₹5-20 LPA", duration:"4 years",
    syllabus:["Creative Ability Test: Drawing, Design","General Ability Test: English, Maths, GK, Case Study"],
    topics:{"Creative Ability":["Sketching","Color Application","2D & 3D Visualization","Creative Expression"],"General Ability":["English Comprehension","Quantitative Ability","Communication Ability","Analytical Ability","GK & Current Affairs"]},
    pattern:{duration:"CAT: 3hr | GAT: 2hr",questions:"CAT: subjective | GAT: 100 MCQs",total:"CAT + GAT combined",negative:"No for CAT, Yes for GAT"},
    cutoff:[{year:2024,general:72,obc:65,sc:55,st:50},{year:2023,general:70,obc:63,sc:53,st:48}],
    books:["NIFT previous year papers","Fashion history books","Basic drawing & sketching guides"],
    eligibility:"Class 12 passed. Age: Max 23 years (28 for PG).",
    tips:["Creative ability test needs daily practice","GAT needs GK and English skills","Fashion awareness is important","Portfolio quality matters a lot"] },

  { id:"uceed", name:"UCEED", full:"Undergraduate Common Entrance Examination for Design", category:"Design", color:"#5b21b6", icon:"✏️", difficulty:"High", diffScore:3, frequency:"Once a year", seats:"~150 (IITs)", salary:"₹8-25 LPA", duration:"4 years (B.Des)",
    syllabus:["Visualization & Spatial Ability","Observation & Design Sensitivity","Environmental & Social Awareness","Analytical & Logical Reasoning","Language & Creativity"],
    topics:{"Visualization":["Spatial Reasoning","Mental Rotation","3D to 2D","Pattern Recognition"],"Design Sensitivity":["Observation Skills","Aesthetic Sensitivity","Design Elements"],"Reasoning":["Analytical Reasoning","Critical Thinking","Logical Ability"],"Drawing":["Sketching","Rendering","Composition"]},
    pattern:{duration:"3 hours",questions:"Part A: MCQ + NAT | Part B: Drawing",total:"300 marks",negative:"Yes for Part A MCQ"},
    cutoff:[{year:2024,general:160,obc:140,sc:110,st:105},{year:2023,general:155,obc:135,sc:105,st:100}],
    books:["UCEED previous year papers","Design drawing books","Spatial reasoning practice sets"],
    eligibility:"Class 12 passed. Age: Max 20 years (25 for SC/ST).",
    tips:["Drawing section is very important","Spatial visualization needs regular practice","Observe design in everyday life","No specific textbook — practice is key"] },

  { id:"nata", name:"NATA", full:"National Aptitude Test in Architecture", category:"Architecture", color:"#0369a1", icon:"🏛️", difficulty:"High", diffScore:3, frequency:"Twice a year", seats:"~40,000+", salary:"₹5-15 LPA", duration:"5 years (B.Arch)",
    syllabus:["Drawing & Composition","Visual Perception & Cognition","Mathematics (Class 11 & 12)","General Aptitude"],
    topics:{"Drawing":["Perspective Drawing","Architectural Drawing","Sketching","Composition"],"Mathematics":["Algebra","Trigonometry","Coordinate Geometry","Calculus"],"Aptitude":["Visual Perception","Spatial Ability","Critical Thinking","Observation"]},
    pattern:{duration:"3 hours",questions:"Part A: Drawing | Part B: MCQ",total:"200 marks",negative:"No"},
    cutoff:[{year:2024,general:110,obc:98,sc:82,st:75},{year:2023,general:105,obc:94,sc:78,st:71}],
    books:["NATA previous year papers","Drawing & sketching practice books","B.Arch entrance guide by Arihant"],
    eligibility:"Class 12 with Maths. Min 50% marks.",
    tips:["Drawing is the most important component","Practice perspective drawing daily","Maths up to Class 12 level","Observe architecture and buildings around you"] },

  // ═══ SCIENCE & RESEARCH ═══
  { id:"iit-jam", name:"IIT JAM", full:"Joint Admission Test for MSc", category:"Science", color:"#0891b2", icon:"🧪", difficulty:"High", diffScore:3, frequency:"Once a year", seats:"~3,000 (IITs & IISc)", salary:"₹6-15 LPA", duration:"2 years (MSc)",
    syllabus:["Subject-specific (Physics/Chemistry/Maths/Biology/Geology/Economics)","Varies by paper chosen"],
    topics:{"Physics":["Mathematical Physics","Classical Mechanics","Electrostatics","Quantum Mechanics","Thermodynamics"],"Chemistry":["Physical Chemistry","Organic Chemistry","Inorganic Chemistry"],"Mathematics":["Analysis","Algebra","Topology","Differential Equations"]},
    pattern:{duration:"3 hours",questions:"60 questions (MCQ + NAT + MSQ)",total:"100 marks",negative:"Yes for MCQ only"},
    cutoff:[{year:2024,general:20,obc:18,sc:10,st:10},{year:2023,general:19,obc:17,sc:9,st:9}],
    books:["BSc textbooks of chosen subject","Previous year JAM papers","GateForum/Made Easy material"],
    eligibility:"Bachelor's degree with relevant subject. Final year eligible.",
    tips:["Subject mastery is key","Previous years are most important resource","NAT questions need calculation speed","Choose paper wisely based on your strength"] },

  { id:"csir-net", name:"CSIR NET", full:"CSIR National Eligibility Test", category:"Science", color:"#0e7490", icon:"🔭", difficulty:"Very High", diffScore:4, frequency:"Twice a year", seats:"No limit (JRF & Lectureship)", salary:"₹37,000+ (JRF)", duration:"2-3 years prep",
    syllabus:["Life Sciences / Physical Sciences / Chemical Sciences / Mathematical Sciences / Earth Sciences"],
    topics:{"Life Sciences":["Cell Biology","Genetics","Biochemistry","Ecology","Evolution","Physiology"],"Physical Sciences":["Mathematical Physics","Classical Mechanics","Quantum Mechanics","Electronics"],"Chemical Sciences":["Physical Chemistry","Organic Chemistry","Inorganic Chemistry","Analytical Chemistry"]},
    pattern:{duration:"3 hours",questions:"Part A: 20, Part B+C: varies",total:"200 marks",negative:"Yes (varies by part)"},
    cutoff:[{year:2024,general:55,obc:49,sc:36,st:36},{year:2023,general:53,obc:47,sc:34,st:34}],
    books:["Standard BSc/MSc textbooks","CSIR NET previous papers","Trueman's Biology for Life Sciences"],
    eligibility:"MSc or equivalent with 55% marks.",
    tips:["Part A (General Aptitude) is same for all subjects","Part C needs deep conceptual knowledge","Previous papers are the best resource","Focus on high-weightage topics in your subject"] },

  // ═══ TEACHING ═══
  { id:"ctet", name:"CTET", full:"Central Teacher Eligibility Test", category:"Teaching", color:"#16a34a", icon:"📚", difficulty:"Moderate", diffScore:2, frequency:"Twice a year", seats:"No limit", salary:"₹35,000-₹1.1 LPA", duration:"3 months prep",
    syllabus:["Child Development & Pedagogy","Language I (compulsory)","Language II (compulsory)","Mathematics / Science / Social Studies"],
    topics:{"Child Development":["Growth & Development","Learning Theories","Inclusive Education","Assessment","Motivation"],"Language":["Reading","Writing","Grammar","Comprehension","Language Acquisition"],"Mathematics":["Number System","Geometry","Measurement","Data Handling","Pedagogy"],"EVS/Science":["Environment","Living World","Matter","Pedagogy"]},
    pattern:{duration:"2.5 hours",questions:"150 MCQs",total:"150 marks",negative:"No"},
    cutoff:[{year:2024,general:90,obc:82,sc:75,st:75},{year:2023,general:88,obc:80,sc:73,st:73}],
    books:["Child Development by Arihant","NCERT textbooks Class 1–8","Previous year CTET papers","Disha CTET guide"],
    eligibility:"Class 12 with 50% + 2 year D.El.Ed OR Graduation + B.Ed.",
    tips:["No negative marking — attempt all","Child Development has highest weightage","Pedagogy questions need conceptual clarity","Language sections test teaching methods"] },

  { id:"ugc-net", name:"UGC NET", full:"UGC National Eligibility Test", category:"Teaching", color:"#15803d", icon:"🎓", difficulty:"High", diffScore:3, frequency:"Twice a year", seats:"No limit", salary:"₹57,700+ (Professor)", duration:"6 months prep",
    syllabus:["Paper I: Teaching Aptitude, Research, Communication, Reasoning, GK","Paper II: Subject-specific (from 81 subjects)"],
    topics:{"Teaching Aptitude":["Teaching Methods","Learner Characteristics","Teaching Aids","Evaluation"],"Research":["Research Methods","Statistics","Thesis Writing","Research Ethics"],"Reasoning":["Logical Reasoning","Mathematical Reasoning","Data Interpretation"],"Subject Paper II":["Varies by chosen subject — all postgraduate level topics"]},
    pattern:{duration:"3 hours",questions:"Paper I: 50 | Paper II: 100",total:"300 marks",negative:"No"},
    cutoff:[{year:2024,general:40,obc:35,sc:35,st:35},{year:2023,general:38,obc:33,sc:33,st:33}],
    books:["Trueman's UGC NET Paper I","Subject-specific books","Previous year UGC NET papers"],
    eligibility:"Masters degree with 55% marks (50% SC/ST/PWD).",
    tips:["Paper I is same for all subjects","Teaching & Research aptitude needs practice","Paper II needs thorough subject knowledge","No negative marking — attempt all"] },

  { id:"tet-state", name:"State TET", full:"State Teacher Eligibility Test", category:"Teaching", color:"#14532d", icon:"🏫", difficulty:"Easy", diffScore:1, frequency:"Once a year (varies by state)", seats:"No limit", salary:"₹30,000-₹80,000", duration:"2-3 months prep",
    syllabus:["Child Development & Pedagogy","Language I & II (State Language)","Mathematics","Environmental Studies / Science / Social Studies"],
    topics:{"Child Development":["Development Stages","Learning Theories","Inclusive Education","Motivation"],"Language":["Grammar","Comprehension","Language Skills"],"Mathematics":["Arithmetic","Geometry","Statistics","Pedagogy"],"EVS/Social":["Environment","Society","History","Geography","Pedagogy"]},
    pattern:{duration:"2.5 hours",questions:"150 MCQs",total:"150 marks",negative:"No"},
    cutoff:[{year:2024,general:90,obc:82,sc:75,st:75},{year:2023,general:88,obc:80,sc:73,st:73}],
    books:["State-specific TET books","Child Development guides","NCERT Class 1-8 books"],
    eligibility:"D.El.Ed or B.Ed with Class 12/Graduation. Varies by state.",
    tips:["Similar to CTET but state-specific","No negative marking — attempt all","State language paper is mandatory","Qualify to teach in state government schools"] },

  // ═══ CHARTERED ACCOUNTANCY ═══
  { id:"ca-foundation", name:"CA Foundation", full:"Chartered Accountancy Foundation Examination", category:"Commerce", color:"#b91c1c", icon:"💰", difficulty:"Moderate", diffScore:2, frequency:"Twice a year", seats:"No limit", salary:"₹6-25 LPA (after CA)", duration:"4 months prep",
    syllabus:["Paper 1: Principles & Practice of Accounting","Paper 2: Business Laws & Business Correspondence","Paper 3: Business Mathematics & Logical Reasoning & Statistics","Paper 4: Business Economics & Business & Commercial Knowledge"],
    topics:{"Accounting":["Accounting Standards","Financial Statements","Partnership","Company Accounts"],"Business Laws":["Indian Contract Act","Sale of Goods Act","Company Law","Business Communication"],"Mathematics":["Algebra","Matrices","Calculus","Statistics","Probability"],"Economics":["Micro Economics","Macro Economics","Indian Economy","Business Knowledge"]},
    pattern:{duration:"3 hours per paper",questions:"Paper 1 & 2: Descriptive | Paper 3 & 4: MCQ",total:"400 marks",negative:"Yes for MCQ papers"},
    cutoff:[{year:2024,general:200,obc:200,sc:200,st:200},{year:2023,general:200,obc:200,sc:200,st:200}],
    books:["ICAI Study Material","ICAI Practice Manual","CA Foundation previous papers","Padhuka CA Foundation guide"],
    eligibility:"Class 12 passed from any stream. No age limit.",
    tips:["ICAI study material is the primary resource","Accounting and Maths need maximum practice","Paper 3 is objective — accuracy is key","Join a coaching institute for best results"] },

  { id:"ca-inter", name:"CA Intermediate", full:"Chartered Accountancy Intermediate Examination", category:"Commerce", color:"#991b1b", icon:"📒", difficulty:"Very High", diffScore:4, frequency:"Twice a year", seats:"No limit", salary:"₹8-30 LPA (after CA)", duration:"8-12 months prep",
    syllabus:["Group I: Accounting, Corporate Laws, Cost & Management Accounting, Taxation","Group II: Advanced Accounting, Auditing, Strategic Management, Financial Management"],
    topics:{"Accounting":["Advanced Accounting Standards","Investment Accounting","Corporate Restructuring"],"Taxation":["Income Tax","GST","TDS","Tax Planning"],"Auditing":["Audit Standards","Types of Audit","Company Audit","Internal Control"],"Cost Accounting":["Cost Concepts","Budgeting","Standard Costing","Marginal Costing"]},
    pattern:{duration:"3 hours per paper",questions:"Descriptive + MCQ mix",total:"800 marks (8 papers)",negative:"Varies by paper"},
    cutoff:[{year:2024,general:400,obc:400,sc:400,st:400},{year:2023,general:400,obc:400,sc:400,st:400}],
    books:["ICAI Study Material for all papers","CA Intermediate previous papers","Padhuka / Bangar guides","Vinod Gupta Tax book"],
    eligibility:"CA Foundation cleared OR Direct entry for graduates with 55%.",
    tips:["Group-wise strategy is important","Taxation needs regular updates","Auditing needs conceptual clarity","Practice writing answers in exam format"] },

  // ═══ HOTEL MANAGEMENT ═══
  { id:"nchmct", name:"NCHMCT JEE", full:"National Council for Hotel Management Joint Entrance Examination", category:"Hospitality", color:"#c2410c", icon:"🏨", difficulty:"Moderate", diffScore:2, frequency:"Once a year", seats:"~10,000+", salary:"₹4-15 LPA", duration:"3 years",
    syllabus:["Numerical Ability & Analytical Aptitude","Reasoning & Logical Deduction","General Knowledge & Current Affairs","English Language","Aptitude for Service Sector"],
    topics:{"Numerical Ability":["Arithmetic","Algebra","Data Interpretation","Statistics"],"Reasoning":["Logical Reasoning","Spatial Ability","Critical Thinking"],"GK":["Current Affairs","Hospitality Industry","Food & Beverage","Static GK"],"English":["Grammar","Vocabulary","Comprehension","Service Communication"]},
    pattern:{duration:"3 hours",questions:"200 MCQs",total:"200 marks",negative:"Yes (-0.25)"},
    cutoff:[{year:2024,general:130,obc:115,sc:95,st:88},{year:2023,general:125,obc:110,sc:90,st:83}],
    books:["Arihant NCHMCT JEE guide","Previous year papers","GK capsule for hospitality"],
    eligibility:"Class 12 passed. Age: Max 22 years (25 for SC/ST).",
    tips:["Aptitude for service sector is unique section","GK from hospitality industry is important","English is very important for hospitality","Practice previous papers extensively"] },

  // ═══ DEFENCE ═══
  { id:"afcat", name:"AFCAT", full:"Air Force Common Admission Test", category:"Defence", color:"#0c4a6e", icon:"✈️", difficulty:"High", diffScore:3, frequency:"Twice a year", seats:"~250+", salary:"₹56,100+ (Flying Officer)", duration:"6 months prep",
    syllabus:["General Awareness","Verbal Ability in English","Numerical Ability","Reasoning & Military Aptitude"],
    topics:{"General Awareness":["History","Geography","Polity","Economy","Science","Military Current Affairs"],"Verbal Ability":["Grammar","Vocabulary","Comprehension","Idioms & Phrases"],"Numerical Ability":["Arithmetic","Algebra","Geometry","Data Interpretation"],"Military Aptitude":["Spatial Reasoning","Rotational Figures","Hidden Figures","Dot Situation"]},
    pattern:{duration:"2 hours",questions:"100 MCQs",total:"300 marks",negative:"Yes (-1 per wrong)"},
    cutoff:[{year:2024,general:170,obc:155,sc:140,st:132},{year:2023,general:165,obc:150,sc:135,st:127}],
    books:["Arihant AFCAT guide","Previous year AFCAT papers","Lucent GK"],
    eligibility:"Graduate with 60% marks. Age: 20–24 (flying), 20–26 (ground duty).",
    tips:["Military aptitude section is unique","Current affairs about defence is important","AFSB interview after written exam","Physical fitness is essential"] },

  { id:"inet", name:"INET", full:"Indian Navy Entrance Test", category:"Defence", color:"#1e3a5f", icon:"⚓", difficulty:"High", diffScore:3, frequency:"Twice a year", seats:"~200+", salary:"₹56,100+ (Sub-Lieutenant)", duration:"6 months prep",
    syllabus:["English","Reasoning & Numerical Ability","General Science","Mathematical Aptitude (for technical entry)"],
    topics:{"English":["Grammar","Vocabulary","Comprehension","Verbal Ability"],"Reasoning":["Logical Reasoning","Spatial Ability","Numerical Ability"],"General Science":["Physics","Chemistry","Mathematics","Computer Science"]},
    pattern:{duration:"2 hours",questions:"100 MCQs",total:"100 marks",negative:"Yes (-0.25)"},
    cutoff:[{year:2024,general:60,obc:55,sc:48,st:45},{year:2023,general:58,obc:53,sc:46,st:43}],
    books:["Arihant INET guide","Previous year INET papers","Lucent GK"],
    eligibility:"B.E/B.Tech for technical entry OR Graduate for executive. Age varies.",
    tips:["Shortlisted candidates go for SSB interview","Physical fitness is mandatory","Naval science awareness is important","Mathematics needs strong foundation"] },

  // ═══ STATE PSC ═══
  { id:"mpsc", name:"MPSC", full:"Maharashtra Public Service Commission", category:"State PSC", color:"#c2410c", icon:"🦁", difficulty:"High", diffScore:3, frequency:"Once a year", seats:"~500+", salary:"₹40,000-₹1.5 LPA", duration:"1-1.5 years prep",
    syllabus:["Prelims: GS Paper I, CSAT","Mains: GS I-IV, Marathi, English, Optional","Interview: Personality Test"],
    topics:{"History":["Indian History","Maharashtra History","World History"],"Geography":["Indian Geography","Maharashtra Geography","World Geography"],"Polity":["Indian Polity","Maharashtra Government","Panchayati Raj"],"Economy":["Indian Economy","Maharashtra Economy","Agriculture"]},
    pattern:{duration:"Prelims: 4hr | Mains: multiple papers",questions:"Prelims: 200 MCQs | Mains: descriptive",total:"Prelims: 200 | Mains: varies",negative:"Prelims: -0.25"},
    cutoff:[{year:2024,general:210,obc:195,sc:175,st:165},{year:2023,general:205,obc:190,sc:170,st:160}],
    books:["Unique Publications – Maharashtra GK","MPSC previous papers","Laxmikanth – Polity","NCERT books"],
    eligibility:"Graduate from recognised university. Age: 19–38 (varies by post).",
    tips:["Maharashtra-specific GK is very important","Marathi language paper is mandatory","Study MPSC specific current affairs","Previous papers are most useful"] },

  { id:"bpsc", name:"BPSC", full:"Bihar Public Service Commission", category:"State PSC", color:"#92400e", icon:"🐘", difficulty:"High", diffScore:3, frequency:"Once a year", seats:"~600+", salary:"₹40,000-₹1.5 LPA", duration:"1 year prep",
    syllabus:["Prelims: General Studies","Mains: GS I-III, Hindi, Optional","Interview: Personality Test"],
    topics:{"History":["Indian History","Bihar History","Freedom Struggle"],"Geography":["India Geography","Bihar Geography","Environment"],"Polity":["Indian Constitution","Bihar Government","Panchayati Raj"],"Economy":["Bihar Economy","Agriculture","MGNREGA","Social Schemes"]},
    pattern:{duration:"Prelims: 2hr | Mains: multiple papers",questions:"Prelims: 150 MCQs | Mains: descriptive",total:"Prelims: 150 | Mains: varies",negative:"Prelims: No"},
    cutoff:[{year:2024,general:105,obc:98,sc:85,st:80},{year:2023,general:100,obc:93,sc:80,st:75}],
    books:["Bihar GK book","BPSC previous papers","Laxmikanth – Polity","NCERT History"],
    eligibility:"Graduate from recognised university. Age: 20–37 (varies by post).",
    tips:["Bihar-specific GK is very important","No negative marking in Prelims","Mains needs good writing skills","Focus on Bihar government schemes"] },

  { id:"uppsc", name:"UPPSC", full:"Uttar Pradesh Public Service Commission", category:"State PSC", color:"#166534", icon:"🏰", difficulty:"High", diffScore:3, frequency:"Once a year", seats:"~500+", salary:"₹40,000-₹1.5 LPA", duration:"1-1.5 years prep",
    syllabus:["Prelims: GS + CSAT","Mains: GS I-IV, Hindi, Optional","Interview: Personality Test"],
    topics:{"History":["UP History","Indian History","World History"],"Geography":["UP Geography","India Geography"],"Polity":["Indian Polity","UP Government","Local Bodies"],"Economy":["UP Economy","Agriculture","Industry"],"Culture":["UP Culture","Literature","Art Forms"]},
    pattern:{duration:"Prelims: 4hr | Mains: multiple papers",questions:"Prelims: 200 MCQs | Mains: descriptive",total:"Prelims: 200 | Mains: varies",negative:"Prelims: -0.33"},
    cutoff:[{year:2024,general:130,obc:122,sc:108,st:102},{year:2023,general:126,obc:118,sc:104,st:98}],
    books:["UP GK book by Arihant","UPPSC previous papers","Laxmikanth – Polity","UP government reports"],
    eligibility:"Graduate from recognised university. Age: 21–40 (varies by post).",
    tips:["UP-specific GK and current affairs essential","Culture and literature of UP is important","Hindi language proficiency needed","Study UP government schemes and budget"] },

  // ═══ PHARMACY ═══
  { id:"gpat", name:"GPAT", full:"Graduate Pharmacy Aptitude Test", category:"Pharmacy", color:"#0f766e", icon:"💉", difficulty:"High", diffScore:3, frequency:"Once a year", seats:"~5,000+", salary:"₹5-15 LPA", duration:"6 months prep",
    syllabus:["Pharmaceutics","Pharmaceutical Chemistry","Pharmacology","Pharmacognosy","Clinical Pharmacy & Therapeutics"],
    topics:{"Pharmaceutics":["Physical Pharmacy","Dosage Forms","Biopharmaceutics","Pharmacokinetics"],"Pharmaceutical Chemistry":["Medicinal Chemistry","Pharmaceutical Analysis","Drug Design"],"Pharmacology":["General Pharmacology","CNS Drugs","Cardiovascular Drugs","Antimicrobials"],"Pharmacognosy":["Natural Products","Phytochemistry","Herbal Medicine"]},
    pattern:{duration:"3 hours",questions:"125 MCQs",total:"500 marks",negative:"Yes (-1 per wrong)"},
    cutoff:[{year:2024,general:250,obc:225,sc:187,st:187},{year:2023,general:240,obc:215,sc:180,st:180}],
    books:["Remington's Pharmaceutical Sciences","Cooper & Gunn – Dispensing for Pharmaceutical Students","Goodman & Gilman – Pharmacology","GPAT previous papers"],
    eligibility:"B.Pharm from recognised institution.",
    tips:["Pharmacology is highest weightage section","Medicinal chemistry needs structure memorization","Previous papers are the best practice","Focus on NTA GPAT pattern"] },

  // ═══ MASS COMMUNICATION ═══
  { id:"iimc", name:"IIMC Entrance", full:"Indian Institute of Mass Communication Entrance Exam", category:"Mass Communication", color:"#b45309", icon:"📺", difficulty:"High", diffScore:3, frequency:"Once a year", seats:"~200+", salary:"₹5-15 LPA", duration:"1 year (PG Diploma)",
    syllabus:["General Knowledge & Current Affairs","English Language","Reasoning Ability","Communication Aptitude"],
    topics:{"GK & Current Affairs":["National","International","Media & Entertainment","Sports","Science & Tech"],"English":["Grammar","Vocabulary","Comprehension","Writing Skills"],"Reasoning":["Logical Reasoning","Analytical Ability","Critical Thinking"],"Media Aptitude":["Media Awareness","Communication Skills","Creative Thinking"]},
    pattern:{duration:"2 hours",questions:"100 MCQs",total:"100 marks",negative:"Yes (-0.25)"},
    cutoff:[{year:2024,general:65,obc:58,sc:50,st:47},{year:2023,general:62,obc:55,sc:47,st:44}],
    books:["IIMC previous year papers","Reading newspapers daily","General English by SP Bakshi"],
    eligibility:"Graduate from any discipline. Age: No bar.",
    tips:["Read newspapers daily — most important","Media awareness is key","English writing skills are tested","Current affairs from last 12 months"] },

  // ═══ SOCIAL WORK ═══
  { id:"tiss", name:"TISS NET", full:"Tata Institute of Social Sciences National Entrance Test", category:"Social Work", color:"#4f46e5", icon:"🤝", difficulty:"High", diffScore:3, frequency:"Once a year", seats:"~500+", salary:"₹5-15 LPA", duration:"2 years (MA/MSc)",
    syllabus:["General Awareness","English Proficiency","Analytical & Numerical Ability"],
    topics:{"General Awareness":["Current Affairs","Social Issues","Development","Environment","Human Rights"],"English":["Reading Comprehension","Vocabulary","Grammar","Writing"],"Reasoning":["Analytical Ability","Numerical Ability","Logical Reasoning"]},
    pattern:{duration:"1.5 hours",questions:"100 MCQs",total:"100 marks",negative:"No"},
    cutoff:[{year:2024,general:65,obc:58,sc:50,st:47},{year:2023,general:63,obc:56,sc:48,st:45}],
    books:["TISS previous year papers","Frontline magazine","The Hindu newspaper","Yojana magazine"],
    eligibility:"Graduate from any discipline. Specific requirements by programme.",
    tips:["Social awareness and current affairs is key","Read Frontline, Yojana, EPW magazines","No negative marking — attempt all","Social development issues are most important"] },
];

const categories = ["All","Engineering","Medical","Government","Management","Law","Design","Architecture","Science","Teaching","Commerce","Hospitality","Defence","State PSC","Pharmacy","Mass Communication","Social Work"];

const catIcons = {
  "All":"🇮🇳","Engineering":"⚙️","Medical":"🩺","Government":"🏛️","Management":"📊",
  "Law":"⚖️","Design":"🎨","Architecture":"🏗️","Science":"🔬","Teaching":"📚",
  "Commerce":"💰","Hospitality":"🏨","Defence":"⚔️","State PSC":"🏢",
  "Pharmacy":"💉","Mass Communication":"📺","Social Work":"🤝"
};

const diffColor = {"Easy":"#22c55e","Moderate":"#f59e0b","High":"#f97316","Very High":"#ef4444","Extremely High":"#7c3aed"};

const quickQs = ["Hello! What can you do?","JEE Main cutoff 2024","Best books for UPSC","NEET eligibility","Toughest exam in India"];

function getBotReply(question) {
  const q = question.toLowerCase();
  for (const exam of exams) {
    if (q.includes(exam.name.toLowerCase()) || q.includes(exam.id.replace("-"," "))) {
      if (q.includes("cutoff")||q.includes("score")) { const c=exam.cutoff[0]; return `📊 **${exam.name} Cutoff ${c.year}:**\n\n• General: ${c.general}\n• OBC: ${c.obc}\n• SC: ${c.sc}\n• ST: ${c.st}\n\n⚠️ Verify from official website.`; }
      if (q.includes("syllabus")||q.includes("topics")) return `📖 **${exam.name} Syllabus:**\n\n${exam.syllabus.map(s=>`• ${s}`).join("\n")}`;
      if (q.includes("book")||q.includes("material")) return `📚 **Books for ${exam.name}:**\n\n${exam.books.map(b=>`• ${b}`).join("\n")}`;
      if (q.includes("eligib")||q.includes("age")||q.includes("qualify")) return `✅ **${exam.name} Eligibility:**\n\n${exam.eligibility}`;
      if (q.includes("pattern")||q.includes("marks")||q.includes("duration")) { const p=exam.pattern; return `📋 **${exam.name} Pattern:**\n\n• Duration: ${p.duration}\n• Questions: ${p.questions}\n• Total: ${p.total}\n• Negative: ${p.negative}`; }
      if (q.includes("tip")||q.includes("prepare")||q.includes("how")) return `💡 **${exam.name} Tips:**\n\n${exam.tips.map((t,i)=>`${i+1}. ${t}`).join("\n")}`;
      return `📌 **${exam.name}:**\n\n• Category: ${exam.category}\n• Difficulty: ${exam.difficulty}\n• Marks: ${exam.pattern.total}\n• Seats: ${exam.seats}\n• Eligibility: ${exam.eligibility}`;
    }
  }
  if (q.includes("hello")||q.includes("hi")||q.includes("hey")||q.includes("namaste")) return `👋 **Hello! I'm ExamBot!**\n\nI know about **${exams.length}+ Indian exams!**\n\nAsk me about:\n• 📖 Syllabus\n• 📊 Cutoffs\n• 📚 Books\n• 💡 Tips\n• ✅ Eligibility\n\nFor JEE, NEET, UPSC, CAT, SSC, Banking, Law, Defence and more! 😊`;
  if (q.includes("how many")||q.includes("total exam")) return `📚 ExamNest now covers **${exams.length}+ major Indian exams** across ${categories.length-1} categories:\n\n⚙️ Engineering • 🩺 Medical • 🏛️ Government • 📊 Management • ⚖️ Law • 🎨 Design • 🔬 Science • 📚 Teaching • 💰 Commerce • ⚔️ Defence • 🏢 State PSC • 🏨 Hospitality • 💉 Pharmacy • 📺 Media • 🤝 Social Work`;
  if (q.includes("easy")||q.includes("easiest")) return "✅ **Easiest Exams in India:**\n\n1. **RRB Group D** – Class 10 level\n2. **SSC MTS** – Class 10 level, no negative\n3. **GUJCET** – State board level\n4. **State TET** – Teacher eligibility, moderate\n5. **IBPS Clerk** – Banking clerk level\n\n💡 Consistent preparation makes any exam manageable!";
  if (q.includes("tough")||q.includes("hard")||q.includes("difficult")) return "🔥 **Toughest Exams in India:**\n\n1. **UPSC CSE** – 0.1% selection rate\n2. **JEE Advanced** – IIT gateway\n3. **AIIMS PG** – Medical PG\n4. **CSIR NET** – Research fellowship\n5. **CA Final** – Chartered Accountancy\n\n💪 Hard exams = better opportunities!";
  if (q.includes("bank")||q.includes("banking")) return "🏦 **Top Banking Exams:**\n\n1. **SBI PO** – Toughest, best salary\n2. **IBPS PO** – Multiple banks\n3. **SBI Clerk** – Good entry level\n4. **IBPS Clerk** – Multiple banks\n5. **RBI Grade B** – Premium banking job\n\nAll require Graduation. Prepare Reasoning, Maths, English & Banking GK!";
  if (q.includes("defence")||q.includes("army")||q.includes("navy")||q.includes("airforce")) return "⚔️ **Top Defence Exams:**\n\n1. **NDA** – After Class 12 (Army/Navy/Air Force)\n2. **CDS** – After Graduation (all three services)\n3. **AFCAT** – Air Force (Graduate)\n4. **INET** – Indian Navy (Graduate)\n5. **CAPF** – Central Armed Police (Graduate)\n\nAll require physical fitness + SSB interview!";
  if (q.includes("state psc")||q.includes("psc")) return "🏢 **Top State PSC Exams:**\n\n1. **MPSC** – Maharashtra (most competitive state PSC)\n2. **UPPSC** – Uttar Pradesh\n3. **BPSC** – Bihar\n4. **MPPSC** – Madhya Pradesh\n5. **RPSC** – Rajasthan\n\nAll have similar pattern to UPSC but with state-specific GK!";
  if (q.includes("thank")) return "😊 You're welcome! Best of luck for your preparation! 💪\n\nRemember: **Consistency beats intensity.** Study daily and you will definitely succeed! 🎯";
  return `🤔 I know about ${exams.length}+ exams! Try asking:\n\n• \"JEE Main syllabus\"\n• \"NEET cutoff 2024\"\n• \"Best books for UPSC\"\n• \"CA Foundation eligibility\"\n• \"AFCAT pattern\"\n• \"How many exams are covered?\"\n\nOr use **Compare tab** to compare 2 exams! 😊`;
}

const getTheme = (dark) => ({
  bg:dark?"#0f172a":"#f8f7f4", card:dark?"#1e293b":"#ffffff",
  card2:dark?"#273548":"#f1f5f9", text:dark?"#f1f5f9":"#1a1a2e",
  subtext:dark?"#94a3b8":"#64748b", border:dark?"rgba(255,255,255,0.07)":"rgba(0,0,0,0.07)",
  navBg:dark?"#0f172a":"#ffffff", topBg:dark?"#0f172a":"#1a1a2e",
  muted:dark?"#475569":"#888888",
});

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600&display=swap');
  *{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent;}
  html,body{font-family:'DM Sans',sans-serif;}
  @keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
  @keyframes fadeIn{from{opacity:0}to{opacity:1}}
  @keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
  .card:active{transform:scale(0.97);}
  input:focus,textarea:focus,select:focus{outline:none;}
  ::-webkit-scrollbar{display:none;}
  *{transition:background-color 0.3s ease,color 0.2s ease;}
`;

export default function App() {
  const [dark,setDark]=useState(()=>{ try{return localStorage.getItem("examnest_dark")==="true";}catch(e){return false;} });
  const [selected,setSelected]=useState(null);
  const [tab,setTab]=useState("syllabus");
  const [category,setCategory]=useState("All");
  const [search,setSearch]=useState("");
  const [navTab,setNavTab]=useState("home");
  const T=getTheme(dark);

  useEffect(()=>{ try{localStorage.setItem("examnest_dark",dark);}catch(e){} },[dark]);

  const filtered=exams.filter(e=>
    (category==="All"||e.category===category)&&
    (e.name.toLowerCase().includes(search.toLowerCase())||
     e.full.toLowerCase().includes(search.toLowerCase())||
     e.category.toLowerCase().includes(search.toLowerCase()))
  );

  const openExam=(exam)=>{setSelected(exam);setTab("syllabus");window.scrollTo(0,0);};
  const goHome=()=>{setSelected(null);setNavTab("home");};

  if(selected) return <DetailPage exam={selected} goHome={goHome} tab={tab} setTab={setTab} T={T} dark={dark}/>;

  return(
    <>
      <style>{globalStyles}</style>
      <div style={{minHeight:"100vh",background:T.bg,paddingBottom:72,color:T.text}}>
        {navTab==="chat"    ?<ChatPage setNavTab={setNavTab} T={T} dark={dark}/>:
         navTab==="compare" ?<ComparePage setNavTab={setNavTab} T={T} dark={dark}/>:
         navTab==="planner" ?<PlannerPage setNavTab={setNavTab} T={T} dark={dark}/>:
         navTab==="about"   ?<AboutPage goHome={()=>setNavTab("home")} count={exams.length} T={T} dark={dark}/>:(
          <>
            <div style={{background:T.topBg,padding:"16px 16px 0",position:"sticky",top:0,zIndex:50}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <div style={{width:32,height:32,background:"rgba(255,255,255,0.1)",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>📚</div>
                  <div>
                    <div style={{fontFamily:"'Playfair Display',serif",fontSize:17,fontWeight:700,color:"#fff",lineHeight:1}}>ExamNest</div>
                    <div style={{fontSize:9,color:"#c9a84c",letterSpacing:"0.12em",textTransform:"uppercase"}}>{exams.length}+ Exams · India</div>
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
                <input value={search} onChange={e=>setSearch(e.target.value)} placeholder={`Search ${exams.length}+ Indian exams...`}
                  style={{width:"100%",padding:"11px 36px 11px 36px",background:"rgba(255,255,255,0.1)",border:"1px solid rgba(255,255,255,0.15)",borderRadius:12,color:"#fff",fontSize:14,fontFamily:"inherit"}}/>
                {search&&<span onClick={()=>setSearch("")} style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",fontSize:14,color:"rgba(255,255,255,0.5)",cursor:"pointer"}}>✕</span>}
              </div>
              <div style={{display:"flex",gap:7,overflowX:"auto",paddingBottom:12}}>
                {categories.map(c=>(
                  <button key={c} onClick={()=>setCategory(c)} style={{flexShrink:0,padding:"5px 11px",borderRadius:20,border:"none",cursor:"pointer",fontSize:11,fontFamily:"inherit",fontWeight:500,background:category===c?"#c9a84c":"rgba(255,255,255,0.1)",color:category===c?"#1a1a2e":"rgba(255,255,255,0.7)"}}>
                    {catIcons[c]} {c} {c!=="All"?`(${exams.filter(e=>e.category===c).length})`:``}
                  </button>
                ))}
              </div>
            </div>

            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,padding:"12px 16px 0"}}>
              {[
                {tab:"compare",icon:"⚖️",label:"Compare",sub:"2 exams",bg:"linear-gradient(135deg,#0f172a,#1e3a5f)"},
                {tab:"planner",icon:"📅",label:"Planner",sub:"Saved ✓",bg:"linear-gradient(135deg,#14532d,#166534)"},
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
                <div style={{fontSize:12,color:T.muted}}>{filtered.length} exam{filtered.length!==1?"s":""} found{category!=="All"?` in ${category}`:""}{search?` for "${search}":""}`}</div>
              ):(
                <>
                  <div style={{fontSize:19,fontWeight:700,fontFamily:"'Playfair Display',serif",color:T.text}}>All Exams 🇮🇳</div>
                  <div style={{fontSize:12,color:T.muted,marginTop:2}}>{exams.length}+ exams across {categories.length-1} categories • Tap for full details</div>
                </>
              )}
            </div>

            <div style={{padding:"8px 16px",display:"flex",flexDirection:"column",gap:10}}>
              {filtered.map((exam,i)=>(
                <div key={exam.id} className="card" onClick={()=>openExam(exam)} style={{background:T.card,borderRadius:16,overflow:"hidden",cursor:"pointer",boxShadow:dark?"0 2px 10px rgba(0,0,0,0.3)":"0 2px 10px rgba(0,0,0,0.06)",animation:`fadeUp 0.4s ease forwards ${Math.min(i*0.03,0.5)}s`,opacity:0,transition:"transform 0.15s,background 0.3s"}}>
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
                  <div style={{fontSize:12,marginTop:4,color:T.muted}}>Try JEE, NEET, UPSC, CA, AFCAT, MPSC...</div>
                  <button onClick={()=>{setSearch("");setCategory("All");}} style={{marginTop:14,padding:"9px 22px",background:"#6366f1",color:"#fff",border:"none",borderRadius:12,fontSize:13,cursor:"pointer",fontFamily:"inherit"}}>Clear Filter</button>
                </div>
              )}
            </div>
          </>
        )}

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

function PlannerPage({setNavTab,T,dark}){
  const [plannerData,setPlannerData]=useState(()=>loadFromStorage()||{examId:null,examDate:"",progress:{},step:1});
  const {examId,examDate,progress,step}=plannerData;
  const planExam=exams.find(e=>e.id===examId)||null;
  const update=(patch)=>{const nd={...plannerData,...patch};setPlannerData(nd);saveToStorage(nd);};
  const today=new Date();
  const daysLeft=examDate?Math.max(0,Math.ceil((new Date(examDate)-today)/(1000*60*60*24))):0;
  const allTopics=planExam?Object.entries(planExam.topics).flatMap(([sub,topics])=>topics.map(t=>({sub,t,key:`${sub}::${t}`}))):[];
  const totalTopics=allTopics.length;
  const doneCount=allTopics.filter(({key})=>progress[key]===2).length;
  const inProgressCount=allTopics.filter(({key})=>progress[key]===1).length;
  const pct=totalTopics>0?Math.round((doneCount/totalTopics)*100):0;
  const dailyTopics=daysLeft>0&&totalTopics>doneCount?Math.ceil((totalTopics-doneCount)/daysLeft):0;
  const toggleTopic=(key)=>{const np={...progress,[key]:((progress[key]||0)+1)%3};update({progress:np});};
  const statusIcon=(key)=>{const s=progress[key]||0;if(s===0)return{icon:"⬜",label:"Not Started",color:"#94a3b8"};if(s===1)return{icon:"🟡",label:"In Progress",color:"#f59e0b"};return{icon:"✅",label:"Completed",color:"#22c55e"};};
  const weekDays=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
  const generateWeekPlan=()=>{if(!planExam)return[];const subs=Object.keys(planExam.topics);return weekDays.map((day,i)=>{const sub=subs[i%subs.length];return{day,sub,topics:planExam.topics[sub].slice(0,3)};});};
  const resetPlanner=()=>{const f={examId:null,examDate:"",progress:{},step:1};setPlannerData(f);saveToStorage(f);};

  return(
    <div style={{minHeight:"100vh",background:T.bg,paddingBottom:80,color:T.text}}>
      <div style={{background:"linear-gradient(135deg,#14532d,#166534)",padding:"14px 16px",display:"flex",alignItems:"center",gap:12}}>
        <button onClick={()=>setNavTab("home")} style={{background:"rgba(255,255,255,0.15)",border:"none",borderRadius:10,padding:"7px 12px",color:"#fff",cursor:"pointer",fontSize:13,fontFamily:"inherit"}}>← Back</button>
        <div style={{flex:1}}>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:16,fontWeight:700,color:"#fff"}}>📅 Study Planner</div>
          <div style={{fontSize:11,color:"rgba(255,255,255,0.6)"}}>Progress auto-saved permanently 🔒</div>
        </div>
        {planExam&&step===3&&<div style={{background:"rgba(255,255,255,0.2)",borderRadius:20,padding:"4px 10px",fontSize:11,color:"#fff",fontWeight:600}}>{pct}% done</div>}
      </div>
      {planExam&&<div style={{background:dark?"#1e293b":"#f0fdf4",padding:"8px 16px",borderBottom:`1px solid ${T.border}`,display:"flex",alignItems:"center",gap:7}}><span>🔒</span><span style={{fontSize:12,color:"#16a34a",fontWeight:500}}>Progress saved — never resets even if you close the app!</span></div>}
      <div style={{padding:"16px"}}>
        {step===1&&(
          <div>
            <div style={{fontSize:15,fontWeight:700,color:T.text,marginBottom:4}}>Choose your exam</div>
            <div style={{fontSize:12,color:T.muted,marginBottom:14}}>Select the exam you are preparing for ({exams.filter(e=>e.topics).length} exams available)</div>
            {exams.filter(e=>e.topics).map(exam=>(
              <div key={exam.id} onClick={()=>update({examId:exam.id,step:2})} className="card"
                style={{background:T.card,borderRadius:14,padding:"13px 14px",cursor:"pointer",display:"flex",alignItems:"center",gap:12,marginBottom:9,boxShadow:dark?"0 2px 8px rgba(0,0,0,0.3)":"0 1px 6px rgba(0,0,0,0.07)",transition:"transform 0.15s"}}>
                <div style={{width:42,height:42,background:exam.color+"20",borderRadius:11,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{exam.icon}</div>
                <div style={{flex:1}}>
                  <div style={{fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:700,color:T.text}}>{exam.name}</div>
                  <div style={{fontSize:11,color:T.muted,marginTop:2}}>{exam.category} • {exam.difficulty} • {Object.values(exam.topics).flat().length} topics</div>
                </div>
                <div style={{fontSize:16,color:T.muted}}>›</div>
              </div>
            ))}
          </div>
        )}
        {step===2&&planExam&&(
          <div>
            <button onClick={()=>update({step:1})} style={{background:"none",border:"none",color:T.muted,cursor:"pointer",fontSize:13,fontFamily:"inherit",marginBottom:14,display:"flex",alignItems:"center",gap:5}}>← Change Exam</button>
            <div style={{background:planExam.color,borderRadius:14,padding:"14px",marginBottom:16,display:"flex",alignItems:"center",gap:12}}>
              <div style={{fontSize:32}}>{planExam.icon}</div>
              <div><div style={{fontFamily:"'Playfair Display',serif",fontSize:18,fontWeight:700,color:"#fff"}}>{planExam.name}</div><div style={{fontSize:12,color:"rgba(255,255,255,0.8)"}}>{planExam.full}</div></div>
            </div>
            <div style={{fontSize:15,fontWeight:700,color:T.text,marginBottom:4}}>Set your exam date</div>
            <div style={{fontSize:12,color:T.muted,marginBottom:14}}>We'll calculate your daily study target</div>
            <div style={{background:T.card,borderRadius:14,padding:"16px",marginBottom:14}}>
              <input type="date" value={examDate} onChange={e=>update({examDate:e.target.value})} min={new Date().toISOString().split("T")[0]}
                style={{width:"100%",padding:"12px",background:T.card2,border:`1px solid ${T.border}`,borderRadius:10,fontSize:14,fontFamily:"inherit",color:T.text,cursor:"pointer"}}/>
            </div>
            {examDate&&(
              <div style={{background:dark?"#1e293b":"#f0fdf4",borderRadius:14,padding:"14px",marginBottom:14,border:"1px solid #22c55e40"}}>
                <div style={{fontSize:13,color:"#22c55e",fontWeight:600,marginBottom:4}}>🎯 {daysLeft} days left!</div>
                <div style={{fontSize:12,color:T.subtext}}>{daysLeft>=90?"Great! Plenty of time. Plan smartly! 💪":daysLeft>=30?"Good time. Stay consistent! 📚":daysLeft>=7?"Time is short! Focus on priority topics! ⚡":"Very few days! High-priority topics only! 🔥"}</div>
              </div>
            )}
            <button onClick={()=>{if(examDate)update({step:3});}} disabled={!examDate}
              style={{width:"100%",padding:"14px",background:examDate?"linear-gradient(135deg,#16a34a,#22c55e)":"#334155",border:"none",borderRadius:14,color:"#fff",fontSize:15,fontWeight:600,cursor:examDate?"pointer":"not-allowed",fontFamily:"inherit"}}>
              Generate My Study Plan →
            </button>
          </div>
        )}
        {step===3&&planExam&&examDate&&(
          <div>
            <button onClick={()=>update({step:2})} style={{background:"none",border:"none",color:T.muted,cursor:"pointer",fontSize:13,fontFamily:"inherit",marginBottom:14,display:"flex",alignItems:"center",gap:5}}>← Change Date</button>
            <div style={{background:planExam.color,borderRadius:16,padding:"16px",marginBottom:14}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
                <div>
                  <div style={{fontFamily:"'Playfair Display',serif",fontSize:17,fontWeight:700,color:"#fff"}}>{planExam.name}</div>
                  <div style={{fontSize:12,color:"rgba(255,255,255,0.75)",marginTop:2}}>🗓️ {daysLeft} days remaining</div>
                </div>
                <div style={{textAlign:"right"}}>
                  <div style={{fontFamily:"'Playfair Display',serif",fontSize:32,fontWeight:900,color:"#fff"}}>{pct}%</div>
                  <div style={{fontSize:10,color:"rgba(255,255,255,0.7)"}}>completed</div>
                </div>
              </div>
              <div style={{background:"rgba(0,0,0,0.2)",borderRadius:10,height:10,overflow:"hidden",marginBottom:10}}>
                <div style={{height:"100%",borderRadius:10,background:"rgba(255,255,255,0.9)",width:`${pct}%`,transition:"width 0.5s ease"}}/>
              </div>
              <div style={{display:"flex",gap:16,flexWrap:"wrap"}}>
                {[["✅",doneCount,"Done"],["🟡",inProgressCount,"In Progress"],["⬜",totalTopics-doneCount-inProgressCount,"Pending"]].map(([icon,count,label])=>(
                  <div key={label} style={{textAlign:"center"}}><div style={{fontSize:16,fontWeight:700,color:"#fff"}}>{count}</div><div style={{fontSize:9,color:"rgba(255,255,255,0.7)"}}>{icon} {label}</div></div>
                ))}
                {dailyTopics>0&&<div style={{textAlign:"center",marginLeft:"auto"}}><div style={{fontSize:16,fontWeight:700,color:"#fff"}}>{dailyTopics}</div><div style={{fontSize:9,color:"rgba(255,255,255,0.7)"}}>📅 topics/day</div></div>}
              </div>
            </div>
            <div style={{background:T.card,borderRadius:14,padding:"14px",marginBottom:14,boxShadow:dark?"0 2px 8px rgba(0,0,0,0.2)":"0 1px 6px rgba(0,0,0,0.07)"}}>
              <div style={{fontSize:13,fontWeight:700,color:T.text,marginBottom:10}}>📋 Weekly Study Schedule</div>
              {generateWeekPlan().map(({day,sub,topics},i)=>(
                <div key={i} style={{display:"flex",alignItems:"flex-start",gap:10,padding:"8px 0",borderBottom:i<6?`1px solid ${T.border}`:"none"}}>
                  <div style={{width:65,flexShrink:0}}><div style={{fontSize:11,fontWeight:700,color:planExam.color}}>{day}</div></div>
                  <div style={{flex:1}}><div style={{fontSize:11,fontWeight:600,color:T.subtext,marginBottom:2}}>{sub}</div><div style={{fontSize:11,color:T.muted}}>{topics.join(", ")}</div></div>
                </div>
              ))}
            </div>
            <div style={{fontSize:14,fontWeight:700,color:T.text,marginBottom:6}}>📊 Topic Progress Tracker</div>
            <div style={{fontSize:11,color:T.muted,marginBottom:10}}>Tap any topic to update • Progress saves automatically 🔒</div>
            {Object.entries(planExam.topics).map(([subject,topics])=>(
              <div key={subject} style={{marginBottom:14}}>
                <div style={{background:planExam.color,borderRadius:"10px 10px 0 0",padding:"8px 14px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div style={{fontSize:13,fontWeight:700,color:"#fff"}}>{subject}</div>
                  <div style={{fontSize:10,color:"rgba(255,255,255,0.75)"}}>{topics.filter(t=>progress[`${subject}::${t}`]===2).length}/{topics.length} done</div>
                </div>
                <div style={{background:T.card,borderRadius:"0 0 10px 10px",overflow:"hidden",boxShadow:dark?"0 2px 8px rgba(0,0,0,0.2)":"0 1px 6px rgba(0,0,0,0.07)"}}>
                  {topics.map((topic,i)=>{const key=`${subject}::${topic}`;const st=statusIcon(key);return(
                    <div key={i} onClick={()=>toggleTopic(key)} style={{display:"flex",alignItems:"center",gap:12,padding:"11px 14px",borderBottom:i<topics.length-1?`1px solid ${T.border}`:"none",cursor:"pointer"}}>
                      <span style={{fontSize:18,flexShrink:0}}>{st.icon}</span>
                      <div style={{flex:1}}><div style={{fontSize:13,color:T.text,fontWeight:500}}>{topic}</div><div style={{fontSize:10,color:st.color,marginTop:1}}>{st.label}</div></div>
                      <span style={{fontSize:10,color:T.muted}}>tap</span>
                    </div>
                  );})}
                </div>
              </div>
            ))}
            {pct===100&&<div style={{background:"linear-gradient(135deg,#14532d,#166534)",borderRadius:14,padding:"16px",textAlign:"center",marginTop:8}}><div style={{fontSize:36,marginBottom:8}}>🎉</div><div style={{fontFamily:"'Playfair Display',serif",fontSize:18,fontWeight:700,color:"#fff",marginBottom:4}}>All Topics Completed!</div><div style={{fontSize:13,color:"rgba(255,255,255,0.8)"}}>Amazing! Now focus on revision & mock tests. You've got this! 💪</div></div>}
            <button onClick={resetPlanner} style={{width:"100%",marginTop:16,padding:"12px",background:"none",border:`1px solid ${T.border}`,borderRadius:12,color:T.muted,fontSize:13,cursor:"pointer",fontFamily:"inherit"}}>🔄 Reset & Start Different Exam</button>
          </div>
        )}
      </div>
    </div>
  );
}

function ComparePage({setNavTab,T,dark}){
  const [e1,setE1]=useState(exams[0]);const [e2,setE2]=useState(exams[10]);
  const rows=[{label:"Category",icon:"🏷️",fn:e=>e.category},{label:"Difficulty",icon:"🔥",fn:e=>e.difficulty},{label:"Frequency",icon:"📅",fn:e=>e.frequency},{label:"Total Marks",icon:"📊",fn:e=>e.pattern.total},{label:"Duration",icon:"⏱️",fn:e=>e.pattern.duration},{label:"Negative Marking",icon:"⚠️",fn:e=>e.pattern.negative},{label:"Available Seats",icon:"🪑",fn:e=>e.seats},{label:"Avg Salary",icon:"💰",fn:e=>e.salary},{label:"Course Duration",icon:"🗓️",fn:e=>e.duration},{label:"Eligibility",icon:"✅",fn:e=>e.eligibility}];
  return(
    <div style={{minHeight:"100vh",background:T.bg,paddingBottom:80,color:T.text}}>
      <div style={{background:"linear-gradient(135deg,#0f172a,#1e3a5f)",padding:"14px 16px",display:"flex",alignItems:"center",gap:12}}>
        <button onClick={()=>setNavTab("home")} style={{background:"rgba(255,255,255,0.15)",border:"none",borderRadius:10,padding:"7px 12px",color:"#fff",cursor:"pointer",fontSize:13,fontFamily:"inherit"}}>← Back</button>
        <div><div style={{fontFamily:"'Playfair Display',serif",fontSize:16,fontWeight:700,color:"#fff"}}>⚖️ Compare Exams</div><div style={{fontSize:11,color:"rgba(255,255,255,0.6)"}}>Pick any 2 from {exams.length}+ exams</div></div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,padding:"14px 14px 0"}}>
        {[{val:e1,set:setE1,label:"Exam 1"},{val:e2,set:setE2,label:"Exam 2"}].map(({val,set,label},idx)=>(
          <div key={idx}>
            <div style={{fontSize:11,color:T.muted,marginBottom:6,fontWeight:600}}>{label}</div>
            <div style={{background:T.card,borderRadius:12,border:`2px solid ${val.color}`,overflow:"hidden"}}>
              <div style={{background:val.color,padding:"8px 10px",display:"flex",alignItems:"center",gap:7}}><span style={{fontSize:18}}>{val.icon}</span><span style={{fontSize:12,fontWeight:700,color:"#fff"}}>{val.name}</span></div>
              <select value={val.id} onChange={ev=>set(exams.find(x=>x.id===ev.target.value))} style={{width:"100%",padding:"8px 10px",border:"none",background:T.card,fontSize:12,fontFamily:"inherit",color:T.text,cursor:"pointer"}}>
                {exams.map(ex=>(<option key={ex.id} value={ex.id}>{ex.name}</option>))}
              </select>
            </div>
          </div>
        ))}
      </div>
      <div style={{textAlign:"center",padding:"10px 0 6px"}}><span style={{background:"#1a1a2e",color:"#fff",borderRadius:20,padding:"4px 14px",fontSize:12,fontWeight:700}}>VS</span></div>
      <div style={{padding:"0 14px"}}>
        {rows.map((row,i)=>(
          <div key={i} style={{background:T.card,borderRadius:13,marginBottom:9,overflow:"hidden",boxShadow:dark?"0 2px 8px rgba(0,0,0,0.3)":"0 1px 6px rgba(0,0,0,0.05)"}}>
            <div style={{background:dark?"rgba(255,255,255,0.05)":"#f8f7f4",padding:"6px 12px",fontSize:11,fontWeight:600,color:T.muted,borderBottom:`1px solid ${T.border}`}}>{row.icon} {row.label}</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 4px 1fr"}}>
              <div style={{padding:"10px 12px",fontSize:12,color:T.text,lineHeight:1.5}}>{row.fn(e1)}</div><div style={{background:T.border}}/>
              <div style={{padding:"10px 12px",fontSize:12,color:T.text,lineHeight:1.5}}>{row.fn(e2)}</div>
            </div>
          </div>
        ))}
        <div style={{background:T.card,borderRadius:13,padding:"14px",marginBottom:9}}>
          <div style={{fontSize:12,fontWeight:600,color:T.muted,marginBottom:12}}>🔥 DIFFICULTY METER</div>
          {[e1,e2].map((e,i)=>(<div key={i} style={{marginBottom:i===0?12:0}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}><span style={{fontSize:12,fontWeight:600,color:T.text}}>{e.name}</span><span style={{fontSize:11,color:diffColor[e.difficulty],fontWeight:600}}>{e.difficulty}</span></div><div style={{background:dark?"rgba(255,255,255,0.08)":"#f1f5f9",borderRadius:10,height:10,overflow:"hidden"}}><div style={{height:"100%",borderRadius:10,background:diffColor[e.difficulty],width:`${e.diffScore*20}%`,transition:"width 0.5s ease"}}/></div></div>))}
        </div>
        <div style={{background:"linear-gradient(135deg,#1a1a2e,#2d1b69)",borderRadius:13,padding:"14px"}}>
          <div style={{fontSize:12,fontWeight:600,color:"rgba(255,255,255,0.6)",marginBottom:8}}>💡 QUICK VERDICT</div>
          <div style={{fontSize:13,color:"#fff",lineHeight:1.7}}>{e1.diffScore<e2.diffScore?`✅ ${e1.name} is easier than ${e2.name}.`:e1.diffScore>e2.diffScore?`✅ ${e2.name} is easier than ${e1.name}.`:`🤝 Both have similar difficulty.`} Choose based on your stream and career goals!</div>
        </div>
      </div>
    </div>
  );
}

function ChatPage({setNavTab,T,dark}){
  const [messages,setMessages]=useState([{role:"bot",text:`👋 Hi! I'm **ExamBot**!\n\nI know about **${exams.length}+ Indian exams** — JEE, NEET, UPSC, CAT, SSC, Banking, Law, Defence, CA, State PSC and more!\n\nWhat would you like to know? 😊`}]);
  const [input,setInput]=useState("");const [loading,setLoading]=useState(false);const bottomRef=useRef(null);
  useEffect(()=>{bottomRef.current?.scrollIntoView({behavior:"smooth"});},[messages,loading]);
  const send=(text)=>{const q=(text||input).trim();if(!q||loading)return;setInput("");setMessages(prev=>[...prev,{role:"user",text:q}]);setLoading(true);setTimeout(()=>{setMessages(prev=>[...prev,{role:"bot",text:getBotReply(q)}]);setLoading(false);},700);};
  const fmt=(t)=>t.replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>").replace(/\n/g,"<br/>");
  return(
    <div style={{height:"100vh",display:"flex",flexDirection:"column",background:T.bg}}>
      <div style={{background:"linear-gradient(135deg,#1e1b4b,#312e81)",padding:"14px 16px",display:"flex",alignItems:"center",gap:12,flexShrink:0}}>
        <button onClick={()=>setNavTab("home")} style={{background:"rgba(255,255,255,0.15)",border:"none",borderRadius:10,padding:"7px 12px",color:"#fff",cursor:"pointer",fontSize:13,fontFamily:"inherit"}}>← Back</button>
        <div style={{width:34,height:34,background:"linear-gradient(135deg,#6366f1,#ec4899)",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontSize:17}}>🤖</div>
        <div><div style={{fontSize:14,fontWeight:700,color:"#fff"}}>ExamBot AI</div><div style={{fontSize:11,color:"rgba(255,255,255,0.6)"}}>{exams.length}+ exams · Ask anything</div></div>
        <div style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:5}}><div style={{width:7,height:7,borderRadius:"50%",background:"#22c55e"}}/><span style={{fontSize:10,color:"rgba(255,255,255,0.5)"}}>Online</span></div>
      </div>
      {messages.length===1&&(<div style={{padding:"10px 14px",flexShrink:0}}><div style={{fontSize:11,color:T.muted,marginBottom:7}}>💡 Try asking:</div><div style={{display:"flex",flexWrap:"wrap",gap:6}}>{quickQs.map((q,i)=>(<button key={i} onClick={()=>send(q)} style={{background:T.card,border:"1px solid rgba(99,102,241,0.25)",borderRadius:20,padding:"5px 10px",fontSize:11,color:"#6366f1",cursor:"pointer",fontFamily:"inherit",fontWeight:500}}>{q}</button>))}</div></div>)}
      <div style={{flex:1,overflowY:"auto",padding:"10px 14px",display:"flex",flexDirection:"column",gap:10}}>
        {messages.map((msg,i)=>(<div key={i} style={{display:"flex",justifyContent:msg.role==="user"?"flex-end":"flex-start",animation:"fadeIn 0.3s ease forwards"}}>{msg.role==="bot"&&<div style={{width:28,height:28,background:"linear-gradient(135deg,#6366f1,#ec4899)",borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,flexShrink:0,marginRight:7,alignSelf:"flex-end"}}>🤖</div>}<div style={{maxWidth:"82%",padding:"10px 13px",borderRadius:msg.role==="user"?"16px 16px 4px 16px":"16px 16px 16px 4px",background:msg.role==="user"?"linear-gradient(135deg,#6366f1,#818cf8)":T.card,color:msg.role==="user"?"#fff":T.text,fontSize:13,lineHeight:1.7,boxShadow:"0 2px 8px rgba(0,0,0,0.1)"}} dangerouslySetInnerHTML={{__html:fmt(msg.text)}}/></div>))}
        {loading&&(<div style={{display:"flex",gap:7,alignItems:"flex-end"}}><div style={{width:28,height:28,background:"linear-gradient(135deg,#6366f1,#ec4899)",borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13}}>🤖</div><div style={{background:T.card,borderRadius:"16px 16px 16px 4px",padding:"13px 16px",display:"flex",gap:5,alignItems:"center"}}>{[0,1,2].map(j=><div key={j} style={{width:7,height:7,borderRadius:"50%",background:"#6366f1",animation:"bounce 0.8s ease infinite",animationDelay:`${j*0.15}s`}}/>)}</div></div>)}
        <div ref={bottomRef}/>
      </div>
      <div style={{padding:"10px 14px",background:T.navBg,borderTop:`1px solid ${T.border}`,display:"flex",gap:9,alignItems:"flex-end",flexShrink:0}}>
        <textarea value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send();}}} placeholder="Ask about any exam..." rows={1} style={{flex:1,padding:"10px 13px",background:T.card2,border:`1px solid ${T.border}`,borderRadius:13,fontSize:13,fontFamily:"inherit",resize:"none",color:T.text,maxHeight:90}}/>
        <button onClick={()=>send()} disabled={loading||!input.trim()} style={{width:42,height:42,borderRadius:13,border:"none",cursor:loading||!input.trim()?"not-allowed":"pointer",background:loading||!input.trim()?"#334155":"linear-gradient(135deg,#6366f1,#818cf8)",color:"#fff",fontSize:17,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>➤</button>
      </div>
    </div>
  );
}

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
            <div style={{fontSize:10,color:"rgba(255,255,255,0.7)",textTransform:"uppercase",marginBottom:2}}>{exam.category}</div>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:21,fontWeight:900,color:"#fff",lineHeight:1.1}}>{exam.name}</div>
            <div style={{fontSize:11,color:"rgba(255,255,255,0.75)",marginTop:2}}>{exam.full}</div>
          </div>
        </div>
        <div style={{display:"flex",background:"rgba(0,0,0,0.15)",borderRadius:11,overflow:"hidden",marginBottom:14}}>
          {[["Marks",exam.pattern.total],["Duration",exam.pattern.duration],["Seats",exam.seats]].map(([l,v],i)=>(<div key={l} style={{flex:1,padding:"9px 6px",textAlign:"center",borderRight:i<2?"1px solid rgba(255,255,255,0.1)":"none"}}><div style={{fontSize:9,color:"rgba(255,255,255,0.6)",textTransform:"uppercase",marginBottom:2}}>{l}</div><div style={{fontSize:10,fontWeight:600,color:"#fff",lineHeight:1.3}}>{v}</div></div>))}
        </div>
        <div style={{display:"flex",overflowX:"auto"}}>{tabs.map(t=>(<button key={t.id} onClick={()=>setTab(t.id)} style={{flexShrink:0,padding:"9px 13px",background:"none",border:"none",cursor:"pointer",fontSize:11,fontFamily:"inherit",fontWeight:tab===t.id?600:400,color:tab===t.id?"#fff":"rgba(255,255,255,0.55)",borderBottom:`2px solid ${tab===t.id?"#fff":"transparent"}`,whiteSpace:"nowrap"}}>{t.icon} {t.label}</button>))}</div>
      </div>
      <div style={{background:T.card,padding:"10px 16px",borderBottom:`1px solid ${T.border}`,display:"flex",gap:7}}><span>✅</span><div style={{fontSize:12,color:T.subtext,lineHeight:1.6}}><strong style={{color:T.text}}>Eligibility:</strong> {exam.eligibility}</div></div>
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
          {icon:"📚",title:"Who We Are",text:`ExamNest is India's most complete free exam platform — covering ${count}+ exams across Engineering, Medical, Government, Banking, Management, Law, Defence, Design, State PSC, Commerce & more!`,color:"#f97316"},
          {icon:"🤖",title:"AI Chatbot",text:"ExamBot knows all Indian exams — ask about syllabus, cutoffs, books, tips, eligibility instantly!",color:"#6366f1"},
          {icon:"⚖️",title:"Exam Comparison",text:"Compare any 2 exams side by side — difficulty, salary, seats, duration, eligibility and more!",color:"#0ea5e9"},
          {icon:"📅",title:"Study Planner",text:"Personalised weekly plan + topic tracker. Progress saved permanently — never resets! 🔒",color:"#16a34a"},
          {icon:"🌙",title:"Dark Mode",text:"Easy on eyes for night studying! Tap the moon icon in the top bar to switch.",color:"#7c3aed"},
        ].map((item,i)=>(
          <div key={i} style={{background:T.card,borderRadius:14,padding:"16px",marginBottom:11,boxShadow:dark?"0 2px 8px rgba(0,0,0,0.3)":"0 2px 8px rgba(0,0,0,0.05)",display:"flex",gap:13,alignItems:"flex-start"}}>
            <div style={{width:42,height:42,background:item.color+"20",borderRadius:11,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{item.icon}</div>
            <div><div style={{fontFamily:"'Playfair Display',serif",fontSize:15,fontWeight:700,marginBottom:5,color:T.text}}>{item.title}</div><div style={{fontSize:13,color:T.subtext,lineHeight:1.7}}>{item.text}</div></div>
          </div>
        ))}
        <div style={{textAlign:"center",marginTop:16,fontSize:12,color:T.muted}}>© 2026 ExamNest · {count}+ Exams · Made with ❤️ for Indian Students</div>
      </div>
    </div>
  );
}
