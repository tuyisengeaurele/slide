import clsx from 'clsx';
import { useState } from 'react';
import type { ComponentProps } from 'react';

export interface BadgeProps extends ComponentProps<'span'> {
  tone?: 'neutral' | 'orange' | 'ok' | 'warn';
}

export function Badge({ tone = 'neutral', className, ...rest }: BadgeProps) {
  return <span className={clsx('sl-badge', `sl-badge-${tone}`, className)} {...rest} />;
}

export interface AvatarProps {
  name: string;
  src?: string;
  size?: 'sm' | 'md' | 'lg';
  status?: 'online' | 'busy' | 'away';
}

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const first = parts[0]?.[0] ?? '';
  const last = parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? '') : '';
  return (first + last).toUpperCase();
}

export function Avatar({ name, src, size = 'md', status }: AvatarProps) {
  // a broken image falls back to initials instead of showing the browser's broken icon
  const [failed, setFailed] = useState(false);
  const showImage = src && !failed;

  return (
    <span className={clsx('sl-avatar', `sl-avatar-${size}`)} role="img" aria-label={name.trim()}>
      {showImage ? (
        <img src={src} alt="" onError={() => setFailed(true)} />
      ) : (
        <span aria-hidden="true">{initials(name)}</span>
      )}
      {status && <i className={clsx('sl-avatar-dot', `sl-avatar-${status}`)} aria-hidden="true" />}
    </span>
  );
}

export function Skeleton({ className, ...rest }: ComponentProps<'div'>) {
  return <div className={clsx('sl-skeleton', className)} aria-hidden="true" {...rest} />;
}

export interface TableProps extends ComponentProps<'table'> {
  /** what the table shows, read out when the scroll region gets focus */
  label: string;
}

export function Table({ label, className, ...rest }: TableProps) {
  return (
    <div className="sl-table-wrap" role="region" tabIndex={0} aria-label={label}>
      <table className={clsx('sl-table', className)} {...rest} />
    </div>
  );
}
