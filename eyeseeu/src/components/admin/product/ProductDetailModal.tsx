import React, { useEffect, useState } from 'react';
import { NewProductPayload } from '../../../services/admin/productService';
import { fetchCategories } from '../../../services/admin/categoryService';
import { fetchOptionGroups } from '../../../services/admin/optionService';
import { updateProduct, deleteProduct } from '../../../services/admin/productService';

interface ProductDetailModalProps {
  product: NewProductPayload & { id: number };
  onClose: () => void;
  onDelete: (id: number) => void;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose, onDelete }) => {
  if (!product) return null;

  const [categoryName, setCategoryName] = useState<string>('로딩 중...');
  const [optionGroupNames, setOptionGroupNames] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<Omit<NewProductPayload, 'picture'>>({ ...product });

  useEffect(() => {
    const loadCategoryName = async () => {
      try {
        const { data } = await fetchCategories();
        const matched = data.find((cat: { id: number; name: string }) => cat.id === product.categoryId);
        setCategoryName(matched ? matched.name : '알 수 없음');
      } catch {
        setCategoryName('오류');
      }
    };
    loadCategoryName();
  }, [product.categoryId]);

  useEffect(() => {
    const loadOptionGroupNames = async () => {
      try {
        const data = await fetchOptionGroups();
        const matched = data.filter((group: { id: number; name: string }) => product.optionGroups.includes(group.id));
        setOptionGroupNames(matched.map((group: { name: string }) => group.name));
      } catch {
        setOptionGroupNames(['옵션 불러오기 오류']);
      }
    };
    loadOptionGroupNames();
  }, [product.optionGroups]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl"
        >
          &times;
        </button>
        <img
          src={product.picture ?? '/images/menus/default.png'}
          alt={product.name}
          className="w-full h-48 object-contain mb-4 rounded"
        />
        {isEditing ? (
          <input
            className="border p-2 w-full mb-2"
            value={editData.name}
            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
          />
        ) : (
          <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
        )}
        {isEditing ? (
          <input
            className="border p-2 w-full mb-2"
            value={editData.price}
            type="number"
            onChange={(e) => setEditData({ ...editData, price: Number(e.target.value) })}
          />
        ) : (
          <p className="text-purple-600 font-bold text-lg mb-1">
            {Number(product.price).toLocaleString()}원
          </p>
        )}
        {isEditing ? (
          <textarea
            className="border p-2 w-full mb-2"
            value={editData.description}
            onChange={(e) => setEditData({ ...editData, description: e.target.value })}
          />
        ) : (
          <p className="text-gray-600 mb-4">{product.description}</p>
        )}
        <p className="text-sm text-gray-700 mb-1">
          <strong>카테고리:</strong> {categoryName}
        </p>
        <p className="text-sm text-gray-700 mb-4">
          <strong>옵션 그룹:</strong> {optionGroupNames.length > 0 ? optionGroupNames.join(', ') : '없음'}
        </p>
        <div className="flex justify-end space-x-2">
          {isEditing ? (
            <>
              <button
                onClick={async () => {
                  console.log(editData)
                  await updateProduct(product.id, {
                    categoryId: editData.categoryId,
                    optionGroups: editData.optionGroups,
                    name: editData.name,
                    description: editData.description,
                    price: editData.price,
                    state: editData.state,
                  });
                  setIsEditing(false);
                  onClose();
                }}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              >
                저장
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
              >
                취소
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded"
              >
                수정
              </button>
              <button
                onClick={async () => {
                  if (window.confirm('정말 삭제하시겠습니까?')) {
                    await deleteProduct(product.id);
                    onDelete(product.id);
                  }
                }}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                삭제
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;