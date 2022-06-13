import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastSuccess, ToastError } from "../../components/Toast";
import { useDeleteUserMutation, useGetUserQuery } from "../../services/userApi";

const UserPage: FC = () => {
  const [error, setError] = useState<boolean>(false);
  const [prev, setPrev] = useState<number>(0);
  const [next, setNext] = useState<number>(5);
  const navigate = useNavigate();

  let dataPagination = { to: prev.toString(), from: next.toString() };

  const notifySuccess = (message: string) => toast.success(message);
  const notifyError = (message: string) => toast.error(message);

  const handleNext = (arg: number) => {
    if (next >= countUser) {
      return false;
    } else {
      setPrev(prev + arg);
      setNext(next + arg);
    }
  };

  const handlePrev = (arg: number) => {
    if (prev <= 0 && next <= 5) {
      setPrev(0);
      setNext(5);
    } else {
      setNext(5);
      setPrev(prev - arg);
      setNext(next - arg);
    }
  };

  // getUser
  const { data, isLoading, isError, isFetching, isSuccess, refetch } =
    useGetUserQuery(dataPagination);
  let countUser: number = data?.count[0].length || 0;

  // Get one user
  const handleGetOneUser = (id: number) => {
    navigate(`/user/update/${id}`);
  };

  //Delete User
  const [deleteUser] = useDeleteUserMutation();

  const handleDeleteUser = async (id: number) => {
    try {
      const res: any = await deleteUser(id);
      setError(false);
      notifySuccess(res?.data?.msg || "Delete user success");
      refetch();
    } catch (err: any) {
      setError(true);
      notifyError(err.error.data.msg || "Delete user error");
    }
  };

  return (
    <>
      {error ? <ToastError /> : <ToastSuccess />}

      <h1 className="text-4xl font-bold ">Listado de Usuarios</h1>
      <p className="text-xl">
        Listado de todos los usuarios que estan en la base de datos.
      </p>

      {isLoading && (
        <span className="text-4xl font-bold flex justify-center">
          Loading...
        </span>
      )}
      {isFetching && (
        <span className="text-4xl font-bold flex justify-center">
          Fetching...
        </span>
      )}
      {isError && (
        <span className="text-4xl font-bold flex justify-center text-red-600">
          No se pudieron cargar los datos!
        </span>
      )}

      <div className="relative mt-4 overflow-y-auto shadow-md sm:rounded-lg sm:h-[33%] nsm:bg-slate-900">
        <table className="w-full  text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-center text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Nombre
              </th>
              <th scope="col" className="px-6 py-3">
                Correo Electronico
              </th>
              <th scope="col" className="px-6 py-3">
                Genero
              </th>
              <th scope="col" className="px-6 py-3">
                <span>Action</span>
              </th>
            </tr>
          </thead>
          {isSuccess && (
            <tbody>
              {data?.user.map((item) => (
                <tr
                  key={item?.id}
                  className="bg-white border-b text-center dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                  >
                    {item?.id}
                  </th>
                  <td className="px-6 py-4">{item?.name}</td>
                  <td className="px-6 py-4">{item?.email}</td>
                  <td className="px-6 py-4">{item?.gender}</td>
                  <td className="px-6 py-4 text-c?enter">
                    <button
                      type="button"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      onClick={() => handleGetOneUser(item?.id)}
                    >
                      Editar
                    </button>

                    <button
                      type="button"
                      className="font-medium ml-3 text-blue-600 dark:text-blue-500 hover:underline"
                      onClick={() => handleDeleteUser(item?.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>

      <div className="flex justify-end items-center mt-2">
        <button
          type="button"
          onClick={() => handlePrev(5)}
          className="inline-flex items-center py-2 px-4 mr-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <svg
            className="mr-2 w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
          Previous
        </button>
        <button
          type="button"
          onClick={() => handleNext(5)}
          className="inline-flex items-center py-2 px-4 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          Next
          <svg
            className="ml-2 w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
    </>
  );
};

export default UserPage;
