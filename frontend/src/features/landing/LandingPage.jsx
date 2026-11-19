import React, { useState } from 'react';
import { BackgroundMesh } from './BackgroundMesh.jsx';
import { HeaderNav } from './HeaderNav.jsx';
import { HeroHackX } from './HeroHackX.jsx';
import { StatsArchiveSection } from './StatsArchiveSection.jsx';
import { RegisterBannerSection } from './RegisterBannerSection.jsx';
import { ThemesTracksSection } from './ThemesTracksSection.jsx';
import { ActivitiesShowcase } from './ActivitiesShowcase.jsx';
import { LeaderboardSection } from './LeaderboardSection.jsx';
import { ArchitectureGuarantees } from './ArchitectureGuarantees.jsx';
import { EventTimeline } from './EventTimeline.jsx';
import { FAQSection } from './FAQSection.jsx';
import { PartnersMarqueeSection } from './PartnersMarqueeSection.jsx';
import { HackXFooter } from './HackXFooter.jsx';
import { QRRegistrationModal } from '../../shared/components/QRRegistrationModal.jsx';
import { QuizSimulatorModal } from '../../shared/components/QuizSimulatorModal.jsx';

export default function LandingPage() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [currentParticipant, setCurrentParticipant] = useState(null);

  const handleLaunchActivity = (activity) => {
    setSelectedActivity(activity);
    setIsSimulatorOpen(true);
  };

  return (
    <div className="relative min-h-screen text-[#FAF8F5] selection:bg-purple-600 selection:text-white overflow-x-hidden font-sans">
      
      {/* 1. Exact HackX Background (Moving Gradient Geometric Mark + Radial Gradient + Noise) */}
      <BackgroundMesh />

      {/* 2. Exact HackX Header with MENU Trigger & Fullscreen Overlay */}
      <HeaderNav onOpenRegister={() => setIsRegisterOpen(true)} />

      {/* 3. Main Page Flow */}
      <main className="relative z-10 flex-grow">
        {/* Exact HackX Hero Stack */}
        <HeroHackX
          onOpenRegister={() => setIsRegisterOpen(true)}
          onOpenSimulator={() => setIsSimulatorOpen(true)}
        />

        {/* Exact HackX Stats Archive Slider with Left Rail Nav & Giant Numerals */}
        <StatsArchiveSection />

        {/* Exact HackX Register Gradient Banner */}
        <RegisterBannerSection onOpenRegister={() => setIsRegisterOpen(true)} />

        {/* Exact HackX Themes & Tracks with Horizontal Marquee & 3D Split-Screen Explorer */}
        <ThemesTracksSection />

        {/* Activities & Quizzes Arena */}
        <ActivitiesShowcase onLaunchActivity={handleLaunchActivity} />

        {/* Live Leaderboard & Top 3 Podium */}
        <LeaderboardSection onOpenSimulator={() => setIsSimulatorOpen(true)} />

        {/* System Architecture & Technical Guarantees */}
        <ArchitectureGuarantees />

        {/* Event Schedule Timeline */}
        <EventTimeline />

        {/* FAQs */}
        <FAQSection />

        {/* Exact HackX Partners / Powered By Section */}
        <PartnersMarqueeSection />
      </main>

      {/* Exact HackX Footer ("Let's create future together" + 2-Column Team Grid) */}
      <HackXFooter />

      {/* Interactive Modals */}
      <QRRegistrationModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onRegistered={(p) => setCurrentParticipant(p)}
      />

      <QuizSimulatorModal
        isOpen={isSimulatorOpen}
        onClose={() => setIsSimulatorOpen(false)}
        activity={selectedActivity}
        participant={currentParticipant}
      />

    </div>
  );
}
