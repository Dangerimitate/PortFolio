import { EducationItem, StatItem } from '../types/aboutTypes';

export const EDUCATION_DATA: EducationItem[] = [
  {
    institution: 'University of Mumbai',
    period: '2020 — 2024',
    degree: 'B.E. in Computer Engineering',
    score: 'CGPA: 8.63',
  },
  {
    institution: 'Shri T.P Bhatia College of Science',
    period: '2018 — 2020',
    degree: 'HSC (Science)',
    score: '77.85%',
  },
  {
    institution: 'Mother Teresa English High School',
    period: '2017 — 2018',
    degree: 'SSC',
    score: '90.20%',
  },
];

export const STATS_DATA: StatItem[] = [
  { value: '1+', label: 'Years Experience' },
  { value: '7+', label: 'Projects Delivered' },
  { value: '8.63', label: 'CGPA' },
];
