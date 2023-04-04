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


  }

}
