'use client';

import React from 'react';
import { useStudio } from '@/context/StudioContext';
import { 
  Sliders, 
  ShieldCheck, 
  Camera, 
  Maximize2, 
  Eye, 
  Sun, 
  Sparkles, 
  Lock,
  Shirt,
  User,
  Compass
} from 'lucide-react';
import { PoseType, CameraPreset, CameraAngle, AspectRatio } from '@/types';

export default function Step4Style() {
  const { 
    styleConfig, 
    setStyleConfig, 
    clothingItems, 
    selectedClothingIds, 
    models, 
    selectedModelId, 
    scenes, 
    selectedSceneId,
    startGeneration
  } = useStudio();

  const selectedGarments = clothingItems.filter(c => selectedClothingIds.includes(c.id));
  const selectedModel = models.find(m => m.id === selectedModelId);
  const selectedScene = scenes.find(s => s.id === selectedSceneId);

  const poses: { type: PoseType; label: string }[] = [
    { type: 'Front Standing', label: 'Standing' },
    { type: 'Walking', label: 'Walking' },
    { type: 'Fashion Pose', label: 'Fashion' },
    { type: 'Hands in Pockets', label: 'Hands Pocket' },
    { type: 'Sitting', label: 'Sitting' },
    { type: 'Side Profile', label: 'Side Profile' }
  ];

  const cameraPresets: { preset: CameraPreset; label: string }[] = [
    { preset: 'Full Body', label: 'Full Body' },
    { preset: '3/4 Body', label: '3/4 Body' },
    { preset: 'Waist Up', label: 'Waist Up' },
    { preset: 'Close Up', label: 'Close Up' }
  ];

  const cameraAngles: { angle: CameraAngle; label: string }[] = [
    { angle: 'Eye Level', label: 'Front' },
    { angle: 'Editorial 3/4', label: '3/4' },
    { angle: 'Low Angle', label: 'Low Angle' },
    { angle: 'High Angle', label: 'High Angle' }
  ];

  const aspectRatios: { ratio: AspectRatio; label: string; desc: string }[] = [
    { ratio: '4:5', label: '4:5', desc: 'Instagram / Editorial Portrait' },
    { ratio: '1:1', label: '1:1', desc: 'Square Catalog / E-comm' },
    { ratio: '9:16', label: '9:16', desc: 'TikTok / Story / Reel' },
    { ratio: '16:9', label: '16:9', desc: 'Cinematic Landscape' }
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-300">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="font-mono text-xs uppercase tracking-widest text-zinc-500 font-semibold">
            04 — Director Setup
          </span>
          <span className="h-1 w-1 rounded-full bg-zinc-600" />
          <span className="text-xs text-zinc-500 font-mono">STEP 4 OF 4</span>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Define the shot
        </h1>
        <p className="mt-2 text-sm text-zinc-400 max-w-2xl leading-relaxed">
          Configure pose, framing, and aspect ratio. All underlying garment stitching, model identity, and environment textures remain locked.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Style Controls (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* POSE SELECTION */}
          <div className="rounded-2xl border border-white/[0.08] bg-[#121215] p-6 space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                Pose
              </label>
              <span className="text-xs text-zinc-500 font-mono">{styleConfig.pose}</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {poses.map((p) => {
                const isSelected = styleConfig.pose === p.type;
                return (
                  <button
                    key={p.type}
                    onClick={() => setStyleConfig({ pose: p.type })}
                    className={`rounded-xl px-4 py-3 text-xs font-medium text-left transition-all ${
                      isSelected
                        ? 'bg-white text-zinc-950 font-semibold shadow-md'
                        : 'bg-white/[0.03] text-zinc-400 hover:text-white hover:bg-white/[0.06] border border-white/[0.05]'
                    }`}
                  >
                    <span>{p.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* CAMERA FRAMING & ANGLE */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Camera Framing */}
            <div className="rounded-2xl border border-white/[0.08] bg-[#121215] p-6 space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                  Camera Framing
                </label>
                <Camera className="w-4 h-4 text-zinc-500" />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {cameraPresets.map((c) => {
                  const isSelected = styleConfig.camera === c.preset;
                  return (
                    <button
                      key={c.preset}
                      onClick={() => setStyleConfig({ camera: c.preset })}
                      className={`rounded-xl px-3.5 py-2.5 text-xs font-medium text-center transition-all ${
                        isSelected
                          ? 'bg-white text-zinc-950 font-semibold shadow-md'
                          : 'bg-white/[0.03] text-zinc-400 hover:text-white hover:bg-white/[0.06] border border-white/[0.05]'
                      }`}
                    >
                      {c.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Camera Angle */}
            <div className="rounded-2xl border border-white/[0.08] bg-[#121215] p-6 space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                  Camera Angle
                </label>
                <Eye className="w-4 h-4 text-zinc-500" />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {cameraAngles.map((a) => {
                  const isSelected = styleConfig.angle === a.angle;
                  return (
                    <button
                      key={a.angle}
                      onClick={() => setStyleConfig({ angle: a.angle })}
                      className={`rounded-xl px-3.5 py-2.5 text-xs font-medium text-center transition-all ${
                        isSelected
                          ? 'bg-white text-zinc-950 font-semibold shadow-md'
                          : 'bg-white/[0.03] text-zinc-400 hover:text-white hover:bg-white/[0.06] border border-white/[0.05]'
                      }`}
                    >
                      {a.label}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* ASPECT RATIO */}
          <div className="rounded-2xl border border-white/[0.08] bg-[#121215] p-6 space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                Canvas Ratio
              </label>
              <Maximize2 className="w-4 h-4 text-zinc-500" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {aspectRatios.map((r) => {
                const isSelected = styleConfig.aspectRatio === r.ratio;
                return (
                  <button
                    key={r.ratio}
                    onClick={() => setStyleConfig({ aspectRatio: r.ratio })}
                    className={`rounded-xl p-3 text-left transition-all border ${
                      isSelected
                        ? 'border-white bg-white text-zinc-950 shadow-md'
                        : 'border-white/[0.05] bg-white/[0.02] text-zinc-400 hover:text-white hover:bg-white/[0.05]'
                    }`}
                  >
                    <span className="text-sm font-semibold font-mono block">{r.label}</span>
                    <span className={`text-[10px] mt-1 block truncate ${isSelected ? 'text-zinc-600' : 'text-zinc-500'}`}>
                      {r.desc}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* FIDELITY CONTROLLER */}
          <div className="rounded-2xl border border-white/[0.08] bg-[#121215] p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold block">
                  Reference Fidelity Mode
                </label>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Controlled fashion synthesis algorithm guarantee
                </p>
              </div>
              <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-mono font-medium text-emerald-400 border border-emerald-500/20">
                MAXIMUM (STRICT)
              </span>
            </div>

            <div className="rounded-xl bg-black/40 border border-white/[0.06] p-4 space-y-2">
              <div className="flex items-center gap-2 text-xs font-medium text-white">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Zero AI Redesign Principle</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                The Gemini synthesis pipeline will faithfully render all buttons, zippers, logos, fabric textures, model facial features, and background elements without generative hallucination.
              </p>
            </div>
          </div>

        </div>

        {/* Right Column: Pre-Generation Review Card (4 cols) */}
        <div className="lg:col-span-4 sticky top-24 space-y-5">
          
          <div className="rounded-2xl border border-white/[0.1] bg-[#141418] p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                Generation Blueprint
              </h3>
              <span className="flex items-center gap-1 text-[11px] text-amber-300 font-mono">
                <Lock className="w-3 h-3" />
                <span>3 LOCKED</span>
              </span>
            </div>

            {/* Selected Garments */}
            <div className="space-y-2">
              <span className="text-[11px] font-mono text-zinc-500 uppercase">Clothing Assets</span>
              <div className="space-y-2">
                {selectedGarments.map((g) => (
                  <div key={g.id} className="flex items-center gap-3 bg-white/[0.02] p-2 rounded-xl border border-white/[0.04]">
                    <img src={g.imageUrl} alt={g.name} className="h-10 w-10 rounded-lg object-cover" />
                    <div className="overflow-hidden">
                      <p className="text-xs font-medium text-white truncate">{g.name}</p>
                      <p className="text-[10px] text-zinc-400">{g.color}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Selected Model */}
            {selectedModel && (
              <div className="space-y-1.5 pt-2 border-t border-white/[0.05]">
                <span className="text-[11px] font-mono text-zinc-500 uppercase">Model Identity</span>
                <div className="flex items-center gap-3 bg-white/[0.02] p-2 rounded-xl border border-white/[0.04]">
                  <img src={selectedModel.thumbnailUrl} alt={selectedModel.name} className="h-10 w-10 rounded-lg object-cover" />
                  <div className="overflow-hidden">
                    <p className="text-xs font-medium text-white truncate">{selectedModel.name}</p>
                    <p className="text-[10px] text-zinc-400">{selectedModel.code}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Selected Scene */}
            {selectedScene && (
              <div className="space-y-1.5 pt-2 border-t border-white/[0.05]">
                <span className="text-[11px] font-mono text-zinc-500 uppercase">Scene & Light</span>
                <div className="flex items-center gap-3 bg-white/[0.02] p-2 rounded-xl border border-white/[0.04]">
                  <img src={selectedScene.imageUrl} alt={selectedScene.name} className="h-10 w-10 rounded-lg object-cover" />
                  <div className="overflow-hidden">
                    <p className="text-xs font-medium text-white truncate">{selectedScene.name}</p>
                    <p className="text-[10px] text-zinc-400">{selectedScene.lightingMood}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Shot Specs */}
            <div className="pt-2 border-t border-white/[0.05] grid grid-cols-2 gap-2 text-[11px] font-mono">
              <div className="bg-white/[0.02] p-2 rounded-lg border border-white/[0.04]">
                <span className="text-zinc-500 block">POSE</span>
                <span className="text-zinc-200 font-semibold">{styleConfig.pose}</span>
              </div>
              <div className="bg-white/[0.02] p-2 rounded-lg border border-white/[0.04]">
                <span className="text-zinc-500 block">FRAMING</span>
                <span className="text-zinc-200 font-semibold">{styleConfig.camera}</span>
              </div>
            </div>

            {/* Big Generate Button */}
            <button
              onClick={startGeneration}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-white py-3.5 px-4 text-xs font-semibold text-zinc-950 hover:bg-zinc-200 transition-all shadow-xl hover:shadow-white/10 group cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-zinc-950 transition-transform group-hover:scale-110" />
              <span>Generate Fashion Look</span>
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}
