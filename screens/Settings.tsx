import React from 'react';
import { Screen } from '../types';
import { Card, Button, Badge, SafeAreaView } from '../components/EnergyWiseElements';
import { User, Shield, Bell, CreditCard, HelpCircle, LogOut, ChevronRight, Crown, Moon, Home as HomeIcon, Download, Info } from 'lucide-react';

const Settings: React.FC<{ navigateTo: (s: Screen) => void }> = ({ navigateTo }) => (
  <SafeAreaView className="bg-[#F5F7FA]">
    {/* Profile Header - NO TITLE, moved up */}
    <div className="flex flex-col items-center mb-8 mt-2 animate-in zoom-in-95 duration-500">
      <div className="relative mb-4">
        <div className="w-28 h-28 bg-[#1A1A2E] rounded-[40px] border-[5px] border-white shadow-2xl flex items-center justify-center overflow-hidden">
          <span className="text-5xl">👨‍💻</span>
        </div>
        <div className="absolute -bottom-1 -right-1 bg-[#FFB800] text-[#1A1A2E] px-4 py-1.5 rounded-full text-[9px] font-black uppercase border-[3px] border-white shadow-xl">
           PREMIUM
        </div>
      </div>
      <h2 className="text-xl font-black text-[#1A1A2E] mb-0.5">Marco Bianchi</h2>
      <p className="text-[#6B7280] text-[9px] font-black uppercase tracking-[2px]">marco.bianchi@email.it</p>
      
      <div className="mt-4">
        <button className="bg-[#1A1A2E] text-white px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest active:scale-95 transition-all shadow-lg shadow-[#1A1A2E]/20">
          Modifica Profilo
        </button>
      </div>
    </div>

    <div className="flex flex-col gap-6 overflow-y-auto no-scrollbar pb-24">
      {/* Premium Banner */}
      <Card className="bg-[#1A1A2E] text-white border-none p-5 flex items-center justify-between shadow-2xl shadow-[#1A1A2E]/30" elevated>
         <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#FFB800] rounded-xl flex items-center justify-center text-[#1A1A2E] shadow-lg shadow-[#FFB800]/20">
               <Crown size={24} />
            </div>
            <div>
               <h4 className="font-black text-sm mb-0.5">EnergyWise Premium</h4>
               <p className="text-[8px] text-[#6B7280] font-black uppercase tracking-widest">Piano Annuale Attivo</p>
            </div>
         </div>
         <div className="flex flex-col items-end">
            <span className="text-[9px] font-black text-[#00A86B] uppercase tracking-tighter mb-1">Attivo</span>
            <ChevronRight size={18} className="text-[#6B7280]" />
         </div>
      </Card>

      {/* Account Section - INCREASED HEIGHT */}
      <section className="flex flex-col gap-2">
        <h3 className="text-[9px] font-black text-gray-400 uppercase tracking-[3px] mb-1 ml-2">La Mia Casa</h3>
        <SettingOption icon={<HomeIcon size={18} />} label="Gestione Casa" count="Appartamento Milano" />
        <SettingOption icon={<LayoutGridIcon size={18} />} label="Gestione Stanze" count="5 Stanze" />
        <SettingOption icon={<CreditCard size={18} />} label="Metodi di Pagamento" count="Visa •••• 4242" />
      </section>

      {/* Preferences Section - INCREASED HEIGHT */}
      <section className="flex flex-col gap-2">
        <h3 className="text-[9px] font-black text-gray-400 uppercase tracking-[3px] mb-1 ml-2">Preferenze</h3>
        <SettingOption icon={<Bell size={18} />} label="Notifiche e Avvisi" count="Attive" />
        <SettingOption icon={<Moon size={18} />} label="Tema e Unità" count="Sistema (kWh)" />
        <SettingOption icon={<Shield size={18} />} label="Privacy e Sicurezza" />
        <SettingOption icon={<Download size={18} />} label="Esporta Dati" count="PDF / CSV" />
      </section>

      {/* Support Section - INCREASED HEIGHT */}
      <section className="flex flex-col gap-2">
        <h3 className="text-[9px] font-black text-gray-400 uppercase tracking-[3px] mb-1 ml-2">Informazioni</h3>
        <SettingOption icon={<HelpCircle size={18} />} label="Assistenza e Supporto" />
        <SettingOption icon={<Info size={18} />} label="Termini e Privacy" />
      </section>

      <div className="mt-2 flex flex-col gap-6">
        <button 
          onClick={() => navigateTo(Screen.LOGIN)}
          className="w-full py-4 rounded-[16px] flex items-center justify-center gap-3 bg-[#FF6B35]/5 text-[#FF6B35] font-black uppercase tracking-widest text-xs border border-[#FF6B35]/15 hover:bg-[#FF6B35]/10 active:scale-95 transition-all"
        >
          <LogOut size={18} />
          Esci dall'Account
        </button>
        
        <div className="flex flex-col items-center gap-1">
           <p className="text-[9px] text-[#E5E7EB] font-black uppercase tracking-[4px]">EnergyWise</p>
           <p className="text-[7px] text-[#E5E7EB] font-bold uppercase tracking-[1px]">Versione 2.4.0 • Canale Rilascio</p>
        </div>
      </div>
    </div>
  </SafeAreaView>
);

const LayoutGridIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
  </svg>
);

// INCREASED HEIGHT for menu items
const SettingOption: React.FC<{ icon: React.ReactNode; label: string; count?: string }> = ({ icon, label, count }) => (
  <button className="flex items-center gap-3 w-full p-4 rounded-[20px] bg-white border border-[#E5E7EB] hover:border-[#0077B6] transition-all group active:scale-[0.98] shadow-sm min-h-[72px]">
    <div className="w-11 h-11 bg-[#F5F7FA] rounded-[12px] flex items-center justify-center text-[#1A1A2E] group-hover:bg-[#1A1A2E] group-hover:text-white transition-all duration-300">
      {icon}
    </div>
    <div className="flex-1 text-left">
       <span className="block font-black text-[#1A1A2E] text-[13px] leading-tight mb-0.5">{label}</span>
       {count && <span className="text-[9px] text-[#6B7280] font-black uppercase tracking-tight">{count}</span>}
    </div>
    <ChevronRight size={16} className="text-[#E5E7EB] group-hover:text-[#1A1A2E]" />
  </button>
);

export default Settings;
