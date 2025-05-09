import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ReactNode } from 'react';

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div>로딩 중...</div>; // 향후 로딩 스피너 컴포넌트로 교체 가능

  // 로그인하지 않은 경우 로그인 페이지로 리다이렉트
  if (!user) {
    alert('로그인 세션이 만료되었습니다. 다시 로그인해주세요.');
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
