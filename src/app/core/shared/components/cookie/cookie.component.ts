import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cookie',
  templateUrl: './cookie.component.html',
  styleUrls: ['./cookie.component.scss']
})
export class CookieComponent implements OnInit {

  @Input() acceptCookie;
  constructor() { }

  ngOnInit(): void {
    this.verificarSeAceitouCookie();
  }

  verificarSeAceitouCookie() {
    this.acceptCookie = JSON.parse(localStorage.getItem(environment.storageCookieKey));
  }

  aceitarCookie() {
    this.acceptCookie = true;
    localStorage.setItem(environment.storageCookieKey, JSON.stringify(true));
  }
}
