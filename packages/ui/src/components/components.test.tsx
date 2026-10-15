import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import {
  Avatar,
  Button,
  Checkbox,
  CommandPalette,
  Dialog,
  Field,
  Input,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Toaster,
  toast,
} from '../index';

describe('Button', () => {
  it('blocks clicks and says it is busy while loading', async () => {
    const onClick = vi.fn();
    render(
      <Button loading onClick={onClick}>
        Save
      </Button>,
    );
    const button = screen.getByRole('button', { name: 'Save' });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-busy', 'true');
    await userEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('defaults to type=button so it never submits a form by accident', () => {
    render(<Button>Go</Button>);
    expect(screen.getByRole('button', { name: 'Go' })).toHaveAttribute('type', 'button');
  });
});

describe('Field', () => {
  it('ties the error to the input and marks it invalid', () => {
    render(
      <Field label="Email" hint="We never share it" error="That email looks off">
        {({ id, describedBy, invalid }) => (
          <Input id={id} aria-describedby={describedBy} invalid={invalid} />
        )}
      </Field>,
    );
    const input = screen.getByLabelText('Email');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAccessibleDescription('That email looks off');
  });

  it('falls back to the hint when there is no error', () => {
    render(
      <Field label="Email" hint="We never share it">
        {({ id, describedBy }) => <Input id={id} aria-describedby={describedBy} />}
      </Field>,
    );
    expect(screen.getByLabelText('Email')).toHaveAccessibleDescription('We never share it');
  });
});

describe('Switch and Checkbox', () => {
  it('toggles a switch from its label', async () => {
    const onCheckedChange = vi.fn();
    render(<Switch label="Record calls" onCheckedChange={onCheckedChange} />);
    await userEvent.click(screen.getByText('Record calls'));
    expect(onCheckedChange).toHaveBeenCalledWith(true);
    expect(screen.getByRole('switch', { name: 'Record calls' })).toBeChecked();
  });

  it('toggles a checkbox with the keyboard', async () => {
    render(<Checkbox label="Send me the summary" />);
    const box = screen.getByRole('checkbox', { name: 'Send me the summary' });
    box.focus();
    await userEvent.keyboard(' ');
    expect(box).toBeChecked();
  });
});

describe('Tabs', () => {
  it('changes panel on click and with the arrow keys', async () => {
    render(
      <Tabs defaultValue="a">
        <TabsList>
          <TabsTrigger value="a">Calls</TabsTrigger>
          <TabsTrigger value="b">Queues</TabsTrigger>
        </TabsList>
        <TabsContent value="a">Call panel</TabsContent>
        <TabsContent value="b">Queue panel</TabsContent>
      </Tabs>,
    );
    expect(screen.getByText('Call panel')).toBeVisible();
    await userEvent.click(screen.getByRole('tab', { name: 'Queues' }));
    expect(screen.getByText('Queue panel')).toBeVisible();

    screen.getByRole('tab', { name: 'Queues' }).focus();
    await userEvent.keyboard('{ArrowLeft}');
    expect(screen.getByRole('tab', { name: 'Calls' })).toHaveAttribute('data-state', 'active');
  });
});

describe('Dialog', () => {
  it('opens from its trigger, closes on Escape and gives focus back', async () => {
    render(
      <Dialog
        title="Delete queue"
        description="This can't be undone"
        trigger={<Button>Open</Button>}
      >
        <p>Are you sure?</p>
      </Dialog>,
    );
    const trigger = screen.getByRole('button', { name: 'Open' });
    await userEvent.click(trigger);
    expect(await screen.findByRole('dialog', { name: 'Delete queue' })).toBeInTheDocument();

    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    expect(trigger).toHaveFocus();
  });
});

describe('Avatar', () => {
  it('shows initials and is named for screen readers', () => {
    render(<Avatar name="Daniel Okafor" />);
    expect(screen.getByRole('img', { name: 'Daniel Okafor' })).toHaveTextContent('DO');
  });

  it('copes with a single name and with extra spaces', () => {
    render(<Avatar name="  Madonna " />);
    expect(screen.getByRole('img', { name: 'Madonna' })).toHaveTextContent('M');
  });

  it('falls back to initials when the image fails', () => {
    const { container } = render(<Avatar name="Maya Reyes" src="/nope.png" />);
    const img = container.querySelector('img');
    expect(img).not.toBeNull();
    act(() => {
      img?.dispatchEvent(new Event('error'));
    });
    expect(screen.getByRole('img', { name: 'Maya Reyes' })).toHaveTextContent('MR');
  });
});

describe('Toaster', () => {
  it('shows a toast with its title and description', async () => {
    render(<Toaster />);
    act(() => {
      toast({ title: 'Call saved', description: 'Notes synced to ticket #1042' });
    });
    expect(await screen.findByText('Call saved')).toBeInTheDocument();
    expect(screen.getByText('Notes synced to ticket #1042')).toBeInTheDocument();
  });
});

describe('CommandPalette', () => {
  const groups = [
    {
      heading: 'Go to',
      items: [
        { id: 'queues', label: 'Live queues', onSelect: vi.fn() },
        { id: 'history', label: 'Call history', keywords: ['recordings'], onSelect: vi.fn() },
      ],
    },
  ];

  it('filters as you type, including by keyword, and runs the chosen command', async () => {
    const onOpenChange = vi.fn();
    render(<CommandPalette open onOpenChange={onOpenChange} groups={groups} />);

    await userEvent.type(screen.getByPlaceholderText('Type a command or search'), 'recordings');
    expect(screen.getByText('Call history')).toBeInTheDocument();
    expect(screen.queryByText('Live queues')).not.toBeInTheDocument();

    await userEvent.click(screen.getByText('Call history'));
    expect(groups[0]?.items[1]?.onSelect).toHaveBeenCalledTimes(1);
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('says so when nothing matches', async () => {
    render(<CommandPalette open onOpenChange={() => {}} groups={groups} />);
    await userEvent.type(screen.getByPlaceholderText('Type a command or search'), 'zzzz');
    expect(screen.getByText('Nothing matches that.')).toBeInTheDocument();
  });
});
