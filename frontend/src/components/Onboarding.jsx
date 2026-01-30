import React, { useState } from 'react';
import { ArrowRight, User, MapPin } from 'lucide-react';
import Logo from './Logo';

const Onboarding = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    platform: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      onComplete(formData);
    }
  };

  return (
    <div className="h-screen w-screen bg-black flex flex-col items-center justify-center text-white relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-20"></div>
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-600 rounded-full blur-[120px] opacity-20 animate-blob"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-pink-600 rounded-full blur-[120px] opacity-20 animate-blob animation-delay-2000"></div>

      <div className="relative z-10 mb-8 transform hover:scale-105 transition-transform duration-500">
        <Logo size="large" />
      </div>

      <div className="max-w-md w-full glass-panel p-8 rounded-2xl border border-white/10 shadow-2xl relative z-10 backdrop-blur-xl">
        <div className="flex justify-between items-center mb-8">
          <div className="flex space-x-2">
            <div className={`w-3 h-3 rounded-full transition-colors ${step >= 1 ? 'bg-pink-500' : 'bg-white/10'}`} />
            <div className={`w-3 h-3 rounded-full transition-colors ${step >= 2 ? 'bg-pink-500' : 'bg-white/10'}`} />
          </div>
          <div className="text-gray-400 text-sm">Step {step} of 2</div>
        </div>

        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">Who are you?</h2>
            <p className="text-gray-400">Let's get to know you better to tailor your content.</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Your Name</label>
                <div className="relative group">
                  <User className="absolute left-3 top-3 text-gray-500 group-focus-within:text-pink-500 transition-colors" size={18} />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-black/40 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-white focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 outline-none transition-all placeholder-gray-600"
                    placeholder="e.g. Alex Chen"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Professional Role</label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full bg-black/40 border border-white/10 rounded-lg py-2.5 px-4 text-white focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 outline-none transition-all placeholder-gray-600"
                  placeholder="e.g. Product Designer"
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">Where do you shine?</h2>
            <p className="text-gray-400">Which platform is your main focus right now?</p>
            
            <div className="space-y-3">
              {['LinkedIn', 'Twitter / X', 'Instagram', 'YouTube'].map((p) => (
                <button
                  key={p}
                  onClick={() => setFormData({ ...formData, platform: p })}
                  className={`w-full p-4 rounded-xl border text-left transition-all duration-300 ${
                    formData.platform === p
                      ? 'bg-pink-500/20 border-pink-500 text-white shadow-[0_0_15px_rgba(236,72,153,0.3)]'
                      : 'bg-black/40 border-white/10 text-gray-400 hover:border-white/30 hover:bg-white/5'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={handleNext}
          className="w-full mt-8 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-3 rounded-xl hover:shadow-[0_0_20px_rgba(236,72,153,0.4)] hover:scale-[1.02] transition-all flex items-center justify-center border border-white/10"
        >
          {step === 1 ? 'Next' : 'Get Started'}
          <ArrowRight size={18} className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
