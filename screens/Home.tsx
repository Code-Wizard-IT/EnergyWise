import React, { useState } from 'react';
import { Screen, Appliance } from '../types';
import { Card, Badge, SafeAreaView } from '../components/EnergyWiseElements';
import { Bell, Zap, TrendingDown, ArrowUpRight, Plus, Scan, X } from 'lucide-react';

const Home: React.FC<{ devices: Appliance[], navigateTo: (s: Screen, p?: any) => void }> = ({ devices, navigateTo }) => {
  const totalKwh = 320;
  const totalCost = 96;
  const consumptionPercent = 74;
  const [showTip, setShowTip] = useState(true);

  const getLevelColor = (percent: number) => {
    if (percent < 40) return '#00A86B';
    if (percent < 75) return '#FFB800';
    return '#FF6B35';
  };

  const activeColor = getLevelColor(consumptionPercent);
  const topDevices = [...devices].sort((a, b) => (b.powerWatts * b.dailyUsageHours) - (a.powerWatts * a.dailyUsageHours)).slice(0, 3);

  return (
    <SafeAreaView className="bg-[#F5F7FA]">
      {/* Header */}
      <header className="flex items-center justify-between mb-6 mt-4">
        <div>
          <h1 className="text-2xl font-black text-[#1A1A2E]">Ciao, Marco</h1>
          <p className="text-[10px] font-black text-[#6B7280] uppercase tracking-[2px]">Appartamento Milano</p>
        </div>
        <button className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-[#E5E7EB]">
          <Bell size={22} className="text-[#1A1A2E]" />
        </button>
      </header>

      {/* Hero Stats Card - MUCH LARGER */}
      <div className="bg-[#1A1A2E] rounded-[28px] p-6 mb-8 shadow-xl">
        {/* Badge risparmio */}
        <div className="flex items-center gap-2 bg-[#00A86B]/20 w-fit px-4 py-2 rounded-full mb-5">
          <TrendingDown size={16} className="text-[#00A86B]" />
          <span className="text-xs font-black text-[#00A86B] uppercase tracking-wide">-12% vs mese scorso</span>
        </div>
        
        {/* Contenuto principale */}
        <div className="flex items-center justify-between">
          {/* Dati consumo */}
          <div>
            <p className="text-[#6B7280] text-[10px] font-black uppercase tracking-widest mb-2">Consumo Mensile</p>
            <p className="text-5xl font-black text-white tracking-tight">
              {totalKwh}
              <span className="text-lg text-[#6B7280] ml-1 font-bold">kWh</span>
            </p>
            
            <div className="mt-5 bg-[#2A2A4E] px-4 py-3 rounded-xl inline-block">
              <span className="text-2xl font-black text-[#FFB800]">€{totalCost.toFixed(2)}</span>
              <span className="text-[9px] text-[#6B7280] font-bold uppercase tracking-wide ml-2">Stima</span>
            </div>
          </div>
          
          {/* Grafico circolare */}
          <div style={{ width: '110px', height: '110px', position: 'relative' }}>
            <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
              <circle cx="50" cy="50" r="40" fill="none" stroke="#2A2A4E" strokeWidth="10" />
              <circle 
                cx="50" cy="50" r="40" fill="none" 
                stroke={activeColor} strokeWidth="10" 
                strokeDasharray="251.32" 
                strokeDashoffset={251.32 * (1 - consumptionPercent / 100)} 
                strokeLinecap="round"
              />
            </svg>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <span className="text-2xl font-black" style={{ color: activeColor }}>{consumptionPercent}%</span>
              <span className="text-[8px] uppercase font-bold text-[#6B7280]">Obiettivo</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <button 
          onClick={() => navigateTo(Screen.ADD_DEVICE)}
          className="bg-[#FFB800] p-5 rounded-3xl flex flex-col gap-4 text-[#1A1A2E] shadow-lg"
        >
          <div className="bg-white/40 w-11 h-11 rounded-xl flex items-center justify-center">
            <Plus size={22} />
          </div>
          <span className="font-black text-sm uppercase tracking-tight leading-tight text-left">Aggiungi<br/>Dispositivo</span>
        </button>
        <button 
          onClick={() => navigateTo(Screen.BILL_SCANNER)}
          className="bg-[#0077B6] p-5 rounded-3xl flex flex-col gap-4 text-white shadow-lg"
        >
          <div className="bg-white/20 w-11 h-11 rounded-xl flex items-center justify-center">
            <Scan size={22} />
          </div>
          <span className="font-black text-sm uppercase tracking-tight leading-tight text-left">Scansiona<br/>Bolletta</span>
        </button>
      </div>

      {/* Top Devices */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4 px-1">
          <h3 className="font-black text-[#1A1A2E] text-lg">Dispositivi Principali</h3>
          <button onClick={() => navigateTo(Screen.DEVICE_LIST)} className="text-[10px] font-black text-[#0077B6] uppercase tracking-[2px]">Vedi Tutti</button>
        </div>
        <div className="flex flex-col gap-3">
          {topDevices.map((device, idx) => {
             const cost = ((device.powerWatts * device.dailyUsageHours / 1000) * 30 * 0.30);
             const roomName = device.room === 'Kitchen' ? 'Cucina' : device.room === 'Living Room' ? 'Soggiorno' : device.room === 'Bedroom' ? 'Camera' : device.room === 'Office' ? 'Ufficio' : device.room === 'Laundry' ? 'Lavanderia' : device.room;
             
             return (
              <div 
                key={device.id} 
                onClick={() => navigateTo(Screen.DEVICE_DETAIL, { device })}
                className="bg-white rounded-[20px] flex items-center gap-4 py-4 px-5 border border-[#E5E7EB] shadow-sm"
              >
                <div className="w-14 h-14 bg-[#F5F7FA] rounded-2xl flex items-center justify-center border border-[#E5E7EB] relative">
                  <Zap size={24} className={device.isActive ? 'text-[#00A86B]' : 'text-gray-300'} fill={device.isActive ? '#00A86B' : 'none'} />
                  {idx === 0 && <div className="absolute -top-1 -left-1 w-5 h-5 bg-[#FF6B35] rounded-full border-2 border-white flex items-center justify-center"><span className="text-white text-[8px] font-black">1</span></div>}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-black text-sm text-[#1A1A2E] truncate">{device.customName || device.model}</h4>
                  <p className="text-[10px] text-[#6B7280] font-bold uppercase tracking-wide mt-0.5">{roomName}</p>
                </div>
                <div className="text-right">
                  <p className="font-black text-sm text-[#1A1A2E]">€{cost.toFixed(2)}</p>
                  <p className="text-[9px] text-[#FF6B35] font-bold uppercase mt-0.5">Questo Mese</p>
                </div>
                <ArrowUpRight size={18} className="text-[#E5E7EB]" />
              </div>
             );
          })}
        </div>
      </section>

      {/* Tip Card */}
      {showTip && (
        <div className="bg-[#E8F5E9] p-5 rounded-[24px] border border-[#00A86B]/20 flex gap-4 mb-8 relative">
          <button 
            onClick={() => setShowTip(false)}
            className="absolute top-3 right-3 w-7 h-7 bg-white rounded-full flex items-center justify-center text-[#6B7280]"
          >
            <X size={14} />
          </button>
          <div className="w-12 h-12 shrink-0 bg-[#00A86B] rounded-xl flex items-center justify-center">
            <Zap size={22} className="text-white" fill="white" />
          </div>
          <div className="flex-1 pr-6">
            <h4 className="font-black text-sm text-[#1A1A2E] mb-1">Risparmio Intelligente</h4>
            <p className="text-xs text-[#6B7280] leading-relaxed">
              Abbiamo notato un alto consumo del <span className="font-bold text-[#00A86B]">Gaming Rig</span>. Spegnilo per risparmiare <span className="font-bold text-[#1A1A2E]">€4.50/mese</span>.
            </p>
          </div>
        </div>
      )}
    </SafeAreaView>
  );
};

export default Home;
