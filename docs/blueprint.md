# **App Name**: AetherFlow Dashboard

## Core Features:

- Orbital Mod Engine: A centralized control panel to toggle core player modifications like infinite jump, low gravity, and glide speed as identified in the game offsets.
- Geo-Stepped Navigator: An advanced routing system that allows users to cycle through specific teleport points using a step-teleport algorithm to prevent anti-cheat triggers.
- Cloud Coordinate Vault: A persistent storage feature using a Firestore database to save and label custom XYZ coordinates found during exploration for future teleportation.
- Optimal Loot Oracle: An AI-powered tool that analyzes active map sectors to calculate the most efficient path for gathering ores, plants, and chests based on user inventory goals.
- Event Pulse Tracker: A dashboard monitoring real-time dungeon and rush event routes, featuring category-specific overlays for Dungeon Rush and Timed Events.
- HUD Telemetry: Visual feedback of current Field of View, XYZ position, and speed multipliers mapped to high-refresh rate UI components.
- Route Script Compiler: An automated utility that interprets legacy game tables to populate plant, ore, and merchant navigation arrays instantly.

## Style Guidelines:

- Primary Color: Deep Neon Indigo (#6A00FF) symbolizing the digital 'Far-ever' connection.
- Background Color: Obsidian Void (#100E17) which creates high contrast for critical telemetry data.
- Accent Color: Cyan Flare (#00F0FF) used for highlighting active route paths and AI 'tool' suggestions.
- Headline and body pairing: 'Space Grotesk' for technical headings and 'Inter' for high-readability position data.
- Linear glyph-style icons derived from game UI motifs, utilizing sharp corners and 1px weight to represent data-mining themes.
- Modular glassmorphic 'blades' organized in vertical hierarchies to handle over 100 specific route categories.
- Micro-glitch transitions for mod activation and smooth eased-sine slides for route-cycle interactions.