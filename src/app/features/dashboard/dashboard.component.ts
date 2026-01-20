import { Component, OnInit } from '@angular/core';
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
} from 'chart.js';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';

Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip
);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private authService: AuthService,private router: Router, private _api:ApiService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.initPerformanceChart();
  }

  goToWorkout() {
    this._api.getAllWorkOutDataApi();
    this.router.navigate(['/workout']);
  }

  testProfile() {
    this.authService.getProfileTemp().subscribe({
      next: res => {
        console.log('PROFILE:', res);
        alert('Check console — profile loaded');
      },
      error: err => {
        console.error(err);
        alert(err.error.message);
      }
    });
  }

  initPerformanceChart() {
    const ctx = document.getElementById(
      'performanceChart'
    ) as HTMLCanvasElement;

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['F35', '1215', '4/4', '5/19', '5/12'],
        datasets: [
          {
            label: 'Weight Lifted (lbs)',
            data: [1800, 2200, 2100, 2600, 2400],
            backgroundColor: [
              '#38bdf8',
              '#38bdf8',
              '#38bdf8',
              '#a3e635',
              '#a3e635',
            ],
            borderRadius: 6,
            barThickness: 28,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#020617',
            titleColor: '#e5e7eb',
            bodyColor: '#9ca3af',
            borderColor: '#1f2933',
            borderWidth: 1,
          },
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: {
              color: '#9ca3af',
            },
          },
          y: {
            grid: {
              color: 'rgba(255,255,255,0.05)',
            },
            ticks: {
              color: '#9ca3af',
            },
          },
        },
      },
    });
  }

}
