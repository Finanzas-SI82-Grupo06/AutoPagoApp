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
  cuotainicial: number = 0;
  cuotafinal: number = 0;
  prestamo: number = 0;
  saldoCuota: number = 0;
  desgravamenMensual: number = 0;
  riesgoMensual: number = 0;
  saldoIF: number = 0;
  saldo: number = 0;
  saldofinal: number = 0;
  saldofinalF: number = 0;
  interes: number =0;
  interesF: number =0;
  desgravamen: number = 0;
  desgravamenF: number = 0;
  cuota: number = 0;
  amortizacion: number = 0;
  amortizacionF: number = 0;
  flujo: number = 0;
  form: any;
  periodoGracia: number = 0;
  cuotas: number = 0;
  createCreditForm: any;
  n: number = 0;

  public creditForm: any = new FormGroup({
    currency: new FormControl(0, [Validators.required]),
    vehiclePrice: new FormControl(0, [Validators.required, Validators.min(1)]),
    feeNumber: new FormControl(null, [Validators.required, Validators.min(8)]),
    initialFeePercentage: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(100)]),
    finalFeePercentage: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(100)]),
    url: new FormControl('', [Validators.required, Validators.min(1)]),
    gracePeriodType: new FormControl('', [Validators.required]),
    gracePeriodFeeNumber: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(6)]),
    interestRateType: new FormControl('', [Validators.required]),
    interestRatePercentage: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(100)]),
    notarialCost: new FormControl(0, [Validators.required, Validators.min(0)]),
    registerCost: new FormControl(0, [Validators.required, Validators.min(0)]),
    gps: new FormControl(0, [Validators.required, Validators.min(1)]),
    ports: new FormControl(0, [Validators.required, Validators.min(1)]),
    administrationBills: new FormControl(0, [Validators.required, Validators.min(1)]),
    lifeInsurancePercentage: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(100)]),
    riskInsurancePercentage: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(100)]),
    cok: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(100)]),
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

        this.desgravamenMensual=(newCredit.lifeInsurancePercentage/100)/12;
        this.riesgoMensual=(newCredit.riskInsurancePercentage/100)/12;

        this.cuotainicial=(newCredit.vehiclePrice*(newCredit.initialFeePercentage/100));
        this.cuotafinal=(newCredit.vehiclePrice*(newCredit.finalFeePercentage/100));

        this.prestamo=(newCredit.vehiclePrice-this.cuotainicial)+newCredit.notarialCost+newCredit.registerCost;

        this.saldoCuota=this.prestamo-this.cuotafinal/(Math.pow((1+this.tem+this.desgravamenMensual),(this.cuotas+1)));
        console.log("SaldoCuota: ",this.saldoCuota);

        this.saldoIF=(this.cuotafinal)/(Math.pow((1+this.tem+this.desgravamenMensual),(newCredit.feeNumber+1)));
        console.log("SaldoIF: ",this.saldoIF);
        this.saldo=this.saldoCuota;
        for (let i = 1; i <= this.cuotas; i++) {
          if(this.periodoGracia!==0 && newCredit.gracePeriodType==='complete'){
            this.interesF=this.saldoIF*this.tem;
            this.amortizacionF=0;
            this.desgravamenF=this.saldoIF*this.desgravamenMensual;
            this.saldofinalF=(this.saldoIF+this.interesF+this.desgravamenF)-this.amortizacionF;

            this.n=i;
            this.interes=this.tem*this.saldo;
            this.desgravamen=this.desgravamenMensual*this.saldo;
            this.cuota=0;
            this.amortizacion=0;
            this.saldofinal=this.saldo+this.interes;
            this.flujo=this.cuota+(this.riesgoMensual*newCredit.vehiclePrice)+newCredit.gps+newCredit.ports+newCredit.administrationBills+this.desgravamen;

            this.form={
              n: this.n,
              graceType: 'T',
              cok: newCredit.cok,

              balanceFinalFee: parseFloat((this.saldoIF).toFixed(2)),
              interestFinalFee: parseFloat((this.interesF).toFixed(2)),
              amortizationFinalFee: parseFloat((this.amortizacionF).toFixed(2)),
              lifeInsuranceFinalFee: parseFloat((this.desgravamenF).toFixed(2)),
              finalBalanceFinalFee: parseFloat((this.saldofinalF).toFixed(2)),

              interest: parseFloat((this.interes).toFixed(2)),
              lifeInsurance: parseFloat((this.desgravamen).toFixed(2)),
              fee: parseFloat((this.cuota).toFixed(2)),
              amortization: parseFloat((this.amortizacion).toFixed(2)),
              balance: parseFloat((this.saldo).toFixed(2)),
              finalBalance: parseFloat((this.saldofinal).toFixed(2)),
              flow: parseFloat((this.flujo).toFixed(2)),
              riskInsurance: parseFloat((newCredit.vehiclePrice*this.riesgoMensual).toFixed(2)),
              gps: newCredit.gps,
              ports: newCredit.ports,
              adminBills: newCredit.administrationBills,
              creditId: response.id
            }

            this.saldo=this.saldofinal;
            this.saldoIF=this.saldofinalF;
            this.periodoGracia--;

            this.resultsService.create(this.form).subscribe(() => {
            });
          }
          else if(this.periodoGracia!==0 && newCredit.gracePeriodType==='partial'){
            this.interesF=this.saldoIF*this.tem;
            this.amortizacionF=0;
            this.desgravamenF=this.saldoIF*this.desgravamenMensual;
            this.saldofinalF=(this.saldoIF+this.interesF+this.desgravamenF)-this.amortizacionF;

            this.n=i;
            this.interes=this.tem*this.saldo;
            this.desgravamen=this.desgravamenMensual*this.saldo;
            this.cuota=this.interes;
            this.amortizacion=0;
            this.saldofinal=this.saldo-this.amortizacion;
            this.flujo=this.cuota+(this.riesgoMensual*newCredit.vehiclePrice)+newCredit.gps+newCredit.ports+newCredit.administrationBills+this.desgravamen;

            this.form={
              n: this.n,
              graceType: 'P',
              cok: newCredit.cok,
              balanceFinalFee: parseFloat((this.saldoIF).toFixed(2)),
              interestFinalFee: parseFloat((this.interesF).toFixed(2)),
              amortizationFinalFee: parseFloat((this.amortizacionF).toFixed(2)),
              lifeInsuranceFinalFee: parseFloat((this.desgravamenF).toFixed(2)),
              finalBalanceFinalFee: parseFloat((this.saldofinalF).toFixed(2)),
              interest: parseFloat((this.interes).toFixed(2)),
              lifeInsurance: parseFloat((this.desgravamen).toFixed(2)),
              fee: parseFloat((this.cuota).toFixed(2)),
              amortization: parseFloat((this.amortizacion).toFixed(2)),
              balance: parseFloat((this.saldo).toFixed(2)),
              finalBalance: parseFloat((this.saldofinal).toFixed(2)),
              flow: parseFloat((this.flujo).toFixed(2)),
              riskInsurance: parseFloat((newCredit.vehiclePrice*this.riesgoMensual).toFixed(2)),
              gps: newCredit.gps,
              ports: newCredit.ports,
              adminBills: newCredit.administrationBills,
              creditId: response.id
            }

            this.saldo=this.saldofinal;
            this.saldoIF=this.saldofinalF;
            this.periodoGracia--;

            this.resultsService.create(this.form).subscribe(() => {
            });
          }
          else{
            this.interesF=this.saldoIF*this.tem;
            this.amortizacionF=0;
            this.desgravamenF=this.saldoIF*this.desgravamenMensual;
            this.saldofinalF=(this.saldoIF+this.interesF+this.desgravamenF)-this.amortizacionF;

            this.n=i;
            this.interes=this.saldo*this.tem;
            this.desgravamen=this.desgravamenMensual*this.saldo;
            this.cuota=(this.saldo*(this.tem+this.desgravamenMensual))/(1-(Math.pow(1+(this.tem+this.desgravamenMensual),-(newCredit.feeNumber-(i-1)))));
            this.amortizacion=this.cuota-this.interes-this.desgravamen;
            this.saldofinal=this.saldo-this.amortizacion;
            this.flujo=this.cuota+(newCredit.vehiclePrice*this.riesgoMensual)+newCredit.gps+newCredit.ports+newCredit.administrationBills;

            this.form={
              n: this.n,
              graceType: 'S',
              cok: newCredit.cok,
              balanceFinalFee: parseFloat((this.saldoIF).toFixed(2)),
              interestFinalFee: parseFloat((this.interesF).toFixed(2)),
              amortizationFinalFee: parseFloat((this.amortizacionF).toFixed(2)),
              lifeInsuranceFinalFee: parseFloat((this.desgravamenF).toFixed(2)),
              finalBalanceFinalFee: parseFloat((this.saldofinalF).toFixed(2)),
              interest: parseFloat((this.interes).toFixed(2)),
              lifeInsurance: parseFloat((this.desgravamen).toFixed(2)),
              fee: parseFloat((this.cuota).toFixed(2)),
              amortization: parseFloat((this.amortizacion).toFixed(2)),
              balance: parseFloat((this.saldo).toFixed(2)),
              finalBalance: parseFloat((this.saldofinal).toFixed(2)),
              flow: parseFloat((this.flujo).toFixed(2)),
              riskInsurance: parseFloat((newCredit.vehiclePrice*this.riesgoMensual).toFixed(2)),
              gps: newCredit.gps,
              ports: newCredit.ports,
              adminBills: newCredit.administrationBills,
              creditId: response.id
            }

            this.saldo=this.saldofinal;
            this.saldoIF=this.saldofinalF;

            this.resultsService.create(this.form).subscribe(() => {
            });

            if (i === this.cuotas) {
              console.log("aqui fue aceptado")
              this.interesF=this.saldoIF*this.tem;
              this.desgravamenF=this.saldoIF*this.desgravamenMensual;
              this.amortizacionF=this.saldoIF+this.interesF+this.desgravamenF;
              this.saldofinalF=0;

              this.n=i+1;
              this.saldofinal=0;
              this.cuota=0;
              this.flujo=this.cuota+(newCredit.vehiclePrice*this.riesgoMensual)+newCredit.gps+newCredit.ports+newCredit.administrationBills+this.amortizacionF;

              this.form={
                n: this.n,
                graceType: 'S',
                cok: newCredit.cok,
                balanceFinalFee: parseFloat((this.saldoIF).toFixed(2)),
                interestFinalFee: parseFloat((this.interesF).toFixed(2)),
                amortizationFinalFee: parseFloat((this.amortizacionF).toFixed(2)),
                lifeInsuranceFinalFee: parseFloat((this.desgravamenF).toFixed(2)),
                finalBalanceFinalFee: parseFloat((this.saldofinalF).toFixed(2)),
                interest: 0,
                lifeInsurance: 0,
                fee: 0,
                amortization: 0,
                balance: 0,
                finalBalance: parseFloat((this.saldofinal).toFixed(2)),
                flow: parseFloat((this.flujo).toFixed(2)),
                riskInsurance: parseFloat((newCredit.vehiclePrice*this.riesgoMensual).toFixed(2)),
                gps: newCredit.gps,
                ports: newCredit.ports,
                adminBills: newCredit.administrationBills,
                creditId: response.id
              }

              this.resultsService.create(this.form).subscribe(() => {
                console.log("aca fue posteado el ultimo")
              });
            }
          }
        }
      });
    } else {
      console.log('Invalid form');
    }
  }
}
