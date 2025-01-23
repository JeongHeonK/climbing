import { StateCreator } from "zustand";

export interface LocalStorageSlice {
  mine?: [string, Date][];
  addMine: (id: string, date: Date) => void;
  deleteMine: (id: string) => void;
}

export const createLocalStorageSlice: StateCreator<LocalStorageSlice> = (
  set,
) => ({
  mine: [],
  addMine: (id, date) =>
    set((state) => {
      const newData: [string, Date] = [id, date];
      return { mine: [...(state.mine || []), newData] };
    }),
  deleteMine: (id) =>
    set((state) => ({ mine: state.mine?.filter((item) => item[0] !== id) })),
});
