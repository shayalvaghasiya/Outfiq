'use client';

import React, { useState } from 'react';
import { useStudio } from '@/context/StudioContext';
import { 
  X, 
  RotateCw, 
  Lock, 
  ShieldCheck, 
  Sliders, 
  Camera, 
  Sun, 
  Compass, 
  User, 
  Shirt 
} from 'lucide-react';

export default function SelectiveRegenModal() {
  const { isRegenModalOpen, setIsRegenModalOpen, regenerateWithLock } = useStudio();
  const [selectedTarget, setSelectedTarget] = useState<string>('pose');

  if (!isRegenModalOpen) return null;

  const targets = [
    { id: 'pose', label: 'Pose & Stance', icon: Sliders, desc: 'Keep garments & model face locked, generate a new posture.' },
    { id: 'camera', label: 'Camera & Framing', icon: Camera, desc: 'Switch between full body, 3/4, or close-up perspective.' },
    { id: 'lighting', label: 'Lighting Mood', icon: Sun, desc: 'Shift light temperature without altering scene geometry.' },
    { id: 'background', label: 'Scene Environment', icon: Compass, desc: 'Unlock background plate only; clothing & model stay locked.' },
    { id: 'model', label: 'Model Identity', icon: User, desc: 'Try this exact outfit on a different studio model.' },
    { id: 'seed', label: 'Micro Seed Variation', icon: RotateCw, desc: 'Subtle alternate synthesis with identical parameters.' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl border border-white/[0.1] bg-[#121215] p-6 sm:p-8 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b border-white/[0.08] pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="rounded bg-amber-500/10 px-2 py-0.5 text-[10px] font-mono text-amber-300 border border-amber-500/20">
                CONTROLLED DRIFT PREVENTION
              </span>
            </div>
            <h3 className="text-lg font-semibold text-white">
              What would you like to change?
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              Only the selected element will vary. All other references remain strictly locked.
            </p>
          </div>

          <button 
            onClick={() => setIsRegenModalOpen(false)}
            className="rounded-xl p-1.5 text-zinc-400 hover:bg-white/[0.05] hover:text-white transition-all cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Options Grid */}
        <div className="space-y-2.5">
          {targets.map((t) => {
            const Icon = t.icon;
            const isSelected = selectedTarget === t.id;
            return (
              <div
                key={t.id}
                onClick={() => setSelectedTarget(t.id)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? 'border-white bg-white/[0.06] shadow-md'
                    : 'border-white/[0.05] bg-white/[0.02] hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${isSelected ? 'bg-white text-zinc-950' : 'bg-white/[0.05] text-zinc-400'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-white">{t.label}</h4>
                    <p className="text-[11px] text-zinc-400">{t.desc}</p>
                  </div>
                </div>

                <div className={`h-4 w-4 rounded-full border flex items-center justify-center ${
                  isSelected ? 'border-white bg-white' : 'border-zinc-700'
                }`}>
                  {isSelected && <div className="h-1.5 w-1.5 rounded-full bg-zinc-950" />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Guarantee Banner */}
        <div className="p-3.5 rounded-2xl bg-black/40 border border-white/[0.06] flex items-center gap-2.5 text-xs text-zinc-300">
          <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>Everything else will remain locked. Outfit colors and branding are 100% preserved.</span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/[0.08]">
          <button
            onClick={() => setIsRegenModalOpen(false)}
            className="rounded-xl px-4 py-2.5 text-xs font-medium text-zinc-400 hover:text-white transition-all cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={() => regenerateWithLock(selectedTarget)}
            className="flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-xs font-semibold text-zinc-950 hover:bg-zinc-200 transition-all shadow-lg cursor-pointer"
          >
            <RotateCw className="w-3.5 h-3.5 text-zinc-950" />
            <span>Regenerate with Lock</span>
          </button>
        </div>

      </div>
    </div>
  );
}
