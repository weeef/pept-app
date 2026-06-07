import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

export type CompoundType = 'peptide' | 'med';
export type UnitType = 'units' | 'ml';
export type DeliveryMethod = 'injectable' | 'pill';
export type InjectionType = 'subcutaneous' | 'intramuscular' | 'none';

export interface Compound {
  id: string;
  name: string;
  dose: string;
  frequency: string;
  type: CompoundType;
  delivery: DeliveryMethod;
  injectionType: InjectionType;
  recommendedSites: string[];
  needleGauge: string;
  needleLength: string;
  reconDate: string | null; // ISO string
}

export interface LoggedDose {
  date: string; // YYYY-MM-DD
  siteIndex: number;
}

export interface HistoryItem {
  id: string;
  compoundId: string;
  compoundName: string;
  timestamp: string; // ISO string
  dose: string;
  site?: string;
  needleInfo?: string;
}

interface AppState {
  stack: Compound[];
  isPremium: boolean;
  clickCount: number;
  loggedDoses: Record<string, LoggedDose>; // compoundId -> last logged dose info
  history: HistoryItem[];
  units: UnitType;
  pushNotificationsEnabled: boolean;
  
  // Profile & Health
  hasCompletedOnboarding: boolean;
  weight: string;
  height: string;
  sex: 'Male' | 'Female' | 'Other' | '';
  healthSyncEnabled: boolean;
  
  // Actions
  addCompound: (compound: Omit<Compound, 'id'>) => void;
  editCompound: (id: string, compound: Partial<Compound>) => void;
  removeCompound: (id: string) => void;
  handleInteraction: () => boolean; // returns true if an ad should be shown
  unlockPremium: () => void;
  logDose: (compoundId: string) => void;
  undoLog: (compoundId: string) => void;
  resetClickCount: () => void;
  setStack: (stack: Compound[]) => void;
  setUnits: (units: UnitType) => void;
  setPushNotifications: (enabled: boolean) => void;
  completeOnboarding: (profile: { weight: string, height: string, sex: 'Male' | 'Female' | 'Other' | '' }) => void;
  updateProfile: (profile: Partial<{ weight: string, height: string, sex: 'Male' | 'Female' | 'Other' | '' }>) => void;
  toggleHealthSync: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      stack: [],
      isPremium: false,
      clickCount: 0,
      loggedDoses: {},
      history: [],
      units: 'units',
      pushNotificationsEnabled: false,
      
      hasCompletedOnboarding: false,
      weight: '',
      height: '',
      sex: '',
      healthSyncEnabled: false,

      setStack: (stack) => set({ stack }),

      addCompound: (compound) => set((state) => ({
        stack: [...state.stack, { ...compound, id: Date.now().toString(36) + Math.random().toString(36).substr(2, 5) }]
      })),

      editCompound: (id, updatedFields) => set((state) => ({
        stack: state.stack.map((c) => c.id === id ? { ...c, ...updatedFields } : c)
      })),

      removeCompound: (id) => set((state) => ({
        stack: state.stack.filter((c) => c.id !== id)
      })),

      handleInteraction: () => {
        const { isPremium, clickCount } = get();
        if (isPremium) return false;
        
        const newCount = clickCount + 1;
        set({ clickCount: newCount });
        
        return newCount > 0 && newCount % 5 === 0;
      },

      unlockPremium: () => set({ isPremium: true }),

      logDose: (compoundId) => {
        const today = new Date().toISOString().split('T')[0];
        set((state) => {
          const compound = state.stack.find(c => c.id === compoundId);
          if (!compound) return state;

          const currentLog = state.loggedDoses[compoundId];
          const nextSiteIndex = currentLog ? (currentLog.siteIndex + 1) : 1;
          
          const historyItem: HistoryItem = {
            id: Date.now().toString(),
            compoundId,
            compoundName: compound.name,
            timestamp: new Date().toISOString(),
            dose: compound.dose,
            site: compound.delivery === 'injectable' ? compound.recommendedSites[nextSiteIndex % compound.recommendedSites.length] : undefined,
            needleInfo: compound.delivery === 'injectable' ? `${compound.needleGauge} • ${compound.needleLength}` : undefined
          };

          return {
            loggedDoses: {
              ...state.loggedDoses,
              [compoundId]: { date: today, siteIndex: nextSiteIndex }
            },
            history: [historyItem, ...state.history].slice(0, 100) // Keep last 100 items
          };
        });
      },

      undoLog: (compoundId) => {
        set((state) => {
          const newLoggedDoses = { ...state.loggedDoses };
          delete newLoggedDoses[compoundId];
          
          // Also remove the latest history item for this compound
          const newHistory = [...state.history];
          const latestHistoryIdx = newHistory.findIndex(h => h.compoundId === compoundId);
          if (latestHistoryIdx > -1) {
            newHistory.splice(latestHistoryIdx, 1);
          }

          return { 
            loggedDoses: newLoggedDoses,
            history: newHistory
          };
        });
      },

      resetClickCount: () => set({ clickCount: 0 }),
      setUnits: (units) => set({ units }),
      setPushNotifications: (enabled) => set({ pushNotificationsEnabled: enabled }),
      completeOnboarding: (profile) => set({ ...profile, hasCompletedOnboarding: true }),
      updateProfile: (profile) => set((state) => ({ ...state, ...profile })),
      toggleHealthSync: () => set((state) => ({ healthSyncEnabled: !state.healthSyncEnabled })),
    }),
    {
      name: 'optipep-app-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
