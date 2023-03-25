document.addEventListener("DOMContentLoaded", function () {
  document.querySelector("#beta-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const stockPrices = event.target.elements.stockPrices.value.split(" ").map(Number);
    const sp500Prices = event.target.elements.sp500Prices.value.split(" ").map(Number);
    const beta = calculateBeta(stockPrices, sp500Prices);
    document.querySelector("#result").textContent = "季度贝塔系数：" + beta.toFixed(2);
  });
});

function calculateBeta(stockPrices, sp500Prices) {
  const stockReturns = calculateReturns(stockPrices);
  const sp500Returns = calculateReturns(sp500Prices);
  const covariance = calculateCovariance(stockReturns, sp500Returns);
  const sp500Variance = calculateVariance(sp500Returns);
  return covariance / sp500Variance;
}

function calculateReturns(prices) {
  const returns = [];
  for (let i = 1; i < prices.length; i++) {
    returns.push((prices[i] - prices[i - 1]) / prices[i - 1]);
  }
  return returns;
}

function calculateCovariance(stockReturns, sp500Returns) {
  const n = stockReturns.length;
  const stockMean = stockReturns.reduce((a, b) => a + b) / n;
  const sp500Mean = sp500Returns.reduce((a, b) => a + b) / n;
  let covariance = 0;

  for (let i = 0; i < n; i++) {
    covariance += (stockReturns[i] - stockMean) * (sp500Returns[i] - sp500Mean);
  }

  return covariance / (n - 1);
}

function calculateVariance(returns) {
  const n = returns.length;
  const mean = returns.reduce((a, b) => a + b) / n;
  let variance = 0;

  for (let i = 0; i < n; i++) {
    variance += Math.pow(returns[i] - mean, 2);
  }

  return variance / (n - 1);
}
