import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout.tsx';
import Home from './pages/Home';
import OrderPage from './pages/Order';
import AdminLogin from './pages/AdminLogin';
import AdminOrders from './pages/AdminOrders';
import AdminTires from './pages/AdminTires';
import PagePlaceholder from './pages/PagePlaceholder';

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/promotions" element={<PagePlaceholder title="最新輪胎促銷" />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/find-tires" element={<PagePlaceholder title="尋找輪胎" />} />
          <Route path="/tire-series" element={<PagePlaceholder title="輪胎系列" />} />
          <Route path="/tire-knowledge" element={<PagePlaceholder title="輪胎知識" />} />
          <Route path="/repair-services" element={<PagePlaceholder title="維修價目表" />} />
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
