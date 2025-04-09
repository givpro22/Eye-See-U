export const handleApiError = (error: any): string => {
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.message;
  
      if (status === 400) {
        if (message === '이미 가입된 이메일입니다.') return '이미 가입된 이메일입니다.';
        if (message === '입력값이 유효하지 않습니다.') return '입력값을 다시 확인해주세요.';
        return message || '요청이 잘못되었습니다.';
      }
  
      if (status === 500) return '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
    }
  
    if (error.request) return '서버에 연결할 수 없습니다. 네트워크 상태를 확인해주세요.';
  
    return '알 수 없는 오류가 발생했습니다.';
  };
  