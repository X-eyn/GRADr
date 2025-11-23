import { GoogleGenAI, Type, Schema } from "@google/genai";
import { AssessmentResult } from "../types";

// Define the response schema for strict JSON output
const assessmentSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    grade: {
      type: Type.STRING,
      description: "The letter grade assigned (e.g., A, B+, C-).",
    },
    score: {
      type: Type.NUMBER,
      description: "Numerical score out of 10.",
    },
    reasoning: {
      type: Type.STRING,
      description: "Detailed explanation of why this grade was given.",
    },
    extractedText: {
      type: Type.STRING,
      description: "The raw text extracted from the student's answer in the image. Keep original spelling errors.",
    },
    correctedText: {
      type: Type.STRING,
      description: "The corrected version of the student's answer, fixing grammar, spelling, and factual errors.",
    },
    feedback: {
      type: Type.STRING,
      description: "Two concise and helpful sentences of feedback for the student.",
    },
  },
  required: ["grade", "score", "reasoning", "extractedText", "correctedText", "feedback"],
};

export const analyzeScript = async (base64Image: string): Promise<AssessmentResult> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing.");
  }

  const ai = new GoogleGenAI({ apiKey });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: "image/jpeg", // Assuming JPEG for simplicity, works with PNG too usually
              data: base64Image,
            },
          },
          {
            text: `You are an expert academic grader and copy editor. 
            Analyze the provided image which contains a question and an answer (or just text).
            1. Transcribe the answer exactly as written, including any spelling or grammar mistakes, into 'extractedText'.
            2. Create a corrected version of the answer with perfect grammar and spelling in 'correctedText'.
            3. Grade the answer based on accuracy, relevance to the question, and clarity.
            4. Provide a score out of 10.
            5. Provide a letter grade.
            6. Explain your reasoning.
            7. Give 2 sentences of encouraging but constructive feedback.`,
          },
        ],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: assessmentSchema,
        temperature: 0.2, // Low temperature for more deterministic/accurate grading
      },
    });

    const resultText = response.text;
    if (!resultText) {
        throw new Error("No response from AI");
    }

    const data = JSON.parse(resultText) as AssessmentResult;
    return data;
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
};