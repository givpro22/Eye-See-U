import { useNavigate } from 'react-router-dom';

const AddProductButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/admin/add-product')}
      className="bg-primary px-5 py-2 rounded-xl text-white text-sm font-semibold shadow hover:brightness-110 transition"
    >
      상품 추가하기
    </button>
  );
};

export default AddProductButton;
