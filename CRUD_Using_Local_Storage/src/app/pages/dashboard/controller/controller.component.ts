import { Component, OnInit, Inject, PLATFORM_ID, NgZone } from '@angular/core';
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5 from '@amcharts/amcharts5';
import * as am5percent from "@amcharts/amcharts5/percent";
import * as am5xy from '@amcharts/amcharts5/xy';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-controller',
  templateUrl: './controller.component.html',
  styleUrls: ['./controller.component.scss']
})
export class ControllerComponent implements OnInit {

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private zone: NgZone,
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

    // Line Graph Start

    this.browserOnly(() => {
      /* Chart code */
      // Create root element
      // https://www.amcharts.com/docs/v5/getting-started/#Root_element
      let root = am5.Root.new("chartdiv");


      // Set themes
      // https://www.amcharts.com/docs/v5/concepts/themes/
      root.setThemes([
        am5themes_Animated.new(root)
      ]);


      // Create chart
      // https://www.amcharts.com/docs/v5/charts/xy-chart/
      let chart = root.container.children.push(am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX: true
      }));


      // Add cursor
      // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
      let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
        behavior: "none"
      }));
      cursor.lineY.set("visible", false);


      // Generate random data
      let date = new Date();
      date.setHours(0, 0, 0, 0);
      let value = 100;

      function generateData() {
        value = Math.round((Math.random() * 10 - 5) + value);
        am5.time.add(date, "day", 1);
        return {
          date: date.getTime(),
          value: value
        };
      }

      function generateDatas(count: any) {
        let data = [];
        for (var i = 0; i < count; ++i) {
          data.push(generateData());
        }
        return data;
      }


      // Create axes
      // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
      let xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
        maxDeviation: 0.2,
        baseInterval: {
          timeUnit: "day",
          count: 1
        },
        renderer: am5xy.AxisRendererX.new(root, {}),
        tooltip: am5.Tooltip.new(root, {})
      }));

      let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {})
      }));


      // Add series
      // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
      let series = chart.series.push(am5xy.LineSeries.new(root, {
        name: "Series",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        valueXField: "date",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueY}"
        })
      }));


      // Add scrollbar
      // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
      chart.set("scrollbarX", am5.Scrollbar.new(root, {
        orientation: "horizontal"
      }));


      // Set data
      let data = generateDatas(1200);
      series.data.setAll(data);


      // Make stuff animate on load
      // https://www.amcharts.com/docs/v5/concepts/animations/
      series.appear(1000);
      chart.appear(1000, 100);

    });

    // Line Graph End

    // Pie Chart Start

    this.browserOnly(() => {
      /* Chart code */
      // Create root element
      // https://www.amcharts.com/docs/v5/getting-started/#Root_element
      let root = am5.Root.new("pieChart");

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
      let series = chart.series.push(
        am5percent.PieSeries.new(root, {
          valueField: "value",
          categoryField: "category",
          endAngle: 270
        })
      );

      series.states.create("hidden", {
        endAngle: -90
      });

      // Set data
      // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
      series.data.setAll([{
        category: "Lithuania",
        value: 501.9
      }, {
        category: "Czechia",
        value: 301.9
      }, {
        category: "Ireland",
        value: 201.1
      }, {
        category: "Germany",
        value: 165.8
      }, {
        category: "Australia",
        value: 139.9
      }, {
        category: "Austria",
        value: 128.3
      }, {
        category: "UK",
        value: 99
      }]);

      series.appear(1000, 100);

    });

    // Pie Chart End

    //  Donut Chart Start

    this.browserOnly(() => {
      let root = am5.Root.new("donutChart");

      // Set themes
      // https://www.amcharts.com/docs/v5/concepts/themes/
      root.setThemes([
        am5themes_Animated.new(root)
      ]);

      // Create chart
      // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
      let chart = root.container.children.push(am5percent.PieChart.new(root, {
        radius: am5.percent(90),
        innerRadius: am5.percent(50),
        layout: root.horizontalLayout
      }));

      // Create series
      // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
      let series = chart.series.push(am5percent.PieSeries.new(root, {
        name: "Series",
        valueField: "sales",
        categoryField: "country"
      }));

      // Set data
      // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
      series.data.setAll([{
        country: "Lithuania",
        sales: 501.9
      }, {
        country: "Czechia",
        sales: 301.9
      }, {
        country: "Ireland",
        sales: 201.1
      }, {
        country: "Germany",
        sales: 165.8
      }, {
        country: "Australia",
        sales: 139.9
      }, {
        country: "Austria",
        sales: 128.3
      }, {
        country: "UK",
        sales: 99
      }, {
        country: "Belgium",
        sales: 60
      }, {
        country: "The Netherlands",
        sales: 50
      }]);

      // Disabling labels and ticks
      series.labels.template.set("visible", false);
      series.ticks.template.set("visible", false);

      // Adding gradients
      series.slices.template.set("strokeOpacity", 0);
      series.slices.template.set("fillGradient", am5.RadialGradient.new(root, {
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

      // Create legend
      // https://www.amcharts.com/docs/v5/charts/percent-charts/legend-percent-series/
      let legend = chart.children.push(am5.Legend.new(root, {
        centerY: am5.percent(50),
        y: am5.percent(50),
        layout: root.verticalLayout
      }));
      // set value labels align to right
      legend.valueLabels.template.setAll({ textAlign: "right" })
      // set width and max width of labels
      legend.labels.template.setAll({
        maxWidth: 140,
        width: 140,
        oversizedBehavior: "wrap"
      });

      legend.data.setAll(series.dataItems);


      // Play initial series animation
      // https://www.amcharts.com/docs/v5/concepts/animations/#Animation_of_series
      series.appear(1000, 100);
    });

    //  Donut Chart End

    //  Column with Rotated Labels Start

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
      let chart = root.container.children.push(am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX: true
      }));

      // Add cursor
      // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
      let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
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

      let xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
        maxDeviation: 0.3,
        categoryField: "country",
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {})
      }));

      let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
        maxDeviation: 0.3,
        renderer: am5xy.AxisRendererY.new(root, {
          strokeOpacity: 0.1
        })
      }));


      // Create series
      // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
      let series = chart.series.push(am5xy.ColumnSeries.new(root, {
        name: "Series 1",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        sequencedInterpolation: true,
        categoryXField: "country",
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

      series.set("fill", am5.color(0xff0000,)); 


      // Set data
      let data = [{
        country: "USA",
        value: 2025
      }, {
        country: "China",
        value: 1882
      }, {
        country: "Japan",
        value: 1809
      }, {
        country: "Germany",
        value: 1322
      }, {
        country: "UK",
        value: 1122
      }, {
        country: "France",
        value: 1114
      }, {
        country: "India",
        value: 984
      }, {
        country: "Spain",
        value: 711
      }, {
        country: "Netherlands",
        value: 665
      }, {
        country: "South Korea",
        value: 443
      }, {
        country: "Canada",
        value: 441
      }];

      xAxis.data.setAll(data);
      series.data.setAll(data);


      // Make stuff animate on load
      // https://www.amcharts.com/docs/v5/concepts/animations/
      series.appear(1000);
      chart.appear(1000, 100);
    });

    //  Column with Rotated Labels End

  }

}
