'use client';

import React from 'react';
import { useStudio } from '@/context/StudioContext';
import { ArrowLeft, ArrowRight, Sparkles, Check, Film, Lock } from 'lucide-react';
import { StudioStep } from '@/types';

export default function StickyActionBar() {
  const { 
    currentStep, 
    setStep, 
    selectedClothingIds, 
    selectedModelId, 
    selectedSceneId, 
    startGeneration,
    approveGeneration,
    activeTab
  } = useStudio();

  if (activeTab !== 'studio') return null;

  // Don't render bottom bar on cinematic generating screen
  if (currentStep === 'generating') return null;

  const getStepInfo = () => {
    switch (currentStep) {
      case 'clothing':
        return { stepNum: 1, next: 'model' as StudioStep, prev: null, canNext: selectedClothingIds.length > 0, nextLabel: 'Continue to Model' };
      case 'model':
        return { stepNum: 2, next: 'scene' as StudioStep, prev: 'clothing' as StudioStep, canNext: !!selectedModelId, nextLabel: 'Continue to Scene' };
      case 'scene':
        return { stepNum: 3, next: 'style' as StudioStep, prev: 'model' as StudioStep, canNext: !!selectedSceneId, nextLabel: 'Define Shot Style' };
      case 'style':
        return { stepNum: 4, next: 'generating' as StudioStep, prev: 'scene' as StudioStep, canNext: true, nextLabel: 'Generate Look' };
      case 'review':
        return { stepNum: 5, next: 'animate' as StudioStep, prev: 'style' as StudioStep, canNext: true, nextLabel: 'Animate Look' };
      case 'animate':
        return { stepNum: 6, next: 'video_result' as StudioStep, prev: 'review' as StudioStep, canNext: true, nextLabel: 'Generate Video' };
      default:
        return null;
    }
  };

  const info = getStepInfo();
  if (!info) return null;

  const handleNext = () => {
    if (currentStep === 'style') {
      startGeneration();
    } else if (info.next) {
      setStep(info.next);
    }
  };

  return (
    <div className="sticky bottom-0 z-40 w-full border-t border-white/[0.08] bg-[#09090b]/90 backdrop-blur-xl px-6 py-4 transition-all">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        
        {/* Left: Back Button */}
        <div>
          {info.prev ? (
            <button
              onClick={() => setStep(info.prev!)}
              className="flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-medium text-zinc-400 hover:text-white hover:bg-white/[0.05] transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <div className="flex items-center gap-1.5 text-xs text-zinc-500 font-mono">
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>Reference Lock Active</span>
            </div>
          )}
        </div>

        {/* Center: Step Indicator */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-zinc-400">
            Step {Math.min(info.stepNum, 4)} of 4
          </span>
          <div className="hidden sm:flex items-center gap-1.5">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`h-1.5 rounded-full transition-all ${
                  s === info.stepNum
                    ? 'w-6 bg-white'
                    : s < info.stepNum
                    ? 'w-2 bg-emerald-400'
                    : 'w-2 bg-zinc-800'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Right: Next / Action Button */}
        <div>
          {currentStep === 'style' ? (
            <button
              onClick={handleNext}
              disabled={!info.canNext}
              className="flex items-center gap-2 rounded-xl bg-white px-6 py-2.5 text-xs font-semibold text-zinc-950 hover:bg-zinc-200 transition-all shadow-xl hover:shadow-white/10 cursor-pointer disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4 text-zinc-950" />
              <span>Generate</span>
              <ArrowRight className="w-4 h-4 text-zinc-950" />
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={!info.canNext}
              className="flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-xs font-semibold text-zinc-950 hover:bg-zinc-200 transition-all shadow-md cursor-pointer disabled:opacity-40"
            >
              <span>{info.nextLabel}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
