import toast, { Toaster } from 'react-hot-toast';

export const notifySuccess = (msg) => {
  toast.success(msg, {
    pauseOnHover: true,
    className: 'toast-success',
  });
}
export const notifyInfo = (msg , icon) => {
  toast.success(msg, {
    icon:icon,
    style: {
      border: '1px solid var(--primary)',
      padding: '16px',
      color: ' var(--primary)',
    },
  });
};
export const notifyError = (msg) => {
  toast.error(msg, {
    pauseOnHover: true,
    className: 'toast-error',
  });
}
