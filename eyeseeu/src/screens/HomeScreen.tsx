import { useNavigate } from 'react-router-dom'

export default function HomeScreen() {
  const navigate = useNavigate()

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: '#f5f5f5',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'sans-serif',
        position: 'relative',
      }}
    >
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: 'black' }}>어서오세요!</h1>
      <p style={{ fontSize: '1.5rem', marginBottom: '2rem', color: 'black' }}>
        화면을 보고 시선으로 버튼을 선택해 주세요
      </p>
      <button
        onClick={() => navigate('/menu')} // 👈 메뉴 화면으로 이동
        style={{
          fontSize: '2rem',
          padding: '1rem 3rem',
          backgroundColor: '#007BFF',
          color: 'white',
          border: 'none',
          borderRadius: '1rem',
          cursor: 'pointer',
        }}
      >
        주문 시작
      </button>

    </div>
  )
}
