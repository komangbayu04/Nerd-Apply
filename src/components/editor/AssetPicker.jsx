import React, { useState, useRef } from 'react'
import { removeBackground } from '@imgly/background-removal'
import { assetLibrary } from '../../assets/assetLibrary.js'
import useEditorStore from '../../store/editorStore.js'

const tabs = ['Headshots', 'Logos & Badges', 'Brand Assets']

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="6" fill="#cc785c"/>
      <path d="M4.5 7l2 2 3-3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function AssetItem({ url, label, sublabel, isSelected, onClick, shape = 'rect' }) {
  return (
    <button
      onClick={onClick}
      className={[
        'relative flex flex-col items-center gap-1.5 p-2 rounded-lg border-2 transition-all text-left',
        isSelected
          ? 'border-primary bg-surfaceSoft'
          : 'border-hairline bg-white hover:border-surfaceCreamStrong hover:bg-surfaceSoft',
      ].join(' ')}
    >
      <div
        className={['overflow-hidden bg-surfaceCard flex items-center justify-center',
          shape === 'circle' ? 'rounded-full' : 'rounded-md'].join(' ')}
        style={{ width: 64, height: 64 }}
      >
        <img
          src={url}
          alt={label}
          className="w-full h-full object-cover"
          onError={(e) => { e.target.style.display = 'none' }}
        />
      </div>
      <div className="text-center w-full">
        <p className="font-body text-xs font-medium text-ink leading-tight truncate">{label}</p>
        {sublabel && <p className="font-body text-[10px] text-muted leading-tight truncate">{sublabel}</p>}
      </div>
      {isSelected && (
        <div className="absolute top-1.5 right-1.5"><CheckIcon /></div>
      )}
    </button>
  )
}

// ── AI Photo Upload Zone ────────────────────────────────────────────────────────
// Automatically removes background from uploaded photo using @imgly/background-removal
// (runs fully client-side via WebAssembly/ONNX — no API key or server needed)
function PhotoUpload({ customHeadshotUrl, onUpload, onClear }) {
  const inputRef = useRef(null)
  const [dragging, setDragging] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [progress, setProgress] = useState({ step: '', pct: 0 })

  async function handleFile(file) {
    if (!file || !file.type.startsWith('image/')) return

    setProcessing(true)
    setProgress({ step: 'Loading AI model…', pct: 0 })

    try {
      const blob = await removeBackground(file, {
        model: 'small',         // ~30 MB model, cached after first download
        output: { format: 'image/png', quality: 0.9 },
        progress: (key, current, total) => {
          const pct = total > 0 ? Math.round((current / total) * 100) : 0
          if (key.startsWith('fetch')) {
            setProgress({ step: `Downloading AI model ${pct}%`, pct })
          } else {
            setProgress({ step: `Removing background ${pct}%`, pct })
          }
        },
      })
      const url = URL.createObjectURL(blob)
      onUpload(url)
    } catch (err) {
      console.warn('Background removal failed — using original photo:', err)
      // Graceful fallback: use photo as-is
      onUpload(URL.createObjectURL(file))
    } finally {
      setProcessing(false)
      setProgress({ step: '', pct: 0 })
    }
  }

  function handleDrop(e) {
    e.preventDefault(); setDragging(false)
    handleFile(e.dataTransfer.files[0])
  }

  // ── Processing overlay ────────────────────────────────────────────
  if (processing) {
    return (
      <div className="rounded-xl border-2 border-primary bg-surfaceSoft p-5 flex flex-col items-center gap-3">
        {/* Animated spinner */}
        <svg className="animate-spin" width="28" height="28" viewBox="0 0 28 28" fill="none">
          <circle cx="14" cy="14" r="11" stroke="#e6dfd8" strokeWidth="3"/>
          <path d="M14 3a11 11 0 0 1 11 11" stroke="#cc785c" strokeWidth="3" strokeLinecap="round"/>
        </svg>
        <div className="text-center">
          <p className="font-body text-sm font-medium text-ink">{progress.step || 'Processing…'}</p>
          <p className="font-body text-xs text-muted mt-0.5">First-time download ~30 MB · cached after</p>
        </div>
        {/* Progress bar */}
        {progress.pct > 0 && (
          <div className="w-full h-1.5 rounded-full bg-hairline overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-all duration-300"
              style={{ width: `${progress.pct}%` }}
            />
          </div>
        )}
      </div>
    )
  }

  // ── Preview of processed photo ─────────────────────────────────────
  if (customHeadshotUrl) {
    return (
      <div className="rounded-xl border-2 border-primary overflow-hidden">
        {/* Checkerboard bg so transparency is visible */}
        <div
          className="relative w-full h-44"
          style={{
            backgroundImage: 'repeating-conic-gradient(#e8e0d2 0% 25%, #faf9f5 0% 50%)',
            backgroundSize: '16px 16px',
          }}
        >
          <img
            src={customHeadshotUrl}
            alt="Processed"
            className="w-full h-full object-contain object-top"
          />
          {/* Success badge */}
          <div className="absolute top-2 left-2 flex items-center gap-1.5 bg-white/90 rounded-full px-2.5 py-1 shadow-sm">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <circle cx="6" cy="6" r="5" fill="#5db872"/>
              <path d="M3.5 6l2 2 3-3" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="font-body text-xs font-medium text-ink">Background removed</span>
          </div>
        </div>
        <div className="p-2 flex justify-between items-center bg-surfaceSoft">
          <p className="font-body text-xs text-muted">Transparent PNG ready</p>
          <button
            onClick={onClear}
            className="text-xs font-body font-medium text-error hover:underline"
          >
            Remove photo
          </button>
        </div>
      </div>
    )
  }

  // ── Upload drop zone ───────────────────────────────────────────────
  return (
    <div>
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={[
          'flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed cursor-pointer transition-all py-7',
          dragging ? 'border-primary bg-surfaceSoft scale-[0.99]' : 'border-hairline hover:border-primary hover:bg-surfaceSoft',
        ].join(' ')}
      >
        <div className="w-12 h-12 rounded-full bg-surfaceCard flex items-center justify-center">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M11 3v12M6 8l5-5 5 5" stroke="#cc785c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3 18h16" stroke="#cc785c" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
        <div className="text-center px-2">
          <p className="font-body text-sm font-medium text-ink">Upload photo</p>
          <p className="font-body text-xs text-muted mt-0.5">
            AI auto-removes background · JPG, PNG, WEBP
          </p>
        </div>
        {/* AI badge */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <circle cx="5" cy="5" r="4" fill="#cc785c" opacity="0.8"/>
            <path d="M3 5h4M5 3v4" stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
          <span className="font-body text-xs font-medium text-primary">AI Background Removal</span>
        </div>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files[0])}
      />
    </div>
  )
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function AssetPicker({ activeTheme = 'cream' }) {
  const [activeTab, setActiveTab] = useState(0)
  const {
    selectedHeadshot, setSelectedHeadshot,
    customHeadshotUrl, setCustomHeadshotUrl,
    selectedLogo, setSelectedLogo,
    selectedBadge, setSelectedBadge,
  } = useEditorStore()
  const isDark = activeTheme === 'dark'

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="font-body font-medium text-ink text-sm mb-0.5">Asset Library</h3>
        <p className="font-body text-xs text-muted">Select a headshot, logo, or badge to add to your template.</p>
      </div>

      {/* Tab Bar */}
      <div className="flex gap-1 bg-surfaceSoft rounded-lg p-1">
        {tabs.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(i)}
            className={[
              'flex-1 py-1.5 px-1 rounded-md text-xs font-body font-medium transition-colors',
              activeTab === i ? 'bg-white text-ink shadow-sm' : 'text-muted hover:text-ink',
            ].join(' ')}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ── Headshots Tab ── */}
      {activeTab === 0 && (
        <div className="flex flex-col gap-4">
          {/* Upload section */}
          <PhotoUpload
            customHeadshotUrl={customHeadshotUrl}
            onUpload={(url) => {
              setCustomHeadshotUrl(url)
              setSelectedHeadshot(null) // clear library selection
            }}
            onClear={() => setCustomHeadshotUrl(null)}
          />

          {/* Divider */}
          <div className="flex items-center gap-2">
            <div className="flex-1 h-px bg-hairline" />
            <span className="font-body text-xs text-mutedSoft">or choose from library</span>
            <div className="flex-1 h-px bg-hairline" />
          </div>

          {/* Library grid */}
          <div className="grid grid-cols-3 gap-2">
            {/* None */}
            <button
              onClick={() => { setSelectedHeadshot(null); setCustomHeadshotUrl(null) }}
              className={['flex flex-col items-center gap-1.5 p-2 rounded-lg border-2 transition-all',
                !selectedHeadshot && !customHeadshotUrl
                  ? 'border-primary bg-surfaceSoft'
                  : 'border-hairline hover:border-surfaceCreamStrong hover:bg-surfaceSoft',
              ].join(' ')}
            >
              <div className="w-16 h-16 rounded-full bg-surfaceCard border border-hairline flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 10a4 4 0 100-8 4 4 0 000 8zm0 2c-4 0-7 2-7 4h14c0-2-3-4-7-4z" fill="#8e8b82" opacity="0.4"/>
                </svg>
              </div>
              <p className="font-body text-xs text-muted">None</p>
            </button>

            {assetLibrary.headshots.map((h) => (
              <AssetItem
                key={h.id}
                url={h.squareUrl}
                label={h.name}
                sublabel={h.role}
                isSelected={!customHeadshotUrl && selectedHeadshot?.id === h.id}
                onClick={() => {
                  setCustomHeadshotUrl(null)
                  setSelectedHeadshot(selectedHeadshot?.id === h.id ? null : h)
                }}
                shape="circle"
              />
            ))}
          </div>
        </div>
      )}

      {/* ── Logos & Badges Tab ── */}
      {activeTab === 1 && (
        <div className="flex flex-col gap-5">
          {/* Partner Logos */}
          <div>
            <p className="text-xs font-body font-medium text-muted uppercase tracking-wide mb-2">Partner Logos</p>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setSelectedLogo(null)}
                className={['flex flex-col items-center gap-1.5 p-2 rounded-lg border-2 transition-all',
                  !selectedLogo ? 'border-primary bg-surfaceSoft' : 'border-hairline hover:border-surfaceCreamStrong hover:bg-surfaceSoft'].join(' ')}
              >
                <div className="w-16 h-16 rounded-md bg-surfaceCard flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <rect x="3" y="6" width="14" height="8" rx="1" stroke="#8e8b82" strokeWidth="1.5" strokeDasharray="3 2"/>
                  </svg>
                </div>
                <p className="font-body text-xs text-muted">None</p>
              </button>
              {assetLibrary.logos.map((logo) => (
                <AssetItem
                  key={logo.id}
                  url={isDark ? logo.darkUrl : logo.lightUrl}
                  label={logo.name}
                  isSelected={selectedLogo?.id === logo.id}
                  onClick={() => setSelectedLogo(selectedLogo?.id === logo.id ? null : logo)}
                  shape="rect"
                />
              ))}
            </div>
          </div>

          {/* Badges */}
          <div>
            <p className="text-xs font-body font-medium text-muted uppercase tracking-wide mb-2">Badges</p>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setSelectedBadge(null)}
                className={['flex flex-col items-center gap-1.5 p-2 rounded-lg border-2 transition-all',
                  !selectedBadge ? 'border-primary bg-surfaceSoft' : 'border-hairline hover:border-surfaceCreamStrong hover:bg-surfaceSoft'].join(' ')}
              >
                <div className="w-16 h-16 rounded-md bg-surfaceCard flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 3l2 5h5l-4 3 1.5 5L10 13 5.5 16 7 11 3 8h5l2-5z" stroke="#8e8b82" strokeWidth="1.5" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p className="font-body text-xs text-muted">None</p>
              </button>
              {assetLibrary.badges.map((badge) => (
                <AssetItem
                  key={badge.id}
                  url={badge.url}
                  label={badge.name}
                  isSelected={selectedBadge?.id === badge.id}
                  onClick={() => setSelectedBadge(selectedBadge?.id === badge.id ? null : badge)}
                  shape="rect"
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Brand Assets Tab ── */}
      {activeTab === 2 && (
        <div>
          <p className="text-xs font-body text-mutedSoft mb-3">
            Wordmarks, icons, and decorative patterns — auto-placed in locked brand zones.
          </p>
          <div className="grid grid-cols-3 gap-2">
            {assetLibrary.brandAssets.map((asset) => (
              <div
                key={asset.id}
                className="flex flex-col items-center gap-1.5 p-2 rounded-lg border border-hairline bg-surfaceSoft"
              >
                <div className="w-16 h-16 rounded-md bg-white flex items-center justify-center overflow-hidden">
                  <img src={asset.url} alt={asset.name} className="w-full h-full object-contain"/>
                </div>
                <p className="font-body text-xs text-muted text-center leading-tight">{asset.name}</p>
                <span className="text-[10px] font-body text-mutedSoft capitalize">{asset.type}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
