import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminLoginScreen: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email] = useState('EyeSeeYou@gmail.com'); // 고정된 관리자 이메일
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: 실제 로그인 API 연결
    if (email && password) {
      login();
      navigate('/admin/home');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#D6B3FF] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg px-8 py-10">
        {/* 상단 제목 */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-2 text-4xl font-bold">
            <span role="img" aria-label="eyes">👀</span>
            <span>Eye See You</span>
          </div>
          <p className="text-gray-500 text-sm mt-2">여기는 관리자 페이지 입니다</p>
        </div>

        {/* 로그인 폼 */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-700">아이디:</label>
            <input
              type="email"
              value={email}
              disabled
              className="w-full px-4 py-2 bg-gray-100 text-gray-500 rounded-md border border-gray-200"
            />
          </div>

          <div>
            <label className="flex justify-between items-center mb-1 text-sm font-semibold text-gray-700">
              <span>비밀번호</span>
              <a href="#" className="text-xs text-gray-500 hover:underline">
                아이디를 잊어버렸나요?
              </a>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호 입력"
              className="w-full px-4 py-2 bg-gray-100 rounded-md border border-gray-200"
            />
          </div>

          <div className="flex items-center">
            <input
              id="rememberMe"
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="accent-purple-500 mr-2"
            />
            <label htmlFor="rememberMe" className="text-sm text-gray-700">
              비밀번호 기억하기
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-purple-300 hover:bg-purple-400 transition-colors text-white font-semibold rounded-md"
          >
            로그인
          </button>
        </form>

        {/* 계정 만들기 */}
        <div className="mt-6 text-center text-sm text-gray-600">
          계정이 없나요?{' '}
          <a href="#" className="text-purple-600 font-semibold hover:underline">
            계정 만들기
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginScreen;
