import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Credit} from "../../models/credit";

@Component({
  selector: 'app-new-credit',
  templateUrl: './new-credit.component.html',
  styleUrls: ['./new-credit.component.scss']
})
export class NewCreditComponent {
  public creditForm: any = new FormGroup({
    vehiclePrice: new FormControl('', [Validators.required, Validators.min(1)]),
    feeNumber: new FormControl(null, [Validators.required, Validators.min(8)]),
    initialFeeAmount: new FormControl(null, [Validators.required, Validators.min(1)]),
    url: new FormControl('', [Validators.required, Validators.min(1)]),
    gracePeriodFeeNumber: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(6)]),
    notarialCosts: new FormControl(null, [Validators.required, Validators.min(1)]),
    registerCosts: new FormControl(null, [Validators.required, Validators.min(1)]),
    gps: new FormControl(null, [Validators.required, Validators.min(1)]),
    ports: new FormControl(null, [Validators.required, Validators.min(1)]),
    administrationBills: new FormControl(null, [Validators.required, Validators.min(1)]),

    interestRatePercentage: new FormControl('', [Validators.required, Validators.min(0), Validators.max(100)]),
    lifeInsurancePercentage: new FormControl('', [Validators.required, Validators.min(0), Validators.max(100)]),
    riskInsurancePercentage: new FormControl('', [Validators.required, Validators.min(0), Validators.max(100)]),

    initialDate: new FormControl('', [Validators.required]),
    finalDate: new FormControl('', [Validators.required]),

  })
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
  createCredit() {
    if(this.creditForm.valid) {
      const formData = this.creditForm.value;
      const newCredit = new Credit(formData);
      // Puedes hacer algo con la instancia de CreditData aquí
      console.log('Nuevo crédito:', newCredit);
    } else {
      console.log('Invalid form');
    }
  }

}
