---
layout: page
title:
permalink: /
---

## Performance

<div id="crypto_fund_plot" class="graph" style="width: 885; height: 400;"></div>
<script>

    var data = [
    {
    x: ['2013-10-04 22:23:00', '2013-11-04 22:23:00', '2013-12-04 22:23:00'],
    y: [1, 3, 6],
    type: 'scatter'
   }
    ];

   Plotly.newPlot('crypto_fund_plot', data, {
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)'
   });

</script>


## Metrics

|                            | Crypto fund                     | BTC                             |
|:---------------------------|:--------------------------------|:--------------------------------|
| Return                     | 11.2%                           | 18.5%                           |
| Volatility                 | 4%                              | 18%                             |
| Sharpe Ratio               | 2.80                            | 1%                              |
| Max Drawdown               | -2%                             | -7%                             |


