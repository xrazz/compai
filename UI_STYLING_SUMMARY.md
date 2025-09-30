# Compliance AI - UI Styling Summary

## Overview
Compliance AI uses a clean, professional light-mode design with consistent color schemes, modern components, and accessible styling patterns throughout the application.

## Color Palette

### Primary Colors
- **Background**: `#fcfcfc` - Very light gray/off-white background
- **Foreground**: `#212529` - Dark gray/charcoal for primary text and buttons
- **Filler**: `#e8e8e8` - Light gray for secondary backgrounds and hover states
- **Muted**: `#6c757d` - Medium gray for secondary text and icons
- **Border**: `#c7c7c7` - Light gray for borders and dividers
- **Text**: `#333333` - Dark gray for main text content

### Status Colors
- **Success/Connected**: `text-green-600 bg-green-50` (Green)
- **Error/Disconnected**: `text-red-600 bg-red-50` (Red)
- **Warning/Pending**: `text-yellow-600 bg-yellow-50` (Yellow)
- **Neutral**: `text-gray-500 bg-gray-50` (Gray)

### Compliance Status Colors
- **Compliant**: `text-green-700 bg-green-100 border-green-200` (Green)
- **Non-Compliant**: `text-red-700 bg-red-100 border-red-200` (Red)
- **Pending**: `text-yellow-700 bg-yellow-100 border-yellow-200` (Yellow)

## Typography

### Font Family
- **Primary**: Inter font family with fallbacks to system fonts
- **Fallback**: `Inter, system-ui, -apple-system, sans-serif`

### Font Sizes & Weights
- **Headings**: `text-2xl font-bold` (24px, bold)
- **Subheadings**: `text-base font-medium` (16px, medium)
- **Body Text**: `text-sm` (14px, normal)
- **Small Text**: `text-xs` (12px, normal)
- **Labels**: `text-xs font-medium` (12px, medium)

## Component Styling

### Buttons

#### Primary Buttons
- **Background**: `bg-foreground` (#212529)
- **Text**: `text-white`
- **Hover**: `hover:bg-foreground/90`
- **Border Radius**: `rounded-lg` (8px)
- **Padding**: `px-4 py-2` or `px-3 py-1.5`
- **Font**: `text-sm font-medium`

#### Secondary Buttons
- **Background**: `bg-filler` (#e8e8e8)
- **Text**: `text-text` (#333333)
- **Hover**: `hover:bg-filler/80`
- **Border**: `border border-border`
- **Border Radius**: `rounded-lg`

#### Icon Buttons
- **Size**: `p-1` or `p-2`
- **Hover**: `hover:bg-filler`
- **Border Radius**: `rounded` (4px)

### Form Elements

#### Input Fields
- **Background**: `bg-filler` or `bg-background`
- **Border**: `border border-border`
- **Focus Ring**: `focus:ring-2 focus:ring-foreground/20 focus:border-foreground`
- **Border Radius**: `rounded-lg`
- **Padding**: `p-3` or `py-2 px-3`
- **Text**: `text-text placeholder-muted`

#### Select Dropdowns
- **Background**: `bg-filler`
- **Border**: `border-2 border-border hover:border-foreground/50`
- **Focus**: `focus-within:border-foreground focus-within:ring-2 focus-within:ring-foreground/20`

### Cards & Containers

#### Main Cards
- **Background**: `bg-filler`
- **Border**: `border border-border`
- **Border Radius**: `rounded-lg` or `rounded-xl`
- **Padding**: `p-4` or `p-6`

#### Dialog Modals
- **Background**: `bg-background`
- **Border**: `border border-border`
- **Border Radius**: `rounded-xl`
- **Overlay**: `bg-foreground/20` (semi-transparent dark overlay)

### Navigation

#### Sidebar
- **Width**: `w-60` (240px)
- **Background**: `bg-background`
- **Border**: `border-r border-t border-border`
- **Logo Size**: `w-6 h-6` (24px)

#### Header
- **Height**: `h-16` (64px)
- **Border**: `border-b border-border`
- **Padding**: `px-4`

## Layout & Spacing

### Grid System
- **Main Container**: `max-w-4xl mx-auto`
- **Padding**: `px-4 py-6`
- **Responsive**: Mobile-first approach with `lg:` breakpoints

### Spacing Scale
- **Small**: `gap-1`, `p-1`, `m-1` (4px)
- **Medium**: `gap-2`, `p-2`, `m-2` (8px)
- **Large**: `gap-3`, `p-3`, `m-3` (12px)
- **Extra Large**: `gap-4`, `p-4`, `m-4` (16px)
- **Section Spacing**: `mb-4`, `mt-8` (16px, 32px)

## Border Radius

### Standard Radius
- **Small**: `rounded` (4px) - for small buttons and icons
- **Medium**: `rounded-lg` (8px) - for buttons, inputs, and cards
- **Large**: `rounded-xl` (12px) - for dialogs and main containers
- **Full**: `rounded-full` - for avatars and circular elements

## Interactive States

### Hover Effects
- **Buttons**: `hover:bg-foreground/90` or `hover:bg-filler/80`
- **Links**: `hover:text-foreground/80`
- **Cards**: `hover:bg-filler/30`
- **Transitions**: `transition-colors` for smooth color changes

### Focus States
- **Inputs**: `focus:ring-2 focus:ring-foreground/20 focus:border-foreground`
- **Buttons**: Maintains hover state with focus

### Disabled States
- **Background**: `disabled:bg-muted`
- **Cursor**: `disabled:cursor-not-allowed`

## Icons & Images

### Icon Sizing
- **Small**: `w-3 h-3` (12px)
- **Medium**: `w-4 h-4` (16px)
- **Large**: `w-5 h-5` (20px)
- **Extra Large**: `w-6 h-6` (24px)

### Avatar Sizing
- **Small**: `w-6 h-6` (24px)
- **Medium**: `w-12 h-12` (48px)
- **Large**: `w-16 h-16` (64px)

## Responsive Design

### Breakpoints
- **Mobile**: Default (no prefix)
- **Large**: `lg:` (1024px+)

### Mobile Adaptations
- **Sidebar**: Hidden by default, overlay on mobile
- **Tables**: Horizontal scroll with `overflow-x-auto`
- **Grid**: Responsive columns with `grid-cols-5` or `grid-cols-6`

## Scrollbar Styling

### Hidden Scrollbars
- **Class**: `scrollbar-thin`
- **Effect**: Completely hidden but functional

### Aesthetic Scrollbars
- **Class**: `scrollbar-aesthetic`
- **Width**: 6px
- **Color**: `#c7c7c7`
- **Border Radius**: 3px

## Accessibility Features

### Color Contrast
- High contrast between text and backgrounds
- Clear distinction between interactive and static elements

### Focus Management
- Visible focus rings on all interactive elements
- Proper tab order and keyboard navigation

### Screen Reader Support
- Semantic HTML structure
- Proper ARIA labels and roles

## Animation & Transitions

### Standard Transitions
- **Duration**: `transition-colors` (default 150ms)
- **Easing**: Default CSS easing
- **Transform**: `transition-transform` for micro-interactions

### Loading States
- **Spinner**: Custom SVG spinner with `animate-spin`
- **Disabled State**: Visual feedback during loading

## Design Patterns

### Consistent Spacing
- 4px base unit for all spacing
- Consistent padding and margins across components

### Visual Hierarchy
- Clear typography scale
- Proper use of color contrast
- Logical grouping of related elements

### Component Consistency
- Reusable button styles
- Consistent form element styling
- Standardized dialog patterns

## File Structure
- **Global Styles**: `src/app/globals.css`
- **Component Styles**: Inline Tailwind classes
- **No CSS Modules**: Uses Tailwind utility classes throughout

This design system provides a cohesive, professional appearance suitable for a compliance monitoring application, with emphasis on clarity, accessibility, and user experience.
