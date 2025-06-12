import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";

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
