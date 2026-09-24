'use client';

import React, { useState } from 'react';
import { useStudio } from '@/context/StudioContext';
import { 
  Film, 
  Sparkles, 
  Rotate3D, 
  Footprints, 
  Camera, 
  Maximize2, 
  Play, 
  Lock, 
  ShieldCheck, 
  Check, 
  Loader2,
  Sliders,
  ChevronLeft
} from 'lucide-react';
import { AnimationPresetType, AnimationConfig } from '@/types';

export default function Step7Animation() {
  const { 
    currentGeneration, 
    startVideoAnimation, 
    isVideoGenerating, 
    videoStage, 
    setStep 
  } = useStudio();

  const [selectedPreset, setSelectedPreset] = useState<AnimationPresetType>('spin_360');
  const [duration, setDuration] = useState<5 | 8 | 10>(8);
  const [motionIntensity, setMotionIntensity] = useState<'Low' | 'Medium' | 'High'>('Low');
  const [cameraMovement, setCameraMovement] = useState<'Fixed' | 'Orbit' | 'Tracking' | 'Slow Zoom'>('Fixed');

  if (!currentGeneration) return null;

  const presets = [
    {
      type: 'walk' as AnimationPresetType,
      title: 'Fashion Walk',
      category: 'Fashion',
      desc: 'Natural runway stride toward camera with realistic garment sway.',
      icon: Footprints
    },
    {
      type: 'spin_360' as AnimationPresetType,
      title: '360° Studio Spin',
      category: 'Fashion',
      desc: 'Full 360-degree rotation showing front, side seams, and back construction.',
      icon: Rotate3D
    },
    {
      type: 'fashion_pose' as AnimationPresetType,
      title: 'Editorial Pose Sequence',
      category: 'Fashion',
      desc: 'Subtle high-fashion weight shifts without altering garment geometry.',
      icon: Sparkles
    },
    {
      type: 'turn' as AnimationPresetType,
      title: '180° Turn Around',
      category: 'Fashion',
      desc: 'Controlled slow turn revealing back details and hood/collar drape.',
      icon: Rotate3D
    },
    {
      type: 'showcase' as AnimationPresetType,
      title: 'Product Showcase',
      category: 'Product',
      desc: 'Macro fabric focus emphasizing stitch density and material quality.',
      icon: Maximize2
    },
    {
      type: 'camera_orbit' as AnimationPresetType,
      title: 'Camera Orbit',
      category: 'Product',
      desc: 'Static model with smooth cinematic 3D arc movement around the look.',
      icon: Camera
    },
    {
      type: 'slow_zoom' as AnimationPresetType,
      title: 'Cinematic Slow Zoom',
      category: 'Product',
      desc: 'Very subtle slow push-in focusing on upper garment tailoring.',
      icon: Camera
    }
  ];

  const handleGenerateVideo = () => {
    const activePresetObj = presets.find(p => p.type === selectedPreset);
    const config: AnimationConfig = {
      preset: selectedPreset,
      title: activePresetObj?.title || 'Fashion Animation',
      durationSeconds: duration,
      motionIntensity,
      cameraMovement,
      clothingFidelity: 'Maximum',
      modelFidelity: 'Maximum',
      backgroundLocked: true
    };
    startVideoAnimation(config);
  };

  const videoStages = [
    { title: 'Preparing image', desc: 'Slicing mesh geometry & locking texture map' },
    { title: 'Planning movement', desc: 'Calculating physics-based cloth drape dynamics' },
    { title: 'Generating video', desc: 'Synthesizing temporal frame coherence' },
    { title: 'Checking consistency', desc: 'Validating zero garment drift across frames' }
  ];

  // If in video generation mode, render cinematic progress
  if (isVideoGenerating) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 animate-in fade-in duration-500">
        <div className="relative w-full max-w-xl text-center space-y-8">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full bg-violet-600/10 blur-[100px] pointer-events-none" />

          <div className="inline-flex items-center gap-2 rounded-full bg-white/[0.05] px-3.5 py-1.5 border border-white/[0.08]">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" />
            <span className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase">
              Veo Temporal Engine
            </span>
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Animating your approved look
            </h2>
            <p className="text-sm text-zinc-400">
              Transforming static high-res editorial portrait into consistent fashion motion.
            </p>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-[#121215]/80 backdrop-blur-xl p-8 space-y-6 shadow-2xl text-left">
            <div className="space-y-4">
              {videoStages.map((st, idx) => {
                const isDone = videoStage > idx;
                const isCurrent = videoStage === idx;
                const isPending = videoStage < idx;

                return (
                  <div key={st.title} className="flex items-center justify-between py-2 border-b border-white/[0.04] last:border-0">
                    <div className="flex items-center gap-3.5">
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
                        {isPending && <div className="h-2 w-2 rounded-full bg-zinc-700" />}
                      </div>
                      <div>
                        <p className={`text-sm font-medium ${isDone || isCurrent ? 'text-white' : 'text-zinc-500'}`}>
                          {st.title}
                        </p>
                        <p className="text-[11px] text-zinc-500">{st.desc}</p>
                      </div>
                    </div>
                    <span className="font-mono text-xs">
                      {isDone && <span className="text-emerald-400">✓</span>}
                      {isCurrent && <span className="text-zinc-400 animate-pulse">●</span>}
                      {isPending && <span className="text-zinc-600">○</span>}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <button 
            onClick={() => setStep('review')}
            className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white mb-3 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to approved image</span>
          </button>
          <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Bring it to life.
          </h1>
          <p className="mt-2 text-sm text-zinc-400 max-w-2xl leading-relaxed">
            Choose how your model should move. All clothing physics, brand logos, facial vectors, and the original background remain locked.
          </p>
        </div>

        {/* Source image preview chip */}
        <div className="hidden sm:flex items-center gap-3 bg-white/[0.03] p-2 pr-4 rounded-xl border border-white/[0.06]">
          <img src={currentGeneration.outputImageUrl} alt="Approved look" className="h-12 w-10 rounded-lg object-cover" />
          <div className="text-left">
            <span className="text-[10px] font-mono text-emerald-400 block">APPROVED SOURCE</span>
            <span className="text-xs font-medium text-white">{currentGeneration.clothingItems[0]?.name || 'Look'}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Animation Presets Grid (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
            Motion Presets
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {presets.map((preset) => {
              const Icon = preset.icon;
              const isSelected = selectedPreset === preset.type;
              return (
                <div
                  key={preset.type}
                  onClick={() => setSelectedPreset(preset.type)}
                  className={`group relative p-5 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-white bg-[#18181e] ring-1 ring-white/50 shadow-xl'
                      : 'border-white/[0.08] bg-[#121215] hover:border-white/20'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className={`h-8 w-8 rounded-xl flex items-center justify-center ${
                        isSelected ? 'bg-white text-zinc-950' : 'bg-white/[0.05] text-zinc-400'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-mono uppercase text-zinc-500">
                        {preset.category}
                      </span>
                    </div>

                    <div className={`h-5 w-5 rounded-full flex items-center justify-center ${
                      isSelected ? 'bg-white text-zinc-950' : 'border border-white/20'
                    }`}>
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </div>

                  <h4 className="text-sm font-semibold text-white mb-1">
                    {preset.title}
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {preset.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: Animation Configuration Panel (4 cols) */}
        <div className="lg:col-span-4 sticky top-24 space-y-5">
          <div className="rounded-2xl border border-white/[0.1] bg-[#121215] p-6 space-y-6 shadow-2xl">
            
            <div className="border-b border-white/[0.08] pb-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                Animation Specs
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                {presets.find(p => p.type === selectedPreset)?.title}
              </p>
            </div>

            {/* DURATION SELECTOR */}
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase text-zinc-400 block">
                Duration
              </label>
              <div className="grid grid-cols-3 gap-2">
                {([5, 8, 10] as const).map((sec) => (
                  <button
                    key={sec}
                    onClick={() => setDuration(sec)}
                    className={`py-2 rounded-xl text-xs font-medium transition-all ${
                      duration === sec
                        ? 'bg-white text-zinc-950 font-semibold shadow-md'
                        : 'bg-white/[0.03] text-zinc-400 hover:text-white border border-white/[0.05]'
                    }`}
                  >
                    {sec}s
                  </button>
                ))}
              </div>
            </div>

            {/* MOTION INTENSITY */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono uppercase text-zinc-400">Motion Intensity</span>
                <span className="font-medium text-white">{motionIntensity}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {(['Low', 'Medium', 'High'] as const).map((intensity) => (
                  <button
                    key={intensity}
                    onClick={() => setMotionIntensity(intensity)}
                    className={`py-2 rounded-xl text-xs font-medium transition-all ${
                      motionIntensity === intensity
                        ? 'bg-white text-zinc-950 font-semibold shadow-md'
                        : 'bg-white/[0.03] text-zinc-400 hover:text-white border border-white/[0.05]'
                    }`}
                  >
                    {intensity}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-zinc-500">
                Low intensity ensures zero fabric drift or logo warping.
              </p>
            </div>

            {/* CAMERA MOVEMENT */}
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase text-zinc-400 block">
                Camera Movement
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(['Fixed', 'Orbit'] as const).map((cam) => (
                  <button
                    key={cam}
                    onClick={() => setCameraMovement(cam)}
                    className={`py-2 rounded-xl text-xs font-medium transition-all ${
                      cameraMovement === cam
                        ? 'bg-white text-zinc-950 font-semibold shadow-md'
                        : 'bg-white/[0.03] text-zinc-400 hover:text-white border border-white/[0.05]'
                    }`}
                  >
                    {cam}
                  </button>
                ))}
              </div>
            </div>

            {/* FIDELITY LOCK BADGES */}
            <div className="space-y-2 pt-2 border-t border-white/[0.06] text-xs">
              <div className="flex items-center justify-between text-zinc-300">
                <span className="text-zinc-500">Clothing Geometry</span>
                <span className="text-emerald-400 font-mono flex items-center gap-1">
                  <Check className="w-3 h-3" /> Locked
                </span>
              </div>
              <div className="flex items-center justify-between text-zinc-300">
                <span className="text-zinc-500">Model Identity</span>
                <span className="text-emerald-400 font-mono flex items-center gap-1">
                  <Check className="w-3 h-3" /> Locked
                </span>
              </div>
              <div className="flex items-center justify-between text-zinc-300">
                <span className="text-zinc-500">Scene Background</span>
                <span className="text-emerald-400 font-mono flex items-center gap-1">
                  <Check className="w-3 h-3" /> Locked
                </span>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={handleGenerateVideo}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-white py-3.5 px-4 text-xs font-semibold text-zinc-950 hover:bg-zinc-200 transition-all shadow-xl cursor-pointer"
            >
              <Film className="w-4 h-4 text-zinc-950" />
              <span>Generate Video</span>
            </button>

          </div>
        </div>

      </div>

    </div>
  );
}
