import { create } from 'zustand';
import { MarqueeText } from '../types/marquee';

interface MarqueeStore {
  texts: MarqueeText[];
  addText: (text: string) => void;
  removeText: (id: string) => void;
  toggleText: (id: string) => void;
  updateText: (id: string, text: string) => void;
}

export const useMarqueeStore = create<MarqueeStore>((set) => ({
  texts: [
    {
      id: '1',
      text: 'Welcome to our institution! For more information visit our website.',
      enabled: true,
    }
  ],
  addText: (text) =>
    set((state) => ({
      texts: [
        ...state.texts,
        {
          id: Math.random().toString(36).substring(7),
          text,
          enabled: true,
        },
      ],
    })),
  removeText: (id) =>
    set((state) => ({
      texts: state.texts.filter((text) => text.id !== id),
    })),
  toggleText: (id) =>
    set((state) => ({
      texts: state.texts.map((text) =>
        text.id === id ? { ...text, enabled: !text.enabled } : text
      ),
    })),
  updateText: (id, newText) =>
    set((state) => ({
      texts: state.texts.map((text) =>
        text.id === id ? { ...text, text: newText } : text
      ),
    })),
}));