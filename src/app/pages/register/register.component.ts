import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import InputUserI from '../../interfaces/inputUser';
import { SweetAlert } from 'src/app/sweetalert/sweetalert';
import { ApiService } from 'src/app/services/api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerSubscription: Subscription = null;
  policy: boolean = false;
  data: InputUserI = {
    name: '',
    lastName: '',
    age: 15,
    password: '',
    email: '',
    role: 'USER_ROLE'
  }

  constructor(private _apiService: ApiService) { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    if (this.registerSubscription !== null) {
      this.registerSubscription.unsubscribe();
    }
  }



  submit(ngForm: NgForm) {
    if (ngForm.invalid) {
      console.log('Formulario inválido');
      return;
    }
    if (this.data.age < 15 || this.data.age > 90) {
      console.log('Campo edad inválido');
      new SweetAlert().messageError('Campo edad inválido');
      return;
    }
    console.log(this.data);
    this.mutationRegisterUser(this.data);
  }

  mutationRegisterUser(user: InputUserI) {
    this.registerSubscription = this._apiService.mutationRegister(user).subscribe(async (result: any) => {
      console.log(result['data'].createUser);
      const { status, message } = result['data'].createUser;
      if (status) {
        await new SweetAlert().messageSuccess(message);
        await this.cleanForm();
      } else {
        new SweetAlert().messageError(message);
      }
    });
  }

  cleanForm() {
    this.policy = false;
    this.data = {
      name: '',
      lastName: '',
      age: 15,
      password: '',
      email: '',
      role: 'USER_ROLE'
    }
  }

}
