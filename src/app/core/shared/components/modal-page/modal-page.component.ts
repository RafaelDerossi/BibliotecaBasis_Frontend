import {Component, OnInit, ViewContainerRef, ViewChild, TemplateRef, AfterViewChecked} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-page',
  templateUrl: './modal-page.component.html',
  styleUrls: ['./modal-page.component.scss']
})
export class ModalPageComponent implements OnInit, AfterViewChecked {

  title = '';
  template: TemplateRef<any>;
  htmlContent: string;
  @ViewChild('m', {static: true, read: ViewContainerRef}) m: ViewContainerRef;

  constructor(public activeModal: NgbActiveModal) {
  }

  render(template: TemplateRef<any>) {
    this.template = template;
    // this.htmlContent = template.elementRef.nativeElement.innerHTML;

    this.renderTwo();
  }

  ngAfterViewChecked() {

  }

  renderTwo() {
    if (this.template) {
      const view = this.template.createEmbeddedView({});
      this.m.clear();
      this.m.insert(view);
    } else {
    }
  }

  ngOnInit() {
  }

}
