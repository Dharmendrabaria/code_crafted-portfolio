import { useEffect } from 'react';
import Lenis from 'lenis';
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
  useEffect(() => {
    // Initialize premium smooth scrolling
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Buttery smooth easeOutExpo
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

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
