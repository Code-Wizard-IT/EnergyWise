
import React, { useState } from 'react';
import { Button } from '../components/EnergyWiseElements';
import { Zap, BarChart, Receipt } from 'lucide-react';

const SLIDES = [
  {
    icon: <Zap size={100} className="text-[#FFB800]" />,
    title: "Conosci i tuoi consumi",
    subtitle: "Scopri quanto consuma ogni elettrodomestico della tua casa."
  },
  {
    icon: <BarChart size={100} className="text-[#00A86B]" />,
    title: "Semplice e veloce",
    subtitle: "Database di migliaia di elettrodomestici già pronti per il tracking."
  },
  {
    icon: <Receipt size={100} className="text-[#0077B6]" />,
    title: "Risparmia in bolletta",
    subtitle: "Scansiona la bolletta per calcoli precisi e suggerimenti mirati."
  }
];

const Onboarding: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
  const [step, setStep] = useState(0);

  return (
    <div className="h-full energy-gradient flex flex-col p-8 pt-[80px]">
      <div className="flex-1 flex flex-col items-center text-center">
        <div className="mb-16 transform transition-all duration-500 scale-110 drop-shadow-[0_0_40px_rgba(255,184,0,0.25)]">
          {SLIDES[step].icon}
        </div>
        <h2 className="text-3xl font-[900] text-white mb-4 leading-tight">
          {SLIDES[step].title}
        </h2>
        <p className="text-white/60 text-lg font-medium leading-relaxed max-w-[280px]">
          {SLIDES[step].subtitle}
        </p>
      </div>
      
      <div className="flex flex-col gap-6 mb-12">
        <div className="flex justify-center gap-2">
          {SLIDES.map((_, i) => (
            <div 
              key={i} 
              className={`h-2 rounded-full transition-all duration-300 ${
                i === step ? 'w-10 bg-[#00A86B]' : 'w-2 bg-white/20'
              }`}
            ></div>
          ))}
        </div>
        
        <Button 
          variant="energy" 
          onClick={() => step === 2 ? onFinish() : setStep(step + 1)}
          className="text-lg py-5"
        >
          {step === 2 ? "Inizia ora" : "Avanti"}
        </Button>
        
        {step < 2 && (
          <button 
            onClick={onFinish} 
            className="text-white/40 font-black uppercase tracking-widest text-xs py-2 hover:text-white transition-colors"
          >
            Salta Intro
          </button>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
