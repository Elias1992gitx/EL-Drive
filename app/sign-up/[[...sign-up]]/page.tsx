'use client'

import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md p-4 sm:p-8 transform -translate-y-16">
        <SignUp appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "shadow-xl dark:bg-gray-800 rounded-xl",
            formButtonPrimary: "bg-blue-500 hover:bg-blue-600 text-sm normal-case",
            footerAction: "pb-6",
            formFieldInput: "rounded-lg",
            socialButtonsBlockButton: "rounded-lg",
            socialButtonsProviderIcon: "mx-3",
            formFieldLabel: "text-gray-700 dark:text-gray-200",
            headerTitle: "text-gray-900 dark:text-white",
            headerSubtitle: "text-gray-600 dark:text-gray-300"
          }
        }} />
      </div>
    </div>
  );
} 