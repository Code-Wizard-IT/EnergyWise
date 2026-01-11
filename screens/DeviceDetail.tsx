import React, { useState, useEffect } from 'react';
import { Appliance } from '../types';
import { Card, Button, SafeAreaView, Badge } from '../components/EnergyWiseElements';
import { ArrowLeft, Zap, ShieldCheck, Trash2, Sliders, Calendar, Euro, Info, Clock } from 'lucide-react';

const DeviceDetail: React.FC<{ 
  device: Appliance | null, 
  onUpdate: (a: Appliance) => void, 
  onDelete: (id: string) => void,
  onBack: () => void 
}> = ({ device, onUpdate, onDelete, onBack }) => {
  // Use Samsung Washing Machine as requested example if device is null (fallback)
  const defaultDevice: Appliance = {
    id: 'wash-123',
    brand: 'Samsung',
    model: 'EcoBubble Series 9',
    category: 'Laundry',
    powerWatts: 2000,
    standbyWatts: 1.5,
    energyClass: 'A+++',
    customName: 'Lavatrice Bagno',
    room: 'Laundry',
    dailyUsageHours: 1.5,
    isActive: true
  };

  const currentDevice = device || defaultDevice;
  const [hours, setHours] = useState(currentDevice.dailyUsageHours);
  const [isActive, setIsActive] = useState(currentDevice.isActive);

  // Constants for calculation
  const ENERGY_PRICE = 0.30; // €/kWh

  const calculateKwh = (watts: number, h: number, days: number) => ((watts * h) / 1000) * days;
  
  const kwhDaily = calculateKwh(currentDevice.powerWatts, hours, 1);
  const kwhWeekly = kwhDaily * 7;
  const kwhMonthly = kwhDaily * 30;
  const kwhYearly = kwhDaily * 365;
  
  const costDaily = kwhDaily * ENERGY_PRICE;
  const costMonthly = kwhMonthly * ENERGY_PRICE;

  // Translate room names
  const translateRoom = (room: string) => {
    const translations: { [key: string]: string } = {
      'Kitchen': 'Cucina',
      'Living Room': 'Soggiorno',
      'Bedroom': 'Camera',
      'Office': 'Ufficio',
      'Laundry': 'Lavanderia',
      'Bathroom': 'Bagno'
    };
    return translations[room] || room;
  };

  // Translate category names
  const translateCategory = (category: string) => {
    const translations: { [key: string]: string } = {
      'Kitchen': 'Cucina',
      'Laundry': 'Lavanderia',
      'Climate': 'Climatizzazione',
      'Electronics': 'Elettronica',
      'Lighting': 'Illuminazione'
    };
    return translations[category] || category;
  };

  return (
    <div className="h-full bg-[#F5F7FA] overflow-y-auto no-scrollbar pb-[100px]">
      {/* Header Section - REDUCED HEIGHT */}
      <div className={`h-52 pt-[60px] relative flex flex-col items-center justify-center transition-colors duration-500 ${isActive ? 'bg-[#1A1A2E]' : 'bg-gray-400'}`}>
        <button 
          onClick={onBack} 
          className="absolute top-16 left-6 w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur text-white active:scale-90 transition-all border border-white/5"
        >
          <ArrowLeft size={24} />
        </button>
        
        <div className="flex flex-col items-center">
          <div className="relative">
             <div className={`w-16 h-16 rounded-[24px] flex items-center justify-center shadow-2xl transition-all duration-500 ${isActive ? 'bg-[#00A86B]' : 'bg-white/10'}`}>
                <Zap size={32} className={isActive ? 'text-white fill-white' : 'text-white/40'} />
             </div>
             {isActive && <div className="absolute inset-0 bg-[#00A86B] rounded-[24px] animate-ping opacity-10"></div>}
          </div>
          <h1 className="mt-3 text-white text-lg font-black">{currentDevice.customName || currentDevice.model}</h1>
          <p className="text-white/50 text-[9px] font-black uppercase tracking-[2px]">{currentDevice.brand} • {currentDevice.model}</p>
        </div>
      </div>

      <div className="px-6 -mt-4">
        {/* Specs Card - PROPERLY POSITIONED */}
        <Card className="mb-6 border-none" elevated>
           <div className="flex items-center justify-between mb-4">
              <h3 className="text-[10px] font-black text-[#6B7280] uppercase tracking-[2px]">Specifiche Tecniche</h3>
              <Badge bgColor="#E8F5E9" color="#00A86B">{isActive ? 'Attivo' : 'Inattivo'}</Badge>
           </div>
           <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col gap-1">
                 <span className="text-[9px] font-bold text-[#6B7280] uppercase">Potenza</span>
                 <span className="text-sm font-black text-[#1A1A2E]">{currentDevice.powerWatts}W</span>
              </div>
              <div className="flex flex-col gap-1">
                 <span className="text-[9px] font-bold text-[#6B7280] uppercase">Classe</span>
                 <span className="text-sm font-black text-[#00A86B]">{currentDevice.energyClass}</span>
              </div>
              <div className="flex flex-col gap-1">
                 <span className="text-[9px] font-bold text-[#6B7280] uppercase">Standby</span>
                 <span className="text-sm font-black text-[#FF6B35]">{currentDevice.standbyWatts}W</span>
              </div>
           </div>
        </Card>

        {/* Usage Slider Section */}
        <section className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[10px] font-black text-[#6B7280] uppercase tracking-[2px] ml-1">Configurazione Utilizzo</h3>
            <div className="flex items-center gap-1.5 bg-[#E5E7EB] px-2 py-0.5 rounded-full">
               <Clock size={10} className="text-[#1A1A2E]" />
               <span className="text-[9px] font-black text-[#1A1A2E] uppercase tracking-tighter">Media Giornaliera</span>
            </div>
          </div>
          <Card className="p-6 border-[#E5E7EB]">
             <div className="flex justify-between items-end mb-6">
                <div>
                  <span className="text-4xl font-black text-[#1A1A2E]">{hours}</span>
                  <span className="text-sm font-black text-gray-400 ml-1 uppercase">ore / gg</span>
                </div>
                <div className="text-right">
                  <p className="text-[9px] font-black text-[#00A86B] uppercase tracking-widest mb-1">Costo Stimato</p>
                  <p className="text-xl font-black text-[#1A1A2E]">€{costMonthly.toFixed(2)}<span className="text-[10px] text-gray-400 font-bold ml-1">/mese</span></p>
                </div>
             </div>
             <input 
                type="range" min="0" max="24" step="0.5" 
                value={hours} onChange={(e) => setHours(parseFloat(e.target.value))}
                className="w-full h-2 bg-[#F5F7FA] rounded-full appearance-none cursor-pointer accent-[#00A86B]"
             />
             <div className="flex justify-between mt-4">
                <span className="text-[10px] font-black text-gray-400">0h</span>
                <span className="text-[10px] font-black text-[#00A86B] font-black">Consigliato: 1.5h</span>
                <span className="text-[10px] font-black text-gray-400">24h</span>
             </div>
          </Card>
        </section>

        {/* Consumption Breakdown Grid */}
        <section className="mb-6">
           <h3 className="text-[10px] font-black text-[#6B7280] uppercase tracking-[2px] mb-4 ml-1">Dettaglio Consumi</h3>
           <div className="grid grid-cols-2 gap-4">
              <BreakdownItem label="Giornaliero" kwh={kwhDaily} cost={costDaily} />
              <BreakdownItem label="Settimanale" kwh={kwhWeekly} cost={costDaily * 7} />
              <BreakdownItem label="Mensile" kwh={kwhMonthly} cost={costMonthly} />
              <BreakdownItem label="Annuale" kwh={kwhYearly} cost={costMonthly * 12} />
           </div>
        </section>

        {/* Active Toggle */}
        <Card className="mb-8 flex items-center justify-between py-4 border-[#E5E7EB]">
           <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${isActive ? 'bg-[#00A86B] animate-pulse' : 'bg-gray-300'}`}></div>
              <span className="font-extrabold text-[#1A1A2E] text-sm">Stato Dispositivo</span>
           </div>
           <button 
              onClick={() => setIsActive(!isActive)}
              className={`w-14 h-8 rounded-full relative transition-all duration-300 ${isActive ? 'bg-[#00A86B]' : 'bg-gray-300'}`}
           >
              <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all shadow-md ${isActive ? 'left-7' : 'left-1'}`}></div>
           </button>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4 mb-8">
           <Button variant="energy" className="py-5 text-lg" onClick={() => onUpdate({ ...currentDevice, dailyUsageHours: hours, isActive })}>
              Salva Configurazione
           </Button>
           <button 
              onClick={() => onDelete(currentDevice.id)}
              className="w-full py-4 border border-[#FF6B35] text-[#FF6B35] font-black uppercase tracking-widest text-xs rounded-[12px] active:bg-[#FF6B35]/5 transition-all flex items-center justify-center gap-2"
           >
              <Trash2 size={16} />
              Rimuovi Dispositivo
           </button>
        </div>
      </div>
    </div>
  );
};

const BreakdownItem: React.FC<{ label: string; kwh: number; cost: number }> = ({ label, kwh, cost }) => (
  <Card className="p-4 flex flex-col gap-1 border-[#E5E7EB] bg-white">
     <span className="text-[9px] font-black text-[#6B7280] uppercase tracking-widest">{label}</span>
     <p className="text-sm font-black text-[#1A1A2E]">{kwh.toFixed(2)} <span className="text-[9px] text-[#6B7280]">kWh</span></p>
     <p className="text-[11px] font-bold text-[#0077B6]">€{cost.toFixed(2)}</p>
  </Card>
);

export default DeviceDetail;
