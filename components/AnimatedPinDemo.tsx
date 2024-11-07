'use client'
import React from 'react'
import { PinContainer } from './ui/3d-pin'
import Image from 'next/image'

export function AnimatedPinDemo() {
  return (
    <div className="h-[40rem] w-full flex items-center justify-center bg-transparent">
      <div onClick={() => window.open('', '_blank')}>
        <PinContainer
          title="EL-DRIVE"
          href=""
        >
          <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem]">
            <h3 className="max-w-xs !pb-2 !m-0 font-bold text-base text-slate-100">
              EL-DRIVE
            </h3>
            <div className="text-base !m-0 !p-0 font-normal">
              <span className="text-slate-500">
                EAGLELION SYSTEM TECHNOLOGY TEST PROJECT
              </span>
            </div>
            <div className="flex flex-1 w-full items-center justify-center mt-4">
              <Image
                src="/elg.png" // Replace with your logo path
                alt="EL-DRIVE Logo"
                width={150}
                height={150}
                className="rounded-lg object-contain"
              />
            </div>
          </div>
        </PinContainer>
      </div>
    </div>
  )
}
