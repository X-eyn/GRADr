import React, { useState } from 'react';
import ImageUpload from './ImageUpload';
import ResultCard from './ResultCard';
import { analyzeScript } from '../services/geminiService';
import { AppStatus, AssessmentResult } from '../types';

interface GraderProps {
  subject?: string;
}

const Grader: React.FC<GraderProps> = ({ subject = 'General' }) => {
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleImageSelected = async (base64Image: string) => {
    setStatus(AppStatus.ANALYZING);
    setErrorMsg('');
    
    try {
      const assessment = await analyzeScript(base64Image, subject);
      setResult(assessment);
      setStatus(AppStatus.SUCCESS);
    } catch (err) {
      console.error(err);
      setStatus(AppStatus.ERROR);
      setErrorMsg('Failed to analyze the script. Please ensure the API Key is valid and try again.');
    }
  };

  const handleReset = () => {
    setStatus(AppStatus.IDLE);
    setResult(null);
    setErrorMsg('');
  };

  return (
    <div className="min-h-screen bg-black text-white relative font-sans selection:bg-white selection:text-black animate-fade-in pt-20">
      
      <div className="max-w-4xl mx-auto px-4 py-12 md:py-20">
        
        {/* Header */}
        <header className="text-center mb-16">
          <div className="flex justify-center mb-6">
             <img 
               src="/assets/logos/logo.png" 
               alt="GRADr Logo" 
               className="h-20 w-auto" 
               style={{ filter: 'brightness(0) invert(1)' }}
             />
          </div>
          <div className="inline-flex items-center justify-center p-4 border border-white/20 rounded-full mb-8">
            <span className="text-2xl">
              {subject === 'Biology' && '🧬'}
              {subject === 'Physics' && '⚛️'}
              {subject === 'Chemistry' && '🧪'}
              {subject === 'English' && '📚'}
              {subject === 'General' && '📝'}
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 text-white">
            GRADr <span className="text-neutral-500 font-light text-3xl md:text-5xl block md:inline mt-2 md:mt-0 md:ml-4">{subject}</span>
          </h1>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto font-light leading-relaxed">
            Upload your {subject === 'General' ? '' : subject} homework or exam paper. 
            Our dedicated AI will grade it with specific {subject.toLowerCase()} context.
          </p>
        </header>

        {/* Main Content Area */}
        <main className="transition-all duration-500">
          
          {status === AppStatus.IDLE && (
            <div className="animate-fade-in-up">
              <ImageUpload onImageSelected={handleImageSelected} isProcessing={false} />
            </div>
          )}

          {status === AppStatus.ANALYZING && (
            <div className="bg-neutral-900/50 rounded-3xl p-16 border border-white/10 text-center animate-pulse backdrop-blur-sm">
               <div className="flex flex-col items-center justify-center gap-8">
                 <div className="w-12 h-12 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                 <div>
                    <h3 className="text-2xl font-medium text-white mb-2 tracking-tight">Analyzing {subject} Script</h3>
                    <p className="text-neutral-500 font-light">Deciphering handwriting & checking logic...</p>
                 </div>
               </div>
            </div>
          )}

          {status === AppStatus.ERROR && (
            <div className="bg-neutral-900 rounded-3xl p-12 border border-white/10 text-center">
                <div className="w-16 h-16 border border-white/20 rounded-full flex items-center justify-center mx-auto mb-6 text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Analysis Failed</h3>
                <p className="text-neutral-400 mb-8 font-light">{errorMsg}</p>
                <button 
                    onClick={handleReset}
                    className="bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-neutral-200 transition-colors"
                >
                    Try Again
                </button>
            </div>
          )}

          {status === AppStatus.SUCCESS && result && (
            <ResultCard result={result} onReset={handleReset} />
          )}

        </main>
      </div>
    </div>
  );
};

export default Grader;
