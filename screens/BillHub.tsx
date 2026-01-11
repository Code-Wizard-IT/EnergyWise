import React from 'react';
import { Screen } from '../types';
import { Card, Button, Badge, SafeAreaView } from '../components/EnergyWiseElements';
import { FileText, ChevronRight, Camera, SlidersHorizontal, ArrowUpRight, TrendingDown } from 'lucide-react';

const BillHub: React.FC<{ navigateTo: (s: Screen) => void }> = ({ navigateTo }) => {
  // Dati per il grafico a colonne
  const monthlyData = [
    { month: 'Set', cost: 95, kwh: 310 },
    { month: 'Ott', cost: 88, kwh: 290 },
    { month: 'Nov', cost: 102, kwh: 340 },
    { month: 'Dic', cost: 118, kwh: 380 },
    { month: 'Gen', cost: 106, kwh: 345 },
    { month: 'Feb', cost: 92, kwh: 310 },
  ];
  
  const maxCost = Math.max(...monthlyData.map(d => d.cost));

  return (
    <SafeAreaView className="bg-[#F5F7FA]">
      <h1 className="text-2xl font-[900] text-[#1A1A2E] mb-6 mt-4">Bollette e Costi</h1>

      {/* Bar Chart Card - ENLARGED */}
      <Card className="p-0 border-none overflow-hidden mb-6" elevated>
        <div className="p-5 border-b border-gray-50 flex justify-between items-center bg-white">
          <h3 className="text-sm font-black text-[#1A1A2E] uppercase tracking-wide">Storico Costi</h3>
          <div className="flex items-center gap-1 bg-[#E8F5E9] px-3 py-1.5 rounded-full">
            <TrendingDown size={14} className="text-[#00A86B]" />
            <span className="text-[10px] font-black text-[#00A86B] uppercase">-13%</span>
          </div>
        </div>
        
        <div className="bg-white p-6">
          {/* Bar Chart - LARGER */}
          <div className="flex items-end justify-between gap-4 h-40 mb-5">
            {monthlyData.map((item, i) => {
              const heightPercent = (item.cost / maxCost) * 100;
              const isLast = i === monthlyData.length - 1;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-[11px] font-black text-[#1A1A2E]">€{item.cost}</span>
                  <div 
                    className={`w-full rounded-t-lg transition-all duration-500 ${isLast ? 'bg-[#00A86B]' : 'bg-[#E5E7EB]'}`}
                    style={{ height: `${heightPercent}%`, minHeight: '20px' }}
                  />
                  <span className="text-[10px] font-black text-[#6B7280] uppercase">{item.month}</span>
                </div>
              );
            })}
          </div>
          
          {/* Summary Row */}
          <div className="flex items-center justify-between pt-5 border-t border-[#F5F7FA]">
            <div>
              <span className="text-[9px] font-black text-[#6B7280] uppercase tracking-widest block mb-1">Media 6 Mesi</span>
              <span className="text-xl font-black text-[#1A1A2E]">€100.17</span>
            </div>
            <div className="text-right">
              <span className="text-[9px] font-black text-[#6B7280] uppercase tracking-widest block mb-1">Totale Periodo</span>
              <span className="text-xl font-black text-[#0077B6]">€601.00</span>
            </div>
          </div>
        </div>
      </Card>

      {/* CTA Card */}
      <Card className="bg-[#00A86B] text-white border-none p-6 mb-6 relative overflow-hidden" elevated>
         <div className="relative z-10">
            <h3 className="font-black text-xl mb-2">Ottimizza i Costi</h3>
            <p className="text-white/80 text-xs font-medium mb-6 max-w-[200px] leading-relaxed">Scansiona la bolletta per calcoli precisi basati sulla tua tariffa reale.</p>
            <Button 
              variant="secondary" 
              className="w-fit py-3 px-8 text-sm flex items-center justify-center gap-2 hover:bg-white" 
              onClick={() => navigateTo(Screen.BILL_SCANNER)}
            >
               <Camera size={18} />
               Scansiona Ora
            </Button>
         </div>
         <div className="absolute -right-8 -bottom-8 opacity-20 transform rotate-12">
            <FileText size={180} />
         </div>
      </Card>

      <section className="mb-6">
         <div className="flex items-center justify-between mb-4">
            <h3 className="text-[10px] font-black text-[#6B7280] uppercase tracking-[2px] ml-2">Tariffa Attuale</h3>
            <SlidersHorizontal size={16} className="text-[#6B7280]" />
         </div>
         <div className="grid grid-cols-2 gap-4">
            <Card className="p-5 flex flex-col gap-2 border-[#E5E7EB]">
               <span className="text-[9px] font-black text-[#6B7280] uppercase tracking-widest">Prezzo Energia</span>
               <span className="text-2xl font-black text-[#1A1A2E]">€0.30<span className="text-[10px] text-[#6B7280] font-bold ml-1">/kWh</span></span>
               <Badge bgColor="#0077B6">ARERA</Badge>
            </Card>
            <Card className="p-5 flex flex-col gap-2 border-[#E5E7EB]">
               <span className="text-[9px] font-black text-[#6B7280] uppercase tracking-widest">Previsione</span>
               <span className="text-2xl font-black text-[#1A1A2E]">€84.20</span>
               <span className="text-[10px] text-[#6B7280] font-black uppercase tracking-tighter">Mese Corrente</span>
            </Card>
         </div>
      </section>

      <section className="mb-8">
         <div className="flex items-center justify-between mb-4 px-2">
            <h3 className="text-[10px] font-black text-[#6B7280] uppercase tracking-[2px]">Cronologia Scansioni</h3>
            <button className="text-[10px] font-black text-[#0077B6] uppercase tracking-widest">Archivio</button>
         </div>
         <div className="flex flex-col gap-3">
            {[
               { month: 'Febbraio', year: 2024, cost: 92.40, kwh: 310, status: 'Reale' },
               { month: 'Gennaio', year: 2024, cost: 105.80, kwh: 345, status: 'Reale' },
               { month: 'Dicembre', year: 2023, cost: 118.20, kwh: 380, status: 'Reale' }
            ].map((bill, i) => (
               <Card key={i} className="flex items-center gap-4 py-4 px-5 border-[#E5E7EB]">
                  <div className="w-12 h-12 bg-[#F5F7FA] rounded-[12px] flex items-center justify-center text-[#6B7280] border border-[#E5E7EB]">
                     <FileText size={22} />
                  </div>
                  <div className="flex-1">
                     <h4 className="font-extrabold text-sm text-[#1A1A2E]">{bill.month} {bill.year}</h4>
                     <p className="text-[10px] text-[#6B7280] font-black uppercase tracking-widest">{bill.kwh} kWh • {bill.status}</p>
                  </div>
                  <div className="text-right">
                     <p className="font-black text-sm text-[#1A1A2E]">€{bill.cost.toFixed(2)}</p>
                     <ArrowUpRight size={14} className="text-[#00A86B] ml-auto mt-1" />
                  </div>
               </Card>
            ))}
         </div>
      </section>
    </SafeAreaView>
  );
};

export default BillHub;
