import { Routes, Route } from 'react-router-dom'
import HomeScreen from '../screens/HomeScreen'
import MenuScreen from '../screens/MenuScreen'

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/menu" element={<MenuScreen />} />
    </Routes>
  )
}
