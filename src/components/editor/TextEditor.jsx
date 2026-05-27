import React from 'react'
import Input from '../ui/Input.jsx'
import useEditorStore from '../../store/editorStore.js'

// All possible fields with their metadata
const ALL_FIELDS = {
  headline:    { label: 'Headline',                    maxLength: 60,  multiline: false, placeholder: 'e.g. Welcome to the team!' },
  personName:  { label: 'Person Name',                 maxLength: 60,  multiline: false, placeholder: 'e.g. Erwin' },
  personRole:  { label: 'Person Role / Title',         maxLength: 80,  multiline: false, placeholder: 'e.g. Director of Impact' },
  subheadline: { label: 'Subheadline',                 maxLength: 120, multiline: false, placeholder: 'Supporting message or tagline…' },
  body:        { label: 'Body Copy',                   maxLength: 280, multiline: true,  rows: 4, placeholder: 'Add more context, event details, or description…' },
  cta:         { label: 'CTA Button Label',            maxLength: 30,  multiline: false, placeholder: 'Learn More' },
  date:        { label: 'Date / Event Line (optional)',maxLength: 60,  multiline: false, placeholder: 'e.g. June 15, 2026 · 10:00 AM PST' },
}

// Fields shown per template (derived from which text layers the template has)
function getTemplateFields(template) {
  if (!template) return Object.keys(ALL_FIELDS)
  const used = new Set()
  for (const layer of template.layers) {
    if (layer.type === 'text' && layer.field) used.add(layer.field)
  }
  // Preserve canonical order from ALL_FIELDS
  return Object.keys(ALL_FIELDS).filter((k) => used.has(k))
}

export default function TextEditor({ template }) {
  const { textFields, setTextField } = useEditorStore()
  const fieldKeys = getTemplateFields(template)

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h3 className="font-body font-medium text-ink text-sm mb-0.5">Edit Text</h3>
        <p className="font-body text-xs text-muted">
          Font style and layout are locked to brand guidelines. Only content is editable.
        </p>
      </div>

      {fieldKeys.map((key) => {
        const f = ALL_FIELDS[key]
        return (
          <Input
            key={key}
            label={f.label}
            value={textFields[key] || ''}
            onChange={(val) => setTextField(key, val)}
            maxLength={f.maxLength}
            multiline={f.multiline || false}
            rows={f.rows}
            placeholder={f.placeholder}
          />
        )
      })}

      {fieldKeys.length === 0 && (
        <p className="font-body text-xs text-mutedSoft">This template has no editable text fields.</p>
      )}
    </div>
  )
}
