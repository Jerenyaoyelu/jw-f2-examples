Component({
  properties: {
    chartData: {
      type: Object,
      value: {}
    }
  },
  data: {
    chartId: '__jw-basic-line-3'
  },
  methods: {
    renderChart(e) {
      const {F2, config, that} = e.detail;
      if(!F2 || !config || !that) return;
      const chart = new F2.Chart(config);
      chart.source(this.properties.chartData, {
        value: {
          tickCount: 5,
          min: 0
        },
        day: {
          range: [ 0, 1 ]
        }
      });
      chart.tooltip({
        showCrosshairs: true,
        showItemMarker: false,
        onShow: function onShow(ev) {
          const items = ev.items;
          items[0].name = null;
          items[0].value = '$ ' + items[0].value;
        }
      });
      chart.axis('day', {
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
      chart.line().position('day*value');
      chart.point().position('day*value').style({
        stroke: '#fff',
        lineWidth: 1
      });
      chart.render();
      that.chart = chart;
      that.canvasEl = chart.get('el');
    }
  }
})