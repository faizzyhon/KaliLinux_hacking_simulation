"use client"

import { useKaliDesktop } from "@/contexts/kali-desktop-context"
import {
  Terminal,
  Wifi,
  Lock,
  FileText,
  User,
  Zap,
  Settings,
  Power,
  Info,
  Activity,
  Globe,
  Database,
  Shield,
  Code,
  Search,
  Radio,
  Bookmark,
  Coffee,
} from "lucide-react"

export default function KaliStartMenu() {
  const {
    isStartMenuOpen,
    closeStartMenu,
    openTerminal,
    openFileManager,
    openNetworkScanner,
    openExploitTool,
    openPasswordCracker,
    openSocialEngineering,
    openSystemMonitor,
    openNetworkMonitor,
    openWebBrowser,
    openSettings,
    openAbout,
    openDonationPage,
    addNotification,
    lockScreen,
  } = useKaliDesktop()

  if (!isStartMenuOpen) {
    return null
  }

  const menuItems = [
    {
      category: "Favorites",
      items: [
        { name: "Terminal", icon: Terminal, action: openTerminal },
        { name: "File Manager", icon: FileText, action: openFileManager },
        { name: "Web Browser", icon: Globe, action: openWebBrowser },
        { name: "Settings", icon: Settings, action: openSettings },
      ],
    },
    {
      category: "Penetration Testing",
      items: [
        { name: "Network Scanner", icon: Wifi, action: openNetworkScanner },
        { name: "Exploit Tool", icon: Zap, action: openExploitTool },
        { name: "Password Cracker", icon: Lock, action: openPasswordCracker },
        { name: "Social Engineering", icon: User, action: openSocialEngineering },
        {
          name: "Metasploit Framework",
          icon: Code,
          action: () => {
            addNotification("Metasploit Framework not implemented in this demo")
            closeStartMenu()
          },
        },
        {
          name: "Burp Suite",
          icon: Shield,
          action: () => {
            addNotification("Burp Suite not implemented in this demo")
            closeStartMenu()
          },
        },
        {
          name: "Wireshark",
          icon: Activity,
          action: () => {
            addNotification("Wireshark not implemented in this demo")
            closeStartMenu()
          },
        },
        {
          name: "Aircrack-ng",
          icon: Radio,
          action: () => {
            addNotification("Aircrack-ng not implemented in this demo")
            closeStartMenu()
          },
        },
      ],
    },
    {
      category: "System Tools",
      items: [
        { name: "System Monitor", icon: Activity, action: openSystemMonitor },
        { name: "Network Monitor", icon: Globe, action: openNetworkMonitor },
        {
          name: "Disk Utility",
          icon: Database,
          action: () => {
            addNotification("Disk Utility not implemented in this demo")
            closeStartMenu()
          },
        },
        {
          name: "Software Center",
          icon: Bookmark,
          action: () => {
            addNotification("Software Center not implemented in this demo")
            closeStartMenu()
          },
        },
      ],
    },
    {
      category: "System",
      items: [
        { name: "Settings", icon: Settings, action: openSettings },
        { name: "About", icon: Info, action: openAbout },
        { name: "Lock", icon: Coffee, action: lockScreen },
        { name: "Support Developer", icon: User, action: openDonationPage },
        {
          name: "Power",
          icon: Power,
          action: () => {
            addNotification("Power options not implemented in this demo")
            closeStartMenu()
          },
        },
      ],
    },
  ]

  const handleItemClick = (action: () => void) => {
    action()
    closeStartMenu()
  }

  return (
    <div
      className="fixed bottom-10 left-0 w-80 bg-gray-900 border border-blue-900 rounded-t-md shadow-lg z-40"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="p-2 border-b border-blue-900">
        <div className="flex items-center space-x-2">
          <svg width="24" height="24" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
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
          <div>
            <div className="text-white text-sm font-medium">Kali Linux</div>
            <div className="text-gray-400 text-xs">GUI Simulation</div>
          </div>
        </div>
      </div>

      <div className="max-h-[calc(100vh-150px)] overflow-y-auto">
        <div className="p-2">
          <div className="relative mb-2">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
            <input
              type="text"
              placeholder="Type to search..."
              className="w-full bg-gray-800 border border-gray-700 rounded pl-8 pr-2 py-1 text-white text-sm focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {menuItems.map((category, index) => (
          <div key={index} className="p-2">
            <div className="text-gray-400 text-xs uppercase tracking-wider mb-1">{category.category}</div>
            <div className="grid grid-cols-2 gap-1">
              {category.items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className="flex items-center space-x-2 p-2 rounded hover:bg-blue-900 hover:bg-opacity-50 cursor-pointer"
                  onClick={() => handleItemClick(item.action)}
                >
                  <item.icon className="w-5 h-5 text-blue-500" />
                  <span className="text-white text-sm">{item.name}</span>
                </div>
              ))}
            </div>
            {index < menuItems.length - 1 && <div className="border-b border-blue-900 my-2"></div>}
          </div>
        ))}
      </div>

      <div className="p-2 border-t border-blue-900 flex items-center">
        <div className="w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center text-white mr-2">MF</div>
        <div>
          <div className="text-white text-sm">Muhammad Faizan</div>
          <div className="text-gray-400 text-xs">faizzyhon@gmail.com</div>
        </div>
      </div>
    </div>
  )
}
