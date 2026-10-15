import logo from '@slide/ui/brand/slide-logo.svg';
import {
  Avatar,
  Badge,
  Button,
  Checkbox,
  CommandPalette,
  Dialog,
  Drawer,
  DropdownContent,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
  DropdownSeparator,
  DropdownTrigger,
  Field,
  Input,
  Select,
  Skeleton,
  Switch,
  Table,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  Toaster,
  Tooltip,
  TooltipProvider,
  toast,
  useCommandShortcut,
} from '@slide/ui';
import { useCallback, useState } from 'react';
import type { ReactNode } from 'react';

type Theme = 'auto' | 'light' | 'dark';

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === 'auto') delete root.dataset.theme;
  else root.dataset.theme = theme;
  try {
    if (theme === 'auto') localStorage.removeItem('slide-theme');
    else localStorage.setItem('slide-theme', theme);
  } catch {
    // private mode, it just won't stick
  }
}

function Section({
  id,
  title,
  intro,
  children,
}: {
  id: string;
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <section className="ds-section" id={id} aria-labelledby={`${id}-h`}>
      <h2 id={`${id}-h`}>{title}</h2>
      {intro && <p>{intro}</p>}
      <div className="ds-demo">{children}</div>
    </section>
  );
}

const colors = [
  ['bg', 'Page'],
  ['surface', 'Surface'],
  ['surface-2', 'Surface 2'],
  ['vanilla', 'Vanilla'],
  ['ink', 'Ink'],
  ['ink-2', 'Ink 2'],
  ['ink-3', 'Ink 3'],
  ['orange', 'Orange'],
  ['ok', 'Ok'],
  ['warn', 'Warn'],
  ['err', 'Error'],
] as const;

const type = [
  ['Hero', 'var(--text-hero)', 620],
  ['4xl', 'var(--text-4xl)', 620],
  ['3xl', 'var(--text-3xl)', 600],
  ['2xl', 'var(--text-2xl)', 600],
  ['xl', 'var(--text-xl)', 560],
  ['base', 'var(--text-base)', 400],
  ['sm', 'var(--text-sm)', 400],
  ['xs', 'var(--text-xs)', 500],
] as const;

const spaces = [1, 2, 3, 4, 6, 8, 12, 16, 24] as const;

const calls = [
  { who: 'Daniel Okafor', queue: 'Billing', wait: '0:09', status: 'Ringing' },
  { who: 'Maya Reyes', queue: 'Support', wait: '0:41', status: 'Waiting' },
  { who: 'Tomas Lind', queue: 'Billing', wait: '1:12', status: 'Waiting' },
  { who: 'Priya Shah', queue: 'Onboarding', wait: '1:30', status: 'On call' },
];

export function DesignPage() {
  const [theme, setTheme] = useState<Theme>(() => {
    const t = document.documentElement.dataset.theme;
    return t === 'light' || t === 'dark' ? t : 'auto';
  });
  const [palette, setPalette] = useState(false);
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState('calls');
  const togglePalette = useCallback(() => setPalette((p) => !p), []);
  useCommandShortcut(togglePalette);

  const pick = (t: Theme) => {
    setTheme(t);
    applyTheme(t);
  };

  const save = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast({ title: 'Call saved', description: 'Notes synced to ticket #1042', tone: 'ok' });
    }, 1200);
  };

  return (
    <TooltipProvider>
      <header className="ds-top">
        <img src={logo} alt="Slide" />
        <Badge>Design system</Badge>
        <span className="ds-spacer" />
        <Button variant="ghost" size="sm" onClick={togglePalette}>
          Command menu <kbd className="sl-kbd">Ctrl K</kbd>
        </Button>
        <div className="ds-row" role="group" aria-label="Theme">
          {(['auto', 'light', 'dark'] as const).map((t) => (
            <Button
              key={t}
              size="sm"
              variant={theme === t ? 'secondary' : 'ghost'}
              aria-pressed={theme === t}
              onClick={() => pick(t)}
            >
              {t[0]?.toUpperCase()}
              {t.slice(1)}
            </Button>
          ))}
        </div>
      </header>

      <main className="ds-main">
        <div className="ds-intro">
          <h1>Every component, every state.</h1>
          <p>
            The pieces the product is built from. Switch the theme above to check both, tab through
            everything to check focus, and turn on reduced motion in your OS to see it go quiet.
          </p>
        </div>

        <Section
          id="color"
          title="Color"
          intro="Orange is for the one thing you want someone to press or notice. Everything else is warm neutrals."
        >
          <div className="ds-swatches">
            {colors.map(([token, label]) => (
              <div className="ds-swatch" key={token}>
                <i style={{ background: `var(--${token})` }} />
                <span>
                  {label} <code>--{token}</code>
                </span>
              </div>
            ))}
          </div>
        </Section>

        <Section
          id="type"
          title="Type"
          intro="One family, a real scale, tight tracking on the big sizes."
        >
          <div className="ds-type">
            {type.map(([name, size, weight]) => (
              <div key={name}>
                <small>{name}</small>
                <span
                  style={{
                    fontSize: size,
                    fontWeight: weight,
                    letterSpacing: '-0.04em',
                    lineHeight: 1,
                  }}
                >
                  Phone work, made calm.
                </span>
              </div>
            ))}
          </div>
        </Section>

        <Section id="space" title="Spacing" intro="Everything sits on a 4px grid.">
          <div className="ds-space">
            {spaces.map((n) => (
              <div key={n}>
                <i style={{ ['--s' as string]: `var(--space-${n})` }} />
                {n * 4}
              </div>
            ))}
          </div>
        </Section>

        <Section id="buttons" title="Buttons">
          <div className="ds-col">
            <span className="ds-label">Variants</span>
            <div className="ds-row">
              <Button>Start free</Button>
              <Button variant="secondary">See the tour</Button>
              <Button variant="ghost">Cancel</Button>
            </div>
            <span className="ds-label">Sizes</span>
            <div className="ds-row">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
          </div>
          <div className="ds-col">
            <span className="ds-label">States</span>
            <div className="ds-row">
              <Button disabled>Disabled</Button>
              <Button loading>Saving</Button>
              <Button variant="secondary" onClick={save} loading={saving}>
                Save call
              </Button>
            </div>
          </div>
        </Section>

        <Section
          id="forms"
          title="Fields"
          intro="A label, a hint, and an error that is read out with the input."
        >
          <div className="ds-states">
            <Field label="Work email" hint="We only use it to sign you in">
              {({ id, describedBy }) => (
                <Input id={id} aria-describedby={describedBy} placeholder="you@company.com" />
              )}
            </Field>
            <Field label="Work email" error="That email looks off">
              {({ id, describedBy, invalid }) => (
                <Input
                  id={id}
                  aria-describedby={describedBy}
                  invalid={invalid}
                  defaultValue="daniel@"
                />
              )}
            </Field>
            <Field label="Team name">
              {({ id }) => <Input id={id} disabled defaultValue="Billing" />}
            </Field>
            <Field label="Queue">
              {({ id, describedBy }) => (
                <Select
                  id={id}
                  aria-describedby={describedBy}
                  placeholder="Pick a queue"
                  options={[
                    { value: 'billing', label: 'Billing' },
                    { value: 'support', label: 'Support' },
                    { value: 'sales', label: 'Sales' },
                    { value: 'closed', label: 'Overnight (closed)', disabled: true },
                  ]}
                />
              )}
            </Field>
            <Field label="Notes" hint="Saved with the call">
              {({ id, describedBy }) => (
                <Textarea id={id} aria-describedby={describedBy} rows={3} />
              )}
            </Field>
            <div className="ds-col">
              <Checkbox label="Send me the call summary" defaultChecked />
              <Checkbox label="Disabled option" disabled />
              <Switch label="Record calls" defaultChecked />
              <Switch label="Disabled switch" disabled />
            </div>
          </div>
        </Section>

        <Section
          id="tabs"
          title="Tabs"
          intro="The pill slides between tabs with a spring. Arrow keys move between them."
        >
          <div style={{ width: '100%' }}>
            <Tabs defaultValue="calls" value={tab} onValueChange={setTab}>
              <TabsList aria-label="Views">
                <TabsTrigger value="calls">Calls</TabsTrigger>
                <TabsTrigger value="queues">Queues</TabsTrigger>
                <TabsTrigger value="agents">Agents</TabsTrigger>
              </TabsList>
              <TabsContent value="calls">All the calls from today, newest first.</TabsContent>
              <TabsContent value="queues">Where callers are waiting right now.</TabsContent>
              <TabsContent value="agents">Who is free, on a call, or wrapping up.</TabsContent>
            </Tabs>
          </div>
        </Section>

        <Section id="overlays" title="Dialog, drawer, menu, tooltip, toast">
          <Dialog
            title="Delete this queue?"
            description="Callers waiting in it will move to the default queue."
            trigger={<Button variant="secondary">Open dialog</Button>}
            footer={
              <>
                <Button variant="ghost">Keep it</Button>
                <Button>Delete queue</Button>
              </>
            }
          >
            <p>This can't be undone, but your call history stays.</p>
          </Dialog>

          <Drawer
            title="Call details"
            description="Daniel Okafor, Billing"
            trigger={<Button variant="secondary">Open drawer</Button>}
          >
            <div className="ds-skel">
              <p>Recorded with consent. Duration 2:20.</p>
              <Skeleton style={{ height: 14, width: '80%' }} />
              <Skeleton style={{ height: 14, width: '60%' }} />
            </div>
          </Drawer>

          <DropdownMenu>
            <DropdownTrigger>
              <Button variant="secondary">Menu</Button>
            </DropdownTrigger>
            <DropdownContent>
              <DropdownLabel>Agent</DropdownLabel>
              <DropdownItem>Set as available</DropdownItem>
              <DropdownItem>Take a break</DropdownItem>
              <DropdownSeparator />
              <DropdownItem danger>Sign out</DropdownItem>
            </DropdownContent>
          </DropdownMenu>

          <Tooltip content="Mutes your microphone">
            <Button variant="ghost">Hover or focus me</Button>
          </Tooltip>

          <Button
            variant="secondary"
            onClick={() =>
              toast({ title: 'Recording on', description: 'The caller heard the consent notice.' })
            }
          >
            Show a toast
          </Button>
          <Button
            variant="secondary"
            onClick={() =>
              toast({
                title: "Couldn't save the note",
                description: 'Check your connection and try again.',
                tone: 'error',
              })
            }
          >
            Show an error toast
          </Button>
        </Section>

        <Section id="display" title="Badge, avatar, skeleton">
          <div className="ds-col">
            <span className="ds-label">Badges</span>
            <div className="ds-row">
              <Badge>Neutral</Badge>
              <Badge tone="orange">Ringing</Badge>
              <Badge tone="ok">Available</Badge>
              <Badge tone="warn">Wrap-up</Badge>
            </div>
            <span className="ds-label">Avatars</span>
            <div className="ds-row">
              <Avatar name="Daniel Okafor" size="sm" />
              <Avatar name="Maya Reyes" status="online" />
              <Avatar name="Tomas Lind" status="busy" />
              <Avatar name="Priya Shah" size="lg" status="away" />
              <Avatar name="Broken Image" src="/missing.png" />
            </div>
          </div>
          <div className="ds-col">
            <span className="ds-label">Loading</span>
            <div className="ds-skel">
              <Skeleton style={{ height: 40, width: 40, borderRadius: 999 }} />
              <Skeleton style={{ height: 14, width: '70%' }} />
              <Skeleton style={{ height: 14, width: '90%' }} />
              <Skeleton style={{ height: 14, width: '45%' }} />
            </div>
          </div>
        </Section>

        <Section id="table" title="Table">
          <div style={{ width: '100%' }}>
            <Table label="Calls in the queue">
              <thead>
                <tr>
                  <th scope="col">Caller</th>
                  <th scope="col">Queue</th>
                  <th scope="col">Waiting</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {calls.map((c) => (
                  <tr key={c.who}>
                    <th scope="row">
                      <span className="ds-row">
                        <Avatar name={c.who} size="sm" /> {c.who}
                      </span>
                    </th>
                    <td>{c.queue}</td>
                    <td>{c.wait}</td>
                    <td>
                      <Badge
                        tone={
                          c.status === 'Ringing'
                            ? 'orange'
                            : c.status === 'On call'
                              ? 'ok'
                              : 'neutral'
                        }
                      >
                        {c.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Section>

        <Section
          id="states"
          title="Empty and error states"
          intro="Every screen needs one of each, so they live in the kit too."
        >
          <div className="ds-states">
            <div className="ds-col">
              <span className="ds-label">Empty</span>
              <strong>No calls yet</strong>
              <p style={{ color: 'var(--ink-2)' }}>
                When someone rings your number, it shows up here.
              </p>
              <Button size="sm" variant="secondary">
                Add a number
              </Button>
            </div>
            <div className="ds-col">
              <span className="ds-label">Error</span>
              <strong>We couldn't load the queue</strong>
              <p style={{ color: 'var(--err)' }}>The connection dropped. Your calls are safe.</p>
              <Button size="sm" variant="secondary">
                Try again
              </Button>
            </div>
          </div>
        </Section>
      </main>

      <CommandPalette
        open={palette}
        onOpenChange={setPalette}
        groups={[
          {
            heading: 'Go to',
            items: [
              { id: 'queues', label: 'Live queues', hint: 'G Q', onSelect: () => setTab('queues') },
              {
                id: 'history',
                label: 'Call history',
                keywords: ['recordings'],
                hint: 'G H',
                onSelect: () => setTab('calls'),
              },
              { id: 'agents', label: 'Agents', onSelect: () => setTab('agents') },
            ],
          },
          {
            heading: 'Theme',
            items: [
              { id: 'light', label: 'Switch to light', onSelect: () => pick('light') },
              { id: 'dark', label: 'Switch to dark', onSelect: () => pick('dark') },
              { id: 'auto', label: 'Follow the system', onSelect: () => pick('auto') },
            ],
          },
        ]}
      />
      <Toaster />
    </TooltipProvider>
  );
}
