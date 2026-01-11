
export enum Screen {
  SPLASH = 'SPLASH',
  ONBOARDING = 'ONBOARDING',
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  FORGOT_PASSWORD = 'FORGOT_PASSWORD',
  HOME = 'HOME',
  DEVICE_LIST = 'DEVICE_LIST',
  ADD_DEVICE = 'ADD_DEVICE',
  DEVICE_DETAIL = 'DEVICE_DETAIL',
  ANALYTICS = 'ANALYTICS',
  BILL_HUB = 'BILL_HUB',
  BILL_SCANNER = 'BILL_SCANNER',
  SETTINGS = 'SETTINGS',
  // Added SERVICE_LIST and SERVICE_DETAIL to fix compilation errors in service-related screens
  SERVICE_LIST = 'SERVICE_LIST',
  SERVICE_DETAIL = 'SERVICE_DETAIL'
}

export interface Appliance {
  id: string;
  brand: string;
  model: string;
  category: 'Kitchen' | 'Laundry' | 'Climate' | 'Electronics' | 'Small Appliances' | 'Lighting' | 'Water Heating';
  powerWatts: number;
  standbyWatts: number;
  energyClass: string;
  customName?: string;
  room?: string;
  dailyUsageHours: number;
  isActive: boolean;
  consumptionPerCycle?: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  isPremium: boolean;
}

export interface BillData {
  id: string;
  month: string;
  year: number;
  energyPriceKwh: number;
  totalAmount: number;
  kwh: number;
}

// Added Service interface to fix import errors in screens/ServiceList.tsx and screens/ServiceDetail.tsx
export interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  rating: number;
  category: string;
}
