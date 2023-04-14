import { Component, OnInit, Inject, PLATFORM_ID, NgZone,ViewChild, ElementRef } from '@angular/core';
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5 from '@amcharts/amcharts5';
import * as am5percent from "@amcharts/amcharts5/percent";
import * as am5xy from '@amcharts/amcharts5/xy';
import * as am5radar from '@amcharts/amcharts5/radar'
import { isPlatformBrowser } from '@angular/common';
import { CommonHttpService } from 'src/app/services/common-http.service'

@Component({
  selector: 'app-controller',
  templateUrl: './controller.component.html',
  styleUrls: ['./controller.component.scss']
})
export class ControllerComponent implements OnInit {
  // To Hide selected div with id of Controller Component
  @ViewChild('myDiv') myDivRef!: ElementRef;
  @ViewChild('myDiv1') myDivRef1!: ElementRef;

  get myDiv(): ElementRef {
    return this.myDivRef;
  }
  get myDiv1(): ElementRef {
    return this.myDivRef1;
  }
  
  isFullscreen = false;
  ingredient = 'JH';
  series:any;
  pieSeriesOfAPI:any;
  selectedOptionForColumn = 'West Bengal';
  selectedOptionForPieChartOfAPI = 'Subsidiary ID - 1';
  dataForColumn: any[] = [];
  optionsForColumn = [
    'West Bengal',
    'Jharkhand',
    'Bihar'
  ];
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
  chartForColumn:any;
  subsidiaryIdForChart = 1;
  chartData: any[] = [];

  private root!: am5.Root;
  
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private zone: NgZone,
    private HttpService: CommonHttpService,
  ) { }

  ngOnInit(): void {
    this.GetChartData(this.subsidiaryIdForChart);
  }

  toggleFullscreen() {
    const div = document.querySelector('.fullscreen-div');
    div?.classList.toggle('fullscreen');
    this.isFullscreen = !this.isFullscreen;
  }

  toggleFullscreenPieChart() {
    const div = document.querySelector('.fullscreen-div-pie-chart');
    div?.classList.toggle('fullscreen');
    this.isFullscreen = !this.isFullscreen;
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


      // // Add scrollbar
      // // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
      // chart.set("scrollbarX", am5.Scrollbar.new(root, {
      //   orientation: "horizontal"
      // }));


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

    // this.browserOnly(() => {
    //   /* Chart code */
    //   // Create root element
    //   // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    //   let root = am5.Root.new("pieChart");

    //   // Set themes
    //   // https://www.amcharts.com/docs/v5/concepts/themes/
    //   root.setThemes([
    //     am5themes_Animated.new(root)
    //   ]);

    //   // Create chart
    //   // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
    //   let chart = root.container.children.push(
    //     am5percent.PieChart.new(root, {
    //       endAngle: 270
    //     })
    //   );

    //   // Create series
    //   // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
    //   this.series = chart.series.push(
    //     am5percent.PieSeries.new(root, {
    //       valueField: "value",
    //       categoryField: "category",
    //       endAngle: 270
    //     })
    //   );

    //   this.series.states.create("hidden", {
    //     endAngle: -90
    //   });

    //   // Set data
    //   // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data

    //   this.getPieChartData();
    //   // this.series.data.setAll([{
    //   //   category: "Lithuania",
    //   //   value: 501.9
    //   // }, {
    //   //   category: "Czechia",
    //   //   value: 301.9
    //   // }, {
    //   //   category: "Ireland",
    //   //   value: 201.1
    //   // }, {
    //   //   category: "Germany",
    //   //   value: 165.8
    //   // }, {
    //   //   category: "Australia",
    //   //   value: 139.9
    //   // }, {
    //   //   category: "Austria",
    //   //   value: 128.3
    //   // }, {
    //   //   category: "UK",
    //   //   value: 99
    //   // }]);

    //   this.series.appear(1000, 100);

    // });

    // Pie Chart -> Get data from Json Server
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
      this.series = chart.series.push(
        am5percent.PieSeries.new(root, {
          valueField: "pin",
          categoryField: "firstname",
          endAngle: 270
        })
      );
    
      this.series.states.create("hidden", {
        endAngle: -90
      });
    
      // Set data
      // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
    
      fetch('http://localhost:3000/posts') // replace 'URL' with the URL of your JSON server
        .then(response => response.json())
        .then(data => {
          this.series.data.setAll(data);
          this.series.appear(1000, 100);
        });
    });

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

      this.updateChartData();  // for real api data.
    });

    // Pie Chart End

    //  Donut Chart Start

    // this.browserOnly(() => {
    //   let root = am5.Root.new("donutChart");

    //   // Set themes
    //   // https://www.amcharts.com/docs/v5/concepts/themes/
    //   root.setThemes([
    //     am5themes_Animated.new(root)
    //   ]);

    //   // Create chart
    //   // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
    //   let chart = root.container.children.push(am5percent.PieChart.new(root, {
    //     radius: am5.percent(90),
    //     innerRadius: am5.percent(50),
    //     layout: root.horizontalLayout
    //   }));

    //   // Create series
    //   // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
    //   let series = chart.series.push(am5percent.PieSeries.new(root, {
    //     name: "Series",
    //     valueField: "sales",
    //     categoryField: "country"
    //   }));

    //   // Set data
    //   // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
    //   series.data.setAll([{
    //     country: "Lithuania",
    //     sales: 501.9
    //   }, {
    //     country: "Czechia",
    //     sales: 301.9
    //   }, {
    //     country: "Ireland",
    //     sales: 201.1
    //   }, {
    //     country: "Germany",
    //     sales: 165.8
    //   }, {
    //     country: "Australia",
    //     sales: 139.9
    //   }, {
    //     country: "Austria",
    //     sales: 128.3
    //   }, {
    //     country: "UK",
    //     sales: 99
    //   }, {
    //     country: "Belgium",
    //     sales: 60
    //   }, {
    //     country: "The Netherlands",
    //     sales: 50
    //   }]);

    //   // Disabling labels and ticks
    //   series.labels.template.set("visible", false);
    //   series.ticks.template.set("visible", false);

    //   // Adding gradients
    //   series.slices.template.set("strokeOpacity", 0);
    //   series.slices.template.set("fillGradient", am5.RadialGradient.new(root, {
    //     stops: [{
    //       brighten: -0.8
    //     }, {
    //       brighten: -0.8
    //     }, {
    //       brighten: -0.5
    //     }, {
    //       brighten: 0
    //     }, {
    //       brighten: -0.5
    //     }]
    //   }));

    //   // Create legend
    //   // https://www.amcharts.com/docs/v5/charts/percent-charts/legend-percent-series/
    //   let legend = chart.children.push(am5.Legend.new(root, {
    //     centerY: am5.percent(50),
    //     y: am5.percent(50),
    //     layout: root.verticalLayout
    //   }));
    //   // set value labels align to right
    //   legend.valueLabels.template.setAll({ textAlign: "right" })
    //   // set width and max width of labels
    //   legend.labels.template.setAll({
    //     maxWidth: 140,
    //     width: 140,
    //     oversizedBehavior: "wrap"
    //   });

    //   legend.data.setAll(series.dataItems);


    //   // Play initial series animation
    //   // https://www.amcharts.com/docs/v5/concepts/animations/#Animation_of_series
    //   series.appear(1000, 100);
    // });

    // Donut Chart -> Get data from Json Server
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
        valueField: "pin",
        categoryField: "firstname"
      }));
    
      // Fetch data from server
      fetch("http://localhost:3000/posts")
        .then(response => response.json())
        .then(data => {
          // Set data to series
          series.data.setAll(data);
    
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

      let xAxis = this.chartForColumn.xAxes.push(am5xy.CategoryAxis.new(root, {
        maxDeviation: 0.3,
        categoryField: "country",
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
      let series = this.chartForColumn.series.push(am5xy.ColumnSeries.new(root, {
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
      this.chartDataForColumn();

      xAxis.data.setAll(this.dataForColumn);
      series.data.setAll(this.dataForColumn);


      // Make stuff animate on load
      // https://www.amcharts.com/docs/v5/concepts/animations/
      series.appear(1000);
      this.chartForColumn.appear(1000, 100);
    });

    // Column with Rotated Labels Chart -> Get data from Json Server
    // this.browserOnly(() => {
    //   /* Chart code */
    //   // Create root element
    //   // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    //   let root = am5.Root.new("columnChart");
    
    //   // Set themes
    //   // https://www.amcharts.com/docs/v5/concepts/themes/
    //   root.setThemes([
    //     am5themes_Animated.new(root)
    //   ]);
    
    //   // Create chart
    //   // https://www.amcharts.com/docs/v5/charts/xy-chart/
    //   let chart = root.container.children.push(am5xy.XYChart.new(root, {
    //     panX: true,
    //     panY: true,
    //     wheelX: "panX",
    //     wheelY: "zoomX",
    //     pinchZoomX: true
    //   }));
    
    //   // Add cursor
    //   // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    //   let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    //   cursor.lineY.set("visible", false);
    
    //   // Create axes
    //   // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    //   let xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 30 });
    //   xRenderer.labels.template.setAll({
    //     rotation: -90,
    //     centerY: am5.p50,
    //     centerX: am5.p100,
    //     paddingRight: 15
    //   });
    
    //   xRenderer.grid.template.setAll({
    //     location: 1
    //   })
    
    //   let xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
    //     maxDeviation: 0.3,
    //     categoryField: "firstname",
    //     renderer: xRenderer,
    //     tooltip: am5.Tooltip.new(root, {})
    //   }));
    
    //   let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
    //     maxDeviation: 0.3,
    //     renderer: am5xy.AxisRendererY.new(root, {
    //       strokeOpacity: 0.1
    //     })
    //   }));
    
    //   // Create series
    //   // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    //   let series = chart.series.push(am5xy.ColumnSeries.new(root, {
    //     name: "Series 1",
    //     xAxis: xAxis,
    //     yAxis: yAxis,
    //     valueYField: "pin",
    //     sequencedInterpolation: true,
    //     categoryXField: "firstname",
    //     tooltip: am5.Tooltip.new(root, {
    //       labelText: "{valueY}"
    //     })
    //   }));
    
    //   series.set("fill", am5.color(0xff0000));
    
    //   // Fetch data from JSON server
    //   fetch("http://localhost:3000/posts")
    //     .then(response => response.json())
    //     .then(data => {
    //       xAxis.data.setAll(data);
    //       series.data.setAll(data);
    
    //       // Make stuff animate on load
    //       // https://www.amcharts.com/docs/v5/concepts/animations/
    //       series.appear(1000);
    //       chart.appear(1000, 100);
    //     })
    //     .catch(error => console.error(error));
    // });

    //  Column with Rotated Labels End

    // Gauge with Gradient Fill Start

    this.browserOnly(() => {
      /* Chart code */
      // Create root element
      // https://www.amcharts.com/docs/v5/getting-started/#Root_element
      let root = am5.Root.new("gaugeChart");

      root.setThemes([
        am5themes_Animated.new(root)
      ]);

      // Create chart
      // https://www.amcharts.com/docs/v5/charts/radar-chart/
      let chart = root.container.children.push(
        am5radar.RadarChart.new(root, {
          panX: false,
          panY: false,
          startAngle: 180,
          endAngle: 360
        })
      );

      // Create axis and its renderer
      // https://www.amcharts.com/docs/v5/charts/radar-chart/gauge-charts/#Axes
      let axisRenderer = am5radar.AxisRendererCircular.new(root, {
        innerRadius: -10,
        strokeOpacity: 1,
        strokeWidth: 15,
        strokeGradient: am5.LinearGradient.new(root, {
          rotation: 0,
          stops: [
            { color: am5.color(0x19d228) },
            { color: am5.color(0xf4fb16) },
            { color: am5.color(0xf6d32b) },
            { color: am5.color(0xfb7116) }
          ]
        })
      });

      let xAxis = chart.xAxes.push(
        am5xy.ValueAxis.new(root, {
          maxDeviation: 0,
          min: 0,
          max: 100,
          strictMinMax: true,
          renderer: axisRenderer
        })
      );

      // Add clock hand
      // https://www.amcharts.com/docs/v5/charts/radar-chart/gauge-charts/#Clock_hands
      let axisDataItem = xAxis.makeDataItem({});
      axisDataItem.set("value", 0);

      let bullet = axisDataItem.set("bullet", am5xy.AxisBullet.new(root, {
        sprite: am5radar.ClockHand.new(root, {
          radius: am5.percent(99)
        })
      }));

      xAxis.createAxisRange(axisDataItem);

      //axisDataItem.get("grid").set("visible", false);

      setInterval(() => {
        axisDataItem.animate({
          key: "value",
          to: Math.round(Math.random() * 100),
          duration: 800,
          easing: am5.ease.out(am5.ease.cubic)
        });
      }, 2000);

      // Make stuff animate on load
      chart.appear(1000, 100);
    });

    // Gauge with Gradient Fill End

    // Angular Gauge with Two Axes Start

    this.browserOnly(() => {
      /* Chart code */
      // Create root element
      // https://www.amcharts.com/docs/v5/getting-started/#Root_element
      let root = am5.Root.new("gaugeWithTwoAxesChart");


      // Set themes
      // https://www.amcharts.com/docs/v5/concepts/themes/
      root.setThemes([
        am5themes_Animated.new(root)
      ]);


      // Create chart
      // https://www.amcharts.com/docs/v5/charts/radar-chart/
      let chart = root.container.children.push(am5radar.RadarChart.new(root, {
        panX: false,
        panY: false,
        startAngle: 180,
        endAngle: 360,
        radius: am5.percent(90),
        layout: root.verticalLayout
      }));


      // Colors
      let colors = am5.ColorSet.new(root, {
        step: 2
      });


      // Measurement #1

      // Axis
      let color1 = colors.next();

      let axisRenderer1 = am5radar.AxisRendererCircular.new(root, {
        radius: -10,
        stroke: color1,
        strokeOpacity: 1,
        strokeWidth: 6,
        // inside: true
      });

      axisRenderer1.grid.template.setAll({
        forceHidden: true
      });

      axisRenderer1.ticks.template.setAll({
        stroke: color1,
        visible: true,
        length: 10,
        strokeOpacity: 1,
        inside: true
      });

      axisRenderer1.labels.template.setAll({
        radius: 15,
        inside: true
      });

      let xAxis1 = chart.xAxes.push(am5xy.ValueAxis.new(root, {
        maxDeviation: 0,
        min: 0,
        max: 160,
        strictMinMax: true,
        renderer: axisRenderer1
      }));


      // Label
      let label1 = chart.seriesContainer.children.push(am5.Label.new(root, {
        fill: am5.color(0xffffff),
        x: -100,
        y: -60,
        width: 100,
        centerX: am5.percent(50),
        textAlign: "center",
        centerY: am5.percent(50),
        fontSize: "2em",
        text: "0",
        background: am5.RoundedRectangle.new(root, {
          fill: color1
        })
      }));

      // Add clock hand
      let axisDataItem1 = xAxis1.makeDataItem({
        value: 0,
        // fill: color1,
        // name: "Measurement #1"
      });

      let clockHand1 = am5radar.ClockHand.new(root, {
        pinRadius: 14,
        radius: am5.percent(98),
        bottomWidth: 10
      });

      clockHand1.pin.setAll({
        fill: color1
      });

      clockHand1.hand.setAll({
        fill: color1
      });

      let bullet1 = axisDataItem1.set("bullet", am5xy.AxisBullet.new(root, {
        sprite: clockHand1
      }));

      xAxis1.createAxisRange(axisDataItem1);

      // axisDataItem1.get("grid").set("forceHidden", true);
      // axisDataItem1.get("tick").set("forceHidden", true);


      // Measurement #2

      // Axis
      let color2 = colors.next();

      let axisRenderer2 = am5radar.AxisRendererCircular.new(root, {
        //innerRadius: -40,
        stroke: color2,
        strokeOpacity: 1,
        strokeWidth: 6
      });

      axisRenderer2.grid.template.setAll({
        forceHidden: true
      });

      // axisRenderer2.ticks.template.setAll({
      //   stroke: color2,
      //   visible: true,
      //   length: 10,
      //   strokeOpacity: 1
      // });

      axisRenderer2.labels.template.setAll({
        radius: 15
      });

      // let xAxis2 = chart.xAxes.push(am5xy.ValueAxis.new(root, {
      //   maxDeviation: 0,
      //   min: 0,
      //   max: 240,
      //   strictMinMax: true,
      //   renderer: axisRenderer2
      // }));


      // // Label
      // let label2 = chart.seriesContainer.children.push(am5.Label.new(root, {
      //   fill: am5.color(0xffffff),
      //   x: 100,
      //   y: -60,
      //   width: 100,
      //   centerX: am5.percent(50),
      //   textAlign: "center",
      //   centerY: am5.percent(50),
      //   fontSize: "2em",
      //   text: "0",
      //   background: am5.RoundedRectangle.new(root, {
      //     fill: color2
      //   })
      // }));


      // // Add clock hand
      // let axisDataItem2 = xAxis2.makeDataItem({
      //   value: 0,
      //   // fill: color2,
      //   // name: "Measurement #2"
      // });

      // let clockHand2 = am5radar.ClockHand.new(root, {
      //   pinRadius: 10,
      //   radius: am5.percent(98),
      //   bottomWidth: 10
      // });

      // clockHand2.pin.setAll({
      //   fill: color2
      // });

      // clockHand2.hand.setAll({
      //   fill: color2
      // });

      // let bullet2 = axisDataItem2.set("bullet", am5xy.AxisBullet.new(root, {
      //   sprite: clockHand2
      // }));

      // xAxis2.createAxisRange(axisDataItem2);

      // axisDataItem2.get("grid").set("forceHidden", true);
      // axisDataItem2.get("tick").set("forceHidden", true);


      // Legend
      let legend = chart.children.push(am5.Legend.new(root, {
        x: am5.p50,
        centerX: am5.p50
      }));
      // legend.data.setAll([axisDataItem1, axisDataItem2])
      legend.data.setAll([axisDataItem1])


      // Animate values
      setInterval(function () {
        let value1:any = Math.round(Math.random() * 160);
        axisDataItem1.animate({
          key: "value",
          to: value1,
          duration: 1000,
          easing: am5.ease.out(am5.ease.cubic)
        });

        label1.set("text", value1);

        // let value2:any = Math.round(Math.random() * 240);
        // axisDataItem2.animate({
        //   key: "value",
        //   to: value2,
        //   duration: 1000,
        //   easing: am5.ease.out(am5.ease.cubic)
        // });

        // label2.set("text", value2);
      }, 2000)

      // chart.bulletsContainer.set("mask", undefined);


      // // Create axis ranges bands
      // // https://www.amcharts.com/docs/v5/charts/radar-chart/gauge-charts/#Bands
      // var bandsData = [{
      //   title: "Unsustainable",
      //   color: "#ee1f25",
      //   lowScore: -40,
      //   highScore: -20
      // }, {
      //   title: "Volatile",
      //   color: "#f04922",
      //   lowScore: -20,
      //   highScore: 0
      // }, {
      //   title: "Foundational",
      //   color: "#fdae19",
      //   lowScore: 0,
      //   highScore: 20
      // }, {
      //   title: "Developing",
      //   color: "#f3eb0c",
      //   lowScore: 20,
      //   highScore: 40
      // }, {
      //   title: "Maturing",
      //   color: "#b0d136",
      //   lowScore: 40,
      //   highScore: 60
      // }, {
      //   title: "Sustainable",
      //   color: "#54b947",
      //   lowScore: 60,
      //   highScore: 80
      // }, {
      //   title: "High Performing",
      //   color: "#0f9747",
      //   lowScore: 80,
      //   highScore: 100
      // }];

      // am5.array.each(bandsData, function (data) {
      //   var axisRange = xAxis.createAxisRange(xAxis.makeDataItem({}));

      //   axisRange.setAll({
      //     value: data.lowScore,
      //     endValue: data.highScore
      //   });

      //   axisRange.get("axisFill").setAll({
      //     visible: true,
      //     fill: am5.color(data.color),
      //     fillOpacity: 0.8
      //   });

      //   axisRange.get("label").setAll({
      //     text: data.title,
      //     inside: true,
      //     radius: 15,
      //     fontSize: "0.9em",
      //     fill: root.interfaceColors.get("background")
      //   });
      // });


      // Make stuff animate on load
      chart.appear(1000, 100);
    });

    // Angular Gauge with Two Axess End

  }

  getPieChartData(){
    // alert(this.ingredient);
    if(this.ingredient == 'WB'){
      this.series.data.setAll([{
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
    } else if (this.ingredient == 'JH'){
      this.series.data.setAll([{
        category: "Rice",
        value: 501.9
      }, {
        category: "Banana",
        value: 301.9
      }, {
        category: "Apple",
        value: 201.1
      }, {
        category: "Orange",
        value: 165.8
      }, {
        category: "Vagetables",
        value: 139.9
      }]);
    }
  }

  chartDataForColumn = () => {
    if (this.selectedOptionForColumn == 'West Bengal') {
      this.dataForColumn = [{
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
        value: 588
      }, {
        country: "Russia",
        value: 346
      }, {
        country: "Switzerland",
        value: 307
      }, {
        country: "Australia",
        value: 270
      }, {
        country: "Sweden",
        value: 210
      }, {
        country: "Norway",
        value: 184
      }, {
        country: "Taiwan",
        value: 157
      }, {
        country: "Poland",
        value: 128
      }, {
        country: "Belgium",
        value: 127
      }, {
        country: "Turkey",
        value: 86
      }];
  
      // Update chart data
      this.chartForColumn.xAxes.getIndex(0).data.setAll(this.dataForColumn);
      this.chartForColumn.series.getIndex(0).data.setAll(this.dataForColumn);
    } else if (this.selectedOptionForColumn == 'Jharkhand') {
      this.dataForColumn = [{
        country: "Ranchi",
        value: 800
      },
      {
        country: "Dhanbad",
        value: 950
      },
      {
        country: "Jamshedpur",
        value: 1100
      }];
  
      // Update chart data
      this.chartForColumn.xAxes.getIndex(0).data.setAll(this.dataForColumn);
      this.chartForColumn.series.getIndex(0).data.setAll(this.dataForColumn);
    } else if (this.selectedOptionForColumn == 'Bihar') {
      this.dataForColumn = [{
        country: "Patna",
        value: 1200
      },
      {
        country: "Gaya",
        value: 1000
      },
      {
        country: "Bhagalpur",
        value: 750
      }];
  
      // Update chart data
      this.chartForColumn.xAxes.getIndex(0).data.setAll(this.dataForColumn);
      this.chartForColumn.series.getIndex(0).data.setAll(this.dataForColumn);
    }
  };

  chartDataForPieChartOfAPI = () => {
    if (this.selectedOptionForPieChartOfAPI == 'Subsidiary ID - 1') {
      this.subsidiaryIdForChart = 1;
      this.GetChartData(this.subsidiaryIdForChart); 
    } else if (this.selectedOptionForPieChartOfAPI == 'Subsidiary ID - 2') {
      this.subsidiaryIdForChart = 2;
      this.GetChartData(this.subsidiaryIdForChart);  // for real api data.
    } else if (this.selectedOptionForPieChartOfAPI == 'Subsidiary ID - 43') {
      this.subsidiaryIdForChart = 43;
      this.GetChartData(this.subsidiaryIdForChart);
    } else if (this.selectedOptionForPieChartOfAPI == 'Subsidiary ID - 4') {
      this.subsidiaryIdForChart = 4;
      this.GetChartData(this.subsidiaryIdForChart);  // for real api data.
    } else if (this.selectedOptionForPieChartOfAPI == 'Subsidiary ID - 5') {
      this.subsidiaryIdForChart = 5;
      this.GetChartData(this.subsidiaryIdForChart);  // for real api data.
    } else if (this.selectedOptionForPieChartOfAPI == 'Subsidiary ID - 6') {
      this.subsidiaryIdForChart = 7;
      this.GetChartData(this.subsidiaryIdForChart);  // for real api data.
    } else if (this.selectedOptionForPieChartOfAPI == 'Subsidiary ID - 7') {
      this.subsidiaryIdForChart = 7;
      this.GetChartData(this.subsidiaryIdForChart);  // for real api data.
    } else if (this.selectedOptionForPieChartOfAPI == 'Subsidiary ID - 8') {
      this.subsidiaryIdForChart = 8;
      this.GetChartData(this.subsidiaryIdForChart);  // for real api data.
    } else if (this.selectedOptionForPieChartOfAPI == 'Subsidiary ID - 9') {
      this.subsidiaryIdForChart = 9;
      this.GetChartData(this.subsidiaryIdForChart);  // for real api data.
    } else if (this.selectedOptionForPieChartOfAPI == 'Subsidiary ID - 10') {
      this.subsidiaryIdForChart = 10;
      this.GetChartData(this.subsidiaryIdForChart);  // for real api data.
    }
  };

  GetChartData(subsidiaryIdForChart:any) {
    this.HttpService
      // .GetById('/supplier/get-dashboard-by-status?subsidiaryId=1', this.Controller.subsidiaryId)
      .GetById(`/supplier/get-dashboard-by-status?subsidiaryId=`+subsidiaryIdForChart, subsidiaryIdForChart)
      .subscribe((res) => {
        this.chartData = res;
        console.log(this.chartData);
        this.updateChartData();
        res.forEach((data: any) => console.log(data)); // to log each object in the array separately.
      });
  }

  updateChartData() {
    // alert(this.subsidiaryIdForChart);
    this.pieSeriesOfAPI.data.setAll(this.chartData); // set the data for the chart series
    this.pieSeriesOfAPI.appear(1000, 100); // animate the chart series
  }

}
