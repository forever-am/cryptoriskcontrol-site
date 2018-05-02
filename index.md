---
layout: page
title: Fund Index
permalink: /
---

## Performance

<div id="crypto_fund_plot" class="graph"></div>
<script>

    function build_plot_data(csv_raw) {
        var date = Array(csv_raw.length)
        var value = Array(csv_raw.length)

        csv_raw.map(function(row, i) {
            date[i] = row[''];
            value[i] = row['value'];
        });

        return {
            x: date,
            y: value,
            type: 'scatter'
        };
    }


    Plotly.d3.csv('/cryptoriskcontrol-site/series/folio_bitcoin.csv', function(err, btc_raw) {
    Plotly.d3.csv('/cryptoriskcontrol-site/series/folio_ethereum.csv', function(err, eth_raw) {
    Plotly.d3.csv('/cryptoriskcontrol-site/series/folio_ripple.csv', function(err, xrp_raw) {
    Plotly.d3.csv('/cryptoriskcontrol-site/series/folio_btc_eth_xrp.csv', function(err, multi_raw) {
        var plot_data = [
            build_plot_data(btc_raw),
            build_plot_data(eth_raw),
            build_plot_data(xrp_raw),
            build_plot_data(multi_raw)
        ];

        Plotly.newPlot('crypto_fund_plot', plot_data, {
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)',
            xaxis: {
				autorange: true,
				//range: ["2015-02-17", "2017-02-16"],
				rangeslider: { autorange: true },
				type: "date"
			},
			yaxis: {
			    autorange: true,
			    type: 'log'
			}
        }, {displayModeBar: false});
    })})})})

</script>


## Metrics

|                            | Crypto fund                     | BTC                             |
|:---------------------------|:--------------------------------|:--------------------------------|
| Return                     | 11.2%                           | 18.5%                           |
| Volatility                 | 4%                              | 18%                             |
| Sharpe Ratio               | 2.80                            | 1%                              |
| Max Drawdown               | -2%                             | -7%                             |


