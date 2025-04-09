import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

import AdminLoginScreen from '../screens/admin/AdminLoginScreen';
import AdminHomeScreen from '../screens/admin/AdminHomeScreen';

import KioskLoginScreen from '../screens/kiosk/KioskLoginScreen';
import KioskHomeScreen from '../screens/kiosk/KioskHomeScreen';
import AdminRegisterScreen from '../screens/admin/AdminRegisterScreen';

const Router = () => {
  const { isLoggedIn } = useAuth();

  return (
    <Routes>
      {/* 관리자 라우트 */}
      <Route path="/admin/login" element={<AdminLoginScreen />} />
      <Route
        path="/admin/home"
        element={<AdminHomeScreen />}
      />
      <Route path="/admin/register" element={<AdminRegisterScreen />} />

      {/* 키오스크 라우트 */}
      <Route path="/kiosk/login" element={<KioskLoginScreen />} />
      <Route
        path="/kiosk/home"
        element={isLoggedIn ? <KioskHomeScreen /> : <Navigate to="/kiosk/login" replace />}
      />

      {/* 기본 경로 리디렉션 */}
      <Route path="*" element={<Navigate to="/admin/login" replace />} />
    </Routes>
  );
};

export default Router;
