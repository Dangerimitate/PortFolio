import { SkillCategory, Certification } from '../types/skillsTypes';

export const SKILL_CATEGORIES_DATA: SkillCategory[] = [
  {
    title: 'Languages',
    icon: '💻',
    skills: [
      { name: 'JavaScript', level: 90 },
      { name: 'TypeScript', level: 85 },
      { name: 'Java', level: 80 },
      { name: 'Python', level: 70 },
    ],
  },
  {
    title: 'Frameworks & Libraries',
    icon: '🚀',
    skills: [
      { name: 'React', level: 90 },
      { name: 'Angular', level: 85 },
      { name: 'Node.js', level: 85 },
      { name: 'Express.js', level: 80 },
    ],
  },
  {
    title: 'Databases',
    icon: '🗄️',
    skills: [
      { name: 'MongoDB', level: 85 },
      { name: 'SQL', level: 80 },
    ],
  },
  {
    title: 'Tools & Platforms',
    icon: '🛠️',
    skills: [
      { name: 'Git', level: 85 },
      { name: 'VS Code', level: 90 },
      { name: 'Vercel', level: 80 },
      { name: 'Postman', level: 85 },
    ],
  },
];

export const CERTIFICATIONS_DATA: Certification[] = [
  {
    title: 'Full-Stack Web Development with React',
    issuer: 'Hong Kong University of Science and Technology',
    platform: 'Coursera',
  },
  {
    title: 'Python for Everybody',
    issuer: 'University of Michigan',
    platform: 'Coursera',
  },
];
