"use client"

import { useEffect } from "react"
import { KaliDesktopProvider } from "@/contexts/kali-desktop-context"
import KaliDesktopBackground from "./desktop-background"
import KaliTaskbar from "./taskbar"
import KaliStartMenu from "./start-menu"
import KaliWindowManager from "./window-manager"
import KaliDesktopIcons from "./desktop-icons"
import KaliNotifications from "./notifications"
import KaliContextMenu from "./context-menu"
import KaliSearch from "./search"
import KaliLockScreen from "./lock-screen"
import KaliWorkspaceIndicator from "./workspace-indicator"
import KaliAdBanner from "./ad-banner"

export default function KaliDesktop() {
  // Prevent context menu on right-click for the whole desktop
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()
    }

    document.addEventListener("contextmenu", handleContextMenu)
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu)
    }
  }, [])

  return (
    <KaliDesktopProvider>
      <div className="fixed inset-0 overflow-hidden select-none">
        <KaliDesktopBackground />
        <KaliDesktopIcons />
        <KaliWindowManager />
        <KaliWorkspaceIndicator />
        <KaliTaskbar />
        <KaliStartMenu />
        <KaliSearch />
        <KaliNotifications />
        <KaliContextMenu />
        <KaliLockScreen />
        <KaliAdBanner />
      </div>
    </KaliDesktopProvider>
  )
}
