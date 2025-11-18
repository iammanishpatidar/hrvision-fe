import { toast } from 'react-hot-toast';

type ToastOptions = {
  message: string;
  status: 'success' | 'error' | 'loading';
  id?: string;
  duration?: number;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  backgroundColor?: string;
  textColor?: string;
  iconPrimaryColor?: string;
  iconSecondaryColor?: string;
  padding?: string;
  fontSize?: string;
  fontWeight?: number;
  margin?: string;
  zIndex?: number;
};

export const handleToast = ({
  message,
  status,
  id,
  duration = 4000,
  position = 'bottom-left',
  backgroundColor = status === 'success' ? '#1e88e5' : '#ff4d4d',
  textColor = '#ffffff',
  iconPrimaryColor = status === 'success' ? '#e3f2fd' : '#ffffff',
  iconSecondaryColor = status === 'success' ? '#1e88e5' : '#ff4d4d',
  padding = '10px 20px',
  fontSize = '16px',
  fontWeight = 600,
  margin = '0 0 40px 15px',
  zIndex = 50,
}: ToastOptions) => {
  const toastOptions = {
    duration,
    position,
    style: {
      background: backgroundColor,
      color: textColor,
      padding,
      fontSize,
      fontWeight,
      margin,
      zIndex,
    },
    iconTheme: {
      primary: iconPrimaryColor,
      secondary: iconSecondaryColor,
    },
    id,
  };

  let toastId;

  // If an id is provided, update the existing toast
  if (id) {
    if (status === 'success') {
      toast.success(message, { ...toastOptions, id });
    } else if (status === 'loading') {
      toast.loading(message, { ...toastOptions, id });
    } else {
      toast.error(message, { ...toastOptions, id });
    }
    return id;
  }

  // Otherwise create a new toast
  if (status === 'success') {
    toastId = toast.success(message, toastOptions);
  } else if (status === 'loading') {
    toastId = toast.loading(message, toastOptions);
  } else {
    toastId = toast.error(message, toastOptions);
  }

  return toastId;
};
