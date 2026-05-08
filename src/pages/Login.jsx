import { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "../firebase";

export default function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signup, setSignup] = useState(false);

  const handleAuth = async () => {
    try {
      if (signup) {
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
      } else {
        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
      }

      localStorage.setItem("user", email);
      setUser(email);

    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="bg-slate-900 p-10 rounded-3xl w-[350px] shadow-2xl">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          {signup ? "Signup" : "Login"}
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded-xl mb-4 bg-slate-800 text-white"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded-xl mb-6 bg-slate-800 text-white"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleAuth}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl"
        >
          {signup ? "Signup" : "Login"}
        </button>

        <p
          className="text-center text-slate-400 mt-5 cursor-pointer"
          onClick={() => setSignup(!signup)}
        >
          {signup
            ? "Already have account? Login"
            : "Create new account"}
        </p>
      </div>
    </div>
  );
}