"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Server, AlertCircle } from "lucide-react"

export default function NetworkScanner() {
  const [scanning, setScanning] = useState(false)
  const [progress, setProgress] = useState(0)
  const [scanResults, setScanResults] = useState<any[]>([])
  const [targetIP, setTargetIP] = useState("192.168.1.0/24")

  const startScan = () => {
    if (scanning) return

    setScanning(true)
    setProgress(0)
    setScanResults([])

    // Simulate scan progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setScanning(false)
          generateFakeResults()
          return 100
        }
        return prev + Math.floor(Math.random() * 5) + 1
      })
    }, 200)
  }

  const generateFakeResults = () => {
    const results = []
    const numHosts = Math.floor(Math.random() * 10) + 5

    for (let i = 1; i <= numHosts; i++) {
      const lastOctet = Math.floor(Math.random() * 254) + 1
      const ip = `192.168.1.${lastOctet}`

      const services = []
      const numServices = Math.floor(Math.random() * 5) + 1

      const possiblePorts = [
        { port: 21, service: "FTP", banner: "vsFTPd 3.0.3" },
        { port: 22, service: "SSH", banner: "OpenSSH 8.2p1" },
        { port: 23, service: "Telnet", banner: "Linux telnetd" },
        { port: 25, service: "SMTP", banner: "Postfix smtpd" },
        { port: 80, service: "HTTP", banner: "Apache httpd 2.4.41" },
        { port: 443, service: "HTTPS", banner: "nginx 1.18.0" },
        { port: 3306, service: "MySQL", banner: "MySQL 8.0.27" },
        { port: 8080, service: "HTTP-Proxy", banner: "Squid proxy 4.10" },
      ]

      const usedPorts = new Set()

      for (let j = 0; j < numServices; j++) {
        const randomIndex = Math.floor(Math.random() * possiblePorts.length)
        const service = possiblePorts[randomIndex]

        if (!usedPorts.has(service.port)) {
          usedPorts.add(service.port)
          services.push({
            port: service.port,
            state: Math.random() > 0.2 ? "open" : "filtered",
            service: service.service,
            banner: service.banner,
          })
        }
      }

      results.push({
        ip,
        status: "up",
        hostname: Math.random() > 0.7 ? `host-${lastOctet}.local` : "",
        os: Math.random() > 0.5 ? "Linux 5.4.0" : "Windows Server 2019",
        services: services.sort((a, b) => a.port - b.port),
      })
    }

    setScanResults(results)
  }

  return (
    <div className="text-green-500">
      <div className="mb-6">
        <h2 className="text-xl mb-4 flex items-center">
          <Server className="mr-2" />
          Network Scanner Simulation
        </h2>
        <p className="text-green-600 mb-4 text-sm">
          This module simulates a network scanning tool similar to Nmap. It displays animated port scans with fake IPs
          and service banners.
        </p>
        <div className="flex items-center bg-black p-1 rounded border border-green-700 text-sm mb-4">
          <AlertCircle className="w-4 h-4 mr-2 text-yellow-500" />
          <span className="text-yellow-500">Educational simulation only. No actual scanning is performed.</span>
        </div>
      </div>

      <div className="mb-6">
        <div className="mb-4">
          <label className="block text-green-400 mb-2">Target IP Range:</label>
          <div className="flex">
            <input
              type="text"
              value={targetIP}
              onChange={(e) => setTargetIP(e.target.value)}
              className="bg-black border border-green-700 text-green-500 px-3 py-2 rounded-l focus:outline-none focus:ring-1 focus:ring-green-500 w-full"
              disabled={scanning}
            />
            <button
              onClick={startScan}
              disabled={scanning}
              className={`px-4 py-2 rounded-r border border-green-700 ${scanning ? "bg-green-900 bg-opacity-30 text-green-700" : "bg-green-900 bg-opacity-20 hover:bg-opacity-30 text-green-500"}`}
            >
              {scanning ? "Scanning..." : "Start Scan"}
            </button>
          </div>
        </div>

        {scanning && (
          <div className="mb-4">
            <div className="flex justify-between text-xs mb-1">
              <span>Scanning network...</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-black border border-green-900 rounded-full h-2.5 mb-2">
              <motion.div
                className="bg-green-500 h-2.5 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="text-xs text-green-700 animate-pulse">
              {progress < 30 && "Sending ARP requests..."}
              {progress >= 30 && progress < 60 && "Performing TCP SYN scan..."}
              {progress >= 60 && progress < 90 && "Service detection running..."}
              {progress >= 90 && "Finalizing results..."}
            </div>
          </div>
        )}
      </div>

      {scanResults.length > 0 && (
        <div>
          <h3 className="text-lg mb-3 text-green-400">Scan Results</h3>
          <div className="border border-green-700 rounded overflow-hidden">
            <div className="bg-black text-green-400 px-4 py-2 border-b border-green-700 text-sm">
              Found {scanResults.length} hosts
            </div>
            <div className="max-h-96 overflow-y-auto">
              {scanResults.map((host, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-b border-green-700 last:border-b-0 p-4"
                >
                  <div className="flex flex-wrap justify-between mb-2">
                    <div className="text-green-400 font-bold">{host.ip}</div>
                    <div className="text-green-600 text-sm">{host.hostname}</div>
                  </div>
                  <div className="text-sm text-green-600 mb-2">OS: {host.os}</div>
                  <div className="text-sm">
                    <div className="grid grid-cols-12 gap-2 text-green-400 border-b border-green-900 pb-1 mb-1">
                      <div className="col-span-2">Port</div>
                      <div className="col-span-2">State</div>
                      <div className="col-span-3">Service</div>
                      <div className="col-span-5">Version</div>
                    </div>
                    {host.services.map((service: any, sIndex: number) => (
                      <div key={sIndex} className="grid grid-cols-12 gap-2 text-green-600 py-1">
                        <div className="col-span-2">{service.port}</div>
                        <div
                          className={`col-span-2 ${service.state === "open" ? "text-green-500" : "text-yellow-600"}`}
                        >
                          {service.state}
                        </div>
                        <div className="col-span-3">{service.service}</div>
                        <div className="col-span-5 text-green-700">{service.banner}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
