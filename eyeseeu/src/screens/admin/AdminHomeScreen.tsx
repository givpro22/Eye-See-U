import { useState } from 'react';
import AdminSidebar from '../../components/admin/layout/AdminSidebar';
// import AdminTopbar from '../../components/admin/layout/AdminTopbar';
import ProductListScreen from './ProductListScreen';
import AdminTopbar from '../../components/admin/layout/AdminTopbar';
import DashboardScreen from './DashboardScreen'; // 필요 시 사용
// import OrderListScreen from './OrderListScreen'; // 필요 시 사용

const AdminHomeScreen = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'orders'>('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardScreen />;
      case 'products':
        return <ProductListScreen />;
      // case 'orders':
      //   return <OrderListScreen />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 flex flex-col">
        <AdminTopbar/>
        <div className="flex-1 overflow-y-auto p-6">{renderContent()}</div>
      </div>
    </div>
  );
};

export default AdminHomeScreen;
