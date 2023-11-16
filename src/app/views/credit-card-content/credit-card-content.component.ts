import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-credit-card-content',
  templateUrl: './credit-card-content.component.html',
  styleUrls: ['./credit-card-content.component.scss']
})
export class CreditCardContentComponent {
  @Input() credit: any;

  constructor(private router: Router) {}

  viewCreditDetails(id: number) {
    this.router.navigate(['/credits', id]);
  }
}
