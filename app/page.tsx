import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from './components/HeroSection';
import AboutMeSection from './components/AboutMeSection';
import WorkSection from './components/WorkSection';
import InterestSection from './components/InterestSection';

export default function HomePage() {
  return (
    <main className="bg-ink min-h-screen">
      {/* Film grain overlay — fixed, full-screen */}
      <div className="noise-overlay" aria-hidden="true" />

      <Header />

      <HeroSection />
      <AboutMeSection />
      <WorkSection />
      <InterestSection />

      <Footer />
    </main>
  );
}