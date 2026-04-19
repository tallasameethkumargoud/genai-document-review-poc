import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { GenaiExtractionService, PayStubResponse } from '../services/genai-extraction.service';

type Extracted = {
  employer: string;
  income: number;
  ytd: number;
  payPeriodStart?: string;
  payPeriodEnd?: string;
};

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(
    private router: Router,
    private genaiService: GenaiExtractionService
  ) {}

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  // Simulating applicant-entered data (would come from Application Service in real system)
  userData: Extracted = {
    employer: 'Amazon',
    income: 4000,
    ytd: 42000
  };

  // Data returned from backend (AI extraction)
  extractedData: Extracted | null = null;

  // Editable version of AI output (loan officer can override)
  aiEditable: Extracted = {
    employer: '',
    income: 0,
    ytd: 0,
    payPeriodStart: '',
    payPeriodEnd: ''
  };

  selectedFileName: string | null = null;
  loading = false;

  // Capture selected file
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFileName = input.files[0].name;
    }
  }

  upload(): void {
    if (!this.selectedFileName) {
      alert('Please select a pay stub file');
      return;
    }

    const file = this.fileInput.nativeElement.files?.[0];
    if (!file) return;

    this.loading = true;
    this.extractedData = null;

    // In real system:
    // - File would be uploaded to Document Service (S3)
    // - Backend would receive documentId instead of raw text
    file.text().then(content => {
      this.genaiService.extractPayStubData(content).subscribe({
        next: (data: PayStubResponse) => {

          // Map backend response to UI model
          this.extractedData = {
            employer: data.employerName,
            income: Number(data.income),
            ytd: data.ytd ?? 45000,
            payPeriodStart: data.payPeriodStart,
            payPeriodEnd: data.payPeriodEnd
          };

          // Clone for editing (so original response stays intact)
          this.aiEditable = { ...this.extractedData };

          this.loading = false;
        },
        error: () => {
          alert('Extraction failed');
          this.loading = false;
        }
      });
    });
  }

  // Simple comparison helper for highlighting mismatches
  isMismatch(field: keyof Extracted): boolean {
    return !!this.extractedData && this.userData[field] !== this.aiEditable[field];
  }

  approve(): void {

    // Check if there are differences between user input and AI output
    const hasMismatch =
      this.isMismatch('income') || this.isMismatch('ytd');

    // If mismatch exists, force user confirmation
    if (hasMismatch) {
      const confirmProceed = confirm(
        'Mismatch detected between User and AI values. Proceed with reviewed values?'
      );
      if (!confirmProceed) return;
    }

    // Final payload sent forward (simulates underwriting packet)
    const payload = {
      id: 101,
      name: 'John Doe',
      employer: this.aiEditable.employer,
      income: this.aiEditable.income,
      ytd: this.aiEditable.ytd,
      payPeriodStart: this.aiEditable.payPeriodStart,
      payPeriodEnd: this.aiEditable.payPeriodEnd,

      // Used downstream to indicate if manual review was needed
      discrepancy: hasMismatch
    };

    console.log('Final payload:', payload);

    // Navigate to approval step (Underwriting stage simulation)
    this.router.navigate(['/loan-officer-approval'], {
      state: { application: payload }
    });
  }

  reject(): void {
    // Reset everything back to initial state
    this.extractedData = null;
    this.selectedFileName = null;
    this.aiEditable = {
      employer: '',
      income: 0,
      ytd: 0,
      payPeriodStart: '',
      payPeriodEnd: ''
    };
  }
}