import { HttpClient } from '@angular/common/http';
import { Component, effect, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ApiService } from '../core/services/api-rx.service';
import { Observable } from 'rxjs';
import { Product } from '../../type';
import { AsyncPipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-test',
    template: `<div class="mt-28 pb-10 px-6">
        @for (product of products(); track product.id) {
        <h1>{{ product.price }}</h1>
        }
    </div>`,
})
export class TestComponent {
    productsService = inject(ApiService);
    products = toSignal(this.productsService.getProducts(), {
        initialValue: [],
    });

    constructor(private meta: Meta, private title: Title) {
        this.title.setTitle('Test');
        this.meta.updateTag({
            name: 'description',
            content: 'Test Page',
        });
        this.meta.updateTag({ property: 'og:title', content: 'Test' });
        this.meta.updateTag({
            property: 'og:description',
            content: 'Test page',
        });
    }
}
