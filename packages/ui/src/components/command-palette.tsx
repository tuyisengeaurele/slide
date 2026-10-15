import { Command } from 'cmdk';
import { useEffect } from 'react';
import type { ReactNode } from 'react';

export interface CommandItem {
  id: string;
  label: string;
  hint?: string;
  /** extra words that should match when searching */
  keywords?: string[];
  onSelect: () => void;
}

export interface CommandGroup {
  heading: string;
  items: CommandItem[];
}

export interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  groups: CommandGroup[];
  placeholder?: string;
  empty?: ReactNode;
}

/** Cmd or Ctrl + K, call this once wherever the palette lives. */
export function useCommandShortcut(toggle: () => void) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        toggle();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [toggle]);
}

export function CommandPalette({
  open,
  onOpenChange,
  groups,
  placeholder = 'Type a command or search',
  empty = 'Nothing matches that.',
}: CommandPaletteProps) {
  return (
    <Command.Dialog
      open={open}
      onOpenChange={onOpenChange}
      label="Command menu"
      overlayClassName="sl-overlay"
      contentClassName="sl-palette"
      loop
    >
      <Command.Input className="sl-palette-input" placeholder={placeholder} />
      <Command.List className="sl-palette-list">
        <Command.Empty className="sl-palette-empty">{empty}</Command.Empty>
        {groups.map((g) => (
          <Command.Group key={g.heading} heading={g.heading} className="sl-palette-group">
            {g.items.map((item) => (
              <Command.Item
                key={item.id}
                value={item.label}
                keywords={item.keywords}
                className="sl-palette-item"
                onSelect={() => {
                  item.onSelect();
                  onOpenChange(false);
                }}
              >
                <span>{item.label}</span>
                {item.hint && <kbd className="sl-kbd">{item.hint}</kbd>}
              </Command.Item>
            ))}
          </Command.Group>
        ))}
      </Command.List>
    </Command.Dialog>
  );
}
