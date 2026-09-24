'use client';

import React, { useState } from 'react';
import { useStudio } from '@/context/StudioContext';
import { 
  Plus, 
  FolderKanban, 
  Film, 
  Image as ImageIcon, 
  Sparkles, 
  Clock, 
  ArrowRight, 
  X,
  Layers,
  ChevronRight
} from 'lucide-react';
import { Project } from '@/types';

export default function ProjectDashboard() {
  const { 
    projects, 
    activeProject, 
    setActiveProject, 
    setStep, 
    setActiveTab, 
    createNewProject 
  } = useStudio();

  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState<boolean>(false);
  const [newProjectName, setNewProjectName] = useState<string>('');
  const [newCollectionName, setNewCollectionName] = useState<string>('');

  const handleOpenProject = (project: Project) => {
    setActiveProject(project);
    setActiveTab('studio');
    setStep('clothing');
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectName.trim()) return;
    createNewProject(newProjectName.trim(), newCollectionName.trim() || 'Fashion Studio Look');
    setIsNewProjectModalOpen(false);
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-300">
      
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-b from-[#141419] to-[#0c0c0e] p-8 sm:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 h-96 w-96 rounded-full bg-violet-600/10 blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/[0.05] px-3.5 py-1.5 border border-white/[0.08]">
            <Sparkles className="h-3.5 w-3.5 text-zinc-300" />
            <span className="text-xs font-mono tracking-wider text-zinc-300 uppercase">
              STUDIO ATELIER V2.4
            </span>
          </div>

          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl leading-tight">
            Create fashion content from your references.
          </h1>

          <p className="text-base text-zinc-400 leading-relaxed">
            Upload a garment, choose a model and scene, then create studio-ready images and videos with absolute reference fidelity.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-3">
            <button
              onClick={() => setIsNewProjectModalOpen(true)}
              className="flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-xs font-semibold text-zinc-950 hover:bg-zinc-200 transition-all shadow-xl hover:shadow-white/10 cursor-pointer"
            >
              <Plus className="w-4 h-4 text-zinc-950 stroke-[2.5]" />
              <span>+ New Project</span>
            </button>

            <button
              onClick={() => { setActiveTab('library'); }}
              className="flex items-center gap-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.09] px-6 py-3 text-xs font-medium text-white border border-white/[0.08] transition-all cursor-pointer"
            >
              <span>Explore Asset Library</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Quick Stats Ribbon */}
        <div className="mt-10 pt-8 border-t border-white/[0.06] grid grid-cols-2 sm:grid-cols-4 gap-6">
          <div>
            <span className="text-xs font-mono text-zinc-500 uppercase">Total Generations</span>
            <p className="text-2xl font-semibold text-white mt-1">35</p>
          </div>
          <div>
            <span className="text-xs font-mono text-zinc-500 uppercase">Approved Editorial Looks</span>
            <p className="text-2xl font-semibold text-emerald-400 mt-1">13</p>
          </div>
          <div>
            <span className="text-xs font-mono text-zinc-500 uppercase">Rendered Motion Videos</span>
            <p className="text-2xl font-semibold text-white mt-1">6</p>
          </div>
          <div>
            <span className="text-xs font-mono text-zinc-500 uppercase">Average Fidelity Audit</span>
            <p className="text-2xl font-semibold text-zinc-200 font-mono mt-1">98.5%</p>
          </div>
        </div>
      </div>

      {/* Recent Projects Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-white">
              Recent Projects
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Production workspaces with versioned reference assets and locked requirements.
            </p>
          </div>

          <button
            onClick={() => setIsNewProjectModalOpen(true)}
            className="flex items-center gap-1.5 text-xs text-zinc-300 hover:text-white transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create new</span>
          </button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              onClick={() => handleOpenProject(project)}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.08] bg-[#121215] transition-all hover:border-white/20 hover:shadow-2xl cursor-pointer"
            >
              {/* Project Hero Image */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-950">
                <img
                  src={project.thumbnailUrl}
                  alt={project.name}
                  className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Top badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="rounded-full bg-black/60 backdrop-blur-md px-2.5 py-1 text-[10px] font-mono text-zinc-300 border border-white/10">
                    {project.collectionName}
                  </span>
                  <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-mono text-emerald-300 backdrop-blur-md border border-emerald-500/30">
                    <span>{project.approvedCount} APPROVED</span>
                  </div>
                </div>

                {/* Title over image */}
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-base font-semibold text-white tracking-wide">
                    {project.name}
                  </h3>
                </div>
              </div>

              {/* Card Footer Info */}
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between text-xs text-zinc-400">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <ImageIcon className="w-3.5 h-3.5 text-zinc-500" />
                      {project.generationCount} images
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Film className="w-3.5 h-3.5 text-zinc-500" />
                      {project.videoCount} videos
                    </span>
                  </div>

                  <span className="text-[11px] font-mono text-zinc-500">
                    Updated {project.lastUpdated}
                  </span>
                </div>

                <div className="pt-2 border-t border-white/[0.04] flex items-center justify-between text-xs font-medium text-white group-hover:text-zinc-200">
                  <span>Open Studio Workspace</span>
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* New Project Modal */}
      {isNewProjectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <form 
            onSubmit={handleCreateSubmit}
            className="relative w-full max-w-md rounded-3xl border border-white/[0.1] bg-[#121215] p-6 sm:p-8 shadow-2xl space-y-6"
          >
            <div className="flex items-start justify-between border-b border-white/[0.08] pb-4">
              <div>
                <h3 className="text-lg font-semibold text-white">Create a new look</h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Start an editorial campaign project with reference fidelity guarantees.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsNewProjectModalOpen(false)}
                className="rounded-lg p-1.5 text-zinc-400 hover:bg-white/[0.05] hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-zinc-300 block mb-1.5">
                  Project Title
                </label>
                <input
                  type="text"
                  required
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  placeholder="e.g. Summer Collection 2026"
                  className="w-full rounded-xl bg-black/50 border border-white/10 px-3.5 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-white"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-zinc-300 block mb-1.5">
                  Collection / Campaign Subtitle
                </label>
                <input
                  type="text"
                  value={newCollectionName}
                  onChange={(e) => setNewCollectionName(e.target.value)}
                  placeholder="e.g. Minimalist Sartorial Series"
                  className="w-full rounded-xl bg-black/50 border border-white/10 px-3.5 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-white"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/[0.08]">
              <button
                type="button"
                onClick={() => setIsNewProjectModalOpen(false)}
                className="rounded-xl px-4 py-2 text-xs font-medium text-zinc-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-xl bg-white px-5 py-2 text-xs font-semibold text-zinc-950 hover:bg-zinc-200 transition-all shadow-md"
              >
                Start Creating
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
