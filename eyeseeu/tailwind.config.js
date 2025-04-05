// tailwind.config.js
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#8C52FF',         // 강조 버튼, 포인트
        secondary: '#AC96FF',       // 페이지 배경
        accent: '#FFEB3B',          // 눈에 띄는 강조
        'text-primary': '#333333',  // 주 텍스트
        'text-muted': '#777777',    // 보조 텍스트
        border: '#E5E7EB',          // 테두리
        danger: '#FF4C4C',          // 오류/경고
        success: '#4CAF50',         // 성공 메시지
      },
    },
  },
  plugins: [],
};
