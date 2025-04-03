import { Routes, Route, Navigate } from 'react-router-dom';

import AdminLoginScreen from '../screens/admin/AdminLoginScreen';
import AdminHomeScreen from '../screens/admin/AdminHomeScreen';
import { useAuth } from '../context/AuthContext';

const Router = () => {
  const { isLoggedIn } = useAuth();

  return (
    <Routes>
      {/* 관리자 로그인 */}
      <Route path="/admin/login" element={<AdminLoginScreen />} />

      {/* 관리자 홈 - 로그인 안 되어 있으면 로그인 페이지로 */}
      <Route
        path="/admin/home"
        element={isLoggedIn ? <AdminHomeScreen /> : <Navigate to="/admin/login" replace />}
      />

      {/* 기본 경로 리디렉션 */}
      <Route path="*" element={<Navigate to="/admin/login" replace />} />
    </Routes>
  );
};

export default Router;
