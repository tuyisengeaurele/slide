import * as RToast from '@radix-ui/react-toast';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useSyncExternalStore } from 'react';

export interface ToastInput {
  title: string;
  description?: string;
  tone?: 'neutral' | 'ok' | 'error';
  /** ms before it goes away on its own */
  duration?: number;
}

interface ToastItem extends ToastInput {
  id: number;
}

// a tiny store, so any file can call toast() without wiring up context
let items: ToastItem[] = [];
let nextId = 1;
const listeners = new Set<() => void>();

function emit() {
  for (const l of listeners) l();
}

export function toast(input: ToastInput): number {
  const id = nextId++;
  items = [...items, { id, ...input }];
  emit();
  return id;
}

function dismiss(id: number) {
  items = items.filter((t) => t.id !== id);
  emit();
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

const getSnapshot = () => items;

/** Mount once near the root of an app. */
export function Toaster() {
  const list = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  const reduce = useReducedMotion();

  return (
    <RToast.Provider swipeDirection="right" duration={4500}>
      <AnimatePresence>
        {list.map((t) => (
          <RToast.Root
            key={t.id}
            asChild
            forceMount
            duration={t.duration}
            onOpenChange={(open) => {
              if (!open) dismiss(t.id);
            }}
          >
            <motion.li
              layout={!reduce}
              className={`sl-toast sl-toast-${t.tone ?? 'neutral'}`}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, x: 24 }}
              transition={
                reduce ? { duration: 0.1 } : { type: 'spring', duration: 0.4, bounce: 0.2 }
              }
            >
              <div>
                <RToast.Title className="sl-toast-title">{t.title}</RToast.Title>
                {t.description && (
                  <RToast.Description className="sl-toast-desc">{t.description}</RToast.Description>
                )}
              </div>
              <RToast.Close className="sl-toast-close" aria-label="Dismiss">
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  aria-hidden="true"
                >
                  <path d="M4 4l8 8M12 4l-8 8" strokeLinecap="round" />
                </svg>
              </RToast.Close>
            </motion.li>
          </RToast.Root>
        ))}
      </AnimatePresence>
      <RToast.Viewport className="sl-toast-viewport" label="Notifications" />
    </RToast.Provider>
  );
}
