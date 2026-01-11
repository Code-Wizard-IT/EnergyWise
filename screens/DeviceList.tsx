
import React from 'react';
import { Screen, Appliance } from '../types';
import { Card, Badge, SafeAreaView } from '../components/EnergyWiseElements';
import { Search, Plus, SlidersHorizontal, ChevronRight, Zap } from 'lucide-react';

const DeviceList: React.FC<{ devices: Appliance[], navigateTo: (s: Screen, p?: any) => void }> = ({ devices, navigateTo }) => (
  <SafeAreaView className="bg-[#F5F7FA]">
    <header className="flex items-center justify-between mb-8 mt-4">
      <h1 className="text-2xl font-[900] text-[#1A1A2E]">I Miei Dispositivi</h1>
      <button 
        onClick={() => navigateTo(Screen.ADD_DEVICE)} 
        className="bg-[#1A1A2E] text-white p-3 rounded-[12px] shadow-lg shadow-[#1A1A2E]/20 active:scale-90 transition-all"
      >
        <Plus size={24} />
      </button>
    </header>

    <div className="flex gap-3 mb-8">
      <div className="flex-1 relative">
        <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280]" />
        <input 
          placeholder="Cerca per marca o modello..." 
          className="w-full bg-white border border-[#E5E7EB] rounded-[12px] py-4 pl-12 pr-4 text-sm font-medium focus:ring-2 focus:ring-[#0077B6] outline-none shadow-sm transition-all"
        />
      </div>
      <button className="bg-white p-4 rounded-[12px] border border-[#E5E7EB] text-[#6B7280] shadow-sm active:scale-95">
        <SlidersHorizontal size={20} />
      </button>
    </div>

    <div className="flex flex-col gap-6 mb-8 overflow-y-visible">
      {['Kitchen', 'Living Room', 'Bedroom', 'Office', 'Laundry'].map((room) => {
        const roomDevices = devices.filter(d => d.room === room);
        if (roomDevices.length === 0) return null;

        return (
          <div key={room}>
            <div className="flex items-center gap-3 mb-4 ml-2">
              <h3 className="text-[10px] font-[900] text-[#6B7280] uppercase tracking-[3px]">{room}</h3>
              <div className="flex-1 h-[1px] bg-[#E5E7EB]"></div>
              <span className="text-[10px] font-black text-[#6B7280]">{roomDevices.length}</span>
            </div>
            <div className="flex flex-col gap-3">
              {roomDevices.map((d) => (
                <Card key={d.id} className="flex items-center gap-4 py-4 px-5 border-[#E5E7EB]" onClick={() => navigateTo(Screen.DEVICE_DETAIL, { device: d })}>
                  <div className={`w-14 h-14 rounded-[12px] flex items-center justify-center transition-all ${
                    d.isActive ? 'bg-[#00A86B]/10 text-[#00A86B] border border-[#00A86B]/20' : 'bg-[#F5F7FA] text-gray-300 border border-[#E5E7EB]'
                  }`}>
                    <Zap size={24} fill={d.isActive ? '#00A86B' : 'none'} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-extrabold text-sm text-[#1A1A2E]">{d.customName || d.model}</h4>
                    <p className="text-[10px] text-[#6B7280] font-black uppercase tracking-widest">{d.brand} • {d.powerWatts}W</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <Badge bgColor={d.energyClass.includes('A') ? '#00A86B' : d.energyClass.includes('B') ? '#FFB800' : '#FF6B35'}>
                      {d.energyClass}
                    </Badge>
                    <span className="text-[9px] font-black text-[#6B7280] uppercase">{d.dailyUsageHours}h/gg</span>
                  </div>
                  <ChevronRight size={18} className="text-[#E5E7EB]" />
                </Card>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  </SafeAreaView>
);

export default DeviceList;
