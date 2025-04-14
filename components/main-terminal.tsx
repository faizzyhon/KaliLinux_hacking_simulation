"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Terminal, Shield, Wifi, Database, Globe, Lock, FileSearch, Server, Zap, Trophy, User } from "lucide-react"
import NetworkScanner from "@/components/modules/network-scanner"
import ExploitSimulator from "@/components/modules/exploit-simulator"
import VirtualShell from "@/components/modules/virtual-shell"
import PhishingAwareness from "@/components/modules/phishing-awareness"
import PasswordCracker from "@/components/modules/password-cracker"
import WifiCrackSimulator from "@/components/modules/wifi-crack-simulator"
import DataLeakChecker from "@/components/modules/data-leak-checker"
import DarkWebExplorer from "@/components/modules/dark-web-explorer"
import FirewallPuzzle from "@/components/modules/firewall-puzzle"
import MissionMode from "@/components/modules/mission-mode"
import SocialMediaHack from "@/components/modules/social-media-hack"

export default function MainTerminal() {
  const [activeModule, setActiveModule] = useState<string | null>(null)

  const modules = [
    { id: "network-scanner", name: "Network Scanner", icon: Server, component: NetworkScanner },
    { id: "exploit-simulator", name: "Exploit Executor", icon: Zap, component: ExploitSimulator },
    { id: "virtual-shell", name: "Virtual Shell", icon: Terminal, component: VirtualShell },
    { id: "phishing-awareness", name: "Phishing Toolkit", icon: FileSearch, component: PhishingAwareness },
    { id: "password-cracker", name: "Password Cracker", icon: Lock, component: PasswordCracker },
    { id: "wifi-crack", name: "WiFi Penetration", icon: Wifi, component: WifiCrackSimulator },
    { id: "data-leak", name: "Data Leak Scanner", icon: Database, component: DataLeakChecker },
    { id: "dark-web", name: "Dark Web Access", icon: Globe, component: DarkWebExplorer },
    { id: "firewall-puzzle", name: "Firewall Bypass", icon: Shield, component: FirewallPuzzle },
    { id: "mission-mode", name: "Mission Control", icon: Trophy, component: MissionMode },
    { id: "social-media-hack", name: "Social Engineering", icon: User, component: SocialMediaHack },
  ]

  const renderActiveModule = () => {
    const module = modules.find((m) => m.id === activeModule)
    if (!module) return null

    const ModuleComponent = module.component
    return <ModuleComponent />
  }

  return (
    <div className="kali-window rounded-lg overflow-hidden">
      <div className="kali-titlebar p-2 border-b border-blue-700 flex items-center">
        <div className="flex space-x-2 mr-4">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-sm text-blue-100 flex-1 text-center">
          {activeModule ? modules.find((m) => m.id === activeModule)?.name || "Terminal" : "CyberTerm Console"}
        </div>
      </div>

      {!activeModule ? (
        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-xl mb-2 text-blue-400 terminal-text typing">Welcome to CyberTerm Console</h2>
            <p className="text-blue-600 mb-4">Select a module to begin your cybersecurity operation.</p>
            <p className="text-blue-600 text-sm mb-2">DISCLAIMER: All tools are for educational purposes only.</p>
            <p className="text-blue-600 text-sm">No actual system intrusion capabilities are included.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {modules.map((module) => (
              <motion.button
                key={module.id}
                className="bg-gray-900 border border-blue-700 rounded p-4 text-left hover:bg-blue-900 hover:bg-opacity-20 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveModule(module.id)}
              >
                <div className="flex items-center mb-2">
                  <module.icon className="w-5 h-5 mr-2 text-blue-500" />
                  <h3 className="text-blue-400">{module.name}</h3>
                </div>
                <div className="text-xs text-blue-700">Click to launch</div>
              </motion.button>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <div className="p-2 bg-gray-900 border-b border-blue-700 flex items-center">
            <button
              className="text-blue-500 hover:text-blue-400 text-sm px-2 py-1 border border-blue-700 rounded"
              onClick={() => setActiveModule(null)}
            >
              Back to Main
            </button>
          </div>
          <div className="p-4 max-h-[calc(100vh-10rem)] overflow-y-auto">{renderActiveModule()}</div>
        </div>
      )}
    </div>
  )
}
