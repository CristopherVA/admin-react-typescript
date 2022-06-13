import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Auth } from "../../interfaces";
import { useLoginMutation } from "../../services/authApi";

const LoginPage = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [login] = useLoginMutation();

  const onSubmit = async (data: Auth): Promise<void> => {
    await login(data)
      .then((res) => {
        if (res.error) {
          // Seteando error
          const { error } = res;
          const { data } = error;
          setError(data.msg);
        }

        if (res.data) {
          const { data } = res || {};
          const { token, id, name, email } = data || {};
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify({ id, name, email }));
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-slate-500">
      <div className="p-4  bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <h5 className="text-xl font-medium text-gray-900 dark:text-white">
            Login to Admin Dashboard
          </h5>
          <div>
            {error && <p className="text-red-500">{error}</p>}

            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Correo
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              type="email"
              {...register("email", { required: true })}
              placeholder="name@company.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">El campo es obligatorio</p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Contraseña
            </label>
            <input
              type="password"
              {...register("password", { required: true })}
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">El campo es obligatorio</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
