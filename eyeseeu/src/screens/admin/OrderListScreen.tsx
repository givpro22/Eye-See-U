import { useState } from 'react';

interface Order {
  id: string;
  product: string;
  date: string;
  category: string;
  status: 'Completed' | 'Processing' | 'Rejected' | 'On Hold';
}

const statusColor: Record<Order['status'], string> = {
  Completed: 'bg-green-100 text-green-600',
  Processing: 'bg-purple-100 text-purple-600',
  Rejected: 'bg-red-100 text-red-500',
  'On Hold': 'bg-yellow-100 text-yellow-600',
};

const mockOrders: Order[] = [
  {
    id: '00001',
    product: '더블 치즈 버거',
    date: '2025-04-01 20:20:20',
    category: '햄버거',
    status: 'Completed',
  },
  {
    id: '00002',
    product: '페퍼로니 피자',
    date: '2025-04-01 20:22:23',
    category: '피자',
    status: 'Processing',
  },
  {
    id: '00003',
    product: '더블 치즈 버거',
    date: '2025-04-01 21:13:20',
    category: '햄버거',
    status: 'Rejected',
  },
  {
    id: '00008',
    product: '페퍼로니 피자',
    date: '2025-04-02 01:02:06',
    category: '피자',
    status: 'On Hold',
  },
];

const OrderListScreen = () => {
  const [orders] = useState<Order[]>(mockOrders);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">주문 목록</h2>

      {/* 필터 영역 */}
      <div className="flex items-center gap-4">
        <button className="px-3 py-2 bg-gray-100 rounded-md text-sm">📂 필터 설정</button>
        <select className="px-3 py-2 bg-gray-100 rounded-md text-sm">
          <option>날짜</option>
        </select>
        <select className="px-3 py-2 bg-gray-100 rounded-md text-sm">
          <option>카테고리</option>
        </select>
        <select className="px-3 py-2 bg-gray-100 rounded-md text-sm">
          <option>주문 상태</option>
        </select>
        <button className="ml-auto px-4 py-2 bg-red-100 text-red-500 rounded-md text-sm">🔁 필터 초기화</button>
      </div>

      {/* 테이블 */}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full bg-white text-sm text-left">
          <thead className="bg-gray-100 text-gray-600 font-medium">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">제품</th>
              <th className="px-4 py-3">주문 시간</th>
              <th className="px-4 py-3">카테고리</th>
              <th className="px-4 py-3">주문 상태</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t">
                <td className="px-4 py-3">{order.id}</td>
                <td className="px-4 py-3">{order.product}</td>
                <td className="px-4 py-3">{order.date}</td>
                <td className="px-4 py-3">{order.category}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColor[order.status]}`}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 페이지 하단 */}
      <div className="text-sm text-gray-500">Showing 1-09 of {orders.length}</div>
    </div>
  );
};

export default OrderListScreen;
