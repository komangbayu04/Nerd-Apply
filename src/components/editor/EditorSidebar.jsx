import React, { useState } from 'react'
import TextEditor from './TextEditor.jsx'
import AssetPicker from './AssetPicker.jsx'
import ThemeSwitcher from './ThemeSwitcher.jsx'
import useEditorStore from '../../store/editorStore.js'

const tabs = [
  { key: 'text', label: 'Text', icon: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2 3h10M7 3v8M4 11h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )},
  { key: 'assets', label: 'Assets', icon: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="1" y="1" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="8" y="1" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="1" y="8" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="8" y="8" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  )},
  { key: 'theme', label: 'Theme', icon: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M7 2a5 5 0 010 10V2z" fill="currentColor" opacity="0.3"/>
    </svg>
  )},
]

export default function EditorSidebar({ template }) {
  const [activeTab, setActiveTab] = useState('text')
  const { activeTheme } = useEditorStore()

  return (
    <div className="flex flex-col h-full bg-white border-l border-hairline">
      {/* Tab bar */}
      <div className="flex border-b border-hairline px-1 pt-1 gap-1">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={[
              'flex items-center gap-1.5 px-3 py-2.5 text-xs font-body font-medium rounded-t-md transition-colors',
              activeTab === tab.key
                ? 'text-ink border-b-2 border-primary bg-surfaceSoft'
                : 'text-muted hover:text-ink hover:bg-surfaceSoft',
            ].join(' ')}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'text' && <TextEditor template={template} />}
        {activeTab === 'assets' && <AssetPicker activeTheme={activeTheme} />}
        {activeTab === 'theme' && (
          <ThemeSwitcher allowedThemes={template?.themes || ['cream', 'dark', 'coral']} />
        )}
      </div>
    </div>
  )
}
