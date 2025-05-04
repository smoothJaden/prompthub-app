import React, { useState } from 'react';
import './TestimonialsSection.css';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
}

const TestimonialsSection: React.FC = () => {
  // Testimonials data
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Alex Chen',
      role: 'Chief AI Engineer',
      company: 'TechFlow',
      avatar: '/images/testimonials/avatar1.jpg',
      quote: 'PromptHub has completely transformed how we manage and version control our AI prompts. We can now track all changes and precisely allocate revenue for each prompt. It\'s like GitHub for AI assets.'
    },
    {
      id: 2,
      name: 'Michael Li',
      role: 'AI Content Creator',
      company: 'Independent Studio',
      avatar: '/images/testimonials/avatar2.jpg',
      quote: 'As an AI prompt engineer, I can now earn passive income from my creations. Every time someone uses my prompts, I receive royalties - it\'s truly changed the game.'
    },
    {
      id: 3,
      name: 'Sarah Wang',
      role: 'CTO',
      company: 'NeoAI',
      avatar: '/images/testimonials/avatar3.jpg',
      quote: 'The combination of blockchain and AI is incredibly innovative. We can now ensure proper attribution of ownership and intellectual property for prompts, which is crucial in the AI era.'
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="testimonials-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Testimonials</span>
          <h2>What Users Say About PromptHub</h2>
          <p className="section-description">
            Hear from our users about how PromptHub is changing the way they create and manage AI prompts.
          </p>
        </div>

        <div className="testimonials-slider">
          <div className="testimonial-card" key={testimonials[activeIndex].id}>
            <div className="quote-icon">❝</div>
            <p className="testimonial-quote">{testimonials[activeIndex].quote}</p>
            <div className="testimonial-author">
              <div className="author-avatar-placeholder">
                {/* Should be replaced with actual avatars in the final project */}
                <div className="avatar-text">{testimonials[activeIndex].name.charAt(0)}</div>
              </div>
              <div className="author-info">
                <h4>{testimonials[activeIndex].name}</h4>
                <p>{testimonials[activeIndex].role}, {testimonials[activeIndex].company}</p>
              </div>
            </div>
          </div>

          <div className="slider-controls">
            <button className="slider-arrow prev" onClick={handlePrev}>←</button>
            <div className="slider-dots">
              {testimonials.map((_, index) => (
                <button 
                  key={index} 
                  className={`slider-dot ${index === activeIndex ? 'active' : ''}`}
                  onClick={() => setActiveIndex(index)}
                />
              ))}
            </div>
            <button className="slider-arrow next" onClick={handleNext}>→</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection; 