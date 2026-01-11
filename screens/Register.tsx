
import React from 'react';
import { Button } from '../components/EnergyWiseElements';
import { Zap } from 'lucide-react';

const Register: React.FC<{ onRegister: () => void, onLogin: () => void }> = ({ onRegister, onLogin }) => (
  <div className="h-full bg-[#1A1A2E] flex flex-col p-8 animate-in fade-in duration-500">
    <div className="mt-12 mb-12 flex flex-col items-center">
      <div className="w-16 h-16 bg-[#FFB800] rounded-2xl flex items-center justify-center shadow-lg mb-4">
        <Zap size={32} className="text-[#1A1A2E] fill-[#1A1A2E]" />
      </div>
      <h1 className="text-3xl font-black text-white">Unisciti a noi!</h1>
      <p className="text-[#0077B6] font-bold text-xs uppercase tracking-[3px] mt-1">Crea il tuo account gratuito</p>
    </div>
    
    <div className="flex flex-col gap-4 mb-8">
      {[
        { label: 'Nome Completo', type: 'text', placeholder: 'Marco Bianchi' },
        { label: 'Email', type: 'email', placeholder: 'marco@email.it' },
        { label: 'Password', type: 'password', placeholder: '••••••••' }
      ].map((field, i) => (
        <div key={i} className="flex flex-col gap-2">
           <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">{field.label}</label>
           <input 
              type={field.type} placeholder={field.placeholder} 
              className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-white/20 focus:outline-none focus:border-[#FFB800]"
           />
        </div>
      ))}
    </div>

    <div className="flex items-start gap-3 mb-8">
       <input type="checkbox" className="mt-1 rounded-md bg-white/10 border-none" />
       <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider leading-relaxed">
          Accetto i <span className="text-white underline">Termini di Servizio</span> e la <span className="text-white underline">Privacy Policy</span> energetica.
       </p>
    </div>

    <Button variant="energy" onClick={onRegister} className="mb-6 bg-[#FFB800] text-[#1A1A2E] hover:bg-[#E0A200]">Crea Account</Button>

    <p className="text-center text-sm text-gray-500 font-medium">
      Hai già un account? <button onClick={onLogin} className="text-[#FFB800] font-black uppercase tracking-widest ml-1">Accedi</button>
    </p>
  </div>
);

export default Register;
