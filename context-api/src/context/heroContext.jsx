import { createContext } from "react";

export const HeroContext = createContext({
  name: "Superman",
  setName: () => {},
});
