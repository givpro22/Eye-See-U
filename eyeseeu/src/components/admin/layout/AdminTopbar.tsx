import { FaBell } from "react-icons/fa";
import { useAuth } from "../../../hooks/useAuth";

const AdminTopbar = () => {

  const { user, logout } = useAuth();

  return (
    <div className="h-16 px-6 bg-white border-b border-gray-200 flex items-center justify-between">
      {/* 검색창 */}
      <div className="flex-1 max-w-md mx-auto">
        <input
          type="text"
          placeholder="Search"
          className="w-full px-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-300"
        />
      </div>

      {/* 우측: 알림 + 사용자 */}
      <div className="flex items-center gap-6">
        {/* 알림 아이콘 + 배지 */}
        <div className="relative cursor-pointer">
          <FaBell className="w-6 h-6 text-gray-700" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            2
          </span>
        </div>

        {/* 사용자 정보 */}
        <div className="flex items-center gap-2">
          <img
            src="/images/profile/admin-profile.png"
            alt="프로필"
            className="w-9 h-9 rounded-full object-cover"
          />
          <div className="text-right text-sm leading-tight">
            <p className="font-semibold text-text-primary">{user?.email}</p>
            <p className="text-text-secondary text-xs">{user?.storeName}</p>
            <button
              onClick={logout}
              className="ml-2 px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
            >
              로그아웃
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminTopbar;
