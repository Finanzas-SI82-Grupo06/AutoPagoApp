import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VanTirDialogComponent } from './van-tir-dialog.component';

describe('VanTirDialogComponent', () => {
  let component: VanTirDialogComponent;
  let fixture: ComponentFixture<VanTirDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VanTirDialogComponent]
    });
    fixture = TestBed.createComponent(VanTirDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
