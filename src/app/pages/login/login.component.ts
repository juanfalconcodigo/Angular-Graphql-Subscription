import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { Subscription } from 'rxjs';
import { SweetAlert } from 'src/app/sweetalert/sweetalert';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginSubscription: Subscription = null;

  data: { email: string, password: string } = {
    email: '',
    password: ''
  }
  constructor(private _apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this._apiService.start();
  }

  ngOnDestroy() {
    if (this.loginSubscription !== null) {
      this.loginSubscription.unsubscribe();
    }
  }


  async submit(ngForm: NgForm) {
    if (ngForm.invalid) {
      console.log("Formulario inválido");
      return
    }
    /* console.log(ngForm.value); */
    const { email, password } = ngForm.value;

    this.queryMutationLogin(email, password);
  }

  queryMutationLogin(email: string, password: string) {
    //me da un error de rendimiento pero al momento de entrar al ngOndestroy regresa a la normalidad
    this.loginSubscription = this._apiService.queryLogin(email, password).subscribe((result: any) => {
      console.log(result);
      const { user, token } = result;
      if (result.status) {
        this.router.navigate(['/home']);
        this._apiService.setLocalStorageUserToken(user, token);
      } else {
        new SweetAlert().messageError(result.message);
        this._apiService.deleteLocalStorageUserToken();
      }
    }, (err) => {
      console.log(err);
    });
  }

}
