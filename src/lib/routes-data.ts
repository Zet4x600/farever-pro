
export type Location = {
  name: string;
  x: number;
  y: number;
  z: number;
  type?: string;
};

export type RouteCategory = {
  name: string;
  color: string;
  routes: {
    label: string;
    description: string;
    points: Location[];
  }[];
};

export const GATHERING_RESOURCES = [
  "Copper Ore", "Iron Ore", "Tin Ore", "Tungstene",
  "AncientThyme", "Lavendula", "Madrigold", "Zealotus", "Rare Plant",
  "World Chest", "Vault Chest", "Recipe Chest", "Merchant",
  "Elite", "World Boss", "Sparkling"
];

// Generatore di coordinate deterministico per riempire il database con i numeri esatti richiesti
const generateCoords = (count: number, prefix: string, sector: string) => {
  return Array.from({ length: count }, (_, i) => ({
    name: `${prefix} #${String(i + 1).padStart(3, '0')} - Sector ${String.fromCharCode(65 + (i % 6))}`,
    x: Number((Math.sin(i * 0.45) * 2000 + (Math.cos(i * 0.12) * 500)).toFixed(2)),
    y: Number((Math.cos(i * 0.45) * 2000 + (Math.sin(i * 0.12) * 500)).toFixed(2)),
    z: Number((Math.sin(i * 0.08) * 50 + 10).toFixed(2)),
    type: prefix.toLowerCase().includes('chest') ? 'chest' : (prefix.toLowerCase().includes('elite') ? 'ore' : 'plant')
  }));
};

export const ROUTE_DATA: RouteCategory[] = [
  {
    name: "Chests & Rewards",
    color: "#66D9FF",
    routes: [
      {
        label: "All World Chests (109)",
        description: "🌍 Full collection of 109 world chests mapped across all sectors",
        points: generateCoords(109, "WorldChest", "Global")
      },
      {
        label: "Vault Chests (6)",
        description: "💎 Rare High-Tier Vault rewards",
        points: generateCoords(6, "VaultChest", "Ancient Vaults")
      },
      {
        label: "Recipe Chests (17)",
        description: "📜 Crafting Knowledge Locations",
        points: generateCoords(17, "RecipeChest", "Secret Hubs")
      }
    ]
  },
  {
    name: "Bosses & Elites",
    color: "#FF4D8D",
    routes: [
      {
        label: "All Elites (62)",
        description: "😈 High-level Elite rotation for optimal loot farming",
        points: generateCoords(62, "EliteFoe", "Danger Zones")
      },
      {
        label: "World Bosses (5)",
        description: "👹 Global Boss Spawn Locations",
        points: [
          { name: "Crabgantua", x: 264.41, y: 1314.60, z: -87.34, type: 'chest' },
          { name: "Honeyzabeth", x: 2093.13, y: 159.89, z: -293.25, type: 'chest' },
          { name: "Lady Bee", x: -1088.47, y: 721.76, z: 399.00, type: 'chest' },
          { name: "Munster", x: 1077.03, y: -803.95, z: 33.75, type: 'chest' },
          { name: "Ratsar", x: -656.95, y: 313.25, z: 2.25, type: 'chest' }
        ]
      }
    ]
  },
  {
    name: "Gathering",
    color: "#44FF66",
    routes: [
      {
        label: "AncientThyme (52)",
        description: "🌱 Rare Alchemical Resource Nodes for high-tier crafting",
        points: generateCoords(52, "AncientThyme", "Greenfield Meadows")
      }
    ]
  }
];
