import React from 'react';
import GlassSurface from './GlassSurface';

interface AboutProps {
  onNavigateHome?: () => void;
}

const About: React.FC<AboutProps> = ({ onNavigateHome }) => {
  return (
    <div className="min-h-screen bg-black text-white relative font-sans selection:bg-white selection:text-black pt-20">
      <div className="max-w-4xl mx-auto px-4 py-12 md:py-20">
        
        <header className="text-center mb-16 animate-fade-in-down">
          <div className="flex justify-center mb-6">
             <img 
               src="/assets/logos/logo.png" 
               alt="GRADr Logo" 
               className="h-20 w-auto cursor-pointer hover:opacity-80 transition-opacity" 
               style={{ filter: 'brightness(0) invert(1)' }}
               onClick={onNavigateHome}
             />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-500 pb-2 font-lemon-milk pr-4">
            About GRAD<span style={{ 
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
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto font-coolvetica leading-relaxed">
            Revolutionizing academic assessment with advanced AI technology.
          </p>
        </header>

        <div className="space-y-12 animate-fade-in-up">
          <section>
             <GlassSurface borderRadius={24} opacity={0.1} borderWidth={0.5} className="p-8 md:p-12">
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-500 font-lemon-milk">Our Mission</h2>
                  <p className="text-neutral-300 leading-relaxed text-lg font-coolvetica">
                    GRAD<span style={{ 
                      fontSize: '0.85em', 
                      fontStyle: 'italic',
                      background: 'linear-gradient(135deg, #00ffd1, #8a5cff)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}>r</span> is designed to bridge the gap between traditional handwriting and digital assessment. 
                    We believe that feedback should be instant, constructive, and detailed. By leveraging 
                    cutting-edge Generative AI, we provide students and educators with a tool that 
                    not only grades but teaches.
                  </p>
                </div>
             </GlassSurface>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <GlassSurface borderRadius={24} opacity={0.1} borderWidth={0.5} className="p-8">
               <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-500 font-lemon-milk">Technology</h3>
               <p className="text-neutral-400 font-coolvetica">
                 Built on Gemini 1.5/2.0 Flash models, offering multimodal capabilities to understand text, 
                 diagrams, and handwriting with exceptional accuracy.
               </p>
            </GlassSurface>

             <GlassSurface borderRadius={24} opacity={0.1} borderWidth={0.5} className="p-8">
               <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-500 font-lemon-milk">Privacy</h3>
               <p className="text-neutral-400 font-coolvetica">
                 Your data is processed securely. We prioritize user privacy and do not use your submissions 
                 to train our core models without explicit consent.
               </p>
            </GlassSurface>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
