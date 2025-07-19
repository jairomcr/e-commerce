import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { checkoutGuard } from './core/guards/checkout.guard';

export const routes: Routes = [
    {
        path: '',
        title: 'Home',
        loadComponent: () =>
            import('./pages/home/home.component').then((m) => m.HomeComponent),
    },
    {
        path: 'favorite-items',
        title: 'Favorite Items',
        loadComponent: () =>
            import('./pages/favorite-items/favorite-items.component').then(
                (m) => m.FavoriteItemsComponent
            ),
    },
    {
        path: 'products/:id',
        title: 'Product Details',
        loadComponent: () =>
            import('./pages/product-detail/product-detail.component').then(
                (m) => m.ProductDetailComponent
            ),
    },
    {
        path: 'men-clothing',
        title: `Men's Clothings`,
        loadComponent: () =>
            import('./pages/men-clothing/men-clothing.component').then(
                (m) => m.MenClothingComponent
            ),
    },
    {
        path: 'women-clothing',
        title: `Women's Clothings`,
        loadComponent: () =>
            import('./pages/women-clothing/women-clothing.component').then(
                (m) => m.WomenClothingComponent
            ),
    },
    {
        path: 'jewelry',
        title: 'Jewelry',
        loadComponent: () =>
            import('./pages/jewelry/jewelry.component').then(
                (m) => m.JewelryComponent
            ),
    },
    {
        path: 'electronics',
        title: 'Electronics',
        loadComponent: () =>
            import('./pages/electronics/electronics.component').then(
                (m) => m.ElectronicsComponent
            ),
    },
    {
        path: 'shopping-cart',
        title: 'Shopping Cart',
        canActivate: [authGuard],
        canDeactivate: [checkoutGuard],
        loadComponent: () =>
            import('./pages/shopping-cart/shopping-cart.component').then(
                (m) => m.ShoppingCartComponent
            ),
    },
    {
        path: 'login',
        title: 'Login',
        loadComponent: () =>
          import('./pages/auth/login.component').then((m) => m.LoginComponent),
    },
];
