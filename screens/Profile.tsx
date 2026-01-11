
import React from 'react';
import { Screen } from '../types';
import { Camera, Settings, Bell, Shield, CreditCard, HelpCircle, LogOut, ChevronRight } from 'lucide-react';
import { Button } from '../components/WireframeElements';

const Profile: React.FC<{ navigateTo: (s: Screen) => void }> = ({ navigateTo }) => (
  <div className="flex flex-col animate-in fade-in duration-300 p-8">
    <div className="flex flex-col items-center mb-10 mt-4">
      <div className="relative mb-6">
        <div className="w-32 h-32 bg-gray-100 rounded-full border-4 border-white shadow-xl overflow-hidden flex items-center justify-center">
          <span className="text-4xl text-gray-300">👤</span>
        </div>
        <button className="absolute bottom-1 right-1 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center border-4 border-white">
          <Camera size={18} />
        </button>
      </div>
      <h2 className="text-2xl font-bold mb-1">Mario Rossi</h2>
      <p className="text-gray-400 text-sm">mario.rossi@email.it</p>
      <div className="mt-4 flex gap-4">
        <div className="bg-gray-50 px-4 py-2 rounded-2xl border border-gray-100 flex flex-col items-center">
          <span className="text-sm font-bold">12</span>
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Prenotazioni</span>
        </div>
        <div className="bg-gray-50 px-4 py-2 rounded-2xl border border-gray-100 flex flex-col items-center">
          <span className="text-sm font-bold">4.9</span>
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Rating</span>
        </div>
      </div>
    </div>

    <div className="flex flex-col gap-2">
      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-2">Account</h3>
      <ProfileOption icon={<User size={20} />} label="Dati Personali" />
      <ProfileOption icon={<CreditCard size={20} />} label="Metodi di Pagamento" />
      <ProfileOption icon={<Bell size={20} />} label="Notifiche" />
      
      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-6 mb-2 ml-2">App</h3>
      <ProfileOption icon={<Settings size={20} />} label="Impostazioni" />
      <ProfileOption icon={<Shield size={20} />} label="Privacy & Sicurezza" />
      <ProfileOption icon={<HelpCircle size={20} />} label="Aiuto & Supporto" />
    </div>

    <div className="mt-12">
      <Button variant="secondary" className="flex items-center justify-center gap-3 text-red-500 bg-red-50 hover:bg-red-100 border-none" onClick={() => navigateTo(Screen.LOGIN)}>
        <LogOut size={20} />
        Logout
      </Button>
      <p className="text-center text-[10px] text-gray-300 mt-6 font-medium">Service Hub App Version 1.0.2 (Build 42)</p>
    </div>
  </div>
);

const User: React.FC<{ size: number }> = ({ size }) => <span style={{ fontSize: size }}>👤</span>;

const ProfileOption: React.FC<{ icon: React.ReactNode; label: string }> = ({ icon, label }) => (
  <button className="flex items-center gap-4 w-full p-4 rounded-2xl hover:bg-gray-50 transition-colors group">
    <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-white group-hover:text-black transition-colors border border-gray-100">
      {icon}
    </div>
    <span className="flex-1 text-left font-semibold text-gray-700">{label}</span>
    <ChevronRight size={18} className="text-gray-300" />
  </button>
);

export default Profile;
