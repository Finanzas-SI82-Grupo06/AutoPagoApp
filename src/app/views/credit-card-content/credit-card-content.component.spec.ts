import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditCardContentComponent } from './credit-card-content.component';

describe('CreditCardContentComponent', () => {
  let component: CreditCardContentComponent;
  let fixture: ComponentFixture<CreditCardContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreditCardContentComponent]
    });
    fixture = TestBed.createComponent(CreditCardContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
