import { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "../firebase";

export default function Login() {
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

        window.location.href = "/";
      } else {
        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

       window.location.href = "/";
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">

      <div className="bg-slate-800 p-10 rounded-3xl w-[400px] space-y-5">

        <h1 className="text-4xl font-bold text-center">
          {signup ? "Signup" : "Login"}
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded-xl bg-slate-700"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded-xl bg-slate-700"
        />

        <button
          onClick={handleAuth}
          className="w-full bg-indigo-500 py-3 rounded-xl"
        >
          {signup ? "Signup" : "Login"}
        </button>

        <p
          className="text-center cursor-pointer"
          onClick={() => setSignup(!signup)}
        >
          {signup
            ? "Already have account? Login"
            : "Create Account"}
        </p>

      </div>

    </div>
  );
}