import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SearchParamsStore } from '../../store/search-params.store';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { NgIf, NgStyle } from '@angular/common';

@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule, NgIf,NgStyle],
  template: `
    <form
      [formGroup]="form"
      (ngSubmit)="applyFilters()"
      class="flex gap-2 w-full max-w-[600px] mx-auto md:ml-auto md:max-w-[400px]"
    >
      <div class="relative flex w-full">
        <input
          type="text"
          formControlName="title"
          placeholder="Search by title..."
          class="flex-1 bg-black/50 py-2 px-4 border border-r-0 border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="button"
          class="py-2 px-4 bg-black/50 border border-gray-300 rounded-r-md hover:bg-black/70 flex items-center justify-center"
          (click)="toggleDropdown()"
        >
          <fa-icon [icon]="faEllipsis"></fa-icon>
        </button>

        <div
          *ngIf="showDropdown"
          class="absolute top-full right-0 border border-gray-300 rounded-md p-4 mt-2 shadow-md z-50 w-64"
          [ngStyle]="{ background: 'var(--root-bg, var(--color-base-100))' }"
        >
          <div class="mb-2">
            <label class="block text-sm mb-1">Minimum Price</label>
            <input
              type="number"
              formControlName="minPrice"
              step="0.01"
              min="0"
              class="w-full py-1 px-2 border border-gray-300 rounded-md"
            />
          </div>
          <div class="mb-2">
            <label class="block text-sm mb-1">Maximum Price</label>
            <input
              type="number"
              formControlName="maxPrice"
              step="0.01"
              min="0"
              class="w-full py-1 px-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
      </div>

      <div class="flex gap-2 justify-center">
        <button type="submit" class="py-2 px-4 btn btn-primary">
          Search
        </button>
        <button
          type="button"
          class="py-2 px-4 border border-gray-300 rounded-md hover:bg-black/50"
          (click)="clearFilters()"
        >
          Clear
        </button>
      </div>
    </form>

    <!-- Mensajes de validación -->
    <div class="text-sm text-red-500 mt-1" *ngIf="form.get('title')?.touched">
      <div *ngIf="form.get('title')?.hasError('required')">
        El título es obligatorio.
      </div>
      <div *ngIf="form.get('title')?.hasError('minlength')">
        Mínimo 3 caracteres.
      </div>
    </div>
  `,
})
export class SearchFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly searchParamsStore = inject(SearchParamsStore);

  showDropdown = false;
  faEllipsis = faEllipsis;

  form = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    minPrice: [null],
    maxPrice: [null],
  });

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  applyFilters() {
    if (this.form.invalid) return;

    const { title, minPrice, maxPrice } = this.form.value;
    this.searchParamsStore.setTitleParam(title ?? '');
    this.searchParamsStore.setMinPriceParam(minPrice ?? null);
    this.searchParamsStore.setMaxPriceParam(maxPrice ?? null);
    this.showDropdown = false;
  }

  clearFilters() {
    this.form.reset();
    this.searchParamsStore.resetFilters();
    this.showDropdown = false;
  }
}
