'use client';

import React, { useState } from 'react';
import { useStudio } from '@/context/StudioContext';
import { 
  Shirt, 
  User, 
  Compass, 
  Image as ImageIcon, 
  Film, 
  Plus, 
  Download, 
  Lock, 
  Sparkles,
  ExternalLink
} from 'lucide-react';

export default function AssetLibraryView() {
  const { 
    clothingItems, 
    models, 
    scenes, 
    generationHistory, 
    videoHistory, 
    setActiveTab, 
    setStep,
    selectModel,
    selectScene,
    toggleClothingSelection
  } = useStudio();

  const [activeTab, setActiveTabFilter] = useState<'clothing' | 'models' | 'backgrounds' | 'images' | 'videos'>('clothing');

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Asset Library
          </h1>
          <p className="mt-1 text-sm text-zinc-400">
            Reusable catalog of analyzed garments, verified models, scene environments, and final renders.
          </p>
        </div>

        <button
          onClick={() => {
            setActiveTab('studio');
            setStep('clothing');
          }}
          className="flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-xs font-semibold text-zinc-950 hover:bg-zinc-200 transition-all shadow-md self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4 text-zinc-950" />
          <span>Upload to Studio</span>
        </button>
      </div>

      {/* Tabs Filter Bar */}
      <div className="flex items-center gap-2 border-b border-white/[0.08] pb-4 overflow-x-auto scrollbar-hide">
        {[
          { id: 'clothing' as const, label: 'Clothing', count: clothingItems.length, icon: Shirt },
          { id: 'models' as const, label: 'Models', count: models.length, icon: User },
          { id: 'backgrounds' as const, label: 'Backgrounds', count: scenes.length, icon: Compass },
          { id: 'images' as const, label: 'Generated Images', count: generationHistory.length, icon: ImageIcon },
          { id: 'videos' as const, label: 'Videos', count: videoHistory.length, icon: Film }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTabFilter(tab.id)}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition-all ${
                isActive
                  ? 'bg-white text-zinc-950 font-semibold shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-mono ${
                isActive ? 'bg-zinc-200 text-zinc-950' : 'bg-white/[0.06] text-zinc-400'
              }`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      {activeTab === 'clothing' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {clothingItems.map((item) => (
            <div key={item.id} className="group overflow-hidden rounded-2xl border border-white/[0.08] bg-[#121215] flex flex-col justify-between">
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-black">
                <img src={item.imageUrl} alt={item.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <span className="absolute top-3 left-3 rounded-full bg-black/70 px-2.5 py-1 text-[10px] font-mono text-white backdrop-blur-md">
                  {item.category}
                </span>
                <span className="absolute top-3 right-3 rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] font-mono text-amber-300 backdrop-blur-md border border-amber-500/30">
                  LOCKED
                </span>
              </div>
              <div className="p-4 space-y-2">
                <h3 className="text-sm font-semibold text-white truncate">{item.name}</h3>
                <p className="text-xs text-zinc-400">{item.color} · {item.fabric}</p>
                <button
                  onClick={() => {
                    toggleClothingSelection(item.id);
                    setActiveTab('studio');
                    setStep('clothing');
                  }}
                  className="w-full mt-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] py-2 text-xs font-medium text-white transition-all border border-white/[0.06]"
                >
                  Use in Look
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'models' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {models.map((model) => (
            <div key={model.id} className="group overflow-hidden rounded-2xl border border-white/[0.08] bg-[#121215] flex flex-col justify-between">
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-black">
                <img src={model.thumbnailUrl} alt={model.name} className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105" />
                <span className="absolute top-3 right-3 rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] font-mono text-amber-300 backdrop-blur-md border border-amber-500/30">
                  ID LOCKED
                </span>
              </div>
              <div className="p-3.5 space-y-1.5">
                <h3 className="text-xs font-semibold text-white truncate">{model.name}</h3>
                <p className="text-[11px] text-zinc-400">{model.gender} · {model.code}</p>
                <button
                  onClick={() => {
                    selectModel(model.id);
                    setActiveTab('studio');
                    setStep('style');
                  }}
                  className="w-full mt-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] py-1.5 text-xs font-medium text-white transition-all border border-white/[0.06]"
                >
                  Select Model
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'backgrounds' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {scenes.map((scene) => (
            <div key={scene.id} className="group overflow-hidden rounded-2xl border border-white/[0.08] bg-[#121215] flex flex-col justify-between">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                <img src={scene.imageUrl} alt={scene.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <span className="absolute top-3 left-3 rounded-full bg-black/70 px-2.5 py-1 text-[10px] font-mono text-white backdrop-blur-md">
                  {scene.category}
                </span>
              </div>
              <div className="p-4 space-y-2">
                <h3 className="text-sm font-semibold text-white truncate">{scene.name}</h3>
                <p className="text-xs text-zinc-400 line-clamp-1">{scene.description}</p>
                <button
                  onClick={() => {
                    selectScene(scene.id);
                    setActiveTab('studio');
                    setStep('style');
                  }}
                  className="w-full mt-1 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] py-2 text-xs font-medium text-white transition-all border border-white/[0.06]"
                >
                  Set as Background
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'images' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {generationHistory.map((gen) => (
            <div key={gen.id} className="group overflow-hidden rounded-2xl border border-white/[0.08] bg-[#121215] flex flex-col justify-between">
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-black">
                <img src={gen.outputImageUrl} alt="Generated look" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <span className="absolute top-3 left-3 rounded-full bg-black/70 px-2.5 py-1 text-[10px] font-mono text-emerald-400 backdrop-blur-md">
                  98.5% FIDELITY
                </span>
              </div>
              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-white truncate">Look #{gen.id.slice(-4)}</span>
                  <span className="text-zinc-500 font-mono text-[11px]">{gen.timestamp}</span>
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => {
                      setActiveTab('studio');
                      setStep('review');
                    }}
                    className="flex-1 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] py-2 text-xs font-medium text-white transition-all border border-white/[0.06]"
                  >
                    View & Animate
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'videos' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {videoHistory.map((vid) => (
            <div key={vid.id} className="group overflow-hidden rounded-2xl border border-white/[0.08] bg-[#121215] flex flex-col justify-between">
              <div className="relative aspect-video w-full overflow-hidden bg-black flex items-center justify-center">
                <img src={vid.thumbnailUrl} alt="Video thumb" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                    <Film className="w-5 h-5" />
                  </div>
                </div>
                <span className="absolute bottom-3 right-3 rounded bg-black/70 px-2 py-0.5 text-[10px] font-mono text-white">
                  {vid.duration}s
                </span>
              </div>
              <div className="p-4 space-y-2">
                <h3 className="text-sm font-semibold text-white">{vid.config.title}</h3>
                <p className="text-xs text-zinc-400">Frame consistency: 99.2% verified</p>
                <button
                  onClick={() => {
                    setActiveTab('studio');
                    setStep('video_result');
                  }}
                  className="w-full rounded-xl bg-white/[0.05] hover:bg-white/[0.1] py-2 text-xs font-medium text-white transition-all border border-white/[0.06]"
                >
                  Play Full Video
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
