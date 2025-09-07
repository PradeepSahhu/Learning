import { atom, selector } from "recoil";

export const networkAtom = atom({
  key: "networkAtom",
  default: [],
});

export const networkSelector = selector({
  key: "networkSelector",
  get: ({ get }) => {
    const networkCount = get(networkAtom);

    return networkCount.length;
  },
});
