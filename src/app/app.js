angular
  .module('app')
  .component('app', {
    templateUrl: 'app/template.html',
    controllerAs: 'main',
    controller($http, jmespath, moment, _) {

      this.chart2 = {data:{},options:{}}

      // Reference $HTTP: https://www.w3schools.com/angular/angular_http.asp
      // Reference NVD3: http://krispo.github.io/angular-nvd3/#/quickstart

      this.hello = 'Cuadro de mando, TransferWise';
      this.greetings = "Bienvenidos al dashboard ficticio de TransferWise"

      this.callback = function() { }

      this.chart2.options = {
        chart: {
          type: 'discreteBarChart',
          height: 200,
          margin : {
            top: 10,
            bottom: 30,
            right: 10,
            left: 10
          },
          x: (d) => { return d.label; },
          y: function(d){ return d.value; },
          showValues: true,
          valueFormat: function(d) { return d3.format(',.4f')(d); },
          transitionDuration: 500,
          xAxis: {
            axisLabel: 'X Axis'
          },
          yAxis: {
            axisLabel: 'Y Axis',
            axisLabelDistance: 30
          }
        }
      };

      let rawData = [
        { "label" : "A" , "value" : 150000000 },
        { "label" : "B" , "value" : 160000000 },
        { "label" : "C" , "value" : 140000000 },
        { "label" : "D" , "value" : 110000000 },
        { "label" : "E" , "value" : 100000000 },
        { "label" : "F" , "value" : 200000000 },
        { "label" : "G" , "value" : 130000000 },
        { "label" : "H" , "value" : 120000000 }
      ]

      this.chart2.data = [{
        key: "Cumulative Return",
        values: rawData
      }]

      //GRafico 2
      ///////////////////////////////////////////////////////////////////////////////////////////////////////////////7

      this.chart1 = {data:{id:1},options:{}}

      this.chart1.options = {
        chart: {
          type: 'lineWithFocusChart',
          height: 450,
          margin : {
            top: 20,
            right: 20,
            bottom: 60,
            left: 40
          },
          duration: 500,
          useInteractiveGuideline: true,
          xAxis: {
            axisLabel: 'X Axis',
            tickFormat: function(d){
              return d3.format(',f')(d);
            }
          },
          x2Axis: {
            tickFormat: function(d){
              return d3.format(',f')(d);
            }
          },
          yAxis: {
            axisLabel: 'Y Axis',
            tickFormat: function(d){
              return d3.format(',.2f')(d);
            },
            rotateYLabel: false
          },
          y2Axis: {
            tickFormat: function(d){
              return d3.format(',.2f')(d);
            }
          }

        }
      };

      this.chart1.data = generateData();

      /* Random Data Generator (took from nvd3.org) */
      function generateData() {
        return stream_layers(3,10+Math.random()*200,.1).map(function(data, i) {
          return {
            key: 'Stream' + i,
            values: data
          };
        });
      }

      /* Inspired by Lee Byron's test data generator. */
      function stream_layers(n, m, o) {
        if (arguments.length < 3) o = 0;
        function bump(a) {
          var x = 1 / (.1 + Math.random()),
            y = 2 * Math.random() - .5,
            z = 10 / (.1 + Math.random());
          for (var i = 0; i < m; i++) {
            var w = (i / m - y) * z;
            a[i] += x * Math.exp(-w * w);
          }
        }
        return d3.range(n).map(function() {
          var a = [], i;
          for (i = 0; i < m; i++) a[i] = o + o * Math.random();
          for (i = 0; i < 5; i++) bump(a);
          return a.map(stream_index);
        });
      }

      /* Another layer generator using gamma distributions. */
      function stream_waves(n, m) {
        return d3.range(n).map(function(i) {
          return d3.range(m).map(function(j) {
            var x = 20 * j / m - i / 3;
            return 2 * x * Math.exp(-.5 * x);
          }).map(stream_index);
        });
      }

      function stream_index(d, i) {
        return {x: i, y: Math.max(0, d)};
      }

      //Gráfico 3
      ///////////////////////////////////////////////////////////////////////////////////////////////////////////////7
      this.chart3 = {
        data: {
          id:1
        },
        options:{}
      }

      this.chart3.options = {
        chart: {
          type: 'multiBarHorizontalChart',
          height: 450,
          x: function(d){return d.label;},
          y: function(d){return d.value;},
          //yErr: function(d){ return [-Math.abs(d.value * Math.random() * 0.3), Math.abs(d.value * Math.random() * 0.3)] },
          showControls: true,
          showValues: true,
          duration: 500,
          xAxis: {
            showMaxMin: false
          },
          yAxis: {
            axisLabel: 'Values',
            tickFormat: function(d){
              return d3.format(',.2f')(d);
            }
          }
        }
      };

      this.chart3.data = []

      $http.get("http://localhost:3001/data/chart1")
        .then((response) => {
          debugger
          this.chart3.data = response.data
        });

        /*
      this.chart3.data=
        [
          {
            "key": "Series1",
            "color": "#d62728",
            "values": [
              {
                "label" : "Group A" ,
                "value" : -1.8746444827653
              } ,
              {
                "label" : "Group B" ,
                "value" : -8.0961543492239
              } ,
              {
                "label" : "Group C" ,
                "value" : -0.57072943117674
              } ,
              {
                "label" : "Group D" ,
                "value" : -2.4174010336624
              } ,
              {
                "label" : "Group E" ,
                "value" : -0.72009071426284
              } ,
              {
                "label" : "Group F" ,
                "value" : -0.77154485523777
              } ,
              {
                "label" : "Group G" ,
                "value" : -0.90152097798131
              } ,
              {
                "label" : "Group H" ,
                "value" : -0.91445417330854
              } ,
              {
                "label" : "Group I" ,
                "value" : -0.055746319141851
              }
            ]
          },
          {
            "key": "Series2",
            "color": "#1f77b4",
            "values": [
              {
                "label" : "Group A" ,
                "value" : 25.307646510375
              } ,
              {
                "label" : "Group B" ,
                "value" : 16.756779544553
              } ,
              {
                "label" : "Group C" ,
                "value" : 18.451534877007
              } ,
              {
                "label" : "Group D" ,
                "value" : 8.6142352811805
              } ,
              {
                "label" : "Group E" ,
                "value" : 7.8082472075876
              } ,
              {
                "label" : "Group F" ,
                "value" : 5.259101026956
              } ,
              {
                "label" : "Group G" ,
                "value" : 0.30947953487127
              } ,
              {
                "label" : "Group H" ,
                "value" : 0
              } ,
              {
                "label" : "Group I" ,
                "value" : 0
              }
            ]
          }
        ]
        */

      //GRafico 4
      ///////////////////////////////////////////////////////////////////////////////////////////////////////////////7

      this.chart4 = {
        data: {
          id:1
        },
        options:{}
      };

      this.chart4.options = {
        chart: {
          type: 'pieChart',
          height: 450,
          donut: true,
          x: function(d){return d.key;},
          y: function(d){return d.y;},
          showLabels: true,

          pie: {
            startAngle: function(d) {return d.startAngle/2 -Math.PI/2 },
            endAngle: function(d) {return d.endAngle/2 -Math.PI/2 }
          },
          duration: 500,
          legend: {
            margin: {
              top: 5,
              right: 140,
              bottom: 5,
              left: 0
            }
          }
        }
      };


      this.chart4.data= [
        {
          key: "One",
          y: 5
        },
        {
          key: "Two",
          y: 2
        },
        {
          key: "Three",
          y: 9
        },
        {
          key: "Four",
          y: 7
        },
        {
          key: "Five",
          y: 4
        },
        {
          key: "Six",
          y: 3
        },
        {
          key: "Seven",
          y: .5
        }
      ];

        //GRafico 4
      ///////////////////////////////////////////////////////////////////////////////////////////////////////////////7

      this.chart5 = {
        data: {
          id:1
        },
        options:{}
      };

      this.chart5.options = {

          chart: {
                type: 'pieChart',
                height: 500,
                x: function(d){return d.key;},
                y: function(d){return d.y;},
                showLabels: true,
                duration: 500,
                labelThreshold: 0.01,
                labelSunbeamLayout: true,
                legend: {
                    margin: {
                        top: 5,
                        right: 35,
                        bottom: 5,
                        left: 0
                    }
                }
            }
      };

     this.chart5.data = [
            {
                key: "One",
                y: 5
            },
            {
                key: "Two",
                y: 2
            },
            {
                key: "Three",
                y: 9
            },
            {
                key: "Four",
                y: 7
            },
            {
                key: "Five",
                y: 4
            },
            {
                key: "Six",
                y: 3
            },
            {
                key: "Seven",
                y: .5
            }
        ];


    }
  });
