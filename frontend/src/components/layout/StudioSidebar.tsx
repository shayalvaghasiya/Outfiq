'use client';

import React from 'react';
import { useStudio } from '@/context/StudioContext';
import { 
  Shirt, 
  User, 
  Compass, 
  Sliders, 
  Sparkles, 
  FolderKanban, 
  Image as ImageIcon, 
  Film, 
  Settings, 
  Lock,
  CheckCircle2,
  Layers
} from 'lucide-react';
import { StudioStep } from '@/types';

export default function StudioSidebar() {
  const { currentStep, setStep, activeTab, setActiveTab, selectedClothingIds, selectedModelId, selectedSceneId } = useStudio();

  const studioSteps: { step: StudioStep; label: string; number: string; icon: any; isDone: boolean }[] = [
    { 
      step: 'clothing', 
      number: '01', 
      label: 'Clothes', 
      icon: Shirt,
      isDone: selectedClothingIds.length > 0
    },
    { 
      step: 'model', 
      number: '02', 
      label: 'Model', 
      icon: User,
      isDone: !!selectedModelId
    },
    { 
      step: 'scene', 
      number: '03', 
      label: 'Scene', 
      icon: Compass,
      isDone: !!selectedSceneId
    },
    { 
      step: 'style', 
      number: '04', 
      label: 'Style', 
      icon: Sliders,
      isDone: true
    },
    { 
      step: 'generating', 
      number: '05', 
      label: 'Generate', 
      icon: Sparkles,
      isDone: currentStep === 'review' || currentStep === 'animate' || currentStep === 'video_result'
    }
  ];

  return (
    <aside className="w-64 flex-shrink-0 border-r border-white/[0.08] bg-[#09090b] flex flex-col justify-between p-5 min-h-[calc(100vh-4rem)]">
      
      <div className="space-y-8">
        
        {/* CREATE SECTION */}
        <div>
          <div className="flex items-center justify-between px-2 mb-3">
            <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 font-semibold">
              Create
            </span>
            <div className="flex items-center gap-1 text-[10px] text-amber-400/80 font-mono">
              <Lock className="w-2.5 h-2.5" />
              <span>LOCK ON</span>
            </div>
          </div>

          <div className="space-y-1">
            {studioSteps.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === 'studio' && currentStep === item.step;
              return (
                <button
                  key={item.step}
                  onClick={() => {
                    setActiveTab('studio');
                    setStep(item.step);
                  }}
                  className={`w-full group flex items-center justify-between rounded-xl px-3 py-2.5 text-xs transition-all ${
                    isActive
                      ? 'bg-white text-zinc-950 font-semibold shadow-lg shadow-white/5'
                      : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`font-mono text-[11px] ${isActive ? 'text-zinc-500 font-semibold' : 'text-zinc-600'}`}>
                      {item.number}
                    </span>
                    <Icon className={`w-4 h-4 ${isActive ? 'text-zinc-900' : 'text-zinc-400 group-hover:text-zinc-200'}`} />
                    <span className="tracking-wide text-xs">{item.label}</span>
                  </div>

                  {item.isDone && !isActive && (
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/70" />
                  )}
                  {isActive && (
                    <div className="h-1.5 w-1.5 rounded-full bg-zinc-950" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* LIBRARY SECTION */}
        <div>
          <div className="px-2 mb-3">
            <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 font-semibold">
              Library
            </span>
          </div>

          <div className="space-y-1">
            <button
              onClick={() => {
                setActiveTab('dashboard');
                setStep('dashboard');
              }}
              className={`w-full flex items-center gap-3 rounded-xl px-3 py-2 text-xs transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-white/10 text-white font-medium'
                  : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <FolderKanban className="w-4 h-4 text-zinc-400" />
              <span>Projects</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('library');
              }}
              className={`w-full flex items-center gap-3 rounded-xl px-3 py-2 text-xs transition-all ${
                activeTab === 'library'
                  ? 'bg-white/10 text-white font-medium'
                  : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <Shirt className="w-4 h-4 text-zinc-400" />
              <span>Clothing</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('library');
              }}
              className="w-full flex items-center gap-3 rounded-xl px-3 py-2 text-xs text-zinc-400 hover:text-white hover:bg-white/[0.04] transition-all"
            >
              <User className="w-4 h-4 text-zinc-400" />
              <span>Models</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('library');
              }}
              className="w-full flex items-center gap-3 rounded-xl px-3 py-2 text-xs text-zinc-400 hover:text-white hover:bg-white/[0.04] transition-all"
            >
              <Compass className="w-4 h-4 text-zinc-400" />
              <span>Backgrounds</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('library');
              }}
              className="w-full flex items-center gap-3 rounded-xl px-3 py-2 text-xs text-zinc-400 hover:text-white hover:bg-white/[0.04] transition-all"
            >
              <Film className="w-4 h-4 text-zinc-400" />
              <span>Videos</span>
            </button>
          </div>
        </div>

      </div>

      {/* Bottom Info & Settings */}
      <div className="space-y-4 pt-6 border-t border-white/[0.08]">
        
        {/* Reference Lock Status Pill */}
        <div className="rounded-xl bg-white/[0.03] p-3 border border-white/[0.06]">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
              Studio Strict Mode
            </span>
            <span className="rounded bg-emerald-500/10 px-1.5 py-0.5 text-[9px] font-mono text-emerald-400">
              ACTIVE
            </span>
          </div>
          <p className="text-[11px] text-zinc-500 leading-relaxed">
            Zero hallucinations. All garments, logos & faces strictly locked to reference images.
          </p>
        </div>

        <button 
          onClick={() => alert("Studio Engine Settings: Gemini Vision 2.0 Flash active with 98.5% fidelity threshold.")}
          className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-zinc-400 hover:text-white hover:bg-white/[0.04] rounded-xl transition-all"
        >
          <Settings className="w-4 h-4 text-zinc-400" />
          <span>Studio Settings</span>
        </button>

      </div>

    </aside>
  );
}
