import { useState } from "react";
import { askAboutCareer, askCareerGuidance } from "./geminiAI";

// [Previous careerData object stays the same - keeping it for space]
// Copy the entire careerData object from the previous CareerGuide.jsx here

const careerData = {
  after10th: {
    streams: [
      {
        id: "science_pcm",
        name: "Science (PCM)",
        icon: "🔬",
        color: "#3b82f6",
        popularity: 35,
        roadmap: [
          { id: 1, title: "10th Grade", desc: "Focus on Math, Physics" },
          { id: 2, title: "11-12th PCM", desc: "Deep study of core subjects" },
          { id: 3, title: "JEE/BITSAT", desc: "Prepare for engineering exams" },
          { id: 4, title: "B.Tech", desc: "4-year engineering degree" },
          { id: 5, title: "Career", desc: "Software Engineer, Architect" }
        ],
        careers: ["Engineering", "Architecture", "Computer Science", "Research", "Aviation", "Defense"],
        exams: ["JEE Main", "JEE Advanced", "BITSAT", "VITEEE", "NDA"],
        avgSalary: "₹6-15 LPA"
      },
      {
        id: "science_pcb",
        name: "Science (PCB)",
        icon: "🩺",
        color: "#10b981",
        popularity: 30,
        roadmap: [
          { id: 1, title: "10th Grade", desc: "Score 85%+ in science" },
          { id: 2, title: "11-12th PCB", desc: "Biology, Chemistry focus" },
          { id: 3, title: "NEET Prep", desc: "2 years intensive preparation" },
          { id: 4, title: "MBBS", desc: "5.5 years medical degree" },
          { id: 5, title: "Career", desc: "Doctor, Surgeon, Specialist" }
        ],
        careers: ["Medicine (MBBS)", "Dentistry", "Pharmacy", "Nursing", "Biotechnology", "Veterinary"],
        exams: ["NEET UG", "AIIMS", "JIPMER", "NEET MDS", "AFMC"],
        avgSalary: "₹8-25 LPA"
      },
      {
        id: "commerce",
        name: "Commerce",
        icon: "💼",
        color: "#f59e0b",
        popularity: 25,
        roadmap: [
          { id: 1, title: "10th Grade", desc: "Strong in Math, Economics" },
          { id: 2, title: "11-12th Commerce", desc: "Accountancy, Business Studies" },
          { id: 3, title: "CA Foundation", desc: "Start CA journey early" },
          { id: 4, title: "B.Com + CA", desc: "Dual qualification" },
          { id: 5, title: "Career", desc: "CA, Banking, Finance" }
        ],
        careers: ["CA", "CS", "Banking", "Finance", "Economics", "Business Management"],
        exams: ["CA Foundation", "CS Executive", "CLAT", "BBA Entrance", "IPM"],
        avgSalary: "₹5-20 LPA"
      },
      {
        id: "arts",
        name: "Arts/Humanities",
        icon: "🎨",
        color: "#8b5cf6",
        popularity: 15,
        roadmap: [
          { id: 1, title: "10th Grade", desc: "Develop critical thinking" },
          { id: 2, title: "11-12th Arts", desc: "History, Political Science" },
          { id: 3, title: "CLAT/UPSC Prep", desc: "Law or civil services track" },
          { id: 4, title: "BA LLB/BA", desc: "5-year integrated or 3-year" },
          { id: 5, title: "Career", desc: "Lawyer, IAS, Journalist" }
        ],
        careers: ["Law", "Psychology", "Journalism", "Teaching", "Civil Services", "Design"],
        exams: ["CLAT", "NID", "NIFT", "UCEED", "Hotel Management"],
        avgSalary: "₹4-15 LPA"
      },
      {
        id: "vocational",
        name: "Vocational",
        icon: "⚙️",
        color: "#ef4444",
        popularity: 10,
        roadmap: [
          { id: 1, title: "10th Grade", desc: "Identify skill interest" },
          { id: 2, title: "ITI/Diploma", desc: "2-3 year courses" },
          { id: 3, title: "Skill Training", desc: "Practical experience" },
          { id: 4, title: "Certification", desc: "Industry certificates" },
          { id: 5, title: "Career", desc: "Technician, Craftsman" }
        ],
        careers: ["ITI Courses", "Polytechnic", "Hotel Management", "Fashion Design", "Agriculture"],
        exams: ["ITI Entrance", "Diploma Entrance", "NIFT", "IHM"],
        avgSalary: "₹3-10 LPA"
      }
    ]
  },
  
  after12th: {
    science: [
      { 
        id: "eng",
        career: "Engineering", 
        avgSalary: "₹6-15 LPA", 
        duration: "4 years", 
        seats: "15 Lakh+", 
        difficulty: 85,
        pathway: ["12th PCM", "JEE Prep (1-2 yrs)", "B.Tech (4 yrs)", "Job/M.Tech"],
        topColleges: ["IIT Bombay", "IIT Delhi", "BITS Pilani", "NIT Trichy"],
        skills: ["Problem Solving", "Math", "Programming", "Logical Thinking"]
      },
      { 
        id: "med",
        career: "Medicine (MBBS)", 
        avgSalary: "₹8-25 LPA", 
        duration: "5.5 years", 
        seats: "90,000", 
        difficulty: 95,
        pathway: ["12th PCB", "NEET Prep (1-2 yrs)", "MBBS (5.5 yrs)", "MD/Practice"],
        topColleges: ["AIIMS Delhi", "CMC Vellore", "JIPMER", "KGMU"],
        skills: ["Biology", "Chemistry", "Memory", "Dedication", "Empathy"]
      },
      { 
        id: "arch",
        career: "Architecture", 
        avgSalary: "₹5-12 LPA", 
        duration: "5 years", 
        seats: "40,000", 
        difficulty: 75,
        pathway: ["12th PCM", "NATA/JEE Arch", "B.Arch (5 yrs)", "Practice/M.Arch"],
        topColleges: ["IIT Kharagpur", "SPA Delhi", "NIT Trichy", "CEPT"],
        skills: ["Creativity", "Drawing", "Math", "Visualization"]
      },
      { 
        id: "bsc",
        career: "BSc + Research", 
        avgSalary: "₹4-10 LPA", 
        duration: "3-5 years", 
        seats: "10 Lakh+", 
        difficulty: 60,
        pathway: ["12th PCM/PCB", "BSc (3 yrs)", "MSc (2 yrs)", "PhD/Research"],
        topColleges: ["St. Stephen's", "Hindu College", "Fergusson", "Presidency"],
        skills: ["Analytical", "Research", "Scientific Thinking"]
      }
    ],
    commerce: [
      { 
        id: "ca",
        career: "CA (Chartered Accountant)", 
        avgSalary: "₹7-20 LPA", 
        duration: "4-5 years", 
        seats: "20,000/year", 
        difficulty: 90,
        pathway: ["12th Commerce", "CA Foundation", "CA Intermediate", "CA Final", "Practice"],
        topColleges: ["ICAI (All India)"],
        skills: ["Accounting", "Taxation", "Audit", "Financial Analysis"]
      },
      { 
        id: "cs",
        career: "CS (Company Secretary)", 
        avgSalary: "₹6-15 LPA", 
        duration: "3-4 years", 
        seats: "5,000/year", 
        difficulty: 85,
        pathway: ["12th Commerce", "CS Foundation", "CS Executive", "CS Professional"],
        topColleges: ["ICSI (All India)"],
        skills: ["Corporate Law", "Compliance", "Governance"]
      },
      { 
        id: "bba",
        career: "BBA + MBA", 
        avgSalary: "₹8-25 LPA", 
        duration: "5 years", 
        seats: "5 Lakh+", 
        difficulty: 70,
        pathway: ["12th Any", "BBA (3 yrs)", "CAT Prep", "MBA (2 yrs)", "Management Career"],
        topColleges: ["Christ Bangalore", "Shaheed Sukhdev", "NMIMS", "Symbiosis"],
        skills: ["Leadership", "Communication", "Business Acumen"]
      }
    ],
    arts: [
      { 
        id: "law",
        career: "Law (5 Yr Integrated)", 
        avgSalary: "₹6-20 LPA", 
        duration: "5 years", 
        seats: "60,000", 
        difficulty: 80,
        pathway: ["12th Any", "CLAT Prep", "BA LLB (5 yrs)", "Practice/LLM"],
        topColleges: ["NLSIU Bangalore", "NALSAR Hyderabad", "NLU Delhi"],
        skills: ["Critical Thinking", "Reading", "Argumentation", "Writing"]
      },
      { 
        id: "upsc",
        career: "UPSC Civil Services", 
        avgSalary: "₹10-50 LPA", 
        duration: "1-3 years", 
        seats: "1,000/year", 
        difficulty: 98,
        pathway: ["Graduation", "UPSC Prep (1-3 yrs)", "Prelims", "Mains", "Interview", "IAS/IPS"],
        topColleges: ["Any UG College", "Then Coaching"],
        skills: ["General Knowledge", "Essay Writing", "Current Affairs", "Persistence"]
      },
      { 
        id: "design",
        career: "Design (NIFT/NID)", 
        avgSalary: "₹5-15 LPA", 
        duration: "4 years", 
        seats: "10,000", 
        difficulty: 75,
        pathway: ["12th Any", "NIFT/NID Exam", "B.Des (4 yrs)", "Designer"],
        topColleges: ["NID Ahmedabad", "NIFT Delhi", "Srishti", "Pearl Academy"],
        skills: ["Creativity", "Aesthetics", "Drawing", "Innovation"]
      }
    ]
  }
};

// ═══════════════════════════════════════════════════════
// AI CHAT MODAL COMPONENT
// ═══════════════════════════════════════════════════════
function AIChat({ career, onClose, T, dark, stream }) {
  const [messages, setMessages] = useState([
    { role: "ai", text: `Hi! I'm your AI assistant. Ask me anything about ${career.career}!` }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSend() {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: userMessage }]);
    setLoading(true);

    try {
      const aiResponse = await askAboutCareer(userMessage, {
        career: career.career,
        stream: stream,
        avgSalary: career.avgSalary,
        difficulty: career.difficulty,
        duration: career.duration,
        seats: career.seats
      });

      setMessages(prev => [...prev, { role: "ai", text: aiResponse }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: "ai", 
        text: "Sorry, I encountered an error. Please try again!" 
      }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(0,0,0,0.7)",
      zIndex: 9999,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px"
    }}>
      <div style={{
        background: T.card,
        borderRadius: 16,
        maxWidth: 500,
        width: "100%",
        maxHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 20px 60px rgba(0,0,0,0.3)"
      }}>
        {/* Header */}
        <div style={{
          background: "linear-gradient(135deg, #667eea, #764ba2)",
          padding: "16px",
          borderRadius: "16px 16px 0 0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>
              🤖 AI Career Assistant
            </div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.8)", marginTop: 2 }}>
              Powered by Google Gemini
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "rgba(255,255,255,0.2)",
              border: "none",
              borderRadius: 8,
              padding: "6px 12px",
              color: "#fff",
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 600
            }}
          >
            ✕ Close
          </button>
        </div>

        {/* Messages */}
        <div style={{
          flex: 1,
          overflowY: "auto",
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          gap: 12
        }}>
          {messages.map((msg, i) => (
            <div
              key={i}
              style={{
                alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                maxWidth: "85%"
              }}
            >
              <div style={{
                background: msg.role === "user" ? "#667eea" : T.card2,
                color: msg.role === "user" ? "#fff" : T.text,
                padding: "10px 14px",
                borderRadius: 12,
                fontSize: 13,
                lineHeight: 1.6,
                whiteSpace: "pre-wrap"
              }}>
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div style={{
              alignSelf: "flex-start",
              maxWidth: "85%"
            }}>
              <div style={{
                background: T.card2,
                padding: "10px 14px",
                borderRadius: 12,
                fontSize: 13
              }}>
                <span className="thinking-dots">Thinking</span>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div style={{
          padding: "12px",
          borderTop: `1px solid ${T.border}`,
          display: "flex",
          gap: 8
        }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask anything about this career..."
            style={{
              flex: 1,
              padding: "10px 12px",
              background: T.card2,
              border: `1px solid ${T.border}`,
              borderRadius: 10,
              fontSize: 13,
              color: T.text,
              fontFamily: "inherit"
            }}
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            style={{
              background: "linear-gradient(135deg, #667eea, #764ba2)",
              border: "none",
              borderRadius: 10,
              padding: "0 16px",
              color: "#fff",
              fontSize: 20,
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading || !input.trim() ? 0.5 : 1
            }}
          >
            {loading ? "..." : "→"}
          </button>
        </div>

        <style>{`
          .thinking-dots::after {
            content: '...';
            animation: dots 1.5s steps(4, end) infinite;
          }
          @keyframes dots {
            0%, 20% { content: '.'; }
            40% { content: '..'; }
            60%, 100% { content: '...'; }
          }
        `}</style>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// REST OF THE CAREERGUIDE COMPONENTS
// (InteractiveRoadmap, AnimatedStreamChart, CareerFlowchart, etc.)
// [Copy from previous CareerGuide.jsx]
// ═══════════════════════════════════════════════════════

// [I'll include the main components here - copying from previous version]

function InteractiveRoadmap({ roadmap, color, streamName }) {
  const [activeNode, setActiveNode] = useState(null);
  
  return (
    <div style={{ 
      background: `linear-gradient(135deg, ${color}08, ${color}15)`,
      borderRadius: 16,
      padding: "20px",
      marginBottom: 20,
      position: "relative",
      overflow: "hidden"
    }}>
      <div style={{ 
        fontFamily: "'Playfair Display', serif",
        fontSize: 15,
        fontWeight: 700,
        marginBottom: 20,
        color: "#1a1a2e"
      }}>
        🗺️ Career Roadmap: {streamName}
      </div>
      
      {/* SVG Connection Lines */}
      <svg 
        style={{ 
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 0
        }}
      >
        {roadmap.slice(0, -1).map((_, i) => (
          <line
            key={i}
            x1="20%"
            y1={`${70 + i * 80}px`}
            x2="20%"
            y2={`${130 + i * 80}px`}
            stroke={color}
            strokeWidth="3"
            strokeDasharray="5,5"
            opacity="0.3"
          />
        ))}
      </svg>
      
      {/* Roadmap Nodes */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {roadmap.map((node, i) => (
          <div
            key={node.id}
            onClick={() => setActiveNode(activeNode === i ? null : i)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 15,
              marginBottom: 15,
              cursor: "pointer",
              transform: activeNode === i ? "translateX(10px)" : "translateX(0)",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
            }}
          >
            {/* Node Circle */}
            <div style={{
              width: activeNode === i ? 60 : 50,
              height: activeNode === i ? 60 : 50,
              background: activeNode === i ? color : "#fff",
              border: `3px solid ${color}`,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: activeNode === i ? 16 : 14,
              fontWeight: 700,
              color: activeNode === i ? "#fff" : color,
              flexShrink: 0,
              boxShadow: activeNode === i ? `0 8px 20px ${color}40` : "0 2px 8px rgba(0,0,0,0.1)",
              transition: "all 0.3s ease"
            }}>
              {node.id}
            </div>
            
            {/* Node Content */}
            <div style={{ flex: 1 }}>
              <div style={{
                fontSize: 14,
                fontWeight: 700,
                color: "#1a1a2e",
                marginBottom: 3
              }}>
                {node.title}
              </div>
              <div style={{
                fontSize: 12,
                color: "#64748b",
                lineHeight: 1.4,
                maxHeight: activeNode === i ? 100 : 0,
                overflow: "hidden",
                transition: "max-height 0.3s ease"
              }}>
                {node.desc}
              </div>
            </div>
            
            {/* Arrow Indicator */}
            <div style={{
              fontSize: 18,
              color: color,
              opacity: activeNode === i ? 1 : 0.3,
              transition: "all 0.3s ease"
            }}>
              {activeNode === i ? "▼" : "▶"}
            </div>
          </div>
        ))}
      </div>
      
      {/* Action Button */}
      <button
        style={{
          width: "100%",
          background: color,
          color: "#fff",
          border: "none",
          borderRadius: 12,
          padding: "12px",
          fontSize: 13,
          fontWeight: 600,
          cursor: "pointer",
          marginTop: 10,
          transition: "all 0.3s ease",
          boxShadow: `0 4px 12px ${color}40`
        }}
        onMouseEnter={(e) => e.target.style.transform = "translateY(-2px)"}
        onMouseLeave={(e) => e.target.style.transform = "translateY(0)"}
      >
        Start This Journey →
      </button>
    </div>
  );
}

function CareerFlowchart({ pathway, color, career }) {
  const [hoveredStep, setHoveredStep] = useState(null);
  
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 10,
      overflowX: "auto",
      padding: "10px 0",
      marginTop: 12
    }}>
      {pathway.map((step, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            onMouseEnter={() => setHoveredStep(i)}
            onMouseLeave={() => setHoveredStep(null)}
            style={{
              background: hoveredStep === i ? color : "#f1f5f9",
              color: hoveredStep === i ? "#fff" : "#1a1a2e",
              padding: "8px 14px",
              borderRadius: 8,
              fontSize: 11,
              fontWeight: 600,
              whiteSpace: "nowrap",
              cursor: "pointer",
              border: `2px solid ${hoveredStep === i ? color : "transparent"}`,
              transition: "all 0.3s ease",
              transform: hoveredStep === i ? "scale(1.05)" : "scale(1)",
              boxShadow: hoveredStep === i ? `0 4px 12px ${color}30` : "none"
            }}
          >
            {step}
          </div>
          {i < pathway.length - 1 && (
            <div style={{ color: color, fontSize: 16, fontWeight: 700 }}>→</div>
          )}
        </div>
      ))}
    </div>
  );
}

function AnimatedStreamChart({ streams, T }) {
  const [selectedStream, setSelectedStream] = useState(null);
  const maxPop = Math.max(...streams.map(s => s.popularity));
  
  return (
    <div style={{
      background: T.card,
      borderRadius: 16,
      padding: "20px",
      marginBottom: 20,
      boxShadow: "0 4px 16px rgba(0,0,0,0.08)"
    }}>
      <div style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: 17,
        fontWeight: 700,
        marginBottom: 16,
        color: T.text
      }}>
        📊 Stream Selection Trends
      </div>
      
      {streams.map((stream, i) => (
        <div
          key={i}
          onClick={() => setSelectedStream(selectedStream === i ? null : i)}
          style={{
            marginBottom: 16,
            cursor: "pointer",
            transition: "all 0.3s ease"
          }}
        >
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 8
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 20 }}>{stream.icon}</span>
              <span style={{
                fontSize: 13,
                fontWeight: 600,
                color: T.text
              }}>
                {stream.name}
              </span>
            </div>
            <span style={{
              fontSize: 13,
              fontWeight: 700,
              color: stream.color,
              background: `${stream.color}15`,
              padding: "4px 10px",
              borderRadius: 6
            }}>
              {stream.popularity}%
            </span>
          </div>
          
          {/* Animated Bar */}
          <div style={{
            height: 12,
            background: "#e2e8f0",
            borderRadius: 6,
            overflow: "hidden",
            position: "relative"
          }}>
            <div style={{
              height: "100%",
              width: `${(stream.popularity / maxPop) * 100}%`,
              background: `linear-gradient(90deg, ${stream.color}, ${stream.color}cc)`,
              borderRadius: 6,
              transition: "width 1s cubic-bezier(0.4, 0, 0.2, 1)",
              position: "relative",
              overflow: "hidden"
            }}>
              {/* Shimmer Effect */}
              <div style={{
                position: "absolute",
                top: 0,
                left: "-100%",
                width: "100%",
                height: "100%",
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                animation: "shimmer 2s infinite"
              }} />
            </div>
          </div>
          
          {/* Expanded Info */}
          {selectedStream === i && (
            <div style={{
              marginTop: 12,
              padding: 12,
              background: `${stream.color}08`,
              borderRadius: 10,
              borderLeft: `4px solid ${stream.color}`,
              animation: "slideDown 0.3s ease"
            }}>
              <div style={{ fontSize: 12, color: T.text, marginBottom: 6 }}>
                <strong>💰 Avg Salary:</strong> {stream.avgSalary}
              </div>
              <div style={{ fontSize: 11, color: T.subtext, lineHeight: 1.6 }}>
                <strong>Top Careers:</strong> {stream.careers.join(", ")}
              </div>
            </div>
          )}
        </div>
      ))}
      
      <style>{`
        @keyframes shimmer {
          0% { left: -100%; }
          100% { left: 100%; }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

function InteractiveCareerCard({ career, color, T, dark, stream }) {
  const [expanded, setExpanded] = useState(false);
  const [showAI, setShowAI] = useState(false);
  
  return (
    <>
      <div
        onClick={() => setExpanded(!expanded)}
        style={{
          background: T.card,
          borderRadius: 14,
          padding: "16px",
          marginBottom: 12,
          cursor: "pointer",
          border: `2px solid ${expanded ? color : "transparent"}`,
          boxShadow: expanded ? `0 8px 24px ${color}20` : "0 2px 8px rgba(0,0,0,0.06)",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          transform: expanded ? "scale(1.02)" : "scale(1)"
        }}
      >
        {/* Header */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: expanded ? 12 : 0
        }}>
          <div>
            <div style={{
              fontSize: 14,
              fontWeight: 700,
              color: T.text,
              marginBottom: 4
            }}>
              {career.career}
            </div>
            <div style={{
              fontSize: 12,
              color: color,
              fontWeight: 600
            }}>
              💰 {career.avgSalary}
            </div>
          </div>
          
          {/* Difficulty Ring */}
          <div style={{
            width: 50,
            height: 50,
            borderRadius: "50%",
            background: `conic-gradient(${color} ${career.difficulty}%, #e2e8f0 0)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative"
          }}>
            <div style={{
              width: 38,
              height: 38,
              borderRadius: "50%",
              background: T.card,
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
        
        {/* Expanded Content */}
        {expanded && (
          <div style={{
            marginTop: 12,
            paddingTop: 12,
            borderTop: `1px solid ${T.border}`,
            animation: "fadeIn 0.3s ease"
          }}>
            {/* Quick Stats */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 10,
              marginBottom: 12
            }}>
              <div style={{
                background: T.card2,
                padding: "10px",
                borderRadius: 8,
                textAlign: "center"
              }}>
                <div style={{ fontSize: 10, color: T.muted, marginBottom: 3 }}>⏱️ Duration</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: T.text }}>{career.duration}</div>
              </div>
              <div style={{
                background: T.card2,
                padding: "10px",
                borderRadius: 8,
                textAlign: "center"
              }}>
                <div style={{ fontSize: 10, color: T.muted, marginBottom: 3 }}>🎓 Seats</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: T.text }}>{career.seats}</div>
              </div>
            </div>
            
            {/* AI Chat Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowAI(true);
              }}
              style={{
                width: "100%",
                background: "linear-gradient(135deg, #667eea, #764ba2)",
                border: "none",
                borderRadius: 10,
                padding: "12px",
                color: "#fff",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                marginBottom: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)"
              }}
            >
              <span style={{ fontSize: 16 }}>🤖</span>
              Ask AI About This Career
            </button>
            
            {/* Career Pathway */}
            {career.pathway && (
              <>
                <div style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: T.text,
                  marginBottom: 8
                }}>
                  🗺️ Career Path:
                </div>
                <CareerFlowchart pathway={career.pathway} color={color} career={career.career} />
              </>
            )}
            
            {/* Top Colleges */}
            {career.topColleges && (
              <>
                <div style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: T.text,
                  marginTop: 12,
                  marginBottom: 6
                }}>
                  🏛️ Top Colleges:
                </div>
                <div style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 6
                }}>
                  {career.topColleges.map((college, i) => (
                    <span
                      key={i}
                      style={{
                        background: `${color}15`,
                        color: color,
                        padding: "4px 8px",
                        borderRadius: 6,
                        fontSize: 10,
                        fontWeight: 500
                      }}
                    >
                      {college}
                    </span>
                  ))}
                </div>
              </>
            )}
            
            {/* Skills Required */}
            {career.skills && (
              <>
                <div style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: T.text,
                  marginTop: 12,
                  marginBottom: 6
                }}>
                  ⚡ Skills Required:
                </div>
                <div style={{
                  fontSize: 11,
                  color: T.subtext,
                  lineHeight: 1.6
                }}>
                  {career.skills.join(" • ")}
                </div>
              </>
            )}
          </div>
        )}
        
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `}</style>
      </div>

      {/* AI Chat Modal */}
      {showAI && (
        <AIChat
          career={career}
          stream={stream}
          onClose={() => setShowAI(false)}
          T={T}
          dark={dark}
        />
      )}
    </>
  );
}

// ═══════════════════════════════════════════════════════
// MAIN CAREER GUIDE PAGE
// ═══════════════════════════════════════════════════════
function CareerGuidePage({ setNavTab, T, dark }) {
  const [activeLevel, setActiveLevel] = useState("after10th");
  const [selectedStream, setSelectedStream] = useState("science");
  const [showRoadmap, setShowRoadmap] = useState(null);

  return (
    <div style={{
      minHeight: "100vh",
      background: T.bg,
      paddingBottom: 80,
      color: T.text
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "16px",
        position: "sticky",
        top: 0,
        zIndex: 50,
        boxShadow: "0 4px 16px rgba(0,0,0,0.1)"
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 14
        }}>
          <button
            onClick={() => setNavTab("home")}
            style={{
              background: "rgba(255,255,255,0.2)",
              border: "none",
              borderRadius: 10,
              padding: "8px 14px",
              color: "#fff",
              cursor: "pointer",
              fontSize: 13,
              fontFamily: "inherit",
              fontWeight: 600,
              backdropFilter: "blur(10px)"
            }}
          >
            ← Back
          </button>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 14,
            fontWeight: 600,
            color: "rgba(255,255,255,0.9)",
            letterSpacing: "0.05em"
          }}>
            ExamNest
          </div>
        </div>
        
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          marginBottom: 14
        }}>
          <div style={{
            width: 56,
            height: 56,
            background: "rgba(255,255,255,0.2)",
            borderRadius: 14,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 28,
            backdropFilter: "blur(10px)"
          }}>
            🎯
          </div>
          <div>
            <div style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 22,
              fontWeight: 900,
              color: "#fff",
              lineHeight: 1.1,
              textShadow: "0 2px 8px rgba(0,0,0,0.2)"
            }}>
              Career Roadmap
            </div>
            <div style={{
              fontSize: 12,
              color: "rgba(255,255,255,0.85)",
              marginTop: 3
            }}>
              AI-Powered Career Guidance
            </div>
          </div>
        </div>

        {/* Level Tabs */}
        <div style={{
          display: "flex",
          gap: 8,
          overflowX: "auto",
          paddingBottom: 2
        }}>
          {[
            { id: "after10th", label: "After 10th", icon: "📚" },
            { id: "after12th", label: "After 12th", icon: "🎓" }
          ].map(level => (
            <button
              key={level.id}
              onClick={() => setActiveLevel(level.id)}
              style={{
                flexShrink: 0,
                padding: "10px 16px",
                background: activeLevel === level.id ? "#fff" : "rgba(255,255,255,0.15)",
                border: "none",
                borderRadius: 10,
                cursor: "pointer",
                fontSize: 12,
                fontFamily: "inherit",
                fontWeight: 600,
                color: activeLevel === level.id ? "#667eea" : "#fff",
                whiteSpace: "nowrap",
                transition: "all 0.3s ease",
                backdropFilter: "blur(10px)"
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
            <AnimatedStreamChart streams={careerData.after10th.streams} T={T} />
            
            {careerData.after10th.streams.map((stream, i) => (
              <div key={i} style={{ marginBottom: 16 }}>
                <div
                  onClick={() => setShowRoadmap(showRoadmap === stream.id ? null : stream.id)}
                  style={{
                    background: T.card,
                    borderRadius: 14,
                    padding: "16px",
                    cursor: "pointer",
                    border: `2px solid ${showRoadmap === stream.id ? stream.color : "transparent"}`,
                    transition: "all 0.3s ease",
                    boxShadow: showRoadmap === stream.id ? `0 8px 24px ${stream.color}20` : "0 2px 8px rgba(0,0,0,0.06)"
                  }}
                >
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12
                  }}>
                    <div style={{
                      width: 50,
                      height: 50,
                      background: `${stream.color}20`,
                      borderRadius: 12,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 24
                    }}>
                      {stream.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontSize: 15,
                        fontWeight: 700,
                        color: T.text,
                        marginBottom: 3
                      }}>
                        {stream.name}
                      </div>
                      <div style={{
                        fontSize: 11,
                        color: T.subtext
                      }}>
                        {stream.popularity}% students • {stream.avgSalary}
                      </div>
                    </div>
                    <div style={{
                      fontSize: 20,
                      color: stream.color,
                      transition: "transform 0.3s ease",
                      transform: showRoadmap === stream.id ? "rotate(180deg)" : "rotate(0deg)"
                    }}>
                      ▼
                    </div>
                  </div>
                </div>
                
                {showRoadmap === stream.id && (
                  <div style={{ marginTop: 12 }}>
                    <InteractiveRoadmap
                      roadmap={stream.roadmap}
                      color={stream.color}
                      streamName={stream.name}
                    />
                  </div>
                )}
              </div>
            ))}
          </>
        )}

        {/* After 12th View */}
        {activeLevel === "after12th" && (
          <>
            <div style={{
              display: "flex",
              gap: 8,
              marginBottom: 16,
              overflowX: "auto"
            }}>
              {[
                { id: "science", label: "Science", icon: "🔬", color: "#3b82f6" },
                { id: "commerce", label: "Commerce", icon: "💼", color: "#f59e0b" },
                { id: "arts", label: "Arts", icon: "🎨", color: "#8b5cf6" }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedStream(tab.id)}
                  style={{
                    flex: 1,
                    padding: "12px",
                    background: selectedStream === tab.id ? tab.color : T.card,
                    border: selectedStream === tab.id ? "none" : `2px solid ${T.border}`,
                    borderRadius: 12,
                    cursor: "pointer",
                    fontSize: 13,
                    fontFamily: "inherit",
                    fontWeight: 600,
                    color: selectedStream === tab.id ? "#fff" : T.text,
                    whiteSpace: "nowrap",
                    transition: "all 0.3s ease",
                    boxShadow: selectedStream === tab.id ? `0 4px 12px ${tab.color}30` : "none"
                  }}
                >
                  {tab.icon} {tab.label}
                </button>
              ))}
            </div>

            {careerData.after12th[selectedStream].map((career, i) => (
              <InteractiveCareerCard
                key={i}
                career={career}
                stream={selectedStream}
                color={
                  selectedStream === "science" ? "#3b82f6" :
                  selectedStream === "commerce" ? "#f59e0b" : "#8b5cf6"
                }
                T={T}
                dark={dark}
              />
            ))}
          </>
        )}

        {/* Pro Tip */}
        <div style={{
          background: "linear-gradient(135deg, #667eea, #764ba2)",
          borderRadius: 14,
          padding: "16px",
          marginTop: 20,
          color: "#fff"
        }}>
          <div style={{
            fontSize: 13,
            fontWeight: 700,
            marginBottom: 6,
            display: "flex",
            alignItems: "center",
            gap: 6
          }}>
            🤖 AI Tip
          </div>
          <div style={{
            fontSize: 12,
            lineHeight: 1.6,
            opacity: 0.95
          }}>
            Click "Ask AI" on any career card to get personalized guidance powered by Google Gemini!
          </div>
        </div>
      </div>
    </div>
  );
}

export default CareerGuidePage;
