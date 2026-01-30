import React from 'react';
import { FileText, Send, Linkedin, Twitter, Instagram } from 'lucide-react';

const ReadyPosts = ({ onSelectPost }) => {
  return (
    <div className="flex-1 bg-brand-cream p-8 text-brand-black overflow-y-auto relative">
      {/* Dotted Background */}
      <div className="absolute inset-0 bg-dot-pattern opacity-50 pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        <h2 className="text-4xl font-serif-display font-black mb-8 flex items-center">
           <span className="bg-tag-purple p-2 rounded-lg border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] mr-4">
             <FileText className="text-black" size={32} />
          </span>
          Ready to Post
        </h2>

        <div className="space-y-6">
          {[1, 2].map((i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border-2 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all">
              
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-2">
                   {/* Platform Badge */}
                   <div className="bg-[#0077B5] text-white p-1.5 rounded border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                     <Linkedin size={16} />
                   </div>
                   <span className="font-bold text-sm bg-gray-100 px-2 py-1 rounded border border-black/10">LinkedIn</span>
                </div>
                
                <button 
                  onClick={() => onSelectPost && onSelectPost({ id: i, title: `Post Draft #${i}` })}
                  className="bg-black text-white px-5 py-2 rounded-lg font-bold text-sm border-2 border-transparent hover:bg-gray-800 hover:shadow-[4px_4px_0px_rgba(0,0,0,0.2)] transition-all flex items-center"
                >
                  Open Studio <Send size={14} className="ml-2" />
                </button>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl border-2 border-dashed border-gray-300 mb-4 font-serif text-lg leading-relaxed">
                "Here's why relying solely on motivation is a trap. <span className="bg-tag-yellow px-1">Discipline</span> beats motivation every single time because..."
              </div>

              <div className="flex items-center justify-between pt-4 border-t-2 border-black/5">
                <div className="flex items-center text-xs font-bold text-gray-500 uppercase tracking-wide space-x-4">
                  <span>Generated 2h ago</span>
                  <span>•</span>
                  <span className="text-black bg-tag-green px-2 py-0.5 rounded border border-black">Video Script + Caption</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReadyPosts;
