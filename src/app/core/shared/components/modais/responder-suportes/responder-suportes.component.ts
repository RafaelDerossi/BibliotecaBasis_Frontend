import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
// import { ChamadosService } from '@app/core/services/chamados.service';
// import { ConfigurationEditor } from '@app/core/interfaces/editor';
import { CKEditor4 } from 'ckeditor4-angular';

@Component({
  selector: 'app-responder-suportes',
  templateUrl: './responder-suportes.component.html',
  styleUrls: ['./responder-suportes.component.scss']
})
export class ResponderSuportesComponent implements OnInit {

  // editorConfig = ConfigurationEditor;
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  save() {

  }

}
