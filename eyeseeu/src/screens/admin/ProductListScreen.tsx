import { useEffect, useState } from 'react';
import ProductCard from '../../components/admin/product/ProductCard';
import { fetchAdminProducts, AdminProduct } from '../../services/admin/productService';
import AddProductModal from '../../components/admin/product/AddProductModal';

const ProductListScreen = () => {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">제품 목록</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-primary px-5 py-2 rounded-xl text-white text-sm font-semibold shadow hover:brightness-110 transition"
        >
          상품 추가하기
        </button>
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

      {isModalOpen && (
        <AddProductModal onClose={() => setIsModalOpen(false)} onCreated={handleAddProduct} />
      )}
    </div>
  );
};

export default ProductListScreen;
