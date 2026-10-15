import * as RTabs from '@radix-ui/react-tabs';
import { LayoutGroup, motion, useReducedMotion } from 'motion/react';
import { createContext, useContext, useId, useState } from 'react';
import type { ComponentProps } from 'react';

const ActiveTab = createContext<{ value: string; group: string }>({ value: '', group: '' });

export function Tabs({
  defaultValue,
  value,
  onValueChange,
  children,
  ...rest
}: ComponentProps<typeof RTabs.Root> & { defaultValue: string }) {
  const [inner, setInner] = useState(defaultValue);
  const group = useId();
  const current = value ?? inner;

  return (
    <ActiveTab.Provider value={{ value: current, group }}>
      <LayoutGroup id={group}>
        <RTabs.Root
          className="sl-tabs"
          value={current}
          onValueChange={(v) => {
            setInner(v);
            onValueChange?.(v);
          }}
          {...rest}
        >
          {children}
        </RTabs.Root>
      </LayoutGroup>
    </ActiveTab.Provider>
  );
}

export function TabsList(props: ComponentProps<typeof RTabs.List>) {
  return <RTabs.List className="sl-tabs-list" {...props} />;
}

export function TabsTrigger({ value, children, ...rest }: ComponentProps<typeof RTabs.Trigger>) {
  const active = useContext(ActiveTab).value === value;
  const reduce = useReducedMotion();

  return (
    <RTabs.Trigger className="sl-tab" value={value} {...rest}>
      {active && (
        <motion.span
          layoutId="sl-tab-pill"
          className="sl-tab-pill"
          transition={reduce ? { duration: 0 } : { type: 'spring', duration: 0.35, bounce: 0.15 }}
        />
      )}
      <span className="sl-tab-label">{children}</span>
    </RTabs.Trigger>
  );
}

export function TabsContent(props: ComponentProps<typeof RTabs.Content>) {
  return <RTabs.Content className="sl-tabs-content" {...props} />;
}
