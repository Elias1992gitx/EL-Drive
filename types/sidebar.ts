import {
  HomeIcon,
  DocumentIcon,
  ShareIcon,
  TrashIcon,
  StarIcon,
  PaperAirplaneIcon,
  InboxIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline'

export interface MenuItem {
  icon: any
  label: string
  href: string
  items?: MenuItem[]
}

export const menuItems: MenuItem[] = [
  {
    icon: HomeIcon,
    label: 'All Files',
    href: '#',
  },
  {
    icon: DocumentIcon,
    label: 'Signatures',
    href: '#',
  },
  {
    icon: PaperAirplaneIcon,
    label: 'Send and track',
    href: '#',
  },
  {
    icon: ShareIcon,
    label: 'Shared',
    href: '#',
  },
  {
    icon: InboxIcon,
    label: 'File requests',
    href: '#',
    items: [
      { icon: InboxIcon, label: 'Received', href: '#' },
      { icon: PaperAirplaneIcon, label: 'Sent', href: '#' },
    ],
  },
  {
    icon: TrashIcon,
    label: 'Deleted Files',
    href: '#',
  },
  {
    icon: Cog6ToothIcon,
    label: 'Admin console',
    href: '#',
  },
]

export const quickAccessSection = {
  title: 'Quick access',
  description: 'Add items that you use all the time.',
  items: [
    {
      icon: StarIcon,
      label: 'Starred',
      href: '#',
    },
    {
      icon: null,
      label: 'Untitled section',
      href: '#',
    },
  ],
}