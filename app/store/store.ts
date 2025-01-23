import { create } from "zustand";
import { createPopupSlice, PopupSlice } from "./popupSlice";

export const usePopupStore = create<PopupSlice>()((...a) => ({
  ...createPopupSlice(...a),
}));
