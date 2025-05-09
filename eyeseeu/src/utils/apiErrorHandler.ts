export const handleApiError = (error: any): string => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }

  if (error.request) {
    return '서버에 연결할 수 없습니다. 네트워크 상태를 확인해주세요.';
  }

  return '알 수 없는 오류가 발생했습니다.';
};