import ProductCard from '../../components/admin/product/ProductCard';
import AddProductButton from '../../components/admin/product/AddProductButton';

const dummyProducts = [
  { name: '더블 치즈 버거', price: 6000, description: '고소한 치즈 두 장과 육즙 가득한 패티', image: '/images/menus/burger1.png' },
  { name: '불고기 버거', price: 6000, description: '불고기 소스를 입힌 풍부한 맛', image: '/images/menus/burger2.png' },
  { name: '새우 버거', price: 6000, description: '아삭한 채소와 고소한 소스', image: '/images/menus/burger3.png' },
];

const ProductListScreen = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">제품 목록</h2>
        <AddProductButton />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {dummyProducts.map((product, i) => (
          <ProductCard key={i} {...product} />
        ))}
      </div>
    </div>
  );
};

export default ProductListScreen;
