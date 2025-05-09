import { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface AuthUser {
  email: string;
  storeName: string;
}

interface AuthContextProps {
  user: AuthUser | null;
  login: (user: AuthUser) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = sessionStorage.getItem("authUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (userInfo: AuthUser) => {
    setUser(userInfo);
    sessionStorage.setItem("authUser", JSON.stringify(userInfo));
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("authUser");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuthContext must be used within AuthProvider');
  return context;
};
