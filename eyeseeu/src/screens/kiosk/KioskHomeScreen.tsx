import { useCalibration } from '../../contexts/CalibrationContext';
import { useNavigate } from 'react-router-dom';
import MenuCategoryCard from '../../components/kiosk/MenuCategoryCard';
import BottomActionButtons from '../../components/kiosk/BottomActionButtons';
import FocusableGazeWrapper from '../../components/common/FocusableGazeWrapper';

const KioskHomeScreen = () => {
  const navigate = useNavigate();
  const { getAverages } = useCalibration();
  console.log(getAverages())
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
        <FocusableGazeWrapper onHold={() => navigate('/kiosk/menu/all')}>
          <MenuCategoryCard
            label="전체메뉴"
            icon="menu"
            active
            onClick={() => navigate('/kiosk/menu/all')}
          />
        </FocusableGazeWrapper>

        {/* <FocusableGazeWrapper onHold={() => navigate('/menu/popular')}> */}
          <MenuCategoryCard
            label="인기메뉴"
            icon="popular"
            onClick={() => navigate('/menu/popular')}
          />
        {/* </FocusableGazeWrapper> */}
      </div>

           {/* 하단 버튼 */}
           <div className="mt-auto mb-4">
        <BottomActionButtons />
      </div>
      

    </div>
    
  );
};

export default KioskHomeScreen;
