import {FormControl, Validators} from "@angular/forms";

export class Validations {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.min(1)]);

  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Debes ingresar un correo';
    }

    return this.email.hasError('email') ? 'No es un correo válido' : '';
  }

  getPasswordErrorMessage() {
    return 'Debes ingresar una contraseña';
  }

}
