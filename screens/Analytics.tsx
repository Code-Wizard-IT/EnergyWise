import React, { useState } from 'react';
import { Appliance } from '../types';
import { Card, SafeAreaView, Badge } from '../components/EnergyWiseElements';
import { BarChart3, TrendingUp, Info, ChevronRight, PieChart, Calendar, TrendingDown, LayoutGrid } from 'lucide-react';

const Analytics: React.FC<{ devices: Appliance[] }> = ({ devices }) => {
  const [period, setPeriod] = useState<'Settimana' | 'Mese' | 'Anno'>('Settimana');
  
  // Chart Data Simulation
  const weeklyData = [8.2, 10.5, 9.8, 14.2, 11.5, 7.8, 9.2];
  const budgetLine = 12;
  const days = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];

  // SVG Chart Helper
  const maxVal = Math.max(...weeklyData, budgetLine) + 2;
  const chartHeight = 100;
  const chartWidth = 300;
  const padding = 20;
  
  const getX = (index: number) => padding + (index * (chartWidth - 2 * padding) / (weeklyData.length - 1));
  const getY = (value: number) => chartHeight - padding - ((value / maxVal) * (chartHeight - 2 * padding));

  const linePath = weeklyData.reduce((acc, val, i) => 
    acc + (i === 0 ? `M ${getX(i)} ${getY(val)}` : ` L ${getX(i)} ${getY(val)}`), '');

  return (
    <SafeAreaView className="bg-[#F5F7FA]">
      <div className="flex items-center justify-between mb-6 mt-4">
        <h1 className="text-2xl font-black text-[#1A1A2E]">Analisi Consumi</h1>
        <button className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-[#E5E7EB] shadow-sm">
          <Calendar size={18} className="text-[#6B7280]" />
        </button>
      </div>

      {/* Period Selector */}
      <div className="flex p-1 bg-white rounded-2xl border border-[#E5E7EB] mb-8 shadow-sm">
        {['Settimana', 'Mese', 'Anno'].map((p) => (
          <button 
            key={p} 
            onClick={() => setPeriod(p as any)}
            className={`flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[2px] transition-all duration-300 ${
              period === p ? 'bg-[#1A1A2E] text-white shadow-md' : 'text-[#6B7280]'
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-6 overflow-y-auto no-scrollbar pb-24">
        {/* Line Chart Card */}
        <Card className="p-0 border-none overflow-hidden" elevated>
           <div className="p-5 border-b border-gray-50 flex justify-between items-center bg-white">
              <h3 className="text-xs font-black text-[#1A1A2E] uppercase tracking-wide">Trend Settimanale (kWh)</h3>
              <div className="flex items-center gap-2">
                 <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-[#00A86B]"></div>
                    <span className="text-[8px] font-bold text-gray-400 uppercase">Consumo</span>
                 </div>
                 <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-[#FF6B35] opacity-40"></div>
                    <span className="text-[8px] font-bold text-gray-400 uppercase">Budget</span>
                 </div>
              </div>
           </div>
           
           <div className="bg-white p-4 h-48 relative">
              <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-full overflow-visible">
                 {/* Budget Dashed Line */}
                 <line 
                    x1={padding} y1={getY(budgetLine)} x2={chartWidth - padding} y2={getY(budgetLine)} 
                    stroke="#FF6B35" strokeWidth="1" strokeDasharray="4 2" opacity="0.4"
                 />
                 
                 {/* Grid Lines */}
                 {[0, 5, 10, 15].map(v => (
                    <line key={v} x1={padding} y1={getY(v)} x2={chartWidth - padding} y2={getY(v)} stroke="#F5F7FA" strokeWidth="0.5" />
                 ))}

                 {/* Main Line */}
                 <path d={linePath} fill="none" stroke="#00A86B" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                 
                 {/* Data Points */}
                 {weeklyData.map((val, i) => (
                    <circle key={i} cx={getX(i)} cy={getY(val)} r="3" fill="white" stroke="#00A86B" strokeWidth="2" />
                 ))}

                 {/* Labels */}
                 {days.map((day, i) => (
                    <text key={day} x={getX(i)} y={chartHeight - 2} textAnchor="middle" fontSize="6" fontWeight="900" fill="#6B7280" className="uppercase">{day}</text>
                 ))}
                 {[0, 10, 20].map(v => (
                    <text key={v} x={padding - 4} y={getY(v) + 2} textAnchor="end" fontSize="6" fontWeight="900" fill="#6B7280">{v}</text>
                 ))}
              </svg>
           </div>
        </Card>

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-4">
           <Card className="p-5 flex flex-col gap-2 border-[#E5E7EB]">
              <span className="text-[9px] font-black text-[#6B7280] uppercase tracking-widest">Media Giornaliera</span>
              <div className="flex items-baseline gap-1">
                 <span className="text-2xl font-black text-[#1A1A2E]">10.2</span>
                 <span className="text-[10px] font-bold text-gray-400">kWh</span>
              </div>
              <Badge bgColor="#E8F5E9" color="#00A86B">Ottimizzato</Badge>
           </Card>
           
           <Card className="p-5 flex flex-col gap-2 bg-[#00A86B] border-none text-white">
              <span className="text-[9px] font-black text-white/60 uppercase tracking-widest">Risparmio Mese</span>
              <div className="flex items-center gap-2">
                 <span className="text-2xl font-black">€14.50</span>
                 <TrendingDown size={18} className="text-white" />
              </div>
              <p className="text-[9px] font-bold text-white/80 uppercase">-12% vs mese scorso</p>
           </Card>
        </div>

        {/* Category Distribution Section */}
        <section>
           <div className="flex items-center justify-between mb-4 px-2">
              <h3 className="font-black text-[#1A1A2E] text-sm uppercase tracking-wider">Consumo per Categoria</h3>
              <PieChart size={18} className="text-[#6B7280]" />
           </div>
           <Card className="p-6 border-[#E5E7EB]">
              {[
                 { label: 'Grandi Elettrodomestici', val: 45, color: '#00A86B' },
                 { label: 'Illuminazione', val: 15, color: '#FFB800' },
                 { label: 'Elettronica', val: 25, color: '#0077B6' },
                 { label: 'Climatizzazione', val: 15, color: '#FF6B35' }
              ].map((item, i) => (
                 <div key={i} className="mb-5 last:mb-0">
                    <div className="flex justify-between items-center mb-2">
                       <span className="text-xs font-bold text-[#1A1A2E]">{item.label}</span>
                       <span className="text-xs font-black text-[#1A1A2E]">{item.val}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                       <div 
                         className="h-full rounded-full transition-all duration-1000" 
                         style={{ width: `${item.val}%`, backgroundColor: item.color }}
                       ></div>
                    </div>
                 </div>
              ))}
           </Card>
        </section>

        {/* Insights Box */}
        <div className="bg-[#1A1A2E] p-6 rounded-[24px] flex gap-5 mb-8 text-white relative overflow-hidden">
           <div className="w-14 h-14 shrink-0 bg-white/10 rounded-2xl flex items-center justify-center text-[#FFB800]">
              <Info size={28} />
           </div>
           <div className="relative z-10">
              <h4 className="font-black text-sm text-white mb-1">Analisi IA Avanzata</h4>
              <p className="text-xs text-white/60 font-medium leading-relaxed">
                 Abbiamo rilevato un picco di <span className="text-[#FF6B35] font-bold">4.2 kWh</span> il Giovedì. Sembra che la <span className="text-white font-bold">Lavasciuga</span> sia stata utilizzata nella fascia oraria di punta (F1).
              </p>
              <button className="mt-4 text-[10px] font-black text-[#00A86B] uppercase tracking-widest flex items-center gap-1">
                 Vedi dettagli picco <ChevronRight size={12} />
              </button>
           </div>
           <LayoutGrid size={100} className="absolute -right-8 -bottom-8 text-white/5 rotate-12 pointer-events-none" />
        </div>
      </div>
    </SafeAreaView>
  );
};

export default Analytics;
