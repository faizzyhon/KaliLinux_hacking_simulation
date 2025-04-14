"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Maximize2, Minimize2, X, Minus } from "lucide-react"
import { useKaliDesktop, type KaliWindow as KaliWindowType } from "@/contexts/kali-desktop-context"

interface KaliWindowProps {
  window: KaliWindowType
}

export default function KaliWindow({ window }: KaliWindowProps) {
  const { activateWindow, closeWindow, minimizeWindow, maximizeWindow, restoreWindow, updateWindowPosition } =
    useKaliDesktop()

  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [resizeDirection, setResizeDirection] = useState<string | null>(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [initialSize, setInitialSize] = useState({ width: 0, height: 0 })
  const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 })
  const [initialPointer, setInitialPointer] = useState({ x: 0, y: 0 })

  const windowRef = useRef<HTMLDivElement>(null)

  // Handle window activation on click
  const handleWindowClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!window.isActive) {
      activateWindow(window.id)
    }
  }

  // Start dragging the window
  const handleDragStart = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()

    if (window.isMaximized) return

    setIsDragging(true)
    setDragOffset({
      x: e.clientX - window.position.x,
      y: e.clientY - window.position.y,
    })

    // Activate window if it's not already active
    if (!window.isActive) {
      activateWindow(window.id)
    }
  }

  // Start resizing the window
  const handleResizeStart = (e: React.MouseEvent, direction: string) => {
    e.stopPropagation()
    e.preventDefault()

    if (window.isMaximized) return

    setIsResizing(true)
    setResizeDirection(direction)
    setInitialSize({
      width: window.position.width,
      height: window.position.height,
    })
    setInitialPosition({
      x: window.position.x,
      y: window.position.y,
    })
    setInitialPointer({
      x: e.clientX,
      y: e.clientY,
    })

    // Activate window if it's not already active
    if (!window.isActive) {
      activateWindow(window.id)
    }
  }

  // Handle mouse move for dragging and resizing
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        updateWindowPosition(window.id, {
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y,
        })
      } else if (isResizing) {
        const deltaX = e.clientX - initialPointer.x
        const deltaY = e.clientY - initialPointer.y

        let newWidth = initialSize.width
        let newHeight = initialSize.height
        let newX = initialPosition.x
        let newY = initialPosition.y

        // Handle different resize directions
        if (resizeDirection?.includes("e")) {
          newWidth = Math.max(300, initialSize.width + deltaX)
        }
        if (resizeDirection?.includes("w")) {
          const widthChange = Math.min(initialSize.width - 300, deltaX)
          newWidth = initialSize.width - widthChange
          newX = initialPosition.x + widthChange
        }
        if (resizeDirection?.includes("s")) {
          newHeight = Math.max(200, initialSize.height + deltaY)
        }
        if (resizeDirection?.includes("n")) {
          const heightChange = Math.min(initialSize.height - 200, deltaY)
          newHeight = initialSize.height - heightChange
          newY = initialPosition.y + heightChange
        }

        updateWindowPosition(window.id, {
          x: newX,
          y: newY,
          width: newWidth,
          height: newHeight,
        })
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      setIsResizing(false)
      setResizeDirection(null)
    }

    if (isDragging || isResizing) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [
    isDragging,
    isResizing,
    dragOffset,
    initialSize,
    initialPosition,
    initialPointer,
    resizeDirection,
    updateWindowPosition,
    window.id,
  ])

  // Don't render minimized windows
  if (window.isMinimized) {
    return null
  }

  return (
    <motion.div
      ref={windowRef}
      className={`absolute pointer-events-auto rounded-md overflow-hidden shadow-lg border ${
        window.isActive ? "border-blue-600" : "border-gray-700"
      }`}
      style={{
        left: window.isMaximized ? 0 : window.position.x,
        top: window.isMaximized ? 0 : window.position.y,
        width: window.isMaximized ? "100%" : window.position.width,
        height: window.isMaximized ? "calc(100% - 40px)" : window.position.height,
        zIndex: window.zIndex,
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.1 }}
      onClick={handleWindowClick}
    >
      {/* Window title bar */}
      <div
        className={`h-8 flex items-center justify-between px-2 ${window.isActive ? "bg-blue-900" : "bg-gray-800"}`}
        onMouseDown={handleDragStart}
      >
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4">
            {window.icon && (
              <img src={window.icon || "/placeholder.svg"} alt={window.title} className="w-full h-full" />
            )}
          </div>
          <div className="text-white text-sm font-medium truncate">{window.title}</div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            className="text-gray-300 hover:text-white focus:outline-none"
            onClick={(e) => {
              e.stopPropagation()
              minimizeWindow(window.id)
            }}
          >
            <Minus size={14} />
          </button>
          <button
            className="text-gray-300 hover:text-white focus:outline-none"
            onClick={(e) => {
              e.stopPropagation()
              if (window.isMaximized) {
                restoreWindow(window.id)
              } else {
                maximizeWindow(window.id)
              }
            }}
          >
            {window.isMaximized ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
          </button>
          <button
            className="text-gray-300 hover:text-red-500 focus:outline-none"
            onClick={(e) => {
              e.stopPropagation()
              closeWindow(window.id)
            }}
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Window content */}
      <div className="bg-gray-900 h-[calc(100%-32px)] overflow-hidden">{window.content}</div>

      {/* Resize handles (only when not maximized) */}
      {!window.isMaximized && (
        <>
          <div
            className="absolute top-0 left-0 w-4 h-4 cursor-nw-resize"
            onMouseDown={(e) => handleResizeStart(e, "nw")}
          />
          <div
            className="absolute top-0 right-0 w-4 h-4 cursor-ne-resize"
            onMouseDown={(e) => handleResizeStart(e, "ne")}
          />
          <div
            className="absolute bottom-0 left-0 w-4 h-4 cursor-sw-resize"
            onMouseDown={(e) => handleResizeStart(e, "sw")}
          />
          <div
            className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
            onMouseDown={(e) => handleResizeStart(e, "se")}
          />
          <div
            className="absolute top-0 left-4 right-4 h-2 cursor-n-resize"
            onMouseDown={(e) => handleResizeStart(e, "n")}
          />
          <div
            className="absolute bottom-0 left-4 right-4 h-2 cursor-s-resize"
            onMouseDown={(e) => handleResizeStart(e, "s")}
          />
          <div
            className="absolute left-0 top-4 bottom-4 w-2 cursor-w-resize"
            onMouseDown={(e) => handleResizeStart(e, "w")}
          />
          <div
            className="absolute right-0 top-4 bottom-4 w-2 cursor-e-resize"
            onMouseDown={(e) => handleResizeStart(e, "e")}
          />
        </>
      )}
    </motion.div>
  )
}
