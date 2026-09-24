'use client';

import React, { useState, useRef } from 'react';
import { useStudio } from '@/context/StudioContext';
import { 
  Upload, 
  Check, 
  Lock, 
  Sparkles, 
  SlidersHorizontal, 
  Info, 
  Plus, 
  CheckCircle2, 
  Loader2, 
  Edit3, 
  X,
  FileCheck2
} from 'lucide-react';
import { ClothingItem } from '@/types';

export default function Step1Clothing() {
  const { 
    clothingItems, 
    selectedClothingIds, 
    toggleClothingSelection, 
    addClothingItem, 
    updateClothingItem,
    isAnalyzingGarment,
    analyzingGarmentId,
    analysisChecklist,
    triggerGarmentAnalysis
  } = useStudio();

  const [activeGarmentModal, setActiveGarmentModal] = useState<ClothingItem | null>(null);
  const [isEditingDetails, setIsEditingDetails] = useState<boolean>(false);
  const [editedDescription, setEditedDescription] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];
    const objectUrl = URL.createObjectURL(file);

    const newGarment: ClothingItem = {
      id: `garment-${Date.now()}`,
      name: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
      category: 'Top',
      imageUrl: objectUrl,
      color: 'Extracted Color',
      pattern: 'Solid Matte',
      fabric: 'Fine Cotton Knit',
      fit: 'Relaxed Fit',
      details: ['Full length', 'Clean edge seam'],
      isLocked: true,
      analysisStatus: 'pending',
      detectedAttributes: {
        garmentType: 'Fashion Garment',
        primaryColor: 'Extracted Palette',
        patternType: 'Solid Surface',
        fabricTexture: 'Natural Textile Weave',
        stitchingDetails: 'Tonal double stitching',
        sleeveOrNeckDesign: 'Standard collar & cuffs'
      }
    };

    addClothingItem(newGarment);
    triggerGarmentAnalysis(newGarment);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      const objectUrl = URL.createObjectURL(file);
      const newGarment: ClothingItem = {
        id: `garment-${Date.now()}`,
        name: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
        category: 'Top',
        imageUrl: objectUrl,
        color: 'Extracted Color',
        pattern: 'Solid Matte',
        fabric: 'Fine Cotton Knit',
        fit: 'Relaxed Fit',
        details: ['High fidelity textile match'],
        isLocked: true,
        analysisStatus: 'pending',
        detectedAttributes: {
          garmentType: 'Analyzed Garment',
          primaryColor: 'Tonal Spectrum',
          patternType: 'Solid Surface',
          fabricTexture: 'Natural Woven Textile',
          stitchingDetails: 'Tonal tailored construction',
          sleeveOrNeckDesign: 'Precise proportional collar'
        }
      };
      addClothingItem(newGarment);
      triggerGarmentAnalysis(newGarment);
    }
  };

  const openDetailsModal = (garment: ClothingItem) => {
    setActiveGarmentModal(garment);
    setEditedDescription(
      garment.detectedAttributes 
        ? `${garment.detectedAttributes.garmentType}, Color: ${garment.detectedAttributes.primaryColor}, Pattern: ${garment.detectedAttributes.patternType}, Material: ${garment.detectedAttributes.fabricTexture}, Details: ${garment.detectedAttributes.stitchingDetails}`
        : `${garment.name} - ${garment.color} - ${garment.fabric}`
    );
    setIsEditingDetails(false);
  };

  const saveEditedDetails = () => {
    if (!activeGarmentModal) return;
    updateClothingItem(activeGarmentModal.id, {
      details: [...activeGarmentModal.details, `User Lock: ${editedDescription}`],
      isLocked: true
    });
    setIsEditingDetails(false);
    setActiveGarmentModal(null);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      
      {/* Heading & Subtitle */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="font-mono text-xs uppercase tracking-widest text-zinc-500 font-semibold">
            01 — Studio Setup
          </span>
          <span className="h-1 w-1 rounded-full bg-zinc-600" />
          <span className="text-xs text-zinc-500 font-mono">STEP 1 OF 4</span>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Choose your clothing
        </h1>
        <p className="mt-2 text-sm text-zinc-400 max-w-2xl leading-relaxed">
          Upload the exact garments you want to produce. Gemini Vision analyzes seams, fabric, logos, and proportions to ensure zero design drift.
        </p>
      </div>

      {/* Large Drag & Drop Upload Zone */}
      <div 
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className="group relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-white/[0.12] bg-white/[0.02] p-12 text-center transition-all hover:border-white/30 hover:bg-white/[0.04] cursor-pointer"
      >
        <input 
          ref={fileInputRef} 
          type="file" 
          accept="image/jpeg,image/png,image/webp" 
          className="hidden" 
          onChange={handleFileUpload} 
        />

        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/[0.06] border border-white/[0.1] text-zinc-300 shadow-inner group-hover:scale-105 group-hover:border-white/30 group-hover:text-white transition-all mb-4">
          <Upload className="h-6 w-6 stroke-[1.5]" />
        </div>

        <h3 className="text-base font-medium text-white mb-1">
          Drop clothing here
        </h3>
        <p className="text-xs text-zinc-400 mb-3">
          or <span className="text-zinc-200 underline underline-offset-4">browse files</span> from your computer
        </p>
        <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-500">
          <span className="rounded bg-white/[0.05] px-2 py-0.5 border border-white/[0.05]">JPG</span>
          <span className="rounded bg-white/[0.05] px-2 py-0.5 border border-white/[0.05]">PNG</span>
          <span className="rounded bg-white/[0.05] px-2 py-0.5 border border-white/[0.05]">WEBP</span>
          <span>· High-res product shots recommended</span>
        </div>
      </div>

      {/* Real-time Analysis Card if Analyzing */}
      {isAnalyzingGarment && (
        <div className="rounded-2xl border border-violet-500/30 bg-violet-950/20 p-6 backdrop-blur-sm animate-pulse">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Loader2 className="h-5 w-5 text-violet-400 animate-spin" />
              <div>
                <h4 className="text-sm font-semibold text-white">Analyzing garment with Gemini Vision</h4>
                <p className="text-xs text-violet-300/70">Extracting structural fidelity markers & textile metadata</p>
              </div>
            </div>
            <span className="text-xs font-mono text-violet-400 bg-violet-500/10 px-2.5 py-1 rounded-full border border-violet-500/20">
              STRICT FIDELITY
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
            {analysisChecklist.map((check) => (
              <div 
                key={check.name} 
                className={`flex items-center gap-2 rounded-lg p-2.5 text-xs transition-all ${
                  check.completed 
                    ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20' 
                    : 'bg-white/[0.03] text-zinc-500 border border-white/[0.05]'
                }`}
              >
                {check.completed ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                ) : (
                  <div className="h-4 w-4 rounded-full border border-zinc-600 flex-shrink-0" />
                )}
                <span className="truncate">{check.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Your Clothing Gallery */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <h3 className="text-lg font-medium text-white tracking-tight">Your clothing</h3>
            <span className="rounded-full bg-white/[0.08] px-2 py-0.5 text-xs font-mono text-zinc-400">
              {clothingItems.length}
            </span>
          </div>
          <span className="text-xs text-zinc-500 font-mono">
            Click garment card to select / unselect for this look
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {clothingItems.map((item) => {
            const isSelected = selectedClothingIds.includes(item.id);
            return (
              <div 
                key={item.id}
                onClick={() => toggleClothingSelection(item.id)}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border transition-all cursor-pointer ${
                  isSelected 
                    ? 'border-white/80 bg-zinc-900/90 ring-1 ring-white/50 shadow-xl' 
                    : 'border-white/[0.08] bg-[#121215] hover:border-white/20'
                }`}
              >
                {/* Image Container */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-950">
                  <img 
                    src={item.imageUrl} 
                    alt={item.name}
                    className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105" 
                  />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="rounded-full bg-black/70 backdrop-blur-md px-2.5 py-1 text-[10px] font-mono text-zinc-300 border border-white/10">
                      {item.category}
                    </span>

                    <div className="flex items-center gap-1.5">
                      {item.isLocked && (
                        <div className="flex items-center gap-1 rounded-full bg-amber-500/20 backdrop-blur-md px-2 py-0.5 text-[10px] font-medium text-amber-300 border border-amber-500/30">
                          <Lock className="w-2.5 h-2.5" />
                          <span>LOCKED</span>
                        </div>
                      )}

                      <div className={`h-6 w-6 rounded-full flex items-center justify-center transition-all ${
                        isSelected 
                          ? 'bg-white text-zinc-950 shadow-md' 
                          : 'bg-black/50 text-white/50 border border-white/20'
                      }`}>
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Content & Extracted details */}
                <div className="p-4 space-y-3">
                  <div>
                    <h4 className="text-sm font-medium text-white line-clamp-1 group-hover:text-zinc-200">
                      {item.name}
                    </h4>
                    <p className="text-xs text-zinc-400 mt-0.5 line-clamp-1">
                      {item.color} · {item.fabric}
                    </p>
                  </div>

                  {/* Detected Specs Pills */}
                  <div className="space-y-1 bg-white/[0.03] p-2.5 rounded-xl border border-white/[0.04]">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-zinc-500 font-mono">Silhouette</span>
                      <span className="text-zinc-300 font-medium">{item.fit}</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-zinc-500 font-mono">Fidelity</span>
                      <span className="text-emerald-400 font-mono font-medium">98.5% Exact</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-1 flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openDetailsModal(item);
                      }}
                      className="w-full flex items-center justify-center gap-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] py-2 text-xs font-medium text-zinc-300 transition-all border border-white/[0.06]"
                    >
                      <Info className="w-3.5 h-3.5 text-zinc-400" />
                      <span>View details</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Garment Details & Manual Correction Modal */}
      {activeGarmentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-2xl border border-white/[0.1] bg-[#121215] p-6 shadow-2xl space-y-5">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-white/[0.08] pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="rounded bg-amber-500/10 px-2 py-0.5 text-[10px] font-mono text-amber-300 border border-amber-500/20">
                    REFERENCE LOCKED SPEC
                  </span>
                  <span className="text-xs text-zinc-500 font-mono">ID: {activeGarmentModal.id}</span>
                </div>
                <h3 className="text-lg font-semibold text-white">
                  {activeGarmentModal.name}
                </h3>
              </div>
              <button 
                onClick={() => setActiveGarmentModal(null)}
                className="rounded-lg p-1.5 text-zinc-400 hover:bg-white/[0.05] hover:text-white transition-all"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Extracted Details Table */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                Extracted Garment Geometry
              </h4>

              <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] divide-y divide-white/[0.04] text-xs">
                <div className="flex items-center justify-between p-3">
                  <span className="text-zinc-500">Garment Type</span>
                  <span className="font-medium text-white">{activeGarmentModal.detectedAttributes?.garmentType || activeGarmentModal.category}</span>
                </div>
                <div className="flex items-center justify-between p-3">
                  <span className="text-zinc-500">Color Tone</span>
                  <span className="font-medium text-white">{activeGarmentModal.detectedAttributes?.primaryColor || activeGarmentModal.color}</span>
                </div>
                <div className="flex items-center justify-between p-3">
                  <span className="text-zinc-500">Pattern & Weave</span>
                  <span className="font-medium text-white">{activeGarmentModal.detectedAttributes?.patternType || activeGarmentModal.pattern}</span>
                </div>
                <div className="flex items-center justify-between p-3">
                  <span className="text-zinc-500">Fabric Texture</span>
                  <span className="font-medium text-white">{activeGarmentModal.detectedAttributes?.fabricTexture || activeGarmentModal.fabric}</span>
                </div>
                <div className="flex items-center justify-between p-3">
                  <span className="text-zinc-500">Logo / Branding</span>
                  <span className="font-medium text-white">{activeGarmentModal.detectedAttributes?.logoOrPrint || 'Zero Alteration Allowed'}</span>
                </div>
                <div className="flex items-center justify-between p-3">
                  <span className="text-zinc-500">Stitching & Proportions</span>
                  <span className="font-medium text-white">{activeGarmentModal.detectedAttributes?.stitchingDetails || 'Original Seams Preserved'}</span>
                </div>
              </div>
            </div>

            {/* Manual Correction Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-zinc-300">
                  Locked Requirement Prompt Injection
                </label>
                {!isEditingDetails && (
                  <button 
                    onClick={() => setIsEditingDetails(true)}
                    className="flex items-center gap-1 text-xs text-zinc-400 hover:text-white"
                  >
                    <Edit3 className="w-3 h-3" />
                    <span>Edit details</span>
                  </button>
                )}
              </div>

              {isEditingDetails ? (
                <textarea
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                  rows={3}
                  className="w-full rounded-xl bg-black/50 border border-white/20 p-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-white"
                  placeholder="Specify exact garment constraints (e.g. Ribbed cuffs must remain unrolled, exact logo placement on left chest)"
                />
              ) : (
                <div className="rounded-xl bg-black/40 border border-white/[0.06] p-3 text-xs text-zinc-400 font-mono leading-relaxed">
                  {editedDescription}
                </div>
              )}
              <p className="text-[11px] text-zinc-500">
                Any corrected description becomes a mandatory non-negotiable constraint for Gemini synthesis.
              </p>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/[0.08]">
              <button
                onClick={() => setActiveGarmentModal(null)}
                className="rounded-xl px-4 py-2 text-xs font-medium text-zinc-400 hover:text-white transition-all"
              >
                Close
              </button>
              {isEditingDetails && (
                <button
                  onClick={saveEditedDetails}
                  className="rounded-xl bg-white px-5 py-2 text-xs font-semibold text-zinc-950 hover:bg-zinc-200 transition-all shadow-md"
                >
                  Save & Lock Constraint
                </button>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
