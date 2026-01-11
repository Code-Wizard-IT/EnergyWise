
import React from 'react';
import { Screen, Appliance } from '../types';
import { Card, Badge, SafeAreaView } from '../components/EnergyWiseElements';
import { Bell, Zap, TrendingDown, ArrowUpRight, Plus, Scan } from 'lucide-react';

const Home: React.FC<{ devices: Appliance[], navigateTo: (s: Screen, p?: any) => void }> = ({ devices, navigateTo }) => {
  const totalKwh = 320;
  const totalCost = 96;
  const consumptionPercent = 74;

  const getLevelColor = (percent: number) => {
    if (percent < 40) return '#00A86B';
    if (percent < 75) return '#FFB800';
    return '#FF6B35';
  };

  const activeColor = getLevelColor(consumptionPercent);
  const topDevices = [...devices].sort((a, b) => (b.powerWatts * b.dailyUsageHours) - (a.powerWatts * a.dailyUsageHours)).slice(0, 3);

  return (
    <SafeAreaView className="bg-[#F5F7FA]">
      {/* Header section: mt-4 (16px) additional after safe area (60px) */}
      <header className="flex items-center justify-between mb-8 mt-4 animate-in fade-in slide-in-from-top duration-500">
        <div>
          <h1 className="text-2xl font-black text-[#1A1A2E]">Ciao, Marco 👋</h1>
          <p className="text-[10px] font-black text-[#6B7280] uppercase tracking-[2px]">Appartamento Milano</p>
        </div>
        <button className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-[#E5E7EB] active:scale-90 transition-all">
          <Bell size={22} className="text-[#1A1A2E]" />
        </button>
      </header>

      {/* Hero Stats Card - Consumption Overview */}
      <Card className="bg-[#1A1A2E] text-white border-none mb-10 relative overflow-hidden p-8 animate-in zoom-in-95 duration-700" elevated>
        <div className="relative z-10 flex flex-col h-full justify-between">
          <div className="flex items-center gap-2 text-[#00A86B] mb-6 bg-white/5 w-fit px-4 py-1.5 rounded-full border border-white/5">
            <TrendingDown size={14} className="animate-bounce" />
            <span className="text-[10px] font-black uppercase tracking-widest">-12% vs mese scorso</span>
          </div>
          
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[#6B7280] text-[10px] font-black uppercase tracking-[3px] mb-2">Consumo Mensile</p>
              <h2 className="text-6xl font-black tracking-tighter">{totalKwh}<span className="text-xl text-[#6B7280] ml-1 font-extrabold uppercase tracking-tight">kWh</span></h2>
              <div className="mt-6 flex items-baseline gap-2 bg-[#2A2A4E] w-fit px-4 py-2 rounded-xl border border-white/5 shadow-inner">
                <span className="text-2xl font-black text-[#FFB800]">€{totalCost.toFixed(2)}</span>
                <span className="text-[9px] text-[#6B7280] font-black uppercase tracking-widest">Stima Costi</span>
              </div>
            </div>
            
            {/* Circular Progress Indicator - Zero Clipping SVG */}
            <div className="relative w-32 h-32 flex items-center justify-center">
              <svg 
                viewBox="0 0 100 100" 
                className="w-full h-full transform -rotate-90 overflow-visible"
              >
                {/* Track */}
                <circle cx="50" cy="50" r="40" fill="none" stroke="#2A2A4E" strokeWidth="10" />
                {/* Active Bar */}
                <circle 
                  cx="50" cy="50" r="40" fill="none" 
                  stroke={activeColor} strokeWidth="10" 
                  strokeDasharray="251.32" 
                  strokeDashoffset={251.32 * (1 - consumptionPercent / 100)} 
                  strokeLinecap="round" 
                  className="transition-all duration-1000 ease-out" 
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center animate-in fade-in delay-500">
                <span className="text-2xl font-black" style={{ color: activeColor }}>{consumptionPercent}%</span>
                <span className="text-[8px] uppercase font-black text-[#6B7280] tracking-widest">Target</span>
              </div>
            </div>
          </div>
        </div>
        <Zap size={180} className="absolute -right-16 -bottom-16 text-white/5 pointer-events-none rotate-12" />
      </Card>

      {/* Main Action Grid */}
      <div className="grid grid-cols-2 gap-5 mb-10 animate-in slide-in-from-bottom duration-500 delay-100">
        <button 
          onClick={() => navigateTo(Screen.ADD_DEVICE)}
          className="bg-[#FFB800] p-6 rounded-3xl flex flex-col gap-6 active:scale-95 transition-all text-[#1A1A2E] shadow-xl shadow-[#FFB800]/10 border border-[#FFB800]/20"
        >
          <div className="bg-white/40 w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner"><Plus size={24} /></div>
          <span className="font-black text-sm uppercase tracking-tight leading-tight text-left">Aggiungi<br/>Dispositivo</span>
        </button>
        <button 
          onClick={() => navigateTo(Screen.BILL_SCANNER)}
          className="bg-[#0077B6] p-6 rounded-3xl flex flex-col gap-6 active:scale-95 transition-all text-white shadow-xl shadow-[#0077B6]/10 border border-[#0077B6]/20"
        >
          <div className="bg-white/10 w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner"><Scan size={24} /></div>
          <span className="font-black text-sm uppercase tracking-tight leading-tight text-left">Scansiona<br/>Bolletta</span>
        </button>
      </div>

      {/* Top Consumers Section */}
      <section className="mb-10 animate-in slide-in-from-bottom duration-500 delay-200 overflow-y-auto no-scrollbar pb-4">
        <div className="flex items-center justify-between mb-5 px-1">
          <h3 className="font-black text-[#1A1A2E] text-lg">Top Dispositivi</h3>
          <button onClick={() => navigateTo(Screen.DEVICE_LIST)} className="text-[10px] font-black text-[#0077B6] uppercase tracking-[2px]">Tutti i Dispositivi</button>
        </div>
        <div className="flex flex-col gap-3">
          {topDevices.map((device, idx) => {
             const cost = ((device.powerWatts * device.dailyUsageHours / 1000) * 30 * 0.30);
             return (
              <Card 
                key={device.id} 
                className="flex items-center gap-4 py-4 px-5 border-[#E5E7EB] active:bg-gray-50 transition-colors" 
                onClick={() => navigateTo(Screen.DEVICE_DETAIL, { device })}
              >
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-[#1A1A2E] border border-[#E5E7EB] shadow-sm relative">
                  <Zap size={24} className={device.isActive ? 'text-[#00A86B]' : 'text-gray-200'} fill={device.isActive ? '#00A86B' : 'none'} />
                  {idx === 0 && <div className="absolute -top-1 -left-1 w-4 h-4 bg-[#FF6B35] rounded-full border-2 border-white"></div>}
                </div>
                <div className="flex-1">
                  <h4 className="font-black text-sm text-[#1A1A2E] truncate w-32">{device.customName || device.model}</h4>
                  <p className="text-[9px] text-[#6B7280] font-black uppercase tracking-widest">{device.room}</p>
                </div>
                <div className="text-right flex flex-col items-end">
                  <p className="font-black text-sm text-[#1A1A2E]">€{cost.toFixed(2)}</p>
                  <p className="text-[9px] text-[#FF6B35] font-black uppercase tracking-tighter">Questo Mese</p>
                </div>
                <ArrowUpRight size={18} className="text-[#E5E7EB]" />
              </Card>
             );
          })}
        </div>
      </section>

      {/* Success Tip Box */}
      <div className="bg-[#E8F5E9] p-6 rounded-[28px] border border-[#00A86B]/15 flex gap-5 mb-12 animate-in fade-in duration-1000 delay-500">
        <div className="w-14 h-14 shrink-0 bg-[#00A86B] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-[#00A86B]/20">
          <Zap size={24} fill="white" />
        </div>
        <div className="flex-1">
          <h4 className="font-black text-sm text-[#1A1A2E] mb-1">Risparmio Intelligente</h4>
          <p className="text-xs font-medium text-[#6B7280] leading-relaxed">
            Abbiamo notato un alto consumo del <span className="font-black text-[#00A86B]">Gaming Rig</span> in ufficio. Spegnilo in standby per risparmiare fino a <span className="font-bold text-[#1A1A2E]">€4.50/mese</span>.
          </p>
        </div>
      </div>
    </SafeAreaView>
  );
};

export default Home;
