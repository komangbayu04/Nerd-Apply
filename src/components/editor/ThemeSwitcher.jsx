import React from 'react'
import { tokens } from '../../assets/tokens.js'
import useEditorStore from '../../store/editorStore.js'

const themeKeys = ['cream', 'dark', 'coral']

export default function ThemeSwitcher({ allowedThemes }) {
  const { activeTheme, setActiveTheme } = useEditorStore()
  const available = allowedThemes || themeKeys

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="font-body font-medium text-ink text-sm mb-0.5">Color Theme</h3>
        <p className="font-body text-xs text-muted">All color tokens update instantly across the template.</p>
      </div>
      <div className="flex flex-col gap-3">
        {themeKeys.filter((k) => available.includes(k)).map((key) => {
          const t = tokens.themes[key]
          const isActive = activeTheme === key
          return (
            <button
              key={key}
              onClick={() => setActiveTheme(key)}
              className={[
                'flex items-center gap-3 p-3 rounded-lg border-2 transition-all text-left',
                isActive
                  ? 'border-primary bg-surfaceSoft'
                  : 'border-hairline bg-white hover:border-surfaceCreamStrong hover:bg-surfaceSoft',
              ].join(' ')}
            >
              {/* Swatch */}
              <div className="flex gap-1 flex-shrink-0">
                <div className="w-6 h-6 rounded-full border border-hairline" style={{ backgroundColor: t.surface }} />
                <div className="w-6 h-6 rounded-full border border-hairline" style={{ backgroundColor: t.ctaBg }} />
              </div>
              {/* Label */}
              <div className="flex-1">
                <p className="font-body font-medium text-sm text-ink">{t.name}</p>
                <p className="font-body text-xs text-muted">{t.surface} · {t.ctaBg}</p>
              </div>
              {/* Active check */}
              {isActive && (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 text-primary">
                  <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
