import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import StocksTable from './components/StocksTable';
import CompanyOverview from './components/CompanyOverview';
import Navbar from './components/Navbar';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gray-900 text-white">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<StocksTable />} />
              <Route path="/company/:ticker" element={<CompanyOverview />} />
            </Routes>
          </main>
        </div>
      </Router>
    </Provider>
  );
}

export default App;