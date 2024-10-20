// toastUtil.ts
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

/**
 * @author Emmanuel Lucky
*/

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }
});

// Export the Toast instance
export const showToast = (icon: 'success' | 'error' | 'warning' | 'info', title: string) => {
  Toast.fire({
    icon: icon,
    title: title,
  });
};
