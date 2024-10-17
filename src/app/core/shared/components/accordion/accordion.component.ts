import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';

export interface header {
  title: string;
  disabled: boolean;
  cardClass: string;
}
@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent implements OnInit {

  @Input() closeOthers;
  @Input() destroyOnHide;
  @Input() type;
  @Input() isExpanded;
  @Input() expand;
  @Input() expandAll;
  @Input() collapse;
  @Input() collapseAll;
  @Input() toggle;
  @Input() cardClass;
  @Input() disabled;
  @Input() title;
  @Input() headers = {
    title: 'string',
    disabled: 'boolean',
    cardClass: 'string',
  };
  @Input() activeIds;

  @Output() panelChange: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }

  beforeChange(event: NgbPanelChangeEvent) {
    this.panelChange.emit(event);
  }
}
