import React from 'react';
import { Bookmark, Calendar, Clock, ArrowUpRight } from 'lucide-react';

const SavedMemos = ({ memos = [] }) => {
  return (
    <div className="flex-1 bg-brand-cream p-8 text-brand-black overflow-y-auto relative">
       {/* Dotted Background */}
       <div className="absolute inset-0 bg-dot-pattern opacity-50 pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        <h2 className="text-4xl font-serif-display font-black mb-8 flex items-center">
          <span className="bg-tag-pink p-2 rounded-lg border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] mr-4">
             <Bookmark className="text-black" size={32} />
          </span>
          Saved Memos
        </h2>

        {memos.length === 0 ? (
          <div className="text-center py-20 bg-white border-2 border-dashed border-black rounded-2xl">
            <p className="text-xl font-bold text-gray-500">No memos yet. Start recording to create one!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {memos.map((memo) => (
              <div key={memo.id} className="bg-white p-6 rounded-2xl border-2 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all cursor-pointer group flex flex-col h-full">
                
                <div className="flex justify-between items-start mb-4">
                  <div className="flex flex-col space-y-1">
                    <span className="bg-tag-yellow text-xs font-bold px-2 py-1 rounded border border-black inline-block self-start">
                      Voice Note
                    </span>
                    <div className="flex items-center text-xs font-bold text-gray-500 mt-2">
                      <Calendar size={12} className="mr-1" /> {memo.date.toLocaleDateString()}
                      <Clock size={12} className="ml-3 mr-1" /> {memo.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                  <div className="bg-black text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight size={16} />
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-3 leading-tight group-hover:underline decoration-2 decoration-tag-pink underline-offset-4">
                  {memo.title}
                </h3>
                
                <p className="text-gray-700 text-sm line-clamp-3 mb-4 flex-grow">
                  {memo.content}
                </p>

                <div className="pt-4 border-t-2 border-black/5 mt-auto">
                   <button className="text-sm font-bold uppercase tracking-wide hover:bg-tag-green px-2 py-1 -ml-2 rounded transition-colors">
                     Read Transcript →
                   </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedMemos;
