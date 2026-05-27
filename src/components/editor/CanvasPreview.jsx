import React, { useMemo } from 'react'
import { tokens } from '../../assets/tokens.js'
import useEditorStore from '../../store/editorStore.js'

// Map colorToken string to actual color value
function resolveColor(colorToken, themeColors) {
  if (!colorToken) return 'transparent'
  // Check theme tokens first
  if (colorToken === 'canvas' || colorToken === 'surface') return themeColors.surface
  // Check brand tokens
  if (tokens.colors[colorToken]) return tokens.colors[colorToken]
  // Fallback direct value
  return colorToken
}

// Map fontStyle token to CSS
function resolveFontStyle(fontStyle, themeColors) {
  const display = tokens.typography.families.display
  const body = tokens.typography.families.body

  const map = {
    displayXl:   { fontFamily: display, fontSize: '64px', fontWeight: 400, lineHeight: 1.05, letterSpacing: '-1.5px', color: themeColors.headline },
    displayLg:   { fontFamily: display, fontSize: '48px', fontWeight: 400, lineHeight: 1.10, letterSpacing: '-1px',   color: themeColors.headline },
    displayMd:   { fontFamily: display, fontSize: '36px', fontWeight: 400, lineHeight: 1.15, letterSpacing: '-0.5px', color: themeColors.headline },
    displaySm:   { fontFamily: display, fontSize: '28px', fontWeight: 400, lineHeight: 1.20, letterSpacing: '-0.3px', color: themeColors.headline },
    titleLg:     { fontFamily: body,    fontSize: '22px', fontWeight: 500, lineHeight: 1.30, letterSpacing: '0',      color: themeColors.headline },
    titleMd:     { fontFamily: body,    fontSize: '18px', fontWeight: 500, lineHeight: 1.40, letterSpacing: '0',      color: themeColors.headline },
    titleSm:     { fontFamily: body,    fontSize: '16px', fontWeight: 500, lineHeight: 1.40, letterSpacing: '0',      color: themeColors.headline },
    bodyMd:      { fontFamily: body,    fontSize: '16px', fontWeight: 400, lineHeight: 1.55, letterSpacing: '0',      color: themeColors.body },
    bodySm:      { fontFamily: body,    fontSize: '14px', fontWeight: 400, lineHeight: 1.55, letterSpacing: '0',      color: themeColors.body },
    caption:     { fontFamily: body,    fontSize: '13px', fontWeight: 500, lineHeight: 1.40, letterSpacing: '0',      color: themeColors.body },
    captionUc:   { fontFamily: body,    fontSize: '12px', fontWeight: 500, lineHeight: 1.40, letterSpacing: '1.5px',  textTransform: 'uppercase', color: themeColors.body },
    button:      { fontFamily: body,    fontSize: '14px', fontWeight: 500, lineHeight: 1.00, letterSpacing: '0',      color: themeColors.ctaText },
  }
  return map[fontStyle] || map.bodyMd
}

function CanvasLayer({ layer, scale, themeColors, textFields, selectedHeadshot, selectedLogo, selectedBadge }) {
  const scalePx = (v) => Math.round(v * scale)

  const baseStyle = {
    position: 'absolute',
    left: scalePx(layer.x || 0),
    top: scalePx(layer.y || 0),
    width: layer.w !== undefined ? scalePx(layer.w) : undefined,
    height: layer.h !== undefined ? scalePx(layer.h) : undefined,
  }

  if (layer.type === 'background') {
    return (
      <div
        style={{
          position: 'absolute', inset: 0,
          backgroundColor: resolveColor('canvas', themeColors),
        }}
      />
    )
  }

  if (layer.type === 'rect') {
    const bgColor = resolveColor(layer.colorToken, themeColors)
    return (
      <div style={{ ...baseStyle, backgroundColor: bgColor }} />
    )
  }

  if (layer.type === 'divider') {
    return (
      <div style={{
        position: 'absolute',
        left: scalePx(layer.x || 0),
        top: scalePx(layer.y || 0),
        width: scalePx(layer.w || 100),
        height: Math.max(1, scalePx(1)),
        backgroundColor: resolveColor(layer.colorToken, themeColors),
      }} />
    )
  }

  if (layer.type === 'text') {
    const fieldVal = textFields[layer.field] || ''
    if (!fieldVal) return null
    const fontStyle = resolveFontStyle(layer.fontStyle, themeColors)
    // Scale font sizes down
    const scaledFontStyle = {
      ...fontStyle,
      fontSize: fontStyle.fontSize ? `${parseFloat(fontStyle.fontSize) * scale}px` : undefined,
    }
    return (
      <div style={{
        ...baseStyle,
        ...scaledFontStyle,
        textAlign: layer.align || 'left',
        overflow: 'hidden',
        wordBreak: 'break-word',
      }}>
        {fieldVal}
      </div>
    )
  }

  if (layer.type === 'image') {
    let src = null
    let shape = layer.shape || 'rect'

    if (layer.slot === 'headshot' && selectedHeadshot) {
      src = selectedHeadshot.squareUrl
    } else if (layer.slot === 'logo' && selectedLogo) {
      src = selectedLogo.lightUrl
    } else if (layer.slot === 'badge' && selectedBadge) {
      src = selectedBadge.url
    }

    // Show placeholder when no asset selected
    if (!src) {
      return (
        <div style={{
          ...baseStyle,
          backgroundColor: themeColors.surface === '#181715' ? '#252320' : tokens.colors.surfaceCard,
          borderRadius: shape === 'circle' ? '50%' : scalePx(8),
          border: `${Math.max(1, scalePx(1))}px dashed ${tokens.colors.hairline}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg
            width={scalePx(24)} height={scalePx(24)}
            viewBox="0 0 24 24" fill="none"
            style={{ color: tokens.colors.mutedSoft }}
          >
            {layer.slot === 'headshot' ? (
              <path d="M12 12a4 4 0 100-8 4 4 0 000 8zm0 2c-5 0-8 2.5-8 4.5h16c0-2-3-4.5-8-4.5z" fill="currentColor" opacity="0.4"/>
            ) : (
              <rect x="3" y="7" width="18" height="10" rx="1" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2"/>
            )}
          </svg>
        </div>
      )
    }

    return (
      <div style={{
        ...baseStyle,
        borderRadius: shape === 'circle' ? '50%' : scalePx(4),
        overflow: 'hidden',
        flexShrink: 0,
      }}>
        <img
          src={src}
          alt={layer.slot}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          crossOrigin="anonymous"
        />
      </div>
    )
  }

  return null
}

export default function CanvasPreview({ template, maxWidth = 480 }) {
  const { activeTheme, textFields, selectedHeadshot, selectedLogo, selectedBadge } = useEditorStore()
  const themeColors = tokens.themes[activeTheme] || tokens.themes.cream

  const { width, height } = template.dimensions
  const scale = maxWidth / width
  const previewWidth = maxWidth
  const previewHeight = Math.round(height * scale)

  return (
    <div
      className="canvas-preview-target relative overflow-hidden shadow-lg"
      style={{
        width: previewWidth,
        height: previewHeight,
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
          selectedLogo={selectedLogo}
          selectedBadge={selectedBadge}
        />
      ))}
    </div>
  )
}
