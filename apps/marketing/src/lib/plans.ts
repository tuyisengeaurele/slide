// Prices aren't decided. Anything price-shaped is a placeholder and the UI labels it as one.
export interface Plan {
  name: string;
  line: string;
  points: string[];
  featured?: boolean;
}

export const plans: Plan[] = [
  {
    name: 'Starter',
    line: 'For a small team getting off personal phones.',
    points: ['Browser softphone', 'One queue', 'Call history'],
  },
  {
    name: 'Team',
    line: 'For teams that need real routing and reporting.',
    points: [
      'Everything in Starter',
      'Multiple queues and routing',
      'Live floor view',
      'Recording',
    ],
    featured: true,
  },
  {
    name: 'Business',
    line: 'For larger floors with tighter requirements.',
    points: ['Everything in Team', 'Roles and audit log', 'SSO', 'Priority support'],
  },
];

export const comparison: { feature: string; starter: boolean; team: boolean; business: boolean }[] =
  [
    { feature: 'Browser softphone', starter: true, team: true, business: true },
    { feature: 'Call history and search', starter: true, team: true, business: true },
    { feature: 'Multiple queues', starter: false, team: true, business: true },
    { feature: 'Routing builder', starter: false, team: true, business: true },
    { feature: 'Live floor view', starter: false, team: true, business: true },
    { feature: 'Call recording with consent', starter: false, team: true, business: true },
    { feature: 'Analytics and exports', starter: false, team: true, business: true },
    { feature: 'Roles and audit log', starter: false, team: false, business: true },
    { feature: 'Single sign-on', starter: false, team: false, business: true },
    { feature: 'Priority support', starter: false, team: false, business: true },
  ];
