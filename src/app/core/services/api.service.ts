import { inject, Injectable } from '@angular/core';
import { Product } from '../../../type';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    private url = 'https://fakestoreapi.com';
    private http = inject(HttpClient);

    async getProducts(category?: string): Promise<Product[]> {
        const data = await fetch(
            category
                ? `${this.url}/products/category/${category}`
                : `${this.url}/products`
        );
        return (await data.json()) ?? [];
    }

    async getProductsWithLimit(
        limit: number,
        category?: string
    ): Promise<Product[]> {
        const data = await fetch(
            category
                ? `${this.url}/products/category/${category}?limit=${limit}`
                : `${this.url}/products?limit=${limit}`
        );
        return (await data.json()) ?? [];
    }

    async getProductById(id: string): Promise<Product | null> {
        const data = await fetch(`${this.url}/products/${id}`);
        return (await data.json()) ?? null;
    }
}
