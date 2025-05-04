import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <img src={`${process.env.PUBLIC_URL}/images/logo-a.png`} alt="PromptHub Logo" className="logo-img" />
              <span className="logo-text">PromptHub</span>
            </div>
            <p className="footer-tagline">
              Transform prompts into programmable, composable, and monetizable assets
            </p>
            <div className="footer-social">
              <a href="https://github.com/prompthub" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <i className="fab fa-github"></i>
              </a>
              <a href="https://twitter.com/prompthub" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://discord.gg/prompthub" target="_blank" rel="noopener noreferrer" aria-label="Discord">
                <i className="fab fa-discord"></i>
              </a>
            </div>
          </div>

          <div className="footer-links">
            <h3>Products</h3>
            <ul>
              <li><Link to="/marketplace">Marketplace</Link></li>
              <li><Link to="/sdk">SDK</Link></li>
              <li><Link to="/editor">Editor</Link></li>
              <li><Link to="/pricing">Pricing</Link></li>
            </ul>
          </div>

          <div className="footer-links">
            <h3>Resources</h3>
            <ul>
              <li><Link to="/docs">Documentation</Link></li>
              <li><Link to="/tutorials">Tutorials</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><a href="https://github.com/prompthub" target="_blank" rel="noopener noreferrer">GitHub</a></li>
            </ul>
          </div>

          <div className="footer-links">
            <h3>About</h3>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/team">Team</Link></li>
              <li><Link to="/careers">Careers</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          <div className="footer-newsletter">
            <h3>Subscribe to Our Newsletter</h3>
            <p>Get the latest PromptHub news and updates</p>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Your email" required />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copyright">
            &copy; {currentYear} PromptHub. All rights reserved.
          </div>
          <div className="footer-legal">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 