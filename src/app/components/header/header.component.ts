import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private _apiService: ApiService) { }

  ngOnInit(): void {
  }

  logout() {
    this._apiService.deleteLocalStorageUserToken();
    this.router.navigate(['login']);
  }

}
