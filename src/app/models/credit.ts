export class Credit {
  currency: string = '';
  vehiclePrice: number | null = null;
  feeNumber: number | null = null;
  initialFeeAmount: number | null = null;
  url: string = '';
  gracePeriodType: string = '';
  gracePeriodFeeNumber: number | null = null;
  interestRateType: string = '';
  interestRatePercentage: number | null = null;
  notarialCosts: number | null = null;
  registerCosts: number | null = null;
  gps: number | null = null;
  ports: number | null = null;
  administrationBills: number | null = null;
  lifeInsurancePercentage: number | null = null;
  riskInsurancePercentage: number | null = null;
  initialDate: Date | null = null;
  finalDate: Date | null = null;

  constructor(data: Credit) {
    Object.assign(this, data);
  }

}
