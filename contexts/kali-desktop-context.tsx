"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { v4 as uuidv4 } from "uuid"

export type WindowPosition = {
  x: number
  y: number
  width: number
  height: number
}

export type KaliWindow = {
  id: string
  title: string
  icon: string
  content: React.ReactNode
  position: WindowPosition
  isActive: boolean
  isMinimized: boolean
  isMaximized: boolean
  component: string
  zIndex: number
}

export type ContextMenuItem = {
  label: string
  icon?: React.ReactNode
  action: () => void
  divider?: boolean
  submenu?: ContextMenuItem[]
}

export type Workspace = {
  id: string
  name: string
  windows: string[] // IDs of windows in this workspace
}

export type SystemStats = {
  cpuUsage: number
  memoryUsage: number
  diskUsage: number
  networkUsage: number
}

type KaliDesktopContextType = {
  windows: KaliWindow[]
  activeWindowId: string | null
  openWindow: (title: string, content: React.ReactNode, icon: string, component: string) => string
  closeWindow: (id: string) => void
  minimizeWindow: (id: string) => void
  maximizeWindow: (id: string) => void
  restoreWindow: (id: string) => void
  activateWindow: (id: string) => void
  updateWindowPosition: (id: string, position: Partial<WindowPosition>) => void
  getNextZIndex: () => number
  isStartMenuOpen: boolean
  toggleStartMenu: () => void
  closeStartMenu: () => void
  notifications: string[]
  addNotification: (message: string) => void
  dismissNotification: (index: number) => void

  // Terminal functionality
  terminalHistory: string[]
  addTerminalCommand: (command: string) => void

  // Context menu
  contextMenu: {
    isOpen: boolean
    x: number
    y: number
    items: ContextMenuItem[]
  }
  showContextMenu: (x: number, y: number, items: ContextMenuItem[]) => void
  hideContextMenu: () => void

  // Workspaces
  workspaces: Workspace[]
  activeWorkspace: string
  switchWorkspace: (id: string) => void
  addWorkspace: () => void

  // System stats
  systemStats: SystemStats
  updateSystemStats: () => void

  // Search
  isSearchOpen: boolean
  toggleSearch: () => void

  // Lock screen
  isLocked: boolean
  lockScreen: () => void
  unlockScreen: (password: string) => boolean

  // Application launchers
  openTerminal: () => string
  openFileManager: () => string
  openNetworkScanner: () => string
  openExploitTool: () => string
  openPasswordCracker: () => string
  openSocialEngineering: () => string
  openSystemMonitor: () => string
  openNetworkMonitor: () => string
  openWebBrowser: () => string
  openSettings: () => string
  openAbout: () => string
  openDonationPage: () => string
}

const KaliDesktopContext = createContext<KaliDesktopContextType | undefined>(undefined)

export const KaliDesktopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [windows, setWindows] = useState<KaliWindow[]>([])
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null)
  const [highestZIndex, setHighestZIndex] = useState(100)
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false)
  const [notifications, setNotifications] = useState<string[]>([])
  const [terminalHistory, setTerminalHistory] = useState<string[]>([])
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isLocked, setIsLocked] = useState(false)

  // Context menu state
  const [contextMenu, setContextMenu] = useState({
    isOpen: false,
    x: 0,
    y: 0,
    items: [] as ContextMenuItem[],
  })

  // Workspaces
  const [workspaces, setWorkspaces] = useState<Workspace[]>([
    { id: "workspace-1", name: "Workspace 1", windows: [] },
    { id: "workspace-2", name: "Workspace 2", windows: [] },
    { id: "workspace-3", name: "Workspace 3", windows: [] },
    { id: "workspace-4", name: "Workspace 4", windows: [] },
  ])
  const [activeWorkspace, setActiveWorkspace] = useState("workspace-1")

  // System stats
  const [systemStats, setSystemStats] = useState<SystemStats>({
    cpuUsage: 0,
    memoryUsage: 0,
    diskUsage: 0,
    networkUsage: 0,
  })

  const getNextZIndex = () => {
    const nextZIndex = highestZIndex + 1
    setHighestZIndex(nextZIndex)
    return nextZIndex
  }

  const openWindow = (title: string, content: React.ReactNode, icon: string, component: string) => {
    const id = uuidv4()
    const zIndex = getNextZIndex()

    // Calculate a slightly offset position for each new window
    const offset = windows.length * 30
    const position = {
      x: 100 + offset,
      y: 100 + offset,
      width: 800,
      height: 500,
    }

    const newWindow: KaliWindow = {
      id,
      title,
      icon,
      content,
      position,
      isActive: true,
      isMinimized: false,
      isMaximized: false,
      component,
      zIndex,
    }

    setWindows((prev) => {
      // Deactivate all other windows
      const updatedWindows = prev.map((w) => ({
        ...w,
        isActive: false,
      }))
      return [...updatedWindows, newWindow]
    })

    setActiveWindowId(id)

    // Add window to current workspace
    setWorkspaces((prev) =>
      prev.map((workspace) =>
        workspace.id === activeWorkspace ? { ...workspace, windows: [...workspace.windows, id] } : workspace,
      ),
    )

    return id
  }

  const closeWindow = (id: string) => {
    setWindows((prev) => {
      const filtered = prev.filter((w) => w.id !== id)

      // If we closed the active window, activate the top-most window
      if (id === activeWindowId && filtered.length > 0) {
        const topWindow = filtered.reduce((prev, current) => (current.zIndex > prev.zIndex ? current : prev))
        topWindow.isActive = true
        setActiveWindowId(topWindow.id)
      } else if (filtered.length === 0) {
        setActiveWindowId(null)
      }

      return filtered
    })

    // Remove window from workspace
    setWorkspaces((prev) =>
      prev.map((workspace) => ({
        ...workspace,
        windows: workspace.windows.filter((windowId) => windowId !== id),
      })),
    )
  }

  const minimizeWindow = (id: string) => {
    setWindows((prev) =>
      prev.map((w) => {
        if (w.id === id) {
          return { ...w, isMinimized: true, isActive: false }
        }
        return w
      }),
    )

    // Activate the next highest window
    setWindows((prev) => {
      const visibleWindows = prev.filter((w) => !w.isMinimized && w.id !== id)
      if (visibleWindows.length > 0) {
        const topWindow = visibleWindows.reduce((prev, current) => (current.zIndex > prev.zIndex ? current : prev))
        return prev.map((w) => {
          if (w.id === topWindow.id) {
            setActiveWindowId(topWindow.id)
            return { ...w, isActive: true }
          }
          return w
        })
      }
      setActiveWindowId(null)
      return prev
    })
  }

  const maximizeWindow = (id: string) => {
    setWindows((prev) =>
      prev.map((w) => {
        if (w.id === id) {
          return { ...w, isMaximized: true }
        }
        return w
      }),
    )
  }

  const restoreWindow = (id: string) => {
    setWindows((prev) =>
      prev.map((w) => {
        if (w.id === id) {
          return { ...w, isMaximized: false, isMinimized: false }
        }
        return w
      }),
    )
  }

  const activateWindow = (id: string) => {
    const zIndex = getNextZIndex()

    setWindows((prev) =>
      prev.map((w) => {
        if (w.id === id) {
          return { ...w, isActive: true, isMinimized: false, zIndex }
        }
        return { ...w, isActive: false }
      }),
    )

    setActiveWindowId(id)
  }

  const updateWindowPosition = (id: string, position: Partial<WindowPosition>) => {
    setWindows((prev) =>
      prev.map((w) => {
        if (w.id === id) {
          return { ...w, position: { ...w.position, ...position } }
        }
        return w
      }),
    )
  }

  const toggleStartMenu = () => {
    setIsStartMenuOpen((prev) => !prev)
    if (contextMenu.isOpen) {
      hideContextMenu()
    }
  }

  const closeStartMenu = () => {
    setIsStartMenuOpen(false)
  }

  const addNotification = (message: string) => {
    setNotifications((prev) => [...prev, message])

    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      dismissNotification(notifications.length)
    }, 5000)
  }

  const dismissNotification = (index: number) => {
    setNotifications((prev) => prev.filter((_, i) => i !== index))
  }

  // Terminal history
  const addTerminalCommand = (command: string) => {
    setTerminalHistory((prev) => [...prev, command])
  }

  // Context menu
  const showContextMenu = (x: number, y: number, items: ContextMenuItem[]) => {
    setContextMenu({
      isOpen: true,
      x,
      y,
      items,
    })
  }

  const hideContextMenu = () => {
    setContextMenu((prev) => ({
      ...prev,
      isOpen: false,
    }))
  }

  // Workspaces
  const switchWorkspace = (id: string) => {
    setActiveWorkspace(id)

    // Hide all windows not in this workspace
    setWindows((prev) =>
      prev.map((window) => {
        const workspace = workspaces.find((ws) => ws.id === id)
        const isInWorkspace = workspace?.windows.includes(window.id) || false

        return {
          ...window,
          isMinimized: !isInWorkspace,
          isActive: false,
        }
      }),
    )

    setActiveWindowId(null)
  }

  const addWorkspace = () => {
    const id = `workspace-${workspaces.length + 1}`
    const name = `Workspace ${workspaces.length + 1}`

    setWorkspaces((prev) => [...prev, { id, name, windows: [] }])
  }

  // System stats
  const updateSystemStats = () => {
    // Simulate changing system stats
    setSystemStats({
      cpuUsage: Math.floor(Math.random() * 100),
      memoryUsage: Math.floor(Math.random() * 100),
      diskUsage: 50 + Math.floor(Math.random() * 30),
      networkUsage: Math.floor(Math.random() * 100),
    })
  }

  // Search
  const toggleSearch = () => {
    setIsSearchOpen((prev) => !prev)
    if (isStartMenuOpen) {
      closeStartMenu()
    }
  }

  // Lock screen
  const lockScreen = () => {
    setIsLocked(true)
  }

  const unlockScreen = (password: string) => {
    // For demo purposes, any password works
    setIsLocked(false)
    return true
  }

  // Specialized window openers
  const openTerminal = () => {
    return openWindow(
      "Terminal",
      <div className="h-full bg-black text-green-500 p-2 font-mono overflow-auto">
        <div>root@kali:~# _</div>
      </div>,
      "/icons/terminal.svg",
      "terminal",
    )
  }

  const openFileManager = () => {
    return openWindow(
      "File Manager",
      <div className="h-full bg-gray-900 text-white p-2 font-sans overflow-auto">
        <div className="flex items-center space-x-2 mb-4">
          <button className="px-2 py-1 bg-blue-800 text-white rounded">Home</button>
          <button className="px-2 py-1 bg-blue-800 text-white rounded">Documents</button>
          <button className="px-2 py-1 bg-blue-800 text-white rounded">Downloads</button>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-blue-800 flex items-center justify-center rounded">
              <span className="text-2xl">📁</span>
            </div>
            <span>Documents</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-blue-800 flex items-center justify-center rounded">
              <span className="text-2xl">📁</span>
            </div>
            <span>Downloads</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-blue-800 flex items-center justify-center rounded">
              <span className="text-2xl">📁</span>
            </div>
            <span>Pictures</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-blue-800 flex items-center justify-center rounded">
              <span className="text-2xl">📁</span>
            </div>
            <span>Videos</span>
          </div>
        </div>
      </div>,
      "/icons/file-manager.svg",
      "fileManager",
    )
  }

  const openNetworkScanner = () => {
    import("@/components/modules/network-scanner").then((module) => {
      const NetworkScanner = module.default
      openWindow(
        "Network Scanner",
        <div className="h-full bg-black text-green-500 p-4 overflow-auto">
          <NetworkScanner />
        </div>,
        "/icons/network-scanner.svg",
        "networkScanner",
      )
    })
    return "loading"
  }

  const openExploitTool = () => {
    import("@/components/modules/exploit-simulator").then((module) => {
      const ExploitSimulator = module.default
      openWindow(
        "Exploit Tool",
        <div className="h-full bg-black text-green-500 p-4 overflow-auto">
          <ExploitSimulator />
        </div>,
        "/icons/exploit.svg",
        "exploitTool",
      )
    })
    return "loading"
  }

  const openPasswordCracker = () => {
    import("@/components/modules/password-cracker").then((module) => {
      const PasswordCracker = module.default
      openWindow(
        "Password Cracker",
        <div className="h-full bg-black text-green-500 p-4 overflow-auto">
          <PasswordCracker />
        </div>,
        "/icons/password.svg",
        "passwordCracker",
      )
    })
    return "loading"
  }

  const openSocialEngineering = () => {
    import("@/components/modules/social-media-hack").then((module) => {
      const SocialMediaHack = module.default
      openWindow(
        "Social Engineering",
        <div className="h-full bg-black text-green-500 p-4 overflow-auto">
          <SocialMediaHack />
        </div>,
        "/icons/social.svg",
        "socialEngineering",
      )
    })
    return "loading"
  }

  const openSystemMonitor = () => {
    return openWindow(
      "System Monitor",
      <div className="h-full bg-gray-900 text-white p-4 overflow-auto">
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">System Resources</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span>CPU Usage</span>
                <span>{systemStats.cpuUsage}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${systemStats.cpuUsage}%` }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span>Memory Usage</span>
                <span>{systemStats.memoryUsage}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${systemStats.memoryUsage}%` }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span>Disk Usage</span>
                <span>{systemStats.diskUsage}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div className="bg-yellow-600 h-2.5 rounded-full" style={{ width: `${systemStats.diskUsage}%` }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span>Network Usage</span>
                <span>{systemStats.networkUsage}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div
                  className="bg-purple-600 h-2.5 rounded-full"
                  style={{ width: `${systemStats.networkUsage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Processes</h2>
          <div className="bg-gray-800 rounded">
            <div className="grid grid-cols-4 gap-2 p-2 border-b border-gray-700 font-semibold">
              <div>Process</div>
              <div>PID</div>
              <div>CPU</div>
              <div>Memory</div>
            </div>
            {[
              { name: "systemd", pid: 1, cpu: "0.2%", memory: "4.5MB" },
              { name: "kworker/0:1", pid: 2, cpu: "0.1%", memory: "0.0MB" },
              { name: "kworker/1:0", pid: 3, cpu: "0.0%", memory: "0.0MB" },
              { name: "ksoftirqd/0", pid: 4, cpu: "0.0%", memory: "0.0MB" },
              { name: "kworker/0:1H", pid: 5, cpu: "0.0%", memory: "0.0MB" },
              { name: "kworker/u16:0", pid: 6, cpu: "0.0%", memory: "0.0MB" },
              { name: "migration/0", pid: 7, cpu: "0.0%", memory: "0.0MB" },
              { name: "rcu_bh", pid: 8, cpu: "0.0%", memory: "0.0MB" },
              { name: "rcu_sched", pid: 9, cpu: "0.0%", memory: "0.0MB" },
              { name: "watchdog/0", pid: 10, cpu: "0.0%", memory: "0.0MB" },
            ].map((process, index) => (
              <div key={index} className="grid grid-cols-4 gap-2 p-2 border-b border-gray-700">
                <div>{process.name}</div>
                <div>{process.pid}</div>
                <div>{process.cpu}</div>
                <div>{process.memory}</div>
              </div>
            ))}
          </div>
        </div>
      </div>,
      "/icons/system-monitor.svg",
      "systemMonitor",
    )
  }

  const openNetworkMonitor = () => {
    return openWindow(
      "Network Monitor",
      <div className="h-full bg-gray-900 text-white p-4 overflow-auto">
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Network Interfaces</h2>
          <div className="bg-gray-800 rounded p-4 mb-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">eth0</h3>
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span>IP Address:</span>
                    <span>192.168.1.100</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Netmask:</span>
                    <span>255.255.255.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Gateway:</span>
                    <span>192.168.1.1</span>
                  </div>
                  <div className="flex justify-between">
                    <span>MAC:</span>
                    <span>00:11:22:33:44:55</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <span className="text-green-500">UP</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">wlan0</h3>
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span>IP Address:</span>
                    <span>Not connected</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Netmask:</span>
                    <span>-</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Gateway:</span>
                    <span>-</span>
                  </div>
                  <div className="flex justify-between">
                    <span>MAC:</span>
                    <span>AA:BB:CC:DD:EE:FF</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <span className="text-red-500">DOWN</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-xl font-semibold mb-2">Network Traffic</h2>
          <div className="bg-gray-800 rounded p-4">
            <div className="mb-4">
              <div className="flex justify-between mb-1">
                <span>Download</span>
                <span>2.5 MB/s</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "45%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span>Upload</span>
                <span>0.8 MB/s</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div className="bg-green-600 h-2.5 rounded-full" style={{ width: "15%" }}></div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Active Connections</h2>
          <div className="bg-gray-800 rounded">
            <div className="grid grid-cols-4 gap-2 p-2 border-b border-gray-700 font-semibold">
              <div>Protocol</div>
              <div>Local Address</div>
              <div>Remote Address</div>
              <div>State</div>
            </div>
            {[
              { protocol: "TCP", local: "192.168.1.100:22", remote: "192.168.1.5:52642", state: "ESTABLISHED" },
              { protocol: "TCP", local: "192.168.1.100:80", remote: "192.168.1.10:35214", state: "ESTABLISHED" },
              { protocol: "TCP", local: "192.168.1.100:443", remote: "192.168.1.15:60125", state: "ESTABLISHED" },
              { protocol: "UDP", local: "192.168.1.100:53", remote: "192.168.1.20:40582", state: "ESTABLISHED" },
              { protocol: "TCP", local: "192.168.1.100:22", remote: "192.168.1.25:48562", state: "ESTABLISHED" },
            ].map((conn, index) => (
              <div key={index} className="grid grid-cols-4 gap-2 p-2 border-b border-gray-700">
                <div>{conn.protocol}</div>
                <div>{conn.local}</div>
                <div>{conn.remote}</div>
                <div>{conn.state}</div>
              </div>
            ))}
          </div>
        </div>
      </div>,
      "/icons/network-monitor.svg",
      "networkMonitor",
    )
  }

  const openWebBrowser = () => {
    return openWindow(
      "Web Browser",
      <div className="h-full bg-white flex flex-col">
        <div className="bg-gray-200 p-2 flex items-center space-x-2">
          <button className="p-1 rounded hover:bg-gray-300">
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
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <button className="p-1 rounded hover:bg-gray-300">
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
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
          <button className="p-1 rounded hover:bg-gray-300">
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
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          </button>
          <div className="flex-1 bg-white rounded px-2 py-1 text-sm flex items-center">
            <span className="text-green-600 mr-2">https://</span>
            <span>faizzyhon.vercel.app</span>
          </div>
        </div>
        <div className="flex-1 p-4 overflow-auto">
          <div className="text-center py-8">
            <h1 className="text-2xl font-bold mb-2">Muhammad Faizan</h1>
            <p className="text-gray-600 mb-4">Cybersecurity Expert & Developer</p>
            <div className="flex justify-center space-x-4 mb-6">
              <button className="px-4 py-2 bg-blue-600 text-white rounded">Portfolio</button>
              <button className="px-4 py-2 bg-green-600 text-white rounded">Contact</button>
              <button className="px-4 py-2 bg-yellow-600 text-white rounded">Donate</button>
            </div>
            <div className="max-w-2xl mx-auto bg-gray-100 p-4 rounded">
              <p className="text-gray-800 mb-4">
                Welcome to my portfolio website. I specialize in cybersecurity solutions and educational tools.
              </p>
              <p className="text-gray-800">
                Check out my latest project: Kali Linux GUI Simulation for educational purposes.
              </p>
            </div>
          </div>
        </div>
      </div>,
      "/icons/web-browser.svg",
      "webBrowser",
    )
  }

  const openSettings = () => {
    return openWindow(
      "Settings",
      <div className="h-full bg-gray-900 text-white p-4 overflow-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">System Settings</h2>
            <div className="space-y-4">
              <div className="bg-gray-800 p-4 rounded">
                <h3 className="font-medium mb-2">Appearance</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Theme</span>
                    <select className="bg-gray-700 rounded px-2 py-1">
                      <option>Dark (Default)</option>
                      <option>Light</option>
                      <option>High Contrast</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Accent Color</span>
                    <div className="flex space-x-2">
                      <div className="w-6 h-6 bg-blue-500 rounded-full border-2 border-white"></div>
                      <div className="w-6 h-6 bg-green-500 rounded-full"></div>
                      <div className="w-6 h-6 bg-red-500 rounded-full"></div>
                      <div className="w-6 h-6 bg-purple-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-4 rounded">
                <h3 className="font-medium mb-2">Display</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Resolution</span>
                    <select className="bg-gray-700 rounded px-2 py-1">
                      <option>1920x1080</option>
                      <option>1680x1050</option>
                      <option>1440x900</option>
                      <option>1366x768</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Scaling</span>
                    <select className="bg-gray-700 rounded px-2 py-1">
                      <option>100%</option>
                      <option>125%</option>
                      <option>150%</option>
                      <option>175%</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-4 rounded">
                <h3 className="font-medium mb-2">Power</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Power Mode</span>
                    <select className="bg-gray-700 rounded px-2 py-1">
                      <option>Balanced</option>
                      <option>Power Saver</option>
                      <option>Performance</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Screen Timeout</span>
                    <select className="bg-gray-700 rounded px-2 py-1">
                      <option>Never</option>
                      <option>5 minutes</option>
                      <option>10 minutes</option>
                      <option>30 minutes</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">User Settings</h2>
            <div className="space-y-4">
              <div className="bg-gray-800 p-4 rounded">
                <h3 className="font-medium mb-2">Account</h3>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-blue-800 rounded-full flex items-center justify-center text-2xl">MF</div>
                  <div>
                    <div className="font-medium">Muhammad Faizan</div>
                    <div className="text-sm text-gray-400">Administrator</div>
                    <div className="text-sm text-gray-400">faizzyhon@gmail.com</div>
                  </div>
                </div>
                <button className="w-full bg-blue-700 text-white py-1 rounded">Change Password</button>
              </div>

              <div className="bg-gray-800 p-4 rounded">
                <h3 className="font-medium mb-2">Privacy</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Location Services</span>
                    <div className="relative inline-block w-10 mr-2 align-middle select-none">
                      <input type="checkbox" id="location" className="sr-only" />
                      <div className="w-10 h-5 bg-gray-700 rounded-full"></div>
                      <div className="absolute w-5 h-5 bg-white rounded-full left-0 top-0"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Usage Statistics</span>
                    <div className="relative inline-block w-10 mr-2 align-middle select-none">
                      <input type="checkbox" id="usage" className="sr-only" />
                      <div className="w-10 h-5 bg-gray-700 rounded-full"></div>
                      <div className="absolute w-5 h-5 bg-white rounded-full left-0 top-0"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-4 rounded">
                <h3 className="font-medium mb-2">Notifications</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>System Notifications</span>
                    <div className="relative inline-block w-10 mr-2 align-middle select-none">
                      <input type="checkbox" id="sysnotif" className="sr-only" checked />
                      <div className="w-10 h-5 bg-blue-600 rounded-full"></div>
                      <div className="absolute w-5 h-5 bg-white rounded-full right-0 top-0"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Security Alerts</span>
                    <div className="relative inline-block w-10 mr-2 align-middle select-none">
                      <input type="checkbox" id="secalerts" className="sr-only" checked />
                      <div className="w-10 h-5 bg-blue-600 rounded-full"></div>
                      <div className="absolute w-5 h-5 bg-white rounded-full right-0 top-0"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>,
      "/icons/settings.svg",
      "settings",
    )
  }

  const openAbout = () => {
    return openWindow(
      "About",
      <div className="h-full bg-gray-900 text-white p-6 overflow-auto flex flex-col items-center justify-center">
        <div className="text-center max-w-2xl">
          <div className="mb-6">
            <svg
              width="100"
              height="100"
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto"
            >
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
          </div>
          <h1 className="text-3xl font-bold mb-2">Kali Linux GUI Simulation</h1>
          <p className="text-gray-400 mb-6">Version 1.0.0</p>

          <div className="bg-gray-800 p-4 rounded mb-6">
            <p className="mb-4">
              This is an educational simulation of the Kali Linux GUI environment, designed for cybersecurity training
              and awareness. All tools and functionalities are simulated and do not perform actual security operations.
            </p>
            <p>This project is intended for educational purposes only. Please use responsibly and ethically.</p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Developer</h2>
            <p className="font-medium">Muhammad Faizan</p>
            <p className="text-gray-400 mb-2">Cybersecurity Expert & Developer</p>
            <div className="flex justify-center space-x-4">
              <a href="mailto:faizzyhon@gmail.com" className="text-blue-400 hover:underline">
                faizzyhon@gmail.com
              </a>
              <a
                href="https://faizzyhon.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                Portfolio
              </a>
            </div>
          </div>

          <div>
            <a
              href="https://faizzyhon.pocketsflow.com/source-code"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-600"
            >
              Support This Project
            </a>
          </div>
        </div>
      </div>,
      "/icons/about.svg",
      "about",
    )
  }

  const openDonationPage = () => {
    return openWindow(
      "Support Developer",
      <div className="h-full bg-gray-900 text-white p-6 overflow-auto">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Support This Project</h1>
            <p className="text-gray-400">
              If you find this Kali Linux simulation useful for your educational purposes, consider supporting the
              developer.
            </p>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Why Support?</h2>
            <ul className="space-y-2 list-disc pl-5">
              <li>Help maintain and improve this educational tool</li>
              <li>Enable the development of more cybersecurity training resources</li>
              <li>Support open-source educational projects</li>
              <li>Get access to future premium features and tools</li>
            </ul>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Donation Options</h2>
            <div className="space-y-4">
              <a
                href="https://faizzyhon.pocketsflow.com/source-code"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-blue-700 hover:bg-blue-600 text-white py-3 px-4 rounded text-center"
              >
                Donate via PocketsFlow
              </a>

              <div className="grid grid-cols-3 gap-4">
                <button className="bg-gray-700 hover:bg-gray-600 py-2 rounded">$5</button>
                <button className="bg-gray-700 hover:bg-gray-600 py-2 rounded">$10</button>
                <button className="bg-gray-700 hover:bg-gray-600 py-2 rounded">$25</button>
              </div>

              <div className="pt-4 border-t border-gray-700">
                <p className="text-center text-gray-400 text-sm">
                  All donations directly support the developer, Muhammad Faizan.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Contact the Developer</h2>
            <div className="space-y-2">
              <p>
                <span className="text-gray-400">Email:</span>
                <a href="mailto:faizzyhon@gmail.com" className="text-blue-400 ml-2 hover:underline">
                  faizzyhon@gmail.com
                </a>
              </p>
              <p>
                <span className="text-gray-400">Portfolio:</span>
                <a
                  href="https://faizzyhon.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 ml-2 hover:underline"
                >
                  faizzyhon.vercel.app
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>,
      "/icons/donate.svg",
      "donation",
    )
  }

  // Update system stats periodically
  useEffect(() => {
    const interval = setInterval(() => {
      updateSystemStats()
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  // Close start menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (isStartMenuOpen) {
        closeStartMenu()
      }
      if (contextMenu.isOpen) {
        hideContextMenu()
      }
    }

    document.addEventListener("click", handleClickOutside)
    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [isStartMenuOpen, contextMenu.isOpen])

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Alt+Tab to cycle through windows
      if (e.altKey && e.key === "Tab") {
        e.preventDefault()

        if (windows.length > 0) {
          const visibleWindows = windows.filter((w) => !w.isMinimized)
          if (visibleWindows.length > 0) {
            const currentIndex = visibleWindows.findIndex((w) => w.id === activeWindowId)
            const nextIndex = (currentIndex + 1) % visibleWindows.length
            activateWindow(visibleWindows[nextIndex].id)
          }
        }
      }

      // Ctrl+Alt+T to open terminal
      if (e.ctrlKey && e.altKey && e.key === "t") {
        e.preventDefault()
        openTerminal()
      }

      // Ctrl+Alt+F to open file manager
      if (e.ctrlKey && e.altKey && e.key === "f") {
        e.preventDefault()
        openFileManager()
      }

      // Ctrl+Alt+L to lock screen
      if (e.ctrlKey && e.altKey && e.key === "l") {
        e.preventDefault()
        lockScreen()
      }

      // Windows/Super key to toggle start menu
      if (e.key === "Meta") {
        e.preventDefault()
        toggleStartMenu()
      }

      // Escape to close active dialogs
      if (e.key === "Escape") {
        if (isStartMenuOpen) {
          closeStartMenu()
        }
        if (contextMenu.isOpen) {
          hideContextMenu()
        }
        if (isSearchOpen) {
          setIsSearchOpen(false)
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [windows, activeWindowId, isStartMenuOpen, contextMenu.isOpen, isSearchOpen])

  return (
    <KaliDesktopContext.Provider
      value={{
        windows,
        activeWindowId,
        openWindow,
        closeWindow,
        minimizeWindow,
        maximizeWindow,
        restoreWindow,
        activateWindow,
        updateWindowPosition,
        getNextZIndex,
        isStartMenuOpen,
        toggleStartMenu,
        closeStartMenu,
        notifications,
        addNotification,
        dismissNotification,
        terminalHistory,
        addTerminalCommand,
        contextMenu,
        showContextMenu,
        hideContextMenu,
        workspaces,
        activeWorkspace,
        switchWorkspace,
        addWorkspace,
        systemStats,
        updateSystemStats,
        isSearchOpen,
        toggleSearch,
        isLocked,
        lockScreen,
        unlockScreen,
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
      }}
    >
      {children}
    </KaliDesktopContext.Provider>
  )
}

export const useKaliDesktop = () => {
  const context = useContext(KaliDesktopContext)
  if (context === undefined) {
    throw new Error("useKaliDesktop must be used within a KaliDesktopProvider")
  }
  return context
}
