# EloquentAI Chat Widget

A modern, customizable React chat widget component with TypeScript support, theme customization, and context-based state management.

## Features

- 🚀 **Compatible** - Compatible with React 16.8.0 or higher
- 📝 **Type Safe** - Built with TypeScript for strong typing
- 🎨 **Themeable** - Customizable colors and styling
- 📱 **Responsiveness** - Works on desktop and mobile
- 💾 **Persistency** - Optional localStorage persist for message history
- 🔧 **Flexible** - Versatile context override trough props for different use cases
- ⚡ **Performance** - Context-based architecture eliminates unnecessary re-renders
- 🎯 **Accessible** - ARIA labels and keyboard navigation

## Installation

```bash
npm install eloquentai-chat-widget
```

## Quick Start

```tsx
import React from 'react';
import { EloquentChatWidget } from 'eloquentai-chat-widget';
import 'eloquentai-chat-widget/dist/index.css';

function App() {
  return (
    <div>
      <h1>My App</h1>
      <EloquentChatWidget 
        projectId="my-project"
        userId="user-123"
        theme={{
          primary: "#007bff",
          accent: "#28a745"
        }}
      />
    </div>
  );
}
```

## Development Setup

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Clone and Install

```bash
git clone <repository-url>
cd eloquentai-chat-widget
npm install
```

### Development Commands

#### Start Development Server
```bash
npm run dev
```
Opens the demo at `http://localhost:3001` with hot reload for testing components.

#### Build Package
```bash
npm run build
```
Builds the package for production with:
- CommonJS (`dist/index.js`)
- ES Modules (`dist/index.mjs`) 
- TypeScript definitions (`dist/index.d.ts`)
- CSS bundle (`dist/index.css`)

#### Type Checking
```bash
npm run type-check
```
Runs TypeScript compiler without emitting files to check for type errors.

#### Development Workflow
1. Make changes to components in `src/`
2. Test in the demo at `http://localhost:3001`
3. Run `npm run build` to ensure package builds correctly
4. Run `npm run type-check` to verify TypeScript compliance

## Testing the Component

### Interactive Demo
The package includes a comprehensive demo with multiple configurations:

```bash
npm run dev
```

The demo includes:
- **Basic Configuration** - Standard chat widget
- **No Persistence** - Messages not saved to localStorage
- **Initially Open** - Panel starts open
- **Maintenance Mode** - Shows maintenance message
- **Offline Mode** - Shows offline status
- **Theme Testing** - Multiple color themes to test

### Theme Testing
Test different themes in the demo:
```tsx
const themes = {
  blue: { primary: "#007bff", accent: "#0056b3" },
  green: { primary: "#28a745", accent: "#1e7e34" },
  purple: { primary: "#6f42c1", accent: "#5a32a3" },
  red: { primary: "#dc3545", accent: "#c82333" }
};
```

## Package Publishing

### Local Testing

#### 1. Build the Package
```bash
npm run build
```

#### 2. Pack Locally
```bash
npm pack
```
This creates a `.tgz` file that you can install in other projects for testing.

#### 3. Test in Another Project
```bash
# In your test project
npm install /path/to/eloquentai-chat-widget-1.0.0.tgz
```

#### 4. Link for Development
```bash
# In this package directory
npm link

# In your test project
npm link eloquentai-chat-widget
```

### Publishing to npm

#### 1. Login to npm
```bash
npm login
```

#### 2. Publish (First Time)
```bash
npm publish
```

#### 3. Update Version and Publish
```bash
# Update version in package.json, then:
npm version patch  # or minor, major
npm publish
```

#### 4. Publishing to Private Registry
```bash
npm publish --registry https://your-private-registry.com
```

### Pre-Publish Checklist
- [ ] `npm run build` completes successfully
- [ ] `npm run type-check` passes without errors
- [ ] Version number updated in `package.json`
- [ ] README.md is up to date
- [ ] All features tested in demo
- [ ] No sensitive information in package

## API Reference

### Props

```tsx
interface ChatWidgetProps {
  projectId: string;           // Required: Unique identifier for the chat instance
  userId?: string;             // Optional: User identifier
  theme?: Theme;               // Optional: Styling theme
  initialOpen?: boolean;       // Optional: Start with panel open (default: false)
  persist?: boolean;           // Optional: Save messages to localStorage (default: true)
  maintenance?: boolean;       // Optional: Show maintenance mode (default: false)
  online?: boolean;           // Optional: Online status (default: true)
  
  // Advanced: External control overrides
  messages?: Message[];
  onMessagesChange?: (messages: Message[]) => void;
  onSendMessage?: (text: string) => Promise<void>;
  onLoadMessages?: () => Message[];
  onSaveMessages?: (messages: Message[]) => void;
}
```

### Theme Object

```tsx
interface Theme {
  primary?: string;     // Main color (used for bubble button background)
  accent?: string;      // Secondary color
  bubbleColor?: string; // Specific bubble color override
}
```

### Message Object

```tsx
interface Message {
  id: string;
  role: "user" | "assistant";
  text: string;
  ts: number;
}
```

## Architecture

### Context-Based State Management
The widget uses React Context to eliminate prop drilling and improve performance:

- `ChatContext` - Centralized state management
- `useChatWidget` - Hook for accessing chat state
- Components consume context directly instead of receiving props

### Flexible State Management Control
The component has its own state management context but supports receiving external state to override context state while still using the context to propagate changes.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly using the demo
5. Run `npm run build` and `npm run type-check`
6. Submit a pull request

## Support

For issues and questions:
- Check the demo for usage examples
- Review the TypeScript definitions for API details
- Test with different configurations in the demo environment
- Feel free to reach out to me if necessary (itspauloroberto@gmail.com)