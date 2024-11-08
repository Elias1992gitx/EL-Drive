import { HomeIcon, FolderIcon, PlusCircleIcon, UserIcon } from '@heroicons/react/24/outline'

export default function MobileNav() {
  return (
    <nav className="mobile-nav">
      <div className="flex justify-around items-center">
        <button className="flex flex-col items-center gap-1">
          <HomeIcon className="h-6 w-6" />
          <span className="text-xs">Home</span>
        </button>
        <button className="flex flex-col items-center gap-1">
          <FolderIcon className="h-6 w-6" />
          <span className="text-xs">Files</span>
        </button>
        <button className="flex flex-col items-center gap-1">
          <PlusCircleIcon className="h-6 w-6" />
          <span className="text-xs">Create</span>
        </button>
        <button className="flex flex-col items-center gap-1">
          <UserIcon className="h-6 w-6" />
          <span className="text-xs">Profile</span>
        </button>
      </div>
    </nav>
  )
} 