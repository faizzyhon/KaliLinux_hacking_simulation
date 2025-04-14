"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useKaliDesktop } from "@/contexts/kali-desktop-context"
import { Wifi, Shield, Battery, Volume2, Search, Bell, Coffee } from "lucide-react"

export default function KaliTaskbar() {
  const {
    windows,
    activeWindowId,
    activateWindow,
    minimizeWindow,
    isStartMenuOpen,
    toggleStartMenu,
    closeStartMenu,
    toggleSearch,
    notifications,
    systemStats,
    lockScreen,
  } = useKaliDesktop()

  const [time, setTime] = useState(new Date().toLocaleTimeString())
  const [date, setDate] = useState(new Date().toLocaleDateString())
  const [batteryLevel, setBatteryLevel] = useState(85)
  const [isCharging, setIsCharging] = useState(false)
  const [volumeLevel, setVolumeLevel] = useState(75)
  const [showVolumeControl, setShowVolumeControl] = useState(false)
  const [showCalendar, setShowCalendar] = useState(false)
  const [showNotificationPanel, setShowNotificationPanel] = useState(false)

  // Simulate battery drain
  useEffect(() => {
    const interval = setInterval(() => {
      setBatteryLevel((prev) => {
        if (isCharging && prev < 100) {
          return prev + 1
        } else if (!isCharging && prev > 0) {
          return prev - 1
        }
        return prev
      })

      // Randomly toggle charging state
      if (Math.random() < 0.01) {
        setIsCharging((prev) => !prev)
      }
    }, 30000)

    return () => clearInterval(interval)
  }, [isCharging])

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      setTime(now.toLocaleTimeString())
      setDate(now.toLocaleDateString())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleStartClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    toggleStartMenu()
    setShowCalendar(false)
    setShowVolumeControl(false)
    setShowNotificationPanel(false)
  }

  const handleVolumeClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowVolumeControl((prev) => !prev)
    setShowCalendar(false)
    setShowNotificationPanel(false)
    closeStartMenu()
  }

  const handleTimeClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowCalendar((prev) => !prev)
    setShowVolumeControl(false)
    setShowNotificationPanel(false)
    closeStartMenu()
  }

  const handleNotificationClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowNotificationPanel((prev) => !prev)
    setShowCalendar(false)
    setShowVolumeControl(false)
    closeStartMenu()
  }

  const handleSearchClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    toggleSearch()
    setShowCalendar(false)
    setShowVolumeControl(false)
    setShowNotificationPanel(false)
    closeStartMenu()
  }

  const handleLockClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    lockScreen()
    setShowCalendar(false)
    setShowVolumeControl(false)
    setShowNotificationPanel(false)
    closeStartMenu()
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 h-10 bg-gray-900 border-t border-blue-900 flex items-center justify-between px-2 z-30">
      {/* Start button */}
      <div
        className={`flex items-center px-2 h-8 rounded cursor-pointer ${
          isStartMenuOpen ? "bg-blue-800" : "hover:bg-blue-900 hover:bg-opacity-50"
        }`}
        onClick={handleStartClick}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mr-2"
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
        <span className="text-white text-sm">Kali</span>
      </div>

      {/* Search button */}
      <div
        className="flex items-center px-2 h-8 rounded cursor-pointer hover:bg-blue-900 hover:bg-opacity-50 ml-1"
        onClick={handleSearchClick}
      >
        <Search className="w-4 h-4 text-white" />
      </div>

      {/* Window buttons */}
      <div className="flex-1 flex items-center space-x-1 px-2 overflow-x-auto">
        {windows.map((window) => (
          <div
            key={window.id}
            className={`flex items-center px-2 py-1 rounded cursor-pointer min-w-[120px] max-w-[200px] ${
              window.isActive ? "bg-blue-800" : "hover:bg-blue-900 hover:bg-opacity-50"
            }`}
            onClick={() => {
              if (window.isMinimized) {
                activateWindow(window.id)
              } else if (window.isActive) {
                minimizeWindow(window.id)
              } else {
                activateWindow(window.id)
              }
            }}
          >
            <div className="w-4 h-4 mr-2">
              {window.icon && (
                <img src={window.icon || "/placeholder.svg"} alt={window.title} className="w-full h-full" />
              )}
            </div>
            <span className="text-white text-xs truncate">{window.title}</span>
          </div>
        ))}
      </div>

      {/* System tray */}
      <div className="flex items-center space-x-2 px-2">
        {/* CPU Usage */}
        <div className="text-white text-xs flex items-center group relative">
          <div className="w-4 h-4 bg-gray-800 rounded-sm overflow-hidden">
            <div className="bg-blue-600 h-full" style={{ width: `${systemStats.cpuUsage}%` }}></div>
          </div>
          <div className="absolute bottom-full right-0 mb-2 bg-gray-900 border border-blue-900 rounded p-2 hidden group-hover:block whitespace-nowrap">
            CPU Usage: {systemStats.cpuUsage}%
          </div>
        </div>

        {/* Memory Usage */}
        <div className="text-white text-xs flex items-center group relative">
          <div className="w-4 h-4 bg-gray-800 rounded-sm overflow-hidden">
            <div className="bg-green-600 h-full" style={{ width: `${systemStats.memoryUsage}%` }}></div>
          </div>
          <div className="absolute bottom-full right-0 mb-2 bg-gray-900 border border-blue-900 rounded p-2 hidden group-hover:block whitespace-nowrap">
            Memory Usage: {systemStats.memoryUsage}%
          </div>
        </div>

        {/* Network */}
        <div className="text-blue-400 text-xs flex items-center group relative">
          <Wifi className="w-4 h-4" />
          <div className="absolute bottom-full right-0 mb-2 bg-gray-900 border border-blue-900 rounded p-2 hidden group-hover:block whitespace-nowrap">
            Connected to: Kali-Network
            <br />
            IP: 192.168.1.100
            <br />
            Signal Strength: Excellent
          </div>
        </div>

        {/* Security */}
        <div className="text-blue-400 text-xs flex items-center group relative">
          <Shield className="w-4 h-4" />
          <div className="absolute bottom-full right-0 mb-2 bg-gray-900 border border-blue-900 rounded p-2 hidden group-hover:block whitespace-nowrap">
            Firewall: Active
            <br />
            Threats Blocked: 0<br />
            Last Scan: Today, 2:30 PM
          </div>
        </div>

        {/* Volume */}
        <div className="text-blue-400 text-xs flex items-center relative">
          <div className="cursor-pointer" onClick={handleVolumeClick}>
            <Volume2 className="w-4 h-4" />
          </div>

          {showVolumeControl && (
            <div className="absolute bottom-full right-0 mb-2 bg-gray-900 border border-blue-900 rounded p-3 w-48">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white">Volume: {volumeLevel}%</span>
                <Volume2 className="w-4 h-4 text-blue-500" />
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={volumeLevel}
                onChange={(e) => setVolumeLevel(Number.parseInt(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between mt-3">
                <button className="text-blue-500 hover:text-blue-400 text-xs">Mute</button>
                <button className="text-blue-500 hover:text-blue-400 text-xs">Sound Settings</button>
              </div>
            </div>
          )}
        </div>

        {/* Battery */}
        <div className="text-blue-400 text-xs flex items-center group relative">
          <div className="relative">
            <Battery className="w-4 h-4" />
            {isCharging && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-1 h-1 bg-yellow-500 rounded-full"></div>
              </div>
            )}
          </div>
          <div className="absolute bottom-full right-0 mb-2 bg-gray-900 border border-blue-900 rounded p-2 hidden group-hover:block whitespace-nowrap">
            Battery: {batteryLevel}%<br />
            {isCharging ? "Charging" : `${Math.floor(batteryLevel / 20)} hours remaining`}
          </div>
        </div>

        {/* Notifications */}
        <div
          className="text-blue-400 text-xs flex items-center relative cursor-pointer"
          onClick={handleNotificationClick}
        >
          <div className="relative">
            <Bell className="w-4 h-4" />
            {notifications.length > 0 && (
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
            )}
          </div>

          {showNotificationPanel && (
            <div className="absolute bottom-full right-0 mb-2 bg-gray-900 border border-blue-900 rounded w-64">
              <div className="p-2 border-b border-blue-900 flex justify-between items-center">
                <span className="text-white">Notifications</span>
                <button className="text-blue-500 hover:text-blue-400 text-xs">Clear All</button>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map((notification, index) => (
                    <div key={index} className="p-2 border-b border-blue-900 last:border-b-0">
                      <div className="text-white text-sm">{notification}</div>
                      <div className="text-gray-500 text-xs mt-1">Just now</div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-gray-500">No notifications</div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Lock Screen */}
        <div className="text-blue-400 text-xs flex items-center cursor-pointer" onClick={handleLockClick}>
          <Coffee className="w-4 h-4" />
        </div>

        {/* Time and Date */}
        <div className="text-white text-xs cursor-pointer relative" onClick={handleTimeClick}>
          <div>{time}</div>
          <div className="text-[10px] text-gray-400">{date}</div>

          {showCalendar && (
            <div className="absolute bottom-full right-0 mb-2 bg-gray-900 border border-blue-900 rounded p-3 w-64">
              <div className="text-center mb-3">
                <div className="text-lg font-medium">
                  {new Date().toLocaleDateString(undefined, { month: "long", year: "numeric" })}
                </div>
              </div>
              <div className="grid grid-cols-7 gap-1">
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day, i) => (
                  <div key={i} className="text-center text-gray-500 text-xs">
                    {day}
                  </div>
                ))}
                {Array.from({ length: 35 }, (_, i) => {
                  const d = new Date()
                  d.setDate(1)
                  const firstDay = d.getDay()
                  const day = i - firstDay + 1
                  const currentMonth = d.getMonth()
                  d.setDate(day)

                  const isCurrentMonth = d.getMonth() === currentMonth
                  const isToday = isCurrentMonth && d.getDate() === new Date().getDate()

                  return (
                    <div
                      key={i}
                      className={`text-center p-1 text-xs rounded ${
                        isToday
                          ? "bg-blue-700 text-white"
                          : isCurrentMonth
                            ? "text-white hover:bg-blue-900 hover:bg-opacity-50 cursor-pointer"
                            : "text-gray-600"
                      }`}
                    >
                      {isCurrentMonth ? d.getDate() : ""}
                    </div>
                  )
                })}
              </div>
              <div className="mt-3 pt-3 border-t border-blue-900 flex justify-between">
                <button className="text-blue-500 hover:text-blue-400 text-xs">Clock Settings</button>
                <button className="text-blue-500 hover:text-blue-400 text-xs">Date & Time Settings</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
