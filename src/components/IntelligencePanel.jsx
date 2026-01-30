import React from 'react';
import { TrendingUp, MessageSquare, ExternalLink, Sparkles } from 'lucide-react';

const IntelligencePanel = () => {
  const topVoices = [
    { 
      name: 'Naval Ravikant', 
      topic: 'Wealth & Happiness', 
      avatar: 'NR',
      bgColor: 'bg-tag-pink',
      quote: "The most important skill for the future is being a perpetual learner."
    },
    { 
      name: 'Sam Altman', 
      topic: 'Future of AI', 
      avatar: 'SA',
      bgColor: 'bg-tag-green',
      quote: "Intelligence is going to be a commodity. Human connection will be the premium."
    },
    { 
      name: 'Paul Graham', 
      topic: 'Startups', 
      avatar: 'PG',
      bgColor: 'bg-tag-yellow',
      quote: "Live in the future, then build what's missing."
    },
  ];

  return (
    <div className="h-full flex flex-col bg-brand-cream relative overflow-hidden font-sans">
      {/* Dotted Background */}
      <div className="absolute inset-0 bg-dot-pattern opacity-50 pointer-events-none"></div>

      {/* Header */}
      <div className="flex items-center justify-between p-8 border-b-2 border-black/10 bg-white/50 backdrop-blur-sm z-10">
        <div>
          <h2 className="text-3xl font-serif-display font-black text-black">Intelligence</h2>
          <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mt-1">Social Context Feed</p>
        </div>
        <div className="bg-black text-white p-2 rounded-lg shadow-[4px_4px_0px_rgba(0,0,0,1)]">
          <TrendingUp size={24} />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8 relative z-10 space-y-6">
        
        {/* Featured Insight Card */}
        <div className="bg-tag-purple border-2 border-black p-6 rounded-2xl shadow-[6px_6px_0px_rgba(0,0,0,1)] transform hover:-translate-y-1 transition-transform">
          <div className="flex items-center space-x-2 mb-4">
            <Sparkles size={20} className="text-black" />
            <span className="font-bold text-black uppercase tracking-wide text-sm">Trending Insight</span>
          </div>
          <p className="text-xl font-bold text-black leading-tight">
            "Building in public isn't just about showing code. It's about sharing the <span className="bg-white px-1">struggle</span> and the <span className="bg-white px-1">story</span>."
          </p>
        </div>

        <h3 className="text-xl font-serif-display font-bold text-black mt-8 mb-4 flex items-center">
          <span className="bg-black text-white w-6 h-6 rounded-full flex items-center justify-center text-xs mr-2">#</span>
          Top Voices
        </h3>

        <div className="grid gap-6">
          {topVoices.map((voice, index) => (
            <div key={index} className="bg-white p-5 rounded-xl border-2 border-black hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-all cursor-pointer group relative overflow-hidden">
              {/* Decorative color strip */}
              <div className={`absolute top-0 left-0 w-2 h-full ${voice.bgColor}`}></div>
              
              <div className="pl-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-full border-2 border-black ${voice.bgColor} flex items-center justify-center font-bold text-lg text-black shadow-sm`}>
                      {voice.avatar}
                    </div>
                    <div>
                      <div className="font-bold text-lg text-black leading-none">{voice.name}</div>
                      <div className="text-xs font-bold text-gray-500 uppercase mt-1 tracking-wide">
                        {voice.topic}
                      </div>
                    </div>
                  </div>
                  <ExternalLink size={16} className="text-gray-400 group-hover:text-black transition-colors" />
                </div>
                
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 italic text-gray-700 text-sm mb-3">
                  "{voice.quote}"
                </div>
                
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="flex items-center text-gray-500 group-hover:text-black transition-colors">
                    <MessageSquare size={14} className="mr-1" /> 
                    245 discussions
                  </span>
                  <span className={`px-2 py-1 rounded border border-black text-black ${voice.bgColor} shadow-[2px_2px_0px_rgba(0,0,0,1)]`}>
                    Trending
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IntelligencePanel;
