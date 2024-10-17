import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-alert-excluir',
  templateUrl: './modal-alert-excluir.component.html',
  styleUrls: ['./modal-alert-excluir.component.scss']
})
export class ModalAlertExcluirComponent implements OnInit {

  message: string;
  buttonText: string;

  constructor(
    public activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
  }


  save(action: 'confirm' | 'close') {
    this.activeModal.close(action);
  }


  setMessage(message: string | Array<string>) {
    const messageMerge = message instanceof Array ? message.join('<br>') : message;
    this.message = messageMerge;
  }



}
