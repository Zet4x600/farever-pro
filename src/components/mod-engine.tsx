
"use client";

import { useState } from "react";
import { Zap, ArrowUp, Feather, TimerOff, Eye, FastForward, Wind, ZapOff, Maximize } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export function ModEngine() {
  const [mods, setMods] = useState({
    infiniteJump: true,
    lowGravity: false,
    flyMode: false,
    noCooldown: true,
    speedhack: false,
    moveSpeedActive: false,
    noFriction: false,
    autoSprint: true,
  });

  const [tuning, setTuning] = useState({
    fov: 60,
    camHeight: 0,
    speed: 2.0,
    moveSpeed: 50.0,
    glide: 1.5,
  });

  const toggleMod = (key: keyof typeof mods) => {
    setMods(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const updateTuning = (key: keyof typeof tuning, val: number[]) => {
    setTuning(prev => ({ ...prev, [key]: val[0] }));
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-2 gap-2">
        {/* Physics */}
        <div className="glass-card p-2 rounded-lg border-white/10">
          <div className="flex items-center gap-1.5 border-b border-white/5 pb-1.5 mb-1.5">
            <Zap className="w-3.5 h-3.5 text-primary" />
            <h3 className="text-[10px] font-headline font-bold uppercase tracking-widest text-primary leading-none">Physics</h3>
          </div>
          <div className="space-y-1">
            <ModToggle label="No CD" icon={<TimerOff className="w-4 h-4" />} checked={mods.noCooldown} onChange={() => toggleMod('noCooldown')} />
            <ModToggle label="Inf Jump" icon={<ArrowUp className="w-4 h-4" />} checked={mods.infiniteJump} onChange={() => toggleMod('infiniteJump')} />
            <ModToggle label="Low Grav" icon={<Feather className="w-4 h-4" />} checked={mods.lowGravity} onChange={() => toggleMod('lowGravity')} />
            <ModToggle label="Fly Mode" icon={<Maximize className="w-4 h-4" />} checked={mods.flyMode} onChange={() => toggleMod('flyMode')} />
          </div>
        </div>

        {/* Visuals */}
        <div className="glass-card p-2 rounded-lg border-white/10">
          <div className="flex items-center gap-1.5 border-b border-white/5 pb-1.5 mb-1.5">
            <Eye className="w-3.5 h-3.5 text-primary" />
            <h3 className="text-[10px] font-headline font-bold uppercase tracking-widest text-primary leading-none">Visuals</h3>
          </div>
          <div className="space-y-4 mt-2 px-1">
            <TuningSlider 
              label="Field of View" 
              val={`${tuning.fov}°`} 
              value={[tuning.fov]} 
              max={120} 
              min={30} 
              color="primary" 
              onChange={(v: number[]) => updateTuning('fov', v)}
            />
            <TuningSlider 
              label="Cam Height" 
              val={tuning.camHeight.toString()} 
              value={[tuning.camHeight]} 
              max={500} 
              min={-500} 
              color="primary" 
              onChange={(v: number[]) => updateTuning('camHeight', v)}
            />
          </div>
        </div>
      </div>

      {/* Movement Section */}
      <div className="glass-card p-2 rounded-lg border-white/10">
        <div className="flex items-center gap-1.5 border-b border-white/5 pb-1.5 mb-2">
          <FastForward className="w-3.5 h-3.5 text-secondary" />
          <h3 className="text-[10px] font-headline font-bold uppercase tracking-widest text-secondary leading-none">Movement Engine</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-3">
             <div className="space-y-1.5">
               <div 
                onClick={() => toggleMod('speedhack')}
                className={cn(
                  "flex items-center justify-between px-2 py-1 rounded border h-8 transition-all cursor-pointer group",
                  mods.speedhack 
                    ? "bg-secondary/20 border-secondary/50 neon-glow-accent" 
                    : "bg-white/5 border-white/5 opacity-60 hover:opacity-100"
                )}
               >
                 <span className={cn("text-[10px] font-bold uppercase", mods.speedhack ? "text-secondary" : "text-muted-foreground")}>Speedhack</span>
                 <Switch className="scale-[0.6] origin-right pointer-events-none" checked={mods.speedhack} />
               </div>
               <TuningSlider 
                  label="Global Mult" 
                  val={`x${tuning.speed.toFixed(1)}`} 
                  value={[tuning.speed]} 
                  max={20} 
                  min={0.1}
                  step={0.1}
                  color="secondary" 
                  disabled={!mods.speedhack}
                  onChange={(v: number[]) => updateTuning('speed', v)}
                />
             </div>

             <div className="space-y-1.5">
               <div 
                onClick={() => toggleMod('moveSpeedActive')}
                className={cn(
                  "flex items-center justify-between px-2 py-1 rounded border h-8 transition-all cursor-pointer group",
                  mods.moveSpeedActive 
                    ? "bg-secondary/20 border-secondary/50 neon-glow-accent" 
                    : "bg-white/5 border-white/5 opacity-60 hover:opacity-100"
                )}
               >
                 <span className={cn("text-[10px] font-bold uppercase", mods.moveSpeedActive ? "text-secondary" : "text-muted-foreground")}>Move Speed</span>
                 <Switch className="scale-[0.6] origin-right pointer-events-none" checked={mods.moveSpeedActive} />
               </div>
               <TuningSlider 
                  label="Base Speed" 
                  val={tuning.moveSpeed.toFixed(0)} 
                  value={[tuning.moveSpeed]} 
                  max={100} 
                  min={0}
                  step={1}
                  color="secondary" 
                  disabled={!mods.moveSpeedActive}
                  onChange={(v: number[]) => updateTuning('moveSpeed', v)}
                />
             </div>
          </div>

          <div className="space-y-2">
            <ModToggle label="Auto Sprint" icon={<Wind className="w-4 h-4" />} checked={mods.autoSprint} onChange={() => toggleMod('autoSprint')} />
            <ModToggle label="No Friction" icon={<ZapOff className="w-4 h-4" />} checked={mods.noFriction} onChange={() => toggleMod('noFriction')} />
            
            <div className="pt-1">
              <TuningSlider 
                label="Glide Factor" 
                val={tuning.glide.toFixed(1)} 
                value={[tuning.glide]} 
                max={10} 
                min={0} 
                step={0.1}
                color="secondary" 
                onChange={(v: number[]) => updateTuning('glide', v)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ModToggle({ label, icon, checked, onChange }: any) {
  return (
    <div 
      onClick={onChange}
      className={cn(
        "flex items-center justify-between px-2 h-8 rounded border transition-all cursor-pointer group",
        checked 
          ? "bg-primary/20 border-primary/50 neon-glow-primary" 
          : "bg-white/5 border-white/5 hover:bg-white/10 opacity-60"
      )}
    >
      <div className="flex items-center gap-2">
        <div className={cn("transition-colors", checked ? "text-primary scale-110" : "text-muted-foreground")}>{icon}</div>
        <Label className={cn("uppercase text-[11px] font-bold cursor-pointer leading-none transition-colors", checked ? "text-white" : "text-muted-foreground")}>{label}</Label>
      </div>
      <Switch className="scale-[0.6] origin-right pointer-events-none" checked={checked} />
    </div>
  );
}

function TuningSlider({ label, val, value, max, min = 0, step = 1, color, onChange, disabled = false }: any) {
  const textColor = color === 'primary' ? 'text-primary' : 'text-secondary';

  return (
    <div className={cn("space-y-1.5 transition-opacity", disabled && "opacity-40 pointer-events-none")}>
      <div className="flex justify-between text-[11px] font-headline font-bold uppercase leading-none px-0.5">
        <span className="text-muted-foreground">{label}</span>
        <span className={cn(textColor, "font-code font-bold")}>{val}</span>
      </div>
      <div className="px-1">
        <Slider 
          value={value} 
          onValueChange={onChange}
          max={max} 
          min={min} 
          step={step} 
          className="h-2"
        />
      </div>
    </div>
  );
}
