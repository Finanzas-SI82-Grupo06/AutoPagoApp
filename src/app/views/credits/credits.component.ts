import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CreditService} from "../../services/credit.service";
import {ResultsService} from "../../services/results.service";
import {Result} from "../../models/result";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-credits',
  templateUrl: './credits.component.html',
  styleUrls: ['./credits.component.scss']
})
export class CreditsComponent {
  credit: any;
  results: any;
  filteredResults: Result[]= [];
  dataSource!: MatTableDataSource<any>;
  cok: number = 0;
  van: number = 0;
  tir: number = 0;
  aux: number = 0;
  finalVan: number = 0;
  flowArray: number[] = [];

  displayedColumns: string[] = ['grace-period', 'final-fee-initial-balance',
    'interest', 'fee', 'amortization', 'fee-life-insurance', 'risk-insurance',
    'gps', 'ports', 'admin-bills', 'fee-final-balance', 'flow'];

  constructor(private route: ActivatedRoute, private creditsService: CreditService, private resultsService: ResultsService) {
    this.route.params.subscribe(params => {
      const creditId = +params['id'];
      this.creditsService.getById(creditId).subscribe((creditResponse: any) => {
        this.credit = creditResponse;
      });
    });

    this.resultsService.getAll().subscribe((resultsResponse: any) => {
      this.results = resultsResponse;
      for (let i = 0; i < this.results.length; i++) {
        if (this.results[i].creditId==this.credit.id) {
          this.filteredResults.push(this.results[i])
        }
      }

      const sortedResults = [...this.filteredResults].sort((a, b) => a.n - b.n);

      this.cok=(Math.pow((1+((sortedResults[0].cok)/100)),(1/12)))-1;

      for (let i = 1; i <= sortedResults.length; i++) {
        this.van=this.van+(sortedResults[i-1].flow/(Math.pow((1+this.cok),i)));
      }

      this.finalVan=parseFloat((this.van-sortedResults[0].balance).toFixed(2));

      this.flowArray.push(-sortedResults[0].balance);

      for (let i = 1; i <= sortedResults.length; i++) {
        this.flowArray.push(sortedResults[i-1].flow);
      }

      this.tir=parseFloat(((this.calcularTIR(this.flowArray, 0.1, 0.1, 1000)*100)).toFixed(2));

      this.dataSource = new MatTableDataSource(sortedResults);
    });
  }

  calcularTIR(flujosDeEfectivo: number[], estimacionTasa: number, tolerancia: number, maxIteraciones: number): any {
    let tir = estimacionTasa;

    for (let i = 0; i < maxIteraciones; i++) {
      let npv = 0;
      let derivadaNpv = 0;

      for (let j = 0; j < flujosDeEfectivo.length; j++) {
        npv += flujosDeEfectivo[j] / Math.pow(1 + tir, j + 1);
        derivadaNpv -= (j + 1) * flujosDeEfectivo[j] / Math.pow(1 + tir, j + 2);
      }

      tir = tir - npv / derivadaNpv;

      if (Math.abs(npv) < tolerancia) {
        return tir;
      }
    }
    return null;
  }
}
