import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Subscription } from 'rxjs';
import { PublicationI } from 'src/app/interfaces/publication';
import { SweetAlert } from 'src/app/sweetalert/sweetalert';
import { UserI } from 'src/app/interfaces/user';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.scss']
})
export class PublicationComponent implements OnInit, OnDestroy {

  startSubscription: Subscription = null;
  publicationSubscription: Subscription = null;
  publicationSubscriptionListener: Subscription = null;
  public publications: PublicationI[] = [];
  user: UserI = null;
  loading: boolean = true;


  constructor(private _apiService: ApiService) { }

  ngOnInit(): void {
    this._apiService.start();
    this.user = this._apiService.getLocalStorageUser();
    this.publicationSubscription = this._apiService.queryPublication(false).subscribe((result: PublicationI[]) => {
      this.publications = result;
      this.loading = false;
      console.log(this.publications);
    });
    this.changePublications();
  }

  changePublications() {
    this.publicationSubscriptionListener = this._apiService.subscriptionPublicationListener(false).subscribe((result: any) => {
      const { changeVotes } = result['data'];
      this.loading = true;
      setTimeout(() => {
        this.publications = changeVotes;
        this.loading = false
        console.log(this.publications);
      }, 800);
    });
  }



  ngOnDestroy() {
    this.publicationSubscription.unsubscribe();
    this.publicationSubscriptionListener.unsubscribe();
  }

  addVote(idPublication: string, idUser: string) {
    console.log('Add vote')
    this._apiService.mutationAddVote(idPublication, idUser, true).subscribe((result: any) => {
      const { status, message } = result['data'].createVote;
      console.log(result['data'].createVote);
      if (status) {
        new SweetAlert().messageSuccess(message);
      } else {
        new SweetAlert().messageError(message);
      }
    }, (err) => {
      console.log(err);
    });
  }

  deleteVote(idPublication: string, idUser: string) {
    console.log('Delete vote')
    this._apiService.mutatioDeleteVote(idPublication, idUser, true).subscribe((result: any) => {
      const { status, message } = result['data'].deleteVote;
      console.log(result['data'].deleteVote);
      if (status) {
        new SweetAlert().messageSuccess(message);
      } else {
        new SweetAlert().messageError(message);
      }
    },
      (err) => {
        console.log(err);
      });
  }

}
