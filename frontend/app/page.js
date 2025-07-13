"use client"

import React, { useState, useEffect } from 'react';
import Navigation from './ui/components/Navigation';
import HeroSection from './ui/components/HeroSection';
import SkillsSection from './ui/components/SkillsSection';
import ProjectsSection from './ui/components/ProjectsSection';
import FormationSection from './ui/components/FormationSection';
import InterestsSection from './ui/components/InterestsSection';
import ContactSection from './ui/components/ContactSection';
import Footer from './ui/components/Footer';

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const skills = {
    ia: [
      { name: 'Python' },
      { name: 'Pandas' },
      { name: 'Machine Learning' },
      { name: 'Scikit-learn' }
    ],
    web: [
      { name: 'HTML/CSS' },
      { name: 'JavaScript' },
      { name: 'React' },
      { name: 'Next.js' },
      { name: 'PHP/MySQL' },
      { name: 'Node.js' }
    ],
    tools: [
      { name: 'Git/GitHub' },
      { name: 'VS Code' },
      { name: 'Scrum' },
      { name: 'Linux' }
    ]
  };

  const formations = [
    {
      title: "Développeur en Intelligence Artificielle",
      school: "Simplon",
      period: "2025 - 2027",
      location: "Saint-Denis, Réunion",
      description: "Développement d'applications web avec IA, manipulation de données, pipelines MLOps et gestion de projet IA."
    },
    {
      title: "TP Développeur Web et Web Mobile",
      school: "IFR Le Port",
      period: "2022 - 2023",
      location: "Réunion",
      description: "Formation complète en développement web moderne."
    },
    {
      title: "Licence Informatique",
      school: "Université de la Réunion",
      period: "2011 - 2014",
      location: "Réunion",
      description: "2 ans validés - Bases solides en informatique."
    }
  ];

  const languages = [
    { name: 'Français', level: 100 },
    { name: 'Anglais', level: 80 }
  ];

  const interests = [
    { name: 'Guitare', icon: '🎸' },
    { name: 'Apprentissage autodidacte', icon: '📚' },
    { name: 'Informatique et technologies', icon: '💻' },
    { name: 'Jeux Vidéos', icon: '🎮' }
  ];

  const softSkills = [
    'Autonomie', 'Capacité d\'adaptation', 'Résolution de problèmes', 
    'Travail en équipe', 'Rigueur'
  ];

  const scrollToSection = (sectionId) => {
    setIsMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = 80; // Height of fixed navigation
      const elementTop = element.offsetTop - navHeight;
      window.scrollTo({
        top: elementTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div 
        className="fixed inset-0 opacity-10 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.2) 0%, transparent 50%)`
        }}
      />
      
      <Navigation 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen} 
        scrollToSection={scrollToSection} 
      />
      
      <HeroSection />
      
      <SkillsSection 
        skills={skills} 
        languages={languages} 
        softSkills={softSkills} 
      />
      
      <ProjectsSection />
      
      <FormationSection formations={formations} />
      
      <InterestsSection interests={interests} />
      
      <ContactSection />
      
      <Footer />
    </div>
  );
};

export default Portfolio;