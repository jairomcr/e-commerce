import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,  NgIf],
  template: `
    <div class="min-h-screen flex justify-center items-center px-4">
      <div class="bg-base-100 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 class="text-2xl font-bold mb-6 text-center">Iniciar sesión</h2>

        <form [formGroup]="form" (ngSubmit)="handleLogin()">
          <div class="mb-4">
            <label class="block mb-1">Correo electrónico</label>
            <input
              type="email"
              formControlName="email"
              class="input input-bordered w-full"
              placeholder="usuario@correo.com"
            />
            <div
              class="text-sm text-red-500 mt-1"
              *ngIf="form.get('email')?.touched"
            >
              <div *ngIf="form.get('email')?.hasError('required')">
                El email es obligatorio.
              </div>
              <div *ngIf="form.get('email')?.hasError('email')">
                Formato de email inválido.
              </div>
            </div>
          </div>

          <div class="mb-4">
            <label class="block mb-1">Contraseña</label>
            <input
              type="password"
              formControlName="password"
              class="input input-bordered w-full"
              placeholder="********"
            />
            <div
              class="text-sm text-red-500 mt-1"
              *ngIf="form.get('password')?.touched"
            >
              <div *ngIf="form.get('password')?.hasError('required')">
                La contraseña es obligatoria.
              </div>
              <div *ngIf="form.get('password')?.hasError('minlength')">
                Mínimo 6 caracteres.
              </div>
            </div>
          </div>

          <button
            class="btn btn-primary w-full"
            type="submit"
            [disabled]="form.invalid"
          >
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  `,
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  handleLogin() {
    if (this.form.invalid) return;
  
    const { email, password } = this.form.value;
  
    // Simular login exitoso
    localStorage.setItem('logged', 'true');
    localStorage.setItem('userEmail', String(email)); 
    // Obtener ruta de destino si la hay
    const redirectTo = localStorage.getItem('redirectAfterLogin') || '/';
    localStorage.removeItem('redirectAfterLogin');
  
    this.router.navigateByUrl(redirectTo);
  }
  
  
}
