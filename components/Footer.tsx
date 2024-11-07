import { motion } from 'framer-motion'
import Link from 'next/link'

const navigationLinks = {
 

  social: [
    { name: 'Facebook', href: '#', icon: 'facebook.svg' },
    { name: 'LinkedIn', href: '#', icon: 'linkedin.svg' },
    { name: 'Instagram', href: '#', icon: 'instagram.svg' },
    { name: 'YouTube', href: '#', icon: 'youtube.svg' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-[#0A0B1E] text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12">
          <div className="flex items-center gap-4 mb-6 md:mb-0">
            <div className="w-10 h-10 bg-white rounded-full" />
            <span className="text-sm">Sign up for updates and news</span>
          </div>
          
          <div className="flex gap-4">
            <input
              type="email"
              placeholder="Sign up with your e-mail..."
              className="px-6 py-3 bg-[#1A1B2E] rounded-full text-sm min-w-[300px]"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-sm font-medium"
            >
              Subscribe →
            </motion.button>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo */}
          <div>
            <img src="/ELST.svg" alt="Logo" className="h-8" />
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              
            </div>
            <div>
              
            </div>
          </div>

          {/* Social Links */}
          <div className="flex justify-end gap-4">
            {navigationLinks.social.map((social) => (
              <Link key={social.name} href={social.href}>
                <img src={`/icons/${social.icon}`} alt={social.name} className="h-6 w-6" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
