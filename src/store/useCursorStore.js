import { create } from 'zustand';

const useCursorStore = create((set) => ({
  cursorType: 'default', // default, hover, text
  cursorText: '', // for 'text' type

  setCursorType: (type, text = '') => set({ cursorType: type, cursorText: text }),
  resetCursor: () => set({ cursorType: 'default', cursorText: '' }),
}));

export default useCursorStore;
