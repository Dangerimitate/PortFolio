import React from 'react';
import { GlassCard } from '../../../components/elements/GlassCard';
import { EXPERIENCES_DATA } from '../data/experienceData';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="experience-section">
      <h2 className="section-title">Work Experience</h2>

      {EXPERIENCES_DATA.map((exp) => (
        <GlassCard key={exp.company} className="experience-card">
          <div className="exp-header">
            <div className="exp-info">
              <h3 className="exp-company">{exp.company}</h3>
              <span className="exp-role">{exp.role}</span>
            </div>
            <div className="exp-meta">
              <span className="exp-period">{exp.period}</span>
              <span className="exp-location">📍 {exp.location}</span>
            </div>
          </div>

          <div className="exp-projects">
            <h4 className="projects-label">Key Projects</h4>
            <div className="project-list">
              {exp.projects.map((project) => (
                <div key={project.name} className="exp-project-item">
                  <span className="project-marker"></span>
                  <div>
                    <strong className="project-name">{project.name}</strong>
                    <p className="project-desc">{project.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>
      ))}
    </section>
  );
};
