
import { TelemetryHud } from "@/components/telemetry-hud";
import { ModEngine } from "@/components/mod-engine";
import { SteppedNavigator } from "@/components/stepped-navigator";
import { LootOracle } from "@/components/loot-oracle";
import { CoordinateVault } from "@/components/coordinate-vault";
import { EspConfig } from "@/components/esp-config";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Zap, Compass, Sparkles, Cloud, Activity, Eye } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col bg-background text-foreground h-[640px] w-[420px] mx-auto border border-white/10 shadow-2xl overflow-hidden rounded-xl mt-10">
      {/* Header compatto */}
      <header className="shrink-0 border-b border-white/5 bg-card/95 backdrop-blur-md px-3 py-1.5 flex items-center justify-between h-10">
        <div className="flex items-center gap-2">
          <Activity className="text-primary w-4 h-4 animate-pulse" />
          <h1 className="text-[12px] font-headline font-bold uppercase tracking-tighter text-white">
            FAREVER <span className="text-primary">PRO</span>
          </h1>
        </div>
        <TelemetryHud />
      </header>

      {/* Area Contenuto Principale */}
      <main className="flex-1 p-2 overflow-hidden flex flex-col gap-1.5">
        <Tabs defaultValue="mods" className="flex-1 flex flex-col gap-1.5 overflow-hidden">
          <TabsList className="bg-card/40 border border-white/5 h-8 p-1 rounded-lg glass-card shrink-0 w-full justify-between gap-0.5">
            <TabsTrigger value="mods" className="flex-1 h-6 px-0 data-[state=active]:bg-primary data-[state=active]:text-white rounded text-[10px] font-headline uppercase font-bold gap-1 transition-all">
              <Zap className="w-3 h-3" /> MODS
            </TabsTrigger>
            <TabsTrigger value="nav" className="flex-1 h-6 px-0 data-[state=active]:bg-primary data-[state=active]:text-white rounded text-[10px] font-headline uppercase font-bold gap-1 transition-all">
              <Compass className="w-3 h-3" /> NAV
            </TabsTrigger>
            <TabsTrigger value="esp" className="flex-1 h-6 px-0 data-[state=active]:bg-primary data-[state=active]:text-white rounded text-[10px] font-headline uppercase font-bold gap-1 transition-all">
              <Eye className="w-3 h-3" /> ESP
            </TabsTrigger>
            <TabsTrigger value="oracle" className="flex-1 h-6 px-0 data-[state=active]:bg-primary data-[state=active]:text-white rounded text-[10px] font-headline uppercase font-bold gap-1 transition-all">
              <Sparkles className="w-3 h-3" /> ORACLE
            </TabsTrigger>
            <TabsTrigger value="vault" className="flex-1 h-6 px-0 data-[state=active]:bg-primary data-[state=active]:text-white rounded text-[10px] font-headline uppercase font-bold gap-1 transition-all">
              <Cloud className="w-3 h-3" /> VAULT
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar">
            <TabsContent value="mods" className="mt-0 space-y-2 pb-2">
              <ModEngine />
              <div className="grid grid-cols-2 gap-1.5">
                 <div className="glass-card p-2 rounded-lg space-y-1">
                   <h3 className="text-[10px] font-headline font-bold text-muted-foreground uppercase tracking-widest border-b border-white/5 pb-1">Events</h3>
                   <div className="flex items-center justify-between px-1.5 py-1 rounded bg-secondary/5 text-[11px] font-bold">
                     <span className="text-white/80">DUNGEON RUSH</span>
                     <span className="text-secondary animate-pulse text-[10px]">LIVE</span>
                   </div>
                 </div>
                 <div className="glass-card p-2 rounded-lg space-y-1 text-[11px]">
                   <h3 className="text-[10px] font-headline font-bold text-muted-foreground uppercase tracking-widest border-b border-white/5 pb-1">Engine</h3>
                   <div className="flex justify-between font-code text-[10px] px-1 pt-0.5">
                      <span className="text-green-500 font-bold uppercase">PROC: OK</span>
                      <span className="text-secondary font-bold uppercase">BYP: ON</span>
                   </div>
                 </div>
              </div>
            </TabsContent>

            <TabsContent value="nav" className="mt-0 h-full pb-4">
              <SteppedNavigator />
            </TabsContent>

            <TabsContent value="esp" className="mt-0 h-full pb-4">
              <EspConfig />
            </TabsContent>

            <TabsContent value="oracle" className="mt-0 h-full pb-4">
              <LootOracle />
            </TabsContent>

            <TabsContent value="vault" className="mt-0 h-full pb-4">
              <CoordinateVault />
            </TabsContent>
          </div>
        </Tabs>
      </main>

      {/* Footer pulito con versione a sinistra */}
      <footer className="shrink-0 px-3 py-1 border-t border-white/5 bg-card/90 text-[10px] flex justify-between h-8 items-center">
        <Badge variant="outline" className="text-[10px] h-5 px-2 border-primary/30 text-primary py-0 font-bold">
          Farever_v1.5
        </Badge>
        <span className="text-muted-foreground font-code uppercase opacity-30">Advanced Mod Kit</span>
      </footer>
    </div>
  );
}
