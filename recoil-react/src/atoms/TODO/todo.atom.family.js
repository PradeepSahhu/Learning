import { atom, atomFamily, selectorFamily } from "recoil";
import { TODO } from "../../../public/Todo";
import axios from "axios";

export const TodoAtomFamily = atomFamily({
  key: "todoAtomFamily",
  default: (id) => TODO.find((x) => x.id == id),
});

export const todoAtomFamilySelector = atomFamily({
  key: "todoAtomFamilySelector",
  default: selectorFamily({
    key: "todoAtomFamilySelectorFamily",
    get:
      (param) =>
      async ({ get }) => {
        const res = await axios.get(
          `https://api.api-ninjas.com/v1/randomuser?sex=${param}`,
          {
            headers: {
              "X-Api-Key": `${API_KEY}`,
              Accept: "application/json",
            },
          }
        );

        return res.data;
      },
  }),
});
