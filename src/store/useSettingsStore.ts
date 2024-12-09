import { create } from 'zustand';
import { SlideSettings } from '../types/settings';

interface SettingsStore {
  settings: SlideSettings;
  updateSettings: (settings: Partial<SlideSettings>) => void;
}

export const useSettingsStore = create<SettingsStore>((set) => ({
  settings: {
    transitionDuration: 500,
    slideDuration: 10000,
    fadeEnabled: true,
    redirectUrl: 'https://psb.feb.ui.ac.id',
    redirectEnabled: true,
    marqueeSpeed: 20,
    marqueeEnabled: true,
  },
  updateSettings: (newSettings) =>
    set((state) => ({
      settings: { ...state.settings, ...newSettings },
    })),
}));