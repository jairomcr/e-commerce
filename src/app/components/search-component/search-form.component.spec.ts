import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchFormComponent } from './search-component';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SearchParamsStore } from '../../store/search-params.store';
import { By } from '@angular/platform-browser';

describe('SearchFormComponent', () => {
  let component: SearchFormComponent;
  let fixture: ComponentFixture<SearchFormComponent>;

  const mockStore = {
    setTitleParam: jasmine.createSpy('setTitleParam'),
    setMinPriceParam: jasmine.createSpy('setMinPriceParam'),
    setMaxPriceParam: jasmine.createSpy('setMaxPriceParam'),
    resetFilters: jasmine.createSpy('resetFilters'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchFormComponent, ReactiveFormsModule, FontAwesomeModule],
      providers: [
        { provide: SearchParamsStore, useValue: mockStore },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle dropdown visibility', () => {
    expect(component.showDropdown).toBeFalse();
    component.toggleDropdown();
    expect(component.showDropdown).toBeTrue();
  });

  it('should apply filters when form is valid', () => {
    component.form.setValue({
      title: 'Laptop',
      minPrice: 500,
      maxPrice: 1500,
    });

    component.applyFilters();

    expect(mockStore.setTitleParam).toHaveBeenCalledWith('Laptop');
    expect(mockStore.setMinPriceParam).toHaveBeenCalledWith(500);
    expect(mockStore.setMaxPriceParam).toHaveBeenCalledWith(1500);
    expect(component.showDropdown).toBeFalse();
  });

  it('should not apply filters if form is invalid', () => {
    component.form.patchValue({ title: 'a' }); // minlength error
    component.applyFilters();

    expect(mockStore.setTitleParam).not.toHaveBeenCalled();
  });

  it('should clear filters and reset the form', () => {
    component.clearFilters();
    expect(mockStore.resetFilters).toHaveBeenCalled();
    expect([null, '']).toContain(component.form.value.title ?? null);
    //expect(component.form.value.minPrice).toBeNull();
    //expect(component.form.value.maxPrice).toBeNull();
    expect(component.showDropdown).toBeFalse();
  });

  it('should show validation message if title is touched and invalid', () => {
    const titleControl = component.form.get('title');
    titleControl?.setValue('a');
    titleControl?.markAsTouched();
    fixture.detectChanges();

    const errorMsg = fixture.debugElement.query(By.css('.text-red-500'));
    expect(errorMsg.nativeElement.textContent).toContain('Mínimo 3 caracteres');
  });
});
