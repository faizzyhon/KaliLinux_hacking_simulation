"use client"

import { useKaliDesktop } from "@/contexts/kali-desktop-context"

export default function KaliWorkspaceIndicator() {
  const { workspaces, activeWorkspace, switchWorkspace } = useKaliDesktop()

  return (
    <div className="fixed top-4 right-4 z-10 bg-gray-900 bg-opacity-70 border border-blue-900 rounded p-1 flex space-x-1">
      {workspaces.map((workspace) => (
        <div
          key={workspace.id}
          className={`w-6 h-6 flex items-center justify-center rounded cursor-pointer ${
            workspace.id === activeWorkspace ? "bg-blue-700" : "hover:bg-blue-900 hover:bg-opacity-50"
          }`}
          onClick={() => switchWorkspace(workspace.id)}
        >
          <span className="text-white text-xs">{workspace.name.split(" ")[1]}</span>
        </div>
      ))}
    </div>
  )
}
