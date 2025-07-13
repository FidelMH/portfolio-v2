import React from 'react';

const FormationSection = ({ formations }) => {
  return (
    <section id="formation" className="py-20 relative">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Formation
        </h2>
        
        <div className="max-w-4xl mx-auto">
          {formations.map((formation, index) => (
            <div key={index} className="relative mb-8 pl-8 border-l-2 border-purple-300">
              <div className="absolute -left-2 top-0 w-4 h-4 bg-purple-600 rounded-full" />
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all duration-300">
                <h3 className="text-xl font-bold text-purple-600 mb-2">{formation.title}</h3>
                <div className="text-gray-700 mb-2 font-medium">{formation.school} - {formation.location}</div>
                <div className="text-purple-500 mb-4 font-semibold">{formation.period}</div>
                <p className="text-gray-600">{formation.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FormationSection;