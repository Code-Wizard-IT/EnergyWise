
import React from 'react';
import { Screen, Service } from '../types';
import { Search, SlidersHorizontal, Star } from 'lucide-react';
import { PlaceholderImage } from '../components/WireframeElements';

const SERVICES: Service[] = [
  { id: '1', title: 'Idraulico H24', description: 'Riparazioni urgenti idrauliche, sostituzione tubature, emergenze allagamento.', price: '45€/h', rating: 4.8, category: 'Casa' },
  { id: '2', title: 'Personal Trainer', description: 'Sessioni individuali, schede personalizzate, nutrizione sportiva.', price: '30€/h', rating: 4.9, category: 'Salute' },
  { id: '3', title: 'Assistenza Tech', description: 'Hardware repair, installazione software, rimozione virus.', price: 'Da 50€', rating: 4.7, category: 'Tech' },
  { id: '4', title: 'Lezioni Chitarra', description: 'Per principianti ed esperti. Online o a domicilio.', price: '25€/h', rating: 4.9, category: 'Istruzione' },
  { id: '5', title: 'Lavaggio Auto', description: 'Lavaggio completo interni ed esterni a domicilio.', price: 'Da 35€', rating: 4.6, category: 'Auto' },
  { id: '6', title: 'Dog Sitter', description: 'Passeggiate e cura del tuo cane durante la giornata.', price: '15€/h', rating: 5.0, category: 'Animali' },
];

const ServiceList: React.FC<{ navigateTo: (s: Screen, p?: any) => void }> = ({ navigateTo }) => (
  <div className="flex flex-col p-6 animate-in fade-in duration-300">
    <h1 className="text-2xl font-bold mb-6">Tutti i Servizi</h1>

    <div className="flex gap-3 mb-6">
      <div className="flex-1 relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input 
          placeholder="Cerca servizio..." 
          className="w-full bg-gray-50 border border-gray-100 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-black"
        />
      </div>
      <button className="p-3 bg-gray-50 border border-gray-100 rounded-xl">
        <SlidersHorizontal size={20} className="text-gray-400" />
      </button>
    </div>

    <div className="flex gap-2 mb-8 overflow-x-auto pb-2 no-scrollbar">
      {['Tutti', 'Casa', 'Salute', 'Tech', 'Istruzione', 'Auto', 'Animali'].map((cat, i) => (
        <button 
          key={cat} 
          className={`px-5 py-2.5 rounded-full text-xs font-bold border transition-colors whitespace-nowrap ${i === 0 ? 'bg-black text-white border-black' : 'bg-white text-gray-400 border-gray-100'}`}
        >
          {cat}
        </button>
      ))}
    </div>

    <div className="grid grid-cols-1 gap-6">
      {SERVICES.map((s) => (
        <button 
          key={s.id}
          onClick={() => navigateTo(Screen.SERVICE_DETAIL, { service: s })}
          className="flex flex-col text-left group"
        >
          <div className="relative mb-3">
            <PlaceholderImage aspectRatio="aspect-[16/9]" text="Service Image" className="w-full group-hover:border-black transition-colors" />
            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-lg flex items-center gap-1">
              <Star size={12} className="fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-bold">{s.rating}</span>
            </div>
          </div>
          <div className="flex justify-between items-start mb-1">
            <h3 className="font-bold text-lg">{s.title}</h3>
            <span className="font-bold text-black">{s.price}</span>
          </div>
          <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">{s.description}</p>
          <div className="mt-3 flex items-center gap-4">
             <span className="text-[10px] font-bold text-gray-400 uppercase bg-gray-50 px-2 py-1 rounded-md">{s.category}</span>
             <span className="text-[10px] text-gray-300">•</span>
             <span className="text-[10px] text-gray-400 font-semibold">Recensito da 12 utenti</span>
          </div>
        </button>
      ))}
    </div>
  </div>
);

export default ServiceList;
