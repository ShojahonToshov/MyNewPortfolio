import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Variant1 from './pages/Variant1';
import Variant2 from './pages/Variant2';
import Variant3 from './pages/Variant3';
import VariantSwitcher from './components/VariantSwitcher';

export default function App() {
  return (
    <Router>
      <VariantSwitcher />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/1" element={<Variant1 />} />
        <Route path="/2" element={<Variant2 />} />
        <Route path="/3" element={<Variant3 />} />
      </Routes>
    </Router>
  );
}
