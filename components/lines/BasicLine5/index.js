Component({
  properties: {
    chartData: {
      type: Object,
      value: {}
    }
  },
  data: {
    chartId: '__jw-basic-line-5'
  },
  methods: {
    renderChart(e) {
      const {F2, config, that} = e.detail;
      if(!F2 || !config || !that) return;
      const chart = new F2.Chart(config);
      chart.source(this.properties.chartData);
      chart.axis('x', {
        grid: function grid(text) {
          if (text === 0) {
            return {
              lineDash: null
            };
          }
        }
      });
      chart.axis('y', {
        grid: function grid(text) {
          if (text === 0) {
            return {
              lineDash: null
            };
          }
        }
      });
      chart.tooltip(false);
      chart.interaction('pan', {
        limitRange: {
          x: {
            min: -100,
            max: 100
          }
        }
      });
      chart.interaction('pinch', {
        maxScale: 5,
        minScale: 1
      });
      chart.line().position('x*y').shape('smooth');
      chart.render();
      that.chart = chart;
      that.canvasEl = chart.get('el');
    }
  }
})