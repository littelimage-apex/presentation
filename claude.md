# index.html Structure Guide (Gemini.md)

This document serves as a roadmap for the `index.html` file, which is a massive, dynamic presentation for a photography client ("Little Image"). It explains the architecture, naming conventions, and interactive systems.

## 1. Global Design System (CSS)
Located in the `<style>` tag in the `<head>` (Lines 18-3323).

### Color Palette (CSS Variables)
- `--color-primary`: #94A396 (Sage Green) - Primary brand color.
- `--color-secondary`: #D4A39A (Muted Rose) - Accent color.
- `--color-background`: #F5F2ED (Oatmeal) - Page background.
- `--color-surface`: #FDFCFB (Cream) - Card surfaces.
- `--color-text`: #6B5E51 (Clay Brown) - Primary text.

### Typography
- **Headings**: `Solway` (Serif) - Evokes trust, legacy, and gentleness.
- **Body**: `Nunito` (Sans-serif) - Friendly and readable.

---

## 2. Navigation System
- **Sidebar Dots** (Lines 3349-3389): Fixed sidebar with `.nav-dot` elements.
- **Mechanism**: `data-target` on each dot corresponds to the `id` of a `<section>`.
- **JS Logic**: Smooth scrolling and active state updates via Intersection Observer (Lines 6185+).

---

## 3. Main Content Sections (Slides)
All main sections are either `.slide` or `.anatomy-section` (or custom like `.map-section`).

| ID | Title | Description |
|---|---|---|
| `slide-0` | **Intro** | Hero-style entry with "Design Strategy" title. |
| `slide-map` | **Architect's Map** | 6-card grid (`.map-grid`) showing the website's flow. |
| `slide-1` | **Hero Strategy** | Explains the "0.05 Second Rule" with a demo browser window. |
| `slide-hero-anatomy` | **Hero Breakdown** | Anatomy breakdown with absolute-positioned `.callout` bubbles. |
| `slide-2` | **About Strategy** | "Human First" approach explanation with Portrait. |
| `slide-about-anatomy`| **About Breakdown** | Breakdown of portrait, signature quote, and grid layout. |
| `slide-3` | **Gallery Strategy** | Circular category preview explaining "Buckets of Interest." |
| `slide-gallery-interactive`| **Interactive Gallery**| Live switcher using `.category-circle` and `.category-gallery`. |
| `slide-collections` | **Step 3a: Collections** | Twenty-four unique styles (A through X) switchable by tabs. |
| `slide-lab` | **Step 3b: Gallery Lab** | Tabbed interface comparing Masonry, Filmstrip, Dreamscape, Carousel, Hovergrid, Parallaxreel, and Organic Pebbles. |
| `slide-4` | **Reviews** | Centered client stories with emotional impact. |
| `slide-5` | **FAQ** | Interactive accordions for reducing friction. |
| `slide-6` | **Contact / CTA** | Centered contact form mockup (no booking). |

---

## 4. Reusable UI Components
- **Demo Window** (`.demo-window`): A browser-mockup container with red/yellow/green dots in the bar (`.demo-browser-bar`).
- **Showcase Layout** (`.section-showcase`): A split layout (usually 50/50). Use `.reverse` to swap text/demo order.
- **Anatomy Cards** (`.detail-card`): Notched cards (`.sage` or `.rose`) used in breakdown sections.
- **Brand Pill** (`.brand-pill`): Small badge for sub-headers.

---

## 5. Interactive Systems (JavaScript)
Located at the bottom (Lines 6149+).

- **Lucide Icons**: Initialized via `lucide.createIcons()`.
- **Scroll Reveal**: Uses `IntersectionObserver` to add the `.active` class to `.slide`, `.anatomy-section`, and `.demo-window` (Lines 6156-6182).
- **Lightbox**:
    - Centralized overlay (`#lightbox`) at line 3331.
    - Handled by `initLightboxGroups()` which scans for `[data-lightbox-group]`.
    - Supports gallery navigation, counter, and keyboard shortcuts.
- **Switchers**:
    - `categoryCircles`: Switches categories in the Interactive Gallery (Line 6217).
    - `galleryTabs`: Switches Layouts in the "Gallery Lab" (Line 6240).
    - `collectionTabs`: Switches the 24 visual gallery styles (Line 6262).
- **Special Effects**:
    - `Carousel`: Custom slider logic for the Carousel Lab panel.
    - `Parallax Reel`: Mouse-move based movement for luxury gallery reel.

---

## 6. Maintenance Tips
- **Adding a Slide**: Add a new `<section>` with a unique ID and then add a corresponding `.nav-dot` in the nav sidebar.
- **Image Paths**: Most assets are in `assets/images/` followed by categories (`newborn/`, `child/`, `about/`).
- **Animations**: Most reveals are controlled by CSS transitions triggered by the `.active` class added in JS.
