import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CreditService} from "../../services/credit.service";
import {ResultsService} from "../../services/results.service";

@Component({
  selector: 'app-credits',
  templateUrl: './credits.component.html',
  styleUrls: ['./credits.component.scss']
})
export class CreditsComponent {
  credit: any;

  displayedColumns: string[] = ['fee-number', 'grace-period', 'final-fee-initial-balance',
    'final-fee-interest', 'final-fee-amort', 'final-fee-life-insurance',
    'final-fee-final-balance', 'interest', 'fee', 'amortization', 'fee-life-insurance',
    'risk-insurance', 'gps', 'ports', 'admin-bills', 'fee-final-balance', 'flow'];

  constructor(private route: ActivatedRoute, private creditsService: CreditService, private resultsService: ResultsService) {
    this.route.params.subscribe(params => {
      const creditId = +params['id'];
      this.creditsService.getById(creditId).subscribe((creditResponse: any) => {
        this.credit = creditResponse;
      });
    });
  }
}
