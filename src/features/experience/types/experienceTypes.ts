export interface ExperienceProject {
  name: string;
  description: string;
}

export interface ExperienceItem {
  company: string;
  role: string;
  location: string;
  period: string;
  projects: ExperienceProject[];
}
