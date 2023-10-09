import { Component } from '@angular/core';
import {Validations} from "../../utils/validations";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent {
  validations = new Validations();
  hide = true;
}
