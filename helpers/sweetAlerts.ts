import { AnyCallback } from '../types/callback';
import Swal from 'sweetalert2/src/sweetalert2';

const default_settings = {
  allowOutsideClick: false,
  allowEscapeKey: false,
  allowEnterKey: false,
};

export const showAlert = (
  title: string,
  text: string,
  callback: AnyCallback | undefined = undefined,
) =>
  Swal.fire({
    title,
    text,
    ...default_settings,
  }).then(() => {
    if (callback) {
      callback();
    }
  });

export const showConfirm = (
  text: string,
  confirmCallback: () => any,
  postCallback: AnyCallback | undefined = undefined,
) =>
  Swal.fire({
    title: 'Are you sure?',
    text,
    confirmButtonText: 'Yes',
    showCancelButton: true,
    cancelButtonText: 'No',
    ...default_settings,
  }).then((result: { isConfirmed: boolean }) => {
    if (postCallback) {
      postCallback();
    }

    if (result.isConfirmed) {
      confirmCallback();
    }
  });
