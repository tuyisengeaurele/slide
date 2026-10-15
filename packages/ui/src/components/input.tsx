import clsx from 'clsx';
import { useId } from 'react';
import type { ComponentProps, ReactNode } from 'react';

export interface FieldProps {
  label: string;
  hint?: string;
  error?: string;
  children: (ids: { id: string; describedBy: string | undefined; invalid: boolean }) => ReactNode;
}

/** Label, hint and error text wired to whatever control you render inside. */
export function Field({ label, hint, error, children }: FieldProps) {
  const id = useId();
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [errorId, hintId].filter(Boolean).join(' ') || undefined;

  return (
    <div className="sl-field">
      <label className="sl-label" htmlFor={id}>
        {label}
      </label>
      {children({ id, describedBy, invalid: Boolean(error) })}
      {error ? (
        <p className="sl-error" id={errorId}>
          {error}
        </p>
      ) : hint ? (
        <p className="sl-hint" id={hintId}>
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export interface InputProps extends ComponentProps<'input'> {
  invalid?: boolean;
}

export function Input({ invalid, className, ...rest }: InputProps) {
  return (
    <input className={clsx('sl-input', className)} aria-invalid={invalid || undefined} {...rest} />
  );
}

export interface TextareaProps extends ComponentProps<'textarea'> {
  invalid?: boolean;
}

export function Textarea({ invalid, className, ...rest }: TextareaProps) {
  return (
    <textarea
      className={clsx('sl-input sl-textarea', className)}
      aria-invalid={invalid || undefined}
      {...rest}
    />
  );
}
