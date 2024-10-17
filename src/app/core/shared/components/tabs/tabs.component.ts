import { Component, OnInit, ContentChildren, QueryList, Output, EventEmitter, Input, ViewChild, ElementRef } from '@angular/core';
import { TabListComponent } from './tab-list/tab-list.component';

@Component({
  selector: 'tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {

  inputActive = new EventEmitter<any>();

  @Output() buscaConcessao = '';
  @Output() buscarAgentes = '';

  selectIndex: number = 0;
  deleteIndex: number = -1;
  tabWidth: number = 0;

  // Pega todos os Tabs
  @ContentChildren(TabListComponent) tabs: QueryList<TabListComponent>;
  @Output() selectChange = new EventEmitter<number>();
  @Input('status-close') statusClose: boolean = false;

  @ViewChild('elementTabs') elementTabs: ElementRef;

  ngAfterContentInit() {
    // get all active tabs
    let activeTabs = this.tabs.filter((tab, i) => tab.active);

    // if there is no active tab set, activate the first
    if (activeTabs.length === 0) {
      this.selectTab(this.tabs.first, activeTabs);
    }
  }

  selectTab(tab: TabListComponent, index) {
    // deactivate all tabs
    this.tabs.toArray().forEach(tab => tab.active = false);

    // activate the tab the user has clicked on.
    tab.active = true;
    // this.inputActive = index;
    this.selectChange.emit(index);
    this.inputActive.emit(index)


    if (this.tabWidth == 0) {
      this.updateTabs();
    }
  }

  updateTabs() {
    setTimeout(() => {
      if (this.elementTabs != undefined) {
        let width = this.elementTabs.nativeElement.offsetWidth;
        let qtd = Math.round(width / 230);

        this.tabWidth = Math.trunc(width / qtd) - 0.5;
      }
    });
  }

  ngOnInit() {

  }
}

