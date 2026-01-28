# PWA Icons Setup

The manifest.json references the following icon files that need to be created:

## Required Icons

1. **icon-192.png** (192x192px) - Required for PWA
2. **icon-512.png** (512x512px) - Required for PWA

## How to Create Icons

You can create these icons from your existing favicon or logo:

### Option 1: Using ImageMagick

```bash
# Create 192x192 icon
convert apple-touch-icon.png -resize 192x192 icon-192.png

# Create 512x512 icon
convert apple-touch-icon.png -resize 512x512 icon-512.png
```

### Option 2: Using Online Tools

1. Visit [RealFaviconGenerator](https://realfavicongenerator.net/)
2. Upload your logo/favicon
3. Generate PWA icons
4. Download and place in root directory

### Option 3: Manual Creation

Use any image editor (Photoshop, GIMP, Figma, etc.) to create:
- A 192x192px PNG file named `icon-192.png`
- A 512x512px PNG file named `icon-512.png`

Both should have:
- Transparent or white background
- Your logo/brand centered
- High quality (PNG format)
- Proper margins (about 10% padding)

## Current Icons

Currently available:
- ✅ favicon-16x16.png
- ✅ favicon-32x32.png
- ✅ apple-touch-icon.png (180x180)
- ❌ icon-192.png (needs to be created)
- ❌ icon-512.png (needs to be created)

## Temporary Workaround

Until the proper icons are created, the PWA will use the apple-touch-icon.png as a fallback. The site will still function, but iOS and Android may not display the optimal icon when installing the PWA.
