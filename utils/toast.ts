import { toast, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type ToastType = "success" | "error" | "warning" | "info";

const showToast = (
  text: string,
  type: ToastType = "info",
): void => {
  const toastOptions: ToastOptions = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    
  };

  switch (type) {
    case "success":
      toast.success(text, toastOptions);
      break;
    case "error":
      toast.error(text, toastOptions);
      break;
    case "warning":
      toast.warn(text, toastOptions);
      break;
    case "info":
      toast.info(text, toastOptions);
      break;
  }
};

export default showToast;
