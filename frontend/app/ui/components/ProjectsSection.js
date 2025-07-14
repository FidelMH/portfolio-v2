import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Calendar, Code } from 'lucide-react';

// Composant ProjectCard optimisé avec React.memo
const ProjectCard = React.memo(function ProjectCard({ project, getStatusColor, getStatusLabel, itemVariants }) {
  return (
    <motion.div
      variants={itemVariants}
      className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-200 hover:border-purple-300 hover:shadow-xl transition-all duration-300"
      whileHover={{ y: -10, scale: 1.02 }}
    >
      {/* Image placeholder */}
      <div className="h-48 bg-gradient-to-br from-purple-400 via-pink-400 to-red-400 relative overflow-hidden">
        {project.image_url ? (
          <img 
            src={project.image_url} 
            alt={project.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Code size={48} className="text-white/70" />
          </div>
        )}
        
        {/* Badge featured */}
        {project.featured && (
          <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold">
            ⭐ Mis en avant
          </div>
        )}
        
        {/* Badge statut */}
        <div className={`absolute top-4 left-4 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}>
          {getStatusLabel(project.status)}
        </div>
      </div>

      <div className="p-6">
        {/* Titre et catégorie */}
        <div className="mb-3">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{project.title}</h3>
          {project.category && (
            <span className="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium">
              {project.category}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 4).map((tech) => (
              <span 
                key={tech.id}
                className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs font-medium"
                style={{ 
                  backgroundColor: tech.color ? `${tech.color}20` : undefined,
                  color: tech.color || undefined 
                }}
              >
                {tech.name}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="text-gray-500 text-xs">
                +{project.technologies.length - 4} autres
              </span>
            )}
          </div>
        </div>

        {/* Date */}
        <div className="flex items-center text-gray-500 text-sm mb-4">
          <Calendar size={14} className="mr-1" />
          {new Date(project.created_at).toLocaleDateString('fr-FR')}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          {project.demo_url && (
            <motion.a
              href={project.demo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ExternalLink size={16} />
              Voir
            </motion.a>
          )}
          
          {project.github_url && (
            <motion.a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github size={16} />
              Code
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
});

const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('featured');
  const [showAll, setShowAll] = useState(false);
  const [categories, setCategories] = useState(['featured', 'all']);

  useEffect(() => {
    fetchProjects();
  }, [filter, showAll]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      let url = '/api/projects';  // Utiliser le proxy Next.js
      const params = new URLSearchParams();
      
      // Si on n'affiche pas tout, on affiche seulement les projets mis en avant
      if (!showAll) {
        if (filter === 'featured' || filter === 'all') {
          params.append('featured', 'true');
        } else {
          // Filtrer par catégorie ET featured
          params.append('category', filter);
          params.append('featured', 'true');
        }
      } else {
        // Afficher tous les projets avec filtre éventuel
        if (filter !== 'all' && filter !== 'featured') {
          params.append('category', filter);
        }
      }
      
      if (params.toString()) {
        url += '?' + params.toString();
      }
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      setProjects(data);
    } catch (err) {
      // Fallback avec des données mock si l'API ne répond pas
      if (err.name === 'TypeError' && err.message.includes('fetch')) {
        const mockProjects = [
          {
            id: 1,
            title: "Portfolio Personnel",
            description: "Portfolio moderne avec animations et backend API",
            status: "completed",
            featured: true,
            category: "fullstack",
            demo_url: null,
            github_url: "https://github.com/fidel/portfolio",
            image_url: null,
            technologies: [
              { id: 1, name: "React", color: "#61dafb" },
              { id: 2, name: "Next.js", color: "#000000" },
              { id: 3, name: "FastAPI", color: "#009688" },
              { id: 4, name: "Supabase", color: "#3ecf8e" }
            ],
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          {
            id: 2,
            title: "Analyse de Données",
            description: "Projet d'analyse de données avec visualisations",
            status: "completed",
            featured: true,
            category: "data",
            demo_url: null,
            github_url: "https://github.com/fidel/data-analysis",
            image_url: null,
            technologies: [
              { id: 5, name: "Python", color: "#3776ab" },
              { id: 6, name: "Pandas", color: "#150458" },
              { id: 7, name: "Machine Learning", color: "#ff6b35" }
            ],
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        ];
        
        // Filtrer selon les critères actuels
        let filteredMock = mockProjects;
        if (!showAll && filter === 'featured') {
          filteredMock = mockProjects.filter(p => p.featured);
        } else if (!showAll && filter !== 'all' && filter !== 'featured') {
          filteredMock = mockProjects.filter(p => p.category === filter && p.featured);
        } else if (showAll && filter !== 'all' && filter !== 'featured') {
          filteredMock = mockProjects.filter(p => p.category === filter);
        }
        
        setProjects(filteredMock);
        setError(null); // Pas d'erreur avec les données mock
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  }, [filter, showAll]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/projects/categories');
      
      if (response.ok) {
        const data = await response.json();
        const cats = ['featured', 'all', ...data.categories];
        setCategories(cats);
      } else {
        setCategories(['featured', 'all', 'web', 'ia', 'data', 'fullstack']);
      }
    } catch (error) {
      setCategories(['featured', 'all', 'web', 'ia', 'data', 'fullstack']);
    }
  };

  // Optimisations avec useMemo
  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }), []);

  const itemVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  }), []);

  // Optimiser le calcul du texte du bouton
  const viewAllButtonText = useMemo(() => {
    const remainingCount = Math.max(0, 10 - projects.length);
    return `Voir tous les projets ${projects.length > 0 ? `(+${remainingCount} autres)` : '(Charger tout)'}`;
  }, [projects.length]);

  const getStatusColor = useCallback((status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700 border-green-200';
      case 'in-progress': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'planned': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  }, []);

  const getStatusLabel = useCallback((status) => {
    switch (status) {
      case 'completed': return 'Terminé';
      case 'in-progress': return 'En cours';
      case 'planned': return 'Planifié';
      default: return status;
    }
  }, []);

  if (loading) {
    return (
      <section id="projects" className="py-20 relative">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Projets
          </h2>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="projects" className="py-20 relative">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Projets
          </h2>
          <div className="text-center text-red-600 bg-red-50 p-4 rounded-lg">
            <p>Erreur: {error}</p>
            <button 
              onClick={fetchProjects}
              className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              Réessayer
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.h2 
          className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Projets
        </motion.h2>

        {/* Filtres */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              disabled={loading}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 relative ${
                filter === category
                  ? 'bg-purple-600 text-white shadow-lg scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-purple-100 hover:text-purple-700'
              } ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              {loading && filter === category && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                </div>
              )}
              <span className={loading && filter === category ? 'opacity-0' : ''}>
                {category === 'all' ? 'Tous' : 
                 category === 'featured' ? 'Mis en avant' : 
                 category.charAt(0).toUpperCase() + category.slice(1)}
              </span>
            </button>
          ))}
        </motion.div>


        {/* Bouton Voir tous les projets */}
        {!showAll && (
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <button
              onClick={() => setShowAll(true)}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              {viewAllButtonText}
            </button>
          </motion.div>
        )}

        {/* Bouton Voir moins si tous affichés */}
        {showAll && (
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <button
              onClick={() => setShowAll(false)}
              className="bg-gray-600 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              Voir moins (projets mis en avant uniquement)
            </button>
          </motion.div>
        )}

        {/* Grille de projets */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              getStatusColor={getStatusColor}
              getStatusLabel={getStatusLabel}
              itemVariants={itemVariants}
            />
          ))}
        </motion.div>

        {/* Message si aucun projet */}
        {projects.length === 0 && (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-gray-500 text-lg">
              Aucun projet trouvé pour cette catégorie.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;