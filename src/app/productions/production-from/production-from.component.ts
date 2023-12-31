import {Component, forwardRef, OnDestroy, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR, ReactiveFormsModule, ValidationErrors, Validator,
  Validators
} from "@angular/forms";
import {Subject, takeUntil} from "rxjs";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {WarehousesService} from "../../services/warehouses/warehouses.service";
import {Warehouse} from "../../models/warehouse";

@Component({
  selector: 'app-production-from',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './production-from.component.html',
  styleUrls: ['./production-from.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ProductionFromComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ProductionFromComponent),
      multi: true
    }
  ],
})
export class ProductionFromComponent implements ControlValueAccessor, OnDestroy, Validator, OnInit{

  // variable containing all warehouses
  warehouses: Warehouse[] = [];

  destroySubject = new Subject<void>();

  // injecting warehouse service and formBuilder
  constructor(
    private formBuilder: FormBuilder,
    private warehousesService: WarehousesService,
  ) {
  }

  ngOnInit() {
    this.getWarehouses();
  }

  // production form group
  productionForm: FormGroup = this.formBuilder.group({
    title:['', Validators.required],
    strategicResource: ['', Validators.required],
    code: ['', Validators.required],
    warehouseId: ['', Validators.required],
  });

  // convenience getter for easy access to form fields
  get formTitle() { return this.productionForm.get('title') };
  get formcode() { return this.productionForm.get('code') };
  get formstrategicResource() { return this.productionForm.get('strategicResource') };
  get formWarehouseId() { return this.productionForm.get('warehouseId') };

  // get all warehouses and set warehouses variable USED IN VIEW
  getWarehouses() {
    this.warehousesService.getWarehouses()
      .subscribe(result => {
        this.warehouses = result;
      });
  }

  // propagates value changes to parent form control when nested production form changes
  registerOnChange(fn: any) {
    this.productionForm.valueChanges.pipe(takeUntil(this.destroySubject)).subscribe(fn);
  }

  // marks parent form control as touched when nested address form changes
  registerOnTouched(fn: any) {
    this.productionForm.valueChanges.pipe(takeUntil(this.destroySubject)).subscribe(fn);
  }

  // disabled nested production form when parent form control is disabled
  setDisabledState(isDisabled: boolean) {
    isDisabled ? this.productionForm.disable() : this.productionForm.enable();
  }

  // writes value to nested production form when value is set to parent form control
  writeValue(obj: any) {
    this.productionForm.patchValue(obj, {emitEvent: false});
  }

  // propagates validation errors from nested production form to parent form control
  validate(control: AbstractControl): ValidationErrors | null {
    return this.productionForm.valid ? null : { valid: false };
  }

  // needed to unsubscribe from observables when production component is destroyed
  ngOnDestroy() {
    this.destroySubject.next();
    this.destroySubject.complete();
  }
}
