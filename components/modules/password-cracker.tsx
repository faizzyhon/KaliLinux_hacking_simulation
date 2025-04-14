"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Lock, AlertCircle, RefreshCw } from "lucide-react"

export default function PasswordCracker() {
  const [password, setPassword] = useState("")
  const [hashType, setHashType] = useState("md5")
  const [isCracking, setIsCracking] = useState(false)
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState<string | null>(null)
  const [hashValue, setHashValue] = useState("")
  const [elapsedTime, setElapsedTime] = useState(0)
  const [attemptRate, setAttemptRate] = useState(0)

  const hashTypes = [
    { value: "md5", label: "MD5" },
    { value: "sha1", label: "SHA-1" },
    { value: "sha256", label: "SHA-256" },
    { value: "ntlm", label: "NTLM" },
  ]

  const generateHash = () => {
    // This is just for simulation - not actual hashing
    let hash = ""
    const chars = "0123456789abcdef"

    if (hashType === "md5") {
      // Generate fake MD5 hash (32 chars)
      for (let i = 0; i < 32; i++) {
        hash += chars[Math.floor(Math.random() * chars.length)]
      }
    } else if (hashType === "sha1") {
      // Generate fake SHA-1 hash (40 chars)
      for (let i = 0; i < 40; i++) {
        hash += chars[Math.floor(Math.random() * chars.length)]
      }
    } else if (hashType === "sha256") {
      // Generate fake SHA-256 hash (64 chars)
      for (let i = 0; i < 64; i++) {
        hash += chars[Math.floor(Math.random() * chars.length)]
      }
    } else if (hashType === "ntlm") {
      // Generate fake NTLM hash (32 chars)
      for (let i = 0; i < 32; i++) {
        hash += chars[Math.floor(Math.random() * chars.length)]
      }
    }

    return hash
  }

  const startCracking = () => {
    if (!password || isCracking) return

    setIsCracking(true)
    setProgress(0)
    setResult(null)
    setElapsedTime(0)
    setAttemptRate(Math.floor(Math.random() * 500000) + 100000) // Random rate between 100K-600K/s

    const hash = generateHash()
    setHashValue(hash)

    const startTime = Date.now()

    // Simulate cracking progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 2 + 0.5

        if (newProgress >= 100) {
          clearInterval(interval)
          setIsCracking(false)
          setResult(password)
          return 100
        }

        // Update elapsed time
        setElapsedTime((Date.now() - startTime) / 1000)

        return newProgress
      })
    }, 200)
  }

  const resetSimulation = () => {
    setIsCracking(false)
    setProgress(0)
    setResult(null)
    setHashValue("")
    setElapsedTime(0)
  }

  return (
    <div className="text-green-500">
      <div className="mb-6">
        <h2 className="text-xl mb-4 flex items-center">
          <Lock className="mr-2" />
          Password Cracker Simulator
        </h2>
        <p className="text-green-600 mb-4 text-sm">
          This module simulates a password cracking tool similar to Hashcat. It demonstrates how password hashing and
          cracking works through an educational simulation.
        </p>
        <div className="flex items-center bg-black p-1 rounded border border-green-700 text-sm mb-4">
          <AlertCircle className="w-4 h-4 mr-2 text-yellow-500" />
          <span className="text-yellow-500">
            Educational simulation only. No actual password cracking is performed.
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <div className="bg-black border border-green-700 rounded p-4 mb-4">
            <h3 className="text-green-400 mb-4">Password Input</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-green-600 mb-2 text-sm">Enter a password to "crack":</label>
                <input
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isCracking}
                  className="w-full bg-black border border-green-700 text-green-500 px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                  placeholder="Enter password"
                />
              </div>

              <div>
                <label className="block text-green-600 mb-2 text-sm">Hash Type:</label>
                <select
                  value={hashType}
                  onChange={(e) => setHashType(e.target.value)}
                  disabled={isCracking}
                  className="w-full bg-black border border-green-700 text-green-500 px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                >
                  {hashTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <button
                  onClick={startCracking}
                  disabled={!password || isCracking}
                  className={`w-full px-4 py-2 rounded border border-green-700 ${
                    !password || isCracking
                      ? "bg-green-900 bg-opacity-10 text-green-700"
                      : "bg-green-900 bg-opacity-20 hover:bg-opacity-30 text-green-500"
                  }`}
                >
                  {isCracking ? "Cracking in progress..." : "Start Cracking Simulation"}
                </button>
              </div>
            </div>
          </div>

          {(isCracking || result) && (
            <div className="bg-black border border-green-700 rounded p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-green-400">Cracking Status</h3>
                {result && (
                  <button
                    onClick={resetSimulation}
                    className="text-xs text-green-700 hover:text-green-500 border border-green-700 px-2 py-1 rounded"
                  >
                    <RefreshCw className="w-3 h-3 inline mr-1" />
                    Reset
                  </button>
                )}
              </div>

              {isCracking && (
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Cracking progress...</span>
                      <span>{Math.floor(progress)}%</span>
                    </div>
                    <div className="w-full bg-black border border-green-900 rounded-full h-2.5">
                      <motion.div
                        className="bg-green-500 h-2.5 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-green-600">Elapsed Time:</div>
                    <div>{elapsedTime.toFixed(1)} seconds</div>

                    <div className="text-green-600">Hash Type:</div>
                    <div>{hashTypes.find((t) => t.value === hashType)?.label}</div>

                    <div className="text-green-600">Attempt Rate:</div>
                    <div>{attemptRate.toLocaleString()} H/s</div>

                    <div className="text-green-600">Attack Mode:</div>
                    <div>Brute Force + Dictionary</div>
                  </div>
                </div>
              )}

              {result && (
                <div className="space-y-4">
                  <div className="p-3 bg-green-900 bg-opacity-20 border border-green-700 rounded">
                    <div className="text-center">
                      <div className="text-green-600 mb-1">Password Found:</div>
                      <div className="text-xl text-green-400 font-mono">{result}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-green-600">Time to Crack:</div>
                    <div>{elapsedTime.toFixed(1)} seconds</div>

                    <div className="text-green-600">Hash Type:</div>
                    <div>{hashTypes.find((t) => t.value === hashType)?.label}</div>

                    <div className="text-green-600">Hash Value:</div>
                    <div className="font-mono text-xs break-all">{hashValue}</div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="bg-black border border-green-700 rounded p-4">
          <h3 className="text-green-400 mb-4">Password Security Information</h3>

          <div className="space-y-4 text-sm">
            <div>
              <h4 className="text-green-500 mb-2">How Password Cracking Works:</h4>
              <p className="text-green-600">
                Password cracking tools attempt to recover passwords from stored hashes. They use techniques like:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-green-600">
                <li>Dictionary attacks - trying common words and passwords</li>
                <li>Brute force attacks - trying all possible character combinations</li>
                <li>Rainbow table attacks - using precomputed hash tables</li>
                <li>Hybrid attacks - combining dictionary words with variations</li>
              </ul>
            </div>

            <div>
              <h4 className="text-green-500 mb-2">Password Strength Factors:</h4>
              <ul className="list-disc pl-5 space-y-1 text-green-600">
                <li>Length - longer passwords are exponentially harder to crack</li>
                <li>Complexity - using a mix of character types (uppercase, lowercase, numbers, symbols)</li>
                <li>Unpredictability - avoiding common patterns and dictionary words</li>
                <li>Uniqueness - using different passwords for different services</li>
              </ul>
            </div>

            <div>
              <h4 className="text-green-500 mb-2">Best Practices:</h4>
              <ul className="list-disc pl-5 space-y-1 text-green-600">
                <li>Use a password manager to generate and store strong, unique passwords</li>
                <li>Enable two-factor authentication when available</li>
                <li>Use passphrases instead of single passwords</li>
                <li>Regularly update critical passwords</li>
                <li>Never reuse passwords across important accounts</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
