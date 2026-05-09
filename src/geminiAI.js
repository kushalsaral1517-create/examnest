// ═══════════════════════════════════════════════════════
// GOOGLE GEMINI AI INTEGRATION (FREE TIER)
// ═══════════════════════════════════════════════════════

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";
// Upgraded to the newer, faster 2.5-flash model
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

export async function askGemini(prompt, context = {}) {
  // Check if the key exists
  if (!GEMINI_API_KEY) {
    return "⚠️ Setup Error: Vercel cannot find your GEMINI_API_KEY. Please check your Vercel Environment Variables.";
  }

  try {
    const enhancedPrompt = buildPrompt(prompt, context);
    
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: enhancedPrompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 800,
          topP: 0.8,
          topK: 40
        }
      })
    });

    const data = await response.json();

    // SMART ERROR CHECKING: If Google rejects the request, tell us exactly why
    if (!response.ok) {
      console.error("Google API Details:", data);
      return `❌ Google API Error: ${data.error?.message || response.statusText}`;
    }
    
    if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
      return data.candidates[0].content.parts[0].text;
    } else {
      return "❌ Data Error: The AI sent an empty response.";
    }
  } catch (error) {
    console.error("Network Error:", error);
    return `❌ Network Error: ${error.message}. Please check your internet connection.`;
  }
}

function buildPrompt(userQuestion, context) {
  let systemContext = `You are ExamBot, an expert AI assistant for Indian competitive exams and career guidance. Keep responses clear, factual, and encouraging. Keep responses under 150 words unless asked for details.`;

  if (context.type === "career") {
    systemContext += `\n\nContext: The user is asking about the "${context.career}" path. Avg Salary: ${context.salary}. Difficulty: ${context.difficulty}/100.`;
  }

  return `${systemContext}\n\nUser Question: ${userQuestion}\n\nProvide a helpful response:`;
}

export async function askAboutCareer(question, careerData) {
  return askGemini(question, {
    type: "career",
    career: careerData.career,
    salary: careerData.avgSalary,
    difficulty: careerData.difficulty
  });
}
