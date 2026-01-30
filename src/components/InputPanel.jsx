import React, { useEffect, useRef } from 'react';
import { Mic, Square } from 'lucide-react';
import useVoiceRecorder from '../hooks/useVoiceRecorder';

const InputPanel = ({ onSaveMemo }) => {
  const { isRecording, transcript, startRecording, stopRecording } = useVoiceRecorder();
  const prevRecordingState = useRef(isRecording);

  // Effect to detect when recording stops and save the memo
  useEffect(() => {
    if (prevRecordingState.current && !isRecording && transcript) {
      // Recording just stopped and we have a transcript
      const newMemo = {
        id: Date.now(),
        title: `Voice Note ${new Date().toLocaleTimeString()}`,
        content: transcript,
        date: new Date(),
        type: 'voice'
      };
      
      if (onSaveMemo) {
        onSaveMemo(newMemo);
      }
    }
    prevRecordingState.current = isRecording;
  }, [isRecording, transcript, onSaveMemo]);

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <div className="h-full flex flex-col glass-panel p-6 border-r border-white/10 relative overflow-hidden">
      {/* Background Gradient Blob */}
      <div className="absolute top-0 -left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-0 -right-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      <h2 className="text-xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 uppercase tracking-wider relative z-10">
        Voice Input
      </h2>
      
      <div className="flex-1 flex flex-col items-center justify-center space-y-12 relative z-10">
        
        {/* Glowing Orb Visualization */}
        <div className="relative flex items-center justify-center">
          {/* Outer Glow Rings */}
          <div className={`absolute w-64 h-64 rounded-full border border-white/5 transition-all duration-1000 ${isRecording ? 'scale-110 opacity-100' : 'scale-100 opacity-20'}`}></div>
          <div className={`absolute w-48 h-48 rounded-full border border-white/10 transition-all duration-1000 ${isRecording ? 'scale-110 opacity-100' : 'scale-100 opacity-30'}`}></div>
          
          {/* Central Orb */}
          <div className={`relative w-32 h-32 rounded-full flex items-center justify-center transition-all duration-500
            ${isRecording 
              ? 'bg-gradient-to-br from-pink-500 to-purple-600 shadow-[0_0_50px_rgba(236,72,153,0.5)] animate-pulse-slow' 
              : 'bg-gradient-to-br from-gray-800 to-gray-900 border border-white/10 shadow-lg'}
          `}>
             {/* Inner Waveform Animation (CSS-based) */}
             {isRecording && (
               <div className="absolute inset-0 rounded-full overflow-hidden flex items-center justify-center">
                 <div className="w-full h-full bg-gradient-to-t from-transparent via-white/20 to-transparent animate-spin opacity-50"></div>
               </div>
             )}
             
            <button
              onClick={toggleRecording}
              className="z-10 w-full h-full rounded-full flex items-center justify-center hover:scale-105 transition-transform"
            >
              {isRecording ? (
                <Square size={32} fill="white" className="text-white drop-shadow-lg" />
              ) : (
                <Mic size={32} className="text-gray-400 group-hover:text-white transition-colors" />
              )}
            </button>
          </div>
        </div>

        {/* Status Text */}
        <div className="text-center space-y-2 w-full">
          <p className={`text-2xl font-bold transition-colors ${isRecording ? 'text-white text-glow' : 'text-gray-500'}`}>
            {isRecording ? 'Listening...' : 'Tap to Record'}
          </p>
          
          {/* Transcript Display */}
          {transcript && (
            <div className="mt-4 p-4 bg-white/5 rounded-xl border border-white/10 text-left max-h-40 overflow-y-auto w-full">
              <p className="text-gray-300 text-sm leading-relaxed">
                {transcript}
              </p>
            </div>
          )}
          
          {!transcript && (
            <p className="text-sm text-gray-500 uppercase tracking-widest">
              {isRecording ? 'Speak clearly...' : 'Ready'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default InputPanel;
