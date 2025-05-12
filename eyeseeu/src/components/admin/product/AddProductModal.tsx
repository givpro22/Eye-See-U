import React, { useState, useEffect } from 'react';
import { fetchCategories } from '../../../services/admin/categoryService';
import { fetchOptionGroups, OptionGroupResponse } from '../../../services/admin/optionService';
import { AdminProduct, createProduct, NewProductPayload } from '../../../services/admin/productService';

interface AddProductModalProps {
  onClose: () => void;
  onCreated: (product: AdminProduct) => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({ onClose, onCreated }) => {
  const [categoryOptions, setCategoryOptions] = useState<{ id: number; name: string }[]>([]);
  const [optionGroups, setOptionGroups] = useState<OptionGroupResponse[]>([]);

  const [form, setForm] = useState<NewProductPayload>({
    categoryId: 1,
    name: '',
    description: '',
    price: 0,
    state: 'AVAILABLE',
    picture: '',
  });

  const [selectedOptionId, setSelectedOptionId] = useState<number>(optionGroups[0]?.id ?? 0);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const categories = await fetchCategories();
        setCategoryOptions(categories.data); // categories is axios response
        const options = await fetchOptionGroups();
        setOptionGroups(options);
      } catch (err) {
        console.error('초기 데이터 로딩 실패:', err);
      }
    };
    loadInitialData();
  }, []);

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
        delete payload.picture;
      }
      // You can modify payload to include selectedOptionIds if your API accepts it

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
        
        <div className="font-semibold text-sm text-gray-700 mb-1">카테고리 선택</div>
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

        <div className="font-semibold text-sm text-gray-700 mb-1">옵션 그룹 선택</div>
        <select
          value={selectedOptionId}
          onChange={(e) => setSelectedOptionId(Number(e.target.value))}
          className="border px-3 py-2 rounded mb-2 w-full"
        >
          {optionGroups.map((group) => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
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
