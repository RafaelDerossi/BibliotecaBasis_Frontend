import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-collapse',
  templateUrl: './collapse.component.html',
  styleUrls: ['./collapse.component.scss']
})
export class CollapseComponent implements OnInit {

  @Input() isCollapsed = true;

  constructor() { }

  ngOnInit() { }

  toogle() {
    this.isCollapsed = !this.isCollapsed;
  }

}
