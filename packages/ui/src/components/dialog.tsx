import * as RDialog from '@radix-ui/react-dialog';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useState } from 'react';
import type { ReactNode } from 'react';

interface SheetProps {
  title: string;
  description?: string;
  /** the thing that opens it. Leave out and control it with `open` instead */
  trigger?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
  footer?: ReactNode;
}

// Dialog and drawer are the same thing underneath, they only differ in where they sit and how they move.
function useSheetState(
  open: boolean | undefined,
  onOpenChange: ((o: boolean) => void) | undefined,
) {
  const [inner, setInner] = useState(false);
  const isOpen = open ?? inner;
  const setOpen = (next: boolean) => {
    if (open === undefined) setInner(next);
    onOpenChange?.(next);
  };
  return [isOpen, setOpen] as const;
}

const close = (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <path d="M4 4l8 8M12 4l-8 8" strokeLinecap="round" />
  </svg>
);

export function Dialog({
  title,
  description,
  trigger,
  open,
  onOpenChange,
  children,
  footer,
}: SheetProps) {
  const reduce = useReducedMotion();
  const [isOpen, setOpen] = useSheetState(open, onOpenChange);

  return (
    <RDialog.Root open={isOpen} onOpenChange={setOpen}>
      {trigger && <RDialog.Trigger asChild>{trigger}</RDialog.Trigger>}
      <AnimatePresence>
        {isOpen && (
          <RDialog.Portal forceMount>
            <RDialog.Overlay asChild forceMount>
              <motion.div
                className="sl-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              />
            </RDialog.Overlay>
            <RDialog.Content asChild forceMount>
              <motion.div
                className="sl-dialog"
                initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97, y: 6 }}
                transition={
                  reduce ? { duration: 0.1 } : { type: 'spring', duration: 0.35, bounce: 0.15 }
                }
              >
                <RDialog.Title className="sl-sheet-title">{title}</RDialog.Title>
                {description ? (
                  <RDialog.Description className="sl-sheet-desc">{description}</RDialog.Description>
                ) : (
                  <RDialog.Description className="sr-only">{title}</RDialog.Description>
                )}
                <div className="sl-sheet-body">{children}</div>
                {footer && <div className="sl-sheet-footer">{footer}</div>}
                <RDialog.Close className="sl-sheet-close" aria-label="Close">
                  {close}
                </RDialog.Close>
              </motion.div>
            </RDialog.Content>
          </RDialog.Portal>
        )}
      </AnimatePresence>
    </RDialog.Root>
  );
}

export function Drawer({
  title,
  description,
  trigger,
  open,
  onOpenChange,
  children,
  footer,
  side = 'right',
}: SheetProps & { side?: 'right' | 'left' }) {
  const reduce = useReducedMotion();
  const [isOpen, setOpen] = useSheetState(open, onOpenChange);
  const from = side === 'right' ? '100%' : '-100%';

  return (
    <RDialog.Root open={isOpen} onOpenChange={setOpen}>
      {trigger && <RDialog.Trigger asChild>{trigger}</RDialog.Trigger>}
      <AnimatePresence>
        {isOpen && (
          <RDialog.Portal forceMount>
            <RDialog.Overlay asChild forceMount>
              <motion.div
                className="sl-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            </RDialog.Overlay>
            <RDialog.Content asChild forceMount>
              <motion.div
                className={`sl-drawer sl-drawer-${side}`}
                initial={reduce ? { opacity: 0 } : { x: from }}
                animate={reduce ? { opacity: 1 } : { x: 0 }}
                exit={reduce ? { opacity: 0 } : { x: from }}
                transition={
                  reduce ? { duration: 0.1 } : { type: 'spring', duration: 0.45, bounce: 0.1 }
                }
              >
                <RDialog.Title className="sl-sheet-title">{title}</RDialog.Title>
                {description ? (
                  <RDialog.Description className="sl-sheet-desc">{description}</RDialog.Description>
                ) : (
                  <RDialog.Description className="sr-only">{title}</RDialog.Description>
                )}
                <div className="sl-sheet-body">{children}</div>
                {footer && <div className="sl-sheet-footer">{footer}</div>}
                <RDialog.Close className="sl-sheet-close" aria-label="Close">
                  {close}
                </RDialog.Close>
              </motion.div>
            </RDialog.Content>
          </RDialog.Portal>
        )}
      </AnimatePresence>
    </RDialog.Root>
  );
}
