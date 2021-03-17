Component({
  properties: {
    chartData: {
      type: Object,
      value: {}
    }
  },
  data: {
    chartId: '__jw-basic-line-4'
  },
  methods: {
    renderChart(e) {
      const {F2, config, that} = e.detail;
      if(!F2 || !config || !that) return;
      const chart = new F2.Chart(config);
      const defs = {
        time: {
          type: 'timeCat',
          mask: 'MM/DD',
          tickCount: 3,
          range: [ 0, 1 ]
        },
        tem: {
          tickCount: 5,
          min: 0,
          alias: '日均温度'
        }
      };
      chart.source(this.properties.chartData, defs);
      chart.axis('time', {
        label: function label(text, index, total) {
          const textCfg = {};
          if (index === 0) {
            textCfg.textAlign = 'left';
          } else if (index === total - 1) {
            textCfg.textAlign = 'right';
          }
          return textCfg;
        }
      });
      chart.tooltip({
        showCrosshairs: true
      });
      chart.line().position('time*tem').shape('smooth');
      chart.point().position('time*tem').shape('smooth')
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