import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

/**
 * Navbar component for site navigation
 * Features responsive design with mobile menu
 */
const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  
  // Handle scroll events to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        <div className="navbar-logo">
          <Link to="/">
            {/* Added logo image next to text with corrected path */}
            <img src={`${process.env.PUBLIC_URL}/images/logo-a.png`} alt="PromptHub Logo" className="logo-img" />
            <span className="logo-text">PromptHub</span>
          </Link>
        </div>
        
        <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <ul className="navbar-links">
            <li><Link to="/marketplace" onClick={() => setIsMenuOpen(false)}>Marketplace</Link></li>
            <li><Link to="/sdk" onClick={() => setIsMenuOpen(false)}>SDK</Link></li>
            <li><Link to="/editor" onClick={() => setIsMenuOpen(false)}>Editor</Link></li>
            <li><Link to="/docs" onClick={() => setIsMenuOpen(false)}>Docs</Link></li>
            <li><Link to="/blog" onClick={() => setIsMenuOpen(false)}>Blog</Link></li>
          </ul>
          
          <button className="btn-connect">Connect Wallet</button>
        </div>
        
        <div 
          className="navbar-mobile-toggle" 
          onClick={toggleMenu}
        >
          <div className={`toggle-icon ${isMenuOpen ? 'active' : ''}`}></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 