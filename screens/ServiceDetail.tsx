
import React from 'react';
import { Service } from '../types';
import { ArrowLeft, Star, Heart, Share2, MapPin, Clock, ShieldCheck } from 'lucide-react';
import { Button, PlaceholderImage } from '../components/WireframeElements';

const ServiceDetail: React.FC<{ service: Service | null, onBack: () => void }> = ({ service, onBack }) => {
  if (!service) return null;

  return (
    <div className="flex flex-col animate-in slide-in-from-bottom duration-300">
      {/* Visual Header */}
      <div className="relative h-72">
        <PlaceholderImage className="h-full w-full rounded-none" text="Service Large Image" />
        <div className="absolute top-6 left-6 right-6 flex justify-between">
          <button onClick={onBack} className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg backdrop-blur">
            <ArrowLeft size={20} />
          </button>
          <div className="flex gap-3">
            <button className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg backdrop-blur">
              <Share2 size={18} />
            </button>
            <button className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg backdrop-blur">
              <Heart size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-white -mt-8 rounded-t-[2.5rem] p-8 shadow-2xl relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <span className="bg-gray-100 text-gray-500 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">{service.category}</span>
          <div className="flex items-center gap-1 ml-auto">
            <Star size={16} className="fill-yellow-400 text-yellow-400" />
            <span className="font-bold">{service.rating}</span>
            <span className="text-gray-400 text-sm">(48)</span>
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-4 leading-tight">{service.title}</h1>
        
        <div className="flex flex-col gap-4 mb-8">
          <div className="flex items-center gap-3 text-gray-500">
            <MapPin size={18} />
            <span className="text-sm">Milano, Italia (Disponibile a domicilio)</span>
          </div>
          <div className="flex items-center gap-3 text-gray-500">
            <Clock size={18} />
            <span className="text-sm">Risposta media in 1 ora</span>
          </div>
          <div className="flex items-center gap-3 text-green-600">
            <ShieldCheck size={18} />
            <span className="text-sm font-semibold">Professionista Verificato</span>
          </div>
        </div>

        <h3 className="font-bold mb-3">Descrizione</h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-8">
          {service.description} Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, 
          eros dolor interdum nulla, ut commodo diam libero vitae erat.
        </p>

        <h3 className="font-bold mb-4">Recensioni</h3>
        <div className="flex flex-col gap-6 mb-8">
          {[1, 2].map(i => (
            <div key={i} className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-100 shrink-0"></div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-bold">Utente {i}</span>
                  <span className="text-xs text-gray-400">2 giorni fa</span>
                </div>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} size={10} className={idx < 4 ? "fill-black" : "text-gray-200"} />
                  ))}
                </div>
                <p className="text-xs text-gray-500 italic">"Servizio impeccabile, molto professionale e rapido. Consigliatissimo!"</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating CTA */}
      <div className="fixed bottom-[83px] w-[428px] bg-white border-t border-gray-100 px-8 py-6 flex items-center justify-between shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
        <div>
          <span className="text-xs text-gray-400 block mb-1">Prezzo stimato</span>
          <span className="text-2xl font-bold">{service.price}</span>
        </div>
        <Button className="w-1/2 py-4">Prenota ora</Button>
      </div>
    </div>
  );
};

export default ServiceDetail;
