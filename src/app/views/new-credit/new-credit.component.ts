import { Component } from '@angular/core';
import {Validations} from "../../utils/validations";

@Component({
  selector: 'app-new-credit',
  templateUrl: './new-credit.component.html',
  styleUrls: ['./new-credit.component.scss']
})
export class NewCreditComponent {
  validations = new Validations();
}
