import { Component, OnInit, Inject, NgZone, PLATFORM_ID, VERSION, ViewChild } from '@angular/core';
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5 from '@amcharts/amcharts5';
import * as am5percent from "@amcharts/amcharts5/percent";
import * as am5xy from '@amcharts/amcharts5/xy';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-popolation',
  templateUrl: './popolation.component.html',
  styleUrls: ['./popolation.component.scss']
})
export class PopolationComponent implements OnInit {

  options = [
    'West Bengal',
    'Jharkhand',
    'Bihar'
  ];

  selectedOption: any;
  data: any[] = [];
  chart!: am5xy.XYChart;

  private root!: am5.Root;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private zone: NgZone,
  ) { 
    this.selectedOption = this.options[0]; // for selectedOption defaukt value = West Bengal
  }

  ngOnInit(): void {
    // Check if there is a saved value in localStorage for selectedOption
    localStorage.getItem('selectedOption');
    // If there is no saved value, set the default option as the selectedOption and save it to localStorage
    localStorage.setItem('selectedOption', this.selectedOption);

    this.chartData();
    this.ngAfterViewInit();
  }

  chartData() {
    if (this.selectedOption == 'West Bengal') {
      this.data = [
        {
          category: "Kolkata",
          man: 1000,
          woman: 546
        },
        {
          category: "Nadia",
          man: 1200,
          woman: 555
        },
        {
          category: "Bangaon",
          man: 850,
          woman: 234
        }
      ];
    } else if (this.selectedOption == 'Jharkhand') {
      this.data = [
        {
          category: "Ranchi",
          man: 800,
          woman: 345
        },
        {
          category: "Dhanbad",
          man: 950,
          woman: 457
        },
        {
          category: "Jamshedpur",
          man: 1100,
          woman: 432
        }
      ];
    } else if (this.selectedOption == 'Bihar') {
      this.data = [
        {
          category: "Patna",
          man: 1200,
          woman: 865
        },
        {
          category: "Gaya",
          man: 1000,
          woman: 664
        },
        {
          category: "Bhagalpur",
          man: 750,
          woman: 557
        }
      ];
    }

    this.chart.series.each((series) => {
      series.data.setAll(this.data);
    });

    this.chart.xAxes.values[0].data.setAll(this.data);
  }

  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  ngAfterViewInit() {
    this.browserOnly(() => {
      let root = am5.Root.new("chartdiv");

      root.setThemes([am5themes_Animated.new(root)]);
      this.chart = root.container.children.push(
        am5xy.XYChart.new(root, {
          panY: false,
          layout: root.verticalLayout
        })
      );

      // Create Y-axis
      let yAxis = this.chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
          renderer: am5xy.AxisRendererY.new(root, {})
        })
      );
      // Create X-Axis
      let xAxis = this.chart.xAxes.push(
        am5xy.CategoryAxis.new(root, {
          renderer: am5xy.AxisRendererX.new(root, {}),
          categoryField: "category"
        })
      );
      xAxis.data.setAll(this.data);

      // Create series
      let series1 = this.chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: "Man",
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: "man",
          categoryXField: "category"
        })
      );
      series1.data.setAll(this.data);

      let series2 = this.chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: "Woman",
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: "woman",
          categoryXField: "category"
        })
      );
      series2.data.setAll(this.data);

      // Add legend
      let legend = this.chart.children.push(am5.Legend.new(root, {}));
      legend.data.setAll(this.chart.series.values);

      // Add cursor
      this.chart.set("cursor", am5xy.XYCursor.new(root, {}));

      this.root = root;
    });
  }

  // ngOnDestroy() {
  //   // Clean up chart when the component is removed
  //   this.browserOnly(() => {
  //     if (this.root) {
  //       this.root.dispose();
  //     }
  //   });
  // }

}
