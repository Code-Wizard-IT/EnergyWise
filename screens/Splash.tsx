
import React, { useEffect } from 'react';
import { Zap } from 'lucide-react';

const Splash: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(onFinish, 2500);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="h-full energy-gradient flex flex-col items-center">
      {/* Logo positioned 60px below top safe area (which is 60px), total 120px from absolute top */}
      <div className="mt-[120px] flex flex-col items-center">
        <div className="relative">
          <div className="w-24 h-24 bg-[#00A86B] rounded-[24px] flex items-center justify-center shadow-[0_0_50px_rgba(0,168,107,0.4)] animate-pulse relative z-10">
            <Zap size={48} className="text-white fill-white" />
          </div>
          <div className="absolute inset-0 rounded-[24px] border-4 border-[#FFB800] animate-ping opacity-20"></div>
        </div>
        <h1 className="mt-8 text-4xl font-[900] text-white tracking-tighter">EnergyWise</h1>
        <p className="mt-2 text-[#FFB800] font-black tracking-[4px] uppercase text-[10px]">Powering Intelligence</p>
      </div>
      
      <div className="mt-auto mb-20 flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
        <span className="text-white/40 text-[10px] font-black uppercase tracking-[3px]">Loading Assets</span>
      </div>
    </div>
  );
};

export default Splash;
