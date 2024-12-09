import { create } from 'zustand';
import { SlideImage } from '../types/image';

interface ImageStore {
  images: SlideImage[];
  addImage: (image: Omit<SlideImage, 'id' | 'order'>) => void;
  removeImage: (id: string) => void;
  toggleImage: (id: string) => void;
  updateOrder: (images: SlideImage[]) => void;
  updateImage: (id: string, image: Partial<SlideImage>) => void;
}

export const useImageStore = create<ImageStore>((set) => ({
  images: [
    {
      id: '1',
      url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1920&h=1080&fit=crop',
      title: 'Campus Life',
      enabled: true,
      order: 0,
    },
    {
      id: '2',
      url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920&h=1080&fit=crop',
      title: 'Library',
      enabled: true,
      order: 1,
    },
    {
      id: '3',
      url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1920&h=1080&fit=crop',
      title: 'Graduation',
      enabled: true,
      order: 2,
    },
  ],
  addImage: (image) =>
    set((state) => ({
      images: [
        ...state.images,
        {
          ...image,
          id: Math.random().toString(36).substring(7),
          order: state.images.length,
        },
      ],
    })),
  removeImage: (id) =>
    set((state) => ({
      images: state.images.filter((img) => img.id !== id),
    })),
  toggleImage: (id) =>
    set((state) => ({
      images: state.images.map((img) =>
        img.id === id ? { ...img, enabled: !img.enabled } : img
      ),
    })),
  updateOrder: (images) => set({ images }),
  updateImage: (id, updatedImage) =>
    set((state) => ({
      images: state.images.map((img) =>
        img.id === id ? { ...img, ...updatedImage } : img
      ),
    })),
}));