import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { signUpSchema } from "./validations";
import { joiResolver } from "@hookform/resolvers/joi";
import { useState } from "react";

type FormValues = {
  email: string;
  password: string;
  repeatPassword: string;
};

const SignUp = () => {
  const navigate = useNavigate();
  const [firebaseError, setFirebaseError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: joiResolver(signUpSchema),
  });

  const handleSignUp = handleSubmit(async (data) => {
    setFirebaseError(null);
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      navigate("/");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        setFirebaseError("Email is already in use.");
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
        onSubmit={handleSignUp}
        className="w-full max-w-md bg-gray-50 rounded-lg shadow-lg p-8"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">
          Sign Up
        </h2>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 py-2"
          >
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
            } focus:outline-none`}
          />
          {errors?.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 py-2"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register("password")}
            className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2  ${
              errors?.password
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-rose-200"
            } focus:outline-none`}
          />
          {errors?.password && (
            <p className="text-red-600 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="mb-6">
          <label
            htmlFor="repeatPassword"
            className="block text-sm font-medium text-gray-700 py-2"
          >
            Repeat password
          </label>
          <input
            id="repeatPassword"
            type="password"
            {...register("repeatPassword")}
            className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 ${
              errors?.repeatPassword
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-rose-200"
            } focus:outline-none`}
          />
          {errors?.repeatPassword && (
            <p className="text-red-600 text-sm mt-1">
              {errors.repeatPassword.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="w-full hover:bg-[#d1919b]  bg-[#b9757f] text-white font-bold py-2 px-4 rounded-lg transition duration-300 "
        >
          Sign up
        </button>
        <div className="pt-4">
          {firebaseError && (
            <p className="text-red-600 text-sm mb-4 text-center">
              {firebaseError}
            </p>
          )}
        </div>
        <p className="text-sm text-gray-600 mt-4 text-center">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-gray-700 font-bold hover:underline hover:text-rose-300 hover:text-opacity-55"
          >
            Log In
          </a>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
