---
layout: page
title: Crypto Risk Control (BTC, ETH, XRP) - CRC3 Index
permalink: /
---
{{ page.date | date: '%B %d, %Y' }}

<h6 id="crypto_index_value"></h6>
<div id="crypto_index_perf"></div>
<div id="as_of_date"></div>

<h2 style="display: inline-block">Allocation</h2>
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


