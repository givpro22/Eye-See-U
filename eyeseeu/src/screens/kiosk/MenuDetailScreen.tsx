import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchOptionGroups, OptionGroupResponse } from '../../services/admin/optionService';
import { fetchAdminProducts, NewProductPayload } from '../../services/admin/productService';

const MenuDetailScreen = () => {
  const { id } = useParams();
  const [menu, setMenu] = useState<NewProductPayload | null>(null);
  const [optionGroups, setOptionGroups] = useState<OptionGroupResponse[]>([]);

  useEffect(() => {
    const loadMenu = async () => {
      try {
        const data = await fetchAdminProducts();
        const found = data.find(item => item.id === Number(id));
        setMenu(found ?? null);
      } catch (error) {
        console.error('메뉴 불러오기 실패:', error);
      }
    };

    const loadOptions = async () => {
      try {
        const data = await fetchOptionGroups();
        setOptionGroups(data.filter(group => menu?.optionGroups.includes(group.id)));
      } catch (error) {
        console.error('옵션 불러오기 실패:', error);
      }
    };

    loadMenu();
    loadOptions();
  }, [id, menu?.optionGroups]);

  if (!menu) {
    return <div className="p-6 text-center text-gray-600">메뉴 정보를 불러오는 중...</div>;
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-white to-[#f7f7fc] px-6 py-4">
      {/* 상단 바 */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => window.history.back()} className="text-xl text-gray-600">&larr;</button>
        <h2 className="text-lg font-bold text-[#2D1C6B]">메뉴 상세</h2>
        <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-300" />
      </div>

      {/* 메뉴 정보 */}
      <div className="flex flex-col items-center mb-6">
        <img
          src={menu.picture ?? '/images/menus/default.png'}
          alt={menu.name}
          className="w-full h-52 object-contain rounded mb-3"
        />
        <h1 className="text-xl font-bold text-[#2D1C6B] mb-1">{menu.name}</h1>
        <p className="text-gray-600 text-sm mb-1">{menu.description}</p>
        <p className="text-[#6C4ED9] font-semibold text-lg mb-2">{menu.price.toLocaleString()}원</p>
      </div>

      {/* 옵션 선택 */}
      <div className="flex-1 overflow-y-auto mb-4">
        <h2 className="text-lg font-semibold text-[#2D1C6B] mb-3">옵션 선택</h2>
        {optionGroups.length === 0 ? (
          <div className="text-gray-500 text-sm">옵션 항목이 없습니다.</div>
        ) : (
          optionGroups.map(group => (
            <div key={group.id} className="mb-4">
              <p className="font-semibold text-gray-700 mb-1">{group.name}</p>
              <div className="space-y-2 pl-2">
                {group.options.map((option, idx) => (
                  <label key={idx} className="flex items-center space-x-2">
                    <input type="checkbox" className="form-checkbox text-purple-600" />
                    <span>{option.name} (+{option.price.toLocaleString()}원)</span>
                  </label>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* 장바구니 버튼 */}
      <button className="w-full bg-[#6C4ED9] text-white py-3 rounded-xl font-semibold text-center mt-auto">
        장바구니에 담기
      </button>
    </div>
  );
};

export default MenuDetailScreen;
