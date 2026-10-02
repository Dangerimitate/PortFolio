import React from 'react';
import { GlassCard } from '../../../components/elements/GlassCard';
import { Tag } from '../../../components/elements/Tag';
import { PROJECTS_DATA } from '../data/projectsData';

export const ProjectsSection: React.FC = () => {
  return (
    <section id="projects" className="projects-section">
      <h2 className="section-title">Featured Projects</h2>
      <div className="projects-grid">
        {PROJECTS_DATA.map((project, index) => {
          const numberStr = index + 1 < 10 ? `0${index + 1}` : `${index + 1}`;
          return (
            <GlassCard key={project.title} className="project-card">
              <div className="project-number">{numberStr}</div>
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <div className="project-tags">
                {project.tags.map((tag) => (
                  <Tag key={tag} text={tag} />
                ))}
              </div>
              <div className="project-links">
                {project.github && (
                  <a
                    href={project.github}
                    className="project-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>GitHub</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </a>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    className="project-link live"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>Live Demo</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </a>
                )}
              </div>
            </GlassCard>
          );
        })}
      </div>
    </section>
  );
};
