'use client'

import { motion } from 'framer-motion'
import { EyeIcon, FolderIcon, DocumentIcon } from '@heroicons/react/24/outline'
import { useMediaQuery } from '@/hooks/useMediaQuery'

export default function SuggestedActivity() {
  const isMobile = useMediaQuery('(max-width: 640px)')
  
  return (
    <div className="px-4 py-4 sm:py-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <EyeIcon className="h-4 w-4 text-gray-400" />
          <h2 className="text-sm font-medium text-gray-900">
            Suggested from your activity
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          <ActivityCard
            icon={FolderIcon}
            iconColor="text-blue-400"
            title="ASMobbi... Folder"
            subtitle="Folder • ASMobbin"
          />
          <ActivityCard
            icon={DocumentIcon}
            iconColor="text-gray-400"
            title="PDF File"
            subtitle="PDF • ASMobbin Team Folder"
          />
        </div>
      </motion.div>
    </div>
  )
}

interface ActivityCardProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  iconColor: string
  title: string
  subtitle: string
}

function ActivityCard({ icon: Icon, iconColor, title, subtitle }: ActivityCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="p-4 rounded-lg border border-gray-200 bg-white hover:shadow-sm 
                 transition-all duration-200 cursor-pointer"
    >
      <div className="mb-3">
        <Icon className={`h-10 w-10 sm:h-12 sm:w-12 ${iconColor}`} />
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-900 truncate">{title}</h3>
        <p className="text-xs text-gray-500 mt-0.5 truncate">{subtitle}</p>
      </div>
    </motion.div>
  )
} 