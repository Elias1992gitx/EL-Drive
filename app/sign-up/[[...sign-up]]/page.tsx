'use client'

import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="w-full max-w-[400px]">
        <SignUp 
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "shadow-xl dark:bg-gray-800 rounded-xl max-h-[90vh] overflow-y-auto",
              formButtonPrimary: "bg-blue-500 hover:bg-blue-600 text-sm normal-case",
              footerAction: "pb-4",
              formFieldInput: "rounded-lg",
              socialButtonsBlockButton: "rounded-lg",
              socialButtonsProviderIcon: "mx-3",
              formFieldLabel: "text-gray-700 dark:text-gray-200",
              headerTitle: "text-gray-900 dark:text-white text-xl",
              headerSubtitle: "text-gray-600 dark:text-gray-300 text-sm",
              form: "space-y-4",
              formField: "space-y-1",
              internal: "px-4 py-6 sm:px-6 sm:py-8"
            }
          }}
          routing="path"
          path="/sign-up"
        />
      </div>
    </div>
  )
} 