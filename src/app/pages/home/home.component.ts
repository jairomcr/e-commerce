import { Component, inject, resource, computed, effect } from '@angular/core';
import { ApiService } from '../../core/services/api-rx.service';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ProductCardSkeletonComponent } from '../../components/product-card-skeleton/product-card-skeleton.component';
import { Meta, Title } from '@angular/platform-browser';
import { FooterComponent } from '../../layout/footer/footer.component';
import { Product } from '../../../type';
import { SearchParamsStore } from '../../store/search-params.store';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
        ProductCardComponent,
        ProductCardSkeletonComponent,
        FooterComponent,
    ],
    template: `
        <div class="mt-28 pb-10 px-6">
            @if (isLoading()) {
            <div
                class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 mx-auto max-w-7xl gap-6"
            >
                @for (item of [1,2,3,4]; track item) {
                <app-product-card-skeleton />
                }
            </div>
            } @else {
            <div
                class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 mx-auto max-w-7xl gap-6"
            >
                @for (product of filteredProducts(); track product.id) {
                <app-product-card [product]="product"></app-product-card>
                } @empty {
                <div class="col-span-full text-center py-10">
                    <p class="text-lg text-gray-600">
                        No products match your search criteria
                    </p>
                </div>
                }
            </div>
            }
        </div>
        <app-footer />
    `,
})
export class HomeComponent {
    constructor(private meta: Meta, private title: Title) {
        this.title.setTitle('Home');
        this.meta.updateTag({
            name: 'description',
            content:
                "Home Page - This is a modern, responsive e-commerce template built Angular and TailwindCSS. It's designed to be a starting point for building full-featured e-commerce applications. The template includes a clean and customizable design, ideal for minimalist online stores.",
        });
        this.meta.updateTag({ property: 'og:title', content: 'Home' });
        this.meta.updateTag({
            property: 'og:description',
            content:
                "Home Page - This is a modern, responsive e-commerce template built Angular and TailwindCSS. It's designed to be a starting point for building full-featured e-commerce applications. The template includes a clean and customizable design, ideal for minimalist online stores.",
        });
    }

    private apiService = inject(ApiService);
    private searchParamsStore = inject(SearchParamsStore);

    // Load all products
    productsResource = resource({
        loader: () =>
            new Promise<Product[] | undefined>((res) =>
                this.apiService.getProducts().subscribe(res)
            ),
    });

    // Filter products based on search params
    filteredProducts = computed(() => {
        const products = this.productsResource.value() ?? [];
        const { titleParam, minPriceParam, maxPriceParam } =
            this.searchParamsStore.state();

        return products.filter((product) => {
            // Filter by title
            const titleMatch =
                !titleParam ||
                product.title.toLowerCase().includes(titleParam.toLowerCase());

            // Filter by min price
            const minPriceMatch =
                minPriceParam === null || product.price >= minPriceParam;

            // Filter by max price
            const maxPriceMatch =
                maxPriceParam === null || product.price <= maxPriceParam;

            return titleMatch && minPriceMatch && maxPriceMatch;
        });
    });

    isLoading = computed(() => this.productsResource.isLoading());

    errorEffect = effect(() => {
        const error = this.productsResource.error() as Error;
        if (error) {
            console.log(error);
        }
    });
}
