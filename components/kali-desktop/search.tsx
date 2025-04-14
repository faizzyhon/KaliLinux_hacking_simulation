"use client"

import { useState, useEffect } from "react"
import { useKaliDesktop } from "@/contexts/kali-desktop-context"
import { Search, Terminal, FileText, Wifi, Zap, Lock, User, Activity, Globe, Settings, Info } from "lucide-react"

export default function KaliSearch() {
  const {
    isSearchOpen,
    toggleSearch,
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
  } = useKaliDesktop()

  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])

  const applications = [
    {
      name: "Terminal",
      icon: Terminal,
      action: openTerminal,
      keywords: ["terminal", "console", "command", "cmd", "shell", "bash"],
    },
    {
      name: "File Manager",
      icon: FileText,
      action: openFileManager,
      keywords: ["file", "folder", "explorer", "browse", "document"],
    },
    {
      name: "Network Scanner",
      icon: Wifi,
      action: openNetworkScanner,
      keywords: ["network", "scan", "wifi", "ethernet", "ip", "nmap"],
    },
    {
      name: "Exploit Tool",
      icon: Zap,
      action: openExploitTool,
      keywords: ["exploit", "hack", "vulnerability", "metasploit", "attack"],
    },
    {
      name: "Password Cracker",
      icon: Lock,
      action: openPasswordCracker,
      keywords: ["password", "crack", "hash", "brute", "force", "dictionary"],
    },
    {
      name: "Social Engineering",
      icon: User,
      action: openSocialEngineering,
      keywords: ["social", "engineering", "phishing", "spoof"],
    },
    {
      name: "System Monitor",
      icon: Activity,
      action: openSystemMonitor,
      keywords: [
        "system",
        "monitor",
        "process",
        "cpu",
        "memory",
        'resource"]  action: openSystemMonitor, keywords: ["system',
        "monitor",
        "process",
        "cpu",
        "memory",
        "resource",
      ],
    },
    {
      name: "Network Monitor",
      icon: Globe,
      action: openNetworkMonitor,
      keywords: ["network", "traffic", "monitor", "packet", "connection"],
    },
    {
      name: "Web Browser",
      icon: Globe,
      action: openWebBrowser,
      keywords: ["web", "browser", "internet", "www", "http"],
    },
    {
      name: "Settings",
      icon: Settings,
      action: openSettings,
      keywords: ["settings", "preferences", "config", "options"],
    },
    { name: "About", icon: Info, action: openAbout, keywords: ["about", "info", "information", "version", "help"] },
  ]

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([])
      return
    }

    const query = searchQuery.toLowerCase()
    const results = applications.filter(
      (app) => app.name.toLowerCase().includes(query) || app.keywords.some((keyword) => keyword.includes(query)),
    )

    setSearchResults(results)
  }, [searchQuery])

  if (!isSearchOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-blue-900 rounded-lg shadow-lg w-full max-w-2xl overflow-hidden">
        <div className="p-4 flex items-center border-b border-blue-900">
          <Search className="w-5 h-5 text-blue-500 mr-3" />
          <input
            type="text"
            className="bg-transparent border-none outline-none text-white flex-1"
            placeholder="Search applications..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
          />
        </div>

        <div className="max-h-96 overflow-y-auto">
          {searchResults.length > 0 ? (
            <div className="p-2">
              {searchResults.map((app, index) => (
                <div
                  key={index}
                  className="flex items-center p-2 hover:bg-blue-900 hover:bg-opacity-50 rounded cursor-pointer"
                  onClick={() => {
                    app.action()
                    toggleSearch()
                  }}
                >
                  <app.icon className="w-6 h-6 text-blue-500 mr-3" />
                  <span className="text-white">{app.name}</span>
                </div>
              ))}
            </div>
          ) : searchQuery.trim() !== "" ? (
            <div className="p-4 text-center text-gray-500">No results found for "{searchQuery}"</div>
          ) : (
            <div className="p-4 grid grid-cols-3 gap-4">
              {applications.slice(0, 9).map((app, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center p-3 hover:bg-blue-900 hover:bg-opacity-50 rounded cursor-pointer"
                  onClick={() => {
                    app.action()
                    toggleSearch()
                  }}
                >
                  <app.icon className="w-10 h-10 text-blue-500 mb-2" />
                  <span className="text-white text-sm text-center">{app.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
