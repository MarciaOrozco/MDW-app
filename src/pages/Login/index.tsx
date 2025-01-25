import { signInWithEmailAndPassword } from "firebase/auth";
import { ChangeEvent, useState } from "react";
import { auth } from "../../config/firebase";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLogIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center  font-mono">
      <div className="w-full max-w-md bg-gray-50 text-stone-700 rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">log In</h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="email">
              email
            </label>
            <input
              id="email"
              type="email"
              onChange={handleEmailChange}
              className="w-full px-4 py-2 rounded-lg bg-white text-gray-500 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-rose-200"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="password"
            >
              password
            </label>
            <input
              id="password"
              type="password"
              onChange={handlePasswordChange}
              className="w-full px-4 py-2 rounded-lg bg-white text-gray-500 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-rose-200"
            />
          </div>
          <button
            type="button"
            onClick={handleLogIn}
            className="w-full bg-gray-400 hover:bg-rose-200 text-white font-bold py-2 px-4 rounded-lg transition duration-300 hover:bg-opacity-65"
          >
            log In
          </button>
        </form>
        <p className="text-sm text-gray-400 mt-4 text-center">
          don't have an account?{" "}
          <a
            href="/signup"
            className="text-gray-700 font-bold hover:underline hover:text-rose-300 hover:text-opacity-55"
          >
            sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LogIn;
