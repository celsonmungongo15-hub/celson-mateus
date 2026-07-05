import React, { useState, useEffect } from "react";
import { BookOpen, Compass, Award, Users, Wifi, WifiOff, Battery, Smartphone } from "lucide-react";

interface PhoneFrameProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  offlineMode: boolean;
}

export default function PhoneFrame({ children, activeTab, setActiveTab, offlineMode }: PhoneFrameProps) {
  const [time, setTime] = useState("");

  // Live clock for smartphone emulator
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hrs = String(now.getHours()).padStart(2, "0");
      const mins = String(now.getMinutes()).padStart(2, "0");
      setTime(`${hrs}:${mins}`);
    };
    updateClock();
    const timer = setInterval(updateClock, 1000 * 60);
    return () => clearInterval(timer);
  }, []);

  return (
    <div id="phone-emulator-frame" className="relative w-full max-w-[365px] h-[720px] rounded-[42px] bg-slate-950 border-[9px] border-slate-900 shadow-2xl shadow-cyan-500/10 flex flex-col overflow-hidden ring-4 ring-cyan-500/20">
      
      {/* Speaker Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-b-2xl z-30 flex items-center justify-center gap-1.5">
        {/* Camera pinhole */}
        <div className="w-2 h-2 rounded-full bg-slate-950 border border-slate-800" />
        {/* Speaker line */}
        <div className="w-12 h-1 bg-slate-950 rounded-full" />
      </div>

      {/* Dynamic Status Bar */}
      <div className="px-5 pt-7 pb-2 bg-slate-950 text-white flex items-center justify-between text-[11px] font-bold tracking-tight select-none shrink-0 z-20 font-sans">
        {/* Left Side: Time */}
        <span className="font-mono">{time || "15:33"}</span>
        
        {/* Right Side: Connections / Battery */}
        <div className="flex items-center gap-1.5 text-slate-400">
          {offlineMode ? (
            <WifiOff size={12} className="text-yellow-400 animate-pulse" />
          ) : (
            <Wifi size={12} className="text-cyan-400" />
          )}
          <span className="text-[9px] text-slate-500 font-mono font-medium">5G</span>
          <div className="flex items-center gap-0.5">
            <Battery size={13} className="text-slate-300" />
            <span className="text-[9px] text-slate-400 font-mono">98%</span>
          </div>
        </div>
      </div>

      {/* Main View Port Canvas */}
      <div className="flex-1 relative overflow-hidden bg-slate-950">
        {children}
      </div>

      {/* Native Bottom Tab Bar Dock */}
      <div className="bg-slate-900/90 backdrop-blur-md border-t border-slate-800/80 px-4 pt-2 pb-5 flex items-center justify-between shrink-0 z-20 select-none">
        
        {/* Tab 1: Início */}
        <button
          id="dock-tab-inicio"
          onClick={() => setActiveTab("inicio")}
          className={`flex flex-col items-center gap-1 flex-1 py-1 transition-all cursor-pointer ${
            activeTab === "inicio" ? "text-cyan-400 scale-105" : "text-slate-500 hover:text-slate-300"
          }`}
        >
          <BookOpen size={18} className={activeTab === "inicio" ? "stroke-[2.5]" : ""} />
          <span className="text-[9px] font-black tracking-tight">Início</span>
        </button>

        {/* Tab 2: Explorar */}
        <button
          id="dock-tab-explorar"
          onClick={() => setActiveTab("explorar")}
          className={`flex flex-col items-center gap-1 flex-1 py-1 transition-all cursor-pointer ${
            activeTab === "explorar" ? "text-cyan-400 scale-105" : "text-slate-500 hover:text-slate-300"
          }`}
        >
          <Compass size={18} className={activeTab === "explorar" ? "stroke-[2.5]" : ""} />
          <span className="text-[9px] font-black tracking-tight">Explorar</span>
        </button>

        {/* Tab 3: Comunidade */}
        <button
          id="dock-tab-comunidade"
          onClick={() => setActiveTab("comunidade")}
          className={`flex flex-col items-center gap-1 flex-1 py-1 transition-all cursor-pointer ${
            activeTab === "comunidade" ? "text-cyan-400 scale-105" : "text-slate-500 hover:text-slate-300"
          }`}
        >
          <Users size={18} className={activeTab === "comunidade" ? "stroke-[2.5]" : ""} />
          <span className="text-[9px] font-black tracking-tight">Social</span>
        </button>

        {/* Tab 4: Perfil */}
        <button
          id="dock-tab-perfil"
          onClick={() => setActiveTab("perfil")}
          className={`flex flex-col items-center gap-1 flex-1 py-1 transition-all cursor-pointer ${
            activeTab === "perfil" ? "text-cyan-400 scale-105" : "text-slate-500 hover:text-slate-300"
          }`}
        >
          <Award size={18} className={activeTab === "perfil" ? "stroke-[2.5]" : ""} />
          <span className="text-[9px] font-black tracking-tight">Perfil</span>
        </button>
      </div>

      {/* Physical OS Swipe pill bar */}
      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-24 h-1 bg-slate-700/60 rounded-full z-30 pointer-events-none" />
    </div>
  );
}
