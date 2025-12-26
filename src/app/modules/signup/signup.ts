import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { toast } from 'ngx-sonner';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {

  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService); // Assuming AuthService is defined and provided elsewhere
  private readonly router = inject(Router);
  readonly signupForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit() {

    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      toast.error('Please correct the errors in the form before submitting.');
      return;
    }

    this.authService.signUp(
      this.signupForm.value.username,
      this.signupForm.value.email,
      this.signupForm.value.password
    ).subscribe({
      next: () => {
        toast.success('Sign-in successful!');
        this.router.navigate(['/home'])
      },
      error: (err) => {
        toast.error('Sign-in failed. Please check your credentials and try again.');
      }
    });


  }

  //getter methods for form controls
  get username() {
    return this.signupForm.get('username');
  }

  get email() {
    return this.signupForm.get('email');
  }

  get password() {
    return this.signupForm.get('password');
  }

  get usernameInvalid() {
    return this.username?.touched && this.username?.invalid;
  }

  get passwordInvalid() {
    return this.password?.touched && this.password?.invalid;
  }
  get emailInvalid() {
    return this.email?.touched && this.email?.invalid;
  }
}
