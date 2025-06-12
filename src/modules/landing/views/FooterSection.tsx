'use client'
import { navLinks, policyLinks, socialLinks } from "@/lib/constants"
import Link from "next/link"

export const FooterSection = () => {
  return (
    <footer className="border-t border-gray-200 py-20">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4">
            <Link href="/" className="text-xl font-bold" scroll={false}>
              RENTIFUL
            </Link>
          </div>

          <nav className="mb-4">
            <ul className="flex space-x-6">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.text}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex space-x-4 mb-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href="#"
                aria-label={social.label}
                className="hover:text-primary-600"
              >
                <social.icon className="h-6 w-6" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-4 text-center text-sm text-gray-500 flex justify-center space-x-4">
          <span>© RENTiful. All rights reserved.</span>
          {policyLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.text}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}
