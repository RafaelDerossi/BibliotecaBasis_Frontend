import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-prompt',
  templateUrl: './prompt.component.html',
  styleUrls: ['./prompt.component.scss']
})
export class PromptComponent implements OnInit {

  options: { text: string, value: any, cssClass: string }[];
  title: string;
  message: string;
  form: FormGroup;
  response: FormControl;

  @Input() validators: ValidatorFn | ValidatorFn[] = [Validators.maxLength(280)];

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.response = new FormControl('', this.validators);
    this.form = new FormGroup({ response: this.response });
  }

  setMessage(message: string | Array<string>) {
    const messageMerge = message instanceof Array ? message.join('<br>') : message;
    this.message = messageMerge;
  }

}
