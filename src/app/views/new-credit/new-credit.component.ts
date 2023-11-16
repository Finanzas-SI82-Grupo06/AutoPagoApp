import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Credit} from "../../models/credit";
import {CreditService} from "../../services/credit.service";
import {ResultsService} from "../../services/results.service";

@Component({
  selector: 'app-new-credit',
  templateUrl: './new-credit.component.html',
  styleUrls: ['./new-credit.component.scss']
})
export class NewCreditComponent {
  tem: number = 0;
  saldoinicial: number = 0;
  saldo: number = 0;
  saldofinal: number = 0;
  interes: number =0;
  desgravamen: number = 0;
  cuota: number = 0;
  amortizacion: number = 0;
  flujo: number = 0;
  form: any;
  periodoGracia: number = 0;

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

  constructor(private creditService: CreditService, private resultsService: ResultsService) {
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
  createCredit() {
    if(this.creditForm.valid) {
      const formData = this.creditForm.value;
      const newCredit = new Credit(formData);
      this.creditService.create(newCredit).subscribe(() => {
        console.log('Nuevo crédito:', newCredit);

        this.periodoGracia=newCredit.gracePeriodFeeNumber;
        this.tem=(Math.pow((1+(newCredit.interestRatePercentage/100)), 30/360))-1;
        console.log("TEM: ", this.tem)
        this.saldoinicial=(newCredit.vehiclePrice-newCredit.initialFeeAmount)+newCredit.notarialCosts+newCredit.registerCosts;
        this.saldo=this.saldoinicial;
        for (let i = 1; i <= newCredit.feeNumber; i++) {
          if(this.periodoGracia!=0){
            console.log("SALDO EN FOR (", i, ") :",this.saldo);
            this.interes=this.tem*this.saldo;
            this.desgravamen=(newCredit.lifeInsurancePercentage/100)*this.saldo;
            this.cuota=this.desgravamen;
            this.amortizacion=0;
            this.saldofinal=this.saldo+this.interes+this.amortizacion;
            this.flujo=this.cuota+((newCredit.riskInsurancePercentage/100)*newCredit.vehiclePrice)+newCredit.gps+newCredit.ports+newCredit.administrationBills;

            this.form={
              interest: this.interes,
              lifeInsurance: this.desgravamen,
              fee: this.cuota,
              amortization: this.amortizacion,
              balance: this.saldo,
              finalBalance: this.saldofinal,
              flow: this.flujo,
              riskInsurance: newCredit.vehiclePrice*(newCredit.riskInsurancePercentage/100),
              gps: newCredit.gps,
              ports: newCredit.ports,
              adminBills: newCredit.administrationBills,
              creditId: newCredit.id
            }
            this.saldo=this.saldofinal;
            this.periodoGracia--;

            this.resultsService.create(this.form).subscribe(() => {
              console.log('Nuevo resultado G (' , i, ') :', this.form);
            });
          }
          else{
            console.log("SALDO EN FOR (", i, ") :",this.saldo);

            this.interes=this.saldo*this.tem;
            this.desgravamen=(newCredit.lifeInsurancePercentage/100)*this.saldo;
            this.cuota=(this.saldo*(this.tem+(newCredit.lifeInsurancePercentage/100)))/(1-(Math.pow(1+(this.tem+(newCredit.lifeInsurancePercentage/100)),-(newCredit.feeNumber-(i-1)))));
            this.amortizacion=this.cuota-this.interes-this.desgravamen;
            this.saldofinal=this.saldo-this.amortizacion;
            this.flujo=this.cuota+(newCredit.vehiclePrice*(newCredit.riskInsurancePercentage/100))+newCredit.gps+newCredit.ports+newCredit.administrationBills;

            this.form={
              id: 0,
              interest: this.interes,
              lifeInsurance: this.desgravamen,
              fee: this.cuota,
              amortization: this.amortizacion,
              balance: this.saldo,
              finalBalance: this.saldofinal,
              flow: this.flujo,
              riskInsurance: newCredit.vehiclePrice*(newCredit.riskInsurancePercentage/100),
              gps: newCredit.gps,
              ports: newCredit.ports,
              adminBills: newCredit.administrationBills,
              creditId: newCredit.id
            }
            this.saldo=this.saldofinal;

            this.resultsService.create(this.form).subscribe(() => {
              console.log('Nuevo resultado S (' , i, ') :', this.form);
            });
          }
        }
      });
    } else {
      console.log('Invalid form');
    }
  }
}
