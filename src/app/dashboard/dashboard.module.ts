import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../core/shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomeModule } from './home/home.module';

@NgModule({
  declarations: [
    DashboardComponent,    
    SidebarComponent,    
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,    
    CommonModule,    
    HomeModule,    
    SharedModule,
  ]
})
export class DashboardModule { }
