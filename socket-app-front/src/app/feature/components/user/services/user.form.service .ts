import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../../../../user';

@Injectable()
export class UserFormService {

  private _formGroup: FormGroup
  constructor(private formBuilder: FormBuilder) { }

  public createForm() {
    this._formGroup = this.formBuilder.group({
      name: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      city: new FormControl(null, [Validators.required]),
      age: new FormControl(null, [Validators.required, Validators.min(1)]),
      active: new FormControl(false, [Validators.required]),
    });
  }

  public editForm(user: User) {
    this._formGroup = this.formBuilder.group({
      id: user.id,
      name: new FormControl(user.name, [Validators.required]),
      lastName: new FormControl(user.lastName, [Validators.required]),
      city: new FormControl(user.city, [Validators.required]),
      age: new FormControl(user.age, [Validators.required, Validators.min(1)]),
      active: new FormControl(user.active),
    })

  }

  public deleteForm(user: User) {
    this._formGroup = this.formBuilder.group({
      id: user.id,
      name: new FormControl({ value: user.name, disabled: true }),
      lastName: new FormControl({ value: user.lastName, disabled: true }),
      city: new FormControl({ value: user.city, disabled: true }),
      age: new FormControl({ value: user.age, disabled: true }),
      active: new FormControl({ value: user.active, disabled: true }),
    })
  }

  public get formGroup() {
    return this._formGroup;
  }

}
