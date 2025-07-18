import { Injectable, computed } from '@angular/core';
import { Product } from '../../type';
import {
    patchState,
    signalState,
    signalStore,
    withComputed,
    withMethods,
    withState,
} from '@ngrx/signals';

export const FavoriteItemsStore = signalStore(
    { providedIn: 'root' },
    withState({
        items: [] as Product[],
        loading: false,
        error: null as string | null,
    }),
    withComputed(({ items }) => ({
        itemCount: computed(() => items().length),
        hasItems: computed(() => items().length > 0),
    })),
    withMethods((store, key = 'ng_e_commerce_favorite_items') => {
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
                        error: 'Failed to load favorites',
                        loading: false,
                    });
                }
            },

            addItem(item: Product) {
                if (!store.items().some((i) => i.id === item.id)) {
                    const items = [...store.items(), item];
                    saveItems(items);
                }
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

            toggleItem(item: Product) {
                if (this.checkItemAlreadyExist(item.id)) {
                    this.removeItem(item);
                } else {
                    this.addItem(item);
                }
            },
        };
    })
);
