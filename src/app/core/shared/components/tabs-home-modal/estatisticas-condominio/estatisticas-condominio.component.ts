import { Component, Input, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { OrganizacaoService } from 'src/app/core/services/organizacao/organizacao.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';

import { Chart, registerables } from 'chart.js';
import { BaseChartComponent } from '@swimlane/ngx-charts';

Chart.register(...registerables);

@Component({
  selector: 'app-estatisticas-condominio',
  templateUrl: './estatisticas-condominio.component.html',
  styleUrls: ['./estatisticas-condominio.component.scss'],
})
export class EstatisticasCondominioComponent implements OnInit {
  // Teste - simulando mais de um registro
  items = [];

  grafic = 'bar';
  @Input() organizacao;
  ano = 2020;
  funcionario: any = [];
  estatisticas: any;

  dataChart: ChartData;

  chartsConfigs = {
    showXAxis: true,
    showXAxisLabel: true,
    xAxisLabel: 'Country',
    showYAxis: true,
    showYAxisLabel: true,
    yAxisLabel: 'Population',
    gradient: false,
    showLegend: true,
    legendTitle: 'Legenda',
    legendPosition: 'below',
    colorScheme: {
      domain: [
        '#e89552',
        '#f2dfa6',
        '#a5d7c3',
        '#7795b1',
        '#9f5fb2',
        '#6786C2',
        '#EBA43F',
        '#77BB6B',
        '#E15975',
      ],
    },
  };

  optionsChart: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        display: false,
      },
    },
  };

  viewChart: any[] = [300, 200];

  constructor(
    private condominioService: OrganizacaoService,
    private authService: AuthService
  ) {
    this.viewChart = [innerWidth / 2, 200];
  }

  ngOnInit() {
    this.getEstatisticasDoCondominio();
  }

  getEstatisticasDoCondominio() {
    this.condominioService
      .pegarEstatisticasPorCondominio(this.organizacao.id)
      .then((estatisticas: any) => {
        this.estatisticas = estatisticas;
        this.estatisticas['chart'] = [];

        for (var [key, value] of Object.entries(estatisticas)) {
          if (value > 0) {
            this.estatisticas['chart'].push({
              name: key,
              value: Number(value),
            });
            // labels.push(key);
            // data.push(value);
          }
        }

        // this.configChart(data, labels);
      });
  }

  configChart(dataChart: number[], labels: string[]) {
    console.log(dataChart);
    this.dataChart = {
      labels,
      datasets: [
        {
          data: dataChart,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)',
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)',
          ],
          borderWidth: 1,
        },
      ],
    };
  }

  onResize(event) {
    this.viewChart = [event.target.innerWidth / 1.35, 200];
  }
}
