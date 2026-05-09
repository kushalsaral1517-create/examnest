// ═══════════════════════════════════════════════════════
// GOOGLE GEMINI AI INTEGRATION (FREE TIER)
// ═══════════════════════════════════════════════════════

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

/**
 * Call Google Gemini API with a prompt
 * @param {string} prompt - The question/prompt to send to AI
 * @param {object} context - Optional context object for better responses
 * @returns {Promise<string>} - AI response text
 */
export async function askGemini(prompt, context = {}) {
  if (!GEMINI_API_KEY) {
    return "⚠️ AI is not configured. Please add your Gemini API key to enable AI features.";
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

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
      return data.candidates[0].content.parts[0].text;
    } else {
      throw new Error("Invalid response format");
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "❌ Sorry, I encountered an error. Please try again.";
  }
}

/**
 * Build an enhanced prompt with context
 */
function buildPrompt(userQuestion, context) {
  let systemContext = `You are ExamBot, an expert AI assistant for Indian competitive exams and career guidance. You provide accurate, concise, and helpful information about:
- Competitive exams (JEE, NEET, UPSC, SSC, Banking, etc.)
- Career paths after 10th, 12th, and graduation
- Exam preparation strategies
- Salary expectations and job prospects
- College selection and courses

Keep responses clear, factual, and encouraging. Use bullet points for lists. Keep responses under 150 words unless asked for details.`;

  // Add specific context if provided
  if (context.type === "career") {
    systemContext += `\n\nCurrent Context: The user is viewing information about "${context.career}" career path.`;
    if (context.stream) systemContext += ` Stream: ${context.stream}.`;
    if (context.salary) systemContext += ` Average Salary: ${context.salary}.`;
    if (context.difficulty) systemContext += ` Difficulty Level: ${context.difficulty}/100.`;
  }

  if (context.type === "exam") {
    systemContext += `\n\nCurrent Context: The user is asking about "${context.examName}" exam.`;
    if (context.category) systemContext += ` Category: ${context.category}.`;
  }

  return `${systemContext}\n\nUser Question: ${userQuestion}\n\nProvide a helpful, accurate response:`;
}

/**
 * Ask AI about a specific career
 */
export async function askAboutCareer(question, careerData) {
  return askGemini(question, {
    type: "career",
    career: careerData.career,
    stream: careerData.stream,
    salary: careerData.avgSalary,
    difficulty: careerData.difficulty
  });
}

/**
 * Ask AI about a specific exam
 */
export async function askAboutExam(question, examData) {
  return askGemini(question, {
    type: "exam",
    examName: examData.name,
    category: examData.category
  });
}

/**
 * General career guidance question
 */
export async function askCareerGuidance(question) {
  return askGemini(question, {
    type: "general"
  });
}
