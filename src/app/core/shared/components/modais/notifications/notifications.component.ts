import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  @Input() iconName: string;
  @Input() title: string;
  @Input() message: string;

  @Input() options: { text: string, value: any, cssClass: string }[];

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  setMessage(message: string | Array<string>) {
    const messageMerge = message instanceof Array ? message.join('<br />') : message;
    this.message = messageMerge;
  }

  action(value) {
    return this.activeModal.close(value);
  }


}
