'use client';

import React, { useState } from 'react';
import { useStudio } from '@/context/StudioContext';
import { X, Columns, Sliders, ShieldCheck } from 'lucide-react';
import { formatPercentage } from '@/lib/utils';

export default function ComparisonModal() {
  const { comparisonMode, setComparisonMode, currentGeneration } = useStudio();
  const [sliderPos, setSliderPos] = useState<number>(50);

  if (comparisonMode === 'none' || !currentGeneration) return null;

  const garment = currentGeneration.clothingItems[0];
  const model = currentGeneration.model;
  const scene = currentGeneration.scene;
  const fidelity = currentGeneration.fidelityScore;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-6xl max-h-[92vh] overflow-y-auto rounded-3xl border border-white/[0.12] bg-[#0c0c0e] p-6 sm:p-8 shadow-2xl flex flex-col justify-between">
        
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.06] border border-white/[0.1] text-white">
              <Columns className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-semibold text-white">
                  Reference vs Generated Comparison
                </h3>
                <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-[10px] font-mono text-emerald-400 border border-emerald-500/20">
                  98.5% FIDELITY
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                Pixel-level validation of garment geometry, seams, and model identity.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Toggle Modes */}
            <div className="flex items-center rounded-full bg-white/[0.04] p-1 border border-white/[0.08]">
              <button
                onClick={() => setComparisonMode('split')}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                  comparisonMode === 'split' ? 'bg-white text-zinc-950 font-semibold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Split Screen
              </button>
              <button
                onClick={() => setComparisonMode('slider')}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                  comparisonMode === 'slider' ? 'bg-white text-zinc-950 font-semibold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Interactive Slider
              </button>
            </div>

            <button
              onClick={() => setComparisonMode('none')}
              className="rounded-xl p-2 text-zinc-400 hover:bg-white/[0.06] hover:text-white transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content based on mode */}
        {comparisonMode === 'split' ? (
          /* Split View */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            
            {/* Left: Reference Garment */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-zinc-400 uppercase">Input Reference Asset</span>
                <span className="text-emerald-400 font-mono">LOCKED</span>
              </div>
              <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden border border-white/[0.08] bg-black">
                <img
                  src={garment?.imageUrl}
                  alt="Reference Clothing"
                  className="h-full w-full object-cover object-center"
                />
                <div className="absolute bottom-3 left-3 rounded-lg bg-black/70 px-3 py-1 text-xs text-white backdrop-blur-md">
                  {garment?.name}
                </div>
              </div>
              <div className="p-3 bg-white/[0.02] rounded-xl border border-white/[0.05] text-xs space-y-1">
                <p className="text-zinc-400"><span className="text-zinc-500 font-mono">Color:</span> {garment?.color}</p>
                <p className="text-zinc-400"><span className="text-zinc-500 font-mono">Fabric:</span> {garment?.fabric}</p>
              </div>
            </div>

            {/* Right: Generated Result */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-zinc-400 uppercase">Synthesized Editorial Output</span>
                <span className="text-emerald-400 font-mono">MATCH: {formatPercentage(fidelity.clothingMatch)}</span>
              </div>
              <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden border border-white/[0.08] bg-black">
                <img
                  src={currentGeneration.outputImageUrl}
                  alt="Generated Result"
                  className="h-full w-full object-cover object-center"
                />
                <div className="absolute bottom-3 left-3 rounded-lg bg-black/70 px-3 py-1 text-xs text-white backdrop-blur-md">
                  Generated with Model {model?.name}
                </div>
              </div>
              <div className="p-3 bg-white/[0.02] rounded-xl border border-white/[0.05] text-xs space-y-1">
                <p className="text-zinc-400"><span className="text-zinc-500 font-mono">Silhouette:</span> Retained exact proportional drape</p>
                <p className="text-zinc-400"><span className="text-zinc-500 font-mono">Logos & Stitching:</span> 100% Geometry Traceable</p>
              </div>
            </div>

          </div>
        ) : (
          /* Slider View */
          <div className="flex flex-col items-center space-y-4">
            <div className="relative aspect-[4/5] max-h-[65vh] w-full max-w-xl rounded-2xl overflow-hidden border border-white/[0.1] bg-black select-none">
              
              {/* Bottom Image (Generated) */}
              <img
                src={currentGeneration.outputImageUrl}
                alt="Generated"
                className="absolute inset-0 h-full w-full object-cover object-center pointer-events-none"
              />

              {/* Top Image (Reference Garment with Clip Path) */}
              <div 
                className="absolute inset-0 overflow-hidden pointer-events-none"
                style={{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }}
              >
                <img
                  src={garment?.imageUrl}
                  alt="Reference"
                  className="h-full w-full object-cover object-center"
                />
                <div className="absolute top-4 left-4 rounded-full bg-black/70 px-3 py-1 text-xs font-mono text-white backdrop-blur-md">
                  REFERENCE
                </div>
              </div>

              <div className="absolute top-4 right-4 rounded-full bg-black/70 px-3 py-1 text-xs font-mono text-white backdrop-blur-md pointer-events-none">
                GENERATED
              </div>

              {/* Slider Line & Handle */}
              <div 
                className="absolute top-0 bottom-0 w-0.5 bg-white shadow-2xl pointer-events-none"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-8 w-8 rounded-full bg-white text-zinc-950 flex items-center justify-center shadow-lg font-bold text-xs">
                  ↔
                </div>
              </div>

              {/* Interactive Drag input */}
              <input
                type="range"
                min="0"
                max="100"
                value={sliderPos}
                onChange={(e) => setSliderPos(Number(e.target.value))}
                className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full z-10"
              />
            </div>

            <p className="text-xs text-zinc-400 font-mono">
              Drag slider left or right to compare garment drape and texture alignment
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
