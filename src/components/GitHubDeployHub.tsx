import React, { useState } from 'react';
import { GITHUB_DEPLOY_WORKFLOW_YML, SANITY_CONFIG_TS } from '../data/mockData';
import {
  GitBranch,
  Github,
  Play,
  CheckCircle2,
  Copy,
  Check,
  Terminal,
  ExternalLink,
  ShieldCheck,
  Server
} from 'lucide-react';

export const GitHubDeployHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'workflow' | 'pipeline' | 'readme'>('workflow');
  const [workflowCopySuccess, setWorkflowCopySuccess] = useState(false);
  const [readmeCopySuccess, setReadmeCopySuccess] = useState(false);
  const [isSimulatingBuild, setIsSimulatingBuild] = useState(false);
  const [simulationStep, setSimulationStep] = useState<number>(0);

  const simulationSteps = [
    { title: 'Checkout Repository (actions/checkout@v4)', log: 'Cloning main branch at commit a18df9c...' },
    { title: 'Setup Node.js 20 & Cache', log: 'Resolved node v20.18.0 with npm clean cache.' },
    { title: 'Inject Sanity Environment Variables', log: 'Injected secrets: VITE_SANITY_PROJECT_ID, VITE_SANITY_DATASET.' },
    { title: 'Vite Production Build', log: 'vite v8.3.0 building for production... dist/ generated (1.4MB).' },
    { title: 'Publish Artifact to GitHub Pages', log: 'Deployment successful: https://username.github.io/real-estate-photography' },
  ];

  const runActionsSimulation = () => {
    setIsSimulatingBuild(true);
    setSimulationStep(0);

    const interval = setInterval(() => {
      setSimulationStep((prev) => {
        if (prev >= simulationSteps.length - 1) {
          clearInterval(interval);
          setIsSimulatingBuild(false);
          return prev;
        }
        return prev + 1;
      });
    }, 800);
  };

  const handleCopyWorkflow = () => {
    navigator.clipboard.writeText(GITHUB_DEPLOY_WORKFLOW_YML);
    setWorkflowCopySuccess(true);
    setTimeout(() => setWorkflowCopySuccess(false), 2000);
  };

  const sampleReadme = `# Casa View 360 · Denver Real Estate Photography Studio
> Specialized Denver Metro Real Estate Photography Website powered by Sanity Studio CMS and hosted on GitHub Pages.

## Quick Start

1. Clone repository:
\`\`\`bash
git clone https://github.com/your-username/casaview360-website.git
cd casaview360-website
npm install
\`\`\`

2. Connect Sanity CMS:
\`\`\`bash
# Create .env.local
VITE_SANITY_PROJECT_ID="your_project_id"
VITE_SANITY_DATASET="production"
\`\`\`

3. Run locally:
\`\`\`bash
npm run dev
\`\`\`

## GitHub Actions Automated Deployment

This repository includes a turnkey \`.github/workflows/deploy.yml\` that automatically builds and deploys this website to **GitHub Pages** on every push to \`main\`.
`;

  const handleCopyReadme = () => {
    navigator.clipboard.writeText(sampleReadme);
    setReadmeCopySuccess(true);
    setTimeout(() => setReadmeCopySuccess(false), 2000);
  };

  return (
    <section id="github-deploy" className="w-full py-20 bg-zinc-950 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-cyan-400 uppercase font-mono mb-2">
              <span>GitHub CI/CD Automation</span>
              <span aria-hidden="true">·</span>
              <span>GitHub Pages Hosting</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-white font-medium">
              Hosted on GitHub & Synced with Sanity
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-2xl">
              Zero-cost static hosting with automated GitHub Actions CI/CD. Every time you publish a
              shoot in Sanity, GitHub actions can trigger an automatic static rebuild or client-side GROQ re-fetch.
            </p>
          </div>

          {/* Tab Selector */}
          <div className="flex items-center gap-1.5 p-1 bg-zinc-900 border border-zinc-800 rounded-sm self-start md:self-auto">
            <button
              onClick={() => setActiveTab('workflow')}
              className={`px-3 py-1.5 text-xs font-mono rounded-sm transition-colors flex items-center gap-1.5 ${
                activeTab === 'workflow'
                  ? 'bg-cyan-500 text-zinc-950 font-semibold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <GitBranch className="w-3.5 h-3.5" />
              <span>deploy.yml</span>
            </button>
            <button
              onClick={() => setActiveTab('pipeline')}
              className={`px-3 py-1.5 text-xs font-mono rounded-sm transition-colors flex items-center gap-1.5 ${
                activeTab === 'pipeline'
                  ? 'bg-cyan-500 text-zinc-950 font-semibold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Server className="w-3.5 h-3.5" />
              <span>Actions Runner Test</span>
            </button>
            <button
              onClick={() => setActiveTab('readme')}
              className={`px-3 py-1.5 text-xs font-mono rounded-sm transition-colors flex items-center gap-1.5 ${
                activeTab === 'readme'
                  ? 'bg-cyan-500 text-zinc-950 font-semibold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>README.md Setup</span>
            </button>
          </div>
        </div>

        {/* 4 Step Setup Guide */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="p-5 bg-zinc-900/60 border border-zinc-800 rounded-sm">
            <div className="text-xs font-mono text-cyan-400 uppercase mb-2">Step 01</div>
            <h4 className="text-sm font-semibold text-white mb-2">Create GitHub Repo</h4>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              Create a new public or private repository named <code className="text-zinc-200">real-estate-photography</code> on github.com.
            </p>
          </div>

          <div className="p-5 bg-zinc-900/60 border border-zinc-800 rounded-sm">
            <div className="text-xs font-mono text-cyan-400 uppercase mb-2">Step 02</div>
            <h4 className="text-sm font-semibold text-white mb-2">Add Workflow File</h4>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              Save the provided workflow into <code className="text-zinc-200">.github/workflows/deploy.yml</code> in your repository.
            </p>
          </div>

          <div className="p-5 bg-zinc-900/60 border border-zinc-800 rounded-sm">
            <div className="text-xs font-mono text-cyan-400 uppercase mb-2">Step 03</div>
            <h4 className="text-sm font-semibold text-white mb-2">Configure Secrets</h4>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              Under <em>Settings → Secrets and variables → Actions</em>, add <code className="text-zinc-200">SANITY_PROJECT_ID</code>.
            </p>
          </div>

          <div className="p-5 bg-zinc-900/60 border border-zinc-800 rounded-sm">
            <div className="text-xs font-mono text-cyan-400 uppercase mb-2">Step 04</div>
            <h4 className="text-sm font-semibold text-white mb-2">Enable GitHub Pages</h4>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              Under <em>Settings → Pages → Build and deployment</em>, set Source to <strong>GitHub Actions</strong>.
            </p>
          </div>
        </div>

        {/* Tab 1: Workflow Code */}
        {activeTab === 'workflow' && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-sm p-6">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-zinc-800">
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-300">
                <Github className="w-4 h-4 text-white" />
                <span>.github/workflows/deploy.yml</span>
              </div>
              <button
                onClick={handleCopyWorkflow}
                className="px-3 py-1.5 text-xs font-mono bg-zinc-800 hover:bg-zinc-700 text-white rounded-sm transition-colors flex items-center gap-1.5"
              >
                {workflowCopySuccess ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied YAML</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy deploy.yml</span>
                  </>
                )}
              </button>
            </div>
            <pre className="text-xs font-mono text-cyan-300 bg-zinc-950 p-4 rounded-sm overflow-x-auto max-h-[460px]">
              {GITHUB_DEPLOY_WORKFLOW_YML}
            </pre>
          </div>
        )}

        {/* Tab 2: Actions Runner Simulation */}
        {activeTab === 'pipeline' && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-sm p-6">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-zinc-800">
              <div>
                <h4 className="text-sm font-semibold text-white">GitHub Actions Runner Simulator</h4>
                <div className="text-xs font-mono text-zinc-500">ubuntu-latest · Node.js 20 · Vite Build</div>
              </div>
              <button
                onClick={runActionsSimulation}
                disabled={isSimulatingBuild}
                className="px-4 py-2 text-xs font-mono font-semibold text-zinc-950 bg-cyan-400 hover:bg-cyan-300 rounded-sm flex items-center gap-1.5 transition-colors"
              >
                <Play className="w-3.5 h-3.5" />
                <span>{isSimulatingBuild ? 'Running Workflow...' : 'Simulate GitHub Actions Run'}</span>
              </button>
            </div>

            <div className="space-y-4">
              {simulationSteps.map((step, idx) => {
                const isCompleted = idx <= simulationStep;
                const isCurrent = idx === simulationStep && isSimulatingBuild;

                return (
                  <div
                    key={idx}
                    className={`p-4 rounded-sm border font-mono text-xs transition-colors ${
                      isCompleted
                        ? 'bg-zinc-950 border-cyan-500/60 text-white'
                        : 'bg-zinc-950/40 border-zinc-800 text-zinc-600'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {isCompleted ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-zinc-700"></div>
                        )}
                        <span className="font-semibold">{step.title}</span>
                      </div>
                      <span className="text-[11px] text-zinc-500">
                        {isCurrent ? 'RUNNING...' : isCompleted ? 'DONE' : 'QUEUED'}
                      </span>
                    </div>
                    {isCompleted && (
                      <div className="mt-2 pl-6 text-zinc-400 text-[11px] border-l border-zinc-800">
                        {step.log}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 3: README */}
        {activeTab === 'readme' && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-sm p-6">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-zinc-800">
              <span className="text-xs font-mono text-zinc-300">README.md</span>
              <button
                onClick={handleCopyReadme}
                className="px-3 py-1.5 text-xs font-mono bg-zinc-800 hover:bg-zinc-700 text-white rounded-sm transition-colors flex items-center gap-1.5"
              >
                {readmeCopySuccess ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{readmeCopySuccess ? 'Copied' : 'Copy README'}</span>
              </button>
            </div>
            <pre className="text-xs font-mono text-zinc-300 bg-zinc-950 p-4 rounded-sm overflow-x-auto max-h-[460px]">
              {sampleReadme}
            </pre>
          </div>
        )}
      </div>
    </section>
  );
};
