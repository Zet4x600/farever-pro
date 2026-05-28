
"use client";

import { useState } from "react";
import { Compass, ChevronLeft, ChevronRight, Play, Square, MapPin, Keyboard, Settings2 } from "lucide-react";
import { ROUTE_DATA } from "@/lib/routes-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

export function SteppedNavigator() {
  const [selectedCategory, setSelectedCategory] = useState(ROUTE_DATA[0] || { name: "N/A", routes: [] });
  const [selectedRoute, setSelectedRoute] = useState(selectedCategory.routes[0] || { label: "N/A", description: "", points: [] });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const [teleportSettings, setTeleportSettings] = useState({
    stepDist: 25,
    waitTime: 100,
  });

  const nextPoint = () => {
    if (!selectedRoute.points) return;
    setCurrentIndex(prev => (prev + 1) % selectedRoute.points.length);
  };

  const prevPoint = () => {
    if (!selectedRoute.points) return;
    const len = selectedRoute.points.length;
    setCurrentIndex(prev => (prev - 1 + len) % len);
  };

  return (
    <div className="flex flex-col gap-1.5 h-full overflow-hidden">
      <div className="glass-card rounded-lg flex flex-col border-white/10 overflow-hidden shrink-0">
        <div className="p-1.5 border-b border-white/5 flex items-center justify-between bg-white/5">
          <div className="flex items-center gap-1.5">
            <Compass className="w-4 h-4 text-secondary" />
            <h3 className="text-[11px] font-headline font-bold uppercase tracking-wider">Nav Hub</h3>
          </div>
          <Keyboard className="w-3.5 h-3.5 text-muted-foreground opacity-50" />
        </div>
        
        <div className="p-1 space-y-1.5 overflow-y-auto max-h-[140px] custom-scrollbar bg-black/20">
          {ROUTE_DATA.map((cat) => (
            <div key={cat.name} className="space-y-1">
              <h4 className="px-1.5 py-0.5 text-[10px] font-headline text-muted-foreground uppercase tracking-widest border-l border-primary ml-1">
                {cat.name}
              </h4>
              <div className="flex flex-col gap-1">
                {cat.routes.map((route) => (
                  <button
                    key={route.label}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setSelectedRoute(route);
                      setCurrentIndex(0);
                    }}
                    className={cn(
                      "w-full text-left px-2 py-1.5 rounded text-[11px] transition-all flex items-center justify-between group",
                      selectedRoute.label === route.label 
                        ? "bg-primary/30 text-white border border-primary/30 shadow-sm" 
                        : "hover:bg-white/5 text-muted-foreground hover:text-white border border-transparent"
                    )}
                  >
                    <span className="font-bold uppercase truncate mr-2">{route.label}</span>
                    <Badge variant="outline" className="text-[9px] h-4 px-1.5 border-white/10 bg-black/40 shrink-0 py-0">
                      {route.points?.length || 0}
                    </Badge>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card rounded-lg flex flex-col border-white/10 overflow-hidden flex-1 min-h-0">
        <div className="p-2.5 flex flex-col gap-2 h-full">
          <div className="flex justify-between items-center bg-white/5 p-2 rounded-lg border border-white/5">
            <div className="flex flex-col min-w-0">
              <h2 className="text-[12px] font-headline font-bold text-white uppercase leading-none truncate">{selectedRoute.label}</h2>
              <span className="text-[10px] text-muted-foreground italic truncate mt-1.5">{selectedRoute.description}</span>
            </div>
            <div className="shrink-0 ml-2">
              {!isActive ? (
                <Button onClick={() => setIsActive(true)} size="sm" className="h-7 px-3 bg-secondary text-secondary-foreground text-[11px] font-bold uppercase tracking-tighter">
                  <Play className="w-3.5 h-3.5 mr-1" /> START
                </Button>
              ) : (
                <Button onClick={() => setIsActive(false)} size="sm" variant="destructive" className="h-7 px-3 text-[11px] font-bold uppercase tracking-tighter">
                  <Square className="w-3.5 h-3.5 mr-1" /> STOP
                </Button>
              )}
            </div>
          </div>

          <div className="bg-black/40 rounded-lg border border-white/5 p-2.5 flex flex-col gap-2.5">
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-secondary/10 p-2 rounded border border-secondary/20">
                    <MapPin className="w-4 h-4 text-secondary" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase font-headline text-muted-foreground tracking-widest leading-none">TARGET</span>
                    <h4 className="text-[11px] font-headline font-bold text-secondary uppercase leading-tight mt-1.5 truncate max-w-[150px]">
                      {selectedRoute.points?.[currentIndex]?.name || "END"}
                    </h4>
                  </div>
                </div>
                <div className="text-right">
                  <span className="block text-[9px] uppercase font-headline text-muted-foreground leading-none">STEP</span>
                  <span className="text-[18px] font-code text-white leading-none">
                    {currentIndex + 1}<span className="text-[11px] text-muted-foreground">/{(selectedRoute.points?.length || 0)}</span>
                  </span>
                </div>
             </div>

             <div className="grid grid-cols-3 gap-1.5">
               <CoordBox label="X" val={selectedRoute.points?.[currentIndex]?.x?.toFixed(2) || "0.00"} />
               <CoordBox label="Y" val={selectedRoute.points?.[currentIndex]?.y?.toFixed(2) || "0.00"} />
               <CoordBox label="Z" val={selectedRoute.points?.[currentIndex]?.z?.toFixed(2) || "0.00"} />
             </div>

             <div className="flex gap-2">
               <Button onClick={prevPoint} variant="outline" className="flex-1 h-8 text-[11px] uppercase font-bold border-white/10">
                 <ChevronLeft className="w-4 h-4 mr-1" /> PREV
               </Button>
               <Button onClick={nextPoint} variant="outline" className="flex-1 h-8 text-[11px] uppercase font-bold border-white/10">
                 NEXT <ChevronRight className="w-4 h-4 ml-1" />
               </Button>
             </div>
          </div>

          <div className="mt-auto pt-3 border-t border-white/5 space-y-3 pb-1">
             <div className="flex items-center gap-1.5">
                <Settings2 className="w-4 h-4 text-secondary" />
                <span className="text-[10px] font-headline font-bold uppercase tracking-widest text-secondary">Teleport Engine</span>
             </div>
             <div className="grid grid-cols-2 gap-4">
               <TuningSlider 
                  label="Step D" 
                  val={`${teleportSettings.stepDist}m`} 
                  value={[teleportSettings.stepDist]} 
                  max={100} 
                  color="secondary" 
                  onChange={(v: number[]) => setTeleportSettings(p => ({...p, stepDist: v[0]}))}
                />
                <TuningSlider 
                  label="Wait" 
                  val={`${teleportSettings.waitTime}ms`} 
                  value={[teleportSettings.waitTime]} 
                  max={1000} 
                  min={10} 
                  color="primary" 
                  onChange={(v: number[]) => setTeleportSettings(p => ({...p, waitTime: v[0]}))}
                />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CoordBox({ label, val }: any) {
  return (
    <div className="p-1.5 rounded-md bg-white/5 border border-white/5 text-center">
      <span className="block text-[10px] text-muted-foreground uppercase font-headline leading-none mb-1">{label}</span>
      <span className="text-[11px] font-code text-white leading-none">{val}</span>
    </div>
  );
}

function TuningSlider({ label, val, value, max, min = 0, step = 1, color, onChange }: any) {
  const textColor = color === 'primary' ? 'text-primary' : 'text-secondary';
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-[10px] font-headline font-bold uppercase leading-none px-0.5">
        <span className="text-muted-foreground">{label}</span>
        <span className={cn(textColor, "font-code")}>{val}</span>
      </div>
      <Slider 
        value={value} 
        onValueChange={onChange}
        max={max} 
        min={min} 
        step={step} 
        className="h-2"
      />
    </div>
  );
}
