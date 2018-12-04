// Build the allocation chart
var Allocation = (function (hc) {
    'use strict';

    return function (container, parameters) {
        var colors = [];
        parameters.forEach(function (item) {
            // Add colors from liquid for highcharts, so specific alloc keeps specific colors, regardless of it's value
            if (item.color)
                colors.push(item.color);
        });
        hc.setOptions({
            colors: colors
        });
        hc.chart(container, {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },

            title: {
                text: ''
            },

            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },

            credits: {
                enabled: false
            },

            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '{point.percentage:.1f} %',
                        distance: -45,
                        style: {
                            fontSize: 14
                        },
                        filter: {
                            property: 'percentage',
                            operator: '>',
                            value: 4
                        }
                    },
                    showInLegend: true
                }
            },

            legend: {
                symbolHeight: 14,
                symbolWidth: 14,
                symbolRadius: 0
            },

            series: [{
                name: 'Allocation',
                colorByPoint: true,
                data: parameters
            }]
        });
    };
}(Highcharts));
// Build the performance chart
var CRCPerformance = (function (hc) {
    'use strict';

    return function (container, parameters) {

        hc.stockChart(container, {

            title: {
                text: ''
            },

            yAxis: {
                minPadding: 0.,
                maxPadding: 0.,
                type: 'logarithmic',
                minorTickInterval: .01,
                opposite: false,
                minorGridLineWidth: 0,
                gridLineColor: '#ddd',
                labels: {
                    style: {
                        color: '#3d3d3d',
                        fontSize: 14
                    }
                }
            },

            xAxis: {
                type: 'datetime',
                gridLineWidth: 1,
               // min: Date.UTC(2011, 10, 31),
                dateTimeLabelFormats: {
                    day: '%Y'
                },
                labels: {
                    style: {
                        color: '#3d3d3d',
                        fontSize: 14
                    }
                }
            },

            chart: {
                backgroundColor: 'var(--color-section)'
            },

            scrollbar: {
                // enabled: false
            },

            legend: {
                enabled: true,
                align: 'bottom',
                // verticalAlign: 'top',
                layout: 'horizontal'
            },

            rangeSelector: {
                enabled: false,
                floating: true,
                y: -65,
                verticalAlign: 'bottom'
            },

            navigator: {
                yAxis: {
                    type: 'logarithmic'
                }
            },

            series: [{
                name: 'CRC3 Index',
                data: parameters['crc'],
                color: '#223b73',
                showInNavigator: true,
                tooltip: {
                    valueDecimals: 2
                },
                lineWidth: 2
            },

                {
                    name: 'Bitcoin (USD)',
                    data: parameters['ewb'],
                    color: '#23a899',
                    showInNavigator: true,
                    tooltip: {
                        valueDecimals: 2
                    },
                    lineWidth: 2
                }],

            credits: {
                enabled: false
            },

            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 600
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            }
        });
    };
}(Highcharts));

// Menu toggling fn
var toggleMenu = function () {
    var body = document.body;
    body.className.match(/(?:^|\s)menu-open(?!\S)/) ? body.classList.remove('menu-open') : body.classList.add('menu-open');
};

// Table expand on click
var tableExpand = function () {
    var trigger = document.getElementById('expand-table');
    var switcher = false;

    if (!trigger) {
        return;
    }

    trigger.addEventListener('click', function () {
        switcher = !switcher;
        document.querySelectorAll('.mr-data tr').forEach(function (item, index) {
            (index > 3) && item.classList.toggle('to-show');
        });

        switcher ? trigger.innerHTML = 'Show Less' : trigger.innerHTML = 'Show More';
    });
};

var tableIndicators = function () {
    var tables = Array.from(document.querySelectorAll('[data-wide-table]'));
    var tableIndicators = document.querySelectorAll('table .indicator');

    tables.forEach(function (item) {

        item.addEventListener('scroll', function () {
            var currentScroll = item.scrollLeft;
            currentScroll > 60 ? item.classList.add('show') : item.classList.remove('show');

            tableIndicators.forEach(function (item) {
                item.style.left = currentScroll + 'px' || '0';
            });
        });
    });
};

(function () {
    window.jsonData = {};

    fetch('../assets/data/CRC3_alloc.json').then(function (response) {
        response.json().then(function (json) {
            window.jsonData.allocation = json;

            if (!document.getElementById('allocation-chart')) {
                return;
            }

            var allocationJsonBtc1 = document.getElementById('allocation-json-btc-1');
            var allocationJsonBtc0 = document.getElementById('allocation-json-btc-0');
            var allocationJsonBtcConclude = document.getElementById('allocation-json-btc-conclude');
            var allocationJsonEth1 = document.getElementById('allocation-json-eth-1');
            var allocationJsonEth0 = document.getElementById('allocation-json-eth-0');
            var allocationJsonEthConclude = document.getElementById('allocation-json-eth-conclude');
            var allocationJsonXrp1 = document.getElementById('allocation-json-xrp-1');
            var allocationJsonXrp0 = document.getElementById('allocation-json-xrp-0');
            var allocationJsonXrpConclude = document.getElementById('allocation-json-xrp-conclude');
            var allocationJsonCash1 = document.getElementById('allocation-json-cash-1');
            var allocationJsonCash0 = document.getElementById('allocation-json-cash-0');
            var allocationJsonCashConclude = document.getElementById('allocation-json-cash-conclude');

            allocationJsonBtc1 && (allocationJsonBtc1.innerHTML = ((parseFloat(json['BTC-USD']["target"]) || 0) * 100).toFixed(1) + '%');
            allocationJsonBtc0 && (allocationJsonBtc0.innerHTML = ((parseFloat(json['BTC-USD']["current"]) || 0) * 100).toFixed(1) + '%');
            allocationJsonBtcConclude && (allocationJsonBtcConclude.innerHTML = (parseFloat(json['BTC-USD']["change"]) > 0 ? '+' : '') + ((parseFloat(json['BTC-USD']["change"]) || 0) * 100).toFixed(1) + '%');
            allocationJsonEth1 && (allocationJsonEth1.innerHTML = ((parseFloat(json['ETH-USD+']["target"]) || 0) * 100).toFixed(1) + '%');
            allocationJsonEth0 && (allocationJsonEth0.innerHTML = ((parseFloat(json['ETH-USD+']["current"]) || 0) * 100).toFixed(1) + '%');
            allocationJsonEthConclude && (allocationJsonEthConclude.innerHTML = (parseFloat(json['ETH-USD+']["change"]) > 0 ? '+' : '') + ((parseFloat(json['ETH-USD+']["change"]) || 0) * 100).toFixed(1) + '%');
            allocationJsonXrp1 && (allocationJsonXrp1.innerHTML = ((parseFloat(json['XRP-USD+']["target"]) || 0) * 100).toFixed(1) + '%');
            allocationJsonXrp0 && (allocationJsonXrp0.innerHTML = ((parseFloat(json['XRP-USD+']["current"]) || 0) * 100).toFixed(1) + '%');
            allocationJsonXrpConclude && (allocationJsonXrpConclude.innerHTML = (parseFloat(json['XRP-USD+']["change"]) > 0 ? '+' : '') + ((parseFloat(json['XRP-USD+']["change"]) || 0) * 100).toFixed(1) + '%');
            allocationJsonCash1 && (allocationJsonCash1.innerHTML = ((parseFloat(json['cash']["target"]) || 0) * 100).toFixed(1) + '%');
            allocationJsonCash0 && (allocationJsonCash0.innerHTML = ((parseFloat(json['cash']["current"]) || 0) * 100).toFixed(1) + '%');
            allocationJsonCashConclude && (allocationJsonCashConclude.innerHTML = (parseFloat(json['cash']["change"]) > 0 ? '+' : '') + ((parseFloat(json['cash']["change"]) || 0) * 100).toFixed(1) + '%');

            new Allocation('allocation-chart', [
                { name: 'BTC', y: parseFloat(json['BTC-USD']["target"]), color: '#23a899' },
                { name: 'ETH', y: parseFloat(json['ETH-USD+']["target"]), color: '#243a73' },
                { name: 'XRP', y: parseFloat(json['XRP-USD+']["target"]), color: '#3e3e3e' },
                { name: 'USD', y: parseFloat(json['cash']["target"]), color: '#e6e7e9' },
            ].sort(function (a, b) {
                return a.y < b.y;
            }).map(function (item, index) {
                if (index === 0) {
                    item.sliced = true;
                    item.selected = true;
                }

                return item;
            }));
        });
    });

    fetch('../assets/data/CRC3_ret_summary.json').then(function (response) {
        response.json().then(function (json) {
            window.jsonData.index = json;

            var format_perf = function (x) {
                return (parseFloat(x) * 100.).toFixed(1) + '%'
            };

            var perfStartYearly = document.getElementById('perf-start-yearly');
            var dataReturnSummary0 = document.getElementById('data-return-summary-0');
            var dataReturnSummary2 = document.getElementById('data-return-summary-2');
            var dataReturnSummary3 = document.getElementById('data-return-summary-3');
            var dataReturnSummary4 = document.getElementById('data-return-summary-4');

            perfStartYearly && (perfStartYearly.innerHTML = ((parseFloat(json['Start (yearly)']) || 0) * 100).toFixed(1) + '%');
            dataReturnSummary0 && (dataReturnSummary0.innerHTML = format_perf(json['D']));
            dataReturnSummary2 && (dataReturnSummary2.innerHTML = format_perf(json['MTD']));
            dataReturnSummary3 && (dataReturnSummary3.innerHTML = format_perf(json['YTD']));
            dataReturnSummary4 && (dataReturnSummary4.innerHTML = format_perf(json['Y']));
        });
    });
    
    fetch('../assets/data/CRC3_monthly_ret.json').then(function (response) {
		
        response.json().then(function (json) {
            window.jsonData.monthlyReturn = json;
            var tableBody = document.getElementById('monthly-return-table-body');

            if (!tableBody) {
                return;
            }

            Object.keys(json["Jan"]).sort(function (a, b) {
                return parseInt(b) - parseInt(a);
            }).forEach(function (key, index) {
                var row = document.createElement('tr');
                row.innerHTML = '<td>' + key + '<div class="indicator">' + key + '</div></td>';

                (index > 3) && row.classList.add('to-show');

                ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Year'].forEach(function (item) {
                    var value = json[item][key] ? (parseFloat(json[item][key]) * 100).toFixed(1) : '';

                    row.innerHTML += '<td>' + value + '</td>';
                });

                tableBody.appendChild(row);

                tableIndicators();
                tableExpand();
            });
        });
    });

    fetch('../assets/data/CRC3_perf.json').then(function (response) {
        response.json().then(function (json) {
            window.jsonData.performanceIndex = Object.entries(json).map(function (item) {
                return [parseFloat(item[0]), item[1]];
            }).sort(function (a, b) {
                return (a[0] || 0) - (b[0] || 0);
            });

            var crcIndexDate = window.jsonData.performanceIndex[window.jsonData.performanceIndex.length - 1][0];
            var crcIndexValue = window.jsonData.performanceIndex[window.jsonData.performanceIndex.length - 1][1];

            var crcIndexDateElement = document.getElementById('crc-index-date');
            var crcIndexValueElement = document.getElementById('crc-index-value');

            var date = new Date(crcIndexDate);
            crcIndexDateElement && (crcIndexDateElement.innerText = '12:00 PM, ' + date.toLocaleDateString('en-US', {
                month: 'short',
                year: 'numeric',
                day: 'numeric'
            }) + ' (GMT)');

            crcIndexValueElement && (crcIndexValueElement.innerText = parseFloat(crcIndexValue).toFixed(0));

            document.querySelectorAll('.crc-date').forEach(function (item) {
                item.innerHTML = new Date(crcIndexDate).toLocaleDateString('en-US', {
                    month: 'short',
                    year: 'numeric',
                    day: 'numeric'
                })});

            return fetch('../assets/data/Bitcoin_perf.json').then(function (response) {
                response.json().then(function (json) {
                    window.jsonData.performanceEwb = Object.entries(json).map(function (item) {
                        return [parseFloat(item[0]), item[1]];
                    }).sort(function (a, b) {
                        return (a[0] || 0) - (b[0] || 0);
                    });

                    if (!document.getElementById('performance-chart')) {
                        return;
                    }

                    new CRCPerformance('performance-chart', {
                        crc: window.jsonData.performanceIndex,
                        ewb: window.jsonData.performanceEwb
                    });
                });
            });
        });
    });

    fetch('../assets/data/folio_quick_stats.json').then(function (response) {
        response.json().then(function (json) {
            window.jsonData.performanceQuickStats = json;

            var qdnp0 = document.getElementById('perf-start-yearly');
            var qdnp3 = document.getElementById('quick-data-net-perf');
            var qdv0 = document.getElementById('quick-data-vol-0');
            var qdv3 = document.getElementById('quick-data-vol-3');
            var qdd0 = document.getElementById('quick-data-dd-0');
            var qdd3 = document.getElementById('quick-data-dd-3');
            var qds0 = document.getElementById('quick-data-sharpe-0');
            var qds3 = document.getElementById('quick-data-sharpe-3');

            var index = "CRC3"
            var benchmark = "Bitcoin"

            qdnp0 && (qdnp0.innerHTML = ((parseFloat(json["perf"][index]) || 0) * 100).toFixed(1) + '%');
            qdnp3 && (qdnp3.innerHTML = ((parseFloat(json["perf"][benchmark]) || 0) * 100).toFixed(1) + '%');
            qdv0 && (qdv0.innerHTML = ((parseFloat(json["vol"][index]) || 0) * 100).toFixed(1) + '%');
            qdv3 && (qdv3.innerHTML = ((parseFloat(json["vol"][benchmark]) || 0) * 100).toFixed(1) + '%');
            qdd0 && (qdd0.innerHTML = ((parseFloat(json["dd"][index]) || 0) * 100).toFixed(1) + '%');
            qdd3 && (qdd3.innerHTML = ((parseFloat(json["dd"][benchmark]) || 0) * 100).toFixed(1) + '%');
            qds0 && (qds0.innerHTML = ((parseFloat(json["Sharpe"][index]) || 0)).toFixed(2));
            qds3 && (qds3.innerHTML = ((parseFloat(json["Sharpe"][benchmark]) || 0)).toFixed(2));
        });
    });
} ());


window.onload = function() {
    var hamburger = document.getElementsByClassName('menu-button')[0];
    var menuLinks = document.getElementsByClassName('page-link');

    hamburger.addEventListener('click', toggleMenu);

    for (var i = 0; i < menuLinks.length; ++i) {
        var menuLink = menuLinks[i];
        menuLink.addEventListener('click', toggleMenu);
    }
};
