"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function BootAnimation() {
  const [bootComplete, setBootComplete] = useState(false)
  const [currentLine, setCurrentLine] = useState(0)
  const [showLogo, setShowLogo] = useState(false)

  const bootLines = [
    "Loading Kali Linux 2023.2...",
    "Starting system initialization...",
    "Checking file systems...",
    "Mounting root filesystem...",
    "Starting system services...",
    "Starting network services...",
    "Starting security services...",
    "Loading kernel modules...",
    "Initializing hardware...",
    "Starting X server...",
    "Starting desktop environment...",
    "Starting Kali services...",
    "System ready. Welcome to Kali Linux!",
  ]

  useEffect(() => {
    if (currentLine < bootLines.length) {
      const timer = setTimeout(() => {
        setCurrentLine((prev) => prev + 1)
      }, 300)
      return () => clearTimeout(timer)
    } else {
      const timer = setTimeout(() => {
        setShowLogo(true)
        setTimeout(() => {
          setBootComplete(true)
        }, 1500)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [currentLine])

  if (bootComplete) return null

  return (
    <motion.div
      className="fixed inset-0 bg-black z-50 flex items-center justify-center"
      animate={bootComplete ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.5 }}
      onAnimationComplete={() => {
        if (bootComplete) {
          document.body.style.overflow = "auto"
        } else {
          document.body.style.overflow = "hidden"
        }
      }}
    >
      {!showLogo ? (
        <div className="w-full max-w-2xl p-8">
          <div className="font-mono text-blue-500">
            {bootLines.slice(0, currentLine).map((line, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-2"
              >
                <span className="text-blue-700 mr-2">[{(index + 1).toString().padStart(2, "0")}]</span>
                {line}
              </motion.div>
            ))}

            {currentLine < bootLines.length && (
              <motion.div
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1 }}
                className="inline-block w-3 h-5 bg-blue-500 ml-1"
              />
            )}
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="flex items-center justify-center mb-4">
            <svg width="120" height="120" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
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
          <h1 className="text-4xl font-bold text-blue-500 mb-2 font-mono">Kali Linux</h1>
          <p className="text-blue-400 mb-4">The Most Advanced Penetration Testing Distribution</p>
          <div className="text-blue-600 text-sm">
            <p>Developed by Muhammad Faizan</p>
            <p>faizzyhon@gmail.com | faizzyhon.vercel.app</p>
          </div>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5 }}
            className="h-1 bg-blue-700 mt-6 max-w-md mx-auto"
          />
        </motion.div>
      )}
    </motion.div>
  )
}
