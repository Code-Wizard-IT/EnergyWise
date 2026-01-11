
import React, { useState } from 'react';
import { Button, Input, SafeAreaView } from '../components/EnergyWiseElements';
import { ArrowLeft, Mail } from 'lucide-react';

const ForgotPassword: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [sent, setSent] = useState(false);

  return (
    <SafeAreaView className="bg-[#1A1A2E] text-white">
      <button onClick={onBack} className="mt-4 mb-12 flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
        <ArrowLeft size={20} />
        <span className="text-sm font-bold uppercase tracking-widest">Login</span>
      </button>

      {!sent ? (
        <div className="animate-in fade-in slide-in-from-bottom duration-500">
          <h1 className="text-3xl font-black mb-4">Recupera Password</h1>
          <p className="text-gray-400 mb-10 leading-relaxed">Inserisci la tua email e ti invieremo un link sicuro per reimpostare la tua password.</p>
          
          <div className="flex flex-col gap-8">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Indirizzo Email</label>
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="mario.rossi@email.it"
                  className="w-full bg-white/5 border border-white/10 rounded-[12px] px-6 py-4 text-white focus:outline-none focus:border-[#00A86B] transition-all"
                />
              </div>
            </div>
            
            <Button variant="energy" onClick={() => setSent(true)} className="py-5 text-lg">Invia link di recupero</Button>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 animate-in zoom-in-95 duration-500">
          <div className="w-20 h-20 bg-[#00A86B]/20 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg shadow-[#00A86B]/10">
            <Mail size={40} className="text-[#00A86B]" />
          </div>
          <h2 className="text-2xl font-black mb-4">Email Inviata!</h2>
          <p className="text-gray-400 mb-10 leading-relaxed px-4">Abbiamo inviato le istruzioni alla tua email. Controlla anche la cartella spam se non la trovi.</p>
          <Button variant="outline" className="text-white border-white/10 hover:bg-white/5" onClick={() => setSent(false)}>Invia di nuovo</Button>
        </div>
      )}
    </SafeAreaView>
  );
};

export default ForgotPassword;
