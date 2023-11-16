import { Injectable } from '@angular/core';
import {BaseService} from "./base.service";
import {HttpClient} from "@angular/common/http";
import {Result} from "../models/result";

@Injectable({
  providedIn: 'root'
})
export class ResultsService extends BaseService<Result>{

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint='/results';
  }
}
