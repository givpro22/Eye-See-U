import React from 'react';

interface Props {
  label: string;
  icon: 'menu' | 'popular';
  active?: boolean;
  onClick: () => void;
}

const MenuCategoryCard: React.FC<Props> = ({ label, icon, active = false, onClick }) => {
  const bgColor = active ? 'bg-purple-400 text-white' : 'bg-white text-purple-900';
  const iconPath = icon === 'menu' ? '/assets/icons/menu.svg' : '/assets/icons/popular.svg';

  return (
    <button
      onClick={onClick}
      className={`w-full max-w-screen-md h-72 rounded-3xl shadow-xl flex flex-col justify-center items-center ${bgColor} transition-all duration-200`}
    >
      {/* <img src={iconPath} alt={label} className="w-14 h-14 mb-4" /> */}
      <span className="text-2xl font-bold">{label}</span>
    </button>
  );
};

export default MenuCategoryCard;
