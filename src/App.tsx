import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './styles/App.css';

// NotFound component for 404 errors
const NotFound: React.FC = () => (
  <div className="not-found" style={{ 
    padding: "100px 20px", 
    textAlign: "center", 
    minHeight: "60vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }}>
    <h1>404</h1>
    <h2>Page Not Found</h2>
    <p>Sorry, the page you are looking for does not exist.</p>
  </div>
);

/**
 * Main App component that sets up routing and global layout
 */
const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* Placeholder routes that will be implemented later */}
            <Route path="/marketplace" element={<NotFound />} />
            <Route path="/sdk" element={<NotFound />} />
            <Route path="/editor" element={<NotFound />} />
            <Route path="/docs" element={<NotFound />} />
            <Route path="/blog" element={<NotFound />} />
            <Route path="/pricing" element={<NotFound />} />
            <Route path="/tutorials" element={<NotFound />} />
            <Route path="/about" element={<NotFound />} />
            <Route path="/team" element={<NotFound />} />
            <Route path="/careers" element={<NotFound />} />
            <Route path="/contact" element={<NotFound />} />
            <Route path="/privacy" element={<NotFound />} />
            <Route path="/terms" element={<NotFound />} />
            {/* Default 404 route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App; 