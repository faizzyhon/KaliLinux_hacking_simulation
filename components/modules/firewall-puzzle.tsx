"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Shield, AlertCircle, Check, X, RefreshCw } from "lucide-react"

export default function FirewallPuzzle() {
  const [level, setLevel] = useState(1)
  const [grid, setGrid] = useState<string[][]>([])
  const [selectedNodes, setSelectedNodes] = useState<{ row: number; col: number }[]>([])
  const [isComplete, setIsComplete] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [message, setMessage] = useState("")

  useEffect(() => {
    generatePuzzle(level)
  }, [level])

  const generatePuzzle = (puzzleLevel: number) => {
    setIsComplete(false)
    setSelectedNodes([])
    setMessage("")

    const size = 4 + Math.min(puzzleLevel, 4)
    const newGrid: string[][] = []

    // Generate empty grid
    for (let i = 0; i < size; i++) {
      const row: string[] = []
      for (let j = 0; j < size; j++) {
        row.push("empty")
      }
      newGrid.push(row)
    }

    // Add start and end points
    const startRow = Math.floor(Math.random() * size)
    const endRow = Math.floor(Math.random() * size)
    newGrid[startRow][0] = "start"
    newGrid[endRow][size - 1] = "end"

    // Add obstacles based on level
    const numObstacles = puzzleLevel * 3
    let placedObstacles = 0

    while (placedObstacles < numObstacles) {
      const row = Math.floor(Math.random() * size)
      const col = Math.floor(Math.random() * size)

      // Don't place obstacles at start or end
      if ((row === startRow && col === 0) || (row === endRow && col === size - 1)) {
        continue
      }

      // Don't place obstacles in the first or last column to ensure solvability
      if (col === 0 || col === size - 1) {
        continue
      }

      if (newGrid[row][col] === "empty") {
        newGrid[row][col] = "obstacle"
        placedObstacles++
      }
    }

    setGrid(newGrid)
  }

  const handleNodeClick = (row: number, col: number) => {
    if (isComplete) return

    const nodeType = grid[row][col]

    // Can't select obstacles
    if (nodeType === "obstacle") return

    // Check if this is the start node and we're beginning
    if (nodeType === "start" && selectedNodes.length === 0) {
      setSelectedNodes([{ row, col }])
      return
    }

    // Check if we're trying to select a node that's not adjacent to the last selected node
    if (selectedNodes.length > 0) {
      const lastNode = selectedNodes[selectedNodes.length - 1]
      const isAdjacent =
        (Math.abs(row - lastNode.row) === 1 && col === lastNode.col) ||
        (Math.abs(col - lastNode.col) === 1 && row === lastNode.row)

      if (!isAdjacent) return

      // Check if we're trying to select a node we've already selected
      const alreadySelected = selectedNodes.some((node) => node.row === row && node.col === col)
      if (alreadySelected) {
        // If it's the previous node, we can backtrack
        if (
          selectedNodes[selectedNodes.length - 2]?.row === row &&
          selectedNodes[selectedNodes.length - 2]?.col === col
        ) {
          // Remove the last node (backtracking)
          setSelectedNodes((prev) => prev.slice(0, -1))
          return
        }

        return
      }

      // Check if we've reached the end node
      if (nodeType === "end") {
        setSelectedNodes((prev) => [...prev, { row, col }])
        setIsComplete(true)
        setMessage("Firewall bypassed successfully!")

        // Advance to next level after a delay
        setTimeout(() => {
          setLevel((prev) => prev + 1)
        }, 2000)

        return
      }
    }

    // Add the node to our path
    setSelectedNodes((prev) => [...prev, { row, col }])
  }

  const resetPuzzle = () => {
    setAttempts((prev) => prev + 1)
    generatePuzzle(level)
  }

  return (
    <div className="text-green-500">
      <div className="mb-6">
        <h2 className="text-xl mb-4 flex items-center">
          <Shield className="mr-2" />
          Firewall Puzzle
        </h2>
        <p className="text-green-600 mb-4 text-sm">
          This module simulates bypassing a firewall through a visual puzzle game. Connect the entry point to the exit
          by creating a path through the network.
        </p>
        <div className="flex items-center bg-black p-1 rounded border border-green-700 text-sm mb-4">
          <AlertCircle className="w-4 h-4 mr-2 text-yellow-500" />
          <span className="text-yellow-500">
            Educational simulation only. This is a puzzle game with no actual hacking functionality.
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-black border border-green-700 rounded overflow-hidden">
            <div className="bg-black text-green-400 px-4 py-2 border-b border-green-700 flex justify-between items-center">
              <span>Network Firewall - Level {level}</span>
              <button
                onClick={resetPuzzle}
                className="text-xs text-green-700 hover:text-green-500 px-2 py-1 rounded border border-green-700 flex items-center"
              >
                <RefreshCw className="w-3 h-3 mr-1" />
                Reset
              </button>
            </div>

            <div className="p-4">
              {isComplete && (
                <div className="mb-4 p-2 bg-green-900 bg-opacity-20 border border-green-700 rounded flex items-center">
                  <Check className="w-5 h-5 mr-2 text-green-500" />
                  <span className="text-green-400">{message}</span>
                </div>
              )}

              <div
                className="grid gap-2 justify-center"
                style={{ gridTemplateColumns: `repeat(${grid[0]?.length || 1}, minmax(0, 1fr))` }}
              >
                {grid.map((row, rowIndex) =>
                  row.map((cell, colIndex) => {
                    const isSelected = selectedNodes.some((node) => node.row === rowIndex && node.col === colIndex)
                    const isPath = isSelected && cell !== "start" && cell !== "end"

                    return (
                      <motion.div
                        key={`${rowIndex}-${colIndex}`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: (rowIndex * row.length + colIndex) * 0.01 }}
                        className={`
                          w-10 h-10 rounded flex items-center justify-center cursor-pointer
                          ${cell === "obstacle" ? "bg-red-900 bg-opacity-30 border border-red-700" : ""}
                          ${cell === "start" ? "bg-green-900 bg-opacity-30 border border-green-700" : ""}
                          ${cell === "end" ? "bg-blue-900 bg-opacity-30 border border-blue-700" : ""}
                          ${isPath ? "bg-green-900 bg-opacity-20 border border-green-500" : ""}
                          ${cell === "empty" && !isPath ? "border border-green-900 hover:border-green-700" : ""}
                        `}
                        onClick={() => handleNodeClick(rowIndex, colIndex)}
                      >
                        {cell === "start" && <div className="text-xs text-green-500">IN</div>}
                        {cell === "end" && <div className="text-xs text-blue-500">OUT</div>}
                        {cell === "obstacle" && <X className="w-4 h-4 text-red-500" />}
                      </motion.div>
                    )
                  }),
                )}
              </div>

              <div className="mt-4 text-xs text-green-700 text-center">
                Click on adjacent nodes to create a path from the entry point (IN) to the exit (OUT)
              </div>
            </div>
          </div>
        </div>

        <div className="bg-black border border-green-700 rounded p-4">
          <h3 className="text-green-400 mb-4">Puzzle Information</h3>

          <div className="space-y-4 text-sm">
            <div>
              <h4 className="text-green-500 mb-2">How to Play:</h4>
              <ol className="list-decimal pl-5 space-y-1 text-green-600">
                <li>Start by clicking the entry point (IN)</li>
                <li>Create a path by clicking adjacent nodes</li>
                <li>Navigate around obstacles (red X)</li>
                <li>Reach the exit point (OUT) to complete the level</li>
                <li>You can backtrack by clicking the previous node</li>
              </ol>
            </div>

            <div>
              <h4 className="text-green-500 mb-2">Difficulty Levels:</h4>
              <ul className="list-disc pl-5 space-y-1 text-green-600">
                <li>Level 1: Basic grid with few obstacles</li>
                <li>Level 2: Larger grid with more obstacles</li>
                <li>Level 3: Complex layout with strategic obstacles</li>
                <li>Level 4+: Advanced challenges with dense obstacle patterns</li>
              </ul>
            </div>

            <div>
              <h4 className="text-green-500 mb-2">Educational Context:</h4>
              <p className="text-green-600">
                This puzzle simulates the concept of finding vulnerabilities or paths through network security systems.
                In real network security:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-green-600">
                <li>Firewalls block unauthorized access while permitting authorized communications</li>
                <li>Security professionals analyze network topologies to identify potential security gaps</li>
                <li>Penetration testers look for paths through security systems</li>
                <li>Network segmentation creates obstacles for potential attackers</li>
              </ul>
            </div>

            <div className="p-3 bg-green-900 bg-opacity-20 border border-green-700 rounded">
              <div className="flex items-center">
                <div className="mr-3">
                  <div className="text-green-400 font-medium">Current Level: {level}</div>
                  <div className="text-green-700 text-xs">Attempts: {attempts}</div>
                </div>
                {isComplete && (
                  <div className="ml-auto">
                    <Check className="w-5 h-5 text-green-500" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
