import React from 'react';

const InterestsSection = ({ interests }) => {
  return (
    <section id="interests" className="py-20 relative">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Centres d&apos;intérêt
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {interests.map((interest, index) => (
            <div key={index} className="bg-gray-50 rounded-2xl p-6 border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all duration-300 text-center">
              <div className="text-4xl mb-4">{interest.icon}</div>
              <div className="text-gray-700 font-medium">{interest.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InterestsSection;