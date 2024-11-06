import { Fragment } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FolderIcon,
  DocumentIcon,
  VideoCameraIcon,
  PresentationChartBarIcon,
  TableCellsIcon,
  GlobeAltIcon,
  ArrowUpTrayIcon,
  InboxIcon,
  ArrowTopRightOnSquareIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline'
import { useState } from 'react'
import SubMenu from './SubMenu'

interface CreateMenuProps {
  isOpen: boolean
  onClose: () => void
  anchorEl: HTMLElement | null
}

const menuItems = [
  {
    section: 'Create',
    items: [
      { icon: FolderIcon, label: 'Folder', hasSubmenu: true },
      { icon: DocumentIcon, label: 'Document', hasSubmenu: true },
      { icon: VideoCameraIcon, label: 'Screen recording' },
      { icon: PresentationChartBarIcon, label: 'Presentation', hasSubmenu: true },
      { icon: TableCellsIcon, label: 'Spreadsheet', hasSubmenu: true },
      { icon: GlobeAltIcon, label: 'Web shortcut' },
    ]
  },
  {
    section: 'Add',
    items: [
      { icon: ArrowUpTrayIcon, label: 'Upload', hasSubmenu: true },
      { icon: InboxIcon, label: 'Send file request' },
      { icon: ArrowTopRightOnSquareIcon, label: 'Import from Google Drive' },
    ]
  }
]

export default function CreateMenu({ isOpen, onClose, anchorEl }: CreateMenuProps) {
  const [activeSubmenu, setActiveSubmenu] = useState<{
    type: string;
    position: { top: number; left: number };
  } | null>(null)

  const handleItemClick = (item: any) => {
    if (!item.hasSubmenu) {
      onClose()
    }
  }

  const handleMouseEnter = (e: React.MouseEvent, item: any) => {
    if (item.hasSubmenu) {
      const rect = e.currentTarget.getBoundingClientRect()
      setActiveSubmenu({
        type: item.label.toLowerCase(),
        position: {
          top: rect.top,
          left: rect.right - 2,
        }
      })
    } else {
      setActiveSubmenu(null)
    }
  }

  const handleSubMenuSelect = (item: { label: string; icon: any }) => {
    if (item.label !== 'Automated folder') {
      setActiveSubmenu(null)
      onClose()
    }
  }

  if (!anchorEl) return null
  const rect = anchorEl.getBoundingClientRect()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40"
          />
          
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.1 }}
              style={{
                position: 'fixed',
                top: rect.bottom + 8,
                left: rect.left,
                zIndex: 50,
              }}
              className="w-72 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden main-menu"
            >
              {menuItems.map((section, index) => (
                <Fragment key={section.section}>
                  {index > 0 && <div className="h-[1px] bg-gray-100 mx-3" />}
                  <div className="py-2">
                    <div className="px-4 py-1.5">
                      <p className="text-xs font-medium text-gray-500">{section.section}</p>
                    </div>
                    {section.items.map((item) => (
                      <motion.button
                        key={item.label}
                        onClick={() => handleItemClick(item)}
                        onMouseEnter={(e) => handleMouseEnter(e, item)}
                        data-active={activeSubmenu?.type === item.label.toLowerCase()}
                        className="w-full px-4 py-2 flex items-center gap-3 hover:bg-gray-50 group relative"
                      >
                        <item.icon className="h-5 w-5 text-gray-400 group-hover:text-gray-600" />
                        <span className="flex-1 text-sm text-gray-700 text-left">
                          {item.label}
                        </span>
                        {item.hasSubmenu && (
                          <ChevronRightIcon className="h-4 w-4 text-gray-400" />
                        )}
                      </motion.button>
                    ))}
                  </div>
                </Fragment>
              ))}
            </motion.div>

            <AnimatePresence>
              {activeSubmenu && (
                <SubMenu 
                  type={activeSubmenu.type as 'folder' | 'document' | 'presentation' | 'spreadsheet' | 'upload'}
                  position={activeSubmenu.position}
                  onSelect={handleSubMenuSelect}
                />
              )}
            </AnimatePresence>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}