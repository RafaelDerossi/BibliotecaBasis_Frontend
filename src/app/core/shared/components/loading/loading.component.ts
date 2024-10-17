import { environment } from './../../../../../environments/environment';
import { Component, OnInit, Input } from '@angular/core';
import { LoadingService } from 'src/app/core/services/global/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  @Input() type: 'fullparent' | 'fullscreen' | 'inline' = 'fullparent';
  @Input() timeout = 0;
  @Input() size = '14px';
  @Input() color;
  @Input('background') backgroundColor;
  @Input() text: string;

  isLoading: boolean = false;
  optionsConfete = {
    path: '/assets/lottie/wave02.json',
    renderer: 'svg',
    loop: true,
    autoplay: true,
  };

  versionApp = environment.version;

  constructor(public loadingService: LoadingService) {

  }


  ngOnInit() {
    if (!this.color) {
      this.color = this.type === 'inline' ? '#666' : 'white';
    }
    if (!this.backgroundColor) {
      this.backgroundColor = this.type === 'inline' ? 'transparent' : 'rgba(255,255,255,0.5)';
    }
  }

}
