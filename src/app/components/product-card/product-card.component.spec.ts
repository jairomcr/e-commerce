import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductCardComponent } from './product-card.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ShortDescriptionPipe } from '../../shared/pipes/short-description.pipe';
import { ClickLoggerDirective } from '../../shared/directives/click-logger.directive';
import { ShoppingCartStore } from '../../store/shopping-cart.store';
import { FavoriteItemsStore } from '../../store/favorite-items.store';
import { signal } from '@angular/core';
import { provideRouter } from '@angular/router';
import { Product } from '../../../type';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;

  const mockProduct: Product = {
    id: 1,
    title: 'Test Product',
    description: 'This is a test product.',
    price: 99.99,
    category: 'electronics',
    image: 'https://via.placeholder.com/150',
  };

  const mockCartStore = {
    addItem: jasmine.createSpy('addItem'),
    checkItemAlreadyExist: jasmine.createSpy('checkItemAlreadyExist').and.returnValue(false),
    itemQuantity: signal(0),
  };

  const mockFavoriteStore = {
    addItem: jasmine.createSpy('addItem'),
    removeItem: jasmine.createSpy('removeItem'),
    checkItemAlreadyExist: jasmine.createSpy('checkItemAlreadyExist').and.returnValue(false),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProductCardComponent,
        FontAwesomeModule,
        ShortDescriptionPipe,
        ClickLoggerDirective,
      ],
      providers: [
        { provide: ShoppingCartStore, useValue: mockCartStore },
        { provide: FavoriteItemsStore, useValue: mockFavoriteStore },
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;

    
    const descriptor = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(component), 'product');
    descriptor?.get?.call(component).set(mockProduct);

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render product title and price', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Test Product');
    expect(compiled.textContent).toContain('$ 99.99');
  });

  it('should call addItem when Add to Cart is clicked', () => {
    const button = fixture.nativeElement.querySelector('button.btn-primary');
    button.click();
    expect(mockCartStore.addItem).toHaveBeenCalled();
  });

  it('should toggle favorite correctly', () => {
    component.toggleFavoriteItem();
    expect(mockFavoriteStore.addItem).toHaveBeenCalledWith(mockProduct);
  });
});
