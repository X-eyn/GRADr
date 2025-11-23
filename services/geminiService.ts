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

// Enhanced Biology schema with structured question feedback
const biologyAssessmentSchema: Schema = {
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
      description: "Overall assessment summary.",
    },
    extractedText: {
      type: Type.STRING,
      description: "The raw text extracted from the student's answer.",
    },
    correctedText: {
      type: Type.STRING,
      description: "The corrected version of the student's answer.",
    },
    feedback: {
      type: Type.STRING,
      description: "Brief overall feedback.",
    },
    questions: {
      type: Type.ARRAY,
      description: "Array of individual question feedback",
      items: {
        type: Type.OBJECT,
        properties: {
          questionNumber: {
            type: Type.STRING,
            description: "Question number (e.g., '1', '2a', '6')",
          },
          questionTitle: {
            type: Type.STRING,
            description: "Brief title describing what the question is about",
          },
          studentAnswer: {
            type: Type.STRING,
            description: "What the student wrote for this question",
          },
          correctAnswer: {
            type: Type.STRING,
            description: "The correct answer or improved version",
          },
          insight: {
            type: Type.STRING,
            description: "Explanation of the mistake or what to learn",
          },
          status: {
            type: Type.STRING,
            description: "correct, incorrect, or partial",
            enum: ["correct", "incorrect", "partial"],
          },
        },
        required: ["questionNumber", "questionTitle", "studentAnswer", "status"],
      },
    },
    actionItems: {
      type: Type.ARRAY,
      description: "List of specific action items for the student to improve",
      items: {
        type: Type.STRING,
      },
    },
    stats: {
      type: Type.OBJECT,
      description: "Summary statistics",
      properties: {
        questionsCorrect: {
          type: Type.NUMBER,
          description: "Number of questions answered correctly",
        },
        questionsTotal: {
          type: Type.NUMBER,
          description: "Total number of questions",
        },
        grammarLevel: {
          type: Type.STRING,
          description: "Assessment of grammar quality (e.g., 'Good', 'Needs Work')",
        },
        conceptsLevel: {
          type: Type.STRING,
          description: "Assessment of concept understanding (e.g., 'Strong', 'Fair')",
        },
      },
      required: ["questionsCorrect", "questionsTotal", "grammarLevel", "conceptsLevel"],
    },
  },
  required: ["grade", "score", "reasoning", "extractedText", "correctedText", "feedback", "questions", "actionItems", "stats"],
};

// Enhanced Physics schema with structured question feedback
const physicsAssessmentSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    grade: { type: Type.STRING, description: "The letter grade assigned." },
    score: { type: Type.NUMBER, description: "Numerical score out of 10." },
    reasoning: { type: Type.STRING, description: "Overall assessment summary." },
    extractedText: { type: Type.STRING, description: "The raw text extracted from the student's answer." },
    correctedText: { type: Type.STRING, description: "The corrected version of the student's answer." },
    feedback: { type: Type.STRING, description: "Brief overall feedback." },
    questions: {
      type: Type.ARRAY,
      description: "Array of individual problem feedback",
      items: {
        type: Type.OBJECT,
        properties: {
          questionNumber: { type: Type.STRING, description: "Problem number" },
          questionTitle: { type: Type.STRING, description: "Brief title describing the problem" },
          studentAnswer: { type: Type.STRING, description: "Student's solution" },
          correctAnswer: { type: Type.STRING, description: "Correct solution with steps" },
          insight: { type: Type.STRING, description: "Explanation of errors and physics concepts" },
          status: { type: Type.STRING, enum: ["correct", "incorrect", "partial"] },
        },
        required: ["questionNumber", "questionTitle", "studentAnswer", "status"],
      },
    },
    actionItems: {
      type: Type.ARRAY,
      description: "Specific action items for improvement",
      items: { type: Type.STRING },
    },
    stats: {
      type: Type.OBJECT,
      properties: {
        questionsCorrect: { type: Type.NUMBER },
        questionsTotal: { type: Type.NUMBER },
        grammarLevel: { type: Type.STRING, description: "Calculations/Units quality" },
        conceptsLevel: { type: Type.STRING, description: "Physics concepts understanding" },
      },
      required: ["questionsCorrect", "questionsTotal", "grammarLevel", "conceptsLevel"],
    },
  },
  required: ["grade", "score", "reasoning", "extractedText", "correctedText", "feedback", "questions", "actionItems", "stats"],
};

// Enhanced Chemistry schema with structured question feedback
const chemistryAssessmentSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    grade: { type: Type.STRING, description: "The letter grade assigned." },
    score: { type: Type.NUMBER, description: "Numerical score out of 10." },
    reasoning: { type: Type.STRING, description: "Overall assessment summary." },
    extractedText: { type: Type.STRING, description: "The raw text extracted from the student's answer." },
    correctedText: { type: Type.STRING, description: "The corrected version of the student's answer." },
    feedback: { type: Type.STRING, description: "Brief overall feedback." },
    questions: {
      type: Type.ARRAY,
      description: "Array of individual question feedback",
      items: {
        type: Type.OBJECT,
        properties: {
          questionNumber: { type: Type.STRING, description: "Question number" },
          questionTitle: { type: Type.STRING, description: "Brief title describing the question" },
          studentAnswer: { type: Type.STRING, description: "Student's answer" },
          correctAnswer: { type: Type.STRING, description: "Correct answer with balanced equations" },
          insight: { type: Type.STRING, description: "Explanation of errors and chemistry principles" },
          status: { type: Type.STRING, enum: ["correct", "incorrect", "partial"] },
        },
        required: ["questionNumber", "questionTitle", "studentAnswer", "status"],
      },
    },
    actionItems: {
      type: Type.ARRAY,
      description: "Specific action items for improvement",
      items: { type: Type.STRING },
    },
    stats: {
      type: Type.OBJECT,
      properties: {
        questionsCorrect: { type: Type.NUMBER },
        questionsTotal: { type: Type.NUMBER },
        grammarLevel: { type: Type.STRING, description: "Equations/Formula quality" },
        conceptsLevel: { type: Type.STRING, description: "Chemistry concepts understanding" },
      },
      required: ["questionsCorrect", "questionsTotal", "grammarLevel", "conceptsLevel"],
    },
  },
  required: ["grade", "score", "reasoning", "extractedText", "correctedText", "feedback", "questions", "actionItems", "stats"],
};

// Enhanced English schema with structured section feedback
const englishAssessmentSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    grade: { type: Type.STRING, description: "The letter grade assigned." },
    score: { type: Type.NUMBER, description: "Numerical score out of 10." },
    reasoning: { type: Type.STRING, description: "Overall assessment summary." },
    extractedText: { type: Type.STRING, description: "The raw text extracted from the student's writing." },
    correctedText: { type: Type.STRING, description: "The corrected version of the student's writing." },
    feedback: { type: Type.STRING, description: "Brief overall feedback." },
    questions: {
      type: Type.ARRAY,
      description: "Array of section/paragraph feedback",
      items: {
        type: Type.OBJECT,
        properties: {
          questionNumber: { type: Type.STRING, description: "Section number or paragraph identifier" },
          questionTitle: { type: Type.STRING, description: "Brief description of the section" },
          studentAnswer: { type: Type.STRING, description: "Student's writing" },
          correctAnswer: { type: Type.STRING, description: "Improved version with better grammar and style" },
          insight: { type: Type.STRING, description: "Explanation of writing issues and improvements" },
          status: { type: Type.STRING, enum: ["correct", "incorrect", "partial"] },
        },
        required: ["questionNumber", "questionTitle", "studentAnswer", "status"],
      },
    },
    actionItems: {
      type: Type.ARRAY,
      description: "Specific writing improvement actions",
      items: { type: Type.STRING },
    },
    stats: {
      type: Type.OBJECT,
      properties: {
        questionsCorrect: { type: Type.NUMBER, description: "Number of well-written sections" },
        questionsTotal: { type: Type.NUMBER },
        grammarLevel: { type: Type.STRING, description: "Grammar quality level" },
        conceptsLevel: { type: Type.STRING, description: "Writing quality and style level" },
      },
      required: ["questionsCorrect", "questionsTotal", "grammarLevel", "conceptsLevel"],
    },
  },
  required: ["grade", "score", "reasoning", "extractedText", "correctedText", "feedback", "questions", "actionItems", "stats"],
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
            Analyze the provided image containing Biology questions and answers.
            
            Your task:
            1. Identify each question in the image and analyze the student's answer
            2. For each question, provide:
               - Question number and title
               - What the student wrote (studentAnswer)
               - The correct answer or improved version (correctAnswer)
               - An insightful explanation about what they missed or got right (insight)
               - Status: 'correct', 'incorrect', or 'partial'
            
            3. Provide overall stats:
               - How many questions were correct vs total
               - Grammar quality level (e.g., "Good", "Weak", "Strong")
               - Concepts understanding level (e.g., "Excellent", "Fair", "Needs Work")
            
            4. Create 3-5 specific action items the student should focus on (e.g., "Review RNA transcription directionality", "Study the difference between analogous and homologous structures")
            
            5. Provide a letter grade and score out of 10
            
            6. Fill in extractedText with the raw transcription and correctedText with corrections
            
            Focus on being constructive, specific, and educational. Help the student understand not just WHAT was wrong, but WHY and HOW to improve.`,

  Physics: `You are an expert Physics professor and grader.
            Analyze the provided image containing Physics problems and solutions.
            
            Your task:
            1. Identify each problem in the image and analyze the student's solution
            2. For each problem, provide:
               - Problem number and title (e.g., "Projectile Motion", "Electric Field Calculation")
               - What the student wrote including formulas and calculations (studentAnswer)
               - The correct solution with proper steps, formulas, and units (correctAnswer)
               - An insightful explanation about errors in physics concepts, calculations, units, or approach (insight)
               - Status: 'correct', 'incorrect', or 'partial'
            
            3. Provide overall stats:
               - How many problems were solved correctly vs total
               - Calculations/Units quality level (e.g., "Accurate", "Missing Units", "Calculation Errors")
               - Physics concepts understanding level (e.g., "Strong", "Fair", "Needs Work")
            
            4. Create 3-5 specific action items (e.g., "Review vector decomposition in 2D motion", "Always include units in final answers", "Practice applying Newton's second law")
            
            5. Provide a letter grade and score out of 10
            
            6. Fill in extractedText with raw transcription and correctedText with corrections
            
            Focus on helping students understand physics concepts, proper problem-solving methodology, and the importance of units and significant figures.`,

  Chemistry: `You are an expert Chemistry professor and grader.
            Analyze the provided image containing Chemistry questions and answers.
            
            Your task:
            1. Identify each question in the image and analyze the student's answer
            2. For each question, provide:
               - Question number and title (e.g., "Balancing Equations", "Stoichiometry Problem", "Lewis Structures")
               - What the student wrote including equations and formulas (studentAnswer)
               - The correct answer with balanced equations, proper formulas, and state symbols (correctAnswer)
               - An insightful explanation about errors in chemistry concepts, balancing, nomenclature, or calculations (insight)
               - Status: 'correct', 'incorrect', or 'partial'
            
            3. Provide overall stats:
               - How many questions were answered correctly vs total
               - Equations/Formula quality level (e.g., "Well-Balanced", "Missing State Symbols", "Unbalanced")
               - Chemistry concepts understanding level (e.g., "Excellent", "Good", "Needs Review")
            
            4. Create 3-5 specific action items (e.g., "Practice balancing redox reactions", "Review nomenclature for ionic compounds", "Study mole-to-mole conversions")
            
            5. Provide a letter grade and score out of 10
            
            6. Fill in extractedText with raw transcription and correctedText with corrections
            
            Focus on helping students understand chemical principles, proper equation writing, stoichiometry, and the importance of precision in chemistry.`,

  English: `You are an expert English Literature and Language professor.
            Analyze the provided image containing English writing (essay, paragraph, literary analysis, or grammar exercise).
            
            Your task:
            1. Identify different sections or paragraphs in the writing and analyze each
            2. For each section, provide:
               - Section identifier (e.g., "Intro", "Para 1", "Conclusion", or "Q1" for exercises)
               - Brief title describing the section (e.g., "Thesis Statement", "Character Analysis", "Grammar Exercise")
               - What the student wrote (studentAnswer)
               - An improved version with better grammar, vocabulary, flow, and structure (correctAnswer)
               - An insightful explanation about writing issues, grammar errors, style improvements, or literary analysis depth (insight)
               - Status: 'correct' (well-written), 'incorrect' (major issues), or 'partial' (needs improvement)
            
            3. Provide overall stats:
               - How many sections were well-written vs total
               - Grammar quality level (e.g., "Excellent", "Good with minor errors", "Needs Work")
               - Writing quality level (e.g., "Sophisticated", "Developing", "Basic")
            
            4. Create 3-5 specific action items (e.g., "Vary sentence structure for better flow", "Review comma usage in compound sentences", "Strengthen thesis with more specific claims")
            
            5. Provide a letter grade and score out of 10
            
            6. Fill in extractedText with raw transcription and correctedText with overall corrections
            
            Focus on helping students improve writing clarity, grammar, vocabulary, coherence, and literary analysis skills. Be constructive and specific.`
};

export const analyzeScript = async (base64Image: string, subject: string = 'default'): Promise<AssessmentResult> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing.");
  }

  const ai = new GoogleGenAI({ apiKey });
  const prompt = SYSTEM_PROMPTS[subject] || SYSTEM_PROMPTS['default'];
  
  // Use enhanced schema for specific subjects
  let schema: Schema;
  switch (subject) {
    case 'Biology':
      schema = biologyAssessmentSchema;
      break;
    case 'Physics':
      schema = physicsAssessmentSchema;
      break;
    case 'Chemistry':
      schema = chemistryAssessmentSchema;
      break;
    case 'English':
      schema = englishAssessmentSchema;
      break;
    default:
      schema = assessmentSchema;
  }

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
        responseSchema: schema,
        temperature: 0.2,
      },
    });

    const resultText = response.text;
    if (!resultText) {
        throw new Error("No response from AI");
    }

    const data = JSON.parse(resultText) as AssessmentResult;
    
    // Store the uploaded image in the result
    data.uploadedImage = `data:image/jpeg;base64,${base64Image}`;
    
    return data;
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
};
