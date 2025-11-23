import React from 'react';
import GlassSurface from './GlassSurface';
import RotatingText from './RotatingText';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-black text-white relative font-sans selection:bg-white selection:text-black overflow-hidden flex flex-col items-center justify-center">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '6s' }}></div>
      </div>

      <div className="z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center gap-12">
        {/* Hero Section */}
        <div className="animate-fade-in-down space-y-6 flex flex-col items-center">
          <div className="mb-4">
            <img 
              src="/assets/logos/logo.png" 
              alt="GRADr Logo" 
              className="h-24 w-auto"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
          </div>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-500 pb-2 font-lemon-milk">
            GRADr
          </h1>
          <div className="text-xl md:text-2xl text-neutral-400 font-light max-w-2xl mx-auto leading-relaxed flex flex-col gap-2">
            <p>
              Transform handwriting into graded feedback instantly. 
            </p>
            <p>
              Experience the next generation of assessment.
            </p>
            <div className="flex items-center justify-center gap-2 mt-4 text-xl md:text-2xl font-light text-neutral-400">
              <span>Grade your</span>
              <RotatingText
                texts={['Biology', 'Physics', 'English', 'Chemistry']}
                mainClassName="px-2 sm:px-2 md:px-3 bg-cyan-300 text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
                staggerFrom={"last"}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={2000}
              />
              <span>Scripts</span>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={onStart}
          className="group relative px-8 py-4 bg-white text-black rounded-full font-semibold text-lg hover:scale-105 transition-all duration-300 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_-15px_rgba(255,255,255,0.5)]"
        >
          <span className="relative z-10 flex items-center gap-2">
            Get Started Now
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
        </button>

        {/* Feature Cards using GlassSurface */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 w-full">
            <GlassSurface 
                width="100%" 
                height="auto"
                className="min-h-[200px]"
                borderRadius={24}
                opacity={0.1}
                borderWidth={0.5}
            >
                <div className="flex flex-col items-center justify-center text-center p-6 h-full gap-4">
                    <div className="text-3xl">🚀</div>
                    <h3 className="text-xl font-medium">Instant Analysis</h3>
                    <p className="text-sm text-neutral-400">Get feedback in seconds powered by advanced Gemini AI models.</p>
                </div>
            </GlassSurface>

            <GlassSurface 
                width="100%" 
                height="auto"
                className="min-h-[200px]"
                borderRadius={24}
                opacity={0.1}
                borderWidth={0.5}
            >
                <div className="flex flex-col items-center justify-center text-center p-6 h-full gap-4">
                    <div className="text-3xl">✍️</div>
                    <h3 className="text-xl font-medium">Handwriting Recognition</h3>
                    <p className="text-sm text-neutral-400">Deciphers complex handwriting with high accuracy.</p>
                </div>
            </GlassSurface>

            <GlassSurface 
                width="100%" 
                height="auto"
                className="min-h-[200px]"
                borderRadius={24}
                opacity={0.1}
                borderWidth={0.5}
            >
                <div className="flex flex-col items-center justify-center text-center p-6 h-full gap-4">
                    <div className="text-3xl">🎯</div>
                    <h3 className="text-xl font-medium">Detailed Feedback</h3>
                    <p className="text-sm text-neutral-400">Receive comprehensive grading and suggestions for improvement.</p>
                </div>
            </GlassSurface>
        </div>
      </div>
      
      <footer className="absolute bottom-6 text-neutral-600 text-sm font-light">
        © {new Date().getFullYear()} GRADr AI. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
