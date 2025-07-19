import { Component, computed, inject, input,ChangeDetectionStrategy } from '@angular/core';
import { Product } from '../../../type';
import {
    faEye,
    faHeart,
    faCartShopping,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ShoppingCartStore } from '../../store/shopping-cart.store';
import { Router } from '@angular/router';
import { FavoriteItemsStore } from '../../store/favorite-items.store';
import { ShortDescriptionPipe } from '../../shared/pipes/short-description.pipe';
import { ClickLoggerDirective } from '../../shared/directives/click-logger.directive';

@Component({
    selector: 'app-product-card',
    imports: [FontAwesomeModule,ShortDescriptionPipe,ClickLoggerDirective],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div
            class="card hover:bg-base-200 transition-all bg-base-100 w-full h-full shadow-sm"
        >
            <figure>
                <img
                    class="w-full h-[320px] object-fill"
                    [src]="product()?.image"
                    alt="Shoes"
                />
            </figure>
            <div class="card-body">
                <h2 class="card-title">
                    {{ product()?.title }}
                </h2>
                <h3 class="text-lg text-green-500">$ {{ product()?.price }}</h3>
                @let p = product();
                @if (p) {
                    <p class="line-clamp-3">
                        {{ p.description | shortDescription:20 }}
                    </p>
                }
                <div class="card-actions mt-4 w-full">
                    <div
                        class="flex items-center gap-x-2 w-full justify-between"
                    >
                        <div class="flex items-center gap-x-2">
                            <div class="tooltip" data-tip="View Detail">
                                <button
                                    (click)="onClickNavigate()"
                                    class="btn btn-soft btn-sm"
                                >
                                    <fa-icon [icon]="faEye"></fa-icon>
                                </button>
                            </div>
                            <div class="tooltip" data-tip="Favorite">
                                <button
                                    (click)="toggleFavoriteItem()"
                                    [class]="
                                        checkFavoriteItemAlreadyExist()
                                            ? 'btn btn-soft btn-primary btn-sm'
                                            : 'btn btn-soft btn-sm'
                                    "
                                >
                                    <fa-icon [icon]="faHeart"></fa-icon>
                                </button>
                            </div>
                        </div>
                        <div>
                            <div class="badge badge-outline capitalize">
                                {{ product()?.category }}
                            </div>
                        </div>
                    </div>
                    <button
                        [disabled]="checkItemAlreadyExist()"
                        (click)="addItem()"
                        class="mt-2 w-full btn btn-primary"
                        appClickLogger
                        [logMessage]="'Añadido al carrito: ' + product()?.title"
                    >
                        <fa-icon [icon]="faCartShopping"></fa-icon>
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `,
})
export class ProductCardComponent {
    private readonly shoppingCartStore = inject(ShoppingCartStore);
    private readonly favoriteItemsStore = inject(FavoriteItemsStore);
    private readonly router = inject(Router);

    faHeart = faHeart;
    faEye = faEye;
    faCartShopping = faCartShopping;
    product = input<Product>();

    cartItems = computed(() => this.shoppingCartStore.itemQuantity());

    addItem() {
        this.shoppingCartStore.addItem({
            ...this?.product()!,
            quantity: 1, // Add default quantity
        });
    }

    checkItemAlreadyExist() {
        return this.shoppingCartStore.checkItemAlreadyExist(
            this.product()?.id!
        );
    }

    checkFavoriteItemAlreadyExist() {
        return this.favoriteItemsStore.checkItemAlreadyExist(
            this.product()?.id!
        );
    }

    toggleFavoriteItem() {
        if (this.checkFavoriteItemAlreadyExist()) {
            this.favoriteItemsStore.removeItem(this.product()!);
        } else {
            this.favoriteItemsStore.addItem(this.product()!);
        }
    }

    onClickNavigate() {
        this.router.navigate(['/products', this.product()?.id]);
    }
}
