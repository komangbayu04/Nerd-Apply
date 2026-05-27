import React from 'react'

const variantClasses = {
  default: 'bg-surfaceCard text-ink',
  featured: 'bg-primary text-white uppercase tracking-widest text-xs',
  success: 'bg-green-100 text-green-700',
  muted: 'bg-surfaceSoft text-muted',
}

export default function Badge({ variant = 'default', children, className = '' }) {
  return (
    <span
      className={[
        'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium font-body',
        variantClasses[variant] || variantClasses.default,
        className,
      ].join(' ')}
    >
      {children}
    </span>
  )
}
