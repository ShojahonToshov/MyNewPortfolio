import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import EntryExperience from './components/EntryExperience';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EntryExperience><Home /></EntryExperience>} />
      </Routes>
    </Router>
  );
}
