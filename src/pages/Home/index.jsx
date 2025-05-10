import { Helmet } from 'react-helmet';
import HeroSlider from './components/HeroSlider';
import { Link } from 'react-router-dom';

import Stats from './components/Stats';
import Message from './components/Message';
import Courses from './components/Courses';
import YouTubeSection from '../AboutPage/components/YouTubeSection';
import BlogSection from './components/BlogSection';
import Contact from './components/Contact';
import JoinUs from "../../components/JoinUs";


const Home = () => {
  return (
    <>
      <Helmet>
        <title>ABİM - Adana Anadolu Gençlik Derneği</title>
        <meta name="description" content="Adana Anadolu Gençlik Derneği resmi web sitesi. Eğitim, kültür ve gençlik faaliyetleri hakkında bilgi alın." />
        <meta name="keywords" content="Adana, gençlik derneği, eğitim, kültür, sosyal aktiviteler, öğrenci faaliyetleri" />
        <meta property="og:title" content="ABİM - Adana Anadolu Gençlik Derneği" />
        <meta property="og:description" content="Adana Anadolu Gençlik Derneği resmi web sitesi. Eğitim, kültür ve gençlik faaliyetleri hakkında bilgi alın." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.abimagd.com" />
        <meta property="og:image" content="https://www.abimagd.com/og-image.jpg" />
        <link rel="canonical" href="https://www.abimagd.com" />
      </Helmet>
      <div className="min-h-screen">
        <HeroSlider />
        <Message />
        <Stats />
        <Courses />
        <YouTubeSection />
        <BlogSection />
        <JoinUs />
        <Contact />
      </div>
    </>
  );
};

export default Home; 