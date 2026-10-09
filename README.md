# Living Project Workspace — Web Screens

A set of interconnected HTML screens for the WorkSimplified Living Project Workspace dashboard.

## Screens

| Screen | Question | Description |
|--------|----------|-------------|
| **Cockpit** | Where are we? | High-level project state snapshot |
| **Discover** | What are we learning? | Findings, insights, and observations |
| **Map** | How does everything connect? | Spatial canvas of project connections |
| **State** | What do we know? | Canonical state management |
| **Outputs** | What can we produce? | Artifacts and deliverables |

## Navigation

The root `index.html` opens the consultant login. The connected flow is:

Login → Research Dashboard → Voice Conversation → Research Dashboard → Project Workspace (Cockpit) → Discover / Map / State / Outputs.

The dashboard's **Project Workspace** button opens Cockpit. Each project screen includes a **Research Dashboard** return link and shared project navigation. Layer 1 and the Living Project Workspace remain distinct areas connected through this navigation; backend data integration is not implemented by these links.

## Development

These are static HTML files. Open `index.html` in a browser to get started.

## License

Internal use.
