# Gazeta Project Context

## Project Overview
**Gazeta** is a Next.js application that functions as a digital newspaper viewer. The name "gazeta" means "newspaper" in several languages including Spanish and Portuguese.

## Technology Stack
- **Framework**: Next.js 15.4.1 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Fonts**: Geist and Geist Mono from Google Fonts
- **Image Optimization**: Next.js Image component
- **UI Components**: Custom reusable components (Panel, Queue, etc.)

## Project Structure

### Main Application Files
- `app/page.tsx` - Main homepage with welcome screen for the digital newspaper
- `app/layout.tsx` - Root layout with 3-column design and font configuration
- `app/globals.css` - Global styles

### Components
- `app/components/Nav.tsx` - Navigation component for browsing newspaper pages
- `app/components/Queue.tsx` - Reusable component for displaying lists with radio selection
- `app/components/RadioLink.tsx` - Client-side radio input for navigation
- `app/components/PageItem.tsx` - Component to display newspaper page thumbnails
- `app/components/Panel.tsx` - Reusable UI component for consistent panel styling
- `app/components/MarkdownDisplay.tsx` - Component to render markdown content

### Dynamic Content
- `app/content/[name]/page.tsx` - Dynamic route for viewing individual newspaper pages

### Data Layer
- `app/lib/data.ts` - Centralized data fetching logic for newspaper pages

### Assets
- `public/bucket/` - Contains newspaper page images (gazeta_001.jpg through gazeta_049.jpg and more)
- `public/bucket/` - Also contains corresponding markdown files (gazeta_001.md, etc.) with minimal content

## Application Architecture

### Layout Structure
The application uses a 3-column layout:
1. **Navigation Column** (w-4/12, min-width 200px) - Slate background, contains Nav component with page listing
2. **Main Content Column** (w-6/12, min-width 300px) - White background, displays selected newspaper page
3. **Aside Column** (grow) - Slate background, currently empty

### Navigation System
- The Nav component uses the data.ts library to fetch all image files from `public/bucket/` directory
- Files are displayed in a Queue component with radio button selection
- Clicking a radio button navigates to `/content/[filename]` using client-side navigation
- The Queue component uses a fieldset with custom styling and focus states for accessibility

### Content Display
- Dynamic route `/content/[name]` displays individual newspaper pages
- Uses Next.js Image component for optimized image loading with priority flag
- Handles file lookup with and without `.jpg` extension for flexibility
- Returns 404 if file doesn't exist
- Displays associated markdown content if available (from matching .md files)

## Current State Analysis

### Functional Features
✅ File system integration - reads newspaper pages from bucket folder
✅ Dynamic routing - can view individual pages with smart path handling
✅ Radio button navigation - works with client-side routing
✅ Image optimization - uses Next.js Image component with priority loading
✅ Responsive design - uses Tailwind CSS and resize-x for adjustable columns
✅ Markdown support - displays associated markdown content alongside images

### UI/UX Observations
- Clean design with distinct sections using slate and white background colors
- Uses a newspaper-like metaphor with "pages" and "queue" terminology
- Focus and selection states are well-defined with border changes for accessibility
- Scrollable navigation list for browsing many newspaper pages
- Resizable columns using resize-x property for user customization

### Potential Areas for Enhancement
- Third column (aside) is currently empty and could display additional metadata or tools
- Markdown content display is basic and could benefit from proper markdown parsing/rendering
- Could implement search/filter functionality for finding specific newspaper pages
- Could add pagination or virtual scrolling for better performance with large lists
- Could enhance the PageItem component to show more metadata or previews
- Should address TypeScript error in third Panel component regarding missing children prop

## Technical Notes

### File Naming Convention
Newspaper pages follow the pattern: `gazeta_XXX.jpg` where XXX is a zero-padded number (001, 002, etc.)
Corresponding markdown files follow the pattern: `gazeta_XXX.md`

### Data Flow
1. The data.ts library provides a getPages function to fetch newspaper pages
2. Nav component uses getPages to get items with `_id` and `filename` properties
3. Queue component renders these items with radio buttons
4. RadioLink component handles navigation to dynamic routes on selection
5. Dynamic route component validates file existence and displays both image and markdown content

### Component Architecture
- Panel component provides consistent styling for layout elements
- Queue component handles lists with selectable items
- RadioLink handles navigation logic
- MarkdownDisplay renders content from markdown files
- PageItem displays newspaper page thumbnails

### Styling Approach
- Uses Tailwind CSS with utility classes
- Custom focus and selection states with `has-[:checked]:` and `has-[:focus]:` pseudo-classes
- Color scheme: slate for navigation/aside, white for content area, stone for background
- Typography uses Geist font family for better readability
- Shadow and border styling for depth and separation

## Development Setup
- **Package Manager**: Yarn (preferred over npm)
- Uses Turbopack for development (`yarn dev` runs `next dev --turbopack`)
- Standard Next.js build process
- TypeScript configuration included
- ESLint v9 configuration for code quality
- TailwindCSS v4 for styling
