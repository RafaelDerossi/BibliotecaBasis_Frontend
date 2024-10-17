import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-alert-push',
  templateUrl: './alert-push.component.html',
  styleUrls: ['./alert-push.component.scss']
})
export class AlertPushComponent implements OnInit {

  title: string;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
