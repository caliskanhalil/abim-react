import React from 'react';
import { Helmet } from 'react-helmet';
import AboutHero from './components/AboutHero';
import Gallery from './components/Gallery';
import YouTubeSection from './components/YouTubeSection';
import JoinUs from "../../components/JoinUs";


const AboutPage = () => {
  return (
    <>
      <Helmet>
        <title>Hakkımızda - ABİM Adana Anadolu Gençlik Derneği</title>
        <meta name="description" content="ABİM hakkımızda, biz, eikibimiz, kanalımız." />
      </Helmet>
      <div className="">
        <AboutHero />
        <YouTubeSection />
        <Gallery />
        <JoinUs />

      </div>
    </>
  );
};

export default AboutPage;

