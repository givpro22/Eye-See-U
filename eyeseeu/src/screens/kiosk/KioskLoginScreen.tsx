import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { loginAdmin } from '../../services/admin/authService';

const AdminLoginScreen: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('EyeSeeYou@gmail.com');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await loginAdmin(email, password);
      login(response.data); // 로그인 성공 시 Context에 저장
      navigate('/kiosk/home'); // 홈으로 이동
    } catch (err) {
      console.error(err);
      setError('로그인에 실패했습니다. 이메일 또는 비밀번호를 확인해주세요.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg px-8 py-10">
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-2 text-4xl font-bold text-black">
            <span role="img" aria-label="eyes">👀</span>
            <span>Eye See You</span>
          </div>
          <p className="text-text-secondary text-sm mt-2">여기는 키오스크 페이지 입니다</p>
        </div>

        <div className="mb-6 text-center">
          <button
            onClick={() => navigate('/admin/login')}
            className="text-sm text-primary font-semibold hover:underline"
          >
            관리자로 전환
          </button>
        </div>

        {error && (
          <div className="mb-4 text-sm text-red-500 text-center">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-semibold text-text-primary">이메일:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-muted text-text-secondary rounded-md border border-border"
              required
            />
          </div>

          <div>
            <label className="flex justify-between items-center mb-1 text-sm font-semibold text-text-primary">
              <span>비밀번호</span>
              <a href="#" className="text-xs text-text-secondary hover:underline">
                아이디를 잊어버렸나요?
              </a>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호 입력"
              className="w-full px-4 py-2 bg-muted text-text-primary rounded-md border border-border"
              required
            />
          </div>

          <div className="flex items-center">
            <input
              id="rememberMe"
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="accent-primary mr-2"
            />
            <label htmlFor="rememberMe" className="text-sm text-text-primary">
              비밀번호 기억하기
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-primary hover:bg-purple-700 transition-colors text-white font-semibold rounded-md"
          >
            로그인
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-text-secondary">
          계정이 없나요?{' '}
          <a
            onClick={() => navigate('/admin/register')}
            className="text-primary font-semibold hover:underline cursor-pointer"
          >
            계정 만들기
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginScreen;
