import { motion } from 'framer-motion'
import Link from 'next/link'
import { FaFacebook, FaLinkedin, FaInstagram, FaYoutube } from 'react-icons/fa'

const navigationLinks = {
  company: [
    { name: 'About', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Press', href: '#' },
  ],
  resources: [
    { name: 'Documentation', href: '#' },
    { name: 'Help Center', href: '#' },
    { name: 'Contact', href: '#' },
    { name: 'Partners', href: '#' },
  ],
  social: [
    { 
      name: 'Facebook', 
      href: '#', 
      icon: <FaFacebook className="w-5 h-5 sm:w-6 sm:h-6" />
    },
    { 
      name: 'LinkedIn', 
      href: '#', 
      icon: <FaLinkedin className="w-5 h-5 sm:w-6 sm:h-6" />
    },
    { 
      name: 'Instagram', 
      href: '#', 
      icon: <FaInstagram className="w-5 h-5 sm:w-6 sm:h-6" />
    },
    { 
      name: 'YouTube', 
      href: '#', 
      icon: <FaYoutube className="w-5 h-5 sm:w-6 sm:h-6" />
    },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-[#0A0B1E] text-white py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-6 md:mb-0 w-full md:w-auto">
            <div className="w-10 h-10 bg-white rounded-full" />
            <span className="text-sm text-center sm:text-left">Sign up for updates and news</span>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <input
              type="email"
              placeholder="Sign up with your e-mail..."
              className="px-4 sm:px-6 py-3 bg-[#1A1B2E] rounded-full text-sm w-full sm:w-[300px]"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-sm font-medium w-full sm:w-auto"
            >
              Subscribe →
            </motion.button>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div className="text-center sm:text-left">
            <img src="/ELST.svg" alt="Logo" className="h-12 sm:h-16 mx-auto sm:mx-0" />
            <p className="mt-4 text-sm text-gray-400 max-w-sm mx-auto sm:mx-0">
              Empowering your digital workspace with next-generation cloud storage solutions.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 gap-8 col-span-1 sm:col-span-2 md:col-span-1">
            <div>
              <h3 className="text-sm font-semibold mb-4 sm:mb-8 text-center sm:text-left">Company</h3>
              <ul className="space-y-3">
                {navigationLinks.company.map((link) => (
                  <li key={link.name} className="text-center sm:text-left">
                    <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-4 sm:mb-8 text-center sm:text-left">Resources</h3>
              <ul className="space-y-3">
                {navigationLinks.resources.map((link) => (
                  <li key={link.name} className="text-center sm:text-left">
                    <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Social Links */}
          <div className="text-center sm:text-left">
            <h3 className="text-sm font-semibold mb-4 sm:mb-8">Connect With Us</h3>
            <div className="flex justify-center sm:justify-start gap-4">
              {navigationLinks.social.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center sm:text-left">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} ELST. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
