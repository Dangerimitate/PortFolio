import { Component } from '@angular/core';

interface Project {
  title: string;
  description: string;
  tags: string[];
  github?: string;
  live?: string;
}

@Component({
  selector: 'app-portfolio-projects',
  imports: [],
  templateUrl: './portfolio-projects.html',
  styleUrl: './portfolio-projects.scss',
})
export class PortfolioProjects {
  projects: Project[] = [
    {
      title: 'College ERP Model',
      description:
        'A full-featured college ERP web application built with the MERN stack. Supports all basic CRUD operations — students, teachers, classes, and exams — all editable via an admin panel.',
      tags: ['React', 'Node.js', 'MongoDB', 'Express', 'CRUD'],
      github: '#',
    },
    {
      title: 'Expenditure Planner',
      description:
        'A clean and intuitive React application to manage and track personal expenses. Deployed and hosted on Vercel for instant access.',
      tags: ['React', 'Vercel', 'CSS'],
      live: '#',
      github: '#',
    },
    {
      title: 'Hotel Management System',
      description:
        'A console-based Hotel Management tool built with Core Java. Menu-driven interface for managing bookings, rooms, and guest activities. Runs until the user exits.',
      tags: ['Core Java', 'OOP', 'CLI'],
      github: '#',
    },
    {
      title: 'Portfolio Website',
      description:
        'This interactive portfolio featuring Three.js 3D particle effects, glassmorphism design, and smooth scroll animations — the very site you\'re viewing right now!',
      tags: ['Angular', 'Three.js', 'TypeScript', 'SCSS'],
      live: '#',
    },
  ];
}
