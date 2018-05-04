
var main = function() {
var create_row = function(row_data) {
    var tr = document.createElement("tr");
    for (var i = 0; i < row_data.length; ++i) {
        var td = document.createElement("td");
        td.textContent = row_data[i];
        tr.append(td);
    }

    return tr;
};

var build_plot_data = function(csv_raw, name) {
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
};

var build_alloc_data = function(csv_raw) {
    var alloc = [];
    var labels = [];
    var last_row = csv_raw[csv_raw.length - 1];

    return {
        alloc: [last_row["BTC-USD"]*100, last_row["ETH-USD+"]*100,
                last_row["XRP-USD+"]*100, last_row["cash"]*100],
        labels: ["BTC", "ETH", "XRP", "USD"]
    };
};

var format_percent = function(x) {
    return  (Number.parseFloat(x)*100).toFixed(1) + "%";
}

var format_float = function(x, decimals) {
    return  Number.parseFloat(x).toFixed(decimals);
}

Plotly.d3.csv('/cryptoriskcontrol-site/series/folio_btc_eth_xrp.csv',
              function(err, portfolio_raw) {
Plotly.d3.csv('/cryptoriskcontrol-site/series/folio_equal-weight_btc_eth_xrp.csv',
              function(err, benchmark_raw) {
    var plot_data = [
        build_plot_data(portfolio_raw, 'Crypto Risk Control Fund'),
        build_plot_data(benchmark_raw, 'Equal Weights Benchmark')
    ];

    Plotly.newPlot('crypto_fund_plot', plot_data, {
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        xaxis: {
		    autorange: true,
		    //rangeslider: { autorange: true },
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

    var alloc_data = build_alloc_data(portfolio_raw);
    Plotly.newPlot('alloc_folio_multi', [{
                   values: alloc_data.alloc,
                   labels: alloc_data.labels,
                   type: 'pie'
                  }], pie_layout, {displayModeBar: false});


    var alloc_table = [
        [format_percent(alloc_data.labels[0]),
         format_percent(alloc_data.alloc[0]), "", ""],
        [format_percent(alloc_data.labels[1]),
         format_percent(alloc_data.alloc[1]), "", ""],
        [format_percent(alloc_data.labels[2]),
         format_percent(alloc_data.alloc[2]), "", ""],
        [format_percent(alloc_data.labels[3]),
         format_percent(alloc_data.alloc[3]), "", ""]
    ];

    var allocation_body = document.getElementById("allocation-table");
    for (var i = 0; i < alloc_table.length; ++i) {
        tr = create_row(alloc_table[i]);
        allocation_body.appendChild(tr);
    }
});
});


Plotly.d3.csv('/cryptoriskcontrol-site/series/folio_quick_stats.csv',
              function(err, stats_raw) {

    var stats = [
        ["Perf.", format_percent(stats_raw[0]["perf"]), format_percent(stats_raw[1]["perf"])],
        ["Volatility", format_percent(stats_raw[0]["vol"]), format_percent(stats_raw[1]["vol"])],
        ["Max Drawdown", format_percent(stats_raw[0]["dd"]), format_percent(stats_raw[1]["dd"])],
        ["Sharpe", format_float(stats_raw[0]["Sharpe"], 2), format_float(stats_raw[1]["Sharpe"], 2)]
    ];

    var metrics_body = document.getElementById("metrics-table");
    for (var i = 0; i < stats.length; ++i) {
        tr = create_row(stats[i]);
        metrics_body.appendChild(tr);
    }
});
};


