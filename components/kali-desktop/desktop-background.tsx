"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { useKaliDesktop } from "@/contexts/kali-desktop-context"

export default function KaliDesktopBackground() {
  const { showContextMenu, openTerminal } = useKaliDesktop()
  const [time, setTime] = useState(new Date())

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 60000)
    return () => clearInterval(timer)
  }, [])

  const handleRightClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()

      showContextMenu(e.clientX, e.clientY, [
        {
          label: "New Terminal",
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="4 17 10 11 4 5"></polyline>
              <line x1="12" y1="19" x2="20" y2="19"></line>
            </svg>
          ),
          action: () => {
            openTerminal()
          },
        },
        {
          label: "New Folder",
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
            </svg>
          ),
          action: () => {},
          divider: true,
        },
        {
          label: "Display Settings",
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
              <line x1="8" y1="21" x2="16" y2="21"></line>
              <line x1="12" y1="17" x2="12" y2="21"></line>
            </svg>
          ),
          action: () => {},
        },
        {
          label: "Change Wallpaper",
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
          ),
          action: () => {},
        },
      ])
    },
    [openTerminal, showContextMenu],
  )

  return (
    <div className="absolute inset-0 z-0 bg-gray-900 flex items-center justify-center" onContextMenu={handleRightClick}>
      {/* Kali Linux background pattern */}
      <div className="absolute inset-0 bg-[#05080e] bg-opacity-95">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      </div>

      {/* Kali Linux logo watermark */}
      <div className="absolute bottom-10 right-10 opacity-10">
        <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M100 0C44.8 0 0 44.8 0 100C0 155.2 44.8 200 100 200C155.2 200 200 155.2 200 100C200 44.8 155.2 0 100 0ZM100 180C55.8 180 20 144.2 20 100C20 55.8 55.8 20 100 20C144.2 20 180 55.8 180 100C180 144.2 144.2 180 100 180Z"
            fill="#367BF0"
          />
          <path
            d="M100 40C66.9 40 40 66.9 40 100C40 133.1 66.9 160 100 160C133.1 160 160 133.1 160 100C160 66.9 133.1 40 100 40ZM100 140C78 140 60 122 60 100C60 78 78 60 100 60C122 60 140 78 140 100C140 122 122 140 100 140Z"
            fill="#367BF0"
          />
          <path
            d="M100 80C89 80 80 89 80 100C80 111 89 120 100 120C111 120 120 111 120 100C120 89 111 80 100 80Z"
            fill="#367BF0"
          />
        </svg>
      </div>

      {/* Desktop clock */}
      <div className="absolute top-10 right-10 text-white opacity-70">
        <div className="text-6xl font-light">{time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div>
        <div className="text-right text-lg">
          {time.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" })}
        </div>
      </div>
    </div>
  )
}
