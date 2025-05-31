import { create } from 'zustand';

export const useContentStore = create((set) => ({
  contentType: "movie",                 // default state
  setContentType: (type) => set({      // updater function
    contentType: type
  }),
}));
