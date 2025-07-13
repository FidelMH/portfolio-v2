import React from 'react';
import { Brain, Globe, Code, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const SkillsSection = ({ skills, languages, softSkills }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section id="skills" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.h2 
          className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Compétences
        </motion.h2>
        
        <motion.div 
          className="grid md:grid-cols-3 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div 
            className="bg-gray-50 rounded-2xl p-8 border border-gray-200 hover:border-purple-300 hover:shadow-xl transition-all duration-300"
            variants={itemVariants}
            whileHover={{ y: -10, scale: 1.02 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Brain className="text-purple-600" size={32} />
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-800">IA & Data</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {skills.ia.map((skill, index) => (
                <motion.span 
                  key={index}
                  className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium border border-purple-200 hover:bg-purple-200 transition-colors duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {skill.name}
                </motion.span>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            className="bg-gray-50 rounded-2xl p-8 border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300"
            variants={itemVariants}
            whileHover={{ y: -10, scale: 1.02 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Globe className="text-blue-600" size={32} />
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-800">Développement Web</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {skills.web.map((skill, index) => (
                <motion.span 
                  key={index}
                  className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium border border-blue-200 hover:bg-blue-200 transition-colors duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {skill.name}
                </motion.span>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            className="bg-gray-50 rounded-2xl p-8 border border-gray-200 hover:border-green-300 hover:shadow-xl transition-all duration-300"
            variants={itemVariants}
            whileHover={{ y: -10, scale: 1.02 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Code className="text-green-600" size={32} />
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-800">Outils & Méthodo</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {skills.tools.map((skill, index) => (
                <motion.span 
                  key={index}
                  className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium border border-green-200 hover:bg-green-200 transition-colors duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {skill.name}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="grid md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div 
            className="bg-gray-50 rounded-2xl p-8 border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all duration-300"
            variants={itemVariants}
            whileHover={{ y: -5 }}
          >
            <h3 className="text-2xl font-bold mb-6 text-purple-600">Atouts</h3>
            <div className="flex flex-wrap gap-3">
              {softSkills.map((skill, index) => (
                <motion.span 
                  key={index} 
                  className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm border border-purple-200 font-medium hover:bg-purple-200 transition-colors duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            className="bg-gray-50 rounded-2xl p-8 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
            variants={itemVariants}
            whileHover={{ y: -5 }}
          >
            <h3 className="text-2xl font-bold mb-6 text-blue-600">Langues</h3>
            <div className="space-y-4">
              {languages.map((lang, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-center justify-between"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <span className="text-gray-700 font-medium">{lang.name}</span>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.2 + i * 0.1 }}
                        whileHover={{ scale: 1.2 }}
                      >
                        <Star 
                          size={16} 
                          className={i < lang.level / 20 ? 'text-yellow-500 fill-current' : 'text-gray-300'}
                        />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;