import { Component } from '@angular/core';
import {Validations} from "../../utils/validations";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  validations = new Validations();
  hide = true;
}
