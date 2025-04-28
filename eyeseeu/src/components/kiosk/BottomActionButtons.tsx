// components/kiosk/BottomActionButtons.tsx
import React from 'react';

const BottomActionButtons = () => {
  return (
    <div className="flex justify-between gap-4">
      <button className="flex-1 py-4 rounded-xl bg-white border border-gray-300 shadow-md text-black flex flex-col items-center">
        {/* <img src="/assets/icons/mic.svg" alt="음성" className="w-6 h-6 mb-1" /> */}
        <span>음성</span>
      </button>
      <button className="flex-1 py-4 rounded-xl bg-purple-200 text-black shadow-md">
        직원 호출
      </button>
    </div>
  );
};

export default BottomActionButtons;
