import React from 'react'
import TemplateCard from './TemplateCard.jsx'
import { templates } from '../../templates/index.js'
import useGalleryStore from '../../store/galleryStore.js'

export default function TemplateGrid({ onSelectTemplate }) {
  const { filterFormat, filterTheme, searchQuery } = useGalleryStore()

  const filtered = templates.filter((t) => {
    if (t.status === 'archived') return false
    if (filterFormat !== 'all' && t.format !== filterFormat) return false
    if (filterTheme !== 'all' && t.theme !== filterTheme) return false
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      if (!t.name.toLowerCase().includes(q) && !t.theme.toLowerCase().includes(q) && !t.format.toLowerCase().includes(q)) {
        return false
      }
    }
    return true
  })

  if (filtered.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <div className="w-16 h-16 rounded-full bg-surfaceCard flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-muted">
            <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
            <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
            <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
            <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
        </div>
        <div className="text-center">
          <p className="font-body font-medium text-ink text-sm">No templates found</p>
          <p className="font-body text-muted text-xs mt-1">Try adjusting your filters or search query.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {filtered.map((template) => (
        <TemplateCard
          key={template.id}
          template={template}
          onClick={() => onSelectTemplate && onSelectTemplate(template)}
        />
      ))}
    </div>
  )
}
