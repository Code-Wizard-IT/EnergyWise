
import React, { useState } from 'react';
import { Camera, ArrowLeft, Zap, CheckCircle2, Loader2, Edit3, Euro, ShieldCheck } from 'lucide-react';
import { Button, SafeAreaView, Card } from '../components/EnergyWiseElements';

const BillScanner: React.FC<{ onComplete: () => void, onBack: () => void }> = ({ onComplete, onBack }) => {
  const [status, setStatus] = useState<'camera' | 'processing' | 'review' | 'success'>('camera');
  const [billData, setBillData] = useState({
    kwhPrice: 0.245,
    networkCosts: 12.40,
    systemCharges: 8.50,
    taxes: 4.20,
    vat: 10,
    total: 84.20
  });

  const handleCapture = () => {
    setStatus('processing');
    setTimeout(() => setStatus('review'), 3500);
  };

  const handleConfirm = () => {
    setStatus('success');
  };

  if (status === 'camera') {
    return (
      <div className="h-full bg-black relative flex flex-col">
        {/* Simulated Camera Feed */}
        <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
          <div className="w-[85%] aspect-[3/4] border-2 border-dashed border-white/40 rounded-3xl flex items-center justify-center relative overflow-hidden">
             <div className="absolute inset-0 bg-white/5 animate-pulse"></div>
             <div className="w-full h-[1px] bg-[#00A86B]/50 absolute top-1/4 animate-scan"></div>
             <span className="text-white/20 font-black rotate-12 text-3xl text-center px-8 uppercase tracking-tighter">Bolletta<br/>Elettrica</span>
          </div>
        </div>

        {/* Viewfinder Overlays */}
        <div className="absolute inset-0 flex items-center justify-center p-8 pointer-events-none">
          <div className="w-full aspect-[3/4] relative">
            <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-[#00A86B] rounded-tl-3xl"></div>
            <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-[#00A86B] rounded-tr-3xl"></div>
            <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-[#00A86B] rounded-bl-3xl"></div>
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-[#00A86B] rounded-br-3xl"></div>
          </div>
        </div>

        {/* Top Controls */}
        <div className="absolute top-16 left-8 right-8 flex items-center justify-between">
          <button onClick={onBack} className="w-12 h-12 bg-black/50 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-white/10">
            <ArrowLeft size={24} />
          </button>
          <div className="bg-[#00A86B] px-4 py-2 rounded-full shadow-lg shadow-[#00A86B]/30 flex items-center gap-2">
            <Zap size={14} className="text-white fill-white" />
            <span className="text-[10px] font-black uppercase text-white tracking-widest">Scanner AI</span>
          </div>
          <div className="w-12"></div>
        </div>

        {/* Bottom Shutter */}
        <div className="absolute bottom-16 left-0 right-0 flex flex-col items-center gap-6">
          <p className="text-white/60 text-[10px] font-black uppercase tracking-[3px]">Inquadra il dettaglio costi</p>
          <button 
            onClick={handleCapture}
            className="w-20 h-20 bg-white rounded-full border-[6px] border-[#1A1A2E] flex items-center justify-center active:scale-90 transition-all shadow-2xl"
          >
            <div className="w-14 h-14 bg-white border-2 border-gray-100 rounded-full"></div>
          </button>
        </div>

        <style>{`
          @keyframes scan {
            0% { top: 10%; }
            100% { top: 90%; }
          }
          .animate-scan { animation: scan 3s infinite alternate ease-in-out; }
        `}</style>
      </div>
    );
  }

  if (status === 'processing') {
    return (
      <div className="h-full bg-[#1A1A2E] flex flex-col items-center justify-center p-8 text-center">
        <div className="relative mb-12">
          <div className="w-32 h-32 bg-[#00A86B]/10 rounded-[40px] flex items-center justify-center relative z-10 border border-[#00A86B]/20">
            <Loader2 size={48} className="text-[#00A86B] animate-spin" />
          </div>
          <div className="absolute -inset-4 bg-[#00A86B]/5 rounded-[50px] animate-pulse"></div>
        </div>
        
        <h2 className="text-2xl font-black text-white mb-2">Analisi OCR in corso</h2>
        <p className="text-gray-500 text-sm font-medium leading-relaxed max-w-[250px]">
          L'intelligenza artificiale sta estraendo le tariffe e i costi accessori dalla tua bolletta...
        </p>

        <div className="mt-12 w-full max-w-[200px] h-1.5 bg-white/5 rounded-full overflow-hidden">
           <div className="h-full bg-[#00A86B] w-0 animate-progress"></div>
        </div>

        <style>{`
          @keyframes progress {
            0% { width: 0%; }
            100% { width: 100%; }
          }
          .animate-progress { animation: progress 3.5s ease-in-out forwards; }
        `}</style>
      </div>
    );
  }

  if (status === 'review') {
    return (
      <SafeAreaView className="bg-[#F5F7FA]">
        <div className="flex items-center gap-4 mb-8 mt-4">
          <button onClick={() => setStatus('camera')} className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-[#1A1A2E] border border-[#E5E7EB]">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-2xl font-black text-[#1A1A2E]">Revisione Dati</h1>
        </div>

        <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-6 ml-2">Dati Estratti Automaticamente</p>
        
        <div className="flex flex-col gap-4 mb-8 overflow-y-auto max-h-[60vh] pr-1 no-scrollbar">
           <ReviewField label="Prezzo Energia (€/kWh)" value={billData.kwhPrice.toString()} />
           <ReviewField label="Costi di Rete (€)" value={billData.networkCosts.toString()} />
           <ReviewField label="Oneri di Sistema (€)" value={billData.systemCharges.toString()} />
           <ReviewField label="Imposte e Accise (€)" value={billData.taxes.toString()} />
           <ReviewField label="IVA (%)" value={billData.vat.toString()} />
           <div className="mt-2 pt-4 border-t border-[#E5E7EB]">
              <ReviewField label="Totale Fatturato (€)" value={billData.total.toString()} highlight />
           </div>
        </div>

        <div className="mt-auto flex flex-col gap-4">
           <div className="bg-[#E8F5E9] p-4 rounded-xl border border-[#00A86B]/10 flex items-center gap-3">
              <ShieldCheck size={20} className="text-[#00A86B]" />
              <p className="text-[10px] text-gray-600 font-bold uppercase tracking-tight">Verifica i dati con la tua bolletta cartacea</p>
           </div>
           <Button variant="energy" onClick={handleConfirm} className="py-5 text-lg">Conferma & Aggiorna</Button>
        </div>
      </SafeAreaView>
    );
  }

  return (
    <div className="h-full bg-[#00A86B] flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500">
      <div className="w-24 h-24 bg-white rounded-[32px] flex items-center justify-center mb-8 shadow-2xl shadow-black/10">
        <CheckCircle2 size={56} className="text-[#00A86B]" />
      </div>
      
      <h2 className="text-3xl font-black text-white mb-2">Ottimo Lavoro!</h2>
      <p className="text-white/80 text-lg font-medium leading-relaxed mb-12">
        I tuoi costi energetici sono stati aggiornati con i dati reali del fornitore.
      </p>

      <Card className="bg-white/10 border-white/20 p-6 mb-12 w-full backdrop-blur-md">
         <div className="flex justify-between items-center mb-4">
            <span className="text-[10px] font-black text-white/60 uppercase tracking-widest">Nuova Tariffa</span>
            <span className="text-xl font-black text-white">€0.245 /kWh</span>
         </div>
         <div className="flex justify-between items-center">
            <span className="text-[10px] font-black text-white/60 uppercase tracking-widest">Risparmio Stimato</span>
            <span className="text-xl font-black text-[#FFB800]">€12.40 /mese</span>
         </div>
      </Card>

      <Button variant="secondary" onClick={onComplete} className="py-5 text-[#00A86B] text-lg bg-white">Vai alla Dashboard</Button>
    </div>
  );
};

const ReviewField: React.FC<{ label: string; value: string; highlight?: boolean }> = ({ label, value, highlight }) => (
  <div className={`bg-white p-5 rounded-2xl border ${highlight ? 'border-[#00A86B] shadow-sm' : 'border-[#E5E7EB]'} flex items-center justify-between`}>
     <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</span>
     <div className="flex items-center gap-3">
        <span className={`text-lg font-black ${highlight ? 'text-[#00A86B]' : 'text-[#1A1A2E]'}`}>{value}</span>
        <Edit3 size={16} className="text-gray-300" />
     </div>
  </div>
);

export default BillScanner;
