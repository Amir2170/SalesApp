import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionFromComponent } from './production-from.component';

describe('ProductionFromComponent', () => {
  let component: ProductionFromComponent;
  let fixture: ComponentFixture<ProductionFromComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProductionFromComponent]
    });
    fixture = TestBed.createComponent(ProductionFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
