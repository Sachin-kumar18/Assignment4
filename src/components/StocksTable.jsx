import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStocks } from '../store/stocksSlice';
import { Link } from 'react-router-dom';

const StockRow = ({ stock }) => {
  const isNegative = stock.change_percentage.includes('-');
  return (
    <tr className="border-b border-gray-700 hover:bg-gray-800">
      <td className="p-3">
        <Link 
          to={`/company/${stock.ticker}`} 
          className="text-blue-400 hover:text-blue-300 font-medium"
        >
          {stock.ticker}
        </Link>
      </td>
      <td className="p-3 text-right">{stock.price}</td>
      <td className="p-3 text-right">{stock.change_amount}</td>
      <td 
        className={`p-3 text-right ${isNegative ? 'text-red-500' : 'text-green-500'}`}
      >
        {stock.change_percentage}
      </td>
    </tr>
  );
};

const StockTable = ({ title, stocks, colorClass }) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-4 mb-8">
      <h2 className={`text-lg font-bold mb-4 ${colorClass}`}>{title}</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="p-3 text-left">Ticker</th>
              <th className="p-3 text-right">Price</th>
              <th className="p-3 text-right">Change Amount</th>
              <th className="p-3 text-right">Change %</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock) => (
              <StockRow key={stock.ticker} stock={stock} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const StocksTable = () => {
  const dispatch = useDispatch();
  const { topGainers, topLosers, loading, error } = useSelector((state) => state.stocks);
  
  useEffect(() => {
    dispatch(fetchStocks());
  }, [dispatch]);
  
  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }
  
  if (error) {
    return <div className="text-center py-10 text-red-500">Error: {error}</div>;
  }
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-center">Stocks Table Page</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StockTable 
          title="Top Gainers" 
          stocks={topGainers} 
          colorClass="text-green-500" 
        />
        <StockTable 
          title="Top Losers" 
          stocks={topLosers} 
          colorClass="text-red-500" 
        />
      </div>
      <div className="mt-8 text-center text-gray-400 text-sm">
        <p>Data refreshed every 15 minutes</p>
        <p className="mt-2">
          <a 
            href="https://www.alphavantage.co/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="underline hover:text-blue-400"
          >
            Powered by Alpha Vantage
          </a>
        </p>
      </div>
    </div>
  );
};

export default StocksTable;