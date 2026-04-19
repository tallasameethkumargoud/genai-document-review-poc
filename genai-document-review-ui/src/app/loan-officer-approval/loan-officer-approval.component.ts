import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

type Application = {
  id: number;
  name: string;
  employer: string;
  income: number;
  ytd: number;
  payPeriodStart?: string;
  payPeriodEnd?: string;

  discrepancy?: boolean;
};

@Component({
  selector: 'app-loan-officer-approval',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loan-officer-approval.component.html',
  styleUrls: ['./loan-officer-approval.component.css']
})
export class LoanOfficerApprovalComponent implements OnInit {

  application: Application | null = null;

  approved = false;
  rejected = false;

  ngOnInit(): void {
    const nav = history.state;

    if (nav && nav.application) {
      this.application = nav.application;
    } else {
      this.application = {
        id: 101,
        name: 'John Doe',
        employer: 'Amazon',
        income: 5000,
        ytd: 45000
      };
    }
  }

  approveApplication(): void {
    this.approved = true;
    this.rejected = false;
    alert('Final Loan Approved');
  }

  rejectApplication(): void {
    this.rejected = true;
    this.approved = false;
    alert('Loan Rejected');
  }
}