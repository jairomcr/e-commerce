import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { SearchParamsStore } from '../../state/search-params.store';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-search-form',
    standalone: true,
    imports: [FormsModule, FontAwesomeModule, NgIf],
    template: `
        <form
            class="flex gap-2 w-full max-w-[600px] mx-auto md:ml-auto md:max-w-[400px]"
            (ngSubmit)="applyFilters()"
        >
            <div class="relative flex w-full">
                <input
                    type="text"
                    id="title"
                    name="title"
                    [(ngModel)]="title"
                    placeholder="Search by title..."
                    class="flex-1 bg-black/50 py-2 px-4 border border-r-0 border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                    type="button"
                    class="py-2 px-4 bg-black/50 border border-gray-300 rounded-r-md hover:bg-black/70 flex items-center justify-center"
                    (click)="toggleDropdown()"
                    aria-label="More search options"
                >
                    <fa-icon [icon]="faEllipsis"></fa-icon>
                </button>

                <div
                    *ngIf="showDropdown"
                    id="search-dropdown"
                    class="absolute top-full right-0 border border-gray-300 rounded-md p-4 mt-2 shadow-md z-50 w-64"
                >
                    <div class="mb-2">
                        <label for="minPrice" class="block text-sm mb-1"
                            >Minimum Price</label
                        >
                        <input
                            type="number"
                            id="minPrice"
                            name="minPrice"
                            [(ngModel)]="minPrice"
                            placeholder="Min price"
                            step="0.01"
                            min="0"
                            class="w-full py-1 px-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <div class="mb-2">
                        <label for="maxPrice" class="block text-sm mb-1"
                            >Maximum Price</label
                        >
                        <input
                            type="number"
                            id="maxPrice"
                            name="maxPrice"
                            [(ngModel)]="maxPrice"
                            placeholder="Max price"
                            step="0.01"
                            min="0"
                            class="w-full py-1 px-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>
            </div>

            <div class="flex gap-2 justify-center">
                <button
                    type="submit"
                    class="py-2 px-4 border border-gray-300 text-white rounded-md hover:bg-blue-700/50"
                >
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
    `,
    styles: `
    #search-dropdown {
        background: var(--root-bg, var(--color-base-100))
    }
    `,
})
export class SearchFormComponent {
    private searchParamsStore = inject(SearchParamsStore);

    title = '';
    minPrice: number | null = null;
    maxPrice: number | null = null;
    showDropdown = false;
    faEllipsis = faEllipsis;

    toggleDropdown() {
        this.showDropdown = !this.showDropdown;
    }

    applyFilters() {
        this.searchParamsStore.setTitleParam(this.title);
        this.searchParamsStore.setMinPriceParam(this.minPrice);
        this.searchParamsStore.setMaxPriceParam(this.maxPrice);
        this.showDropdown = false;
    }

    clearFilters() {
        this.title = '';
        this.minPrice = null;
        this.maxPrice = null;
        this.searchParamsStore.resetFilters();
        this.showDropdown = false;
    }
}
