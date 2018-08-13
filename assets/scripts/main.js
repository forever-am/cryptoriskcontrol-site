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
                min: .001,
                minPadding: .75,
                softMin: 300,
                type: 'logarithmic',
                minorTickInterval: .1,
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
    var hiddenRows = document.querySelectorAll('.mr-data .to-show');
    var switcher = false;

    if (trigger) {
        trigger.addEventListener('click', function () {
            switcher = !switcher;
            hiddenRows.forEach(function (item) {
                item.classList.toggle('to-show');
            });
            switcher ? trigger.innerHTML = 'Show Less' : trigger.innerHTML = 'Show More';
        });
    }
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

window.onload = function() {
    var hamburger = document.getElementsByClassName('menu-button')[0];
    var menuLinks = document.getElementsByClassName('page-link');

    hamburger.addEventListener('click', toggleMenu);

    for (var i = 0; i < menuLinks.length; ++i) {
        var menuLink = menuLinks[i];
        menuLink.addEventListener('click', toggleMenu);
    }

    tableIndicators();
    tableExpand();
};