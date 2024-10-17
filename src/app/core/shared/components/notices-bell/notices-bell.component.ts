import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'notices-bell',
  templateUrl: './notices-bell.component.html',
  styleUrls: ['./notices-bell.component.scss']
})
export class NoticesBellComponent implements OnInit {

  @Input() color: string;
  @Input() notificationCount: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
