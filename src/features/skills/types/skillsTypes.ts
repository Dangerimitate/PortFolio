export interface Skill {
  name: string;
  level: number;
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: Skill[];
}

export interface Certification {
  title: string;
  issuer: string;
  platform: string;
}
