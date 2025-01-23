import { StateCreator } from "zustand";
import { IGathering } from "../(home)/types/type";

export interface MyGatheringSlice {
  myGatherings?: IGathering[];
  setGatherings: (gatherings: IGathering[]) => void;
  handleDelete: (id: string) => void;
}

export const createMyGatheringSlice: StateCreator<MyGatheringSlice> = (
  set,
) => ({
  myGatherings: [],
  setGatherings: (gatherings) => set(() => ({ myGatherings: gatherings })),
  handleDelete: (id) =>
    set((state) => ({
      ...state,
      myGatherings: state.myGatherings?.filter(
        (gathering) => gathering._id !== id,
      ),
    })),
});
