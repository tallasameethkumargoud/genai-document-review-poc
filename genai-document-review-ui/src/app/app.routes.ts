import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoanOfficerApprovalComponent } from './loan-officer-approval/loan-officer-approval.component';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'loan-officer-approval', component: LoanOfficerApprovalComponent },

  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard' }
];