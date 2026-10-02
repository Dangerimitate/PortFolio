import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { MainLayout } from '../components/layouts/MainLayout';
import { HomePage } from '../pages/HomePage';
import { AboutPage } from '../pages/AboutPage';
import { ExperiencePage } from '../pages/ExperiencePage';
import { SkillsPage } from '../pages/SkillsPage';
import { ProjectsPage } from '../pages/ProjectsPage';
import { ContactPage } from '../pages/ContactPage';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="experience" element={<ExperiencePage />} />
          <Route path="skills" element={<SkillsPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="*" element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
