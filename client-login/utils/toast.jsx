import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Import default styles

export const handleSuccess = (msg) => {
  toast.success(msg, {
    position: "top-center",
    autoClose: 5000,
    className: 'toast-success', 
    bodyClassName: 'toast', 
  });
};

export const handleError = (msg) => {
  toast.error(msg, {
    position: "top-center",
    autoClose: 5000,
    className: 'toast-error',
    bodyClassName: 'toast', 
  });
};
