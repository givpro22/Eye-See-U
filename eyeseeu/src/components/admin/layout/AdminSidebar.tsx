interface Props {
    activeTab: string;
    setActiveTab: (tab: 'dashboard' | 'products' | 'orders') => void;
  }
  
  const AdminSidebar: React.FC<Props> = ({ activeTab, setActiveTab }) => {
    const tabStyle = (tab: string) =>
      `block w-full text-left px-3 py-2 rounded-md font-medium ${
        activeTab === tab ? 'bg-primary text-white' : 'hover:bg-purple-100 text-gray-700'
      }`;
  
    return (
      <div className="w-64 bg-white shadow-lg p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold text-primary mb-8">👀 Eye See You</h1>
          <nav className="space-y-2">
            <button className={tabStyle('dashboard')} onClick={() => setActiveTab('dashboard')}>
              대시보드
            </button>
            <button className={tabStyle('products')} onClick={() => setActiveTab('products')}>
              제품 목록
            </button>
            <button className={tabStyle('orders')} onClick={() => setActiveTab('orders')}>
              주문 목록
            </button>
          </nav>
        </div>
        <div className="text-sm text-gray-500 space-y-2">
          <button className="hover:underline">환경설정</button>
          <button className="hover:underline">로그아웃</button>
        </div>
      </div>
    );
  };
  
  export default AdminSidebar;
  