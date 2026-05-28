
"use client";

import { useState } from "react";
import { Eye, Settings2, Layers, MousePointer2, Info } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const ENTITY_PRESETS = [
  { label: "Enemy", color: "bg-red-500", glow: "shadow-red-500/50" },
  { label: "Player", color: "bg-blue-500", glow: "shadow-blue-500/50" },
  { label: "Boss/Elite", color: "bg-purple-500", glow: "shadow-purple-500/50" },
  { label: "Companion", color: "bg-green-500", glow: "shadow-green-500/50" },
  { label: "NPC", color: "bg-orange-500", glow: "shadow-orange-500/50" },
  { label: "Chest", color: "bg-yellow-500", glow: "shadow-yellow-500/50" },
  { label: "Gathering", color: "bg-amber-800", glow: "shadow-amber-800/50" },
  { label: "Collectible", color: "bg-white", glow: "shadow-white/50" },
];

export function EspConfig() {
  const [espEnabled, setEspEnabled] = useState(true);
  const [activeEntities, setActiveEntities] = useState<Record<string, boolean>>(
    ENTITY_PRESETS.reduce((acc, p) => ({ ...acc, [p.label]: true }), {})
  );
  
  const [espSettings, setEspSettings] = useState({
    maxDist: 500,
    distScale: 0.5,
    baseScale: 2.0,
    clamp: true,
    scaleRate: 1.0,
    offsetX: -12,
    offsetY: 0,
  });

  const toggleEntity = (label: string) => {
    setActiveEntities(prev => ({ ...prev, [label]: !prev[label] }));
  };

  const updateSetting = (key: keyof typeof espSettings, val: number | boolean) => {
    setEspSettings(prev => ({ ...prev, [key]: val }));
  };

  return (
    <div className="flex flex-col gap-2 h-full">
      <div 
        onClick={() => setEspEnabled(!espEnabled)}
        className={cn(
          "glass-card p-3 rounded-lg flex items-center justify-between cursor-pointer transition-all border",
          espEnabled ? "border-primary/60 bg-primary/10 neon-glow-primary" : "border-white/5 opacity-60"
        )}
      >
        <div className="flex items-center gap-2">
          <Eye className={cn("w-4 h-4 transition-colors", espEnabled ? "text-primary" : "text-muted-foreground")} />
          <h3 className="text-[11px] font-headline font-bold uppercase tracking-widest text-white">Master ESP Script</h3>
        </div>
        <Switch checked={espEnabled} onCheckedChange={setEspEnabled} className="scale-75 pointer-events-none" />
      </div>

      <ScrollArea className="flex-1 pr-2">
        <div className={cn("space-y-3 pb-2 transition-opacity", !espEnabled && "opacity-40 pointer-events-none")}>
          
          <div className="glass-card p-2 rounded-lg space-y-2 border-white/5">
            <div className="flex items-center gap-1.5 border-b border-white/5 pb-1.5">
              <Layers className="w-3.5 h-3.5 text-secondary" />
              <h4 className="text-[10px] font-headline font-bold uppercase tracking-widest text-secondary">Entity Pointers</h4>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {ENTITY_PRESETS.map((preset) => (
                <div 
                  key={preset.label} 
                  onClick={() => toggleEntity(preset.label)}
                  className={cn(
                    "flex items-center gap-2 p-1.5 rounded border transition-all cursor-pointer",
                    activeEntities[preset.label] 
                      ? `bg-white/10 border-white/30 opacity-100 shadow-[inset_0_0_15px_rgba(255,255,255,0.05),0_0_10px_rgba(255,255,255,0.1)]` 
                      : "bg-white/5 border-transparent opacity-40 hover:opacity-60"
                  )}
                >
                  <div className={cn(
                    "w-2.5 h-2.5 rounded-full transition-all", 
                    preset.color,
                    activeEntities[preset.label] && `shadow-[0_0_12px_currentColor] scale-125`
                  )} />
                  <span className="text-[10px] font-bold uppercase text-white/90">{preset.label}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-1.5 px-2 py-1 bg-primary/5 rounded border border-primary/10 mt-1">
              <Info className="w-3 h-3 text-primary shrink-0" />
              <p className="text-[8px] text-muted-foreground uppercase leading-tight italic">
                Icons may appear as crosses until memory resolves (approx. 5s).
              </p>
            </div>
          </div>

          <div className="glass-card p-2 rounded-lg space-y-4 border-white/5">
            <div className="flex items-center gap-1.5 border-b border-white/5 pb-1.5">
              <Settings2 className="w-3.5 h-3.5 text-primary" />
              <h4 className="text-[10px] font-headline font-bold uppercase tracking-widest text-primary">Renderer Parameters</h4>
            </div>

            <TuningSlider 
              label="Max Distance" 
              val={`${espSettings.maxDist}u`} 
              value={[espSettings.maxDist]} 
              max={2000} 
              min={0}
              color="primary"
              onChange={(v: number[]) => updateSetting('maxDist', v[0])}
            />

            <div className="grid grid-cols-2 gap-4">
              <TuningSlider 
                label="Base Scale" 
                val={espSettings.baseScale.toFixed(1)} 
                value={[espSettings.baseScale]} 
                max={5.0} 
                min={0.1}
                step={0.1}
                color="secondary"
                onChange={(v: number[]) => updateSetting('baseScale', v[0])}
              />
              <TuningSlider 
                label="Scale Rate" 
                val={espSettings.scaleRate.toFixed(1)} 
                value={[espSettings.scaleRate]} 
                max={5.0} 
                min={0.1}
                step={0.1}
                color="primary"
                onChange={(v: number[]) => updateSetting('scaleRate', v[0])}
              />
            </div>

            <TuningSlider 
              label="Distance Scale" 
              val={espSettings.distScale.toFixed(2)} 
              value={[espSettings.distScale * 100]} 
              max={100} 
              min={-100}
              color="secondary"
              onChange={(v: number[]) => updateSetting('distScale', v[0] / 100)}
            />

            <div 
              onClick={() => updateSetting('clamp', !espSettings.clamp)}
              className={cn(
                "flex items-center justify-between p-2 rounded border transition-all cursor-pointer group",
                espSettings.clamp ? "bg-white/10 border-white/30 neon-glow-accent" : "bg-white/5 border-transparent opacity-60 hover:opacity-100"
              )}
            >
              <div className="flex flex-col">
                <Label className="text-[10px] font-bold uppercase text-white cursor-pointer">Clamp to Screen</Label>
                <span className="text-[9px] text-muted-foreground uppercase leading-none mt-0.5">Pin icons to edges</span>
              </div>
              <Switch checked={espSettings.clamp} onCheckedChange={(v) => updateSetting('clamp', v)} className="scale-75 pointer-events-none" />
            </div>
          </div>
        </div>
      </ScrollArea>
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
