import React from 'react';
import { GlassCard } from '../../../components/elements/GlassCard';
import { EDUCATION_DATA, STATS_DATA } from '../data/educationData';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          <div className="about-text">
            <p>
              I am a passionate <strong>Full-Stack Developer</strong> with professional experience
              building scalable and performant enterprise applications at <strong>GMoney Private Limited</strong>.
              I hold a <strong>B.E. in Computer Engineering</strong> from the University of Mumbai (CGPA: 8.63).
            </p>
            <p>
              My stack spans the full development lifecycle — from Angular and React frontends to Node.js and
              Java backends with MongoDB and SQL databases. I love turning complex business requirements into
              clean, efficient code.
            </p>
          </div>
          <div className="about-stats">
            {STATS_DATA.map((stat) => (
              <GlassCard key={stat.label} className="stat-card">
                <h3>{stat.value}</h3>
                <p>{stat.label}</p>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Education Timeline */}
        <div className="education-block">
          <h3 className="subsection-title">Education</h3>
          <div className="timeline">
            {EDUCATION_DATA.map((edu) => (
              <div key={edu.institution} className="timeline-item">
                <div className="timeline-dot"></div>
                <GlassCard className="timeline-content">
                  <div className="timeline-header">
                    <h4>{edu.institution}</h4>
                    <span className="timeline-period">{edu.period}</span>
                  </div>
                  <p className="timeline-degree">{edu.degree}</p>
                  <span className="timeline-score">{edu.score}</span>
                </GlassCard>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
