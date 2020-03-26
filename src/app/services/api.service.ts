import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map, delay } from 'rxjs/operators';
import { login, getPublication, meUser } from '../operations/query';
import { registerUser, postAddVote, deleteVote, postPublication } from '../operations/mutation';
import InputUserI from '../interfaces/inputUser';
import { changePublication } from '../operations/subscription';
import { UserI } from '../interfaces/user';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { InputPublicationI } from 'src/app/interfaces/inputPublication';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private apollo: Apollo, private router: Router) { }

  queryLogin(email: string, password: string) {
    return this.apollo.watchQuery({
      query: login,
      variables: {
        email,
        password
      },
      fetchPolicy: 'network-only'
    }).valueChanges.pipe(map((result: any) => result['data'].login))
  }

  mutationRegister(userInput: InputUserI) {
    //console.log(userInput);
    return this.apollo.mutate({
      mutation: registerUser,
      variables: {
        user: userInput
      }
    });
  }

  queryPublication(skip: boolean) {
    return this.apollo.watchQuery({
      query: getPublication,
      variables: {
        skip
      },
      fetchPolicy: 'network-only'
    }).valueChanges.pipe(map((result: any) => result['data'].publications),delay(600));
  }

  subscriptionPublicationListener(skip: boolean) {
    return this.apollo.subscribe({
      query: changePublication,
      variables: {
        skip
      }
    });
  }

  mutationAddVote(idPublication: string, idUser: string, skip: boolean) {
    return this.apollo.mutate({
      mutation: postAddVote,
      variables: {
        idPublication,
        idUser,
        skip
      }
    });
  }

  mutatioDeleteVote(idPublication: string, idUser: string, skip: boolean) {
    return this.apollo.mutate({
      mutation: deleteVote,
      variables: {
        idPublication,
        idUser,
        skip
      }
    });
  }

  queryMe(token: string, skip: boolean = true) {
    return this.apollo.watchQuery({
      query: meUser,
      variables: {
        skip
      },
      context: {
        headers: new HttpHeaders({
          token
        })
      },
      fetchPolicy: 'network-only'
    }).valueChanges.pipe(map((result: any) => {
      return result['data'].me
    }));
  }

  mutationPostPublication(publication: InputPublicationI, skip: boolean) {
    return this.apollo.mutate({
      mutation: postPublication,
      variables: {
        publication,
        skip
      }
    });
  }



  //local storage

  setLocalStorageUserToken(user: UserI, token: string) {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
  }
  getLocalStorageUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
  getLocalStorageToken() {
    return localStorage.getItem('token');
  }
  deleteLocalStorageUserToken() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

  start() {
    const token = this.getLocalStorageToken();
    if (token === null || undefined === null) {
      return console.log('No existe el token');
    }
    this.queryMe(token).subscribe((result: any) => {
      const { status, message } = result;
      console.log(status, message)
      if (status) {
        /* console.log(this.router.url); */
        if (this.router.url === '/login') {
          this.router.navigate([`/home`]);
        }
      } else {
        return this.router.navigate(['login']);
      }
    },
      (err) => {
        console.log(err)
      });
  }


}
