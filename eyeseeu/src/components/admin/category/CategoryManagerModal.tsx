import { useEffect, useState } from 'react';
import { createCategory, deleteCategory, fetchCategories,updateCategory  } from '../../../services/admin/categoryService';

interface Category {
  id: number;
  name: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
}

const CategoryManagerModal = ({ open, onClose }: Props) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newName, setNewName] = useState('');
  const [editId, setEditId] = useState<number | null>(null);
  const [editName, setEditName] = useState('');

  const loadCategories = async () => {
    const res = await fetchCategories();
    setCategories(res.data);
  };

  useEffect(() => {
    if (open) loadCategories();
  }, [open]);

  const handleAdd = async () => {
    if (!newName) return;
    await createCategory(newName);
    setNewName('');
    loadCategories();
  };

  const handleEdit = async (id: number) => {
    if (!editName) return;
    await updateCategory(id, editName);
    setEditId(null);
    setEditName('');
    loadCategories();
  };

  const handleDelete = async (id: number) => {
    await deleteCategory(id);
    loadCategories();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">카테고리 관리</h2>
          <button onClick={onClose} className="text-gray-500">✕</button>
        </div>

        <div className="space-y-2 max-h-[300px] overflow-y-auto">
          {categories.map((cat) => (
            <div key={cat.id} className="flex items-center gap-2">
              {editId === cat.id ? (
                <>
                  <input
                    className="border p-1 flex-1"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                  <button className="bg-blue-500 text-white px-2 py-1" onClick={() => handleEdit(cat.id)}>저장</button>
                  <button className="border px-2 py-1" onClick={() => setEditId(null)}>취소</button>
                </>
              ) : (
                <>
                  <span className="flex-1">{cat.name}</span>
                  <button className="text-blue-600" onClick={() => {
                    setEditId(cat.id);
                    setEditName(cat.name);
                  }}>편집</button>
                  <button className="text-red-600" onClick={() => handleDelete(cat.id)}>삭제</button>
                </>
              )}
            </div>
          ))}
        </div>

        <div className="mt-4 flex gap-2">
          <input
            placeholder="새 카테고리 이름"
            className="border px-2 py-1 flex-1"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <button className="bg-green-600 text-white px-4 py-1" onClick={handleAdd}>추가</button>
        </div>
      </div>
    </div>
  );
};

export default CategoryManagerModal;
