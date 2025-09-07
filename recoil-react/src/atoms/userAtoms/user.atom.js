import axios from "axios";
import { atom, selector } from "recoil";

const API_KEY = `boK4DyI50ufKkFRc4gUYUA==wJEQQl5zAoz9WPWe`;
export const userAtom = atom({
  key: "userAtom",
  default: {
    firstName: "",
    lastName: "",
  },
});

export const RandomAtom = atom({
  key: "RandomAtom",
  default: selector({
    key: "RandomUserSelector",
    get: async () => {
      const res = await axios.get("https://api.api-ninjas.com/v1/randomuser", {
        headers: {
          "X-Api-Key": `${API_KEY}`,
          Accept: "application/json",
        },
      });

      console.log(res.data);
      //   setRandomUser(res.data);
      return res.data;
    },
  }),
});
