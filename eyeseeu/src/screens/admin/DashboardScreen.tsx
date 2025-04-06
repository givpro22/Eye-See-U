import RevenueChart from '../../components/admin/dashboard/RevenueChart';
import StatCard from '../../components/admin/dashboard/StatCard';
import BestProductCard from '../../components/admin/dashboard/BestProductCard';
import SalesTrendChart from '../../components/admin/dashboard/SalesTrendChart'; // (추가한 경우)

const DashboardScreen = () => {
  return (
    <div className="space-y-8">
      {/* 수익 차트 */}
      <section>
        <h2 className="text-2xl font-bold mb-4">수익</h2>
        <RevenueChart />
      </section>

      {/* 하단 카드들 */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="고객수"
          data={{
            total: 34249,
            revisit: 1420,
          }}
        />
        <BestProductCard
          name="페퍼로니 피자"
          price={6000}
          image="/images/menus/pizza.png"
        />
        <SalesTrendChart />
      </section>
    </div>
  );
};

export default DashboardScreen;
