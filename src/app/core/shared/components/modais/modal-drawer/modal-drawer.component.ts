import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal-drawer',
  templateUrl: './modal-drawer.component.html',
  styleUrls: ['./modal-drawer.component.scss']
})
export class ModalDrawerComponent implements OnInit {


  @Input() modalOpen: boolean = false;
  @Input() titulo: any;
  @Input() buttons: any;
  @Output() modalClose: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  close() {
    this.modalClose.emit(false);
    this.modalOpen = false;
  }
}
