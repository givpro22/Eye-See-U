import { useAuthContext } from "../contexts/AuthContext";

export const useAuth = () => {
  const { user, login, logout, loading } = useAuthContext();
  return { user, login, logout, loading };
};
