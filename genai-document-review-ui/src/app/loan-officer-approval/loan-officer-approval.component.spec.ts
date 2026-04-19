import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanOfficerApprovalComponent } from './loan-officer-approval.component';

describe('LoanOfficerApprovalComponent', () => {
  let component: LoanOfficerApprovalComponent;
  let fixture: ComponentFixture<LoanOfficerApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoanOfficerApprovalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanOfficerApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
