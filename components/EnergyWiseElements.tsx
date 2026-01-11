
import React from 'react';

export const Button: React.FC<{
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'energy' | 'yellow' | 'blue' | 'danger';
  className?: string;
  onClick?: () => void;
}> = ({ children, variant = 'primary', className = '', onClick }) => {
  const base = "w-full py-4 px-6 rounded-[12px] font-bold transition-all text-center flex items-center justify-center gap-2 active:scale-[0.95]";
  const styles = {
    primary: "bg-[#1A1A2E] text-white hover:opacity-90",
    secondary: "bg-[#E5E7EB] text-[#1A1A2E]",
    outline: "bg-transparent border-2 border-[#E5E7EB] text-[#1A1A2E]",
    energy: "bg-[#00A86B] text-white shadow-lg shadow-[#00A86B]/20",
    yellow: "bg-[#FFB800] text-[#1A1A2E] shadow-lg shadow-[#FFB800]/20",
    blue: "bg-[#0077B6] text-white shadow-lg shadow-[#0077B6]/20",
    danger: "bg-[#FF6B35] text-white shadow-lg shadow-[#FF6B35]/20"
  };

  return (
    <button onClick={onClick} className={`${base} ${styles[variant]} ${className}`}>
      {children}
    </button>
  );
};

export const Card: React.FC<{
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  elevated?: boolean;
}> = ({ children, className = "", onClick, elevated = false }) => (
  <div 
    onClick={onClick}
    className={`bg-white rounded-[16px] p-5 border border-[#E5E7EB] transition-all ${
      elevated ? 'shadow-[0_4px_16px_rgba(0,0,0,0.12)]' : 'shadow-[0_2px_8px_rgba(0,0,0,0.08)]'
    } ${onClick ? 'cursor-pointer hover:border-[#00A86B] active:scale-[0.98]' : ''} ${className}`}
  >
    {children}
  </div>
);

export const Input: React.FC<{
  label?: string;
  placeholder?: string;
  type?: string;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ label, placeholder, type = "text", className = "", value, onChange }) => (
  <div className={`flex flex-col gap-2 ${className}`}>
    {label && <label className="text-sm font-semibold text-[#1A1A2E] ml-1">{label}</label>}
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full bg-white border border-[#E5E7EB] rounded-[12px] px-5 py-4 focus:ring-2 focus:ring-[#0077B6] focus:border-transparent outline-none transition-all text-[#1A1A2E]"
    />
  </div>
);

export const Badge: React.FC<{ children: React.ReactNode; color?: string; bgColor?: string }> = ({ 
  children, 
  color = "white", 
  bgColor = "#00A86B" 
}) => (
  <span 
    className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider" 
    style={{ backgroundColor: bgColor, color: color }}
  >
    {children}
  </span>
);

/**
 * SafeAreaView as defined in PRD:
 * 1. Explicit padding-top: 60px
 * 2. Background color extends behind status bar (handled by DeviceFrame wrapper)
 */
export const SafeAreaView: React.FC<{ children: React.ReactNode; className?: string; noPadding?: boolean }> = ({ children, className = "", noPadding = false }) => (
  <div className={`h-full flex flex-col ${noPadding ? '' : 'pt-[60px] pb-4 px-4'} ${className}`}>
    {children}
  </div>
);
