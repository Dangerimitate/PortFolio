import { Component } from '@angular/core';

interface Skill {
  name: string;
  level: number;
}

interface SkillCategory {
  title: string;
  icon: string;
  skills: Skill[];
}

@Component({
  selector: 'app-portfolio-skills',
  imports: [],
  templateUrl: './portfolio-skills.html',
  styleUrl: './portfolio-skills.scss',
})
export class PortfolioSkills {
  categories: SkillCategory[] = [
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
      title: 'Frameworks',
      icon: '🚀',
      skills: [
        { name: 'Angular', level: 90 },
        { name: 'React', level: 80 },
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
        { name: 'Vercel', level: 75 },
        { name: 'Postman', level: 80 },
      ],
    },
  ];

  certifications = [
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
}
