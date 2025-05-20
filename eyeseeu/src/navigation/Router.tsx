import { Routes, Route, Navigate } from 'react-router-dom';

import AdminLoginScreen from '../screens/admin/AdminLoginScreen';
import AdminHomeScreen from '../screens/admin/AdminHomeScreen';

import KioskLoginScreen from '../screens/kiosk/KioskLoginScreen';
import KioskHomeScreen from '../screens/kiosk/KioskHomeScreen';
import AdminRegisterScreen from '../screens/admin/AdminRegisterScreen';
import PrivateRoute from './PrivateRoute';
import KioskLayout from '../screens/kiosk/KioskLayout';
import MenuAllScreen from '../screens/kiosk/MenuAllScreen';
import KioskPrivateRoute from './KioskPrivateRoute';
import CalibrationScreen from '../screens/kiosk/CalibrationScreen';

const Router = () => {

  return (
    <Routes>
      {/* 관리자 라우트 */}
      <Route path="/admin/register" element={<AdminRegisterScreen />} />
      <Route path="/admin/login" element={<AdminLoginScreen />} />
      <Route
        path="/admin/home"
        element={
        <PrivateRoute>
          <AdminHomeScreen />
        </PrivateRoute>}
      />






      {/* 키오스크 라우트 */}
      <Route path="/kiosk/login" element={<KioskLoginScreen />} />
      {/* 키오스크 내부 라우트: 공통 레이아웃 적용 */}
      <Route path="/kiosk" element={
        <KioskPrivateRoute>
          <KioskLayout />
        </KioskPrivateRoute>
      }>
        <Route path="calibration" element={<CalibrationScreen />} />
        <Route path="home" element={<KioskHomeScreen />} />
        {/* 추후 추가될: 주문, 장바구니 등도 여기에 */}
        <Route path="menu/all" element={<MenuAllScreen/>} />
        {/* <Route path="cart" element={<CartScreen />} /> */}
      </Route>

      {/* 기본 경로 리디렉션 */}
      <Route path="*" element={<Navigate to="/admin/login" replace />} />
    </Routes>
  );
};

export default Router;
