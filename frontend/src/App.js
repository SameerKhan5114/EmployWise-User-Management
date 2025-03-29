import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/Navbar.js';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

const App = () => (
  <Router>
    <NavigationBar />
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  </Router>
);

export default App;