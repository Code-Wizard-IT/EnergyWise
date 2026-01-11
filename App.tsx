
import React, { useState } from 'react';
import { Screen, Appliance } from './types';
import DeviceFrame from './components/DeviceFrame';

// Screen Imports
import Splash from './screens/Splash';
import Onboarding from './screens/Onboarding';
import Login from './screens/Login';
import Register from './screens/Register';
import ForgotPassword from './screens/ForgotPassword';
import Home from './screens/Home';
import DeviceList from './screens/DeviceList';
import AddDevice from './screens/AddDevice';
import DeviceDetail from './screens/DeviceDetail';
import Analytics from './screens/Analytics';
import BillHub from './screens/BillHub';
import BillScanner from './screens/BillScanner';
import Settings from './screens/Settings';

const MOCK_DEVICES: Appliance[] = [
  { id: '1', brand: 'Samsung', model: 'RF28R', category: 'Kitchen', powerWatts: 350, standbyWatts: 5, energyClass: 'A++', customName: 'Frigo Cucina', room: 'Kitchen', dailyUsageHours: 24, isActive: true },
  { id: '2', brand: 'LG', model: 'OLED65', category: 'Electronics', powerWatts: 150, standbyWatts: 0.5, energyClass: 'A', customName: 'Smart TV', room: 'Living Room', dailyUsageHours: 4, isActive: true },
  { id: '3', brand: 'Mitsubishi', model: 'Electric', category: 'Climate', powerWatts: 1200, standbyWatts: 2, energyClass: 'A+++', customName: 'Condizionatore', room: 'Bedroom', dailyUsageHours: 6, isActive: true },
  { id: '4', brand: 'Bosch', model: 'Serie 6', category: 'Laundry', powerWatts: 2000, standbyWatts: 1, energyClass: 'A', customName: 'Lavatrice', room: 'Laundry', dailyUsageHours: 1.5, isActive: true },
  { id: '5', brand: 'Dell', model: 'Alienware', category: 'Electronics', powerWatts: 450, standbyWatts: 2, energyClass: 'B', customName: 'Gaming Rig', room: 'Office', dailyUsageHours: 3, isActive: true },
];

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.SPLASH);
  const [devices, setDevices] = useState<Appliance[]>(MOCK_DEVICES);
  const [selectedDevice, setSelectedDevice] = useState<Appliance | null>(null);

  const navigateTo = (screen: Screen, params?: any) => {
    if (params?.device) setSelectedDevice(params.device);
    setCurrentScreen(screen);
  };

  const addDevice = (device: Appliance) => {
    setDevices([device, ...devices]);
    navigateTo(Screen.HOME);
  };

  const updateDevice = (updated: Appliance) => {
    setDevices(devices.map(d => d.id === updated.id ? updated : d));
  };

  const deleteDevice = (id: string) => {
    setDevices(devices.filter(d => d.id !== id));
    navigateTo(Screen.DEVICE_LIST);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case Screen.SPLASH: 
        return <Splash onFinish={() => navigateTo(Screen.ONBOARDING)} />;
      case Screen.ONBOARDING: 
        return <Onboarding onFinish={() => navigateTo(Screen.LOGIN)} />;
      case Screen.LOGIN: 
        return <Login onLogin={() => navigateTo(Screen.HOME)} onRegister={() => navigateTo(Screen.REGISTER)} onForgot={() => navigateTo(Screen.FORGOT_PASSWORD)} />;
      case Screen.REGISTER: 
        return <Register onRegister={() => navigateTo(Screen.HOME)} onLogin={() => navigateTo(Screen.LOGIN)} />;
      case Screen.FORGOT_PASSWORD:
        return <ForgotPassword onBack={() => navigateTo(Screen.LOGIN)} />;
      case Screen.HOME: 
        return <Home devices={devices} navigateTo={navigateTo} />;
      case Screen.DEVICE_LIST: 
        return <DeviceList devices={devices} navigateTo={navigateTo} />;
      case Screen.ADD_DEVICE: 
        return <AddDevice onAdd={addDevice} onBack={() => navigateTo(Screen.DEVICE_LIST)} />;
      case Screen.DEVICE_DETAIL: 
        return <DeviceDetail device={selectedDevice} onUpdate={updateDevice} onDelete={deleteDevice} onBack={() => navigateTo(Screen.DEVICE_LIST)} />;
      case Screen.ANALYTICS: 
        return <Analytics devices={devices} />;
      case Screen.BILL_HUB: 
        return <BillHub navigateTo={navigateTo} />;
      case Screen.BILL_SCANNER: 
        return <BillScanner onComplete={() => navigateTo(Screen.BILL_HUB)} onBack={() => navigateTo(Screen.BILL_HUB)} />;
      case Screen.SETTINGS: 
        return <Settings navigateTo={navigateTo} />;
      default: 
        return <Home devices={devices} navigateTo={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-4">
      {/* Visual Navigator for Demo */}
      <div className="hidden lg:flex fixed left-8 top-1/2 -translate-y-1/2 flex-col gap-1 bg-white p-4 rounded-2xl shadow-xl border border-gray-200 z-[1000] max-h-[80vh] overflow-y-auto w-48">
        <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[2px] mb-2 px-2">App Screens</h3>
        {Object.values(Screen).map((s) => (
          <button
            key={s}
            onClick={() => navigateTo(s)}
            className={`text-left px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all ${
              currentScreen === s ? 'bg-[#00A86B] text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {s.replace('_', ' ')}
          </button>
        ))}
      </div>

      <DeviceFrame currentScreen={currentScreen} navigateTo={navigateTo}>
        {renderScreen()}
      </DeviceFrame>
    </div>
  );
};

export default App;
