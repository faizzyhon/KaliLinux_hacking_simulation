"use client"

import { useKaliDesktop } from "@/contexts/kali-desktop-context"
import { Terminal, Wifi, Lock, FileText, User, Zap } from "lucide-react"

export default function KaliDesktopIcons() {
  const {
    openTerminal,
    openFileManager,
    openNetworkScanner,
    openExploitTool,
    openPasswordCracker,
    openSocialEngineering,
  } = useKaliDesktop()

  const icons = [
    { name: "Terminal", icon: Terminal, action: openTerminal },
    { name: "File Manager", icon: FileText, action: openFileManager },
    { name: "Network Scanner", icon: Wifi, action: openNetworkScanner },
    { name: "Exploit Tool", icon: Zap, action: openExploitTool },
    { name: "Password Cracker", icon: Lock, action: openPasswordCracker },
    { name: "Social Engineering", icon: User, action: openSocialEngineering },
  ]

  return (
    <div className="absolute top-4 left-4 z-10 flex flex-col space-y-6">
      {icons.map((icon, index) => (
        <div
          key={index}
          className="flex flex-col items-center text-blue-500 hover:text-blue-400 cursor-pointer group"
          onClick={(e) => {
            e.stopPropagation()
            icon.action()
          }}
        >
          <div className="w-16 h-16 flex items-center justify-center rounded group-hover:bg-blue-900 group-hover:bg-opacity-20">
            <icon.icon className="w-10 h-10" />
          </div>
          <span className="text-xs mt-1 px-2 py-1 rounded group-hover:bg-blue-900 group-hover:bg-opacity-50">
            {icon.name}
          </span>
        </div>
      ))}
    </div>
  )
}
