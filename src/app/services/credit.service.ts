import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BaseService} from "./base.service";
import {Credit} from "../models/credit";

@Injectable({
  providedIn: 'root'
})
export class CreditService extends BaseService<Credit> {

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint='/credits';
  }
}
