import React, { useEffect } from 'react';
import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import HowItWorksSection from './HowItWorksSection';
import PartnersSection from './PartnersSection';
import TestimonialsSection from './TestimonialsSection';
import './HomePage.css';

/**
 * HomePage Component - Displays the main landing page
 * Includes hero section, features, how it works, partners, and testimonials
 */
const HomePage: React.FC = () => {
  // Configure page title and meta tags
  useEffect(() => {
    document.title = 'PromptHub | AI Prompt Marketplace';
  }, []);

  return (
    <div className="home-page">
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <PartnersSection />
      <TestimonialsSection />
    </div>
  );
};

export default HomePage; 