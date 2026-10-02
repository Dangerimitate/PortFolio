import React from 'react';
import { GlassCard } from '../../../components/elements/GlassCard';
import { SKILL_CATEGORIES_DATA, CERTIFICATIONS_DATA } from '../data/skillsData';

export const SkillsSection: React.FC = () => {
  return (
    <section id="skills" className="skills-section">
      <h2 className="section-title">Skills & Technologies</h2>
      <div className="skills-grid">
        {SKILL_CATEGORIES_DATA.map((category) => (
          <GlassCard key={category.title} className="skill-category">
            <div className="category-header">
              <span className="category-icon">{category.icon}</span>
              <h3 className="category-title">{category.title}</h3>
            </div>
            <div className="skill-list">
              {category.skills.map((skill) => (
                <div key={skill.name} className="skill-item">
                  <div className="skill-info">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-percent">{skill.level}%</span>
                  </div>
                  <div className="skill-bar">
                    <div
                      className="skill-fill"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Certifications */}
      <div className="certifications-block">
        <h3 className="subsection-title">Certifications</h3>
        <div className="certs-grid">
          {CERTIFICATIONS_DATA.map((cert) => (
            <GlassCard key={cert.title} className="cert-card">
              <div className="cert-icon">🎓</div>
              <div className="cert-info">
                <h4 className="cert-title">{cert.title}</h4>
                <p className="cert-issuer">{cert.issuer}</p>
                <span className="cert-platform">{cert.platform}</span>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};
