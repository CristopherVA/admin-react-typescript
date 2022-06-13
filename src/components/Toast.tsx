import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ToastSuccess = () => {
  return (
    <>
      <ToastContainer
        autoClose={3000}
        position="top-right"
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick={false}
        icon={true}
      />
    </>
  );
};

export const ToastError = () => {
  return (
    <>
      <ToastContainer
        autoClose={3000}
        position="top-right"
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick={false}
        icon={true}
      />
    </>
  );
};
