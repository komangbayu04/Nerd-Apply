import React, { useMemo } from 'react'
import { tokens } from '../../assets/tokens.js'
import useEditorStore from '../../store/editorStore.js'

// Resolve a color token to actual CSS color
function resolveColor(colorToken, themeColors) {
  if (!colorToken) return 'transparent'
  if (colorToken === 'canvas' || colorToken === 'surface') return themeColors.surface
  if (tokens.colors[colorToken]) return tokens.colors[colorToken]
  return colorToken // pass-through for direct values like rgba(...)
}

// Map fontStyle token to scaled CSS properties
function resolveFontStyle(fontStyle, themeColors) {
  const display = tokens.typography.families.display
  const body = tokens.typography.families.body
  const map = {
    displayXl:  { fontFamily: display, fontSize: 64, fontWeight: 400, lineHeight: 1.05, letterSpacing: '-1.5px', color: themeColors.headline },
    displayLg:  { fontFamily: display, fontSize: 48, fontWeight: 400, lineHeight: 1.10, letterSpacing: '-1px',   color: themeColors.headline },
    displayMd:  { fontFamily: display, fontSize: 36, fontWeight: 400, lineHeight: 1.15, letterSpacing: '-0.5px', color: themeColors.headline },
    displaySm:  { fontFamily: display, fontSize: 28, fontWeight: 400, lineHeight: 1.20, letterSpacing: '-0.3px', color: themeColors.headline },
    titleLg:    { fontFamily: body,    fontSize: 22, fontWeight: 500, lineHeight: 1.30, letterSpacing: '0',      color: themeColors.headline },
    titleMd:    { fontFamily: body,    fontSize: 18, fontWeight: 500, lineHeight: 1.40, letterSpacing: '0',      color: themeColors.headline },
    titleSm:    { fontFamily: body,    fontSize: 16, fontWeight: 500, lineHeight: 1.40, letterSpacing: '0',      color: themeColors.headline },
    bodyMd:     { fontFamily: body,    fontSize: 16, fontWeight: 400, lineHeight: 1.55, letterSpacing: '0',      color: themeColors.body },
    bodySm:     { fontFamily: body,    fontSize: 14, fontWeight: 400, lineHeight: 1.55, letterSpacing: '0',      color: themeColors.body },
    caption:    { fontFamily: body,    fontSize: 13, fontWeight: 500, lineHeight: 1.40, letterSpacing: '0',      color: themeColors.body },
    captionUc:  { fontFamily: body,    fontSize: 12, fontWeight: 500, lineHeight: 1.40, letterSpacing: '1.5px',  textTransform: 'uppercase', color: themeColors.body },
    button:     { fontFamily: body,    fontSize: 14, fontWeight: 500, lineHeight: 1.00, letterSpacing: '0',      color: themeColors.ctaText },
  }
  return map[fontStyle] || map.bodyMd
}

function CanvasLayer({
  layer, scale, themeColors,
  textFields, selectedHeadshot, customHeadshotUrl,
  selectedLogo, selectedBadge,
}) {
  const sp = (v) => Math.round((v || 0) * scale)

  const baseStyle = {
    position: 'absolute',
    left:   sp(layer.x),
    top:    sp(layer.y),
    width:  layer.w !== undefined ? sp(layer.w) : undefined,
    height: layer.h !== undefined ? sp(layer.h) : undefined,
  }

  // ── Background ────────────────────────────────────────────────────
  if (layer.type === 'background') {
    // backgroundImage: path to a static image used as the full background
    if (layer.backgroundImage) {
      return (
        <img
          src={layer.backgroundImage}
          alt=""
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      )
    }
    // fillColor overrides the theme surface color
    return (
      <div style={{ position: 'absolute', inset: 0, backgroundColor: layer.fillColor || themeColors.surface }} />
    )
  }

  // ── Rect (solid or semi-transparent) ──────────────────────────────
  if (layer.type === 'rect') {
    // fillColor = direct CSS value (supports rgba); colorToken = token lookup
    const bg = layer.fillColor
      ? layer.fillColor
      : resolveColor(layer.colorToken, themeColors)
    return (
      <div style={{
        ...baseStyle,
        backgroundColor: bg,
        opacity: layer.opacity !== undefined ? layer.opacity : 1,
        borderRadius: layer.radius ? sp(layer.radius) : 0,
      }} />
    )
  }

  // ── Divider line ──────────────────────────────────────────────────
  if (layer.type === 'divider') {
    return (
      <div style={{
        position: 'absolute',
        left: sp(layer.x),
        top:  sp(layer.y),
        width: sp(layer.w || 100),
        height: Math.max(1, sp(1)),
        backgroundColor: resolveColor(layer.colorToken, themeColors),
      }} />
    )
  }

  // ── Text ──────────────────────────────────────────────────────────
  if (layer.type === 'text') {
    const val = textFields[layer.field] || ''
    if (!val) return null
    const style = resolveFontStyle(layer.fontStyle, themeColors)

    // textColorToken overrides the theme-derived color
    let color = style.color
    if (layer.textColorToken) {
      color = resolveColor(layer.textColorToken, themeColors)
    }

    // layer.fontSize overrides the token size (used for custom large/small text)
    const baseFontSize = layer.fontSize !== undefined ? layer.fontSize : style.fontSize

    return (
      <div style={{
        ...baseStyle,
        fontFamily:    style.fontFamily,
        fontSize:      `${baseFontSize * scale}px`,
        fontWeight:    style.fontWeight,
        lineHeight:    style.lineHeight,
        letterSpacing: style.letterSpacing,
        textTransform: style.textTransform || 'none',
        textAlign:     layer.align || 'left',
        color,
        overflow:      'hidden',
        wordBreak:     'break-word',
      }}>
        {val}
      </div>
    )
  }

  // ── Image (headshot / logo / badge) ───────────────────────────────
  if (layer.type === 'image') {
    let src = null
    const shape = layer.shape || 'rect'

    if (layer.slot === 'headshot') {
      // Custom upload takes priority over library selection
      src = customHeadshotUrl || selectedHeadshot?.squareUrl || null
    } else if (layer.slot === 'logo' && selectedLogo) {
      src = selectedLogo.lightUrl
    } else if (layer.slot === 'badge' && selectedBadge) {
      src = selectedBadge.url
    }

    if (!src) {
      // Placeholder slot
      return (
        <div style={{
          ...baseStyle,
          backgroundColor: themeColors.surface === '#181715'
            ? tokens.colors.surfaceDarkElevated
            : tokens.colors.surfaceCard,
          borderRadius: shape === 'circle' ? '50%' : sp(6),
          border: `${Math.max(1, sp(1))}px dashed ${tokens.colors.hairline}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width={sp(28)} height={sp(28)} viewBox="0 0 28 28" fill="none">
            {layer.slot === 'headshot' ? (
              <>
                <circle cx="14" cy="10" r="5" stroke={tokens.colors.mutedSoft} strokeWidth="1.5"/>
                <path d="M5 24c0-5 4-9 9-9s9 4 9 9" stroke={tokens.colors.mutedSoft} strokeWidth="1.5" strokeLinecap="round"/>
              </>
            ) : (
              <rect x="4" y="8" width="20" height="12" rx="1.5" stroke={tokens.colors.mutedSoft} strokeWidth="1.5" strokeDasharray="3 2"/>
            )}
          </svg>
        </div>
      )
    }

    return (
      <div style={{
        ...baseStyle,
        borderRadius: shape === 'circle' ? '50%' : sp(4),
        overflow: 'hidden',
      }}>
        <img
          src={src}
          alt={layer.slot}
          crossOrigin="anonymous"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>
    )
  }

  // ── Brand Logo (inline wordmark — styled like reference "pq" logo) ──────────
  if (layer.type === 'brandLogo') {
    const logoColor = layer.color || '#ffffff'
    // Icon is ~50px tall at full canvas scale; scales proportionally
    const iconSize = sp(52)
    const wordSize = sp(11)
    return (
      <div style={{
        position: 'absolute',
        left: sp(layer.x || 46),
        top:  sp(layer.y || 908),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: sp(3),
      }}>
        {/* Square icon — "NA" monogram, similar to pq logomark in reference */}
        <svg width={iconSize} height={iconSize} viewBox="0 0 52 52" fill="none">
          {/* Two overlapping rounded squares like the reference "p" and "q" */}
          <rect x="2"  y="2"  width="26" height="26" rx="5" fill={logoColor} fillOpacity="0.95"/>
          <rect x="24" y="24" width="26" height="26" rx="5" fill={logoColor} fillOpacity="0.95"/>
          {/* N letter */}
          <text x="11" y="20" fontFamily="sans-serif" fontSize="16" fontWeight="800" fill={layer.color === '#ffffff' ? '#F5A200' : '#fff'} textAnchor="middle">N</text>
          {/* A letter */}
          <text x="37" y="47" fontFamily="sans-serif" fontSize="16" fontWeight="800" fill={layer.color === '#ffffff' ? '#F5A200' : '#fff'} textAnchor="middle">A</text>
        </svg>
        {/* Wordmark text */}
        <div style={{
          fontFamily: tokens.typography.families.body,
          fontSize: `${wordSize}px`,
          fontWeight: 600,
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
          color: logoColor,
          opacity: 0.85,
        }}>
          Nerd Apply
        </div>
      </div>
    )
  }

  return null
}

// ─────────────────────────────────────────────────────────────────────────────

export default function CanvasPreview({ template, maxWidth = 480 }) {
  const {
    activeTheme, textFields,
    selectedHeadshot, customHeadshotUrl,
    selectedLogo, selectedBadge,
  } = useEditorStore()

  const themeColors = tokens.themes[activeTheme] || tokens.themes.cream
  const { width, height } = template.dimensions
  const scale = maxWidth / width

  return (
    <div
      className="canvas-preview-target relative overflow-hidden"
      style={{
        width:  Math.round(maxWidth),
        height: Math.round(height * scale),
        backgroundColor: themeColors.surface,
        flexShrink: 0,
      }}
    >
      {template.layers.map((layer, i) => (
        <CanvasLayer
          key={i}
          layer={layer}
          scale={scale}
          themeColors={themeColors}
          textFields={textFields}
          selectedHeadshot={selectedHeadshot}
          customHeadshotUrl={customHeadshotUrl}
          selectedLogo={selectedLogo}
          selectedBadge={selectedBadge}
        />
      ))}
    </div>
  )
}
