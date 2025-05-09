import { useEffect, useState } from 'react';
import ProductCard from '../../components/admin/product/ProductCard';
import AddProductModal from '../../components/admin/product/AddProductModal';
import CategoryManagerModal from '../../components/admin/category/CategoryManagerModal';
import OptionManagerModal from '../../components/admin/option/OptionManagerModal';
import { fetchAdminProducts, AdminProduct } from '../../services/admin/productService';

const ProductListScreen = () => {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchAdminProducts();
      setProducts(data);
    };
    loadProducts();
  }, []);

  const handleAddProduct = (product: AdminProduct) => {
    setProducts((prev) => [...prev, product]);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">제품 목록</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setIsCategoryModalOpen(true)}
            className="border border-gray-400 px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-100"
          >
            카테고리 관리
          </button>
          <button
            onClick={() => setIsOptionModalOpen(true)}
            className="border border-gray-400 px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-100"
          >
            옵션 관리
          </button>
          <button
            onClick={() => setIsProductModalOpen(true)}
            className="bg-primary px-5 py-2 rounded-xl text-white text-sm font-semibold shadow hover:brightness-110 transition"
          >
            상품 추가하기
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            price={product.price}
            description={product.description}
            image={product.picture ?? '/assets/images/menus/default.png'}
          />
        ))}
      </div>

      {/* 상품 추가 모달 */}
      {isProductModalOpen && (
        <AddProductModal
          onClose={() => setIsProductModalOpen(false)}
          onCreated={handleAddProduct}
        />
      )}

      {/* 카테고리 관리 모달 */}
      {isCategoryModalOpen && (
        <CategoryManagerModal
          open={isCategoryModalOpen}
          onClose={() => setIsCategoryModalOpen(false)}
        />
      )}
      {/* 옵션 관리 모달 */}
      {isOptionModalOpen && (
        <OptionManagerModal
          open={isOptionModalOpen}
          onClose={() => setIsOptionModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ProductListScreen;
