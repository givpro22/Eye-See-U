import { createContext, useContext, useState, ReactNode } from 'react';

// 타입 정의
interface AuthContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const login = () => {
    setIsLoggedIn(true);
    // 필요한 경우 토큰 저장 등 처리
  };

  const logout = () => {
    setIsLoggedIn(false);
    // 토큰 제거 등 처리
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// useAuth 훅: Context 사용
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};



//사용예시
// import { useAuth } from '@/context/AuthContext';

// const AdminLoginScreen = () => {
//   const { login } = useAuth();

//   const handleLogin = () => {
//     // 로그인 성공 시
//     login();
//   };

//   return <button onClick={handleLogin}>로그인</button>;
// };
