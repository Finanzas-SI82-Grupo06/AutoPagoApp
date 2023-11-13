import {FormControl, Validators} from "@angular/forms";

export class Validations {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.min(1)]);
  vehiclePrice = new FormControl(null, [Validators.required, Validators.min(1)]);
  feeNumber = new FormControl(null, [Validators.required, Validators.min(8)]);
  initialFeeAmount = new FormControl(null, [Validators.required, Validators.min(1)]);
  url = new FormControl('', [Validators.required, Validators.min(1)]);
  gracePeriod = new FormControl(null, [Validators.required, Validators.min(0), Validators.max(6)]);
  notarialCosts = new FormControl(null, [Validators.required, Validators.min(1)]);
  registerCosts = new FormControl(null, [Validators.required, Validators.min(1)]);
  gps = new FormControl(null, [Validators.required, Validators.min(1)]);
  ports = new FormControl(null, [Validators.required, Validators.min(1)]);
  administrationBills = new FormControl(null, [Validators.required, Validators.min(1)]);

  interestRatePercentage = new FormControl('', [Validators.required, Validators.min(0), Validators.max(100)]);
  lifeInsurancePercentage = new FormControl('', [Validators.required, Validators.min(0), Validators.max(100)]);
  riskInsurancePercentage = new FormControl('', [Validators.required, Validators.min(0), Validators.max(100)]);

  initialDate = new FormControl<Date | null>(null, [Validators.required]);
  finalDate = new FormControl<Date | null>(null, [Validators.required]);

  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Debes ingresar un correo';
    }

    return this.email.hasError('email') ? 'No es un correo válido' : '';
  }

  getPasswordErrorMessage() {
    return 'Debes ingresar una contraseña';
  }

  getRangeErrorMessage() {
    return 'Debes ingresar un número válido';
  }

  getStringErrorMessage() {
    return 'Debes ingresar un url válido';
  }

  getPercentageRangeErrorMessage() {
    return 'Debes ingresar un porcentaje válido';
  }

  getDateErrorMessage() {
    return 'Debes ingresar una fecha válida';
  }
}
