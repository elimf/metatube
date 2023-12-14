import { toast, ToastOptions, ToastItem } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type ToastType = "success" | "error" | "warning" | "info";

const showToast = (
  text: string,
  type: ToastType = "info",
  onClose?: () => void
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

  let toastFunction;
  switch (type) {
    case "success":
      toastFunction = toast.success;
      break;
    case "error":
      toastFunction = toast.error;
      break;
    case "warning":
      toastFunction = toast.warn;
      break;
    case "info":
      toastFunction = toast.info;
      break;
    default:
      break;
  }

  if (toastFunction) {
    toastFunction(text, toastOptions);
    toast.onChange((payload: ToastItem) => {
      switch (payload.status) {
        case "added":
          break;
        case "updated":
          break;
        case "removed":
          console.log("removed");
          if (onClose) {
            onClose();
          }
          break;
      }
    });
  }
};

export default showToast;
