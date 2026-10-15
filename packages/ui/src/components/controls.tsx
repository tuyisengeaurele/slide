import * as RCheckbox from '@radix-ui/react-checkbox';
import * as RSelect from '@radix-ui/react-select';
import * as RSwitch from '@radix-ui/react-switch';
import * as RTooltip from '@radix-ui/react-tooltip';
import clsx from 'clsx';
import type { ComponentProps, ReactNode } from 'react';

const check = (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
    <path d="M3.5 8.5l3 3 6-7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export interface CheckboxProps extends ComponentProps<typeof RCheckbox.Root> {
  label: string;
}

export function Checkbox({ label, className, id, ...rest }: CheckboxProps) {
  const fallbackId = `cb-${label.toLowerCase().replace(/\W+/g, '-')}`;
  const inputId = id ?? fallbackId;
  return (
    <span className="sl-check">
      <RCheckbox.Root id={inputId} className={clsx('sl-checkbox', className)} {...rest}>
        <RCheckbox.Indicator className="sl-checkbox-mark">{check}</RCheckbox.Indicator>
      </RCheckbox.Root>
      <label htmlFor={inputId}>{label}</label>
    </span>
  );
}

export interface SwitchProps extends ComponentProps<typeof RSwitch.Root> {
  label: string;
}

export function Switch({ label, className, id, ...rest }: SwitchProps) {
  const fallbackId = `sw-${label.toLowerCase().replace(/\W+/g, '-')}`;
  const inputId = id ?? fallbackId;
  return (
    <span className="sl-check">
      <RSwitch.Root id={inputId} className={clsx('sl-switch', className)} {...rest}>
        <RSwitch.Thumb className="sl-switch-thumb" />
      </RSwitch.Root>
      <label htmlFor={inputId}>{label}</label>
    </span>
  );
}

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  id?: string;
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  invalid?: boolean;
  disabled?: boolean;
  'aria-describedby'?: string | undefined;
}

export function Select({ options, placeholder = 'Choose one', invalid, ...rest }: SelectProps) {
  const { id, 'aria-describedby': describedBy, ...root } = rest;
  return (
    <RSelect.Root {...root}>
      <RSelect.Trigger
        id={id}
        className="sl-input sl-select"
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
      >
        <RSelect.Value placeholder={placeholder} />
        <RSelect.Icon className="sl-select-icon">
          <svg
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            aria-hidden="true"
          >
            <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </RSelect.Icon>
      </RSelect.Trigger>
      <RSelect.Portal>
        <RSelect.Content className="sl-menu" position="popper" sideOffset={6}>
          <RSelect.Viewport>
            {options.map((o) => (
              <RSelect.Item
                key={o.value}
                value={o.value}
                disabled={o.disabled}
                className="sl-menu-item"
              >
                <RSelect.ItemText>{o.label}</RSelect.ItemText>
                <RSelect.ItemIndicator className="sl-menu-check">{check}</RSelect.ItemIndicator>
              </RSelect.Item>
            ))}
          </RSelect.Viewport>
        </RSelect.Content>
      </RSelect.Portal>
    </RSelect.Root>
  );
}

export const TooltipProvider = RTooltip.Provider;

export function Tooltip({ content, children }: { content: ReactNode; children: ReactNode }) {
  return (
    <RTooltip.Root delayDuration={300}>
      <RTooltip.Trigger asChild>{children}</RTooltip.Trigger>
      <RTooltip.Portal>
        <RTooltip.Content className="sl-tooltip" sideOffset={8}>
          {content}
        </RTooltip.Content>
      </RTooltip.Portal>
    </RTooltip.Root>
  );
}
