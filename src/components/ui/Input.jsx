import React from 'react'

export default function Input({
  label,
  value = '',
  onChange,
  maxLength,
  multiline = false,
  placeholder = '',
  className = '',
  rows = 4,
}) {
  const count = value ? value.length : 0
  const isWarning = maxLength && count >= maxLength * 0.8 && count < maxLength
  const isError = maxLength && count >= maxLength

  const baseInputClasses = [
    'w-full rounded-md border px-3 py-2',
    'font-body text-sm text-ink bg-white',
    'placeholder:text-mutedSoft',
    'focus:outline-none focus:ring-2 transition-colors',
    isError
      ? 'border-error focus:ring-error/30'
      : isWarning
      ? 'border-warning focus:ring-warning/30'
      : 'border-hairline focus:ring-primary/30 focus:border-primary',
    className,
  ].join(' ')

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-xs font-medium font-body text-muted uppercase tracking-wide">
          {label}
        </label>
      )}
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
          rows={rows}
          className={baseInputClasses + ' resize-none'}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
          className={baseInputClasses}
        />
      )}
      {maxLength && (
        <div className="flex justify-end">
          <span
            className={[
              'text-xs font-body',
              isError ? 'text-error font-medium' : isWarning ? 'text-warning' : 'text-mutedSoft',
            ].join(' ')}
          >
            {count}/{maxLength}
          </span>
        </div>
      )}
    </div>
  )
}
