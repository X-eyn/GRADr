export interface AssessmentResult {
  grade: string;
  score: number;
  reasoning: string;
  extractedText: string;
  correctedText: string;
  feedback: string;
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