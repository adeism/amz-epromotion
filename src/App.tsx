import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ImageSlideshow from './components/ImageSlideshow';
import AdminPanel from './components/AdminPanel';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ImageSlideshow />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;