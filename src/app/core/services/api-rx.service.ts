import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../../type';
import { Observable, forkJoin, mergeMap, catchError, of, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
    private readonly API_URL = 'https://fakestoreapi.com';

    constructor(private http: HttpClient) {}

    // Basic GET products with error handling
    getProducts(category?: string): Observable<Product[]> {
        return this.http.get<Product[]>(
            `${this.API_URL}/products/${category ? 'category' : ''}/${
                category ?? ''
            }`
        );
    }

    // Get products details by ID
    getProductsDetails(category?: string): Observable<Product[]> {
        return this.getProducts(category).pipe(
            mergeMap((products) =>
                forkJoin(
                    products.map((product) =>
                        this.http
                            .get<Product>(
                                `${this.API_URL}/products/${product.id}`
                            )
                            .pipe(
                                map((details) => ({
                                    ...product,
                                    details,
                                }))
                            )
                    )
                )
            )
        );
    }

    getProductById(id: string): Observable<Product> {
        return this.http.get<Product>(`${this.API_URL}/products/${id}`);
    }

    getProductsWithLimit(
        limit: number,
        category?: string
    ): Observable<Product[]> {
        const endpoint = category
            ? `${this.API_URL}/products/category/${category}?limit=${limit}`
            : `${this.API_URL}/products?limit=${limit}`;

        return this.http.get<Product[]>(endpoint).pipe(
            catchError(() => of([])) 
        );
    }
}
