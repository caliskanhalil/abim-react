import React from 'react';
import AboutHero from './components/AboutHero';
import Gallery from './components/Gallery';
import YouTubeSection from './components/YouTubeSection';
import JoinUs from "../../components/JoinUs";


const AboutPage = () => {
  return (
    <div className="">
      <AboutHero />
      <YouTubeSection />
      <Gallery />
        <JoinUs />

    </div>
  );
};

export default AboutPage;

