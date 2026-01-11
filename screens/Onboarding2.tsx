
import React from 'react';
import { Button, PlaceholderImage } from '../components/WireframeElements';

const Onboarding2: React.FC<{ onNext: () => void, onBack: () => void }> = ({ onNext, onBack }) => (
  <div className="h-full flex flex-col p-8 animate-in fade-in slide-in-from-right duration-500">
    <div className="flex-1 flex flex-col justify-center items-center text-center">
      <PlaceholderImage className="w-full mb-12" text="Illustration 2" />
      <h1 className="text-3xl font-bold mb-4 leading-tight">Prenota con facilità</h1>
      <p className="text-gray-500 text-lg">Scegli il professionista che fa per te e fissa un appuntamento in pochi istanti.</p>
    </div>
    <div className="pt-8 flex flex-col gap-3">
      <Button onClick={onNext}>Avanti</Button>
      <Button variant="secondary" onClick={onBack}>Indietro</Button>
      <div className="flex justify-center gap-1.5 mt-6">
        <div className="w-1.5 h-1.5 rounded-full bg-gray-200"></div>
        <div className="w-6 h-1.5 rounded-full bg-black"></div>
        <div className="w-1.5 h-1.5 rounded-full bg-gray-200"></div>
      </div>
    </div>
  </div>
);

export default Onboarding2;
