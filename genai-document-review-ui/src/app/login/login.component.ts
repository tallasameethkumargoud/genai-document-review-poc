import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string = '';
  password: string = '';

  constructor(private router: Router) {}

  onSubmit(): void {
    console.log('SUBMIT CLICKED', this.username, this.password);

    // Basic validation
    if (!this.username || !this.password) {
      alert('Please enter username and password');
      return;
    }

    // Mock login (no backend dependency)
    localStorage.setItem('token', 'dummy-token');

    console.log('Mock login successful');

    // Navigate to dashboard
    this.router.navigate(['/dashboard']);
  }

}