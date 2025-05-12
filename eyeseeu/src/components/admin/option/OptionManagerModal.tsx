import { useEffect, useState } from 'react';
import {
  createOptionGroup,
  deleteOptionGroup,
  fetchOptionGroups,
  updateOptionGroup,
  OptionGroupRequest,
  OptionGroupResponse,
} from '../../../services/admin/optionService';

interface Props {
  open: boolean;
  onClose: () => void;
}

const OptionManagerModal = ({ open, onClose }: Props) => {
  const [optionGroups, setOptionGroups] = useState<OptionGroupResponse[]>([]);
  const [newGroup, setNewGroup] = useState<OptionGroupRequest>({
    name: '',
    minCount: 1,
    maxCount: 1,
    options: [],
  });

  const [editGroupId, setEditGroupId] = useState<number | null>(null);
  const [editGroup, setEditGroup] = useState<OptionGroupRequest | null>(null);

  const loadOptionGroups = async () => {
    const data = await fetchOptionGroups();
    setOptionGroups(data);
  };

  useEffect(() => {
    if (open) loadOptionGroups();
  }, [open]);

  const handleCreate = async () => {
    if (!newGroup.name || newGroup.options.length === 0) return;
    await createOptionGroup(newGroup);
    setNewGroup({ name: '', minCount: 1, maxCount: 1, options: [] });
    loadOptionGroups();
  };

  const handleUpdate = async (id: number) => {
    if (!editGroup) return;
    await updateOptionGroup(id, editGroup);
    setEditGroupId(null);
    setEditGroup(null);
    loadOptionGroups();
  };

  const handleDelete = async (id: number) => {
    await deleteOptionGroup(id);
    loadOptionGroups();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">옵션 그룹 관리</h2>
          <button onClick={onClose} className="text-gray-500">✕</button>
        </div>

        <h3 className="text-md font-semibold mb-2 mt-4">기존 옵션 그룹 목록</h3>
        <div className="space-y-2">
          {optionGroups.map(group => (
            <div key={group.id} className="bg-gray-50 border p-3 rounded">
              {editGroupId === group.id ? (
                <>
                  <label className="text-sm font-medium">옵션 그룹 이름</label>
                  <input
                    className="border p-1 w-full mb-1"
                    value={editGroup?.name || ''}
                    onChange={e =>
                      setEditGroup(prev => prev ? { ...prev, name: e.target.value } : null)
                    }
                  />

                  <div className="flex gap-2 mb-2">
                    <div className="w-1/2">
                      <label className="text-sm font-medium">최소 선택 수</label>
                      <input
                        type="number"
                        className="border p-1 w-full"
                        placeholder="최소 선택 수"
                        value={editGroup?.minCount || 0}
                        onChange={e =>
                          setEditGroup(prev => prev ? { ...prev, minCount: Number(e.target.value) } : null)
                        }
                      />
                    </div>
                    <div className="w-1/2">
                      <label className="text-sm font-medium">최대 선택 수</label>
                      <input
                        type="number"
                        className="border p-1 w-full"
                        placeholder="최대 선택 수"
                        value={editGroup?.maxCount || 0}
                        onChange={e =>
                          setEditGroup(prev => prev ? { ...prev, maxCount: Number(e.target.value) } : null)
                        }
                      />
                    </div>
                  </div>
                  {editGroup?.options.map((opt, index) => (
                    <div key={index} className="flex gap-2 mb-1 items-center">
                      <div className="w-1/3">
                        <label className="text-sm font-medium">옵션 이름</label>
                        <input
                          className="border px-2 py-1 w-full"
                          placeholder="이름"
                          value={opt.name}
                          onChange={e =>
                            setEditGroup(prev => {
                              if (!prev) return null;
                              const options = [...prev.options];
                              options[index].name = e.target.value;
                              return { ...prev, options };
                            })
                          }
                        />
                      </div>
                      <div className="w-1/3">
                        <label className="text-sm font-medium">가격</label>
                        <input
                          type="number"
                          className="border px-2 py-1 w-full"
                          placeholder="가격"
                          value={opt.price}
                          onChange={e =>
                            setEditGroup(prev => {
                              if (!prev) return null;
                              const options = [...prev.options];
                              options[index].price = Number(e.target.value);
                              return { ...prev, options };
                            })
                          }
                        />
                      </div>
                      <div className="w-1/3">
                        <label className="text-sm font-medium">사진 URL (선택)</label>
                        <input
                          className="border px-2 py-1 w-full"
                          placeholder="사진 URL"
                          value={opt.picture || ''}
                          onChange={e =>
                            setEditGroup(prev => {
                              if (!prev) return null;
                              const options = [...prev.options];
                              options[index].picture = e.target.value;
                              return { ...prev, options };
                            })
                          }
                        />
                      </div>
                    </div>
                  ))}
                  <div className="flex gap-2 mt-2">
                    <button className="bg-blue-500 text-white px-2 py-1" onClick={() => handleUpdate(group.id)}>저장</button>
                    <button className="border px-2 py-1" onClick={() => setEditGroupId(null)}>취소</button>
                  </div>
                </>
              ) : (
                <>
                  <div className="font-semibold">{group.name}</div>
                  <div className="text-sm text-gray-500">옵션 수: {group.options.length}</div>
                  <div className="flex gap-2 mt-2">
                    <button className="text-blue-600" onClick={() => {
                      setEditGroupId(group.id);
                      setEditGroup({
                        name: group.name,
                        minCount: group.minCount,
                        maxCount: group.maxCount,
                        options: group.options,
                      });
                    }}>편집</button>
                    <button className="text-red-600" onClick={() => handleDelete(group.id)}>삭제</button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        <hr className="my-4" />
        <h3 className="text-md font-semibold mb-2">새 옵션 그룹 추가</h3>
        <div className="mt-4">
          <label className="text-sm font-medium">옵션 그룹 이름</label>
          <input
            className="border px-2 py-1 w-full mb-2"
            placeholder="옵션 그룹 이름"
            value={newGroup.name}
            onChange={(e) => setNewGroup(prev => ({ ...prev, name: e.target.value }))}
          />
          <div className="flex gap-2 mb-2">
            <div className="w-full">
              <label className="text-sm font-medium">최소 선택 수</label>
              <input
                type="number"
                className="border px-2 py-1 w-full"
                placeholder="최소 선택 수"
                value={newGroup.minCount}
                onChange={(e) => setNewGroup(prev => ({ ...prev, minCount: Number(e.target.value) }))}
              />
            </div>
            <div className="w-full">
              <label className="text-sm font-medium">최대 선택 수</label>
              <input
                type="number"
                className="border px-2 py-1 w-full"
                placeholder="최대 선택 수"
                value={newGroup.maxCount}
                onChange={(e) => setNewGroup(prev => ({ ...prev, maxCount: Number(e.target.value) }))}
              />
            </div>
          </div>
          {newGroup.options.map((opt, index) => (
            <div key={index} className="flex gap-2 mb-1 items-center">
              <div className="w-1/3">
                <label className="text-sm font-medium">옵션 이름</label>
                <input
                  className="border px-2 py-1 w-full"
                  placeholder="이름"
                  value={opt.name}
                  onChange={e =>
                    setNewGroup(prev => {
                      const options = [...prev.options];
                      options[index].name = e.target.value;
                      return { ...prev, options };
                    })
                  }
                />
              </div>
              <div className="w-1/3">
                <label className="text-sm font-medium">가격</label>
                <input
                  type="number"
                  className="border px-2 py-1 w-full"
                  placeholder="가격"
                  value={opt.price}
                  onChange={e =>
                    setNewGroup(prev => {
                      const options = [...prev.options];
                      options[index].price = Number(e.target.value);
                      return { ...prev, options };
                    })
                  }
                />
              </div>
              <div className="w-1/3">
                <label className="text-sm font-medium">사진 URL (선택)</label>
                <input
                  className="border px-2 py-1 w-full"
                  placeholder="사진 URL (선택)"
                  value={opt.picture || ''}
                  onChange={e =>
                    setNewGroup(prev => {
                      const options = [...prev.options];
                      options[index].picture = e.target.value;
                      return { ...prev, options };
                    })
                  }
                />
              </div>
              <button
                className="text-red-600 text-sm"
                onClick={() =>
                  setNewGroup(prev => ({
                    ...prev,
                    options: prev.options.filter((_, i) => i !== index),
                  }))
                }
              >
                삭제
              </button>
            </div>
          ))}

          <button
            className="border px-2 py-1 text-sm mb-2"
            onClick={() =>
              setNewGroup(prev => ({
                ...prev,
                options: [...prev.options, { name: '', price: 0 }],
              }))
            }
          >
            옵션 추가
          </button>
          {/* 옵션 추가는 간단화를 위해 생략. 필요시 별도 컴포넌트로 분리 가능 */}
          <button className="bg-green-600 text-white px-4 py-2 w-full" onClick={handleCreate}>추가</button>
        </div>
      </div>
    </div>
  );
};

export default OptionManagerModal;