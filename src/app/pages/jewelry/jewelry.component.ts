import { Component, computed, inject, resource } from '@angular/core';
import { ApiService } from '../../core/services/api-rx.service';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ProductCardSkeletonComponent } from '../../components/product-card-skeleton/product-card-skeleton.component';
import { Meta, Title } from '@angular/platform-browser';
import { FooterComponent } from '../../layout/footer/footer.component';
import { Product } from '../../../type';
import { SearchParamsStore } from '../../store/search-params.store';

@Component({
    selector: 'app-jewelry',
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
                <app-product-card [product]="product" />
                } @empty {
                <div class="col-span-full text-center py-10">
                    <p class="text-lg text-gray-600">
                        No jewelry matches your search criteria
                    </p>
                </div>
                }
            </div>
            }
        </div>
        <app-footer />
    `,
})
export class JewelryComponent {
    constructor(private meta: Meta, private title: Title) {
        this.title.setTitle('Jewelry');
        this.meta.updateTag({
            name: 'description',
            content:
                "Jewelry Page - This is a modern, responsive e-commerce template built Angular and TailwindCSS. It's designed to be a starting point for building full-featured e-commerce applications. The template includes a clean and customizable design, ideal for minimalist online stores.",
        });
        this.meta.updateTag({ property: 'og:title', content: 'Jewelry' });
        this.meta.updateTag({
            property: 'og:description',
            content:
                "Jewelry Page - This is a modern, responsive e-commerce template built Angular and TailwindCSS. It's designed to be a starting point for building full-featured e-commerce applications. The template includes a clean and customizable design, ideal for minimalist online stores.",
        });
    }

    private readonly productCategory = 'jewelery';
    private readonly apiService = inject(ApiService);
    private readonly searchParamsStore = inject(SearchParamsStore);

    productsResource = resource({
        loader: () =>
            new Promise<Product[] | undefined>((res) =>
                this.apiService
                    .getProductsDetails(this.productCategory)
                    .subscribe(res)
            ),
    });

    filteredProducts = computed(() => {
        const products = this.productsResource.value() ?? [];
        const { titleParam, minPriceParam, maxPriceParam } =
            this.searchParamsStore.state();

        return products.filter((product) => {
            const titleMatch =
                !titleParam ||
                product.title.toLowerCase().includes(titleParam.toLowerCase());
            const minPriceMatch =
                minPriceParam === null || product.price >= minPriceParam;
            const maxPriceMatch =
                maxPriceParam === null || product.price <= maxPriceParam;

            return titleMatch && minPriceMatch && maxPriceMatch;
        });
    });

    isLoading = computed(() => this.productsResource.isLoading());
}
