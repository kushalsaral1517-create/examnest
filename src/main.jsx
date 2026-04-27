import { useState, useEffect } from "react";

const exams = [
  {
    id: "jee",
    name: "JEE Main",
    full: "Joint Entrance Examination",
    category: "Engineering",
    color: "#f97316",
    icon: "⚙️",
    difficulty: "High",
    frequency: "Twice a year",
    syllabus: ["Physics: Mechanics, Thermodynamics, Electrostatics, Optics, Modern Physics", "Chemistry: Physical, Organic & Inorganic Chemistry", "Mathematics: Algebra, Calculus, Coordinate Geometry, Trigonometry, Statistics"],
    pattern: { duration: "3 hours", questions: "90 MCQs", total: "300 marks", negative: "Yes (-1 per wrong)" },
    cutoff: [{ year: 2024, general: 90.7, obc: 75.3, sc: 54.0, st: 44.1 }, { year: 2023, general: 88.4, obc: 72.1, sc: 51.9, st: 42.0 }],
    books: ["HC Verma – Concepts of Physics", "NCERT Chemistry (XI & XII)", "RD Sharma / Arihant Maths", "DC Pandey – Electricity & Magnetism"],
    eligibility: "Class 12 passed/appearing with PCM. Min 75% marks (65% for SC/ST).",
    tips: ["Master NCERT thoroughly before advanced books", "Solve 10+ years of previous papers", "Focus on weak chapters with targeted practice", "Attempt mock tests under real exam conditions"]
  },
  {
    id: "neet",
    name: "NEET UG",
    full: "National Eligibility cum Entrance Test",
    category: "Medical",
    color: "#10b981",
    icon: "🩺",
    difficulty: "Very High",
    frequency: "Once a year",
    syllabus: ["Physics: Class 11 & 12 NCERT syllabus", "Chemistry: Physical, Organic, Inorganic (NCERT)", "Biology: Botany & Zoology (NCERT XI & XII)"],
    pattern: { duration: "3 hours 20 min", questions: "200 (attempt 180)", total: "720 marks", negative: "Yes (-1 per wrong)" },
    cutoff: [{ year: 2024, general: 720, obc: 137, sc: 107, st: 107 }, { year: 2023, general: 720, obc: 129, sc: 100, st: 100 }],
    books: ["NCERT Biology XI & XII (most important)", "DC Pandey – Physics for NEET", "OP Tandon – Physical Chemistry", "MTG Objective NCERT at Your Fingertips"],
    eligibility: "Class 12 with PCB. Min age 17. Indian nationals, NRIs, OCIs eligible.",
    tips: ["NCERT is bible – read every line", "Biology carries 360/720 marks — top priority", "Revise with spaced repetition", "Attempt full mocks weekly from Jan onwards"]
  },
  {
    id: "upsc",
    name: "UPSC CSE",
    full: "Civil Services Examination",
    category: "Government",
    color: "#6366f1",
    icon: "🏛️",
    difficulty: "Extremely High",
    frequency: "Once a year",
    syllabus: ["Prelims: GS Paper I, CSAT (Paper II)", "Mains: Essay, GS I–IV, Optional (2 papers)", "Interview: Personality Test (275 marks)"],
    pattern: { duration: "Prelims: 4hr | Mains: 9 papers", questions: "Prelims 200 MCQs | Mains descriptive", total: "2025 marks (Mains+Interview)", negative: "Prelims: -0.33 per wrong" },
    cutoff: [{ year: 2024, general: 104, obc: 98, sc: 88, st: 84 }, { year: 2023, general: 101, obc: 95, sc: 85, st: 81 }],
    books: ["NCERT (VI–XII) – Foundation", "Laxmikanth – Indian Polity", "Spectrum – Modern Indian History", "Economic Survey + India Yearbook"],
    eligibility: "Graduate from recognised university. Age: 21–32 (Gen), relaxation for reserved categories.",
    tips: ["Start with NCERTs before standard books", "Make concise notes from Day 1", "Read The Hindu / Indian Express daily", "Choose optional wisely — play to your strength"]
  },
  {
    id: "cat",
    name: "CAT",
    full: "Common Admission Test",
    category: "Management",
    color: "#ec4899",
    icon: "📊",
    difficulty: "High",
    frequency: "Once a year",
    syllabus: ["VARC: Reading Comprehension, Para Summary, Para Jumbles", "DILR: Data Interpretation, Logical Reasoning", "QA: Arithmetic, Algebra, Geometry, Number System"],
    pattern: { duration: "2 hours", questions: "66 questions", total: "198 marks", negative: "Yes (-1 per wrong MCQ)" },
    cutoff: [{ year: 2024, general: 99, obc: 97, sc: 90, st: 85 }, { year: 2023, general: 99, obc: 96, sc: 88, st: 83 }],
    books: ["Arun Sharma – QA & DI", "Verbal Ability by Arun Sharma", "TIME/CL study material", "Previous year CAT papers"],
    eligibility: "Graduate with minimum 50% marks (45% for SC/ST/PWD). Final year students can also apply.",
    tips: ["Accuracy > Speed — don't guess randomly", "VARC: Read editorials daily", "DILR: Practice set-based questions", "Attempt 3–4 mocks per week from August"]
  },
  {
    id: "gate",
    name: "GATE",
    full: "Graduate Aptitude Test in Engineering",
    category: "Engineering",
    color: "#f59e0b",
    icon: "🔬",
    difficulty: "High",
    frequency: "Once a year",
    syllabus: ["Core Engineering Subject (varies by branch)", "Engineering Mathematics", "General Aptitude (Verbal + Numerical)"],
    pattern: { duration: "3 hours", questions: "65 questions", total: "100 marks", negative: "Yes (MCQs only)" },
    cutoff: [{ year: 2024, general: 31.7, obc: 28.5, sc: 21.1, st: 21.1 }, { year: 2023, general: 30.0, obc: 27.0, sc: 20.0, st: 20.0 }],
    books: ["Made Easy / ACE Academy notes", "Standard textbooks by subject", "Previous 15 years GATE papers", "Aptitude: RS Aggarwal"],
    eligibility: "B.E/B.Tech/B.Sc(Research)/B.S (3rd year or passed). Also M.Sc/MCA/MA.",
    tips: ["Complete syllabus with weightage analysis", "Engineering Maths is high scoring — don't skip", "Practice numerical answer type questions", "Solve subject-wise previous year questions"]
  },
  {
    id: "ssc",
    name: "SSC CGL",
    full: "Staff Selection Commission Combined Graduate Level",
    category: "Government",
    color: "#14b8a6",
    icon: "📋",
    difficulty: "Moderate",
    frequency: "Once a year",
    syllabus: ["General Intelligence & Reasoning", "General Awareness (Current Affairs, Static GK)", "Quantitative Aptitude", "English Comprehension"],
    pattern: { duration: "Tier I: 60 min | Tier II: 2.5 hr", questions: "Tier I: 100 | Tier II: varies", total: "Tier I: 200 | Tier II: 800", negative: "Yes (Tier I: -0.5, Tier II: -1)" },
    cutoff: [{ year: 2024, general: 145, obc: 138, sc: 128, st: 120 }, { year: 2023, general: 142, obc: 135, sc: 125, st: 117 }],
    books: ["Lucent GK", "RS Aggarwal – Maths & Reasoning", "SP Bakshi – English", "Kiran SSC CGL Previous Papers"],
    eligibility: "Graduate from recognised university. Age: 18–32 (varies by post).",
    tips: ["Current affairs from last 6 months", "Speed & accuracy in Quant is key", "English grammar rules — memorize patterns", "Daily 2 hours of practice tests"]
  },
];

const categories = ["All", "Engineering", "Medical", "Government", "Management"];

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { background: #fafaf8; }
  :root {
    --cream: #fafaf8;
    --dark: #1a1a2e;
    --mid: #2d2d44;
    --gold: #c9a84c;
    --gold-light: #e8c97e;
    --ink: #2c2c3e;
    --muted: #8b8b9a;
    --border: rgba(44,44,62,0.1);
  }
  @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
  @keyframes shimmer { 0%,100% { background-position: -200% center; } 50% { background-position: 200% center; } }
  @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.6; } }
  @keyframes slideDown { from { opacity:0; transform:translateY(-8px); } to { opacity:1; transform:translateY(0); } }
  .card-hover { transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1); }
  .card-hover:hover { transform: translateY(-4px); box-shadow: 0 20px 60px rgba(44,44,62,0.12) !important; }
  ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: #f0ede8; } ::-webkit-scrollbar-thumb { background: #c9a84c; border-radius: 3px; }
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

  const openExam = (exam) => { setSelected(exam); setPage("detail"); setTab("syllabus"); window.scrollTo(0, 0); };
  const goHome = () => { setPage("home"); setSelected(null); setAboutPage(false); };

  if (aboutPage) return <AboutPage goHome={goHome} />;
  if (page === "detail" && selected) return <DetailPage exam={selected} goHome={goHome} tab={tab} setTab={setTab} />;

  return (
    <>
      <style>{globalStyles}</style>
      <div style={{ minHeight: "100vh", background: "var(--cream)", fontFamily: "'DM Sans', sans-serif", color: "var(--ink)" }}>
        {/* Nav */}
        <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(250,250,248,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid var(--border)", padding: "0 24px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
            <div onClick={goHome} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 36, height: 36, background: "var(--dark)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>📚</div>
              <div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: "var(--dark)", lineHeight: 1 }}>ExamNest</div>
                <div style={{ fontSize: 10, color: "var(--gold)", letterSpacing: "0.15em", textTransform: "uppercase" }}>Exam Guidance</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={goHome} style={{ padding: "8px 16px", background: "none", border: "none", cursor: "pointer", color: "var(--muted)", fontSize: 14, fontFamily: "inherit", fontWeight: 500 }}>Exams</button>
              <button onClick={() => setAboutPage(true)} style={{ padding: "8px 16px", background: "none", border: "none", cursor: "pointer", color: "var(--muted)", fontSize: 14, fontFamily: "inherit", fontWeight: 500 }}>About</button>
              <button style={{ padding: "8px 18px", background: "var(--dark)", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontSize: 13, fontFamily: "inherit", fontWeight: 500 }}>Newsletter</button>
            </div>
          </div>
        </nav>

        {/* Hero */}
        <div style={{ background: "var(--dark)", color: "#fff", padding: "72px 24px 64px", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 30% 50%, rgba(201,168,76,0.15) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(99,102,241,0.1) 0%, transparent 60%)" }} />
          <div style={{ maxWidth: 700, margin: "0 auto", position: "relative", animation: "fadeUp 0.7s ease forwards" }}>
            <div style={{ display: "inline-block", background: "rgba(201,168,76,0.15)", border: "1px solid rgba(201,168,76,0.3)", borderRadius: 20, padding: "6px 16px", fontSize: 12, color: "var(--gold-light)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 24 }}>
              ✦ Complete Exam Guidance Platform
            </div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px,6vw,64px)", fontWeight: 900, lineHeight: 1.1, marginBottom: 20 }}>
              Every Exam.<br />
              <span style={{ background: "linear-gradient(135deg, var(--gold), var(--gold-light))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>One Place.</span>
            </h1>
            <p style={{ fontSize: 18, color: "rgba(255,255,255,0.65)", lineHeight: 1.7, marginBottom: 40, maxWidth: 520, margin: "0 auto 40px" }}>
              Syllabus, cutoffs, books, eligibility & strategy — everything you need to crack competitive exams in India.
            </p>
            {/* Search */}
            <div style={{ position: "relative", maxWidth: 480, margin: "0 auto" }}>
              <span style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", fontSize: 18, color: "rgba(255,255,255,0.4)" }}>🔍</span>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search JEE, NEET, UPSC, CAT..."
                style={{ width: "100%", padding: "16px 20px 16px 48px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 14, color: "#fff", fontSize: 16, fontFamily: "inherit", outline: "none", backdropFilter: "blur(10px)" }} />
            </div>
          </div>
          {/* Stats */}
          <div style={{ display: "flex", justifyContent: "center", gap: "clamp(24px,5vw,80px)", marginTop: 56, position: "relative" }}>
            {[["6+", "Exams Covered"], ["100%", "Free Access"], ["2026", "Updated For"]].map(([n, l]) => (
              <div key={l} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 700, color: "var(--gold-light)" }}>{n}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Main content */}
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 24px" }}>
          {/* Category filter */}
          <div style={{ display: "flex", gap: 8, marginBottom: 40, flexWrap: "wrap", alignItems: "center" }}>
            <span style={{ fontSize: 13, color: "var(--muted)", marginRight: 8, fontWeight: 500 }}>Filter:</span>
            {categories.map(c => (
              <button key={c} onClick={() => setCategory(c)} style={{
                padding: "8px 18px", borderRadius: 20, border: "1px solid", cursor: "pointer", fontSize: 13, fontFamily: "inherit", fontWeight: 500, transition: "all 0.2s",
                background: category === c ? "var(--dark)" : "transparent",
                color: category === c ? "#fff" : "var(--muted)",
                borderColor: category === c ? "var(--dark)" : "var(--border)",
              }}>{c}</button>
            ))}
          </div>

          {/* Exam cards grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24 }}>
            {filtered.map((exam, i) => (
              <div key={exam.id} onClick={() => openExam(exam)} className="card-hover" style={{
                background: "#fff", borderRadius: 20, overflow: "hidden", cursor: "pointer",
                border: "1px solid var(--border)",
                boxShadow: "0 2px 20px rgba(44,44,62,0.06)",
                animation: `fadeUp 0.5s ease forwards ${i * 0.08}s`, opacity: 0,
              }}>
                <div style={{ height: 6, background: exam.color }} />
                <div style={{ padding: 28 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                    <div style={{ fontSize: 40 }}>{exam.icon}</div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
                      <span style={{ background: exam.color + "18", color: exam.color, fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 10, letterSpacing: "0.05em" }}>{exam.category}</span>
                      <span style={{ fontSize: 11, color: "var(--muted)" }}>{exam.frequency}</span>
                    </div>
                  </div>
                  <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, color: "var(--dark)", marginBottom: 6 }}>{exam.name}</h2>
                  <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 20, lineHeight: 1.5 }}>{exam.full}</p>
                  <div style={{ display: "flex", gap: 16, marginBottom: 20 }}>
                    {[["Difficulty", exam.difficulty], ["Duration", exam.pattern.duration]].map(([label, value]) => (
                      <div key={label}>
                        <div style={{ fontSize: 10, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{label}</div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: "var(--ink)", marginTop: 2 }}>{value}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ fontSize: 12, color: "var(--muted)" }}>{exam.pattern.questions} · {exam.pattern.total}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, color: exam.color, fontWeight: 600, fontSize: 13 }}>
                      Explore <span style={{ fontSize: 16 }}>→</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "80px 0", color: "var(--muted)" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
              <div style={{ fontSize: 18, fontWeight: 500 }}>No exams found for "{search}"</div>
              <div style={{ fontSize: 14, marginTop: 8 }}>Try searching for JEE, NEET, UPSC, CAT, GATE, or SSC</div>
            </div>
          )}
        </div>

        {/* Footer */}
        <Footer setAboutPage={setAboutPage} />
      </div>
    </>
  );
}

function DetailPage({ exam, goHome, tab, setTab }) {
  const tabs = ["syllabus", "pattern", "cutoff", "books", "tips"];
  return (
    <>
      <style>{globalStyles}</style>
      <div style={{ minHeight: "100vh", background: "var(--cream)", fontFamily: "'DM Sans', sans-serif", color: "var(--ink)" }}>
        <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(250,250,248,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid var(--border)", padding: "0 24px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", gap: 16, height: 64 }}>
            <button onClick={goHome} style={{ background: "none", border: "1px solid var(--border)", borderRadius: 8, padding: "6px 12px", cursor: "pointer", fontSize: 13, color: "var(--muted)", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 6 }}>
              ← Back
            </button>
            <div onClick={goHome} style={{ cursor: "pointer", fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: "var(--dark)" }}>ExamNest</div>
          </div>
        </nav>

        {/* Hero */}
        <div style={{ background: exam.color, color: "#fff", padding: "48px 24px 56px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", animation: "fadeUp 0.5s ease forwards" }}>
            <div style={{ fontSize: 14, opacity: 0.8, marginBottom: 8 }}>{exam.category}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
              <div style={{ fontSize: 64 }}>{exam.icon}</div>
              <div>
                <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px,5vw,52px)", fontWeight: 900, lineHeight: 1.1 }}>{exam.name}</h1>
                <p style={{ opacity: 0.85, fontSize: 16, marginTop: 6 }}>{exam.full}</p>
              </div>
            </div>
            <div style={{ display: "flex", gap: 32, marginTop: 32, flexWrap: "wrap" }}>
              {[["Difficulty", exam.difficulty], ["Frequency", exam.frequency], ["Total Marks", exam.pattern.total], ["Negative Marking", exam.pattern.negative]].map(([l, v]) => (
                <div key={l}>
                  <div style={{ fontSize: 11, opacity: 0.7, textTransform: "uppercase", letterSpacing: "0.1em" }}>{l}</div>
                  <div style={{ fontSize: 16, fontWeight: 600, marginTop: 4 }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Eligibility banner */}
        <div style={{ background: "#fff", borderBottom: "1px solid var(--border)" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "16px 24px", display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 20 }}>✅</span>
            <div>
              <span style={{ fontSize: 12, fontWeight: 600, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Eligibility: </span>
              <span style={{ fontSize: 14, color: "var(--ink)" }}>{exam.eligibility}</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ background: "#fff", borderBottom: "1px solid var(--border)", position: "sticky", top: 64, zIndex: 50 }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", display: "flex", gap: 0, overflowX: "auto" }}>
            {tabs.map(t => (
              <button key={t} onClick={() => setTab(t)} style={{
                padding: "16px 20px", background: "none", border: "none", cursor: "pointer",
                fontSize: 14, fontFamily: "inherit", fontWeight: tab === t ? 600 : 400,
                color: tab === t ? exam.color : "var(--muted)",
                borderBottom: `2px solid ${tab === t ? exam.color : "transparent"}`,
                textTransform: "capitalize", whiteSpace: "nowrap", transition: "all 0.2s",
              }}>{t === "pattern" ? "Exam Pattern" : t === "cutoff" ? "Cutoff Marks" : t.charAt(0).toUpperCase() + t.slice(1)}</button>
            ))}
          </div>
        </div>

        {/* Tab content */}
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px 80px", animation: "slideDown 0.3s ease forwards" }}>
          {tab === "syllabus" && (
            <div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, marginBottom: 24 }}>Syllabus Overview</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
                {exam.syllabus.map((s, i) => {
                  const [subject, ...topics] = s.split(": ");
                  return (
                    <div key={i} style={{ background: "#fff", borderRadius: 16, padding: 24, border: "1px solid var(--border)", borderLeft: `4px solid ${exam.color}` }}>
                      <h3 style={{ fontWeight: 700, fontSize: 16, marginBottom: 10, color: "var(--dark)" }}>{subject}</h3>
                      <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.7 }}>{topics.join(": ")}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {tab === "pattern" && (
            <div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, marginBottom: 24 }}>Exam Pattern</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 20 }}>
                {Object.entries(exam.pattern).map(([k, v]) => (
                  <div key={k} style={{ background: "#fff", borderRadius: 16, padding: 24, border: "1px solid var(--border)", textAlign: "center" }}>
                    <div style={{ fontSize: 11, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 12 }}>{k.replace(/([A-Z])/g, " $1").trim()}</div>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: exam.color }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {tab === "cutoff" && (
            <div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, marginBottom: 24 }}>Previous Year Cutoffs</h2>
              <div style={{ background: "#fff", borderRadius: 20, border: "1px solid var(--border)", overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                  <thead>
                    <tr style={{ background: exam.color + "15" }}>
                      {["Year", "General", "OBC", "SC", "ST"].map(h => (
                        <th key={h} style={{ padding: "16px 20px", textAlign: "left", fontWeight: 600, color: "var(--dark)", fontSize: 13, letterSpacing: "0.05em" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {exam.cutoff.map((row, i) => (
                      <tr key={i} style={{ borderTop: "1px solid var(--border)" }}>
                        <td style={{ padding: "16px 20px", fontWeight: 700, color: exam.color }}>{row.year}</td>
                        <td style={{ padding: "16px 20px" }}>{row.general}</td>
                        <td style={{ padding: "16px 20px" }}>{row.obc}</td>
                        <td style={{ padding: "16px 20px" }}>{row.sc}</td>
                        <td style={{ padding: "16px 20px" }}>{row.st}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 12 }}>* Cutoff figures are indicative. Always verify from official sources.</p>
            </div>
          )}
          {tab === "books" && (
            <div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, marginBottom: 24 }}>Recommended Books</h2>
              <div style={{ display: "grid", gap: 12 }}>
                {exam.books.map((book, i) => (
                  <div key={i} style={{ background: "#fff", borderRadius: 14, padding: "18px 24px", border: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{ width: 36, height: 36, background: exam.color + "18", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>📖</div>
                    <div style={{ fontSize: 15, fontWeight: 500, color: "var(--ink)" }}>{book}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {tab === "tips" && (
            <div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, marginBottom: 24 }}>Preparation Tips</h2>
              <div style={{ display: "grid", gap: 16 }}>
                {exam.tips.map((tip, i) => (
                  <div key={i} style={{ background: "#fff", borderRadius: 16, padding: "20px 24px", border: "1px solid var(--border)", display: "flex", gap: 16, alignItems: "flex-start" }}>
                    <div style={{ width: 32, height: 32, background: exam.color, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 15, flexShrink: 0 }}>{i + 1}</div>
                    <p style={{ fontSize: 15, color: "var(--ink)", lineHeight: 1.7, paddingTop: 4 }}>{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <Footer setAboutPage={() => {}} />
      </div>
    </>
  );
}

function AboutPage({ goHome }) {
  return (
    <>
      <style>{globalStyles}</style>
      <div style={{ minHeight: "100vh", background: "var(--cream)", fontFamily: "'DM Sans', sans-serif" }}>
        <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(250,250,248,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid var(--border)", padding: "0 24px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", gap: 16, height: 64 }}>
            <button onClick={goHome} style={{ background: "none", border: "1px solid var(--border)", borderRadius: 8, padding: "6px 12px", cursor: "pointer", fontSize: 13, color: "var(--muted)", fontFamily: "inherit" }}>← Back</button>
            <div onClick={goHome} style={{ cursor: "pointer", fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: "var(--dark)" }}>ExamNest</div>
          </div>
        </nav>
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "72px 24px" }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 52, fontWeight: 900, color: "var(--dark)", marginBottom: 24, animation: "fadeUp 0.6s ease forwards" }}>About ExamNest</h1>
          {[
            ["Who We Are", "ExamNest is an educational information platform created to help students find accurate, clear, and up-to-date details about all types of competitive exams across India."],
            ["What We Do", "We provide detailed information such as syllabus, exam pattern, cutoff marks, previous year cutoffs, eligibility criteria, preparation strategies, and recommended books for various exams."],
            ["Our Mission", "Our mission is to make exam-related information easily accessible to every student, so they can prepare with confidence and clarity — without scattering their attention across dozens of websites."],
            ["Why ExamNest?", "We believe students should not waste time searching across multiple websites. ExamNest aims to be a trusted and reliable one-stop source for all exam information."],
          ].map(([title, text], i) => (
            <div key={title} style={{ marginBottom: 40, animation: `fadeUp 0.6s ease forwards ${i * 0.1 + 0.2}s`, opacity: 0 }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, color: "var(--dark)", marginBottom: 12 }}>{title}</h2>
              <p style={{ fontSize: 16, color: "var(--muted)", lineHeight: 1.8 }}>{text}</p>
            </div>
          ))}
        </div>
        <Footer setAboutPage={() => {}} />
      </div>
    </>
  );
}

function Footer({ setAboutPage }) {
  return (
    <footer style={{ background: "var(--dark)", color: "rgba(255,255,255,0.5)", padding: "40px 24px", textAlign: "center" }}>
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: "#fff", marginBottom: 16 }}>ExamNest</div>
      <div style={{ display: "flex", justifyContent: "center", gap: 24, flexWrap: "wrap", marginBottom: 20, fontSize: 14 }}>
        {["About Us", "Privacy Policy", "Disclaimer", "Contact"].map(link => (
          <span key={link} onClick={() => link === "About Us" && setAboutPage(true)}
            style={{ cursor: "pointer", transition: "color 0.2s" }}
            onMouseEnter={e => e.target.style.color = "var(--gold-light)"}
            onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.5)"}
          >{link}</span>
        ))}
      </div>
      <div style={{ fontSize: 12 }}>© 2026 ExamNest · Complete Exam Guidance for All Exams</div>
    </footer>
  );
    }
