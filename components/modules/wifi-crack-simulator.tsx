"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Wifi, AlertCircle, RefreshCw } from "lucide-react"

export default function WifiCrackSimulator() {
  const [step, setStep] = useState(0)
  const [scanning, setScanning] = useState(false)
  const [networks, setNetworks] = useState<any[]>([])
  const [selectedNetwork, setSelectedNetwork] = useState<any | null>(null)
  const [capturing, setCapturing] = useState(false)
  const [captureProgress, setCaptureProgress] = useState(0)
  const [handshakeCaptured, setHandshakeCaptured] = useState(false)
  const [cracking, setCracking] = useState(false)
  const [crackProgress, setCrackProgress] = useState(0)
  const [password, setPassword] = useState<string | null>(null)

  const startScan = () => {
    if (scanning) return

    setScanning(true)
    setNetworks([])

    // Simulate network scanning
    setTimeout(() => {
      const fakeNetworks = [
        { bssid: "00:11:22:33:44:55", essid: "HomeWiFi", channel: 6, signal: -45, security: "WPA2" },
        { bssid: "AA:BB:CC:DD:EE:FF", essid: "Neighbor_5G", channel: 11, signal: -65, security: "WPA2" },
        { bssid: "11:22:33:44:55:66", essid: "CoffeeShop", channel: 1, signal: -70, security: "WPA2" },
        { bssid: "AA:11:BB:22:CC:33", essid: "GuestNetwork", channel: 3, signal: -55, security: "WPA" },
        { bssid: "FF:EE:DD:CC:BB:AA", essid: "Office_Network", channel: 9, signal: -50, security: "WPA2" },
      ]

      setNetworks(fakeNetworks)
      setScanning(false)
    }, 3000)
  }

  const selectNetwork = (network: any) => {
    setSelectedNetwork(network)
    setStep(1)
  }

  const startCapture = () => {
    if (capturing || !selectedNetwork) return

    setCapturing(true)
    setCaptureProgress(0)
    setHandshakeCaptured(false)

    // Simulate handshake capture
    const interval = setInterval(() => {
      setCaptureProgress((prev) => {
        const newProgress = prev + Math.random() * 5 + 1

        if (newProgress >= 100) {
          clearInterval(interval)
          setCapturing(false)
          setHandshakeCaptured(true)
          setStep(2)
          return 100
        }

        return newProgress
      })
    }, 300)
  }

  const startCracking = () => {
    if (cracking || !handshakeCaptured) return

    setCracking(true)
    setCrackProgress(0)
    setPassword(null)

    // Simulate password cracking
    const interval = setInterval(() => {
      setCrackProgress((prev) => {
        const newProgress = prev + Math.random() * 2 + 0.5

        if (newProgress >= 100) {
          clearInterval(interval)
          setCracking(false)
          setPassword(generateFakePassword())
          return 100
        }

        return newProgress
      })
    }, 200)
  }

  const generateFakePassword = () => {
    const passwords = ["sunshine123", "football2022", "iloveyou2023", "qwerty123", "password123"]
    return passwords[Math.floor(Math.random() * passwords.length)]
  }

  const resetSimulation = () => {
    setStep(0)
    setScanning(false)
    setNetworks([])
    setSelectedNetwork(null)
    setCapturing(false)
    setCaptureProgress(0)
    setHandshakeCaptured(false)
    setCracking(false)
    setCrackProgress(0)
    setPassword(null)
  }

  return (
    <div className="text-green-500">
      <div className="mb-6">
        <h2 className="text-xl mb-4 flex items-center">
          <Wifi className="mr-2" />
          WiFi Crack Simulation
        </h2>
        <p className="text-green-600 mb-4 text-sm">
          This module simulates WiFi scanning, handshake capture, and key cracking sequence for educational purposes.
        </p>
        <div className="flex items-center bg-black p-1 rounded border border-green-700 text-sm mb-4">
          <AlertCircle className="w-4 h-4 mr-2 text-yellow-500" />
          <span className="text-yellow-500">Educational simulation only. No actual WiFi cracking is performed.</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {step === 0 && (
            <div className="bg-black border border-green-700 rounded overflow-hidden">
              <div className="bg-black text-green-400 px-4 py-2 border-b border-green-700 flex justify-between items-center">
                <span>Available Networks</span>
                <button
                  onClick={startScan}
                  disabled={scanning}
                  className={`text-xs px-2 py-1 rounded border border-green-700 ${
                    scanning ? "text-green-700" : "text-green-500 hover:bg-green-900 hover:bg-opacity-20"
                  }`}
                >
                  {scanning ? "Scanning..." : "Scan Networks"}
                </button>
              </div>

              <div className="p-4">
                {networks.length === 0 ? (
                  <div className="text-center py-8">
                    {scanning ? (
                      <div className="flex flex-col items-center">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, ease: "linear" }}
                        >
                          <RefreshCw className="w-8 h-8 text-green-500 mb-2" />
                        </motion.div>
                        <p className="text-green-600">Scanning for wireless networks...</p>
                      </div>
                    ) : (
                      <p className="text-green-700">No networks found. Click "Scan Networks" to begin.</p>
                    )}
                  </div>
                ) : (
                  <div>
                    <div className="grid grid-cols-12 gap-2 text-green-400 border-b border-green-900 pb-2 mb-2 text-sm">
                      <div className="col-span-5">ESSID</div>
                      <div className="col-span-3">BSSID</div>
                      <div className="col-span-1">CH</div>
                      <div className="col-span-1">PWR</div>
                      <div className="col-span-2">Security</div>
                    </div>

                    {networks.map((network, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="grid grid-cols-12 gap-2 text-green-600 py-2 border-b border-green-900 last:border-b-0 text-sm cursor-pointer hover:bg-green-900 hover:bg-opacity-10"
                        onClick={() => selectNetwork(network)}
                      >
                        <div className="col-span-5">{network.essid}</div>
                        <div className="col-span-3 font-mono">{network.bssid}</div>
                        <div className="col-span-1">{network.channel}</div>
                        <div className="col-span-1">{network.signal} dBm</div>
                        <div className="col-span-2">{network.security}</div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {step === 1 && selectedNetwork && (
            <div className="bg-black border border-green-700 rounded overflow-hidden">
              <div className="bg-black text-green-400 px-4 py-2 border-b border-green-700 flex justify-between items-center">
                <span>Handshake Capture: {selectedNetwork.essid}</span>
                <button
                  onClick={resetSimulation}
                  className="text-xs text-green-700 hover:text-green-500 px-2 py-1 rounded border border-green-700"
                >
                  Back
                </button>
              </div>

              <div className="p-4">
                <div className="mb-4">
                  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <div>
                      <span className="text-green-700">BSSID:</span>
                      <span className="ml-2 font-mono">{selectedNetwork.bssid}</span>
                    </div>
                    <div>
                      <span className="text-green-700">Channel:</span>
                      <span className="ml-2">{selectedNetwork.channel}</span>
                    </div>
                    <div>
                      <span className="text-green-700">Signal:</span>
                      <span className="ml-2">{selectedNetwork.signal} dBm</span>
                    </div>
                    <div>
                      <span className="text-green-700">Security:</span>
                      <span className="ml-2">{selectedNetwork.security}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-green-600 text-sm mb-2">
                      Attempting to capture WPA handshake for {selectedNetwork.essid}. This process involves monitoring
                      authentication between clients and the access point.
                    </p>

                    <button
                      onClick={startCapture}
                      disabled={capturing}
                      className={`w-full px-4 py-2 rounded border border-green-700 ${
                        capturing
                          ? "bg-green-900 bg-opacity-10 text-green-700"
                          : "bg-green-900 bg-opacity-20 hover:bg-opacity-30 text-green-500"
                      }`}
                    >
                      {capturing ? "Capturing..." : "Start Capture"}
                    </button>
                  </div>

                  {capturing && (
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Capturing handshake...</span>
                        <span>{Math.floor(captureProgress)}%</span>
                      </div>
                      <div className="w-full bg-black border border-green-900 rounded-full h-2.5 mb-2">
                        <motion.div
                          className="bg-green-500 h-2.5 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${captureProgress}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>

                      <div className="font-mono text-xs text-green-700 h-40 overflow-y-auto border border-green-900 p-2 rounded">
                        <div>
                          CH {selectedNetwork.channel} ][ Elapsed: 0 s ][ {new Date().toISOString()}
                        </div>
                        <div>BSSID PWR Beacons #Data, #/s CH MB ENC CIPHER AUTH ESSID</div>
                        <div className="text-green-600">
                          {selectedNetwork.bssid} {selectedNetwork.signal} {Math.floor(Math.random() * 1000)}{" "}
                          {Math.floor(Math.random() * 100)} 0 {selectedNetwork.channel} 130 {selectedNetwork.security}{" "}
                          CCMP PSK {selectedNetwork.essid}
                        </div>
                        <div className="mt-2">BSSID STATION PWR Rate Lost Frames Notes</div>
                        {captureProgress > 30 && (
                          <div className="text-green-600">{selectedNetwork.bssid} 00:11:22:33:44:55 -55 0 - 1 0 12</div>
                        )}
                        {captureProgress > 60 && (
                          <div className="text-green-600">{selectedNetwork.bssid} AA:BB:CC:DD:EE:FF -60 0 - 1 0 8</div>
                        )}
                        {captureProgress > 80 && (
                          <div className="text-yellow-500">WPA handshake: {selectedNetwork.bssid}</div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {step === 2 && selectedNetwork && (
            <div className="bg-black border border-green-700 rounded overflow-hidden">
              <div className="bg-black text-green-400 px-4 py-2 border-b border-green-700 flex justify-between items-center">
                <span>Password Cracking: {selectedNetwork.essid}</span>
                <button
                  onClick={resetSimulation}
                  className="text-xs text-green-700 hover:text-green-500 px-2 py-1 rounded border border-green-700"
                >
                  Reset
                </button>
              </div>

              <div className="p-4">
                <div className="mb-4">
                  <div className="p-3 bg-green-900 bg-opacity-20 border border-green-700 rounded mb-4">
                    <div className="flex items-center">
                      <Wifi className="w-5 h-5 mr-2 text-green-400" />
                      <span className="text-green-400">WPA Handshake captured successfully!</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <div>
                      <span className="text-green-700">Network:</span>
                      <span className="ml-2">{selectedNetwork.essid}</span>
                    </div>
                    <div>
                      <span className="text-green-700">BSSID:</span>
                      <span className="ml-2 font-mono">{selectedNetwork.bssid}</span>
                    </div>
                    <div>
                      <span className="text-green-700">Security:</span>
                      <span className="ml-2">{selectedNetwork.security}</span>
                    </div>
                    <div>
                      <span className="text-green-700">Handshake:</span>
                      <span className="ml-2 text-green-400">Captured</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-green-600 text-sm mb-2">
                      Now attempting to crack the password using dictionary attack. This process tries common passwords
                      against the captured handshake.
                    </p>

                    <button
                      onClick={startCracking}
                      disabled={cracking}
                      className={`w-full px-4 py-2 rounded border border-green-700 ${
                        cracking
                          ? "bg-green-900 bg-opacity-10 text-green-700"
                          : "bg-green-900 bg-opacity-20 hover:bg-opacity-30 text-green-500"
                      }`}
                    >
                      {cracking ? "Cracking in progress..." : "Start Password Cracking"}
                    </button>
                  </div>

                  {cracking && (
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Dictionary attack in progress...</span>
                        <span>{Math.floor(crackProgress)}%</span>
                      </div>
                      <div className="w-full bg-black border border-green-900 rounded-full h-2.5 mb-2">
                        <motion.div
                          className="bg-green-500 h-2.5 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${crackProgress}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>

                      <div className="font-mono text-xs text-green-700 h-40 overflow-y-auto border border-green-900 p-2 rounded">
                        <div>Aircrack-ng 1.6 - Educational Simulation</div>
                        <div className="mt-1">Reading packets, please wait...</div>
                        <div className="mt-1">Opening {selectedNetwork.essid}.cap</div>
                        <div className="mt-1">Read 1024 packets.</div>
                        <div className="mt-1"># BSSID ESSID Encryption</div>
                        <div className="text-green-600">
                          1 {selectedNetwork.bssid} {selectedNetwork.essid.padEnd(25)} {selectedNetwork.security} (1
                          handshake)
                        </div>
                        <div className="mt-1">Choosing first network as target.</div>
                        <div className="mt-1">Opening passwords.txt</div>
                        <div className="mt-1">Reading wordlist...</div>
                        {crackProgress > 20 && <div className="mt-1">Tried 1024 keys (1024 keys/s)</div>}
                        {crackProgress > 40 && <div className="mt-1">Tried 2048 keys (1024 keys/s)</div>}
                        {crackProgress > 60 && <div className="mt-1">Tried 3072 keys (1024 keys/s)</div>}
                        {crackProgress > 80 && <div className="mt-1">Tried 4096 keys (1024 keys/s)</div>}
                        {crackProgress > 95 && <div className="text-green-400 mt-1">KEY FOUND! [ {password} ]</div>}
                      </div>
                    </div>
                  )}

                  {password && (
                    <div className="mt-4 p-4 bg-green-900 bg-opacity-20 border border-green-700 rounded">
                      <h3 className="text-green-400 mb-2">Password Found:</h3>
                      <div className="bg-black p-2 rounded border border-green-900 font-mono text-center">
                        <span className="text-green-400 text-lg">{password}</span>
                      </div>
                      <div className="mt-4 text-yellow-500 text-sm">
                        <div className="flex items-center">
                          <AlertCircle className="w-4 h-4 mr-2" />
                          <span>
                            This demonstrates why using strong, unique passwords is critical for WiFi security.
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-black border border-green-700 rounded p-4">
          <h3 className="text-green-400 mb-4">WiFi Security Information</h3>

          <div className="space-y-4 text-sm">
            <div>
              <h4 className="text-green-500 mb-2">How WiFi Cracking Works:</h4>
              <p className="text-green-600">WiFi cracking typically involves these steps:</p>
              <ol className="list-decimal pl-5 mt-2 space-y-1 text-green-600">
                <li>Scanning for available networks</li>
                <li>Capturing the WPA handshake (authentication process)</li>
                <li>Using dictionary attacks or brute force to find the password</li>
              </ol>
            </div>

            <div>
              <h4 className="text-green-500 mb-2">WiFi Security Best Practices:</h4>
              <ul className="list-disc pl-5 space-y-1 text-green-600">
                <li>Use WPA3 encryption when available (more secure than WPA2)</li>
                <li>Create a strong, unique password (12+ characters)</li>
                <li>Change default router login credentials</li>
                <li>Keep router firmware updated</li>
                <li>Enable MAC address filtering (adds a layer of security)</li>
                <li>Use a guest network for visitors</li>
                <li>Disable WPS (WiFi Protected Setup)</li>
              </ul>
            </div>

            <div>
              <h4 className="text-green-500 mb-2">Common Vulnerabilities:</h4>
              <ul className="list-disc pl-5 space-y-1 text-green-600">
                <li>Weak passwords that are easily guessed</li>
                <li>Outdated security protocols (WEP, WPA)</li>
                <li>Default or unchanged router credentials</li>
                <li>WPS vulnerabilities in some routers</li>
                <li>Unpatched router firmware with known exploits</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
