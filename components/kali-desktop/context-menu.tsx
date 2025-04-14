"use client"

import { useKaliDesktop } from "@/contexts/kali-desktop-context"

export default function KaliContextMenu() {
  const { contextMenu, hideContextMenu } = useKaliDesktop()

  if (!contextMenu.isOpen) {
    return null
  }

  return (
    <div
      className="fixed z-50 bg-gray-900 border border-blue-900 shadow-lg rounded overflow-hidden"
      style={{
        left: `${contextMenu.x}px`,
        top: `${contextMenu.y}px`,
        maxWidth: "250px",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="py-1">
        {contextMenu.items.map((item, index) => (
          <div key={index}>
            <div
              className="px-4 py-2 hover:bg-blue-900 hover:bg-opacity-50 cursor-pointer flex items-center"
              onClick={() => {
                hideContextMenu()
                item.action()
              }}
            >
              {item.icon && <span className="mr-3 text-blue-500">{item.icon}</span>}
              <span className="text-white text-sm">{item.label}</span>
            </div>
            {item.divider && <div className="border-t border-blue-900 my-1"></div>}
          </div>
        ))}
      </div>
    </div>
  )
}
