import React, { useEffect, useRef } from 'react';
import './HeroSection.css';

/**
 * Hero section component for the homepage
 * Includes animated headline, description, CTA buttons, and background effects
 */
const HeroSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Initialize and animate particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);
    
    // Particle class
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      
      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = '#6366f1';
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x > canvas!.width) this.x = 0;
        else if (this.x < 0) this.x = canvas!.width;
        
        if (this.y > canvas!.height) this.y = 0;
        else if (this.y < 0) this.y = canvas!.height;
      }
      
      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    // Create particle array
    const particleCount = Math.min(150, Math.floor((canvas.width * canvas.height) / 8000));
    const particles: Particle[] = [];
    
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw lines between nearby particles
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.15)';
      ctx.lineWidth = 0.3;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
        
        particles[i].update();
        particles[i].draw();
      }
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
    };
  }, []);
  
  // Attempt to unmute video playback
  useEffect(() => {
    const attemptUnmute = () => {
      const video = videoRef.current;
      if (!video) return;
      
      // Try to unmute the video
      video.muted = false;
      
      // Check if unmuting was successful
      if (video.muted) {
        console.log('Browser blocked autoplay with sound');
      } else {
        console.log('Successfully unmuted video playback');
      }
    };
    
    // Add user interaction detection to unmute after user clicks anywhere
    const handleUserInteraction = () => {
      attemptUnmute();
      // Remove event listener after first interaction
      document.removeEventListener('click', handleUserInteraction);
    };
    
    document.addEventListener('click', handleUserInteraction);
    
    // Try automatic unmute (may be blocked by browser)
    setTimeout(attemptUnmute, 1000);
    
    return () => {
      document.removeEventListener('click', handleUserInteraction);
    };
  }, []);
  
  return (
    <section className="hero-section">
      <canvas ref={canvasRef} className="particle-canvas"></canvas>
      <div className="container">
        <div className="hero-content">
          <h1 className="animate-slideInUp">
            The <span className="text-gradient">Decentralized Marketplace</span> for AI Prompts
          </h1>
          <p className="animate-slideInUp delay-200">
            Create, share, and monetize AI prompts on a secure blockchain platform.
            Transform your prompts into valuable assets and join the future of AI content.
          </p>
          <div className="cta-buttons animate-slideInUp delay-300">
            <button className="btn btn-primary">Get Started</button>
            <button className="btn btn-secondary">Explore Marketplace</button>
          </div>
          <div className="hero-stats animate-slideInUp delay-400">
            <div className="stat">
              <span className="stat-value">10k+</span>
              <span className="stat-label">Prompts</span>
            </div>
            <div className="stat">
              <span className="stat-value">2.5k+</span>
              <span className="stat-label">Creators</span>
            </div>
            <div className="stat">
              <span className="stat-value">$1.2M+</span>
              <span className="stat-label">Volume</span>
            </div>
          </div>
        </div>
        
        <div className="hero-image animate-fadeIn delay-500">
          <video 
            ref={videoRef}
            className="video-element" 
            autoPlay 
            loop 
            muted={true} 
            controls
            playsInline
          >
            <source src="/videos/main1.mp4" type="video/mp4" />
            Your browser does not support the video tag
          </video>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
