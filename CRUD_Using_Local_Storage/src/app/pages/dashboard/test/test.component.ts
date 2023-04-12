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
  chartForColumn: any;
  xAxisForColumn: any;
  seriesForColumn: any;

  private root!: am5.Root;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private zone: NgZone,
    private HttpService: CommonHttpService,
  ) { }

  ngOnInit(): void {
    this.GetApiData(this.subsidiaryIdForChart);
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

      this.GetPieChartData();  // for real api data.
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

      this.GetDonutChartData();
    });

    //  Column with Rotated Labels Start -> Get data from Real API
    this.browserOnly(() => {
      /* Chart code */
      // Create root element
      // https://www.amcharts.com/docs/v5/getting-started/#Root_element
      let root = am5.Root.new("columnChart");


      // Set themes
      // https://www.amcharts.com/docs/v5/concepts/themes/
      root.setThemes([
        am5themes_Animated.new(root)
      ]);


      // Create chart
      // https://www.amcharts.com/docs/v5/charts/xy-chart/
      this.chartForColumn = root.container.children.push(am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX: true
      }));

      // Add cursor
      // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
      let cursor = this.chartForColumn.set("cursor", am5xy.XYCursor.new(root, {}));
      cursor.lineY.set("visible", false);


      // Create axes
      // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
      let xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 30 });
      xRenderer.labels.template.setAll({
        rotation: -90,
        centerY: am5.p50,
        centerX: am5.p100,
        paddingRight: 15
      });

      xRenderer.grid.template.setAll({
        location: 1
      })

      this.xAxisForColumn = this.chartForColumn.xAxes.push(am5xy.CategoryAxis.new(root, {
        maxDeviation: 0.3,
        categoryField: "category",
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {})
      }));

      let yAxis = this.chartForColumn.yAxes.push(am5xy.ValueAxis.new(root, {
        maxDeviation: 0.3,
        renderer: am5xy.AxisRendererY.new(root, {
          strokeOpacity: 0.1
        })
      }));


      // Create series
      // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
      this.seriesForColumn = this.chartForColumn.series.push(am5xy.ColumnSeries.new(root, {
        name: "Series 1",
        xAxis: this.xAxisForColumn,
        yAxis: yAxis,
        valueYField: "value",
        sequencedInterpolation: true,
        categoryXField: "category",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueY}"
        })
      }));

      // Color Issue

      // series.columns.template.setAll({ cornerRadiusTL: 5, cornerRadiusTR: 5, strokeOpacity: 0 });
      // series.columns.template.adapters.add("fill", function (fill, target) {
      //   return chart.get("colors").getIndex(series.columns.indexOf(target));
      // });

      // series.columns.template.adapters.add("stroke", function (stroke, target) {
      //   return chart.get("colors").getIndex(series.columns.indexOf(target));
      // });

      this.seriesForColumn.set("fill", am5.color(0xff0000,));


      // Set data
      this.GetColumnWithRotatedLabelsChartData();
    });
  }

  GetApiData(subsidiaryIdForChart: any) {
    this.HttpService
      .GetById(`/supplier/get-dashboard-by-status?subsidiaryId=` + subsidiaryIdForChart, subsidiaryIdForChart)
      .subscribe((res) => {
        this.chartData = res;
        console.log(this.chartData);
        res.forEach((data: any) => console.log(data)); // to log each object in the array separately.

        this.GetPieChartData(); // to pass the value in Pie Chart.
        this.GetDonutChartData(); // to pass the value in Donut Chart.
        this.GetColumnWithRotatedLabelsChartData(); // to pass the value in Column with Rotated Labels Chart.
      });
  }

  GetDataOnChangeSubsidiaryId() {
    if (this.selectedOptionForPieChartOfAPI == 'Subsidiary ID - 1') {
      this.subsidiaryIdForChart = 1;
      this.GetApiData(this.subsidiaryIdForChart);
      this.GetPieChartData();
      this.GetDonutChartData();
      this.GetColumnWithRotatedLabelsChartData();
    } else if (this.selectedOptionForPieChartOfAPI == 'Subsidiary ID - 2') {
      this.subsidiaryIdForChart = 2;
      this.GetApiData(this.subsidiaryIdForChart);
      this.GetPieChartData();
      this.GetDonutChartData();
      this.GetColumnWithRotatedLabelsChartData();
    } else if (this.selectedOptionForPieChartOfAPI == 'Subsidiary ID - 43') {
      this.subsidiaryIdForChart = 43;
      this.GetApiData(this.subsidiaryIdForChart);
      this.GetPieChartData();
      this.GetDonutChartData();
      this.GetColumnWithRotatedLabelsChartData();
    } else if (this.selectedOptionForPieChartOfAPI == 'Subsidiary ID - 4') {
      this.subsidiaryIdForChart = 4;
      this.GetApiData(this.subsidiaryIdForChart);
      this.GetPieChartData();
      this.GetDonutChartData();
      this.GetColumnWithRotatedLabelsChartData();
    } else if (this.selectedOptionForPieChartOfAPI == 'Subsidiary ID - 5') {
      this.subsidiaryIdForChart = 5;
      this.GetApiData(this.subsidiaryIdForChart);
      this.GetPieChartData();
      this.GetDonutChartData();
      this.GetColumnWithRotatedLabelsChartData();
    } else if (this.selectedOptionForPieChartOfAPI == 'Subsidiary ID - 6') {
      this.subsidiaryIdForChart = 7;
      this.GetApiData(this.subsidiaryIdForChart);
      this.GetPieChartData();
      this.GetDonutChartData();
      this.GetColumnWithRotatedLabelsChartData();
    } else if (this.selectedOptionForPieChartOfAPI == 'Subsidiary ID - 7') {
      this.subsidiaryIdForChart = 7;
      this.GetApiData(this.subsidiaryIdForChart);
      this.GetPieChartData();
      this.GetDonutChartData();
      this.GetColumnWithRotatedLabelsChartData();
    } else if (this.selectedOptionForPieChartOfAPI == 'Subsidiary ID - 8') {
      this.subsidiaryIdForChart = 8;
      this.GetApiData(this.subsidiaryIdForChart);
      this.GetPieChartData();
      this.GetDonutChartData();
      this.GetColumnWithRotatedLabelsChartData();
    } else if (this.selectedOptionForPieChartOfAPI == 'Subsidiary ID - 9') {
      this.subsidiaryIdForChart = 9;
      this.GetApiData(this.subsidiaryIdForChart);
      this.GetPieChartData();
      this.GetDonutChartData();
      this.GetColumnWithRotatedLabelsChartData();
    } else if (this.selectedOptionForPieChartOfAPI == 'Subsidiary ID - 10') {
      this.subsidiaryIdForChart = 10;
      this.GetApiData(this.subsidiaryIdForChart);
      this.GetPieChartData();
      this.GetDonutChartData();
      this.GetColumnWithRotatedLabelsChartData();
    }
  };

  GetPieChartData() {
    this.pieSeriesOfAPI.data.setAll(this.chartData); // set the data for the chart series
    this.pieSeriesOfAPI.appear(1000, 100); // animate the chart series
  }

  GetDonutChartData() {
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
  }

  GetColumnWithRotatedLabelsChartData() {
    // Update chart data
    this.chartForColumn.xAxes.getIndex(0).data.setAll(this.chartData);
    this.chartForColumn.series.getIndex(0).data.setAll(this.chartData);

    // Set data
    this.xAxisForColumn.data.setAll(this.chartData);
    this.seriesForColumn.data.setAll(this.chartData);


    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    this.seriesForColumn.appear(1000);
    this.chartForColumn.appear(1000, 100);
  };

  // ngOnDestroy() {
  //   // Clean up chart when the component is removed
  //   this.browserOnly(() => {
  //     if (this.root) {
  //       this.root.dispose();
  //     }
  //   });
  // }

}
