import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionEditionComponent } from './production-edition.component';

describe('ProductionEditionComponent', () => {
  let component: ProductionEditionComponent;
  let fixture: ComponentFixture<ProductionEditionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProductionEditionComponent]
    });
    fixture = TestBed.createComponent(ProductionEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
