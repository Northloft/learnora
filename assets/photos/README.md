# Real photos

Put photo files here, then list them in `manifest.json`. No code changes needed.

```json
{ "user-research": "user-research.jpg", "hero-1": "hero-1.jpg" }
```

The key is the placeholder's file name without `.svg` (see `assets/IMAGES.md`). Any image not listed keeps its illustrated placeholder, and a photo that fails to load falls back automatically.

## Recommended sizes
| Slot | Ratio | Export at |
|---|---|---|
| Course covers (`<course-id>`) | 5:3 | 1200 × 720 |
| `hero-1` | 3:4 | 900 × 1200 |
| `hero-2`, `hero-3` | 1:1 | 1000 × 1000 |
| `learn-anywhere` | 3:2 | 1280 × 840 |
| `aud-industries`, `aud-campus`, `aud-government` | 4:3 | 1600 × 1200 |

Use JPG or WebP under about 200 KB each. Keep the main subject away from the edges, because images are cropped to fit.

## Licensing
Only use photos you shot, commissioned, or licensed for commercial web use. Keep the licence for each file. Photos of identifiable people need the subject's written consent.
