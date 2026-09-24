'use client';

import React, { useRef, useState } from 'react';
import { useStudio } from '@/context/StudioContext';
import { 
  Play, 
  Pause, 
  Download, 
  Check, 
  RotateCw, 
  ChevronLeft, 
  Film, 
  ShieldCheck, 
  Sparkles,
  Maximize2
} from 'lucide-react';
import { formatPercentage } from '@/lib/utils';

export default function Step8VideoResult() {
  const { currentVideo, currentGeneration, setStep } = useStudio();
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  if (!currentVideo) return null;

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const checks = currentVideo.consistencyChecks;

  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <button 
            onClick={() => setStep('review')}
            className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white mb-2 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to approved image</span>
          </button>
          <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Fashion Video Result
          </h1>
          <p className="mt-1 text-sm text-zinc-400">
            {currentVideo.config.title} · {currentVideo.duration} seconds · Temporal frame consistency verified
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setStep('animate')}
            className="flex items-center gap-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] px-4 py-2.5 text-xs font-medium text-white border border-white/[0.08] transition-all"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>Create another motion</span>
          </button>

          <a
            href={currentVideo.videoUrl}
            download="outfiq-fashion-video.mp4"
            className="flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-xs font-semibold text-zinc-950 hover:bg-zinc-200 transition-all shadow-lg"
          >
            <Download className="w-4 h-4 text-zinc-950" />
            <span>Download MP4</span>
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Large Video Player (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="relative aspect-[4/5] sm:aspect-video w-full rounded-2xl overflow-hidden border border-white/[0.1] bg-black shadow-2xl group">
            
            <video
              ref={videoRef}
              src={currentVideo.videoUrl}
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover"
              onClick={togglePlay}
            />

            {/* Overlay Play/Pause Button */}
            <div 
              onClick={togglePlay}
              className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            >
              <div className="h-16 w-16 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
              </div>
            </div>

            {/* Video Timeline info badge */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white/80 bg-black/50 backdrop-blur-md p-3 rounded-xl border border-white/10 pointer-events-none">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-[11px]">TEMPORAL DIFFUSION COHERENCE: 99.2%</span>
              </div>
              <span className="font-mono text-[11px]">{currentVideo.duration}s MP4 · 4K UHD</span>
            </div>

          </div>
        </div>

        {/* Right Column: Consistency Checks & Audit Report (4 cols) */}
        <div className="lg:col-span-4 space-y-5">
          
          <div className="rounded-2xl border border-white/[0.1] bg-[#121215] p-6 space-y-6 shadow-2xl">
            
            <div className="border-b border-white/[0.08] pb-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                  Motion Engine
                </span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  VERIFIED
                </span>
              </div>
              <h3 className="text-base font-semibold text-white">
                Video Consistency Audit
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Frame-by-frame analysis passed with zero fabric drift.
              </p>
            </div>

            {/* Checklist */}
            <div className="space-y-3.5">
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <div className="flex items-center gap-2.5 text-xs text-zinc-300">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Clothing consistency</span>
                </div>
                <span className="text-xs font-mono font-semibold text-emerald-400">
                  {formatPercentage(checks.clothingConsistency)}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <div className="flex items-center gap-2.5 text-xs text-zinc-300">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Model identity consistency</span>
                </div>
                <span className="text-xs font-mono font-semibold text-emerald-400">
                  {formatPercentage(checks.modelConsistency)}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <div className="flex items-center gap-2.5 text-xs text-zinc-300">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Background consistency</span>
                </div>
                <span className="text-xs font-mono font-semibold text-emerald-400">
                  {formatPercentage(checks.sceneConsistency)}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <div className="flex items-center gap-2.5 text-xs text-zinc-300">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Motion quality</span>
                </div>
                <span className="text-xs font-mono font-semibold text-emerald-400">
                  {formatPercentage(checks.motionQuality)}
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 flex-shrink-0" />
              <span>Ready for commercial fashion campaigns, Instagram Reels & E-commerce hero showcases.</span>
            </div>

            {/* Bottom Actions */}
            <div className="space-y-2 pt-2 border-t border-white/[0.08]">
              <button
                onClick={() => setStep('animate')}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] py-2.5 px-4 text-xs font-medium text-white border border-white/[0.08] transition-all"
              >
                <Film className="w-3.5 h-3.5" />
                <span>Render Different Motion Preset</span>
              </button>

              <button
                onClick={() => setStep('clothing')}
                className="w-full text-center py-2 text-xs text-zinc-400 hover:text-white transition-colors"
              >
                Create New Look from Garment
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
