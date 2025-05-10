import { Outlet } from 'react-router-dom';
import WebcamManager from '../../webcam/WebcamManager';
import WebcamOverlay from '../../webcam/WebcamOverlay';
import BottomActionButtons from '../../components/kiosk/BottomActionButtons';

const KioskLayout = () => {

  return (
    <div className="relative w-full h-full">
      <Outlet />

      <WebcamManager/>
      <WebcamOverlay/>

      {/* 하단 버튼 */}
      <div className="mt-auto mb-4">
        <BottomActionButtons />
      </div>
    </div>
  );
};

export default KioskLayout;
