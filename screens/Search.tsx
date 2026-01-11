
import React from 'react';
import { Screen } from '../types';
import { Search as SearchIcon, X, Clock, ArrowUpRight } from 'lucide-react';

const Search: React.FC<{ navigateTo: (s: Screen) => void }> = ({ navigateTo }) => (
  <div className="flex flex-col p-8 animate-in fade-in duration-300">
    <div className="flex items-center gap-4 mb-8">
      <div className="flex-1 relative">
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-black" size={20} />
        <input 
          autoFocus
          placeholder="Cerca servizi, categorie..." 
          className="w-full bg-gray-50 border border-black rounded-2xl pl-12 pr-10 py-4 font-medium focus:outline-none"
        />
        <X className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer" size={18} />
      </div>
      <button onClick={() => navigateTo(Screen.HOME)} className="text-sm font-bold">Annulla</button>
    </div>

    <div className="mb-8">
      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Ricerche Recenti</h3>
      <div className="flex flex-col gap-4">
        {['Idraulico urgente', 'Pulizie casa', 'Riparazione schermo iPhone'].map((item) => (
          <div key={item} className="flex items-center justify-between text-gray-500">
            <div className="flex items-center gap-3">
              <Clock size={16} />
              <span className="text-sm font-medium">{item}</span>
            </div>
            <X size={14} className="text-gray-300" />
          </div>
        ))}
      </div>
    </div>

    <div>
      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Suggeriti per te</h3>
      <div className="flex flex-wrap gap-2">
        {['Pittura pareti', 'Manutenzione condizionatori', 'Lavaggio tappeti', 'Montaggio mobili', 'Elettricista'].map((tag) => (
          <button 
            key={tag}
            className="px-4 py-2 bg-gray-50 rounded-xl text-xs font-bold text-gray-600 flex items-center gap-2 hover:bg-black hover:text-white transition-colors border border-gray-100"
          >
            {tag}
            <ArrowUpRight size={12} />
          </button>
        ))}
      </div>
    </div>
  </div>
);

export default Search;
