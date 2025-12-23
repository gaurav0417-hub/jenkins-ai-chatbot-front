# Jenkins Chat Interface - AI Coding Guidelines

## Project Overview
A React + Vite chat application with a Jenkins AI assistant theme. This is a **Figma Make export** - a design-first application where components originate from Figma design files, not traditional dev workflows.

## Architecture

### Component Structure
- **[src/app/App.tsx](../src/app/App.tsx)**: Main chat interface with state management (messages, typing indicators)
- **[src/app/components/](../src/app/components/)**: Feature components (`ChatInput`, `ChatMessage`)
- **[src/app/components/ui/](../src/app/components/ui/)**: shadcn/ui component library (accordion, button, dialog, etc.)
- **[src/app/components/figma/](../src/app/components/figma/)**: Figma-specific utilities (`ImageWithFallback`)

### Data Flow
Messages flow through a simple local state pattern in `App.tsx`:
1. User submits message via `ChatInput` component
2. User message added to state with timestamp
3. Simulated delay (1-2s) before bot response
4. Bot response generated via `getJenkinsResponse()` keyword matching
5. Auto-scroll to bottom on new messages

### Figma Integration
- Images use `figma:asset/[hash].png` protocol (see [App.tsx](../src/app/App.tsx) line 4)
- Use `ImageWithFallback` component for all Figma assets to handle missing images gracefully
- Design tokens and styling come from Figma export conventions

## Development Workflows

### Getting Started
```bash
npm i                # Install dependencies (uses pnpm overrides)
npm run dev          # Start Vite dev server (default port 5173)
npm run build        # Production build
```

### Module Resolution
- `@/` alias maps to `./src/` (configured in [vite.config.ts](../vite.config.ts))
- Always use `@/` for imports: `import { cn } from '@/app/components/ui/utils'`

### Styling Approach
- **Tailwind CSS v4** via `@tailwindcss/vite` plugin (NOT traditional PostCSS setup)
- Import in [src/styles/tailwind.css](../src/styles/tailwind.css) with `@import 'tailwindcss' source(none)` directive
- `tw-animate-css` provides extended animations
- Use `cn()` utility from [src/app/components/ui/utils.ts](../src/app/components/ui/utils.ts) for conditional classes
- Brand color: `#D24939` (Jenkins red) used for primary actions and bot avatar

## Code Conventions

### Component Patterns
```tsx
// Standard functional component with TypeScript props
interface ComponentProps {
  message: string;
  isUser: boolean;
}

export function Component({ message, isUser }: ComponentProps) {
  return <div className="flex gap-4">{/* ... */}</div>
}
```

### State Management
- Use `useState` for local component state
- No global state management - this is a simple chat UI
- Message interface: `{ id: string, text: string, isUser: boolean, timestamp: string }`

### Event Handling
- Form submissions prevent default and clear input on success
- Enter key sends message; Shift+Enter adds newline (see [ChatInput.tsx](../src/app/components/ChatInput.tsx) lines 22-26)
- Use `disabled` prop pattern for loading states

## UI Component Library

### shadcn/ui Integration
This project includes a full shadcn/ui installation in [src/app/components/ui/](../src/app/components/ui/):
- Pre-built components: `Button`, `Dialog`, `Accordion`, `Card`, `Tabs`, etc.
- All components use Radix UI primitives underneath
- Styled with Tailwind classes
- To use: `import { Button } from '@/app/components/ui/button'`

### Current Active Components
- **Material UI** (@mui/material, @emotion) installed but not actively used
- **Lucide React** for icons (e.g., `ArrowUp`, `Bot`, `User`)
- **motion** (Framer Motion) for animations (not currently utilized)

## Dependencies & Constraints

### Critical Dependencies
- React 18.3.1 (peer dependency)
- Vite 6.3.5 (pinned via pnpm override)
- Tailwind CSS v4 (via @tailwindcss/vite)
- Radix UI component primitives

### Plugin Requirements
Both React and Tailwind Vite plugins are **required** even if Tailwind isn't heavily used (see [vite.config.ts](../vite.config.ts) lines 7-8).

## Anti-Patterns to Avoid

1. **Don't remove Vite plugins** - React and Tailwind plugins are both required for Make exports
2. **Don't use traditional PostCSS config** - Tailwind v4 via Vite handles this automatically
3. **Don't add global state** - This is a simple UI; local state is sufficient
4. **Don't modify figma: imports** - These are generated asset references

## Key Files Reference

- [vite.config.ts](../vite.config.ts) - Build config with @ alias
- [src/styles/tailwind.css](../src/styles/tailwind.css) - Tailwind v4 entry point
- [src/app/components/ui/utils.ts](../src/app/components/ui/utils.ts) - `cn()` class merger utility
- [guidelines/Guidelines.md](../guidelines/Guidelines.md) - Template for custom design system rules (currently empty)
