
"use client";

import { useState } from "react";
import { Cpu, Sparkles, X, Search, Navigation2, Clock, Info } from "lucide-react";
import { GATHERING_RESOURCES } from "@/lib/routes-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { optimizeGatheringRoutes } from "@/ai/flows/optimize-gathering-routes";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export function LootOracle() {
  const [selectedResources, setSelectedResources] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const toggleResource = (res: string) => {
    if (selectedResources.includes(res)) {
      setSelectedResources(prev => prev.filter(r => r !== res));
    } else {
      setSelectedResources(prev => [...prev, res]);
    }
  };

  const runOracle = async () => {
    if (selectedResources.length === 0) {
      toast({ title: "Error", description: "Select at least one resource", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const output = await optimizeGatheringRoutes({
        desiredResources: selectedResources,
        currentLocation: { x: -452.12, y: 1120.45, z: 34.25 }
      });
      setResult(output);
    } catch (e) {
      toast({ title: "Oracle Failure", description: "Failed to calculate optimal path.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 h-full">
      <div className="glass-card p-4 rounded-xl flex flex-col gap-3 shrink-0">
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-primary" />
            <h3 className="text-[11px] font-headline font-bold uppercase tracking-wider">Loot Oracle</h3>
          </div>
          <Sparkles className="w-3 h-3 text-secondary animate-pulse" />
        </div>

        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-2 w-3.5 h-3.5 text-muted-foreground" />
            <input 
              placeholder="Search..." 
              className="w-full bg-white/5 border border-white/10 rounded py-1.5 pl-8 pr-4 text-[10px] focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <ScrollArea className="h-[120px]">
            <div className="flex flex-wrap gap-1.5 pr-2">
              {GATHERING_RESOURCES.map((res) => (
                <button
                  key={res}
                  onClick={() => toggleResource(res)}
                  className={cn(
                    "px-2 py-1 rounded-full text-[9px] transition-all border",
                    selectedResources.includes(res)
                      ? "bg-primary border-primary text-white"
                      : "bg-white/5 border-white/10 text-muted-foreground hover:border-white/30"
                  )}
                >
                  {res}
                </button>
              ))}
            </div>
          </ScrollArea>

          <Button 
            onClick={runOracle} 
            disabled={loading || selectedResources.length === 0}
            className="w-full bg-gradient-to-r from-primary to-secondary text-white font-bold h-9 rounded-lg group transition-all text-[10px]"
          >
            {loading ? "Calculating..." : "Invoke Optimal Oracle"}
          </Button>
        </div>
      </div>

      <div className="glass-card rounded-xl flex-1 flex flex-col relative overflow-hidden bg-black/20">
        {!result && !loading && (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6 gap-3">
             <Cpu className="w-8 h-8 text-muted-foreground opacity-10" />
             <p className="text-[10px] text-muted-foreground/60">Awaiting Flux Input</p>
          </div>
        )}

        {loading && (
          <div className="flex-1 flex flex-col items-center justify-center p-8 gap-4">
             <div className="w-16 h-16 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
             <p className="text-[9px] font-headline font-bold uppercase tracking-widest text-secondary">Analyzing Map Nodes</p>
          </div>
        )}

        {result && (
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-4">
               <div className="flex items-center justify-between bg-primary/10 p-2 rounded-lg border border-primary/20">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-primary" />
                    <span className="text-[12px] font-code text-white">{(result.estimatedTimeSeconds / 60).toFixed(1)}m</span>
                  </div>
                  <div className="flex items-center gap-2 border-l border-white/10 pl-2">
                    <Navigation2 className="w-3.5 h-3.5 text-secondary" />
                    <span className="text-[12px] font-code text-white">{result.path.length}pts</span>
                  </div>
               </div>

               <div className="space-y-2">
                  {result.path.map((node: any, idx: number) => (
                    <div key={idx} className="flex items-center gap-3 p-2 rounded bg-black/40 border border-white/5">
                      <div className="w-6 h-6 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-[9px] font-code text-primary shrink-0">
                        {idx + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h6 className="text-[10px] font-bold text-white truncate">{node.name}</h6>
                        <span className="text-[8px] font-code text-muted-foreground uppercase">{node.type}</span>
                      </div>
                      <Button size="icon" variant="ghost" className="h-6 w-6">
                        <Navigation2 className="w-3 h-3 text-primary" />
                      </Button>
                    </div>
                  ))}
               </div>
            </div>
          </ScrollArea>
        )}
      </div>
    </div>
  );
}
