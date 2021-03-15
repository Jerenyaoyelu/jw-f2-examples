Component({
  properties: {
    chartData: {
      type: Object,
      value: {}
    }
  },
  data: {
    chartId: '__jw-basic-radar'
  },
  methods: {
    renderChart(e) {
      const {F2, config, that} = e.detail;
      if(!F2 || !config || !that) return;
      const chart = new F2.Chart(config);
      chart.coord('polar');
      chart.source(this.properties.chartData, {
        score: {
          min: 0,
          max: 120,
          nice: false,
          tickCount: 4
        }
      });
      chart.axis('score', {
        label: function label(text, index, total) {
          if (index === total - 1) {
            return null;
          }
          return {
            top: true
          };
        },
        grid: {
          lineDash: null,
          type: 'arc' // 弧线网格
        }
      });
      chart.axis('item', {
        grid: {
          lineDash: null
        }
      });
      chart.line().position('item*score').color('user');
      chart.point().position('item*score').color('user')
        .style({
          stroke: '#fff',
          lineWidth: 1
        });
      chart.render();
      that.chart = chart;
      that.canvasEl = chart.get('el');
    }
  }
})