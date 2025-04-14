"use client"

import { useState } from "react"
import { Terminal, Wifi, Shield, Database, Globe, Lock, Clock } from "lucide-react"

export default function KaliDesktop() {
  const [time, setTime] = useState(new Date().toLocaleTimeString())

  // Update time every second
  useState(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString())
    }, 1000)
    return () => clearInterval(timer)
  })

  return (
    <div className="fixed inset-0 -z-10">
      {/* Desktop Icons */}
      <div className="absolute top-4 left-4 flex flex-col space-y-6">
        <div className="flex flex-col items-center text-blue-500 hover:text-blue-400 cursor-pointer">
          <Terminal className="w-10 h-10" />
          <span className="text-xs mt-1">Terminal</span>
        </div>
        <div className="flex flex-col items-center text-blue-500 hover:text-blue-400 cursor-pointer">
          <Wifi className="w-10 h-10" />
          <span className="text-xs mt-1">WiFi</span>
        </div>
        <div className="flex flex-col items-center text-blue-500 hover:text-blue-400 cursor-pointer">
          <Shield className="w-10 h-10" />
          <span className="text-xs mt-1">Firewall</span>
        </div>
        <div className="flex flex-col items-center text-blue-500 hover:text-blue-400 cursor-pointer">
          <Database className="w-10 h-10" />
          <span className="text-xs mt-1">Database</span>
        </div>
        <div className="flex flex-col items-center text-blue-500 hover:text-blue-400 cursor-pointer">
          <Globe className="w-10 h-10" />
          <span className="text-xs mt-1">Network</span>
        </div>
      </div>

      {/* Taskbar */}
      <div className="fixed bottom-0 left-0 right-0 h-10 bg-gray-900 border-t border-blue-900 flex items-center justify-between px-4">
        <div className="flex items-center">
          <Terminal className="w-5 h-5 text-blue-500 mr-2" />
          <span className="text-blue-500 text-sm">CyberTerm</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-blue-500 text-sm flex items-center">
            <Lock className="w-4 h-4 mr-1" />
            <span>Secure</span>
          </div>
          <div className="text-blue-500 text-sm flex items-center">
            <Wifi className="w-4 h-4 mr-1" />
            <span>Connected</span>
          </div>
          <div className="text-blue-500 text-sm flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            <span>{time}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
