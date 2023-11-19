export class Credit {
  id: number = 0;
  currency: string = '';
  vehiclePrice: number = 0;
  feeNumber: number = 0;
  initialFeePercentage: number = 0;
  finalFeePercentage: number = 0;
  url: string = '';
  gracePeriodType: string = '';
  gracePeriodFeeNumber: number = 0;
  interestRateType: string = '';
  interestRatePercentage: number = 0;
  notarialCost: number = 0;
  registerCost: number = 0;
  gps: number = 0;
  ports: number = 0;
  administrationBills: number = 0;
  lifeInsurancePercentage: number = 0;
  riskInsurancePercentage: number = 0;
  cok: number = 0;
  initialDate: Date | null = null;
  finalDate: Date | null = null;

  constructor(data: Credit) {
    Object.assign(this, data);
  }

}
