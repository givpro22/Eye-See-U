export default function MenuScreen() {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'sans-serif',
      }}
    >
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>메뉴를 선택해 주세요</h1>
      {/* 여기에 메뉴 카드 컴포넌트들 추가 예정 */}
      <p style={{ fontSize: '1.2rem', color: '#666' }}>🍔 (예: 버거, 감자튀김 등 메뉴 카드 나열 예정)</p>
    </div>
  )
}
