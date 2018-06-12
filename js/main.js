
var main = function() {

BASE_URI = ""

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
        value[i] = row['perf'];
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
    if (x === "") return "";
    var x_ = Number.parseFloat(x)
    return  (Number.parseFloat(x_)*100).toFixed(1) + "%";
}

var format_percent_with_plus = function(x) {
    if (x === "") return "";
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


Plotly.d3.csv(BASE_URI + '/series/folio_btc_eth_xrp_perf.csv',
              function(err, portfolio_raw) {
Plotly.d3.csv(BASE_URI + '/series/folio_equal-weight_btc_eth_xrp_perf.csv',
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
		},
		colors: ['#20B2AA', '#778899']
    }, {displayModeBar: false});

    index_value = Number.parseFloat(portfolio_raw[portfolio_raw.length - 1]["perf"]);
    index_element = document.getElementById("crypto_index_value");
    index_element.textContent = index_value.toLocaleString().split(".")[0];

    index_date = portfolio_raw[portfolio_raw.length - 1][""];
    index_date_element = document.getElementById("as_of_date");
    index_date_element.textContent = index_date;
});
});


Plotly.d3.csv(BASE_URI + '/series/folio_btc_eth_xrp_alloc.csv',
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

function summary_to_map(ret_summary) {
    var res = {};
    for (var i = 0; i < ret_summary.length; ++i) {
        res[ret_summary[i][""]] = ret_summary[i]["return_summary"];
    }

    return res;
}

function format_ret_summary(ret_map) {
    return "1D: " +  format_percent(ret_map["D"]) + " | " +
           "1M: " + format_percent(ret_map["M"]) + " | " +
           "YTD: " + format_percent(ret_map["YTD"]) + " | " +
           "12M: " + format_percent(ret_map["Y"]);
}

Plotly.d3.csv(BASE_URI + '/series/folio_quick_stats.csv',
              function(err, stats_raw) {
Plotly.d3.csv(BASE_URI + '/series/folio_btc_eth_xrp_ret_summary.csv',
              function(err, ret_summary) {
    var ret_map = summary_to_map(ret_summary);

    var metrics_body = document.getElementById("crypto_index_perf");
    metrics_body.textContent = format_ret_summary(ret_map);
    var stats = {};
    
    for (var i = 0; i < stats_raw.length; ++i) {
        stats[stats_raw[i][""]] = stats_raw[i];
    }

    var index_stat = stats["folio_btc_eth_xrp"];
    var bench_stat = stats["folio_equal-weight_btc_eth_xrp"];

    var stats = [
        ["Perf.", format_percent(ret_map["Start (yearly)"]),
        format_percent(bench_stat["perf"])],
        ["Volatility", format_percent(index_stat["vol"]), format_percent(bench_stat["vol"])],
        ["Max Drawdown", format_percent(index_stat["dd"]), format_percent(bench_stat["dd"])],
        ["Sharpe", format_float(index_stat["Sharpe"], 2), format_float(bench_stat["Sharpe"], 2)]
    ];

    var metrics_body = document.getElementById("metrics-table");
    for (var i = 0; i < stats.length; ++i) {
        tr = create_row(stats[i]);
        metrics_body.appendChild(tr);
    }
});});


var Table = function() {
    var Table = function Table(table_id) {
        this.table_id = table_id;
        this.table_element = document.getElementById(this.table_id);
        this.header = this.table_element.children[0]
        this.body = this.table_element.children[1]
    };

    var clear_children = function(element) {
        for (var i = 0; i < element.children.length; ++i) {
            element.removeChild(element.children[i]);
        }
    };

    Table.prototype.clear = function() {
        clear_children(this.header)
        clear_children(this.body)
    };

    Table.prototype.append_header = function(row) {
        tr = create_row(row);
        this.header.appendChild(tr);
    };

    Table.prototype.append_row = function(row) {
        tr = create_row(row);
        this.body.appendChild(tr);
    };

    Table.prototype.print_dataframe = function(df, formatter) {
        formatter = formatter ? formatter : (function(x) { return x; });
        this.clear();

        header = Object.keys(df[0])
        this.append_header(header)

        for (var i = 0; i < df.length; ++i) {
            row = Object.values(df[i])
            pretty_row = [row[0]].concat(row.slice(1).map(formatter))
            this.append_row(pretty_row)
        }
    };

    return Table;
}();

Plotly.d3.csv(BASE_URI + '/series/folio_btc_eth_xrp_monthly_ret.csv',
              function(err, stats_raw) {
    monthly_table = new Table("monthly-ret-table");
	monthly_table.print_dataframe(stats_raw, format_percent);
});
};
