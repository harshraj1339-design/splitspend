import { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const [user, setUser] = useState(
    localStorage.getItem("user")
  );

  return (
    <>
      {user ? (
        <Dashboard />
      ) : (
        <Login setUser={setUser} />
      )}
    </>
  );
}