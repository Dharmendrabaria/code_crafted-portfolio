import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import AmbientBackground from './components/AmbientBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import About from './components/About';
import TechStack from './components/TechStack';
import Work from './components/Work';
import Services from './components/Services';
import Packages from './components/Packages';
import Workflow from './components/Workflow';
import WhyCodeCrafted from './components/WhyCodeCrafted';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <Preloader />
      <CustomCursor />
      <AmbientBackground />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <TechStack />
        <Work />
        <Services />
        <Packages />
        <Workflow />
        <WhyCodeCrafted />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
