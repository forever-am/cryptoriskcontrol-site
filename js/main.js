
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
};

var format_percent = function(x) {
    return  (Number.parseFloat(x)*100).toFixed(1) + "%";
}

var format_float = function(x, decimals) {
    return  Number.parseFloat(x).toFixed(decimals);
}

Plotly.d3.csv('/cryptoriskcontrol-site/series/folio_btc_eth_xrp.csv',
              function(err, multi_raw) {
    var plot_data = [
        build_plot_data(multi_raw, 'BTC-ETH-XRP fund')
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

    Plotly.newPlot('alloc_folio_multi', [build_alloc_data(multi_raw)],
                   pie_layout, {displayModeBar: false});
});


Plotly.d3.csv('/cryptoriskcontrol-site/series/folio_quick_stats.csv',
              function(err, multi_raw) {

    var stats = [
        ["Perf.", format_percent(multi_raw[0]["perf"]), format_percent(multi_raw[1]["perf"])],
        ["Volatility", format_percent(multi_raw[0]["vol"]), format_percent(multi_raw[1]["vol"])],
        ["Max Drawdown", format_percent(multi_raw[0]["dd"]), format_percent(multi_raw[1]["dd"])],
        ["Sharpe", format_float(multi_raw[0]["Sharpe"], 2), format_float(multi_raw[1]["Sharpe"], 2)]
    ];

    var metrics_body = document.getElementById("metrics-table");
    for (var i = 0; i < stats.length; ++i) {
        tr = create_row(stats[i]);
        metrics_body.appendChild(tr);
    }
});
};


