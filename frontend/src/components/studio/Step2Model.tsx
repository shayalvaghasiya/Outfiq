'use client';

import React, { useState, useRef } from 'react';
import { useStudio } from '@/context/StudioContext';
import { 
  Check, 
  Lock, 
  Upload, 
  UserCheck, 
  ShieldAlert, 
  Sparkles, 
  Plus,
  Sliders,
  Camera
} from 'lucide-react';
import { ModelProfile } from '@/types';

export default function Step2Model() {
  const { models, selectedModelId, selectModel, addCustomModel } = useStudio();
  const [activeTab, setActiveTab] = useState<'existing' | 'upload'>('existing');
  const [customModelName, setCustomModelName] = useState<string>('');
  const [customModelGender, setCustomModelGender] = useState<'Female' | 'Male' | 'Non-binary'>('Female');
  const [customModelAesthetic, setCustomModelAesthetic] = useState<string>('Editorial Studio Look');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCustomModelUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];
    const objectUrl = URL.createObjectURL(file);

    const newModel: ModelProfile = {
      id: `custom-model-${Date.now()}`,
      name: customModelName.trim() || `Custom Model #${models.length + 1}`,
      code: `MOD_CUSTOM_${Date.now().toString().slice(-4)}`,
      gender: customModelGender,
      bodyType: 'Tailored Standard',
      aesthetic: customModelAesthetic,
      thumbnailUrl: objectUrl,
      faceReferenceUrl: objectUrl,
      isCustom: true,
      identityLocked: true
    };

    addCustomModel(newModel);
    selectModel(newModel.id);
    setActiveTab('existing');
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="font-mono text-xs uppercase tracking-widest text-zinc-500 font-semibold">
            02 — Model Selection
          </span>
          <span className="h-1 w-1 rounded-full bg-zinc-600" />
          <span className="text-xs text-zinc-500 font-mono">STEP 2 OF 4</span>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Choose your model
        </h1>
        <p className="mt-2 text-sm text-zinc-400 max-w-2xl leading-relaxed">
          Select an established studio model or upload reference photography. The model identity, facial structure, and bone geometry remain locked across all outfit generations.
        </p>
      </div>

      {/* Tabs: Your Models vs Upload Model */}
      <div className="flex items-center gap-2 border-b border-white/[0.08] pb-4">
        <button
          onClick={() => setActiveTab('existing')}
          className={`flex items-center gap-2 rounded-full px-5 py-2 text-xs font-medium transition-all ${
            activeTab === 'existing'
              ? 'bg-white text-zinc-950 font-semibold shadow-md'
              : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
          }`}
        >
          <UserCheck className="w-3.5 h-3.5" />
          <span>Your Models</span>
          <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-[10px] font-mono text-zinc-300 ml-1">
            {models.length}
          </span>
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
          <span>Upload Model</span>
        </button>
      </div>

      {activeTab === 'existing' ? (
        /* Model Library Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {models.map((model) => {
            const isSelected = selectedModelId === model.id;
            return (
              <div
                key={model.id}
                onClick={() => selectModel(model.id)}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-white/90 bg-zinc-900/90 ring-2 ring-white/50 shadow-2xl scale-[1.02]'
                    : 'border-white/[0.08] bg-[#121215] hover:border-white/20'
                }`}
              >
                {/* Model Portrait Image */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-950">
                  <img
                    src={model.thumbnailUrl}
                    alt={model.name}
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

                  {/* Top Lock Badge & Selection Ring */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <div className="flex items-center gap-1 rounded-full bg-black/60 backdrop-blur-md px-2.5 py-1 text-[10px] font-mono text-amber-300 border border-amber-500/30">
                      <Lock className="w-2.5 h-2.5" />
                      <span>IDENTITY LOCKED</span>
                    </div>

                    <div className={`h-6 w-6 rounded-full flex items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-white text-zinc-950 shadow-md'
                        : 'bg-black/50 text-white/50 border border-white/20'
                    }`}>
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
                    </div>
                  </div>

                  {/* Bottom Text Over Image */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <h4 className="text-sm font-semibold text-white tracking-wide">
                      {model.name}
                    </h4>
                    <div className="flex items-center justify-between mt-1 text-[11px] text-zinc-300">
                      <span className="font-mono text-zinc-400">{model.gender}</span>
                      <span className="text-[10px] font-mono bg-white/10 px-1.5 py-0.5 rounded">
                        {model.code}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Sub-card specs */}
                <div className="p-3 bg-white/[0.02] border-t border-white/[0.05]">
                  <p className="text-[11px] text-zinc-400 line-clamp-1 leading-relaxed">
                    {model.aesthetic}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Upload Model Screen */
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="rounded-2xl border border-white/[0.1] bg-[#121215] p-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/[0.05] border border-white/[0.1] text-zinc-300">
                <Camera className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white">Create a New Model Identity</h3>
              <p className="text-xs text-zinc-400 max-w-md mx-auto">
                Upload face, portrait, or full-body reference shots. The facial landmarks are encoded into an immutable identity vector.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-zinc-300 block mb-1.5">Model Name</label>
                <input
                  type="text"
                  value={customModelName}
                  onChange={(e) => setCustomModelName(e.target.value)}
                  placeholder="e.g. Maya Lin"
                  className="w-full rounded-xl bg-black/50 border border-white/10 px-3.5 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-white"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-zinc-300 block mb-1.5">Gender / Category</label>
                <select
                  value={customModelGender}
                  onChange={(e) => setCustomModelGender(e.target.value as any)}
                  className="w-full rounded-xl bg-black/50 border border-white/10 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-white"
                >
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Non-binary">Non-binary</option>
                </select>
              </div>
            </div>

            {/* Upload Dropzone */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-white/20 bg-white/[0.02] p-8 text-center cursor-pointer hover:border-white/40 hover:bg-white/[0.04] transition-all"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleCustomModelUpload}
              />
              <Upload className="h-6 w-6 text-zinc-400 mb-2" />
              <p className="text-xs font-medium text-white">Click to upload reference portrait</p>
              <p className="text-[11px] text-zinc-500 mt-1">PNG, JPG up to 25MB · High resolution recommended</p>
            </div>

            <div className="flex items-center gap-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs">
              <Lock className="w-4 h-4 flex-shrink-0" />
              <span>Identity Anchor: The uploaded face will never be blended or altered into another person.</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
