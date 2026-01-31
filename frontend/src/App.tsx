import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout.tsx';
import Home from './pages/Home.tsx';
import Promotions from './pages/Promotions.tsx';
import FindTires from './pages/FindTires.tsx';
import TireSeriesPage from './pages/TireSeries.tsx';
import TireKnowledge from './pages/TireKnowledge.tsx';
import RepairServices from './pages/RepairServices.tsx';
import OrderPage from './pages/Order.tsx';
import AdminLogin from './pages/AdminLogin.tsx';
import AdminOrders from './pages/AdminOrders.tsx';
import AdminTires from './pages/AdminTires.tsx';
import PagePlaceholder from './pages/PagePlaceholder.tsx';

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/promotions" element={<Promotions />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/find-tires" element={<FindTires />} />
          <Route path="/tire-series" element={<TireSeriesPage />} />
          <Route path="/tire-knowledge" element={<TireKnowledge />} />
          <Route path="/repair-services" element={<RepairServices />} />
          <Route path="/about" element={<PagePlaceholder title="關於我們" />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/tires" element={<AdminTires />} />
          <Route path="/admin/promotions" element={<PagePlaceholder title="促銷活動管理" />} />
          <Route path="/admin/analytics" element={<PagePlaceholder title="訪客統計" />} />
          <Route path="*" element={<PagePlaceholder title="頁面不存在" />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
