import { useEffect, useState } from 'react';
import { fetchAllMenus, ProductInfo } from '../../services/kiosk/menuService';

const MenuAllScreen = () => {
  const [menus, setMenus] = useState<ProductInfo[]>([]);

  useEffect(() => {
    const loadMenus = async () => {
      try {
        const data = await fetchAllMenus();
        const availableMenus = data.filter((item) => item.state === 'AVAILABLE');
        setMenus(availableMenus);
      } catch (error) {
        console.error('메뉴 불러오기 실패:', error);
      }
    };

    loadMenus();
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4 px-2">
      {menus.map((menu) => (
        <div key={menu.id} className="bg-white shadow rounded-xl p-2 text-center">
          <img
            src={menu.picture ?? '/assets/images/menus/default.png'}
            alt={menu.name}
            className="w-full h-24 object-contain mb-2"
          />
          <p className="text-sm font-medium">{menu.name}</p>
          <p className="text-[#3B00A4] font-semibold">{menu.price.toLocaleString()}원</p>
        </div>
      ))}
    </div>
  );
};

export default MenuAllScreen;
