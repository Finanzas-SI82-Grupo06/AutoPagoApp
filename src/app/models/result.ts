export class Result {
  id: number;
  interest: number;
  lifeInsurance: number;
  fee: number;
  amortization: number;
  balance: number;
  finalBalance: number;
  flow: number;
  riskInsurance: number;
  gps: number;
  ports: number;
  adminBills: number;
  creditId: number;

  constructor() {
    this.id = 0;
    this.interest = 0;
    this.lifeInsurance = 0;
    this.fee = 0;
    this.amortization = 0;
    this.balance = 0;
    this.finalBalance = 0;
    this.flow = 0;
    this.riskInsurance = 0;
    this.gps = 0;
    this.ports = 0;
    this.adminBills = 0;
    this.creditId = 0;
  }
}
