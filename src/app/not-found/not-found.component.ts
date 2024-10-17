import { Component, OnInit } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {


  options: AnimationOptions = {
    path: '/assets/lottie/page-not-found.json',
  };

  constructor() { }

  ngOnInit(): void {
  }

  animationCreated(animationItem: AnimationItem): void {
  }

  goBack() {
    window.history.back();
  }

  navigateToLogin() {
    localStorage.clear();
    location.href = "/auth/login";
  }
}
