'use client';

import React from 'react';
import { useStudio } from '@/context/StudioContext';
import { Check, Film, Sparkles, ChevronRight, Lock, Clock } from 'lucide-react';
import { formatPercentage } from '@/lib/utils';

export default function TimelineWorkspace() {
  const { 
    activeProject, 
    generationHistory, 
    videoHistory, 
    setStep, 
    setActiveTab 
  } = useStudio();

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-mono text-zinc-500 uppercase">Version Tree</span>
          <span className="h-1 w-1 rounded-full bg-zinc-600" />
          <span className="text-xs text-emerald-400 font-mono">NON-DESTRUCTIVE AUDIT TRAIL</span>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Project Timeline & History
        </h1>
        <p className="mt-1 text-sm text-zinc-400">
          Traceable generation graph for <span className="text-white font-medium">{activeProject.name}</span>. Every generation retains its immutable seed, prompt snapshot, and reference hashes.
        </p>
      </div>

      {/* Vertical Timeline Tree */}
      <div className="relative pl-8 space-y-10 border-l border-white/[0.1] ml-4">
        
        {/* Step 0: Input References Anchor */}
        <div className="relative">
          <div className="absolute -left-[41px] top-1.5 h-6 w-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/40 text-xs">
            <Lock className="w-3 h-3" />
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-[#121215] p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-amber-300 font-semibold tracking-wide">
                Locked Root References
              </span>
              <span className="text-[11px] font-mono text-zinc-500">INIT</span>
            </div>
            <p className="text-xs text-zinc-400">
              Garments, model identity vectors, and scene perspective hashes committed to project root.
            </p>
          </div>
        </div>

        {/* Generations in History */}
        {generationHistory.map((gen, idx) => (
          <div key={gen.id} className="relative">
            {/* Timeline Node */}
            <div className={`absolute -left-[41px] top-1.5 h-6 w-6 rounded-full flex items-center justify-center border text-xs ${
              gen.isApproved 
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' 
                : 'bg-white/10 text-white border-white/20'
            }`}>
              {gen.isApproved ? <Check className="w-3 h-3 stroke-[3]" /> : (idx + 1)}
            </div>

            <div className="rounded-2xl border border-white/[0.08] bg-[#121215] p-5 space-y-4 hover:border-white/20 transition-all">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.05] pb-3">
                <div className="flex items-center gap-2.5">
                  <h3 className="text-sm font-semibold text-white">
                    Generation 0{idx + 1}
                  </h3>
                  {gen.isApproved && (
                    <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-mono text-emerald-300 border border-emerald-500/20">
                      APPROVED
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
                  <span>SEED: {gen.seed}</span>
                  <span>FIDELITY: {formatPercentage(gen.fidelityScore.overallFidelity)}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-5">
                <img
                  src={gen.outputImageUrl}
                  alt="Generation result"
                  className="h-28 w-24 rounded-xl object-cover border border-white/10"
                />

                <div className="flex-1 space-y-1 text-xs">
                  <p className="text-zinc-300">
                    <span className="text-zinc-500 font-mono">Pose:</span> {gen.style.pose} · <span className="text-zinc-500 font-mono">Framing:</span> {gen.style.camera}
                  </p>
                  <p className="text-zinc-300">
                    <span className="text-zinc-500 font-mono">Model:</span> {gen.model.name} ({gen.model.code})
                  </p>
                  <p className="text-zinc-300">
                    <span className="text-zinc-500 font-mono">Background:</span> {gen.scene.name} (Locked)
                  </p>
                </div>

                <button
                  onClick={() => {
                    setActiveTab('studio');
                    setStep('review');
                  }}
                  className="rounded-xl bg-white/[0.06] hover:bg-white/[0.12] px-4 py-2 text-xs font-medium text-white border border-white/[0.08] transition-all self-end sm:self-center"
                >
                  Inspect Generation
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Rendered Videos */}
        {videoHistory.map((vid, vIdx) => (
          <div key={vid.id} className="relative">
            <div className="absolute -left-[41px] top-1.5 h-6 w-6 rounded-full bg-violet-500/20 text-violet-400 flex items-center justify-center border border-violet-500/40 text-xs">
              <Film className="w-3 h-3" />
            </div>

            <div className="rounded-2xl border border-white/[0.08] bg-[#121215] p-5 space-y-3">
              <div className="flex items-center justify-between border-b border-white/[0.05] pb-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-white">
                    Video 0{vIdx + 1} · {vid.config.title}
                  </h3>
                  <span className="rounded bg-violet-500/10 px-2 py-0.5 text-[10px] font-mono text-violet-300">
                    {vid.duration}s MP4
                  </span>
                </div>
                <span className="text-xs font-mono text-emerald-400">CONSISTENCY: 99.2%</span>
              </div>

              <div className="flex items-center justify-between pt-1">
                <p className="text-xs text-zinc-400">
                  Derived from Approved Generation 03 with zero fabric distortion.
                </p>
                <button
                  onClick={() => {
                    setActiveTab('studio');
                    setStep('video_result');
                  }}
                  className="rounded-xl bg-white/[0.06] hover:bg-white/[0.12] px-3.5 py-1.5 text-xs font-medium text-white transition-all"
                >
                  Play Video
                </button>
              </div>
            </div>
          </div>
        ))}

      </div>

    </div>
  );
}
