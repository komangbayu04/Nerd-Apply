import React from 'react'
import useGalleryStore from '../../store/galleryStore.js'

const formatOptions = [
  { value: 'all', label: 'All Formats' },
  { value: 'square', label: 'Square' },
  { value: 'portrait', label: 'Portrait' },
  { value: 'story', label: 'Story' },
  { value: 'flyer', label: 'Flyer' },
]

const themeOptions = [
  { value: 'all', label: 'All Themes' },
  { value: 'Announcement', label: 'Announcement' },
  { value: 'Event', label: 'Event' },
  { value: 'Partner', label: 'Partner' },
  { value: 'Team Spotlight', label: 'Team Spotlight' },
]

function FilterPill({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={[
        'px-3 py-1.5 rounded-full text-xs font-medium font-body transition-colors whitespace-nowrap',
        active
          ? 'bg-ink text-canvas'
          : 'bg-surfaceCard text-muted hover:bg-surfaceCreamStrong hover:text-ink',
      ].join(' ')}
    >
      {children}
    </button>
  )
}

export default function FilterBar() {
  const { filterFormat, setFilterFormat, filterTheme, setFilterTheme, searchQuery, setSearchQuery } = useGalleryStore()

  return (
    <div className="flex flex-col gap-4">
      {/* Search */}
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 text-mutedSoft"
          width="16" height="16" viewBox="0 0 16 16" fill="none"
        >
          <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M10 10l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        <input
          type="text"
          placeholder="Search templates…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2 rounded-lg border border-hairline bg-white text-sm font-body text-ink placeholder:text-mutedSoft focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
        />
      </div>

      {/* Format filters */}
      <div>
        <p className="text-xs font-medium font-body text-mutedSoft uppercase tracking-wide mb-2">Format</p>
        <div className="flex flex-wrap gap-2">
          {formatOptions.map((opt) => (
            <FilterPill
              key={opt.value}
              active={filterFormat === opt.value}
              onClick={() => setFilterFormat(opt.value)}
            >
              {opt.label}
            </FilterPill>
          ))}
        </div>
      </div>

      {/* Theme filters */}
      <div>
        <p className="text-xs font-medium font-body text-mutedSoft uppercase tracking-wide mb-2">Content Type</p>
        <div className="flex flex-wrap gap-2">
          {themeOptions.map((opt) => (
            <FilterPill
              key={opt.value}
              active={filterTheme === opt.value}
              onClick={() => setFilterTheme(opt.value)}
            >
              {opt.label}
            </FilterPill>
          ))}
        </div>
      </div>
    </div>
  )
}
