import React from 'react';
import AboutHero from './components/AboutHero';
import Gallery from './components/Gallery';
import YouTubeSection from './components/YouTubeSection';

const AboutPage = () => {
  return (
    <div className="pt-20">
      <AboutHero />
      <YouTubeSection />
      <Gallery />
    </div>
  );
};

export default AboutPage;

