import React from 'react'
import { useNavigate } from 'react-router-dom'
import FilterBar from '../components/gallery/FilterBar.jsx'
import TemplateGrid from '../components/gallery/TemplateGrid.jsx'

export default function Gallery() {
  const navigate = useNavigate()

  function handleSelectTemplate(template) {
    navigate(`/editor/${template.id}`)
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#faf9f5' }}>
      {/* Header */}
      <header className="border-b border-hairline bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Logo mark */}
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#cc785c' }}>
              <span className="text-white text-xs font-body font-medium">NA</span>
            </div>
            <div>
              <p className="font-body font-medium text-ink text-sm">Nerd Apply</p>
              <p className="font-body text-xs text-muted" style={{ marginTop: '-1px' }}>Marketing Design System</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-body text-xs text-muted hidden sm:inline">Internal use only</span>
            <div className="w-2 h-2 rounded-full bg-success" />
          </div>
        </div>
      </header>

      {/* Hero */}
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-8">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full text-xs font-body font-medium bg-surfaceCard text-primary border border-hairline">
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            v1 · Template Library
          </div>
          <h1
            className="font-display text-ink mb-3"
            style={{ fontSize: '48px', fontWeight: 400, lineHeight: 1.05, letterSpacing: '-1.5px' }}
          >
            Marketing Design System
          </h1>
          <p className="font-body text-bodyText text-lg leading-relaxed">
            Create on-brand social posts, flyers, and more — in minutes, without a designer.
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar filters */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="sticky top-24">
              <FilterBar />
            </div>
          </aside>

          {/* Template grid */}
          <main className="flex-1 min-w-0">
            <TemplateGrid onSelectTemplate={handleSelectTemplate} />
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-hairline py-6">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-4">
          <p className="font-body text-xs text-mutedSoft">
            © 2026 Nerd Apply · Marketing assets are for internal team use only.
          </p>
          <div className="flex items-center gap-4">
            <span className="font-body text-xs text-mutedSoft">Brand guidelines enforced</span>
            <span className="font-body text-xs px-2 py-0.5 rounded-full bg-surfaceCard text-muted">v1.2</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
