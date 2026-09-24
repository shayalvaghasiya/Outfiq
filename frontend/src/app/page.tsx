'use client';

import React from 'react';
import { useStudio } from '@/context/StudioContext';
import Navbar from '@/components/layout/Navbar';
import StudioSidebar from '@/components/layout/StudioSidebar';
import Step1Clothing from '@/components/studio/Step1Clothing';
import Step2Model from '@/components/studio/Step2Model';
import Step3Scene from '@/components/studio/Step3Scene';
import Step4Style from '@/components/studio/Step4Style';
import Step5CinematicGenerating from '@/components/studio/Step5CinematicGenerating';
import Step6ResultReview from '@/components/studio/Step6ResultReview';
import Step7Animation from '@/components/studio/Step7Animation';
import Step8VideoResult from '@/components/studio/Step8VideoResult';
import StickyActionBar from '@/components/studio/StickyActionBar';
import ComparisonModal from '@/components/studio/ComparisonModal';
import SelectiveRegenModal from '@/components/studio/SelectiveRegenModal';
import ProjectDashboard from '@/components/dashboard/ProjectDashboard';
import AssetLibraryView from '@/components/library/AssetLibraryView';
import TimelineWorkspace from '@/components/studio/TimelineWorkspace';

export default function Home() {
  const { currentStep, activeTab } = useStudio();

  return (
    <div className="min-h-screen flex flex-col bg-[#09090b] text-white">
      {/* Top Luxury Navbar */}
      <Navbar />

      {/* Main Workspace Layout */}
      <div className="flex-1 flex w-full">
        {activeTab === 'studio' ? (
          <>
            {/* Left Fixed Studio Stepper Sidebar */}
            <div className="hidden md:block">
              <StudioSidebar />
            </div>

            {/* Studio Main Canvas */}
            <main className="flex-1 flex flex-col justify-between overflow-x-hidden min-h-[calc(100vh-4rem)]">
              <div className="flex-1 max-w-6xl w-full mx-auto px-6 py-8">
                {currentStep === 'clothing' && <Step1Clothing />}
                {currentStep === 'model' && <Step2Model />}
                {currentStep === 'scene' && <Step3Scene />}
                {currentStep === 'style' && <Step4Style />}
                {currentStep === 'generating' && <Step5CinematicGenerating />}
                {currentStep === 'review' && <Step6ResultReview />}
                {currentStep === 'animate' && <Step7Animation />}
                {currentStep === 'video_result' && <Step8VideoResult />}
              </div>

              {/* Sticky Action Footer */}
              <StickyActionBar />
            </main>
          </>
        ) : (
          /* Other Tabs: Dashboard / Library / Timeline */
          <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8">
            {activeTab === 'dashboard' && <ProjectDashboard />}
            {activeTab === 'library' && <AssetLibraryView />}
            {activeTab === 'timeline' && <TimelineWorkspace />}
          </main>
        )}
      </div>

      {/* Global Modals */}
      <ComparisonModal />
      <SelectiveRegenModal />
    </div>
  );
}
