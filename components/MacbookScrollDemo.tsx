import React from 'react'
import { MacbookScroll } from './ui/macbook-scroll'

export function MacbookScrollDemo() {
  return (
    <div className="overflow-hidden bg-transparent w-full">
      <MacbookScroll
        title={
          <span className="text-gray-900">
            Your files, anywhere, anytime. <br />
            Secure and seamless.
          </span>
        }
        src="/ELST.svg"
        showGradient={false}
      />
    </div>
  )
}
