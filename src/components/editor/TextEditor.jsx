import React from 'react'
import Input from '../ui/Input.jsx'
import useEditorStore from '../../store/editorStore.js'

const fields = [
  { key: 'headline', label: 'Headline', maxLength: 60, multiline: false, placeholder: 'Enter a bold headline…' },
  { key: 'subheadline', label: 'Subheadline', maxLength: 120, multiline: false, placeholder: 'Supporting message or tagline…' },
  { key: 'body', label: 'Body Copy', maxLength: 280, multiline: true, rows: 4, placeholder: 'Add more context, event details, or description…' },
  { key: 'cta', label: 'CTA Button Label', maxLength: 30, multiline: false, placeholder: 'Learn More' },
  { key: 'date', label: 'Date / Event Line (optional)', maxLength: 60, multiline: false, placeholder: 'e.g. June 15, 2026 · 10:00 AM PST' },
]

export default function TextEditor() {
  const { textFields, setTextField } = useEditorStore()

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h3 className="font-body font-medium text-ink text-sm mb-0.5">Edit Text</h3>
        <p className="font-body text-xs text-muted">Font style and layout are locked to brand guidelines.</p>
      </div>
      {fields.map((f) => (
        <Input
          key={f.key}
          label={f.label}
          value={textFields[f.key] || ''}
          onChange={(val) => setTextField(f.key, val)}
          maxLength={f.maxLength}
          multiline={f.multiline || false}
          rows={f.rows}
          placeholder={f.placeholder}
        />
      ))}
    </div>
  )
}
