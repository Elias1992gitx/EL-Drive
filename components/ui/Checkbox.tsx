'use client'

import { motion } from 'framer-motion'

interface CheckboxProps {
  checked: boolean
  onChange: () => void
  label?: string
}

export function Checkbox({ checked, onChange, label }: CheckboxProps) {
  return (
    <motion.label className="flex items-center gap-2 cursor-pointer">
      <motion.div
        initial={false}
        animate={checked ? "checked" : "unchecked"}
        onClick={onChange}
        className={`w-5 h-5 rounded border transition-colors
          ${checked 
            ? 'bg-blue-500 border-blue-500' 
            : 'border-gray-300 dark:border-gray-600 hover:border-blue-500'
          }`}
      >
        {checked && (
          <motion.svg 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-5 h-5 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path d="M5 13l4 4L19 7" strokeWidth={2} />
          </motion.svg>
        )}
      </motion.div>
      {label && <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>}
    </motion.label>
  )
}