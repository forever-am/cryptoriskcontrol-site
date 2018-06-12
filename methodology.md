---
layout: page
title: Methodology
permalink: /methodology/
---
CRC Portfolio Indices are reference portfolios that crypto-investors 
can use to gain upside exposure to crypto-currencies, while maintaining robust downside
protection. The core methodology, [Minmax Drawdown Control](https://ssrn.com/abstract=3179215) provides a robust adaptive 
solution to the classical [Markowitz (1952)](https://doi.org/10.1111/j
.1540-6261.1952.tb01525.x) portfolio-allocation problem when underlying 
assets have very little history, or when market dynamics 
change, so that the past no longer predicts the future. For reference, see
{: style="width:95%;text-align:justify"}


- [Mostly Prior-Free Asset Allocation](https://www.risk.net/journal-of-risk/5416616/mostly-prior-free-asset-allocation), S. Chassang, 
  *Journal of Risk*, 2018,
- [Managing a Crypto-Currency Portfolio via Minmax Drawdown Control](https://ssrn.com/abstract=3179215), S. Chassang and A. Wang, 2018.
{: style="width:95%;text-align:justify"}


### Drawdowns
 
Drawdowns are an important performance metric for asset allocation strategies, along 
with Sharpe ratios and volatility. The drawdown of a portfolio <i>relative to a 
reference asset</i> is the underperformance of the portfolio against 
the reference asset, over the worst possible window of time. 
{: style="width:95%;text-align:justify"}

  
Figure 1 plots the drawdown of a portfolio invested 100% in bitcoin against cash 
between January 2017 and June 2018. The worst time window for the bitcoin portfolio is December 18th 2017 to April 5th 2018. 
Over that time period, bitcoin lost 65% of its value against cash: this is 
the drawdown of bitcoin against cash.
{: style="width:95%;text-align:justify"}

{% include image.html url="images/dd_btc_vs_cash.png" caption="Figure 1: drawdown of 
a bicoin only portfolio against cash." align="center" %}
<br/>

Inversely, Figure 2 represents drawdowns of a portfolio fully invested in cash against bitcoin. The worst time 
window for the cash portfolio goes from January 11th 2017 to December 18th 2017. Over that time period, cash loses 96% of 
its value against bitcoin.
{: style="width:95%;text-align:justify"}

{% include image.html url="images/dd_cash_vs_btc.png" caption="Figure 2: drawdown of a cash-only portfolio
against bitcoin." align="center" %}
<br/>

### Minmax Drawdown Control

[Chassang (2018)](https://www.risk.net/journal-of-risk/5416616/mostly-prior-free-asset-allocation) 
and [Chassang and Wang (2018)](https://ssrn.com/abstract=3179215) establish that:
 1. If an investor correctly understands 
 the risks of underlying assets their optimally chosen portfolio will 
 experience low drawdowns with large probability.
 1. It is possible to construct portfolio allocation strategies that guarantee low drawdowns 
 for most market configurations. Among these, Minmax Drawdown Control strategies provide the 
 best robust compromise between drawdowns against the safe asset and drawdowns against
  risky assets. They do so by dynamically adjusting the portfolio's allocation 
  weights between reference assets (here cash and bitcoin).   
{: style="width:95%;text-align:justify"}

In other terms, an investor whose portfolio experiences large drawdowns is being mistakenly stubborn
and making avoidable investment mistakes. 
{: style="width:95%;text-align:justify"}


Figure 3 illustrates the behavior of a drawdown controlled portfolio
investing in bitcoin and cash. It achieves a drawdown of 38% against bitcoin, 
and a drawdown of 41% against cash. It turns out that controlling drawdowns 
improves the portfolio's Sharpe ratio: the minmax drawdown portfolio 
exhibits a Sharpe ratio of 6.97, versus a Sharpe ratio of 4.82 for bitcoin.
{: style="width:95%;text-align:justify"}

{% include image.html url="images/mm_dd.png" caption="Figure 3: drawdowns of a 
minmax drawdown portfolio against bitcoin and cash." align="center" %}
<br/>

Crypto Risk Control Indices apply the Minmax Drawdown Control framework to 
different subsets of volatility-adjusted crypto-currencies. So far our 
flagship index, CRC3 invests in the three highest market cap crypto-currencies.
We will introduce other indices in the coming months.