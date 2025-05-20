import { useEffect, useState, useRef } from 'react';
import ProductCard from '../../components/admin/product/ProductCard';
import AddProductModal from '../../components/admin/product/AddProductModal';
import CategoryManagerModal from '../../components/admin/category/CategoryManagerModal';
import OptionManagerModal from '../../components/admin/option/OptionManagerModal';
import { AdminProduct, fetchAdminProducts } from '../../services/admin/productService';
// import { mockProducts } from '../../mock/products';

const ProductListScreen = () => {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const containerRef = useRef<HTMLDivElement | null>(null);

   useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchAdminProducts();
      setProducts(data);
    };
    loadProducts();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const pageWidth = container.offsetWidth;
      const newPage = Math.round(container.scrollLeft / pageWidth);
      setCurrentPage(newPage);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
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

      {/* Horizontally scrollable paged product list */}
      <div
        // @ts-ignore
        ref={containerRef}
        className="overflow-x-auto snap-x snap-mandatory scrollbar-hide"
      >
        <div className="flex w-full">
          {Array.from({ length: Math.ceil(products.length / 6) }).map((_, pageIdx) => (
            <div
              key={pageIdx}
              className="grid grid-cols-2 sm:grid-cols-3 gap-6 snap-start shrink-0 w-full px-2"
              style={{ gridAutoRows: '1fr' }}
            >
              {products
                .slice(pageIdx * 6, pageIdx * 6 + 6)
                .map((product) => (
                  <ProductCard
                    key={product.id}
                    name={product.name}
                    price={product.price}
                    description={product.description}
                    image={product.picture ?? '/images/menus/default.png'}
                    state={product.state}
                  />
                ))}
            </div>
          ))}
        </div>
      </div>

      {/* 페이지 인디케이터 */}
      {products.length > itemsPerPage && (
        <div className="flex justify-center space-x-1 my-4">
          {Array.from({ length: totalPages }).map((_, index) => (
            <span
              key={index}
              className={`w-2 h-2 rounded-full ${index === currentPage ? 'bg-blue-600' : 'bg-gray-300'}`}
            />
          ))}
        </div>
      )}

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
