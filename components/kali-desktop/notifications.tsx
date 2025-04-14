"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useKaliDesktop } from "@/contexts/kali-desktop-context"
import { X, Bell } from "lucide-react"

export default function KaliNotifications() {
  const { notifications, dismissNotification } = useKaliDesktop()

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 w-80">
      <AnimatePresence>
        {notifications.map((notification, index) => (
          <motion.div
            key={index}
            className="bg-gray-900 border border-blue-900 rounded shadow-lg overflow-hidden"
            initial={{ opacity: 0, y: -20, x: 20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-between px-3 py-2 bg-blue-900 bg-opacity-50">
              <div className="flex items-center text-white text-sm font-medium">
                <Bell className="w-4 h-4 mr-2" />
                Notification
              </div>
              <button className="text-gray-300 hover:text-white" onClick={() => dismissNotification(index)}>
                <X size={14} />
              </button>
            </div>
            <div className="p-3 text-white text-sm">{notification}</div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
