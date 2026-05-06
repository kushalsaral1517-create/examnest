import { useState } from "react";

// ═══════════════════════════════════════════════════════
// CAREER GUIDE COMPONENT WITH INTERACTIVE CHARTS
// ═══════════════════════════════════════════════════════

const careerData = {
  after10th: {
    streams: [
      {
        name: "Science (PCM)",
        icon: "🔬",
        color: "#3b82f6",
        popularity: 35,
        careers: ["Engineering", "Architecture", "Computer Science", "Research", "Aviation", "Defense"],
        exams: ["JEE Main", "JEE Advanced", "BITSAT", "VITEEE", "NDA"]
      },
      {
        name: "Science (PCB)",
        icon: "🩺",
        color: "#10b981",
        popularity: 30,
        careers: ["Medicine (MBBS)", "Dentistry", "Pharmacy", "Nursing", "Biotechnology", "Veterinary"],
        exams: ["NEET UG", "AIIMS", "JIPMER", "NEET MDS", "AFMC"]
      },
      {
        name: "Commerce",
        icon: "💼",
        color: "#f59e0b",
        popularity: 25,
        careers: ["CA", "CS", "Banking", "Finance", "Economics", "Business Management"],
        exams: ["CA Foundation", "CS Executive", "CLAT", "BBA Entrance", "IPM"]
      },
      {
        name: "Arts/Humanities",
        icon: "🎨",
        color: "#8b5cf6",
        popularity: 15,
        careers: ["Law", "Psychology", "Journalism", "Teaching", "Civil Services", "Design"],
        exams: ["CLAT", "NID", "NIFT", "UCEED", "Hotel Management"]
      },
      {
        name: "Vocational",
        icon: "⚙️",
        color: "#ef4444",
        popularity: 10,
        careers: ["ITI Courses", "Polytechnic", "Hotel Management", "Fashion Design", "Agriculture"],
        exams: ["ITI Entrance", "Diploma Entrance", "NIFT", "IHM"]
      }
    ]
  },
  
  after12th: {
    science: [
      { career: "Engineering", avgSalary: "₹6-15 LPA", duration: "4 years", seats: "15 Lakh+", difficulty: 85 },
      { career: "Medicine (MBBS)", avgSalary: "₹8-25 LPA", duration: "5.5 years", seats: "90,000", difficulty: 95 },
      { career: "Architecture", avgSalary: "₹5-12 LPA", duration: "5 years", seats: "40,000", difficulty: 75 },
      { career: "BSc + Research", avgSalary: "₹4-10 LPA", duration: "3-5 years", seats: "10 Lakh+", difficulty: 60 },
      { career: "Pharmacy", avgSalary: "₹3-8 LPA", duration: "4 years", seats: "2 Lakh+", difficulty: 65 },
      { career: "Nursing", avgSalary: "₹3-7 LPA", duration: "4 years", seats: "1.5 Lakh", difficulty: 55 }
    ],
    commerce: [
      { career: "CA (Chartered Accountant)", avgSalary: "₹7-20 LPA", duration: "4-5 years", seats: "20,000/year", difficulty: 90 },
      { career: "CS (Company Secretary)", avgSalary: "₹6-15 LPA", duration: "3-4 years", seats: "5,000/year", difficulty: 85 },
      { career: "BBA + MBA", avgSalary: "₹8-25 LPA", duration: "5 years", seats: "5 Lakh+", difficulty: 70 },
      { career: "B.Com + CA/CS", avgSalary: "₹5-12 LPA", duration: "3-5 years", seats: "10 Lakh+", difficulty: 75 },
      { career: "Economics + UPSC", avgSalary: "₹10-40 LPA", duration: "3+ years", seats: "1,000/year", difficulty: 95 },
      { career: "Banking (IBPS)", avgSalary: "₹4-12 LPA", duration: "1-2 years", seats: "50,000/year", difficulty: 70 }
    ],
    arts: [
      { career: "Law (5 Yr Integrated)", avgSalary: "₹6-20 LPA", duration: "5 years", seats: "60,000", difficulty: 80 },
      { career: "UPSC Civil Services", avgSalary: "₹10-50 LPA", duration: "1-3 years", seats: "1,000/year", difficulty: 98 },
      { career: "Journalism", avgSalary: "₹4-12 LPA", duration: "3 years", seats: "50,000", difficulty: 60 },
      { career: "Design (NIFT/NID)", avgSalary: "₹5-15 LPA", duration: "4 years", seats: "10,000", difficulty: 75 },
      { career: "BA + Teaching", avgSalary: "₹3-8 LPA", duration: "3-5 years", seats: "5 Lakh+", difficulty: 55 },
      { career: "Psychology", avgSalary: "₹4-10 LPA", duration: "3-5 years", seats: "30,000", difficulty: 65 }
    ]
  },
  
  afterGraduation: [
    { field: "Engineering", options: ["M.Tech", "MBA", "UPSC (IES)", "PSUs", "Higher Studies Abroad", "Startups"], icon: "⚙️", color: "#3b82f6" },
    { field: "Medicine", options: ["MD/MS", "PG Diploma", "Hospital Practice", "Research", "UPSC (Health Services)"], icon: "🩺", color: "#10b981" },
    { field: "Commerce", options: ["MBA", "M.Com", "CFA", "Banking PO", "UPSC", "PhD"], icon: "💼", color: "#f59e0b" },
    { field: "Arts", options: ["MA", "PhD", "NET/SET", "Civil Services", "Journalism", "Content Writing"], icon: "🎨", color: "#8b5cf6" },
    { field: "Law", options: ["LLM", "Judiciary", "Corporate Practice", "Legal Advisor", "Arbitration"], icon: "⚖️", color: "#ef4444" },
    { field: "Science", options: ["MSc", "PhD", "Research", "Teaching", "CSIR NET", "ISRO/DRDO"], icon: "🔬", color: "#06b6d4" }
  ]
};

function CareerGuidePage({ setNavTab, T, dark }) {
  const [activeLevel, setActiveLevel] = useState("after10th");
  const [selectedStream, setSelectedStream] = useState("science");
  const [expandedCareer, setExpandedCareer] = useState(null);

  // Chart Component for After 10th Stream Popularity
  function StreamPopularityChart({ streams }) {
    const maxPop = Math.max(...streams.map(s => s.popularity));
    return (
      <div style={{ background: T.card, borderRadius: 14, padding: "16px", marginBottom: 16, boxShadow: dark ? "0 2px 12px rgba(0,0,0,0.3)" : "0 2px 8px rgba(0,0,0,0.08)" }}>
        <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 16, fontWeight: 700, marginBottom: 14, color: T.text }}>
          📊 Stream Popularity Among Students
        </div>
        {streams.map((stream, i) => (
          <div key={i} style={{ marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: T.text }}>{stream.icon} {stream.name}</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: stream.color }}>{stream.popularity}%</span>
            </div>
            <div style={{ height: 8, background: T.card2, borderRadius: 4, overflow: "hidden", position: "relative" }}>
              <div style={{ 
                height: "100%", 
                width: (stream.popularity / maxPop * 100) + "%", 
                background: `linear-gradient(90deg, ${stream.color}, ${stream.color}dd)`,
                borderRadius: 4,
                transition: "width 1s ease"
              }} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Career Options Chart (Bar Chart)
  function CareerOptionsChart({ careers, streamType }) {
    return (
      <div style={{ background: T.card, borderRadius: 14, padding: "16px", marginBottom: 16, boxShadow: dark ? "0 2px 12px rgba(0,0,0,0.3)" : "0 2px 8px rgba(0,0,0,0.08)" }}>
        <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 16, fontWeight: 700, marginBottom: 14, color: T.text }}>
          💼 Top Career Options ({streamType})
        </div>
        {careers.map((career, i) => (
          <div 
            key={i} 
            style={{ 
              background: T.card2, 
              borderRadius: 10, 
              padding: "12px 14px", 
              marginBottom: 10,
              cursor: "pointer",
              transition: "all 0.3s ease",
              transform: expandedCareer === i ? "scale(1.02)" : "scale(1)",
              boxShadow: expandedCareer === i ? `0 4px 12px ${T.border}` : "none"
            }}
            onClick={() => setExpandedCareer(expandedCareer === i ? null : i)}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: expandedCareer === i ? 10 : 0 }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: T.text, marginBottom: 2 }}>{career.career}</div>
                <div style={{ fontSize: 11, color: T.subtext }}>💰 {career.avgSalary}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 10, color: T.muted, marginBottom: 2 }}>Difficulty</div>
                <div style={{ 
                  width: 40, 
                  height: 40, 
                  borderRadius: "50%", 
                  background: `conic-gradient(${career.difficulty >= 80 ? "#ef4444" : career.difficulty >= 60 ? "#f59e0b" : "#10b981"} ${career.difficulty}%, ${T.card2} 0)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 11,
                  fontWeight: 700,
                  color: T.text
                }}>
                  {career.difficulty}
                </div>
              </div>
            </div>
            
            {expandedCareer === i && (
              <div style={{ 
                marginTop: 10, 
                paddingTop: 10, 
                borderTop: `1px solid ${T.border}`,
                animation: "slideDown 0.3s ease"
              }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  <div style={{ background: T.card, padding: "8px", borderRadius: 8 }}>
                    <div style={{ fontSize: 10, color: T.muted, marginBottom: 2 }}>⏱️ Duration</div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: T.text }}>{career.duration}</div>
                  </div>
                  <div style={{ background: T.card, padding: "8px", borderRadius: 8 }}>
                    <div style={{ fontSize: 10, color: T.muted, marginBottom: 2 }}>🎓 Seats</div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: T.text }}>{career.seats}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  // After Graduation Options
  function GraduationPathways({ options }) {
    return (
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {options.map((field, i) => (
          <div 
            key={i}
            style={{
              background: T.card,
              borderRadius: 12,
              padding: "14px",
              boxShadow: dark ? "0 2px 12px rgba(0,0,0,0.3)" : "0 2px 8px rgba(0,0,0,0.08)",
              borderTop: `3px solid ${field.color}`
            }}
          >
            <div style={{ 
              width: 42, 
              height: 42, 
              background: field.color + "20", 
              borderRadius: 10, 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center", 
              fontSize: 20,
              marginBottom: 10
            }}>
              {field.icon}
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: T.text, marginBottom: 8 }}>{field.field}</div>
            <div style={{ fontSize: 11, color: T.subtext, lineHeight: 1.5 }}>
              {field.options.slice(0, 3).map((opt, j) => (
                <div key={j} style={{ marginBottom: 4 }}>• {opt}</div>
              ))}
              {field.options.length > 3 && (
                <div style={{ fontSize: 10, color: field.color, fontWeight: 600, marginTop: 4 }}>
                  +{field.options.length - 3} more
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: T.bg, paddingBottom: 80, color: T.text }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)", padding: "14px 16px", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <button 
            onClick={() => setNavTab("home")} 
            style={{ 
              background: "rgba(255,255,255,0.22)", 
              border: "none", 
              borderRadius: 10, 
              padding: "7px 13px", 
              color: "#fff", 
              cursor: "pointer", 
              fontSize: 13, 
              fontFamily: "inherit", 
              fontWeight: 500 
            }}
          >
            ← Back
          </button>
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.85)", letterSpacing: "0.05em" }}>
            ExamNest
          </div>
        </div>
        
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
          <div style={{ 
            width: 50, 
            height: 50, 
            background: "rgba(255,255,255,0.2)", 
            borderRadius: 12, 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center", 
            fontSize: 24 
          }}>
            🎯
          </div>
          <div>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 900, color: "#fff", lineHeight: 1.1 }}>
              Career Guide
            </div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.8)", marginTop: 2 }}>
              Find Your Perfect Career Path
            </div>
          </div>
        </div>

        {/* Level Selector */}
        <div style={{ display: "flex", gap: 8, overflowX: "auto" }}>
          {[
            { id: "after10th", label: "After 10th", icon: "📚" },
            { id: "after12th", label: "After 12th", icon: "🎓" },
            { id: "afterGrad", label: "After Graduation", icon: "🚀" }
          ].map(level => (
            <button
              key={level.id}
              onClick={() => setActiveLevel(level.id)}
              style={{
                flexShrink: 0,
                padding: "8px 14px",
                background: activeLevel === level.id ? "#fff" : "rgba(255,255,255,0.15)",
                border: "none",
                borderRadius: 10,
                cursor: "pointer",
                fontSize: 12,
                fontFamily: "inherit",
                fontWeight: 600,
                color: activeLevel === level.id ? "#6366f1" : "#fff",
                whiteSpace: "nowrap",
                transition: "all 0.3s ease"
              }}
            >
              {level.icon} {level.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "16px" }}>
        {/* After 10th View */}
        {activeLevel === "after10th" && (
          <>
            <StreamPopularityChart streams={careerData.after10th.streams} />
            
            <div style={{ marginTop: 16 }}>
              {careerData.after10th.streams.map((stream, i) => (
                <div 
                  key={i}
                  style={{
                    background: T.card,
                    borderRadius: 14,
                    padding: "16px",
                    marginBottom: 12,
                    boxShadow: dark ? "0 2px 12px rgba(0,0,0,0.3)" : "0 2px 8px rgba(0,0,0,0.08)",
                    borderLeft: `4px solid ${stream.color}`
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                    <div style={{ 
                      width: 48, 
                      height: 48, 
                      background: stream.color + "20", 
                      borderRadius: 12, 
                      display: "flex", 
                      alignItems: "center", 
                      justifyContent: "center", 
                      fontSize: 24 
                    }}>
                      {stream.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: T.text }}>{stream.name}</div>
                      <div style={{ fontSize: 11, color: T.subtext }}>{stream.popularity}% students choose this</div>
                    </div>
                  </div>
                  
                  <div style={{ marginBottom: 10 }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: T.text, marginBottom: 6 }}>🎯 Career Options:</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {stream.careers.map((career, j) => (
                        <span 
                          key={j}
                          style={{
                            background: stream.color + "15",
                            color: stream.color,
                            padding: "4px 10px",
                            borderRadius: 6,
                            fontSize: 11,
                            fontWeight: 500
                          }}
                        >
                          {career}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 600, color: T.text, marginBottom: 6 }}>📝 Key Exams:</div>
                    <div style={{ fontSize: 11, color: T.subtext, lineHeight: 1.6 }}>
                      {stream.exams.join(" • ")}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* After 12th View */}
        {activeLevel === "after12th" && (
          <>
            {/* Stream Tabs */}
            <div style={{ display: "flex", gap: 8, marginBottom: 16, overflowX: "auto" }}>
              {[
                { id: "science", label: "Science", icon: "🔬", color: "#3b82f6" },
                { id: "commerce", label: "Commerce", icon: "💼", color: "#f59e0b" },
                { id: "arts", label: "Arts", icon: "🎨", color: "#8b5cf6" }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setSelectedStream(tab.id);
                    setExpandedCareer(null);
                  }}
                  style={{
                    flex: 1,
                    padding: "10px 16px",
                    background: selectedStream === tab.id ? tab.color : T.card,
                    border: selectedStream === tab.id ? "none" : `1px solid ${T.border}`,
                    borderRadius: 10,
                    cursor: "pointer",
                    fontSize: 13,
                    fontFamily: "inherit",
                    fontWeight: 600,
                    color: selectedStream === tab.id ? "#fff" : T.text,
                    whiteSpace: "nowrap",
                    transition: "all 0.3s ease"
                  }}
                >
                  {tab.icon} {tab.label}
                </button>
              ))}
            </div>

            <CareerOptionsChart 
              careers={careerData.after12th[selectedStream]} 
              streamType={selectedStream.charAt(0).toUpperCase() + selectedStream.slice(1)}
            />
          </>
        )}

        {/* After Graduation View */}
        {activeLevel === "afterGrad" && (
          <>
            <div style={{ 
              background: T.card, 
              borderRadius: 14, 
              padding: "14px", 
              marginBottom: 16,
              boxShadow: dark ? "0 2px 12px rgba(0,0,0,0.3)" : "0 2px 8px rgba(0,0,0,0.08)"
            }}>
              <div style={{ fontSize: 13, color: T.text, lineHeight: 1.7 }}>
                <strong>🎓 Specialization Paths:</strong> After completing your graduation, explore these advanced career options and specializations in your field.
              </div>
            </div>
            
            <GraduationPathways options={careerData.afterGraduation} />
          </>
        )}

        {/* Pro Tip */}
        <div style={{
          background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
          borderRadius: 14,
          padding: "16px",
          marginTop: 20,
          color: "#fff"
        }}>
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 6 }}>💡 Pro Tip</div>
          <div style={{ fontSize: 12, lineHeight: 1.6, opacity: 0.95 }}>
            {activeLevel === "after10th" && "Choose your stream based on your interests, not peer pressure. Your passion drives success!"}
            {activeLevel === "after12th" && "Research salary trends, job market demand, and your personal interests before finalizing a career."}
            {activeLevel === "afterGrad" && "Consider pursuing higher education or certifications to stay competitive in your field."}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CareerGuidePage;
