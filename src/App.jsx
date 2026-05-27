import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Gallery from './pages/Gallery'
import Editor from './pages/Editor'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/gallery" replace />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/editor/:templateId" element={<Editor />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
