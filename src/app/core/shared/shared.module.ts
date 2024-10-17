import { NgModule } from '@angular/core';
import { SwiperModule } from 'swiper/angular';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { WebCamModule } from 'ack-angular-webcam';
import { NgxPrintModule } from 'ngx-print';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DragDropModule } from "@angular/cdk/drag-drop";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbAccordionModule, NgbCarouselModule, NgbCollapseModule, NgbDropdownModule, NgbModule, NgbNavModule, NgbPopoverModule, NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";
import { CalendarModule, DateAdapter } from "angular-calendar";
import { NgxCurrencyModule } from "ngx-currency";
import { LottieModule } from "ngx-lottie";
import { NgxMaskModule } from "ngx-mask";
import { ToastrModule } from "ngx-toastr";
import { CurrencyMaskConfig, momentAdapterFactory, NgxMaskIConfig, PlayerFactoryLottieConfig } from "./utils/configs";
import { ConnectionServiceModule } from 'ngx-connection-service';
import { NgQrScannerModule } from 'angular2-qrscanner';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { FileSaverModule } from 'ngx-filesaver';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { DndModule } from 'ngx-drag-drop';
import { ImageCropperModule } from 'ngx-image-cropper';
import { httpInterceptorProviders } from '../http-interceptors';
import { LoadingComponent } from './components/loading/loading.component';
import { CookieComponent } from './components/cookie/cookie.component';
import { SortbypipePipe } from './pipes/sortbypipe.pipe';
import { NoticesBellComponent } from './components/notices-bell/notices-bell.component';
import { ConfirmComponent } from './components/modais/confirm/confirm.component';
import { AlertComponent } from './components/modais/alert/alert.component';
import { AlertPushComponent } from './components/modais/alert-push/alert-push.component';
import { PromptComponent } from './components/modais/prompt/prompt.component';
import { ExibirArquivosComponent } from './components/modais/exibir-arquivos/exibir-arquivos.component';
import { ModalAlertExcluirComponent } from './components/modais/modal-alert-excluir/modal-alert-excluir.component';
import { NotificationsComponent } from './components/modais/notifications/notifications.component';
import { ModalConfirmExcluirComponent } from './components/modais/modal-confirm-excluir/modal-confirm-excluir.component';
import { PrintLayoutComponent } from './components/print-layout/print-layout.component';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { TabsComponent } from './components/tabs/tabs.component';
import { TabListComponent } from './components/tabs/tab-list/tab-list.component';
import { ChartjsModule, ChartjsConfig, CHARTJS_CONFIG } from '@synapsium/ngx-chartjs';
import { BarController, BarElement, Chart, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import { CollapseComponent } from './components/collapse/collapse.component';
import { NgSelectModule } from '@ng-select/ng-select';

const DEFAULT_CHARTJS_CONFIG: ChartjsConfig = {
  options: {
    responsive: true,
    maintainAspectRatio: false,
  }
};

// O que você registra dependerá de qual gráfico você está usando e dos recursos usados.
Chart.register(BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);
@NgModule({
  declarations: [
    ConfirmComponent,
    AlertComponent,
    AlertPushComponent,
    PromptComponent,
    PrintLayoutComponent,
    LoadingComponent,   
    CookieComponent,    
    ExibirArquivosComponent,
    ModalAlertExcluirComponent,
    SortbypipePipe,
    NotificationsComponent,
    ModalConfirmExcluirComponent,
    NoticesBellComponent,    
    TabsComponent,
    TabListComponent, 
    CollapseComponent,        
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: momentAdapterFactory }),
    LottieModule.forRoot({ player: PlayerFactoryLottieConfig }),
    ToastrModule.forRoot(),
    NgbModule,
    NgbAccordionModule,
    NgbDropdownModule,
    NgbNavModule,
    NgbCollapseModule,
    NgbPopoverModule,
    NgbCarouselModule,
    NgxMaskModule.forRoot(NgxMaskIConfig),
    NgxCurrencyModule.forRoot(CurrencyMaskConfig),    
    DragDropModule,
    NgxChartsModule,
    ConnectionServiceModule,
    NgxPrintModule,
    NgQrScannerModule,
    WebCamModule,
    AngularEditorModule,
    ZXingScannerModule,
    FileSaverModule,
    IvyCarouselModule,
    SwiperModule,
    NgxDropzoneModule,
    DndModule,
    ImageCropperModule,
    NgbTooltipModule,
    NgxQRCodeModule,
    ChartjsModule,    
    NgSelectModule,    
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CalendarModule,
    ToastrModule,
    LottieModule,
    NgbModule,
    NgbAccordionModule,
    NgbDropdownModule,
    NgbNavModule,
    NgbPopoverModule,
    NgbCollapseModule,
    NgbCarouselModule,
    NgxMaskModule,
    NgxCurrencyModule,
    DragDropModule,
    NgxChartsModule,
    ChartjsModule,
    LoadingComponent,
    CookieComponent,
    ConnectionServiceModule,
    NgxPrintModule,
    NgQrScannerModule,
    WebCamModule,
    AngularEditorModule,
    ZXingScannerModule,
    FileSaverModule,
    IvyCarouselModule,
    SwiperModule,
    NgxDropzoneModule,
    DndModule,
    SortbypipePipe,
    ImageCropperModule,
    NoticesBellComponent,
    DragDropModule,
    PrintLayoutComponent,
    NgbTooltipModule,
    NgxQRCodeModule,
    TabsComponent,
    TabListComponent,     
    CollapseComponent,
    PrintLayoutComponent,    
    NgSelectModule,
  ],
  providers: [
    httpInterceptorProviders,
    {
      provide: CHARTJS_CONFIG,
      useValue: DEFAULT_CHARTJS_CONFIG
    },    
  ]
})
export class SharedModule { }
