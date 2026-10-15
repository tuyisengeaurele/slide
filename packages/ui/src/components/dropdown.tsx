import * as RMenu from '@radix-ui/react-dropdown-menu';
import clsx from 'clsx';
import type { ComponentProps, ReactNode } from 'react';

export const DropdownMenu = RMenu.Root;

export function DropdownTrigger({ children }: { children: ReactNode }) {
  return <RMenu.Trigger asChild>{children}</RMenu.Trigger>;
}

export function DropdownContent({ className, ...rest }: ComponentProps<typeof RMenu.Content>) {
  return (
    <RMenu.Portal>
      <RMenu.Content className={clsx('sl-menu', className)} sideOffset={8} align="end" {...rest} />
    </RMenu.Portal>
  );
}

export function DropdownItem({
  danger,
  className,
  ...rest
}: ComponentProps<typeof RMenu.Item> & { danger?: boolean }) {
  return (
    <RMenu.Item className={clsx('sl-menu-item', danger && 'sl-menu-danger', className)} {...rest} />
  );
}

export function DropdownLabel(props: ComponentProps<typeof RMenu.Label>) {
  return <RMenu.Label className="sl-menu-label" {...props} />;
}

export function DropdownSeparator() {
  return <RMenu.Separator className="sl-menu-sep" />;
}
