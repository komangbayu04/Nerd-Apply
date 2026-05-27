export const templates = [
  // ── Template 1: Welcome to the Team ────────────────────────────────────────
  // Designed to match the reference: bright amber BG, large white serif headline
  // behind a tall portrait photo, geometric darker rects on sides, dark name card BR.
  {
    id: 'social-welcome-team-01',
    name: 'Welcome to the Team',
    format: 'square',
    theme: 'Announcement',
    status: 'active',
    defaultTheme: 'coral',
    dimensions: { width: 1080, height: 1080 },
    themes: ['coral', 'dark', 'cream'],
    layers: [
      // ── 1. Background — bright warm amber (matches reference orange) ───────
      { type: 'background', fillColor: '#F5A200' },

      // ── 2. Decorative geometry ─────────────────────────────────────────────
      // LEFT strip rect (visible left of photo, below headline)
      { type: 'rect', x: 0,   y: 486, w: 142, h: 400, fillColor: '#D08800', locked: true },
      // RIGHT side rects (partially behind photo, visible right strip)
      { type: 'rect', x: 734, y: 408, w: 346, h: 270, fillColor: '#D08800', locked: true },
      { type: 'rect', x: 822, y: 264, w: 258, h: 134, fillColor: '#C07C00', locked: true },
      // Small accent top-right
      { type: 'rect', x: 900, y: 174, w: 180, h:  80, fillColor: '#B87200', locked: true },

      // ── 3. Headline — huge white serif, drawn BEFORE photo (photo sits on top) ──
      // "Welcome to the team!" at ~110px fills the canvas width in two bold lines
      {
        type: 'text', field: 'headline',
        x: 40, y: 34, w: 1000,
        fontStyle: 'displayXl',   // serif, weight 400, letter-spacing -1.5px
        fontSize: 110,             // override: much bigger than the 64px token default
        align: 'left',
        textColorToken: 'onPrimary',  // white — always, regardless of theme
        locked: false,
      },

      // ── 4. Portrait headshot — tall, centred, covers most of canvas ────────
      // The photo sits IN FRONT of the headline (z-order: rendered after text)
      // Top of photo at y=140 so the very top serif letters are visible above
      { type: 'image', slot: 'headshot', x: 142, y: 140, w: 796, h: 940, shape: 'rect', locked: false },

      // ── 5. Dark name card (bottom-right, extends to canvas edge) ──────────
      { type: 'rect', x: 490, y: 836, w: 590, h: 206, fillColor: 'rgba(20,18,16,0.90)', locked: true },

      // ── 6. Person name — large display serif, white ────────────────────────
      {
        type: 'text', field: 'personName',
        x: 520, y: 860, w: 538,
        fontStyle: 'displaySm',   // serif, weight 400, letter-spacing -0.3px
        fontSize: 50,              // ~50px — big, readable
        align: 'left',
        textColorToken: 'onDark',
        locked: false,
      },

      // ── 7. Person role — Inter, lighter ────────────────────────────────────
      {
        type: 'text', field: 'personRole',
        x: 520, y: 970, w: 538,
        fontStyle: 'bodyMd',      // Inter 400
        fontSize: 20,
        align: 'left',
        textColorToken: 'onDarkSoft',
        locked: false,
      },

      // ── 8. Brand logo — bottom-left, white ─────────────────────────────────
      { type: 'brandLogo', x: 46, y: 908, color: '#ffffff', locked: true },
    ],
  },

  // ── Template 2 ──────────────────────────────────────────────────────────────
  {
    id: 'social-announcement-01',
    name: 'Social Announcement',
    format: 'square',
    theme: 'Announcement',
    status: 'active',
    dimensions: { width: 1080, height: 1080 },
    themes: ['cream', 'dark', 'coral'],
    layers: [
      { type: 'background', colorToken: 'canvas' },
      { type: 'rect', x: 0, y: 800, w: 1080, h: 280, colorToken: 'surfaceCard', locked: true },
      { type: 'divider', x: 80, y: 800, w: 920, colorToken: 'hairline', locked: true },
      { type: 'text', field: 'headline', x: 80, y: 160, w: 920, fontStyle: 'displayLg', align: 'left', locked: false },
      { type: 'text', field: 'subheadline', x: 80, y: 420, w: 920, fontStyle: 'titleMd', align: 'left', locked: false },
      { type: 'text', field: 'body', x: 80, y: 530, w: 920, fontStyle: 'bodyMd', align: 'left', locked: false },
      { type: 'text', field: 'cta', x: 80, y: 870, w: 300, fontStyle: 'button', align: 'left', locked: false },
      { type: 'text', field: 'date', x: 80, y: 930, w: 920, fontStyle: 'captionUc', align: 'left', locked: false },
    ],
  },
  {
    id: 'social-event-01',
    name: 'Social Event',
    format: 'square',
    theme: 'Event',
    status: 'active',
    dimensions: { width: 1080, height: 1080 },
    themes: ['cream', 'dark', 'coral'],
    layers: [
      { type: 'background', colorToken: 'canvas' },
      { type: 'image', slot: 'headshot', x: 700, y: 80, w: 320, h: 320, shape: 'circle', locked: false },
      { type: 'text', field: 'headline', x: 80, y: 120, w: 580, fontStyle: 'displayMd', align: 'left', locked: false },
      { type: 'text', field: 'subheadline', x: 80, y: 360, w: 580, fontStyle: 'titleMd', align: 'left', locked: false },
      { type: 'divider', x: 80, y: 460, w: 920, colorToken: 'hairline', locked: true },
      { type: 'text', field: 'date', x: 80, y: 490, w: 920, fontStyle: 'captionUc', align: 'left', locked: false },
      { type: 'text', field: 'body', x: 80, y: 560, w: 920, fontStyle: 'bodyMd', align: 'left', locked: false },
      { type: 'rect', x: 80, y: 900, w: 220, h: 60, colorToken: 'surfaceCard', locked: true },
      { type: 'text', field: 'cta', x: 100, y: 920, w: 180, fontStyle: 'button', align: 'center', locked: false },
    ],
  },
  {
    id: 'social-partner-01',
    name: 'Social Partner',
    format: 'square',
    theme: 'Partner',
    status: 'active',
    dimensions: { width: 1080, height: 1080 },
    themes: ['cream', 'dark'],
    layers: [
      { type: 'background', colorToken: 'canvas' },
      { type: 'image', slot: 'logo', x: 80, y: 80, w: 280, h: 120, shape: 'rect', locked: false },
      { type: 'divider', x: 80, y: 260, w: 920, colorToken: 'hairline', locked: true },
      { type: 'text', field: 'headline', x: 80, y: 300, w: 920, fontStyle: 'displayMd', align: 'left', locked: false },
      { type: 'text', field: 'subheadline', x: 80, y: 540, w: 920, fontStyle: 'titleMd', align: 'left', locked: false },
      { type: 'text', field: 'body', x: 80, y: 640, w: 920, fontStyle: 'bodyMd', align: 'left', locked: false },
      { type: 'rect', x: 0, y: 880, w: 1080, h: 200, colorToken: 'surfaceCard', locked: true },
      { type: 'text', field: 'cta', x: 80, y: 940, w: 300, fontStyle: 'button', align: 'left', locked: false },
      { type: 'text', field: 'date', x: 80, y: 1010, w: 920, fontStyle: 'captionUc', align: 'left', locked: false },
    ],
  },
  {
    id: 'social-team-spotlight-01',
    name: 'Team Spotlight',
    format: 'portrait',
    theme: 'Team Spotlight',
    status: 'active',
    dimensions: { width: 1080, height: 1350 },
    themes: ['cream', 'dark', 'coral'],
    layers: [
      { type: 'background', colorToken: 'canvas' },
      { type: 'image', slot: 'headshot', x: 240, y: 80, w: 600, h: 600, shape: 'circle', locked: false },
      { type: 'divider', x: 80, y: 730, w: 920, colorToken: 'hairline', locked: true },
      { type: 'text', field: 'headline', x: 80, y: 780, w: 920, fontStyle: 'displayMd', align: 'center', locked: false },
      { type: 'text', field: 'subheadline', x: 80, y: 1000, w: 920, fontStyle: 'titleMd', align: 'center', locked: false },
      { type: 'text', field: 'body', x: 80, y: 1080, w: 920, fontStyle: 'bodyMd', align: 'center', locked: false },
      { type: 'text', field: 'cta', x: 80, y: 1240, w: 920, fontStyle: 'captionUc', align: 'center', locked: false },
    ],
  },
  {
    id: 'story-announcement-01',
    name: 'Story Announcement',
    format: 'story',
    theme: 'Announcement',
    status: 'active',
    dimensions: { width: 1080, height: 1920 },
    themes: ['cream', 'dark', 'coral'],
    layers: [
      { type: 'background', colorToken: 'canvas' },
      { type: 'rect', x: 0, y: 0, w: 1080, h: 400, colorToken: 'surfaceCard', locked: true },
      { type: 'text', field: 'headline', x: 80, y: 460, w: 920, fontStyle: 'displayXl', align: 'left', locked: false },
      { type: 'divider', x: 80, y: 860, w: 920, colorToken: 'hairline', locked: true },
      { type: 'text', field: 'subheadline', x: 80, y: 900, w: 920, fontStyle: 'titleLg', align: 'left', locked: false },
      { type: 'text', field: 'body', x: 80, y: 1060, w: 920, fontStyle: 'bodyMd', align: 'left', locked: false },
      { type: 'text', field: 'date', x: 80, y: 1500, w: 920, fontStyle: 'captionUc', align: 'left', locked: false },
      { type: 'rect', x: 80, y: 1580, w: 300, h: 80, colorToken: 'surfaceCard', locked: true },
      { type: 'text', field: 'cta', x: 100, y: 1606, w: 260, fontStyle: 'button', align: 'center', locked: false },
    ],
  },
  {
    id: 'story-event-01',
    name: 'Story Event',
    format: 'story',
    theme: 'Event',
    status: 'active',
    dimensions: { width: 1080, height: 1920 },
    themes: ['cream', 'dark', 'coral'],
    layers: [
      { type: 'background', colorToken: 'canvas' },
      { type: 'image', slot: 'headshot', x: 0, y: 0, w: 1080, h: 780, shape: 'rect', locked: false },
      { type: 'rect', x: 0, y: 700, w: 1080, h: 1220, colorToken: 'canvas', locked: true },
      { type: 'text', field: 'date', x: 80, y: 800, w: 920, fontStyle: 'captionUc', align: 'left', locked: false },
      { type: 'divider', x: 80, y: 860, w: 920, colorToken: 'hairline', locked: true },
      { type: 'text', field: 'headline', x: 80, y: 900, w: 920, fontStyle: 'displayLg', align: 'left', locked: false },
      { type: 'text', field: 'subheadline', x: 80, y: 1200, w: 920, fontStyle: 'titleLg', align: 'left', locked: false },
      { type: 'text', field: 'body', x: 80, y: 1360, w: 920, fontStyle: 'bodyMd', align: 'left', locked: false },
      { type: 'rect', x: 80, y: 1700, w: 340, h: 80, colorToken: 'surfaceCreamStrong', locked: true },
      { type: 'text', field: 'cta', x: 100, y: 1726, w: 300, fontStyle: 'button', align: 'center', locked: false },
    ],
  },
  {
    id: 'flyer-event-01',
    name: 'Event Flyer (A4)',
    format: 'flyer',
    theme: 'Event',
    status: 'active',
    dimensions: { width: 2480, height: 3508 },
    themes: ['cream', 'dark'],
    layers: [
      { type: 'background', colorToken: 'canvas' },
      { type: 'rect', x: 0, y: 0, w: 2480, h: 600, colorToken: 'surfaceCard', locked: true },
      { type: 'image', slot: 'logo', x: 120, y: 120, w: 400, h: 200, shape: 'rect', locked: false },
      { type: 'image', slot: 'headshot', x: 1680, y: 800, w: 680, h: 680, shape: 'circle', locked: false },
      { type: 'text', field: 'headline', x: 120, y: 680, w: 1500, fontStyle: 'displayXl', align: 'left', locked: false },
      { type: 'divider', x: 120, y: 1320, w: 2240, colorToken: 'hairline', locked: true },
      { type: 'text', field: 'subheadline', x: 120, y: 1380, w: 1500, fontStyle: 'titleLg', align: 'left', locked: false },
      { type: 'text', field: 'date', x: 120, y: 1600, w: 2240, fontStyle: 'captionUc', align: 'left', locked: false },
      { type: 'text', field: 'body', x: 120, y: 1800, w: 2240, fontStyle: 'bodyMd', align: 'left', locked: false },
      { type: 'rect', x: 120, y: 3200, w: 500, h: 120, colorToken: 'surfaceCard', locked: true },
      { type: 'text', field: 'cta', x: 140, y: 3240, w: 460, fontStyle: 'button', align: 'center', locked: false },
    ],
  },
  {
    id: 'flyer-partner-01',
    name: 'Partner Flyer (A4)',
    format: 'flyer',
    theme: 'Partner',
    status: 'active',
    dimensions: { width: 2480, height: 3508 },
    themes: ['cream', 'dark'],
    layers: [
      { type: 'background', colorToken: 'canvas' },
      { type: 'rect', x: 0, y: 0, w: 2480, h: 500, colorToken: 'primary', locked: true },
      { type: 'image', slot: 'logo', x: 120, y: 100, w: 500, h: 240, shape: 'rect', locked: false },
      { type: 'image', slot: 'badge', x: 1900, y: 80, w: 400, h: 400, shape: 'rect', locked: false },
      { type: 'text', field: 'headline', x: 120, y: 600, w: 2240, fontStyle: 'displayXl', align: 'left', locked: false },
      { type: 'divider', x: 120, y: 1280, w: 2240, colorToken: 'hairline', locked: true },
      { type: 'text', field: 'subheadline', x: 120, y: 1340, w: 2240, fontStyle: 'titleLg', align: 'left', locked: false },
      { type: 'text', field: 'body', x: 120, y: 1560, w: 2240, fontStyle: 'bodyMd', align: 'left', locked: false },
      { type: 'rect', x: 0, y: 3100, w: 2480, h: 408, colorToken: 'surfaceCard', locked: true },
      { type: 'text', field: 'cta', x: 120, y: 3200, w: 600, fontStyle: 'button', align: 'left', locked: false },
      { type: 'text', field: 'date', x: 120, y: 3320, w: 2240, fontStyle: 'captionUc', align: 'left', locked: false },
    ],
  },
]

export default templates
