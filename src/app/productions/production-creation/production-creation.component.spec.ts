import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionCreationComponent } from './production-creation.component';

describe('ProductionCreationComponent', () => {
  let component: ProductionCreationComponent;
  let fixture: ComponentFixture<ProductionCreationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductionCreationComponent]
    });
    fixture = TestBed.createComponent(ProductionCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
