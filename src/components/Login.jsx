import React, { useState } from 'react';
import { ArrowRight, Mail, Lock, Loader2 } from 'lucide-react';
import Logo from './Logo';

const Login = ({ onLogin, onBack }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      onLogin({ name: 'Returning User', role: 'Member' });
    }, 1500);
  };

  return (
    <div className="h-screen w-screen bg-black flex flex-col items-center justify-center text-white relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-20"></div>
      <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-600 rounded-full blur-[120px] opacity-20 animate-blob"></div>
      <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-pink-600 rounded-full blur-[120px] opacity-20 animate-blob animation-delay-2000"></div>

      <div className="relative z-10 mb-8 cursor-pointer" onClick={onBack}>
        <Logo size="large" />
      </div>

      <div className="max-w-md w-full glass-panel p-8 rounded-2xl border border-white/10 shadow-2xl relative z-10 backdrop-blur-xl">
        <h2 className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">Welcome Back</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
            <div className="relative group">
              <Mail className="absolute left-3 top-3 text-gray-500 group-focus-within:text-pink-500 transition-colors" size={18} />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-black/40 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-white focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 outline-none transition-all placeholder-gray-600"
                placeholder="you@example.com"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Password</label>
            <div className="relative group">
              <Lock className="absolute left-3 top-3 text-gray-500 group-focus-within:text-pink-500 transition-colors" size={18} />
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full bg-black/40 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-white focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 outline-none transition-all placeholder-gray-600"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-3 rounded-xl hover:shadow-[0_0_20px_rgba(236,72,153,0.4)] hover:scale-[1.02] transition-all flex items-center justify-center border border-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="animate-spin" /> : 'Log In'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button onClick={onBack} className="text-sm text-gray-400 hover:text-white transition-colors">
            Don't have an account? <span className="text-pink-500">Sign up</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
