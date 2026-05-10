import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PortfolioHero } from './portfolio-hero/portfolio-hero';
import { PortfolioAbout } from './portfolio-about/portfolio-about';
import { PortfolioExperience } from './portfolio-experience/portfolio-experience';
import { PortfolioSkills } from './portfolio-skills/portfolio-skills';
import { PortfolioProjects } from './portfolio-projects/portfolio-projects';
import { PortfolioContact } from './portfolio-contact/portfolio-contact';

@Component({
  selector: 'app-root',
  imports: [PortfolioHero, PortfolioAbout, PortfolioExperience, PortfolioSkills, PortfolioProjects, PortfolioContact],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  isScrolled = false;
  activeSection = 'hero';
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    if (!this.isBrowser) return;
    this.isScrolled = window.scrollY > 50;

    const sections = ['hero', 'about', 'experience', 'skills', 'projects', 'contact'];
    for (const id of sections) {
      const el = document.getElementById(id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom > 150) {
          this.activeSection = id;
          break;
        }
      }
    }
  }
}
