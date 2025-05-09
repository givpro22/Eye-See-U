import api from '../api';

export interface Option {
  name: string;
  price: number;
  picture?: string;
}

export interface OptionGroupRequest {
  name: string;
  minCount: number;
  maxCount: number;
  options: Option[];
}

export interface OptionGroupResponse {
  id: number;
  name: string;
  minCount: number;
  maxCount: number;
  options: Option[];
}

export const createOptionGroup = async (data: OptionGroupRequest) => {
  const response = await api.post<OptionGroupResponse>('/option-groups', data);
  return response.data;
};

export const fetchOptionGroups = async () => {
  const response = await api.get<OptionGroupResponse[]>('/option-groups');
  return response.data;
};

export const updateOptionGroup = async (optionGroupId: number, data: OptionGroupRequest) => {
  const response = await api.put<OptionGroupResponse>(`/option-groups/${optionGroupId}`, data);
  return response.data;
};

export const deleteOptionGroup = async (optionGroupId: number) => {
  const response = await api.delete(`/option-groups/${optionGroupId}`);
  return response.data;
};