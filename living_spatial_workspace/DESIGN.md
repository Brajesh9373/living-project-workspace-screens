---
name: Living Spatial Workspace
colors:
  surface: '#fbf8fc'
  surface-dim: '#dcd9dd'
  surface-bright: '#fbf8fc'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f2f7'
  surface-container: '#f0edf1'
  surface-container-high: '#eae7eb'
  surface-container-highest: '#e4e1e6'
  on-surface: '#1b1b1e'
  on-surface-variant: '#434654'
  inverse-surface: '#303033'
  inverse-on-surface: '#f3f0f4'
  outline: '#737685'
  outline-variant: '#c3c6d6'
  surface-tint: '#1555d1'
  primary: '#0650cc'
  on-primary: '#ffffff'
  primary-container: '#356ae6'
  on-primary-container: '#f9f7ff'
  inverse-primary: '#b3c5ff'
  secondary: '#5d5e66'
  on-secondary: '#ffffff'
  secondary-container: '#e3e1ec'
  on-secondary-container: '#63646c'
  tertiary: '#00682e'
  on-tertiary: '#ffffff'
  tertiary-container: '#1a8340'
  on-tertiary-container: '#e7ffe5'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b3c5ff'
  on-primary-fixed: '#00174a'
  on-primary-fixed-variant: '#003ea6'
  secondary-fixed: '#e3e1ec'
  secondary-fixed-dim: '#c6c5cf'
  on-secondary-fixed: '#1a1b22'
  on-secondary-fixed-variant: '#46464e'
  tertiary-fixed: '#95f8a7'
  tertiary-fixed-dim: '#79db8d'
  on-tertiary-fixed: '#00210a'
  on-tertiary-fixed-variant: '#005323'
  background: '#fbf8fc'
  on-background: '#1b1b1e'
  surface-variant: '#e4e1e6'
typography:
  headline-lg:
    fontFamily: Geist
    fontSize: 1.75rem
    fontWeight: '600'
    lineHeight: 2.25rem
    letterSpacing: -0.025em
  headline-md:
    fontFamily: Geist
    fontSize: 1.375rem
    fontWeight: '600'
    lineHeight: 1.875rem
    letterSpacing: -0.02em
  headline-sm:
    fontFamily: Geist
    fontSize: 1.125rem
    fontWeight: '600'
    lineHeight: 1.5rem
    letterSpacing: -0.015em
  body-lg:
    fontFamily: Geist
    fontSize: 1rem
    fontWeight: '400'
    lineHeight: 1.5rem
    letterSpacing: -0.011em
  body-md:
    fontFamily: Geist
    fontSize: 0.875rem
    fontWeight: '400'
    lineHeight: 1.375rem
    letterSpacing: -0.006em
  body-sm:
    fontFamily: Geist
    fontSize: 0.8125rem
    fontWeight: '400'
    lineHeight: 1.25rem
    letterSpacing: 0em
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 0.75rem
    fontWeight: '500'
    lineHeight: 1rem
    letterSpacing: 0.02em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 0.6875rem
    fontWeight: '500'
    lineHeight: 0.875rem
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  margin: 1.5rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1.25rem
  space-xl: 2rem
---

## Brand & Style

This design system establishes an environment engineered for high-agency strategy, deep structural thinking, and living project orchestration. The interface avoids marketing-driven SaaS clichés, neon AI motifs, and decorative gradients, drawing its character instead from architectural studios, industrial drafting software, and rigorous engineering tools like Linear and Figma.

The experience is centered on three core principles:
- **Spatial Autonomy:** Work unfolds across an expansive, calm visual plane rather than confined within nested bureaucratic sidebars. Density remains restrained (4/10) to preserve focus, while informational variance (8/10) conveys depth and live status.
- **Architectural Precision:** Every line, bounding box, and node exists to orient thought. Structural delineations take precedence over decorative styling, rendering complex systems legible and direct.
- **Subtle Vitality:** Motion (6/10) communicates mechanical responsiveness, system state shifts, and real-time collaboration with crisp, spring-based transitions instead of cinematic flourish.

## Colors

The palette is tuned for long sessions of focused work, rejecting pure black `#000000` in favor of warm, low-glare zinc tones paired with an off-white architectural ground. 

### Core Swatches
- **Canvas (`#F7F7F5`):** Warm concrete-tinted backdrop providing contrast against interactive surfaces without eye strain.
- **Surface (`#FFFFFF`):** Reserved for elevated interactive modules, spatial nodes, floating panels, and sheet overlays.
- **Ink (`#18181B`):** Deep zinc for high-priority typography, sharp structural headings, and active iconography.
- **Muted Ink (`#71717A`):** Mid-tone zinc for secondary descriptions, inactive controls, and structural coordinates.
- **Quiet Line (`#E4E4E7`):** The primary divider and default node border; defines boundaries without visual noise.
- **Deep Line (`#D4D4D8`):** Applied to active panels, focused inputs, and structural splits requiring clearer definition.
- **Signal Blue (`#356AE6`):** The singular focal accent. Used strictly for intentional execution, primary action triggers, and active spatial focus.

### Semantic State System
Semantic colors communicate state directly through muted, non-jarring tints paired with high-contrast text:
- **Validated / Aligned:** Background `#DCFCE7`, Border/Foreground `#15803D`
- **Evolving / In Flight:** Background `#FEF3C7`, Border/Foreground `#B45309`
- **Clarification / Needs Context:** Background `#F1F5F9`, Border/Foreground `#475569`
- **Conflict / Blocked:** Background `#FEE2E2`, Border/Foreground `#B91C1C`

## Typography

Typography prioritizes functional hierarchy over display flair. Typesetting is compact and structured:

- **Primary Typeface (Geist):** Handles all narrative, contextual, and structural elements. It carries neutral clarity with slight geometric squarishness, maintaining legibility across dense data tables, workflow paths, and modal views.
- **Technical Monospace (JetBrains Mono):** Handles entity identifiers, coordinates, stage tags, timestamps, and metadata keys. Set in uppercase or tabular numerals with slight tracking to read as structured telemetry.
- **Scale Restraint:** Sizes top out at `1.75rem` (`28px`). Visual importance is conveyed through weight shifts (`400` to `600`), baseline adjustments, and high-contrast color pairings rather than oversized headings.

## Layout & Spacing

The canvas is structured around an open visual plane rather than a fixed grid of nested containers:

- **Horizontal Top Bar (48px–52px):** Replaces persistent sidebars. Houses the contextual breadcrumb route (`WorkSimplified · Project · View`), dynamic stage switchers, and project output actions in a single horizontal strip bordered by `Quiet Line`.
- **Infinite Spatial Field:** The primary workspace centers on an open infinite canvas with a subtle dot or cross-grid pattern spaced at 24px intervals (`#E4E4E7` at 60% opacity).
- **Docked & Contextual Panels:** Secondary properties, inspect drawers, and output summaries slide over the canvas as floating sheets anchored to the viewport edge, preserving the user's working coordinate space.
- **Rhythm:** Spacing follows a strict 4px sub-grid (`0.25rem`, `0.5rem`, `0.75rem`, `1.25rem`, `2rem`), keeping layout gaps tight within nodes while maintaining generous air around spatial clusters.

## Elevation & Depth

This design system minimizes dropped blurs, relying on 1px borders, surface contrast, and crisp layering:

- **Base Layer (Canvas):** Set to `#F7F7F5`. Represents zero-elevation unassigned space.
- **Node & Tile Layer:** Set to `#FFFFFF` with a 1px border in `#E4E4E7`. Completely flat with no resting drop shadow.
- **Hover & Focused Nodes:** The border shifts cleanly to `#D4D4D8` (hover) or `#356AE6` (selected), accompanied by a micro-elevation shadow: `0 1px 3px 0 rgba(24, 24, 27, 0.05), 0 1px 2px -1px rgba(24, 24, 27, 0.05)`.
- **Top Chrome & Overlays:** Set to `#FFFFFF` with backdrop-filter blur (`12px`) and 92% opacity, anchored by a bottom border in `#E4E4E7`.
- **Context Menus & Floating Palettes:** Elevated using an engineered physical shadow: `0 4px 12px -2px rgba(24, 24, 27, 0.08), 0 2px 6px -1px rgba(24, 24, 27, 0.04)`, enclosed within a `#D4D4D8` hairline border.

## Shapes

Corner radii balance precision engineering with physical tangibility:

- **Nodes & Canvas Modules:** Use 12px (`0.75rem`) corner rounding. This softens structured nodes without leaning into casual, overly rounded pills.
- **Buttons & Interactive Inputs:** Fixed to 8px (`0.5rem`) corner radius across all standard heights (40px–44px).
- **Status Pills & Inline Tags:** Use 4px (`0.25rem`) corner radius to preserve a clean, ticketed appearance for technical metadata. Pill shapes (e.g. `9999px`) are intentionally avoided across all component classes.

## Components

### Top Chrome
- **Dimensions & Layout:** Fixed height between 48px and 52px, spanning the full viewport width. Border-bottom: 1px solid `#E4E4E7`. Background: `#FFFFFF`.
- **Navigation Cluster:** Segmented breadcrumb layout using `body-md` typography. Delimiters use `#D4D4D8` center-dots (`·`). Contextual route: `WorkSimplified · HR Transformation (Frappe HR & Payroll) · Cockpit`.
- **Workspace Modes:** Flat segmented toggle (`Discover`, `Map`, `State`, `Outputs`) using `body-sm` (`font-weight: 500`). Active items feature a 1px `#E4E4E7` outline, `#FFFFFF` fill, and `#18181B` text. Inactive items use transparent backgrounds with `#71717A` text.

### Workspace Nodes
- **Surface:** `#FFFFFF` background with a crisp 1px `#E4E4E7` border. Corner radius: 12px.
- **Padding:** Compact spatial padding of 12px–16px (`0.75rem`–`1rem`).
- **Header:** Features a strong title (`body-md`, `font-weight: 600`, `#18181B`) and a technical mono indicator (`label-sm`).
- **State Indicator:** Monospaced semantic tag anchored to the upper right corner using the defined semantic state backgrounds and border colors.
- **Selection State:** 1.5px outer border in `#356AE6` accompanied by a 2px offset ring in `#FFFFFF`.

### Buttons
- **Primary:** Height 40px–44px. Background: `#356AE6`, Text: `#FFFFFF` (`font-weight: 500`). Hover: `#2B55B8`. No gradient or inner glow. Corner radius: 8px.
- **Secondary:** Height 40px–44px. Background: `#FFFFFF`, Border: 1px solid `#E4E4E7`, Text: `#18181B`. Hover: Background `#F7F7F5`, Border `#D4D4D8`.
- **Ghost / Tooling:** Height 36px–40px. Background: transparent, Text: `#71717A`. Hover: Background `#F1F5F9`, Text `#18181B`.

### Form Fields & Inputs
- **Base Input:** 40px height. Background `#FFFFFF`, Border 1px solid `#E4E4E7`, Corner radius 8px, Text `body-md` in `#18181B`. Placeholder in `#71717A`.
- **Focus State:** Border shifts directly to `#356AE6` with a crisp `0 0 0 1px #356AE6` ring.
- **Checkboxes & Radios:** 16px square/circle with 1px `#D4D4D8` border. Active state: `#356AE6` fill with an internal white indicator check.

### Semantic Chips & Tags
- Compact metadata labels featuring `label-sm` monospace typography.
- Height: 20px–22px. Padding: 0 6px.
- Applied across validation flags, branch states, and data schemas using the 4 semantic background/foreground combinations.