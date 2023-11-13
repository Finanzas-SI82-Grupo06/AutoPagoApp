import {Component} from '@angular/core';

@Component({
  selector: 'app-credits',
  templateUrl: './credits.component.html',
  styleUrls: ['./credits.component.scss']
})
export class CreditsComponent {
  displayedColumns: string[] = ['fee-number', 'grace-period', 'final-fee-initial-balance',
    'final-fee-interest', 'final-fee-amort', 'final-fee-life-insurance',
    'final-fee-final-balance', 'interest', 'fee', 'amortization', 'fee-life-insurance',
    'risk-insurance', 'gps', 'ports', 'admin-bills', 'fee-final-balance', 'flow'];
}
