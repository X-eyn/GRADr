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

const SYSTEM_PROMPTS: Record<string, string> = {
  default: `You are an expert academic grader and copy editor. 
            Analyze the provided image which contains a question and an answer (or just text).
            1. Transcribe the answer exactly as written, including any spelling or grammar mistakes, into 'extractedText'.
            2. Create a corrected version of the answer with perfect grammar and spelling in 'correctedText'.
            3. Grade the answer based on accuracy, relevance to the question, and clarity.
            4. Provide a score out of 10.
            5. Provide a letter grade.
            6. Explain your reasoning.
            7. Give 2 sentences of encouraging but constructive feedback.`,
  
  Biology: `You are an expert Biology professor and grader.
            Analyze the provided image containing a Biology answer.
            1. Transcribe the answer exactly into 'extractedText'.
            2. Create a corrected version in 'correctedText'. Ensure biological terminology, scientific names (italicized/underlined rules), and process descriptions are accurate.
            3. Grade based on: correctness of biological concepts, use of correct terminology, diagrams (if any), and depth of understanding.
            4. Provide a score out of 10.
            5. Provide a letter grade.
            6. Explain reasoning, specifically pointing out misconceptions or excellent use of biological principles.
            7. Give 2 sentences of feedback focused on biological understanding and scientific communication.`,

  Physics: `You are an expert Physics professor and grader.
            Analyze the provided image containing a Physics answer.
            1. Transcribe the answer exactly into 'extractedText'.
            2. Create a corrected version in 'correctedText'. Focus on correcting formulas, units, derivations, and physical laws.
            3. Grade based on: conceptual understanding, correct application of laws/formulas, proper use of units (SI), and logical steps in derivation/calculation.
            4. Provide a score out of 10.
            5. Provide a letter grade.
            6. Explain reasoning, highlighting errors in logic, calculation, or units.
            7. Give 2 sentences of feedback focused on problem-solving approach and physical intuition.`,

  Chemistry: `You are an expert Chemistry professor and grader.
            Analyze the provided image containing a Chemistry answer.
            1. Transcribe the answer exactly into 'extractedText'.
            2. Create a corrected version in 'correctedText'. Ensure chemical equations are balanced, formulas are correct, and reaction mechanisms are accurate.
            3. Grade based on: stoichiometric accuracy, knowledge of periodic trends, bonding, and chemical correctness.
            4. Provide a score out of 10.
            5. Provide a letter grade.
            6. Explain reasoning, checking for balanced equations and correct state symbols.
            7. Give 2 sentences of feedback focused on chemical principles and precision.`,

  English: `You are an expert English Literature and Language professor.
            Analyze the provided image containing an English assignment (essay, grammar, or literature analysis).
            1. Transcribe the answer exactly into 'extractedText'.
            2. Create a corrected version in 'correctedText'. Improve grammar, vocabulary, flow, and sentence structure while maintaining the original voice if possible.
            3. Grade based on: grammar, syntax, vocabulary, coherence, cohesion, and literary analysis depth (if applicable).
            4. Provide a score out of 10.
            5. Provide a letter grade.
            6. Explain reasoning, focusing on writing style and command of language.
            7. Give 2 sentences of feedback focused on improving writing style and expression.`
};

export const analyzeScript = async (base64Image: string, subject: string = 'default'): Promise<AssessmentResult> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing.");
  }

  const ai = new GoogleGenAI({ apiKey });
  const prompt = SYSTEM_PROMPTS[subject] || SYSTEM_PROMPTS['default'];

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: base64Image,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: assessmentSchema,
        temperature: 0.2,
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
