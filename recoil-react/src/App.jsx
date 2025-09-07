import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {
  selector,
  useRecoilState,
  useRecoilValue,
  useRecoilValueLoadable,
  useSetRecoilState,
} from "recoil";
import { RandomAtom, userAtom } from "./atoms/userAtoms/user.atom";
import {
  networkAtom,
  networkSelector,
} from "./atoms/networkCount/network.atom";
import axios from "axios";
import { TodoAtomFamily } from "./atoms/TODO/todo.atom.family";

// const API_KEY = `boK4DyI50ufKkFRc4gUYUA==wJEQQl5zAoz9WPWe`;

function App() {
  return (
    <>
      <RandomData />

      <APIEffect />

      <hr></hr>

      <TODO id={1} />
      <TODO id={2} />
      <TODO id={3} />
    </>
  );
}

function RandomData() {
  const [user, setUser] = useRecoilState(userAtom);

  const setNetworkState = useSetRecoilState(networkAtom);

  const networrkState = useRecoilValue(networkAtom);

  const handleChange = (value) => {
    setUser({
      ...user,
      firstName: value,
    });
  };

  const networkCount = useRecoilValue(networkSelector);
  const networkLoadabale = useRecoilValueLoadable(networkSelector);

  if (networkLoadabale.state === "loading") {
    return <div>Loading</div>;
  } else if (networkLoadabale.state === "hasError") {
    return <div>Error</div>;
  }

  const addNetwork = () => {
    if (!user.firstName && !user.lastName) {
      return;
    }

    setNetworkState((value) => [...value, user]);
  };

  return (
    <>
      <div>
        <input onChange={(e) => handleChange(e.target.value)}></input>
        <input
          onChange={(e) => setUser({ ...user, lastName: e.target.value })}
        ></input>
        <br></br>
        <div>
          <p>{user.firstName}</p>
          <p>{user.lastName}</p>
        </div>

        <button onClick={addNetwork}>Submit</button>

        <br></br>
        <hr />

        <h2>Showing all network {networkCount}</h2>

        {networrkState.map((item) => (
          <div>
            {item.firstName} + {item.lastName}
          </div>
        ))}
      </div>
    </>
  );
}

function APIEffect() {
  const [randomUser, setRandomUser] = useRecoilState(RandomAtom);
  // useEffect(() => {
  //   axios
  //     .get("https://api.api-ninjas.com/v1/randomuser", {
  //       headers: {
  //         "X-Api-Key": `${API_KEY}`,
  //         Accept: "application/json",
  //       },
  //     })
  //     .then((res) => {
  //       console.log(res.data);
  //       setRandomUser(res.data);
  //     });
  // }, []);

  return (
    <>
      <div>The random user is : {randomUser.address}</div>
      <div>The random user is : {randomUser.birthday}</div>
      <div>The random user is : {randomUser.email}</div>
      <div>The random user is : {randomUser.sex}</div>
      <div>The random user is : {randomUser.name}</div>
      <div>The random user is : {randomUser.username}</div>
    </>
  );
}

function TODO({ id }) {
  const [todo, setTodo] = useRecoilState(TodoAtomFamily(id));
  return (
    <>
      <div>Title : {todo.title}</div>
      <div>Work : {todo.content}</div>
      <br></br>
    </>
  );
}

export default App;
