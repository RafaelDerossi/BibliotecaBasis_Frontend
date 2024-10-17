import { Component, OnInit, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'tab-list',
  templateUrl: './tab-list.component.html',
  styleUrls: ['./tab-list.component.scss']
})
export class TabListComponent implements OnInit {

  protected status: boolean = false;

  @Input() title: string;
  @Input() tooltip: string;

  set active(value) {
    this.status = value;
    const el = this.element.nativeElement as HTMLElement;
    if (value) {
      el.removeAttribute('hidden');
    } else {
      el.setAttribute('hidden', 'hidden');
    }
  };

  constructor(private element: ElementRef) { }

  ngOnInit() {
    this.active = false;
  }

}
