"use client"

import { useKaliDesktop } from "@/contexts/kali-desktop-context"
import KaliWindow from "./window"

export default function KaliWindowManager() {
  const { windows } = useKaliDesktop()

  return (
    <div className="absolute inset-0 z-20 pointer-events-none">
      {windows.map((window) => (
        <KaliWindow key={window.id} window={window} />
      ))}
    </div>
  )
}
