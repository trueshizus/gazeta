# Gazeta Project Context

## Project Overview
**Gazeta** is a Next.js application that appears to be a digital newspaper or magazine viewer. The name "gazeta" means "newspaper" in Spanish/Portuguese.

## Technology Stack
- **Framework**: Next.js 15.4.1 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Fonts**: Geist and Geist Mono from Google Fonts
- **Image Optimization**: Next.js Image component

## Project Structure

### Main Application Files
- `app/page.tsx` - Main homepage with 3-column grid layout
- `app/layout.tsx` - Root layout with font configuration
- `app/globals.css` - Global styles

### Components
- `app/components/Nav.tsx` - Navigation component that reads files from bucket folder
- `app/components/Queue.tsx` - Reusable component for displaying lists with radio selection
- `app/components/RadioLink.tsx` - Client-side radio input for navigation
- `app/components/PageItem.tsx` - (exists but not examined yet)

### Dynamic Content
- `app/content/[name]/page.tsx` - Dynamic route for viewing individual newspaper pages

### Assets
- `public/bucket/` - Contains 700+ newspaper page images named `gaceta_page-001.jpg` through `gaceta_page-076.jpg` (and more)

## Application Architecture

### Layout Structure
The main page uses a CSS Grid with 3 columns:
1. **Navigation Column** (280px max-width) - Purple background, contains Nav component
2. **Article Column** - Amber background, currently empty
3. **Aside Column** - Default background, currently empty

### Navigation System
- The Nav component reads all files from `public/bucket/` directory
- Files are displayed in a Queue component with radio button selection
- Clicking a radio button navigates to `/content/[filename]`
- The Queue component uses a fieldset with custom styling for focus states

### Content Display
- Dynamic route `/content/[name]` displays individual newspaper pages
- Uses Next.js Image component for optimized image loading
- Handles file lookup with and without `.jpg` extension
- Returns 404 if file doesn't exist

## Current State Analysis

### Functional Features
✅ File system integration - reads newspaper pages from bucket folder
✅ Dynamic routing - can view individual pages
✅ Radio button navigation - works with client-side routing
✅ Image optimization - uses Next.js Image component
✅ Responsive design - uses Tailwind CSS grid

### UI/UX Observations
- Clean, colorful design with distinct sections (purple nav, amber article, default aside)
- Uses a newspaper-like metaphor with "pages" and "queue" terminology
- Focus states are well-defined with border changes
- Scrollable navigation list for many items

### Potential Areas for Enhancement
- Article and Aside columns are currently empty
- Could add metadata display for newspaper pages
- Could implement keyboard navigation
- Could add search/filter functionality
- Could add pagination or virtual scrolling for large lists

## Technical Notes

### File Naming Convention
Newspaper pages follow the pattern: `gaceta_page-XXX.jpg` where XXX is a zero-padded number (001, 002, etc.)

### Data Flow
1. Nav component reads file system at build/request time
2. Creates item objects with `_id` and `filename` properties
3. Queue component renders radio buttons for each item
4. RadioLink component handles navigation to dynamic routes
5. Dynamic route component validates file existence and displays image

### Styling Approach
- Uses Tailwind CSS with utility classes
- Custom focus states with `has-[:checked]:` and `has-[:focus]:` pseudo-classes
- Color scheme: purple navigation, amber article area, red body background
- Typography uses Geist font family

## Development Setup
- Uses Turbopack for development (`npm run dev --turbopack`)
- Standard Next.js build process
- TypeScript configuration included
- ESLint configuration for code quality
