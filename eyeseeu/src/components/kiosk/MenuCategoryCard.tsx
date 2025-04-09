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
      className={`w-72 h-40 rounded-2xl shadow-md flex flex-col justify-center items-center ${bgColor} transition-all duration-200`}
    >
      <img src={iconPath} alt={label} className="w-10 h-10 mb-2" />
      <span className="text-lg font-semibold">{label}</span>
    </button>
  );
};

export default MenuCategoryCard;
