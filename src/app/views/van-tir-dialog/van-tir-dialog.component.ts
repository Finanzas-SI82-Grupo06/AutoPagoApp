import { Component, Inject } from '@angular/core';
import { CreditsComponent } from '../credits/credits.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-van-tir-dialog',
  templateUrl: './van-tir-dialog.component.html',
  styleUrls: ['./van-tir-dialog.component.scss']
})
export class VanTirDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<VanTirDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: CreditsComponent
    ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
}
