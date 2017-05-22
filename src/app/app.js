angular
  .module('app')
  .component('app', {
    templateUrl: 'app/template.html',
    controllerAs: 'main',
    controller($http, jmespath, moment, _) {

      this.chart2 = {data:{},options:{}}


      // Reference: http://krispo.github.io/angular-nvd3/#/quickstart
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
        
    }
  });
