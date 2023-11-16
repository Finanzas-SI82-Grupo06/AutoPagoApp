import { Component } from '@angular/core';
import {Credit} from "../../models/credit";
import {CreditService} from "../../services/credit.service";
import {Router} from "@angular/router";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-credits-content',
  templateUrl: './credits-content.component.html',
  styleUrls: ['./credits-content.component.scss']
})
export class CreditsContentComponent {
  creditList: Credit[]= [];
  pagedList: Credit[]= [];
  breakpoint: number = 3;
  length: number = 0;
  pageSize: number = 6;
  pageSizeOptions: number[] = [3, 6, 9, 12];

  constructor (private creditsService: CreditService, private router: Router) { }
  navigateToCreditDetails(id: number) {
    this.router.navigate(['credits/', id]);
  }
  OnPageChange(event: PageEvent){
    let startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if(endIndex > this.length){
      endIndex = this.length;
    }
    this.pagedList = this.creditList.slice(startIndex, endIndex);
  }

  onResize(event:any) { //to adjust to screen size
    this.breakpoint = (event.target.innerWidth <= 800) ? 1 : 3;
  }
  ngOnInit(): void {
    this.creditsService.getAll().subscribe((response:any) => {
      this.creditList = response;
      this.pagedList = this.creditList.slice(0,6)
      this.breakpoint = (window.innerWidth <= 800) ? 1 : 3;
      this.length = this.creditList.length;
    });
  }
}
