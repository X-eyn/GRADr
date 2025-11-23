import { InfiniteSlider } from './motion-primitives/infinite-slider';

export function InfiniteSliderBasic() {
  return (
    <div className="w-full py-8">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-8 font-coolvetica">
        Powered by Leading AI Models
      </h2>
      <InfiniteSlider gap={48} reverse speed={50}>
        <div className="flex items-center gap-4 px-6">
          <img
            src='/openai-svgrepo-com.svg'
            alt='OpenAI logo'
            className='h-[60px] w-[60px] object-contain'
            style={{ filter: 'brightness(0) invert(1)' }}
          />
          <span className="text-white text-lg font-mono whitespace-nowrap" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            OpenAI
          </span>
        </div>
        <div className="flex items-center gap-4 px-6">
          <img
            src='/Google_Gemini_icon_2025.svg'
            alt='Gemini logo'
            className='h-[60px] w-[60px] object-contain'
          />
          <span className="text-white text-lg font-mono whitespace-nowrap" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            Gemini
          </span>
        </div>
        <div className="flex items-center gap-4 px-6">
          <img
            src='/claude-ai-icon.svg'
            alt='Claude logo'
            className='h-[60px] w-[60px] object-contain'
          />
          <span className="text-white text-lg font-mono whitespace-nowrap" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            Claude
          </span>
        </div>
        <div className="flex items-center gap-4 px-6">
          <img
            src='/Mistral_AI_logo_(2025%E2%80%93).svg'
            alt='Mistral logo'
            className='h-[60px] w-[60px] object-contain'
          />
          <span className="text-white text-lg font-mono whitespace-nowrap" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            Mistral
          </span>
        </div>
        <div className="flex items-center gap-4 px-6">
          <img
            src='/grok-icon.svg'
            alt='Grok logo'
            className='h-[60px] w-[60px] object-contain'
          />
          <span className="text-white text-lg font-mono whitespace-nowrap" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            Grok
          </span>
        </div>
      </InfiniteSlider>
    </div>
  );
}

