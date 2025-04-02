type MenuItem = {
  id: number
  name: string
  price: number
  image: string
}

export default function MenuCard({ item }: { item: MenuItem }) {
  return (
    <div
      style={{
        border: '1px solid #ddd',
        borderRadius: '12px',
        padding: '1rem',
        textAlign: 'center',
        boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
        backgroundColor: '#f9f9f9',
        cursor: 'pointer',
      }}
    >
      <img src={item.image} alt={item.name} style={{ width: '100%', height: 120, objectFit: 'contain' }} />
      <h3 style={{ marginTop: '0.5rem', fontSize: '1.2rem' }}>{item.name}</h3>
      <p style={{ color: '#666' }}>{item.price.toLocaleString()}원</p>
    </div>
  )
}
