import React from 'react';
import { Link } from 'react-router-dom'
import './MainComponent.css';

const MainComponent = () => {
  return (
<div className="font-roboto bg-gray-100 min-h-screen flex flex-col">
<nav className="nav"> <div className="nav-container"> {/* Logo/Brand */} <div className="nav-title"> Save a Life </div> {/* Navigation Links */} <div className="nav-links"> {[ { to: '/gallery', text: 'Gallery' }, { to: '/donation', text: 'Donation' }, { to: '/profile', text: 'Profile' }, { to: '/photography', text: 'Photography' } ].map((link) => ( <Link key={link.to} to={link.to} className="text-white hover:text-green-200 font-medium no-underline transition-colors duration-300" > {link.text} </Link> ))} </div> </div>
    </nav>

      {/* Main Content */}
      <div className="container mx-auto p-6 flex-grow flex flex-col space-y-8">
        {/* Importance of Wildlife Conservation */}
        <section>
          <h2 className="text-4xl font-bold mb-4 text-green-700">
            Importance of Wildlife Conservation
          </h2>
          <p className="text-gray-700 mb-4">
            Wildlife conservation is crucial for maintaining biodiversity,
            ensuring the survival of various species, and preserving the
            natural habitats that are essential for the ecosystem. It also
            helps in maintaining ecological balance and supports human life by
            providing clean air, water, and fertile soil.
          </p>
          <img
            alt="A diverse group of wildlife animals in their natural habitat"
            className="w-full h-auto rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105"
            src="https://storage.googleapis.com/a1aa/image/idst59BOTFXjqnYej1ARvratRXYGx6Gm934mH8xnbik.jpg"
          />
        </section>

        {/* Statistics */}
        <section>
          <h2 className="text-4xl font-bold mb-4 text-green-700">Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-xl">
              <h3 className="text-xl font-bold mb-2 text-green-600">
                Species at Risk
              </h3>
              <p className="text-gray-700">
                Over 1 million species are at risk of extinction due to habitat
                loss, climate change, and other human activities.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-xl">
              <h3 className="text-xl font-bold mb-2 text-green-600">
                Protected Areas
              </h3>
              <p className="text-gray-700">
                Only 15% of the world's land and 7% of the oceans are protected
                areas.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-xl">
              <h3 className="text-xl font-bold mb-2 text-green-600">
                Conservation Efforts
              </h3>
              <p className="text-gray-700">
                Conservation efforts have helped to recover 48 species from the
                brink of extinction in the past decade.
              </p>
            </div>
          </div>
        </section>

        {/* Steps Taken Towards Wildlife Protection */}
        <section>
          <h2 className="text-4xl font-bold mb-4 text-green-700">
            Steps Taken Towards Wildlife Protection
          </h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>Establishment of protected areas and wildlife reserves.</li>
            <li>Implementation of anti-poaching laws and regulations.</li>
            <li>Community-based conservation programs.</li>
            <li>Restoration of degraded habitats.</li>
            <li>Promotion of sustainable land-use practices.</li>
            <li>Research and monitoring of wildlife populations.</li>
            <li>Education and awareness campaigns.</li>
          </ul>
        </section>
      </div>

      {/* Footer */}
      {/* Footer */} <footer className="footer"> <div className="footer-content"> <p className="text-sm"> &copy; {new Date().getFullYear()} Save a Life. All Rights Reserved. </p> </div>
      </footer>
    </div>
  );
};

export default MainComponent;
