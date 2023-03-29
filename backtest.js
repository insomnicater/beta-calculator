document.getElementById('backtest-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const prices = document.getElementById('prices').value.trim().split(/\s+/).map(Number);
    const initialInvestment = 10000;
    const stockWeight = 0.6;
    const cashWeight = 0.4;
    
    let portfolioValue = initialInvestment;
    const portfolioValues = [portfolioValue];
    
    for (let i = 1; i < prices.length; i++) {
        const stockReturn = (prices[i] - prices[i - 1]) / prices[i - 1];
        portfolioValue = portfolioValue * (1 + stockReturn * stockWeight);
        portfolioValues.push(portfolioValue);
    }
    
    drawChart(portfolioValues);
});

function drawChart(portfolioValues) {
    const trace = {
        x: Array.from({length: portfolioValues.length}, (_, i) => i),
        y: portfolioValues,
        mode: 'lines',
        name: '净值曲线'
    };
    
    const data = [trace];
    const layout = {
        title: '回测60/40投资模型净值曲线',
        xaxis: {title: '季度'},
        yaxis: {title: '投资组合净值'}
    };
    
    Plotly.newPlot('chart', data, layout);
}
