
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

var build_alloc_pie_data = function(csv_raw) {
    var alloc = [];
    var labels = [];
    var last_row = csv_raw[1];

    return {
        alloc: [last_row["BTC-USD"]*100, last_row["ETH-USD+"]*100,
                last_row["XRP-USD+"]*100, last_row["cash"]*100],
        labels: ["BTC", "ETH", "XRP", "USD"]
    };
};

var format_percent = function(x) {
    return  (Number.parseFloat(x)*100).toFixed(1) + "%";
}

var format_percent_with_plus = function(x) {
    var x_ = Number.parseFloat(x)
    return  ((x_ > 0) ? "+" : "") + (x_*100).toFixed(1) + "%";
}

var format_float = function(x, decimals) {
    return  Number.parseFloat(x).toFixed(decimals);
}

var build_alloc_table_data = function(csv_raw) {
    var current_row = csv_raw.find(row => { return row[""] == "current"; })
    var target_row = csv_raw.find(row => { return row[""] == "target"; })
    var change_row = csv_raw.find(row => { return row[""] == "change"; })

    return [
        ["BTC", format_percent(target_row["BTC-USD"]),
                format_percent(current_row["BTC-USD"]),
                format_percent_with_plus(change_row["BTC-USD"])],
        ["ETH", format_percent(target_row["ETH-USD+"]),
                format_percent(current_row["ETH-USD+"]),
                format_percent_with_plus(change_row["ETH-USD+"])],
        ["XRP", format_percent(target_row["XRP-USD+"]),
                format_percent(current_row["XRP-USD+"]),
                format_percent_with_plus(change_row["XRP-USD+"])],
        ["USD", format_percent(target_row["cash"]),
                format_percent(current_row["cash"]),
                format_percent_with_plus(change_row["cash"])]
    ];
};


Plotly.d3.csv('/cryptoriskcontrol-site/series/folio_btc_eth_xrp.csv',
              function(err, portfolio_raw) {
Plotly.d3.csv('/cryptoriskcontrol-site/series/folio_equal-weight_btc_eth_xrp.csv',
              function(err, benchmark_raw) {
    var plot_data = [
        build_plot_data(portfolio_raw, 'Crypto Risk Control Index'),
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

    index_value = Number.parseFloat(portfolio_raw[portfolio_raw.length - 1]["value"]);
    index_element = document.getElementById("crypto_index_value");
    index_element.textContent = index_value.toLocaleString().split(".")[0];
});
});


Plotly.d3.csv('/cryptoriskcontrol-site/series/folio_btc_eth_xrp_alloc.csv',
    function(err, alloc_raw) {
    var pie_layout = {
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        colors: ['#4682B4', '#008080', '#CD5C5C', '#2E8B57'],
        height: 200,
        width: 300,
        margin: {
            l: 0,
            r: 0,
            b: 0,
            t: 0,
            pad: 0
        }
    };

    var alloc_pie_data = build_alloc_pie_data(alloc_raw);
    Plotly.newPlot('alloc_folio_multi', [{
        values: alloc_pie_data.alloc,
        labels: alloc_pie_data.labels,
        type: 'pie'
    }], pie_layout, {displayModeBar: false});


    var alloc_table = build_alloc_table_data(alloc_raw);
    var allocation_body = document.getElementById("allocation-table");
    for (var i = 0; i < alloc_table.length; ++i) {
        tr = create_row(alloc_table[i]);
        allocation_body.appendChild(tr);
    }
});

Plotly.d3.csv('/cryptoriskcontrol-site/series/folio_quick_stats.csv',
              function(err, stats_raw) {

    var stats = [
        ["Yearly Returns", format_percent(stats_raw[0]["perf"]),
        format_percent(stats_raw[1]["perf"])],
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
