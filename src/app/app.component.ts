import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AppService } from './core/services/global/app.service';

import { SwPush, SwUpdate } from '@angular/service-worker';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Biblioteca';
  loading: boolean = false;
  user: any;
  errorLogin: boolean;
  version = environment.version;

  isEnabled = this.swPush.isEnabled;
  isGranted = Notification.permission === 'granted';
  acceptCookie: boolean = false;

  constructor(    
    private router: Router,
    private app: AppService,
    private swPush: SwPush,
    private swUpdate: SwUpdate
  ) {
    console.info(
      `%mBiblioteca - Local: ${
        environment.production ? 'Production' : 'Development'
      } / Versão: ${environment.version}`,
      'font-size:18px; color:#03286a; background:#FFF; padding: 5px; border-radius: 5px;'
    );
  }

  ngOnInit() {
    this.mudarTemaDeFundo();
    this.verificarAtualizacao();   
  }

  verificarAtualizacao() {
    this.swUpdate.checkForUpdate().then((event) => {
      if (event) {
        this.app
          .confirm(
            `Nova atualização ${environment.version}`,
            'Obaa🥳🥳, hoje é dia de festa, pois temos uma nova atualização. Veja mais em <a href="ajuda">central condompínioapp</a>.',
            [
              {
                text: 'Cancelar',
                value: false,
                cssClass: 'btn btn-link btn-sm',
              },
              {
                text: 'Atualizar',
                value: true,
                cssClass: 'btn-primary btn-sm',
              },
            ]
          )
          .then((result) => {
            if (result) {
              this.swUpdate.activateUpdate().then(() => location.reload());
            }
          });
      }
    });
  }

  mudarTemaDeFundo() {
    let theme = localStorage.getItem(environment.storageThemeKey);

    if (theme) {
      let classeAtual = document.body.classList.value;
      document.body.classList.remove(classeAtual);
      document.body.classList.add(JSON.parse(theme));
    }
    else{      
      let classeAtual = document.body.classList.value;
      document.body.classList.remove(classeAtual);
      document.body.classList.add('background-black');
    }
  }  
  
}
