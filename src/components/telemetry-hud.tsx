"use client";

import { useEffect, useState } from "react";
import { Crosshair, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function TelemetryHud() {
  const [pos, setPos] = useState({ x: -452.12, y: 1120.45, z: 34.25 });
  const [isAttached, setIsAttached] = useState(false);

  useEffect(() => {
    if (!isAttached) return;
    const interval = setInterval(() => {
      setPos(prev => ({
        x: prev.x + (Math.random() - 0.5) * 0.05,
        y: prev.y + (Math.random() - 0.5) * 0.05,
        z: prev.z + (Math.random() - 0.5) * 0.02,
      }));
    }, 100);
    return () => clearInterval(interval);
  }, [isAttached]);

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex gap-1.5 bg-black/40 px-2 py-1 rounded border border-white/5 font-code text-[11px]">
        <div className="flex items-center gap-1">
          <span className="text-primary font-bold">X</span>
          <span className="text-white min-w-[32px]">{pos.x.toFixed(1)}</span>
        </div>
        <div className="flex items-center gap-1 border-l border-white/10 pl-2">
          <span className="text-secondary font-bold">Y</span>
          <span className="text-white min-w-[32px]">{pos.y.toFixed(1)}</span>
        </div>
        <div className="flex items-center gap-1 border-l border-white/10 pl-2">
          <span className="text-blue-400 font-bold">Z</span>
          <span className="text-white min-w-[28px]">{pos.z.toFixed(1)}</span>
        </div>
      </div>
      
      {isAttached ? (
        <div className="flex items-center bg-green-500/10 px-1.5 py-1 rounded border border-green-500/20 text-green-500">
          <Crosshair className="w-3.5 h-3.5 animate-spin-slow" />
        </div>
      ) : (
        <Button 
          onClick={() => setIsAttached(true)}
          size="sm" 
          className="h-6 px-2 bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30 text-[10px] font-bold"
        >
          <Link2 className="w-3 h-3 mr-1" /> ATTACH
        </Button>
      )}
    </div>
  );
}
