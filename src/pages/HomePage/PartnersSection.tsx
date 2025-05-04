import React from 'react';
import './PartnersSection.css';

/**
 * Partners Section Component - Displays key partners and collaborators
 */
const PartnersSection: React.FC = () => {
  // Partners data
  const partners = [
    { id: 1, name: 'Solana Foundation', logo: '/images/partners/solana.svg' },
    { id: 2, name: 'OpenAI', logo: '/images/partners/openai.svg' },
    { id: 3, name: 'Anthropic', logo: '/images/partners/anthropic.svg' },
    { id: 4, name: 'Hugging Face', logo: '/images/partners/huggingface.svg' },
    { id: 5, name: 'Mistral AI', logo: '/images/partners/mistral.svg' },
    { id: 6, name: 'Metaplex', logo: '/images/partners/metaplex.svg' },
  ];
  
  return (
    <section className="partners-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Partners</span>
          <h2>Building with Industry Leaders</h2>
          <p className="section-description">
            PromptHub collaborates with world-class AI providers and blockchain ecosystems to deliver the best experience for users.
          </p>
        </div>
        
        <div className="partners-grid">
          {partners.map(partner => (
            <div key={partner.id} className="partner-card">
              <div className="partner-logo-placeholder">
                {/* To be replaced with actual logos in the final project */}
                <div className="placeholder-text">{partner.name}</div>
              </div>
              <h3 className="partner-name">{partner.name}</h3>
            </div>
          ))}
        </div>
        
        <div className="partner-cta">
          <h3>Interested in Becoming a Partner?</h3>
          <p>We're looking for partners to expand our ecosystem.</p>
          <button className="btn btn-secondary">Contact Us</button>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;

