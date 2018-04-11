---
layout: page
title: Fund Index
permalink: /
---

## Performance

<div id="crypto_fund_plot" class="graph"></div>
<script>

    Plotly.d3.csv('/cryptoriskcontrol-site/series/folio_bitcoin.csv', function(err, rows){
        var date = Array(rows.length)
        var perf = Array(rows.length)

        rows.map(function(row, i) {
            date[i] = row[''];
            perf[i] = row['perf'];
        });

        var data = [{
            x: date,
            y: perf,
            type: 'scatter'
        }];

        Plotly.newPlot('crypto_fund_plot', data, {
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)'
        });
    })

</script>


## Metrics

|                            | Crypto fund                     | BTC                             |
|:---------------------------|:--------------------------------|:--------------------------------|
| Return                     | 11.2%                           | 18.5%                           |
| Volatility                 | 4%                              | 18%                             |
| Sharpe Ratio               | 2.80                            | 1%                              |
| Max Drawdown               | -2%                             | -7%                             |


