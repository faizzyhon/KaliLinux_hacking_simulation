"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useKaliDesktop } from "@/contexts/kali-desktop-context"
import { Lock } from "lucide-react"

export default function KaliLockScreen() {
  const { isLocked, unlockScreen } = useKaliDesktop()
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [time, setTime] = useState(new Date())

  // Update time every second
  useEffect(() => {
    if (isLocked) {
      const timer = setInterval(() => {
        setTime(new Date())
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [isLocked])

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault()

    if (password.trim() === "") {
      setError("Please enter a password")
      return
    }

    const success = unlockScreen(password)

    if (!success) {
      setError("Incorrect password")
    } else {
      setPassword("")
      setError("")
    }
  }

  if (!isLocked) {
    return null
  }

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center">
      <div className="absolute inset-0 bg-[#05080e] bg-opacity-95">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      </div>

      <div className="text-center mb-8 z-10">
        <div className="text-6xl font-light text-white mb-2">
          {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </div>
        <div className="text-xl text-gray-400">
          {time.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" })}
        </div>
      </div>

      <div className="bg-gray-900 border border-blue-900 rounded-lg p-6 w-full max-w-md z-10">
        <div className="flex items-center justify-center mb-6">
          <div className="w-20 h-20 bg-blue-900 bg-opacity-50 rounded-full flex items-center justify-center">
            <Lock className="w-10 h-10 text-blue-500" />
          </div>
        </div>

        <div className="text-center mb-6">
          <h2 className="text-xl font-medium text-white">Kali Linux</h2>
          <p className="text-gray-400">Enter password to unlock</p>
        </div>

        <form onSubmit={handleUnlock}>
          <div className="mb-4">
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setError("")
              }}
              className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              placeholder="Password"
              autoFocus
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          <button type="submit" className="w-full bg-blue-700 hover:bg-blue-600 text-white py-2 rounded">
            Unlock
          </button>
        </form>
      </div>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center z-10">
        <div className="flex space-x-4 text-gray-500 text-sm">
          <button>Restart</button>
          <button>Shut Down</button>
          <button>Sleep</button>
        </div>
      </div>
    </div>
  )
}
