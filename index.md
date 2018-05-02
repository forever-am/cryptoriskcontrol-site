---
layout: page
title: Fund Index
permalink: /
---

## Performance

<div id="crypto_fund_plot" class="graph"></div>

## Allocation

<div id="alloc_folio_btc" class="graph"></div>
<div id="alloc_folio_eth" class="graph"></div>
<div id="alloc_folio_xrp" class="graph"></div>
<div id="alloc_folio_multi" class="graph"></div>

<script>

    function build_plot_data(csv_raw, name) {
        var date = Array(csv_raw.length);
        var value = Array(csv_raw.length);

        csv_raw.map(function(row, i) {
            date[i] = row[''];
            value[i] = row['value'];
        });

        return {
            x: date,
            y: value,
            type: 'scatter',
            name: name
        };
    }

    function build_alloc_data(csv_raw) {
        var alloc = [];
        var labels = [];
        var last_row = csv_raw[csv_raw.length - 1];
    
        var keys = Object.keys(last_row);
        for (var i = 0; i < keys.length; ++i) {
            var key = keys[i];
            if (key == "value") continue;
            if (key == "") continue;
            alloc.push(last_row[key]*100);
            labels.push(key);
        }

        return {
            values: alloc,
            labels: labels,
            type: 'pie'
        };
    }

    Plotly.d3.csv('/cryptoriskcontrol-site/series/folio_bitcoin.csv', function(err, btc_raw) {
    Plotly.d3.csv('/cryptoriskcontrol-site/series/folio_ethereum.csv', function(err, eth_raw) {
    Plotly.d3.csv('/cryptoriskcontrol-site/series/folio_ripple.csv', function(err, xrp_raw) {
    Plotly.d3.csv('/cryptoriskcontrol-site/series/folio_btc_eth_xrp.csv', function(err, multi_raw) {
        var plot_data = [
            build_plot_data(btc_raw, 'BTC fund'),
            build_plot_data(eth_raw, 'ETH fund'),
            build_plot_data(xrp_raw, 'XRP fund'),
            build_plot_data(multi_raw, 'BTC-ETH-XRP fund')
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

        var pie_layout = {
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)',
            height: 400,
            width: 400
        };

        Plotly.newPlot('alloc_folio_btc', [build_alloc_data(btc_raw)],
                       pie_layout, {displayModeBar: false});
        Plotly.newPlot('alloc_folio_eth', [build_alloc_data(eth_raw)],
                       pie_layout, {displayModeBar: false});
        Plotly.newPlot('alloc_folio_xrp', [build_alloc_data(xrp_raw)],
                       pie_layout, {displayModeBar: false});
        Plotly.newPlot('alloc_folio_multi', [build_alloc_data(multi_raw)],
                       pie_layout, {displayModeBar: false});
        
    })})})})

</script>


## Metrics

|                            | Crypto fund                     | BTC                             |
|:---------------------------|:--------------------------------|:--------------------------------|
| Return                     | 11.2%                           | 18.5%                           |
| Volatility                 | 4%                              | 18%                             |
| Sharpe Ratio               | 2.80                            | 1%                              |
| Max Drawdown               | -2%                             | -7%                             |


