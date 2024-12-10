import { create } from "zustand";

const useBearStore = create((set) => ({
  jsonRespones: [],
  addJsonResponses: () =>
    set((state) => ({ jsonRespones: state.jsonRespones })),
}));
export default useBearStore;
