import { useGaze } from '../../contexts/GazeContext';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuCategoryCard from '../../components/kiosk/MenuCategoryCard';
import BottomActionButtons from '../../components/kiosk/BottomActionButtons';

const KioskHomeScreen = () => {
  const navigate = useNavigate();

  const { gazeResult } = useGaze();
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (!gazeResult || gazeResult.length !== 2) return;

    const [gx, gy] = gazeResult;

    const screenW = window.innerWidth;
    const screenH = window.innerHeight;

    // 정규화 및 보정
    const normalizedX = Math.max(0, Math.min(1, gx)); // 이미 0~1 범위라 가정
    const normalizedY = Math.max(0, Math.min(1, (gy + 8) / 8)); // -8 ~ 0 → 0 ~ 1

    const x = normalizedX * screenW;
    const y = normalizedY * screenH;

    setCursorPos({ x, y });
  }, [gazeResult]);

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-white to-[#f7f7fc] px-6 py-4">
      {/* 상단: 로고/문구 + 유저 이미지 */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-xl font-extrabold text-[#2D1C6B]">Eye See You</h1>
          <p className="text-sm text-gray-500">시선으로 주문해보세요</p>
        </div>
        <img
          src="/assets/images/user.png"
          alt="User"
          className="w-14 h-14 rounded-full object-cover border"
        />
      </div>

      {/* 중간: 메뉴 선택 카드 */}
      <div className="flex flex-col items-center gap-6 mt-10 w-full">
        <MenuCategoryCard
          label="전체메뉴"
          icon="menu"
          active
          onClick={() => navigate('/kiosk/menu/all')}
        />
        <MenuCategoryCard
          label="인기메뉴"
          icon="popular"
          onClick={() => navigate('/menu/popular')}
        />
      </div>


      {cursorPos && (
        <div
          className="absolute z-50 w-6 h-6 bg-red-500 rounded-full opacity-70 pointer-events-none"
          style={{
            left: `${cursorPos.x}px`,
            top: `${cursorPos.y}px`,
            transform: 'translate(-50%, -50%)',
            position: 'fixed',
          }}
        />
      )}
      {gazeResult && (
        <div className="fixed bottom-4 left-4 bg-black text-white text-sm px-4 py-2 rounded z-50">
          보정된 시선: X {(Math.max(0, Math.min(1, gazeResult[0]))).toFixed(3)}, 
          Y {(Math.max(0, Math.min(1, (gazeResult[1] + 8) / 8))).toFixed(3)}
        </div>
      )}
           {/* 하단 버튼 */}
           <div className="mt-auto mb-4">
        <BottomActionButtons />
      </div>
    </div>
    
  );
};

export default KioskHomeScreen;
