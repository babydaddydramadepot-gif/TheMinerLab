# The Miner Lab - Shopify Theme

A premium, production-ready Shopify theme for crypto mining hardware stores, featuring a dark cyberpunk aesthetic with electric cyan accents.

## 🎨 Design System

### Color Palette
- **Background:** `#0c0f14` (Deep dark blue-black)
- **Surface:** `#101318` (Slightly elevated dark)
- **Surface Elevated:** `#141820` (Card/modal backgrounds)
- **Primary/Cyan:** `#4dd4e8` (Electric cyan - brand accent)
- **Foreground:** `#f1f5f9` (Off-white text)
- **Muted:** `#94a3b8` (Secondary text)
- **Border:** `#2a2f3a` (Subtle borders)

### Typography
- **Display Font:** Space Grotesk (headings, logo)
- **Body Font:** Inter (body text)
- **Mono Font:** JetBrains Mono (specs, code)

### Features
- 🎭 Dark cyberpunk aesthetic with matte backgrounds
- ⚡ Electric cyan accent color with glow effects
- 🔮 Glass morphism cards with backdrop blur
- 🌊 Smooth reveal-on-scroll animations
- 📱 Fully responsive mobile-first design
- 🛒 AJAX cart with live updates
- 🔧 No build tools - pure Liquid/CSS/JS

## 📁 Theme Structure

```
shopify-theme/
├── assets/
│   ├── theme.css (18.5KB - Comprehensive styles)
│   └── theme.js (16KB - All interactions)
├── config/
│   ├── settings_schema.json (Theme customizer)
│   └── settings_data.json (Default settings)
├── layout/
│   └── theme.liquid (Main HTML wrapper)
├── locales/
│   └── en.default.json (Translation strings)
├── sections/ (18 sections)
│   ├── header.liquid
│   ├── footer.liquid
│   ├── hero.liquid
│   ├── categories-grid.liquid
│   ├── why-us.liquid
│   ├── featured-products.liquid
│   ├── reviews.liquid
│   ├── wholesale-cta.liquid
│   ├── faq-preview.liquid
│   ├── main-product.liquid
│   ├── main-collection.liquid
│   ├── main-cart.liquid
│   ├── page-about.liquid
│   ├── page-contact.liquid
│   ├── page-faq.liquid
│   ├── page-wholesale.liquid
│   ├── main-404.liquid
│   └── main-page.liquid
├── snippets/ (10 snippets)
│   ├── product-card.liquid
│   ├── breadcrumb.liquid
│   └── icon-*.liquid (8 icon snippets)
└── templates/ (10 templates)
    ├── index.json
    ├── product.json
    ├── collection.json
    ├── cart.json
    ├── page.json
    ├── page.about.json
    ├── page.contact.json
    ├── page.faq.json
    ├── page.wholesale.json
    └── 404.json
```

**Total:** 44 files

## 🚀 Installation

### Method 1: GitHub Integration (Recommended)

1. **Push to GitHub:**
   ```bash
   cd shopify-theme
   git init
   git add .
   git commit -m "Initial Miner Lab theme"
   git remote add origin https://github.com/YOUR_USERNAME/miner-lab-theme.git
   git push -u origin main
   ```

2. **Connect to Shopify:**
   - Go to Shopify Admin → Online Store → Themes
   - Click "Add theme" → "Connect from GitHub"
   - Select your repository and branch
   - Shopify will auto-deploy the theme

3. **Activate Theme:**
   - Click "Customize" to preview
   - Click "Publish" when ready

### Method 2: Manual Upload

1. **Create ZIP file:**
   ```bash
   cd shopify-theme
   zip -r miner-lab-theme.zip .
   ```

2. **Upload to Shopify:**
   - Go to Shopify Admin → Online Store → Themes
   - Click "Add theme" → "Upload ZIP file"
   - Select `miner-lab-theme.zip`
   - Wait for upload to complete

3. **Activate Theme:**
   - Click "Customize" to preview
   - Click "Publish" when ready

### Method 3: Shopify CLI

```bash
# Install Shopify CLI
npm install -g @shopify/cli @shopify/theme

# Navigate to theme directory
cd shopify-theme

# Connect to your store
shopify theme dev --store your-store.myshopify.com

# Push to live theme
shopify theme push --store your-store.myshopify.com
```

## 📦 Product Setup

### Product Tag Format

Products use tags to store specifications. Format: `key:value`

**Example tags for Antminer S19 XP:**
```
hashrate:140TH
efficiency:21.5 J/TH
algo:SHA-256
power:3010W
in-stock
```

**Supported spec tags:**
- `hashrate:` - Mining hashrate (e.g., "140TH", "110TH")
- `efficiency:` - Power efficiency (e.g., "21.5 J/TH")
- `algo:` - Mining algorithm (e.g., "SHA-256", "Ethash")
- `power:` - Power consumption (e.g., "3010W")

**Status tags:**
- `in-stock` - Shows green "In Stock" badge
- `pre-order` - Shows yellow "Pre-Order" badge
- Any other tag shows as a cyan badge

### Sample Products

1. **Antminer S19 XP (140TH/s)**
   - Tags: `hashrate:140TH`, `efficiency:21.5 J/TH`, `algo:SHA-256`, `power:3010W`, `in-stock`
   - Price: $9,999

2. **Antminer S19 Pro (110TH/s)**
   - Tags: `hashrate:110TH`, `efficiency:29.5 J/TH`, `algo:SHA-256`, `power:3250W`, `in-stock`
   - Price: $7,499

3. **Antminer S19 (95TH/s)**
   - Tags: `hashrate:95TH`, `efficiency:34.5 J/TH`, `algo:SHA-256`, `power:3250W`, `in-stock`
   - Price: $5,999

4. **Antminer S17 Pro (56TH/s)**
   - Tags: `hashrate:56TH`, `efficiency:39.5 J/TH`, `algo:SHA-256`, `power:2094W`, `in-stock`
   - Price: $2,999

5. **APW12 PSU (1500W)**
   - No hashrate tags (accessory)
   - Price: $249

6. **Loki Starter Kit**
   - Bundle product
   - Price: $12,499

## ⚙️ Theme Customization

### Colors & Fonts
1. Go to Theme Customizer
2. Navigate to "Theme Settings"
3. Adjust colors, fonts, and social links

### Pages to Create
1. **About** - `/pages/about` (use page.about template)
2. **Contact** - `/pages/contact` (use page.contact template)
3. **FAQ** - `/pages/faq` (use page.faq template)
4. **Wholesale** - `/pages/wholesale` (use page.wholesale template)

### Navigation Menu
Create a menu with these items:
- Home (/)
- Products (/collections/all)
- About (/pages/about)
- FAQ (/pages/faq)
- Wholesale (/pages/wholesale)
- Contact (/pages/contact)

Assign to "Main menu" in Navigation settings.

## 🎯 Key Features

### CSS Utilities
- `.reveal` - Fade-in on scroll
- `.btn-premium` - Gradient button with glow
- `.light-sweep` - Animated light sweep effect
- `.glass` - Glass morphism effect
- `.gradient-border` - Animated gradient border
- `.glow-text` - Cyan glow text
- `.text-gradient` - Gradient text fill
- `.grid-bg` - Subtle grid background pattern

### Animations
- `breathe` - Gentle pulsing (4s)
- `drift-slow` - Floating motion (8s)
- `pulse-soft` - Opacity pulse (2s)
- `rise-in` - Fade in from bottom (0.6s)
- `light-sweep-anim` - Horizontal light sweep (3s)
- `glow-pulse` - Glow intensity pulse (2s)

### JavaScript Features
1. **IntersectionObserver** - Reveal elements on scroll
2. **Header Scroll** - Adds `.scrolled` class after 100px
3. **Mobile Menu** - Animated overlay menu
4. **Product Gallery** - Thumbnail switching
5. **Variant Selector** - Updates price/availability
6. **OS Selector** - Vnish/Braiins toggle (cosmetic)
7. **FAQ Accordion** - Expand/collapse
8. **Reviews Carousel** - Horizontal scroll
9. **Cart AJAX** - Live quantity updates

## 📱 Responsive Breakpoints

- Mobile: `< 640px`
- Tablet: `640px - 1024px`
- Desktop: `> 1024px`
- Max width: `1280px`

## 🔧 Browser Support

- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Mobile Safari (iOS 13+)
- Chrome Mobile (Android 8+)

## 📄 License

Proprietary - The Miner Lab © 2024

## 🆘 Support

For theme support, contact:
- Email: support@theminerlab.com
- Website: https://theminerlab.com/support

## 🔄 Updates

This theme follows Shopify 2.0 standards and is compatible with:
- Shopify Online Store 2.0
- Shopify CLI 3.x
- GitHub integration for version control
- All Shopify plan tiers

---

**Version:** 1.0.0  
**Built with:** Liquid, CSS, JavaScript (Vanilla)  
**No dependencies** - Works out of the box with Shopify's GitHub integration
