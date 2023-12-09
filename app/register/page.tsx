"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler, Resolver } from "react-hook-form";

type FormDataRegister = {
  email: string;
  password: string;
  pseudo: string;
};

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const resolver: Resolver<FormDataRegister> = async (values) => {
  return {
    values: values.email && values.password && values.pseudo ? values : {},
    errors: {
      ...(values.email
        ? {}
        : { email: { type: "required", message: "Email is required" } }),
      ...(values.password
        ? {}
        : { password: { type: "required", message: "Password is required" } }),
      ...(values.password && !passwordRegex.test(values.password)
        ? { password: { type: "pattern", message: "Invalid password format" } }
        : {}),
      ...(values.pseudo
        ? {}
        : { pseudo: { type: "required", message: "Pseudo is required " } }),
    },
  };
};
const Register: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataRegister>({ resolver });
  const [showPassword, setShowPassword] = useState(false);
  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6 text-center text-white">
            <span className="bg-gradient-to-r text-transparent from-blue-500 to-purple-500 bg-clip-text">
              Register
            </span>
          </h2>
          <form onSubmit={onSubmit}>
            <div className="mb-6">
              <label
                htmlFor="pseudo"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                <i className="fas fa-user mr-2"></i>Pseudo
              </label>
              <div>
                <input
                  id="pseudo"
                  type="text"
                  className={`shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors?.pseudo ? "border-red-500" : ""
                  }`}
                  placeholder="Enter your pseudo"
                  {...register("pseudo")}
                />
                {errors?.pseudo && (
                  <p className="text-red-500 text-xs italic">
                    {errors.pseudo.message}
                  </p>
                )}
              </div>
            </div>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                <i className="fas fa-envelope mr-2"></i>Email
              </label>
              <div>
                <input
                  id="email"
                  type="email"
                  className={`shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors?.email ? "border-red-500" : ""
                  }`}
                  placeholder="Enter your email"
                  {...register("email")}
                />
                {errors?.email && (
                  <p className="text-red-500 text-xs italic">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                <i className="fas fa-lock mr-2"></i>Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className={`shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors?.password ? "border-red-500" : ""
                  }`}
                  placeholder="Enter your password"
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-0 right-0 mt-2 mr-2 cursor-pointer"
                >
                  {showPassword ? (
                    <i className="fas fa-eye text-gray-500"></i>
                  ) : (
                    <i className="fas fa-eye-slash text-gray-500"></i>
                  )}
                </button>
                {errors.password && (
                  <p className="text-red-500 text-xs italic">
                    {errors?.password.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              >
                Register
              </button>
            </div>
            <div className="text-center mt-4">
              <a href="#" className="text-gray-600 hover:underline">
                Forgot password?
              </a>
            </div>
          </form>
          <p className="text-center text-gray-600 mt-6">
            You already have an account?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
