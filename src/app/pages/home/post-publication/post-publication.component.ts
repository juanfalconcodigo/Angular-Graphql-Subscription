import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { InputPublicationI } from 'src/app/interfaces/inputPublication';
import { NgForm } from '@angular/forms';
import { UserI } from 'src/app/interfaces/user';
import { Subscription } from 'rxjs';
import { SweetAlert } from 'src/app/sweetalert/sweetalert';

/* interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
} */

@Component({
  selector: 'app-post-publication',
  templateUrl: './post-publication.component.html',
  styleUrls: ['./post-publication.component.scss']
})
export class PostPublicationComponent implements OnInit, OnDestroy {
  user: UserI = null;
  data: InputPublicationI = {
    description: '',
    img: '',
    user: ''
  };
  postMutationSubscription: Subscription = null;

  constructor(private _apiService: ApiService) { }

  ngOnInit(): void {
    this._apiService.start();
    this.user = this._apiService.getLocalStorageUser();
    this.data.user = this.user?._id;

  }

  ngOnDestroy() {
    if (this.postMutationSubscription !== null) {
      this.postMutationSubscription.unsubscribe();
    }
  }

  submit(ngForm: NgForm) {

    if (ngForm.invalid) {
      console.log('Formulario inválido');
      return;
    }


    console.log(this.data);
    this.postMutationSubscription = this._apiService.mutationPostPublication(this.data, true).subscribe((result: any) => {
      const { status, message } = result['data'].createPublication;
      if (status) {
        new SweetAlert().messageSuccess(message);
      } else {
        new SweetAlert().messageError(message);
      }
    },
      (err) => console.log(err));
  }

}
