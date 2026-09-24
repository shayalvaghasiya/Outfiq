'use client';

import React from 'react';
import { useStudio } from '@/context/StudioContext';
import { ShieldCheck, Sparkles, FolderKanban, Layers, Film, Sliders, ChevronDown } from 'lucide-react';

export default function Navbar() {
  const { activeTab, setActiveTab, activeProject, currentStep, setStep } = useStudio();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-[#09090b]/80 backdrop-blur-xl transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        
        {/* Brand Header */}
        <div className="flex items-center gap-8">
          <div 
            onClick={() => { setActiveTab('dashboard'); setStep('dashboard'); }}
            className="group flex cursor-pointer items-center gap-3.5"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.06] border border-white/[0.1] text-white shadow-inner group-hover:border-white/20 transition-all">
              <span className="font-serif text-lg font-bold tracking-wider">O</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-sans text-base font-semibold tracking-widest text-white uppercase">
                  Outfiq
                </span>
                <span className="rounded-full bg-white/[0.07] px-2 py-0.5 text-[10px] font-medium tracking-wider text-zinc-400 border border-white/[0.05]">
                  STUDIO
                </span>
              </div>
              <span className="text-[10px] tracking-wider text-zinc-500 font-mono">
                AI FASHION ATELIER
              </span>
            </div>
          </div>

          {/* Nav Tabs */}
          <nav className="hidden md:flex items-center gap-1 rounded-full bg-white/[0.03] p-1 border border-white/[0.06]">
            <button
              onClick={() => { setActiveTab('studio'); if (currentStep === 'dashboard') setStep('clothing'); }}
              className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                activeTab === 'studio'
                  ? 'bg-white/10 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]'
              }`}
            >
              <Sparkles className="h-3.5 w-3.5 text-zinc-400" />
              <span>Studio</span>
            </button>

            <button
              onClick={() => { setActiveTab('dashboard'); setStep('dashboard'); }}
              className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-white/10 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]'
              }`}
            >
              <FolderKanban className="h-3.5 w-3.5 text-zinc-400" />
              <span>Projects</span>
            </button>

            <button
              onClick={() => { setActiveTab('library'); }}
              className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                activeTab === 'library'
                  ? 'bg-white/10 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]'
              }`}
            >
              <Layers className="h-3.5 w-3.5 text-zinc-400" />
              <span>Asset Library</span>
            </button>
          </nav>
        </div>

        {/* Current Project Pill & Engine Status */}
        <div className="flex items-center gap-4">
          
          {/* Active Project Indicator */}
          <div className="hidden lg:flex items-center gap-2.5 rounded-full bg-white/[0.03] px-3.5 py-1.5 border border-white/[0.06]">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-zinc-400 font-mono">PROJECT:</span>
            <span className="text-xs font-medium text-zinc-200 max-w-[150px] truncate">
              {activeProject?.name || 'Fall/Winter 2026'}
            </span>
          </div>

          {/* Reference Lock Badge */}
          <div className="flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 border border-amber-500/20 text-amber-300">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span className="text-[11px] font-medium tracking-wide">
              REFERENCE LOCKED
            </span>
          </div>

          {/* Gemini Engine badge */}
          <div className="hidden sm:flex items-center gap-1.5 rounded-full bg-violet-500/10 px-3 py-1 border border-violet-500/20 text-violet-300">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
            <span className="text-[11px] font-medium tracking-wide">
              GEMINI 2.0
            </span>
          </div>

          {/* User Avatar */}
          <div className="flex items-center gap-2 cursor-pointer rounded-full p-1 hover:bg-white/[0.05] transition-all">
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-zinc-700 to-zinc-500 border border-white/20 flex items-center justify-center text-xs font-medium text-white">
              ED
            </div>
            <ChevronDown className="h-3.5 w-3.5 text-zinc-500" />
          </div>

        </div>

      </div>
    </header>
  );
}
