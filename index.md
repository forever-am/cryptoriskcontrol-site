---
layout: page
title: Crypto Risk Control (BTC, ETH, XRP) - CRC3 Index
permalink: /
---
{{ page.date | date: '%B %d, %Y' }}

<h6 id="crypto_index_value"></h6>
<div id="crypto_index_perf"></div>
<div id="as_of_date"></div>

CRC3 is a crypto-currency portfolio index. Its allocation weights are 
updated using [Minmax Drawdown Control](/methodology) in order to achieve 
upside exposure to the top three crypto-currencies by market-cap (currently 
BTC, ETH and XRP) while robustly limiting downside risk. 

## Allocation
<div id="as_of_date_alloc"></div>

<div class="alloc-container">
    <div class="alloc-table">
    <table>
    <thead>
    <tr>
      <th style="text-align: left"></th>
      <th style="text-align: left">Target allocation</th>
      <th style="text-align: left">Previous allocation</th>
      <th style="text-align: left">Allocation change</th>
    </tr>
    </thead>
    <tbody id="allocation-table">
    </tbody>
    </table>
    </div>
    <div id="alloc_folio_multi" class="alloc-pie graph"></div>
</div>

## Performance

<div id="crypto_fund_plot" class="graph"></div>

<table>
<thead>
<tr>
    <th style="text-align: left"></th>
    <th style="text-align: left">Crypto Risk Control Index</th>
    <th style="text-align: left">Equal Weights Benchmark</th>
</tr>
</thead>
<tbody id="metrics-table">
</tbody>
</table>


## Monthly return

<table id="monthly-ret-table">
<thead></thead>
<tbody></tbody>
</table>

<script>
    
main();

</script>


