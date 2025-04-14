"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Database, AlertCircle, Search, Mail, CheckCircle, XCircle } from "lucide-react"

export default function DataLeakChecker() {
  const [email, setEmail] = useState("")
  const [isChecking, setIsChecking] = useState(false)
  const [results, setResults] = useState<any[] | null>(null)

  const check = useState(false)

  const checkEmail = () => {
    if (!email || isChecking) return

    setIsChecking(true)
    setResults(null)

    // Simulate API call to check for data leaks
    setTimeout(() => {
      const fakeBreaches = [
        {
          name: "SocialMediaBreach",
          date: "2023-06-15",
          affectedUsers: "32 million",
          dataTypes: ["Email", "Username", "Password (hashed)", "Phone Number"],
        },
        {
          name: "RetailStoreHack",
          date: "2022-03-22",
          affectedUsers: "54 million",
          dataTypes: ["Email", "Name", "Address", "Payment Info (partial)"],
        },
        {
          name: "GamingSiteLeaked",
          date: "2021-11-08",
          affectedUsers: "12 million",
          dataTypes: ["Email", "Username", "Password (plaintext)"],
        },
      ]

      // Randomly decide if the email was found in breaches
      const wasFound = Math.random() > 0.3

      if (wasFound) {
        // Randomly select 1-3 breaches
        const numBreaches = Math.floor(Math.random() * 3) + 1
        const selectedBreaches = []

        for (let i = 0; i < numBreaches; i++) {
          selectedBreaches.push(fakeBreaches[i])
        }

        setResults(selectedBreaches)
      } else {
        setResults([])
      }

      setIsChecking(false)
    }, 2000)
  }

  return (
    <div className="text-green-500">
      <div className="mb-6">
        <h2 className="text-xl mb-4 flex items-center">
          <Database className="mr-2" />
          Data Leak Checker
        </h2>
        <p className="text-green-600 mb-4 text-sm">
          This module simulates checking if your email has been involved in known data breaches. Enter an email address
          to receive a simulated breach report.
        </p>
        <div className="flex items-center bg-black p-1 rounded border border-green-700 text-sm mb-4">
          <AlertCircle className="w-4 h-4 mr-2 text-yellow-500" />
          <span className="text-yellow-500">
            Educational simulation only. No actual data breach checking is performed.
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <div className="bg-black border border-green-700 rounded p-4 mb-4">
            <h3 className="text-green-400 mb-4">Check Your Email</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-green-600 mb-2 text-sm">Enter an email address to check:</label>
                <div className="flex">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isChecking}
                    className="w-full bg-black border border-green-700 text-green-500 px-3 py-2 rounded-l focus:outline-none focus:ring-1 focus:ring-green-500"
                    placeholder="example@email.com"
                  />
                  <button
                    onClick={checkEmail}
                    disabled={!email || isChecking}
                    className={`px-4 py-2 rounded-r border border-green-700 ${!email || isChecking ? "bg-green-900 bg-opacity-10 text-green-700" : "bg-green-900 bg-opacity-20 hover:bg-opacity-30 text-green-500"}`}
                  >
                    {isChecking ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, ease: "linear" }}
                      >
                        <Search className="w-5 h-5" />
                      </motion.div>
                    ) : (
                      <Search className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="text-xs text-green-700">
                <p>This simulation will generate random breach data for educational purposes.</p>
                <p>
                  In real-world scenarios, services like HaveIBeenPwned check if your email appears in known data
                  breaches.
                </p>
              </div>
            </div>
          </div>

          {isChecking && (
            <div className="bg-black border border-green-700 rounded p-4">
              <div className="flex flex-col items-center py-6">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: "linear" }}
                >
                  <Search className="w-10 h-10 text-green-500 mb-4" />
                </motion.div>
                <p className="text-green-600">Searching for your email in known data breaches...</p>
                <div className="w-full max-w-xs bg-black border border-green-900 rounded-full h-1.5 mt-4">
                  <motion.div
                    className="bg-green-500 h-1.5 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2 }}
                  />
                </div>
              </div>
            </div>
          )}

          {results && (
            <div className="bg-black border border-green-700 rounded p-4">
              <div className="flex items-center mb-4">
                <Mail className="w-5 h-5 mr-2 text-green-400" />
                <h3 className="text-green-400">Results for {email}</h3>
              </div>

              {results.length === 0 ? (
                <div className="flex items-center p-4 bg-green-900 bg-opacity-20 rounded border border-green-700">
                  <CheckCircle className="w-6 h-6 mr-3 text-green-500" />
                  <div>
                    <p className="text-green-400 font-medium">Good news!</p>
                    <p className="text-green-600 text-sm">Your email was not found in any known data breaches.</p>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center p-4 bg-red-900 bg-opacity-20 rounded border border-red-700 mb-4">
                    <XCircle className="w-6 h-6 mr-3 text-red-500" />
                    <div>
                      <p className="text-red-400 font-medium">
                        Oh no! Your data was found in {results.length} breach{results.length > 1 ? "es" : ""}.
                      </p>
                      <p className="text-red-600 text-sm">
                        This simulation shows what information might have been exposed.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {results.map((breach, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="border border-green-900 rounded overflow-hidden"
                      >
                        <div className="bg-green-900 bg-opacity-30 px-3 py-2 border-b border-green-900">
                          <div className="font-medium text-green-400">{breach.name}</div>
                          <div className="text-xs text-green-600">Breach date: {breach.date}</div>
                        </div>
                        <div className="p-3 text-sm">
                          <div className="mb-2">
                            <span className="text-green-700">Affected users:</span>
                            <span className="ml-2 text-green-500">{breach.affectedUsers}</span>
                          </div>
                          <div>
                            <div className="text-green-700 mb-1">Compromised data:</div>
                            <div className="flex flex-wrap gap-1">
                              {breach.dataTypes.map((type: string, i: number) => (
                                <span
                                  key={i}
                                  className="bg-green-900 bg-opacity-30 text-green-400 px-2 py-0.5 rounded text-xs"
                                >
                                  {type}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="bg-black border border-green-700 rounded p-4">
          <h3 className="text-green-400 mb-4">Data Breach Information</h3>

          <div className="space-y-4 text-sm">
            <div>
              <h4 className="text-green-500 mb-2">What is a Data Breach?</h4>
              <p className="text-green-600">
                A data breach occurs when sensitive, protected, or confidential information is accessed, stolen, or
                exposed by an unauthorized party. This can happen through:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-green-600">
                <li>Hacking and unauthorized access</li>
                <li>Malware or ransomware attacks</li>
                <li>Physical theft of devices</li>
                <li>Insider threats</li>
                <li>Accidental exposure or misconfiguration</li>
              </ul>
            </div>

            <div>
              <h4 className="text-green-500 mb-2">What to Do If Your Data is Breached:</h4>
              <ol className="list-decimal pl-5 space-y-1 text-green-600">
                <li>Change passwords for affected accounts immediately</li>
                <li>Enable two-factor authentication where available</li>
                <li>Monitor your accounts for suspicious activity</li>
                <li>Check your credit reports for unauthorized accounts</li>
                <li>Be alert for phishing attempts using your leaked information</li>
                <li>Consider freezing your credit if financial information was exposed</li>
              </ol>
            </div>

            <div>
              <h4 className="text-green-500 mb-2">Preventive Measures:</h4>
              <ul className="list-disc pl-5 space-y-1 text-green-600">
                <li>Use unique, strong passwords for each account</li>
                <li>Employ a password manager to keep track of credentials</li>
                <li>Enable two-factor authentication on all important accounts</li>
                <li>Regularly check for data breaches involving your email</li>
                <li>Be cautious about what personal information you share online</li>
                <li>Keep software and operating systems updated</li>
                <li>Use encrypted communication when possible</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
