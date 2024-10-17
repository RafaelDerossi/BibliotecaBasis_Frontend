import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-trasnfer-pre-cadastro',
  templateUrl: './confirm-trasnfer-pre-cadastro.component.html',
  styleUrls: ['./confirm-trasnfer-pre-cadastro.component.scss']
})
export class ConfirmTrasnferPreCadastroComponent {

  options: { text: string, value: any, cssClass: string }[];
  title: string;
  message: string;
  pathImage: string;

  constructor(public activeModal: NgbActiveModal) { }


  setMessage(message: string | Array<string>) {
    const messageMerge = message instanceof Array ? message.join('<br>') : message;
    this.message = messageMerge;
  }

}
