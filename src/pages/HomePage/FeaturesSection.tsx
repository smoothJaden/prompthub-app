import React from 'react';
import './FeaturesSection.css';
import { FiBriefcase, FiDollarSign, FiActivity, FiLayers, FiUsers, FiSettings } from 'react-icons/fi';

/**
 * Features section component displaying the key features of the platform
 */
const FeaturesSection: React.FC = () => {
  return (
    <section className="features-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Features</span>
          <h2>Turn Prompts into Programmable Assets</h2>
          <p className="section-description">
            PromptHub provides a rich toolkit to help you create, compose, share, and monetize your AI prompts.
          </p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <FiBriefcase />
            </div>
            <h3>Create & Compose</h3>
            <p>
              Build complex prompt workflows using our visual editor. Chain prompts together for sophisticated AI interactions.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <FiLayers />
            </div>
            <h3>Marketplace Trading</h3>
            <p>
              Buy, sell, and exchange prompts on our secure marketplace. Discover high-quality prompts from creators worldwide.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <FiDollarSign />
            </div>
            <h3>Monetize</h3>
            <p>
              Earn royalties from your prompts. Set flexible pricing models including subscription, one-time purchase, or usage-based billing.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <FiActivity />
            </div>
            <h3>Easy Integration</h3>
            <p>
              Integrate with popular AI models and platforms through our API. Implement prompts in your applications with minimal effort.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <FiSettings />
            </div>
            <h3>Analytics & Insights</h3>
            <p>
              Track prompt performance, usage patterns, and revenue metrics. Optimize your prompts with data-driven insights.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <FiUsers />
            </div>
            <h3>Community Governance</h3>
            <p>
              Participate in platform decisions through our DAO. Help shape the future of prompt engineering and marketplace policies.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
