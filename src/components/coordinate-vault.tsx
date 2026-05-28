
"use client";

import { useState } from "react";
import { Cloud, Save, Trash2, MapPin, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

type SavedCoord = {
  id: string;
  label: string;
  x: number;
  y: number;
  z: number;
  timestamp: Date;
};

export function CoordinateVault() {
  const [search, setSearch] = useState("");
  const [newLabel, setNewLabel] = useState("");
  const [savedCoords, setSavedCoords] = useState<SavedCoord[]>([
    { id: "1", label: "Secret Cave Entrance", x: -1245.2, y: 556.3, z: 12.5, timestamp: new Date() },
    { id: "2", label: "Mountain Obelisk Hub", x: 1052.1, y: 769.8, z: 105.6, timestamp: new Date() },
  ]);

  const saveCurrent = () => {
    if (!newLabel) {
      toast({ title: "Error", description: "Label required", variant: "destructive" });
      return;
    }
    const newCoord: SavedCoord = {
      id: Math.random().toString(36).substr(2, 9),
      label: newLabel,
      x: -452.1,
      y: 1120.4,
      z: 34.2,
      timestamp: new Date()
    };
    setSavedCoords([newCoord, ...savedCoords]);
    setNewLabel("");
    toast({ title: "Success", description: "Coordinate stored" });
  };

  const deleteCoord = (id: string) => {
    setSavedCoords(prev => prev.filter(c => c.id !== id));
  };

  const filtered = savedCoords.filter(c => c.label.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="glass-card p-2 rounded-lg flex flex-col gap-2 h-full">
      <div className="flex items-center justify-between border-b border-white/10 pb-1">
        <div className="flex items-center gap-1.5">
          <Cloud className="w-3.5 h-3.5 text-secondary" />
          <h3 className="text-[10px] font-headline font-bold uppercase tracking-wider">Vault</h3>
        </div>
        <Badge variant="outline" className="text-[8px] h-3.5 bg-secondary/10 text-secondary border-secondary/30">Synced</Badge>
      </div>

      <div className="flex gap-1.5">
        <Input 
          value={newLabel}
          onChange={(e) => setNewLabel(e.target.value)}
          placeholder="New label..." 
          className="bg-white/5 border-white/10 focus-visible:ring-primary h-7 text-[10px]"
        />
        <Button onClick={saveCurrent} size="sm" className="bg-primary text-white h-7 text-[10px] px-2 shrink-0">
          <Save className="w-3 h-3 mr-1" /> SAVE
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-2 top-1.5 w-3 h-3 text-muted-foreground" />
        <Input 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search saved..." 
          className="bg-white/5 border-white/10 pl-7 h-7 text-[10px]"
        />
      </div>

      <ScrollArea className="flex-1">
        <div className="space-y-1 pr-2">
          {filtered.map(coord => (
            <div key={coord.id} className="flex items-center gap-2 p-1.5 rounded bg-white/5 border border-white/5 group hover:bg-white/10 transition-all">
              <div className="bg-primary/20 p-1 rounded border border-primary/30 shrink-0">
                <MapPin className="w-3 h-3 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-[10px] font-bold text-white truncate leading-none">{coord.label}</h4>
                <div className="flex gap-1.5 text-[8px] font-code text-muted-foreground mt-0.5">
                  <span>{coord.x.toFixed(1)}</span>
                  <span>{coord.y.toFixed(1)}</span>
                </div>
              </div>
              <Button onClick={() => deleteCoord(coord.id)} size="icon" variant="ghost" className="h-5 w-5 hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity">
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
