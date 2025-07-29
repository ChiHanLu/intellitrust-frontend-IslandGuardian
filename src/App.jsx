import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Map from './pages/Map';
import Report from './pages/Report';
import Dashboard from './pages/Dashboard';
import Public from './pages/Public';
import Shelters from './pages/Shelters';
import Resources from './pages/Resources';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<Map />} />
          <Route path="/report" element={<Report />} />
          <Route path="/shelters" element={<Shelters />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/public" element={<Public />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

