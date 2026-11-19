import React, { useState } from 'react';
import { Navbar } from '../../shared/components/Navbar.jsx';
import { Footer } from '../../shared/components/Footer.jsx';
import { QRRegistrationModal } from '../../shared/components/QRRegistrationModal.jsx';
import { QuizSimulatorModal } from '../../shared/components/QuizSimulatorModal.jsx';
import { HeroSection } from './HeroSection.jsx';
import { LiveStatsMarquee } from './LiveStatsMarquee.jsx';
import { AboutSection } from './AboutSection.jsx';
import { ModulesTrackSection } from './ModulesTrackSection.jsx';
import { ActivitiesShowcase } from './ActivitiesShowcase.jsx';
import { LeaderboardSection } from './LeaderboardSection.jsx';
import { ArchitectureGuarantees } from './ArchitectureGuarantees.jsx';
import { EventTimeline } from './EventTimeline.jsx';
import { FAQSection } from './FAQSection.jsx';

export default function LandingPage() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [currentParticipant, setCurrentParticipant] = useState(null);

  const handleLaunchActivity = (activity) => {
    setSelectedActivity(activity);
    setIsSimulatorOpen(true);
  };

  const handlePointsAwarded = (points, result) => {
    console.log(`Points awarded: +${points}`, result);
  };

  return (
    <div className="min-h-screen bg-[#030305] text-[#FAF8F5] selection:bg-purple-600 selection:text-white flex flex-col">
      {/* Floating Navbar */}
      <Navbar
        onOpenRegister={() => setIsRegisterOpen(true)}
        onOpenSimulator={() => setIsSimulatorOpen(true)}
      />

      {/* Main Sections */}
      <main className="flex-1">
        <HeroSection
          onOpenRegister={() => setIsRegisterOpen(true)}
          onOpenSimulator={() => setIsSimulatorOpen(true)}
        />
        <LiveStatsMarquee />
        <AboutSection onOpenRegister={() => setIsRegisterOpen(true)} />
        <ModulesTrackSection />
        <ActivitiesShowcase onLaunchActivity={handleLaunchActivity} />
        <LeaderboardSection onOpenSimulator={() => setIsSimulatorOpen(true)} />
        <ArchitectureGuarantees />
        <EventTimeline />
        <FAQSection />
      </main>

      {/* Footer */}
      <Footer />

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
        onPointsAwarded={handlePointsAwarded}
      />
    </div>
  );
}
