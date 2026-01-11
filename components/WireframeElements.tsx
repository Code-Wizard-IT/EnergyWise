
import React from 'react';

export const Button: React.FC<{
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  onClick?: () => void;
}> = ({ children, variant = 'primary', className = '', onClick }) => {
  const base = "w-full py-4 px-6 rounded-2xl font-semibold transition-all text-center";
  const styles = {
    primary: "bg-black text-white hover:bg-gray-800",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
    outline: "bg-transparent border-2 border-gray-200 text-gray-900 hover:border-black"
  };

  return (
    <button onClick={onClick} className={`${base} ${styles[variant]} ${className}`}>
      {children}
    </button>
  );
};

export const Input: React.FC<{
  label?: string;
  placeholder?: string;
  type?: string;
  className?: string;
}> = ({ label, placeholder, type = "text", className = "" }) => (
  <div className={`flex flex-col gap-2 ${className}`}>
    {label && <label className="text-xs font-bold text-gray-500 uppercase tracking-wide ml-1">{label}</label>}
    <input
      type={type}
      placeholder={placeholder}
      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 focus:outline-none focus:border-black transition-colors"
    />
  </div>
);

export const PlaceholderImage: React.FC<{ 
  className?: string; 
  aspectRatio?: string;
  text?: string;
}> = ({ className = "", aspectRatio = "aspect-square", text = "Placeholder" }) => (
  <div className={`relative bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden rounded-2xl ${aspectRatio} ${className}`}>
    <div className="absolute inset-0 flex items-center justify-center opacity-10">
      <div className="w-[150%] h-[1px] bg-black rotate-45 transform translate-y-1/2"></div>
      <div className="w-[150%] h-[1px] bg-black -rotate-45 transform -translate-y-1/2"></div>
    </div>
    <span className="text-gray-400 font-medium z-10">{text}</span>
  </div>
);
