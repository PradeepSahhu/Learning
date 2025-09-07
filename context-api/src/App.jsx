import { useContext, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { HeroContext } from "./context/heroContext";

function App() {
  const [name, setName] = useState();
  return (
    <HeroContext.Provider value={{ name, setName }}>
      <ReportHero />
    </HeroContext.Provider>
  );
}

function ReportHero() {
  const { name, setName } = useContext(HeroContext);

  return (
    <>
      <input onChange={(e) => setName(e.target.value)} />
      <div>The Hero Is : {name}</div>
    </>
  );
}

export default App;
