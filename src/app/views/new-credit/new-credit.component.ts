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
  cuotas: number = 0;
  createCreditForm: any;
  n: number = 0;

  public creditForm: any = new FormGroup({
    currency: new FormControl('', [Validators.required]),
    vehiclePrice: new FormControl('', [Validators.required, Validators.min(1)]),
    feeNumber: new FormControl(null, [Validators.required, Validators.min(8)]),
    initialFeeAmount: new FormControl(null, [Validators.required, Validators.min(1)]),
    url: new FormControl('', [Validators.required, Validators.min(1)]),
    gracePeriodType: new FormControl('', [Validators.required]),
    gracePeriodFeeNumber: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(6)]),
    interestRateType: new FormControl('', [Validators.required]),
    interestRatePercentage: new FormControl('', [Validators.required, Validators.min(0), Validators.max(100)]),
    notarialCosts: new FormControl(null, [Validators.required, Validators.min(1)]),
    registerCosts: new FormControl(null, [Validators.required, Validators.min(1)]),
    gps: new FormControl(null, [Validators.required, Validators.min(1)]),
    ports: new FormControl(null, [Validators.required, Validators.min(1)]),
    administrationBills: new FormControl(null, [Validators.required, Validators.min(1)]),
    lifeInsurancePercentage: new FormControl('', [Validators.required, Validators.min(0), Validators.max(100)]),
    riskInsurancePercentage: new FormControl('', [Validators.required, Validators.min(0), Validators.max(100)]),
    cok: new FormControl('', [Validators.required, Validators.min(0), Validators.max(100)]),
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
      this.creditService.create(newCredit).subscribe((response: any) => {
        this.cuotas=newCredit.feeNumber;
        this.periodoGracia=newCredit.gracePeriodFeeNumber;

        if (newCredit.interestRateType === 'nominal') {
          this.tem=(Math.pow((1+((newCredit.interestRatePercentage/100)/360)),30))-1;
        } else if (newCredit.interestRateType === 'effective') {
          this.tem=(Math.pow((1+(newCredit.interestRatePercentage/100)), 30/360))-1;
        }

        this.saldoinicial=(newCredit.vehiclePrice-newCredit.initialFeeAmount)+newCredit.notarialCosts+newCredit.registerCosts;
        this.saldo=this.saldoinicial;
        for (let i = 1; i <= this.cuotas; i++) {
          if(this.periodoGracia!==0 && newCredit.gracePeriodType==='complete'){
            this.n=i;
            this.interes=this.tem*this.saldo;
            this.desgravamen=(newCredit.lifeInsurancePercentage/100)*this.saldo;
            this.cuota=this.desgravamen;
            this.amortizacion=0;
            this.saldofinal=this.saldo+this.interes+this.amortizacion;
            this.flujo=this.cuota+((newCredit.riskInsurancePercentage/100)*newCredit.vehiclePrice)+newCredit.gps+newCredit.ports+newCredit.administrationBills;
            this.form={
              n: this.n,
              graceType: 'T',
              cok: newCredit.cok,
              interest: parseFloat((this.interes).toFixed(2)),
              lifeInsurance: parseFloat((this.desgravamen).toFixed(2)),
              fee: parseFloat((this.cuota).toFixed(2)),
              amortization: parseFloat((this.amortizacion).toFixed(2)),
              balance: parseFloat((this.saldo).toFixed(2)),
              finalBalance: parseFloat((this.saldofinal).toFixed(2)),
              flow: parseFloat((this.flujo).toFixed(2)),
              riskInsurance: parseFloat((newCredit.vehiclePrice*(newCredit.riskInsurancePercentage/100)).toFixed(2)),
              gps: newCredit.gps,
              ports: newCredit.ports,
              adminBills: newCredit.administrationBills,
              creditId: response.id
            }
            this.saldo=this.saldofinal;
            this.periodoGracia--;

            this.resultsService.create(this.form).subscribe(() => {
            });
          }
          else if(this.periodoGracia!==0 && newCredit.gracePeriodType==='partial'){
            this.n=i;
            this.interes=this.tem*this.saldo;
            this.desgravamen=(newCredit.lifeInsurancePercentage/100)*this.saldo;
            this.cuota=this.desgravamen+this.interes;
            this.amortizacion=0;
            this.saldofinal=this.saldo-this.amortizacion;
            this.flujo=this.cuota+((newCredit.riskInsurancePercentage/100)*newCredit.vehiclePrice)+newCredit.gps+newCredit.ports+newCredit.administrationBills;

            this.form={
              n: this.n,
              graceType: 'P',
              cok: newCredit.cok,
              interest: parseFloat((this.interes).toFixed(2)),
              lifeInsurance: parseFloat((this.desgravamen).toFixed(2)),
              fee: parseFloat((this.cuota).toFixed(2)),
              amortization: parseFloat((this.amortizacion).toFixed(2)),
              balance: parseFloat((this.saldo).toFixed(2)),
              finalBalance: parseFloat((this.saldofinal).toFixed(2)),
              flow: parseFloat((this.flujo).toFixed(2)),
              riskInsurance: parseFloat((newCredit.vehiclePrice*(newCredit.riskInsurancePercentage/100)).toFixed(2)),
              gps: newCredit.gps,
              ports: newCredit.ports,
              adminBills: newCredit.administrationBills,
              creditId: response.id
            }

            this.saldo=this.saldofinal;
            this.periodoGracia--;

            this.resultsService.create(this.form).subscribe(() => {
            });
          }
          else{
            this.n=i;
            this.interes=this.saldo*this.tem;
            this.desgravamen=(newCredit.lifeInsurancePercentage/100)*this.saldo;
            this.cuota=(this.saldo*(this.tem+(newCredit.lifeInsurancePercentage/100)))/(1-(Math.pow(1+(this.tem+(newCredit.lifeInsurancePercentage/100)),-(newCredit.feeNumber-(i-1)))));
            this.amortizacion=this.cuota-this.interes-this.desgravamen;
            this.saldofinal=this.saldo-this.amortizacion;
            this.flujo=this.cuota+(newCredit.vehiclePrice*(newCredit.riskInsurancePercentage/100))+newCredit.gps+newCredit.ports+newCredit.administrationBills;

            this.form={
              n: this.n,
              graceType: 'S',
              cok: newCredit.cok,
              interest: parseFloat((this.interes).toFixed(2)),
              lifeInsurance: parseFloat((this.desgravamen).toFixed(2)),
              fee: parseFloat((this.cuota).toFixed(2)),
              amortization: parseFloat((this.amortizacion).toFixed(2)),
              balance: parseFloat((this.saldo).toFixed(2)),
              finalBalance: parseFloat((this.saldofinal).toFixed(2)),
              flow: parseFloat((this.flujo).toFixed(2)),
              riskInsurance: parseFloat((newCredit.vehiclePrice*(newCredit.riskInsurancePercentage/100)).toFixed(2)),
              gps: newCredit.gps,
              ports: newCredit.ports,
              adminBills: newCredit.administrationBills,
              creditId: response.id
            }
            this.saldo=this.saldofinal;

            this.resultsService.create(this.form).subscribe(() => {
            });
          }
        }
      });
    } else {
      console.log('Invalid form');
    }
  }
}
