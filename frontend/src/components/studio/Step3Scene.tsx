'use client';

import React, { useState, useRef } from 'react';
import { useStudio } from '@/context/StudioContext';
import { 
  Check, 
  Lock, 
  Upload, 
  Compass, 
  ShieldCheck, 
  SunMedium, 
  Sliders,
  Image as ImageIcon
} from 'lucide-react';
import { SceneBackground } from '@/types';

export default function Step3Scene() {
  const { 
    scenes, 
    selectedSceneId, 
    selectScene, 
    addCustomScene, 
    styleConfig, 
    togglePreserveBackground 
  } = useStudio();

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeTab, setActiveTab] = useState<'existing' | 'upload'>('existing');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = ['All', 'Studio', 'Minimal', 'Runway', 'Luxury', 'Street'];

  const filteredScenes = activeCategory === 'All' 
    ? scenes 
    : scenes.filter(s => s.category.toLowerCase() === activeCategory.toLowerCase());

  const handleCustomSceneUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];
    const objectUrl = URL.createObjectURL(file);

    const newScene: SceneBackground = {
      id: `custom-scene-${Date.now()}`,
      name: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
      category: 'Studio',
      description: 'Custom uploaded reference environment',
      lightingMood: 'Locked environmental lighting',
      imageUrl: objectUrl,
      preserveExact: true,
      isCustom: true
    };

    addCustomScene(newScene);
    selectScene(newScene.id);
    setActiveTab('existing');
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      
      {/* Heading */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="font-mono text-xs uppercase tracking-widest text-zinc-500 font-semibold">
            03 — Environment & Space
          </span>
          <span className="h-1 w-1 rounded-full bg-zinc-600" />
          <span className="text-xs text-zinc-500 font-mono">STEP 3 OF 4</span>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Choose your scene
        </h1>
        <p className="mt-2 text-sm text-zinc-400 max-w-2xl leading-relaxed">
          Select an architectural space or upload a location plate. The perspective, lighting temperature, and room geometry will realistically cast onto the garment.
        </p>
      </div>

      {/* Control Strip: Tabs, Filter Pills & Background Lock Switch */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
        
        {/* Left: View Tabs */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('existing')}
            className={`flex items-center gap-2 rounded-full px-5 py-2 text-xs font-medium transition-all ${
              activeTab === 'existing'
                ? 'bg-white text-zinc-950 font-semibold shadow-md'
                : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Backgrounds</span>
          </button>

          <button
            onClick={() => setActiveTab('upload')}
            className={`flex items-center gap-2 rounded-full px-5 py-2 text-xs font-medium transition-all ${
              activeTab === 'upload'
                ? 'bg-white text-zinc-950 font-semibold shadow-md'
                : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload Scene</span>
          </button>
        </div>

        {/* Right: Preserve Background Toggle (Default ON) */}
        <div className="flex items-center gap-3 bg-white/[0.03] border border-white/[0.08] rounded-full px-4 py-1.5">
          <div className="flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-xs font-medium text-white">Preserve exact background</span>
          </div>

          <button
            onClick={togglePreserveBackground}
            className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              styleConfig.preserveBackground ? 'bg-emerald-500' : 'bg-zinc-700'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                styleConfig.preserveBackground ? 'translate-x-4' : 'translate-x-0'
              }`}
            />
          </button>

          <span className="text-[10px] font-mono text-zinc-500">
            {styleConfig.preserveBackground ? 'LOCKED' : 'MODIFY'}
          </span>
        </div>

      </div>

      {/* Category Pills */}
      {activeTab === 'existing' && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-zinc-800 text-white border border-white/20 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 bg-white/[0.02] border border-white/[0.04]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Background Cards Grid */}
      {activeTab === 'existing' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredScenes.map((scene) => {
            const isSelected = selectedSceneId === scene.id;
            return (
              <div
                key={scene.id}
                onClick={() => selectScene(scene.id)}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-white/90 bg-zinc-900/90 ring-2 ring-white/50 shadow-2xl scale-[1.01]'
                    : 'border-white/[0.08] bg-[#121215] hover:border-white/20'
                }`}
              >
                {/* Scene Preview */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-950">
                  <img
                    src={scene.imageUrl}
                    alt={scene.name}
                    className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="rounded-full bg-black/70 backdrop-blur-md px-2.5 py-1 text-[10px] font-mono text-zinc-300 border border-white/10">
                      {scene.category}
                    </span>

                    <div className="flex items-center gap-1.5">
                      <div className="flex items-center gap-1 rounded-full bg-black/60 backdrop-blur-md px-2.5 py-1 text-[10px] font-mono text-amber-300 border border-amber-500/30">
                        <Lock className="w-2.5 h-2.5" />
                        <span>SCENE LOCKED</span>
                      </div>

                      <div className={`h-6 w-6 rounded-full flex items-center justify-center transition-all ${
                        isSelected
                          ? 'bg-white text-zinc-950 shadow-md'
                          : 'bg-black/50 text-white/50 border border-white/20'
                      }`}>
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
                      </div>
                    </div>
                  </div>

                  {/* Scene Name Over Image */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <h4 className="text-sm font-semibold text-white tracking-wide">
                      {scene.name}
                    </h4>
                    <p className="text-xs text-zinc-400 mt-0.5 line-clamp-1">
                      {scene.description}
                    </p>
                  </div>
                </div>

                {/* Lighting specs */}
                <div className="p-3.5 bg-white/[0.02] border-t border-white/[0.05] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-zinc-400">
                    <SunMedium className="w-3.5 h-3.5 text-amber-400" />
                    <span className="truncate max-w-[200px]">{scene.lightingMood}</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    HIGH FIDELITY
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Upload Scene Screen */
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="rounded-2xl border border-white/[0.1] bg-[#121215] p-8 text-center space-y-6">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/[0.05] border border-white/[0.1] text-zinc-300">
              <Compass className="w-5 h-5" />
            </div>

            <div className="space-y-1">
              <h3 className="text-base font-semibold text-white">Upload Custom Environment</h3>
              <p className="text-xs text-zinc-400 max-w-md mx-auto">
                Supply your brand's flagship store, runway, or bespoke studio photo. The space geometry and ambient shadows will be rigorously retained.
              </p>
            </div>

            <div
              onClick={() => fileInputRef.current?.click()}
              className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-white/20 bg-white/[0.02] p-10 cursor-pointer hover:border-white/40 hover:bg-white/[0.04] transition-all"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleCustomSceneUpload}
              />
              <Upload className="h-6 w-6 text-zinc-400 mb-2" />
              <p className="text-xs font-medium text-white">Drop scene photo here or click to browse</p>
              <p className="text-[11px] text-zinc-500 mt-1">Wide landscape photography recommended · 16:9 or 4:3</p>
            </div>

            <div className="flex items-center gap-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs text-left">
              <Lock className="w-4 h-4 flex-shrink-0" />
              <span>Background Locking Guarantee: Major interior objects and wall compositions are preserved without AI replacements.</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
