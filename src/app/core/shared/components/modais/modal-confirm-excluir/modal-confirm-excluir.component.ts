import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, ValidatorFn, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-confirm-excluir',
  templateUrl: './modal-confirm-excluir.component.html',
  styleUrls: ['./modal-confirm-excluir.component.scss']
})
export class ModalConfirmExcluirComponent implements OnInit {

  options: { text: string, value: any, cssClass: string }[];
  buttonText: string;
  message: string;
  form: FormGroup;
  response: FormControl;

  @Input() validators: ValidatorFn | ValidatorFn[];

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.response = new FormControl('', this.validators ? this.validators : Validators.required);
    this.form = new FormGroup({ response: this.response });
  }

  setMessage(message: string | Array<string>) {
    const messageMerge = message instanceof Array ? message.join('<br>') : message;
    this.message = messageMerge;
  }

  save(action: 'close' | any) {
    this.activeModal.close(action);
  }
}
