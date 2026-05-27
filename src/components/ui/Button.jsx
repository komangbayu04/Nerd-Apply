import React from 'react'

const variantClasses = {
  primary: 'bg-primary text-white hover:bg-primaryActive disabled:bg-primaryDisabled disabled:text-muted',
  secondary: 'bg-surfaceCard text-ink border border-hairline hover:bg-surfaceCreamStrong disabled:opacity-50',
  ghost: 'bg-transparent text-muted hover:text-ink hover:bg-surfaceSoft disabled:opacity-50',
  danger: 'bg-error text-white hover:opacity-90 disabled:opacity-50',
}

const sizeClasses = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  children,
  className = '',
  type = 'button',
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={[
        'inline-flex items-center justify-center gap-2',
        'font-body font-medium rounded-md',
        'transition-colors duration-150',
        'cursor-pointer disabled:cursor-not-allowed',
        variantClasses[variant] || variantClasses.primary,
        sizeClasses[size] || sizeClasses.md,
        className,
      ].join(' ')}
    >
      {children}
    </button>
  )
}
