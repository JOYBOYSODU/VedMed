import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  imports: [],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.css'
})
export class SignIn implements OnInit{

  title = 'VedMed';
  selectedUserType: string = 'patient';
  currentForm: string = 'signIn';

  ngOnInit() {
    // No need for manual DOMContentLoaded—Angular handles component initialization
  }

  selectUserType(userType: string) {
    this.selectedUserType = userType;
  }

  showSignUp() {
    this.currentForm = 'signUp';
  }

  showSignIn() {
    this.currentForm = 'signIn';
  }

  handleSignIn(event: Event, email: string, password: string) {
    event.preventDefault();

    this.clearErrors('login');

    if (!this.validateEmail(email)) {
      this.showError('loginEmailError', 'Please enter a valid email address');
      return;
    }

    if (password.length < 6) {
      this.showError('loginPasswordError', 'Password must be at least 6 characters');
      return;
    }

    alert(`Welcome back! Logging in as ${this.selectedUserType}`);
    console.log('Login successful', { email, userType: this.selectedUserType });
  }

  handleSignUp(event: Event, name: string, email: string, phone: string, license: string, password: string, confirmPassword: string) {
    event.preventDefault();

    this.clearErrors('register');
    let isValid = true;

    if (name.trim().length < 2) {
      this.showError('registerNameError', 'Name must be at least 2 characters');
      isValid = false;
    }

    if (!this.validateEmail(email)) {
      this.showError('registerEmailError', 'Please enter a valid email address');
      isValid = false;
    }

    if (!this.validatePhone(phone)) {
      this.showError('registerPhoneError', 'Please enter a valid phone number');
      isValid = false;
    }

    if (this.selectedUserType === 'doctor' && license.trim().length === 0) {
      this.showError('registerLicenseError', 'Medical license number is required for doctors');
      isValid = false;
    }

    if (password.length < 8) {
      this.showError('registerPasswordError', 'Password must be at least 8 characters');
      isValid = false;
    }

    if (password !== confirmPassword) {
      this.showError('registerConfirmPasswordError', 'Passwords do not match');
      isValid = false;
    }

    if (!isValid) return;

    alert(`Account created successfully! Welcome to VedMed as a ${this.selectedUserType}`);
    console.log('Registration successful', { name, email, userType: this.selectedUserType });
  }

  togglePassword(input: HTMLInputElement, button: HTMLElement) {
    if (input.type === 'password') {
      input.type = 'text';
      button.textContent = '🙈';
    } else {
      input.type = 'password';
      button.textContent = '👁️';
    }
  }

  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  validatePhone(phone: string): boolean {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  }

  showError(elementId: string, message: string) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.classList.remove('hidden');
    }
  }

  clearErrors(formType: string) {
    const errorElements = document.querySelectorAll(`#${formType}Form .error-message`);
    errorElements.forEach(element => {
      element.classList.add('hidden');
      element.textContent = '';
    });
  }
}

