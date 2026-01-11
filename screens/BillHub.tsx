import React from 'react';
import { Screen } from '../types';
import { Badge, SafeAreaView } from '../components/EnergyWiseElements';
import { FileText, SlidersHorizontal, ArrowUpRight, TrendingDown } from 'lucide-react';

const BillHub: React.FC<{ navigateTo: (s: Screen) => void }> = ({ navigateTo }) => {
  // Dati per il grafico a colonne
  const monthlyData = [
    { month: 'Set', cost: 95 },
    { month: 'Ott', cost: 88 },
    { month: 'Nov', cost: 102 },
    { month: 'Dic', cost: 118 },
    { month: 'Gen', cost: 106 },
    { month: 'Feb', cost: 92 },
  ];
  
  const maxCost = 120;

  return (
    <SafeAreaView className="bg-[#F5F7FA]">
      <h1 className="text-2xl font-[900] text-[#1A1A2E] mb-6 mt-4">Bollette e Costi</h1>

      {/* Bar Chart Card */}
      <div className="bg-white rounded-[24px] shadow-lg mb-8 border border-[#E5E7EB]">
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#F0F0F0] flex justify-between items-center">
          <h3 className="text-base font-black text-[#1A1A2E]">Storico Costi (€)</h3>
          <div className="flex items-center gap-1 bg-[#E8F5E9] px-3 py-1.5 rounded-full">
            <TrendingDown size={14} className="text-[#00A86B]" />
            <span className="text-[10px] font-black text-[#00A86B]">-13% vs 6 mesi fa</span>
          </div>
        </div>
        
        {/* Chart Content */}
        <div className="p-5">
          {/* Grafico a Colonne */}
          <div className="flex items-end justify-between gap-2 mb-6" style={{ height: '160px' }}>
            {monthlyData.map((item, i) => {
              const barHeight = (item.cost / maxCost) * 140;
              const isCurrentMonth = i === monthlyData.length - 1;
              
              return (
                <div key={i} className="flex-1 flex flex-col items-center">
                  {/* Valore sopra la barra */}
                  <span className="text-[11px] font-bold text-[#1A1A2E] mb-2">€{item.cost}</span>
                  
                  {/* Barra */}
                  <div 
                    style={{ 
                      height: `${barHeight}px`,
                      width: '100%',
                      backgroundColor: isCurrentMonth ? '#00A86B' : '#E5E7EB',
                      borderRadius: '8px 8px 0 0'
                    }}
                  />
                  
                  {/* Mese sotto la barra */}
                  <span className="text-[10px] font-bold text-[#6B7280] mt-2 uppercase">{item.month}</span>
                </div>
              );
            })}
          </div>
          
          {/* Riepilogo */}
          <div className="flex justify-between items-center pt-4 border-t border-[#F5F7FA]">
            <div>
              <p className="text-[9px] font-black text-[#6B7280] uppercase tracking-wider mb-1">Media 6 Mesi</p>
              <p className="text-xl font-black text-[#1A1A2E]">€100.17</p>
            </div>
            <div className="text-right">
              <p className="text-[9px] font-black text-[#6B7280] uppercase tracking-wider mb-1">Totale Periodo</p>
              <p className="text-xl font-black text-[#0077B6]">€601.00</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tariffa Section */}
      <section className="mb-6">
        <div className="flex items-center justify-between mb-4 px-1">
          <h3 className="text-[10px] font-black text-[#6B7280] uppercase tracking-[2px]">Tariffa Attuale</h3>
          <SlidersHorizontal size={16} className="text-[#6B7280]" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-[20px] p-5 border border-[#E5E7EB] shadow-sm">
            <span className="text-[9px] font-black text-[#6B7280] uppercase tracking-widest block mb-2">Prezzo Energia</span>
            <span className="text-2xl font-black text-[#1A1A2E]">€0.30<span className="text-[10px] text-[#6B7280] font-bold ml-1">/kWh</span></span>
            <div className="mt-2">
              <Badge bgColor="#0077B6">ARERA</Badge>
            </div>
          </div>
          <div className="bg-white rounded-[20px] p-5 border border-[#E5E7EB] shadow-sm">
            <span className="text-[9px] font-black text-[#6B7280] uppercase tracking-widest block mb-2">Previsione</span>
            <span className="text-2xl font-black text-[#1A1A2E]">€84.20</span>
            <span className="text-[10px] text-[#6B7280] font-black uppercase tracking-tighter block mt-2">Mese Corrente</span>
          </div>
        </div>
      </section>

      {/* Cronologia Section */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4 px-1">
          <h3 className="text-[10px] font-black text-[#6B7280] uppercase tracking-[2px]">Cronologia Scansioni</h3>
          <button className="text-[10px] font-black text-[#0077B6] uppercase tracking-widest">Archivio</button>
        </div>
        <div className="flex flex-col gap-3">
          {[
            { month: 'Febbraio', year: 2024, cost: 92.40, kwh: 310, status: 'Reale' },
            { month: 'Gennaio', year: 2024, cost: 105.80, kwh: 345, status: 'Reale' },
            { month: 'Dicembre', year: 2023, cost: 118.20, kwh: 380, status: 'Reale' }
          ].map((bill, i) => (
            <div key={i} className="bg-white rounded-[20px] flex items-center gap-4 py-4 px-5 border border-[#E5E7EB] shadow-sm">
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
            </div>
          ))}
        </div>
      </section>
    </SafeAreaView>
  );
};

export default BillHub;
