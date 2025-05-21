import { Outlet } from 'react-router-dom';
import WebcamManager from '../../webcam/WebcamManager';
import WebcamOverlay from '../../webcam/WebcamOverlay';

const KioskLayout = () => {

  return (
    <div className="relative w-full h-full">
      <Outlet />

      <WebcamOverlay/>
      <WebcamManager/>

 
    </div>
  );
};

export default KioskLayout;
