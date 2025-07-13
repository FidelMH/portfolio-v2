import React from 'react';
import { Mail, Github } from 'lucide-react';

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 relative">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-16 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Contact
        </h2>
        
        <div className="max-w-2xl mx-auto">
          <p className="text-xl text-gray-600 mb-8">
            Intéressé par mon profil ? N&apos;hésitez pas à me contacter !
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a 
              href="mailto:moussahaziri.fidel@gmail.com"
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center gap-3 justify-center cursor-pointer"
            >
              <Mail size={20} />
              Envoyer un email
            </a>
            
            <a 
              href="https://github.com/fidel"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center gap-3 justify-center cursor-pointer"
            >
              <Github size={20} />
              GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;