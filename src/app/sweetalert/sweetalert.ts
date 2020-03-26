import Swal from 'sweetalert2';
class SweetAlert {

    constructor() {

    }

    messageSuccess(message:string) {
        return Swal.fire({
            allowOutsideClick:false,
            icon: 'success',
            title: 'Success',
            text: message,
        });
    }

    messageError(message: string) {
        return Swal.fire({
            allowOutsideClick:false,
            icon: 'error',
            title: 'Error',
            text: message,
        });
    }

}

export {
    SweetAlert
}