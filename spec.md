# SANKHYA: Eco Karma Wrapped

A mobile-first, single-page React web application that calculates users' environmental impact and presents it as an engaging, story-driven experience similar to Spotify Wrapped.

## Application Overview

The application is a continuous moral journey with no hard page transitions, designed to audit users' environmental karma and present their ecological debt in an emotionally impactful way.

## Design Requirements

- **Theme**: Dark mode with #0a0a0a background
- **Colors**: 
  - Primary: #00ff9d
  - Danger: #ff4d4d  
  - Vedic accent: #d4af37
- **Typography**: 
  - Headings: Serif fonts (Cinzel/Playfair Display/Merriweather)
  - Body: Sans-serif (Inter)
- **Style**: Glassmorphism cards, large spacing, minimal borders
- **Animations**: All transitions use Framer Motion with consistent slide-in from right + fade-in pattern
- **Layout**: Smooth vertical scrolling enabled across all slides with proper viewport handling and `overflow-y-auto` consistently applied to the root Wrapped container

## Audio Requirements

- **Background Music**: Gentle ambient music during all WrappedMode slides
- **Sound Effects**:
  - Chainsaw or tree-cutting sound synchronized with each tree destruction in the Forest Loss Slide
  - Subtle uplifting tone when confetti triggers at pledge completion
- **Audio Controls**: Floating mute/unmute control icon for user preference
- All audio should be optional and user-controllable
- Sound assets must be preloaded with smooth fade-in/out to avoid clipping and ensure playback across devices
- **Sound Synchronization**: Each tree-cutting sound must be timed precisely with the lumberjack animation at 0.5-second intervals, starting immediately with the first tree (index 0) at 0 seconds
- **Audio Implementation**: Use `AudioContext` or `Howler.js` with proper preloading and user-interaction permission handling for autoplay constraints
- **Sound Variation**: Apply slight random pitch variation (±5%) to make each cut more organic

## Application Flow

The app has two main states with seamless transitions between them:

### 1. InputMode ("The Inquisition")

**Header**: "Let's Audit Your Karma."

**Input Fields** (vertical layout):
- Name (text input)
- Transport options:
  - Car owner toggle → If enabled, slider for daily kilometers (0-100 km/day)
  - Bike owner toggle → If enabled, slider for daily kilometers (0-50 km/day)
- Energy: Slider for monthly electricity bill (₹0-15,000)
- Diet: Selectable cards (Vegan/Vegetarian/Non-Veg)
- Habits: 
  - Toggle for "AC used daily?"
  - Slider for "Plastic items used daily" (0-10)

**Footer**: "Developed by the Department of Statistics, NLU" in gold text (#d4af37, 70% opacity)

**Call-to-Action**: "CALCULATE MY DEBT" button that triggers calculation and animated transition

### 2. WrappedMode (Fluid Story Slides)

Story-like presentation with tap/click to advance slides. All slides advance only when user taps/clicks (no auto-advance). Total of 8 emotional slides. **Layout must support smooth vertical scrolling when content exceeds viewport height while maintaining fluid interactions.**

**Slide Sequence**:

1. **Introduction Slide**
   - Text: "Hi [Name]..."
   - Subtext: "We analyzed your year. It's time to see the cost."

2. **Culprit Slide**
   - Headline: "Your Carbon Heavyweight"
   - Dynamic analysis: Determine which category (Travel, Energy, or Consumption) contributed most to carbon footprint
   - Text describing main impact source (e.g., "Your AC usage alone destroyed 4 trees.")

3. **Forest Loss Slide (Enhanced Deforestation Sequence)**
   - Headline: "Witness the impact of your year."
   - Visual: Grid of tree icons with animated lumberjack character moving sequentially across the forest
   - **Critical Animation Requirements**:
     - **Immediate initialization**: Animation must start with a minimal delay (few milliseconds) to allow proper render, then immediately begin at tree index 0
     - **First tree synchronization**: The first tree's "timber" animation (rotation, color change, opacity) must trigger immediately when the lumberjack reaches position 0, synchronized with the chainsaw sound at 0 seconds
     - **Sequential motion**: Lumberjack glides smoothly from tree to tree using Framer Motion `layout` property with natural easing curves
     - **Precise timing**: At each tree, lumberjack spends exactly 0.5 seconds before moving to next tree
     - **Timber animation sequence**: When lumberjack reaches each tree:
       - Rotate tree icon 90° to the right
       - Change tree color to brown (#8b4513)
       - Reduce opacity to 0.5
       - Tree remains "fallen" throughout the sequence
     - **Motion synchronization**: Lumberjack must arrive at each tree position before triggering the timber animation
     - Trees fall sequentially starting with tree 0, then proceeding in order (1, 2, 3, etc.)
     - **Animation verification**: Ensure the sequence starts with tree 1 (index 0), proceeds sequentially, and maintains synchronization throughout
   - **Sound Synchronization**: Chainsaw or tree-cutting sound effect must trigger precisely when each tree falls, synchronized with lumberjack's arrival at each tree position at 0.5-second intervals
   - Text: "Your lifestyle indirectly chopped down [Trees_Owed] trees this year."
   - Maintains immersive pacing and emotional tone consistent with Wrapped storytelling

4. **Reality Check Slide**
   - Headline: "If everyone lived like you…"
   - **Dynamic Earth multiplier display** based on Trees_Owed (recalculated for each user input session):
     - Trees_Owed ≤ 10 → show "1 Earth"
     - Trees_Owed > 10 and ≤ 50 → show "2.5 Earths"
     - Trees_Owed > 50 → show "4 Earths"
   - Short paragraph about collective consequences

5. **Verdict Slide**
   - Headline: "The Ancient Verdict"
   - Quote in gold serif: "He who enjoys nature's gifts without giving back is certainly a thief." — Bhagavad Gita 3.12
   - Status: "ECOLOGICAL DEBT"

6. **Redemption Slide**
   - Semi-circular gauge (0-850 scale)
   - Score classification: <500 = DEFAULTER (red), ≥500 = SUSTAINABLE (green)
   - Glowing/pulsing "Plant [Trees_Owed] Trees" button with persuasive copy: "Nature does not take IOUs. Balance the scale now."
   - Pledge area: "I pledge to plant these trees within 30 days" with checkbox
   - Confetti effect when checkbox is checked (with uplifting sound effect)
   - Footer: "Estimates inspired by IPCC emission factors and CEA electricity grid data." and "A Project by the Department of Statistics, NLU."

7. **Action Awakening Slide**
   - Headline: "Action Awakening"
   - Visual: Real humans planting trees in natural settings
   - Reflective text: "Nature waits for your hands, not your apologies."
   - Additional motivational content about taking concrete action

8. **Share Your Redemption Slide**
   - Headline: "Share Your Redemption"
   - Display: User's final score, Trees Owed count, and pledge status
   - Screenshot capture functionality using canvas-based technology
   - Button: "Capture & Share Report" for social sharing
   - Button: "Audit Another Person" (resets to InputMode)

## Calculation Logic

The application calculates environmental impact using these formulas:

**Daily Emissions**:
- Car: daily_km × 0.19
- Bike: daily_km × 0.08
- Diet: Non-Veg = 3.3, Vegetarian = 1.7, Vegan = 1.0
- Plastic: count × 0.06
- AC: +4.0 if used daily

**Annual Calculations**:
- Electricity: (bill ÷ 8) × 0.82 × 12
- Annual_CO2 = ((Car + Bike + Diet + Plastic + AC) × 365) + Electricity
- Trees_Owed = round(Annual_CO2 ÷ 22)
- Score = max(300, 850 − (Trees_Owed × 10))

**Carbon Heavyweight Analysis**:
- Calculate individual contributions from Travel (Car + Bike), Energy (Electricity + AC), and Consumption (Diet + Plastic)
- Identify the category with highest impact for the Culprit Slide

## Technical Requirements

- Single-page application with no backend
- All data processing and state management on client-side
- Canvas-based screenshot capture functionality for sharing final report
- **Audio system requirements**:
  - Background music and sound effects with preloading
  - User-controllable audio mute/unmute functionality
  - Audio hook implementation for chainsaw/tree-cutting sounds with fade-in/out
  - Precise sound synchronization with tree-cutting animations starting at 0 seconds
  - AudioContext or Howler.js implementation with autoplay constraint handling
- **Layout and scrolling requirements**:
  - Smooth vertical scrolling across all WrappedMode slides
  - Proper viewport handling when content exceeds screen height
  - Fluid interactions maintained during scrolling
  - Consistent `overflow-y-auto` application to root Wrapped container
  - Adjusted Framer Motion viewport settings to preserve scroll smoothness during slide transitions
- Mobile-first responsive design
- No hard page transitions - continuous flow experience
- User-initiated navigation only (no auto-advance on any slides)
- **Enhanced Forest Loss Slide requirements**:
  - **Fixed synchronization logic**: Ensure lumberjack motion and tree-cutting sequence are perfectly synchronized with minimal initialization delay
  - **Immediate first tree processing**: First tree (index 0) animation executes immediately after brief render delay
  - **Sequential verification**: Animation sequence starts with tree 1, proceeds through all trees sequentially
  - **Motion precision**: Lumberjack arrives at each tree position before triggering timber animation
  - **Sound coordination**: Chainsaw sound plays simultaneously with each tree's timber animation
  - Proper rotation transitions for each tree (90° right rotation, brown color, 0.5 opacity)
  - Smooth Framer Motion `layout` transitions with natural easing curves
- **Dynamic Earth multiplier calculation** and display in Reality Check Slide that recalculates based on varying user inputs
