import React, { useState } from 'react';
import { AssessmentResult, QuestionFeedback } from '../types';
import GlassSurface from './GlassSurface';

interface EnglishResultCardProps {
  result: AssessmentResult;
  onReset: () => void;
}

const EnglishResultCard: React.FC<EnglishResultCardProps> = ({ result, onReset }) => {
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);

  // Calculate progress percentage
  const progressPercentage = (result.score / 10) * 100;
  
  // Determine status label based on score
  const getStatusLabel = (score: number) => {
    if (score >= 8) return { text: 'Excellent', color: 'text-green-400' };
    if (score >= 6) return { text: 'Good Progress', color: 'text-blue-400' };
    if (score >= 4) return { text: 'Needs Work', color: 'text-yellow-400' };
    return { text: 'Needs Attention', color: 'text-red-400' };
  };

  const status = getStatusLabel(result.score);

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* A. HEADER - DASHBOARD FEEL */}
      <div className="bg-gradient-to-br from-yellow-900/20 to-orange-900/20 rounded-3xl p-6 border border-yellow-500/20 backdrop-blur-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          
          {/* Left: Title */}
          <div className="text-left">
            <h2 className="text-2xl font-bold text-white font-lemon-milk tracking-tight">
              English Assignment
            </h2>
            <p className="text-yellow-300/70 text-sm mt-1 font-coolvetica">Assessment Results</p>
          </div>

          {/* Center: Circular Progress */}
          <div className="flex justify-center">
            <div className="relative">
              {/* Circular progress background */}
              <svg className="transform -rotate-90 w-32 h-32">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-neutral-800"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 56}`}
                  strokeDashoffset={`${2 * Math.PI * 56 * (1 - progressPercentage / 100)}`}
                  className={`transition-all duration-1000 ${
                    progressPercentage >= 80 ? 'text-green-400' :
                    progressPercentage >= 60 ? 'text-blue-400' :
                    progressPercentage >= 40 ? 'text-yellow-400' :
                    'text-red-400'
                  }`}
                  strokeLinecap="round"
                />
              </svg>
              {/* Center text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-white">{result.score}</span>
                <span className="text-xs text-neutral-400">/10</span>
              </div>
            </div>
          </div>

          {/* Right: Stats Pills */}
          <div className="flex flex-col gap-2 md:items-end">
            <div className={`px-4 py-2 rounded-full bg-neutral-800/50 border border-white/10 text-sm font-medium ${status.color} inline-flex items-center gap-2 w-fit`}>
              <span className="w-2 h-2 rounded-full bg-current animate-pulse"></span>
              {status.text}
            </div>
            {result.stats && (
              <>
                <div className="px-4 py-1.5 rounded-full bg-neutral-800/30 border border-white/5 text-xs text-neutral-300 w-fit">
                  📝 {result.stats.questionsCorrect}/{result.stats.questionsTotal} Sections
                </div>
                <div className="px-4 py-1.5 rounded-full bg-neutral-800/30 border border-white/5 text-xs text-neutral-300 w-fit">
                  ✍️ Grammar: {result.stats.grammarLevel}
                </div>
                <div className="px-4 py-1.5 rounded-full bg-neutral-800/30 border border-white/5 text-xs text-neutral-300 w-fit">
                  📚 Writing Quality: {result.stats.conceptsLevel}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* B. MAIN BODY - SPLIT VIEW */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        
        {/* LEFT PANEL: Original Image */}
        <div className="lg:col-span-2 space-y-4">
          <div className="sticky top-24">
            <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Your Submission
            </h3>
            
            {result.uploadedImage ? (
              <div className="bg-neutral-900/50 rounded-2xl border border-yellow-500/20 overflow-hidden">
                <img 
                  src={result.uploadedImage} 
                  alt="Uploaded assignment" 
                  className="w-full h-auto"
                />
              </div>
            ) : (
              <div className="bg-neutral-900/50 rounded-2xl border border-white/10 p-8 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-neutral-600 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-neutral-500 text-sm">Image preview not available</p>
              </div>
            )}

            {/* Quick Navigation */}
            {result.questions && result.questions.length > 0 && (
              <div className="mt-6 bg-neutral-900/30 rounded-2xl border border-yellow-500/20 p-4">
                <h4 className="text-sm font-medium text-neutral-400 mb-3 uppercase tracking-wide">Quick Jump</h4>
                <div className="flex flex-wrap gap-2">
                  {result.questions.map((q) => (
                    <button
                      key={q.questionNumber}
                      onClick={() => {
                        setSelectedQuestion(q.questionNumber);
                        document.getElementById(`question-${q.questionNumber}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        selectedQuestion === q.questionNumber
                          ? 'bg-yellow-500 text-black'
                          : q.status === 'correct'
                          ? 'bg-green-900/30 text-green-400 border border-green-500/30 hover:bg-green-900/50'
                          : q.status === 'partial'
                          ? 'bg-yellow-900/30 text-yellow-400 border border-yellow-500/30 hover:bg-yellow-900/50'
                          : 'bg-red-900/30 text-red-400 border border-red-500/30 hover:bg-red-900/50'
                      }`}
                    >
                      {q.questionNumber.match(/^\d+$/) ? `Q${q.questionNumber}` : q.questionNumber}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT PANEL: AI Feedback (Card-Based) */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Action Plan Section */}
          {result.actionItems && result.actionItems.length > 0 && (
            <div className="bg-gradient-to-br from-yellow-900/20 to-orange-900/20 rounded-2xl border border-yellow-500/20 p-6">
              <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
                Action Plan
              </h3>
              <div className="space-y-3">
                {result.actionItems.map((item, index) => (
                  <label key={index} className="flex items-start gap-3 group cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="mt-1 w-4 h-4 rounded border-white/20 bg-white/5 text-yellow-500 focus:ring-2 focus:ring-yellow-500 focus:ring-offset-0 cursor-pointer"
                    />
                    <span className="text-neutral-300 text-sm group-hover:text-white transition-colors flex-1">
                      {item}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Question Cards */}
          {result.questions && result.questions.length > 0 ? (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-white flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Detailed Feedback
              </h3>
              
              {result.questions.map((question) => (
                <EnglishQuestionCard 
                  key={question.questionNumber} 
                  question={question}
                  isSelected={selectedQuestion === question.questionNumber}
                />
              ))}
            </div>
          ) : (
            /* Fallback: Show original reasoning if no structured questions */
            <div className="space-y-4">
              <div className="bg-neutral-900/50 rounded-2xl border border-white/10 p-6">
                <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Overall Assessment
                </h3>
                <div className="prose prose-invert max-w-none">
                  {result.reasoning.split('\n').map((paragraph, i) => (
                    paragraph.trim() && (
                      <p key={i} className="text-neutral-300 text-sm leading-relaxed mb-3 font-coolvetica">
                        {paragraph}
                      </p>
                    )
                  ))}
                </div>
              </div>

              {/* Show original feedback quote */}
              <div className="bg-gradient-to-br from-neutral-900/50 to-neutral-800/30 rounded-2xl border border-white/10 p-6">
                <h3 className="text-sm font-medium text-neutral-400 mb-3 uppercase tracking-wide flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  Reviewer Note
                </h3>
                <p className="text-neutral-300 text-lg leading-relaxed font-coolvetica italic">
                  "{result.feedback}"
                </p>
              </div>
            </div>
          )}

          {/* Extracted Text (Collapsed) */}
          <div className="bg-neutral-900/30 rounded-xl p-1 border border-white/5">
            <details className="group">
              <summary className="flex items-center justify-between cursor-pointer p-4 font-medium text-neutral-400 list-none hover:text-white transition-colors">
                <span className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  View Extracted Text
                </span>
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="20" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="20"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <div className="text-neutral-500 p-4 pt-0 text-sm font-mono whitespace-pre-wrap border-t border-white/5 mt-2 pt-4">
                {result.extractedText}
              </div>
            </details>
          </div>
        </div>
      </div>

      {/* Sticky Action Button */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 cursor-pointer transition-transform hover:scale-105 active:scale-95" onClick={onReset}>
        <GlassSurface
          width="auto"
          height="auto"
          borderRadius={50}
          borderWidth={0.07}
          brightness={50}
          opacity={0.93}
          blur={11}
          displace={0.5}
          distortionScale={-180}
          redOffset={0}
          greenOffset={10}
          blueOffset={20}
          backgroundOpacity={0.1}
          mixBlendMode="screen"
          className="px-8 py-4"
        >
          <div className="flex items-center gap-3 font-bold text-white tracking-wide uppercase">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Grade Another
          </div>
        </GlassSurface>
      </div>
    </div>
  );
};

// English Question Card Component
const EnglishQuestionCard: React.FC<{ question: QuestionFeedback; isSelected: boolean }> = ({ question, isSelected }) => {
  const statusConfig = {
    correct: {
      icon: '✅',
      borderColor: 'border-green-500/30',
      bgColor: 'bg-green-900/10',
      iconBg: 'bg-green-500/20',
      iconColor: 'text-green-400'
    },
    incorrect: {
      icon: '❌',
      borderColor: 'border-red-500/30',
      bgColor: 'bg-red-900/10',
      iconBg: 'bg-red-500/20',
      iconColor: 'text-red-400'
    },
    partial: {
      icon: '⚠️',
      borderColor: 'border-yellow-500/30',
      bgColor: 'bg-yellow-900/10',
      iconBg: 'bg-yellow-500/20',
      iconColor: 'text-yellow-400'
    }
  };

  const config = statusConfig[question.status];

  return (
    <div 
      id={`question-${question.questionNumber}`}
      className={`bg-neutral-900/50 rounded-2xl border ${config.borderColor} ${config.bgColor} p-6 transition-all ${
        isSelected ? 'ring-2 ring-yellow-500 scale-[1.02]' : ''
      }`}
    >
      {/* Question Header */}
      <div className="flex items-start gap-3 mb-4">
        <div className={`${config.iconBg} rounded-lg p-2 text-2xl flex-shrink-0`}>
          {config.icon}
        </div>
        <div className="flex-1">
          <h4 className="text-white font-medium text-lg">
            {question.questionNumber.match(/^\d+$/) ? `Section ${question.questionNumber}` : question.questionNumber}
          </h4>
          <p className="text-neutral-400 text-sm mt-1">{question.questionTitle}</p>
        </div>
      </div>

      {/* Your Answer */}
      <div className="mb-4 bg-neutral-800/50 rounded-xl p-4 border border-white/5">
        <div className="flex items-center gap-2 mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
          <span className="text-xs font-medium text-neutral-400 uppercase tracking-wide">Your Writing</span>
        </div>
        <p className="text-neutral-300 text-sm font-coolvetica leading-relaxed whitespace-pre-wrap">
          {question.studentAnswer || 'No answer provided'}
        </p>
      </div>

      {/* Correct Answer (only if incorrect or partial) */}
      {question.status !== 'correct' && question.correctAnswer && (
        <div className="mb-4 bg-green-900/10 rounded-xl p-4 border border-green-500/20">
          <div className="flex items-center gap-2 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-xs font-medium text-green-400 uppercase tracking-wide">Improved Version</span>
          </div>
          <p className="text-green-300 text-sm font-coolvetica leading-relaxed whitespace-pre-wrap">
            {question.correctAnswer}
          </p>
        </div>
      )}

      {/* AI Insight */}
      {question.insight && (
        <div className="bg-orange-900/10 rounded-xl p-4 border border-orange-500/20">
          <div className="flex items-start gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-orange-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="flex-1">
              <span className="text-xs font-medium text-orange-400 uppercase tracking-wide block mb-1">Writing Insight</span>
              <p className="text-orange-200 text-sm leading-relaxed">
                {question.insight}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnglishResultCard;

