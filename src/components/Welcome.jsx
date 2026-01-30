import React from 'react';
import Logo from './Logo';
import { ArrowRight, Mic, Share2, Rocket, Code2 } from 'lucide-react';

const Welcome = ({ onGetStarted, onLogin }) => {
  return (
    <div className="h-screen w-screen bg-brand-cream flex flex-col items-center justify-center relative overflow-hidden text-brand-black font-sans">
      
      {/* Decorative Stickers - Product Focused */}
      <div className="absolute top-20 left-10 sticker bg-tag-pink rotate-[-6deg] animate-float">
        <Mic size={20} className="inline mr-2" />
        Voice to Tweet
      </div>
      <div className="absolute top-40 right-20 sticker bg-tag-green rotate-[4deg] animate-float animation-delay-1000">
        <Rocket size={20} className="inline mr-2" />
        Ship Faster
      </div>
      <div className="absolute bottom-32 left-20 sticker bg-tag-purple rotate-[8deg] animate-float animation-delay-2000">
        <Share2 size={20} className="inline mr-2" />
        Auto-Thread
      </div>
       <div className="absolute bottom-40 right-10 sticker bg-tag-yellow rotate-[-4deg] animate-float animation-delay-1500">
        <Code2 size={20} className="inline mr-2" />
        Dev Logs
      </div>


      <div className="relative z-10 flex flex-col items-center space-y-12 max-w-5xl px-6">
        {/* Enlarged Logo Container */}
        <div className="transform hover:scale-105 transition-transform duration-500 mb-8">
          <Logo size="large" />
        </div>

        <div className="text-center space-y-6">
          <h1 className="text-7xl md:text-8xl font-serif-display font-black tracking-tight leading-none">
            You Build.<br/>
            <span className="inline-block transform hover:scale-105 transition-transform duration-300 cursor-default bg-tag-yellow px-4 border-b-8 border-black">We Tell The Story.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 font-medium max-w-2xl mx-auto mt-6">
            The voice-first AI agent for founders who <span className="font-bold bg-tag-pink px-2 py-1 rounded border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]">#BuildInPublic</span>.
          </p>
          
          <p className="text-lg text-gray-500 max-w-lg mx-auto leading-relaxed">
            Capture your journey, ship your product, and let us handle the content engine. You focus on code, we'll handle the noise.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 w-full max-w-lg mt-8">
          <button
            onClick={onGetStarted}
            className="flex-1 btn-neo flex items-center justify-center gap-2 group"
          >
            Start Building
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button
            onClick={onLogin}
            className="flex-1 bg-white text-black font-bold py-3 px-6 rounded-full border-2 border-black hover:bg-gray-50 transition-all shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:translate-y-[2px]"
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
