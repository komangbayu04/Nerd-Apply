import React from 'react'
import Badge from '../ui/Badge.jsx'
import Button from '../ui/Button.jsx'
import { tokens } from '../../assets/tokens.js'

const formatLabels = {
  square: 'Square 1:1',
  portrait: 'Portrait 4:5',
  story: 'Story 9:16',
  flyer: 'Flyer A4',
}

const themeVariant = {
  Announcement: 'default',
  Event: 'success',
  Partner: 'muted',
  'Team Spotlight': 'featured',
}

function PreviewArea({ template }) {
  const themeKey = template.defaultTheme || template.themes[0] || 'cream'
  const themeColors = tokens.themes[themeKey] || tokens.themes.cream
  const { width, height } = template.dimensions
  const aspectRatio = width / height

  // Background: use layer fillColor if present, else theme surface
  const bgLayer = template.layers.find((l) => l.type === 'background')
  const bgColor = bgLayer?.fillColor || themeColors.surface

  const hasHeadshot = template.layers.some((l) => l.type === 'image' && l.slot === 'headshot')
  const hasLogo = template.layers.some((l) => l.type === 'image' && l.slot === 'logo')
  const hasBrandLogo = template.layers.some((l) => l.type === 'brandLogo')
  const topRect = template.layers.find((l) => l.type === 'rect' && l.y === 0 && l.colorToken === 'primary')
  const hasNameCard = template.layers.some((l) => l.type === 'rect' && l.fillColor?.startsWith('rgba(20'))

  // Detect geometric decor rects (welcome-to-team style)
  const decorRects = template.layers.filter((l) => l.type === 'rect' && l.fillColor && l.fillColor.startsWith('#') && l.locked)

  const headlineColor = themeColors.headline === '#141413' ? '#141413' : '#ffffff'

  return (
    <div
      className="w-full rounded-lg overflow-hidden relative"
      style={{ aspectRatio: `${aspectRatio}`, background: bgColor, maxHeight: '220px' }}
    >
      {/* Coral header band for flyer-partner */}
      {topRect && (
        <div className="absolute top-0 left-0 right-0" style={{ height: '18%', backgroundColor: tokens.colors.primary }} />
      )}

      {/* Decorative geometry rects (welcome-to-team style) */}
      {decorRects.slice(0, 4).map((r, i) => (
        <div key={i} className="absolute" style={{
          left: `${(r.x / width) * 100}%`,
          top: `${(r.y / height) * 100}%`,
          width: `${(r.w / width) * 100}%`,
          height: `${(r.h / height) * 100}%`,
          backgroundColor: r.fillColor,
        }} />
      ))}

      {/* Headline text bars */}
      <div className="absolute p-3 flex flex-col gap-1.5" style={{ top: '6%', left: '4%', width: '88%' }}>
        <div className="rounded" style={{ height: template.id === 'social-welcome-team-01' ? '11px' : '7px', width: '80%', backgroundColor: headlineColor, opacity: 0.85 }} />
        <div className="rounded" style={{ height: template.id === 'social-welcome-team-01' ? '11px' : '7px', width: '65%', backgroundColor: headlineColor, opacity: 0.85 }} />
      </div>

      {/* Portrait headshot placeholder */}
      {hasHeadshot && (
        <div className="absolute rounded overflow-hidden" style={{
          left: '13%', top: '13%',
          width: '74%', height: '87%',
          backgroundColor: 'rgba(0,0,0,0.15)',
        }}>
          <div className="w-full h-full flex items-center justify-center">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" opacity="0.4">
              <circle cx="14" cy="10" r="5" stroke="#fff" strokeWidth="1.5"/>
              <path d="M5 24c0-5 4-9 9-9s9 4 9 9" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
        </div>
      )}

      {/* Logo placeholder */}
      {hasLogo && !topRect && (
        <div className="absolute rounded" style={{ width: '28%', height: '10%', left: '7%', top: '7%', backgroundColor: tokens.colors.surfaceCreamStrong }} />
      )}

      {/* Dark name card */}
      {hasNameCard && (
        <div className="absolute rounded-sm" style={{
          left: '45%', bottom: '0', right: '0', height: '22%',
          backgroundColor: 'rgba(20,18,16,0.90)',
        }} />
      )}

      {/* Brand logo dot */}
      {hasBrandLogo && (
        <div className="absolute" style={{ left: '4%', bottom: '8%' }}>
          <div style={{ width: 14, height: 14, backgroundColor: '#ffffff', opacity: 0.8, borderRadius: 3 }} />
        </div>
      )}

      {/* Format label */}
      <div className="absolute bottom-2 right-2 font-body font-medium px-2 py-0.5 rounded"
        style={{ backgroundColor: 'rgba(0,0,0,0.35)', color: '#fff', fontSize: '9px' }}>
        {formatLabels[template.format] || template.format}
      </div>
    </div>
  )
}

export default function TemplateCard({ template, onClick }) {
  return (
    <div className="bg-white border border-hairline rounded-xl overflow-hidden flex flex-col hover:shadow-md transition-shadow duration-200">
      {/* Preview */}
      <div className="p-3 bg-surfaceSoft">
        <PreviewArea template={template} />
      </div>
      {/* Info */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-body font-medium text-ink text-sm leading-snug">{template.name}</h3>
          {template.status === 'archived' && (
            <Badge variant="muted">Archived</Badge>
          )}
        </div>
        <div className="flex flex-wrap gap-1.5">
          <Badge variant="default">{formatLabels[template.format] || template.format}</Badge>
          <Badge variant={themeVariant[template.theme] || 'default'}>{template.theme}</Badge>
        </div>
        <div className="mt-auto pt-2">
          <Button
            variant="primary"
            size="sm"
            className="w-full"
            onClick={onClick}
          >
            Use Template
          </Button>
        </div>
      </div>
    </div>
  )
}
