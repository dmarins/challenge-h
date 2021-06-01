import { toast, ToastOptions } from 'react-toastify';

class Notification {
  static config: ToastOptions = {
    position: 'top-right',
    autoClose: 7000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  static showError(message: string) {
    toast.error(message, this.config);
  }
}

export default Notification;
