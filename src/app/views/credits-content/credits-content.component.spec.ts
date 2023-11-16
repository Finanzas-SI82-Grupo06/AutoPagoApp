import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditsContentComponent } from './credits-content.component';

describe('CreditsContentComponent', () => {
  let component: CreditsContentComponent;
  let fixture: ComponentFixture<CreditsContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreditsContentComponent]
    });
    fixture = TestBed.createComponent(CreditsContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
