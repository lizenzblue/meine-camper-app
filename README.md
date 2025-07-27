# 🚐 Roadsurfer Dashboard

A modern React TypeScript application for managing campervan rental stations.

## 🏗️ **Architecture & Best Practices**

This project follows industry best practices and clean architecture principles:

### **📁 Project Structure**

```
src/
├── components/           # Reusable UI components
│   ├── UI/              # Generic UI components (Button, Input, etc.)
│   └── index.ts         # Barrel exports
├── hooks/               # Custom React hooks
├── services/            # API services and external integrations
├── types/               # TypeScript type definitions
├── constants/           # Application constants
├── config/              # Configuration files
├── styles/              # Theme and global styles
└── utils/               # Utility functions (future)
```

### **🎯 Key Features & Best Practices**

✅ **TypeScript** - Full type safety throughout the application  
✅ **Component Architecture** - Clean, reusable, single-responsibility components  
✅ **Custom Hooks** - Separation of business logic from UI components  
✅ **Service Layer** - Centralized API communication with error handling  
✅ **Constants & Configuration** - Centralized application settings  
✅ **Accessibility** - ARIA labels, keyboard navigation, focus management  
✅ **Performance** - Debounced search, memoized computations  
✅ **Error Handling** - Multiple layers of error boundaries and recovery  
✅ **Responsive Design** - Mobile-first, adaptive layouts  
✅ **Code Organization** - Barrel exports, clean imports

### **🔧 Technical Stack**

- **React 19** with TypeScript
- **Styled Components** for styling
- **Vite** for build tooling
- **ESLint + Prettier** for code quality

## 🚀 **Getting Started**

### **Prerequisites**

- Node.js 18+
- Bun

### **Installation**

```bash
# Clone the repository
git clone <repository-url>
cd meine-camper-app

# Install dependencies
bun install

# Copy environment file
cp .env.example .env

# Start development server
bun run dev
```

### **Available Scripts**

```bash
bun run dev      # Start development server
bun run build    # Build for production
bun run lint     # Run ESLint
bun run preview  # Preview production build
```

## 🏛️ **Architecture Decisions**

### **Service Layer Pattern**

- **Singleton services** for consistent API access
- **Error handling** with proper error boundaries
- **Timeout handling** for network requests
- **Type-safe responses** with TypeScript

### **Component Design**

- **Single Responsibility** - Each component has one clear purpose
- **Composition over Inheritance** - Components compose together cleanly
- **Accessibility First** - Proper ARIA labels and keyboard navigation
- **Performance Optimized** - Memoization and debouncing where needed

### **State Management**

- **Local state** for UI-specific state (search queries)
- **Custom hooks** for complex state logic (API data)
- **Context avoided** - Not needed for this app's complexity

Built with ❤️ using React, TypeScript, and modern web standards.
