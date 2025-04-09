// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../hooks/useAuth';

// const AdminLoginScreen: React.FC = () => {
//   const navigate = useNavigate();
//   const { login } = useAuth();

//   const [email] = useState('EyeSeeYou@gmail.com');
//   const [password, setPassword] = useState('');
//   const [rememberMe, setRememberMe] = useState(true);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     navigate('/admin/home');

//     if (email && password) {
//       login();
//       navigate('/admin/home');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-primary px-4">
//       <div className="w-full max-w-md bg-white rounded-2xl shadow-lg px-8 py-10">
//         {/* 상단 제목 */}
//         <div className="text-center mb-8">
//           <div className="flex justify-center items-center gap-2 text-4xl font-bold text-black">
//             <span role="img" aria-label="eyes">👀</span>
//             <span>Eye See You</span>
//           </div>
//           <p className="text-text-secondary text-sm mt-2">여기는 키오스크 페이지 입니다</p>
//         </div>

//         {/* 키오스크 전환 버튼 */}
//         <div className="mb-6 text-center">
//           <button
//             onClick={() => navigate('/admin/login')}
//             className="text-sm text-primary font-semibold hover:underline"
//           >
//             키오스크로 전환
//           </button>
//         </div>

//         {/* 로그인 폼 */}
//         <form onSubmit={handleSubmit} className="space-y-5">
//           <div>
//             <label className="block mb-1 text-sm font-semibold text-text-primary">아이디:</label>
//             <input
//               type="email"
//               value={email}
//               disabled
//               className="w-full px-4 py-2 bg-muted text-text-secondary rounded-md border border-border"
//             />
//           </div>

//           <div>
//             <label className="flex justify-between items-center mb-1 text-sm font-semibold text-text-primary">
//               <span>비밀번호</span>
//               <a href="#" className="text-xs text-text-secondary hover:underline">
//                 아이디를 잊어버렸나요?
//               </a>
//             </label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="비밀번호 입력"
//               className="w-full px-4 py-2 bg-muted text-text-primary rounded-md border border-border"
//             />
//           </div>

//           <div className="flex items-center">
//             <input
//               id="rememberMe"
//               type="checkbox"
//               checked={rememberMe}
//               onChange={() => setRememberMe(!rememberMe)}
//               className="accent-primary mr-2"
//             />
//             <label htmlFor="rememberMe" className="text-sm text-text-primary">
//               비밀번호 기억하기
//             </label>
//           </div>

//           <button
//             type="submit"
//             className="w-full py-2 bg-primary hover:bg-purple-700 transition-colors text-white font-semibold rounded-md"
//           >
//             로그인
//           </button>
//         </form>

//         <div className="mt-6 text-center text-sm text-text-secondary">
//           계정이 없나요?{' '}
//           <a href="#" className="text-primary font-semibold hover:underline">
//             계정 만들기
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminLoginScreen;
