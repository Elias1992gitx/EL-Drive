import { motion, AnimatePresence } from 'framer-motion'
import { 
  FolderIcon, 
  UsersIcon, 
  CogIcon,
  DocumentIcon,
  PresentationChartBarIcon,
  TableCellsIcon,
  ArrowUpTrayIcon
} from '@heroicons/react/24/outline'
import { useState } from 'react'
import AutomatedFolderDialog from './AutomatedFolderDialog'

interface SubMenuProps {
  type: 'folder' | 'document' | 'presentation' | 'spreadsheet' | 'upload'
  position: { top: number; left: number }
  onSelect: (item: { label: string; icon: any }) => void
}

const subMenuItems = {
  folder: [
    { icon: FolderIcon, label: 'Folder' },
    { icon: UsersIcon, label: 'Shared folder' },
    { icon: CogIcon, label: 'Automated folder' },
  ],
  document: [
    { icon: DocumentIcon, label: 'Blank document' },
    { icon: DocumentIcon, label: 'Template' },
    { icon: DocumentIcon, label: 'From template gallery' },
  ],
  presentation: [
    { icon: PresentationChartBarIcon, label: 'Blank presentation' },
    { icon: PresentationChartBarIcon, label: 'From template' },
  ],
  spreadsheet: [
    { icon: TableCellsIcon, label: 'Blank spreadsheet' },
    { icon: TableCellsIcon, label: 'From template' },
  ],
  upload: [
    { icon: ArrowUpTrayIcon, label: 'Files' },
    { icon: ArrowUpTrayIcon, label: 'Folder' },
  ]
}

export default function SubMenu({ type, position, onSelect }: SubMenuProps) {
  const items = subMenuItems[type] || []
  const [isAutomatedFolderDialogOpen, setIsAutomatedFolderDialogOpen] = useState(false)
  
  const handleItemClick = (item: { label: string; icon: any }) => {
    if (item.label === 'Automated folder') {
      setIsAutomatedFolderDialogOpen(true)
      return
    }
    onSelect(item)
  }
  
  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -10 }}
        style={{
          position: 'fixed',
          top: position.top,
          left: position.left,
        }}
        className="w-64 bg-white rounded-r-lg shadow-xl border-t border-r border-b border-gray-200 py-2 z-50"
      >
        {items.map((item) => (
          <motion.button
            key={item.label}
            whileHover={{ backgroundColor: '#F9FAFB' }}
            whileTap={{ backgroundColor: '#F3F4F6' }}
            onClick={() => handleItemClick(item)}
            className="w-full px-4 py-2 flex items-center gap-3 group transition-colors duration-150"
          >
            <item.icon className="h-5 w-5 text-gray-400 group-hover:text-gray-600" />
            <span className="flex-1 text-sm text-gray-700 group-hover:text-gray-900 text-left">
              {item.label}
            </span>
          </motion.button>
        ))}
      </motion.div>

      <AnimatePresence>
        {isAutomatedFolderDialogOpen && (
          <AutomatedFolderDialog 
            isOpen={isAutomatedFolderDialogOpen}
            onClose={() => setIsAutomatedFolderDialogOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  )
}