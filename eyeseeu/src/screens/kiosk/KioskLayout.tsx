import { Outlet } from 'react-router-dom';
import WebcamManager from '../../webcam/WebcamManager';
import WebcamOverlay from '../../webcam/WebcamOverlay';

const KioskLayout = () => {
  return (
    <div className="relative w-full h-full">
      <WebcamManager />     {/* 실시간 시선 추적 처리 */}
      <WebcamOverlay />     {/* 오른쪽 상단 카메라 프리뷰 */}
      <Outlet />            {/* 이 아래에 각 키오스크 화면이 렌더링됨 */}
    </div>
  );
};

export default KioskLayout;
