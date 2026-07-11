import React from 'react';
import { Eye } from 'lucide-react';

export default function PlaceholderImage({ 
  aspect = 'aspect-[16/9]', 
  label = 'Concept Art', 
  // Prompt kept inside source comments for the developer:
  // Prompt: e.g. "Futuristic train station, glowing green banyan tree root pillars"
  prompt = '', 
  glowColor = 'rgba(255,255,255,0.05)'
}) {
  return (
    <div 
      className={`relative w-full ${aspect} bg-[#0c0e14] border border-slate-900 rounded-xl overflow-hidden flex flex-col items-center justify-center p-6 text-center group transition-all duration-300 focus-within:ring-1 focus-within:ring-rose-500/50`}
      style={{
        boxShadow: `inset 0 0 40px rgba(0,0,0,0.8), 0 0 10px ${glowColor}`
      }}
    >
      {/* Background digital grid pattern */}
      <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none"></div>
      
      {/* Laser scanline sweep animation */}
      <div className="absolute left-0 right-0 h-[1.5px] bg-rose-500/30 shadow-[0_0_10px_rgba(225,29,72,0.8)] animate-pulse-glow pointer-events-none" style={{
        animation: 'sweep-laser 4s ease-in-out infinite'
      }}></div>

      {/* Decorative corners */}
      <div className="absolute top-3 left-3 w-1.5 h-1.5 border-t border-l border-slate-700"></div>
      <div className="absolute top-3 right-3 w-1.5 h-1.5 border-t border-r border-slate-700"></div>
      <div className="absolute bottom-3 left-3 w-1.5 h-1.5 border-b border-l border-slate-700"></div>
      <div className="absolute bottom-3 right-3 w-1.5 h-1.5 border-b border-r border-slate-700"></div>

      {/* Floating Wireframe Icon */}
      <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-900 text-slate-500 mb-2 group-hover:scale-105 group-hover:text-rose-500 group-hover:border-rose-500/20 transition-all duration-300">
        <Eye className="w-5 h-5 animate-pulse" />
      </div>

      <span className="text-[10px] uppercase tracking-widest text-slate-400 font-space-mono block mb-1">
        {label}
      </span>
      <p className="text-[9px] text-slate-600 font-space-mono select-none">
        Architectural Render — Compiled
      </p>

      {/* Shimmer overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none"></div>

      {/* Add sweep keyframes dynamically in a style tag for bulletproof execution */}
      <style>{`
        @keyframes sweep-laser {
          0%, 100% { top: 0%; opacity: 0.2; }
          50% { top: 100%; opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}
