import { Dialog } from '@headlessui/react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import {
  UserPlusIcon,
  XMarkIcon,
  EnvelopeIcon,
  LinkIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline'

interface InviteMemberDialogProps {
  isOpen: boolean
  onClose: () => void
}

export default function InviteMemberDialog({
  isOpen,
  onClose,
}: InviteMemberDialogProps) {
  const [email, setEmail] = useState('')
  const [inviteLink] = useState(
    'https://teamsync.com/invite?user=xyz789&role=member'
  )

  const members = [
    {
      name: 'Abebe Kebede',
      email: 'abekebede@gmail.com',
      role: 'Owner',
    },
    {
      name: 'Tigist Haile',
      email: 'tigisthaile@gmail.com',
      role: 'Can view',
    },
    {
      name: 'Dawit Mengistu',
      email: 'dawitmengistu@gmail.com',
      role: 'Can view',
    },
    {
      name: 'Yordanos Tekle',
      email: 'yordanostekle@gmail.com',
      role: 'Can view',
    },
    {
      name: 'Kidist Alemu',
      email: 'kidistalemu@gmail.com',
      role: 'Can view',
    },
  ]

  const handleInvite = () => {
    console.log('Inviting:', email)
    setEmail('')
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteLink)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          as={motion.div}
          static
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          open={isOpen}
          onClose={onClose}
          className="fixed inset-0 z-50 overflow-y-auto"
        >
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm"
            />

            <Dialog.Panel
              as={motion.div}
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative bg-white rounded-xl shadow-2xl w-[550px] h-[90vh] overflow-hidden"
            >
              <div className="p-6 h-full flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <motion.div
                      initial={{ rotate: -15, scale: 0.8 }}
                      animate={{ rotate: 0, scale: 1 }}
                      transition={{ type: 'spring' }}
                    >
                      <UserPlusIcon className="h-6 w-6 text-blue-500" />
                    </motion.div>
                    <Dialog.Title className="text-xl font-semibold text-gray-900">
                      Invite member
                    </Dialog.Title>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <XMarkIcon className="h-5 w-5 text-gray-500" />
                  </button>
                </div>

                <div className="space-y-2 mb-6">
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <div className="relative">
                    <EnvelopeIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter email address"
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 
                               focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleInvite}
                      disabled={!email}
                      className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 
                               bg-blue-500 text-white text-sm font-medium rounded-md
                               disabled:bg-gray-100 disabled:text-gray-400"
                    >
                      Send Invite
                    </motion.button>
                  </div>
                </div>

                <div className="space-y-2 mb-6 flex-1 overflow-y-auto">
                  <h3 className="text-sm font-medium text-gray-700 sticky top-0 bg-white py-2">
                    Members
                  </h3>
                  <div className="space-y-2">
                    {members.map((member) => (
                      <motion.div
                        key={member.email}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 
                                        flex items-center justify-center text-white font-medium"
                          >
                            {member.name[0]}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {member.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {member.email}
                            </div>
                          </div>
                        </div>
                        <button
                          className="px-3 py-1 text-sm text-gray-600 rounded-md hover:bg-gray-100 
                                         flex items-center gap-1"
                        >
                          {member.role}
                          <ChevronDownIcon className="h-4 w-4" />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 pt-4 border-t border-gray-100">
                  <h3 className="text-sm font-medium text-gray-700">
                    Share link
                  </h3>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={inviteLink}
                      readOnly
                      className="flex-1 px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-sm"
                    />
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleCopyLink}
                      className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm 
                               font-medium text-gray-600 hover:bg-gray-50 flex items-center gap-2"
                    >
                      <LinkIcon className="h-4 w-4" />
                      Copy
                    </motion.button>
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  )
}
