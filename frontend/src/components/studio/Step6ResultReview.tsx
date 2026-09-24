'use client';

import React, { useState } from 'react';
import { useStudio } from '@/context/StudioContext';
import { 
  Check, 
  Sparkles, 
  RotateCw, 
  Sliders, 
  Download, 
  Columns, 
  ShieldCheck, 
  Film, 
  Maximize2, 
  ExternalLink,
  Lock,
  ChevronRight
} from 'lucide-react';
import { formatPercentage } from '@/lib/utils';
import confetti from 'canvas-confetti';

export default function Step6ResultReview() {
  const { 
    currentGeneration, 
    approveGeneration, 
    setStep, 
    setComparisonMode,
    setIsRegenModalOpen
  } = useStudio();

  const [isZoomed, setIsZoomed] = useState<boolean>(false);

  if (!currentGeneration) return null;

  const garment = currentGeneration.clothingItems[0];
  const model = currentGeneration.model;
  const scene = currentGeneration.scene;
  const fidelity = currentGeneration.fidelityScore;

  const handleApprove = () => {
    approveGeneration();
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = currentGeneration.outputImageUrl;
    link.download = `outfiq-fashion-${currentGeneration.id}.jpg`;
    link.click();
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Top Banner if Approved */}
      {currentGeneration.isApproved && (
        <div className="flex items-center justify-between rounded-2xl bg-emerald-500/10 border border-emerald-500/20 px-6 py-4 animate-in slide-in-from-top-2 duration-300">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
              <Check className="h-4 w-4 stroke-[3]" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Your look is ready and approved.</h4>
              <p className="text-xs text-emerald-300/80">Approved for video animation and high-resolution export.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setStep('animate')}
              className="flex items-center gap-2 rounded-xl bg-white px-5 py-2 text-xs font-semibold text-zinc-950 hover:bg-zinc-200 transition-all shadow-lg"
            >
              <Film className="w-3.5 h-3.5 text-zinc-950" />
              <span>Animate to Video</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Main Studio Viewport: 3-column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: References (3 cols) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
              Reference Assets
            </h3>
            <span className="flex items-center gap-1 text-[10px] text-amber-300 font-mono">
              <Lock className="w-3 h-3" />
              <span>LOCKED</span>
            </span>
          </div>

          {/* Clothing Reference */}
          {garment && (
            <div className="rounded-2xl border border-white/[0.08] bg-[#121215] p-3.5 space-y-2.5">
              <span className="text-[10px] font-mono uppercase text-zinc-500">01 Garment Reference</span>
              <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-black">
                <img src={garment.imageUrl} alt={garment.name} className="h-full w-full object-cover" />
                <span className="absolute bottom-2 left-2 rounded bg-black/70 px-2 py-0.5 text-[9px] font-mono text-zinc-300 backdrop-blur-sm">
                  {garment.category}
                </span>
              </div>
              <div>
                <p className="text-xs font-medium text-white truncate">{garment.name}</p>
                <p className="text-[11px] text-zinc-400">{garment.color}</p>
              </div>
            </div>
          )}

          {/* Model Reference */}
          {model && (
            <div className="rounded-2xl border border-white/[0.08] bg-[#121215] p-3.5 space-y-2.5">
              <span className="text-[10px] font-mono uppercase text-zinc-500">02 Model Identity</span>
              <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-black">
                <img src={model.thumbnailUrl} alt={model.name} className="h-full w-full object-cover object-top" />
                <span className="absolute bottom-2 left-2 rounded bg-black/70 px-2 py-0.5 text-[9px] font-mono text-zinc-300 backdrop-blur-sm">
                  {model.code}
                </span>
              </div>
              <div>
                <p className="text-xs font-medium text-white">{model.name}</p>
                <p className="text-[11px] text-zinc-400">{model.gender}</p>
              </div>
            </div>
          )}

          {/* Background Scene Reference */}
          {scene && (
            <div className="rounded-2xl border border-white/[0.08] bg-[#121215] p-3.5 space-y-2.5">
              <span className="text-[10px] font-mono uppercase text-zinc-500">03 Scene Plate</span>
              <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black">
                <img src={scene.imageUrl} alt={scene.name} className="h-full w-full object-cover" />
                <span className="absolute bottom-2 left-2 rounded bg-black/70 px-2 py-0.5 text-[9px] font-mono text-zinc-300 backdrop-blur-sm">
                  {scene.category}
                </span>
              </div>
              <p className="text-xs font-medium text-white truncate">{scene.name}</p>
            </div>
          )}
        </div>

        {/* CENTER COLUMN: Large Generated Image (6 cols) */}
        <div className="lg:col-span-6 flex flex-col items-center space-y-4">
          <div className="relative w-full rounded-2xl overflow-hidden border border-white/[0.12] bg-[#0c0c0e] shadow-2xl group">
            
            {/* Aspect Container */}
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-zinc-950 flex items-center justify-center">
              <img
                src={currentGeneration.outputImageUrl}
                alt="Generated Fashion Look"
                className="h-full w-full object-cover object-center transition-transform duration-700"
              />

              {/* Floating Top Bar on image */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                <div className="pointer-events-auto rounded-full bg-black/70 backdrop-blur-md px-3 py-1 text-xs font-mono text-white border border-white/10 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  <span>OUTPUT · {currentGeneration.id}</span>
                </div>

                <div className="pointer-events-auto flex items-center gap-2">
                  <button
                    onClick={() => setComparisonMode('slider')}
                    className="flex items-center gap-1.5 rounded-full bg-black/70 backdrop-blur-md px-3 py-1 text-xs font-medium text-zinc-200 border border-white/10 hover:bg-black/90 transition-all cursor-pointer"
                  >
                    <Columns className="w-3.5 h-3.5" />
                    <span>Compare</span>
                  </button>
                </div>
              </div>

              {/* Bottom Subtle Proof watermark */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-white/60 bg-black/40 backdrop-blur-md p-2.5 rounded-xl border border-white/10 pointer-events-none">
                <span>GEMINI 2.0 FLASH DIFFUSION</span>
                <span>SEED: {currentGeneration.seed}</span>
              </div>
            </div>

          </div>

          {/* Quick Action bar underneath image */}
          <div className="flex items-center gap-3 w-full">
            <button
              onClick={() => setComparisonMode('split')}
              className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] py-2.5 text-xs font-medium text-zinc-300 border border-white/[0.08] transition-all cursor-pointer"
            >
              <Columns className="w-4 h-4 text-zinc-400" />
              <span>Split Comparison</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center justify-center gap-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] px-4 py-2.5 text-xs font-medium text-zinc-300 border border-white/[0.08] transition-all cursor-pointer"
            >
              <Download className="w-4 h-4 text-zinc-400" />
              <span>Download</span>
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Result & Fidelity Card (3 cols) */}
        <div className="lg:col-span-3 space-y-6">
          
          <div className="rounded-2xl border border-white/[0.1] bg-[#121215] p-6 space-y-6 shadow-2xl">
            
            {/* Header */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                  Audit Verdict
                </span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  PASSED
                </span>
              </div>
              <h3 className="text-base font-semibold text-white">
                Reference Fidelity
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Vision audit confirmed 100% adherence to supplied references.
              </p>
            </div>

            {/* Fidelity Meters */}
            <div className="space-y-4 pt-1">
              
              {/* Clothing Match */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-400">Clothing Fidelity</span>
                  <span className="font-mono font-semibold text-emerald-400">
                    {formatPercentage(fidelity.clothingMatch)}
                  </span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-zinc-800 overflow-hidden">
                  <div 
                    className="h-full bg-emerald-400 rounded-full" 
                    style={{ width: `${fidelity.clothingMatch * 100}%` }} 
                  />
                </div>
              </div>

              {/* Model Match */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-400">Model Identity</span>
                  <span className="font-mono font-semibold text-emerald-400">
                    {formatPercentage(fidelity.modelMatch)}
                  </span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-zinc-800 overflow-hidden">
                  <div 
                    className="h-full bg-emerald-400 rounded-full" 
                    style={{ width: `${fidelity.modelMatch * 100}%` }} 
                  />
                </div>
              </div>

              {/* Scene Match */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-400">Scene Geometry</span>
                  <span className="font-mono font-semibold text-emerald-400">
                    {formatPercentage(fidelity.sceneMatch)}
                  </span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-zinc-800 overflow-hidden">
                  <div 
                    className="h-full bg-emerald-400 rounded-full" 
                    style={{ width: `${fidelity.sceneMatch * 100}%` }} 
                  />
                </div>
              </div>

            </div>

            {/* Status Indicator */}
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1">
              <span className="text-[10px] font-mono text-zinc-500 uppercase">Current Status:</span>
              <p className="text-xs font-medium text-white flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                {currentGeneration.isApproved ? 'Approved for Video Production' : 'Ready to review'}
              </p>
            </div>

            {/* Primary Action Buttons */}
            <div className="space-y-2.5 pt-2">
              {!currentGeneration.isApproved ? (
                <>
                  <button
                    onClick={handleApprove}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-white py-3 px-4 text-xs font-semibold text-zinc-950 hover:bg-zinc-200 transition-all shadow-xl cursor-pointer"
                  >
                    <Check className="w-4 h-4 text-zinc-950 stroke-[2.5]" />
                    <span>Approve Look</span>
                  </button>

                  <button
                    onClick={() => setIsRegenModalOpen(true)}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] py-3 px-4 text-xs font-medium text-zinc-200 border border-white/[0.08] transition-all cursor-pointer"
                  >
                    <RotateCw className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Regenerate (Selective)</span>
                  </button>

                  <button
                    onClick={() => setStep('style')}
                    className="w-full flex items-center justify-center gap-2 rounded-xl py-2 text-xs font-medium text-zinc-400 hover:text-white transition-all cursor-pointer"
                  >
                    <Sliders className="w-3.5 h-3.5" />
                    <span>Adjust Shot Configuration</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setStep('animate')}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-white py-3.5 px-4 text-xs font-semibold text-zinc-950 hover:bg-zinc-200 transition-all shadow-xl cursor-pointer"
                  >
                    <Film className="w-4 h-4 text-zinc-950" />
                    <span>Bring to Life (Animate)</span>
                  </button>

                  <button
                    onClick={() => {
                      setStep('style');
                    }}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] py-2.5 px-4 text-xs font-medium text-zinc-200 border border-white/[0.08] transition-all cursor-pointer"
                  >
                    <span>Create Another Variation</span>
                  </button>

                  <button
                    onClick={handleDownload}
                    className="w-full flex items-center justify-center gap-2 rounded-xl py-2 text-xs font-medium text-zinc-400 hover:text-white transition-all cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Image</span>
                  </button>
                </>
              )}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
