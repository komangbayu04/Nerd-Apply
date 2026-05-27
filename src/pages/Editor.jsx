import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { templates } from '../templates/index.js'
import CanvasPreview from '../components/editor/CanvasPreview.jsx'
import EditorSidebar from '../components/editor/EditorSidebar.jsx'
import ExportModal from '../components/export/ExportModal.jsx'
import useEditorStore from '../store/editorStore.js'

const formatDimLabel = {
  square: '1080 × 1080px',
  portrait: '1080 × 1350px',
  story: '1080 × 1920px',
  flyer: '2480 × 3508px',
}

export default function Editor() {
  const { templateId } = useParams()
  const navigate = useNavigate()
  const { resetEditor, setSelectedTemplate } = useEditorStore()
  const [exportOpen, setExportOpen] = useState(false)
  const [previewWidth, setPreviewWidth] = useState(480)

  const template = templates.find((t) => t.id === templateId)

  useEffect(() => {
    if (!template) {
      navigate('/gallery')
      return
    }
    resetEditor()
    setSelectedTemplate(template)
  }, [templateId])

  useEffect(() => {
    function handleResize() {
      const el = document.getElementById('canvas-container')
      if (el) {
        const w = el.clientWidth
        setPreviewWidth(Math.min(w - 48, 520))
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (!template) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-canvas">
        <div className="text-center">
          <p className="font-body text-muted">Template not found.</p>
          <Link to="/gallery" className="text-primary text-sm font-body mt-2 inline-block">← Back to Gallery</Link>
        </div>
      </div>
    )
  }

  const isFlyer = template.format === 'flyer'

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#faf9f5' }}>
      {/* Top nav */}
      <header className="bg-white border-b border-hairline flex-shrink-0 sticky top-0 z-20">
        <div className="flex items-center justify-between px-6 py-3 gap-4">
          {/* Left */}
          <div className="flex items-center gap-3 min-w-0">
            <Link
              to="/gallery"
              className="flex items-center gap-1.5 text-muted hover:text-ink text-sm font-body font-medium transition-colors flex-shrink-0"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Templates
            </Link>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-hairline flex-shrink-0">
              <path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <div className="min-w-0">
              <p className="font-body font-medium text-ink text-sm truncate">{template.name}</p>
            </div>
          </div>

          {/* Center info */}
          <div className="hidden md:flex items-center gap-3">
            <span className="font-body text-xs text-muted px-2 py-1 rounded-md bg-surfaceSoft capitalize">
              {template.format}
            </span>
            <span className="font-body text-xs text-mutedSoft">
              {formatDimLabel[template.format] || ''}
            </span>
          </div>

          {/* Right: Export buttons */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => setExportOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-body font-medium transition-colors bg-primary text-white hover:bg-primaryActive"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 2v7M4 7l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 11h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              Export
            </button>
          </div>
        </div>
      </header>

      {/* Body: Canvas + Sidebar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Canvas area */}
        <div
          id="canvas-container"
          className="flex-1 flex flex-col items-center justify-start overflow-auto p-6 gap-6"
          style={{ backgroundColor: '#f0ede8', minWidth: 0 }}
        >
          {/* Format info bar */}
          <div className="w-full flex items-center justify-between max-w-2xl">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success" />
              <span className="font-body text-xs text-muted">Live Preview</span>
            </div>
            <span className="font-body text-xs text-mutedSoft">{formatDimLabel[template.format] || ''}</span>
          </div>

          {/* Canvas preview — centered, respects aspect ratio */}
          <div className="flex items-start justify-center">
            <div className="shadow-2xl ring-1 ring-black/10">
              <CanvasPreview template={template} maxWidth={previewWidth} />
            </div>
          </div>

          {/* Export quick action */}
          <div className="max-w-2xl w-full">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-white border border-hairline">
              <div className="flex-1">
                <p className="font-body font-medium text-ink text-sm">Ready to export?</p>
                <p className="font-body text-xs text-muted">Edit text, pick assets, and choose a theme, then export as PNG or PDF.</p>
              </div>
              <button
                onClick={() => setExportOpen(true)}
                className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-body font-medium bg-primary text-white hover:bg-primaryActive transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 2v7M4 7l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 11h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                Export Asset
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div
          className="w-80 flex-shrink-0 overflow-y-auto flex flex-col"
          style={{ borderLeft: '1px solid #e6dfd8', backgroundColor: '#ffffff' }}
        >
          <EditorSidebar template={template} />
        </div>
      </div>

      {/* Export Modal */}
      <ExportModal
        isOpen={exportOpen}
        onClose={() => setExportOpen(false)}
        template={template}
      />
    </div>
  )
}
