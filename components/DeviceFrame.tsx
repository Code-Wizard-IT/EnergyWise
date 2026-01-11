
import React from 'react';
import { Screen } from '../types';
import { Home, Zap, BarChart3, Receipt, User } from 'lucide-react';

interface DeviceFrameProps {
  children: React.ReactNode;
  currentScreen: Screen;
  navigateTo: (screen: Screen) => void;
}

const DeviceFrame: React.FC<DeviceFrameProps> = ({ children, currentScreen, navigateTo }) => {
  // Updated Screen references to BILL_HUB and SETTINGS
  const showNav = [
    Screen.HOME,
    Screen.DEVICE_LIST,
    Screen.ANALYTICS,
    Screen.BILL_HUB,
    Screen.SETTINGS,
    Screen.DEVICE_DETAIL
  ].includes(currentScreen);

  const isDark = [Screen.SPLASH, Screen.ONBOARDING].includes(currentScreen);

  return (
    <div className={`relative mx-auto border-[12px] border-[#1A1A2E] rounded-[3.5rem] shadow-2xl overflow-hidden ${isDark ? 'energy-gradient' : 'bg-[#F5F7FA]'}`} 
         style={{ width: '428px', height: '926px' }}>
      
      {/* Dynamic Island Area */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-8 bg-black rounded-b-2xl z-[100] mt-2 flex items-center justify-center">
        <div className="w-1 h-1 bg-white/20 rounded-full mr-1"></div>
        <div className="w-4 h-1 bg-white/20 rounded-full"></div>
      </div>

      {/* Screen Content Wrapper */}
      <div className={`w-full h-full flex flex-col ${showNav ? 'pb-[90px]' : ''}`}>
        <div className="flex-1 overflow-y-auto overflow-x-hidden mobile-scroll">
          {children}
        </div>
      </div>

      {/* 5-Tab Navigation Bar */}
      {showNav && (
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-[#E5E7EB] px-6 pt-3 pb-8 flex justify-between items-center z-[100] shadow-[0_-4px_16px_rgba(0,0,0,0.05)]">
          <NavItem 
            icon={<Home size={22} />} 
            label="Home" 
            isActive={currentScreen === Screen.HOME} 
            onClick={() => navigateTo(Screen.HOME)} 
          />
          <NavItem 
            icon={<Zap size={22} />} 
            label="Devices" 
            isActive={currentScreen === Screen.DEVICE_LIST || currentScreen === Screen.DEVICE_DETAIL} 
            onClick={() => navigateTo(Screen.DEVICE_LIST)} 
          />
          <NavItem 
            icon={<BarChart3 size={22} />} 
            label="Analytics" 
            isActive={currentScreen === Screen.ANALYTICS} 
            onClick={() => navigateTo(Screen.ANALYTICS)} 
          />
          <NavItem 
            icon={<Receipt size={22} />} 
            label="Bill" 
            isActive={currentScreen === Screen.BILL_HUB} 
            onClick={() => navigateTo(Screen.BILL_HUB)} 
          />
          <NavItem 
            icon={<User size={22} />} 
            label="Profile" 
            isActive={currentScreen === Screen.SETTINGS} 
            onClick={() => navigateTo(Screen.SETTINGS)} 
          />
        </div>
      )}

      {/* Home Indicator */}
      <div className={`absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 rounded-full z-[100] ${isDark ? 'bg-white/20' : 'bg-[#E5E7EB]'}`}></div>
    </div>
  );
};

const NavItem: React.FC<{ 
  icon: React.ReactNode; 
  label: string; 
  isActive: boolean; 
  onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center transition-all ${isActive ? 'text-[#00A86B] scale-110' : 'text-[#6B7280]'}`}
  >
    {icon}
    <span className="text-[10px] mt-1 font-bold tracking-tight">{label}</span>
  </button>
);

export default DeviceFrame;
