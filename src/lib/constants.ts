import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from 'react-icons/fa';
import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  BookOpen,
  Bot,
  Frame,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  LucideIcon,
  Building,
  Castle,
  Trees,
  Warehouse,
} from 'lucide-react';

// NAVBAR HEIGHT
export const NAVBAR_HEIGHT = 52; // px

// Navigation links data
export const navLinks = [
  { href: '/about', text: 'About Us' },
  { href: '/contact', text: 'Contact Us' },
  { href: '/faq', text: 'FAQ' },
  { href: '/terms', text: 'Terms' },
  { href: '/privacy', text: 'Privacy' },
];

// Social media links data
export const socialLinks = [
  { icon: FaFacebook, label: 'Facebook' },
  { icon: FaInstagram, label: 'Instagram' },
  { icon: FaTwitter, label: 'Twitter' },
  { icon: FaLinkedin, label: 'Linkedin' },
  { icon: FaYoutube, label: 'Youtube' },
];

// Footer policy links
export const policyLinks = [
  { href: '/privacy', text: 'Privacy Policy' },
  { href: '/terms', text: 'Terms of Service' },
  { href: '/cookies', text: 'Cookie Policy' },
];
// Menu items.
export const SidebarMenuItems = [
  {
    title: 'Home',
    url: '/',
    icon: Home,
  },
  {
    title: 'Agents',
    url: '/agents',
    icon: Inbox,
  },
  {
    title: 'Calendar',
    url: '/calendar',
    icon: Calendar,
  },
  {
    title: 'Search',
    url: '/search',
    icon: Search,
  },
  {
    title: 'Settings',
    url: '/settings',
    icon: Settings,
  },
];

// This is sample data.
export const SidebarItemsCollapsible = {
  navMain: [
    {
      title: 'Playground',
      url: '#',
      icon: SquareTerminal,
      isActive: true,
      label: 'Platform',
      items: [
        {
          title: 'History',
          url: '#',
        },
        {
          title: 'Starred',
          url: '#',
        },
        {
          title: 'Settings',
          url: '#',
        },
      ],
    },
    {
      title: 'Models',
      url: '#',
      icon: Bot,
      items: [
        {
          title: 'Genesis',
          url: '#',
        },
        {
          title: 'Explorer',
          url: '#',
        },
        {
          title: 'Quantum',
          url: '#',
        },
      ],
    },
    {
      title: 'Documentation',
      url: '#',
      icon: BookOpen,
      items: [
        {
          title: 'Introduction',
          url: '#',
        },
        {
          title: 'Get Started',
          url: '#',
        },
        {
          title: 'Tutorials',
          url: '#',
        },
        {
          title: 'Changelog',
          url: '#',
        },
      ],
    },
    {
      title: 'Settings',
      url: '#',
      icon: Settings2,
      items: [
        {
          title: 'General',
          url: '#',
        },
        {
          title: 'Team',
          url: '#',
        },
        {
          title: 'Billing',
          url: '#',
        },
        {
          title: 'Limits',
          url: '#',
        },
      ],
    },
  ],
  projects: [
    {
      name: 'Design Engineering',
      url: '#',
      icon: Frame,
    },
    {
      name: 'Sales & Marketing',
      url: '#',
      icon: PieChart,
    },
    {
      name: 'Travel',
      url: '#',
      icon: Map,
    },
  ],
};

export enum PropertyTypeEnum {
  Rooms = "Rooms",
  Tinyhouse = "Tinyhouse",
  Apartment = "Apartment",
  Villa = "Villa",
  Townhouse = "Townhouse",
  Cottage = "Cottage",
}

export const PropertyTypeIcons: Record<PropertyTypeEnum, LucideIcon> = {
  Rooms: Home,
  Tinyhouse: Warehouse,
  Apartment: Building,
  Villa: Castle,
  Townhouse: Home,
  Cottage: Trees,
};
