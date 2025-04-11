import React, { useState } from 'react';
import { AdminProduct, createProduct, NewProductPayload } from '../../../services/admin/productService';

interface AddProductModalProps {
  onClose: () => void;
  onCreated: (product: AdminProduct) => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({ onClose, onCreated }) => {
  // ✅ 카테고리 하드코딩
  const categoryOptions = [
    { id: 1, name: '버거' },
    { id: 2, name: '사이드메뉴' },
    { id: 3, name: '음료' },
  ];

  const [form, setForm] = useState<NewProductPayload>({
    categoryId: 1,
    name: '',
    description: '',
    price: 0,
    state: 'AVAILABLE',
    picture: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'price' || name === 'categoryId' ? Number(value) : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const payload = { ...form };
      if (!payload.picture?.trim()) {
        delete payload.picture; // 빈 문자열일 경우 필드 제거
      }

      const created = await createProduct(payload);
      onCreated(created);
      onClose();
    } catch (err) {
      alert('상품 등록 실패');
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
        <h3 className="text-xl font-bold mb-4">상품 추가</h3>

        <input
          name="name"
          placeholder="상품명"
          onChange={handleChange}
          className="border px-3 py-2 rounded mb-2 w-full"
        />
        <input
          name="description"
          placeholder="설명"
          onChange={handleChange}
          className="border px-3 py-2 rounded mb-2 w-full"
        />

        <select
          name="categoryId"
          value={form.categoryId}
          onChange={handleChange}
          className="border px-3 py-2 rounded mb-2 w-full"
        >
          {categoryOptions.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <input
          name="price"
          type="number"
          placeholder="가격"
          onChange={handleChange}
          className="border px-3 py-2 rounded mb-2 w-full"
        />
        <input
          name="picture"
          placeholder="이미지 URL (선택)"
          onChange={handleChange}
          className="border px-3 py-2 rounded mb-2 w-full"
        />

        <select
          name="state"
          value={form.state}
          onChange={handleChange}
          className="border px-3 py-2 rounded mb-4 w-full"
        >
          <option value="AVAILABLE">판매중</option>
          <option value="OUT_OF_STOCK">품절</option>
          <option value="HIDDEN">숨김</option>
        </select>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-md">
            취소
          </button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-primary text-white rounded-md">
            등록
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;
