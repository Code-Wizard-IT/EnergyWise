
import React, { useState } from 'react';
import { Button } from '../components/EnergyWiseElements';
import { Zap } from 'lucide-react';

const Login: React.FC<{ onLogin: () => void, onRegister: () => void }> = ({ onLogin, onRegister }) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  return (
    <div className="h-full bg-[#1A1A2E] flex flex-col p-8 pt-[100px] animate-in fade-in duration-500">
      <div className="mb-12 flex flex-col items-center">
        <div className="w-16 h-16 bg-[#00A86B] rounded-[16px] flex items-center justify-center shadow-lg mb-4">
          <Zap size={32} className="text-white fill-white" />
        </div>
        <h1 className="text-3xl font-black text-white">EnergyWise</h1>
      </div>

      {/* Tab Toggle */}
      <div className="bg-white/5 p-1.5 rounded-[12px] flex mb-8">
        <button 
          onClick={() => setActiveTab('login')}
          className={`flex-1 py-3 rounded-[10px] text-xs font-black uppercase tracking-widest transition-all ${
            activeTab === 'login' ? 'bg-[#00A86B] text-white shadow-lg' : 'text-[#6B7280]'
          }`}
        >
          Login
        </button>
        <button 
          onClick={() => { setActiveTab('register'); onRegister(); }}
          className={`flex-1 py-3 rounded-[10px] text-xs font-black uppercase tracking-widest transition-all ${
            activeTab === 'register' ? 'bg-[#00A86B] text-white shadow-lg' : 'text-[#6B7280]'
          }`}
        >
          Register
        </button>
      </div>
      
      <div className="flex flex-col gap-5 mb-8">
        <div className="flex flex-col gap-2">
           <label className="text-[10px] font-black text-[#6B7280] uppercase tracking-widest ml-1">Email</label>
           <input 
              type="email" placeholder="mario.rossi@email.it" 
              className="bg-white/5 border border-white/10 rounded-[12px] px-6 py-4 text-white placeholder-white/20 focus:outline-none focus:border-[#00A86B] transition-all"
           />
        </div>
        <div className="flex flex-col gap-2">
           <label className="text-[10px] font-black text-[#6B7280] uppercase tracking-widest ml-1">Password</label>
           <input 
              type="password" placeholder="••••••••" 
              className="bg-white/5 border border-white/10 rounded-[12px] px-6 py-4 text-white placeholder-white/20 focus:outline-none focus:border-[#00A86B] transition-all"
           />
        </div>
      </div>

      <div className="flex items-center justify-between mb-8">
        <label className="flex items-center gap-2 text-xs text-[#6B7280] font-bold">
          <input type="checkbox" className="rounded-md bg-white/10 border-none w-4 h-4 cursor-pointer" />
          Remember me
        </label>
        <button className="text-xs text-[#00A86B] font-black uppercase tracking-widest">Forgot password?</button>
      </div>

      <Button variant="energy" onClick={onLogin} className="mb-6 py-5 text-lg">Accedi</Button>

      <div className="relative flex items-center justify-center mb-8">
        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
        <span className="relative px-4 bg-[#1A1A2E] text-[#6B7280] text-[10px] font-black uppercase tracking-widest">Oppure</span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <button className="bg-white/5 border border-white/10 p-4 rounded-[12px] flex items-center justify-center gap-2 text-white font-bold text-sm active:scale-95 transition-all">
           Google
        </button>
        <button className="bg-white/5 border border-white/10 p-4 rounded-[12px] flex items-center justify-center gap-2 text-white font-bold text-sm active:scale-95 transition-all">
           Apple
        </button>
      </div>
    </div>
  );
};

export default Login;
