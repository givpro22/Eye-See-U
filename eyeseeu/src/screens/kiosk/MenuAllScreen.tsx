import { useEffect, useState, useRef } from 'react';
import { fetchAllMenus, ProductInfo } from '../../services/kiosk/menuService';

const MenuAllScreen = () => {
  const [menus, setMenus] = useState<ProductInfo[]>([]);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(menus.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const loadMenus = async () => {
      try {
        const data = await fetchAllMenus();
        const visibleMenus = data.filter(
          (item) => item.state === 'AVAILABLE' || item.state === 'OUT_OF_STOCK'
        );
        setMenus(visibleMenus);
      } catch (error) {
        console.error('메뉴 불러오기 실패:', error);
      }
    };

    loadMenus();
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

  return (
    <div className="relative w-full h-full px-4 py-2 bg-white">
      {/* 상단 바 */}
      <div className="flex items-center justify-between mb-4">
        <button className="text-sm">&larr;</button>
        <h2 className="text-lg font-semibold">전체메뉴</h2>
        <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-300">
        </div>
      </div>

      {/* 카테고리 탭 */}
      <div className="flex justify-around mb-4">
        <button className="px-4 py-2 rounded-full bg-[#EDEAFF] text-[#6C4ED9] font-semibold">All</button>
        <button className="px-4 py-2 rounded-full bg-[#F2F2F2] text-gray-700">세트메뉴</button>
        <button className="px-4 py-2 rounded-full bg-[#F2F2F2] text-gray-700">사이드메뉴</button>
      </div>

      {/* 메뉴 목록 */}
      <div
        ref={containerRef}
        className="overflow-x-auto snap-x snap-mandatory mb-4 scrollbar-hide"
      >
        <div className="flex w-max space-x-4">
          {Array.from({ length: totalPages }).map((_, pageIndex) => (
            <div key={pageIndex} className="grid grid-cols-2 gap-4 snap-start shrink-0 w-[calc(100vw-2rem)] px-2">
              {menus
                .slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage)
                .map((menu) => (
                  <div key={menu.id} className="bg-white shadow rounded-xl p-2 text-center">
                    <img
                      src={menu.picture ?? '/images/menus/default.png'}
                      alt={menu.name}
                      className="w-full h-36 object-contain mb-2"
                    />
                    <p className="text-sm font-medium">{menu.name}</p>
                    <p className="text-xs text-gray-500 mb-1">{menu.description}</p>
                    <p className={`font-semibold ${menu.state !== 'AVAILABLE' ? 'text-gray-400 line-through' : 'text-[#3B00A4]'}`}>
                      {menu.price.toLocaleString()}원
                    </p>
                    {menu.state !== 'AVAILABLE' && (
                      <p className="text-xs text-red-500 mt-1">
                        {menu.state === 'OUT_OF_STOCK' ? '품절' : '숨김'}
                      </p>
                    )}
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>

      {/* 하단 영역 */}
      <div className="fixed bottom-0 left-0 w-full px-4 pb-4 bg-white">
        <div className="flex justify-center space-x-1 mb-3">
          {Array.from({ length: totalPages }).map((_, index) => (
            <span
              key={index}
              className={`w-2 h-2 rounded-full ${index === currentPage ? 'bg-[#6C4ED9]' : 'bg-gray-300'}`}
            />
          ))}
        </div>
        <div className="flex justify-between space-x-2">
          <button className="flex-1 bg-[#EDEAFF] py-3 rounded-xl text-sm font-semibold">🎤 직원 호출</button>
          <button className="flex-1 bg-[#EDEAFF] py-3 rounded-xl text-sm font-semibold">장바구니 이동하기</button>
        </div>
      </div>

      {/* 좌우 페이지 이동 버튼 */}
      {menus.length > itemsPerPage && (
        <button
          onClick={() => {
            if (containerRef.current) {
              const width = containerRef.current.offsetWidth;
              containerRef.current.scrollTo({
                left: containerRef.current.scrollLeft - width,
                behavior: 'smooth',
              });
            }
          }}
          className="absolute top-1/2 -translate-y-1/2 left-0 h-60 w-10 bg-black bg-opacity-20 flex items-center justify-center z-20 rounded-r-xl"
        >
          <span className="text-white text-xl">&larr;</span>
        </button>
      )}

      {menus.length > itemsPerPage && (
        <button
          onClick={() => {
            if (containerRef.current) {
              const width = containerRef.current.offsetWidth;
              containerRef.current.scrollTo({
                left: containerRef.current.scrollLeft + width,
                behavior: 'smooth',
              }); 
            }
          }}
          className="absolute top-1/2 -translate-y-1/2 right-0 h-60 w-10 bg-black bg-opacity-20 flex items-center justify-center z-20 rounded-l-xl"
        >
          <span className="text-white text-xl">&rarr;</span>
        </button>
      )}
    </div>
  );
};

export default MenuAllScreen;
