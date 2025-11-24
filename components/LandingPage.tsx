import React from 'react';
import { FlipWords } from './ui/flip-words';
import { HoverBorderGradient } from './ui/hover-border-gradient';
import { Sparkles } from './ui/sparkles';
import ColorBends from './ColorBends';
import { BentoDemo } from './BentoDemo';
import { Highlighter } from './ui/highlighter';
import { InfiniteSliderBasic } from './InfiniteSliderBasic';
import Stepper, { Step } from './Stepper';

interface LandingPageProps {
  onStart: () => void;
  isMenuOpen?: boolean;
  onNavigateHome?: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart, isMenuOpen = false, onNavigateHome }) => {
  return (
    <div className="min-h-screen bg-black text-white relative font-sans selection:bg-white selection:text-black overflow-x-hidden">
      {/* ColorBends Background */}
      <div style={{ width: '100%', height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: 0 }}>
        <ColorBends
          colors={["#ff5c7a", "#8a5cff", "#00ffd1"]}
          rotation={30}
          speed={0.3}
          scale={1.2}
          frequency={1.4}
          warpStrength={1.2}
          mouseInfluence={0.8}
          parallax={0.6}
          noise={0.08}
          transparent
        />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <div className="text-center px-4 max-w-5xl mx-auto flex flex-col items-center gap-12 pt-20 pb-12">
        {/* Hero Section */}
        <div className="animate-fade-in-down space-y-6 flex flex-col items-center">
          <div className="mb-4">
            <img 
              src="/assets/logos/logo.png" 
              alt="GRADr Logo" 
              className="h-24 w-auto cursor-pointer hover:opacity-80 transition-opacity"
              style={{ filter: 'brightness(0) invert(1)' }}
              onClick={onNavigateHome}
            />
          </div>
          <div className="flex flex-col items-center w-full">
            <Sparkles
              background="transparent"
              minSize={0.6}
              maxSize={1.4}
              speed={4}
              particleColor="#FFFFFF"
              particleDensity={80}
              className="w-full"
            >
              <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-500 pb-2 font-lemon-milk pr-4">
                GRAD<span style={{ 
                  fontSize: '0.7em', 
                  fontStyle: 'italic',
                  background: 'linear-gradient(135deg, #00ffd1, #8a5cff)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  opacity: 0.9,
                  paddingRight: '0.2em'
                }}>r</span>
              </h1>
            </Sparkles>
            {/* Gradient Glow Line */}
            <div className="relative w-full max-w-[40rem] h-[5px] mt-4">
              <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm"></div>
              <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4"></div>
              <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm"></div>
              <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4"></div>
            </div>
          </div>
          <div className="text-xl md:text-2xl text-neutral-400 font-coolvetica max-w-2xl mx-auto leading-relaxed flex flex-col gap-2">
            <p>
              Transform{" "}
              <Highlighter action="underline" color="#FF9800" animationDuration={2000} padding={6}>
                handwriting
              </Highlighter>{" "}
              into graded feedback instantly. 
            </p>
            <p>
              Experience the next generation of{" "}
              <Highlighter action="circle" color="#8a5cff" animationDuration={2000} padding={8}>
                assessment
              </Highlighter>.
            </p>
            <div className="flex items-center justify-center gap-2 mt-4 text-xl md:text-2xl font-coolvetica text-neutral-400">
              <span>Grade your</span>
              <FlipWords
                words={['Biology', 'Physics', 'English', 'Chemistry']}
                duration={2500}
                className="font-coolvetica text-xl md:text-2xl text-white"
              />
              <span>Scripts</span>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <HoverBorderGradient
          onClick={onStart}
          containerClassName="hover:scale-105 transition-all duration-300"
          className="group bg-transparent text-white font-semibold text-lg px-8 py-4"
          as="button"
          duration={1}
          clockwise={true}
        >
          <span className="flex items-center gap-2">
            Get Started Now
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
        </HoverBorderGradient>

        {/* Bento Grid Features */}
        <div className="w-full mt-16 max-w-7xl px-4 pb-8">
            <BentoDemo />
        </div>
        </div>

        {/* Stepper Demo - How It Works */}
        <div className="w-full max-w-7xl px-4 mt-16 text-white">
          <h2 className="text-4xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-500">
            How It Works
          </h2>
           <Stepper
              initialStep={1}
              onStepChange={(step) => {
                console.log(step);
              }}
              onFinalStepCompleted={() => console.log("All steps completed!")}
              backButtonText="Previous"
              nextButtonText="Next"
            >
              <Step>
                <div className="flex flex-col items-center text-center">
                  <div className="text-5xl mb-4">📸</div>
                  <h2 className="text-2xl font-bold mb-3">Step 1: Capture Your Script</h2>
                  <p className="text-neutral-300 text-lg">Take a clear photo of your handwritten answer script using your phone or camera.</p>
                </div>
              </Step>
              <Step>
                <div className="flex flex-col items-center text-center">
                  <div className="text-5xl mb-4">📚</div>
                  <h2 className="text-2xl font-bold mb-3">Step 2: Choose Your Subject</h2>
                  <p className="text-neutral-300 text-lg mb-4">Navigate to the AI grader for your subject:</p>
                  <div className="flex flex-wrap gap-3 justify-center">
                    <span className="px-4 py-2 bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-500/50 rounded-full text-sm">Biology</span>
                    <span className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-blue-600/20 border border-blue-500/50 rounded-full text-sm">Physics</span>
                    <span className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-purple-600/20 border border-purple-500/50 rounded-full text-sm">Chemistry</span>
                    <span className="px-4 py-2 bg-gradient-to-r from-orange-500/20 to-orange-600/20 border border-orange-500/50 rounded-full text-sm">English</span>
                  </div>
                </div>
              </Step>
              <Step>
                <div className="flex flex-col items-center text-center">
                  <div className="text-5xl mb-4">📤</div>
                  <h2 className="text-2xl font-bold mb-3">Step 3: Upload Your Image</h2>
                  <p className="text-neutral-300 text-lg mb-4">Upload the photo of your script to the selected subject grader.</p>
                  <div className="w-full max-w-md p-6 border-2 border-dashed border-neutral-600 rounded-lg bg-neutral-900/50">
                    <p className="text-neutral-400 text-sm">Drag & drop or click to upload</p>
                  </div>
                </div>
              </Step>
              <Step>
                <div className="flex flex-col items-center text-center">
                  <div className="text-5xl mb-4">✨</div>
                  <h2 className="text-2xl font-bold mb-3">Step 4: Get Instant Feedback</h2>
                  <p className="text-neutral-300 text-lg mb-4">Receive detailed evaluation and feedback powered by advanced AI models.</p>
                  <div className="w-full max-w-md p-4 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/30 rounded-lg">
                    <p className="text-sm text-neutral-300">✓ Graded score</p>
                    <p className="text-sm text-neutral-300">✓ Detailed feedback</p>
                    <p className="text-sm text-neutral-300">✓ Areas for improvement</p>
                  </div>
                </div>
              </Step>
            </Stepper>
        </div>

        {/* AI Models Infinite Slider */}
        <div className="w-full max-w-7xl px-4 mt-8">
          <InfiniteSliderBasic />
        </div>

        {/* Spacer for smooth transition */}
        <div className="w-full h-16 bg-gradient-to-b from-transparent to-black/30"></div>

        {/* Footer with gradient fade-in */}
        <footer className="relative w-full mt-auto">
          {/* Gradient overlay for smooth transition */}
          <div className="absolute inset-x-0 -top-32 h-32 bg-gradient-to-b from-transparent to-black/50 pointer-events-none"></div>
          
          <div className="relative border-t border-white/5 bg-black/20 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 py-8 text-center">
              <p className="text-neutral-500 text-sm font-light">
                © {new Date().getFullYear()} GRAD<span style={{ 
                  fontSize: '0.85em', 
                  fontStyle: 'italic',
                  background: 'linear-gradient(135deg, #00ffd1, #8a5cff)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>r</span> AI. All rights reserved.
              </p>
              <p className="text-neutral-600 text-xs mt-2">
                Powered by advanced AI • Instant grading for students worldwide
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;
