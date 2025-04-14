"use client"

import { useState } from "react"
import { X } from "lucide-react"

export default function KaliAdBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) {
    return null
  }

  return (
    <div className="fixed bottom-12 left-1/2 transform -translate-x-1/2 z-40 bg-gray-900 border border-blue-900 rounded-lg shadow-lg overflow-hidden w-full max-w-2xl">
      <div className="flex items-center justify-between p-2 bg-blue-900 bg-opacity-50">
        <div className="text-white text-sm font-medium">Sponsored</div>
        <button className="text-gray-300 hover:text-white" onClick={() => setIsVisible(false)}>
          <X size={16} />
        </button>
      </div>

      <div className="p-4 flex items-center">
        <div className="flex-1">
          <div className="text-white font-medium mb-1">Support the Developer</div>
          <div className="text-gray-300 text-sm mb-2">
            Help maintain this Kali Linux simulation by supporting Muhammad Faizan
          </div>
          <a
            href="https://faizzyhon.pocketsflow.com/source-code"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-3 py-1 bg-blue-700 text-white text-sm rounded hover:bg-blue-600"
          >
            Donate Now
          </a>
        </div>

        <div className="ml-4 flex-shrink-0">
          <div className="w-24 h-24 bg-blue-900 rounded flex items-center justify-center">
            <svg width="60" height="60" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M100 0C44.8 0 0 44.8 0 100C0 155.2 44.8 200 100 200C155.2 200 200 155.2 200 100C200 44.8 155.2 0 100 0Z"
                fill="#367BF0"
              />
              <path
                d="M100 40C66.9 40 40 66.9 40 100C40 133.1 66.9 160 100 160C133.1 160 160 133.1 160 100C160 66.9 133.1 40 100 40Z"
                fill="#05080e"
              />
              <path
                d="M100 80C89 80 80 89 80 100C80 111 89 120 100 120C111 120 120 111 120 100C120 89 111 80 100 80Z"
                fill="#367BF0"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* This div would be replaced with actual AdSense code in production */}
      <div className="h-16 bg-gray-800 flex items-center justify-center text-gray-500 text-sm">
        AdSense Placeholder - 728x90
      </div>
    </div>
  )
}
