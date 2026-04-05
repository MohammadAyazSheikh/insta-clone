# Tasveer Documentation

A comprehensive React Native social media template built with Expo.

<p align="center">
  <img src="./MobileApp/assets/images/preview.png" alt="Tasveer Features Preview" width="100%" />
</p>

---

## Table of Contents

- [✨ Features](#-features)
- [📋 Prerequisites](#-prerequisites)
- [🚀 Quick Start](#-quick-start)
- [📁 Project Structure](#-project-structure)
- [🎨 Theme Modification](#-theme-modification)
- [💬 Support](#-support)

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| **Stories** | Create and share ephemeral content with your followers |
| **Chat** | Chat messaging with voice, media, and document sharing |
| **Posts** | Share photos and videos with custom filters and effects |
| **Reels** | Create and browse short-form vertical videos |

---

## 📋 Prerequisites

### Required Software

- Node.js (v18 or newer)
- npm, yarn, or bun
- Git

### Development Tools

- Visual Studio Code
- Xcode (for iOS)
- Android Studio (for Android)

---

## 🚀 Quick Start

Run these commands to get started quickly:

**Using npm**
```bash
cd tasveer
npm install
npx expo run:ios
npx expo run:android
```

**Using yarn**
```bash
cd tasveer
yarn install
npx expo run:ios
npx expo run:android
```

**Using bun**
```bash
cd tasveer
bun install
bunx expo run:ios
bunx expo run:android
```

---

## 📁 Project Structure

Here's how the project is organized:

```
tasveer/
├── src/
│   ├── assets/          # Images, fonts, and other static files
│   ├── components/      # Reusable UI components
│   │   ├── common/      # Shared components like buttons, inputs
│   │   ├── features/    # Feature-specific components
│   │   └── layouts/     # Layout components
│   ├── screens/         # Application screens/pages
│   │   ├── auth/        # Authentication screens
│   │   ├── home/        # Home and feed screens
│   │   ├── profile/     # Profile related screens
│   │   └── settings/    # Settings screens
│   ├── navigation/      # Navigation configuration
│   ├── services/        # API and third-party services
│   ├── store/           # State management (Redux)
│   ├── hooks/           # Custom React hooks
│   ├── utils/           # Helper functions
│   └── constants/       # App constants and config
├── .env                 # Environment variables
├── App.tsx              # Root component
└── package.json         # Dependencies and scripts
```

---

## 🎨 Theme Modification

### Theme Structure

The theme system is organized into several TypeScript files for better maintainability:

- `theme.ts` — Main theme configuration
- `colors.ts` — Color palette definitions
- `fonts.ts` — Typography settings

### Customizing Colors

To modify the color scheme, edit the `colors.ts` file:

```ts
// src/theme/colors.ts
const commonColors = {
  lightYellow: '#feda75',
  yellow: '#fccc63',
  orange: '#fa7e1e',
  pink: '#d62976',
  purple: '#962fbf',
  blue: '#4f5bd5',
  grey1: '#999999',
};

export const darkColors = {
  primary1: '#000000',
  primary3: '#363636',
  primary4: '#282828',
  secondary1: '#ffffff',
  ternary1: '#3797ef',
  ternary2: '#1b4b77',
  ternary3: '#B1BEC8',
};

export const lightColors = {
  primary1: '#ffffff',
  primary3: '#f5f5f5',
  primary4: '#EBEBEB',
  secondary1: '#000000',
  ternary1: '#3797ef',
  ternary2: '#9bcbf7',
  ternary3: '#063F6E',
};
```

### Typography Customization

Modify typography settings in `fonts.ts`:

```ts
// src/theme/fonts.ts
const fontSize = {
  xsm: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  xl2: 20,
  xl3: 22,
  xl4: 24,
  xl6: 26,
  xl7: 28,
  xl8: 30,
};
```

---

## 💬 Support

For support and inquiries:

📧 Email: mohammadayazdev@gmail.com
