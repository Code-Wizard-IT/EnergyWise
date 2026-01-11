import React, { useState } from 'react';
import { Button } from '../components/EnergyWiseElements';
import { Zap, ArrowLeft, Mail, CheckCircle } from 'lucide-react';

const ForgotPassword: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    if (email) {
      setSent(true);
    }
  };

  if (sent) {
    return (
      <div className="h-full bg-[#1A1A2E] flex flex-col items-center justify-center p-8">
        <div className="w-20 h-20 bg-[#00A86B] rounded-full flex items-center justify-center mb-6">
          <CheckCircle size={40} className="text-white" />
        </div>
        <h1 className="text-2xl font-black text-white mb-3 text-center">Email Inviata!</h1>
        <p className="text-[#6B7280] text-sm text-center mb-8 max-w-[280px] leading-relaxed">
          Abbiamo inviato un link per reimpostare la password a <span className="text-white font-bold">{email}</span>
        </p>
        <p className="text-[#6B7280] text-xs text-center mb-8">
          Non hai ricevuto l'email? Controlla la cartella spam o riprova tra qualche minuto.
        </p>
        <Button variant="energy" onClick={onBack} className="w-full py-4">
          Torna al Login
        </Button>
      </div>
    );
  }

  return (
    <div className="h-full bg-[#1A1A2E] flex flex-col p-8 pt-[60px]">
      {/* Header */}
      <button 
        onClick={onBack}
        className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-white mb-8"
      >
        <ArrowLeft size={24} />
      </button>

      {/* Icon */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-20 h-20 bg-[#0077B6]/20 rounded-full flex items-center justify-center mb-6">
          <Mail size={36} className="text-[#0077B6]" />
        </div>
        <h1 className="text-2xl font-black text-white mb-2">Password Dimenticata?</h1>
        <p className="text-[#6B7280] text-sm text-center max-w-[280px] leading-relaxed">
          Inserisci l'email associata al tuo account e ti invieremo un link per reimpostare la password.
        </p>
      </div>

      {/* Form */}
      <div className="flex flex-col gap-6 mb-8">
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-black text-[#6B7280] uppercase tracking-widest ml-1">
            Email
          </label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="mario.rossi@email.it" 
            className="bg-white/5 border border-white/10 rounded-[12px] px-6 py-4 text-white placeholder-white/20 focus:outline-none focus:border-[#00A86B] transition-all"
          />
        </div>
      </div>

      {/* Submit Button */}
      <Button 
        variant="energy" 
        onClick={handleSubmit} 
        className="py-5 text-lg mb-6"
      >
        Invia Link di Reset
      </Button>

      {/* Back to Login */}
      <button 
        onClick={onBack}
        className="text-[#6B7280] text-sm font-bold text-center"
      >
        Ricordi la password? <span className="text-[#00A86B] font-black">Accedi</span>
      </button>
    </div>
  );
};

export default ForgotPassword;
