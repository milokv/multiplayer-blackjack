import { useEffect } from 'react';
import type { JSX } from 'react';
import './style/App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/home';
import Game from './pages/game';
import Stats from './pages/stats';
import Navbar from './components/navbar';

function App() {

  // ✅ WebSocket connection setup
  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3001');

    socket.onopen = () => {
      console.log('✅ WebSocket connected');
    };

    socket.onmessage = (msg: MessageEvent) => {
      console.log('📨 From server:', msg.data);
    };

    socket.onerror = (err) => {
      console.error('❌ WebSocket error:', err);
    };

    socket.onclose = () => {
      console.log('🔌 WebSocket disconnected');
    };

    // Cleanup on unmount
    return () => {
      socket.close();
    };
  }, []);

  const LayoutWrapper = (): JSX.Element => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <>
      {/* Navbar on top if not home */}
      {!isHome && <Navbar fixed={true} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="/stats" element={<Stats />} />
      </Routes>
      {/* Navbar on bottom if home */}
      {isHome && <Navbar fixed={false} />}
    </>
  );
};


    return (
    <Router>
      <LayoutWrapper />
    </Router>
  );
}

export default App;