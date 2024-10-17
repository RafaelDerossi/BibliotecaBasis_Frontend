import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AppService } from '../core/services/global/app.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  appVersion = environment.version;
  sidebar: any = true;
  currentUrl: string;  
  interval: any;
  constructor(private router: Router, private app: AppService) {
    this.currentUrl = ''
    this.isCurrentRoute()
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    clearInterval(this.interval);
  }

    isCurrentRoute() {
    return this.sidebar = this.router.url.includes('administrador');
  }

}
