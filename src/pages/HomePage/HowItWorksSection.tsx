import React from 'react';
import './HowItWorksSection.css';

const HowItWorksSection: React.FC = () => {
  return (
    <section className="how-it-works-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">How It Works</span>
          <h2>How to Use PromptHub</h2>
          <p className="section-description">
            Start creating, sharing, and monetizing your AI prompts in just a few simple steps.
          </p>
        </div>

        <div className="steps-container">
          <div className="step-card">
            <div className="step-number">1</div>
            <h3>Create Prompts</h3>
            <p>
              Design complex prompt workflows using our powerful DAG editor, from simple text to multi-step intelligent workflows.
            </p>
          </div>

          <div className="step-card">
            <div className="step-number">2</div>
            <h3>Register on Blockchain</h3>
            <p>
              Register your prompts on the Solana blockchain, securing immutable proof of ownership and setting license terms.
            </p>
          </div>

          <div className="step-card">
            <div className="step-number">3</div>
            <h3>Share and Monetize</h3>
            <p>
              Share your prompts on the global marketplace and earn automatic royalties each time they're used.
            </p>
          </div>

          <div className="step-card">
            <div className="step-number">4</div>
            <h3>Collaborate and Extend</h3>
            <p>
              Collaborate with other creators, extend existing prompts, and build more powerful workflows and applications.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection; 