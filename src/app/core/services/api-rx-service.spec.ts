import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';

import { ApiService } from './api-rx.service';
import type { Product } from '../../../type';

type ProductWithDetails = Product & { details: Product };

describe('ApiService', () => {
  let service: ApiService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
      providers: [
        ApiService,
        { provide: HttpClient, useValue: spy },
      ],
    });

    service = TestBed.inject(ApiService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getProducts', () => {
    it('should return an Observable', (done) => {
      const mockProducts: Product[] = [];
      httpClientSpy.get.and.returnValue(of(mockProducts));

      service.getProducts().subscribe((result) => {
        expect(result).toEqual([]);
        done();
      });
    });

    it('should call correct URL without category', (done) => {
      const mockProducts: Product[] = [{ id: 1, title: 'Product 1' } as Product];
      httpClientSpy.get.and.returnValue(of(mockProducts));

      service.getProducts().subscribe((products) => {
        expect(products).toEqual(mockProducts);
        expect(httpClientSpy.get).toHaveBeenCalledWith('https://fakestoreapi.com/products//');
        done();
      });
    });

    it('should call correct URL with category', (done) => {
      const mockProducts: Product[] = [{ id: 2, title: 'Product 2' } as Product];
      httpClientSpy.get.and.returnValue(of(mockProducts));

      service.getProducts('electronics').subscribe((products) => {
        expect(products).toEqual(mockProducts);
        expect(httpClientSpy.get).toHaveBeenCalledWith('https://fakestoreapi.com/products/category/electronics');
        done();
      });
    });
  });

  describe('getProductsDetails', () => {
    it('should get product details for each product', (done) => {
      const baseProducts: Product[] = [
        { id: 1, title: 'Prod1' } as Product,
        { id: 2, title: 'Prod2' } as Product,
      ];
      const details1 = { id: 1, title: 'Prod1 detail' } as Product;
      const details2 = { id: 2, title: 'Prod2 detail' } as Product;

      spyOn(service, 'getProducts').and.returnValue(of(baseProducts));

      httpClientSpy.get.withArgs('https://fakestoreapi.com/products/1').and.returnValue(of(details1));
      httpClientSpy.get.withArgs('https://fakestoreapi.com/products/2').and.returnValue(of(details2));

      service.getProductsDetails().subscribe((results) => {
        expect(results.length).toBe(2);
        expect(results[0].details).toEqual(details1);
        expect(results[1].details).toEqual(details2);
        done();
      });
    });
  });

  describe('getProductById', () => {
    it('should get product by id', (done) => {
      const mockProduct = { id: 10, title: 'Prod10' } as Product;
      httpClientSpy.get.and.returnValue(of(mockProduct));

      service.getProductById('10').subscribe((product) => {
        expect(product).toEqual(mockProduct);
        expect(httpClientSpy.get).toHaveBeenCalledWith('https://fakestoreapi.com/products/10');
        done();
      });
    });
  });

  describe('getProductsWithLimit', () => {
    it('should call correct URL with category and limit', (done) => {
      const mockProducts: Product[] = [{ id: 3, title: 'Prod3' } as Product];
      httpClientSpy.get.and.returnValue(of(mockProducts));

      service.getProductsWithLimit(5, 'jewelery').subscribe((products) => {
        expect(products).toEqual(mockProducts);
        expect(httpClientSpy.get).toHaveBeenCalledWith('https://fakestoreapi.com/products/category/jewelery?limit=5');
        done();
      });
    });

    it('should call correct URL without category and with limit', (done) => {
      const mockProducts: Product[] = [{ id: 4, title: 'Prod4' } as Product];
      httpClientSpy.get.and.returnValue(of(mockProducts));

      service.getProductsWithLimit(10).subscribe((products) => {
        expect(products).toEqual(mockProducts);
        expect(httpClientSpy.get).toHaveBeenCalledWith('https://fakestoreapi.com/products?limit=10');
        done();
      });
    });

    it('should return empty array on error', (done) => {
      httpClientSpy.get.and.returnValue(throwError(() => new Error('error')));

      service.getProductsWithLimit(5).subscribe((products) => {
        expect(products).toEqual([]);
        done();
      });
    });
  });
});
