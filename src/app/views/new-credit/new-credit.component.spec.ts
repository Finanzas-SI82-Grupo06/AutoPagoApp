import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCreditComponent } from './new-credit.component';

describe('NewCreditComponent', () => {
  let component: NewCreditComponent;
  let fixture: ComponentFixture<NewCreditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewCreditComponent]
    });
    fixture = TestBed.createComponent(NewCreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
