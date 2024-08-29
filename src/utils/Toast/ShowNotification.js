import { toast } from "react-toastify";
import NotificationToast from "./NotificationToast";
const showNotification = (
  type,
  message,
  options = {},
  onAction = null,
  actionLabel = null
) => {
  const toastOptions = {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: true,
    pauseOnHover: false,
    closeOnClick: false,
    onClick: onAction ? () => onAction() : undefined,
    ...options,
  };

  const content = (
    <NotificationToast message={message} actionLabel={actionLabel} />
  );

  switch (type) {
    case "success":
      toast.success(content, toastOptions);
      break;
    case "warning":
      toast.warn(content, toastOptions);
      break;
    case "info":
      toast.info(content, toastOptions);
      break;
    case "error":
    default:
      toast.error(content, toastOptions);
      break;
  }
};

export default showNotification;
