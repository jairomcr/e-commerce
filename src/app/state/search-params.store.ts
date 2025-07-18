import { Injectable, computed } from '@angular/core';
import { patchState, signalState } from '@ngrx/signals';

export interface SearchParams {
    titleParam: string;
    minPriceParam: number | null;
    maxPriceParam: number | null;
}

@Injectable({
    providedIn: 'root',
})
export class SearchParamsStore {
    // Initial state
    private initialState: SearchParams = {
        titleParam: '',
        minPriceParam: null,
        maxPriceParam: null,
    };

    // Create signal state
    state = signalState<SearchParams>(this.initialState);

    // Computed properties
    hasFilters = computed(
        () =>
            this.state.titleParam().length > 0 ||
            this.state.minPriceParam() !== null ||
            this.state.maxPriceParam() !== null
    );

    // Update methods
    setTitleParam(title: string) {
        patchState(this.state, { titleParam: title });
    }

    setMinPriceParam(price: number | null) {
        patchState(this.state, { minPriceParam: price });
    }

    setMaxPriceParam(price: number | null) {
        patchState(this.state, { maxPriceParam: price });
    }

    resetFilters() {
        patchState(this.state, this.initialState);
    }
}
