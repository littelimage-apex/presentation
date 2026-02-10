# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an HTML presentation showcasing website redesign concepts for Little Image Photography. The presentation demonstrates multiple layout variations for each website section (Hero, About, Gallery, Packages, Reviews, FAQ, Contact) and a full website preview with switchable visual themes.

**Key characteristics:**
- Simple three-file architecture: [index.html](index.html), [style.css](style.css), [script.js](script.js)
- No build process, bundler, or package manager required
- Static/demo content only (no backend or API)
- Opens directly in a browser

## Opening the Presentation

Simply open [index.html](index.html) in a web browser. No local server required.

## File Structure

```
presentation/
├── index.html                          # Main presentation file (10,528 lines)
├── assets/
│   └── images/                         # All photography samples, organized by category
│       ├── about/
│       ├── child/
│       ├── contact/
│       ├── events/
│       ├── home/
│       ├── newborn/
│       ├── outdoor/
│       ├── pricing/
│       ├── special_occasion/
│       ├── three_year_milestone/
│       └── misc/
├── process_images.py                   # Utility script that downloaded/organized images from original site
├── current_website_content.md          # Content audit of the current Little Image website
└── current_website_content_with_images.md
```

## Architecture & Key Patterns

### CSS Organization

All styles are in a `<style>` tag in the `<head>`. Structure:

1. **CSS Custom Properties (lines ~23-47)**: Brand colors, fonts, spacing defined in `:root`
   - Primary palette: Sage Green (#94A396), Muted Rose (#D4A39A), Oatmeal (#F5F2ED)
   - Fonts: Solway (headings), Nunito (body)

2. **Base Styles**: Resets, typography, utilities (`.container`, `.btn` classes)

3. **Section Styles**: Each presentation section has dedicated styles (hero variants, gallery layouts, package cards, etc.)

4. **Website Preview Styles**: Miniature website mockup styles (`.preview-*` classes)

5. **Theme Variations**: Multiple CSS classes for alternative visual themes (`.style-editorial`, `.style-minimal`, `.style-luxe`, etc.)

### HTML Structure

The presentation is organized as sequential "slides" (sections):

1. **Title Slide** - Introduction
2. **Hero Lab** - 7 hero layout variations with switcher tabs
3. **About Lab** - 5 about section layouts
4. **Gallery Lab** - 4 gallery presentation styles
5. **Collections Lab** - Gallery filtering/categorization patterns
6. **Packages Lab** - 7 pricing layout designs
7. **Reviews Section** - Review layouts with switchers
8. **FAQ Section** - FAQ layouts with switchers
9. **Contact Section** - Contact form layouts with switchers
10. **Full Website Preview** - Complete website mockup with 6 theme switchers

Each "Lab" section contains:
- Tab buttons for switching between layout options
- Multiple `.layout-panel` or `.package-panel` elements (only one visible at a time)
- Demo content representing the actual website content

### JavaScript Architecture

JavaScript is in a `<script>` tag before `</body>` (lines ~10150-10526). Key systems:

#### 1. Scroll Reveal Animation (lines ~10150-10175)
- Uses Intersection Observer API
- Adds `.active` class to `.reveal` elements when they enter viewport
- Triggers fade-in and slide-up animations

#### 2. Tab Switchers (multiple implementations)
- **Gallery Lab Tabs** (lines ~10248-10267): Switches between gallery layout variations
- **Collection Style Tabs** (lines ~10270-10288): Switches collection organization patterns
- **Package Lab Tabs** (lines ~10291-10310): Switches pricing layout designs
- **Layout Switchers** (lines ~10313-10335): Generic system for Hero/About/Reviews/FAQ/Contact sections
  - Uses `data-tab-group` and `data-tab-id` attributes
  - Switches active class on tabs and corresponding `.layout-panel` elements

#### 3. Global Preview Style Switcher (lines ~10337-10360)
- Controls the full website preview theme
- Uses `data-style-id` attributes on buttons
- Adds/removes theme class names on `#mainWebsitePreview` element
- Available themes: default, editorial, minimal, scrapbook, luxe, botanical

#### 4. Category Gallery Switcher (lines ~10224-10245)
- Switches between photography categories (newborn, child, outdoor, etc.)
- Uses `.category-circle` buttons and `.category-gallery` panels

#### 5. Lightbox Gallery (lines ~10400-10497)
- Full-screen image viewer with prev/next navigation
- Keyboard support (Arrow keys, Escape)
- Works with `data-lightbox-group` and `data-lightbox-src` attributes
- Multiple image groups supported

#### 6. Parallax Reel Interaction (lines ~10500-10524)
- Mouse-based parallax effect on image reel
- Horizontal scroll on vertical mouse wheel

#### 7. Navigation Dots (lines ~10176-10222)
- Side navigation with scroll-spy highlighting
- Click to scroll to section
- Uses Intersection Observer to track active section

### External Dependencies

Loaded via CDN (no npm/package.json):

1. **Google Fonts**: Nunito (body), Solway (headings)
2. **Lucide Icons**: `<script src="https://unpkg.com/lucide@latest"></script>`
   - Icons initialized with `lucide.createIcons()` after DOM changes

## Common Tasks

### Adding a New Layout Variation

1. **Add the tab button** in the appropriate switcher group:
   ```html
   <button class="layout-tab" data-tab-group="hero" data-tab-id="new-variant">New Design</button>
   ```

2. **Add the panel** with matching attributes:
   ```html
   <div class="layout-panel" data-panel-group="hero" data-panel-id="new-variant">
       <!-- Layout content -->
   </div>
   ```

3. **JavaScript automatically handles the switching** (no code changes needed)

### Adding a New Website Preview Theme

1. **Add theme button**:
   ```html
   <button class="layout-tab" data-style-id="style-newtheme">New Theme Name</button>
   ```

2. **Add CSS for the theme** in the `<style>` section:
   ```css
   #mainWebsitePreview.style-newtheme {
       /* Theme overrides */
   }
   #mainWebsitePreview.style-newtheme .preview-hero {
       /* Hero section customization */
   }
   ```

### Modifying Brand Colors/Fonts

Edit CSS custom properties in `:root` (lines ~23-47):
```css
:root {
    --color-primary: #94A396;
    --font-heading: 'Solway', serif;
    /* etc. */
}
```

### Adding New Images

1. Place images in appropriate category folder under `assets/images/`
2. Reference with relative paths: `assets/images/category/filename.jpg`
3. For lightbox functionality, add `data-lightbox-src` and `data-lightbox-group` attributes

## Content Source

The presentation is based on the current Little Image Photography website (littleimageny.com). Reference documents:
- [current_website_content.md](current_website_content.md) - Text content audit
- [current_website_content_with_images.md](current_website_content_with_images.md) - Content with image references

## Browser Compatibility

Uses modern web APIs:
- Intersection Observer API (scroll animations, nav dots)
- CSS Custom Properties (variables)
- ES6+ JavaScript (arrow functions, const/let, template literals)

Recommended browsers: Modern Chrome, Firefox, Safari, Edge (2020+)
