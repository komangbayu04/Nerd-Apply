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
  const themeKey = template.themes[0] || 'cream'
  const themeColors = tokens.themes[themeKey]
  const { width, height } = template.dimensions
  const aspectRatio = width / height

  // Determine preview background
  let bgColor = themeColors.surface
  // Check if template has primary rect at top (flyer-partner-01)
  const topRect = template.layers.find(
    (l) => l.type === 'rect' && l.y === 0 && l.colorToken === 'primary'
  )
  const hasHeadshot = template.layers.some((l) => l.type === 'image' && l.slot === 'headshot')
  const hasLogo = template.layers.some((l) => l.type === 'image' && l.slot === 'logo')

  return (
    <div
      className="w-full rounded-lg overflow-hidden relative flex items-end"
      style={{
        aspectRatio: `${aspectRatio}`,
        background: bgColor,
        maxHeight: '220px',
      }}
    >
      {/* Top accent bar */}
      {topRect && (
        <div
          className="absolute top-0 left-0 right-0"
          style={{ height: '18%', backgroundColor: tokens.colors.primary }}
        />
      )}
      {/* Simulated content lines */}
      <div className="absolute inset-0 p-4 flex flex-col justify-center gap-2">
        {/* Headline bar */}
        <div
          className="rounded"
          style={{
            height: '8px',
            width: '75%',
            backgroundColor: themeColors.headline,
            opacity: 0.7,
          }}
        />
        <div
          className="rounded"
          style={{
            height: '8px',
            width: '55%',
            backgroundColor: themeColors.headline,
            opacity: 0.7,
          }}
        />
        {/* Subheadline */}
        <div
          className="rounded mt-1"
          style={{
            height: '5px',
            width: '60%',
            backgroundColor: themeColors.body,
            opacity: 0.4,
          }}
        />
        <div
          className="rounded"
          style={{
            height: '5px',
            width: '45%',
            backgroundColor: themeColors.body,
            opacity: 0.4,
          }}
        />
      </div>
      {/* Headshot placeholder */}
      {hasHeadshot && (
        <div
          className="absolute rounded-full border-2"
          style={{
            width: '28%',
            height: aspectRatio > 1 ? '38%' : '22%',
            right: '8%',
            top: '8%',
            backgroundColor: tokens.colors.surfaceCard,
            borderColor: tokens.colors.hairline,
          }}
        />
      )}
      {/* Logo placeholder */}
      {hasLogo && !topRect && (
        <div
          className="absolute rounded"
          style={{
            width: '30%',
            height: '12%',
            left: '7%',
            top: '7%',
            backgroundColor: tokens.colors.surfaceCreamStrong,
          }}
        />
      )}
      {/* Format label overlay */}
      <div
        className="absolute bottom-2 right-2 text-xs font-body font-medium px-2 py-0.5 rounded"
        style={{
          backgroundColor: 'rgba(0,0,0,0.35)',
          color: '#ffffff',
          fontSize: '10px',
        }}
      >
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
