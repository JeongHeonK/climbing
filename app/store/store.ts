import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createPopupSlice, PopupSlice } from "./popupSlice";
import { createMyGatheringSlice, MyGatheringSlice } from "./gatheringSlice";
import {
  createLocalStorageSlice,
  LocalStorageSlice,
} from "./localStorageSlice";

export const usePopupStore = create<PopupSlice>()((...a) => ({
  ...createPopupSlice(...a),
}));

export const useMyGatheringsStore = create<MyGatheringSlice>()((...a) => ({
  ...createMyGatheringSlice(...a),
}));

export const useLocalStorageStore = create<LocalStorageSlice>()(
  persist(
    (...a) => ({
      ...createLocalStorageSlice(...a),
    }),
    { name: "Local-Storage" },
  ),
);
