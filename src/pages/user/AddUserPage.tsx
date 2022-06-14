import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import moment from "moment";
import { confirmLocationUpdate } from "../../helpers/confirmLocationUpdate";

import {
  useAddUserMutation,
  useGetOneUserQuery,
  useGetUserQuery,
  useUpdateUserMutation,
} from "../../services/userApi";

import { ToastError, ToastSuccess } from "../../components/Toast";

const AddUserPage = () => {
  const [error, setError] = useState<boolean>(false);

  const navigate = useNavigate();

  const location = useLocation();

  const { id }: any = useParams();

  const userId: number = parseInt(id);

  const notifySuccess = (message: string) => toast.success(message);
  const notifyError = (message: string) => toast.error(message);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  // Methods to use the mutation
  const dataPagination = { to: "0", from: "5" };
  const { refetch } = useGetUserQuery(dataPagination);

  const [addUser] = useAddUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const { data } = useGetOneUserQuery(userId) || {};

  const handleSetValue = (data: any) => {
    setValue("name", data?.user?.name);
    setValue("firstLastName", data?.user?.firstLastName);
    setValue("secondLastName", data?.user?.secondLastName);
    setValue("cedula", data?.user?.cedula);
    setValue("edad", data?.user?.edad);
    setValue("gender", data?.user?.gender);
    setValue("address", data?.user?.address);
    setValue("telephone", data?.user?.telephone);
    setValue("email", data?.user?.email);
    setValue("civilStatu", data?.user?.civilStatu);
    setValue("haveChild", data?.user?.haveChild);
    setValue(
      "dateBirth",
      moment(data?.user?.dateBirth).format("YYYY-MM-DD") || ""
    );
  };

  useEffect(() => {
    if (confirmLocationUpdate(location.pathname, userId)) {
      return handleSetValue(data);
    }
  }, [data]);

  const onSubmit = async (data: any): Promise<void> => {
    switch (location.pathname) {
      case "/user/create":
        try {
          await addUser(data);
          setError(false);
          notifySuccess("Usuario creado correctamente");
          refetch();
          navigate("/user");
        } catch (err) {
          setError(true);
          notifyError("Error al crear el usuario");
        }
        break;

      case `/user/update/${id}`:
        try {
          const dataUpdate = {
            id: userId,
            data: data,
          };
          await updateUser(dataUpdate);
          reset();
          setError(false);
          notifySuccess("Usuario actualizado exitosamente");
          refetch();
          navigate("/user");
        } catch (err) {
          setError(true);
          notifyError("Error al actuliazar el usuario");
        }
        break;
    }
  };

  return (
    <>
      {error ? <ToastError /> : <ToastSuccess />}

      <h1 className="text-4xl font-bold ">
        {confirmLocationUpdate(location.pathname, id)
          ? "Actulizar Usuario"
          : "Crear de Usuarios"}
      </h1>
      <p className="text-xl">
        {confirmLocationUpdate(location.pathname, id) ? "Actilizar" : "Agregar"}{" "}
        los usuarios que controlaran el sistema.
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-3 mt-6">
          {/* col 1 */}
          <div className="col">
            <div className="mb-6">
              <label
                htmlFor="username-success"
                className={`${
                  errors.name
                    ? "block mb-2 text-sm font-medium text-red-700 dark:text-red-500"
                    : "block mb-2 text-sm font-medium text-grat-700 dark:text-gray-500"
                }`}
              >
                Nombre
              </label>
              <input
                type="text"
                className={`${
                  errors.name
                    ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400border-red-500 "
                    : "bg-green-50 border border-gray-500 text-gray-900 placeholder-gray-700 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-400"
                }`}
                {...register("name", { required: true })}
                placeholder="Tu nombre"
              />
              {errors.name && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  <span className="font-medium">Oops!</span> El Nombre es
                  requirido
                </p>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="username-success"
                className={`${
                  errors.lastName
                    ? "block mb-2 text-sm font-medium text-red-700 dark:text-red-500"
                    : "block mb-2 text-sm font-medium text-grat-700 dark:text-gray-500"
                }`}
              >
                Primer Apellido
              </label>
              <input
                type="text"
                className={`${
                  errors.lastName
                    ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400border-red-500 "
                    : "bg-green-50 border border-gray-500 text-gray-900 placeholder-gray-700 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-400"
                }`}
                {...register("firstLastName", { required: true })}
                placeholder="Primer apellido"
              />
              {errors.name && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  <span className="font-medium">Oops!</span> El Primer Apellido
                  es requirido
                </p>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="username-success"
                className={`${
                  errors.secondLastName
                    ? "block mb-2 text-sm font-medium text-red-700 dark:text-red-500"
                    : "block mb-2 text-sm font-medium text-grat-700 dark:text-gray-500"
                }`}
              >
                Segundo Apellido
              </label>
              <input
                type="text"
                className={`${
                  errors.secondLastName
                    ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400border-red-500 "
                    : "bg-green-50 border border-gray-500 text-gray-900 placeholder-gray-700 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-400"
                }`}
                {...register("secondLastName", { required: true })}
                placeholder="Segundo apellido"
              />
              {errors.name && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  <span className="font-medium">Oops!</span> El Segundo Apellido
                  es requirido
                </p>
              )}
            </div>
            <div className="mb-6">
              <label
                htmlFor="username-success"
                className={`${
                  errors.cedula
                    ? "block mb-2 text-sm font-medium text-red-700 dark:text-red-500"
                    : "block mb-2 text-sm font-medium text-grat-700 dark:text-gray-500"
                }`}
              >
                Cedula
              </label>
              <input
                type="number"
                className={`${
                  errors.cedula
                    ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400border-red-500 "
                    : "bg-green-50 border border-gray-500 text-gray-900 placeholder-gray-700 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-400"
                }`}
                {...register("cedula", { required: true })}
                placeholder="Cedula"
              />
              {errors.name && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  <span className="font-medium">Oops!</span> La Cedula es
                  requirida
                </p>
              )}
            </div>
            <div className="mb-6">
              <label
                htmlFor="username-success"
                className={`${
                  errors.edad
                    ? "block mb-2 text-sm font-medium text-red-700 dark:text-red-500"
                    : "block mb-2 text-sm font-medium text-grat-700 dark:text-gray-500"
                }`}
              >
                Edad
              </label>
              <input
                type="number"
                className={`${
                  errors.name
                    ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400border-red-500 "
                    : "bg-green-50 border border-gray-500 text-gray-900 placeholder-gray-700 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-400"
                }`}
                {...register("edad", { required: true })}
                placeholder="Edad"
              />
              {errors.edad && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  <span className="font-medium">Oops!</span> La edad es
                  requirida
                </p>
              )}
            </div>
            <div className="mb-6">
              <label
                htmlFor="username-success"
                className={`${
                  errors.gender
                    ? "block mb-2 text-sm font-medium text-red-700 dark:text-red-500"
                    : "block mb-2 text-sm font-medium text-grat-700 dark:text-gray-500"
                }`}
              >
                Genero
              </label>
              <select
                className={`${
                  errors.gender
                    ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400border-red-500 "
                    : "bg-green-50 border border-gray-500 text-gray-900 placeholder-gray-700 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-400"
                }`}
                {...register("gender", { required: true })}
              >
                <option value="Mujer">Mujer</option>
                <option value="Hombre">Hombre</option>
                <option value="Otros">Otros</option>
              </select>

              {errors.gender && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  <span className="font-medium">Oops!</span> El genero es
                  requirido
                </p>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="username-success"
                className={`${
                  errors.address
                    ? "block mb-2 text-sm font-medium text-red-700 dark:text-red-500"
                    : "block mb-2 text-sm font-medium text-grat-700 dark:text-gray-500"
                }`}
              >
                Direccion
              </label>
              <input
                type="text"
                className={`${
                  errors.adress
                    ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400border-red-500 "
                    : "bg-green-50 border border-gray-500 text-gray-900 placeholder-gray-700 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-400"
                }`}
                {...register("address", { required: true })}
                placeholder="Direccion"
              />
              {errors.address && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  <span className="font-medium">Oops!</span> La Direccion es
                  requirido
                </p>
              )}
            </div>
          </div>
          {/* col-2 */}
          <div className="col">
            <div className="mb-6">
              <label
                htmlFor="username-success"
                className={`${
                  errors.telephone
                    ? "block mb-2 text-sm font-medium text-red-700 dark:text-red-500"
                    : "block mb-2 text-sm font-medium text-grat-700 dark:text-gray-500"
                }`}
              >
                Telefono
              </label>
              <input
                type="number"
                className={`${
                  errors.telephone
                    ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400border-red-500 "
                    : "bg-green-50 border border-gray-500 text-gray-900 placeholder-gray-700 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-400"
                }`}
                {...register("telephone", { required: true })}
                placeholder="Telefono"
              />
              {errors.name && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  <span className="font-medium">Oops!</span> El telefono es
                  requirido
                </p>
              )}
            </div>
            <div className="mb-6">
              <label
                htmlFor="username-success"
                className={`${
                  errors.email
                    ? "block mb-2 text-sm font-medium text-red-700 dark:text-red-500"
                    : "block mb-2 text-sm font-medium text-grat-700 dark:text-gray-500"
                }`}
              >
                Email
              </label>
              <input
                type="text"
                className={`${
                  errors.email
                    ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400border-red-500 "
                    : "bg-green-50 border border-gray-500 text-gray-900 placeholder-gray-700 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-400"
                }`}
                {...register("email", { required: true })}
                placeholder="Email"
              />

              {errors.name && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  <span className="font-medium">Oops!</span> El email es
                  requirido
                </p>
              )}
            </div>
            <div className="mb-6">
              <label
                htmlFor="username-success"
                className={`${
                  errors.password
                    ? "block mb-2 text-sm font-medium text-red-700 dark:text-red-500"
                    : "block mb-2 text-sm font-medium text-grat-700 dark:text-gray-500"
                }`}
              >
                Password
              </label>
              <input
                type="password"
                className={`${
                  errors.password
                    ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400border-red-500 "
                    : "bg-green-50 border border-gray-500 text-gray-900 placeholder-gray-700 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-400"
                }`}
                {...register("password", { required: true })}
                placeholder="Password"
              />
              {errors.password && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  <span className="font-medium">Oops!</span> La contraseña es
                  requirida
                </p>
              )}
            </div>
            <div className="mb-6">
              <label
                htmlFor="username-success"
                className={`${
                  errors.civilStatu
                    ? "block mb-2 text-sm font-medium text-red-700 dark:text-red-500"
                    : "block mb-2 text-sm font-medium text-grat-700 dark:text-gray-500"
                }`}
              >
                Estado Civil
              </label>

              <select
                className={`${
                  errors.civilStatu
                    ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400border-red-500 "
                    : "bg-green-50 border border-gray-500 text-gray-900 placeholder-gray-700 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-400"
                }`}
                {...register("civilStatu", { required: true })}
              >
                <option value="Soltero">Soltero</option>
                <option value="Casado">Cadado</option>
                <option value="Union Libre">Union Libre</option>
              </select>
              {errors.civilStatu && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  <span className="font-medium">Oops!</span> El Estado Civil es
                  requirido
                </p>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="username-success"
                className={`${
                  errors.haveChild
                    ? "block mb-2 text-sm font-medium text-red-700 dark:text-red-500"
                    : "block mb-2 text-sm font-medium text-grat-700 dark:text-gray-500"
                }`}
              >
                Tienes Hijos
              </label>

              <select
                className={`${
                  errors.civilStatu
                    ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400border-red-500 "
                    : "bg-green-50 border border-gray-500 text-gray-900 placeholder-gray-700 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-400"
                }`}
                {...register("haveChild", { required: true })}
              >
                <option value="Si">Si</option>
                <option value="No">No</option>\{" "}
              </select>

              {errors.haveChild && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  <span className="font-medium">Oops!</span> Tiene hijo es
                  requirido
                </p>
              )}
            </div>
            <div className="mb-6">
              <label
                htmlFor="username-success"
                className={`${
                  errors.dateBirth
                    ? "block mb-2 text-sm font-medium text-red-700 dark:text-red-500"
                    : "block mb-2 text-sm font-medium text-grat-700 dark:text-gray-500"
                }`}
              >
                Fecha de nacimiento
              </label>

              <input
                type="date"
                className={`${
                  errors.dateBirth
                    ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400border-red-500 "
                    : "bg-green-50 border border-gray-500 text-gray-900 placeholder-gray-700 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-400"
                }`}
                {...register("dateBirth", { required: true })}
                placeholder="Fecha de nacimiento"
              />
              {errors.dateBirth && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  <span className="font-medium">Oops!</span> La fecha de
                  nacimiento es requirida
                </p>
              )}
            </div>
          </div>
        </div>
        <button
          type="submit"
          className={`text-lg text-white font-bold ${
            confirmLocationUpdate(location.pathname, id)
              ? "bg-orange-500 rounded-lg py-2 px-4 hover:bg-orange-700 ease-in duration-200"
              : "bg-blue-500 rounded-lg py-2 px-4 hover:bg-blue-700 ease-in duration-200"
          } `}
        >
          {confirmLocationUpdate(location.pathname, id)
            ? "Actualizar"
            : "Crear"}
        </button>
      </form>
    </>
  );
};

export default AddUserPage;
