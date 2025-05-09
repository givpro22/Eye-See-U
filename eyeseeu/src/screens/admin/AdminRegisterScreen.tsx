import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerAdmin } from '../../services/admin/authService';
import { handleApiError } from '../../utils/apiErrorHandler';

const AdminRegisterScreen: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('admin@email.com');
  const [password, setPassword] = useState('qlalfqjsgh1!');
  const [name, setName] = useState('');
  const [storeName, setStoreName] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // 기존 에러 초기화

    try {
      await registerAdmin({ email, password, storeName, name });
      alert('회원가입이 완료되었습니다!');
      navigate('/admin/login');
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg px-8 py-10">
        {/* 상단 제목 */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-2 text-4xl font-bold text-black">
            <span role="img" aria-label="eyes">👀</span>
            <span>Eye See You</span>
          </div>
          <p className="text-text-secondary text-sm mt-2">관리자 계정을 생성하세요</p>
        </div>

        {/* 로그인 화면으로 돌아가기 */}
        <div className="mb-6 text-center">
          <button
            onClick={() => navigate('/admin/login')}
            className="text-sm text-primary font-semibold hover:underline"
          >
            이미 계정이 있으신가요? 로그인
          </button>
        </div>

        {/* 에러 메시지 출력 */}
        {error && <div className="text-red-500 text-sm mb-4 text-center">{error}</div>}

        {/* 회원가입 폼 */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-semibold text-text-primary">이메일</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-muted text-text-secondary rounded-md border border-border"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-semibold text-text-primary">비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-muted text-text-primary rounded-md border border-border"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-semibold text-text-primary">이름</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="예: admin"
              className="w-full px-4 py-2 bg-muted text-text-primary rounded-md border border-border"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-semibold text-text-primary">가게 이름</label>
            <input
              type="text"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              placeholder="예: 햄버거가게"
              className="w-full px-4 py-2 bg-muted text-text-primary rounded-md border border-border"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-primary hover:bg-purple-700 transition-colors text-white font-semibold rounded-md"
          >
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminRegisterScreen;
