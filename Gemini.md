# index.html Structure Guide (Gemini.md)

This document serves as a roadmap for the `index.html` file, which is a massive, dynamic presentation for a photography client ("Little Image"). It explains the architecture, naming conventions, and interactive systems.

## 1. Global Design System (CSS)
Located in the `<style>` tag in the `<head>` (Lines 18-2278).

### Color Palette (CSS Variables)
- `--color-primary`: #94A396 (Sage Green) - Primary brand color.
- `--color-secondary`: #D4A39A (Muted Rose) - Accent color.
- `--color-background`: #FDFCFB (Warm White) - Page background.
- `--color-surface`: #FFFFFF (Pure White) - Card surfaces.
- `--color-text`: #4A443F (Deep Charcoal) - Primary text.

### Typography
- **Headings**: `Solway` (Serif) - Evokes trust, legacy, and gentleness.
- **Body**: `Nunito` (Sans-serif) - Friendly and readable.

---

## 2. Navigation System
- **Sidebar Dots** (Lines 2304-2344): Fixed sidebar with `.nav-dot` elements.
- **Mechanism**: `data-target` on each dot corresponds to the `id` of a `<section>`.
- **JS Logic**: Smooth scrolling and active state updates via Intersection Observer (Lines 4300+).

---

## 3. Main Content Sections (Slides)
All main sections are either `.slide` or `.anatomy-section`.

| `slide-0` | **Intro** | Hero-style entry with "Design Strategy" title. |
| `slide-map` | **Architect's Map** | 6-card grid (`.map-grid`) showing the website's flow. |
| `slide-1` | **Hero Strategy** | Explains the "0.05 Second Rule" with a demo browser window. |
| `slide-hero-anatomy` | **Hero Breakdown** | Anatomy breakdown with absolute-positioned `.callout` bubbles. |
| `slide-2` | **About Strategy** | "Human First" approach explanation. |
| `slide-about-anatomy`| **About Breakdown** | Breakdown of portrait, signature quote, and grid layout. |
| `slide-3` | **Gallery Strategy** | Circular category preview. |
| `slide-gallery-interactive`| **Interactive Gallery**| Live switcher using `.category-circle` and `.category-gallery`. |
| `slide-collections` | **Step 3a: Collections** | Nine unique styles (A through I) switchable by tabs. |
| `slide-lab` | **Step 3b: Gallery Lab** | Tabbed interface comparing Masonry, Carousel, and Hover Grid. |
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
Located at the bottom (Lines 4180+).

- **Lucide Icons**: Initialized via `lucide.createIcons()`.
- **Scroll Reveal**: Uses `IntersectionObserver` to add the `.active` class to `.slide` and `.reveal` elements.
- **Lightbox**:
    - Centralized overlay (`#lightbox`).
    - Handled by `initLightboxGroups()` which scans for `[data-lightbox-group]`.
    - Supports gallery navigation and captions.
- **Switchers**:
    - `categoryCircles`: Switches categories in the Interactive Gallery.
    - `galleryTabs`: Switches Layouts in the "Gallery Lab".
    - `collectionTabs`: Switches the 9 visual gallery styles.

---

## 6. Maintenance Tips
- **Adding a Slide**: Add a new `<section>` with a unique ID and then add a corresponding `.nav-dot` in the nav sidebar.
- **Image Paths**: Most assets are in `assets/images/` followed by categories (`newborn/`, `child/`, `about/`).
- **Animations**: Most reveals are controlled by CSS transitions triggered by the `.active` class added in JS.
