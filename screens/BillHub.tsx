import React from 'react';
import { Screen } from '../types';
import { Card, Button, Badge, SafeAreaView } from '../components/EnergyWiseElements';
import { FileText, Camera, SlidersHorizontal, ArrowUpRight, TrendingDown } from 'lucide-react';

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

      {/* Bar Chart Card - VERY LARGE AND VISIBLE */}
      <div className="bg-white rounded-[24px] shadow-lg mb-6 overflow-hidden border border-[#E5E7EB]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#F5F7FA] flex justify-between items-center">
          <h3 className="text-base font-black text-[#1A1A2E]">Storico Costi (€)</h3>
          <div className="flex items-center gap-1 bg-[#E8F5E9] px-3 py-1.5 rounded-full">
            <TrendingDown size={14} className="text-[#00A86B]" />
            <span className="text-[10px] font-black text-[#00A86B]">-13%</span>
          </div>
        </div>
        
        {/* Chart Area */}
        <div className="px-6 py-6">
          {/* Bar Chart */}
          <div className="flex items-end justify-between gap-3" style={{ height: '180px' }}>
            {monthlyData.map((item, i) => {
              const heightPercent = (item.cost / maxCost) * 100;
              const isLast = i === monthlyData.length - 1;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                  <span className="text-xs font-black text-[#1A1A2E]">€{item.cost}</span>
                  <div 
                    className={`w-full rounded-t-xl ${isLast ? 'bg-[#00A86B]' : 'bg-[#E5E7EB]'}`}
                    style={{ height: `${heightPercent}%` }}
                  />
                  <span className="text-[11px] font-black text-[#6B7280] uppercase">{item.month}</span>
                </div>
              );
            })}
          </div>
          
          {/* Summary */}
          <div className="flex items-center justify-between pt-6 mt-6 border-t border-[#F5F7FA]">
            <div>
              <span className="text-[10px] font-black text-[#6B7280] uppercase tracking-widest block mb-1">Media 6 Mesi</span>
              <span className="text-2xl font-black text-[#1A1A2E]">€100.17</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-black text-[#6B7280] uppercase tracking-widest block mb-1">Totale Periodo</span>
              <span className="text-2xl font-black text-[#0077B6]">€601.00</span>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Card - Green */}
      <div className="bg-[#00A86B] rounded-[24px] p-6 mb-6 relative overflow-hidden shadow-lg">
        <div className="relative z-10">
          <h3 className="font-black text-xl text-white mb-2">Ottimizza i Costi</h3>
          <p className="text-white/80 text-xs font-medium mb-6 max-w-[200px] leading-relaxed">
            Scansiona la bolletta per calcoli precisi basati sulla tua tariffa reale.
          </p>
          <button 
            onClick={() => navigateTo(Screen.BILL_SCANNER)}
            className="bg-white text-[#00A86B] py-3 px-6 rounded-xl text-sm font-black flex items-center gap-2"
          >
            <Camera size={18} />
            Scansiona Ora
          </button>
        </div>
        <FileText size={160} className="absolute -right-6 -bottom-6 text-white/10" />
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
