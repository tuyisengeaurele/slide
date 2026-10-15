import clsx from 'clsx';
import type { ComponentProps } from 'react';

export interface ButtonProps extends ComponentProps<'button'> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  /** shows a spinner and blocks clicks, but keeps the button's width so nothing jumps */
  loading?: boolean;
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  className,
  children,
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={clsx('sl-btn', `sl-btn-${variant}`, `sl-btn-${size}`, className)}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      data-loading={loading || undefined}
      {...rest}
    >
      <span className="sl-btn-label">{children}</span>
      {loading && <span className="sl-spinner" aria-hidden="true" />}
    </button>
  );
}
