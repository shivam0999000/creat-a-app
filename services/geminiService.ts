
import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateCourseWelcome(studentName: string, courseName: string): Promise<string> {
  const prompt = `
    You are an enthusiastic and welcoming university admissions officer.
    A student named "${studentName}" has just been accepted to the "${courseName}" program.
    Write a short, inspiring, and personalized welcome message for them. The message should be around 3-4 paragraphs.
    
    The message should:
    1. Start by congratulating them by name.
    2. Briefly highlight the exciting journey they are about to begin in the "${courseName}" program. Mention one or two potential skills or areas of knowledge they will gain.
    3. Touch upon the potential career paths or impact they can make after completing the course.
    4. End with a warm, encouraging, and motivational closing statement about their future at the institution.
    
    Do not use markdown formatting. Just return the plain text of the welcome message.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 0.7,
        topP: 0.95,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API call failed:", error);
    throw new Error("Failed to generate welcome message from AI.");
  }
}
