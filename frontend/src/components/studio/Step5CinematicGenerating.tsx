'use client';

import React from 'react';
import { useStudio } from '@/context/StudioContext';
import { Check, Loader2, Sparkles, ShieldCheck } from 'lucide-react';

export default function Step5CinematicGenerating() {
  const { generationStage, activeProject, clothingItems, selectedClothingIds, models, selectedModelId } = useStudio();

  const selectedGarment = clothingItems.find(c => selectedClothingIds.includes(c.id));
  const selectedModel = models.find(m => m.id === selectedModelId);

  const stages = [
    { title: 'Preparing references', desc: 'Locking garment stitching & facial vectors' },
    { title: 'Building composition', desc: 'Aligning light angles and perspective grid' },
    { title: 'Generating', desc: 'Synthesizing photorealistic editorial look' },
    { title: 'Checking fidelity', desc: 'Validating textile & logo match against reference' }
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 animate-in fade-in duration-500">
      
      {/* Center Cinematic Container */}
      <div className="relative w-full max-w-xl text-center space-y-8">
        
        {/* Shimmering Ambient Glow Behind */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full bg-violet-600/10 blur-[100px] pointer-events-none" />

        {/* Studio Badge */}
        <div className="inline-flex items-center gap-2 rounded-full bg-white/[0.05] px-3.5 py-1.5 border border-white/[0.08]">
          <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" />
          <span className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase">
            Outfiq Atelier Engine
          </span>
        </div>

        {/* Title & Subtitle */}
        <div className="space-y-2">
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Creating your look
          </h2>
          <p className="text-sm text-zinc-400">
            Applying reference locks to garment construction and model identity.
          </p>
        </div>

        {/* Visual Progress Box */}
        <div className="rounded-2xl border border-white/[0.08] bg-[#121215]/80 backdrop-blur-xl p-6 sm:p-8 space-y-6 shadow-2xl text-left">
          
          <div className="space-y-4">
            {stages.map((st, idx) => {
              const isDone = generationStage > idx;
              const isCurrent = generationStage === idx;
              const isPending = generationStage < idx;

              return (
                <div key={st.title} className="flex items-center justify-between py-2 border-b border-white/[0.04] last:border-0">
                  <div className="flex items-center gap-3.5">
                    {/* Status Dot / Check / Spinner */}
                    <div className="flex h-6 w-6 items-center justify-center">
                      {isDone && (
                        <div className="h-5 w-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                          <Check className="h-3 w-3 stroke-[3]" />
                        </div>
                      )}
                      {isCurrent && (
                        <div className="h-5 w-5 rounded-full bg-white/10 text-white flex items-center justify-center border border-white/20">
                          <Loader2 className="h-3 w-3 animate-spin text-zinc-200" />
                        </div>
                      )}
                      {isPending && (
                        <div className="h-2 w-2 rounded-full bg-zinc-700" />
                      )}
                    </div>

                    <div>
                      <p className={`text-sm font-medium transition-colors ${
                        isDone || isCurrent ? 'text-white' : 'text-zinc-500'
                      }`}>
                        {st.title}
                      </p>
                      <p className="text-[11px] text-zinc-500">
                        {st.desc}
                      </p>
                    </div>
                  </div>

                  {/* Right indicator */}
                  <span className="font-mono text-xs">
                    {isDone && <span className="text-emerald-400">✓</span>}
                    {isCurrent && <span className="text-zinc-400 animate-pulse">●</span>}
                    {isPending && <span className="text-zinc-600">○</span>}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Reference Preview Thumbnails Strip */}
          <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-zinc-400">
            <span className="font-mono text-[10px] text-zinc-500 uppercase">Input References:</span>
            <div className="flex items-center gap-2">
              {selectedGarment && (
                <div className="flex items-center gap-1.5 rounded-md bg-white/[0.04] px-2 py-1 border border-white/[0.06]">
                  <img src={selectedGarment.imageUrl} alt="garment" className="h-4 w-4 rounded object-cover" />
                  <span className="text-[11px] text-zinc-300 truncate max-w-[100px]">{selectedGarment.name}</span>
                </div>
              )}
              {selectedModel && (
                <div className="flex items-center gap-1.5 rounded-md bg-white/[0.04] px-2 py-1 border border-white/[0.06]">
                  <img src={selectedModel.thumbnailUrl} alt="model" className="h-4 w-4 rounded object-cover" />
                  <span className="text-[11px] text-zinc-300">{selectedModel.name}</span>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
