import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
    faCartShopping,
    faHamburger,
    faHeart,
    faStore,
    IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { ShoppingCartStore } from '../../state/shopping-cart.store';

@Component({
    selector: 'app-header',
    imports: [FontAwesomeModule, RouterLink, RouterLinkActive],
    template: `
        <header
            class="w-full py-4 top-0 fixed bg-clip-padding backdrop-filter backdrop-blur-xl z-50 border-b border-b-base-300"
        >
            <div
                class="max-w-7xl px-6 mx-auto flex items-center justify-between"
            >
                <div class="flex items-center gap-x-5">
                    <a
                        class="flex items-center gap-x-3 text-xl btn btn-ghost group"
                        routerLink="/"
                    >
                        <fa-icon
                            class="group-hover:text-primary"
                            [icon]="faStore"
                        ></fa-icon>
                        <span class="hidden lg:block">SuperStore</span>
                    </a>
                    <div class="items-center gap-x-5 hidden lg:flex">
                        @for (category of NAV_CATEGORIES; track category) {
                        <a
                            [routerLink]="category.link"
                            routerLinkActive="active-link"
                            [routerLinkActiveOptions]="{ exact: true }"
                            class="hover:underline transition-all"
                            >{{ category.title }}</a
                        >
                        }
                    </div>
                </div>
                <div class="hidden lg:flex items-center gap-x-2">
                    <a
                        routerLink="/favorite-items"
                        class="btn btn-ghost"
                        routerLinkActive="bg-primary text-white"
                        [routerLinkActiveOptions]="{ exact: true }"
                    >
                        <fa-icon [icon]="faHeart"></fa-icon>
                    </a>
                    <a
                        routerLink="/shopping-cart"
                        class="btn btn-ghost relative"
                        routerLinkActive="bg-primary text-white"
                        [routerLinkActiveOptions]="{ exact: true }"
                    >
                        <fa-icon [icon]="faCartShopping"></fa-icon>
                        @if (cartItemQuantity() >= 1) {
                        <div
                            class="absolute -top-2 -right-2 badge badge-primary badge-sm"
                        >
                            {{ cartItemQuantity() }}
                        </div>
                        }
                    </a>
                    <select data-choose-theme>
                        <option value="dark">Default</option>
                        <option value="dark">Dark</option>
                        <option value="light">Light</option>
                    </select>
                </div>
                <div class="block lg:hidden dropdown dropdown-end">
                    <div tabindex="0" role="button" class="btn m-1">
                        <fa-icon [icon]="faHamburger"></fa-icon>
                    </div>
                    <ul
                        tabindex="0"
                        class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
                    >
                        @for (category of NAV_CATEGORIES; track category) {
                        <li>
                            <a
                                [routerLink]="category.link"
                                routerLinkActive="active-link"
                                [routerLinkActiveOptions]="{ exact: true }"
                                class="hover:underline transition-all"
                                >{{ category.title }}</a
                            >
                        </li>
                        }
                        <li>
                            <a
                                routerLink="/favorite-items"
                                routerLinkActive="bg-primary"
                                [routerLinkActiveOptions]="{ exact: true }"
                                class="hover:underline transition-all"
                                >Favorite</a
                            >
                        </li>
                        <li>
                            <a
                                routerLink="/shopping-cart"
                                routerLinkActive="bg-primary"
                                [routerLinkActiveOptions]="{ exact: true }"
                                class="relative hover:underline transition-all"
                                >Shopping Cart @if (cartItemQuantity() >= 1) {
                                <div
                                    class="absolute -top-2 -right-2 badge badge-primary badge-sm"
                                >
                                    {{ cartItemQuantity() }}
                                </div>
                                }
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    `,
    styles: `
    .active-link {
    color: "#d1d5dc";
    text-decoration: underline;
    }
`,
})
export class HeaderComponent {
    private readonly shoppingCartStore = inject(ShoppingCartStore);

    faCartShopping = faCartShopping;
    faHamburger = faHamburger;
    faHeart = faHeart;
    faStore = faStore;

    cartItemQuantity = computed(() => this.shoppingCartStore.itemQuantity());

    NAV_CATEGORIES = [
        {
            title: 'All',
            link: '/',
            activeClass: 'active-link',
        },
        {
            title: 'Men',
            link: '/men-clothing',
            activeClass: 'active-link',
        },
        {
            title: 'Women',
            link: '/women-clothing',
            activeClass: 'active-link',
        },
        {
            title: 'Jewelry',
            link: '/jewelry',
            activeClass: 'active-link',
        },
        {
            title: 'Electronics',
            link: '/electronics',
            activeClass: 'active-link',
        },
    ];
}
