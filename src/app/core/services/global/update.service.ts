import { AppService } from './app.service';
import { Injectable } from '@angular/core';

import { SwUpdate } from '@angular/service-worker';
@Injectable({
  providedIn: 'root'
})
export class UpdateService {
  constructor(private swUpdate: SwUpdate, private app: AppService) {
    this.swUpdate.available.subscribe(evt => {
      this.app.alert('Update Available').then(() => {

        window.location.reload();
      });

    });
  }
}
