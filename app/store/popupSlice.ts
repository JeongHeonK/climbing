import { StateCreator } from "zustand";

export interface PopupSlice {
  popupState: boolean;
  toggle: () => void;
}

export const createPopupSlice: StateCreator<PopupSlice> = (set) => ({
  popupState: false,
  toggle: () => set((state) => ({ popupState: !state.popupState })),
});
