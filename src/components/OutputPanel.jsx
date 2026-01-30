import React from 'react';
import { Video, Play, MonitorPlay } from 'lucide-react';

const OutputPanel = () => {
  return (
    <div className="h-full flex flex-col bg-gray-900 text-white p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-400 uppercase tracking-wider">Production Studio</h2>
        <div className="bg-red-600 px-3 py-1 rounded text-xs font-bold uppercase tracking-wider animate-pulse">
          Live Preview
        </div>
      </div>

      <div className="flex-1 bg-black rounded-2xl border-4 border-gray-800 relative overflow-hidden shadow-2xl">
        {/* Teleprompter Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
          <div className="space-y-8 max-w-2xl">
            <p className="text-4xl font-bold text-gray-500 blur-[1px] opacity-50">
              Start by taking a deep breath...
            </p>
            
            <p className="text-5xl font-bold text-white leading-tight">
              "The future of social media isn't just about <span className="text-blue-400">sharing content</span>, it's about building <span className="text-purple-400">genuine connections</span>."
            </p>
            
            <div className="bg-yellow-500/20 border border-yellow-500/50 text-yellow-200 px-6 py-3 rounded-lg text-xl font-bold inline-flex items-center">
              <Video size={24} className="mr-2" />
              CUE: Look at camera & smile
            </div>

            <p className="text-4xl font-bold text-gray-500 blur-[1px] opacity-50">
              And that's why we built...
            </p>
          </div>
        </div>

        {/* Controls Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
          <div className="flex items-center justify-center space-x-6">
            <button className="p-4 rounded-full bg-gray-800 hover:bg-gray-700 text-white transition-colors">
              <MonitorPlay size={24} />
            </button>
            <button className="p-6 rounded-full bg-white text-black hover:bg-gray-200 transition-colors transform hover:scale-105">
              <Play size={32} fill="currentColor" />
            </button>
            <div className="text-sm font-mono text-gray-400">00:00 / 01:30</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutputPanel;
