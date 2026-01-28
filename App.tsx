import React, { useState } from 'react';
import { Activity, Upload, FileText, LayoutDashboard, BrainCircuit, Menu, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button, Card, Badge } from './components/UI.tsx';
import { Survey } from './components/Survey.tsx';
import { UploadAnalysis } from './components/UploadAnalysis.tsx';
import { Report } from './components/Report.tsx';
import { BlochSphere, EnergyLandscape, EntanglementMap, HeatmapPreview } from './components/QuantumVisuals.tsx';
import { MammogramAnalysis, SurveyResult } from './types';

type View = 'home' | 'survey' | 'upload' | 'report' | 'lab';

function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [surveyResult, setSurveyResult] = useState<SurveyResult | null>(null);
  const [analysisResult, setAnalysisResult] = useState<MammogramAnalysis | null>(null);
  const [lastReportType, setLastReportType] = useState<'survey' | 'mammogram'>('survey');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSurveyComplete = (result: SurveyResult) => {
    setSurveyResult(result);
    setLastReportType('survey');
    setCurrentView('report');
  };

  const handleAnalysisComplete = (result: MammogramAnalysis) => {
    setAnalysisResult(result);
    setLastReportType('mammogram');
    setCurrentView('report');
  };

  const NavItem = ({ view, icon: Icon, label }: { view: View; icon: any; label: string }) => (
    <button
      onClick={() => {
        setCurrentView(view);
        setIsMobileMenuOpen(false);
      }}
      className={`group flex items-center gap-4 p-4 w-full transition-all duration-300 relative overflow-hidden
        ${currentView === view
          ? 'text-cyan-400 bg-cyan-950/20 border-r-2 border-cyan-500'
          : 'text-slate-400 hover:text-white hover:bg-white/5'
        }`}
    >
      <Icon size={20} className={`min-w-[20px] transition-colors ${currentView === view ? 'text-cyan-400 drop-shadow-[0_0_5px_rgba(6,182,212,0.5)]' : 'group-hover:text-white'}`} />
      <span className={`text-xs font-mono tracking-widest uppercase whitespace-nowrap transition-opacity duration-300 ${isSidebarCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
        {label}
      </span>
      {currentView === view && !isSidebarCollapsed && (
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-transparent pointer-events-none"></div>
      )}
    </button>
  );

  return (
    <div className="flex min-h-screen relative overflow-hidden">
      {/* Decorative Grid Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)]"></div>
      </div>

      {/* Sidebar Navigation (Desktop) */}
      <aside className={`fixed hidden md:flex flex-col border-r border-white/5 bg-slate-950/80 backdrop-blur-xl z-50 h-full transition-all duration-300 ${isSidebarCollapsed ? 'w-20' : 'w-64'}`}>

        {/* Logo Area */}
        <div className="h-20 flex items-center px-6 border-b border-white/5 relative">
          <div className="w-8 h-8 rounded bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.4)] shrink-0">
            <BrainCircuit className="text-white" size={16} />
          </div>
          <div className={`ml-4 transition-opacity duration-300 overflow-hidden whitespace-nowrap ${isSidebarCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
            <h1 className="font-mono font-bold text-lg tracking-wider text-white">Q-VISION</h1>
            <p className="text-[10px] text-cyan-500 font-mono tracking-widest">DIAGNOSTICS</p>
          </div>

          {/* Collapse Toggle */}
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-slate-900 border border-white/10 rounded-full flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500 transition-colors z-50"
          >
            {isSidebarCollapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
          </button>
        </div>

        <nav className="flex-1 py-6 space-y-1">
          <NavItem view="home" icon={LayoutDashboard} label="Dashboard" />
          <NavItem view="survey" icon={Activity} label="Risk Assessment" />
          <NavItem view="upload" icon={Upload} label="Quantum Scan" />
          <NavItem view="lab" icon={BrainCircuit} label="Q-Lab Monitor" />
          {(surveyResult || analysisResult) && (
            <NavItem view="report" icon={FileText} label="Analysis Report" />
          )}
        </nav>

        {/* System Status Footer */}
        <div className={`p-6 border-t border-white/5 transition-opacity duration-300 ${isSidebarCollapsed ? 'items-center flex flex-col' : ''}`}>
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20"></div>
            </div>
            {!isSidebarCollapsed && (
              <div>
                <div className="text-[10px] font-mono text-slate-400">SYSTEM STATUS</div>
                <div className="text-xs font-mono text-green-400">OPERATIONAL</div>
              </div>
            )}
          </div>
          {!isSidebarCollapsed && (
            <div className="mt-4 text-[10px] text-slate-600 font-mono">v3.3.0-BETA</div>
          )}
        </div>
      </aside>

      {/* Mobile Header & Nav */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-slate-950/90 backdrop-blur-md border-b border-white/5 z-50 flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shrink-0">
            <BrainCircuit className="text-white" size={16} />
          </div>
          <span className="font-mono font-bold text-white tracking-wider">Q-VISION</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-slate-300">
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-slate-950/95 pt-20 px-6 animate-fade-in md:hidden">
          <nav className="space-y-2">
            <NavItem view="home" icon={LayoutDashboard} label="Dashboard" />
            <NavItem view="survey" icon={Activity} label="Risk Assessment" />
            <NavItem view="upload" icon={Upload} label="Quantum Scan" />
            <NavItem view="lab" icon={BrainCircuit} label="Q-Lab Monitor" />
            {(surveyResult || analysisResult) && (
              <NavItem view="report" icon={FileText} label="Analysis Report" />
            )}
          </nav>
        </div>
      )}

      {/* Main Content Area */}
      <main className={`flex-1 relative z-10 p-6 md:p-12 transition-all duration-300 mt-16 md:mt-0 ${isSidebarCollapsed ? 'md:ml-20' : 'md:ml-64'}`}>

        {/* Header Content can go here if needed per page */}

        {/* View Routing */}

        {/* HOME VIEW */}
        {currentView === 'home' && (
          <div className="max-w-6xl mx-auto animate-slide-up space-y-12">

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8 relative">
                <div className="absolute -left-20 -top-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none"></div>
                <h2 className="text-4xl md:text-6xl font-black leading-tight tracking-tight">
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-500">QUANTUM</span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">ONCOLOGY</span>
                </h2>
                <p className="text-slate-400 text-lg leading-relaxed max-w-lg font-light border-l-2 border-cyan-500/30 pl-6">
                  Leveraging Variational Quantum Eigensolvers (VQE) and Entanglement-based feature extraction to identify micro-anomalies in breast tissue earlier than classically possible.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <Button onClick={() => setCurrentView('survey')} icon={Activity} className="w-full md:w-auto">Start Assessment</Button>
                  <Button onClick={() => setCurrentView('upload')} variant="secondary" icon={Upload} className="w-full md:w-auto">Upload Mammogram</Button>
                </div>
              </div>

              {/* Hero Visual */}
              <div className="relative h-[500px] w-full flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="relative z-10 w-full max-w-sm">
                  <BlochSphere />
                </div>
                {/* Floating Metric Cards */}
                <div className="absolute top-20 right-0 glass-panel p-4 rounded-xl animate-float backdrop-blur-md border border-white/10" style={{ animationDelay: '1s' }}>
                  <div className="text-[10px] text-cyan-400 font-mono tracking-widest mb-1">MODEL ACCURACY</div>
                  <div className="text-2xl font-bold text-white">99.8%</div>
                </div>
                <div className="absolute bottom-20 left-0 glass-panel p-4 rounded-xl animate-float backdrop-blur-md border border-white/10" style={{ animationDelay: '2s' }}>
                  <div className="text-[10px] text-pink-400 font-mono tracking-widest mb-1">QUBIT COHERENCE</div>
                  <div className="text-2xl font-bold text-white">45ns</div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card title="Symptom Analysis" className="hover:-translate-y-1">
                <p className="text-slate-400 text-sm mb-6 leading-relaxed">AI-driven questionnaire evaluating 12 clinical risk factors with Bayesian inference integration.</p>
                <div className="h-0.5 w-12 bg-cyan-500"></div>
              </Card>
              <Card title="Quantum Radiomics" className="hover:-translate-y-1">
                <p className="text-slate-400 text-sm mb-6 leading-relaxed">Deep feature extraction using qubit entanglement patterns to detect non-linear texture correlations.</p>
                <div className="h-0.5 w-12 bg-pink-500"></div>
              </Card>
              <Card title="Instant Reports" className="hover:-translate-y-1">
                <p className="text-slate-400 text-sm mb-6 leading-relaxed">Generate PDF-ready clinical summaries in seconds, designed for radiologist validation.</p>
                <div className="h-0.5 w-12 bg-blue-500"></div>
              </Card>
            </div>
          </div>
        )}

        {/* OTHER VIEWS */}
        <div className="max-w-7xl mx-auto animate-fade-in">
          {currentView === 'survey' && <Survey onComplete={handleSurveyComplete} />}
          {currentView === 'upload' && <UploadAnalysis onAnalysisComplete={handleAnalysisComplete} />}
          {currentView === 'report' && (!surveyResult && !analysisResult) && (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center">
                <FileText className="text-slate-500" />
              </div>
              <h3 className="text-xl font-mono text-white">No Reports Generated</h3>
              <p className="text-slate-500 max-w-sm">Complete a risk assessment survey or upload a mammogram for analysis to generate a report.</p>
              <div className="flex gap-4 mt-4">
                <Button onClick={() => setCurrentView('survey')} variant="secondary">Go to Survey</Button>
                <Button onClick={() => setCurrentView('upload')} variant="secondary">Upload Scan</Button>
              </div>
            </div>
          )}
          {currentView === 'report' && (surveyResult || analysisResult) && (() => {
            // Safe Data Selection Logic
            let activeData = lastReportType === 'survey' ? surveyResult : analysisResult;
            let activeType = lastReportType;

            // Fallback if the selected type's data is missing but the other exists
            if (!activeData) {
              if (surveyResult) {
                activeData = surveyResult;
                activeType = 'survey';
              } else if (analysisResult) {
                activeData = analysisResult;
                activeType = 'mammogram';
              }
            }

            if (!activeData) return null;

            return (
              <Report
                data={activeData}
                type={activeType}
                onBack={() => setCurrentView('home')}
              />
            );
          })()}
        </div>

        {/* QUANTUM LAB VIEW */}
        {currentView === 'lab' && (
          <div className="space-y-8 animate-fade-in max-w-7xl mx-auto">
            <div className="mb-8 border-b border-white/10 pb-6">
              <h2 className="text-3xl font-mono text-white mb-2">Quantum Visualization Lab</h2>
              <p className="text-cyan-400 font-mono text-xs tracking-widest uppercase">Real-time Telemetry • QPU-07</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card title="Qubit State Vector" className="h-64">
                <div className="h-full flex items-center justify-center pb-8">
                  <BlochSphere />
                </div>
              </Card>
              <Card title="Hamiltonian Landscape" className="h-64">
                <div className="h-full pt-4">
                  <EnergyLandscape />
                </div>
              </Card>
              <Card title="Entanglement Map" className="h-64">
                <div className="h-full flex items-center justify-center pb-8">
                  <EntanglementMap />
                </div>
              </Card>
              <Card title="ZZ-Phase Correlation" className="md:col-span-2 lg:col-span-3">
                <HeatmapPreview risk={0.8} />
              </Card>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}

export default App;