import { BrowserRouter as Router } from 'react-router-dom'
import CameraFaceMesh from './components/CameraFaceMesh'
import AppRouter from './navigation/Router'

function App() {
  return (
    <Router>
      <div style={{ position: 'relative' }}>
        {/* 항상 떠있는 카메라 */}
        <CameraFaceMesh />

        {/* 화면 라우팅 */}
        <AppRouter />
      </div>
    </Router>
  )
}

export default App
