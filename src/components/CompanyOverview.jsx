import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCompanyDetails } from '../store/companySlice';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CompanyOverview = () => {
  const { ticker } = useParams();
  const dispatch = useDispatch();
  const { companyOverview, incomeStatement, loading, error } = useSelector((state) => state.company);
  
  useEffect(() => {
    if (ticker) {
      dispatch(fetchCompanyDetails(ticker));
    }
  }, [dispatch, ticker]);
  
  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }
  
  if (error) {
    return <div className="text-center py-10 text-red-500">Error: {error}</div>;
  }
  
  if (!companyOverview) {
    return <div className="text-center py-10">No company data available</div>;
  }

  // Format revenue data for the chart
  const chartData = incomeStatement?.annualReports?.map(report => ({
    year: report.fiscalDateEnding.substring(0, 4),
    revenue: parseInt(report.totalRevenue) / 1000000000, // Convert to billions
  })) || [];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">{companyOverview.Name} ({companyOverview.Symbol})</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Company Details</h2>
          <div className="space-y-3">
            <p><span className="font-medium text-gray-400">Exchange:</span> {companyOverview.Exchange}</p>
            <p><span className="font-medium text-gray-400">Country:</span> {companyOverview.Country}</p>
            <p><span className="font-medium text-gray-400">Industry:</span> {companyOverview.Industry}</p>
            <p className="mt-4"><span className="font-medium text-gray-400">Description:</span></p>
            <p className="text-gray-300 text-sm leading-relaxed">{companyOverview.Description}</p>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Financial Highlights</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-400 text-sm">Market Cap</p>
              <p className="font-medium">${(parseInt(companyOverview.MarketCapitalization) / 1000000000).toFixed(2)}B</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">P/E Ratio</p>
              <p className="font-medium">{companyOverview.PERatio}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Dividend Yield</p>
              <p className="font-medium">{parseFloat(companyOverview.DividendYield) * 100}%</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">52-Week Range</p>
              <p className="font-medium">${companyOverview['52WeekLow']} - ${companyOverview['52WeekHigh']}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">EPS</p>
              <p className="font-medium">${companyOverview.EPS}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Profit Margin</p>
              <p className="font-medium">{(parseFloat(companyOverview.ProfitMargin) * 100).toFixed(2)}%</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-6">Income Statement</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="year" stroke="#ccc" />
              <YAxis stroke="#ccc" tickFormatter={(value) => `$${value}B`} />
              <Tooltip
                formatter={(value) => [`$${value.toFixed(2)}B`, 'Revenue']}
                labelFormatter={(label) => `Year: ${label}`}
                contentStyle={{ backgroundColor: '#374151', borderColor: '#4B5563' }}
              />
              <Bar dataKey="revenue" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="text-center text-gray-400 mt-4">Annual Revenue (in Billions USD)</p>
      </div>
    </div>
  );
};

export default CompanyOverview;