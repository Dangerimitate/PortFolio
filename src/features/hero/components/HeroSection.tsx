import React from 'react';
import { Link } from 'react-router-dom';
import { useThreeCanvas } from '../hooks/useThreeCanvas';

export const HeroSection: React.FC = () => {
  const containerRef = useThreeCanvas();

  return (
    <section id="home" className="hero-container">
      <div className="canvas-container" ref={containerRef}></div>
      <div className="hero-content">
        <p className="greeting">Hello, I'm</p>
        <h1 className="name">Rahul Epili</h1>
        <h2 className="title">Full-Stack Developer</h2>
        <p className="description">
          Building scalable, high-performance web applications with Angular, React, Node.js & modern cloud technologies.
        </p>
        <div className="cta-buttons">
          <Link to="/projects" className="btn btn-primary">View Projects</Link>
          <Link to="/contact" className="btn btn-secondary">Contact Me</Link>
        </div>
      </div>
    </section>
  );
};
