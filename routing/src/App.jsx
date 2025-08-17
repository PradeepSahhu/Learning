import Home from "./pages/Home";
import React, { Suspense } from "react";
// import Dashboard from "./pages/Dashboard";
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

function NavigationComponent() {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <button onClick={() => navigate("/")}>Home</button>
        <button onClick={() => navigate("/Dashboard")}>Dashboard</button>
      </div>
    </>
  );
}
function App() {
  return (
    <>
      <BrowserRouter>
        <NavigationComponent />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/Dashboard"
            element={
              <Suspense fallback={"loading..."}>
                {" "}
                <Dashboard />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
