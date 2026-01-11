import React, { useState } from 'react';
import { Screen, Appliance } from '../types';
import { Card, Button, Badge, SafeAreaView } from '../components/EnergyWiseElements';
import { ArrowLeft, Search, Camera, Zap, PlusCircle, CheckCircle2, ChevronRight, Sliders } from 'lucide-react';

const AddDevice: React.FC<{ onAdd: (a: Appliance) => void, onBack: () => void }> = ({ onAdd, onBack }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [search, setSearch] = useState('');
  const [selectedModel, setSelectedModel] = useState<any>(null);
  const [usageHours, setUsageHours] = useState(2);
  const [room, setRoom] = useState('Cucina');

  const SUGGESTED = [
    { brand: 'Samsung', model: 'RF28', category: 'Cucina', watts: 350, class: 'A++' },
    { brand: 'LG', model: 'ThinQ Smart', category: 'Lavanderia', watts: 2100, class: 'A' },
    { brand: 'Dyson', model: 'Pure Cool', category: 'Climatizzazione', watts: 40, class: 'A+' },
    { brand: 'Sony', model: 'Bravia XR', category: 'Elettronica', watts: 180, class: 'B' },
  ];

  const ROOMS = ['Cucina', 'Soggiorno', 'Camera', 'Ufficio', 'Lavanderia', 'Bagno'];

  // Map Italian room names back to English for storage
  const roomMapping: { [key: string]: string } = {
    'Cucina': 'Kitchen',
    'Soggiorno': 'Living Room',
    'Camera': 'Bedroom',
    'Ufficio': 'Office',
    'Lavanderia': 'Laundry',
    'Bagno': 'Bathroom'
  };

  const handleSelectModel = (model: any) => {
    setSelectedModel(model);
    setStep(3);
  };

  const handleFinalize = () => {
    const newDevice: Appliance = {
      id: Math.random().toString(36).substr(2, 9),
      brand: selectedModel.brand,
      model: selectedModel.model,
      category: selectedModel.category as any,
      powerWatts: selectedModel.watts,
      standbyWatts: 2,
      energyClass: selectedModel.class,
      customName: `${selectedModel.brand} ${selectedModel.category}`,
      room: roomMapping[room] || room,
      dailyUsageHours: usageHours,
      isActive: true
    };
    onAdd(newDevice);
  };

  return (
    <SafeAreaView className="bg-[#F5F7FA]">
      <div className="flex items-center gap-4 mb-8 mt-4">
        <button onClick={() => step === 1 ? onBack() : setStep((step - 1) as any)} className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-[#1A1A2E] border border-[#E5E7EB]">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-black text-[#1A1A2E]">Aggiungi Dispositivo</h1>
      </div>

      {step === 1 && (
        <div className="animate-in slide-in-from-right duration-300">
          <div className="relative mb-6">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Cerca marca o modello..." 
              className="w-full bg-white border border-[#E5E7EB] rounded-2xl py-5 pl-12 pr-4 text-sm font-bold shadow-sm focus:ring-2 focus:ring-[#0077B6] transition-all outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <button className="bg-[#1A1A2E] text-white p-6 rounded-3xl flex flex-col items-center gap-4 active:scale-95 transition-all shadow-lg">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center"><Camera size={24} /></div>
              <span className="text-[10px] font-black uppercase tracking-widest leading-tight">Scansiona<br/>Codice</span>
            </button>
            <button onClick={() => setStep(2)} className="bg-white text-[#1A1A2E] p-6 rounded-3xl flex flex-col items-center gap-4 border border-[#E5E7EB] shadow-sm active:scale-95 transition-all">
              <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center"><PlusCircle size={24} /></div>
              <span className="text-[10px] font-black uppercase tracking-widest leading-tight">Cerca nel<br/>Database</span>
            </button>
          </div>

          <section>
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[2px] mb-4 ml-2">Popolari / Suggeriti</h3>
            <div className="flex flex-col gap-3">
              {SUGGESTED.map((item, i) => (
                <Card key={i} className="flex items-center justify-between py-4" onClick={() => handleSelectModel(item)}>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#F0F7F4] rounded-2xl flex items-center justify-center text-[#1A1A2E] border border-[#E5E7EB]">
                      <Zap size={20} className="text-[#FFB800]" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-sm">{item.brand} {item.model}</h4>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{item.category} • {item.watts}W</p>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-gray-300" />
                </Card>
              ))}
            </div>
          </section>
        </div>
      )}

      {step === 2 && (
        <div className="animate-in slide-in-from-right duration-300">
          <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[2px] mb-4 ml-2">Risultati della ricerca</h3>
          <div className="flex flex-col gap-3">
            {SUGGESTED.map((item, i) => (
              <Card key={i} className="flex items-center gap-4 py-4" onClick={() => handleSelectModel(item)}>
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center border border-[#E5E7EB] font-black text-xs text-gray-300 uppercase">Logo</div>
                <div className="flex-1">
                  <h4 className="font-extrabold text-sm">{item.brand}</h4>
                  <p className="text-xs font-bold text-gray-500">{item.model}</p>
                  <div className="flex gap-2 mt-1">
                    <Badge bgColor="#1A1A2E">{item.category}</Badge>
                    <Badge bgColor="#00A86B">{item.watts}W</Badge>
                  </div>
                </div>
                <ChevronRight size={18} className="text-gray-300" />
              </Card>
            ))}
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="animate-in slide-in-from-bottom duration-500">
          <Card className="bg-[#1A1A2E] text-white p-6 mb-8 border-none" elevated>
            <div className="flex items-center gap-4 mb-4">
               <div className="w-16 h-16 bg-[#00A86B] rounded-2xl flex items-center justify-center"><Zap size={32} /></div>
               <div>
                  <h3 className="text-xl font-black">{selectedModel.brand}</h3>
                  <p className="text-gray-400 text-sm font-bold">{selectedModel.model}</p>
               </div>
            </div>
            <div className="flex gap-4 border-t border-white/5 pt-4 mt-4">
               <div className="flex-1">
                  <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">Classe Energetica</p>
                  <p className="text-lg font-black text-[#00A86B]">{selectedModel.class}</p>
               </div>
               <div className="flex-1">
                  <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">Potenza Nominale</p>
                  <p className="text-lg font-black text-[#FFB800]">{selectedModel.watts}W</p>
               </div>
            </div>
          </Card>

          <section className="flex flex-col gap-8">
            <div className="space-y-4">
              <div className="flex justify-between items-end mb-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[2px] ml-1">Ore di utilizzo / Giorno</label>
                <span className="text-2xl font-black text-[#1A1A2E]">{usageHours}h</span>
              </div>
              <input 
                type="range" min="0" max="24" step="0.5" 
                value={usageHours} onChange={(e) => setUsageHours(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-[#00A86B]"
              />
            </div>

            <div className="space-y-4">
               <label className="text-[10px] font-black text-gray-400 uppercase tracking-[2px] ml-1">Assegna a una stanza</label>
               <div className="flex flex-wrap gap-2">
                  {ROOMS.map(r => (
                    <button 
                      key={r}
                      onClick={() => setRoom(r)}
                      className={`px-5 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                        room === r ? 'bg-[#0077B6] text-white shadow-lg shadow-[#0077B6]/20' : 'bg-white text-[#6B7280] border border-[#E5E7EB]'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
               </div>
            </div>

            <div className="pt-4">
              <Button variant="energy" onClick={handleFinalize} className="py-5 text-lg">Salva Dispositivo</Button>
            </div>
          </section>
        </div>
      )}
    </SafeAreaView>
  );
};

export default AddDevice;
