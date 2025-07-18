import { Injectable } from '@angular/core';
import { Product } from '../../type';
import {
    patchState,
    signalState,
    signalStore,
    withComputed,
    withMethods,
    withState,
} from '@ngrx/signals';
import { computed } from '@angular/core';

export const ShoppingCartStore = signalStore(
    { providedIn: 'root' },
    withState({
        items: [] as Product[],
        loading: false,
        error: null as string | null,
    }),
    withComputed(({ items }) => ({
        itemQuantity: computed(() =>
            items().reduce((total, item) => total + (item.quantity || 1), 0)
        ),
    })),
    withMethods((store, key = 'ng_e_commerce_cart_items') => {
        function loadItems(): Product[] {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : [];
        }

        function saveItems(items: Product[]) {
            localStorage.setItem(key, JSON.stringify(items));
            patchState(store, { items });
        }

        return {
            load() {
                patchState(store, { loading: true });
                try {
                    const items = loadItems();
                    patchState(store, { items, loading: false });
                } catch (error) {
                    patchState(store, {
                        error: 'Failed to load cart',
                        loading: false,
                    });
                }
            },

            addItem(item: Product) {
                const items = [...store.items(), item];
                saveItems(items);
            },

            removeItem(item: Product) {
                const newItems = store.items().filter((i) => i.id !== item.id);
                saveItems(newItems);
            },

            updateItem(item: Product) {
                const newItems = store
                    .items()
                    .map((i) => (i.id === item.id ? item : i));
                saveItems(newItems);
            },

            clearItems() {
                localStorage.removeItem(key);
                patchState(store, { items: [] });
            },

            checkItemAlreadyExist(id: number) {
                return store.items().some((item) => item.id === id);
            },
        };
    })
);
