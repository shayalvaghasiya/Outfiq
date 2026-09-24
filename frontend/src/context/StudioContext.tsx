'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  StudioStep, 
  MainTab, 
  ClothingItem, 
  ModelProfile, 
  SceneBackground, 
  StyleConfiguration, 
  GenerationJob, 
  VideoJob, 
  Project, 
  AnimationConfig,
  PoseType,
  CameraPreset,
  CameraAngle,
  AspectRatio
} from '@/types';
import { 
  INITIAL_CLOTHING_ITEMS, 
  MODEL_PROFILES, 
  SCENE_BACKGROUNDS, 
  INITIAL_PROJECTS, 
  INITIAL_SAMPLE_GENERATION,
  INITIAL_SAMPLE_VIDEO
} from '@/lib/mockData';

interface StudioContextType {
  // Navigation & View
  currentStep: StudioStep;
  setStep: (step: StudioStep) => void;
  activeTab: MainTab;
  setActiveTab: (tab: MainTab) => void;
  
  // Projects
  projects: Project[];
  activeProject: Project;
  setActiveProject: (project: Project) => void;
  createNewProject: (name: string, collection: string) => void;
  
  // Garments & Reference Lock
  clothingItems: ClothingItem[];
  selectedClothingIds: string[];
  toggleClothingSelection: (id: string) => void;
  addClothingItem: (item: ClothingItem) => void;
  updateClothingItem: (id: string, partial: Partial<ClothingItem>) => void;
  isAnalyzingGarment: boolean;
  analyzingGarmentId: string | null;
  analysisChecklist: { name: string; completed: boolean }[];
  triggerGarmentAnalysis: (garment: ClothingItem) => void;
  
  // Model Selection
  models: ModelProfile[];
  selectedModelId: string;
  selectModel: (id: string) => void;
  addCustomModel: (model: ModelProfile) => void;
  
  // Scene Selection
  scenes: SceneBackground[];
  selectedSceneId: string;
  selectScene: (id: string) => void;
  addCustomScene: (scene: SceneBackground) => void;
  togglePreserveBackground: () => void;
  
  // Style Configuration
  styleConfig: StyleConfiguration;
  setStyleConfig: (config: Partial<StyleConfiguration>) => void;
  
  // Generation & Review
  currentGeneration: GenerationJob | null;
  generationHistory: GenerationJob[];
  isGenerating: boolean;
  generationStage: number; // 0: Ref, 1: Composition, 2: Synthesis, 3: Fidelity
  startGeneration: () => void;
  approveGeneration: () => void;
  regenerateWithLock: (changeTarget: string) => void;
  
  // Animation & Video
  currentVideo: VideoJob | null;
  videoHistory: VideoJob[];
  isVideoGenerating: boolean;
  videoStage: number;
  startVideoAnimation: (config: AnimationConfig) => void;
  
  // Comparison & Review state
  comparisonMode: 'slider' | 'split' | 'none';
  setComparisonMode: (mode: 'slider' | 'split' | 'none') => void;
  isRegenModalOpen: boolean;
  setIsRegenModalOpen: (open: boolean) => void;
  
  // Reset
  resetStudioWorkflow: () => void;
}

const StudioContext = createContext<StudioContextType | undefined>(undefined);

export function StudioProvider({ children }: { children: React.ReactNode }) {
  const [currentStep, setCurrentStep] = useState<StudioStep>('clothing');
  const [activeTab, setActiveTab] = useState<MainTab>('studio');
  
  // Projects
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [activeProject, setActiveProject] = useState<Project>(INITIAL_PROJECTS[0]);

  // Clothing Assets
  const [clothingItems, setClothingItems] = useState<ClothingItem[]>(INITIAL_CLOTHING_ITEMS);
  const [selectedClothingIds, setSelectedClothingIds] = useState<string[]>([INITIAL_CLOTHING_ITEMS[0].id]);
  const [isAnalyzingGarment, setIsAnalyzingGarment] = useState<boolean>(false);
  const [analyzingGarmentId, setAnalyzingGarmentId] = useState<string | null>(null);
  const [analysisChecklist, setAnalysisChecklist] = useState<{ name: string; completed: boolean }[]>([
    { name: 'Garment Type & Silhouette', completed: true },
    { name: 'Color Palette & Chroma Values', completed: true },
    { name: 'Textile Pattern & Weave', completed: true },
    { name: 'Brand Typography & Micro-logos', completed: true },
    { name: 'Material Drape & Density', completed: true },
    { name: 'Seams, Stitching & Proportions', completed: true }
  ]);

  // Models
  const [models, setModels] = useState<ModelProfile[]>(MODEL_PROFILES);
  const [selectedModelId, setSelectedModelId] = useState<string>(MODEL_PROFILES[0].id);

  // Scenes
  const [scenes, setScenes] = useState<SceneBackground[]>(SCENE_BACKGROUNDS);
  const [selectedSceneId, setSelectedSceneId] = useState<string>(SCENE_BACKGROUNDS[0].id);

  // Style Config
  const [styleConfig, setStyleConfigState] = useState<StyleConfiguration>({
    pose: 'Front Standing',
    camera: 'Full Body',
    angle: 'Eye Level',
    aspectRatio: '4:5',
    lighting: 'Soft Natural Daylight (5600K)',
    fidelityLevel: 'Maximum',
    strictMode: true,
    preserveBackground: true
  });

  // Generations
  const [currentGeneration, setCurrentGeneration] = useState<GenerationJob | null>(INITIAL_SAMPLE_GENERATION);
  const [generationHistory, setGenerationHistory] = useState<GenerationJob[]>([INITIAL_SAMPLE_GENERATION]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationStage, setGenerationStage] = useState<number>(0);

  // Videos
  const [currentVideo, setCurrentVideo] = useState<VideoJob | null>(INITIAL_SAMPLE_VIDEO);
  const [videoHistory, setVideoHistory] = useState<VideoJob[]>([INITIAL_SAMPLE_VIDEO]);
  const [isVideoGenerating, setIsVideoGenerating] = useState<boolean>(false);
  const [videoStage, setVideoStage] = useState<number>(0);

  // Comparison & Modals
  const [comparisonMode, setComparisonMode] = useState<'slider' | 'split' | 'none'>('none');
  const [isRegenModalOpen, setIsRegenModalOpen] = useState<boolean>(false);

  const setStep = (step: StudioStep) => {
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleClothingSelection = (id: string) => {
    setSelectedClothingIds(prev => 
      prev.includes(id) 
        ? (prev.length > 1 ? prev.filter(x => x !== id) : prev) 
        : [...prev, id]
    );
  };

  const addClothingItem = (item: ClothingItem) => {
    setClothingItems(prev => [item, ...prev]);
    setSelectedClothingIds(prev => [item.id, ...prev]);
  };

  const updateClothingItem = (id: string, partial: Partial<ClothingItem>) => {
    setClothingItems(prev => prev.map(c => c.id === id ? { ...c, ...partial } : c));
  };

  const triggerGarmentAnalysis = (garment: ClothingItem) => {
    setIsAnalyzingGarment(true);
    setAnalyzingGarmentId(garment.id);
    
    // Reset checklist items
    setAnalysisChecklist([
      { name: 'Garment Type & Silhouette', completed: false },
      { name: 'Color Palette & Chroma Values', completed: false },
      { name: 'Textile Pattern & Weave', completed: false },
      { name: 'Brand Typography & Micro-logos', completed: false },
      { name: 'Material Drape & Density', completed: false },
      { name: 'Seams, Stitching & Proportions', completed: false }
    ]);

    // Animate checklist progress step-by-step
    const stages = [
      'Garment Type & Silhouette',
      'Color Palette & Chroma Values',
      'Textile Pattern & Weave',
      'Brand Typography & Micro-logos',
      'Material Drape & Density',
      'Seams, Stitching & Proportions'
    ];

    stages.forEach((stageName, idx) => {
      setTimeout(() => {
        setAnalysisChecklist(prev => 
          prev.map(item => item.name === stageName ? { ...item, completed: true } : item)
        );
        if (idx === stages.length - 1) {
          setIsAnalyzingGarment(false);
          setAnalyzingGarmentId(null);
          updateClothingItem(garment.id, { analysisStatus: 'complete', isLocked: true });
        }
      }, (idx + 1) * 450);
    });
  };

  const selectModel = (id: string) => {
    setSelectedModelId(id);
  };

  const addCustomModel = (model: ModelProfile) => {
    setModels(prev => [model, ...prev]);
    setSelectedModelId(model.id);
  };

  const selectScene = (id: string) => {
    setSelectedSceneId(id);
  };

  const addCustomScene = (scene: SceneBackground) => {
    setScenes(prev => [scene, ...prev]);
    setSelectedSceneId(scene.id);
  };

  const togglePreserveBackground = () => {
    setStyleConfigState(prev => ({ ...prev, preserveBackground: !prev.preserveBackground }));
  };

  const setStyleConfig = (config: Partial<StyleConfiguration>) => {
    setStyleConfigState(prev => ({ ...prev, ...config }));
  };

  const createNewProject = (name: string, collection: string) => {
    const newProj: Project = {
      id: `proj-${Date.now()}`,
      name: name || 'New Fashion Editorial',
      collectionName: collection || 'Studio Collection',
      thumbnailUrl: clothingItems[0]?.imageUrl || 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
      generationCount: 0,
      approvedCount: 0,
      videoCount: 0,
      lastUpdated: 'Just now',
      clothingIds: selectedClothingIds,
      selectedModelId,
      selectedSceneId
    };
    setProjects(prev => [newProj, ...prev]);
    setActiveProject(newProj);
    setCurrentStep('clothing');
    setActiveTab('studio');
  };

  const startGeneration = () => {
    setCurrentStep('generating');
    setIsGenerating(true);
    setGenerationStage(0);

    const stages = [0, 1, 2, 3];
    stages.forEach((stageNum) => {
      setTimeout(() => {
        setGenerationStage(stageNum);
        if (stageNum === 3) {
          setTimeout(() => {
            const selectedGarments = clothingItems.filter(c => selectedClothingIds.includes(c.id));
            const selectedModelObj = models.find(m => m.id === selectedModelId) || models[0];
            const selectedSceneObj = scenes.find(s => s.id === selectedSceneId) || scenes[0];

            // Ultra high quality fashion editorial outputs
            const sampleImages = [
              'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=90',
              'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=90',
              'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=90',
              'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=90'
            ];
            const chosenImg = sampleImages[Math.floor(Math.random() * sampleImages.length)];

            const newGen: GenerationJob = {
              id: `gen-${Date.now()}`,
              projectId: activeProject.id,
              timestamp: 'Just now',
              clothingItems: selectedGarments,
              model: selectedModelObj,
              scene: selectedSceneObj,
              style: { ...styleConfig },
              status: 'READY',
              outputImageUrl: chosenImg,
              fidelityScore: {
                clothingMatch: 0.985 + (Math.random() * 0.012),
                modelMatch: 0.975 + (Math.random() * 0.015),
                sceneMatch: 0.990 + (Math.random() * 0.008),
                overallFidelity: 0.982,
                issues: [],
                passed: true
              },
              seed: Math.floor(Math.random() * 100000000),
              promptVersion: 'gemini_vision_fidelity_v2.4',
              referenceLocked: true,
              isApproved: false
            };

            setCurrentGeneration(newGen);
            setGenerationHistory(prev => [newGen, ...prev]);
            setActiveProject(prev => ({
              ...prev,
              generationCount: prev.generationCount + 1,
              lastUpdated: 'Just now'
            }));
            setIsGenerating(false);
            setCurrentStep('review');
          }, 1200);
        }
      }, (stageNum + 1) * 900);
    });
  };

  const approveGeneration = () => {
    if (!currentGeneration) return;
    const updatedGen = { ...currentGeneration, isApproved: true, status: 'APPROVED' as const };
    setCurrentGeneration(updatedGen);
    setGenerationHistory(prev => prev.map(g => g.id === updatedGen.id ? updatedGen : g));
    setActiveProject(prev => ({
      ...prev,
      approvedCount: prev.approvedCount + 1
    }));
  };

  const regenerateWithLock = (changeTarget: string) => {
    setIsRegenModalOpen(false);
    startGeneration();
  };

  const startVideoAnimation = (config: AnimationConfig) => {
    if (!currentGeneration) return;
    setCurrentStep('animate');
    setIsVideoGenerating(true);
    setVideoStage(0);

    const stages = [0, 1, 2, 3];
    stages.forEach((stageNum) => {
      setTimeout(() => {
        setVideoStage(stageNum);
        if (stageNum === 3) {
          setTimeout(() => {
            const newVideo: VideoJob = {
              id: `vid-${Date.now()}`,
              generationId: currentGeneration.id,
              config,
              status: 'APPROVED',
              videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-fashion-model-in-a-photo-studio-41316-large.mp4',
              thumbnailUrl: currentGeneration.outputImageUrl,
              duration: config.durationSeconds,
              consistencyChecks: {
                clothingConsistency: 0.994,
                modelConsistency: 0.988,
                sceneConsistency: 0.996,
                motionQuality: 0.982,
                passed: true
              }
            };
            setCurrentVideo(newVideo);
            setVideoHistory(prev => [newVideo, ...prev]);
            setActiveProject(prev => ({
              ...prev,
              videoCount: prev.videoCount + 1
            }));
            setIsVideoGenerating(false);
            setCurrentStep('video_result');
          }, 1200);
        }
      }, (stageNum + 1) * 1100);
    });
  };

  const resetStudioWorkflow = () => {
    setCurrentStep('clothing');
    setSelectedClothingIds([clothingItems[0]?.id || '']);
  };

  return (
    <StudioContext.Provider
      value={{
        currentStep,
        setStep,
        activeTab,
        setActiveTab,
        projects,
        activeProject,
        setActiveProject,
        createNewProject,
        clothingItems,
        selectedClothingIds,
        toggleClothingSelection,
        addClothingItem,
        updateClothingItem,
        isAnalyzingGarment,
        analyzingGarmentId,
        analysisChecklist,
        triggerGarmentAnalysis,
        models,
        selectedModelId,
        selectModel,
        addCustomModel,
        scenes,
        selectedSceneId,
        selectScene,
        addCustomScene,
        togglePreserveBackground,
        styleConfig,
        setStyleConfig,
        currentGeneration,
        generationHistory,
        isGenerating,
        generationStage,
        startGeneration,
        approveGeneration,
        regenerateWithLock,
        currentVideo,
        videoHistory,
        isVideoGenerating,
        videoStage,
        startVideoAnimation,
        comparisonMode,
        setComparisonMode,
        isRegenModalOpen,
        setIsRegenModalOpen,
        resetStudioWorkflow
      }}
    >
      {children}
    </StudioContext.Provider>
  );
}

export function useStudio() {
  const context = useContext(StudioContext);
  if (!context) {
    throw new Error('useStudio must be used within a StudioProvider');
  }
  return context;
}
