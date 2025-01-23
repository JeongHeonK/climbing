import { create } from "zustand";
import { createPopupSlice, PopupSlice } from "./popupSlice";
import { createMyGatheringSlice, MyGatheringSlice } from "./gatheringSlice";

export const usePopupStore = create<PopupSlice>()((...a) => ({
  ...createPopupSlice(...a),
}));

export const useMyGatheringsStore = create<MyGatheringSlice>()((...a) => ({
  ...createMyGatheringSlice(...a),
}));
