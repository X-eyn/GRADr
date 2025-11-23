export interface QuestionFeedback {
  questionNumber: string;
  questionTitle: string;
  studentAnswer: string;
  correctAnswer: string;
  insight: string;
  status: 'correct' | 'incorrect' | 'partial';
}

export interface AssessmentResult {
  grade: string;
  score: number;
  reasoning: string;
  extractedText: string;
  correctedText: string;
  feedback: string;
  uploadedImage?: string;
  questions?: QuestionFeedback[];
  actionItems?: string[];
  stats?: {
    questionsCorrect: number;
    questionsTotal: number;
    grammarLevel: string;
    conceptsLevel: string;
  };
}

export enum AppStatus {
  IDLE = 'IDLE',
  ANALYZING = 'ANALYZING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export interface DiffPart {
  type: 'text' | 'add' | 'del';
  value: string;
}