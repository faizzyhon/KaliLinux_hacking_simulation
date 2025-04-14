"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Trophy, AlertCircle, Lock, CheckCircle, Clock, Database, FileText, Server, Shield } from "lucide-react"

export default function MissionMode() {
  const [selectedMission, setSelectedMission] = useState<number | null>(null)

  const missions = [
    {
      id: 1,
      title: "Database Extraction",
      difficulty: "Easy",
      description: "Extract sensitive data from a simulated vulnerable database server.",
      objectives: [
        "Scan the target system for open ports",
        "Identify the database service",
        "Find and exploit a SQL injection vulnerability",
        "Extract the mock database contents",
      ],
      completed: true,
      icon: Database,
    },
    {
      id: 2,
      title: "Password Vault",
      difficulty: "Medium",
      description: "Crack a simulated password vault to retrieve stored credentials.",
      objectives: [
        "Analyze the password vault encryption",
        "Perform a dictionary attack on the master password",
        "Decrypt the vault contents",
        "Retrieve the stored credentials",
      ],
      completed: true,
      icon: Lock,
    },
    {
      id: 3,
      title: "Network Infiltration",
      difficulty: "Hard",
      description: "Infiltrate a simulated corporate network and gain access to protected systems.",
      objectives: [
        "Map the network infrastructure",
        "Identify vulnerable services",
        "Exploit vulnerabilities to gain initial access",
        "Escalate privileges to access protected systems",
      ],
      completed: false,
      icon: Server,
    },
    {
      id: 4,
      title: "Document Exfiltration",
      difficulty: "Medium",
      description: "Locate and exfiltrate confidential documents from a simulated secure server.",
      objectives: [
        "Gain access to the file server",
        "Locate confidential documents",
        "Bypass access controls",
        "Exfiltrate the documents without detection",
      ],
      completed: false,
      icon: FileText,
    },
    {
      id: 5,
      title: "Firewall Bypass",
      difficulty: "Expert",
      description: "Bypass a sophisticated simulated firewall to access a protected internal network.",
      objectives: [
        "Analyze the firewall rules",
        "Identify potential bypass methods",
        "Execute the bypass technique",
        "Access the protected internal network",
      ],
      completed: false,
      icon: Shield,
    },
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "text-green-500 bg-green-900 bg-opacity-20 border-green-700"
      case "Medium":
        return "text-yellow-500 bg-yellow-900 bg-opacity-20 border-yellow-700"
      case "Hard":
        return "text-orange-500 bg-orange-900 bg-opacity-20 border-orange-700"
      case "Expert":
        return "text-red-500 bg-red-900 bg-opacity-20 border-red-700"
      default:
        return "text-green-500 bg-green-900 bg-opacity-20 border-green-700"
    }
  }

  return (
    <div className="text-green-500">
      <div className="mb-6">
        <h2 className="text-xl mb-4 flex items-center">
          <Trophy className="mr-2" />
          Mission Mode
        </h2>
        <p className="text-green-600 mb-4 text-sm">
          This module provides story-based red team scenarios with objectives. Complete missions to earn rewards and
          progress through the simulation.
        </p>
        <div className="flex items-center bg-black p-1 rounded border border-green-700 text-sm mb-4">
          <AlertCircle className="w-4 h-4 mr-2 text-yellow-500" />
          <span className="text-yellow-500">
            Educational simulation only. All missions are simulated for learning purposes.
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-black border border-green-700 rounded overflow-hidden">
            <div className="bg-black text-green-400 px-4 py-2 border-b border-green-700">
              <span>Available Missions</span>
            </div>

            <div className="p-2">
              {missions.map((mission, index) => (
                <motion.div
                  key={mission.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-3 border rounded mb-2 cursor-pointer hover:bg-green-900 hover:bg-opacity-10 ${
                    selectedMission === mission.id ? "border-green-500 bg-green-900 bg-opacity-10" : "border-green-900"
                  }`}
                  onClick={() => setSelectedMission(mission.id)}
                >
                  <div className="flex items-center">
                    <mission.icon className="w-5 h-5 mr-3 text-green-500" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="text-green-400">{mission.title}</div>
                        {mission.completed && <CheckCircle className="w-4 h-4 text-green-500" />}
                      </div>
                      <div className="flex items-center mt-1">
                        <span
                          className={`text-xs px-2 py-0.5 rounded border ${getDifficultyColor(mission.difficulty)}`}
                        >
                          {mission.difficulty}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="bg-black border border-green-700 rounded overflow-hidden mt-4 p-4">
            <h3 className="text-green-400 mb-3">Your Progress</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-green-600">Missions Completed:</span>
                  <span className="text-green-400">2/5</span>
                </div>
                <div className="w-full bg-black border border-green-900 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: "40%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-green-600">Experience Points:</span>
                  <span className="text-green-400">1250 XP</span>
                </div>
                <div className="w-full bg-black border border-green-900 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: "25%" }} />
                </div>
              </div>

              <div className="pt-2">
                <div className="text-sm text-green-600 mb-2">Earned Badges:</div>
                <div className="flex space-x-2">
                  <div
                    className="w-8 h-8 rounded-full bg-green-900 border border-green-700 flex items-center justify-center"
                    title="Database Expert"
                  >
                    <Database className="w-4 h-4 text-green-500" />
                  </div>
                  <div
                    className="w-8 h-8 rounded-full bg-green-900 border border-green-700 flex items-center justify-center"
                    title="Password Cracker"
                  >
                    <Lock className="w-4 h-4 text-green-500" />
                  </div>
                  <div
                    className="w-8 h-8 rounded-full bg-gray-900 border border-gray-700 flex items-center justify-center opacity-50"
                    title="Network Infiltrator"
                  >
                    <Server className="w-4 h-4 text-gray-500" />
                  </div>
                  <div
                    className="w-8 h-8 rounded-full bg-gray-900 border border-gray-700 flex items-center justify-center opacity-50"
                    title="Document Specialist"
                  >
                    <FileText className="w-4 h-4 text-gray-500" />
                  </div>
                  <div
                    className="w-8 h-8 rounded-full bg-gray-900 border border-gray-700 flex items-center justify-center opacity-50"
                    title="Firewall Bypasser"
                  >
                    <Shield className="w-4 h-4 text-gray-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          {selectedMission ? (
            <div className="bg-black border border-green-700 rounded overflow-hidden">
              <div className="bg-black text-green-400 px-4 py-2 border-b border-green-700 flex items-center">
                <span>Mission Details: {missions.find((m) => m.id === selectedMission)?.title}</span>
              </div>

              <div className="p-4">
                {(() => {
                  const mission = missions.find((m) => m.id === selectedMission)
                  if (!mission) return null

                  return (
                    <div>
                      <div className="flex items-center mb-4">
                        <mission.icon className="w-8 h-8 mr-3 text-green-500" />
                        <div>
                          <h3 className="text-green-400 text-lg">{mission.title}</h3>
                          <div className="flex items-center mt-1">
                            <span
                              className={`text-xs px-2 py-0.5 rounded border ${getDifficultyColor(mission.difficulty)}`}
                            >
                              {mission.difficulty}
                            </span>
                            <span className="text-green-700 text-xs ml-3 flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              Est. time:{" "}
                              {mission.difficulty === "Easy"
                                ? "15-20"
                                : mission.difficulty === "Medium"
                                  ? "25-30"
                                  : mission.difficulty === "Hard"
                                    ? "35-45"
                                    : "50-60"}{" "}
                              min
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="text-green-400 mb-2">Mission Briefing:</h4>
                        <p className="text-green-600 text-sm">{mission.description}</p>
                      </div>

                      <div className="mb-4">
                        <h4 className="text-green-400 mb-2">Objectives:</h4>
                        <div className="space-y-2">
                          {mission.objectives.map((objective, index) => (
                            <div key={index} className="flex items-start">
                              <div
                                className={`w-5 h-5 rounded-full flex items-center justify-center mr-2 mt-0.5 ${
                                  mission.completed
                                    ? "bg-green-900 bg-opacity-30 border border-green-500"
                                    : "bg-gray-900 border border-gray-700"
                                }`}
                              >
                                {mission.completed ? (
                                  <CheckCircle className="w-3 h-3 text-green-500" />
                                ) : (
                                  <span className="text-xs text-gray-500">{index + 1}</span>
                                )}
                              </div>
                              <span className={mission.completed ? "text-green-400" : "text-green-600"}>
                                {objective}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="text-green-400 mb-2">Rewards:</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center">
                            <Trophy className="w-4 h-4 mr-2 text-yellow-500" />
                            <span className="text-green-600">
                              {mission.difficulty === "Easy"
                                ? "250"
                                : mission.difficulty === "Medium"
                                  ? "500"
                                  : mission.difficulty === "Hard"
                                    ? "750"
                                    : "1000"}{" "}
                              XP
                            </span>
                          </div>
                          <div className="flex items-center">
                            <mission.icon className="w-4 h-4 mr-2 text-green-500" />
                            <span className="text-green-600">{mission.title.split(" ")[0]} Specialist Badge</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <button
                          className={`w-full px-4 py-2 rounded border ${
                            mission.completed
                              ? "border-green-700 bg-green-900 bg-opacity-20 text-green-500 cursor-not-allowed"
                              : "border-green-700 bg-green-900 bg-opacity-10 hover:bg-opacity-20 text-green-500"
                          }`}
                          disabled={mission.completed}
                        >
                          {mission.completed ? "Mission Completed" : "Start Mission"}
                        </button>
                      </div>

                      {mission.completed && (
                        <div className="mt-4 p-3 bg-green-900 bg-opacity-20 border border-green-700 rounded">
                          <div className="flex items-center">
                            <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                            <span className="text-green-400">Mission successfully completed!</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })()}
              </div>
            </div>
          ) : (
            <div className="bg-black border border-green-700 rounded overflow-hidden h-full flex items-center justify-center p-8">
              <div className="text-center">
                <Trophy className="w-16 h-16 text-green-500 mx-auto mb-4 opacity-50" />
                <h3 className="text-green-400 text-lg mb-2">Select a Mission</h3>
                <p className="text-green-700">
                  Choose a mission from the list to view details and start the simulation.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
