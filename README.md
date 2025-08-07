# EloquentAI Chat Widget

A beautiful, simple, compatible and very flexible React chat widget component with TypeScript support, theme customization, possibility to work with any LLM of your choose and haves a smart context-based self state management.

## Features

- 🚀 **High Compatibility** - Compatible with React 16.8.0 or higher and even supports older node.js versions require() imports, test yourself: ```node -p "require('./dist/index.cjs')"```
- 📝 **Type Safe** - Built with TypeScript for strong typing
- 🎨 **Themeable** - Customizable theme colors and styling
- 📱 **Responsiveness** - Works on desktop and mobile
- 💾 **Persistency** - Optional localStorage persistance for message history
- 🔧 **Flexible** - Versatile context override trough props for different use cases
- ⚡ **Performance** - Context-based architecture eliminates unnecessary re-renders and not depend on other libraries to perform operations
- 🎯 **Accessible** - ARIA labels and keyboard navigation

## Installation

```bash
npm install itspauloroberto@eloquentai-chat-widget
```

## Quick Start

```tsx
import React from 'react';
import { EloquentChatWidget } from 'itspauloroberto@eloquentai-chat-widget';

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
# SSH
git clone git@github.com:itspauloroberto/eloquentai-chat-widget.git
# HTTP
git clone https://github.com/itspauloroberto/eloquentai-chat-widget.git
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
- CommonJS (`dist/index.cjs`)
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
- **Basic Configuration** - Standard chat widget for general use.
- **No Persistence Option** - A specific config where Messages are not saved to localStorage.
- **Instant Reflection** - Whenever you select another config its instantly loaded to the Widget.
- **Maintenance Mode** - Shows maintenance message and dont let users send messages.
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

### Context-Based State Management
The widget uses React Context to eliminate prop drilling and improve performance:

- `ChatContext` - Centralized state management
- `useChatWidget` - Hook for accessing chat state
- Components consume context directly instead of receiving props

### Flexible State Management Control
The component has its own state management context but supports receiving external state to override context state while still using the context to propagate changes.


## Architecture / Technical Decisions

All of my decisions were based on the following major principles:
- Compatibility
    I did make sure that the chat widget does not depend on anything unless necessary so it can be even on older React version like 16.8.0 and can be also imported trough Node.js old fashioned way using require and expecting .cjs files on build.
- Flexibility
    1. The decision of using own written CSS file for the styles was based on the power of AI gave us right now, one the biggest downside back then that made us developers do not rely on own CSS files and stick to use UI Frameworks was the fact that they were hard to maintain and costly to build from scratch. And now, that's not the case anymore with the power of AI Agents. So why not have the full control over the styling and keep the context to the application so the AI Agents can take this context into consideration on their answers? Plus, 100% CSS animations with keyframes are way more customizable so you can completely fine-tune the User Experience to its quality peak, since its a shared package. That's why i didnt use either MUI or TailwindCSS.
    2. Not including a real LLM inside this package is actually the best to do because you don't know which LLM that a person want to use on their chat widget, or even if they want to use only one LLM or let the user choose which one they want. That gives the consumer of this package a lot of flexibility so it can build its chat the way it wants, either passing several different models for the user to choose to chat with or only a single one of its preference.
- Low Dependency / Less issues on future
    Actually npm dependencies are always giving you such a great headache from time to time due to issues that are out of our control like malicious packages, security flaws, version mismatches, and more. So making sure that you strictly only add a library when you DO really need it is a must, especially talking about a npm package like that one.
- Longevity
    A package that only depends on React to work is bound to live for a long time without needing to be replaced by something else or have mainentance because of external libraries of the ecossystem.
- Performance & Optimization
    Having control over everything that happens is a must when it comes down to performance. Algorithm fine tuning focused on optimization only really happens when you have full control over the code that you run. How could you apply Big O Notation and perform a Asymptotic analysis of your algorithm if that's not you that haves control of what happens inside the library that you are using?
- Simplicity 
    Why to use a complex state managent library such as Redux or RTK or even Zustand (which 100% would be the choice here) if you don't really need them? Context API does everything that's necessary and it's React built-in. So you don't have prop drilling / unnecessary re-rendering and do have a single source of truth on the app without needing a 3rd party library to depend on. Keep it simple.
- Lightweight
    Did you see? This package bundle don't have ANY runtime dependencies (even React is a peerDependency here) and tsup is well configured to make sure the built version of it is the lighest ever possible by minifying the CSS and etc.

## What i would have done if i had more time?

1. Fine tune the User Experience & UI
    When it comes to UX / UI I am really good at this. I was a UI designer in the past before become a developer and I constantly do graphic design as a hobby for creating games and such. So User Experience and UI is always something i strive to deliver the best of it on my code. Microinteractions and smooth animations don't make difference alone, but together they can make the User smile and feel great while using the App.
2. Create behavioral unit tests using vitest and RTL to make sure that any changes do not break the tool funtionality and behavior (eg.: testing if you can send messages and they do appear, if you can open and close the widget, etc.)

## What could be done to scale this to a enterprise-level widget?
1. LocalStorage has 5MB of storage, so using it would have a hard cap of more or less approximately 17.000 messages stored at a time, for only one user that might be too much, but the use-cases of this persistance are not clear, anyone can use the way they want. So at some time it would need to be cleared or to create some sort of routine to clear them, but that might not be the user intention. Alternatives are: or using browser's IndexedDB instead that has 50MB of storage. It increases a little bit of maintainability but gives more power and storage to the application. Or you can use the external state control to save and load data on your API (recommended).

## Contributing Guide

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