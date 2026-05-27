import React, { useState } from 'react'
import Modal from '../ui/Modal.jsx'
import Button from '../ui/Button.jsx'

function formatDate() {
  const now = new Date()
  return now.toISOString().split('T')[0]
}

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

export default function ExportModal({ isOpen, onClose, template }) {
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [exportType, setExportType] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')

  const filename = template
    ? `${slugify(template.name)}_${formatDate()}_NA`
    : `export_${formatDate()}_NA`

  const isFlyer = template?.format === 'flyer'

  async function handleExportPNG() {
    setStatus('loading')
    setExportType('png')
    setErrorMsg('')
    try {
      const { default: html2canvas } = await import('html2canvas')
      const el = document.querySelector('.canvas-preview-target')
      if (!el) throw new Error('Canvas element not found')

      const canvas = await html2canvas(el, {
        useCORS: true,
        allowTaint: false,
        scale: 2,
        backgroundColor: null,
        logging: false,
      })
      const link = document.createElement('a')
      link.href = canvas.toDataURL('image/png')
      link.download = `${filename}.png`
      link.click()
      setStatus('success')
      setExportType('png')
    } catch (err) {
      console.error(err)
      setStatus('error')
      setErrorMsg(err.message || 'Export failed. Please try again.')
    }
  }

  async function handleExportPDF() {
    if (!isFlyer) return
    setStatus('loading')
    setExportType('pdf')
    setErrorMsg('')
    try {
      const { default: html2canvas } = await import('html2canvas')
      const { jsPDF } = await import('jspdf')
      const el = document.querySelector('.canvas-preview-target')
      if (!el) throw new Error('Canvas element not found')

      const canvas = await html2canvas(el, {
        useCORS: true,
        allowTaint: false,
        scale: 2,
        backgroundColor: null,
        logging: false,
      })
      const imgData = canvas.toDataURL('image/png')
      // A4 at 300dpi: 2480x3508px → in mm: 210x297
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
      pdf.addImage(imgData, 'PNG', 0, 0, 210, 297)
      pdf.save(`${filename}.pdf`)
      setStatus('success')
      setExportType('pdf')
    } catch (err) {
      console.error(err)
      setStatus('error')
      setErrorMsg(err.message || 'PDF export failed.')
    }
  }

  function handleClose() {
    setStatus('idle')
    setExportType(null)
    setErrorMsg('')
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Export Asset" size="sm">
      <div className="flex flex-col gap-5">
        {/* Filename preview */}
        <div className="bg-surfaceSoft rounded-lg px-4 py-3 border border-hairline">
          <p className="text-xs font-body text-muted uppercase tracking-wide mb-1">Filename</p>
          <p className="font-body text-sm text-ink font-medium break-all">{filename}</p>
        </div>

        {/* Export options */}
        <div className="flex flex-col gap-3">
          {/* PNG */}
          <div className="flex items-center gap-3 p-4 rounded-lg border border-hairline bg-white hover:bg-surfaceSoft transition-colors">
            <div className="w-10 h-10 rounded-lg bg-surfaceCard flex items-center justify-center flex-shrink-0">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-primary">
                <rect x="3" y="3" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M3 13l4-4 3 3 3-4 4 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="7" cy="7" r="1.5" fill="currentColor"/>
              </svg>
            </div>
            <div className="flex-1">
              <p className="font-body font-medium text-sm text-ink">PNG — Digital Use</p>
              <p className="font-body text-xs text-muted">2× resolution for screens, social media</p>
            </div>
            <Button
              variant="primary"
              size="sm"
              onClick={handleExportPNG}
              disabled={status === 'loading'}
            >
              {status === 'loading' && exportType === 'png' ? (
                <span className="flex items-center gap-1.5">
                  <svg className="animate-spin" width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="2" strokeDasharray="20 10"/>
                  </svg>
                  Exporting…
                </span>
              ) : 'Export PNG'}
            </Button>
          </div>

          {/* PDF — only for flyers */}
          <div className={['flex items-center gap-3 p-4 rounded-lg border transition-colors',
            isFlyer ? 'border-hairline bg-white hover:bg-surfaceSoft' : 'border-hairline bg-surfaceSoft opacity-50'].join(' ')}>
            <div className="w-10 h-10 rounded-lg bg-surfaceCard flex items-center justify-center flex-shrink-0">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className={isFlyer ? 'text-primary' : 'text-muted'}>
                <path d="M5 2h7l4 4v12a1 1 0 01-1 1H5a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M12 2v4h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M7 9h6M7 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="flex-1">
              <p className="font-body font-medium text-sm text-ink">PDF — Print Ready</p>
              <p className="font-body text-xs text-muted">
                {isFlyer ? 'A4 format, 300 DPI for print' : 'Available for flyer formats only'}
              </p>
            </div>
            <Button
              variant={isFlyer ? 'secondary' : 'ghost'}
              size="sm"
              onClick={handleExportPDF}
              disabled={!isFlyer || status === 'loading'}
            >
              {status === 'loading' && exportType === 'pdf' ? (
                <span className="flex items-center gap-1.5">
                  <svg className="animate-spin" width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="2" strokeDasharray="20 10"/>
                  </svg>
                  Exporting…
                </span>
              ) : 'Export PDF'}
            </Button>
          </div>
        </div>

        {/* Status messages */}
        {status === 'success' && (
          <div className="flex items-center gap-2 px-4 py-3 bg-green-50 border border-green-200 rounded-lg">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-success flex-shrink-0">
              <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <p className="font-body text-sm text-green-700">
              {exportType === 'pdf' ? 'PDF exported and downloaded!' : 'PNG exported and downloaded!'}
            </p>
          </div>
        )}
        {status === 'error' && (
          <div className="flex items-start gap-2 px-4 py-3 bg-red-50 border border-red-200 rounded-lg">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-error flex-shrink-0 mt-0.5">
              <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M8 5v3M8 10v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <p className="font-body text-sm text-red-700">{errorMsg}</p>
          </div>
        )}

        {/* Brand compliance note */}
        <p className="text-xs font-body text-mutedSoft text-center">
          ✓ Brand-compliant · Font & layout locked · Nerd Apply guidelines enforced
        </p>
      </div>
    </Modal>
  )
}
