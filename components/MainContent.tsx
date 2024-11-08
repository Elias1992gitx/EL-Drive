import { motion } from 'framer-motion';
import ActionButtons from './ActionButtons';
import { 
  PlusIcon, 
  ArrowUpTrayIcon,
  FolderIcon,
  HomeIcon,
  UserIcon,
  DocumentIcon
} from '@heroicons/react/24/outline'

export default function MainContent() {
  return (
    <main className="pt-16 pb-24 lg:pb-8 lg:pl-[240px]">
      {/* Quick Actions Row */}
      <div className="px-4 py-3 flex items-center gap-3 overflow-x-auto no-scrollbar">
        <button className="primary-button whitespace-nowrap">
          <PlusIcon className="h-5 w-5" />
          <span className="hidden sm:inline">Create</span>
        </button>
        <button className="secondary-button whitespace-nowrap">
          <ArrowUpTrayIcon className="h-5 w-5" />
          <span className="hidden sm:inline">Upload</span>
        </button>
      </div>

      {/* Suggested Section */}
      <div className="px-4 mt-4">
        <h2 className="text-sm font-medium text-gray-700 mb-3">
          Suggested from your activity
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {/* Folder Item */}
          <div className="p-3 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3">
              <FolderIcon className="h-10 w-10 text-blue-400" />
              <div>
                <p className="font-medium">ASMobbin</p>
                <p className="text-sm text-gray-500">Folder • ASMobbin</p>
              </div>
            </div>
          </div>
          
          {/* PDF Item */}
          <div className="p-3 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3">
              <DocumentIcon className="h-10 w-10 text-gray-400" />
              <div>
                <p className="font-medium">PDF File</p>
                <p className="text-sm text-gray-500">PDF • ASMobbin Team F...</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation - Mobile Only */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 lg:hidden">
        <div className="flex justify-around items-center h-16">
          <button className="flex flex-col items-center gap-1">
            <HomeIcon className="h-6 w-6" />
            <span className="text-xs">Home</span>
          </button>
          <button className="flex flex-col items-center gap-1">
            <FolderIcon className="h-6 w-6" />
            <span className="text-xs">Files</span>
          </button>
          <button className="flex flex-col items-center gap-1">
            <PlusIcon className="h-6 w-6" />
            <span className="text-xs">Create</span>
          </button>
          <button className="flex flex-col items-center gap-1">
            <UserIcon className="h-6 w-6" />
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </nav>
    </main>
  )
} 