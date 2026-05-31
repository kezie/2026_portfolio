import React from 'react';
import Navbar from '../components/portfolio/Navbar';
import HeroSection from '../components/portfolio/HeroSection';
import MarqueeStrip from '../components/portfolio/MarqueeStrip';
import WorkArchive from '../components/portfolio/WorkArchive';
import AboutSection from '../components/portfolio/AboutSection';
import ContactSection from '../components/portfolio/ContactSection';
import Footer from '../components/portfolio/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <MarqueeStrip />
      <WorkArchive />
      <MarqueeStrip text="CORE WEB VITALS — TECHNICAL SEO — PERFORMANCE ENGINEERING - PAID ADS" separator="◆" />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  );
}