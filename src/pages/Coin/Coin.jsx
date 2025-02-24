import React, { useEffect, useState, useContext } from 'react';
import './Coin.css';
import { useParams } from 'react-router-dom';  // To get the coinId from the URL
import { Line } from 'react-chartjs-2'; // For the graph

// Import Chart.js components and necessary charts
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Import the CoinContext
import { CoinContext } from '../../context/CoinContext';

const Coin = () => {
  const { coinId } = useParams();  // Get the coinId from the URL
  const [coinData, setCoinData] = useState(null);
  const [chartData, setChartData] = useState(null);
  
  // Get currency symbol from the context
  const { currency } = useContext(CoinContext);
  const currencySymbol = currency.symbol; // Dynamically pull currency symbol from context

  useEffect(() => {
    const fetchCoinDetails = async () => {
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`);
      const data = await response.json();
      setCoinData(data);

      // Get historical data for the graph (e.g., price for the last 7 days)
      const priceResponse = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=7`);
      const priceData = await priceResponse.json();

      const chartPrices = priceData.prices.map(item => item[1]);
      const chartLabels = priceData.prices.map(item => new Date(item[0]).toLocaleDateString());

      setChartData({
        labels: chartLabels,
        datasets: [{
          label: `${coinId} Price (Last 7 days)`,
          data: chartPrices,
          borderColor: 'rgba(75,192,192,1)',
          fill: false,
        }],
      });
    };

    fetchCoinDetails();
  }, [coinId]);

  // If data is still loading, show a loading message
  if (!coinData || !chartData) {
    return <div>Loading...</div>;
  }

  // Modify chart options to show currency symbol in tooltips
  const chartOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          // Show the currency symbol in the tooltip
          label: function(tooltipItem) {
            return `${currencySymbol}${tooltipItem.raw.toFixed(2)}`; // Adding the currency symbol to the tooltip label
          },
        },
      },
    },
    elements: {
      line: {
        tension: 0.4,
      },
    },
  };

  return (
    <div className="coin">
      <h2>{coinData.name} ({coinData.symbol.toUpperCase()})</h2>
      <div className="coin-details">
        <img src={coinData.image.large} alt={coinData.name} />
        <p>{coinData.description.en.split('.')[0]}</p>
        <div className="market-data">
          <h3>Market Data</h3>
          <p>Current Price: {currencySymbol}{coinData.market_data.current_price.usd}</p>
          <p>Market Cap: {currencySymbol}{coinData.market_data.market_cap.usd.toLocaleString()}</p>
          <p>24h Change: {coinData.market_data.price_change_percentage_24h.toFixed(2)}%</p>
        </div>
        <div className="coin-graph">
          <h3>{coinData.name} Price (Last 7 Days)</h3>
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default Coin;
