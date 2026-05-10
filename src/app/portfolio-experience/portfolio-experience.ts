import { Component } from '@angular/core';

interface ExperienceProject {
    name: string;
    description: string;
}

interface Experience {
    company: string;
    role: string;
    location: string;
    period: string;
    projects: ExperienceProject[];
}

@Component({
    selector: 'app-portfolio-experience',
    imports: [],
    templateUrl: './portfolio-experience.html',
    styleUrl: './portfolio-experience.scss',
})
export class PortfolioExperience {
    experiences: Experience[] = [
        {
            company: 'GMoney Private Limited',
            role: 'Full-Stack Developer',
            location: 'Mumbai, India',
            period: 'Aug 2024 — Present',
            projects: [
                {
                    name: 'Asset Tagging',
                    description:
                        'Centralized system for tracking company assets and assigning them to respective personnel.',
                },
                {
                    name: 'Config Panel',
                    description:
                        'Add projects, categorize related tabs under each project, and control tab visibility based on the user\'s role.',
                },
                {
                    name: 'Cashless Plus',
                    description:
                        'Hospital-facing page to register and manage patient policy details, process claims, and view claim status updates.',
                },
                {
                    name: 'Task Allocation',
                    description:
                        'Daily task log and progress tracker enabling effective evaluation of candidate performance.',
                },
                {
                    name: 'Claim Tracker',
                    description:
                        'End-to-end workflow — file intake, claim ID generation, insurance provider dispatch, progress tracking, and final resolution.',
                },
                {
                    name: 'Price Discovery',
                    description:
                        'Global bidding platform for company products with centralized product inventory management.',
                },
                {
                    name: 'MIS Portal',
                    description:
                        'Monitoring dashboard for reports and goal progress for Relationship Managers and sales staff.',
                },
            ],
        },
    ];
}
