import { Component, OnInit, Inject, PLATFORM_ID, NgZone } from '@angular/core';
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5 from '@amcharts/amcharts5';
import * as am5percent from "@amcharts/amcharts5/percent";
import * as am5xy from '@amcharts/amcharts5/xy';
import * as am5radar from '@amcharts/amcharts5/radar'
import { isPlatformBrowser } from '@angular/common';
import { CommonHttpService } from 'src/app/services/common-http.service'

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  pieSeriesOfAPI: any;
  selectedOptionForPieChartOfAPI = 'Subsidiary ID - 9';
  optionsForPieChartOfAPI = [
    'Subsidiary ID - 1',
    'Subsidiary ID - 2',
    'Subsidiary ID - 43',
    'Subsidiary ID - 4',
    'Subsidiary ID - 5',
    'Subsidiary ID - 6',
    'Subsidiary ID - 7',
    'Subsidiary ID - 8',
    'Subsidiary ID - 9',
    'Subsidiary ID - 10',
  ];
  subsidiaryIdForChart = 9;
  chartData: any[] = [];
  seriesForDonut: any;
  chartForDonut: any;
  rootForDonut: any;
  legendForDonut: any;

  private root!: am5.Root;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private zone: NgZone,
    private HttpService: CommonHttpService,
  ) { }

  ngOnInit(): void {
  }

  // Run the function only in the browser
  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  ngAfterViewInit() {
    // Pie Chart -> Get data from Real API
    this.browserOnly(() => {
      /* Chart code */
      // Create root element
      // https://www.amcharts.com/docs/v5/getting-started/#Root_element
      let root = am5.Root.new("pieChartAPI");

      // Set themes
      // https://www.amcharts.com/docs/v5/concepts/themes/
      root.setThemes([
        am5themes_Animated.new(root)
      ]);

      // Create chart
      // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
      let chart = root.container.children.push(
        am5percent.PieChart.new(root, {
          endAngle: 270
        })
      );

      // Create series
      // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
      this.pieSeriesOfAPI = chart.series.push(
        am5percent.PieSeries.new(root, {
          // valueField: "pin",
          // categoryField: "firstname",
          valueField: "value",
          categoryField: "category",
          endAngle: 270
        })
      );

      this.pieSeriesOfAPI.states.create("hidden", {
        endAngle: -90
      });

      // Set data
      // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data

      // fetch('http://localhost:3000/posts') // replace 'URL' with the URL of your JSON server
      //   .then(response => response.json())
      //   .then(data => {
      //     this.series.data.setAll(data);
      //     this.series.appear(1000, 100);
      //   });

      this.GetPieChartData(this.subsidiaryIdForChart);  // for real api data.
    });

    // Donut Chart -> Get data from Real API
    this.browserOnly(() => {
      this.rootForDonut = am5.Root.new("donutChartAPI");

      // Set themes
      // https://www.amcharts.com/docs/v5/concepts/themes/
      this.rootForDonut.setThemes([
        am5themes_Animated.new(this.rootForDonut)
      ]);

      // Create chart
      // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
      this.chartForDonut = this.rootForDonut.container.children.push(am5percent.PieChart.new(this.rootForDonut, {
        radius: am5.percent(90),
        innerRadius: am5.percent(50),
        layout: this.rootForDonut.horizontalLayout
      }));

      // Create series
      // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
      this.seriesForDonut = this.chartForDonut.series.push(am5percent.PieSeries.new(this.rootForDonut, {
        name: "Series",
        valueField: "value",
        categoryField: "category"
      }));

      this.GetDonutChartData(this.subsidiaryIdForChart);
    });
  }

  GetDataOnChangeSubsidiaryId() {
    if (this.selectedOptionForPieChartOfAPI == 'Subsidiary ID - 1') {
      this.subsidiaryIdForChart = 1;
      this.GetPieChartData(this.subsidiaryIdForChart);
      this.GetDonutChartData(this.subsidiaryIdForChart);
    } else if (this.selectedOptionForPieChartOfAPI == 'Subsidiary ID - 2') {
      this.subsidiaryIdForChart = 2;
      this.GetPieChartData(this.subsidiaryIdForChart);
      this.GetDonutChartData(this.subsidiaryIdForChart);  // for real api data.
    } else if (this.selectedOptionForPieChartOfAPI == 'Subsidiary ID - 43') {
      this.subsidiaryIdForChart = 43;
      this.GetPieChartData(this.subsidiaryIdForChart);
      this.GetDonutChartData(this.subsidiaryIdForChart);
    } else if (this.selectedOptionForPieChartOfAPI == 'Subsidiary ID - 4') {
      this.subsidiaryIdForChart = 4;
      this.GetPieChartData(this.subsidiaryIdForChart);
      this.GetDonutChartData(this.subsidiaryIdForChart);  // for real api data.
    } else if (this.selectedOptionForPieChartOfAPI == 'Subsidiary ID - 5') {
      this.subsidiaryIdForChart = 5;
      this.GetPieChartData(this.subsidiaryIdForChart);
      this.GetDonutChartData(this.subsidiaryIdForChart);  // for real api data.
    } else if (this.selectedOptionForPieChartOfAPI == 'Subsidiary ID - 6') {
      this.subsidiaryIdForChart = 7;
      this.GetPieChartData(this.subsidiaryIdForChart);
      this.GetDonutChartData(this.subsidiaryIdForChart);  // for real api data.
    } else if (this.selectedOptionForPieChartOfAPI == 'Subsidiary ID - 7') {
      this.subsidiaryIdForChart = 7;
      this.GetPieChartData(this.subsidiaryIdForChart);
      this.GetDonutChartData(this.subsidiaryIdForChart);  // for real api data.
    } else if (this.selectedOptionForPieChartOfAPI == 'Subsidiary ID - 8') {
      this.subsidiaryIdForChart = 8;
      this.GetPieChartData(this.subsidiaryIdForChart);
      this.GetDonutChartData(this.subsidiaryIdForChart);  // for real api data.
    } else if (this.selectedOptionForPieChartOfAPI == 'Subsidiary ID - 9') {
      this.subsidiaryIdForChart = 9;
      this.GetPieChartData(this.subsidiaryIdForChart);
      this.GetDonutChartData(this.subsidiaryIdForChart);  // for real api data.
    } else if (this.selectedOptionForPieChartOfAPI == 'Subsidiary ID - 10') {
      this.subsidiaryIdForChart = 10;
      this.GetPieChartData(this.subsidiaryIdForChart);
      this.GetDonutChartData(this.subsidiaryIdForChart);  // for real api data.
    }
  };

  GetPieChartData(subsidiaryIdForChart: any) {
    this.HttpService
      // .GetById('/supplier/get-dashboard-by-status?subsidiaryId=1', this.Controller.subsidiaryId)
      .GetById(`/supplier/get-dashboard-by-status?subsidiaryId=` + subsidiaryIdForChart, subsidiaryIdForChart)
      .subscribe((res) => {
        this.chartData = res;
        console.log(this.chartData);
        // alert(this.subsidiaryIdForChart);
        this.pieSeriesOfAPI.data.setAll(this.chartData); // set the data for the chart series
        this.pieSeriesOfAPI.appear(1000, 100); // animate the chart series

        res.forEach((data: any) => console.log(data)); // to log each object in the array separately.
      });
  }

  GetDonutChartData(subsidiaryIdForChart: any) {
    // Fetch data from server
    this.HttpService.GetById(`/supplier/get-dashboard-by-status?subsidiaryId=` + subsidiaryIdForChart, subsidiaryIdForChart)
      .subscribe((res) => {
        // Set data to series
        this.seriesForDonut.data.setAll(this.chartData);

        // Disabling labels and ticks
        this.seriesForDonut.labels.template.set("visible", false);
        this.seriesForDonut.ticks.template.set("visible", false);

        // Adding gradients
        this.seriesForDonut.slices.template.set("strokeOpacity", 0);
        this.seriesForDonut.slices.template.set("fillGradient", am5.RadialGradient.new(this.rootForDonut, {
          stops: [{
            brighten: -0.8
          }, {
            brighten: -0.8
          }, {
            brighten: -0.5
          }, {
            brighten: 0
          }, {
            brighten: -0.5
          }]
        }));

        // Remove existing legend
        this.chartForDonut.children.removeValue(this.legendForDonut);

        // Create legend
        // https://www.amcharts.com/docs/v5/charts/percent-charts/legend-percent-series/
        this.legendForDonut = this.chartForDonut.children.push(am5.Legend.new(this.rootForDonut, {
          centerY: am5.percent(50),
          y: am5.percent(50),
          layout: this.rootForDonut.verticalLayout
        }));
        // set value labels align to right
        this.legendForDonut.valueLabels.template.setAll({ textAlign: "right" })
        // set width and max width of labels
        this.legendForDonut.labels.template.setAll({
          maxWidth: 140,
          width: 140,
          oversizedBehavior: "wrap"
        });

        this.legendForDonut.data.setAll(this.seriesForDonut.dataItems);

        // Play initial series animation
        // https://www.amcharts.com/docs/v5/concepts/animations/#Animation_of_series
        this.seriesForDonut.appear(1000, 100);
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
