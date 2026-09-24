export type StudioStep = 
  | 'dashboard'
  | 'clothing'
  | 'model'
  | 'scene'
  | 'style'
  | 'generating'
  | 'review'
  | 'animate'
  | 'video_result';

export type MainTab = 'studio' | 'dashboard' | 'library' | 'timeline' | 'settings';

export interface GarmentAttribute {
  label: string;
  value: string;
  locked: boolean;
}

export interface ClothingItem {
  id: string;
  name: string;
  category: 'Top' | 'Bottom' | 'Outerwear' | 'Full Outfit' | 'Footwear' | 'Accessory';
  imageUrl: string;
  color: string;
  pattern: string;
  fabric: string;
  fit: string;
  details: string[];
  isLocked: boolean;
  analysisStatus: 'pending' | 'analyzing' | 'complete';
  detectedAttributes?: {
    garmentType: string;
    primaryColor: string;
    patternType: string;
    fabricTexture: string;
    logoOrPrint?: string;
    stitchingDetails: string;
    sleeveOrNeckDesign: string;
  };
}

export interface ModelProfile {
  id: string;
  name: string;
  code: string;
  gender: 'Female' | 'Male' | 'Non-binary';
  ethnicity?: string;
  height?: string;
  bodyType: string;
  aesthetic: string;
  thumbnailUrl: string;
  faceReferenceUrl: string;
  isCustom?: boolean;
  identityLocked: boolean;
}

export interface SceneBackground {
  id: string;
  name: string;
  category: 'Studio' | 'Street' | 'Luxury' | 'Outdoor' | 'Runway' | 'Minimal' | 'Lifestyle';
  description: string;
  lightingMood: string;
  imageUrl: string;
  preserveExact: boolean;
  isCustom?: boolean;
}

export type PoseType = 
  | 'Front Standing' 
  | 'Walking' 
  | 'Fashion Pose' 
  | 'Hands in Pockets' 
  | 'Sitting' 
  | 'Side Profile'
  | 'Custom';

export type CameraPreset = 
  | 'Full Body' 
  | '3/4 Body' 
  | 'Waist Up' 
  | 'Close Up';

export type CameraAngle = 
  | 'Eye Level' 
  | 'Low Angle' 
  | 'High Angle' 
  | 'Editorial 3/4';

export type AspectRatio = '1:1' | '4:5' | '9:16' | '16:9';

export interface StyleConfiguration {
  pose: PoseType;
  camera: CameraPreset;
  angle: CameraAngle;
  aspectRatio: AspectRatio;
  lighting: string;
  fidelityLevel: 'Maximum' | 'High' | 'Standard';
  strictMode: boolean;
  preserveBackground: boolean;
}

export interface FidelityScore {
  clothingMatch: number;      // e.g. 0.98 -> 98%
  modelMatch: number;         // e.g. 0.97 -> 97%
  sceneMatch: number;         // e.g. 0.99 -> 99%
  overallFidelity: number;    // e.g. 0.98 -> 98%
  issues: string[];
  passed: boolean;
}

export interface GenerationJob {
  id: string;
  projectId: string;
  timestamp: string;
  clothingItems: ClothingItem[];
  model: ModelProfile;
  scene: SceneBackground;
  style: StyleConfiguration;
  status: 'QUEUED' | 'GENERATING' | 'VALIDATING' | 'READY' | 'APPROVED' | 'REJECTED';
  outputImageUrl: string;
  fidelityScore: FidelityScore;
  seed: number;
  promptVersion: string;
  referenceLocked: boolean;
  isApproved: boolean;
}

export type AnimationPresetType = 
  | 'walk'
  | 'spin_360'
  | 'fashion_pose'
  | 'turn'
  | 'showcase'
  | 'camera_orbit'
  | 'slow_zoom';

export interface AnimationConfig {
  preset: AnimationPresetType;
  title: string;
  durationSeconds: 5 | 8 | 10;
  motionIntensity: 'Low' | 'Medium' | 'High';
  cameraMovement: 'Fixed' | 'Orbit' | 'Tracking' | 'Slow Zoom';
  clothingFidelity: 'Maximum';
  modelFidelity: 'Maximum';
  backgroundLocked: boolean;
}

export interface VideoJob {
  id: string;
  generationId: string;
  config: AnimationConfig;
  status: 'PREPARING' | 'GENERATING' | 'CHECKING_CONSISTENCY' | 'APPROVED';
  videoUrl: string;
  thumbnailUrl: string;
  duration: number;
  consistencyChecks: {
    clothingConsistency: number; // 99%
    modelConsistency: number;    // 98%
    sceneConsistency: number;    // 99%
    motionQuality: number;       // 96%
    passed: boolean;
  };
}

export interface Project {
  id: string;
  name: string;
  collectionName: string;
  thumbnailUrl: string;
  generationCount: number;
  approvedCount: number;
  videoCount: number;
  lastUpdated: string;
  clothingIds: string[];
  selectedModelId?: string;
  selectedSceneId?: string;
}
