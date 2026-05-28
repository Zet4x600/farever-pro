'use server';
/**
 * @fileOverview An AI agent that analyzes desired resources and current location
 * to generate an efficient step-by-step path for gathering.
 *
 * - optimizeGatheringRoutes - A function that handles the optimal loot oracle process.
 * - OptimizeGatheringRoutesInput - The input type for the optimizeGatheringRoutes function.
 * - OptimizeGatheringRoutesOutput - The return type for the optimizeGatheringRoutes function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GatheringLocationSchema = z.object({
  name: z.string().describe('The name of the resource location (e.g., "CopperOre_Small", "AncientThyme_Large", "WorldChest").'),
  x: z.number().describe('X coordinate of the location.'),
  y: z.number().describe('Y coordinate of the location.'),
  z: z.number().describe('Z coordinate of the location.'),
  type: z.enum(['ore', 'plant', 'chest']).describe('The type of resource at this location.'),
});

const OptimizeGatheringRoutesInputSchema = z.object({
  desiredResources: z.array(z.string()).describe('A list of desired resource names to gather (e.g., ["Copper Ore", "AncientThyme"]).'),
  currentLocation: z.object({
    x: z.number().describe('Current X coordinate of the player.'),
    y: z.number().describe('Current Y coordinate of the player.'),
    z: z.number().describe('Current Z coordinate of the player.'),
  }).describe('The player\u0027s current in-game location.'),
});
export type OptimizeGatheringRoutesInput = z.infer<typeof OptimizeGatheringRoutesInputSchema>;

const OptimizeGatheringRoutesOutputSchema = z.object({
  path: z.array(GatheringLocationSchema).describe('An ordered list of locations to visit for efficient gathering.'),
  estimatedTimeSeconds: z.number().describe('Estimated time in seconds to complete the entire gathering path.'),
  explanation: z.string().describe('A detailed explanation of the generated path and efficiency considerations.'),
});
export type OptimizeGatheringRoutesOutput = z.infer<typeof OptimizeGatheringRoutesOutputSchema>;

// Mock data representing a subset of gathering locations extracted from the Cheat Table XML.
// In a production scenario, this data would likely be loaded from a more structured source (e.g., a JSON file or database).
const allGatheringLocations: Array<z.infer<typeof GatheringLocationSchema>> = [
  { name: "CopperOre_Small", x: 544.25, y: -1153.42, z: 221.28, type: 'ore' },
  { name: "CopperOre_Large", x: 1160.68, y: -948.79, z: 27.75, type: 'ore' },
  { name: "IronOre_Small", x: -943.58, y: -382.44, z: 27.75, type: 'ore' },
  { name: "TinOre_Small", x: 1542.90, y: -494.32, z: 148.50, type: 'ore' },
  { name: "Tungstene", x: 508.03, y: -1072.47, z: 96.03, type: 'ore' },

  { name: "AncientThyme_Small", x: 593.67, y: -1173.41, z: 216.78, type: 'plant' },
  { name: "Lavendula_Large", x: 204.71, y: -978.21, z: 56.28, type: 'plant' },
  { name: "Madrigold_Small", x: 482.98, y: -972.63, z: 264.78, type: 'plant' },
  { name: "Zealotus_Large", x: 752.75, y: -798.11, z: 173.28, type: 'plant' },

  { name: "001 - Lvl 2 - WorldChest", x: -902.18, y: 1758.72, z: 38.25, type: 'chest' },
  { name: "006 - Lvl 5 - WorldChest", x: 138.54, y: 1317.78, z: 148.50, type: 'chest' },
  { name: "007 - Lvl 6 - WorldChest", x: -1230.98, y: 1381.36, z: -2.63, type: 'chest' },
  { name: "Vault Chest", x: 244.75, y: 636.27, z: -27.75, type: 'chest' },
  { name: "Recipe Chest", x: -69.99, y: 142.61, z: 96.75, type: 'chest' },
  { name: "Dungeon Boss Chest", x: 12.92, y: 178.04, z: 4.99, type: 'chest' },
  { name: "Linked Orb Chest", x: -579.93, y: 2094.30, z: 4.47, type: 'chest' },
];

// Define the schema for the input to the prompt, which combines the flow input with dynamically added data.
const OptimalLootOraclePromptInputSchema = z.object({
  desiredResources: OptimizeGatheringRoutesInputSchema.shape.desiredResources,
  currentLocation: OptimizeGatheringRoutesInputSchema.shape.currentLocation,
  availableLocations: z.array(GatheringLocationSchema).describe('Relevant gathering locations to consider for the path.'),
});

const optimizeGatheringRoutesPrompt = ai.definePrompt({
  name: 'optimizeGatheringRoutesPrompt',
  input: { schema: OptimalLootOraclePromptInputSchema },
  output: { schema: OptimizeGatheringRoutesOutputSchema },
  prompt: `
    You are an Optimal Loot Oracle, an AI assistant specialized in generating the most efficient gathering paths in a game world.
    Your task is to analyze the player's desired resources and current location, then provide a step-by-step path to collect those resources efficiently.
    Consider both proximity to the current location and grouping similar resource types. The goal is to minimize travel time and optimize the route.

    Player's Current Location:
    X: {{{currentLocation.x}}}
    Y: {{{currentLocation.y}}}
    Z: {{{currentLocation.z}}}

    Desired Resources to Gather:
    {{#each desiredResources}}- {{this}}
    {{/each}}

    Available Nearby Resource Locations (filtered by desired types):
    {{json availableLocations}}

    Generate the most efficient step-by-step gathering path as an ordered JSON array of locations.
    For each location in the path, include 'name', 'x', 'y', 'z', and 'type'.
    Also, provide an 'estimatedTimeSeconds' for the entire path and a brief 'explanation' for your route optimization strategy.
    
    Example output format:
    {
      "path": [
        { "name": "ClosestCopperOre", "x": 123.4, "y": 567.8, "z": 90.1, "type": "ore" },
        { "name": "NextAncientThyme", "x": 124.5, "y": 568.9, "z": 91.2, "type": "plant" }
      ],
      "estimatedTimeSeconds": 300,
      "explanation": "Prioritized closest items first, then grouped by resource type for efficiency."
    }
    `,
});

export async function optimizeGatheringRoutes(
  input: OptimizeGatheringRoutesInput
): Promise<OptimizeGatheringRoutesOutput> {
  // Filter available locations based on desired resources.
  const desiredResourceKeywords = input.desiredResources.map(r => r.toLowerCase().replace(/ /g, '_'));

  const relevantLocations = allGatheringLocations.filter(loc =>
    desiredResourceKeywords.some(keyword => loc.name.toLowerCase().includes(keyword)) ||
    desiredResourceKeywords.some(keyword => loc.type.toLowerCase().includes(keyword))
  );

  // Call the prompt with the combined input.
  const { output } = await optimizeGatheringRoutesPrompt({
    desiredResources: input.desiredResources,
    currentLocation: input.currentLocation,
    availableLocations: relevantLocations,
  });

  if (!output) {
    throw new Error('Failed to generate optimized gathering routes.');
  }

  return output;
}

const optimizeGatheringRoutesFlow = ai.defineFlow(
  {
    name: 'optimizeGatheringRoutesFlow',
    inputSchema: OptimizeGatheringRoutesInputSchema,
    outputSchema: OptimizeGatheringRoutesOutputSchema,
  },
  async (input) => {
    return optimizeGatheringRoutes(input);
  }
);
