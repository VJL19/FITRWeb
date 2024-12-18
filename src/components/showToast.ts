import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const showSuccessToast = (
  message: string | undefined,
  containerId: string
) => {
  return toast.success(message, {
    position: "top-right",
    autoClose: 5000,
    containerId: containerId,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });
};
export const showFailedToast = (
  message: string | undefined,
  containerId: string
) => {
  return toast.error(message, {
    position: "top-right",
    autoClose: 5000,
    containerId: containerId,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });
};
