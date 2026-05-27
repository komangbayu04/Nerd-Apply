import React, { useState } from 'react'
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
        'relative flex flex-col items-center gap-1.5 p-2 rounded-lg border-2 transition-all group',
        isSelected ? 'border-primary bg-surfaceSoft' : 'border-hairline bg-white hover:border-surfaceCreamStrong hover:bg-surfaceSoft',
      ].join(' ')}
    >
      <div className={['relative overflow-hidden bg-surfaceCard flex items-center justify-center', shape === 'circle' ? 'rounded-full' : 'rounded-md'].join(' ')}
        style={{ width: 64, height: 64 }}>
        <img
          src={url}
          alt={label}
          className="w-full h-full object-cover"
          onError={(e) => { e.target.style.display = 'none' }}
        />
      </div>
      <div className="text-center">
        <p className="font-body text-xs font-medium text-ink leading-tight">{label}</p>
        {sublabel && <p className="font-body text-xs text-muted leading-tight">{sublabel}</p>}
      </div>
      {isSelected && (
        <div className="absolute top-1.5 right-1.5">
          <CheckIcon />
        </div>
      )}
    </button>
  )
}

export default function AssetPicker({ activeTheme = 'cream' }) {
  const [activeTab, setActiveTab] = useState(0)
  const { selectedHeadshot, setSelectedHeadshot, selectedLogo, setSelectedLogo, selectedBadge, setSelectedBadge } = useEditorStore()
  const isDark = activeTheme === 'dark'

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="font-body font-medium text-ink text-sm mb-0.5">Asset Library</h3>
        <p className="font-body text-xs text-muted">Select a headshot, logo, or badge to add to your template.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-surfaceSoft rounded-lg p-1">
        {tabs.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(i)}
            className={[
              'flex-1 py-1.5 px-2 rounded-md text-xs font-body font-medium transition-colors',
              activeTab === i ? 'bg-white text-ink shadow-sm' : 'text-muted hover:text-ink',
            ].join(' ')}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 0 && (
        <div>
          <p className="text-xs font-body text-mutedSoft mb-3">Team headshots — auto-crops to template slot shape.</p>
          <div className="grid grid-cols-3 gap-2">
            {/* None option */}
            <button
              onClick={() => setSelectedHeadshot(null)}
              className={['flex flex-col items-center gap-1.5 p-2 rounded-lg border-2 transition-all',
                !selectedHeadshot ? 'border-primary bg-surfaceSoft' : 'border-hairline hover:border-surfaceCreamStrong hover:bg-surfaceSoft'].join(' ')}
            >
              <div className="w-16 h-16 rounded-full bg-surfaceCard border border-hairline flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-muted">
                  <path d="M10 10a4 4 0 100-8 4 4 0 000 8zm0 2c-4 0-7 2-7 4h14c0-2-3-4-7-4z" fill="currentColor" opacity="0.4"/>
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
                isSelected={selectedHeadshot?.id === h.id}
                onClick={() => setSelectedHeadshot(selectedHeadshot?.id === h.id ? null : h)}
                shape="circle"
              />
            ))}
          </div>
        </div>
      )}

      {activeTab === 1 && (
        <div className="flex flex-col gap-5">
          <div>
            <p className="text-xs font-body font-medium text-muted uppercase tracking-wide mb-2">Partner Logos</p>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setSelectedLogo(null)}
                className={['flex flex-col items-center gap-1.5 p-2 rounded-lg border-2 transition-all',
                  !selectedLogo ? 'border-primary bg-surfaceSoft' : 'border-hairline hover:border-surfaceCreamStrong hover:bg-surfaceSoft'].join(' ')}
              >
                <div className="w-16 h-16 rounded-md bg-surfaceCard flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-muted">
                    <rect x="3" y="6" width="14" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2"/>
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
          <div>
            <p className="text-xs font-body font-medium text-muted uppercase tracking-wide mb-2">Badges</p>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setSelectedBadge(null)}
                className={['flex flex-col items-center gap-1.5 p-2 rounded-lg border-2 transition-all',
                  !selectedBadge ? 'border-primary bg-surfaceSoft' : 'border-hairline hover:border-surfaceCreamStrong hover:bg-surfaceSoft'].join(' ')}
              >
                <div className="w-16 h-16 rounded-md bg-surfaceCard flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-muted">
                    <path d="M10 3l2 5h5l-4 3 1.5 5L10 13 5.5 16 7 11 3 8h5l2-5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
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

      {activeTab === 2 && (
        <div>
          <p className="text-xs font-body text-mutedSoft mb-3">Brand assets — wordmarks, icons, and decorative patterns.</p>
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
                <span className="text-xs font-body text-mutedSoft capitalize">{asset.type}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
