import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";
import { useForm } from "react-hook-form";
import { loginSchema } from "./validations";
import { joiResolver } from "@hookform/resolvers/joi";
import { useState } from "react";

type FormValues = {
  email: string;
  password: string;
};

const LogIn = () => {
  const navigate = useNavigate();
  const [firebaseError, setFirebaseError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: joiResolver(loginSchema),
  });

  const handleLogIn = handleSubmit(async (data) => {
    setFirebaseError(null);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      navigate("/");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.code === "auth/invalid-credential") {
        setFirebaseError("Incorrect email or password.");
      } else {
        setFirebaseError(
          "An unexpected error occurred. Please try again later."
        );
      }
    }
  });

  return (
    <div className="flex items-center justify-center font-mono">
      <form
        onSubmit={handleLogIn}
        className="w-full max-w-md bg-gray-50 text-stone-700 rounded-lg shadow-lg p-8"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Log In</h2>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium py-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 ${
              errors?.email
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-rose-200"
            }`}
          />
          {errors?.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium py-2">
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register("password")}
            className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 ${
              errors?.password
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-rose-200"
            }`}
          />
          {errors?.password && (
            <p className="text-red-600 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full hover:bg-[#d1919b] bg-[#b9757f] text-white font-bold py-2 px-4 rounded-lg transition duration-300"
        >
          Log In
        </button>
        <div className="pt-4">
          {firebaseError && (
            <p className="text-red-600 text-sm mb-4 text-center">
              {firebaseError}
            </p>
          )}
        </div>

        <p className="text-sm text-gray-400 mt-4 text-center">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="text-gray-700 font-bold hover:underline hover:text-rose-300 hover:text-opacity-55"
          >
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
};

export default LogIn;
